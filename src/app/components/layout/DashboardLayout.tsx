import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Menu,
  Home,
  Route,
  Construction,
  Building2,
  CircleDot,
  GitMerge,
  ArrowRightLeft,
  Navigation,
  Shield,
  Hammer,
  Wrench,
  ShieldAlert,
  AlertCircle,
  FileText,
  Map as MapIcon,
  BarChart3,
  Settings,
  Ruler,
  Layers,
  Truck,
  LogOut,
  Search,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  X,
  LandPlot,
  Info,
  Edit,
  Trash2,
  Table,
  Plus,
  Eye,
  HardHat,
  AlertTriangle,
  Waves,
  Zap,
  ShieldCheck,
  Activity,
  UserCheck,
  Milestone,
  TrafficCone,
  ArrowRight,
  Lightbulb,
  TrainFront,
  Ship,
} from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";
import { NotificationDropdown } from "../header/NotificationDropdown";
import { UserProfileDropdown } from "../header/UserProfileDropdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Clock, History } from "lucide-react";
import deployHistory from "../../../deploy-history.json";

const RoadBridgeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Road Background - Vertical with perspective */}
    <path d="M8 2L6 22H18L16 2H8Z" />

    {/* Road Markings */}
    <line x1="12" y1="4" x2="12" y2="7" stroke="white" strokeWidth="0.8" strokeDasharray="1.5 1" />
    <line x1="12" y1="15" x2="12" y2="20" stroke="white" strokeWidth="0.8" strokeDasharray="1.5 1" />

    {/* Bridge - Horizontal structure */}
    <rect x="3" y="9" width="18" height="4.5" rx="0.5" />
    <line x1="3" y1="10.5" x2="21" y2="10.5" stroke="white" strokeWidth="0.5" opacity="0.4" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="0.5" opacity="0.4" />

    {/* Bridge Supports */}
    <rect x="4.5" y="13.5" width="1.5" height="4" rx="0.2" />
    <rect x="18" y="13.5" width="1.5" height="4" rx="0.2" />
  </svg>
);

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  children?: NavItem[];
  isSearchMatch?: boolean;
}

