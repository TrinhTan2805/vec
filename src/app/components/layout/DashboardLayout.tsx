import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";

declare const __APP_VERSION__: string | undefined;
declare const __BUILD_TIME__: string | undefined;
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
  Briefcase,
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
  defaultExpanded?: boolean;
}

const roadNavItems: NavItem[] = [
  {
    title: "Màn hình chính (Dashboard)",
    icon: <LayoutDashboard className="size-5" />,
    children: [
      {
        title: "Tài sản & Hồ sơ",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Tổng hợp số lượng tài sản", icon: <CircleDot className="size-3" />, href: "/dashboard/asset-count" },
          { title: "Thông tin hồ sơ tài sản", icon: <CircleDot className="size-3" />, href: "/dashboard/asset-profile" },
          { title: "Hoạt động kiểm kê tài sản", icon: <CircleDot className="size-3" />, href: "/dashboard/inventory-activity" },
        ]
      },
      {
        title: "Thanh lý & Hủy",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Cảnh báo tài sản sắp đến hạn thanh lý", icon: <CircleDot className="size-3" />, href: "/dashboard/liquidate-alert" },
          { title: "Tổng hợp tài sản đã thanh lý, thanh hủy", icon: <CircleDot className="size-3" />, href: "/dashboard/liquidated-assets" },
        ]
      },
      {
        title: "Bảo trì & Sửa chữa",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Cảnh báo tài sản sắp đến hạn bảo trì", icon: <CircleDot className="size-3" />, href: "/dashboard/maintain-alert" },
          { title: "Tiến độ thực hiện kế hoạch bảo trì", icon: <CircleDot className="size-3" />, href: "/dashboard/maintain-progress" },
          { title: "Tài sản có lịch bảo trì định kỳ", icon: <CircleDot className="size-3" />, href: "/dashboard/periodic-maintain" },
          { title: "Tình trạng xử lý công việc sửa chữa", icon: <CircleDot className="size-3" />, href: "/dashboard/repair-status" },
          { title: "Đánh giá hiệu suất công tác bảo trì", icon: <CircleDot className="size-3" />, href: "/dashboard/maintain-performance" },
        ]
      },
      {
        title: "Kiểm tra & Cảnh báo",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Tổng hợp hoạt động kiểm tra tài sản", icon: <CircleDot className="size-3" />, href: "/dashboard/inspect-activity" },
          { title: "Cảnh báo kết quả kiểm tra bất thường", icon: <CircleDot className="size-3" />, href: "/dashboard/inspect-alert" },
        ]
      },
      {
        title: "Sự cố & Phản ánh",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Tiếp nhận và xử lý phản ánh từ hiện trường", icon: <CircleDot className="size-3" />, href: "/dashboard/feedback" },
          { title: "Phân tích xu hướng sự cố lặp lại", icon: <CircleDot className="size-3" />, href: "/dashboard/incident-trend" },
        ]
      }
    ]
  },
  {
    title: "Phân hệ Quản lý bảo trì, bảo dưỡng",
    icon: <Wrench className="size-5" />,
    children: [
      {
        title: "I. Lập kế hoạch bảo trì",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Lập kế hoạch bảo trì thường xuyên", icon: <CircleDot className="size-3" />, href: "/maintenance/plan/regular" },
          { title: "Lập kế hoạch sửa chữa định kỳ", icon: <CircleDot className="size-3" />, href: "/maintenance/plan/periodic" },
          { title: "Lập kế hoạch sửa chữa lớn", icon: <CircleDot className="size-3" />, href: "/maintenance/plan/major" },
          { title: "Lập kế hoạch sửa chữa đột xuất", icon: <CircleDot className="size-3" />, href: "/maintenance/plan/urgent" },
          { title: "Theo dõi thực hiện kế hoạch bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/plan/track" },
        ]
      },
      {
        title: "II. Quản lý kiểm tra tài sản",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Lập kế hoạch kiểm tra và phân công công việc", icon: <CircleDot className="size-3" />, href: "/maintenance/inspect/plan" },
          { title: "Cập nhật thông tin kiểm tra", icon: <CircleDot className="size-3" />, href: "/maintenance/inspect/update" },
          { title: "Tìm kiếm kết quả kiểm tra", icon: <CircleDot className="size-3" />, href: "/maintenance/inspect/search" },
          { title: "Xem chi tiết kết quả kiểm tra", icon: <CircleDot className="size-3" />, href: "/maintenance/inspect/detail" },
          { title: "Tạo công việc xử lý sau kiểm tra", icon: <CircleDot className="size-3" />, href: "/maintenance/inspect/task" },
          { title: "Cảnh báo tự động kết quả kiểm tra bất thường", icon: <CircleDot className="size-3" />, href: "/maintenance/inspect/alert" },
        ]
      },
      {
        title: "III. Quản lý bảo trì, bảo dưỡng tài sản",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Lập kế hoạch bảo trì, bảo dưỡng", icon: <CircleDot className="size-3" />, href: "/maintenance/maintain/plan" },
          { title: "Cập nhật kết quả bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/maintain/update" },
          { title: "Tìm kiếm kết quả bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/maintain/search" },
          { title: "Xem chi tiết kết quả bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/maintain/detail" },
          { title: "Tạo công việc xử lý sau bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/maintain/task" },
          { title: "Cảnh báo tự động kết quả bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/maintain/alert" },
        ]
      },
      {
        title: "IV. Quản lý sửa chữa tài sản",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Lập kế hoạch sửa chữa tài sản", icon: <CircleDot className="size-3" />, href: "/maintenance/repair/plan" },
          { title: "Cập nhật kết quả sửa chữa", icon: <CircleDot className="size-3" />, href: "/maintenance/repair/update" },
          { title: "Tìm kiếm kết quả sửa chữa", icon: <CircleDot className="size-3" />, href: "/maintenance/repair/search" },
          { title: "Xem chi tiết kết quả sửa chữa", icon: <CircleDot className="size-3" />, href: "/maintenance/repair/detail" },
          { title: "Cảnh báo tự động kết quả sửa chữa", icon: <CircleDot className="size-3" />, href: "/maintenance/repair/alert" },
        ]
      },
      {
        title: "V. Báo cáo tổng hợp công tác bảo trì, bảo dưỡng tài sản",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Báo cáo, tổng hợp dữ liệu bảo trì định kỳ", icon: <CircleDot className="size-3" />, href: "/maintenance/report/periodic" },
          { title: "Báo cáo, tổng hợp tình trạng tài sản sau bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/report/status" },
          { title: "Báo cáo, tổng hợp dữ liệu hiệu suất bảo trì", icon: <CircleDot className="size-3" />, href: "/maintenance/report/performance" },
          { title: "Báo cáo, tổng hợp về sự cố và sửa chữa đột xuất", icon: <CircleDot className="size-3" />, href: "/maintenance/report/incident" },
          { title: "Tra cứu và xuất lịch sử bảo trì tài sản", icon: <CircleDot className="size-3" />, href: "/maintenance/report/history" },
        ]
      },
      {
        title: "VI. Quản lý tiếp nhận và xử lý yêu cầu trong quản lý khai thác",
        icon: <CircleDot className="size-3" />,
        children: [
          {
            title: "VI.1 Quản lý tiếp nhận và xử lý yêu cầu",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Khai báo yêu cầu từ khách hàng hoặc cán bộ quản lý vận hành", icon: <CircleDot className="size-3" />, href: "/maintenance/request/declare" },
              { title: "Phân loại và phân bổ yêu cầu cho đơn vị quản lý vận hành", icon: <CircleDot className="size-3" />, href: "/maintenance/request/classify" },
              { title: "Tạo và giao xử lý công việc cho cán bộ thực hiện", icon: <CircleDot className="size-3" />, href: "/maintenance/request/assign" },
              { title: "Cập nhật kết quả xử lý vào yêu cầu", icon: <CircleDot className="size-3" />, href: "/maintenance/request/update" },
              { title: "Đóng yêu cầu sau khi xử lý hoàn thành", icon: <CircleDot className="size-3" />, href: "/maintenance/request/close" },
              { title: "Thông báo trên phần mềm khi có sự cố gửi đến người dùng", icon: <CircleDot className="size-3" />, href: "/maintenance/request/notify" },
              { title: "Theo dõi trạng thái và tiến độ xử lý yêu cầu", icon: <CircleDot className="size-3" />, href: "/maintenance/request/track" },
            ]
          },
          {
            title: "VI.2 Tra cứu và báo cáo",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Tra cứu số liệu về các yêu cầu", icon: <CircleDot className="size-3" />, href: "/maintenance/request-report/requests" },
              { title: "Tra cứu số liệu về công việc", icon: <CircleDot className="size-3" />, href: "/maintenance/request-report/tasks" },
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Phân hệ Giám sát hoạt động vận hành và bảo trì, bảo dưỡng",
    icon: <Activity className="size-5" />,
    children: [
      {
        title: "I. Kiểm tra và đánh giá giám sát",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Lập và phân công kế hoạch giám sát", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/plan" },
          { title: "Kiểm tra và đánh giá giám sát", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/evaluate" },
          { title: "Cập nhật kết quả đánh giá", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/update" },
          { title: "Xem chi tiết kết quả đánh giá", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/detail" },
          { title: "Trao đổi, chỉ đạo thông tin", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/communicate" },
          { title: "Tạo công việc để xử lý hạng mục sau sửa chữa", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/task" },
          { title: "Gửi kết quả đánh giá", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/send" },
          { title: "Báo cáo tổng hợp kết quả đánh giá, giám sát", icon: <CircleDot className="size-3" />, href: "/monitor/inspect/report" },
        ]
      },
      {
        title: "II. Đánh giá chấm điểm theo tiêu chuẩn TCVN/AASHTO",
        icon: <CircleDot className="size-3" />,
        children: [
          { title: "Chọn tiêu chuẩn đánh giá", icon: <CircleDot className="size-3" />, href: "/monitor/score/standard" },
          { title: "Nhập dữ liệu kiểm tra hiện trường", icon: <CircleDot className="size-3" />, href: "/monitor/score/input" },
          { title: "Tính chỉ số IRI (TCVN 8863)", icon: <CircleDot className="size-3" />, href: "/monitor/score/iri" },
          { title: "Thiết kế kết cấu áo đường mềm (TCVN 9437)", icon: <CircleDot className="size-3" />, href: "/monitor/score/design" },
          { title: "Chấm điểm PCI (Pavement Condition Index)", icon: <CircleDot className="size-3" />, href: "/monitor/score/pci" },
          { title: "Chấm điểm BCI (Bridge Condition Index)", icon: <CircleDot className="size-3" />, href: "/monitor/score/bci" },
          { title: "Phân loại và cảnh báo tự động", icon: <CircleDot className="size-3" />, href: "/monitor/score/alert" },
          { title: "Hiển thị kết quả trên bản đồ", icon: <CircleDot className="size-3" />, href: "/monitor/score/map" },
          { title: "Gợi ý biện pháp xử lý kỹ thuật", icon: <CircleDot className="size-3" />, href: "/monitor/score/suggest" },
          { title: "Theo dõi thay đổi theo thời gian", icon: <CircleDot className="size-3" />, href: "/monitor/score/track" },
          { title: "Xuất báo cáo kết quả đánh giá", icon: <CircleDot className="size-3" />, href: "/monitor/score/report" },
          { title: "Tùy chỉnh trọng số đánh giá", icon: <CircleDot className="size-3" />, href: "/monitor/score/weight" },
        ]
      }
    ]
  },
  {
    title: "Phân hệ Quản lý tài sản trên đường cao tốc",
    icon: <Layers className="size-5" />,
    children: [
      {
        title: "I. Quản lý tài sản trên bản đồ",
        icon: <MapIcon className="size-4" />,
        children: [
          {
            title: "Quản lý bản đồ nền",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Cấu hình bản đồ nền", icon: <CircleDot className="size-3" />, href: "/assets/map/config" },
              { title: "Thay đổi bản đồ nền", icon: <CircleDot className="size-3" />, href: "/assets/map/change" },
            ]
          },
          {
            title: "Quản lý dữ liệu 3D",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Cài đặt hiển thị 3D cho loại dữ liệu dạng điểm", icon: <CircleDot className="size-3" />, href: "/assets/map/3d-config" },
              { title: "Cập nhật dữ liệu 3D trên bản đồ", icon: <CircleDot className="size-3" />, href: "/assets/map/3d-update" },
            ]
          },
          {
            title: "Quản lý lớp thông tin tài sản trên bản đồ",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Thêm lớp dữ liệu bản đồ mới", icon: <CircleDot className="size-3" />, href: "/assets/map/layer-add" },
              { title: "Quản lý các lớp thông tin", icon: <CircleDot className="size-3" />, href: "/assets/map/layer-manage" },
              { title: "Cập nhật dữ liệu tài sản trên bản đồ", icon: <CircleDot className="size-3" />, href: "/assets/map/layer-update" },
            ]
          },
          {
            title: "Khai thác tài sản trên bản đồ",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Định vị tài sản theo tuyến", icon: <CircleDot className="size-3" />, href: "/assets/map/locate" },
            ]
          }
        ]
      },
      {
        title: "II. Quản lý thiết bị trên sơ đồ mặt bằng",
        icon: <LandPlot className="size-4" />,
        children: [
          { title: "Thêm thông tin thiết bị trên sơ đồ mặt bằng", icon: <CircleDot className="size-3" />, href: "/assets/floor-plan/add" },
          { title: "Cập nhật thiết bị trên sơ đồ mặt bằng", icon: <CircleDot className="size-3" />, href: "/assets/floor-plan/update" },
          { title: "Khai thác tài sản, thiết bị trên sơ đồ mặt bằng", icon: <CircleDot className="size-3" />, href: "/assets/floor-plan/use" },
        ]
      },
      {
        title: "III. Quản lý tài sản trên bình đồ duỗi thẳng",
        icon: <Ruler className="size-4" />,
        children: [
          { title: "Hiển thị tài sản trên bình đồ duỗi thẳng", icon: <CircleDot className="size-3" />, href: "/assets/straight-plan/show" },
          { title: "Tìm kiếm tài sản trên bình đồ", icon: <CircleDot className="size-3" />, href: "/assets/straight-plan/search" },
          { title: "Xem chi tiết tài sản trên bình đồ", icon: <CircleDot className="size-3" />, href: "/assets/straight-plan/detail" },
          { title: "Xuất dữ liệu bình đồ duỗi thẳng", icon: <CircleDot className="size-3" />, href: "/assets/straight-plan/export" },
        ]
      },
      {
        title: "IV. Quản lý mô hình BIM",
        icon: <Building2 className="size-4" />,
        children: [
          {
            title: "Tích hợp mô hình BIM",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Sửa mô hình BIM", icon: <CircleDot className="size-3" />, href: "/assets/bim/edit" },
              { title: "Xóa mô hình BIM", icon: <CircleDot className="size-3" />, href: "/assets/bim/delete" },
            ]
          },
          {
            title: "Quản lý phiên bản mô hình",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "So sánh phiên bản mô hình", icon: <CircleDot className="size-3" />, href: "/assets/bim/compare" },
            ]
          },
          { title: "Quản lý lớp hiển thị dữ liệu", icon: <CircleDot className="size-3" />, href: "/assets/bim/layer" },
          { title: "Công cụ đo đạc và tương tác", icon: <CircleDot className="size-3" />, href: "/assets/bim/tools" },
          { title: "Tương tác với tài sản, thiết bị", icon: <CircleDot className="size-3" />, href: "/assets/bim/interact" },
          { title: "Liên kết thông tin hồ sơ tài liệu của tài sản thiết bị", icon: <CircleDot className="size-3" />, href: "/assets/bim/link" },
          { title: "Tìm kiếm tài sản trên mô hình", icon: <CircleDot className="size-3" />, href: "/assets/bim/search" },
          { title: "Lọc hiển thị theo điều kiện thuộc tính", icon: <CircleDot className="size-3" />, href: "/assets/bim/filter" },
          { title: "Gắn cảnh báo/ghi chú vào đối tượng", icon: <CircleDot className="size-3" />, href: "/assets/bim/note" },
          { title: "Trích xuất dữ liệu thống kê từ mô hình", icon: <CircleDot className="size-3" />, href: "/assets/bim/export" },
        ]
      },
      {
        title: "V. Nghiệp vụ quản lý tài sản",
        icon: <Briefcase className="size-4" />,
        children: [
          {
            title: "V.1. Quản lý thông tin tài sản",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Quản lý Biển báo", icon: <CircleDot className="size-3" />, href: "/assets/info/bien-bao" },
              { title: "Quản lý Cầu", icon: <CircleDot className="size-3" />, href: "/assets/info/cau" },
              { title: "Quản lý Cống chui dân sinh", icon: <CircleDot className="size-3" />, href: "/assets/info/cong-chui" },
              { title: "Quản lý Cống thoát nước", icon: <CircleDot className="size-3" />, href: "/assets/info/cong-thoat-nuoc" },
              { title: "Quản lý Cột KM", icon: <CircleDot className="size-3" />, href: "/assets/info/cot-km" },
              { title: "Quản lý Cột GPMB, MLG", icon: <CircleDot className="size-3" />, href: "/assets/info/cot-gpmb" },
              { title: "Quản lý Dải phân cách", icon: <CircleDot className="size-3" />, href: "/assets/info/dai-phan-cach" },
              { title: "Quản lý Đất hạ tầng", icon: <CircleDot className="size-3" />, href: "/assets/info/dat-ha-tang" },
              { title: "Quản lý Đường gom", icon: <CircleDot className="size-3" />, href: "/assets/info/duong-gom" },
              { title: "Quản lý Giá long môn", icon: <CircleDot className="size-3" />, href: "/assets/info/gia-long-mon" },
              { title: "Quản lý Hàng rào bảo vệ", icon: <CircleDot className="size-3" />, href: "/assets/info/hang-rao-bao-ve" },
              { title: "Quản lý Hàng rào chống chói", icon: <CircleDot className="size-3" />, href: "/assets/info/hang-rao-chong-choi" },
              { title: "Quản lý Hầm", icon: <CircleDot className="size-3" />, href: "/assets/info/ham" },
              { title: "Quản lý Hố ga", icon: <CircleDot className="size-3" />, href: "/assets/info/ho-ga" },
              { title: "Quản lý Hệ thống chiếu sáng", icon: <CircleDot className="size-3" />, href: "/assets/info/he-thong-chieu-sang" },
              { title: "Quản lý Hệ thống điện", icon: <CircleDot className="size-3" />, href: "/assets/info/he-thong-dien" },
              { title: "Quản lý Hệ thống ITS", icon: <CircleDot className="size-3" />, href: "/assets/info/he-thong-its" },
              { title: "Quản lý Kho bãi", icon: <CircleDot className="size-3" />, href: "/assets/info/kho-bai" },
              { title: "Quản lý Mái dốc", icon: <CircleDot className="size-3" />, href: "/assets/info/mai-doc" },
              { title: "Quản lý Mặt đường", icon: <CircleDot className="size-3" />, href: "/assets/info/mat-duong" },
              { title: "Quản lý Nút giao đường bộ", icon: <CircleDot className="size-3" />, href: "/assets/info/nut-giao" },
              { title: "Quản lý Phương tiện đi lại", icon: <CircleDot className="size-3" />, href: "/assets/info/phuong-tien" },
              { title: "Quản lý Rãnh dọc", icon: <CircleDot className="size-3" />, href: "/assets/info/ranh-doc" },
              { title: "Quản lý Rào chắn an toàn", icon: <CircleDot className="size-3" />, href: "/assets/info/rao-chan" },
              { title: "Quản lý Tôn hộ lan", icon: <CircleDot className="size-3" />, href: "/assets/info/ton-ho-lan" },
              { title: "Quản lý Thảm cỏ cây xanh", icon: <CircleDot className="size-3" />, href: "/assets/info/tham-co" },
              { title: "Quản lý Thiết bị cân xe", icon: <CircleDot className="size-3" />, href: "/assets/info/thiet-bi-can" },
              { title: "Quản lý Thiết bị O&M", icon: <CircleDot className="size-3" />, href: "/assets/info/thiet-bi-om" },
              { title: "Quản lý Thiết bị thử nghiệm", icon: <CircleDot className="size-3" />, href: "/assets/info/thiet-bi-thu-nghiem" },
              { title: "Quản lý Trạm dừng nghỉ", icon: <CircleDot className="size-3" />, href: "/assets/info/tram-dung-nghi" },
              { title: "Quản lý Trạm thu phí", icon: <CircleDot className="size-3" />, href: "/assets/info/tram-thu-phi" },
              { title: "Quản lý Trung tâm điều hành", icon: <CircleDot className="size-3" />, href: "/assets/info/trung-tam-dieu-hanh" },
              { title: "Quản lý Vạch kẻ đường", icon: <CircleDot className="size-3" />, href: "/assets/info/vach-ke-duong" },
              { title: "Quản lý thiết bị văn phòng, thiết bị CNTT", icon: <CircleDot className="size-3" />, href: "/assets/info/thiet-bi-van-phong" },
              { title: "Quản lý cấu hình cảnh báo tài sản", icon: <CircleDot className="size-3" />, href: "/assets/info/cau-hinh-canh-bao" },
            ]
          },
          {
            title: "V.2. Quản lý tài sản thanh lý",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Khởi tạo yêu cầu thanh lý tài sản", icon: <CircleDot className="size-3" />, href: "/assets/liquidate/create" },
              { title: "Phê duyệt yêu cầu thanh lý tài sản", icon: <CircleDot className="size-3" />, href: "/assets/liquidate/approve" },
              { title: "Cập nhật thông tin tài sản thanh lý", icon: <CircleDot className="size-3" />, href: "/assets/liquidate/update" },
              { title: "Xuất báo cáo thanh lý tài sản", icon: <CircleDot className="size-3" />, href: "/assets/liquidate/report" },
              { title: "Lưu trữ hồ sơ thanh lý tài sản", icon: <CircleDot className="size-3" />, href: "/assets/liquidate/archive" },
              { title: "Theo dõi trạng thái thanh lý tài sản", icon: <CircleDot className="size-3" />, href: "/assets/liquidate/track" },
            ]
          },
          {
            title: "V.3. Quản lý tài sản thanh hủy",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Khởi tạo yêu cầu Thanh hủy tài sản", icon: <CircleDot className="size-3" />, href: "/assets/destroy/create" },
              { title: "Phê duyệt yêu cầu Thanh hủy tài sản", icon: <CircleDot className="size-3" />, href: "/assets/destroy/approve" },
              { title: "Cập nhật thông tin tài sản Thanh hủy", icon: <CircleDot className="size-3" />, href: "/assets/destroy/update" },
              { title: "Xuất báo cáo Thanh hủy tài sản", icon: <CircleDot className="size-3" />, href: "/assets/destroy/report" },
              { title: "Lưu trữ hồ sơ Thanh hủy tài sản", icon: <CircleDot className="size-3" />, href: "/assets/destroy/archive" },
              { title: "Theo dõi trạng thái Thanh hủy tài sản", icon: <CircleDot className="size-3" />, href: "/assets/destroy/track" },
            ]
          },
          {
            title: "V.4. Quản lý kiểm kê tài sản",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Lập kế hoạch kiểm kê tài sản", icon: <CircleDot className="size-3" />, href: "/assets/inventory/plan" },
              { title: "Tạo phiếu kiểm kê tài sản", icon: <CircleDot className="size-3" />, href: "/assets/inventory/create" },
              { title: "Thực hiện kiểm kê tài sản thực địa", icon: <CircleDot className="size-3" />, href: "/assets/inventory/execute" },
              { title: "So sánh kết quả kiểm kê", icon: <CircleDot className="size-3" />, href: "/assets/inventory/compare" },
              { title: "Cập nhật dữ liệu sau kiểm kê", icon: <CircleDot className="size-3" />, href: "/assets/inventory/update" },
              { title: "Báo cáo kết quả kiểm kê", icon: <CircleDot className="size-3" />, href: "/assets/inventory/report" },
              { title: "Quản lý lịch sử kiểm kê", icon: <CircleDot className="size-3" />, href: "/assets/inventory/history" },
              { title: "Đề xuất xử lý tài sản sau kiểm kê", icon: <CircleDot className="size-3" />, href: "/assets/inventory/propose" },
            ]
          },
          {
            title: "V.5. Quản lý kho tài sản trên các tuyến",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Khai báo kho tài sản trên tuyến", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/declare" },
              { title: "Danh mục tài sản thu hồi lưu kho", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/list-recalled" },
              { title: "Cập nhật thông tin tài sản thu hồi theo từng tài sản", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/update-recalled-single" },
              { title: "Cập nhật thông tin tài sản thu hồi đồng loạt", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/update-recalled-batch" },
              { title: "Hiển thị danh mục tài sản thu hồi lưu kho", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/show-recalled" },
              {
                title: "Quản lý điều chuyển kho",
                icon: <CircleDot className="size-3" />,
                children: [
                  { title: "Cập nhật thông tin tài sản chuyển kho theo từng tài sản", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/transfer-single" },
                  { title: "Cập nhật thông tin tài sản chuyển kho đồng loạt", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/transfer-batch" },
                  { title: "Hiển thị danh mục tài sản đã chuyển kho", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/show-transferred" },
                  { title: "Tìm kiếm tài sản đã chuyển kho, truy xuất tình trạng", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/search-transferred" },
                  { title: "Báo cáo thống kê tài sản lưu kho, điều chuyển kho", icon: <CircleDot className="size-3" />, href: "/assets/warehouse/report-transferred" },
                ]
              }
            ]
          },
          {
            title: "V.6. Quản lý hợp đồng khai thác",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Khai báo thông tin hợp đồng", icon: <CircleDot className="size-3" />, href: "/assets/contract/declare" },
              { title: "Cập nhật thông tin hợp đồng", icon: <CircleDot className="size-3" />, href: "/assets/contract/update" },
              { title: "Tìm kiếm thông tin hợp đồng", icon: <CircleDot className="size-3" />, href: "/assets/contract/search" },
            ]
          },
          {
            title: "V.7. Quản lý hồ sơ quản lý khai thác",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Thêm mới hồ sơ tài liệu", icon: <CircleDot className="size-3" />, href: "/assets/profile/add" },
              { title: "Cập nhật thông tin hồ sơ", icon: <CircleDot className="size-3" />, href: "/assets/profile/update" },
              { title: "Tìm kiếm thông tin hồ sơ", icon: <CircleDot className="size-3" />, href: "/assets/profile/search" },
            ]
          },
          {
            title: "V.8. Báo cáo và thống kê tài sản",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Báo cáo tổng hợp tài sản", icon: <CircleDot className="size-3" />, href: "/assets/report/summary" },
            ]
          }
        ]
      }
    ]
  },


];

