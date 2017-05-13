import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../../lib/eventProxy';


export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
        this.initState = this.initState.bind(this);

        this.state = {
            status: 'init'
        }
    }

    componentDidMount() {
        eventProxy.on('backToArticle', this.initState)
    }

    initState() {
        this._reactInternalInstance &&
            this.setState({ status: 'init' });
    }

    async handlePreview() {
        this.props.openWindow(
            await this.props.dataToHTML.generateArticle(
                Object.assign({}, await this.props.db.getArticle({key: this.props.articleKey}), this.props)
            ))
    }

    handleRestore() {
        eventProxy.trigger('backToArticle');
        setTimeout(async function () {
            eventProxy.trigger('message', this.props.language === 'zh' ?
                '⚡ 正在恢复到历史...' : '⚡ Restoring To History...');
            let data = {
                key: this.props.articleKey,
                title: this.props.title,
                tags: this.props.tags,
                content: this.props.content,
                introduction: this.props.introduction,
            };

            data = await this.props.db.editArticle(data);
            if (!data)
                return eventProxy.trigger('message', this.props.language === 'zh' ?
                    '😢 恢复失败!' : '😢 Restore Failed!');
            eventProxy.trigger('updateArticleData', data);
            eventProxy.trigger('message', this.props.language === 'zh' ?
                '✨ 恢复完成!' : '✨ Restore Done!');
            await this.props.dataToHTML.generateArticle(data);
            eventProxy.trigger('refreshPreview');
        }.bind(this), 900);
    }

    render() {return (
        <div style={this.style().container}>
            {function () {
                const date = this.props.dataToHTML.formatDate(this.props.editDate);
                return <div style={this.style().dateArea}>
                    <span style={this.style().dateDate}>{date.date}</span>
                    <span style={this.style().dateMonth}>{date.month}</span>
                    <span style={this.style().dateYear}>{date.year}</span>
                    <span style={this.style().dateTime}>{date.hours} : {date.minutes}</span>
                    <span style={this.style().dateDay}>{date.day}</span>
                    <img
                        style={this.style().restoreImage}
                        src={`${this.props.mainPath}/src/pic/history.svg`}
                        onClick={this.setState.bind(this, { status: 'restore' }, () => {})}
                    />
                    <img
                        style={this.style().previewImage}
                        src={`${this.props.mainPath}/src/pic/preview.svg`}
                        onClick={this.handlePreview}
                    />
                </div>
            }.bind(this)()}
            <div style={this.style().contentArea}>
                <div style={this.style().content}>
                    <ul style={this.style().tags}>
                        {this.props.tags && this.props.tags.map((tag, index) => (
                            <li style={this.style().tag} key={index}>
                                <img
                                    style={this.style().tagImage}
                                    src={`${this.props.mainPath}/src/pic/tag.svg`}
                                />
                                {tag}
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <p style={this.style().title}>
                        {this.props.title === '' ?
                            (this.props.language === 'zh' ?
                                '未命名文章' : 'Untitled Article') : this.props.title}
                    </p>
                    <p style={this.style().introduction}>{this.props.introduction}</p>
                    <div style={this.style().changedContainer}>
                        <img
                            style={this.style().changedImage}
                            src={`${this.props.mainPath}/src/pic/changed.svg`}
                        />
                        <span style={this.style().changedText}>
                            {this.props.language === 'zh' ? '更改项:' : 'CHANGED:'}
                        </span>
                        <ul style={this.style().changed}>
                            {this.props.changed.map((changed, index) => {
                                switch (changed) {
                                    case 'content': return <li
                                        style={this.style().changedItem}
                                        key={index}>
                                        {this.props.language === 'zh' ? '内容' : 'CONTENT'}
                                    </li>;
                                    case 'tags': return <li
                                        style={this.style().changedItem}
                                        key={index}>
                                        {this.props.language === 'zh' ? '标签' : 'TAGS'}
                                    </li>;
                                    case 'title': return <li
                                        style={this.style().changedItem}
                                        key={index}>
                                        {this.props.language === 'zh' ? '标题' : 'TITLE'}
                                    </li>;
                                    default: return false;
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {function () {
                const container = document.createElement('div');
                container.innerHTML = this.props.content;
                const imgs = container.getElementsByTagName('img');
                if (imgs.length > 0)
                    return <div style={Object.assign({}, this.style().cover, {
                        backgroundImage: `url("${imgs[0].src}")`})} />;
                return false
            }.bind(this)()}
            <div style={this.style().operate}>
                <p style={this.style().operateTitle}>
                    {function () {
                        const date = this.props.dataToHTML.formatDate(this.props.editDate);
                        return this.props.language === 'zh' ?
                            `📅 将该文章恢复到 ${date.year}年${date.month}月${date.date}日 ${date.day} ${date.hours}:${date.minutes} 吗?` :
                            `📅 Do you really want to restore this article to ${date.year}/${date.month}/${date.date} ${date.day} ${date.hours}:${date.minutes}?`
                    }.bind(this)()}
                </p>
                <div style={this.style().buttonArea}>
                    <button
                        style={this.style().button}
                        onClick={this.handleRestore}
                    >
                        {this.props.language === 'zh' ? '确认' : 'CONTINUE'}
                    </button>
                    <button
                        style={this.style().button}
                        onClick={this.setState.bind(this, { status: 'init' }, () => {})}
                    >
                        {this.props.language === 'zh' ? '取消' : 'CANCEL'}
                    </button>
                </div>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '94%',
                height: 'auto',
                minHeight: '180px',
                margin: '0 3% 50px 3%',
                backgroundColor: 'white',
                boxShadow: '0px 5px 21px 0px rgba(0,0,0,0.31)',
                wordBreak: 'break-word',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative'
            },
            dateArea: {
                width: '200px',
                height: '162px',
                display: 'inline-block',
                fontWeight: 'bold',
                position: 'relative',
                color: 'rgba(0, 0, 0, 0.9)',
            },
            dateDate: {
                position: 'absolute',
                top: '0',
                left: '15px',
                fontSize: '70px',
                transform: 'scaleY(1.2)'
            },
            dateMonth: {
                position: 'absolute',
                top: '20px',
                left: '108px',
                fontSize: '26px',
                transform: 'scaleY(1.2)'
            },
            dateYear: {
                position: 'absolute',
                top: '55px',
                left: '110px',
                fontSize: '18px',
                transform: 'scaleY(1.2)'
            },
            dateTime: {
                position: 'absolute',
                top: '82px',
                left: '18px',
                fontSize: '20px',
            },
            dateDay: {
                position: 'absolute',
                top: '105px',
                left: '19px',
                fontSize: '15px',
            },
            restoreImage: {
                position: 'absolute',
                width: '20px',
                height: 'auto',
                top: '135px',
                left: '19px',
                cursor: 'pointer'
            },
            previewImage: {
                position: 'absolute',
                width: '20px',
                height: 'auto',
                top: '135px',
                left: '50px',
                cursor: 'pointer'
            },
            contentArea: {
                width: 'calc(65% - 170px)',
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                fontFamily: 'Merriweather',
                color: 'rgba(0, 0, 0, 0.9)',
            },
            cover: {
                height: '100%',
                width: 'calc(35% - 57px)',
                overflow: 'hidden',
                position: 'absolute',
                right: 0,
                backgroundSize: 'cover',
                boxShadow: 'rgba(0, 0, 0, 0.15) -3px 0 30px 0px'
            },
            content: {
                width: '100%',
                display: 'inline-block'
            },
            tags: {
                margin: '15px 0px 8px',
                listStyle: 'none',
                fontSize: '1.1em'
            },
            tagImage: {
                height: '13px',
                width: 'auto',
                marginRight: '5px',
                position: 'relative',
                top: '1px',
            },
            tag: {
                display: 'inline-block',
                marginRight: '16px',
                fontSize: '1em'
            },
            title: {
                fontSize: '2.2em',
                fontWeight: 'bold',
                marginBottom: '8px'
            },
            introduction: {
                fontSize: '1.1em',
                marginBottom: '15px',
                letterSpacing: '0.03em'
            },
            changedContainer: {
                marginBottom: '15px',
                fontSize: '0.9em',
                letterSpacing: '0.05em',
                fontFamily: '-apple-system, system-ui, "Microsoft YaHei UI","Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
            },
            changedImage: {
                height: '18px',
                width: 'auto',
                marginRight: '6px',
                position: 'relative',
                top: '3px'
            },
            changedText: {
                marginRight: '18px',
                letterSpacing: '0.05em',
                fontWeight: 'bold'
            },
            changed: {
                display: 'inline-block',
            },
            changedItem: {
                listStyle: 'none',
                backgroundImage: 'linear-gradient(90deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                display: 'inline-block',
                padding: '5px 15px',
                borderRadius: '25px',
                color: 'white',
                marginRight: '12px',
                boxShadow: '0px 3px 15px 0px rgba(0,0,0,0.25)'
            },
            operate: {
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(90deg, rgba(85, 203, 242, 0.95) 0%, rgba(61, 144, 239, 0.98) 100%)',
                position: 'absolute',
                top: 0, left: 0,
                transition: 'all ease 300ms',
                transform: `translateY(${
                    this.state.status === 'restore' ?
                        0 : '100%'
                })`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            operateTitle: {
                textAlign: 'center',
                color: 'white',
                fontSize: '1.1em',
                fontWeight: 'bold',
                letterSpacing: '0.03em',
                marginBottom: '15px'
            },
            buttonArea: {
                width: '80%',
                margin: '15px 10% 0 10%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            },
            button: {
                width: '100px',
                display: 'inline-block',
                padding: '8px 10px',
                margin: '0 15px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                fontSize: '0.8em',
                fontWeight: 'bold',
                letterSpacing: '0.03em',
                boxShadow: '0px 3px 15px 0px rgba(0,0,0,0.1)',
                border: 'none',
                color: 'white'
            },
        }
    }, this.props, this.state)}
}
