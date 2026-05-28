import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import {
  Route, Building2, Signpost, TrafficCone,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Shield, Lightbulb, Camera, Monitor, Warehouse, Construction, Droplets,
  Download, Calendar, X, Search, Filter, Upload, Eye, Edit, Trash2,
  Wrench, ClipboardCheck, FileText, MapPin, AlertCircle, Save, Plus,
  File, Trash, ExternalLink, Map as MapIcon, Layers, HardHat, Info,
  Split, UtilityPole, Waves, Ruler, Milestone
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DetailDialog } from "./DetailDialog";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";
import { TechnicalDialog } from "./TechnicalDialog";
import { ImportDialog } from "./ImportDialog";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  path?: string;
}

interface QuanLyKCHTProps {
  type?: string;
}

export function QuanLyKCHT({ type }: QuanLyKCHTProps = {}) {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<StatCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // New popup states
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);
  const [isTechnicalDialogOpen, setIsTechnicalDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Stats cards data - Road Infrastructure only
  const statsCards: StatCard[] = [
    { title: "Tổng số tuyến đường", value: "3,424", change: 96, icon: <Route className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/duong-bo/tuyen" },
    { title: "Đoạn địa phận", value: "3,424", change: 12, icon: <MapIcon className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/duong-bo/doan-dia-phan" },
    { title: "Đoạn mặt cắt", value: "3,424", change: 8, icon: <Layers className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/duong-bo/doan-mat-cat" },
    { title: "Cầu", value: "3,424,890k", change: 4, icon: <Building2 className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/cau/lon" },
    { title: "Hầm đường bộ", value: "3,424,878k", change: 12.4, icon: <Construction className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/ham" },
    { title: "Đường ngang", value: "3,424,878k", change: 453, icon: <Route className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/duong-ngang" },
    { title: "Biển báo", value: "3,424,878k", change: 15.2, icon: <Signpost className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/bien-bao" },
    { title: "Hố ga", value: "3,424,878k", change: 2.1, icon: <Droplets className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/ho-ga" },
    { title: "Cột Km", value: "3,424,878k", change: 7.1, icon: <Milestone className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/cot-km" },
    { title: "Cọc H", value: "3,424,878k", change: 312, icon: <Milestone className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/coc-h" },
    { title: "Cống", value: "3,424,878k", change: 5.6, icon: <Waves className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/cong" },
    { title: "Lối rẽ", value: "3,424,878k", change: 1.2, icon: <Split className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/loi-re" },
    { title: "Kè", value: "3,424,878k", change: 3.4, icon: <Shield className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/ke" },
    { title: "Rãnh nước", value: "3,424,878k", change: 4.5, icon: <Droplets className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/ranh-nuoc" },
    { title: "Đoạn cọc tiêu", value: "3,424,878k", change: 9.1, icon: <TrafficCone className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/coc-tieu" },
    { title: "Vạch kẻ đường", value: "3,424,878k", change: 22.4, icon: <Ruler className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/vach-ke" },
    { title: "Dải phân cách", value: "3,424,878k", change: 6.2, icon: <Layers className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/dai-phan-cach" },
    { title: "Lan can", value: "3,424,878k", change: 3.8, icon: <Shield className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/lan-can" },
    { title: "Giá long môn", value: "3,424,878k", change: 4.1, icon: <UtilityPole className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/gia-long-mon" },
    { title: "Cột cần vươn", value: "3,424,878k", change: 1.9, icon: <UtilityPole className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/cot-can-vuon" },
    { title: "Đinh phản quang", value: "3,424,878k", change: 33.2, icon: <Info className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/phu-tro/dinh-phan-quang" },
    { title: "Đèn tín hiệu", value: "3,424,878k", change: 453, icon: <Lightbulb className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/cong-nghe/den-tin-hieu" },
    { title: "Nút giao", value: "3,424,878k", change: 87.3, icon: <TrafficCone className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/nut-giao" },
    { title: "Đấu nối", value: "3,424,878k", change: 2.5, icon: <ExternalLink className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/dau-noi" },
    { title: "Hành lang an toàn", value: "3,424,878k", change: 4, icon: <Shield className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/hanh-lang-an-toan" },
    { title: "Hạ tầng vận tải", value: "3,424,878k", change: 11.2, icon: <Warehouse className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/ha-tang-van-tai" },
    { title: "Camera giao thông", value: "3,424,878k", change: 231, icon: <Camera className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/cong-nghe/camera" },
    { title: "Biển điện tử VMS", value: "3,424,878k", change: 231, icon: <Monitor className="size-5" />, color: "bg-slate-100", iconColor: "text-slate-600", path: "/cong-nghe/vms" },
  ];

  // Chart data
  const chartData = {
    labels: ['T4/2025', 'T5/2025', 'T6/2025', 'T7/2025', 'T8/2025', 'T9/2025', 'T10/2025', 'T11/2025', 'T12/2025', 'T1/2026', 'T2/2026', 'T3/2026'],
    datasets: [
      {
        label: 'Tổng số dữ liệu',
        data: [1066.6, 1045.4, 1117.2, 1138.9, 1231.2, 1127.1, 1120.8, 1163.2, 1091.6, 1195.8, 1167.5, 1155.5],
        backgroundColor: '#06b6d4',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#e2e8f0',
        },
      },
    },
  };

  // Table data
  const tableData = [
    { assetType: "Cột KM", belongsTo: "Quốc lộ 6", quantity: 20 },
    { assetType: "Cột H", belongsTo: "Quốc lộ 6", quantity: 200 },
    { assetType: "Biển báo giao thông", belongsTo: "Quốc lộ 1A", quantity: 145 },
    { assetType: "Đèn tín hiệu", belongsTo: "Quốc lộ 6", quantity: 35 },
    { assetType: "Camera giám sát", belongsTo: "Quốc lộ 5", quantity: 58 },
    { assetType: "Cầu đường bộ", belongsTo: "Quốc lộ 18", quantity: 12 },
    { assetType: "Hầm đường bộ", belongsTo: "Quốc lộ 3", quantity: 4 },
    { assetType: "Nút giao thông", belongsTo: "Quốc lộ 1A", quantity: 23 },
  ];

  // Dữ liệu Tuyến đường mẫu
  const detailedRoadData = [
    { stt: 1, status: "Hoạt động", tenDuong: "Quốc lộ 1A", maDuong: "QL1A", loai: "Quốc lộ", chieuDai: "2.301 km", diemDau: "Hà Nội", diemCuoi: "TP. HCM", donViQL: "Cục Đường bộ VN", ngayCapNhat: "01/01/2024", trangThai: "Đã phê duyệt" },
    { stt: 2, status: "Hoạt động", tenDuong: "Quốc lộ 5", maDuong: "QL5", loai: "Quốc lộ", chieuDai: "105 km", diemDau: "Hà Nội", diemCuoi: "Hải Phòng", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "15/03/2024", trangThai: "Đã phê duyệt" },
    { stt: 3, status: "Bảo trì", tenDuong: "Quốc lộ 6", maDuong: "QL6", loai: "Quốc lộ", chieuDai: "217 km", diemDau: "Hà Nội", diemCuoi: "Sơn La", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "20/02/2024", trangThai: "Chưa phê duyệt" },
    { stt: 4, status: "Hoạt động", tenDuong: "Đường Vành đai 3", maDuong: "VD3-HN", loai: "Đường đô thị", chieuDai: "65 km", diemDau: "Nội Bài", diemCuoi: "Nội Bài (vòng)", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "10/04/2024", trangThai: "Đã phê duyệt" },
    { stt: 5, status: "Hoạt động", tenDuong: "Đường cao tốc Pháp Vân - Cầu Giẽ", maDuong: "CT01", loai: "Đường cao tốc", chieuDai: "29.7 km", diemDau: "Pháp Vân", diemCuoi: "Cầu Giẽ", donViQL: "VEC", ngayCapNhat: "05/01/2024", trangThai: "Đã phê duyệt" },
    { stt: 6, status: "Hoạt động", tenDuong: "Đường Láng - Hòa Lạc", maDuong: "QL21B", loai: "Quốc lộ", chieuDai: "30 km", diemDau: "Cầu Giấy", diemCuoi: "Hòa Lạc", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "12/03/2024", trangThai: "Đã phê duyệt" },
    { stt: 7, status: "Bảo trì", tenDuong: "Quốc lộ 32", maDuong: "QL32", loai: "Quốc lộ", chieuDai: "330 km", diemDau: "Hà Nội", diemCuoi: "Lai Châu", donViQL: "Cục Đường bộ VN", ngayCapNhat: "28/02/2024", trangThai: "Chưa phê duyệt" },
    { stt: 8, status: "Hoạt động", tenDuong: "Đường Vành đai 2", maDuong: "VD2-HN", loai: "Đường đô thị", chieuDai: "43.6 km", diemDau: "Nhật Tân", diemCuoi: "Nhật Tân (vòng)", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "17/04/2024", trangThai: "Đã phê duyệt" },
    { stt: 9, status: "Hoạt động", tenDuong: "Quốc lộ 18", maDuong: "QL18", loai: "Quốc lộ", chieuDai: "196 km", diemDau: "Nội Bài", diemCuoi: "Mông Dương", donViQL: "Cục Đường bộ VN", ngayCapNhat: "22/01/2024", trangThai: "Đã phê duyệt" },
    { stt: 10, status: "Hoạt động", tenDuong: "Đường Hồ Tây - Ba Vì", maDuong: "TH-BV", loai: "Đường tỉnh", chieuDai: "64 km", diemDau: "Hồ Tây", diemCuoi: "Ba Vì", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "09/04/2024", trangThai: "Chưa phê duyệt" },
  ];

  // Dữ liệu Cầu mẫu
  const detailedBridgeData = [
    { stt: 1, status: "Hoạt động", tenDuong: "Cầu Chương Dương", maDuong: "BR-001", loai: "Cầu vĩnh cửu", chieuDai: "1.230 m", diemDau: "Q. Hoàn Kiếm", diemCuoi: "Q. Long Biên", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "10/01/2024", trangThai: "Đã phê duyệt" },
    { stt: 2, status: "Hoạt động", tenDuong: "Cầu Nhật Tân", maDuong: "BR-002", loai: "Cầu dây văng", chieuDai: "3.900 m", diemDau: "Q. Tây Hồ", diemCuoi: "H. Đông Anh", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "04/01/2024", trangThai: "Đã phê duyệt" },
    { stt: 3, status: "Bảo trì", tenDuong: "Cầu Thanh Trì", maDuong: "BR-003", loai: "Cầu bê tông", chieuDai: "3.083 m", diemDau: "Q. Hoàng Mai", diemCuoi: "Q. Long Biên", donViQL: "Sở GTVT Hà Nội", ngayCapNhat: "20/03/2024", trangThai: "Chưa phê duyệt" },
  ];

  // Helper to get data for dialog
  const getDialogData = () => {
    if (selectedCard?.title === "Cầu") return detailedBridgeData;
    return detailedRoadData;
  };

  const handleCardClick = (stat: StatCard) => {
    if (stat.path) {
      navigate(stat.path);
    } else {
      setSelectedCard(stat);
      setIsDialogOpen(true);
    }
  };

  const getAssetFields = (title: string) => {
    switch (title) {
      case "Tổng số tuyến đường":
        return [
          { name: "maTuyen", label: "Mã tuyến" },
          { name: "tenTuyen", label: "Tên tuyến" },
          { name: "capDuong", label: "Cấp đường" },
          { name: "chieuDai", label: "Chiều dài (km)" },
          { name: "tuKm", label: "Từ Km" },
          { name: "denKm", label: "Đến Km" },
          { name: "donViQuanLy", label: "Đơn vị quản lý" },
          { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
        ];
      case "Cầu":
        return [
          { name: "maCau", label: "Mã cầu" },
          { name: "tenCau", label: "Tên cầu" },
          { name: "tuyenDuong", label: "Tuyến đường" },
          { name: "lyTrinh", label: "Lý trình" },
          { name: "chieuDai", label: "Chiều dài" },
          { name: "loaiKetCau", label: "Loại kết cấu" },
          { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
        ];
      case "Hầm":
        return [
          { name: "maHam", label: "Mã hầm" },
          { name: "tenHam", label: "Tên hầm" },
          { name: "tuyenDuong", label: "Tuyến đường" },
          { name: "lyTrinh", label: "Lý trình" },
          { name: "chieuDai", label: "Chiều dài" },
          { name: "loaiHam", label: "Loại hầm" },
          { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
        ];
      default:
        return [
          { name: "maTS", label: "Mã tài sản" },
          { name: "tenTS", label: "Tên tài sản" },
          { name: "tuyenDuong", label: "Tuyến đường" },
          { name: "lyTrinh", label: "Lý trình" },
          { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
        ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {statsCards.map((stat, index) => (
          <Card
            key={index}
            className="bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleCardClick(stat)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <div className={stat.iconColor}>{stat.icon}</div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {stat.change > 0 ? (
                    <ArrowUpRight className="size-3 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="size-3 text-rose-600" />
                  )}
                  <span className={stat.change > 0 ? "text-emerald-600" : "text-rose-600"}>
                    {stat.change > 0 ? "+" : ""}{stat.change}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">{stat.title}</p>
              <p className="text-base font-bold text-slate-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900 text-base">Biểu đồ thu thập dữ liệu</CardTitle>
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                <Download className="size-4 mr-2" />
                Tải về dữ liệu
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 text-base">Danh sách CSDL thu thập</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tên loại KCHT</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Thuộc</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">{row.assetType}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{row.belongsTo}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900">{row.quantity.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Section */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="!max-w-[90vw] max-h-[95vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-6">
          <DialogHeader className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-slate-900 text-lg">
                  Danh sách {selectedCard?.title || 'Cầu'}
                </DialogTitle>
              </div>
              <div>
                <p className="text-sm text-blue-600">Đồng bộ cuối lúc 13:30 25/04/2026</p>
              </div>
            </div>
          </DialogHeader>

          {/* Stats Boxes */}
          <div className="grid grid-cols-3 gap-4 py-3">
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Tổng bản ghi</p>
              <p className="text-2xl font-bold text-slate-900">3,424</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Bản ghi mới hôm nay</p>
              <p className="text-2xl font-bold text-blue-600">2,179</p>
              <p className="text-xs text-blue-500 mt-1">Đồng bộ trong ngày</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Bản ghi cập nhật</p>
              <p className="text-2xl font-bold text-green-600">435</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="flex-1 overflow-hidden flex flex-col mt-4 min-h-0">
              {/* Search and Actions */}
              <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    placeholder="Tìm kiếm theo tên, mã đích vụ, đơn vị..."
                    className="pl-10 h-10 text-sm bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 text-sm">
                  <Filter className="size-4 mr-2" />
                  Tìm kiếm nâng cao
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 text-sm"
                  onClick={() => setIsImportDialogOpen(true)}
                >
                  <Upload className="size-4 mr-2" />
                  Nhập
                </Button>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 text-sm">
                  <Download className="size-4 mr-2" />
                  Xuất
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 text-sm">
                  <Search className="size-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>

              {/* Table Section */}
              <div className="flex-1 overflow-auto border border-slate-100 rounded-lg min-h-0">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
                    <tr>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">STT</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Trạng thái</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Tên đường / Tài sản</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Mã số</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Loại</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Chiều dài</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Điểm đầu</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Điểm cuối</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Đơn vị quản lý</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Ngày cập nhật</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider">Duyệt</th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap text-xs uppercase tracking-wider min-w-[120px]">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {getDialogData().map((row) => (
                      <tr key={row.stt} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="py-3 px-3 text-slate-400 text-xs font-medium">{row.stt}</td>
                        <td className="py-3 px-3">
                          <Badge
                            variant="outline"
                            className={
                              row.status === "Hoạt động"
                                ? "bg-green-50 text-green-700 border-green-200 text-xs"
                                : "bg-amber-50 text-amber-700 border-amber-200 text-xs"
                            }
                          >
                            {row.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-slate-900 font-semibold whitespace-nowrap">{row.tenDuong}</td>
                        <td className="py-3 px-3 font-mono text-blue-600 text-xs font-medium">{row.maDuong}</td>
                        <td className="py-3 px-3 text-slate-500 text-xs whitespace-nowrap">{row.loai}</td>
                        <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">{row.chieuDai}</td>
                        <td className="py-3 px-3 text-slate-500 text-xs whitespace-nowrap">{row.diemDau}</td>
                        <td className="py-3 px-3 text-slate-500 text-xs whitespace-nowrap">{row.diemCuoi}</td>
                        <td className="py-3 px-3 text-slate-500 text-xs whitespace-nowrap">{row.donViQL}</td>
                        <td className="py-3 px-3 text-slate-400 text-xs whitespace-nowrap">{row.ngayCapNhat}</td>
                        <td className="py-3 px-3">
                          <Badge
                            variant="outline"
                            className={
                              row.trangThai === "Đã phê duyệt"
                                ? "bg-green-50 text-green-700 border-green-100 text-xs"
                                : "bg-yellow-50 text-yellow-700 border-yellow-100 text-xs"
                            }
                          >
                            {row.trangThai}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" className="size-7 p-0 text-blue-500 hover:text-blue-700 hover:bg-blue-50" title="Xem chi tiết" onClick={() => { setSelectedItem(row); setIsDetailDialogOpen(true); }}>
                              <Eye className="size-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="size-7 p-0 text-slate-500 hover:text-slate-700 hover:bg-slate-100" title="Chỉnh sửa" onClick={() => { setSelectedItem(row); setIsEditDialogOpen(true); }}>
                              <Edit className="size-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="size-7 p-0 text-amber-500 hover:text-amber-700 hover:bg-amber-50" title="Lịch sử bảo trì" onClick={() => { setSelectedItem(row); setIsMaintenanceDialogOpen(true); }}>
                              <Wrench className="size-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="size-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" title="Xóa" onClick={() => { setSelectedItem(row); setIsDeleteDialogOpen(true); }}>
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Dialog Components */}
      <DetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedCard={selectedCard}
        selectedItem={selectedItem}
        onEditClick={() => {
          setIsDetailDialogOpen(false);
          setIsEditDialogOpen(true);
        }}
      />

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedCard={selectedCard}
        selectedItem={selectedItem}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCard={selectedCard}
        selectedItem={selectedItem}
        onConfirmDelete={() => {
          console.log("Xóa item:", selectedItem);
        }}
      />

      <TechnicalDialog
        open={isTechnicalDialogOpen}
        onOpenChange={setIsTechnicalDialogOpen}
        selectedCard={selectedCard}
        selectedItem={selectedItem}
      />

      {/* Maintenance Dialog */}
      <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
        <DialogContent className="!max-w-[90vw] max-h-[95vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-6">
          <DialogHeader className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-slate-900 text-lg">
                  Lịch sử bảo trì {selectedCard?.title || 'Cầu'}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Danh sách các lần bảo trì, sửa chữa
                </DialogDescription>
              </div>
              <div>
                <p className="text-sm text-blue-600">Đồng bộ cuối lúc 13:30 25/04/2026</p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto border border-slate-100 rounded-lg min-h-0">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">STT</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Tình trạng</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Tên đường</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Mã đường</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Độ dài</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Điểm bắt đầu</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Điểm kết thúc</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Loại</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Số điện thoại</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Ngày đăng ký</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Ngày đồng bộ</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem && (
                  <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 text-slate-900">{selectedItem.stt}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-xs px-2 py-0.5">
                        {selectedItem.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-900 whitespace-nowrap font-medium">{selectedItem.fullName}</td>
                    <td className="py-3 px-4 text-slate-900">{selectedItem.idNumber}</td>
                    <td className="py-3 px-4 text-slate-900">{selectedItem.birthDate}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.fatherName}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.motherName}</td>
                    <td className="py-3 px-4 text-slate-600">{selectedItem.gender}</td>
                    <td className="py-3 px-4 text-slate-600">{selectedItem.nationality}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.registrationDate}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.syncDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          selectedItem.condition === "Đã phê duyệt"
                            ? "bg-green-50 text-green-700 border-green-100 text-xs px-2 py-0.5"
                            : "bg-yellow-50 text-yellow-700 border-yellow-100 text-xs px-2 py-0.5"
                        }
                      >
                        {selectedItem.condition}
                      </Badge>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title={`Nhập dữ liệu ${selectedCard?.title || "Tài sản"}`}
        fields={getAssetFields(selectedCard?.title || "")}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />

      {/* Inspection Dialog */}
      <Dialog open={isInspectionDialogOpen} onOpenChange={setIsInspectionDialogOpen}>
        <DialogContent className="!max-w-[90vw] max-h-[95vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-6">
          <DialogHeader className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-slate-900 text-lg">
                  Lịch sử kiểm tra {selectedCard?.title || 'Cầu'}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Danh sách các lần kiểm tra định kỳ
                </DialogDescription>
              </div>
              <div>
                <p className="text-sm text-blue-600">Đồng bộ cuối lúc 13:30 25/04/2026</p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto border border-slate-100 rounded-lg min-h-0">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">STT</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Tình trạng</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Tên đường</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Mã đường</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Độ dài</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Điểm bắt đầu</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Điểm kết thúc</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Loại</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 whitespace-nowrap">Ngày đồng bộ</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem && (
                  <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 text-slate-900">{selectedItem.stt}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-xs px-2 py-0.5">
                        {selectedItem.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-900 whitespace-nowrap font-medium">{selectedItem.fullName}</td>
                    <td className="py-3 px-4 text-slate-900">{selectedItem.idNumber}</td>
                    <td className="py-3 px-4 text-slate-900">{selectedItem.birthDate}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.fatherName}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.motherName}</td>
                    <td className="py-3 px-4 text-slate-600">{selectedItem.gender}</td>
                    <td className="py-3 px-4 text-slate-600">{selectedItem.nationality}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.registrationDate}</td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{selectedItem.syncDate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          selectedItem.condition === "Đã phê duyệt"
                            ? "bg-green-50 text-green-700 border-green-100 text-xs px-2 py-0.5"
                            : "bg-yellow-50 text-yellow-700 border-yellow-100 text-xs px-2 py-0.5"
                        }
                      >
                        {selectedItem.condition}
                      </Badge>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}