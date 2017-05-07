import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';
import Nav from './Nav';
import Preview from './Preview';
import Manage from './Manage/Manage';
import Options from './Options/Options';
import Message from "./Common/Message";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this)

        this.state = {
            viewState: this.props.config.get().initView,
            config: this.props.config.get(),
            miniNav: this.props.config.get().miniNav
        }
    }

    componentDidMount() {
        eventProxy.on('setConfig', function (config) {
            this.setState({ config: config })
        }.bind(this));
        eventProxy.on('miniNav', function (value) {
            this.setState({ miniNav: value })
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
                miniNav={this.state.miniNav}
                user={this.props.user}
                shell={this.props.shell}
                app={this.props.app}
                dataToHTML = {this.props.dataToHTML}
            />
            <Preview
                upload={this.props.upload}
                show={this.state.viewState === 'preview'}
                config={this.props.config}
                miniNav={this.state.miniNav}
            />
            <Manage
                db={this.props.db}
                mainPath={this.props.path}
                openWindow={this.props.openWindow}
                dataToHTML = {this.props.dataToHTML}
                config={this.props.config}
                show={this.state.viewState === 'manage'}
                miniNav={this.state.miniNav}
            />
            <Options
                db={this.props.db}
                mainPath={this.props.path}
                config={this.props.config}
                theme={this.props.theme}
                show={this.state.viewState === 'options'}
                logout={this.props.logout}
                miniNav={this.state.miniNav}
                reGenerateAll={this.props.dataToHTML.reGenerateAll}
                openURL={this.props.openURL}
                platform={this.props.platform}
            />
            <Message miniNav={this.state.miniNav}/>
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
