const { contextBridge, ipcRenderer } = require('electron');

// Electron API를 React에서 안전하게 사용할 수 있도록 설정
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer,
});
