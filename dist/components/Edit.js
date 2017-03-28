import React from 'react';
import reactCSS from 'reactcss';
import { Editor, EditorState } from 'draft-js';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    handleChange(editorState) {
        this.setState((prevState, props) => ({editorState}))
    }

    render() {return(
        <div>
            <h1>Hello</h1>
            <Editor
                editorState={this.state.editorState}
                onChange={this.handleChange}
            />
        </div>
    )}

    style() {return(reactCSS({
        default: {

        }
    }, this.props, this.state))}
}