const adminNavItems: NavItem[] = [
  {
    title: "Phân hệ quản trị hệ thống",
    icon: <Settings className="size-5 text-slate-600" />,
    defaultExpanded: true,
    children: [
      {
        title: "Modules Quản trị hệ thống",
        icon: <ShieldCheck className="size-4" />,
        defaultExpanded: true,
        children: [
          { title: "Quản lý người dùng", icon: <CircleDot className="size-3" />, href: "/admin/quan-ly-nguoi-dung" },
          { title: "Quản lý cấu hình chung hệ thống", icon: <CircleDot className="size-3" />, href: "/admin/cau-hinh-chung" },
          {
            title: "Xác thực người sử dụng",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Thiết lập chính sách mật khẩu", icon: <CircleDot className="size-3" />, href: "/admin/chinh-sach-mat-khau" },
              { title: "Khóa tài khoản sau số lần đăng nhập sai", icon: <CircleDot className="size-3" />, href: "/admin/khoa-tai-khoan" },
            ]
          },
          {
            title: "Kiểm soát truy cập",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Quản lý thời gian chờ (Timeout)", icon: <CircleDot className="size-3" />, href: "/admin/timeout" },
              { title: "Phân quyền truy cập", icon: <CircleDot className="size-3" />, href: "/admin/phan-quyen-truy-cap" },
              { title: "Quản lý nhật ký hoạt động hệ thống (Audit Log)", icon: <CircleDot className="size-3" />, href: "/admin/nhat-ky-hoat-dong" },
            ]
          }
        ]
      },
      {
        title: "Modules quản trị danh mục",
        icon: <Table className="size-4" />,
        children: [
          { title: "Danh mục Phân quyền chức năng", icon: <CircleDot className="size-3" />, href: "/admin/dm-phan-quyen" },
          { title: "Quản lý danh mục địa phận tỉnh", icon: <CircleDot className="size-3" />, href: "/admin/dm-tinh" },
          { title: "Quản lý danh mục địa phận xã", icon: <CircleDot className="size-3" />, href: "/admin/dm-xa" },
          { title: "Quản lý danh mục phòng ban, trung tâm VEC", icon: <CircleDot className="size-3" />, href: "/admin/dm-phong-ban" },
          { title: "Quản lý danh mục các tuyến cao tốc do VEC quản lý", icon: <CircleDot className="size-3" />, href: "/admin/dm-tuyen-cao-toc" },
          { title: "Quản lý danh mục các đơn vị quản lý, khai thác, giám sát", icon: <CircleDot className="size-3" />, href: "/admin/dm-don-vi" },
          { title: "Quản lý danh mục tài sản trên tuyến", icon: <CircleDot className="size-3" />, href: "/admin/dm-tai-san" },
          { title: "Quản lý danh mục thiết bị", icon: <CircleDot className="size-3" />, href: "/admin/dm-thiet-bi" },
          { title: "Quản lý danh mục kho vật lý", icon: <CircleDot className="size-3" />, href: "/admin/dm-kho" },
          { title: "Quản lý danh mục hồ sơ tài sản đường cao tốc", icon: <CircleDot className="size-3" />, href: "/admin/dm-ho-so-tai-san" },
          {
            title: "Quản lý danh mục đánh giá chấm điểm giám sát",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Quản lý danh mục đánh giá bảo trì", icon: <CircleDot className="size-3" />, href: "/admin/dm-danh-gia-bao-tri" },
              { title: "Quản lý danh mục đánh giá sửa chữa", icon: <CircleDot className="size-3" />, href: "/admin/dm-danh-gia-sua-chua" },
              { title: "Quản lý danh mục tiêu chí đánh giá vận hành", icon: <CircleDot className="size-3" />, href: "/admin/dm-tieu-chi-van-hanh" },
              { title: "Quản lý danh mục mục sơ đồ mặt bằng", icon: <CircleDot className="size-3" />, href: "/admin/dm-so-do-mat-bang" },
              { title: "Quản lý danh mục của các lớp tài sản", icon: <CircleDot className="size-3" />, href: "/admin/dm-lop-tai-san" },
            ]
          }
        ]
      },
      {
        title: "Quản lý tích hợp, chia sẻ",
        icon: <Zap className="size-4" />,
        children: [
          { title: "Quản lý dịch vụ", icon: <CircleDot className="size-3" />, href: "/admin/quan-ly-dich-vu" },
          { title: "Theo dõi và giám sát tình trạng dịch vụ", icon: <CircleDot className="size-3" />, href: "/admin/giam-sat-dich-vu" },
          { title: "Quản lý cấu hình dịch vụ", icon: <CircleDot className="size-3" />, href: "/admin/cau-hinh-dich-vu" },
          {
            title: "Chia sẻ dữ liệu tài sản",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Dịch vụ dữ liệu tổng hợp tài sản", icon: <CircleDot className="size-3" />, href: "/admin/dv-tong-hop-tai-san" },
              { title: "Dịch vụ dữ liệu chi tiết tài sản", icon: <CircleDot className="size-3" />, href: "/admin/dv-chi-tiet-tai-san" },
            ]
          },
          {
            title: "Chia sẻ dịch vụ bảo trì tài sản",
            icon: <CircleDot className="size-3" />,
            children: [
              { title: "Dịch vụ dữ liệu bảo trì định kỳ", icon: <CircleDot className="size-3" />, href: "/admin/dv-bao-tri-dinh-ky" },
              { title: "Dịch vụ dữ liệu các yêu cầu theo thời gian, loại yêu cầu", icon: <CircleDot className="size-3" />, href: "/admin/dv-yeu-cau" },
            ]
          }
        ]
      },

    ]
  }
];

