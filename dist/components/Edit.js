import React from 'react';
import reactCSS from 'reactcss';
import RichTextEditor from 'wangeditor';

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    componentDidMount() {
        const editor = new RichTextEditor('editorContainer');
        editor.create();
    }

    render() {return(
        <div id="editorContainer">
            <p>Write something...</p>
        </div>
    )}

    style() {return(reactCSS({
        default: {
        }
    }, this.props, this.state))}
}
