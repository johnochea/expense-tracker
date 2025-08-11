const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        title: 'The Council\'s Expense Tracker',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));

    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                { role: 'reload' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Navigate',
            submenu: [
                {
                    label: 'Home',
                    click: () => win.webContents.send('navigate', '/')
                },
                {
                    label: 'About',
                    click: () => win.webContents.send('navigate', '/about')
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal('https://electronjs.org');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});