import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Calendar, Plus, MapPin, AlertTriangle, Search, 
  CheckCircle2, FileText, Camera, ShieldAlert, 
  UserCheck, ClipboardCheck, ArrowRight, Clock,
  Filter, HelpCircle, User, RefreshCw
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";

// Mock data for inspections
const mockInspections = [
  { id: "KT-2026-001", date: "29/05/2026", route: "Cầu Giẽ - Ninh Bình (Km210 - Km220)", type: "Kiểm tra định kỳ", team: "Đội Tuần đường số 1", status: "Đang thực hiện", issues: 2, desc: "Tuần tra tình trạng mặt đường, dải phân cách" },
  { id: "KT-2026-002", date: "28/05/2026", route: "Nội Bài - Lào Cai (Km120 - Km140)", type: "Kiểm tra đột xuất", team: "Ban QL Khai thác", status: "Hoàn thành", issues: 5, desc: "Kiểm tra sạt trượt taluy sau mưa dông lớn" },
  { id: "KT-2026-003", date: "30/05/2026", route: "TP.HCM - Long Thành (Km10 - Km15)", type: "Kiểm tra định kỳ", team: "Đội Tuần kiểm số 3", status: "Chưa bắt đầu", issues: 0, desc: "Tuần kiểm khe co giãn cầu cạn" },
  { id: "KT-2026-004", date: "25/05/2026", route: "Đà Nẵng - Quảng Ngãi", type: "Kiểm tra kỹ thuật hầm", team: "Xí nghiệp Vận hành hầm", status: "Hoàn thành", issues: 1, desc: "Kiểm tra kỹ thuật hệ thống ITS trong hầm" },
];

const mockAlerts = [
  { id: "CB-001", type: "Mặt đường", title: "Hằn lún vệt bánh xe sâu > 5cm", location: "Km212+800, Trái tuyến", severity: "Nghiêm trọng", time: "10 phút trước", status: "Chưa xử lý" },
  { id: "CB-002", type: "An toàn bên đường", title: "Lan can hộ lan bị biến dạng do va chạm", location: "Km218+300, Phải tuyến", severity: "Cao", time: "2 giờ trước", status: "Chưa xử lý" },
  { id: "CB-003", type: "Hệ thống điện", title: "Mất tín hiệu tủ điện chiếu sáng IC3", location: "Nút giao IC3, Km182", severity: "Trung bình", time: "4 giờ trước", status: "Đã xử lý" },
];

