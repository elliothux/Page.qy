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
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

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
        }.bind(this));
        eventProxy.on('checkUpdate',async function () {
            const data = await this.props.autoUpdate.check();
            if (!data) return eventProxy.trigger('message',
                this.props.config.get('language') === 'zh' ?
                    '已更新到最新版!' : 'Already Updated!');
            else this.handleUpdate(data[0], data[1])
        }.bind(this));
        this.handleUpdate();
    }

    async handleUpdate(info, path) {
        if (!info || !path)
            [info, path] = await this.props.autoUpdate.check();
        if(window.confirm(
            this.props.config.get('language') === 'zh' ?
                `Page.qy 有新版本啦! 立即安装?\n\n${info.description}` :
                `A New Version of Page.qy!\n\n${info.description}! Install Now?`
            )) {
            await this.props.autoUpdate.install(path);
            if (window.confirm(
                    this.props.config.get('language') === 'zh' ?
                        `更新完成, 是否立即重启 Page.qy ?` :
                        'Update install success! Restart Page.qy?'
                )) {
                this.props.app.relaunch();
                this.props.app.exit(0);
            }
        }
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
                dataToHTML={this.props.dataToHTML}
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
                generateHTML={this.props.dataToHTML.generateHTML}
                openURL={this.props.openURL}
                platform={this.props.platform}
                version={this.props.version}
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
