const fs = require('fs');
const path = require('path');

const filePath = 'e:/GiaoThongHaNoi/vec/tailieu/tailieuphantich/DanhSachManHinh_Web.md';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split(/\r?\n/);

let headerText = '';
let tableHeader = '';
let tableDelimiter = '';
let dataRows = [];

let tableStartIdx = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('| STT |')) {
        tableStartIdx = i;
        break;
    }
}

if (tableStartIdx !== -1) {
    headerText = lines.slice(0, tableStartIdx).join('\n').trim();
    tableHeader = lines[tableStartIdx];
    tableDelimiter = lines[tableStartIdx + 1];
    dataRows = lines.slice(tableStartIdx + 2).filter(line => line.trim().startsWith('|'));
}

const groups = {
    "Đường bộ": {},
    "Đường thủy": {},
    "Đường sắt": {},
    "Danh mục": {},
    "Thông báo": {},
    "Quản trị": {},
    "Bản đồ": {},
    "Trang chủ": {},
    "Khác": {}
};

dataRows.forEach(row => {
    const cols = row.split('|').map(s => s.trim());
    if (cols.length >= 9) {
        const tenQuyTrinh = cols[7];
        const maUC = cols[8] || '';

        let majorCategory = "Khác";
        let subCategory = tenQuyTrinh;

        if (["Đường bộ", "Dự án", "Phân luồng", "Bình đồ", "Tuần đường", "Bảo trì", "Phản ánh"].includes(tenQuyTrinh)) {
            majorCategory = "Đường bộ";
            if (tenQuyTrinh === "Bình đồ") {
                subCategory = "Quản lý bình đồ";
            } else if (tenQuyTrinh === "Tuần đường" || tenQuyTrinh === "Bảo trì" || tenQuyTrinh === "Phản ánh" || maUC.includes("-DB-09") || maUC.includes("-DB-16")) {
                subCategory = "Quản lý Kiểm tra công trình";
            } else {
                subCategory = "Quản lý KCHT";
            }
        } else if (tenQuyTrinh === "Đường thủy") {
            majorCategory = "Đường thủy";
            subCategory = "Đường thủy";
        } else if (tenQuyTrinh === "Đường sắt") {
            majorCategory = "Đường sắt";
            subCategory = "Đường sắt";
        } else if (tenQuyTrinh === "Danh mục") {
            majorCategory = "Danh mục";
            subCategory = "Danh mục";
        } else if (tenQuyTrinh === "Thông báo") {
            majorCategory = "Thông báo";
            subCategory = "Thông báo";
        } else if (tenQuyTrinh === "Bản đồ") {
            majorCategory = "Bản đồ";
            subCategory = "Bản đồ";
        } else if (["Hệ thống", "Cá nhân", "Xác thực", "Vận hành"].includes(tenQuyTrinh)) {
            majorCategory = "Quản trị";
            subCategory = tenQuyTrinh;
        } else if (["Báo cáo", "Lưu lượng"].includes(tenQuyTrinh)) {
            majorCategory = "Trang chủ";
            subCategory = "Báo cáo / Thống kê";
        }

        if (!groups[majorCategory][subCategory]) {
            groups[majorCategory][subCategory] = { rows: [], uniqueIds: new Set() };
        }

        // Prevent duplicate rows if any exist in document
        const uniqueKey = cols[1] + '|' + cols[3]; // Function ID and Ma Man hinh
        if (!groups[majorCategory][subCategory].uniqueIds.has(uniqueKey)) {
            groups[majorCategory][subCategory].uniqueIds.add(uniqueKey);
            groups[majorCategory][subCategory].rows.push(row);
        }
    }
});

const outDir = 'e:/GiaoThongHaNoi/vec/tailieu/tailieuphantich/DanhSachManHinh_Web_Menu';
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

for (const [majorCategory, subCategories] of Object.entries(groups)) {
    if (Object.keys(subCategories).length === 0) continue;

    let outContent = headerText + '\n\n';
    outContent += `# Module: ${majorCategory}\n\n`;

    let globalStt = 1;

    for (const [subCategory, data] of Object.entries(subCategories)) {
        if (data.rows.length === 0) continue;

        outContent += `## ${subCategory}\n\n`;
        outContent += tableHeader + '\n';
        outContent += tableDelimiter + '\n';

        const renumberedRows = data.rows.map(row => {
            const cols = row.split('|');
            cols[1] = ` ${globalStt++} `;
            return cols.join('|');
        });

        outContent += renumberedRows.join('\n') + '\n\n';
    }

    // write file
    const safeFilename = majorCategory.replace(/[\/\\]/g, '_') + '.md';
    fs.writeFileSync(path.join(outDir, safeFilename), outContent, 'utf-8');
}
console.log('Done splitting v2! into ' + outDir);
