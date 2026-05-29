# TÀI LIỆU PHÂN TÍCH NGHIỆP VỤ (BUSINESS ANALYSIS REPORT)

**Dự án:** Phần mềm quản lý tài sản và bảo trì, bảo dưỡng trên các tuyến đường cao tốc do VEC quản lý.
**Mục đích:** Đánh giá độ lệch (Gap Analysis) giữa hệ thống mã nguồn hiện tại (kế thừa từ dự án Giao thông Hà Nội) và tài liệu yêu cầu nghiệp vụ mới (UC.md gồm 243 Use Cases).

---

## 1. TỔNG QUAN ĐÁNH GIÁ (EXECUTIVE SUMMARY)

Hệ thống hiện tại có nền tảng vững chắc về **WebGIS** (Bản đồ số), **Quản lý danh mục tài sản hạ tầng** và **Quản lý tuần tra hiện trường**. Các tính năng này đáp ứng được khoảng **40-45%** số lượng Use Case trong hệ thống mới của VEC.

Phần **55-60%** còn lại là các nghiệp vụ đặc thù của doanh nghiệp quản lý đường cao tốc như: Quản lý Kho, Đánh giá chuyên sâu (TCVN/AASHTO), Quản lý BIM, và Quy trình thanh lý tài sản. Đây là những module hoàn toàn mới, cần bổ sung.

---

## 2. CÁC MODULE ĐÃ CÓ (CẦN GIỮ LẠI VÀ CHỈNH SỬA NHẸ)

Đây là những module đã được xây dựng hoàn thiện trong dự án cũ, đối ứng rất tốt với các yêu cầu của VEC:

| Phân hệ trong UC.md | Tình trạng mã nguồn hiện tại | Đánh giá / Cần làm thêm |
| :--- | :--- | :--- |
| **Quản trị hệ thống** (SSO, Phân quyền, Log, Timeout, Policy) | **Đã có** (`src/app/pages/admin/*`) | Cơ bản đã đầy đủ, hỗ trợ chuẩn Quy định 742. Chỉ cần đổi logo/tên dự án (đã thực hiện). |
| **Nghiệp vụ quản lý tài sản** (Cầu, Đường, Biển báo, Cống, Hố ga, Công trình an toàn...) | **Đã có** (`src/app/pages/duong-bo`, `cau`, `phu-tro`, `cong-nghe`) | Rất chi tiết. Có sẵn giao diện dạng danh sách và form khai báo cho hơn 20 loại tài sản. |
| **Quản lý tài sản trên bản đồ (WebGIS)** | **Đã có** (`src/app/components/map/`) | Đã tích hợp Leaflet/GeoJSON. Đáp ứng các UC về định vị, tìm kiếm và xem trực quan trên bản đồ số. |
| **Quản lý tài sản trên bình đồ duỗi thẳng** | **Đã có** (`src/app/pages/binh-do/*`) | Đã có bình đồ cho đoạn đường, cầu lớn và nút giao. |
| **Báo cáo tổng hợp** | **Đã có** (`src/app/pages/reports/`) | Đã có báo cáo hiện trạng, báo cáo tuần tra, phản ánh sự cố. |
| **Màn hình chính (Dashboard)** | **Đã có** (`DashboardPage`, `OverviewPage`) | Đã có biểu đồ thống kê cơ bản, heatmap lưu lượng. |

---

## 3. CÁC MODULE CHƯA CÓ (CẦN PHÁT TRIỂN MỚI HOÀN TOÀN)

Dưới đây là các nhóm nghiệp vụ (Use Cases) có trong `UC.md` nhưng mã nguồn hiện tại **HOÀN TOÀN CHƯA CÓ**, cần được thiết kế và bổ sung mới:

### 3.1. Quản lý Mô hình BIM 3D
- **Tình trạng:** *Mới code khung giao diện demo (`BimDashboard.tsx`), chưa có logic lõi.*
- **UC yêu cầu:** Tích hợp, xem, tương tác, đo đạc, bóc tách khối lượng từ mô hình BIM (IFC/Revit); gắn cảnh báo lên đối tượng 3D.
- **Mức độ ưu tiên:** **Cao** (Tính năng "Wow" và cốt lõi của VEC).

### 3.2. Đánh giá Chấm điểm theo Tiêu chuẩn (TCVN/AASHTO)
- **Tình trạng:** *Mới code khung giao diện demo (`TcvnAssessment.tsx`).*
- **UC yêu cầu:** Tính chỉ số gồ ghề mặt đường (IRI), chấm điểm tình trạng mặt đường (PCI), tình trạng cầu (BCI) dựa trên số liệu khảo sát. Thuật toán tự động gợi ý sửa chữa.
- **Mức độ ưu tiên:** **Rất Cao** (Nghiệp vụ bắt buộc trong duy tu cao tốc).

### 3.3. Nghiệp vụ Quản lý Kho & Vật tư
- **Tình trạng:** Chưa có giao diện và logic.
- **UC yêu cầu:** Quản lý danh mục kho vật lý trên tuyến; Quản lý nhập/xuất kho; Cập nhật tài sản thu hồi lưu kho; Điều chuyển kho giữa các hạt quản lý.
- **Mức độ ưu tiên:** **Cao**.

