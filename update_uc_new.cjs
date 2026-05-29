const fs = require('fs');
const content = fs.readFileSync('docs/UC.md', 'utf-8');
const lines = content.split('\n');

const timeStr = '21:53:03'; 

const routeMapping = {
  '121': '/tai-san/kiem-ke',
  '122': '/tai-san/kiem-ke',
  '123': '/tai-san/kiem-ke',
  '124': '/tai-san/kiem-ke',
  '125': '/tai-san/kiem-ke',
  '126': '/tai-san/kiem-ke',
  '127': '/tai-san/kiem-ke',
  '107': '/tai-san/thiet-bi-van-phong',
  '108': '/he-thong/cau-hinh-canh-bao',
  '81': '/phu-tro/dat-ha-tang',
  '82': '/duong-bo/duong-gom',
  '95': '/tai-san/phuong-tien-di-lai',
  '101': '/tai-san/thiet-bi-om',
};

let headerFound = false;

const newLines = lines.map(line => {
  if (line.trim().startsWith('|')) {
    
    // Check if it's the header row
    if (line.includes('Tên Use case') && line.includes('Phân loại theo độ phức tạp') && !headerFound) {
      headerFound = true;
      return line.replace(/\|\s*$/, '') + ' | Đường dẫn | Ngày cập nhật |';
    }
    
    // Check if it's the separator row
    if (line.includes('---') && headerFound && line.match(/^\|\s*---/)) {
      return line.replace(/\|\s*$/, '') + ' | --- | --- |';
    }
    
    // Regular row
    const parts = line.split('|');
    if (parts.length > 2) {
      const ucIdPart = parts[1].trim();
      let currentUcId = null;
      if (ucIdPart && !isNaN(parseInt(ucIdPart))) {
        currentUcId = ucIdPart;
      }
      
      // Some rows might not have an ID (e.g., continuation rows or sub-modules)
      // but they are still table rows.
      if (headerFound && !line.includes('---')) {
        if (routeMapping[currentUcId]) {
          return line.replace(/\|\s*$/, '') + ` | ${routeMapping[currentUcId]} | ${timeStr} |`;
        } else {
          return line.replace(/\|\s*$/, '') + ' | | |';
        }
      }
    }
  }
  return line;
});

fs.writeFileSync('docs/UC.md', newLines.join('\n'), 'utf-8');
console.log('UC.md updated successfully with properly formatted Đường dẫn and Ngày cập nhật columns.');
