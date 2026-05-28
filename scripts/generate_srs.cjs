const fs = require('fs');

const srcFile = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\danhsachmanhinh.md';
const destFile = 'D:\\GiaoThongHaNoi\\vec\\tailieu\\tailieuphantich\\dactayeucau\\motagiaodien.md';

let content = fs.readFileSync(srcFile, 'utf8');
let lines = content.split('\n');

let hierarchy = [];
let l1Counter = 0;
let currentL1 = null;
let currentL2 = null;

// Clean parsing
for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.startsWith('## ')) {
        l1Counter++;
        currentL1 = { title: line.replace('## ', '').trim(), l2: [], standaloneScreens: [] };
        hierarchy.push(currentL1);
        currentL2 = null;
    } else if (line.startsWith('### ')) {
        currentL2 = { title: line.replace('### ', '').trim(), screens: [] };
        if (currentL1) {
            currentL1.l2.push(currentL2);
        }
    } else if (line.startsWith('|') && !line.includes('**STT**') && !line.includes('| :---')) {
        let cols = line.split('|').map(s => s.trim());
        if (cols.length >= 6 && cols[4] && cols[5]) { // Code and Name
            let funcId = cols[2];
            let code = cols[4];
            let name = cols[5];
            
            // Clean up bold tags like **Tên**
            name = name.replace(/\*\*/g, '');
            code = code.replace(/\*\*/g, '');

            let screenObj = { code, name, funcId };
            
            if (currentL2) {
                currentL2.screens.push(screenObj);
            } else if (currentL1) {
                currentL1.standaloneScreens.push(screenObj);
            }
        }
    }
}

