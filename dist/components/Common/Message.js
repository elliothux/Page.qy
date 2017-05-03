import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';


export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.showMessage = this.showMessage.bind(this);

        this.state = {
            messages: [],
            message: false,
        }
    }

    componentWillMount() {
        eventProxy.on('message', function (message) {
            this.state.messages.push(message);
            this.showMessage();
        }.bind(this))
    }

    showMessage() {
        if (this.state.messages.length === 0 || this.state.message)
            return;
        this.setState((prevState) => ({
            message: prevState.messages[0]
        }));
        setTimeout(function () {
            this.setState((prevState) => ({
                message: false
            }));
            this.state.messages.shift();
            setTimeout(this.showMessage, 300);
        }.bind(this), 2000)
    }

    render() {return (
        <div style={this.style().container}>
            <p style={this.style().message}>
                {this.state.message}
            </p>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: this.props.miniNav ?
                    'calc(100% - 80px)' : 'calc(100% - 200px)',
                marginLeft: this.props.miniNav ?
                    '80px' : '200px',
                position: 'fixed',
                display: 'flex',
                bottom: '0',
                flexDirection: 'row',
                justifyContent: 'center',
                justifyItems: 'center',
                transition: 'all ease-out 300ms',
                transform: `translateY(${
                        this.state.message ? '-200px' : '100%'
                    })`,
                opacity: this.state.message ? '1' : '0'
            },
            message: {
                bottom: '200px',
                height: '35px',
                width: 'fit-content',
                maxWidth: '20%',
                padding: '0 20px',
                textAlign: 'center',
                lineHeight: '35px',
                borderRadius: '50px',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                fontSize: '0.9em',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0px 5px 50px 5px rgba(0,0,0,0.3)'
            }
        }
    }, this.props, this.state)}
}