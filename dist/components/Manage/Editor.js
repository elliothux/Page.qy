import React from 'react';
import reactCSS from 'reactcss';
import RichTextEditor from 'wangeditor';

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        this.refs.container.style.height = `${window.innerHeight - 50}px`;
        const editor = new RichTextEditor('editorContainer');
        const handleChange = this.handleChange;
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

    handleChange(content) {
        this.setState({ content: content })
    }


    render() {return(
        <div ref="container" id="editorContainer">
            <p>✍️Write something...</p>
        </div>
    )}

    style() {return(reactCSS({
        default: {

        }
    }, this.props, this.state))}
}
