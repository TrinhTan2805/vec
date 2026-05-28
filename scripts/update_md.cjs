const fs = require('fs');
const path = require('path');

const filePath = path.join('D:\\GiaoThongHaNoi\\vec\\tailieu\\tailieuphantich\\dactayeucau\\motagiaodien.md');
let content = fs.readFileSync(filePath, 'utf-8');

const updates = [
  {
    screenHeader: "### 1.1.1 Màn hình Tổng quan (Dashboard)",
    infoTable: "| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thẻ KPI Thống kê | Card/Widget | Có | | Chứa 4 thẻ KPI: Tổng số km quản lý, số km bảo trì, phản ánh vi phạm, tỷ lệ checkin |\n| 2 | Biểu đồ Phân bổ Hạ tầng | Donut Chart | Có | | Biểu đồ tròn hiển thị tỷ lệ tuyến đường bộ, đường thủy, đường sắt |\n| 3 | Biểu đồ Tiến độ bảo trì | Bar Chart | Có | | Biểu đồ cột hiển thị tiến độ hoàn thành bảo trì theo các tháng |\n| 4 | Biểu đồ Xu hướng sự cố | Area Chart | Có | | Biểu đồ miền thể hiện xu hướng số lượng sự cố giao thông trong tuần |\n| 5 | Bảng Hoạt động gần đây | Table | Có | | Hiển thị 5 hoạt động log mới nhất của user (Báo cáo vi phạm, cập nhật...) |",
    funcTable: "| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Mở danh sách thông báo | Button | Mở danh sách kéo thả thông báo mới nhất |\n| 2 | Bộ lọc thời gian KPI | Combobox | Lọc dữ liệu hiển thị (7 ngày qua, Tháng này, Năm nay) |\n| 3 | Xuất báo cáo tổng quan | Button | Xuất tất cả dữ liệu biểu đồ và số liệu ra PDF/Excel |\n| 4 | Xem chi tiết hoạt động | Link | Nhấn vào tên hoạt động để xem chi tiết đối tượng |"
  },
  {
    screenHeader: "### 2.1 Màn hình Bản đồ số (GIS)",
    infoTable: "| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Nền Bản đồ số | Map Platform | Có | | Tích hợp Leaflet hiển thị bản đồ địa lý Hà Nội (hoặc Vệ Tinh) |\n| 2 | Biểu đồ/Panel KPI tổng quan | Widget | Không | | Widget nổi hiển thị tổng số Tuyến, Cầu/Hầm, Tình trạng bảo trì |\n| 3 | Bảng Danh sách Phản ánh Vi phạm | Panel/Table | Không | | Danh sách các vi phạm giao thông mới nhất được cập nhật vị trí rõ ràng |\n| 4 | Bảng Lớp dữ liệu (Layers) | Drawer | Không | | Các nhóm layer như Cơ bản, Tuần tra, Sự cố vv... để lọc thông tin map |",
    funcTable: "| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Bật/tắt lớp đối tượng | Switch | Hiện/ẩn layer nhanh trên bản đồ mà không cần tải lại toàn bộ trang |\n| 2 | Xem chi tiết đối tượng | Marker Click | Click Marker/Line bất kỳ mở ra Popup chi tiết dữ liệu thuộc tính |\n| 3 | Điều hướng bằng Danh sách | Row Click | Chọn bản ghi trong danh sách -> Bản đồ tự động FlyTo thẳng vị trí |\n| 4 | Tìm kiếm nhanh | InputSearch | Gõ mã hoặc tên địa điểm để trỏ định vị nhanh chóng |\n| 5 | Cập nhật vị trí kéo thả | Drag/Drop | Cầm thả Marker để cập nhật lại tọa độ cho đúng thực địa |"
  },
  {
    screenHeader: "### 3.1.1 Màn hình Kết cấu hạ tầng - Tổng quan",
    infoTable: "| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thống kê số lượng tổng quan | Widget | Có | | Các thẻ tổng kết số lượng: Tuyến đường bộ, Cầu hầm, Công trình phụ trợ |\n| 2 | Bộ lọc tìm kiếm | Form | Không | | Tìm kiếm các hạng mục thông qua Tên chuẩn, trạng thái |\n| 3 | Danh sách đối tượng | Table | Có | | Bảng danh sách các hạng mục nhóm chính của kết cấu hạ tầng giao thông |",
    funcTable: "| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Truy cập danh mục chi tiết | Button | Nhấn vào nhóm hạ tầng để mở trang quản lý chi tiết bên trong |\n| 2 | Xuất file | Button | Tải tất cả thông tin các nhóm ra file |"
  },
  {
    screenHeader: "### 3.2.1 Màn hình Tuyến đường bộ",
    infoTable: "| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thanh công cụ và Bộ lọc | Input/Select | Không | | Tùy chọn lọc nâng cao: Mã số, Tên tuyến, Cấp hạng đường |\n| 2 | Bảng cấu trúc Tuyến đường | Table | Có | | Bảng tiêu chuẩn: Mã Tuyến, Tên, Chiều dài, Điểm đầu/cuối, Cấp đường |\n| 3 | Bộ đếm & Phân trang | Pagination | Có | 1 | Điều hướng list tuyến đường và hiển thị tổng số tài sản |",
    funcTable: "| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Thêm tuyến đường | Button | Mở Form để khai báo tuyến đường mới |\n| 2 | Chỉnh sửa tuyến đường | Icon Edit | Cập nhật, chỉnh thông số hoặc tọa độ cho tuyến đã có |\n| 3 | Xem định vị trên Bản đồ số | Icon Map | Mở Modal map để xem trực tiếp không gian của đường line tuyến đó |\n| 4 | Xem chi tiết hồ sơ | Icon Eye | Vào xem tổng hợp thông tin kỹ thuật, hồ sơ văn bản đính kèm |\n| 5 | Nhập/Xuất File | Button | Import báo cáo hàng loạt từ excel hoặc kết xuất file .xlsx |"
  },
  {
    screenHeader: "### 5.1.1 Màn hình Tổ chức giao thông",
    infoTable: "| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Bộ lọc điểm giao thông | Select | Không | | Lọc theo Cấp nút giao, Tình trạng tổ chức hướng đi |\n| 2 | Danh sách Tổ chức GT | Table | Có | | Mã nút, Tên nút giao/ngã tư, Loại đèn tín hiệu hoạt động |\n| 3 | Phân trang | Pagination | Có | | Lướt qua các trang tổ chức khu vực giao thông |",
    funcTable: "| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Bổ sung phương án | Button | Tạo điểm nút giao thông mới cần theo dõi |\n| 2 | Xem cấu hình luồng | Icon Eye | Vào xem chức năng của tổ chức ngã tư, cụm đèn |\n| 3 | Cập nhật định vị GIS | Button Map | Check định vị vị trí các hướng trên thực địa bản đồ |"
  }
];

