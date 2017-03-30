import React from 'react';
import reactCSS from 'reactcss';
import Nav from './Nav';
import Manage from './Manage/Manage';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div>
            <Nav/>
            <Manage/>
        </div>
    )}

    style() {return(reactCSS({
        default: {

        }
    }, this.props, this.state))}
}
