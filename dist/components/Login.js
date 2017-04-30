import React from 'react';
import reactCSS from 'reactcss';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div>
            <p style={this.style().title}>
                {function () {
                    switch (this.props.status) {
                        case 'init':
                            return this.props.language === 'zh' ?
                                '登录' : 'LOGIN';
                        case 'login':
                            return false;
                        case 'failed':
                            return this.props.language === 'zh' ?
                                '登录失败!' : 'LOGIN FAILED!';
                    }
                }.bind(this)()}
            </p>
            <div style={this.style().inputArea}>
                <input
                    type="text"
                    style={this.style().input}
                    placeholder={this.props.language === 'zh' ?
                        '输入GitHub账号' : 'GITHUB ACCOUNT'}
                />
                <input
                    type="password"
                    style={this.style().input}
                    placeholder={this.props.language === 'zh' ?
                        '输入密码' : 'PASSWORD'}
                />
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
                        switch (this.props.status) {
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
            inputArea: {
                width: '40%',
                margin: '0 30%',
                display: this.props.status === 'login' ?
                    'none' : 'block'
            },
            input: {
                width: 'calc(100% - 16px)',
                height: '25px',
                marginBottom: '20px',
                padding: '3px 8px',
                fontSize: '1em',
                border: 'none',
                borderBottom: '1px solid #63D9F4',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'white',
                fontWeight: 'lighter',
                letterSpacing: '0.04em'
            },
            loading: {
                position: 'absolute',
                width: '100%',
                height: '80px',
                left: '40%',
                top: '100px',
                marginLeft: '-260px',
                overflow: 'visible',
                display: this.props.status === 'login' ?
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