const roadNavItems: NavItem[] = [
  {
    title: "Tổng quan hệ thống",
    icon: <LayoutDashboard className="size-5" />,
    href: "/",
  },
  {
    title: "Bản đồ số giao thông",
    icon: <MapIcon className="size-5" />,
    href: "/ban-do",
  },
  {
    title: "Phản ánh & Xử lý",
    icon: <ShieldAlert className="size-5" />,
    href: "/bao-ve-ha-tang",
  },
  {
    title: "Kiểm tra, bảo vệ",
    icon: <Shield className="size-5" />,
    href: "/bao-ve/kiem-tra-kcht",
  },
  {
    title: "Bình đồ duỗi thẳng",
    icon: <Ruler className="size-5 text-teal-500" />,
    children: [
      {
        title: "Bình đồ đoạn đường bộ",
        icon: <Route className="size-4" />,
        href: "/binh-do/doan-duong",
      },
      {
        title: "Bình đồ cầu lớn",
        icon: <Building2 className="size-4" />,
        href: "/binh-do/cau-lon",
      },
      {
        title: "Bình đồ nút giao",
        icon: <GitMerge className="size-4" />,
        href: "/binh-do/nut-giao",
      },
    ],
  },
  {
    title: "Tổ chức giao thông",
    icon: <ArrowRightLeft className="size-5" />,
    href: "/to-chuc-giao-thong",
  },
  {
    title: "Duy tu các công trình",
    icon: <Hammer className="size-5" />,
    children: [
      { title: "Sửa chữa mặt đường bộ", icon: <Hammer className="size-4" />, href: "/duy-tu/sua-chua-mat-duong" },
      { title: "Sửa chữa mặt đường cầu lớn", icon: <Building2 className="size-4" />, href: "/duy-tu/sua-chua-cau-lon" },
      { title: "Nhóm Công trình Cầu & Hầm", icon: <Building2 className="size-4" />, href: "/duy-tu/cau-ham" },
      { title: "Nhóm Kết cấu Đường bộ & Phụ trợ", icon: <Route className="size-4" />, href: "/duy-tu/ket-cau-phu-tro" },
      { title: "Nhóm Hệ thống Báo hiệu & Chỉ dẫn", icon: <Hammer className="size-4" />, href: "/duy-tu/bao-hieu-chi-dan" },
      { title: "Nhóm Hệ thống Đèn tín hiệu & Camera", icon: <Layers className="size-4" />, href: "/duy-tu/tin-hieu-camera" },
      { title: "Nhóm Giao cắt & Công trình khác", icon: <GitMerge className="size-4" />, href: "/duy-tu/giao-cat-khac" },
    ],
  },
  {
    title: "Bàn giao thi công XDCB",
    icon: <GitMerge className="size-5" />,
    href: "/duy-tu/ban-giao-xdcb",
  },
  {
    title: "Quản lý dự án giao thông",
    icon: <Construction className="size-5" />,
    href: "/quan-ly-du-an",
  },
  {
    title: "Cấp phép thi công",
    icon: <FileText className="size-5" />,
    children: [
      { title: "Giấy phép đào đường", icon: <HardHat className="size-4" />, href: "/cap-phep/giay-phep-dao-duong" },
    ],
  },
  {
    title: "Thống kê lưu lượng",
    icon: <Activity className="size-5" />,
    children: [
      { title: "Thống kê & Phân tích", icon: <BarChart3 className="size-4" />, href: "/luu-luong/thong-ke" },
      { title: "Bản đồ mật độ (Heatmap)", icon: <Layers className="size-4" />, href: "/luu-luong/heatmap" },
    ],
  },



  {
    title: "Báo cáo",
    icon: <FileText className="size-5 text-blue-500" />,
    children: [
      {
        title: "BC hiện trạng KCHT",
        icon: <BarChart3 className="size-4" />,
        children: [
          { title: "Hiện trạng cầu, đường", icon: <CircleDot className="size-3" />, href: "/bao-cao/hien-trang-cau-duong" },
          { title: "Danh sách cầu lớn", icon: <CircleDot className="size-3" />, href: "/bao-cao/danh-sach-cau-lon" },
          { title: "Danh sách tuyến đường", icon: <CircleDot className="size-3" />, href: "/bao-cao/danh-sach-tuyen-duong" },
          { title: "Chi tiết cống", icon: <CircleDot className="size-3" />, href: "/bao-cao/chi-tiet-cong" },
          { title: "Chi tiết biển báo", icon: <CircleDot className="size-3" />, href: "/bao-cao/chi-tiet-bien-bao" },
          { title: "Chi tiết cột Km", icon: <CircleDot className="size-3" />, href: "/bao-cao/chi-tiet-cot-km" },
          { title: "Hiện trạng hố ga", icon: <CircleDot className="size-3" />, href: "/bao-cao/hien-trang-ho-ga" },
          { title: "Duy tu, bảo trì đèn TH", icon: <CircleDot className="size-3" />, href: "/bao-cao/duy-tu-den-tin-hieu" },
          { title: "Vận hành đèn TH", icon: <CircleDot className="size-3" />, href: "/bao-cao/van-hanh-den" },
          { title: "Nút giao chưa có đèn", icon: <CircleDot className="size-3" />, href: "/bao-cao/nut-giao-chua-den" },
        ],
      },
      {
        title: "BC công tác bảo vệ KCHT",
        icon: <FileText className="size-4" />,
        children: [
          { title: "Phản ánh sự cố", icon: <CircleDot className="size-3" />, href: "/bao-cao/phan-anh-su-co" },
          { title: "Thống kê tuần đường", icon: <CircleDot className="size-3" />, href: "/bao-cao/thong-ke-tuan-duong" },
          { title: "Không tuần đường", icon: <CircleDot className="size-3" />, href: "/bao-cao/khong-tuan-duong" },
          { title: "Số lần tuần đường", icon: <CircleDot className="size-3" />, href: "/bao-cao/so-lan-tuan-duong" },
          { title: "Thống kê tuần kiểm", icon: <CircleDot className="size-3" />, href: "/bao-cao/tuan-kiem" },
          { title: "Nhật ký tuần đường", icon: <CircleDot className="size-3" />, href: "/bao-cao/nhat-ky-tuan-duong" },
          { title: "Nhật ký tuần kiểm", icon: <CircleDot className="size-3" />, href: "/bao-cao/nhat-ky-tuan-kiem" },
          { title: "Nhật ký tuần đèn", icon: <CircleDot className="size-3" />, href: "/bao-cao/nhat-ky-tuan-den" },
        ],
      },
    ],
  },
  {
    title: "Quản lý danh mục",
    icon: <Table className="size-5 text-indigo-500" />,
    children: [
      { title: "Quy định danh mục loại phản ánh", icon: <CircleDot className="size-3" />, href: "/danh-muc/loai-phan-anh" },
      { title: "Quy định danh mục mức độ sự cố", icon: <CircleDot className="size-3" />, href: "/danh-muc/muc-do-su-co" },
      { title: "Quy định danh mục nguyên nhân sự cố", icon: <CircleDot className="size-3" />, href: "/danh-muc/nguyen-nhan-su-co" },
    ],
  },
];

