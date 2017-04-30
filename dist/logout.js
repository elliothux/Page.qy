Function.prototype.toString = Object.prototype.toString;


import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import { remote } from 'electron';


const user = remote.require('./main.js').user;
const config = remote.require('./main.js').config.get();


class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);

        this.state = {
            status: 'init'
        }
    }

    render() {return (
        <div>
            <p style={this.style().title}>
                {function () {
                    switch (this.state.status) {
                        case 'init':
                            return this.props.language === 'zh' ?
                                '备份' : 'BACKUP';
                        case 'backup':
                            return false;
                        case 'failed':
                            return this.props.language === 'zh' ?
                                '备份失败!' : 'BACKUP FAILED!';
                    }
                }.bind(this)()}
            </p>
            <div style={this.style().selectArea}>
                <div style={this.style().radioContainer}>
                    <input type="radio" name="backup" value="github"/>
                    {this.props.language === 'zh' ?
                        '备份到GitHub' : 'BACKUP ON GITHUB'}
                </div>
                <div style={this.style().radioContainer}>
                    <input type="radio" name="backup" value="github"/>
                    {this.props.language === 'zh' ?
                        '备份到本地' : 'BACKUP ON LOCAL'}
                </div>
                <div style={this.style().radioContainer}>
                    <input type="radio" name="backup" value="github"/>
                    {this.props.language === 'zh' ?
                        '不备份' : 'SKIP'}
                </div>
            </div>
            <div style={this.style().loading} id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
            <div style={this.style().buttonArea}>
                <button style={this.style().button}>
                    {function () {
                        switch (this.state.status) {
                            case 'failed':
                                return this.props.language === 'zh' ? '重试' : 'RETRY';
                            case 'init':
                                return this.props.language === 'zh' ? '登录' : 'LOGIN';
                            case 'login':
                                return this.props.language === 'zh' ? '取消' : 'CANCEL';
                        }
                    }.bind(this)()}
                </button>
                <button
                    style={this.style().button}
                    onClick={function () {
                        this.props.quit()
                    }.bind(this)}
                >
                    {this.props.language === 'zh' ? '退出' : 'QUIT'}
                </button>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            title: {
                fontSize: '1.3em',
                textAlign: 'left',
                color: 'white',
                width: 'calc(40% - 16px)',
                margin: '35px calc(30% + 8px)',
                letterSpacing: '0.06em'
            },
            selectArea: {
                width: '40%',
                margin: '0 30%',
                display: this.state.status === 'backup' ?
                    'none' : 'block',
                color: 'white'
            },
            radioContainer: {
                width: '100%',
                height: '30px',
                border: '1px solid white',
            },
            radio: {

            },
            radioText: {

            },
            loading: {
                position: 'absolute',
                width: '100%',
                height: '80px',
                left: '40%',
                top: '100px',
                marginLeft: '-260px',
                overflow: 'visible',
                display: this.state.status === 'backup' ?
                    'block' : 'none'
            },
            buttonArea: {
                width: '36%',
                position: 'absolute',
                left: '32%',
                bottom: '45px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            button: {
                width: '42%',
                height: '30px',
                borderRadius: '30px',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgba(54, 122, 209, 0.3)',
                cursor: 'pointer',
                fontSize: '0.7em',
                letterSpacing: '0.08em',
                transition: 'all ease 200ms'
            },
        }
    }, this.state, this.props)}
}


ReactDOM.render(
    <App
        language={config.language}
        user={user}
    />,
    document.getElementById('root')
);
