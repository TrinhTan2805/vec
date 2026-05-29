const fs = require('fs');
const content = fs.readFileSync('docs/UC_web.md', 'utf-8');
const lines = content.split('\n');

const missing = [];
let headerFound = false;

for (const line of lines) {
  if (line.trim().startsWith('|')) {
    if (line.includes('Tên Use case')) {
      headerFound = true;
      continue;
    }
    if (line.includes('---') && headerFound) {
      continue;
    }
    
    const parts = line.split('|');
    // Expected structure: | TT | Tên | Tác nhân | GD | BMT | Phức tạp | Đường dẫn | Ngày |
    if (parts.length >= 8 && headerFound) {
      const ucId = parts[1].trim();
      const ucName = parts[2].trim();
      const route = parts[7].trim();
      
      // Only check main UC rows (have a numeric TT)
      if (ucId && !isNaN(parseInt(ucId))) {
        if (!route) {
          missing.push({ id: ucId, name: ucName });
        }
      }
    }
  }
}

console.log(`Total missing: ${missing.length}`);
missing.forEach(m => console.log(`- UC ${m.id}: ${m.name}`));
