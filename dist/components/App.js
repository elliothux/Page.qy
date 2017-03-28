import React from 'react';
import reactCSS from 'reactcss';
import Edit from './Edit';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div>
            <Edit/>
        </div>
    )}

    style() {return(reactCSS({
        default: {

        }
    }, this.props, this.state))}
}