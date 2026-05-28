const fs = require('fs');
const path = require('path');

const ucContent = fs.readFileSync(path.join(__dirname, '../tailieu/tailieuphantich/UC.md'), 'utf-8');
const screensContent = fs.readFileSync(path.join(__dirname, '../tailieu/danhsachmanhinh.md'), 'utf-8');

const ucLines = ucContent.split('\n');
const ucItems = [];
let currentItem = null;

for (const line of ucLines) {
    if (!line.includes('|')) continue;

    // Check if it's a valid row with number/roman numeral STT
    const match = line.match(/^\|\s*(\d+|[A-ZIVX]+(\.[A-ZIVX0-9]+)*)\s*\|\s*(.*?)\s*\|(.*)/);
    if (match) {
        const stt = match[1].trim();
        const title = match[3].trim().replace(/\*\*/g, '');
        const rest = match[4];

        let tac_nhan = "";
        let desc = "";
        const parts = rest.split('|');
        if (parts.length >= 3) {
            tac_nhan = parts[1].trim();
            desc = parts[2].trim();
        } else if (parts.length >= 2) {
            desc = parts[1].trim();
        }

        currentItem = { stt, title, tac_nhan, descriptions: [] };
        if (desc) currentItem.descriptions.push(desc);
        ucItems.push(currentItem);
    } else if (currentItem) {
        const parts = line.split('|');
        let possibleDescs = parts.map(p => p.trim()).filter(p => p.length > 5 && p !== '---');
        if (possibleDescs.length > 0) {
            currentItem.descriptions.push(...possibleDescs);
        }
    }
}

const screenLines = screensContent.split('\n');
const screenGroups = [];
let currentGroup = null;
let currentChucNang = "";

for (const line of screenLines) {
    if (line.startsWith('## Chức năng:')) {
        currentChucNang = line.replace('## Chức năng:', '').trim();
    } else if (line.startsWith('### Nhóm:')) {
        currentGroup = { chucNang: currentChucNang, nhom: line.replace('### Nhóm:', '').trim(), screens: [] };
        screenGroups.push(currentGroup);
    } else if (line.includes('|') && currentGroup && !line.includes('Function ID')) {
        const parts = line.split('|').map(p => p.trim());
        const col1 = parts[1] ? parts[1].replace(/\*\*/g, '').trim() : '';
        if (parts.length >= 9 && col1 !== 'STT' && !col1.includes('---')) {
            currentGroup.screens.push(line);
        }
    }
}

// Bắt đầu xử lý mapping
const normalize = (str) => {
    if (!str) return '';
    return str.toLowerCase()
        .replace(/quản lý/g, '')
        .replace(/danh sách/g, '')
        .replace(/thông tin/g, '')
        .replace(/các/g, '')
        .replace(/nhóm/g, '')
        .replace(/chi tiết/g, '')
        .replace(/kết cấu hạ tầng/g, '')
        .trim();
}

