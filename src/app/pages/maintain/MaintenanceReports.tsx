import React, { useState, useMemo } from "react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  BarChart3,
  PieChart,
  Download,
  FileText,
  Calendar,
  Filter,
  TrendingUp,
  AlertTriangle,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Activity,
  MapPin,
  Shield,
  Coins,
  FileSpreadsheet
} from "lucide-react";

export default function MaintenanceReports() {
  const location = useLocation();
  const path = location.pathname;

  // Determine current report type from path
  const reportType = useMemo(() => {
    if (path.includes("/bao-cao/dinh-ky")) return "dinh-ky";
    if (path.includes("/bao-cao/tinh-trang")) return "tinh-trang";
    if (path.includes("/bao-cao/hieu-suat")) return "hieu-suat";
    if (path.includes("/bao-cao/su-co")) return "su-co";
    if (path.includes("/bao-cao/lich-su")) return "lich-su";
    return "dinh-ky"; // fallback
  }, [path]);

  // States for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [routeFilter, setRouteFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");

  // Excel/PDF Exports handler
  const handleExport = (format: "Excel" | "PDF") => {
    alert(`Đang khởi tạo hệ thống xuất báo cáo...\nXuất báo cáo dạng ${format} thành công! File đã được lưu về thư mục tải xuống.`);
  };

  // Mock data for Report 1: Định kỳ
  const periodicData = [
    { code: "KHB-01", name: "Thảm lại bê tông nhựa mặt đường Km 12-15", route: "Cầu Giẽ - Ninh Bình", budget: "4.5 tỷ VND", progress: 100, status: "completed", date: "2026-05-15" },
    { code: "KHB-02", name: "Sơn dải phân cách và cọc tiêu Km 88-100", route: "Nội Bài - Lào Cai", budget: "850 triệu VND", progress: 80, status: "ongoing", date: "2026-06-10" },
    { code: "KHB-03", name: "Bảo trì định kỳ Trạm thu phí Liên Tuyền", route: "Cầu Giẽ - Ninh Bình", budget: "1.2 tỷ VND", progress: 100, status: "completed", date: "2026-05-20" },
    { code: "KHB-04", name: "Thay thế khe co giãn cầu Sông Hồng Km 15", route: "Pháp Vân - Cầu Giẽ", budget: "2.1 tỷ VND", progress: 30, status: "ongoing", date: "2026-07-01" },
    { code: "KHB-05", name: "Bảo trì hệ thống Camera ITS nút giao IC3", route: "Long Thành - Dầu Giây", budget: "650 triệu VND", progress: 15, status: "delayed", date: "2026-04-30" },
    { code: "KHB-06", name: "Gia cố mái taluy sạt trượt Km 45", route: "Đà Nẵng - Quảng Ngãi", budget: "3.8 tỷ VND", progress: 100, status: "completed", date: "2026-05-02" },
  ];

  // Mock data for Report 2: Tình trạng tài sản (PCI, IRI)
  const conditionData = [
    { code: "SEC-101", route: "Cầu Giẽ - Ninh Bình", location: "Km 10 - Km 15", pci: 88, iri: 1.8, rating: "Tốt", status: "stable", lastAssess: "2026-05-15" },
    { code: "SEC-102", route: "Cầu Giẽ - Ninh Bình", location: "Km 15 - Km 20", pci: 76, iri: 2.4, rating: "Khá", status: "stable", lastAssess: "2026-05-18" },
    { code: "SEC-201", route: "Nội Bài - Lào Cai", location: "Km 40 - Km 45", pci: 52, iri: 3.8, rating: "Trung bình", status: "needs_action", lastAssess: "2026-05-20" },
    { code: "SEC-202", route: "Nội Bài - Lào Cai", location: "Km 45 - Km 50", pci: 85, iri: 1.9, rating: "Tốt", status: "stable", lastAssess: "2026-05-22" },
    { code: "SEC-301", route: "Long Thành - Dầu Giây", location: "Km 0 - Km 12", pci: 91, iri: 1.5, rating: "Tốt (Rất tốt)", status: "stable", lastAssess: "2026-05-25" },
    { code: "SEC-401", route: "Đà Nẵng - Quảng Ngãi", location: "Km 75 - Km 80", pci: 48, iri: 4.2, rating: "Kém", status: "urgent", lastAssess: "2026-05-10" },
  ];

  // Mock data for Report 3: Hiệu suất công việc
  const performanceData = [
    { id: 1, team: "Đội tuần đường số 1 (VEC O&M)", tasks: 120, onTime: 115, sla: "95.8%", rating: "Xuất sắc", avgDuration: "2.4 giờ", status: "active" },
    { id: 2, team: "Đội tuần đường số 2 (VEC O&M)", tasks: 98, onTime: 88, sla: "89.7%", rating: "Đạt yêu cầu", avgDuration: "3.5 giờ", status: "active" },
    { id: 3, team: "Công ty Cổ phần bảo trì CT đường bộ 1", tasks: 45, onTime: 42, sla: "93.3%", rating: "Tốt", avgDuration: "1.2 ngày", status: "active" },
    { id: 4, team: "Nhà thầu Thiết bị Công nghệ ITS Việt Nam", tasks: 32, onTime: 26, sla: "81.2%", rating: "Cần cải thiện", avgDuration: "4.8 ngày", status: "warning" },
    { id: 5, team: "Trung tâm quản lý vận hành Long Thành", tasks: 75, onTime: 72, sla: "96.0%", rating: "Xuất sắc", avgDuration: "1.9 giờ", status: "active" },
  ];

  // Mock data for Report 4: Sự cố và đột xuất
  const incidentData = [
    { code: "INC-2026-01", type: "Vật cản mặt đường", route: "Cầu Giẽ - Ninh Bình", location: "Km 212+400", time: "2026-05-28 08:30", response: "45 phút", cost: "5 triệu VND", status: "resolved" },
    { code: "INC-2026-02", type: "Tai nạn giao thông - Hỏng hộ lan", route: "Long Thành - Dầu Giây", location: "Km 12+800", time: "2026-05-27 22:15", response: "1.5 giờ", cost: "35 triệu VND", status: "resolved" },
    { code: "INC-2026-03", type: "Sạt lở taluy dương do mưa bão", route: "Đà Nẵng - Quảng Ngãi", location: "Km 45+200", time: "2026-05-25 14:00", response: "12 giờ", cost: "240 triệu VND", status: "resolved" },
    { code: "INC-2026-04", type: "Hư hỏng khe co giãn đột xuất", route: "Nội Bài - Lào Cai", location: "Km 105+600", time: "2026-05-24 07:45", response: "4 giờ", cost: "18 triệu VND", status: "resolved" },
    { code: "INC-2026-05", type: "Mất tín hiệu camera giám sát giao thông", route: "Pháp Vân - Cầu Giẽ", location: "Nút giao IC1", time: "2026-05-23 11:30", response: "1.2 giờ", cost: "2 triệu VND", status: "resolved" },
  ];

  // Mock data for Report 5: Lịch sử bảo trì toàn bộ
  const historyData = [
    { id: "HIS-001", asset: "Cầu vượt nút giao IC3", category: "Cầu lớn", route: "Cầu Giẽ - Ninh Bình", type: "Bảo dưỡng định kỳ", cost: "250 triệu VND", contractor: "Công ty Cầu 75", date: "2026-04-20", doc: "QD-204/VEC-QLDA.pdf" },
    { id: "HIS-002", asset: "Mặt đường bê tông nhựa Km 12 - Km 18", category: "Mặt đường", route: "Cầu Giẽ - Ninh Bình", type: "Sửa chữa vừa", cost: "1.8 tỷ VND", contractor: "VEC O&M", date: "2026-03-12", doc: "QD-115/VEC-QLDA.pdf" },
    { id: "HIS-003", asset: "Hệ thống chiếu sáng LED Km 0 - Km 10", category: "Thiết bị phụ trợ", route: "Pháp Vân - Cầu Giẽ", type: "Bảo dưỡng thường xuyên", cost: "45 triệu VND", contractor: "Hapulico", date: "2026-05-05", doc: "QD-289/VEC-QLDA.pdf" },
    { id: "HIS-004", asset: "Hộ lan tôn sóng Km 140 - Km 142", category: "Thiết bị phụ trợ", route: "Nội Bài - Lào Cai", type: "Sửa chữa đột xuất", cost: "92 triệu VND", contractor: "VEC O&M", date: "2026-05-18", doc: "QD-312/VEC-QLDA.pdf" },
    { id: "HIS-005", asset: "Hầm đường bộ dốc xây dựng Km 185", category: "Hầm", route: "Nội Bài - Lào Cai", type: "Kiểm định định kỳ", cost: "420 triệu VND", contractor: "Viện KHCN GTVT", date: "2025-12-15", doc: "QD-984/VEC-QLDA.pdf" },
  ];

  // Filters calculation
  const routesList = ["Cầu Giẽ - Ninh Bình", "Nội Bài - Lào Cai", "Long Thành - Dầu Giây", "Đà Nẵng - Quảng Ngãi", "Pháp Vân - Cầu Giẽ"];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {reportType === "dinh-ky" && "Báo cáo Tổng hợp Bảo trì Định kỳ"}
            {reportType === "tinh-trang" && "Báo cáo Tình trạng Tài sản (PCI & IRI)"}
            {reportType === "hieu-suat" && "Báo cáo Đánh giá Hiệu suất Hoàn thành"}
            {reportType === "su-co" && "Báo cáo Tổng hợp Sự cố & Sửa chữa Đột xuất"}
            {reportType === "lich-su" && "Bảng Tra cứu & Xuất Lịch sử Bảo trì"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {reportType === "dinh-ky" && "Thống kê dữ liệu thực hiện kế hoạch bảo trì theo tuần, tháng, quý và năm (UC 169)."}
            {reportType === "tinh-trang" && "Đánh giá chất lượng và chỉ số kỹ thuật mặt đường, kết cấu công trình sau duy tu (UC 170)."}
            {reportType === "hieu-suat" && "Đánh giá tiến độ hoàn thành, thời gian xử lý và mức độ tuân thủ cam kết SLA (UC 171)."}
            {reportType === "su-co" && "Tổng hợp các vụ việc hư hỏng đột xuất, tai nạn giao thông và chi phí khắc phục (UC 172)."}
            {reportType === "lich-su" && "Tra cứu, tổng hợp chi tiết và xuất báo cáo lịch sử bảo dưỡng của từng tài sản (UC 173)."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
            onClick={() => handleExport("Excel")}
          >
            <FileSpreadsheet className="size-4 text-emerald-600" />
            Xuất Excel
          </Button>
          <Button 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            onClick={() => handleExport("PDF")}
          >
            <Download className="size-4" />
            Tải PDF Báo Cáo
          </Button>
        </div>
      </div>

      {/* Main KPI Stats grid (changes according to report type) */}
      {reportType === "dinh-ky" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-indigo-50 p-3 rounded-xl"><FileText className="size-6 text-indigo-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng KH Bảo trì</p>
                <p className="text-2xl font-bold text-slate-800">48 Kế hoạch</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl"><CheckCircle2 className="size-6 text-emerald-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-emerald-600">36 / 48 (75%)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-xl"><Activity className="size-6 text-amber-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đang triển khai</p>
                <p className="text-2xl font-bold text-slate-800">8 Dự án</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-rose-50 p-3 rounded-xl"><AlertTriangle className="size-6 text-rose-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chậm tiến độ</p>
                <p className="text-2xl font-bold text-rose-600">4 Kế hoạch</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === "tinh-trang" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl"><Activity className="size-6 text-emerald-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Chỉ số PCI TB</p>
                <p className="text-2xl font-bold text-emerald-600">82 / 100</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl"><TrendingUp className="size-6 text-blue-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Độ bằng phẳng IRI TB</p>
                <p className="text-2xl font-bold text-slate-800">2.1 m/km</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-indigo-50 p-3 rounded-xl"><CheckCircle2 className="size-6 text-indigo-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đạt tiêu chuẩn kỹ thuật</p>
                <p className="text-2xl font-bold text-slate-800">94.2%</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-xl"><AlertTriangle className="size-6 text-amber-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đoạn cần duy tu khẩn cấp</p>
                <p className="text-2xl font-bold text-amber-600">12 Điểm</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === "hieu-suat" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-50 p-3 rounded-xl"><CheckCircle2 className="size-6 text-green-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tỷ lệ đúng hạn SLA</p>
                <p className="text-2xl font-bold text-green-600">91.5%</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl"><Clock className="size-6 text-blue-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Thời gian xử lý TB</p>
                <p className="text-2xl font-bold text-slate-800">3.2 ngày</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-yellow-50 p-3 rounded-xl"><TrendingUp className="size-6 text-yellow-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mức độ hài lòng</p>
                <p className="text-2xl font-bold text-slate-800">4.8 / 5.0</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-slate-100 p-3 rounded-xl"><Shield className="size-6 text-slate-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Điểm KPI Trung bình</p>
                <p className="text-2xl font-bold text-slate-800">94.6 điểm</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === "su-co" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-rose-50 p-3 rounded-xl"><AlertTriangle className="size-6 text-rose-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng số sự cố</p>
                <p className="text-2xl font-bold text-slate-800">184 Vụ việc</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl"><CheckCircle2 className="size-6 text-emerald-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đã khắc phục xong</p>
                <p className="text-2xl font-bold text-emerald-600">172 Vụ (93.5%)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-indigo-50 p-3 rounded-xl"><Clock className="size-6 text-indigo-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Thời gian khắc phục TB</p>
                <p className="text-2xl font-bold text-slate-800">1.8 giờ</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-xl"><Coins className="size-6 text-amber-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng kinh phí xử lý</p>
                <p className="text-2xl font-bold text-slate-800">1.2 tỷ VND</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === "lich-su" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl"><FileText className="size-6 text-blue-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lịch sử ghi nhận</p>
                <p className="text-2xl font-bold text-slate-800">1,245 Bản ghi</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl"><Coins className="size-6 text-emerald-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lũy kế kinh phí duy tu</p>
                <p className="text-2xl font-bold text-emerald-600">42.5 tỷ VND</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-indigo-50 p-3 rounded-xl"><Shield className="size-6 text-indigo-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tài sản đã bảo trì</p>
                <p className="text-2xl font-bold text-slate-800">820 Tài sản</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-slate-50 p-3 rounded-xl"><Calendar className="size-6 text-slate-600" /></div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đợt kiểm tra lớn gần nhất</p>
                <p className="text-2xl font-bold text-slate-800">15 ngày trước</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dynamic Visual Content & Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column (Main Charts/Stats Visualization) */}
        <Card className="md:col-span-2 shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 py-3">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="size-4 text-indigo-600" />
              Biểu đồ trực quan và phân tích dữ liệu
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {reportType === "dinh-ky" && (
              <div className="space-y-6">
                <h4 className="font-semibold text-sm text-slate-700">Tỷ lệ hoàn thành kế hoạch bảo trì theo các Tuyến cao tốc</h4>
                <div className="space-y-4">
                  {[
                    { name: "Cầu Giẽ - Ninh Bình", percentage: 92, count: "12/13", color: "bg-emerald-500" },
                    { name: "Nội Bài - Lào Cai", percentage: 65, count: "13/20", color: "bg-amber-500" },
                    { name: "Long Thành - Dầu Giây", percentage: 88, count: "7/8", color: "bg-emerald-500" },
                    { name: "Đà Nẵng - Quảng Ngãi", percentage: 75, count: "3/4", color: "bg-blue-500" },
                    { name: "Pháp Vân - Cầu Giẽ", percentage: 33, count: "1/3", color: "bg-rose-500" },
                  ].map((row, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-600">
                        <span>{row.name} ({row.count} dự án)</span>
                        <span>{row.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reportType === "tinh-trang" && (
              <div className="space-y-6">
                <h4 className="font-semibold text-sm text-slate-700">Phân bố chỉ số chất lượng mặt đường (PCI) trung bình</h4>
                <div className="h-48 flex items-end justify-between gap-2 border-b border-l pb-2 pl-2 mt-4">
                  {[
                    { label: "Km 0-50", val: 86, color: "bg-emerald-500" },
                    { label: "Km 50-100", val: 79, color: "bg-emerald-400" },
                    { label: "Km 100-150", val: 55, color: "bg-amber-500" },
                    { label: "Km 150-200", val: 68, color: "bg-blue-500" },
                    { label: "Km 200+", val: 82, color: "bg-emerald-500" }
                  ].map((col, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-700">{col.val}</span>
                      <div className={`w-full ${col.color} rounded-t`} style={{ height: `${col.val * 1.5}px` }}></div>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">{col.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic text-center mt-2">Biểu diễn chỉ số PCI thực tế đo đạc tự động trên tuyến Nội Bài - Lào Cai</p>
              </div>
            )}

            {reportType === "hieu-suat" && (
              <div className="space-y-6">
                <h4 className="font-semibold text-sm text-slate-700">Tỷ lệ đáp ứng cam kết thời gian xử lý (SLA)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Đúng hạn tuyệt đối (SLA &lt; 24h)</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-extrabold text-indigo-600">84.2%</span>
                      <span className="text-xs text-green-600 font-semibold">+1.8% QoQ</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-3">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: "84.2%" }}></div>
                    </div>
                  </div>
                  <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Trễ hạn trung bình (SLA &gt; 48h)</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-extrabold text-rose-500">2.5%</span>
                      <span className="text-xs text-green-600 font-semibold">-0.5% QoQ</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-3">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: "2.5%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-600">Hiệu suất hoàn thành theo danh mục sự cố:</p>
                  <div className="grid grid-cols-3 text-center gap-3">
                    <div className="bg-slate-50 p-2.5 rounded-lg border"><div className="text-xs font-medium text-slate-500">Vật cản</div><div className="text-lg font-bold text-slate-800">45 phút</div></div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border"><div className="text-xs font-medium text-slate-500">Hỏng hộ lan</div><div className="text-lg font-bold text-slate-800">2.4 giờ</div></div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border"><div className="text-xs font-medium text-slate-500">Ổ gà lớn</div><div className="text-lg font-bold text-slate-800">4.8 giờ</div></div>
                  </div>
                </div>
              </div>
            )}

            {reportType === "su-co" && (
              <div className="space-y-6">
                <h4 className="font-semibold text-sm text-slate-700">Phân loại sự cố ghi nhận trên các tuyến đường cao tốc VEC</h4>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border p-4 rounded-xl flex items-center justify-between bg-slate-50/50">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">74 vụ</span>
                      <span className="block text-[11px] font-semibold uppercase text-slate-500 mt-1">Va chạm & Tai nạn</span>
                    </div>
                    <div className="size-2 bg-indigo-500 rounded-full"></div>
                  </div>
                  <div className="border p-4 rounded-xl flex items-center justify-between bg-slate-50/50">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">45 vụ</span>
                      <span className="block text-[11px] font-semibold uppercase text-slate-500 mt-1">Thiên tai & Ngập úng</span>
                    </div>
                    <div className="size-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="border p-4 rounded-xl flex items-center justify-between bg-slate-50/50">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">38 vụ</span>
                      <span className="block text-[11px] font-semibold uppercase text-slate-500 mt-1">Hư hỏng hộ lan, biển</span>
                    </div>
                    <div className="size-2 bg-amber-500 rounded-full"></div>
                  </div>
                  <div className="border p-4 rounded-xl flex items-center justify-between bg-slate-50/50">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">27 vụ</span>
                      <span className="block text-[11px] font-semibold uppercase text-slate-500 mt-1">Ổ gà & nứt mặt đường</span>
                    </div>
                    <div className="size-2 bg-rose-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {reportType === "lich-su" && (
              <div className="space-y-6">
                <h4 className="font-semibold text-sm text-slate-700">Biểu đồ cơ cấu kinh phí bảo trì theo hạng mục (%)</h4>
                <div className="flex items-center justify-around py-8">
                  <div className="relative size-36 rounded-full border-[12px] border-slate-100 flex items-center justify-center">
                    <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-indigo-500 border-r-indigo-500 border-b-emerald-500 border-l-amber-500 rotate-12"></div>
                    <div className="text-center">
                      <span className="text-xl font-black text-indigo-700">100%</span>
                      <span className="block text-[9px] font-semibold text-slate-400">42.5 tỷ</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs"><div className="size-2.5 rounded bg-indigo-500"></div><span className="text-slate-600 font-medium">Kết cấu cầu hầm (55%)</span></div>
                    <div className="flex items-center gap-2 text-xs"><div className="size-2.5 rounded bg-emerald-500"></div><span className="text-slate-600 font-medium">Mặt đường bộ (30%)</span></div>
                    <div className="flex items-center gap-2 text-xs"><div className="size-2.5 rounded bg-amber-500"></div><span className="text-slate-600 font-medium">Thiết bị ITS/Phụ trợ (15%)</span></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column (Donut chart & general stats distribution) */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 py-3">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <PieChart className="size-4 text-emerald-600" />
              Tổng quan phân bổ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative size-36 rounded-full border-[12px] border-slate-100 flex items-center justify-center">
                <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-emerald-500 border-r-emerald-500 border-b-amber-500 border-l-rose-500 rotate-45"></div>
                <div className="text-center">
                  <span className="text-xl font-bold text-slate-800">
                    {reportType === "dinh-ky" && "85.4%"}
                    {reportType === "tinh-trang" && "82/100"}
                    {reportType === "hieu-suat" && "91.5%"}
                    {reportType === "su-co" && "93.5%"}
                    {reportType === "lich-su" && "42.5 tỷ"}
                  </span>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                    {reportType === "dinh-ky" && "Đã thực hiện"}
                    {reportType === "tinh-trang" && "Đánh giá PCI"}
                    {reportType === "hieu-suat" && "SLA Đạt chuẩn"}
                    {reportType === "su-co" && "Khắc phục"}
                    {reportType === "lich-su" && "Tổng chi phí"}
                  </span>
                </div>
              </div>

              <div className="w-full space-y-2 border-t pt-4">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded bg-emerald-500"></div>
                    <span>
                      {reportType === "dinh-ky" && "Hoàn thành"}
                      {reportType === "tinh-trang" && "Tốt"}
                      {reportType === "hieu-suat" && "Xuất sắc (Đúng hạn)"}
                      {reportType === "su-co" && "Đã giải quyết"}
                      {reportType === "lich-su" && "Cầu hầm"}
                    </span>
                  </div>
                  <span>
                    {reportType === "dinh-ky" && "36 dự án"}
                    {reportType === "tinh-trang" && "60%"}
                    {reportType === "hieu-suat" && "115 ca"}
                    {reportType === "su-co" && "172 vụ"}
                    {reportType === "lich-su" && "23.3 tỷ"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded bg-amber-500"></div>
                    <span>
                      {reportType === "dinh-ky" && "Đang thực hiện"}
                      {reportType === "tinh-trang" && "Khá/Trung bình"}
                      {reportType === "hieu-suat" && "Khá (Trễ dưới 2h)"}
                      {reportType === "su-co" && "Đang xử lý"}
                      {reportType === "lich-su" && "Mặt đường"}
                    </span>
                  </div>
                  <span>
                    {reportType === "dinh-ky" && "8 dự án"}
                    {reportType === "tinh-trang" && "30%"}
                    {reportType === "hieu-suat" && "26 ca"}
                    {reportType === "su-co" && "12 vụ"}
                    {reportType === "lich-su" && "12.7 tỷ"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded bg-rose-500"></div>
                    <span>
                      {reportType === "dinh-ky" && "Chậm tiến độ"}
                      {reportType === "tinh-trang" && "Kém"}
                      {reportType === "hieu-suat" && "Chậm cam kết"}
                      {reportType === "su-co" && "Chưa xử lý"}
                      {reportType === "lich-su" && "Thiết bị ITS"}
                    </span>
                  </div>
                  <span>
                    {reportType === "dinh-ky" && "4 dự án"}
                    {reportType === "tinh-trang" && "10%"}
                    {reportType === "hieu-suat" && "11 ca"}
                    {reportType === "su-co" && "0 vụ"}
                    {reportType === "lich-su" && "6.5 tỷ"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table for Report Detail Records */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-800">
              {reportType === "dinh-ky" && "Danh sách Kế hoạch Bảo trì Định kỳ"}
              {reportType === "tinh-trang" && "Chi tiết PCI & IRI theo từng Phân đoạn Tuyến"}
              {reportType === "hieu-suat" && "Danh sách Đội ngũ và Nhà thầu vận hành"}
              {reportType === "su-co" && "Nhật ký Xử lý Sự cố & Khắc phục đột xuất"}
              {reportType === "lich-su" && "Bảng tổng hợp Lịch sử Duy tu & Sửa chữa"}
            </CardTitle>
            <CardDescription className="text-xs">
              Sử dụng các công cụ lọc phía dưới để tìm kiếm chi tiết.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <Input
                placeholder="Tìm kiếm nhanh..."
                className="pl-8 h-8 text-xs border-slate-200 bg-white w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={routeFilter} onValueChange={setRouteFilter}>
              <SelectTrigger className="h-8 text-xs border-slate-200 bg-white w-40">
                <SelectValue placeholder="Chọn Tuyến" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả Tuyến</SelectItem>
                {routesList.map((route, i) => (
                  <SelectItem key={i} value={route}>{route}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <div className="overflow-x-auto">
          {reportType === "dinh-ky" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold w-12 text-center">STT</th>
                  <th className="px-6 py-4 font-semibold">Mã KH</th>
                  <th className="px-6 py-4 font-semibold">Tên Kế hoạch / Dự án</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold">Kinh phí dự kiến</th>
                  <th className="px-6 py-4 font-semibold">Thời gian</th>
                  <th className="px-6 py-4 font-semibold">Tiến độ</th>
                  <th className="px-6 py-4 font-semibold text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {periodicData
                  .filter(item => routeFilter === "all" || item.route === routeFilter)
                  .filter(item => searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600 text-xs">{item.code}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-slate-600">{item.route}</td>
                      <td className="px-6 py-4 text-slate-800 font-medium">{item.budget}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{item.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.progress === 100 ? "bg-emerald-500" : "bg-indigo-500"} rounded-full`} style={{ width: `${item.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{item.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Badge className={
                          item.status === "completed" ? "bg-green-100 text-green-700 hover:bg-green-100 border-none" :
                          item.status === "ongoing" ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none" :
                          "bg-rose-100 text-rose-700 hover:bg-rose-100 border-none"
                        }>
                          {item.status === "completed" ? "Đã xong" : item.status === "ongoing" ? "Đang làm" : "Chậm tiến độ"}
                        </Badge>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === "tinh-trang" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold w-12 text-center">STT</th>
                  <th className="px-6 py-4 font-semibold">Mã Phân Đoạn</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold">Phạm vi (Lý trình)</th>
                  <th className="px-6 py-4 font-semibold text-center">PCI (0-100)</th>
                  <th className="px-6 py-4 font-semibold text-center">IRI (m/km)</th>
                  <th className="px-6 py-4 font-semibold text-center">Chất lượng</th>
                  <th className="px-6 py-4 font-semibold">Đo gần nhất</th>
                  <th className="px-6 py-4 font-semibold text-right">Yêu cầu hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {conditionData
                  .filter(item => routeFilter === "all" || item.route === routeFilter)
                  .filter(item => searchTerm === "" || item.code.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-xs">{item.code}</td>
                      <td className="px-6 py-4 text-slate-600">{item.route}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{item.location}</td>
                      <td className="px-6 py-4 text-center font-bold text-slate-800">{item.pci}</td>
                      <td className="px-6 py-4 text-center font-medium text-slate-800">{item.iri}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-semibold ${
                          item.pci >= 80 ? "text-emerald-600" :
                          item.pci >= 65 ? "text-blue-600" :
                          item.pci >= 50 ? "text-amber-600" : "text-rose-600"
                        }`}>{item.rating}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{item.lastAssess}</td>
                      <td className="px-6 py-4 text-right">
                        <Badge className={
                          item.status === "stable" ? "bg-green-100 text-green-700 hover:bg-green-100 border-none" :
                          item.status === "needs_action" ? "bg-amber-100 text-amber-700 hover:bg-amber-100 border-none" :
                          "bg-rose-100 text-rose-700 hover:bg-rose-100 border-none"
                        }>
                          {item.status === "stable" ? "Bình thường" : item.status === "needs_action" ? "Cần duy tu" : "Sửa chữa khẩn"}
                        </Badge>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === "hieu-suat" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold w-12 text-center">STT</th>
                  <th className="px-6 py-4 font-semibold">Đơn vị / Đội tuần kiểm</th>
                  <th className="px-6 py-4 font-semibold text-center">Số công việc / Sự cố</th>
                  <th className="px-6 py-4 font-semibold text-center">Đúng hạn (SLA)</th>
                  <th className="px-6 py-4 font-semibold text-center">Tỷ lệ đáp ứng</th>
                  <th className="px-6 py-4 font-semibold text-center">Thời gian xử lý TB</th>
                  <th className="px-6 py-4 font-semibold text-right">Đánh giá chung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {performanceData
                  .filter(item => searchTerm === "" || item.team.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{item.team}</td>
                      <td className="px-6 py-4 text-center font-medium text-slate-900">{item.tasks}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{item.onTime} ca</td>
                      <td className="px-6 py-4 text-center font-bold text-indigo-600">{item.sla}</td>
                      <td className="px-6 py-4 text-center text-slate-800 font-medium">{item.avgDuration}</td>
                      <td className="px-6 py-4 text-right">
                        <Badge className={
                          item.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100 border-none" :
                          "bg-amber-100 text-amber-700 hover:bg-amber-100 border-none"
                        }>
                          {item.rating}
                        </Badge>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === "su-co" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold w-12 text-center">STT</th>
                  <th className="px-6 py-4 font-semibold">Mã Sự Cố</th>
                  <th className="px-6 py-4 font-semibold">Loại hình / Tính chất</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold">Vị trí (Lý trình)</th>
                  <th className="px-6 py-4 font-semibold">Thời gian phát hiện</th>
                  <th className="px-6 py-4 font-semibold">Thời gian khắc phục</th>
                  <th className="px-6 py-4 font-semibold">Kinh phí phát sinh</th>
                  <th className="px-6 py-4 font-semibold text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {incidentData
                  .filter(item => routeFilter === "all" || item.route === routeFilter)
                  .filter(item => searchTerm === "" || item.type.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-rose-600 text-xs">{item.code}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.type}</td>
                      <td className="px-6 py-4 text-slate-600">{item.route}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">{item.location}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{item.time}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{item.response}</td>
                      <td className="px-6 py-4 text-slate-950 font-bold">{item.cost}</td>
                      <td className="px-6 py-4 text-right">
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                          Đã khắc phục
                        </Badge>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === "lich-su" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold w-12 text-center">STT</th>
                  <th className="px-6 py-4 font-semibold">Mã HIS</th>
                  <th className="px-6 py-4 font-semibold">Tên tài sản / Hạng mục</th>
                  <th className="px-6 py-4 font-semibold">Hạng mục chính</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold">Loại hình duy tu</th>
                  <th className="px-6 py-4 font-semibold">Chi phí</th>
                  <th className="px-6 py-4 font-semibold">Đơn vị thi công</th>
                  <th className="px-6 py-4 font-semibold">Ngày nghiệm thu</th>
                  <th className="px-6 py-4 font-semibold text-right">Hồ sơ đính kèm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyData
                  .filter(item => routeFilter === "all" || item.route === routeFilter)
                  .filter(item => searchTerm === "" || item.asset.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-xs">{item.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{item.asset}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs font-semibold">{item.category}</td>
                      <td className="px-6 py-4 text-slate-600">{item.route}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{item.type}</td>
                      <td className="px-6 py-4 text-indigo-700 font-bold">{item.cost}</td>
                      <td className="px-6 py-4 text-slate-600">{item.contractor}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{item.date}</td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="link" 
                          className="h-auto p-0 font-semibold text-indigo-600 hover:text-indigo-800 text-xs gap-1"
                          onClick={() => alert(`Đang tải xuống tài liệu: ${item.doc}`)}
                        >
                          <FileText className="size-3.5" />
                          {item.doc}
                        </Button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
