import urllib.request
import base64
import zlib
import os

def generate_svg(mermaid_text, filename):
    compressed = zlib.compress(mermaid_text.encode('utf-8'), 9)
    encoded = base64.urlsafe_b64encode(compressed).decode('utf-8')
    url = f"https://kroki.io/mermaid/svg/{encoded}"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(filename, 'wb') as f:
        f.write(response.read())
    print(f"Generated {filename}")

# 1. Master Data Flow
master = """
graph TD
    subgraph "Nguồn phát sinh (CLIENTS)"
        M_APP["Ứng dụng Di động<br>- Tuần đường<br>- Báo sự cố"]
        W_APP["Portal Web<br>- Nhập liệu thủ công"]
    end

    subgraph "API GATEWAY & LOGIC"
        direction TB
        AUTH["Xác thực (SSO)"]
        ROUT["Phân luồng Dữ liệu"]
        AUTH --> ROUT
    end

    subgraph "Kho Lưu trữ (DATABASES)"
        DB_ASSET[("CSDL Tài sản Hạ tầng")]
        DB_INCIDENT[("CSDL Sự cố & Vi phạm")]
        DB_PATROL[("CSDL Tuần đường")]
        DB_MAINTAIN[("CSDL Bảo trì")]
    end

    subgraph "Thống kê (OUTPUTS)"
        DASH["Dashboard KPIs"]
        GIS["Bản đồ GIS 3D"]
        REP["Xuất Báo cáo Excel"]
    end

    M_APP & W_APP --> AUTH
    ROUT --> DB_ASSET & DB_INCIDENT & DB_PATROL & DB_MAINTAIN
    DB_ASSET & DB_INCIDENT & DB_PATROL & DB_MAINTAIN --> DASH & GIS & REP
"""

# 2. Asset Collection Flow
asset = """
sequenceDiagram
    participant Mobile as App Mobile
    participant Web as Web Admin
    participant DB as CSDL Tài sản
    participant Report as Báo cáo

    Mobile->>Mobile: Định vị GPS & Chụp ảnh
    Mobile->>Mobile: Nhập form tài sản
    Mobile->>Web: Gọi API POST/assets
    Note over Web: Trạng thái: Chờ duyệt
    Web->>Web: Tinh chỉnh Tọa độ theo GIS
    Web->>DB: Phê duyệt (Duyệt/Từ chối)
    Note over DB: Trạng thái: Hoạt động
    Web->>Report: Cập nhật Báo cáo Hiện trạng
"""

# 3. Incident Flow
incident = """
graph TD
    A[Mobile App: Báo cáo Sự cố] -->|Ảnh + GPS| B[API: Phân tuyến tự động]
    B --> C{Web App: Socket Push}
    C --> |Đẩy cho Admin khu vực| D[Chuyên viên Web: Tiếp nhận]
    D --> E{Mobile: Cán bộ ra Xử lý}
    E --> |Upload ảnh hoàn thành| F[CSDL: Cập nhật "Đã Xử Lý"]
    F --> G[Báo cáo Tình hình Sự cố]
"""

# 4. Patrol Flow
patrol = """
sequenceDiagram
    participant W as Web Admin
    participant M as Mobile App
    participant DB as CSDL Tracking
    participant R as Báo cáo

    W->>DB: Lập Kế hoạch Tuần đường
    DB-->>M: Đồng bộ lịch
    M->>M: Chọn "Bắt đầu ca"
    loop Mỗi 30 giây
        M->>DB: Bắn API Background GPS
    end
    M->>M: Chụp ảnh Check-in
    M->>DB: Trình Nhật ký cuối ngày
    W->>DB: Xét duyệt Quãng đường Đi vs Kế hoạch
    W->>R: Lên Báo cáo Tuần đường
"""

# 5. Maintenance Flow
maintenance = """
graph TD
    A[Lập Kế hoạch Duy tu] --> B[Duyệt Dự toán & Kế hoạch]
    B --> C[Phát Lệnh công tác]
    C --> D[Mobile: Đội bảo trì tiếp nhận]
    D --> E[Mobile: Thi công & Upload khối lượng]
    E --> F[Web: Nghiệm thu Bàn giao]
    F --> G[DB: Đổi Trạng thái Tài sản thành 'Tốt']
    F --> H[Lưu Lịch sử bảo hành Tài sản]
    G & H --> I[Báo cáo Công tác Sửa chữa]
"""

# Admin Flow
admin = """
graph TD
    subgraph "Identity Provider"
        SSO["Cổng SSO Hà Nội"]
    end
    subgraph "Luồng Admin & Security"
        Sync["Đồng bộ User & Token"]
        Role["Gán Nhóm quyền"]
        Org["Ghép Cơ cấu / Địa phận"]
        SSO --> Sync --> Role --> Org
    end
    subgraph "Audit & Notice"
        Log["Ghi vết Tác động & Lỗi"]
        Push["Bắn API Log Tập trung (SOC)"]
        Notif["Gửi Push Notification/Socket"]
        Org --> Log --> Push
        Org --> Notif
    end
"""

base_dir = r"d:\GiaoThongHaNoi\vec\tailieu\images"
os.makedirs(base_dir, exist_ok=True)

generate_svg(master, os.path.join(base_dir, "flow_master.svg"))
generate_svg(asset, os.path.join(base_dir, "flow_asset.svg"))
generate_svg(incident, os.path.join(base_dir, "flow_incident.svg"))
generate_svg(patrol, os.path.join(base_dir, "flow_patrol.svg"))
generate_svg(maintenance, os.path.join(base_dir, "flow_maintenance.svg"))
generate_svg(admin, os.path.join(base_dir, "flow_admin.svg"))
