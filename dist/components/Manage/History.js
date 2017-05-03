import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';


export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleViewHistory = this.handleViewHistory.bind(this);

        this.state = {
            title: '',
            tags: [],
            introduction: '',
            key: '',
            historyContent: {}
        }
    }

    componentDidMount() {
        eventProxy.on('viewHistory', function (data) {
            this.handleViewHistory(data);
        }.bind(this))
    }

    handleViewHistory(data) {
        data && this.setState(data)
    }

    render() {return(
        <div style={this.style().container}>
            <h1>History</h1>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '100%',
            }
        }
    }, this.props, this.state)}
}