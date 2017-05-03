import React from 'react';
import reactCSS from 'reactcss';


export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <div>
                {/*{this.props.dataToHTML.formatDate(this.props.data.)}*/}
            </div>
            <p>{this.props.data.content}</p>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: 'calc(92% - 36px)',
                height: 'auto',
                margin: '0 4% 50px 4%',
                padding: '15px 18px',
                backgroundColor: 'white',
                boxShadow: '0px 5px 21px 0px rgba(0,0,0,0.31)',
                wordBreak: 'break-all'
            }
        }
    }, this.props, this.state)}
}