const adminNavItems: NavItem[] = [
  {
    title: "Quản trị vận hành",
    icon: <Settings className="size-5 text-slate-600" />,
    children: [
      {
        title: "Quản trị hệ thống",
        icon: <ShieldCheck className="size-4" />,
        children: [
          { title: "Cấu hình đồng bộ DMDC", icon: <CircleDot className="size-3" />, href: "/admin/dong-bo-dmdc" },
          { title: "API đồng bộ danh mục", icon: <CircleDot className="size-3" />, href: "/admin/api-dong-bo" },
          { title: "Nhật ký trao đổi dữ liệu", icon: <CircleDot className="size-3" />, href: "/admin/log-trao-doi" },
          { title: "Đồng bộ tài khoản SSO", icon: <CircleDot className="size-3" />, href: "/admin/dong-bo-sso" },
          { title: "Xác thực người dùng SSO", icon: <CircleDot className="size-3" />, href: "/admin/xac-thuc-sso" },
        ],
      },
      {
        title: "Tích hợp Quy định 742",
        icon: <Zap className="size-4" />,
        children: [
          { title: "Chính sách truy cập", icon: <CircleDot className="size-3" />, href: "/admin/chinh-sach-truy-cap" },
          { title: "Nhóm quyền người dùng", icon: <CircleDot className="size-3" />, href: "/admin/nhom-quyen" },
          { title: "Tài khoản người dùng", icon: <CircleDot className="size-3" />, href: "/admin/tai-khoan" },
          { title: "Cơ cấu tổ chức", icon: <CircleDot className="size-3" />, href: "/admin/co-cau-to-chuc" },
          { title: "Danh mục địa phận", icon: <CircleDot className="size-3" />, href: "/admin/danh-muc-dia-phan" },
          { title: "Thời gian chờ (timeout)", icon: <CircleDot className="size-3" />, href: "/admin/timeout" },
          { title: "Lịch sử tác động", icon: <CircleDot className="size-3" />, href: "/admin/lich-su-tac-dong" },
          { title: "Lịch sử lỗi phát sinh", icon: <CircleDot className="size-3" />, href: "/admin/lich-su-loi" },
          { title: "Chính sách lưu trữ nhật ký", icon: <CircleDot className="size-3" />, href: "/admin/chinh-sach-luu-tru" },
          { title: "Lưu log hệ thống", icon: <CircleDot className="size-3" />, href: "/admin/luu-log" },
          { title: "Gửi log tập trung (API)", icon: <CircleDot className="size-3" />, href: "/admin/gui-log-api" },
        ],
      },
      {
        title: "Thiết lập tuần tra",
        icon: <Shield className="size-4" />,
        href: "/bao-ve/tuan-tra",
      },
      {
        title: "Thông báo",
        icon: <Bell className="size-4" />,
        href: "/admin/thong-bao",
      },
    ],
  },
];

const waterwayNavItems: NavItem[] = [
  {
    title: "Bản đồ luồng tuyến",
    icon: <MapIcon className="size-5" />,
    href: "/ban-do-thuy",
  },
  {
    title: "Quản lý cảng, bến thủy",
    icon: <Ship className="size-5" />,
    href: "/cang-ben-thuy",
  },
  {
    title: "Phương tiện thủy",
    icon: <Waves className="size-5" />,
    href: "/phuong-tien-thuy",
  },
];

