import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';


export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().container}>
            <div
                style={this.style().userArea}
                onClick={this.props.openURL.bind(null,
                    `https://${this.props.config.get().username}.github.io`)}
            >
                <img
                    style={this.style().userHead}
                    src="../../user/avatar.jpg"
                />
                <div style={this.style().userInfo}>
                    <p style={this.style().userName}>
                        {this.props.config.get().name || this.props.config.get().username}
                    </p>
                    <p style={this.style().userURL}>
                        {`${this.props.config.get().username}.github.io`}
                    </p>
                </div>
            </div>
            <div style={this.style().navArea}>
                <div
                    style={Object.assign({}, this.style().navButtonContainer,
                        this.props.mainView === 'preview' ?
                            {backgroundColor: 'rgba(0, 0, 0, 0.3)'} :
                            {backgroundColor: 'rgba(0, 0, 0, 0.1)'})}
                    onClick={this.props.handleViewChange.bind(null, 'preview')}
                >
                    <img style={this.style().navButtonImg} src="../../src/pic/previewNav.svg"/>
                    <p style={this.style().navBottomText}>
                        {this.props.config.get().language === 'zh' ? '预览' : 'PREVIEW'}
                    </p>
                </div>
                <div
                    style={Object.assign({}, this.style().navButtonContainer,
                        this.props.mainView === 'manage' ?
                            {backgroundColor: 'rgba(0, 0, 0, 0.3)'} :
                            {backgroundColor: 'rgba(0, 0, 0, 0.1)'})}
                    onClick={function () {
                        this.props.handleViewChange('manage');
                        this.props.mainView === 'manage' &&
                            eventProxy.trigger('closeEditor');
                    }.bind(this)}
                >
                    <img style={this.style().navButtonImg} src="../../src/pic/manageNav.svg"/>
                    <p style={this.style().navBottomText}>
                        {this.props.config.get().language === 'zh' ? '管理' : 'MANAGE'}
                    </p>
                </div>
                <div
                    style={Object.assign({}, this.style().navButtonContainer,
                        this.props.mainView === 'options' ?
                            {backgroundColor: 'rgba(0, 0, 0, 0.3)'} :
                            {backgroundColor: 'rgba(0, 0, 0, 0.1)'})}
                    onClick={this.props.handleViewChange.bind(null, 'options')}
                >
                    <img style={this.style().navButtonImg} src="../../src/pic/optionsNav.svg"/>
                    <p style={this.style().navBottomText}>
                        {this.props.config.get().language === 'zh' ? '选项' : 'OPTIONS'}
                    </p>
                </div>
            </div>
            <img style={this.style().toggleButton} src="../../src/pic/toggleNav.svg"/>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '200px',
                height: '100%',
                position: 'fixed',
                top: 0, left: 0,
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                letterSpacing: '0.15em'
            },
            userArea: {
                width: '100%',
                height: '200px',
                cursor: 'pointer'
            },
            navArea: {
                width: '100%',
                height: '45%',
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'space-between',
            },
            toggleButton: {
                width: '30px',
                height: 'auto',
                margin: '0 0 15px 20px',
                cursor: 'pointer'
            },
            userHead: {
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                margin: '25px 0 0 25px',
                boxShadow: '0px 6px 32px 5px rgba(0,0,0,0.4)',
                cursor: 'pointer'
            },
            userInfo: {
                width: 'calc(90% - 15px)',
                height: '45px',
                margin: '30px 0 0 5%',
                borderLeft: 'solid 5px white',
                paddingLeft: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
            },
            userName: {
                fontSize: '1.3em',
                fontWeight: 'bold',
                cursor: 'pointer'
            },
            userURL: {
                fontSize: '0.6em',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                cursor: 'pointer'
            },
            navButtonContainer: {
                width: '100%',
                height: '23%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
            },
            navButtonImg: {
                width: 'auto',
                height: '48%',
                marginRight: '20px',
                cursor: 'pointer'
            },
            navBottomText: {
                fontSize: '1.3em',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: 'white',
                textDecoration: 'none'
            }
        }
    }, this.props, this.state))}
}
