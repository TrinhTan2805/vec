const fs = require('fs');

const path = 'src/app/components/layout/DashboardLayout.tsx';
let content = fs.readFileSync(path, 'utf-8');

const newNavItems = `const mainNavItems: NavItem[] = [
  {
    title: "Màn hình chính (Dashboard)",
    icon: <LayoutDashboard className="size-5 text-blue-500" />,
    children: [
      { title: "Tổng quan hệ thống", icon: <CircleDot className="size-3" />, href: "/" },
      { title: "Tích hợp & Chia sẻ dữ liệu", icon: <CircleDot className="size-3" />, href: "/he-thong/tich-hop-api" },
    ],
  },
  {
    title: "Phân hệ Quản trị hệ thống",
    icon: <Settings className="size-5 text-slate-600" />,
    children: [
      {
        title: "Modules Quản trị hệ thống",
        icon: <ShieldCheck className="size-4" />,
        children: [
          { title: "Nhóm quyền người dùng", icon: <CircleDot className="size-3" />, href: "/admin/nhom-quyen" },
          { title: "Tài khoản người dùng", icon: <CircleDot className="size-3" />, href: "/admin/tai-khoan" },
          { title: "Cơ cấu tổ chức", icon: <CircleDot className="size-3" />, href: "/admin/co-cau-to-chuc" },
          { title: "Danh mục địa phận", icon: <CircleDot className="size-3" />, href: "/admin/danh-muc-dia-phan" },
          { title: "Lịch sử hệ thống", icon: <CircleDot className="size-3" />, href: "/he-thong/nhat-ky" },
          { title: "Thiết lập cảnh báo", icon: <CircleDot className="size-3" />, href: "/he-thong/cau-hinh-canh-bao" },
          { title: "Thông báo", icon: <CircleDot className="size-3" />, href: "/admin/thong-bao" },
        ],
      },
      {
        title: "Modules quản trị danh mục",
        icon: <Table className="size-4" />,
        children: [
          { title: "Quy định danh mục loại phản ánh", icon: <CircleDot className="size-3" />, href: "/danh-muc/loai-phan-anh" },
          { title: "Quy định danh mục mức độ sự cố", icon: <CircleDot className="size-3" />, href: "/danh-muc/muc-do-su-co" },
          { title: "Quy định danh mục nguyên nhân sự cố", icon: <CircleDot className="size-3" />, href: "/danh-muc/nguyen-nhan-su-co" },
          { title: "Phòng ban, Trung tâm VEC", icon: <CircleDot className="size-3" />, href: "/danh-muc/phong-ban" },
          { title: "Tuyến cao tốc", icon: <CircleDot className="size-3" />, href: "/danh-muc/tuyen-cao-toc" },
          { title: "Đơn vị quản lý, khai thác", icon: <CircleDot className="size-3" />, href: "/danh-muc/don-vi" },
          { title: "Tài sản trên tuyến", icon: <CircleDot className="size-3" />, href: "/danh-muc/tai-san" },
          { title: "Thiết bị (VP, CNTT)", icon: <CircleDot className="size-3" />, href: "/danh-muc/thiet-bi" },
          { title: "Kho vật lý", icon: <CircleDot className="size-3" />, href: "/danh-muc/kho-vat-ly" },
          { title: "Hồ sơ tài sản", icon: <CircleDot className="size-3" />, href: "/danh-muc/ho-so-tai-san" },
          { title: "Đánh giá bảo trì", icon: <CircleDot className="size-3" />, href: "/danh-muc/danh-gia-bao-tri" },
          { title: "Đánh giá sửa chữa", icon: <CircleDot className="size-3" />, href: "/danh-muc/danh-gia-sua-chua" },
          { title: "Tiêu chí vận hành", icon: <CircleDot className="size-3" />, href: "/danh-muc/tieu-chi-van-hanh" },
          { title: "Sơ đồ mặt bằng", icon: <CircleDot className="size-3" />, href: "/danh-muc/so-do-mat-bang" },
          { title: "Lớp tài sản", icon: <CircleDot className="size-3" />, href: "/danh-muc/lop-tai-san" },
        ],
      },
      {
        title: "Quản lý tích hợp, chia sẻ",
        icon: <Zap className="size-4" />,
        children: [
          { title: "Cấu hình đồng bộ DMDC", icon: <CircleDot className="size-3" />, href: "/admin/dong-bo-dmdc" },
          { title: "API đồng bộ danh mục", icon: <CircleDot className="size-3" />, href: "/admin/api-dong-bo" },
          { title: "Nhật ký trao đổi dữ liệu", icon: <CircleDot className="size-3" />, href: "/admin/log-trao-doi" },
          { title: "Đồng bộ tài khoản SSO", icon: <CircleDot className="size-3" />, href: "/admin/dong-bo-sso" },
          { title: "Xác thực người dùng SSO", icon: <CircleDot className="size-3" />, href: "/admin/xac-thuc-sso" },
        ],
      },
    ],
  },
  {
    title: "Phân hệ Quản lý tài sản trên đường cao tốc",
    icon: <Building2 className="size-5 text-emerald-600" />,
    children: [
      {
        title: "Quản lý tài sản trên bản đồ",
        icon: <MapIcon className="size-4" />,
        href: "/ban-do",
      },
      {
        title: "Quản lý thiết bị trên sơ đồ mặt bằng",
        icon: <LandPlot className="size-4" />,
        href: "/so-do-mat-bang",
      },
      {
        title: "Quản lý tài sản trên bình đồ duỗi thẳng",
        icon: <Ruler className="size-4" />,
        children: [
          { title: "Bình đồ đoạn đường bộ", icon: <CircleDot className="size-3" />, href: "/binh-do/doan-duong" },
          { title: "Bình đồ cầu lớn", icon: <CircleDot className="size-3" />, href: "/binh-do/cau-lon" },
          { title: "Bình đồ nút giao", icon: <CircleDot className="size-3" />, href: "/binh-do/nut-giao" },
        ],
      },
      {
        title: "Quản lý mô hình BIM",
        icon: <Layers className="size-4" />,
        href: "/bim",
      },
      {
        title: "Nghiệp vụ quản lý tài sản",
        icon: <Activity className="size-4" />,
        children: [
          { title: "Tài sản phụ trợ", icon: <CircleDot className="size-3" />, href: "/phu-tro/bien-bao" },
          { title: "Quản lý Kho & Vật tư", icon: <CircleDot className="size-3" />, href: "/tai-san/kho" },
          { title: "Kiểm kê & Đối soát", icon: <CircleDot className="size-3" />, href: "/tai-san/kiem-ke" },
          { title: "Thanh lý tài sản", icon: <CircleDot className="size-3" />, href: "/tai-san/thanh-ly" },
          { title: "Tổ chức giao thông", icon: <CircleDot className="size-3" />, href: "/to-chuc-giao-thong" },
          { title: "Đường thủy & Đường sắt", icon: <CircleDot className="size-3" />, href: "/ban-do-thuy" },
        ],
      },
    ],
  },
  {
    title: "Phân hệ Quản lý bảo trì, bảo dưỡng",
    icon: <Wrench className="size-5 text-amber-500" />,
    children: [
      {
        title: "Lập kế hoạch bảo trì",
        icon: <History className="size-4" />,
        href: "/bao-tri/ke-hoach",
      },
      {
        title: "Quản lý tiếp nhận và xử lý yêu cầu trong quản lý khai thác",
        icon: <ShieldAlert className="size-4" />,
        href: "/bao-ve-ha-tang",
      },
      {
        title: "Duy tu các công trình",
        icon: <Hammer className="size-4" />,
        children: [
          { title: "Sửa chữa mặt đường bộ", icon: <CircleDot className="size-3" />, href: "/duy-tu/sua-chua-mat-duong" },
          { title: "Sửa chữa mặt đường cầu lớn", icon: <CircleDot className="size-3" />, href: "/duy-tu/sua-chua-cau-lon" },
          { title: "Nhóm Công trình Cầu & Hầm", icon: <CircleDot className="size-3" />, href: "/duy-tu/cau-ham" },
          { title: "Nhóm Kết cấu Đường bộ & Phụ trợ", icon: <CircleDot className="size-3" />, href: "/duy-tu/ket-cau-phu-tro" },
          { title: "Nhóm Báo hiệu & Chỉ dẫn", icon: <CircleDot className="size-3" />, href: "/duy-tu/bao-hieu-chi-dan" },
          { title: "Nhóm Đèn tín hiệu & Camera", icon: <CircleDot className="size-3" />, href: "/duy-tu/tin-hieu-camera" },
          { title: "Nhóm Giao cắt & Công trình khác", icon: <CircleDot className="size-3" />, href: "/duy-tu/giao-cat-khac" },
        ],
      },
      {
        title: "Bàn giao thi công XDCB",
        icon: <GitMerge className="size-4" />,
        href: "/duy-tu/ban-giao-xdcb",
      },
    ],
  },
  {
    title: "Phân hệ Giám sát hoạt động vận hành và bảo trì, bảo dưỡng",
    icon: <AlertTriangle className="size-5 text-red-500" />,
    children: [
      {
        title: "Đánh giá chấm điểm theo tiêu chuẩn TCVN/AASHTO",
        icon: <Activity className="size-4" />,
        children: [
          { title: "Đánh giá TCVN/AASHTO", icon: <CircleDot className="size-3" />, href: "/bao-tri/danh-gia-tcvn" },
          { title: "Báo cáo công tác bảo vệ KCHT", icon: <CircleDot className="size-3" />, href: "/bao-cao/phan-anh-su-co" },
          { title: "Báo cáo hiện trạng KCHT", icon: <CircleDot className="size-3" />, href: "/bao-cao/hien-trang-cau-duong" },
        ],
      },
      {
        title: "Thiết lập tuần tra",
        icon: <Shield className="size-4" />,
        href: "/bao-ve/tuan-tra",
      },
      {
        title: "Kiểm tra, bảo vệ",
        icon: <Shield className="size-4" />,
        href: "/bao-ve/kiem-tra-kcht",
      },
    ],
  },
];`;

const startMarker = 'const roadNavItems: NavItem[] = [';

const startIdx = content.indexOf(startMarker);
const moduleStartIdx = content.indexOf('const moduleNavItems = {');
let endIdx = -1;
if (moduleStartIdx !== -1) {
  const closingBrace = content.indexOf('};', moduleStartIdx);
  endIdx = closingBrace + 2;
}

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + newNavItems + '\n' + content.slice(endIdx);
} else {
  console.log("Could not find array definitions to replace.");
}

content = content.replace(/const \[activeModule, setActiveModule\] = useState[^\n]*\n/, '');
content = content.replace(/const currentNavItems = moduleNavItems\[activeModule\];/g, 'const currentNavItems = mainNavItems;');

const switcherStart = content.indexOf('{/* Module Switcher */}');
if (switcherStart !== -1) {
  const searchStart = content.indexOf('{/* Search */}');
  if (searchStart !== -1) {
    content = content.slice(0, switcherStart) + content.slice(searchStart);
  }
}

content = content.replace(/\[menuSearchQuery, activeModule\]/g, '[menuSearchQuery]');

fs.writeFileSync(path, content, 'utf-8');
console.log('Successfully refactored DashboardLayout.tsx!');