const railwayNavItems: NavItem[] = [
  {
    title: "Bản đồ mạng lưới đường sắt",
    icon: <MapIcon className="size-5" />,
    href: "/ban-do-sat",
  },
  {
    title: "Quản lý ga đường sắt",
    icon: <Building2 className="size-5" />,
    href: "/ga-duong-sat",
  },
  {
    title: "Quản lý hạ tầng đường ray",
    icon: <TrainFront className="size-5" />,
    href: "/ha-tang-duong-ray",
  },
];

const moduleNavItems = {
  ROAD: roadNavItems,
  WATERWAY: waterwayNavItems,
  RAILWAY: railwayNavItems,
  ADMIN: adminNavItems
};

function NavItemComponent({ item, level = 0 }: { item: NavItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (item.isSearchMatch) setIsOpen(true);
  }, [item.isSearchMatch]);

  const isActive = item.href ? location.pathname === item.href : false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
            level > 0 && "pl-8 text-sm font-normal opacity-90"
          )}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="flex-1 text-left leading-snug">{item.title}</span>
          {isOpen ? <ChevronDown className="size-4 opacity-50" /> : <ChevronRight className="size-4 opacity-50" />}
        </button>
        {isOpen && (
          <div className="mt-1 space-y-1 border-l ml-5 pl-1 border-slate-200/50">
            {item.children.map((child, index) => (
              <NavItemComponent key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href || "#"}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
        level > 0 && "pl-8 text-sm font-normal opacity-90",
        isActive && "bg-primary text-primary-foreground shadow-sm hover:bg-primary/95"
      )}
    >
      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
      <span className="flex-1 leading-snug">{item.title}</span>
    </Link>
  );
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuSearchQuery, setMenuSearchQuery] = useState("");
  const [activeModule, setActiveModule] = useState<"ROAD" | "WATERWAY" | "RAILWAY" | "ADMIN">("ROAD");
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "Giao thông đường bộ",
  ]);
  const location = useLocation();
  const filteredNavItems = React.useMemo(() => {
    const currentNavItems = moduleNavItems[activeModule];
    if (!menuSearchQuery.trim()) return currentNavItems;
    const query = menuSearchQuery.toLowerCase();

    const filterNodes = (items: NavItem[]): NavItem[] => {
      return items.reduce<NavItem[]>((acc, item) => {
        const matches = item.title.toLowerCase().includes(query);
        const filteredChildren = item.children ? filterNodes(item.children) : undefined;

        if (matches || (filteredChildren && filteredChildren.length > 0)) {
          acc.push({ ...item, children: filteredChildren, isSearchMatch: true });
        }
        return acc;
      }, []);
    };
    return filterNodes(currentNavItems);
  }, [menuSearchQuery, activeModule]);

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "Tổng quan hệ thống";
      case "/ban-do":
        return "Bản đồ số giao thông";
      case "/quan-ly-ha-tang":
        return "Giao thông đường bộ";
      case "/quan-ly-du-an":
        return "Quản lý dự án giao thông";
      case "/bao-ve-ha-tang":
        return "Quản lý phản ánh, xử lý sự cố, vi phạm";
    }
    if (path.includes("duong-bo/tuyen")) return "Quản lý Tuyến Đường Bộ";
    if (path.includes("duong-bo/doan-dia-phan")) return "Quản lý Đoạn đường theo địa phận";
    if (path.includes("duong-bo/doan-mat-cat")) return "Quản lý Đoạn đường theo mặt cắt";
    if (path.includes("cau/lon")) return "Quản lý Cầu Lớn";
    if (path.includes("cau/nho-trung")) return "Quản lý Cầu nhỏ, trung";
    if (path.includes("cau/vuot-nhe")) return "Quản lý Cầu vượt nhẹ";
    if (path.includes("cau/di-bo")) return "Quản lý Cầu đi bộ";
    if (path.includes("ham")) return "Quản lý Hầm Đường Bộ";
    if (path.includes("duong-ngang")) return "Quản lý Đường Ngang";
    if (path.includes("nut-giao")) return "Quản lý Nút Giao";
    if (path.includes("hanh-lang-an-toan")) return "Quản lý Hành Lang An Toàn";
    if (path.includes("phu-tro/ho-ga")) return "Quản lý Hố Ga";
    if (path.includes("phu-tro/bien-bao")) return "Quản lý Báo Hiệu Đường Bộ";
    if (path.includes("phu-tro/an-toan")) return "Quản lý Công Trình An Toàn";
    if (path.includes("phu-tro/thoat-nuoc")) return "Quản lý Hệ Thống Thoát Nước";
    if (path.includes("phu-tro/cot-km")) return "Quản lý Cột Km";
    if (path.includes("phu-tro/coc-h")) return "Quản lý Cọc H";
    if (path.includes("phu-tro/cong")) return "Quản lý Cống";
    if (path.includes("phu-tro/loi-re")) return "Quản lý Lối rẽ";
    if (path.includes("phu-tro/ke")) return "Quản lý Kè";
    if (path.includes("phu-tro/ranh-nuoc")) return "Quản lý Rãnh nước";
    if (path.includes("phu-tro/dai-phan-cach")) return "Quản lý Dải phân cách";
    if (path.includes("phu-tro/lan-can")) return "Quản lý Lan can phòng hộ";
    if (path.includes("phu-tro/coc-tieu")) return "Quản lý Đoạn cọc tiêu";
    if (path.includes("phu-tro/vach-ke")) return "Quản lý Vạch kẻ đường";
    if (path.includes("phu-tro/gia-long-mon")) return "Quản lý Giá long môn";
    if (path.includes("phu-tro/cot-can-vuon")) return "Quản lý Cột cần vươn";
    if (path.includes("phu-tro/dinh-phan-quang")) return "Quản lý Đinh phản quang";
    if (path.includes("cong-nghe/den-tin-hieu")) return "Quản lý Đèn tín hiệu giao thông";
    if (path.includes("cong-nghe/camera")) return "Quản lý Camera giao thông";
    if (path.includes("cong-nghe/vms")) return "Quản lý Biển điện tử VMS";
    if (path.includes("dau-noi")) return "Quản lý Đấu nối";
    if (path.includes("ha-tang-van-tai")) return "Quản lý Hạ tầng vận tải đường bộ";
    if (path.includes("duy-tu/sua-chua-mat-duong")) return "Sửa chữa mặt đường bộ";
    if (path.includes("duy-tu/sua-chua-cau-lon")) return "Sửa chữa mặt đường cầu lớn";
    if (path.includes("duy-tu/cau-ham")) return "Quản lý duy tu Nhóm Công trình Cầu & Hầm";
    if (path.includes("duy-tu/ket-cau-phu-tro")) return "Quản lý duy tu Nhóm Kết cấu Đường bộ & Phụ trợ";
    if (path.includes("duy-tu/bao-hieu-chi-dan")) return "Quản lý duy tu Nhóm Hệ thống Báo hiệu & Chỉ dẫn";
    if (path.includes("duy-tu/tin-hieu-camera")) return "Quản lý duy tu Nhóm Hệ thống Đèn tín hiệu & Camera";
    if (path.includes("duy-tu/giao-cat-khac")) return "Quản lý duy tu Nhóm Giao cắt & Công trình khác";
    if (path.includes("duy-tu/phu-tro")) return "Quản lý duy tu các công trình phụ trợ";
    if (path.includes("duy-tu/ban-giao-xdcb")) return "Quản lý đoạn đường bộ bàn giao thi công XDCB";
    if (path.includes("bao-ve/tuan-tra")) return "Thiết lập tuần tra bảo vệ KCHT giao thông";
    if (path.includes("bao-ve/kiem-tra-kcht")) return "Công tác kiểm tra, bảo vệ KCHT giao thông";
    if (path.includes("bao-ve-ha-tang")) return "Quản lý phản ánh, xử lý sự cố, vi phạm";
    if (path.includes("bao-tri")) return "Bảo trì bảo dưỡng";
    if (path.includes("danh-muc/loai-phan-anh")) return "Quy định danh mục loại phản ánh";
    if (path.includes("danh-muc/muc-do-su-co")) return "Quy định danh mục mức độ sự cố";
    if (path.includes("danh-muc/nguyen-nhan-su-co")) return "Quy định danh mục nguyên nhân sự cố";
    if (path.includes("danh-muc")) return "Quản lý danh mục dữ liệu giao thông";
    // Đường thủy nội địa
    if (path.includes("duong-thuy/tuyen")) return "Tuyến đường thủy nội địa";
    if (path.includes("duong-thuy/nhanh-luong")) return "Nhánh của Luồng chạy tàu thuyền";
    if (path.includes("duong-thuy/bien-bao")) return "Biển báo đường thủy";
    if (path.includes("duong-thuy/den-hieu")) return "Đèn hiệu đường thủy";
    if (path.includes("duong-thuy/cot-bien-bao")) return "Cột biển báo đường thủy";
    if (path.includes("duong-thuy/phao")) return "Phao đường thủy";
    if (path.includes("duong-thuy/cot-thuy-chi")) return "Cột thủy chí";
    if (path.includes("duong-thuy/phu-tro-khac")) return "Công trình phụ trợ khác đường thủy nội địa";
    // Đường sắt đô thị
    if (path.includes("duong-sat/tuyen")) return "Tuyến đường sắt đô thị";
    if (path.includes("duong-sat/tru-cau")) return "Trụ cầu đường sắt đô thị";
    if (path.includes("duong-sat/khu-depot")) return "Khu depot đường sắt đô thị";
    if (path.includes("duong-sat/ga")) return "Ga đường sắt đô thị";
    // Quản trị vận hành
    if (path.includes("admin/dong-bo-dmdc")) return "Cấu hình đồng bộ DMDC từ LGSP";
    if (path.includes("admin/api-dong-bo")) return "API đồng bộ danh mục dùng chung";
    if (path.includes("admin/log-trao-doi")) return "Nhật ký trao đổi, chia sẻ dữ liệu";
    if (path.includes("admin/dong-bo-sso")) return "Đồng bộ tài khoản người dùng SSO";
    if (path.includes("admin/xac-thuc-sso")) return "Xác thực người dùng với SSO";
    if (path.includes("admin/chinh-sach-truy-cap")) return "Thiết lập chính sách truy cập hệ thống";
    if (path.includes("admin/nhom-quyen")) return "Quản lý nhóm quyền người dùng";
    if (path.includes("admin/tai-khoan")) return "Quản lý tài khoản người dùng";
    if (path.includes("admin/co-cau-to-chuc")) return "Quản lý cơ cấu tổ chức";
    if (path.includes("admin/danh-muc-dia-phan")) return "Quản lý danh mục địa phận (hành chính)";
    if (path.includes("admin/timeout")) return "Thiết lập giới hạn thời gian chờ (timeout)";
    if (path.includes("admin/lich-su-tac-dong")) return "Quản lý lịch sử tác động";
    if (path.includes("admin/lich-su-loi")) return "Quản lý lịch sử lỗi phát sinh";
    if (path.includes("admin/chinh-sach-luu-tru")) return "Quản lý chính sách lưu trữ nhật ký";
    if (path.includes("admin/luu-log")) return "Lưu log hệ thống";
    if (path.includes("admin/gui-log-api")) return "Gửi thông tin log tập trung (API)";
    if (path.includes("admin/thong-bao")) return "Thông báo hệ thống";
    if (path.includes("cap-phep/giay-phep-dao-duong")) return "Quản lý Giấy phép đào đường";
    if (path.includes("luu-luong/thong-ke")) return "Thống kê Lưu lượng Giao thông";
    if (path.includes("luu-luong/heatmap")) return "Bản đồ nhiệt Lưu lượng (Heatmap)";
    return "Giao thông đường bộ";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r bg-card transition-all duration-300",
          sidebarOpen ? "w-80" : "w-0 overflow-hidden"
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex h-20 items-center gap-3 border-b px-6 relative">
            <div className="flex size-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden group hover:scale-110 transition-transform duration-300">
              <img src="/images/gis-logo.png" alt="GIS Logo" className="size-9 object-contain" />
            </div>
            <div className="flex-1 overflow-hidden pr-6">
              <h1 className="text-[15px] font-bold leading-tight text-slate-900 line-clamp-2 uppercase tracking-tight">Hệ thống quản lý giao thông</h1>
              <p className="text-[10px] font-semibold text-blue-600 truncate uppercase mt-0.5">Sở Xây dựng và Giao thông</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              onClick={() => setSidebarOpen(false)}
              title="Thu gọn menu"
            >
              <ChevronLeft className="size-5" />
            </Button>
          </div>

          {/* Module Switcher */}
          {sidebarOpen && (
            <div className="px-3 pt-3 pb-2 border-b border-sidebar-border/50 bg-slate-50/50">
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/60 rounded-lg">
                <button
                  onClick={() => setActiveModule("ROAD")}
                  className={cn("flex flex-col items-center justify-center py-2 rounded-md transition-all", activeModule === "ROAD" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/80")}
                  title="Đường bộ"
                >
                  <Truck className="size-4 mb-1" />
                  <span className="text-[10px] font-semibold">Đ.Bộ</span>
                </button>
                <button
                  onClick={() => setActiveModule("WATERWAY")}
                  className={cn("flex flex-col items-center justify-center py-2 rounded-md transition-all", activeModule === "WATERWAY" ? "bg-white shadow-sm text-cyan-600" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/80")}
                  title="Đường thủy"
                >
                  <Ship className="size-4 mb-1" />
                  <span className="text-[10px] font-semibold">Đ.Thủy</span>
                </button>
                <button
                  onClick={() => setActiveModule("RAILWAY")}
                  className={cn("flex flex-col items-center justify-center py-2 rounded-md transition-all", activeModule === "RAILWAY" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/80")}
                  title="Đường sắt"
                >
                  <TrainFront className="size-4 mb-1" />
                  <span className="text-[10px] font-semibold">Đ.Sắt</span>
                </button>
                <button
                  onClick={() => setActiveModule("ADMIN")}
                  className={cn("flex flex-col items-center justify-center py-2 rounded-md transition-all", activeModule === "ADMIN" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/80")}
                  title="Quản trị"
                >
                  <Settings className="size-4 mb-1" />
                  <span className="text-[10px] font-semibold">Quản trị</span>
                </button>
              </div>
            </div>
          )}

          {/* Search */}
          {sidebarOpen && (
            <div className="p-3 border-b border-sidebar-border/50 bg-slate-50">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Tìm kiếm menu..."
                  className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}


          {/* Navigation */}
          <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
            <nav className="space-y-1">
              {filteredNavItems.map((item, index) => (
                <NavItemComponent key={index} item={item} />
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t p-4 pb-6">
            <div className="flex justify-center items-center text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer space-y-1 group">
                    <p className="text-sm text-slate-500 font-medium group-hover:text-primary transition-colors flex items-center gap-1.5 justify-center"><History className="size-3.5 opacity-70" /> Phiên bản {typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0'}</p>
                    {typeof __BUILD_TIME__ !== 'undefined' && <p className="text-[10px] text-slate-400 group-hover:text-slate-500">{__BUILD_TIME__}</p>}
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col p-0 overflow-hidden">
                  <DialogHeader className="px-6 py-4 border-b bg-muted/30">
                    <DialogTitle className="flex items-center gap-2">
                      <History className="size-5 text-primary" />
                      Lịch sử cập nhật hệ thống
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                      {deployHistory && deployHistory.length > 0 ? deployHistory.map((item: any, idx: number) => (
                        <div key={idx} className="relative pl-6 pb-6 border-l-2 border-muted last:border-transparent last:pb-0">
                          <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-primary" />
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-foreground">Phiên bản {item.version}</h4>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                              <Clock className="size-3" />
                              <span>{item.time}</span>
                            </div>
                          </div>
                          <div className="text-sm text-slate-600 bg-slate-50/50 p-3 rounded-lg border border-border/50 whitespace-pre-wrap leading-relaxed shadow-sm">
                            {item.content}
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-10 text-muted-foreground">Chưa có lịch sử cập nhật.</div>
                      )}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        {location.pathname !== '/ban-do' && (
          <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="size-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{getPageTitle()}</h2>
            </div>
            <div className="flex items-center gap-2">
              <NotificationDropdown />
              <UserProfileDropdown />
            </div>
          </header>
        )}

        {/* Floating Menu Button for Map Page */}
        {location.pathname === '/ban-do' && !sidebarOpen && (
          <Button
            className="absolute top-4 left-4 z-[2000] bg-white text-slate-700 hover:bg-slate-100 shadow-md border-border"
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        )}

        {/* Page Content */}
        <main className={location.pathname === '/ban-do' ? 'flex-1 overflow-hidden relative' : 'flex-1 overflow-auto p-6'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

