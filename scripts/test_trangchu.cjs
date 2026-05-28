const fs = require('fs');
const content = fs.readFileSync('e:/GiaoThongHaNoi/vec/tailieu/tailieuphantich/DanhSachManHinh_Web.md', 'utf-8');
const rs = content.split('\n').filter(l => l.toLowerCase().includes('trang chủ') || l.toLowerCase().includes('dashboard'));
console.log('Found ' + rs.length + ' lines with Trang chủ/Dashboard:');
if (rs.length > 0) console.log(rs.slice(0, 5).join('\n'));
