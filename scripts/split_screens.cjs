const fs = require('fs');
const path = require('path');

const filePath = 'e:/GiaoThongHaNoi/vec/tailieu/tailieuphantich/DanhSachManHinh_Web.md';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split(/\r?\n/);

let headerText = '';
let tableHeader = '';
let tableDelimiter = '';
let dataRows = [];

let tableStartIdx = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('| STT |')) {
        tableStartIdx = i;
        break;
    }
}

if (tableStartIdx !== -1) {
    headerText = lines.slice(0, tableStartIdx).join('\n').trim();
    tableHeader = lines[tableStartIdx];
    tableDelimiter = lines[tableStartIdx + 1];
    dataRows = lines.slice(tableStartIdx + 2).filter(line => line.trim().startsWith('|'));
}

const groups = {};

dataRows.forEach(row => {
    const cols = row.split('|').map(s => s.trim());
    if (cols.length >= 9) {
        const maQuyTrinh = cols[6]; 
        const tenQuyTrinh = cols[7]; 
        if (!maQuyTrinh) return;
        
        let safeName = `${maQuyTrinh}`.trim();
        if (!groups[safeName]) {
            groups[safeName] = {
                ten: tenQuyTrinh,
                rows: []
            };
        }
        groups[safeName].rows.push(row);
    }
});

const outDir = 'e:/GiaoThongHaNoi/vec/tailieu/tailieuphantich/DanhSachManHinh_Web_TheoChucNang';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

for (const [maQuyTrinh, data] of Object.entries(groups)) {
    let outContent = headerText + '\n\n';
    outContent += `## ${maQuyTrinh} - ${data.ten}\n\n`;
    outContent += tableHeader + '\n';
    outContent += tableDelimiter + '\n';
    // Recalculate STT
    const renumberedRows = data.rows.map((row, index) => {
        const cols = row.split('|');
        // STT is at index 1
        cols[1] = ` ${index + 1} `;
        return cols.join('|');
    });
    
    outContent += renumberedRows.join('\n') + '\n';
    
    fs.writeFileSync(path.join(outDir, `DanhSachManHinh_Web_${maQuyTrinh}.md`), outContent, 'utf-8');
}
console.log('Done splitting! into ' + outDir);
