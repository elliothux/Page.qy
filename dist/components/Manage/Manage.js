import React from 'react';
import reactCSS from 'reactcss';
import Editor from './Editor';
import Article from './Article';


export default class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().container}>
            <Article
                date="03/28/2016"
                tags={['Hello', 'JS']}
                title="Welcome to site.qy!"
                introduction="😉You just set up you’r site.qy successful! It’ quite light and easy to use. Just enjoy writing with it~"
            />
            {/*<Editor/>*/}
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: 'calc(100% - 260px)',
                marginLeft: '230px',
            }
        }
    }, this.state, this.props))}
}
