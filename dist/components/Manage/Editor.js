import React from 'react';
import reactCSS from 'reactcss';
import RichTextEditor from 'wangeditor';
import eventProxy from '../../lib/eventProxy';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleEditArticle = this.handleEditArticle.bind(this);
        this.initContentEditor = this.initContentEditor.bind(this);
        this.saveArticle = this.saveArticle.bind(this);

        this.state = {
            title: '',
            content: '',
            tags: [],
            key: ''
        }
    }

    componentWillMount() {
        eventProxy.on('editArticle', function (data) {
            this.handleEditArticle(data);
        }.bind(this));
        eventProxy.on('closeEditor', function () {
            this.saveArticle();
        }.bind(this))
    }

    componentDidMount() {
        this.initContentEditor();
    }

    initContentEditor() {
        this.refs.container.style.height = `${window.innerHeight - 150}px`;
        const editor = new RichTextEditor('editorContainer');
        const handleChange = this.handleContentChange;
        editor.config.zindex = 10;
        editor.onchange = function () {
            handleChange(this.$txt.html())
        };
        editor.config.menus = [
            'bold',
            'underline',
            'italic',
            'strikethrough',
            '|',
            'head',
            'quote',
            'insertcode',
            'unorderlist',
            'orderlist',
            '|',
            'link',
            'table',
            'img',
            '|',
            'eraser',
            'undo',
            'redo'
        ];
        editor.create();
        this.editor = editor;
    }

    handleEditArticle(data) {
        this.setState(() => ({
            title: data.title,
            content: data.content,
            tags: data.tags,
            key: data.key
        }));
        this.editor.$txt.html(data.content);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    handleTagsChange(e) {
        let value = e.target.value;
        value = value.split('    ').join('').split('#');
        value.shift();
        this.setState({ tags: value })
    }

    handleContentChange(content) {
        this.setState({ content: content })
    }

    async saveArticle() {
        let data = {
            title: this.state.title,
            tags: this.state.tags,
            content: this.state.content
        };
        if (this.state.key === '') {
            if (this.state.title === '' &&
                (this.state.content === '' ||
                this.state.content === '<p><br></p>')) {
                eventProxy.trigger('changeManageView', 'article');
                return;
            }
            else {
                data = await this.props.db.createArticle(data);
                eventProxy.trigger('addArticle', data);
            }
        }
        else {
            data.key = this.state.key;
            await this.props.db.editArticle(data);
            eventProxy.trigger('updateArticleData', data);
        }
        eventProxy.trigger('changeManageView', 'article');
        this.setState(() => ({
            title: '',
            tags: [],
            content: '',
            key: ''
        }));
        this.editor.clear();
    }

    render() {return(
        <div>
            <input
                value={this.state.title}
                onChange={this.handleTitleChange}
                type="text" style={this.style().title}
                placeholder="TYPE TITLE HERE..."
            />
            <input
                ref="tags"
                value={this.state.tags.length > 0 ?
                    '#' + this.state.tags.join('    #') : ''}
                onChange={this.handleTagsChange}
                type="text" style={this.style().tags}
                placeholder="ADD TAGS BY '#'"
            />
            <div ref="container" id="editorContainer">
                <p id="test" dangerouslySetInnerHTML={{
                    __html: this.state.initContent
                }}/>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '100%'
            },
            title: {
                width: 'calc(100% - 30px)',
                height: '40px',
                fontSize: '1.5em',
                border: 'none',
                marginTop: '20px',
                padding: '0 15px'
            },
            tags: {
                width: 'calc(100% - 36px)',
                height: '30px',
                margin: '15px 0 20px 0',
                padding: '0 18px',
                border: 'none',
                fontSize: '1em',
            }
        }
    }, this.props, this.state))}
}
