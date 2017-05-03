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
            historyContent: {}
        }
    }

    componentDidMount() {
        eventProxy.on('viewHistory', function (data) {
            this.handleViewHistory(data);
        }.bind(this))
    }

    handleViewHistory(data) {
        data && this.setState({
            historyContent: data
        })
    }

    render() {return(
        <div style={this.style().container}>
            <img style={this.style().icon}
                 src={`${this.props.mainPath}/src/pic/timemachine.svg`}/>
            <h1 style={this.style().title}>TIME<br/>MACHINE</h1>
            {function () {
                const res = [];
                for (let history in this.props.historyContent)
                    res.push(
                        <HistoryItem
                            data={this.props.historyContent[history]}
                            key={history} date={history}
                        />);
                return res;
            }.bind(this)()}
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '100%',
            },
            icon: {
                width: '85px',
                height: 'auto',
                marginTop: '30px'
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