// Data dictionaries from previous work
const detailTables = {
  'cầu': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Tab: Thông tin cơ bản | Layout/Tab | Có | | Tab mặc định, Tên cầu, Mã cầu, Tuyến, Lý trình, Năm đưa vào sử dụng |\n| 2 | Tab: Đặc tính kỹ thuật | Layout/Tab | Có | | Chứa Tải trọng thiết kế, tải trọng thực tế, Kết cấu mố, Nút giao |\n| 3 | Mố trụ, Nhịp cầu, Gối cầu | Section | Không | | (Chỉ với cầu lớn) Tham số chi tiết của Ký hiệu mố, Loại mố, Cao độ |\n| 4 | Lịch sử duy tu bảo dưỡng | Table | Có | | Danh sách bảo trì, Ngày, Tình trạng (Hoàn thành/Khoan đóng) |`,
  'hầm': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thông tin định danh hầm | Section | Có | | Tên hầm, Mã hầm, Tên loại hầm, Tình trạng hoạt động (Badge) |\n| 2 | Tham số vị trí | Section | Có | | Điểm đầu, Khoảng cách lý trình (m), Điểm cuối, Tọa độ GPS |\n| 3 | Lịch sử kiểm định | Table/Tab | Có | | Timeline các lần kiểm định kết cấu chịu lực, rò rỉ nước, thông gió hạ tầng |`,
  'biển báo': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Cột biển báo | Section | Có | | Mã cột, Tuyến đường, Lý trình, Kc. mép đường, Loại cột (Đơn/Kép) |\n| 2 | Nội dung hiển thị biển | Section | Có | | Ký hiệu biển (Mã định danh), Phân loại biển (Cấm/Chỉ dẫn), Nội dung biển, Biển cấm theo giờ |\n| 3 | Dữ liệu GIS | Shape/Map | Có | | Layer hiển thị tọa độ cụ thể của biển trên nền bản đồ số |`,
  'tuyến đường': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thông tin cơ bản | Section | Có | | Tên đường, Mã đường, Độ dài (km), Phân loại cấp đường, Trạng thái hoạt động |\n| 2 | Yếu tố hình học | Tab | Không | | Tọa độ GPS định tuyến (Polyline), Điểm bắt đầu, Điểm kết thúc |\n| 3 | Yếu tố hành chính & Pháp lý | Tab | Có | | Ngày đồng bộ, Đơn vị quản lý cấp địa phương, Hồ sơ văn bản phê duyệt tuyến |`,
  'đường bộ': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thông tin cơ bản | Section | Có | | Tên đường, Mã đường, Độ dài (km), Phân loại cấp đường, Trạng thái hoạt động |\n| 2 | Yếu tố hình học | Tab | Không | | Tọa độ GPS định tuyến (Polyline), Điểm bắt đầu, Điểm kết thúc |\n| 3 | Yếu tố hành chính & Pháp lý | Tab | Có | | Ngày đồng bộ, Đơn vị quản lý cấp địa phương, Văn bản pháp quy |`,
  'vms': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Cụm đèn VMS | Section | Có | | Tên biển, IP thiết bị, Chuẩn giao tiếp RS232/TCP |\n| 2 | Text Format | Form | Có | | Tool định cấu hình màu nội dung, tốc độ chạy chữ |\n| 3 | Preview (Mô phỏng) | Component | Có | | Ô giả lập hiển thị real-time nội dung sẽ bắn lên biển LED |`,
  'đèn tín hiệu': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Tủ đèn và Tên nút | Section | Có | | Tên nút, Mã nút giao, Địa điểm triển khai, Tình trạng (On/Off) |\n| 2 | Thiết bị phần cứng | Section | Có | | Loại tủ điều khiển (PLC/Cơ), Số lượng thiết bị, Số cột đèn, Cụm vỉ mạch |\n| 3 | Camera giám sát tích hợp | Boolean | Có | | Flag xác nhận có module camera phạt nguội/đọc biển số |`,
  'tổ chức giao thông': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Phạm vi tổ chức | Label | Có | | Tên nút giao thông đang xem chi tiết, loại pha đèn |\n| 2 | Bản vẽ đính kèm | Image/PDF | Có | | Các hồ sơ đính kèm dạng hình ảnh/CAD phê duyệt quy hoạch |\n| 3 | Các quyết định cấp phép | List | Không | | File log lịch sử thay đổi chiều đóng/mở pha đèn, cấm rẽ |`,
  'dashboard': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Khối KPI tĩnh | Card | Có | | Thẻ hiển thị các Metric chính, tỷ lệ phần trăm (%), xu hướng tăng/giảm |\n| 2 | Biểu đồ trực quan | Chart | Có | | Component Recharts (hoặc tương đương) render báo cáo trực quan dạng Line, Bar, Pie... |\n| 3 | Bảng số lượng tổng hợp | Table | Cỏ | | Bảng (có phân trang) các hạng mục dữ liệu liên quan để click xuất báo cáo Excel |`,
  'bản đồ': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Khung Canvas Map | Component | Có | | Component Leaflet. Map Provider là maptiler, zoom level và center (Lat/Lng) mặc định Hà Nội |\n| 2 | Hệ Panel bộ lọc | Sidebar | Có | | Khung Sidebar cho phép tick check ẩn/hiện các lớp GeoJSON Overlay |\n| 3 | Layer Controls | Button Group| Có | | View control, Switch Dark/Light Mode, Measurement tool |`,
  'báo cáo': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Bộ lọc tham số | Form | Có | | Các input \`Tuần\`, \`Tháng\`, \`Từ Ngày...Đến Ngày\` và Nút Print/Excel |\n| 2 | Area Table | Data Grid | Có | | Bảng chứa lượng dữ liệu khổng lồ (phân dòng, cột động theo tham số) |\n| 3 | Area Graph | Document UI| Không| | Một số báo cáo nâng cao có biểu đồ tích hợp |`,
  'danh sách': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Panel Bộ lọc (Filter) | Layout | Có | | Hàng trên cùng gồm: TextSearch, Combobox Trạng thái, Button: Thêm, Import, Export |\n| 2 | Table View | Component | Có | | Datatable với các tính năng phân trang, sort order, và Checkbox multi-select |\n| 3 | Cột Hành động (Action) | Component | Có | | Các nút Thao tác trực tiếp trên dòng: (Eye) Xem, (Pencil) Sửa, (Trash) Xóa |`,
  'default_view': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Khối Thông tin định danh | Label/Text | Có | | Bóc tách từ API GET bằng \`ID\` item, hiển thị Tên, Đặc điểm, Trạng thái |\n| 2 | Log / Hoạt động gần đây | Table | Có | | Component List duyệt qua lịch sử sự kiện (Creation/Modification/Activity Log) |`
};

