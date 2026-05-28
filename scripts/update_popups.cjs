const fs = require('fs');
const path = require('path');

const filePath = path.join('D:\\GiaoThongHaNoi\\vec\\tailieu\\tailieuphantich\\dactayeucau\\motagiaodien.md');
let content = fs.readFileSync(filePath, 'utf-8');

const detailTables = {
  'cầu': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Tab: Thông tin cơ bản | Layout/Tab | Có | | Tab mặc định, Tên cầu, Mã cầu, Tuyến, Lý trình, Năm sử dụng |\n| 2 | Tab: Đặc tính kỹ thuật | Layout/Tab | Có | | Chứa Tải trọng thiết kế, tải trọng thực tế, Kết cấu mố, Nút giao |\n| 3 | Mố trụ, Nhịp cầu, Gối cầu | Section | Không | | (Chỉ với cầu lớn) Tham số chi tiết của Ký hiệu mố, Loại mố |\n| 4 | Lịch sử duy tu bảo dưỡng | Table | Có | | Danh sách bảo trì, Ngày, Tình trạng (Hoàn thành/Khoan đóng) |`,
  'hầm': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thông tin định danh hầm | Section | Có | | Tên hầm, Mã hầm, Tên loại hầm, Tình trạng hoạt động |\n| 2 | Tham số vị trí | Section | Có | | Điểm đầu, Khoảng cách lý trình (m), Điểm cuối, Tọa độ GPS |\n| 3 | Lịch sử kiểm định | Table/Tab | Có | | Timeline các lần kiểm định kết cấu chịu lực, rò rỉ nước |`,
  'tuyến đường': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thông tin cơ bản | Section | Có | | Tên tuyến, Mã tuyến, Độ dài (km), Phân loại cấp đường |\n| 2 | Yếu tố hình học | Tab | Không | | Tọa độ GPS định tuyến (Polyline), Điểm bắt đầu, Điểm kết thúc |\n| 3 | Hành chính & Pháp lý | Tab | Có | | Đơn vị quản lý cấp địa phương, Lịch sử kiểm tra |`
};

const viewPopupRegex = /(### .*?(?:Cầu|Hầm|Tuyến).*?\r?\n[\s\S]*?##### .*? Mô tả thông tin trên màn hình\r?\n\r?\n)\|[\s\S]*?\| \d+ \| Bảng ghi chú \/ Lịch sử \| Table \| Có \|.*?\|\r?\n/gm;

let replaced = 0;
while (true) {
    let match = viewPopupRegex.exec(content);
    if (!match) break;
    
    let fullMatch = match[0];
    let prefix = match[1]; // captures from '### ' to '\n\n'
    let titleLine = fullMatch.match(/### .*/)[0];
    let lower = titleLine.toLowerCase();
    
    let targetTable = null;
    if (lower.includes('cầu')) targetTable = detailTables['cầu'];
    else if (lower.includes('hầm')) targetTable = detailTables['hầm'];
    else if (lower.includes('tuyến')) targetTable = detailTables['tuyến đường'];
    
    if (targetTable) {
        content = content.replace(fullMatch, prefix + targetTable + "\n");
        replaced++;
        viewPopupRegex.lastIndex = 0; // reset to avoid skipping
    }
}

// Do the same for Generic ADD/EDIT popups which say "Khu vực hiển thị trung tâm" or "Trạng thái kỹ thuật"
const formPopupRegex = /(### .*?(?:Cầu|Hầm|Tuyến|Biển báo|Đường bộ|Tổ chức).*?\r?\n[\s\S]*?##### .*? Mô tả thông tin trên màn hình\r?\n\r?\n)\|[\s\S]*?\| 1 \| Khu vực hiển thị trung tâm \|.*?\|\r?\n/gm;
let replacedForm = 0;
while (true) {
    let match = formPopupRegex.exec(content);
    if (!match) break;
    
    let fullMatch = match[0];
    let prefix = match[1];
    let titleLine = fullMatch.match(/### .*/)[0];
    let lower = titleLine.toLowerCase();
    
    let targetTable = null;
    if (lower.includes('cầu')) targetTable = `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Tên cầu & Mã cầu | Input Text | Có | | Định danh mã tài sản (Ví dụ: BR-THT-01, không quá 30 char) |\n| 2 | Loại kết cấu cầu | Select | Có | 1 | Dropdown API kết cấu (BTCT, Thép...) |\n| 3 | Map Picker (GIS) | Component | Có | | Điểm tọa độ [Lat, Lng] |\n| 4 | File thiết kế | Upload | Không | | Max 20MB (.pdf/.jpg) |`;
    else if (lower.includes('tuyến') || lower.includes('đường bộ')) targetTable = `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Cấu hình mã tuyến | Text | Có | | Tên tuyến, Mã tuyến duy nhất, Kiểm tra Unqiue() ở DB |\n| 2 | Tham số kỹ thuật | Numbers | Có | | Độ dài (km), Vận tốc thiết kế tối đa (km/h) |\n| 3 | Trình vẽ Polyline | Map Draw | Có | | Vẽ quỹ đạo trên bản đồ trực tiếp |`;
    else if (lower.includes('tổ chức')) targetTable = `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Phạm vi điều tiết | Text | Có | | Tên nút giao quản lý |\n| 2 | Chọn vị trí lỗi/nút | Map Picker | Có | | Gắn tâm ngã tư vào bản đồ |\n| 3 | Luồng tín hiệu | Select | Có | | Phương án: Khung giờ, pha đèn |`;
    
    if (targetTable) {
        content = content.replace(fullMatch, prefix + targetTable + "\n");
        replacedForm++;
        formPopupRegex.lastIndex = 0;
    }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated Details:", replaced);
console.log("Updated Forms:", replacedForm);
