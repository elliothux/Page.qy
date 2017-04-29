import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';


export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleEditArticle = this.handleEditArticle.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handlePublish = this.handlePublish.bind(this);

        this.state = {
            date: this.props.data.createDate,
            tags: this.props.data.tags,
            title: this.props.data.title,
            content: this.props.data.content,
            introduction: this.props.data.introduction,
            key: this.props.data.key,
            published: this.props.data.published,
            translateY: 50,
            translateX: `${5 * 100 / 28}%`
        }
    }

    componentWillMount() {
        eventProxy.on('updateArticleData', function (data) {
            data.key === this.state.key &&
                this.setState(data)
        }.bind(this));
    }

    componentDidMount() {
        eventProxy.on(`translateY-${this.props.index}`, function (value) {
            this.setState({ translateY: value });
            const nextValue = this.refs.contentContainer.offsetHeight + value + 50;
            eventProxy.trigger(`translateY-${this.props.index + 3}`, nextValue)
        }.bind(this));
        setTimeout(function () {
            if (this.props.index < 3)
                eventProxy.trigger(`translateY-${this.props.index + 3}`,
                this.refs.contentContainer.offsetHeight + 50 + 50);
            const index = this.props.index % 3;
            index !== 0 && this.setState({
                translateX: index === 1 ?
                    `${(28 + 5 + 4) * 100 / 28}%` : `${(28 + 5 + 4 + 28 + 4) * 100 / 28}%`
            });
        }.bind(this), 50);
    }

    handleEditArticle() {
        eventProxy.trigger('editArticle', Object.assign(
            {}, this.props.data, this.state
        ));
    }

    handleConfirm(flag) {
        this.refs.confirm.className =
            `articleConfirm${flag === 'on' ? ' activated' : ''}`
    }

    async handleDelete() {
        await this.props.db.deleteArticle(this.state.key);
        this.refs.contentContainer.className = 'articleContainer deleted';
        setTimeout(function () {
            this.refs.contentContainer.style.display = 'none';
        }.bind(this), 600);
        const path =  await this.props.dataToHTML.dataToHome();
        this.props.dataToHTML.dataToArticle(this.state);
        this.props.dataToHTML.dataToTags();
        this.props.dataToHTML.dataToArchives();
        eventProxy.trigger('refreshPreview', path);
    }

    handlePreview() {
        const path = this.props.dataToHTML.getArticlePath(this.state.key);
        this.props.openWindow(path, {
            width: 1000,
            height: 700
        });
    }

    async handlePublish() {
        this.setState((prevState) => ({
            published: !prevState.published
        }));
        await this.props.db.togglePublish(this.state.key);
        const path =  await this.props.dataToHTML.dataToHome();
        this.props.dataToHTML.dataToArticle(this.state);
        this.props.dataToHTML.dataToTags();
        this.props.dataToHTML.dataToArchives();
        eventProxy.trigger('refreshPreview', path);
    }

    render() {return(
        <div
            style={this.style().container}
            className="articleContainer"
        >
            <div
                ref="contentContainer"
                style={this.style().contentContainer}
            >
                {function () {
                    const container = document.createElement('div');
                    container.innerHTML = this.state.content;
                    const imgs = container.getElementsByTagName('img');
                    if (imgs.length > 0)
                        return <img style={this.style().cover} src={imgs[0].src}/>;
                    return false
                }.bind(this)()}
                <p style={this.style().title}>
                    {this.state.title === '' ?
                        'Untitled Article' : this.state.title}
                </p>
                <p style={this.style().introduction}>{this.state.introduction}</p>
                <ul style={this.style().tags}>
                    {this.state.tags && this.state.tags.map((tag, index) => (
                        <li style={this.style().tag} key={index}>
                            <img
                                style={this.style().tagImage}
                                src={`${this.props.mainPath}/src/pic/tag.svg`}
                            />
                            {tag}
                        </li>
                    ))}
                </ul>
                <div style={this.style().date}>
                    <img
                        style={this.style().dateImg}
                        src={`${this.props.mainPath}/src/pic/date.svg`}
                    />
                    {function () {
                        const date = this.props.dataToHTML.formatDate(this.state.date);
                        return <p style={this.style().dateText}>
                            {date.month}/{date.date}/{date.year}&nbsp;&nbsp;&nbsp;
                            {date.day}&nbsp;&nbsp;&nbsp;{date.hours}:{date.minutes}
                        </p>
                    }.bind(this)()}
                </div>
            </div>
            <div
                ref="operateContainer"
                style={this.style().operateContainer}
                className="articleOperateContainer"
            >
                <div
                    className="articleOperateButton"
                    onClick={this.handleEditArticle}
                    style={this.style().operateButton}
                >
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + '/src/pic/editOperate.svg'}
                    />
                    <p style={this.style().operateButtonText}>
                        {this.props.config.get().language === 'zh' ? '编辑' : 'EDIT'}
                    </p>
                </div>
                <div
                    className="articleOperateButton"
                    style={this.style().operateButton}
                    onClick={this.handlePreview}
                >
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + "/src/pic/previewOperate.svg"}
                    />
                    <p style={this.style().operateButtonText}>
                        {this.props.config.get().language === 'zh' ? '预览' : 'PREVIEW'}
                    </p>
                </div>
                <div
                    className="articleOperateButton"
                    style={this.style().operateButton}
                    onClick={this.handlePublish}
                >
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + "/src/pic/publishOperate.svg"}
                    />
                    <p style={this.style().operateButtonText}>
                        {this.state.published ?
                            (this.props.config.get().language === 'zh' ? '取消待发布' : 'UNPUBLISH') :
                            (this.props.config.get().language === 'zh' ? '待发布' : 'PUBLISH')
                        }
                    </p>
                </div>
                <div
                    className="articleOperateButton"
                    style={this.style().operateButton}
                >
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + "/src/pic/historyOperate.svg"}
                    />
                    <p style={this.style().operateButtonText}>
                        {this.props.config.get().language === 'zh' ? '历史' : 'HISTORY'}
                    </p>
                </div>
                <div
                    className="articleOperateButton"
                    style={this.style().operateButton}
                    onClick={this.handleConfirm.bind(null, 'on')}
                >
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath +"/src/pic/deleteOperate.svg"}
                    />
                    <p style={this.style().operateButtonText}>
                        {this.props.config.get().language === 'zh' ? '删除' : 'DELETE'}
                    </p>
                </div>
            </div>
            <div
                className="articleConfirm"
                ref="confirm"
                style={this.style().confirmContainer}
            >
                <h3 dangerouslySetInnerHTML={{__html:
                    this.props.config.get().language === 'zh' ?
                    '😱<br/>你真的确定要删除这篇文章吗？' :
                    '😱<br/>Do You REALLY Want to Delete This Article?'
                }}/>
                <div>
                    <div
                        style={this.style().confirmButton}
                        onClick={this.handleDelete}
                    >
                        {this.props.config.get().language === 'zh' ? '是的' : 'YES'}
                    </div>
                    <div
                        style={this.style().confirmButton}
                        onClick={this.handleConfirm.bind(null, 'off')}
                    >
                        {this.props.config.get().language === 'zh' ? '算啦' : 'NO'}
                    </div>
                </div>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                position: 'absolute',
                boxShadow: '0px 3px 20px 0px rgba(0,0,0,0.30)',
                overflow: 'hidden',
                left: 0, top: 0,
                width: '28%',
                marginBottom: '100px',
                transition: 'all ease 400ms',
                transform: `translateX(${this.state.translateX}) translateY(${this.state.translateY}px)`,
                transitionDelay: `${this.props.index * 50}ms`
            },
            contentContainer: {
                width: '100%',
                backgroundColor: 'white',
                boxShadow: '0px 14px 21px 0px rgba(0,0,0,0.10)',
                letterSpacing: '0.1em',
                fontFamily: '宋体',
                color: '#565656'
            },
            cover: {
                width: '100%',
                height: 'auto'
            },
            title: {
                fontSize: '2em',
                fontWeight: 'bold',
                margin: '15px 10px',
                letterSpacing: '0.01em',
                textAlign: 'center'
            },
            introduction: {
                fontSize: '1.1em',
                marginBottom: '18px',
                letterSpacing: '0.01em',
                textAlign: 'center',
                margin: '15px 10px',
            },
            tags: {
                marginBottom: '8px',
                textAlign: 'center',
                listStyle: 'none'
            },
            tagImage: {
                height: '100%',
                width: 'auto',
                marginRight: '4px',
                position: 'relative',
                top: '2px'
            },
            tag: {
                display: 'inline-block',
                margin: '0 10px',
                fontSize: '0.8em'
            },
            date: {
                textAlign: 'center',
                paddingBottom: '12px'
            },
            dateImg: {
                marginRight: '6px',
                height: '100%',
                width: 'auto',
                position: 'relative',
                top: '1px'
            },
            dateText: {
                display: 'inline-block',
                fontSize: '0.8em'
            },
            operateContainer: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0, left: 0,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden'
            },
            operateButton: {
                width: '100%',
                height: '20%',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                alignContent: 'flex-start',
                cursor: 'pointer',
                backgroundImage: 'linear-gradient(90deg, rgba(85, 203, 242, 0.87) 0%, rgba(61, 144, 239, 0.92) 100%)',
            },
            operateButtonImg: {
                width: 'auto',
                height: '35px',
                cursor: 'pointer',
                marginRight: '30px'
            },
            operateButtonText: {
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                width: '30%'
            },
            confirmContainer: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0, left: 0,
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                color: 'white',
                textAlign: 'center',
                letterSpacing: '0.1em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                justifyItems: 'center',
                fontSize: 'normal'
            },
            confirmButton: {
                width: '70px',
                display: 'inline-block',
                padding: '8px 10px',
                margin: '20px 15px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '0.3em',
                boxShadow: '0px 3px 15px 0px rgba(0,0,0,0.1)',
            }
        }
    }, this.props, this.state)}
}
