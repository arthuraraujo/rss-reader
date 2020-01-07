import { app, BrowserWindow, session } from 'electron';
import handleContextMenu from './handleContextMenu';
import handleNewWindow from './handleNewWindow';

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: null | BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.on('new-window', handleNewWindow);
  mainWindow.webContents.on('context-menu', handleContextMenu);

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    // Modify the user agent for all requests to the following urls.
    //s1.dgtle.com/dgtle_img/article/2019/12/27/98796201912271422127325_1800_500.jpeg?imageView2/2/w/600
    // const filter = {
    //   urls: ['*://*.s1.dgtle.com.com/*'],
    // };

    // session.defaultSession.webRequest.onBeforeSendHeaders(
    //   filter,
    //   (details, callback) => {
    //     details.requestHeaders['Referer'] = 'http://s1.dgtle.com';
    //     callback({
    //       requestHeaders: details.requestHeaders,
    //     });
    //   },
    // );
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
