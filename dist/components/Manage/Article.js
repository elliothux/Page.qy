import React from 'react';
import reactCSS from 'reactcss';


export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    componentDidMount() {
        const height = this.refs.contentContainer.clientHeight + 'px';
        this.refs.operateContainer.style.height = height;
        this.refs.operateContainer.style.top = '-' + height;
    }

    render() {return(
        <div style={this.style().container}>
            <div
                ref="contentContainer"
                style={this.style().contentContainer}
            >
                <p style={this.style().date}>{this.props.date}</p>
                {this.props.tags && this.props.tags.map((tag, index) => (
                    <p
                        style={this.style().tags}
                        key={index}
                    >#{tag}</p>
                ))}
                <p style={this.style().title}>{this.props.title}</p>
                <p>{this.props.introduction}</p>
            </div>
            <div
                ref="operateContainer"
                style={this.style().operateContainer}
            >
                <div style={this.style().operateButton}>
                    <img style={this.style().operateButtonImg} src="../../src/pic/editOperate.svg"/>
                    <p style={this.style().operateButtonText}>EDIT</p>
                </div>
                <div style={this.style().operateButton}>
                    <img style={this.style().operateButtonImg} src="../../src/pic/previewOperate.svg"/>
                    <p style={this.style().operateButtonText}>PREVIEW</p>
                </div>
                <div style={this.style().operateButton}>
                    <img style={this.style().operateButtonImg} src="../../src/pic/uploadOperate.svg"/>
                    <p style={this.style().operateButtonText}>UPLOAD</p>
                </div>
                <div style={this.style().operateButton}>
                    <img style={this.style().operateButtonImg} src="../../src/pic/historyOperate.svg"/>
                    <p style={this.style().operateButtonText}>HISTORY</p>
                </div>
                <div style={this.style().operateButton}>
                    <img style={this.style().operateButtonImg} src="../../src/pic/deleteOperate.svg"/>
                    <p style={this.style().operateButtonText}>DELETE</p>
                </div>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '90%',
                height: 'auto',
                margin: '30px 0 30px 5%',
            },
            contentContainer: {
                width: 'calc(100% - 36px)',
                height: '100%',
                backgroundColor: 'white',
                boxShadow: '0px 14px 21px 0px rgba(0,0,0,0.10)',
                borderLeft: '8px solid #42A5F0',
                padding: '10px',
                paddingLeft: '18px',
                color: '#413F3F',
                letterSpacing: '0.1em'
            },
            date: {
                display: 'inline-block',
                marginRight: '30px'
            },
            tags: {
                display: 'inline-block',
                marginRight: '10px'
            },
            title: {
                fontSize: '2em',
                fontWeight: 'bold',
                margin: '10px 0',
                letterSpacing: '0.01em'
            },
            operateContainer: {
                width: '100%',
                position: 'relative',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 0.9) 0%, rgba(61, 144, 239, 0.96) 100%)'
            },
            operateButton: {
                width: '16%',
                height: '100%',
                backgroundColor: 'red',
                display: 'inline-block'
            },
            operateButtonImg: {
                width: '50%',
                height: 'auto'
            },
            operateButtonText: {
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white'
            }
        }
    }, this.props, this.state)}
}