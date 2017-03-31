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

        this.state = {
            articleList: [],
            viewState: 'article'
        }
    }

    async componentWillMount() {
        this.setState({articleList: await this.props.db.getArticleList()});
        eventProxy.on('editArticle', this.handleViewChange.bind(null, 'edit'));
        eventProxy.on('changeManageView', this.handleViewChange.bind(null, 'article'));
    }

    handleViewChange(view) {
        this.setState(() => ({ viewState: view }))
    }

    render() {return(
        <div style={this.style().container}>
            {this.state.articleList.map((article, index) => (
                <Article
                    isNew={false}
                    key={index}
                    mainPath={this.props.mainPath}
                    data={article}
                />
            ))}
            <div style={this.style().editorContainer}>
                <Editor db={this.props.db}/>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: 'calc(100% - 30px)',
            },
            editorContainer: {
                position: 'fixed',
                overflow: 'auto',
                width: 'calc(100% - 80px)',
                height: '100%',
                top: 0, left: 0,
                padding: '0 40px',
                zIndex: 4,
                backgroundColor: 'white',
                transition: 'transform 700ms ease',
                transform: `translateY(${
                    this.state.viewState === 'edit' ?
                        0 : '100%'
                })`
            }
        }
    }, this.state, this.props))}
}
