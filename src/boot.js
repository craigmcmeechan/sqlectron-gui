window.myremote={
    fs:require('fs'),
    path:require("path"),
    electron:require('electron'),
    csvStringify:require('csv-stringify')
    // remote:electron.remote,
    // ipcRenderer:electron.ipcRenderer,
    // shell:electron.shell,
    // webFrame:electron.webFrame,
};
window.myremote.sqlectron=require(window.myremote.path.resolve(".")+"/core/lib");
window.myremote.createLogger=require(window.myremote.path.resolve(".")+"/logger.js");
window.myremote.config = {
  get:function(arg){
    arg=true;
    return window.myremote.electron.ipcRenderer.sendSync('getconfig', arg);
  },
};
require("babel-register");
require("babel-polyfill");
require("./index_local.js");