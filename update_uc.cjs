const fs = require('fs');
const content = fs.readFileSync('docs/UC.md', 'utf-8');
const lines = content.split('\n');

const targetUCs = ['121', '122', '123', '124', '125', '126', '127', '107', '108', '81', '82', '95', '101'];
const timeStr = '21:53:03'; 

let headerFound = false;

const newLines = lines.map(line => {
  if (line.trim().startsWith('|')) {
    
    // Check if it's the header row
    if (line.includes('Tên Use case') && line.includes('Đường dẫn chức năng') && !headerFound) {
      headerFound = true;
      return line.replace('Đường dẫn chức năng', 'Đường dẫn | Ngày cập nhật');
    }
    
    // Check if it's the separator row
    if (line.includes('---') && headerFound && line.match(/^\|\s*---/)) {
      return line.replace(/\|\s*$/, '') + ' --- |';
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
        if (targetUCs.includes(currentUcId)) {
          return line.replace(/\|\s*$/, '') + ` ${timeStr} |`;
        } else {
          return line.replace(/\|\s*$/, '') + '  |';
        }
      }
    }
  }
  return line;
});

fs.writeFileSync('docs/UC.md', newLines.join('\n'), 'utf-8');
console.log('UC.md updated successfully with 2 columns.');
