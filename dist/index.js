import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import App from './components/App';


const main = remote.require('./main.js');


ReactDOM.render(
    <div>
        <App
            platform={main.platform}
            db={main.db}
            path={main.path}
        />
    </div>,
    document.getElementById('root')
);
