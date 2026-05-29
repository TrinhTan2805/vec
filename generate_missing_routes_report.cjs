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
    if (parts.length >= 8 && headerFound) {
      const ucId = parts[1].trim();
      const ucName = parts[2].trim();
      const route = parts[7].trim();
      
      if (ucId && !isNaN(parseInt(ucId))) {
        if (!route) {
          missing.push({ id: ucId, name: ucName });
        }
      }
    }
  }
}

let report = `# Danh sách các Use Case chưa có đường dẫn trên Web\n\n`;
report += `Tổng số lượng: **${missing.length}** UC chưa có đường dẫn (chưa có màn hình hoặc chưa mapping được).\n\n`;
report += `| UC ID | Tên Use Case |\n`;
report += `| --- | --- |\n`;
missing.forEach(m => {
  report += `| ${m.id} | ${m.name} |\n`;
});

fs.writeFileSync('C:\\Users\\trinh\\.gemini\\antigravity-ide\\brain\\04a2f95b-76cd-4145-8d72-2d650686c766\\missing_routes.md', report, 'utf-8');
console.log('Report generated at missing_routes.md');
