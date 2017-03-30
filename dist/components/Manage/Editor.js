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

        this.state = {
            title: '',
            content: '',
            tags: ['Add a tag here']
        }
    }

    componentDidMount() {
        this.refs.container.style.height = `${window.innerHeight - 50}px`;
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
            'redo'
        ];
        editor.create();
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    handleTagsChange(e) {
        if (e.type === 'keyup') return;
        if (e.type === 'keyup' && e.keyCode !== 13) return;
        if (e.target.value === '') return;
        const tags = this.state.tags;
        const placeHolder = tags.pop();
        tags.push(e.target.value, placeHolder);
        this.setState({ tags: tags })
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
                placeholder="Type your title here..."
            />
            {this.state.tags.map((tag, index) => (
                <input
                    type="text" placeholder={tag} key={index}
                    onBlur={this.handleTagsChange}
                    onKeyUp={this.handleTagsChange}
                />
            ))}
            <div ref="container" id="editorContainer">
                <p>✍️Write something...</p>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            title: {
                width: '94%',
                height: '40px',
                fontSize: '1.5em',
                border: 'none',
                margin: '20px 3% 30px 3%'
            }
        }
    }, this.props, this.state))}
}
