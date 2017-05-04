import React from 'react';
import reactCSS from 'reactcss';


export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handlePreview = this.handlePreview.bind(this);

        this.state = {
            status: 'init',
            selected: []
        }
    }

    async handlePreview() {
        this.props.openWindow(
            await this.props.dataToHTML.dataToArticle(this.props))
    }

    handleSelect(select) {
        if (select === 'all') {
            if (this.state.selected.includes('all'))
                return this.setState({ selected: [] });
            else return this.setState({ selected: ['all'] });
        }
        if (this.state.selected.includes(select))
            this.state.selected.push(select);
        else
            this.state.selected.splice(
                this.state.selected.indexOf(select),1);
        this.setState(this.state);
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
                {function () {
                    const container = document.createElement('div');
                    container.innerHTML = this.props.content;
                    const imgs = container.getElementsByTagName('img');
                    if (imgs.length > 0)
                        return <div style={Object.assign({}, this.style().coverContainer, {
                            backgroundImage: `url("${imgs[0].src}")`
                        })} src={imgs[0].src}/>;
                    return false
                }.bind(this)()}
            </div>
            <div style={this.style().operate}>
                <p style={this.style().operateTitle}>
                    {this.props.language === 'zh' ?
                        '选择你要恢复的内容:' : 'Choose What You Want To Restore:' }
                </p>
                <div style={this.style().operateButtonContainer}>
                    {function () {
                        const operate = [];
                        this.props.changed.includes('title') &&
                            operate.push(<button
                                key='title'
                                style={this.state.selected.includes('title') ||
                                this.state.selected.includes('all') ?
                                    this.style().operateButton : this.style().operateButtonSelected}
                                onClick={this.handleSelect.bind(this, 'title')}
                            >
                                {this.props.language === 'zh' ?
                                    '标题' : 'TITLE'}
                            </button>);
                        this.props.changed.includes('tags') &&
                            operate.push(<button
                                key='tags'
                                style={this.state.selected.includes('tags') ||
                                this.state.selected.includes('all') ?
                                    this.style().operateButton : this.style().operateButtonSelected}
                                onClick={this.handleSelect.bind(this, 'tags')}
                            >
                                {this.props.language === 'zh' ?
                                    '标签' : 'TAGS'}
                            </button>);
                        this.props.changed.includes('content') &&
                            operate.push(<button
                                key='content'
                                style={this.state.selected.includes('content') ||
                                this.state.selected.includes('all') ?
                                    this.style().operateButton : this.style().operateButtonSelected}
                                onClick={this.handleSelect.bind(this, 'content')}
                            >
                                {this.props.language === 'zh' ?
                                    '内容' : 'CONTENT'}
                            </button>);
                        operate.length > 1 &&
                            operate.unshift(<button
                                key='all'
                                style={this.state.selected.includes('all') ||
                                    this.props.changed.length === this.state.selected.length ?
                                    this.style().operateButton : this.style().operateButtonSelected}
                                onClick={this.handleSelect.bind(this, 'all')}
                            >
                                {this.props.language === 'zh' ?
                                    '全部' : 'ALL'}
                            </button>);
                        return operate;
                    }.bind(this)()}
                </div>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '94%',
                height: 'auto',
                margin: '0 3% 50px 3%',
                backgroundColor: 'white',
                boxShadow: '0px 5px 21px 0px rgba(0,0,0,0.31)',
                wordBreak: 'break-all',
                display: 'flex',
                justifyContent: 'space-between',
                overflow: 'hidden',
                position: 'relative'
            },
            dateArea: {
                width: '180px',
                height: '180px',
                display: 'inline-block',
                fontWeight: 'bold',
                position: 'relative',
                color: 'rgba(0, 0, 0, 0.9)',
            },
            restoreImage: {
                position: 'absolute',
                width: '20px',
                height: 'auto',
                top: '150px',
                left: '19px',
                cursor: 'pointer'
            },
            previewImage: {
                position: 'absolute',
                width: '20px',
                height: 'auto',
                top: '150px',
                left: '50px',
                cursor: 'pointer'
            },
            dateDate: {
                position: 'absolute',
                top: '15px',
                left: '15px',
                fontSize: '70px',
                transform: 'scaleY(1.2)'
            },
            dateMonth: {
                position: 'absolute',
                top: '35px',
                left: '108px',
                fontSize: '26px',
                transform: 'scaleY(1.2)'
            },
            dateYear: {
                position: 'absolute',
                top: '70px',
                left: '110px',
                fontSize: '18px',
                transform: 'scaleY(1.2)'
            },
            dateTime: {
                position: 'absolute',
                top: '97px',
                left: '18px',
                fontSize: '20px',
            },
            dateDay: {
                position: 'absolute',
                top: '120px',
                left: '19px',
                fontSize: '15px',
            },
            contentArea: {
                width: 'calc(100% - 210px)',
                minHeight: '150px',
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                fontFamily: '宋体',
                color: 'rgba(0, 0, 0, 0.9)',
                wordBreak: 'break-world',
                minWidth: '50%'
            },
            coverContainer: {
                height: '100%',
                width: '40%',
                overflow: 'hidden',
                backgroundSize: 'cover',
            },
            content: {
                paddingRight: '50px',
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
                letterSpacing: '0.05em'
            },
            changedImage: {
                height: '18px',
                width: 'auto',
                marginRight: '6px',
                position: 'relative',
                top: '2px'
            },
            changedText: {
                marginRight: '18px',
                letterSpacing: '0.05em',
                fontWeight: 'bold'
            },
            changed: {
                display: 'inline-block'
            },
            changedItem: {
                listStyle: 'none',
                backgroundImage: 'linear-gradient(90deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                display: 'inline-block',
                padding: '5px 15px',
                borderRadius: '25px',
                color: 'white',
                marginRight: '8px',
                boxShadow: '0px 3px 15px 0px rgba(0,0,0,0.25)'
            },
            operate: {
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(90deg, rgba(85, 203, 242, 0.87) 0%, rgba(61, 144, 239, 0.92) 100%)',
                position: 'absolute',
                top: 0,
                transition: 'all ease 300ms',
                transform: `translateY(${
                    this.state.status === 'restore' ?
                        0 : '100%'
                })`
            },
            operateTitle: {
                textAlign: 'center',
                color: 'white',
                margin: '18px 0 12px 0',
                fontSize: '1.2em',
                fontWeight: 'bold'
            },
            operateButtonContainer: {
                width: '80%',
                margin: '0 10%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            },
            operateButton: {
                width: '20%',
                minWidth: '40px',
                maxWidth: '80px',
                height: '30px',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgba(54, 122, 209, 0.3)',
                cursor: 'pointer',
                fontSize: '0.7em',
                letterSpacing: '0.08em',
                margin: '0 15px 10px 15px'
            },
            operateButtonSelected: {
                width: '20%',
                minWidth: '40px',
                maxWidth: '80px',
                height: '30px',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgba(54, 122, 209, 1)',
                cursor: 'pointer',
                fontSize: '0.7em',
                letterSpacing: '0.08em',
                margin: '0 15px 10px 15px'
            },
            button: {
                width: '42%',
                height: '30px',
                borderRadius: '30px',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgba(54, 122, 209, 0.3)',
                cursor: 'pointer',
                fontSize: '0.7em',
                letterSpacing: '0.08em',
                transition: 'all ease 200ms'
            }
        }
    }, this.props, this.state)}
}
