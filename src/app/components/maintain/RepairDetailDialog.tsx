import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Calendar, 
  MapPin, 
  User, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Route,
  Building2,
  Hammer,
  Info,
  Paperclip,
  Download
} from "lucide-react";

interface RepairDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "road" | "bridge";
  item: any;
}

export function RepairDetailDialog({ open, onOpenChange, type, item }: RepairDetailDialogProps) {
  if (!item) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Đã hoàn thành</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Đang thi công</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Chờ phê duyệt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-[95vw] max-h-[90vh] bg-white border-slate-200 shadow-2xl p-0 overflow-hidden flex flex-col rounded-2xl">
        <DialogHeader className="p-5 md:p-6 border-b bg-slate-50/50 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-blue-100 p-2 md:p-3 rounded-xl shadow-inner">
              <Hammer className="size-5 md:size-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">Chi tiết hồ sơ sửa chữa</DialogTitle>
              <p className="text-[13px] text-slate-500 font-medium">Mã hồ sơ: <span className="text-slate-700">{item.id}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(item.status)}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-5 md:p-6 bg-slate-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="size-5 text-blue-500" />
                  Thông tin chung
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tên tài sản</p>
                    <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                      {type === "road" ? <Route className="size-4 text-blue-500" /> : <Building2 className="size-4 text-blue-500" />}
                      {item.assetName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Quý/Năm</p>
                    <p className="text-base font-bold text-slate-900">{item.period || "4/2025"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Phạm vi thực hiện</p>
                    <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="size-4 text-slate-400" />
                      {item.startKm} - {item.endKm}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Lý trình (m)</p>
                    <p className="text-base font-bold text-slate-900 uppercase">{item.mileage?.toLocaleString() || "—"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Vị trí mặt đường</p>
                    <p className="text-base font-bold text-slate-700">{item.position || "Trái"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Khoảng cách mép (m)</p>
                    <p className="text-base font-bold text-slate-700">{item.edgeDist || "0"}</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="size-5 text-blue-500" />
                  Kỹ thuật & Khối lượng
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Chiều dài (m)</p>
                    <p className="text-xl font-black text-slate-900">{item.length || "0"}</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Chiều rộng (m)</p>
                    <p className="text-xl font-black text-slate-900">{item.width || "0"}</p>
                  </div>
                  <div className="p-4 border border-blue-100 rounded-xl bg-blue-50 shadow-sm">
                    <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">Khối lượng</p>
                    <p className="text-xl font-black text-blue-700">{item.volume?.toLocaleString() || "0"}</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Bảo hành (tháng)</p>
                    <p className="text-xl font-black text-slate-900">{item.warranty || "12"}</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="size-5 text-indigo-500" />
                  Kết cấu xử lý
                </h3>
                <div className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-800/50">
                        <th className="p-4 text-xs font-bold uppercase tracking-widest border-b border-white/10">STT</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-widest border-b border-white/10">Loại kết cấu</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-widest border-b border-white/10 text-right">Độ dày (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(item.structure && item.structure.length > 0 ? item.structure : ["Thảm BTN C12.5 dày 5 cm"]).map((s: string, idx: number) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors border-b border-white/10 last:border-0">
                          <td className="p-4 text-sm font-medium text-slate-400">{idx + 1}</td>
                          <td className="p-4 text-sm font-bold">{s}</td>
                          <td className="p-4 text-sm font-black text-right text-blue-400">
                            {item.thickness ? (item.thickness[idx] || item.thickness[0]) : "+5"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Contractor & Progress */}
            <div className="space-y-6">
              <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Building2 className="size-5 text-indigo-500" />
                  Đơn vị & Bàn giao
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Đơn vị quản lý</p>
                    <p className="text-sm font-bold text-slate-900">{item.unit === "dv1" ? "Hạt quản lý đường bộ 1" : (item.unit || "Hạt QLGT số 5")}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Ngày bàn giao đưa vào SD</p>
                    <p className="text-sm font-bold text-blue-600 flex items-center gap-2">
                      <Calendar className="size-4" />
                      {item.handoverDate || "26/06/2021"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Đơn vị thi công</p>
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-50 p-2 rounded-full">
                        <User className="size-4 text-indigo-600" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">{item.contractor}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-base font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <FileText className="size-5 text-blue-600" />
                  Giải trình
                </h3>
                <p className="text-sm text-blue-800 leading-relaxed italic">
                  "{item.explanation || "Diện tích cào bóc thảm lại toàn bộ mặt đường do hư hỏng nặng, đảm bảo êm thuận cho phương tiện."}"
                </p>
              </section>

              <section className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-[13px] font-bold text-slate-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Paperclip className="size-4 text-emerald-600" />
                  Hồ sơ kỹ thuật
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-red-50 p-1.5 rounded text-red-500"><FileText className="size-4" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">Bản vẽ hoàn công.pdf</p>
                        <p className="text-[10px] text-slate-400 font-medium">2.4 MB • 15/03/2026</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"><Download className="size-3.5" /></Button>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-blue-50 p-1.5 rounded text-blue-600"><FileText className="size-4" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">Biên bản nghiệm thu.docx</p>
                        <p className="text-[10px] text-slate-400 font-medium">1.1 MB • 18/03/2026</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"><Download className="size-3.5" /></Button>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-emerald-50 p-1.5 rounded text-emerald-600"><FileText className="size-4" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">Phụ lục khối lượng.xlsx</p>
                        <p className="text-[10px] text-slate-400 font-medium">856 KB • 12/03/2026</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"><Download className="size-3.5" /></Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t bg-slate-50/50">
          <Button onClick={() => onOpenChange(false)} className="bg-slate-900 hover:bg-slate-800 text-white px-8">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
