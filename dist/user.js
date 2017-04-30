Function.prototype.toString = Object.prototype.toString;


import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import { remote } from 'electron';
import Login from './components/Login';


const user = remote.require('./main.js').user;
const config = remote.require('./main.js').config.get();
const quit = remote.app.quit;



class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.state = {
            status: 'failed'
        }
    }

    render() {return (
        <div>
            <Login
                status={this.state.status}
                user={user}
                language={config.language}
                quit={quit}
            />
        </div>
    )}

    style() {return reactCSS({
        default: {

        }
    }, this.state, this.props)}
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
