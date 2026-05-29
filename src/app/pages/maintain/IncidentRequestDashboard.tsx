import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Search, Plus, Filter, MessageSquare, AlertCircle, 
  CheckCircle2, Clock, MapPin, User, Mail, ShieldAlert,
  Send, Layers, ChevronRight, Check, CheckSquare, BarChart3, Download
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";

interface IncidentRequest {
  id: string;
  title: string;
  location: string;
  source: string;
  time: string;
  status: 'Mới' | 'Đang xử lý' | 'Đã nghiệm thu' | 'Đã đóng';
  priority: 'Khẩn cấp' | 'Cao' | 'Trung bình' | 'Thấp';
  assigned: string | null;
  desc: string;
  reporter: string;
  email?: string;
  phone?: string;
}

const initialRequests: IncidentRequest[] = [
  { id: "YC-2026-101", title: "Cây gãy đổ chắn ngang làn dừng khẩn cấp", location: "Km 180+200, Tuyến Nội Bài - Lào Cai", source: "Tuần đường báo cáo", time: "10 phút trước", status: "Mới", priority: "Khẩn cấp", assigned: null, desc: "Do giông lốc lớn, một nhánh cây bạch đàn gãy đổ đè lên làn khẩn cấp dài khoảng 15m. Cần dọn dẹp khẩn.", reporter: "Nguyễn Văn Hùng (Cán bộ tuần kiểm)", phone: "0912345678" },
  { id: "YC-2026-100", title: "Mặt đường bê tông bị nứt nẻ ổ gà nhỏ nguy hiểm", location: "Km 215, Tuyến Cầu Giẽ - NB", source: "Hệ thống AI Cảnh báo", time: "2 giờ trước", status: "Đang xử lý", priority: "Trung bình", assigned: "Đội QLĐB 2", desc: "Hệ thống camera AI quét phát hiện cụm ổ gà mới sâu khoảng 5cm tại làn số 1. Nguy cơ gây mất an toàn giao thông.", reporter: "AI Camera Giám sát", phone: "N/A" },
  { id: "YC-2026-099", title: "Hỏng đèn chiếu sáng tại nút giao IC3", location: "Nút giao IC3, Km182", source: "Người dân phản ánh", time: "Hôm qua", status: "Đã nghiệm thu", priority: "Thấp", assigned: "Đội Điện - VEC", desc: "Đèn cao áp không sáng tại nhánh rẽ nút giao IC3 từ chiều tối qua, người dân gửi phản ánh lên cổng dịch vụ công.", reporter: "Trần Thế Anh (Người dân)", email: "theanh@gmail.com", phone: "0987654321" },
  { id: "YC-2026-098", title: "Sạt lở taluy dương nghiêm trọng", location: "Km 110+400, Nội Bài - Lào Cai", source: "Tuần đường báo cáo", time: "2 ngày trước", status: "Đang xử lý", priority: "Cao", assigned: "Nhà thầu sửa chữa 1", desc: "Đất đá taluy dương trượt tràn xuống mương dọc thoát nước và mép đường nhựa. Đã căng dây cảnh báo.", reporter: "Lê Minh Tuấn (Cán bộ tuần kiểm)", phone: "0911223344" },
];

