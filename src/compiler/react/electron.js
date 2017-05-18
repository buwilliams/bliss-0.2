//const {app, BrowserWindow, Menu} = require('electron');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const path = require('path');
const url = require('url');
const low = require('lowdb');
const server = require('./server.js');
const file = require('./core/file.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let port
let workspace

function createWindow(port) {

  win = new BrowserWindow({
    title: "Bliss",
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true
  });

  var url = `http://127.0.0.1:${port}/bliss.html`;
  console.log(`Opening url: ${url}`)
  win.loadURL(url);

  // Open the DevTools.
  //win.webContents.openDevTools();

  var template = [
    {
      label: "Application",
      submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]
    }, {
      label: "Edit",
      submenu: [
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    }, {
      label: "View",
      submenu: [
        { role: 'toggledevtools' }
      ]

    }
  ];

  win.webContents.on('context-menu', (e, props) => {
    const InputMenu = Menu.buildFromTemplate([
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectall' }
    ]);
    const { inputFieldType } = props;
    if (inputFieldType === 'plainText') {
      InputMenu.popup(win);
    }
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function init() {
  var defaultUserData = path.join(app.getPath("appData"), 'bliss.json');
  var defaultPort = '3456';
  var defaultWorkspace = path.join(app.getPath("home"), "bliss");

  const db = low(defaultUserData);
  db.defaults({ port: defaultPort, workspace: defaultWorkspace}).write();

  var options = {
    port: db.get('port').value(),
    workspace: db.get('workspace').value(),
    app: path.join(__dirname, '..', '..', '..', 'build', 'bliss'),
    node_modules: path.join(__dirname, '..', '..', '..', 'node_modules')
  };

  console.log(`App settings path: ${app.getPath("appData")}`);

  file.createWorkspace(options.workspace);
  console.log(`Using workspace: ${options.workspace}`);

  server(options);

  return options;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  var options = init();
  createWindow(options.port);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
