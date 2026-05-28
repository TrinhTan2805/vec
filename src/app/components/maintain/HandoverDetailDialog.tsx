import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { 
  GitMerge, CheckCircle2, User, Building2, MapPin, 
  FileText, CheckSquare, AlertTriangle, Paperclip, 
  Download, Microscope, ShieldCheck, X, Hammer
} from "lucide-react";

export interface HandoverRecord {
  id: string;
  sectionName: string;
  routeName: string;
  handoverDate: string;
  investor?: string;
  contractor: string;
  supervisor: string;
  receiver?: string;
  length: number;
  width: number;
  projectName: string;
  handoverItems?: Array<{ name: string; status: string; note?: string }>;
  testResults?: Array<{ testName: string; result: string; inspector: string; date: string }>;
  documents?: Array<{ name: string; size: string; date: string }>;
  status: "active" | "pending" | "completed";
  note: string;
  lat: number;
  lng: number;
}

interface HandoverDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: HandoverRecord | null;
  onEdit?: (item: HandoverRecord) => void;
}

export function HandoverDetailDialog({ open, onOpenChange, item, onEdit }: HandoverDetailDialogProps) {
  if (!item) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge className="bg-green-100 text-green-700 border-green-200">Đã hoàn trả</Badge>;
      case "active": return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Đang thi công</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Chờ nghiệm thu</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getItemBadge = (status: string) => {
    switch (status) {
      case "Đạt": return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Đạt</Badge>;
      case "Không đạt": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Không đạt</Badge>;
      default: return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">Chưa kiểm tra</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1300px] sm:max-w-[1300px] w-[90vw] md:w-[85vw] lg:w-[80vw] max-h-[90vh] bg-slate-50 border-slate-200 shadow-2xl p-0 overflow-hidden flex flex-col rounded-2xl">
        <DialogHeader className="p-6 border-b bg-white flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-xl shadow-inner border border-indigo-50">
              <GitMerge className="size-6 text-indigo-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-extrabold text-slate-900">Hồ sơ Bàn giao thi công</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[13px] text-slate-500 font-medium">Mã hồ sơ: <span className="text-slate-700 font-bold">{item.id}</span></p>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <p className="text-[13px] text-slate-500 font-medium">{item.sectionName}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(item.status)}
          </div>
        </DialogHeader>

        <Tabs defaultValue="participants" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="px-6 border-b h-14 bg-white justify-start gap-2 w-full rounded-none">
            <TabsTrigger value="participants" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 h-14 rounded-none font-semibold">
              <User className="size-4" /> Thành phần tham gia
            </TabsTrigger>
            <TabsTrigger value="checklists" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 h-14 rounded-none font-semibold">
              <CheckSquare className="size-4" /> Hạng mục & Đánh giá
            </TabsTrigger>
            <TabsTrigger value="testing" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 h-14 rounded-none font-semibold">
              <Microscope className="size-4" /> Thử nghiệm & Giám sát
            </TabsTrigger>
            <TabsTrigger value="docs" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 h-14 rounded-none font-semibold">
              <Paperclip className="size-4" /> Hồ sơ đính kèm
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <div className="p-6 md:p-8">
              {/* === TABS CONTENT: PARTICIPANTS & GENERAL INFO === */}
              <TabsContent value="participants" className="m-0 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-6">Thông tin chung</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1"><MapPin className="size-3"/> Tuyến đường</p>
                      <p className="text-sm font-bold text-slate-900">{item.routeName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Dự án / Công trình</p>
                      <p className="text-sm font-bold text-indigo-700">{item.projectName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Quy mô (Dài x Rộng)</p>
                      <p className="text-sm font-bold text-slate-900">{item.length} km x {item.width} m</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Ngày bàn giao</p>
                      <p className="text-sm font-bold text-slate-900">{item.handoverDate}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Parties */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="size-5 text-indigo-600" /> Bên Giao (Chủ đầu tư/Quản lý)
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-bold uppercase mb-1">Đại diện Chủ đầu tư</p>
                      <p className="text-sm font-bold text-slate-900">{item.investor || "Sở GTVT Hà Nội"}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-bold uppercase mb-1">Đơn vị tiếp nhận tài sản</p>
                      <p className="text-sm font-bold text-slate-900">{item.receiver || "Ban QLDA GTĐT HN"}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <User className="size-5 text-emerald-600" /> Bên Nhận (Nhà thầu/Giám sát)
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded text-emerald-600 mt-0.5"><Hammer className="size-4" /></div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase mb-1">Nhà thầu thi công</p>
                        <p className="text-sm font-bold text-slate-900">{item.contractor}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded text-amber-600 mt-0.5"><ShieldCheck className="size-4" /></div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase mb-1">Đơn vị tư vấn giám sát</p>
                        <p className="text-sm font-bold text-slate-900">{item.supervisor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* === TABS CONTENT: CHECKLISTS === */}
              <TabsContent value="checklists" className="m-0 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Chi tiết Hạng mục bàn giao</h3>
                      <p className="text-sm text-slate-500 mt-1">Danh sách các tài sản, mặt bằng hiện trạng được giao nhận</p>
                    </div>
                    <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                      {item.handoverItems?.length || 4} Hạng mục
                    </Badge>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/80">
                      <tr>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Hạng mục mặt bằng</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Tình trạng ghi nhận</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b">Ghi chú thực địa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(item.handoverItems || [
                        { name: "Mặt đường hiện trạng", status: "Đạt", note: "Đã dọn dẹp mặt bằng, đủ điều kiện thi công" },
                        { name: "Hệ thống Rãnh dọc thoát nước", status: "Không đạt", note: "Tắc nghẽn rác tại Km1+200, cần khơi thông trước" },
                        { name: "Biển báo giao thông", status: "Đạt", note: "Đã đánh dấu di dời" },
                        { name: "Hành lang an toàn", status: "Chưa kiểm tra", note: "Vướng mặt bằng thổ cư" },
                      ]).map((hi, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 text-sm font-semibold text-slate-800">{hi.name}</td>
                          <td className="p-4">{getItemBadge(hi.status)}</td>
                          <td className="p-4 text-sm text-slate-600 flex items-center gap-2">
                            {hi.status === "Không đạt" && <AlertTriangle className="size-4 text-amber-500" />}
                            {hi.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* === TABS CONTENT: TESTING & SUPERVISION === */}
              <TabsContent value="testing" className="m-0 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Microscope className="size-5 text-blue-500" /> Kết quả Thử nghiệm & Quan trắc
                    </h3>
                  </div>
                  <div className="p-0">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Tên bài thử nghiệm</th>
                          <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Kết quả giám định</th>
                          <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Ngày thực hiện</th>
                          <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase">Chữ ký giám sát</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(item.testResults || [
                          { testName: "Thử nghiệm độ chặt nền K98", result: "Đạt", date: "2026-03-01", inspector: "Nguyễn Văn Tuấn (GS)" },
                          { testName: "Khoan rút lõi mặt đường nhựa", result: "Đạt", date: "2026-03-05", inspector: "Trần Hữu Hùng (GS)" },
                          { testName: "Siêu âm cọc nhồi mố cầu", result: "Không đạt", date: "2026-03-10", inspector: "Lê Minh (TVGS)" },
                        ]).map((test, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-4 px-6 text-sm font-semibold text-slate-900">{test.testName}</td>
                            <td className="py-4 px-6">
                              <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${test.result === 'Đạt' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {test.result}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-500">{test.date}</td>
                            <td className="py-4 px-6 text-sm font-medium text-slate-700 flex items-center gap-2">
                              <ShieldCheck className="size-4 text-slate-400" />
                              {test.inspector}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* === TABS CONTENT: DOCUMENTS === */}
              <TabsContent value="docs" className="m-0 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6">
                  <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Paperclip className="size-5 text-slate-600" /> Danh mục Tài liệu đính kèm
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(item.documents || [
                      { name: "01_BanVeMatBangHienTrang.pdf", size: "4.2 MB", date: "2026-01-12" },
                      { name: "02_BienBanBanGiaoMatBang.docx", size: "1.1 MB", date: "2026-01-15" },
                      { name: "03_KetQuaKhaoSatDiaChat.pdf", size: "12.5 MB", date: "2026-01-10" },
                      { name: "04_PhuLucAnhChupHienTruong.xlsx", size: "8.0 MB", date: "2026-01-15" },
                    ]).map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={`p-2.5 rounded-lg shrink-0 ${doc.name.endsWith('.pdf') ? 'bg-red-100 text-red-600' : doc.name.endsWith('.docx') ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            <FileText className="size-5" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-800 truncate">{doc.name}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{doc.size} • Cập nhật: {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0 size-8 text-slate-400 group-hover:text-blue-600">
                          <Download className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

            </div>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="p-4 border-t bg-white gap-2 justify-end px-6 flex-shrink-0">
          {onEdit && (
            <Button variant="outline" onClick={() => { onOpenChange(false); onEdit(item); }} className="border-slate-200 font-semibold px-6 shadow-sm">
              <User className="mr-2 size-4" /> Cập nhật phiên bản
            </Button>
          )}
          <Button onClick={() => onOpenChange(false)} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 shadow-md">
            Đóng hồ sơ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
