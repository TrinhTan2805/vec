import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Upload, FileText, Info, HardHat, Car, Shield, Activity, Settings, Save, X, Plus, Trash2 } from "lucide-react";

interface DoanDuongBoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem?: any;
  type?: "dia-phan" | "mat-cat";
}

export function DoanDuongBoFormDialog({ open, onOpenChange, selectedItem, type = "dia-phan" }: DoanDuongBoFormDialogProps) {
  const [activeTab, setActiveTab] = useState("thong-tin");
  const isEdit = !!selectedItem;

  // Mock form state for demonstration
  const [phapLyFiles, setPhapLyFiles] = useState([
    { id: 1, name: "HoSoHoanCong_D001.pdf", type: "Hồ sơ hoàn công", soHieu: "123/QD", ngayKy: "20/04/2025" }
  ]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-5xl w-full max-h-[90vh] p-0 flex flex-col bg-slate-50">
        <DialogHeader className="p-6 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
              <HardHat className="size-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {isEdit 
                  ? `Cập nhật ${type === "dia-phan" ? "Đoạn đường theo địa phận" : "Đoạn đường theo mặt cắt"}: ${selectedItem?.fullName || selectedItem?.tenDoan}` 
                  : `Thêm mới ${type === "dia-phan" ? "Đoạn đường theo địa phận" : "Đoạn đường theo mặt cắt"}`}
              </DialogTitle>
              <p className="text-sm text-slate-500 mt-1">
                Điền đầy đủ các thông tin chuyên ngành của Đoạn đường theo các nhóm dữ liệu bên dưới
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col md:flex-row w-full h-full">
            <TabsList className="h-full flex-col w-64 justify-start bg-slate-100 border-r border-slate-200 p-4 gap-2 rounded-none">
              <TabsTrigger value="thong-tin" className="flex-none h-auto w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Info className="size-4" /> Thông tin chung
              </TabsTrigger>
              <TabsTrigger value="ky-thuat" className="flex-none h-auto w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Settings className="size-4" /> Cấp & Kỹ thuật
              </TabsTrigger>
              <TabsTrigger value="phap-ly" className="flex-none h-auto w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <FileText className="size-4" /> Hồ sơ & Pháp lý
              </TabsTrigger>
              <TabsTrigger value="to-chuc" className="flex-none h-auto w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Car className="size-4" /> Tổ chức giao thông
              </TabsTrigger>
              <TabsTrigger value="ket-cau" className="flex-none h-auto w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Shield className="size-4" /> Kết cấu mặt đường
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto bg-white">
              {/* TAB 1: THÔNG TIN CHUNG */}
              <TabsContent value="thong-tin" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Info className="size-5 text-blue-500" /> Dữ liệu cơ bản</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Tên đoạn đường <span className="text-red-500">*</span></Label>
                      <Input placeholder="Nhập tên" defaultValue={selectedItem?.tenDoan || selectedItem?.fullName} />
                    </div>
                    <div className="space-y-2">
                      <Label>Tuyến đường</Label>
                      <Select defaultValue="QL1A">
                        <SelectTrigger><SelectValue placeholder="Chọn tuyến" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="QL1A">Quốc lộ 1A</SelectItem>
                          <SelectItem value="QL5">Quốc lộ 5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Đơn vị quản lý</Label>
                      <Input placeholder="Sở GTVT Hà Nội" />
                    </div>
                    <div className="space-y-2">
                       <Label>Tình trạng</Label>
                       <Select defaultValue="Hoatdong">
                         <SelectTrigger><SelectValue /></SelectTrigger>
                         <SelectContent>
                           <SelectItem value="Hoatdong">Hoạt động bình thường</SelectItem>
                           <SelectItem value="Bao-tri">Đang bảo trì</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Điểm đầu (Km)</Label>
                      <Input placeholder="Km 0+000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Điểm cuối (Km)</Label>
                      <Input placeholder="Km 5+000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Chiều dài (km)</Label>
                      <Input type="number" placeholder="5.0" />
                    </div>
                  </div>

                  {type === "mat-cat" && (
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                      <div className="space-y-2">
                        <Label>Chiều rộng (m)</Label>
                        <Input type="number" placeholder="40" />
                      </div>
                      <div className="space-y-2">
                        <Label>Loại kết cấu mặt</Label>
                        <Input placeholder="Bê tông nhựa Asphalt" />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* TAB 2: CẤP & KỸ THUẬT */}
              <TabsContent value="ky-thuat" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Settings className="size-5 text-blue-500" /> Phân cấp & Quy hoạch</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Loại đường</Label>
                      <Input placeholder="Đường đô thị..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Cấp đường</Label>
                      <Input placeholder="Cấp I..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Bậc đường</Label>
                      <Input placeholder="Bậc 1..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Cấp kỹ thuật</Label>
                      <Input placeholder="TCVN 4054:2005..." />
                    </div>
                    <div className="space-y-2">
                       <Label>Cấp quy hoạch</Label>
                       <Input placeholder="Quy hoạch 2030..." />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 3: PHÁP LÝ */}
              <TabsContent value="phap-ly" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><FileText className="size-5 text-blue-500" /> Hồ sơ hoàn công & Văn bản pháp lý</h3>
                  <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                      <Upload className="size-8 text-blue-500" />
                    </div>
                    <p className="font-semibold text-slate-700">Kéo thả tệp hoặc bấm vào đây để Tải lên Hồ sơ</p>
                    <p className="text-sm text-slate-500 mt-1">Hỗ trợ PDF, DOCX, ZIP (Tối đa 50MB)</p>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-100 text-slate-700">
                        <tr>
                          <th className="p-3 font-semibold">Tên hồ sơ/Tài liệu</th>
                          <th className="p-3 font-semibold">Loại hồ sơ</th>
                          <th className="p-3 font-semibold">Số văn bản</th>
                          <th className="p-3 font-semibold">Ngày ký/bàn giao</th>
                          <th className="p-3 font-semibold text-center w-20">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-slate-600">
                        {phapLyFiles.map(file => (
                          <tr key={file.id} className="hover:bg-slate-50">
                            <td className="p-3 flex items-center gap-2 font-medium text-blue-600"><FileText className="size-4" /> {file.name}</td>
                            <td className="p-3">{file.type}</td>
                            <td className="p-3">{file.soHieu}</td>
                            <td className="p-3">{file.ngayKy}</td>
                            <td className="p-3 text-center">
                              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 size-8"><Trash2 className="size-4" /></Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 4: TỔ CHỨC GIAO THÔNG */}
              <TabsContent value="to-chuc" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Car className="size-5 text-blue-500" /> Tổ chức Không gian & Hình học</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Số làn đường</Label>
                      <Input type="number" placeholder="Ví dụ: 4" min="1" />
                    </div>
                    <div className="space-y-2">
                       <Label>Hạn chế Tốc độ (km/h)</Label>
                       <Input type="number" placeholder="60" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 5: KẾT CẤU MẶT */}
              <TabsContent value="ket-cau" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Shield className="size-5 text-blue-500" /> Chi tiết Kết cấu mặt đường</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Loại kết cấu xử lý chính</Label>
                      <Input placeholder="Bê tông nhựa..." />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="p-4 bg-white border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="size-4 mr-2" /> Hủy bỏ
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onOpenChange(false)}>
            <Save className="size-4 mr-2" /> Lưu thông tin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