export default function IncidentRequestDashboard() {
  const location = useLocation();
  const path = location.pathname;

  const [mode, setMode] = useState<"declare" | "triage" | "dispatch" | "update" | "close" | "notify" | "track" | "query">("track");
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState<IncidentRequest[]>(initialRequests);
  const [selectedReqId, setSelectedReqId] = useState("YC-2026-101");
  const [isDeclareOpen, setIsDeclareOpen] = useState(false);

  // New Request Form
  const [reqTitle, setReqTitle] = useState("");
  const [reqLoc, setReqLoc] = useState("");
  const [reqDesc, setReqDesc] = useState("");
  const [reqReporter, setReqReporter] = useState("");
  const [reqPriority, setReqPriority] = useState<'Khẩn cấp' | 'Cao' | 'Trung bình' | 'Thấp'>("Trung bình");

  useEffect(() => {
    if (path.includes("khai-bao")) {
      setMode("declare");
    } else if (path.includes("phan-loai")) {
      setMode("triage");
    } else if (path.includes("giao-viec")) {
      setMode("dispatch");
    } else if (path.includes("cap-nhat")) {
      setMode("update");
    } else if (path.includes("dong")) {
      setMode("close");
    } else if (path.includes("thong-bao")) {
      setMode("notify");
    } else if (path.includes("theo-doi")) {
      setMode("track");
    } else if (path.includes("tra-cuu")) {
      setMode("query");
    }
  }, [path]);

  const getPageTitle = () => {
    switch (mode) {
      case "declare": return "Khai báo yêu cầu & sự cố hiện trường";
      case "triage": return "Phân loại và thẩm định yêu cầu";
      case "dispatch": return "Giao xử lý công việc cho cán bộ thực hiện";
      case "update": return "Cập nhật tiến độ giải quyết sự cố";
      case "close": return "Nghiệm thu & Đóng yêu cầu hoàn thành";
      case "notify": return "Cấu hình gửi thông báo tự động";
      case "track": return "Bảng theo dõi trạng thái yêu cầu xử lý";
      case "query": return "Tra cứu số liệu & Phân tích hiệu suất";
    }
  };

  const getPageSub = () => {
    switch (mode) {
      case "declare": return "Tiếp nhận khai báo từ app tuần đường, người dân phản ánh hoặc cảnh báo AI (UC 174).";
      case "triage": return "Xác minh, chấm cấp độ khẩn và gán bộ phận chuyên môn điều phối (UC 175).";
      case "dispatch": return "Giao việc sửa chữa, quy định hạn chót và tài liệu hướng dẫn kỹ thuật (UC 176).";
      case "update": return "Cập nhật kết quả hiện trường, đính kèm hình ảnh khắc phục của đội thi công (UC 177).";
      case "close": return "Ban quản lý VEC kiểm tra chất lượng, xác nhận đóng hồ sơ và phản hồi khách hàng (UC 178).";
      case "notify": return "Cấu hình tự động gửi email/SMS cảnh báo sự cố đến người dân và đội xử lý (UC 179).";
      case "track": return "Theo dõi toàn bộ vòng đời của yêu cầu từ lúc phát sinh đến lúc đóng (UC 180).";
      case "query": return "Tra cứu lịch sử công việc và báo cáo phân tích hiệu suất SLA xử lý sự cố (UC 181 - 182).";
    }
  };

  const handleDeclareRequest = () => {
    if (!reqTitle) return;
    const newReq: IncidentRequest = {
      id: `YC-2026-${100 + requests.length + 1}`,
      title: reqTitle,
      location: reqLoc,
      source: "Khai báo thủ công",
      time: "Vừa xong",
      status: "Mới",
      priority: reqPriority,
      assigned: null,
      desc: reqDesc,
      reporter: reqReporter || "Cán bộ vận hành",
    };
    setRequests([newReq, ...requests]);
    setIsDeclareOpen(false);
    setReqTitle("");
    setReqLoc("");
    setReqDesc("");
    setReqReporter("");
  };

  const getSelectedReq = () => {
    return requests.find(r => r.id === selectedReqId) || requests[0];
  };

  const handleTriage = (priority: 'Khẩn cấp' | 'Cao' | 'Trung bình' | 'Thấp') => {
    setRequests(requests.map(r => r.id === selectedReqId ? { ...r, priority } : r));
  };

  const handleAssign = (assigned: string) => {
    setRequests(requests.map(r => r.id === selectedReqId ? { ...r, assigned, status: "Đang xử lý" } : r));
  };

  const handleClose = () => {
    setRequests(requests.map(r => r.id === selectedReqId ? { ...r, status: "Đã đóng" } : r));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100/50 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
              <MessageSquare className="size-5" />
            </span>
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider bg-indigo-100/50 px-2 py-0.5 rounded-full">Tiếp nhận yêu cầu</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{getPageTitle()}</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">{getPageSub()}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          {mode === "declare" && (
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-750 shadow-sm" onClick={() => setIsDeclareOpen(true)}>
              <Plus className="size-4" />
              Khai báo sự cố mới
            </Button>
          )}
          {mode === "notify" && (
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm">
              <Send className="size-4" />
              Lưu cấu hình thông báo
            </Button>
          )}
          {mode === "query" && (
            <Button variant="outline" className="gap-2 border-slate-200 bg-white text-slate-650 shadow-sm">
              <Download className="size-4" />
              Xuất báo cáo Excel
            </Button>
          )}
        </div>
      </div>

      {/* View: declare, triage, dispatch, update, close, track */}
      {["triage", "dispatch", "update", "close", "track", "declare"].includes(mode) && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left panel: list of requests */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Danh sách yêu cầu</h3>
            <div className="space-y-3">
              {requests.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedReqId(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${item.id === selectedReqId ? 'bg-indigo-50/50 border-indigo-400 shadow-sm ring-1 ring-indigo-100' : 'bg-white border-slate-200 hover:border-indigo-200'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono font-bold text-slate-400">{item.id}</span>
                    <Badge variant="outline" className={
                      item.status === 'Mới' ? 'bg-blue-50 text-blue-700' : 
                      item.status === 'Đang xử lý' ? 'bg-amber-50 text-amber-700' : 
                      item.status === 'Đã nghiệm thu' ? 'bg-emerald-50 text-emerald-700' : 
                      'bg-slate-100 text-slate-650'
                    }>{item.status}</Badge>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm leading-snug">{item.title}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Details + action depending on mode */}
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <Badge className="bg-rose-100 text-rose-700 border-none hover:bg-rose-100 mb-2">Ưu tiên: {getSelectedReq().priority}</Badge>
                    <CardTitle className="text-base font-bold text-slate-800">{getSelectedReq().title}</CardTitle>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-4">
                      <span><span className="font-semibold text-slate-700">Mã:</span> {getSelectedReq().id}</span>
                      <span><span className="font-semibold text-slate-700">Thời gian:</span> {getSelectedReq().time}</span>
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Nguồn phát hiện sự cố</p>
                    <p className="font-semibold text-slate-700">{getSelectedReq().source}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Người khai báo / SDT</p>
                    <p className="font-semibold text-slate-750">{getSelectedReq().reporter} ({getSelectedReq().phone || "N/A"})</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-400 text-xs mb-1">Mô tả sự cố chi tiết</p>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-150">{getSelectedReq().desc}</p>
                  </div>
                  {getSelectedReq().assigned && (
                    <div className="col-span-2">
                      <p className="text-slate-400 text-xs mb-1">Đơn vị nhận giao việc</p>
                      <p className="font-bold text-indigo-750 flex items-center gap-1.5"><User className="size-4" />{getSelectedReq().assigned}</p>
                    </div>
                  )}
                </div>

                {/* Specific actions depending on mode */}
                {mode === "triage" && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Thao tác Thẩm định & Phân loại</h4>
                    <div className="flex gap-2 flex-wrap">
                      {(['Thấp', 'Trung bình', 'Cao', 'Khẩn cấp'] as const).map(p => (
                        <Button 
                          key={p}
                          variant="outline"
                          onClick={() => handleTriage(p)}
                          className={`h-9 px-4 text-xs font-semibold ${getSelectedReq().priority === p ? 'bg-indigo-650 text-white hover:bg-indigo-700 hover:text-white border-indigo-650' : 'border-slate-200 text-slate-650 hover:bg-slate-50'}`}
                        >
                          Mức: {p}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {mode === "dispatch" && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Giao xử lý hiện trường</h4>
                    <div className="flex gap-2 items-center flex-wrap">
                      <select 
                        title="Đơn vị nhận"
                        className="text-sm px-3.5 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        onChange={e => handleAssign(e.target.value)}
                        value={getSelectedReq().assigned || ""}
                      >
                        <option value="">-- Chọn đơn vị thi công --</option>
                        <option value="Đội QLĐB 1">Đội Quản lý đường bộ 1</option>
                        <option value="Đội QLĐB 2">Đội Quản lý đường bộ 2</option>
                        <option value="Đội Điện - VEC">Xí nghiệp Điện chiếu sáng</option>
                        <option value="Nhà thầu sửa chữa 1">Công ty Công trình Đông Á</option>
                      </select>
                      {getSelectedReq().assigned && <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><Check className="size-4" /> Đã giao việc thành công</span>}
                    </div>
                  </div>
                )}

                {mode === "update" && (
                  <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                    <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-1.5"><Clock className="size-4" /> Cập nhật tiến độ giải quyết hiện trường</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Ghi chú từ hiện trường</label>
                        <textarea rows={2} placeholder="Nhập ghi chú thi công..." className="w-full text-xs px-3 py-2 border rounded bg-white resize-none" />
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">Gửi cập nhật</Button>
                      </div>
                    </div>
                  </div>
                )}

                {mode === "close" && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Luồng nghiệm thu & Đóng yêu cầu</h4>
                    {getSelectedReq().status !== "Đã đóng" ? (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5" onClick={handleClose}>
                          <CheckSquare className="size-4" />
                          Xác nhận đóng yêu cầu
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-600" />
                        Sự cố đã được hoàn thành, nghiệm thu kỹ thuật và đóng hồ sơ thành công!
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 6. View: Notify (Cấu hình tự động gửi thông báo) */}
      {mode === "notify" && (
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">Cấu hình gửi cảnh báo tự động khi phát sinh sự cố</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-650 uppercase tracking-wide">Quy tắc cảnh báo theo mức độ khẩn cấp</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="size-4 text-indigo-600 border-slate-300 rounded" />
                      <span className="text-xs font-bold text-rose-600">Sự cố khẩn cấp (Crash, tắc đường)</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">Tự động SMS + Email ngay lập tức</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="size-4 text-indigo-600 border-slate-300 rounded" />
                      <span className="text-xs font-bold text-amber-600">Sự cố độ ưu tiên Cao (Hỏng hộ lan)</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">Tự động Email trong vòng 15p</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-l pl-6 border-slate-200">
                <h4 className="text-xs font-bold text-slate-650 uppercase tracking-wide">Cấu hình danh sách người nhận cảnh báo</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Số điện thoại nhận tin khẩn (Hotline đội tuần kiểm)</label>
                    <input type="text" defaultValue="0912-345-678; 0988-777-666" className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Email nhận nhật ký tổng hợp (Hàng ngày)</label>
                    <input type="text" defaultValue="banqlkt@vec.com.vn; giamsat@vec.vn" className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 8. View: Query & SLA Report */}
      {mode === "query" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Tỷ lệ hoàn thành sự cố đúng hạn</p>
                  <h3 className="text-2xl font-bold text-emerald-600">92.5%</h3>
                </div>
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="size-5" /></div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Thời gian phản ứng trung bình</p>
                  <h3 className="text-2xl font-bold text-slate-800">12.5 phút</h3>
                </div>
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Clock className="size-5" /></div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Sự cố quá hạn giải quyết</p>
                  <h3 className="text-2xl font-bold text-rose-600">2 sự cố</h3>
                </div>
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl"><ShieldAlert className="size-5" /></div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-200">
            <div className="p-4 border-b bg-slate-50/50 flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-sm font-bold text-slate-700">Tra cứu nhật ký giải quyết công việc</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Mã YC</th>
                    <th className="px-6 py-4 font-semibold">Tên sự cố</th>
                    <th className="px-6 py-4 font-semibold">Vị trí lý trình</th>
                    <th className="px-6 py-4 font-semibold text-center">Thời gian xử lý (SLA)</th>
                    <th className="px-6 py-4 font-semibold">Đơn vị phụ trách</th>
                    <th className="px-6 py-4 font-semibold">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-indigo-650 font-mono text-xs">YC-2026-099</td>
                    <td className="px-6 py-4 font-medium text-slate-800">Hỏng đèn chiếu sáng tại nút giao IC3</td>
                    <td className="px-6 py-4 text-slate-600">Km182, Nút giao IC3</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-800">4.5 giờ</td>
                    <td className="px-6 py-4 text-slate-600">Đội Điện - VEC</td>
                    <td className="px-6 py-4"><Badge className="bg-emerald-100 text-emerald-800 border-none">Đã đóng</Badge></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-indigo-650 font-mono text-xs">YC-2026-097</td>
                    <td className="px-6 py-4 font-medium text-slate-800">Nhặt rác vứt bừa bãi lề đường cao tốc</td>
                    <td className="px-6 py-4 text-slate-600">Km215 - Km218</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-800">1.2 giờ</td>
                    <td className="px-6 py-4 text-slate-600">Đội QLĐB 2</td>
                    <td className="px-6 py-4"><Badge className="bg-emerald-100 text-emerald-800 border-none">Đã đóng</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Dialog for Khai báo mới */}
      <Dialog open={isDeclareOpen} onOpenChange={setIsDeclareOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl border p-0 overflow-hidden shadow-lg">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Plus className="size-5 text-indigo-600" />
              Khai báo yêu cầu & sự cố hiện trường mới
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Nội dung sự cố ngắn gọn</label>
              <input 
                type="text" 
                placeholder="VD: Xe tải gặp sự cố hỏng lốp ở làn số 2..." 
                className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                value={reqTitle}
                onChange={(e) => setReqTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Vị trí / Lý trình</label>
                <input 
                  type="text" 
                  placeholder="VD: Km 140, Nội Bài - Lào Cai" 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={reqLoc}
                  onChange={(e) => setReqLoc(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Người / Nguồn phản ánh</label>
                <input 
                  type="text" 
                  placeholder="VD: Người dân báo hoặc Tên cán bộ tuần tra" 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={reqReporter}
                  onChange={(e) => setReqReporter(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Mức độ khẩn cấp đề xuất</label>
              <select 
                className="w-full text-sm px-3.5 py-2 border rounded-md bg-white"
                value={reqPriority}
                onChange={(e: any) => setReqPriority(e.target.value)}
              >
                <option value="Thấp">Thấp</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Cao">Cao</option>
                <option value="Khẩn cấp">Khẩn cấp</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Mô tả sự cố chi tiết</label>
              <textarea 
                rows={3} 
                placeholder="Mô tả cụ thể trạng thái sự cố, ảnh hưởng giao thông..." 
                className="w-full text-sm px-3.5 py-2 border rounded-md resize-none focus:outline-none"
                value={reqDesc}
                onChange={(e) => setReqDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t bg-slate-50 gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsDeclareOpen(false)} className="h-9 px-4">Đóng</Button>
            <Button size="sm" onClick={handleDeclareRequest} className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white">Gửi phản ánh</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
