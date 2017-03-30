import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import App from './components/App';


ReactDOM.render(
    <div>
        <App
            // platform={remote.platform}
            // db={platform.db}
        />
    </div>,
    document.getElementById('root')
);

// console.log(db);