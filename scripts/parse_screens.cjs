const fs = require('fs');

const srcFile = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\danhsachmanhinh.md';
let content = fs.readFileSync(srcFile, 'utf8');

// Parse the tables in danhsachmanhinh.md
// Format: | **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | ...
let lines = content.split('\n');
let screens = [];

for (let line of lines) {
    if (line.startsWith('|') && !line.includes('**STT**') && !line.includes('| :---')) {
        let cols = line.split('|').map(s => s.trim());
        if (cols.length >= 6) {
            let funcId = cols[2];
            let tenCN = cols[3];
            let code = cols[4];
            let name = cols[5];
            let process = cols[7];
            
            if (code && name) {
                screens.push({ code, name, funcId, tenCN, process });
            }
        }
    }
}

console.log("Found screens:", screens.length);
console.log("Sample:", screens[0], screens[1]);
