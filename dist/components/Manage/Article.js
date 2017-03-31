import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';


export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleEditArticle = this.handleEditArticle.bind(this);

        this.state = {
            date: this.props.data.createDate,
            tags: this.props.data.tags,
            title: this.props.data.title,
            content: this.props.data.content,
            key: this.props.data.key
        }
    }

    componentWillMount() {
        eventProxy.on('updateArticleData', function (data) {
            if (data.key !== this.state.key) return;
            this.setState(data)
        }.bind(this))
    }

    handleEditArticle() {
        eventProxy.trigger('editArticle', this.props.data);
    }

    render() {return(
        <div style={this.style().container} className="articleContainer">
            <div
                ref="contentContainer"
                style={this.style().contentContainer}
            >
                <p style={this.style().date}>{this.state.date}</p>
                {this.state.tags && this.state.tags.map((tag, index) => (
                    <p
                        style={this.style().tags}
                        key={index}
                    >#{tag}</p>
                ))}
                <p style={this.style().title}>{this.state.title}</p>
                <div dangerouslySetInnerHTML={{
                    __html: this.state.content.split('<p><br></p>').join('')
                }}/>
            </div>
            <div
                ref="operateContainer"
                style={this.style().operateContainer}
                className="articleOperateContainer"
            >
                <div
                    onClick={this.handleEditArticle}
                    style={this.style().operateButton}
                >
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + '/src/pic/editOperate.svg'}
                    />
                    <p style={this.style().operateButtonText}>EDIT</p>
                </div>
                <div style={this.style().operateButton}>
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + "/src/pic/previewOperate.svg"}
                    />
                    <p style={this.style().operateButtonText}>PREVIEW</p>
                </div>
                <div style={this.style().operateButton}>
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + "/src/pic/uploadOperate.svg"}
                    />
                    <p style={this.style().operateButtonText}>UPLOAD</p>
                </div>
                <div style={this.style().operateButton}>
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath + "/src/pic/historyOperate.svg"}
                    />
                    <p style={this.style().operateButtonText}>HISTORY</p>
                </div>
                <div style={this.style().operateButton}>
                    <img
                        style={this.style().operateButtonImg}
                        src={this.props.mainPath +"/src/pic/deleteOperate.svg"}
                    />
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
                margin: '80px 0 60px 5%',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 20px 5px'
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
                height: '100%',
                position: 'absolute',
                top: 0, left: 0,
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 0.87) 0%, rgba(61, 144, 239, 0.92) 100%)',
            },
            operateButton: {
                width: '16%',
                height: '100%',
                display: 'inline-flex',
                margin: '0 2%',
                flexDirection: 'column',
                justifyContent: 'space-around',
                justifyItems: 'center',
                cursor: 'pointer'
            },
            operateButtonImg: {
                width: 'auto',
                height: '35px',
                cursor: 'pointer'
            },
            operateButtonText: {
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer'
            }
        }
    }, this.props, this.state)}
}