### 3.4. Quản lý Kiểm kê, Thanh lý & Thanh hủy Tài sản
- **Tình trạng:** Chưa có luồng nghiệp vụ.
- **UC yêu cầu:** Tạo phiếu kiểm kê thực địa, so sánh dữ liệu số và thực tế; Quy trình trình duyệt thanh lý/thanh hủy tài sản hết khấu hao hoặc hư hỏng nặng.
- **Mức độ ưu tiên:** **Trung bình - Cao**.

### 3.5. Lập Kế hoạch Bảo trì (Bảo dưỡng thường xuyên / Sửa chữa lớn)
- **Tình trạng:** Hiện tại mới chỉ có module "Tuần tra" và "Kiểm tra KCHT", *chưa có phân hệ Lập kế hoạch*. (Đã code khung giao diện demo `MaintenancePlanning.tsx`).
- **UC yêu cầu:** Quản lý vòng đời kế hoạch: Từ lúc Lập KH -> Phê duyệt -> Triển khai -> Nghiệm thu cho các loại (Thường xuyên, Định kỳ, Đột xuất).
- **Mức độ ưu tiên:** **Rất Cao**.

### 3.6. Dịch vụ Tích hợp & Sơ đồ mặt bằng thiết bị (2D)
- **Tình trạng:** Chưa có.
- **UC yêu cầu:** Quản lý thiết bị trên sơ đồ mặt bằng (nhà điều hành, trạm thu phí); Các dịch vụ API kết nối chia sẻ dữ liệu với Bộ GTVT.
- **Mức độ ưu tiên:** **Trung bình**.

---

## 4. CÁC MODULE DƯ THỪA (KHÔNG DÙNG ĐẾN TRONG DỰ ÁN MỚI)

Do dự án cũ (Giao thông Hà Nội) phục vụ quản lý giao thông đô thị tổng hợp, nên mã nguồn hiện tại đang chứa nhiều tính năng **không thuộc phạm vi quản lý của VEC** (VEC chỉ quản lý Đường Cao Tốc). Dựa trên `UC.md`, các màn hình sau là dư thừa và **CẦN ĐƯỢC GỠ BỎ HOẶC ẨN ĐI** để hệ thống tinh gọn:

| Phân hệ dư thừa trong mã nguồn | File / Route hiện tại | Đánh giá / Khuyến nghị |
| :--- | :--- | :--- |
| **Quản lý Đường thủy nội địa** | Các route `duong-thuy/*`, `cang-ben-thuy`, `phuong-tien-thuy` | Giao thông đường thủy (phao, luồng tuyến, bến phà, thủy chí) không thuộc VEC. **Nên gỡ bỏ hoàn toàn**. |
| **Quản lý Đường sắt đô thị** | Các route `duong-sat/*`, `ga-duong-sat`, `ha-tang-duong-ray` | VEC không quản lý đường sắt đô thị (depot, ga, trụ cầu metro). **Nên gỡ bỏ hoàn toàn**. |
| **Cấp phép thi công (Đào đường)** | Route `cap-phep/giay-phep-dao-duong` | Nghiệp vụ đào đường chủ yếu của giao thông đô thị (cấp nước, điện ngầm), ít dùng trên cao tốc. **Có thể ẩn đi**. |
| **Hạ tầng vận tải hành khách** | Route `ha-tang-van-tai` | Quản lý bến xe khách, điểm dừng xe buýt... không thuộc phạm vi cao tốc. **Nên gỡ bỏ**. |
| **Một số công trình đô thị đặc thù** | `duong-ngang` (đường ngang dân sinh), `he-thong-thoat-nuoc` (thoát nước đô thị ngầm) | Cao tốc có cống thoát nước nhưng không quản lý hệ thống cống ngầm phức tạp như đô thị. Cần tinh chỉnh lại danh mục. |

---

## 5. KẾT LUẬN VÀ LỘ TRÌNH ĐỀ XUẤT (ROADMAP)

Dự án mới (VEC) có thể tận dụng lại gần như toàn bộ hệ thống lõi (Core) của dự án cũ để tiết kiệm thời gian (đặc biệt là WebGIS và Quản trị danh mục). 

**Lộ trình bổ sung tính năng khuyến nghị:**
1. **Giai đoạn 1 (Tuần 1-2):** Hoàn thiện phân hệ **Đánh giá TCVN/AASHTO** và **Lập kế hoạch bảo trì**. Đây là 2 nghiệp vụ quan trọng nhất để lên lịch sửa chữa đường.
2. **Giai đoạn 2 (Tuần 3-4):** Xây dựng luồng **Nghiệp vụ Kho, Kiểm kê và Thanh lý**. Hoàn chỉnh vòng đời quản lý tài sản.
3. **Giai đoạn 3 (Tuần 5-6):** Tích hợp **Mô hình BIM 3D**. Cần thời gian nghiên cứu SDK (như Autodesk Forge hoặc thư viện mã nguồn mở IFC.js) để tích hợp vào React.
4. **Giai đoạn 4 (Tuần 7-8):** Các tính năng còn lại (Sơ đồ mặt bằng, Dịch vụ tích hợp, Báo cáo chuyên sâu).
