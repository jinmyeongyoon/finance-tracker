const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// 데이터 파일 경로 설정
const dataFilePath = path.join(app.getPath('userData'), 'data.json');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // preload.js 파일 경로
      contextIsolation: true, // contextIsolation 활성화
      nodeIntegration: false, // 보안상 nodeIntegration 비활성화
    }
  });

  // React 개발 서버 연결 (개발용)
  mainWindow.loadURL('http://localhost:3000');

  // React 빌드 파일 로드 (프로덕션용)
  mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

  // 프로그램 시작 시 데이터 로드
  ipcMain.handle('load-data', () => {
    if (fs.existsSync(dataFilePath)) {
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(rawData); // 데이터를 JSON 객체로 변환하여 React로 반환
    }
    return []; // 데이터 파일이 없으면 빈 배열 반환
  });

  // 프로그램 종료 전 데이터 저장
  ipcMain.on('save-data', (_, data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8'); // JSON 파일로 저장
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