const formTables = {
  'cầu': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Tên cầu & Mã cầu | Input Text | Có | | Định danh mã tài sản (Ví dụ: BR-THT-01, không quá 30 char) |\n| 2 | Loại kết cấu & Số nhịp | Select / Number | Có | 1 | Dropdown từ API \`/api/danhmuc/ketcau\`, Số nhịp > 0 |\n| 3 | Lý trình & Tọa độ | Map-Picker | Có | | Sử dụng component \`<MapPicker/>\` để chấm tọa độ [Lat, Lng] |\n| 4 | Hồ sơ thiết kế | Upload | Không | | Mảng Array(Files), validate .pdf/.dwg, mỗi file <20MB |`,
  'biển báo': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Loại cột và mã biển | Select Box | Có | | Dropdown load dữ liệu danh sách mã Biển Báo giao thông (chuẩn QCVN 41:2019) |\n| 2 | Nội dung cảnh báo | Text / Switch | Không | | TextField hỗ trợ multi-line. Toggle switch "Cấm theo giờ", nếu turn ON thì render block Time Picker Range |\n| 3 | Tọa độ lắp đặt | Pick on Map | Có | | Trỏ điểm click trên bản đồ nhỏ gọn, lưu thành mảng [x, y] |\n| 4 | Hình ảnh hiện trạng | Camera/Upload| Có | | Chụp ảnh thiết bị / Cột ở ngoài thực địa đẩy vào Media Server |`,
  'tuyến đường': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thông tin quy hoạch | Group Input | Có | | Tên tuyến (\`maxLength: 50\`), Cấp hạng (\`Combobox\`), Chiều dài tuyến \`Integer\` |\n| 2 | Cấu hình cờ trạng thái | Switch / Radio | Có | Hoạt động | \`isActive=1\` (Đang vận hành), \`isActive=0\` (Khép kín chờ thi công / Hủy) |\n| 3 | Quỹ đạo Line GIS | Polyline Draw| Có | | Hệ thống Tools Draw: Click đúp kết thúc tuyến đường. Data save dưới dạng chuẩn KML/LineString GeoJSON |`,
  'đường bộ': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Thông tin quy hoạch | Group Input | Có | | Mã tuyến, Tên tuyến (\`req: required\`), Cấp hạng (\`Combobox\`), Chiều dài tuyến \`Integer\` |\n| 2 | Cấu hình trạng thái | Switch / Radio | Có | Hoạt động | \`isActive=1\` (Đang hoạt động), \`isActive=0\` (Khép kín) |\n| 3 | Quỹ đạo Line | Polyline Draw| Có | | Thư viện Leaflet.draw bắt buột nhập chuỗi LineString tọa độ |`,
  'tổ chức giao thông': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Tên Phương án TC | Input Text | Có | | Đặt tên lưu lịch sử (Ví dụ: Đóng dải phân cách tạm nút giao...) |\n| 2 | Cấu hình lệnh cấm/xoay | Multi-Select | Có | | Combobox Multi (Cấm rẽ trái, Cấm xe khách), StartDate, EndDate |\n| 3 | Phác thảo & Quyết định | Document | Có | | PDF/Image scan có chữ ký mộc đỏ cho phép thi công thay đổi |`,
  'danh mục': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Mã danh mục | Input Text | Có | | \`unique=True\` - Mã ký hiệu dùng khi lưu database |\n| 2 | Tên định nghĩa phân loại | Input Text | Có | | Tên hiển thị người dùng nhìn thấy |\n| 3 | Trạng thái hiển thị | Switch | Có | Default On| Cờ dùng để ẩn dòng dữ liệu khi không cần dùng nữa thay vì XÓA cứng record |`,
  'default_form': `| STT | Tên trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |\n| :--- | :--- | :--- | :---: | :--- | :--- |\n| 1 | Khu vực hiển thị trung tâm | Control Field | Có | | Các control Text/Number/Dropdown lấy theo Table Schema tương ứng của tính năng. Validation Frontend đầy đủ. |\n| 2 | Trạng thái kỹ thuật | Radio/Switch | Có | Hoạt động| Checkbox phân loại trạng thái: Đang hoạt động / Khóa chặn truy cập |`
};

function getTable(title, isForm) {
  let lower = title.toLowerCase();
  let dict = isForm ? formTables : detailTables;
  
  if (lower.includes('cầu')) return dict['cầu'];
  if (lower.includes('hầm')) return dict['hầm'];
  if (lower.includes('biển báo')) return dict['biển báo'];
  if (lower.includes('vms') || lower.includes('điện tử')) return dict['vms'] || dict['đèn tín hiệu'];
  if (lower.includes('đèn tín hiệu')) return dict['đèn tín hiệu'];
  if (lower.includes('tổ chức giao thông')) return dict['tổ chức giao thông'];
  if (lower.includes('tuyến đường')) return dict['tuyến đường'];
  if (lower.includes('đường bộ')) return dict['đường bộ'];
  
  // Logic for defaults
  if (isForm) {
      if (lower.includes('danh mục')) return dict['danh mục'];
      return dict['default_form'];
  } else {
      if (lower.includes('danh sách')) return dict['danh sách'];
      if (lower.includes('báo cáo') || lower.includes('thống kê')) return dict['báo cáo'];
      if (lower.includes('bản đồ') || lower.includes('gis')) return dict['bản đồ'];
      if (lower.includes('dashboard') || lower.includes('tổng quan')) return dict['dashboard'];
      return dict['default_view'];
  }
}

// Default standard Functions tables based on UI patterns
function getFunctionTable(title, isForm) {
    let lower = title.toLowerCase();
    
    // List screens usually have Thêm, Xong, Xem, Xóa, Lọc
    if (lower.includes('danh sách') || (!isForm && !lower.includes('chi tiết') && !lower.includes('popup'))) {
        return `| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Nút Tìm kiếm/Lọc | Button | Thực thi gửi Request lọc params API và Reload DataGrid |\n| 2 | Nút Thêm mới | Button | Mở Model/Popup nhảy sang Route Add Item |\n| 3 | Xuất File Excel | Button (Dropdown) | Gọi logic Export trả về Blob data \`.xlsx\` tải về máy |\n| 4 | Nút Trạng thái Active/Inactive | Switch | Cho phép bật tắt nhanh trạng thái (Inline Update) |\n| 5 | Các tính năng dòng (Edit/Del)| Button Icon | Sửa bản ghi, hoặc hiện Confirm Dialog trước khi Xóa cứng (DELETE) |`;
    }
    
    // Báo cáo
    if (lower.includes('báo cáo')) {
        return `| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Xác nhận tham số (Generate) | Button Primary | Tổng hợp SQL/Aggregation theo Params gửi lên Backend |\n| 2 | Export PDF/Word | Button Menu | Build Report UI bằng \`html2pdf\` hoặc lấy tệp tĩnh từ Server trả về |\n| 3 | Print Trực tiếp | Button | Khởi động Printer window của Browser in văn bản khổ A4 |`;
    }
    
    // Map Screens
    if (lower.includes('bản đồ') || lower.includes('gis')) {
         return `| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Thao tác Chạm/Kéo | Mouse Event | Tương tác \`onDrag\`, \`onZoom\` update Center coordinate states |\n| 2 | Bật lớp (Toggle Layer) | Widget Panel | Hook checkbox trigger render lại thẻ \`<GeoJSON>\` hoặc \`<Marker>\` trỏ từ List Layer Map |\n| 3 | Click Event Marker (Popup)| Mouse Event | Kích vào điểm sẽ hiện Tooltip popup (Mini summary) chứa link \`Xem chi phí/chi tiết\` tài sản |`;
    }

    // Forms
    if (isForm) {
        return `| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Lưu dữ liệu (Submit) | Button (Primary) | Gọi hàm POST/PUT Request chặn spam click, Validations check. Thành công đẩy \`Toast Notification\` |\n| 2 | Hủy / Hủy bỏ | Button (Ghost) | Trở lại list màn hình trước hoặc Close Modal (báo thay đổi chưa lưu nếu detect Dirty States) |\n| 3 | Chọn Tọa độ | Map Modal | Kích vào Mở hộp thoại Popup Map lấy Vĩ độ, Kinh độ theo Location người dùng trỏ | `
    }
    
    // View detail
    return `| STT | Tên chức năng | Định dạng | Mô tả |\n| :--- | :--- | :--- | :--- |\n| 1 | Tắt cửa sổ | Button Icon (X) | Đóng View Mode quay ra màn hình List cha |\n| 2 | Sửa chữa (Chuyển chế độ Edit)| Button | Update trạng thái React State từ readonly sang Edit mode đối với component |\n| 3 | Chia sẻ / In ấn | Button | Tiện ích mở rộng báo cáo/In |`
}


// GENERATE FULL MARKDOWN
let mdContent = `# YÊU CẦU GIAO DIỆN VÀ TÍNH NĂNG CHI TIẾT

Tài liệu này đóng vai trò thiết kế chi tiết Single Source of Truth chứa đặc tả BA cho **toàn bộ 626 màn hình và chức năng** đã liệt kê trong quy hoạch \`danhsachmanhinh.md\`.

---
`;

let ch1Idx = 1;
for (let l1 of hierarchy) {
    mdContent += `\n# ${ch1Idx}. ${l1.title}\n\n`;
    
    // Standalone screens
    let sIdx = 1;
    for (let s of l1.standaloneScreens) {
        mdContent += renderScreen(s, ch1Idx, sIdx, null);
        sIdx++;
    }
    
    // L2 Groups
    let ch2Idx = 1;
    for (let l2 of l1.l2) {
        let prefix = `${ch1Idx}.${ch2Idx}`;
        mdContent += `\n## ${prefix}. ${l2.title}\n\n`;
        
        let scIdx = 1;
        for (let s of l2.screens) {
             mdContent += renderScreen(s, ch1Idx, ch2Idx, scIdx);
             scIdx++;
        }
        ch2Idx++;
    }
    
    ch1Idx++;
}

function renderScreen(s, l1, l2, l3) {
    let headingLevel = l3 === null ? `## ${l1}.${l2}` : `### ${l1}.${l2}.${l3}`;
    if (l3 === null) { headingLevel = `### ${l1}.${l2}`; } // adjust heading a bit if direct child
    
    let isForm = s.name.toLowerCase().includes('thêm') || s.name.toLowerCase().includes('sửa') || s.name.toLowerCase().includes('cập nhật');
    let isView = s.name.toLowerCase().includes('chi tiết') || s.name.toLowerCase().includes('xem') || s.name.toLowerCase().includes('popup');
    if (!isForm && !isView) {
        // Generic screen
        isForm = false;
    }
    
    let tInfo = getTable(s.name, isForm);
    let tFunc = getFunctionTable(s.name, isForm);
    
    let content = `${headingLevel} ${s.name}

- **Mã chức năng:** \`${s.funcId}\`
- **Mã thiết kế màn hình:** \`${s.code}\`

**Màn hình/Hình ảnh minh họa**
*Nếu giao diện đã phát triển, Mockup/UI sẽ được hiển thị như bên dưới.*

![_${s.code}.png](images/ui/_${s.code}.png)

*Hình - ${s.name}*

##### Thông tin / Cấu trúc Dữ liệu trên màn hình

${tInfo}

##### Mô tả luồng Chức năng & Tương tác

${tFunc}

`;
    return content;
}

fs.writeFileSync(destFile, mdContent, 'utf8');
console.log("Successfully generated", destFile);
