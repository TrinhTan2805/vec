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
    dataRows = lines.slice(tableStartIdx + 2).filter(line => line.trim().startsWith('|') && !line.includes('| STT |'));
}

const groups = {
    "Đường bộ": {
        "Quản lý KCHT": { rows: [], uniqueIds: new Set() },
        "Quản lý bình đồ": { rows: [], uniqueIds: new Set() },
        "Quản lý Kiểm tra công trình": { rows: [], uniqueIds: new Set() }
    },
    "Đường thủy": {
        "Đường thủy": { rows: [], uniqueIds: new Set() }
    },
    "Đường sắt": {
        "Đường sắt": { rows: [], uniqueIds: new Set() }
    },
    "Danh mục": {
        "Danh mục": { rows: [], uniqueIds: new Set() }
    },
    "Thông báo": {
        "Thông báo": { rows: [], uniqueIds: new Set() }
    },
    "Quản trị": {},
    "Bản đồ": {
        "Bản đồ": { rows: [], uniqueIds: new Set() }
    },
    "Trang chủ": {
        "Trang chủ": { rows: [], uniqueIds: new Set() }
    },
    "Khác": {}
};

dataRows.forEach(row => {
    const cols = row.split('|').map(s => s.trim());
    if (cols.length >= 9) {
        if (cols[2].includes("Function ID")) return; // skip extra header rows from copy pastes

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

        // cols[0] is empty
        // cols[1] is STT
        //  cols[2] is Function ID
        //  cols[4] is Mã Màn hình
        const uniqueKey = cols[2] + '|' + cols[4];
        if (!groups[majorCategory][subCategory].uniqueIds.has(uniqueKey)) {
            groups[majorCategory][subCategory].uniqueIds.add(uniqueKey);
            groups[majorCategory][subCategory].rows.push(row);
        }
    }
});

let outContent = headerText + '\n\n';
let globalStt = 1;

for (const [majorCategory, subCategories] of Object.entries(groups)) {
    let hasDataInMajor = false;
    for (const data of Object.values(subCategories)) {
        if (data.rows && data.rows.length > 0) hasDataInMajor = true;
    }

    if (!hasDataInMajor) continue;

    outContent += `## ${majorCategory}\n\n`;

    for (const [subCategory, data] of Object.entries(subCategories)) {
        if (!data.rows || data.rows.length === 0) continue;

        if (subCategory !== majorCategory) {
            outContent += `### ${subCategory}\n\n`;
        }

        outContent += tableHeader + '\n';
        outContent += tableDelimiter + '\n';

        const renumberedRows = data.rows.map(row => {
            const cols = row.split('|');
            cols[1] = ` ${globalStt++} `;
            return cols.join('|');
        });

        outContent += renumberedRows.join('\n') + '\n\n';
    }
}

const outFilePath = 'e:/GiaoThongHaNoi/vec/tailieu/tailieuphantich/DanhSachManHinh_Web_TongHop.md';
fs.writeFileSync(outFilePath, outContent, 'utf-8');
console.log('Done! Generated single file at ' + outFilePath);
