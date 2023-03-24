
const { app, BrowserWindow, Menu, ipcMain, shell, } = require('electron');
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 1000,
    icon: __dirname + '/images/sho-dex.ico',
    webPreferences: {
        npmpreload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
};

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('loadGH', (event, arg) => {
  shell.openExternal(arg);
});