const GROUP_KEYWORDS = {
    "Bản đồ số giao thông toàn khu vực": ["nền bản đồ", "hiển thị để quản lý"],
    "Bản đồ hạ tầng tổng thể (master map)": ["trên ứng dụng di động", "master map", "cấu hình các lớp bản đồ hạ tầng"],
    "Tuyến đường bộ": ["tuyến đường bộ"],
    "Đoạn đường bộ": ["đoạn đường bộ", "tách đoạn đường", "gộp đoạn đường", "yếu tố hình học", "tổ chức giao thông trên đoạn", "hồ sơ hoàn công của đoạn", "văn bản pháp lý"],
    "Cầu lớn": ["cầu đuờng bộ lớn", "cầu lớn", "nhịp cầu", "mố cầu", "gối cầu", "trụ cầu của cầu lớn", "dầm cầu", "bản mặt cầu", "khung thép", "khe co giãn", "cầu đuờng bộ"],
    "Cầu khác": ["cầu đuờng bộ khác", "cầu nhỏ", "cầu vuợt"],
    "Hầm": ["hầm"],
    "Đường ngang": ["đường ngang", "giao cắt đuờng sắt"],
    "Nút giao": ["nút giao", "ramp"],
    "Công trình an toàn": ["công trình an toàn", "gồ giảm tốc", "cọc tiêu", "đinh phản quang", "tiêu phản quang", "gương cầu lồi", "dải phân cách", "bó vỉa", "ụ chống va xô", "lan can phòng hộ", "hàng rào", "tấm chống chói", "tấm chống ồn", "đảo giao thông"],
    "Báo hiệu đường bộ": ["báo hiệu đường bộ", "biển báo (đường", "cột biển báo (đường", "giá long môn", "cột cần vươn", "cột km", "cọc h", "mốc lộ giới", "vạch kẻ đường", "biển báo đuờng bộ"],
    "Hệ thống thoát nước": ["hệ thống thoát nước", "rãnh nước", "cống", "hố ga"],
    "Camera giao thông": ["camera giao thông", "trung tâm giám sát điều khiển camera"],
    "Biển báo vms": ["biển báo vms", "biển điện tử", "biển điện tư"],
    "Công trình phụ trợ (thủy)": ["công trình phụ trợ khác của đường thủy", "phụ trợ khác gắn theo đường thủy"],
    "Công trình phụ trợ": ["công trình phụ trợ", "gắn liền đường bộ", "kè", "tường chắn", "taluy", "lề đường", "lối rẽ", "phát quang", "nhà gác", "chắn đường ngang", "cột camera", "tủ điều khiển", "công trình đi kèm"],
    "Tuyến đường thủy nội địa": ["tuyến đường thủy", "tuyến đuờng thủy"],
    "Biển báo đường thủy": ["cột biển báo thủy", "biển báo đường thủy", "biển báo đuờng thủy"],
    "Đèn hiệu đường thủy": ["đèn hiệu đường thủy", "đèn hiệu đuờng thủy"],
    "Luồng chạy tàu": ["luồng chạy tàu", "nhánh của luồng"],
    "Tuyến đường sắt đô thị": ["tuyến đuờng sắt", "tuyến đường sắt", "đoạn đường sắt", "hệ thống điều hòa", "lịch trình các chuyến"],
    "Trụ cầu đường sắt đô thị": ["trụ cầu đuờng sắt", "trụ cầu đường sắt", "cầu đuờng sắt"],
    "Khu depot đường sắt đô thị": ["khu depot"],
    "Ga đường sắt đô thị": ["ga đuờng sắt", "ga đường sắt"],
    "Duy tu sửa chữa mặt đường bộ": ["sửa chữa mặt đường"],
    "Duy tu nhóm công trình cầu & hầm": ["duy tu mố cầu", "duy tu trụ cầu", "duy tu gối cầu", "duy tu khe co giãn", "duy tu dầm cầu", "duy tu bản mặt", "duy tu khung thép"],
    "Duy tu nhóm kết cấu đường bộ & phụ trợ": ["duy tu kè", "duy tu tường chắn", "duy tu taluy", "duy tu lề đuờng", "duy tu lối rẽ", "duy tu phát quang", "duy tu rãnh", "duy tu cống", "duy tu hố ga", "thoát nuớc trên cầu", "cộng trình phụ trợ gắn theo", "duy tu tuờng chắn"],
    "Duy tu nhóm hệ thống báo hiệu & chỉ dẫn": ["duy tu biển báo", "duy tu cột biển", "duy tu giá long", "duy tu cột cần", "duy tu vạch kẻ", "duy tu gồ", "duy tu cọc", "duy tu đinh", "duy tu tiêu", "duy tu cột km", "duy tu cọc h", "duy tu mốc", "duy tu guơng", "duy tu dải", "duy tu bó", "duy tu ụ", "duy tu lan can", "duy tu hàng rào", "duy tu tấm"],
    "Duy tu nhóm hệ thống đèn tín hiệu & camera": ["duy tu đèn tín hiệu", "duy tu camera", "duy tu biển điện tư", "duy tu tủ điều khiển", "biển điện tu vms"],
    "Duy tu nhóm giao cắt & công trình khác": ["duy tu đuờng ngang", "duy tu chắn", "duy tu nhà gác"],
    "Danh mục thông số đường bộ": ["danh mục", "loại đường", "bậc đường", "cấp đường", "loại kết cấu", "loại tình trạng", "loại khe", "loại gồ", "cấp kỹ thuật", "cấp quy hoạch"],
    "Danh mục công trình phụ trợ": ["loại cột", "loại biển", "loại gương", "loại cọc", "loại cống", "loại hàng rào", "loại dải", "loại tường", "loại bó vỉa", "loại rãnh", "loại lan can", "loại kè", "loại vạch", "loại phát quang", "loại hố ga", "loại đảo", "loại ống", "loại pin", "loại camera", "loại tủ", "loại cable"],
    "Lưu lượng giao thông": ["luu luợng", "lưu lượng"],
    "Quản lý Tuần đường, tuần đèn, tuần kiểm": ["đi tuần", "tuần đuờng", "tuần kiểm"],
    "Phản ánh, xử lý sự cố vi phạm": ["phản ánh"],
    "Báo cáo, thống kê hiện trạng và Kiểm tra công trình": ["thống kê hiện trạng", "bảo vệ kết cấu"],
    "Xác thực người dùng": ["đăng nhập", "đăng xuất", "xác thực"],
    "Biển báo đường thủy": ["cột biển báo thủy", "biển báo đường thủy", "biển báo đuờng thủy", "báo hiệu đường thủy nội địa", "báo hiệu đuờng thủy nội địa", "khối lượng báo hiệu đường thủy"],
    "Quản trị cấu hình đồng bộ dmdc": ["đồng bộ dmdc"],
    "Quản trị api đồng bộ danh mục": ["api đồng bộ"],
    "Nhật ký trao đổi dữ liệu": ["nhật ký trao đổi"],
    "Quản trị đồng bộ tài khoản sso": ["tài khoản nguời dùng sso"],
    "Xác thực người dùng sso": ["xác thực người dùng với sso"],
    "Chính sách truy cập (742)": ["chính sách truy cập hệ thống"],
    "Nhóm quyền người dùng": ["nhóm quyền nguời dùng"],
    "Danh mục địa phận / bản đồ hành chính": ["địa phận (hành chính)"],
    "Cấu hình thời gian chờ (timeout)": ["thời gian chờ (timeout)"],
    "Cấu hình chính sách lưu trữ nhật ký": ["chính sách lưu trữ nhật ký"],
    "Cấu hình thống kê gửi log tập trung (api)": ["hệ thống lưu log"],
    "Và xuất dữ liệu báo cáo hiện trạng cầu, đường": ["hiện trạng cầu, đường"],
    "Và xuất dữ liệu báo cáo hiện trạng hố ga": ["hiện trạng hố ga"],
    "Và xuất dữ liệu báo cáo phản ánh sự cố": ["phản ánh sự cố"],
    "Và xuất dữ liệu báo cáo thống kê tuần đường": ["thống kê tuần đường"],
    "Và xuất dữ liệu báo cáo không tuần đường": ["không tuần đường"],
    "Và xuất dữ liệu báo cáo số lần tuần đường": ["số lần tuần đường"],
    "Và xuất dữ liệu báo cáo thống kê tuần kiểm": ["thống kê tuần kiểm"]
};

