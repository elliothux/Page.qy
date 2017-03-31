import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';
import Nav from './Nav';
import Preview from './Preview';
import Manage from './Manage/Manage';
import Options from './Options';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);

        this.state = {
            viewState: 'manage'
        }
    }

    componentDidMount() {
        eventProxy.on('changeMainView', (view) => {
            this.setState({ viewState: view });
            this.style = this.style.bind(this);
        })
    }

    render() {return (
        <div>
            <Nav mainView={this.state.viewState}/>
            <div style={this.style().previewContainer}>
                <Preview/>
            </div>
            <div style={this.style().manageContainer}>
                <Manage
                    db={this.props.db}
                    mainPath={this.props.path}
                />
            </div>
            <div style={this.style().optionsContainer}>
                <Options/>
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
