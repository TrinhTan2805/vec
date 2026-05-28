import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { CalendarIcon, Save, Info, MapPin, Hammer, LayoutDashboard, FileText, Paperclip, Upload, Trash2 } from "lucide-react";

interface RepairFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "road" | "bridge";
  item?: any;
}

export function RepairFormDialog({ open, onOpenChange, type, item }: RepairFormDialogProps) {
  const isEdit = !!item;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] xl:max-w-7xl w-[66.6vw] h-[90vh] bg-white border-slate-200 shadow-xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 border-b bg-slate-50/50">
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Hammer className="size-5 text-white" />
            </div>
            {isEdit ? "Cập nhật thông tin sửa chữa" : `Thêm mới sửa chữa ${type === "road" ? "mặt đường bộ" : "cầu lớn"}`}
          </DialogTitle>
          <p className="text-sm text-slate-500 mt-1">Cung cấp thông tin chi tiết phục vụ báo cáo khối lượng và kỹ thuật</p>
        </DialogHeader>

        <Tabs defaultValue="general" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="px-6 border-b h-14 bg-white justify-start gap-2 rounded-none w-full">
            <TabsTrigger value="general" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none">
              <LayoutDashboard className="size-4" />
              Thông tin chung
            </TabsTrigger>
            <TabsTrigger value="location" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none">
              <MapPin className="size-4" />
              Vị trí & Lý trình
            </TabsTrigger>
            <TabsTrigger value="technical" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none">
              <Info className="size-4" />
              Kỹ thuật & Khối lượng
            </TabsTrigger>
            <TabsTrigger value="structure" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none">
              <FileText className="size-4" />
              Kết cấu & Bàn giao
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 h-14 rounded-none">
              <Paperclip className="size-4" />
              Hồ sơ đính kèm
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <div className="p-8">
              <TabsContent value="general" className="m-0 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">
                      {type === "road" ? "Tên đường, phố (*)" : "Tên cầu (*)"}
                    </Label>
                    <Select defaultValue={item?.assetId || ""}>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder={`Chọn ${type === "road" ? "tuyến đường" : "cầu"}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {type === "road" ? (
                          <>
                            <SelectItem value="ql1a">Quốc lộ 1A</SelectItem>
                            <SelectItem value="ql5">Quốc lộ 5</SelectItem>
                            <SelectItem value="ql32">Quốc lộ 32</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="nhat-tan">Cầu Nhật Tân</SelectItem>
                            <SelectItem value="thanh-tri">Cầu Thanh Trì</SelectItem>
                            <SelectItem value="vinh-tuy">Cầu Vĩnh Tuy</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Quý/Năm</Label>
                    <Input placeholder="Ví dụ: 2/2026" defaultValue={item?.period || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Ngày bắt đầu</Label>
                    <div className="relative">
                      <Input type="date" defaultValue={item?.startDate || ""} className="h-11 border-slate-200 pl-10" />
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Dự kiến hoàn thành</Label>
                    <div className="relative">
                      <Input type="date" defaultValue={item?.endDate || ""} className="h-11 border-slate-200 pl-10" />
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Đơn vị quản lý (*)</Label>
                    <Select defaultValue={item?.unit || "dv1"}>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Chọn đơn vị" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dv1">Hạt quản lý đường bộ 1</SelectItem>
                        <SelectItem value="dv2">Hạt quản lý đường bộ 2</SelectItem>
                        <SelectItem value="dv3">Hạt QLGT số 5</SelectItem>
                        <SelectItem value="dv4">Hạt QLGT số 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Tình trạng</Label>
                    <Select defaultValue={item?.status || "pending"}>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Chọn tình trạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Chờ phê duyệt</SelectItem>
                        <SelectItem value="approved">Đã phê duyệt</SelectItem>
                        <SelectItem value="ongoing">Đang thi công</SelectItem>
                        <SelectItem value="completed">Đã hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="m-0 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Điểm đầu</Label>
                    <Input placeholder="Km..." defaultValue={item?.startKm || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Điểm cuối</Label>
                    <Input placeholder="Km..." defaultValue={item?.endKm || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Khoảng cách lý trình (*)</Label>
                    <Input type="number" placeholder="Nhập lý trình (m)" defaultValue={item?.mileage || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Khoảng cách mép đường (*)</Label>
                    <Input type="number" step="0.1" placeholder="Nhập khoảng cách (m)" defaultValue={item?.edgeDist || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Vị trí (*)</Label>
                    <Select defaultValue={item?.position || "Trái"}>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Trái">Trái</SelectItem>
                        <SelectItem value="Phải">Phải</SelectItem>
                        <SelectItem value="Giữa">Giữa</SelectItem>
                        <SelectItem value="Toàn mặt đường">Toàn mặt đường</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="m-0 space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Chiều dài (*) (m)</Label>
                    <Input type="number" placeholder="0" defaultValue={item?.length || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Chiều rộng (*) (m)</Label>
                    <Input type="number" step="0.1" placeholder="0" defaultValue={item?.width || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Khối lượng (m2/m3)</Label>
                    <Input type="number" step="0.1" placeholder="0" defaultValue={item?.volume || ""} className="h-11 border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Thời gian bảo hành (*) (tháng)</Label>
                    <Input type="number" placeholder="12" defaultValue={item?.warranty || "12"} className="h-11 border-slate-200" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Giải trình</Label>
                    <Input placeholder="Ghi chú giải trình khối lượng..." defaultValue={item?.explanation || ""} className="h-11 border-slate-200" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="structure" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Tên loại kết cấu xử lý (*)</Label>
                    <Textarea 
                      placeholder="Mô tả các hạng mục kết cấu (ví dụ: Cào bóc mặt đường BTN + thảm BTNC 12.5...)" 
                      defaultValue={item?.structure?.join("\n") || ""} 
                      className="min-h-[120px] border-slate-200 resize-none p-4"
                    />
                    <p className="text-[10px] text-slate-400 italic">Nhập mỗi hạng mục trên một dòng</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Độ dày (*) (cm)</Label>
                      <Input placeholder="Ví dụ: +5, +5" defaultValue={item?.thickness?.join(", ") || ""} className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Ngày bàn giao đưa vào sử dụng (*)</Label>
                      <div className="relative">
                        <Input type="date" defaultValue={item?.handoverDate || ""} className="h-11 border-slate-200 pl-10" />
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-10 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="bg-blue-100 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="size-6 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Kéo thả file hoặc nhấn để tải lên</h3>
                    <p className="text-xs text-slate-500 max-w-xs text-center border-b border-transparent pb-1">Hỗ trợ các định dạng: .pdf, .docx, .xlsx (Tối đa 25MB)</p>
                  </div>
                  
                  {isEdit && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="bg-red-50 p-2 rounded-lg text-red-500"><FileText className="size-5" /></div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Bản vẽ hoàn công.pdf</p>
                            <p className="text-[11px] text-slate-400">2.4 MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-red-50 hover:text-red-600 h-8 w-8"><Trash2 className="size-4" /></Button>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><FileText className="size-5" /></div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Biên bản nghiệm thu.docx</p>
                            <p className="text-[11px] text-slate-400">1.1 MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-red-50 hover:text-red-600 h-8 w-8"><Trash2 className="size-4" /></Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="p-6 border-t bg-slate-50/50 gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-11 px-8 border-slate-200 text-slate-600 font-bold">
            Hủy bỏ
          </Button>
          <Button className="h-11 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all">
            <Save className="mr-2 size-4" />
            {isEdit ? "Cập nhật hồ sơ" : "Lưu hồ sơ sửa chữa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