let replacedCount = 0;

for (let item of updates) {
  let startIndex = content.indexOf(item.screenHeader);
  if (startIndex === -1) {
    console.log("Could not find:", item.screenHeader);
    continue;
  }
  
  // Find the subheader "##### x.x.x Mô tả thông tin trên màn hình" AFTER the screenHeader
  let infoHeaderMatch = content.substring(startIndex).match(/#####.*?Mô tả thông tin trên màn hình/);
  if (infoHeaderMatch) {
    let absInfoIdx = startIndex + infoHeaderMatch.index;
    // Replace the table right below it
    let regexTable = /(#####.*?Mô tả thông tin trên màn hình\r?\n\r?\n)(?:\|.*\|\r?\n)+/;
    content = content.substring(0, absInfoIdx) + content.substring(absInfoIdx).replace(regexTable, "" + item.infoTable + "\n");
    replacedCount++;
  }
  
  let funcHeaderMatch = content.substring(startIndex).match(/#####.*?Chức năng trên màn hình/);
  if (funcHeaderMatch) {
    let absFuncIdx = startIndex + funcHeaderMatch.index;
    let regexTableF = /(#####.*?Chức năng trên màn hình\r?\n\r?\n)(?:\|.*\|\r?\n)+/;
    content = content.substring(0, absFuncIdx) + content.substring(absFuncIdx).replace(regexTableF, "" + item.funcTable + "\n");
    replacedCount++;
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Total tables updated:", replacedCount);
