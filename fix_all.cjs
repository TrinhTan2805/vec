const fs = require('fs');

// 1. Fix routes.tsx
let routesContent = fs.readFileSync('src/app/routes.tsx', 'utf8');
const lines = routesContent.split('\n');

// Find the second 'import { createBrowserRouter } from "react-router";'
let firstIndex = -1;
let secondIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('import { createBrowserRouter } from "react-router";')) {
    if (firstIndex === -1) {
      firstIndex = i;
    } else {
      secondIndex = i;
      break;
    }
  }
}

if (firstIndex !== -1 && secondIndex !== -1) {
  // Delete lines from firstIndex to secondIndex - 1
  lines.splice(firstIndex, secondIndex - firstIndex);
  routesContent = lines.join('\n');
}

// Add missing imports back
const missingImports = `import CotGPMB from "./pages/phu-tro/CotGPMB";
import HangRaoBaoVe from "./pages/phu-tro/HangRaoBaoVe";
import HangRaoChongChoi from "./pages/phu-tro/HangRaoChongChoi";`;

if (!routesContent.includes('import CotGPMB')) {
  routesContent = routesContent.replace('import HeThongChieuSang', missingImports + '\nimport HeThongChieuSang');
}

fs.writeFileSync('src/app/routes.tsx', routesContent);
console.log('Fixed routes.tsx');

// 2. Fix MaintenanceTaskDashboard.tsx
let taskContent = fs.readFileSync('src/app/pages/maintain/MaintenanceTaskDashboard.tsx', 'utf8');
taskContent = taskContent.replace(
  '<button className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">',
  '<button title="Tùy chọn" aria-label="Tùy chọn" className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">'
);
fs.writeFileSync('src/app/pages/maintain/MaintenanceTaskDashboard.tsx', taskContent);
console.log('Fixed MaintenanceTaskDashboard.tsx');

// 3. Fix MaintenanceReports.tsx
let reportContent = fs.readFileSync('src/app/pages/maintain/MaintenanceReports.tsx', 'utf8');
// Fix inline style width
reportContent = reportContent.replace(/style=\{\{ width: \`\$\{route\.done\}%\` \}\}/g, 'className={`w-[${route.done}%]`}');
// Wait, Tailwind won't compile dynamic w-[85%] if it's not statically analyzable. 
// Since it's mock data, let's hardcode a map or just replace the mock data to include the exact class.
reportContent = reportContent.replace(
  'done: 85 },',
  'done: 85, widthClass: "w-[85%]" },'
).replace(
  'done: 65 },',
  'done: 65, widthClass: "w-[65%]" },'
).replace(
  'done: 92 },',
  'done: 92, widthClass: "w-[92%]" },'
).replace(
  'done: 70 },',
  'done: 70, widthClass: "w-[70%]" },'
).replace(
  'done: 40 },',
  'done: 40, widthClass: "w-[40%]" },'
);
reportContent = reportContent.replace(
  '<div className="h-full bg-indigo-500 rounded-full" style={{ width: `${route.done}%` }}></div>',
  '<div className={`h-full bg-indigo-500 rounded-full ${route.widthClass}`}></div>'
);

// Fix pie chart inline style
const oldPieChart = `style={{
                  borderTopColor: '#10b981', // emerald-500 (Tốt - 60%)
                  borderRightColor: '#10b981',
                  borderBottomColor: '#f59e0b', // amber-500 (Trung bình - 30%)
                  borderLeftColor: '#ef4444', // red-500 (Kém - 10%)
                  transform: 'rotate(45deg)'
                }}`;
const newPieChart = `className="border-t-emerald-500 border-r-emerald-500 border-b-amber-500 border-l-rose-500 rotate-45"`;
reportContent = reportContent.replace(oldPieChart, newPieChart);

fs.writeFileSync('src/app/pages/maintain/MaintenanceReports.tsx', reportContent);
console.log('Fixed MaintenanceReports.tsx');
