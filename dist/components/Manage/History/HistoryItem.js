import React from 'react';
import reactCSS from 'reactcss';


export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            {function () {
                const date = this.props.dataToHTML.formatDate(this.props.data.date);
                return <div style={this.style().dateArea}>
                    <span style={this.style().dateDate}>{date.date}</span>
                    <span style={this.style().dateMonth}>{date.month}</span>
                    <span style={this.style().dateYear}>{date.year}</span>
                    <span style={this.style().dateTime}>{date.hours} : {date.minutes}</span>
                    <span style={this.style().dateDay}>{date.day}</span>
                </div>
            }.bind(this)()}
            <div style={this.style().contentArea}>
                <div>
                    <ul style={this.style().tags}>
                        {this.props.data.tags && this.props.data.tags.map((tag, index) => (
                            <li style={this.style().tag} key={index}>
                                <img
                                    style={this.style().tagImage}
                                    src={`${this.props.mainPath}/src/pic/tag.svg`}
                                />
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <p>
                        {function () {
                            let container = document.createElement('div');
                            container.innerHTML = this.props.data.content;
                            return container.innerText.slice(0, 150) + '......';
                        }.bind(this)()}
                    </p>
                </div>
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
                width: '94%',
                height: 'auto',
                margin: '0 3% 50px 3%',
                backgroundColor: 'white',
                boxShadow: '0px 5px 21px 0px rgba(0,0,0,0.31)',
                wordBreak: 'break-all',
                display: 'flex',
                justifyContent: 'space-between',
                overflow: 'hidden'
            },
            dateArea: {
                width: '120px',
                height: '150px',
                display: 'inline-block',
                fontFamily: 'DIN Condensed',
                fontWeight: 'bold',
                position: 'relative'
            },
            dateDate: {
                position: 'absolute',
                top: '15px',
                left: '15px',
                fontSize: '70px'
            },
            dateMonth: {
                position: 'absolute',
                top: '25px',
                left: '75px',
                fontSize: '30px'
            },
            dateYear: {
                position: 'absolute',
                top: '55px',
                left: '75px',
                fontSize: '20px'
            },
            dateTime: {
                position: 'absolute',
                top: '77px',
                left: '18px',
                fontSize: '22px'
            },
            dateDay: {
                position: 'absolute',
                top: '98px',
                left: '19px',
                fontSize: '15px'
            },
            contentArea: {
                width: 'calc(95% - 120px)',
                minHeight: '150px',
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                overflow: 'hidden',
                position: 'relative',
            },
            tags: {
                margin: '8px 0 6px 0',
                listStyle: 'none'
            },
            tagImage: {
                height: '13px',
                width: 'auto',
                marginRight: '6px',
                position: 'relative',
                top: '1px',
            },
            tag: {
                display: 'inline-block',
                marginRight: '10px',
                fontSize: '1em'
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
