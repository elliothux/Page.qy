import React from 'react';
import reactCSS from 'reactcss';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div>
            <img src="../../src/pic/head.png"/>
            <div>
                <div/>
                <p>HuQingyang</p>
                <p>huqingyang.github.io</p>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {

        }
    }, this.props, this.state))}
}
