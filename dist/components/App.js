import React from 'react';
import reactCSS from 'reactcss';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Nav from './Nav';
import Preview from './Preview';
import Manage from './Manage/Manage';
import Options from './Options';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <Router>
            <div>
                <Nav/>
                <Route exact path="/" component={Preview}/>
                <Route path="/manage" component={Manage}/>
                <Route path="/options" component={Options}/>
            </div>
        </Router>
    )}

    style() {return(reactCSS({
        default: {

        }
    }, this.props, this.state))}
}