let unmappedUcs = [];
let globalStt = 1;
let uniqueScreens = new Set(); // Để đếm xem có bao nhiêu màn hình gốc
let mappedScreensCount = 0;    // Số dòng in ra thực tế

let outputMain = "";

for (const uc of ucItems) {
    const isGroup = !/^\d+$/.test(uc.stt);

    if (isGroup) {
        const dots = (uc.stt.match(/\./g) || []).length;
        const prefix = '#'.repeat(Math.min(dots + 2, 6));
        outputMain += `${prefix} [${uc.stt}] ${uc.title}\n\n`;
        continue;
    }

    outputMain += `### 📝 Use Case ${uc.stt}: ${uc.title}\n\n`;
    if (uc.tac_nhan) outputMain += `**Tác nhân:** ${uc.tac_nhan}\n\n`;
    if (uc.descriptions.length > 0) {
        outputMain += `**Mô tả yêu cầu (Use Cases):**\n`;
        const uniqueDescs = Array.from(new Set(uc.descriptions));
        for (const desc of uniqueDescs) {
            outputMain += `- ${desc}\n`;
        }
        outputMain += `\n`;
    }

    const unTitle = normalize(uc.title);
    let matchedGroups = [];

    if (unTitle.length > 2) {
        for (const sg of screenGroups) {
            const normSg = normalize(sg.nhom);

            let hasKeywordMatch = false;
            for (const [key, keywords] of Object.entries(GROUP_KEYWORDS)) {
                if (sg.nhom.toLowerCase().includes(key.toLowerCase())) {
                    for (const kw of keywords) {
                        if (uc.title.toLowerCase().includes(kw.toLowerCase())) {
                            hasKeywordMatch = true;
                            break;
                        }
                    }
                }
                if (hasKeywordMatch) break;
            }

            // Stronger matching
            if (normSg.includes(unTitle) || unTitle.includes(normSg) || hasKeywordMatch) {
                matchedGroups.push(sg);
                sg.matched = true;
            }
        }
    }

    if (matchedGroups.length > 0) {
        outputMain += `**Danh sách màn hình / Chức năng dự kiến tương ứng:**\n\n`;
        outputMain += `| STT | Function ID (*) | Tên CN | Mã Màn hình | Tên màn hình/API | Mã quy trình | Tên quy trình | Mã UC (*) | Phần mềm |\n`;
        outputMain += `| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
        for (const matchedGroup of matchedGroups) {
            for (const scr of matchedGroup.screens) {
                const parts = scr.split('|');
                if (parts.length >= 9) {
                    uniqueScreens.add(parts[3] ? parts[3].trim() : scr); // Count by "Mã Màn hình"
                    parts[1] = ' ' + (globalStt++) + ' ';
                    outputMain += parts.join('|') + '\n';
                    mappedScreensCount++;
                }
            }
        }
        outputMain += `\n`;
    } else {
        unmappedUcs.push(uc);
        outputMain += `> ⚠️ **CHƯA CÓ MÀN HÌNH ĐƯỢC ÁNH XẠ CHO USE CASE NÀY**\n\n`;
    }
    outputMain += `---\n\n`;
}

let outputUnmapped = `# CÁC NHÓM MÀN HÌNH KHÁC (Chưa ánh xạ trực tiếp từ file UC.md)\n\n`;

// Nhóm lại theo chức năng
let unmappedByChucNang = {};
for (const sg of screenGroups) {
    if (!sg.matched) {
        if (!unmappedByChucNang[sg.chucNang]) {
            unmappedByChucNang[sg.chucNang] = [];
        }
        unmappedByChucNang[sg.chucNang].push(sg);
    }
}

for (const [chucNang, groups] of Object.entries(unmappedByChucNang)) {
    outputUnmapped += `## Chức năng: ${chucNang}\n\n`;
    for (const sg of groups) {
        outputUnmapped += `### Nhóm: ${sg.nhom}\n\n`;
        outputUnmapped += `| STT | Function ID (*) | Tên CN | Mã Màn hình | Tên màn hình/API | Mã quy trình | Tên quy trình | Mã UC (*) | Phần mềm |\n`;
        outputUnmapped += `| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
        for (const scr of sg.screens) {
            const parts = scr.split('|');
            if (parts.length >= 9) {
                uniqueScreens.add(parts[3] ? parts[3].trim() : scr);
                parts[1] = ' ' + (globalStt++) + ' ';
                outputUnmapped += parts.join('|') + '\n';
            }
        }
        outputUnmapped += `\n`;
    }
}

let output = `# BẢNG ÁNH XẠ USE CASES (UC) VÀ DANH SÁCH MÀN HÌNH TƯƠNG ỨNG\n\n`;

// THỐNG KÊ
output += `## 📊 BẢNG THỐNG KÊ TỔNG HỢP\n`;
output += `- **Tổng số màn hình thực tế (hiện có trong danh sách gốc):** ${uniqueScreens.size}\n`;
output += `- **Tổng số dòng màn hình sau khi mapping (khi chạy lại STT):** ${globalStt - 1}\n`;
output += `- **Tổng số Use Cases được liệt kê:** ${ucItems.length}\n`;
output += `- **Số Use Cases CHƯA có màn hình ánh xạ:** ${unmappedUcs.length}\n\n`;

if (unmappedUcs.length > 0) {
    output += `### ⚠️ DANH SÁCH CÁC USE CASE CHƯA CÓ MÀN HÌNH ÁNH XẠ:\n`;
    for (const u of unmappedUcs) {
        output += `- **[${u.stt}]** ${u.title}\n`;
    }
    output += `\n---\n\n`;
}

// APPEND MAIN
output += outputMain;
output += outputUnmapped;

fs.writeFileSync(path.join(__dirname, '../tailieu/tailieuphantich/UCMapping_DanhSachManHinh.md'), output, 'utf-8');
console.log(`Mapping updated! Unmapped UCs: ${unmappedUcs.length}. Total unique screens: ${uniqueScreens.size}. Max STT: ${globalStt - 1}`);
