Object.size = function(obj) {
    let size = 0;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


import React from 'react';
import reactCSS from 'reactcss';


export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSpread = this.handleSpread.bind(this);

        this.state = {
            spread: false
        }
    }

    handleSelect(value) {
        this.props.onSelect(value);
        this.handleSpread();
    }

    handleSpread() {
        this.setState({spread: !this.state.spread})
    }

    render() {return (
        <div style={this.style().container}>
            <div style={this.style().default}>
                {this.props.selects[this.props.default]}
            </div>
            {function () {
                const selects = [];
                let index = 0;
                for (let name in this.props.selects)
                    selects.push(
                        <div
                            onClick={this.handleSelect.bind(this, name)}
                            style={Object.assign(this.style().select, {
                                transform: this.state.spread ?
                                    `translateY(${100 * ++index}%)` : 'none',
                                color: this.props.default === name ?
                                    '#42A5F0' : 'black'
                            })}
                            key={name}
                        >{this.props.selects[name]}</div>
                    )
                return selects
            }.bind(this)()}
            <div
                style={this.style().default}
                onClick={this.setState.bind(this, {spread: !this.state.spread}, () => {})}
            >
                {this.props.selects[this.props.default]}
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '100%',
                height: this.state.spread ? `${40 * (Object.size(this.props.selects) + 1)}px` : '40px',
                transition: 'all ease 200ms',
                position: 'relative',
                boxShadow: '0px 3px 10px 1px rgba(0,0,0,0.21)',
                overflow: 'hidden',
                display: 'inline-block',
                fontSize: '1em',
                fontWeight: 'Bold',
                letterSpacing: '0.05em',
                zIndex: this.state.spread ? 11 : 3,
            },
            default: {
                width: 'calc(100% - 10px)',
                height: '40px',
                lineHeight: '40px',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: 'white',
                position: 'absolute',
                top: 0, left: 0,
                borderLeft: '5px solid #42A5F0',
            },
            select: {
                width: '100%',
                height: '40px',
                lineHeight: '40px',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'absolute',
                top: 0, left: 0,
                transition: 'all ease 300ms',
                backgroundColor: 'white'
            }
        }
    }, this.props, this.state)}
}