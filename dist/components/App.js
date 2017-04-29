import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';
import Nav from './Nav';
import Preview from './Preview';
import Manage from './Manage/Manage';
import Options from './Options/Options';
import Message from "./Message";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this)

        this.state = {
            viewState: 'manage',
            config: this.props.config.get()
        }
    }

    componentWillMount() {
        eventProxy.on('setConfig', function (config) {
            this.setState({ config: config })
        }.bind(this))
    }

    handleViewChange(view) {
        this.setState({
            viewState: view
        })
    }

    render() {return (
        <div>
            <Nav
                mainView={this.state.viewState}
                config={this.props.config}
                openURL={this.props.openURL}
                handleViewChange={this.handleViewChange}
            />
            <Preview
                upload={this.props.upload}
                show={this.state.viewState === 'preview'}
            />
            <Manage
                db={this.props.db}
                mainPath={this.props.path}
                openWindow={this.props.openWindow}
                dataToHTML = {this.props.dataToHTML}
                config={this.props.config}
                formatContent={this.props.formatContent}
                show={this.state.viewState === 'manage'}
            />
            <Options
                mainPath={this.props.path}
                config={this.props.config}
                theme={this.props.theme}
                show={this.state.viewState === 'options'}
            />
            <Message/>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '100%',
                height: '100%'
            }
        }
    }, this.props, this.state))}
}
