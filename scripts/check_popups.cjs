const fs = require('fs');
const path = require('path');

const filePath = path.join('D:\\GiaoThongHaNoi\\vec\\tailieu\\tailieuphantich\\dactayeucau\\motagiaodien.md');
let content = fs.readFileSync(filePath, 'utf-8');

// The generic template to replace
const genericTableRegex = /##### (.*?) Mô tả thông tin trên màn hình\r?\n\r?\n\|.*?\|\r?\n\|.*?\|\r?\n\|.*?Khung tìm kiếm.*?\|\r?\n\|.*?Bảng danh sách dữ liệu.*?\|\r?\n\|.*?Phân trang.*?\|/g;

// Actually, in popups it looks like this:
const genericPopupRegex = /(##### .*? Mô tả thông tin trên màn hình\r?\n\r?\n)\|[\s\S]*?\| \d+ \| Bảng ghi chú \/ Lịch sử \| Table \| Có \|.*?\|\r?\n/g;

// Let's first count how many generic popups exist
let matchCount = 0;
let tempContent = content;
while (genericPopupRegex.exec(tempContent) !== null) {
    matchCount++;
}
console.log('Found generic popup information tables:', matchCount);
