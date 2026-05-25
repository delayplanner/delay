const { app, BrowserWindow } = require("electron");
const path = require("path");

const DEV_URL = "http://localhost:3000";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isProd = app.isPackaged;

  if (isProd) {
    win.loadURL(DEV_URL);
  } else {
    win.loadURL(DEV_URL);
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
