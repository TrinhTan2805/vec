const fs = require('fs');
const file = 'd:/GiaoThongHaNoi/vec/src/app/components/layout/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

const assetStrStart = content.indexOf(`  {\n    title: "Quản lý tài sản trên đường cao tốc",`);
const maintainStrStart = content.indexOf(`  {\n    title: "Quản lý bảo trì, bảo dưỡng",`);
const monitorStrStart = content.indexOf(`  {\n    title: "Giám sát hoạt động vận hành và bảo trì, bảo dưỡng",`);

const prefix = content.substring(0, assetStrStart);
const assetObj = content.substring(assetStrStart, maintainStrStart);
const maintainObj = content.substring(maintainStrStart, monitorStrStart);
const suffix = content.substring(monitorStrStart);

content = prefix + maintainObj + assetObj + suffix;
fs.writeFileSync(file, content);