export default function InspectionDashboard() {
  const location = useLocation();
  const path = location.pathname;

  const [mode, setMode] = useState<"plan" | "update" | "search" | "detail" | "create-work" | "alert">("plan");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInspectionId, setSelectedInspectionId] = useState("KT-2026-001");
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // New Inspection Plan Form
  const [insRoute, setInsRoute] = useState("Cầu Giẽ - Ninh Bình");
  const [insTeam, setInsTeam] = useState("Đội Tuần đường số 1");
  const [insType, setInsType] = useState("Kiểm tra định kỳ");
  const [insDate, setInsDate] = useState("30/05/2026");

  // Dynamic state list
  const [inspections, setInspections] = useState(mockInspections);
  const [alerts, setAlerts] = useState(mockAlerts);

  useEffect(() => {
    if (path.includes("lap-ke-hoach")) {
      setMode("plan");
    } else if (path.includes("cap-nhat")) {
      setMode("update");
    } else if (path.includes("tim-kiem")) {
      setMode("search");
    } else if (path.includes("chi-tiet")) {
      setMode("detail");
    } else if (path.includes("tao-cong-viec")) {
      setMode("create-work");
    } else if (path.includes("canh-bao")) {
      setMode("alert");
    }
  }, [path]);

  const getPageTitle = () => {
    switch (mode) {
      case "plan": return "Lập kế hoạch kiểm tra & phân công";
      case "update": return "Cập nhật thông tin kiểm tra hiện trường";
      case "search": return "Tra cứu kết quả kiểm tra";
      case "detail": return "Chi tiết kết quả tuần kiểm";
      case "create-work": return "Tạo công việc xử lý sau kiểm tra";
      case "alert": return "Cảnh báo tự động kết quả kiểm tra bất thường";
    }
  };

  const getPageSub = () => {
    switch (mode) {
      case "plan": return "Thiết lập thời gian, phạm vi kiểm tra và phân công các đội tuần đường (UC 152).";
      case "update": return "Nhập biên bản kiểm tra, đính kèm hình ảnh khuyết tật và tình trạng tài sản (UC 153).";
      case "search": return "Tìm kiếm nâng cao kết quả kiểm tra theo tuyến đường, thời gian và loại tài sản (UC 154).";
      case "detail": return "Thông số trạng thái chi tiết, hình ảnh đối chiếu và đề xuất kỹ thuật (UC 155).";
      case "create-work": return "Chuyển các khuyết tật/lỗi phát hiện thành lệnh sửa chữa cho các bộ phận liên quan (UC 156).";
      case "alert": return "Các lỗi nghiêm trọng phát hiện tự động từ thiết bị tuần tra hoặc cảnh báo AI (UC 157).";
    }
  };

  const handleCreatePlan = () => {
    const newPlan = {
      id: `KT-2026-0${inspections.length + 1}`,
      date: insDate,
      route: insRoute,
      type: insType,
      team: insTeam,
      status: "Chưa bắt đầu",
      issues: 0,
      desc: "Kế hoạch tuần kiểm vừa được thiết lập mới."
    };
    setInspections([newPlan, ...inspections]);
    setIsAssignOpen(false);
  };

  const getSelectedInspection = () => {
    return inspections.find(i => i.id === selectedInspectionId) || inspections[0];
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100/50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
              <ClipboardCheck className="size-5" />
            </span>
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider bg-indigo-100/50 px-2 py-0.5 rounded-full">Kiểm tra tài sản</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{getPageTitle()}</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">{getPageSub()}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          {mode === "plan" && (
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm" onClick={() => setIsAssignOpen(true)}>
              <Plus className="size-4" />
              Lập kế hoạch kiểm tra
            </Button>
          )}
          {mode === "update" && (
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
              <CheckCircle2 className="size-4" />
              Lưu & Xác nhận kết quả
            </Button>
          )}
          {mode === "alert" && (
            <Button variant="outline" className="gap-2 text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100 shadow-sm">
              <ShieldAlert className="size-4" />
              Xóa tất cả cảnh báo
            </Button>
          )}
        </div>
      </div>

      {/* 1. View: Plan (Lập kế hoạch & Phân công) */}
      {mode === "plan" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wide">Danh sách đợt kiểm tra đã phân công</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Mã đợt</th>
                      <th className="px-6 py-4 font-semibold">Tên đợt / Lý trình</th>
                      <th className="px-6 py-4 font-semibold">Loại hình</th>
                      <th className="px-6 py-4 font-semibold">Đội phụ trách</th>
                      <th className="px-6 py-4 font-semibold">Ngày thực hiện</th>
                      <th className="px-6 py-4 font-semibold">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inspections.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-indigo-650 font-mono text-xs">{item.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{item.route}</td>
                        <td className="px-6 py-4 text-slate-600">{item.type}</td>
                        <td className="px-6 py-4 text-slate-700 font-medium">{item.team}</td>
                        <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className={
                            item.status === 'Hoàn thành' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                            item.status === 'Đang thực hiện' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                            'bg-slate-50 text-slate-600 border-slate-200'
                          }>
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wide">Phân bổ nhân sự trực quan</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Đội Tuần đường số 1</h4>
                    <p className="text-[10px] text-slate-500">Khu vực: Phía Bắc (Km0 - Km100)</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px]">Sẵn sàng</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Đội Tuần đường số 2</h4>
                    <p className="text-[10px] text-slate-500">Khu vực: Phía Nam (Km100 - Km240)</p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[10px]">Bận việc</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Đội Kỹ thuật hầm</h4>
                    <p className="text-[10px] text-slate-500">Khu vực: Hầm Đèo Cả, Hầm Cổ Mã</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px]">Sẵn sàng</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2. View: Update (Cập nhật kết quả) */}
      {mode === "update" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-slate-550 uppercase tracking-wide">Chọn đợt kiểm tra hiện trường</h3>
            <div className="space-y-3">
              {inspections.filter(i => i.status !== "Chưa bắt đầu").map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedInspectionId(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${item.id === selectedInspectionId ? 'bg-indigo-50/50 border-indigo-400 shadow-sm ring-1 ring-indigo-100' : 'bg-white border-slate-200 hover:border-indigo-200'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono font-bold text-slate-500">{item.id}</span>
                    <Badge variant="outline" className={item.status === "Hoàn thành" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}>{item.status}</Badge>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm leading-snug">{item.route}</h4>
                  <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1.5"><User className="size-3" />{item.team}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row justify-between items-center gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-base font-bold text-slate-800">Nhập biên bản khuyết tật hiện trường</CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">Đợt: <span className="font-bold text-indigo-600">{selectedInspectionId}</span> - {getSelectedInspection().route}</p>
                </div>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-1.5">
                  <Camera className="size-4" />
                  Chụp ảnh lỗi
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-650">Lý trình cụ thể</label>
                    <input type="text" placeholder="VD: Km 212+800" className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-650">Loại khuyết tật / Hư hỏng</label>
                    <select className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 bg-white">
                      <option>Hằn lún vệt bánh xe</option>
                      <option>Ổ gà mặt đường</option>
                      <option>Mờ vạch kẻ đường</option>
                      <option>Móp méo biển báo / Hộ lan</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-650">Mô tả chi tiết hư hỏng & Đánh giá mức độ</label>
                  <textarea rows={3} placeholder="Mô tả cụ thể vết nứt, diện tích ổ gà hoặc trạng thái hư hại của thiết bị..." className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-650">Ảnh hiện trường đính kèm</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <Camera className="size-8 text-slate-350 mb-2" />
                    <p className="text-xs text-slate-500 font-medium">Click để tải ảnh hiện trường lên hoặc kéo thả tệp tin vào đây</p>
                    <p className="text-[10px] text-slate-400 mt-1">Định dạng JPG, PNG kích thước tối đa 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 3. View: Search (Tìm kiếm kết quả) */}
      {mode === "search" && (
        <Card className="shadow-sm border-slate-200">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl gap-4 flex-wrap">
            <div className="relative w-80">
              <input 
                type="text" 
                placeholder="Tìm kiếm theo mã đợt, đội kiểm tra..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full shadow-sm"
              />
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            </div>
            <div className="flex gap-2">
              <select title="Loại hình" className="px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 bg-white">
                <option>Tất cả loại hình</option>
                <option>Kiểm tra định kỳ</option>
                <option>Kiểm tra đột xuất</option>
                <option>Kiểm tra sau bão</option>
              </select>
              <select title="Trạng thái" className="px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 bg-white">
                <option>Tất cả trạng thái</option>
                <option>Hoàn thành</option>
                <option>Đang thực hiện</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mã đợt</th>
                  <th className="px-6 py-4 font-semibold">Tuyến cao tốc / Phạm vi</th>
                  <th className="px-6 py-4 font-semibold">Loại hình kiểm tra</th>
                  <th className="px-6 py-4 font-semibold">Đội kiểm tra phụ trách</th>
                  <th className="px-6 py-4 font-semibold">Ngày ghi nhận</th>
                  <th className="px-6 py-4 font-semibold text-center">Số khuyết tật phát hiện</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái đợt</th>
                  <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inspections.filter(i => i.id.toLowerCase().includes(searchTerm.toLowerCase()) || i.team.toLowerCase().includes(searchTerm.toLowerCase())).map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-indigo-600 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.route}</td>
                    <td className="px-6 py-4 text-slate-600">{item.type}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{item.team}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 text-center font-bold">
                      <span className={item.issues > 0 ? "text-rose-650 px-2 py-0.5 bg-rose-50 border border-rose-100 rounded text-xs" : "text-emerald-600 text-xs px-2 py-0.5 bg-emerald-50 rounded"}>
                        {item.issues} lỗi
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={item.status === "Hoàn thành" ? "bg-emerald-50 text-emerald-700" : item.status === "Đang thực hiện" ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-600"}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold text-indigo-650 hover:bg-indigo-50">
                        Chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 4. View: Detail (Chi tiết kết quả) */}
      {mode === "detail" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-800">Biên bản kết quả kiểm định kỹ thuật đợt KT-2026-002</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Tuyến khảo sát</p>
                    <p className="font-semibold text-slate-800">Nội Bài - Lào Cai (Km120 - Km140)</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Đơn vị kiểm tra</p>
                    <p className="font-semibold text-slate-800">Ban QL Khai thác KCHT</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Lý do kiểm tra</p>
                    <p className="font-semibold text-slate-800">Kiểm tra đột xuất vết sạt lở lề đường</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Ngày lập biên bản</p>
                    <p className="font-semibold text-slate-800">28/05/2026</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-700 text-sm">Danh sách khuyết tật phát hiện</h4>
                  
                  <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 flex gap-4">
                    <div className="p-2.5 rounded-lg bg-rose-100 text-rose-700 self-start"><AlertTriangle className="size-5" /></div>
                    <div>
                      <div className="flex justify-between items-center gap-2 flex-wrap mb-1">
                        <h5 className="font-bold text-rose-950 text-sm">Sạt lở taluy dương nghiêm trọng Km122+500</h5>
                        <Badge className="bg-rose-100 text-rose-700 border-none hover:bg-rose-100 text-[10px]">Cấp độ: Nguy hiểm</Badge>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Đất cát từ taluy dương trượt xuống lòng đường lấn át làn khẩn cấp dài khoảng 30m, đe dọa trực tiếp đến an toàn chạy tàu khi mưa to kéo dài. Cần đội ứng phó khẩn cấp của VEC dọn dẹp và đóng cọc cừ bảo vệ tạm thời.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-250 bg-amber-50/20 flex gap-4">
                    <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 self-start"><AlertTriangle className="size-5" /></div>
                    <div>
                      <div className="flex justify-between items-center gap-2 flex-wrap mb-1">
                        <h5 className="font-bold text-amber-950 text-sm">Lan can hộ lan bị võng Km130+100</h5>
                        <Badge className="bg-amber-100 text-amber-700 border-none hover:bg-amber-100 text-[10px]">Cấp độ: Trung bình</Badge>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Lan can tôn sóng bị móp khoảng 5m do va chạm giao thông trước đó, vẫn đảm bảo kết cấu nhưng cần tháo dỡ thay thế đoạn móp sớm.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-200 h-fit">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wide">Bản đồ khuyết tật số hóa</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center text-slate-500 h-64 bg-slate-100/50 rounded-b-xl border-t border-slate-100">
              <MapPin className="size-10 text-indigo-600 mb-2 animate-bounce" />
              <p className="text-xs font-bold text-slate-700">Đang hiển thị vị trí trên GIS</p>
              <p className="text-[10px] text-slate-400 mt-1">Lý trình Km122+500, Nội Bài - Lào Cai</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 5. View: Create Work (Tạo công việc xử lý sau kiểm tra) */}
      {mode === "create-work" && (
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">Tạo công việc khắc phục hư hỏng sau kiểm tra</CardTitle>
          </CardHeader>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-650 uppercase tracking-wide">1. Chọn nguồn hư hỏng phát hiện</h4>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg border border-rose-300 bg-rose-50/20 cursor-pointer flex gap-3">
                    <input type="radio" defaultChecked name="defect-src" className="mt-1" />
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Sạt lở taluy dương nghiêm trọng Km122+500</h5>
                      <p className="text-[10px] text-rose-600 font-semibold mt-1">Đợt kiểm tra: KT-2026-002</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg border border-slate-200 cursor-pointer flex gap-3">
                    <input type="radio" name="defect-src" className="mt-1" />
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Lan can hộ lan bị võng Km130+100</h5>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">Đợt kiểm tra: KT-2026-002</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-l pl-6 border-slate-200">
                <h4 className="text-xs font-bold text-slate-650 uppercase tracking-wide">2. Thiết lập lệnh xử lý sửa chữa</h4>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Đơn vị / Đội thực hiện nhận việc</label>
                    <select className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md bg-white">
                      <option>Đội Cơ động VEC O&M</option>
                      <option>Nhà thầu cầu đường bộ Đông Á</option>
                      <option>Đội Tuần kiểm 2</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Mức độ ưu tiên xử lý</label>
                    <select className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md bg-white">
                      <option>Khẩn cấp (Yêu cầu xử lý trong 24 giờ)</option>
                      <option>Cao (Yêu cầu xử lý trong 3 ngày)</option>
                      <option>Trung bình (Yêu cầu xử lý trong 1 tuần)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Hạn chót hoàn thành</label>
                    <input type="text" placeholder="VD: 31/05/2026" className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-md focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" size="sm" className="h-9 px-4">Hủy bỏ</Button>
              <Button size="sm" className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700">Tạo & Giao việc khẩn</Button>
            </div>
          </div>
        </Card>
      )}

      {/* 6. View: Alert (Cảnh báo tự động kết quả kiểm tra bất thường) */}
      {mode === "alert" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert, idx) => (
              <Card key={idx} className={`shadow-sm border-t-4 ${alert.severity === "Nghiêm trọng" ? "border-t-rose-500" : alert.severity === "Cao" ? "border-t-amber-500" : "border-t-blue-500"}`}>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">{alert.type}</span>
                    <Badge variant="outline" className={
                      alert.severity === 'Nghiêm trọng' ? 'bg-rose-50 text-rose-700 border-rose-200' : 
                      alert.severity === 'Cao' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }>{alert.severity}</Badge>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2 leading-snug">{alert.title}</h4>
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5"><MapPin className="size-3.5" />{alert.location}</p>
                    <p className="flex items-center gap-1.5"><Clock className="size-3.5" />Phát hiện: {alert.time}</p>
                  </div>
                  <div className="flex items-center justify-between border-t mt-4 pt-3 gap-2">
                    <span className="text-[10px] font-bold font-mono text-slate-400">{alert.id}</span>
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-500">Bỏ qua</Button>
                      <Button size="sm" className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">Xử lý ngay</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Dialog for Lập kế hoạch mới */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl border p-0 overflow-hidden shadow-lg">
          <DialogHeader className="px-6 py-4 border-b bg-muted/20">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="size-5 text-indigo-600" />
              Lập lịch & Phân công đợt kiểm tra mới
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Tuyến cao tốc & Lý trình</label>
              <input 
                type="text" 
                placeholder="VD: Cầu Giẽ - Ninh Bình (Km220 - Km240)" 
                className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                value={insRoute}
                onChange={(e) => setInsRoute(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Đội tuần kiểm / Cán bộ phụ trách</label>
              <select 
                className="w-full text-sm px-3.5 py-2 border rounded-md bg-white"
                value={insTeam}
                onChange={(e) => setInsTeam(e.target.value)}
              >
                <option>Đội Tuần đường số 1</option>
                <option>Đội Tuần kiểm số 2</option>
                <option>Đội Kỹ thuật hầm</option>
                <option>Ban QL Khai thác</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Loại hình kiểm định</label>
                <select 
                  className="w-full text-sm px-3.5 py-2 border rounded-md bg-white"
                  value={insType}
                  onChange={(e) => setInsType(e.target.value)}
                >
                  <option>Kiểm tra định kỳ</option>
                  <option>Kiểm tra đột xuất</option>
                  <option>Kiểm tra sau bão</option>
                  <option>Kiểm tra nghiệm thu</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Ngày triển khai</label>
                <input 
                  type="text" 
                  placeholder="VD: 30/05/2026" 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={insDate}
                  onChange={(e) => setInsDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Mô tả mục tiêu đợt kiểm tra</label>
              <textarea rows={2} placeholder="Nêu rõ mục tiêu như rà soát biển hiệu mờ, mặt đường lún nứt..." className="w-full text-sm px-3.5 py-2 border rounded-md resize-none focus:outline-none" />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t bg-slate-50 gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAssignOpen(false)} className="h-9 px-4">Đóng</Button>
            <Button size="sm" onClick={handleCreatePlan} className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white">Lưu & Phân công</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
