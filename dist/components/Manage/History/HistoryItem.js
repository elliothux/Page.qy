import React from 'react';
import reactCSS from 'reactcss';


export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <div style={this.style().dateArea}>
                {this.props.dataToHTML.formatDate(this.props.data.date).day}
            </div>
            <div style={this.style().contentArea}>
                <p>
                    {function () {
                        let container = document.createElement('div');
                        container.innerHTML = this.props.data.content;
                        return container.innerText.slice(0, 150) + '......';
                    }.bind(this)()}
                </p>
                <div style={this.style().coverContainer}>
                    {function () {
                        const container = document.createElement('div');
                        container.innerHTML = this.props.data.content;
                        const imgs = container.getElementsByTagName('img');
                        if (imgs.length > 0)
                            return <img style={this.style().cover} src={imgs[0].src}/>;
                        return false
                    }.bind(this)()}
                </div>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '92%',
                height: 'auto',
                margin: '0 4% 50px 4%',
                backgroundColor: 'white',
                boxShadow: '0px 5px 21px 0px rgba(0,0,0,0.31)',
                wordBreak: 'break-all',
            },
            dateArea: {
                width: '100px',
                height: '100%',
                backgroundColor: 'red',
                display: 'inline-block',
                padding: '18px 0 18px 20px'
            },
            contentArea: {
                width: 'calc(100% - 170px)',
                marginLeft: '50px',
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'green'
            },
            coverContainer: {
                height: '100%',
                maxWidth: '50%',
                overflow: 'hidden',
                textAlign: 'center',
                position: 'absolute',
                right: 0
            },
            cover: {
                height: '100%',
                width: 'auto'
            }
        }
    }, this.props, this.state)}
}
