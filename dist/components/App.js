import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';
import Nav from './Nav';
import Preview from './Preview';
import Manage from './Manage/Manage';
import Options from './Options/Options';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);

        this.state = {
            viewState: 'options',
            config: {}
        }
    }

    componentWillMount() {
        this.setState({ config: this.props.config });
        eventProxy.on('setConfig', function (config) {
            this.setState({ config: config })
        }.bind(this))
    }

    componentDidMount() {
        eventProxy.on('changeMainView', (view) => {
            this.setState({ viewState: view });
            this.style = this.style.bind(this);
        })
    }

    render() {return (
        <div>
            <Nav
                mainView={this.state.viewState}
                config={this.state.config}
                openURL={this.props.openURL}
            />
            <div style={this.style().previewContainer}>
                <Preview upload={this.props.upload}/>
            </div>
            <div style={this.style().manageContainer}>
                <Manage
                    db={this.props.db}
                    mainPath={this.props.path}
                    openWindow={this.props.openWindow}
                    dataToHTML = {this.props.dataToHTML}
                    config={this.state.config}
                />
            </div>
            <div style={this.style().optionsContainer}>
                <Options
                    mainPath={this.props.path}
                    config={this.state.config}
                    setConfig={this.props.setConfig}
                    theme={this.props.theme}
                />
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: '100%',
                height: '100%'
            },
            previewContainer: {
                width: 'calc(100% - 200px)',
                height: '100%',
                position: 'fixed',
                overflow: 'auto',
                top: 0, left: '200px',
                transform: `translateY(
                    ${this.state.viewState === 'preview' ?
                    0 : '100%'
                })`,
                transition: 'all ease 700ms'
            },
            manageContainer: {
                width: 'calc(100% - 200px)',
                height: '100%',
                position: 'fixed',
                overflow: 'auto',
                top: 0, left: '200px',
                transform: `translateY(
                    ${this.state.viewState === 'manage' ?
                    0 : '100%'
                    })`,
                transition: 'all ease 700ms'
            },
            optionsContainer: {
                width: 'calc(100% - 200px)',
                height: '100%',
                position: 'fixed',
                overflow: 'auto',
                top: 0, left: '200px',
                transform: `translateY(
                    ${this.state.viewState === 'options' ?
                    0 : '100%'
                    })`,
                transition: 'all ease 700ms'
            }
        }
    }, this.props, this.state))}
}
