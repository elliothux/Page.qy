import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';
import Editor from './Editor';
import Article from './Article';


export default class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleCreateArticle = this.handleCreateArticle.bind(this);
        this.refreshArticleList = this.refreshArticleList.bind(this);

        this.state = {
            articleList: [],
            viewState: 'article',
        }
    }

    async componentWillMount() {
        this.setState({articleList: (await this.props.db.getArticleList()).sort((a, b) => (
            (new Date(b.createDate)).getTime() - (new Date(a.createDate)).getTime()
        ))});
        eventProxy.on('editArticle', this.handleViewChange.bind(null, 'edit'));
        eventProxy.on('createArticle', this.handleViewChange.bind(null, 'edit'));
        eventProxy.on('changeManageView', this.handleViewChange.bind(null, 'article'));
        eventProxy.on('refreshArticleList', this.refreshArticleList);
    }

    async refreshArticleList() {
        this.setState({articleList: (await this.props.db.getArticleList()).sort((a, b) => (
            (new Date(b.createDate)).getTime() - (new Date(a.createDate)).getTime()
        ))});
    }

    handleViewChange(view) {
        this.setState(() => ({ viewState: view }))
    }

    handleCreateArticle() {
        eventProxy.trigger('createArticle', null);
    }

    render() {return(
        <div style={this.style().container}>
            <div style={this.style().articleColumnContainer}>
                {function () {
                    const container = [];
                    for (let i=0; i<this.props.config.get().layoutColumn; i++)
                        container.push(
                            <div style={this.style().articleContainer} key={i}>
                                {this.state.articleList.map((article, index) => (
                                    index % this.props.config.get().layoutColumn === i ?
                                        <Article
                                            key={this.state.articleList.length - index}
                                            mainPath={this.props.mainPath}
                                            data={article}
                                            db={this.props.db}
                                            openWindow={this.props.openWindow}
                                            dataToHTML = {this.props.dataToHTML}
                                            config={this.props.config}
                                            index={index}
                                        /> : false
                                ))}
                            </div>
                        )
                    return container
                }.bind(this)()}
            </div>
            <div style={this.style().editorContainer}>
                <Editor
                    db={this.props.db}
                    dataToHTML = {this.props.dataToHTML}
                    config={this.props.config}
                    formatContent={this.props.formatContent}
                />
            </div>
            <div
                className="addArticleButton"
                style={this.style().addButton}
                onClick={this.handleCreateArticle}
            >
                <img
                    style={this.style().addButtonImg}
                    src={this.props.mainPath + '/src/pic/addManage.svg'}
                />
            </div>
        </div>
    )}

    style() {return(reactCSS({
        'default': {
            container: {
                width: 'calc(100% - 230px)',
                height: '100%',
                position: 'fixed',
                top: '0', left: '200px',
                transition: 'all ease 800ms',
                backgroundColor: 'white',
                transform: `translateY(${this.props.show ? 0 : '100%'})`,
            },
            articleColumnContainer: {
                width: '92%',
                height: '100%',
                margin: '0 4%',
                overflow: 'auto',
                position: 'fixed',
                top: 0, left: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
            },
            articleContainer: {
                display: 'inline-block',
                width: `${85 / this.props.config.get().layoutColumn}%`,
                height: 'auto',
                margin: '60px 0',
            },
            editorContainer: {
                position: 'fixed',
                overflow: 'hidden',
                width: 'calc(100% - 80px)',
                height: '100%',
                left: 0,
                padding: '0 40px',
                zIndex: 4,
                backgroundColor: 'white',
                transition: 'all 700ms ease',
                top: this.state.viewState === 'edit' ?
                    0 : '100%'
            },
            addButton: {
                position: 'fixed',
                width: '50px',
                height:'50px',
                bottom: '20px',
                left: 'calc(50% - 25px)',
                borderRadius: '100%',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 0.87) 0%, rgba(61, 144, 239, 0.92) 100%)',
                cursor: 'pointer'
            },
            addButtonImg: {
                width: '24px',
                height: '24px',
                margin: '13px',
                cursor: 'pointer'
            }
        }
    }, this.state, this.props))}
}
