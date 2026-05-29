const fs = require('fs');
const file = 'd:/GiaoThongHaNoi/vec/src/app/components/layout/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Phân hệ /g, '');

fs.writeFileSync(file, content);
