import React from 'react';
import reactCSS from 'reactcss';
import RichTextEditor from 'react-rte';

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: RichTextEditor.createEmptyValue()
        }
    }

    handleChange(value) {
        this.setState((prevState, props) => ({value}));
        this.props.onChange &&
            this.props.onChange(value.toString('html'))
    }

    render() {return(
        <div>
            <h1>Edit</h1>
            <RichTextEditor
                value={this.state.value}
                onChange={this.handleChange}
                toolbarConfig={
                    {
                        // Optionally specify the groups to display (displayed in the order listed).
                        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
                        INLINE_STYLE_BUTTONS: [
                            {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
                            {label: 'Italic', style: 'ITALIC'},
                            {label: 'Underline', style: 'UNDERLINE'}
                        ],
                        BLOCK_TYPE_DROPDOWN: [
                            {label: 'Normal', style: 'unstyled'},
                            {label: 'Heading Large', style: 'header-one'},
                            {label: 'Heading Medium', style: 'header-two'},
                            {label: 'Heading Small', style: 'header-three'}
                        ],
                        BLOCK_TYPE_BUTTONS: [
                            {label: 'UL', style: 'unordered-list-item'},
                            {label: 'OL', style: 'ordered-list-item'}
                        ]
                    }
                }
            />
        </div>
    )}

    style() {return(reactCSS({
        default: {
        }
    }, this.props, this.state))}
}
