const fs = require('fs');
const destFile = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\tailieuphantich\\dactayeucau\\motagiaodien.md';

let content = fs.readFileSync(destFile, 'utf8');
let imgCount = 1;

content = content.replace(/\*Hình - (.*?)\*/g, (match, p1) => {
    return `*Hình ${imgCount++} - ${p1}*`;
});

fs.writeFileSync(destFile, content, 'utf8');
console.log('Fixed Image Captions. Total images numbered:', imgCount - 1);
