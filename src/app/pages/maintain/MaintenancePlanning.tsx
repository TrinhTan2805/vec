import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Calendar, Plus, Filter, ArrowRight, BarChart3, 
  AlertTriangle, CheckCircle2, Clock, Download, 
  Search, ShieldCheck, UserCheck, Wrench, Hammer, 
  Layers, TrafficCone, FileSpreadsheet, Eye, Trash2
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";

// Define mock data for each type of plan
const mockRoutinePlans = [
  { id: "KH-BTTX-001", name: "Bảo dưỡng lề đường và phát quang bụi rậm Tuyến Cầu Giẽ - Ninh Bình", route: "Cầu Giẽ - Ninh Bình", cost: "45,000,000đ", supervisor: "VEC O&M", date: "Tháng 06/2026", status: "Đã duyệt", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200", approval: "Nguyễn Văn Hùng (Cán bộ QLKT VEC)" },
  { id: "KH-BTTX-002", name: "Sơn dặm vạch kẻ đường Km215 - Km220", route: "Cầu Giẽ - Ninh Bình", cost: "28,000,000đ", supervisor: "VEC O&M", date: "05/06/2026", status: "Chờ duyệt", statusColor: "bg-amber-50 text-amber-700 border-amber-200", approval: "Chờ ý kiến VEC" },
  { id: "KH-BTTX-003", name: "Vệ sinh hệ thống rãnh dọc thoát nước Km180 - Km190 Nội Bài - Lào Cai", route: "Nội Bài - Lào Cai", cost: "60,000,000đ", supervisor: "Đơn vị vận hành NB-LC", date: "Tháng 06/2026", status: "Đã duyệt", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200", approval: "Lê Minh Tuấn (Phó phòng QLKT)" },
  { id: "KH-BTTX-004", name: "Kiểm tra định kỳ hệ thống chiếu sáng nút giao IC3", route: "Nội Bài - Lào Cai", cost: "15,000,000đ", supervisor: "Xí nghiệp điện", date: "20/06/2026", status: "Đang lập", statusColor: "bg-slate-100 text-slate-700 border-slate-200", approval: "Chưa gửi duyệt" },
];

const mockPeriodicPlans = [
  { id: "KH-SCĐK-101", name: "Cào bóc và thảm lại bê tông nhựa mặt đường Km205 - Km208", route: "Cầu Giẽ - Ninh Bình", cost: "2,450,000,000đ", contractor: "Công ty Thi công đường bộ Đông Á", time: "15/06/2026 - 30/06/2026", status: "Đã phê duyệt", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200", cycle: "Định kỳ 5 năm" },
  { id: "KH-SCĐK-102", name: "Thay thế khe co giãn cầu sông Lô Km112+300", route: "Nội Bài - Lào Cai", cost: "850,000,000đ", contractor: "Xí nghiệp Cầu đường bộ VEC", time: "10/06/2026 - 25/06/2026", status: "Chờ phê duyệt", statusColor: "bg-amber-50 text-amber-700 border-amber-200", cycle: "Định kỳ 3 năm" },
  { id: "KH-SCĐK-103", name: "Trùng tu trạm thu phí Túy Loan Km0+500", route: "Đà Nẵng - Quảng Ngãi", cost: "420,000,000đ", contractor: "Công ty Công nghệ Giao thông Việt", time: "01/07/2026 - 15/07/2026", status: "Đang lập", statusColor: "bg-slate-100 text-slate-700 border-slate-200", cycle: "Định kỳ 2 năm" },
];

const mockMajorPlans = [
  { id: "KH-SCL-201", name: "Gia cố kết cấu vòm hầm đường bộ qua đèo ngang Km400", route: "Hầm Đèo Ngang", cost: "14,500,000,000đ", bidRef: "Gói thầu XL-08/2026", time: "Quý III - Quý IV/2026", status: "Đã phê duyệt", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200", doc: "QD-PheDuyet-SCL201.pdf" },
  { id: "KH-SCL-202", name: "Sửa chữa nâng cấp toàn diện cầu vượt nút giao IC6 Km145", route: "Nội Bài - Lào Cai", cost: "8,900,000,000đ", bidRef: "Gói thầu XL-10/2026", time: "Quý IV/2026", status: "Chờ phê duyệt", statusColor: "bg-amber-50 text-amber-700 border-amber-200", doc: "TTr-SCL202-KTr.pdf" },
];

const mockEmergencyPlans = [
  { id: "KH-SCĐX-301", name: "Khắc phục sạt lở taluy dương Km122+500 do mưa bão số 2", route: "Nội Bài - Lào Cai", cost: "1,200,000,000đ", crew: "Lực lượng Cơ động VEC O&M", time: "Triển khai khẩn cấp", status: "Đang thi công", statusColor: "bg-blue-50 text-blue-700 border-blue-200", priority: "Khẩn cấp" },
  { id: "KH-SCĐX-302", name: "Sửa chữa hộ lan tôn lượn sóng bị đâm hỏng do tai nạn Km218", route: "Cầu Giẽ - Ninh Bình", cost: "45,000,000đ", crew: "Đội Tuần kiểm số 2", time: "Hoàn thành trong 48h", status: "Đã phê duyệt", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200", priority: "Cao" },
];

const mockProgressPlans = [
  { id: "KH-BTTX-001", name: "Bảo dưỡng lề đường và phát quang bụi rậm Tuyến Cầu Giẽ - Ninh Bình", type: "Thường xuyên", progress: 80, budget: "45Tr", spent: "36Tr", deviation: "0%", status: "Đang thi công" },
  { id: "KH-SCĐK-101", name: "Cào bóc và thảm lại bê tông nhựa mặt đường Km205 - Km208", type: "Định kỳ", progress: 40, budget: "2,450Tr", spent: "1,100Tr", deviation: "-5%", status: "Đang thi công" },
  { id: "KH-SCĐX-301", name: "Khắc phục sạt lở taluy dương Km122+500 do mưa bão số 2", type: "Đột xuất", progress: 95, budget: "1,200Tr", spent: "1,220Tr", deviation: "+1.6%", status: "Gần hoàn thành" },
  { id: "KH-SCL-201", name: "Gia cố kết cấu vòm hầm đường bộ qua đèo ngang Km400", type: "Sửa chữa lớn", progress: 15, budget: "14,500Tr", spent: "2,100Tr", deviation: "0%", status: "Chuẩn bị thi công" },
];

export default function MaintenancePlanning() {
  const location = useLocation();
  const path = location.pathname;

  // State to determine plan type based on path
  const [planType, setPlanType] = useState<"routine" | "periodic" | "major" | "emergency" | "tracking">("routine");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form states for creating new plan
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanRoute, setNewPlanRoute] = useState("Cầu Giẽ - Ninh Bình");
  const [newPlanCost, setNewPlanCost] = useState("");
  const [newPlanTime, setNewPlanTime] = useState("");
  const [newPlanDetail, setNewPlanDetail] = useState("");

  useEffect(() => {
    if (path.includes("thuong-xuyen")) {
      setPlanType("routine");
    } else if (path.includes("sua-chua-dinh-ky")) {
      setPlanType("periodic");
    } else if (path.includes("sua-chua-lon")) {
      setPlanType("major");
    } else if (path.includes("sua-chua-dot-xuat")) {
      setPlanType("emergency");
    } else if (path.includes("theo-doi")) {
      setPlanType("tracking");
    }
  }, [path]);

  const getTitle = () => {
    switch (planType) {
      case "routine": return "Kế hoạch Bảo trì Thường xuyên";
      case "periodic": return "Kế hoạch Sửa chữa Định kỳ";
      case "major": return "Kế hoạch Sửa chữa Lớn";
      case "emergency": return "Kế hoạch Sửa chữa Đột xuất (Khẩn cấp)";
      case "tracking": return "Theo dõi Thực hiện Kế hoạch Bảo trì";
    }
  };

  const getSubTitle = () => {
    switch (planType) {
      case "routine": return "Lập danh mục công việc duy tu thường xuyên, nhân lực và dự toán kinh phí trình phê duyệt (UC 147).";
      case "periodic": return "Quản lý và lập phương án thảm bê tông nhựa mặt đường, thay khe co giãn, sơn kẻ đường định kỳ (UC 148).";
      case "major": return "Lập kế hoạch sửa chữa kết cấu lớn của cầu, hầm, hệ thống ITS do VEC quản lý (UC 149).";
      case "emergency": return "Lập kế hoạch ứng phó thiên tai, sạt lở lún nứt, tai nạn phá hỏng KCHT giao thông (UC 150).";
      case "tracking": return "Theo dõi tiến độ, khối lượng hoàn thành, giá trị thanh quyết toán và chênh lệch ngân sách (UC 151).";
    }
  };

  // Add dummy plans list based on selected state
  const [routinePlans, setRoutinePlans] = useState(mockRoutinePlans);
  const [periodicPlans, setPeriodicPlans] = useState(mockPeriodicPlans);
  const [majorPlans, setMajorPlans] = useState(mockMajorPlans);
  const [emergencyPlans, setEmergencyPlans] = useState(mockEmergencyPlans);
  const [progressPlans, setProgressPlans] = useState(mockProgressPlans);

  const handleCreatePlan = () => {
    if (!newPlanName) return;
    const formattedCost = newPlanCost.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
    
    if (planType === "routine") {
      const newPlan = {
        id: `KH-BTTX-0${routinePlans.length + 1}`,
        name: newPlanName,
        route: newPlanRoute,
        cost: formattedCost || "0đ",
        supervisor: "VEC O&M",
        date: newPlanTime || "Tháng sau",
        status: "Đang lập",
        statusColor: "bg-slate-100 text-slate-700 border-slate-200",
        approval: "Chưa gửi duyệt"
      };
      setRoutinePlans([newPlan, ...routinePlans]);
    } else if (planType === "periodic") {
      const newPlan = {
        id: `KH-SCĐK-${100 + periodicPlans.length + 1}`,
        name: newPlanName,
        route: newPlanRoute,
        cost: formattedCost || "0đ",
        contractor: newPlanDetail || "Chưa xác định nhà thầu",
        time: newPlanTime || "Chưa xác định",
        status: "Đang lập",
        statusColor: "bg-slate-100 text-slate-700 border-slate-200",
        cycle: "Định kỳ"
      };
      setPeriodicPlans([newPlan, ...periodicPlans]);
    } else if (planType === "major") {
      const newPlan = {
        id: `KH-SCL-${200 + majorPlans.length + 1}`,
        name: newPlanName,
        route: newPlanRoute,
        cost: formattedCost || "0đ",
        bidRef: newPlanDetail || "Chưa lập gói thầu",
        time: newPlanTime || "Chưa xác định",
        status: "Đang lập",
        statusColor: "bg-slate-100 text-slate-700 border-slate-200",
        doc: "Ho-so-du-thao.pdf"
      };
      setMajorPlans([newPlan, ...majorPlans]);
    } else if (planType === "emergency") {
      const newPlan = {
        id: `KH-SCĐX-${300 + emergencyPlans.length + 1}`,
        name: newPlanName,
        route: newPlanRoute,
        cost: formattedCost || "0đ",
        crew: newPlanDetail || "Đội ứng kích khẩn cấp",
        time: newPlanTime || "Ngay lập tức",
        status: "Đang lập",
        statusColor: "bg-slate-100 text-slate-700 border-slate-200",
        priority: "Khẩn cấp"
      };
      setEmergencyPlans([newPlan, ...emergencyPlans]);
    }
    
    // Close and reset form
    setIsCreateOpen(false);
    setNewPlanName("");
    setNewPlanCost("");
    setNewPlanTime("");
    setNewPlanDetail("");
  };

  const getFilteredData = () => {
    const filterFunc = (item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    switch (planType) {
      case "routine": return routinePlans.filter(filterFunc);
      case "periodic": return periodicPlans.filter(filterFunc);
      case "major": return majorPlans.filter(filterFunc);
      case "emergency": return emergencyPlans.filter(filterFunc);
      case "tracking": return progressPlans.filter(filterFunc);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100/50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-sm">
              <Wrench className="size-5" />
            </span>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider bg-blue-100/50 px-2 py-0.5 rounded-full">Phân hệ Bảo trì</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{getTitle()}</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">{getSubTitle()}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <Button variant="outline" className="gap-2 text-slate-700 border-slate-200 bg-white shadow-sm">
            <Download className="size-4" />
            Xuất Excel
          </Button>
          {planType !== "tracking" && (
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm" onClick={() => setIsCreateOpen(true)}>
              <Plus className="size-4" />
              Lập kế hoạch
            </Button>
          )}
        </div>
      </div>

      {/* Grid Stats */}
      {planType !== "tracking" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Đã lập kế hoạch</CardTitle>
              <BarChart3 className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {planType === "routine" ? routinePlans.length : 
                 planType === "periodic" ? periodicPlans.length :
                 planType === "major" ? majorPlans.length : emergencyPlans.length}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Hồ sơ đã được lưu trữ</p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Chờ phê duyệt</CardTitle>
              <Clock className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {planType === "routine" ? routinePlans.filter(p => p.status === "Chờ duyệt").length : 
                 planType === "periodic" ? periodicPlans.filter(p => p.status === "Chờ phê duyệt").length :
                 planType === "major" ? majorPlans.filter(p => p.status === "Chờ phê duyệt").length : 0}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Cần phê duyệt ý kiến</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Đã duyệt thực hiện</CardTitle>
              <UserCheck className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {planType === "routine" ? routinePlans.filter(p => p.status === "Đã duyệt").length : 
                 planType === "periodic" ? periodicPlans.filter(p => p.status === "Đã phê duyệt").length :
                 planType === "major" ? majorPlans.filter(p => p.status === "Đã phê duyệt").length :
                 emergencyPlans.filter(p => p.status === "Đã phê duyệt").length}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Đã ký ban hành quyết định</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tổng kinh phí dự kiến</CardTitle>
              <ShieldCheck className="size-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-600">
                {planType === "routine" ? "148,000,000đ" : 
                 planType === "periodic" ? "3,720,000,000đ" :
                 planType === "major" ? "23,400,000,000đ" : "1,245,000,000đ"}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Dự toán ngân sách bảo trì</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Tiến độ tổng thể</p>
                <h3 className="text-2xl font-bold text-slate-800">57.5%</h3>
              </div>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Layers className="size-5" /></div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-indigo-500 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Tổng kinh phí</p>
                <h3 className="text-2xl font-bold text-slate-800">18,195 Tr</h3>
              </div>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><ShieldCheck className="size-5" /></div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Đã giải ngân</p>
                <h3 className="text-2xl font-bold text-slate-850">4,456 Tr</h3>
              </div>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="size-5" /></div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-rose-500 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Độ chênh lệch</p>
                <h3 className="text-2xl font-bold text-rose-600">+1.6%</h3>
              </div>
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl"><AlertTriangle className="size-5" /></div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main content table */}
      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl gap-4 flex-wrap">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Tìm kiếm nhanh kế hoạch..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 w-full shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          </div>
          <div className="flex gap-2">
            <select title="Tuyến cao tốc" className="px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 bg-white">
              <option>Tất cả tuyến cao tốc</option>
              <option>Cầu Giẽ - Ninh Bình</option>
              <option>Nội Bài - Lào Cai</option>
              <option>Đà Nẵng - Quảng Ngãi</option>
            </select>
            {planType !== "tracking" && (
              <select title="Trạng thái" className="px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 bg-white">
                <option>Tất cả trạng thái</option>
                <option>Đang lập</option>
                <option>Chờ duyệt</option>
                <option>Đã duyệt/phê duyệt</option>
              </select>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          {planType === "routine" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mã kế hoạch</th>
                  <th className="px-6 py-4 font-semibold">Nội dung công việc thường xuyên</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold text-right">Kinh phí dự kiến</th>
                  <th className="px-6 py-4 font-semibold">Đơn vị giám sát</th>
                  <th className="px-6 py-4 font-semibold">Cán bộ VEC phê duyệt</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {getFilteredData().map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-700 max-w-sm truncate">{item.name}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.route}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-800">{item.cost}</td>
                    <td className="px-6 py-4 text-slate-600">{item.supervisor}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-700">
                      <span className="flex items-center gap-1">
                        {item.status === "Đã duyệt" ? <CheckCircle2 className="size-3 text-emerald-500 shrink-0" /> : <Clock className="size-3 text-amber-500 shrink-0" />}
                        {item.approval}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={`${item.statusColor} font-medium px-2 py-0.5 border`}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" title="Xem chi tiết"><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-50" title="Xóa"><Trash2 className="size-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {planType === "periodic" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mã kế hoạch</th>
                  <th className="px-6 py-4 font-semibold">Nội dung sửa chữa định kỳ</th>
                  <th className="px-6 py-4 font-semibold">Chu kỳ bảo trì</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold text-right">Dự toán kinh phí</th>
                  <th className="px-6 py-4 font-semibold">Nhà thầu / Đơn vị thực hiện</th>
                  <th className="px-6 py-4 font-semibold">Thời gian thi công</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {getFilteredData().map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-700 max-w-sm truncate">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">{item.cycle}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.route}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-800">{item.cost}</td>
                    <td className="px-6 py-4 text-slate-600">{item.contractor}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={`${item.statusColor} font-medium px-2 py-0.5 border`}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" title="Chi tiết"><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-50" title="Xóa"><Trash2 className="size-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {planType === "major" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mã dự án SCL</th>
                  <th className="px-6 py-4 font-semibold">Tên kế hoạch sửa chữa lớn</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold text-right">Dự toán tổng mức đầu tư</th>
                  <th className="px-6 py-4 font-semibold">Gói thầu / Đấu thầu</th>
                  <th className="px-6 py-4 font-semibold">Thời gian dự kiến</th>
                  <th className="px-6 py-4 font-semibold">Tài liệu đính kèm</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {getFilteredData().map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-700 max-w-sm truncate">{item.name}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.route}</td>
                    <td className="px-6 py-4 text-right font-bold text-rose-650">{item.cost}</td>
                    <td className="px-6 py-4 text-slate-650 font-medium">{item.bidRef}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.time}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium underline text-xs cursor-pointer">{item.doc}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={`${item.statusColor} font-medium px-2 py-0.5 border`}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50"><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-50"><Trash2 className="size-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {planType === "emergency" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mã lệnh khẩn</th>
                  <th className="px-6 py-4 font-semibold">Sự cố đột xuất / Phương án xử lý</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc</th>
                  <th className="px-6 py-4 font-semibold text-right">Chi phí ước tính</th>
                  <th className="px-6 py-4 font-semibold">Lực lượng ứng trực / Thi công</th>
                  <th className="px-6 py-4 font-semibold">Thời gian yêu cầu</th>
                  <th className="px-6 py-4 font-semibold">Mức độ khẩn</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {getFilteredData().map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-red-600 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700 max-w-sm truncate">{item.name}</td>
                    <td className="px-6 py-4 text-slate-655 whitespace-nowrap">{item.route}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-800">{item.cost}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{item.crew}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-red-100 text-red-700 border-red-200 text-xs font-semibold px-2.5 py-0.5">
                        {item.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={`${item.statusColor} font-medium px-2 py-0.5 border`}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50"><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-50"><Trash2 className="size-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {planType === "tracking" && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mã kế hoạch</th>
                  <th className="px-6 py-4 font-semibold">Tên công việc / Hạng mục bảo trì</th>
                  <th className="px-6 py-4 font-semibold">Phân loại</th>
                  <th className="px-6 py-4 font-semibold">Tiến độ thực hiện</th>
                  <th className="px-6 py-4 font-semibold text-right">Dự toán dự kiến</th>
                  <th className="px-6 py-4 font-semibold text-right">Thực tế chi trả</th>
                  <th className="px-6 py-4 font-semibold text-center">Chênh lệch</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái hiện trường</th>
                  <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {getFilteredData().map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-700 max-w-sm truncate">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-650 text-xs font-semibold">{item.type}</span>
                    </td>
                    <td className="px-6 py-4 min-w-[150px]">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700 shrink-0">{item.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-700">{item.budget}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">{item.spent}</td>
                    <td className="px-6 py-4 text-center font-bold">
                      <span className={item.deviation.startsWith("+") ? "text-rose-600" : item.deviation.startsWith("-") ? "text-emerald-600" : "text-slate-500"}>
                        {item.deviation}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <Button variant="outline" size="sm" className="h-8 text-xs font-medium text-indigo-600 border-indigo-250 hover:bg-indigo-50">
                        <FileSpreadsheet className="size-3.5 mr-1" />
                        Báo cáo
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-4">
          <div>
            Hiển thị 1 - {getFilteredData().length} trong số {getFilteredData().length} kế hoạch bảo trì
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled className="h-8 px-2.5">Trước</Button>
            <Button variant="outline" size="sm" className="h-8 px-3 bg-blue-50 text-blue-600 border-blue-200">1</Button>
            <Button variant="outline" size="sm" className="h-8 px-3" disabled>Sau</Button>
          </div>
        </div>
      </Card>

      {/* Dialog for Lập kế hoạch mới */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-xl border border-slate-200 p-0 overflow-hidden shadow-lg">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Plus className="size-5 text-blue-600" />
              Lập {getTitle().toLowerCase()} mới
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Tên kế hoạch / Nội dung sửa chữa</label>
              <input 
                type="text" 
                placeholder="VD: Cào bóc tái sinh nguội mặt đường Km10 - Km12..." 
                className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Tuyến cao tốc</label>
                <select 
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  value={newPlanRoute}
                  onChange={(e) => setNewPlanRoute(e.target.value)}
                >
                  <option>Cầu Giẽ - Ninh Bình</option>
                  <option>Nội Bài - Lào Cai</option>
                  <option>Đà Nẵng - Quảng Ngãi</option>
                  <option>TP.HCM - Long Thành - Dầu Giây</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Kinh phí dự kiến (VNĐ)</label>
                <input 
                  type="text" 
                  placeholder="Nhập số tiền..." 
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={newPlanCost}
                  onChange={(e) => setNewPlanCost(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Thời gian triển khai</label>
                <input 
                  type="text" 
                  placeholder="VD: Tháng 07/2026 hoặc 01/06 - 15/06" 
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={newPlanTime}
                  onChange={(e) => setNewPlanTime(e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">
                  {planType === "routine" ? "Đơn vị giám sát phụ trách" :
                   planType === "periodic" ? "Đơn vị thi công (Dự kiến)" :
                   planType === "major" ? "Tên gói thầu đề xuất" : "Lực lượng ứng cứu khẩn cấp"}
                </label>
                <input 
                  type="text" 
                  placeholder="Nhập thông tin..." 
                  className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={newPlanDetail}
                  onChange={(e) => setNewPlanDetail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Mô tả chi tiết hạng mục</label>
              <textarea 
                rows={3}
                placeholder="Nhập ghi chú kỹ thuật, lý trình cụ thể, khối lượng ước tính..." 
                className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t bg-slate-50 gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)} className="h-9 px-4">Đóng</Button>
            <Button size="sm" onClick={handleCreatePlan} className="h-9 px-4 bg-blue-600 hover:bg-blue-700">Lưu kế hoạch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
