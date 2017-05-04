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
                const date = this.props.dataToHTML.formatDate(this.props.editDate);
                return <div style={this.style().dateArea}>
                    <span style={this.style().dateDate}>{date.date}</span>
                    <span style={this.style().dateMonth}>{date.month}</span>
                    <span style={this.style().dateYear}>{date.year}</span>
                    <span style={this.style().dateTime}>{date.hours} : {date.minutes}</span>
                    <span style={this.style().dateDay}>{date.day}</span>
                </div>
            }.bind(this)()}
            <div style={this.style().contentArea}>
                <div style={this.style().content}>
                    <ul style={this.style().tags}>
                        {this.props.tags && this.props.tags.map((tag, index) => (
                            <li style={this.style().tag} key={index}>
                                <img
                                    style={this.style().tagImage}
                                    src={`${this.props.mainPath}/src/pic/tag.svg`}
                                />
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <p style={this.style().title}>
                        {this.props.title === '' ?
                            (this.props.language === 'zh' ?
                                '未命名文章' : 'Untitled Article') : this.props.title}
                    </p>
                    <p style={this.style().introduction}>{this.props.introduction}</p>
                    <div style={this.style().changedContainer}>
                        <img
                            style={this.style().changedImage}
                            src={`${this.props.mainPath}/src/pic/changed.svg`}
                        />
                        <span style={this.style().changedText}>
                            {this.props.language === 'zh' ? '更改项:' : 'CHANGED:'}
                        </span>
                        <ul style={this.style().changed}>
                            {this.props.changed.map((changed, index) => {
                                switch (changed) {
                                    case 'content': return <li
                                        style={this.style().changedItem}
                                        key={index}>
                                        {this.props.language === 'zh' ? '内容' : 'CONTENT'}
                                    </li>;
                                    case 'tags': return <li
                                        style={this.style().changedItem}
                                        key={index}>
                                        {this.props.language === 'zh' ? '标签' : 'TAGS'}
                                    </li>;
                                    case 'title': return <li
                                        style={this.style().changedItem}
                                        key={index}>
                                        {this.props.language === 'zh' ? '标题' : 'TITLE'}
                                    </li>;
                                    default: return false;
                                }
                            })}
                        </ul>
                    </div>
                </div>
                {function () {
                    const container = document.createElement('div');
                    container.innerHTML = this.props.content;
                    const imgs = container.getElementsByTagName('img');
                    if (imgs.length > 0)
                        return <img style={this.style().cover} src={imgs[0].src}/>;
                    return false
                }.bind(this)()}
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
                position: 'relative',
                color: 'rgba(0, 0, 0, 0.9)',
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
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative',
                fontFamily: '宋体',
                color: 'rgba(0, 0, 0, 0.9)',
                wordBreak: 'break-world',
            },
            tags: {
                margin: '15px 0px 8px',
                listStyle: 'none',
                fontSize: '1.1em'
            },
            tagImage: {
                height: '13px',
                width: 'auto',
                marginRight: '5px',
                position: 'relative',
                top: '1px',
            },
            tag: {
                display: 'inline-block',
                marginRight: '16px',
                fontSize: '1em'
            },
            content: {
                paddingRight: '50px'
            },
            title: {
                fontSize: '2.2em',
                fontWeight: 'bold',
                marginBottom: '8px'
            },
            introduction: {
                fontSize: '1.1em',
                marginBottom: '15px',
                letterSpacing: '0.03em'
            },
            changedContainer: {
                fontFamily: '-apple-system, system-ui, "Microsoft YaHei UI","Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                marginBottom: '15px',
                fontSize: '0.9em',
                letterSpacing: '0.05em'
            },
            changedImage: {
                height: '18px',
                width: 'auto',
                marginRight: '6px',
                position: 'relative',
                top: '2px'
            },
            changedText: {
                marginRight: '18px',
                letterSpacing: '0.05em',
                fontWeight: 'bold'
            },
            changed: {
                display: 'inline-block'
            },
            changedItem: {
                listStyle: 'none',
                backgroundImage: 'linear-gradient(90deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                display: 'inline-block',
                padding: '5px 15px',
                borderRadius: '25px',
                color: 'white',
                marginRight: '8px',
                boxShadow: '0px 3px 15px 0px rgba(0,0,0,0.25)'
            },
            cover: {
                height: '100%',
                width: 'auto'
            }
        }
    }, this.props, this.state)}
}
