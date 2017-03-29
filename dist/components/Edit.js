import React from 'react';
import reactCSS from 'reactcss';
import { Editor, EditorState, RichUtils } from 'draft-js';


export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this._onBoldClick = this._onBoldClick.bind(this);

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    handleChange(editorState) {
        this.setState((prevState, props) => ({editorState}))
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.handleChange(newState);
            return 'handled';
        }
        return 'not-handled'
    }

    _onBoldClick() {
        this.handleChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ))
    }

    _onTitleClick(index) {

    }

    render() {return(
        <div>
            <h1>Edit</h1>
            <button onClick={this._onBoldClick.bind(this)}>Bold</button>
            <div style={this.style().textArea}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.handleChange}
                    handleKeyCommand={this.handleKeyCommand}
                />
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            textArea: {
                border: '1px solid gray',
                width: '96%',
                margin: '10px 2%'
            }
        }
    }, this.props, this.state))}
}