const fs = require('fs');

const srcFile = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\danhsachmanhinh.md';
let content = fs.readFileSync(srcFile, 'utf8');

const additionalMapping = `
## Chức năng: Mở rộng Bổ sung

### Nhóm: Quản trị Hệ thống (Bổ sung)

| **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **Mã quy trình** | **Tên quy trình** | **Mã UC (*)** | **Phần mềm** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| X | GTHN-SYS-05-01 | Cấu hình Thông số hệ thống | SYS-05-MH-01 | Màn hình Cấu hình Thông số hệ thống chung | GTHN-SYS | Quản trị Hệ thống | UC-SYS-05-01 | GTHN |
| X | GTHN-SYS-05-02 | Cấu hình API Gateway tích hợp IOC | SYS-05-MH-02 | Màn hình Cấu hình Tích hợp | GTHN-SYS | Quản trị Hệ thống | UC-SYS-05-02 | GTHN |
| X | GTHN-SYS-05-03 | Quản lý Notification thông báo | SYS-05-MH-03 | Màn hình Thông báo (Web) | GTHN-SYS | Quản trị Hệ thống | UC-SYS-05-03 | GTHN |

### Nhóm: Giám sát Tuần đường (Bổ sung)

| **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **Mã quy trình** | **Tên quy trình** | **Mã UC (*)** | **Phần mềm** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| X | GTHN-TD-05-01 | Theo dõi quỹ tích Tracking Real-time | TD-05-MH-01 | Màn hình Bản đồ Giám sát Tuần đường Real-time | GTHN-TD | Quản lý công tác tuần đường | UC-TD-05-01 | GTHN |
| X | GTHN-TD-05-02 | Xem lịch sử Tracking | TD-05-POP-02 | Popup Chi tiết Lộ trình nhân viên | GTHN-TD | Quản lý công tác tuần đường | UC-TD-05-02 | GTHN |

### Nhóm: Bảo trì KCHT (Bổ sung)

| **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **Mã quy trình** | **Tên quy trình** | **Mã UC (*)** | **Phần mềm** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| X | GTHN-BT-06-01 | Phê duyệt và Đóng Sự cố | BT-06-MH-01 | Màn hình Nghiệm thu & Đóng sự cố | GTHN-BT | Quản lý bảo trì hạ tầng | UC-BT-06-01 | GTHN |

### Nhóm: Lưu lượng giao thông (Bổ sung)

| **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **Mã quy trình** | **Tên quy trình** | **Mã UC (*)** | **Phần mềm** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| X | GTHN-LL-01-01 | Thống kê Mật độ Giao thông Heatmap | LL-01-MH-01 | Màn hình Bản đồ Mật độ Lưu lượng (Heatmap) | GTHN-LL | Lưu lượng giao thông | UC-LL-01-01 | GTHN |
| X | GTHN-LL-01-02 | Báo cáo chi tiết biểu đồ lượng xe | LL-01-MH-02 | Màn hình Báo cáo Thống kê Lưu lượng theo Nút/Tuyến | GTHN-LL | Lưu lượng giao thông | UC-LL-01-02 | GTHN |
| X | GTHN-LL-01-03 | Phân tích Ùn tắc | LL-01-POP-03 | Popup Phân tích Biểu đồ ùn tắc theo khung giờ | GTHN-LL | Lưu lượng giao thông | UC-LL-01-03 | GTHN |

### Nhóm: Ứng dụng Di động - Báo cáo Khẩn cấp

| **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **Mã quy trình** | **Tên quy trình** | **Mã UC (*)** | **Phần mềm** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| X | GTHN-MOB-EMG-01 | Báo cáo tai nạn hiện trường | MOB-EMG-01 | Màn hình Báo cáo Tai nạn Giao thông (Khẩn cấp) | MOB-EMG | Chức năng khẩn cấp | UC-MOB-EMG-01 | Mobile |
| X | GTHN-MOB-EMG-02 | Báo cáo điểm ngập úng | MOB-EMG-02 | Màn hình Báo cáo Điểm Ngập lụt (Khẩn cấp) | MOB-EMG | Chức năng khẩn cấp | UC-MOB-EMG-02 | Mobile |
| X | GTHN-MOB-EMG-03 | Gửi Media | MOB-EMG-03 | Popup Gửi Video/Ảnh hiện trường | MOB-EMG | Chức năng khẩn cấp | UC-MOB-EMG-03 | Mobile |

### Nhóm: Ứng dụng Di động - Điều phối & Theo dõi ca trực

| **STT** | **Function ID (*)** | **Tên CN** | **Mã Màn hình** | **Tên màn hình/API** | **Mã quy trình** | **Tên quy trình** | **Mã UC (*)** | **Phần mềm** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| X | GTHN-MOB-NAV-01 | Xem ca trực | MOB-NAV-01 | Màn hình Lịch làm việc & Ca trực cá nhân | MOB-NAV | Điều phối cá nhân | UC-MOB-NAV-01 | Mobile |
| X | GTHN-MOB-NAV-02 | Nhận thông báo Push Notification | MOB-NAV-02 | Màn hình Thông báo Điều phối | MOB-NAV | Điều phối cá nhân | UC-MOB-NAV-02 | Mobile |
| X | GTHN-MOB-NAV-03 | Cập nhật nhận việc | MOB-NAV-03 | Popup Tiếp nhận / Hủy yêu cầu công việc | MOB-NAV | Điều phối cá nhân | UC-MOB-NAV-03 | Mobile |
`;

let currentMaxStt = 0;
let lines = content.split('\n');
for (let line of lines) {
    if (line.startsWith('|')) {
        let cols = line.split('|').map(s => s.trim());
        let stt = parseInt(cols[1]);
        if (!isNaN(stt) && stt > currentMaxStt) {
            currentMaxStt = stt;
        }
    }
}

let modifiedAdditions = additionalMapping.split('\n').map(l => {
    if (l.startsWith('|') && l.includes('| X |')) {
        currentMaxStt++;
        return l.replace('| X |', `| ${currentMaxStt} |`);
    }
    return l;
}).join('\n');

content = content + "\n" + modifiedAdditions;

fs.writeFileSync(srcFile, content, 'utf8');
console.log("Successfully appended new screens to danhsachmanhinh.md");
console.log("New Total items:", currentMaxStt);
