import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';


export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.refreshPreview = this.refreshPreview.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentWillMount() {
        eventProxy.on('refreshPreview', this.refreshPreview.bind(this))
    }

    refreshPreview(path) {
        if(!path) {
            path = this.refs.preview.src;
            this.refs.preview.src = null;
        }
        this.refs.preview.src = path;
    }

    upload() {
        this.props.upload();
    }

    render() {return (
        <div style={this.style().container}>
            <iframe
                ref="preview"
                src="../../user/temp/index.html"
                style={this.style().preview}
            />
            <div
                className="addArticleButton"
                style={this.style().addButton}
            >
                <img
                    onClick={this.upload}
                    style={this.style().addButtonImg}
                    src='../../src/pic/upload.svg'
                />
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: 'calc(100% - 200px)',
                height: '100%',
                position: 'fixed',
                top: '0', left: '200px',
                transition: 'all ease 800ms',
                backgroundColor: 'white',
                transform: `translateY(${this.props.show ? 0 : '100%'})`,
            },
            preview: {
                width: '100%',
                height: '100%',
                border: 'none'
            },
            addButton: {
                position: 'fixed',
                width: '50px',
                height:'50px',
                bottom: '20px',
                left: 'calc(50% - 25px)',
                borderRadius: '100%',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 0.87) 0%, rgba(61, 144, 239, 0.92) 100%)',
                cursor: 'pointer'
            },
            addButtonImg: {
                width: '24px',
                height: '24px',
                margin: '13px',
                cursor: 'pointer'
            }
        }
    }, this.props, this.state)}
}
