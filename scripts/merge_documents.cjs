const fs = require('fs');

const dactayeucauPath = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\tailieuphantich\\dactayeucau\\dactayeucau.md';
const motagiaodienPath = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\tailieuphantich\\dactayeucau\\motagiaodien.md';

let srsContent = fs.readFileSync(dactayeucauPath, 'utf8');
let uiContent = fs.readFileSync(motagiaodienPath, 'utf8');

// The UI content starts directly with UI specifications.
// Let's adjust heading levels in motagiaodien to nest under the SRS chapters, or just replace chapters 4-11 entirely.

// 1. TONG QUAN -> Phân hệ I. -> 4.
// 2. BAN DO -> Phân hệ II. -> 5.
// 3. DUONG BO -> Phân hệ III. -> 6.

// It's cleaner to just replace the entire sections 4 through 11 in dactayeucau.md with the detailed content.
const startIdx = srsContent.indexOf('## 4. Phân hệ I – Tổng quan hệ thống');
const endIdx = srsContent.indexOf('## 12. Yêu cầu phi chức năng');

if (startIdx !== -1 && endIdx !== -1) {
    let headerText = "## DANH SÁCH CHI TIẾT TỪNG MÀN HÌNH CHỨC NĂNG (GỘP TỪ DANH SÁCH MÀN HÌNH)\n\n" + 
                     "> **Lưu ý cho Developer**: Phần dưới đây liệt kê chi tiết UI/UX cho toàn bộ 600+ màn hình, popup theo danh sách đặc tả.\n\n";

    // Shift all headings in UI content by 1 level up (if needed, but usually UI content # 1. is fine to become ## 4.)
    // Actually, UI content has `# 1. Tổng quan`, we can replace `# ` with `### `
    
    // To cleanly map, let's just dump it as-is, but nest it under a new master section "CHI TIẾT 605 MÀN HÌNH"
    let newSrsContent = srsContent.substring(0, startIdx) + 
                        headerText + 
                        uiContent + 
                        "\n\n---\n\n" +
                        srsContent.substring(endIdx);
                        
    fs.writeFileSync(dactayeucauPath, newSrsContent, 'utf8');
    console.log("SUCCESS: Merged 17,000+ lines into dactayeucau.md");
} else {
    console.log("FAILED to find bounds");
}
