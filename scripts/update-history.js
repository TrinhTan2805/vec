import fs from 'fs';
import path from 'path';

// Construct absolute paths relative to root directory
const rootPath = path.resolve(process.cwd());
const pkgPath = path.join(rootPath, 'package.json');
const changelogPath = path.join(rootPath, 'CHANGELOG.md');
const historyPath = path.join(rootPath, 'src/deploy-history.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const version = pkg.version;
const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

let changelogContent = 'Không có nội dung thay đổi.';
if (fs.existsSync(changelogPath)) {
    const rawContent = fs.readFileSync(changelogPath, 'utf-8').trim();
    if (rawContent && rawContent.length > 0) {
        changelogContent = rawContent;
    }
}

let history = [];
if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
}

// Ensure first item isn't duplicate version
const existingIndex = history.findIndex(h => h.version === version);
if (existingIndex >= 0) {
    history[existingIndex] = { version, time: now, content: changelogContent };
} else {
    history.unshift({ version, time: now, content: changelogContent });
}

fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf-8');
console.log(`Updated deploy history for version ${version} at ${now}`);

// Append to old changelog so they know it is clean for next time
fs.writeFileSync(changelogPath, '- Ghi chú những thay đổi cho phiên bản tiếp theo tại đây...', 'utf-8');
