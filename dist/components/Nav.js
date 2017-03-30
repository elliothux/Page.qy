import React from 'react';
import reactCSS from 'reactcss';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().container}>
            <div style={this.style().userArea}>
                <img style={this.style().userHead} src="../../src/pic/head.png"/>
                <div style={this.style().userInfo}>
                    <p style={this.style().userName}>HuQingyang</p>
                    <p style={this.style().userURL}>huqingyang.github.io</p>
                </div>
            </div>
            <div style={this.style().navArea}>
                <div style={this.style().navButtonContainer}>
                    <img style={this.style().navButtonImg} src="../../src/pic/previewNav.svg"/>
                    <p style={this.style().navBottomText}>PREVIEW</p>
                </div>
                <div style={this.style().navButtonContainer}>
                    <img style={this.style().navButtonImg} src="../../src/pic/manageNav.svg"/>
                    <p style={this.style().navBottomText}>MANAGE</p>
                </div>
                <div style={this.style().navButtonContainer}>
                    <img style={this.style().navButtonImg} src="../../src/pic/optionsNav.svg"/>
                    <p style={this.style().navBottomText}>OPTIONS</p>
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
                background: 'linear-gradient(to left bottom, #56CCF2 , #2F80ED)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                letterSpacing: '0.15em'
            },
            userArea: {
                width: '100%',
                height: '200px',
            },
            navArea: {
                width: '100%',
                height: 'calc(100% - 400px)',
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'space-between',
            },
            toggleButton: {
                width: '30px',
                height: 'auto',
                margin: '0 0 15px 20px',
            },
            userHead: {
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                margin: '25px 0 0 25px',
                boxShadow: '0px 6px 32px 5px rgba(0,0,0,0.4)'
            },
            userInfo: {
                width: 'calc(90% - 15px)',
                height: '40px',
                margin: '30px 0 0 5%',
                borderLeft: 'solid 5px white',
                paddingLeft: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            },
            userName: {
                fontSize: '2em',
                fontWeight: 'bold'
            },
            userURL: {
                fontSize: '1.1em',
                fontWeight: 'bold'
            },
            navButtonContainer: {
                width: '100%',
                height: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            },
            navButtonImg: {
                width: '40px',
                height: 'auto',
                marginRight: '20px'
            },
            navBottomText: {
                fontSize: '2em',
                fontWeight: 'bold',
            }
        }
    }, this.props, this.state))}
}
