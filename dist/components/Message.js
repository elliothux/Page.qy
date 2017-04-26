import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';


export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);

        this.state = {
            message: ['hello!']
        }
    }

    componentWillMount() {
        eventProxy.on('message', function (message) {
            messages = this.state.message;
            messages.push(message);
            this.setState({
                message: messages
            })
        }.bind(this))
    }

    render() {return (
        <p style={this.style().container}>
            {this.state.message[0]}
        </p>
    )}

    style() {return reactCSS({
        default: {
            container: {
                position: 'fixed',
                bottom: '200px',
                height: '35px',
                width: 'fit-content',
                maxWidth: '20%',
                padding: '0 20px',
                margin: '20px 0',
                textAlign: 'center',
                lineHeight: '35px',
                borderRadius: '50px',
                display: 'block',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                color: 'white',
                fontSize: '1.2em',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0px 4px 11px 1px rgba(0,0,0,0.21)'
            }
        }
    }, this.props, this.state)}
}