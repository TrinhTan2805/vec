const fs = require('fs');

const dashboard = fs.readFileSync('src/app/components/layout/DashboardLayout.tsx', 'utf-8');
const ucMd = fs.readFileSync('docs/UC.md', 'utf-8');

const routeMap = [];

// 1. Extract from nav items
const navRegex = /title:\s*"([^"]+)",\s*icon:[^,]+,\s*href:\s*"([^"]+)"/g;
let match;
while ((match = navRegex.exec(dashboard)) !== null) {
  routeMap.push({ title: match[1].toLowerCase(), href: match[2] });
}

// 2. Extract from getPageTitle
const titleRegex = /if\s*\(path\.includes\("([^"]+)"\)\)\s*return\s*"([^"]+)";/g;
while ((match = titleRegex.exec(dashboard)) !== null) {
  const p = match[1].startsWith('/') ? match[1] : '/' + match[1];
  routeMap.push({ title: match[2].toLowerCase(), href: p });
}

// 3. Explicit map for specific IDs
const explicitMap = {
  '121': '/tai-san/kiem-ke', '122': '/tai-san/kiem-ke', '123': '/tai-san/kiem-ke', '124': '/tai-san/kiem-ke', '125': '/tai-san/kiem-ke', '126': '/tai-san/kiem-ke', '127': '/tai-san/kiem-ke',
  '107': '/tai-san/thiet-bi-van-phong', '108': '/he-thong/cau-hinh-canh-bao',
  '81': '/phu-tro/dat-ha-tang', '82': '/duong-bo/duong-gom',
  '95': '/tai-san/phuong-tien-di-lai', '101': '/tai-san/thiet-bi-om',
  '1': '/admin/tai-khoan', '2': '/he-thong/cau-hinh',
  '3': '/', '4': '/admin/tai-khoan', '5': '/admin/tai-khoan', '6': '/admin/timeout'
};

const lines = ucMd.split('\n');
let headerFound = false;

const newLines = lines.map(line => {
  if (line.trim().startsWith('|')) {
    
    // Header
    if (line.includes('Tên Use case') && line.includes('Phân loại theo độ phức tạp') && !headerFound) {
      headerFound = true;
      // Make sure we have exactly 8 columns (1-TT, 2-Tên, 3-Tác nhân, 4-GD, 5-BMT, 6-Phức tạp, 7-Đường dẫn, 8-Ngày)
      // The current header ends with | Ngày cập nhật |
      return line;
    }
    
    // Separator
    if (line.includes('---') && headerFound && line.match(/^\|\s*---/)) {
      return line;
    }
    
    // Data rows
    const parts = line.split('|');
    if (parts.length > 2 && headerFound && !line.includes('---')) {
      const ucId = parts[1].trim();
      const ucName = parts[2].trim().toLowerCase();
      
      let href = null;
      let date = ' ';
      
      if (ucId && explicitMap[ucId]) {
        href = explicitMap[ucId];
        if (['121','122','123','124','125','126','127','107','108','81','82','95','101'].includes(ucId)) {
          date = '21:53:03';
        }
      } else if (ucName) {
        // Try to fuzzy match
        for (const item of routeMap) {
          if (ucName.includes(item.title) || item.title.includes(ucName)) {
            href = item.href;
            break;
          }
        }
      }
      
      // Build row
      // Remove the last 2 cells (which are empty or have old links) and reconstruct
      // The split will have parts based on number of pipes.
      // Expected: | TT | Tên | Tác nhân | GD | BMT | Phức tạp | Đường dẫn | Ngày |
      // So parts length is 10 (empty start, 8 cols, empty end)
      
      // Let's just slice first 7 parts (indices 0 to 6) which corresponds to up to "Phức tạp"
      const baseRow = parts.slice(0, 7).join('|');
      
      const routeCell = href ? ` http://localhost:4000${href} ` : ' ';
      const dateCell = ` ${date} `;
      
      return `${baseRow}|${routeCell}|${dateCell}|`;
    }
  }
  return line;
});

fs.writeFileSync('docs/UC.md', newLines.join('\n'), 'utf-8');
console.log('UC.md fully updated with http://localhost:4000 links.');