const waterwayNavItems: NavItem[] = [];

const railwayNavItems: NavItem[] = [];

const moduleNavItems = {
  BUSINESS: roadNavItems,
  ADMIN: adminNavItems
};

function NavItemComponent({ item, level = 0 }: { item: NavItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(!!item.defaultExpanded);
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
            {item.children.map((child) => (
              <NavItemComponent key={child.title} item={child} level={level + 1} />
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
  const [activeModule, setActiveModule] = useState<"BUSINESS" | "ADMIN">("BUSINESS");
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

  const findBreadcrumbPath = (items: NavItem[], targetPath: string, currentPath: string[] = []): string[] | null => {
    for (const item of items) {
      if (item.href && (targetPath === item.href || targetPath.startsWith(item.href + '/'))) {
        return [...currentPath, item.title];
      }
      if (item.children) {
        const found = findBreadcrumbPath(item.children, targetPath, [...currentPath, item.title]);
        if (found) return found;
      }
    }
    return null;
  };

  // Get page title based on current route
  const getPageTitle = (): React.ReactNode => {
    const path = location.pathname;
    const rootTitle = activeModule === "ADMIN" ? "Quản trị" : "Nghiệp vụ";
    const currentNavItems = moduleNavItems[activeModule];
    
    if (path === "/") {
      return "Tổng quan hệ thống";
    }

    const trail = findBreadcrumbPath(currentNavItems, path, [rootTitle]);

    if (trail && trail.length > 0) {
      return (
        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-500">
          {trail.map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-slate-350">|</span>}
              <span className={i === trail.length - 1 ? "text-slate-900 font-bold" : ""}>{t}</span>
            </React.Fragment>
          ))}
        </div>
      );
    }

    return "Hệ thống quản lý giao thông";
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
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/60 rounded-lg">
                <button
                  onClick={() => setActiveModule("BUSINESS")}
                  className={cn("flex flex-col items-center justify-center py-2 rounded-md transition-all", activeModule === "BUSINESS" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/80")}
                  title="Nghiệp vụ"
                >
                  <Briefcase className="size-4 mb-1" />
                  <span className="text-[10px] font-semibold">Nghiệp vụ</span>
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
              {filteredNavItems.map((item) => (
                <NavItemComponent key={item.title} item={item} />
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
              {[
                "/admin/cau-hinh-chung",
                "/admin/dang-nhap",
                "/admin/chinh-sach-mat-khau",
                "/admin/khoa-tai-khoan",
                "/admin/nhom-quyen",
                "/admin/phan-quyen-truy-cap",
                "/admin/timeout",
                "/admin/nhat-ky-hoat-dong",
                "/admin/lich-su-loi",
                "/admin/quan-ly-nguoi-dung",
                "/admin/tai-khoan"
              ].includes(location.pathname) ? (
                getPageTitle()
              ) : (
                <h2 className="text-lg font-semibold">{getPageTitle()}</h2>
              )}
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

