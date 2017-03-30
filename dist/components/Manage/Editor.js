import React from 'react';
import reactCSS from 'reactcss';
import RichTextEditor from 'wangeditor';

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.initContentEditor = this.initContentEditor.bind(this);
        this.initTagsEditor = this.initTagsEditor.bind(this);

        this.state = {
            title: '',
            content: '',
            tags: []
        }
    }

    componentDidMount() {
        this.initContentEditor();
        this.initTagsEditor();
    }

    initTagsEditor() {

    }

    initContentEditor() {
        this.refs.container.style.height = `${window.innerHeight - 100}px`;
        const editor = new RichTextEditor('editorContainer');
        const handleChange = this.handleContentChange;
        editor.onchange = function () {
            handleChange(this.$txt.html())
        };
        editor.config.menus =     [
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
            'emotion',
            'img',
            '|',
            'eraser',
            'undo',
            'redo',
            'fullscreen'
        ];
        editor.create();
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    handleTagsChange(e) {
        let value = e.target.value;
        value = value.split('#');
        value.shift();
        value = value.map(tag => {
            tag = tag.split('');
            console.log(tag[tag.length-1]);
            tag[tag.length] === ' ' && tag.pop();
            return tag.join('')
        });
        console.log(value)
    }

    handleContentChange(content) {
        this.setState({ content: content })
    }

    saveArticle() {

    }

    render() {return(
        <div>
            <input
                onChange={this.handleTitleChange}
                type="text" style={this.style().title}
                placeholder="TYPE TITLE HERE..."
            />
            <div style={this.style().tagsContainer}>
                {this.state.tags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                ))}
                <input
                    ref="tags"
                    onChange={this.handleTagsChange}
                    type="text" style={this.style().tags}
                    placeholder="ADD TAGS BY '#'"
                />
            </div>
            <div ref="container" id="editorContainer">
                <p>✍️Write something...</p>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            title: {
                height: '40px',
                width: 'calc(100% - 30px)',
                fontSize: '1.5em',
                border: 'none',
                marginTop: '20px',
                padding: '0 15px'
            },
            tagsContainer: {
                height: '30px',
                width: 'calc(100% - 30px)',
                fontSize: '1.2em',
                border: 'none',
                margin: '15px 0 20px 0',
                padding: '0 15px'
            },
            tags: {
                height: '100%',
                width: '100%',
                border: 'none',
                fontSize: '0.8em',
            }
        }
    }, this.props, this.state))}
}
