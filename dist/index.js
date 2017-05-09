Function.prototype.toString = Object.prototype.toString;


import React from 'react';
import ReactDOM from 'react-dom';
import { remote, shell, webFrame, ipcRenderer } from 'electron';
import App from './components/App';


const main = remote.require('./main.js');
webFrame.setVisualZoomLevelLimits(1, 1);


ReactDOM.render(
    <div>
        <App
            platform={main.platform}
            db={main.db}
            path={main.path}
            openWindow={main.openWindow}
            upload={main.upload.openWindow}
            dataToHTML={main.dataToHTML}
            config={main.config}
            theme={main.theme}
            logout={main.logout.start}
            user={main.user}
            app={remote.app}
            shell={shell}
            openURL={shell.openExternal}
        />
    </div>,
    document.getElementById('root')
);
