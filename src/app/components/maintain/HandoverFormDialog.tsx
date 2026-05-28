import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { 
  GitMerge, User, Building2, MapPin, 
  CheckSquare, Paperclip, Microscope, FilePlus2, Save, X, PlusCircle, Trash2
} from "lucide-react";
import { HandoverRecord } from "./HandoverDetailDialog";

interface HandoverFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: Partial<HandoverRecord>;
  onSave: (item: Partial<HandoverRecord>) => void;
}

export function HandoverFormDialog({ open, onOpenChange, item, onSave }: HandoverFormDialogProps) {
  const isEdit = !!item?.id;
  const [formData, setFormData] = React.useState<Partial<HandoverRecord>>(item || { status: "active" });

  React.useEffect(() => {
    if (open) {
      setFormData(item || { status: "active" });
    }
  }, [open, item]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1300px] sm:max-w-[1300px] w-[90vw] md:w-[85vw] lg:w-[80vw] max-h-[90vh] bg-slate-50 border-slate-200 shadow-2xl p-0 overflow-hidden flex flex-col rounded-2xl">
        <DialogHeader className="p-6 border-b bg-white flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl shadow-inner border border-blue-50">
              <FilePlus2 className="size-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-extrabold text-slate-900">
                {isEdit ? "Điều chỉnh hồ sơ Bàn giao" : "Tạo mới hồ sơ Bàn giao thi công"}
              </DialogTitle>
              <p className="text-[13px] text-slate-500 font-medium mt-1">Ghi nhận thông tin mặt bằng, thành phần tham gia và kết quả kỹ thuật</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="general" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="px-6 border-b h-14 bg-white justify-start gap-2 w-full rounded-none">
            <TabsTrigger value="general" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none font-semibold">
              <MapPin className="size-4" /> Tuyến & Hạng mục
            </TabsTrigger>
            <TabsTrigger value="parties" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none font-semibold">
              <Building2 className="size-4" /> Các bên tham gia
            </TabsTrigger>
            <TabsTrigger value="items" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none font-semibold">
              <CheckSquare className="size-4" /> Yêu cầu Bàn giao
            </TabsTrigger>
            <TabsTrigger value="docs" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none font-semibold">
              <Paperclip className="size-4" /> Hồ sơ kèm theo
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <div className="p-8">
              {/* TAB 1: THÔNG TIN TUYẾN */}
              <TabsContent value="general" className="m-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold text-slate-700">Tên đoạn đường / Phạm vi bàn giao (*)</label>
                    <Input placeholder="VD: Đoạn Km0+000 – Km5+000 mặt phải" value={formData.sectionName || ""} onChange={e => setFormData(p => ({ ...p, sectionName: e.target.value }))} className="h-11 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tuyến đường (*)</label>
                    <Select value={formData.routeName || ""} onValueChange={v => setFormData(p => ({ ...p, routeName: v }))}>
                      <SelectTrigger className="h-11 bg-white"><SelectValue placeholder="Chọn tuyến đường" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Quốc lộ 1A">Quốc lộ 1A</SelectItem>
                        <SelectItem value="Quốc lộ 5">Quốc lộ 5</SelectItem>
                        <SelectItem value="Quốc lộ 32">Quốc lộ 32</SelectItem>
                        <SelectItem value="Đường Vành đai 2">Đường Vành đai 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Dự án / Công trình liên quan</label>
                    <Input placeholder="Dự án cải tạo đoạn..." value={formData.projectName || ""} onChange={e => setFormData(p => ({ ...p, projectName: e.target.value }))} className="h-11 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Ngày bàn giao (*)</label>
                    <Input type="date" value={formData.handoverDate || ""} onChange={e => setFormData(p => ({ ...p, handoverDate: e.target.value }))} className="h-11 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tình trạng hồ sơ</label>
                    <Select value={formData.status || "active"} onValueChange={v => setFormData(p => ({ ...p, status: v as HandoverRecord["status"] }))}>
                      <SelectTrigger className="h-11 bg-white"><SelectValue placeholder="Chọn tình trạng" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Đang thi công</SelectItem>
                        <SelectItem value="pending">Chờ nghiệm thu</SelectItem>
                        <SelectItem value="completed">Đã hoàn trả</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Chiều dài (km)</label>
                    <Input type="number" step="0.1" value={formData.length || ""} onChange={e => setFormData(p => ({ ...p, length: parseFloat(e.target.value) }))} className="h-11 bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Chiều rộng (m)</label>
                    <Input type="number" step="0.1" value={formData.width || ""} onChange={e => setFormData(p => ({ ...p, width: parseFloat(e.target.value) }))} className="h-11 bg-white" />
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: PARTIES */}
              <TabsContent value="parties" className="m-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                    <h3 className="text-base font-bold text-slate-900 border-b pb-3">Phía Giao Mặt Bằng (Chủ Đầu Tư)</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Đại diện Chủ Đầu Tư</label>
                      <Input placeholder="Sở GTVT Hà Nội / Ban QLDA..." value={formData.investor || ""} onChange={e => setFormData(p => ({ ...p, investor: e.target.value }))} className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Đơn vị Quản lý / Khai thác</label>
                      <Input placeholder="Công ty CP Công trình Giao thông..." value={formData.receiver || ""} onChange={e => setFormData(p => ({ ...p, receiver: e.target.value }))} className="h-11" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                    <h3 className="text-base font-bold text-slate-900 border-b pb-3">Phía Nhận Thi Công</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Nhà thầu thi công (*)</label>
                      <Input placeholder="Công ty Xây dựng XYZ..." value={formData.contractor || ""} onChange={e => setFormData(p => ({ ...p, contractor: e.target.value }))} className="h-11 border-blue-200 focus-visible:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Đơn vị Tư vấn Giám sát (*)</label>
                      <Input placeholder="Công ty Tư vấn GS ABC..." value={formData.supervisor || ""} onChange={e => setFormData(p => ({ ...p, supervisor: e.target.value }))} className="h-11 border-blue-200 focus-visible:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 3: CHECKLIST ITEMS */}
              <TabsContent value="items" className="m-0 space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800">
                  <CheckSquare className="size-5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-bold">Danh sách Hạng mục bàn giao hiện trạng</p>
                    <p>Cập nhật tình trạng của từng thành phần (nền đường, rãnh, thiết bị an toàn) ngay tại thời điểm lập biên bản.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(formData.handoverItems || [
                    { name: "", status: "Chưa kiểm tra", note: "" }
                  ]).map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center bg-white p-2 pr-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="bg-slate-100 font-bold text-slate-400 size-8 rounded-lg flex items-center justify-center shrink-0 ml-2">{idx + 1}</div>
                      <Input 
                        placeholder="Tên hạng mục bàn giao..." 
                        className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 placeholder:text-slate-300"
                        defaultValue={item.name}
                      />
                      <Select defaultValue={item.status}>
                        <SelectTrigger className="w-[160px] bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Đạt">Đạt yêu cầu</SelectItem>
                          <SelectItem value="Không đạt">Không đạt</SelectItem>
                          <SelectItem value="Chưa kiểm tra">Chưa kiểm tra</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        placeholder="Ghi chú thêm..." 
                        className="w-[200px] border-slate-200 bg-slate-50"
                        defaultValue={item.note}
                      />
                      <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="size-4"/></Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-dashed border-2 border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 py-6">
                    <PlusCircle className="size-5 mr-2" /> Thêm hạng mục tài sản
                  </Button>
                </div>
              </TabsContent>

              {/* TAB 4: DOCUMENTS */}
              <TabsContent value="docs" className="m-0 space-y-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-12 hover:bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer group">
                  <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Paperclip className="size-8 text-blue-500" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">Tải lên Biên bản và Hồ sơ Thử nghiệm</h3>
                  <p className="text-sm text-slate-500 max-w-sm text-center">Hỗ trợ đính kèm Biên bản hiện trường, Phiếu kiểm tra chất lượng đất, Hình ảnh mặt bằng (.pdf, .jpg, .docx)</p>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="p-5 border-t bg-slate-50/80 gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-11 px-8 border-slate-300 text-slate-700 font-bold bg-white">
            <X className="mr-2 size-4" /> Thoát
          </Button>
          <Button onClick={() => onSave(formData)} className="h-11 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all">
            <Save className="mr-2 size-4" />
            {isEdit ? "Cập nhật Hồ sơ" : "Lưu Bàn giao mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
