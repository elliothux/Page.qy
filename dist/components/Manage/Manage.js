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
        eventProxy.on('addArticle', function (data) {
            this.setState((prevState) => {
                const list = prevState.articleList;
                list.unshift(data);
                return { articleList: list }
            });
            eventProxy.on('changeManageView', this.handleViewChange.bind(null, 'article'));
            this.forceUpdate();
        }.bind(this));
    }

    handleViewChange(view) {
        this.setState(() => ({ viewState: view }))
    }

    handleCreateArticle() {
        eventProxy.trigger('createArticle', null);
    }

    render() {return(
        <div style={this.style().container}>
            <div style={this.style().articleContainer}>
                {this.state.articleList.map((article, index) => (
                    <Article
                        isNew={false}
                        key={this.state.articleList.length - index}
                        mainPath={this.props.mainPath}
                        data={article}
                        db={this.props.db}
                        openWindow={this.props.openWindow}
                        dataToHTML = {this.props.dataToHTML}
                        config={this.props.config}
                    />
                ))}
            </div>
            <div style={this.style().editorContainer}>
                <Editor db={this.props.db}/>
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
                width: 'calc(100% - 30px)',
            },
            articleContainer: {
                position: 'fixed',
                overflow: 'auto',
                width: '100%',
                height: '100%',
                left: 0, top: 0
            },
            editorContainer: {
                position: 'fixed',
                overflow: 'auto',
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
