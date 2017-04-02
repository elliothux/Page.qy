import React from 'react';
import reactCSS from 'reactcss';
import Setting from './Setting';
import Theme from './Theme';
import About from './About';


export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <div style={this.style().userInfoContainer}>
                <div style={this.style().background}/>
                <div style={this.style().userInfo}>
                    <div style={this.style().info}>
                        <h1 style={this.style().userName}>HuQingyang</h1>
                        <div style={this.style().selfIntroduction}>
                            <span style={this.style().selfIntroductionSymbol}>“</span>
                            <p style={this.style().selfIntroductionText}>Create some awsome things.</p>
                        </div>
                        <p style={this.style().articleCount}>
                            Writed <span style={this.style().countNumber}>32</span> articles
                            about <span style={this.style().countNumber}>8</span> topics
                        </p>
                    </div>
                    <img
                        style={this.style().head}
                        src={`${this.props.mainPath}/src/pic/head.png`}
                    />
                    <div style={this.style().signButton}>Sign Out</div>
                </div>
            </div>
            <div style={this.style().optionsContainer}>
                <Setting/>
                <Theme/>
                <About/>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                position: 'fixed',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                left: 0, top: 0
            },
            userInfoContainer: {
                backgroundImage: `url('${this.props.mainPath}/src/pic/backgroundOptions.jpg')`,
                backgroundSize: 'cover',
                width: '100%',
                height: '45%',
                position: 'relative'
            },
            background: {
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0.85,
                zIndex: 2
            },
            userInfo: {
                width: '94%',
                height: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                position: 'absolute',
                top: '25%',
                left: '6%',
                zIndex: 3,
                boxShadow: '0px 5px 15px 8px rgba(0,0,0,0.15)'
            },
            info: {
                width: '70%',
                height: '80%',
                position: 'absolute',
                top: '10%',
                left: '5%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            },
            head: {
                width: '100px',
                height: '100px',
                borderRadius: '10px',
                boxShadow: '0px 6px 20px 5px rgba(0,0,0,0.2)',
                position: 'absolute',
                right: 'calc(12.5% - 50px)',
                top: '-35px',
            },
            signButton: {
                width: '100px',
                height: '35px',
                borderRadius: '35px',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                boxShadow: '0px 3px 10px 2px rgba(0,0,0,0.15)',
                position: 'absolute',
                right: 'calc(12.5% - 50px)',
                bottom: '40px',
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                lineHeight: '35px',
                cursor: 'pointer'
            },
            userName: {
                fontSize: '2.8em',
                color: '#4A4A4A',
                letterSpacing: '0.1em'
            },
            selfIntroduction: {
                position: 'relative'
            },
            selfIntroductionText: {
                fontSize: '1.8em',
                color: '#676667',
                letterSpacing: '0.1em',
                fontWeight: 'bold',
                display: 'inline-block'
            },
            selfIntroductionSymbol: {
                fontSize: '3.5em',
                color: '#676667',
                fontWeight: 'bold',
                position: 'absolute',
                left: '-30px',
                top: '-10px'
            },
            articleCount: {
                fontSize: '1em',
                color: 'gray',
                fontWeight: 'bold',
                letterSpacing: '0.1em'
            },
            countNumber: {
                fontSize: '1.05em',
                color: '#0F78C5'
            },
            optionsContainer: {
                width: '100%',
                height: '55%',
                overflow: 'hidden'
            }
        }
    }, this.props, this.state)}
}