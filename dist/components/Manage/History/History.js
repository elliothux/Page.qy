import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../../lib/eventProxy';
import HistoryItem from './HistoryItem';


export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleViewHistory = this.handleViewHistory.bind(this);

        this.state = {
            historyContent: []
        }

    }

    componentDidMount() {
        eventProxy.on('viewHistory', function (data) {
            this.handleViewHistory(data);
        }.bind(this))
    }

    componentWillReceiveProps() {
        this.refs.container.scrollTop = 0;
    }

    handleViewHistory(data) {
        data && this.setState({
            historyContent: data
        })
    }

    render() {return(
        <div style={this.style().container} ref="container">
            <div style={this.style().titleContainer}>
                <img style={this.style().icon}
                     src={`${this.props.mainPath}/src/pic/timemachine.svg`}/>
                <h1 style={this.style().title}>TIME<br/>MACHINE</h1>
            </div>
            {this.state.historyContent.map(function (data, index) {
                return <HistoryItem
                    dataToHTML = {this.props.dataToHTML}
                    {...data}
                    key={index}
                    mainPath={this.props.mainPath}
                />
            }.bind(this))}
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                position: 'relative'
            },
            titleContainer: {
                width: '92%',
                marginLeft: '4%'
            },
            icon: {
                width: '85px',
                height: 'auto',
                margin: '30px  0 50px 0'
            },
            title: {
                textAlign: 'right',
                width: '160px',
                fontSize: '30px',
                position: 'absolute',
                top: '60px',
                letterSpacing: '0.05em'
            }
        }
    }, this.props, this.state)}
}