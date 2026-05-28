import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Info, FileText, Settings, Shield, Activity, Car, Save, X, Plus, Trash2, Upload, Ruler, Hammer
} from "lucide-react";

interface CauLonFormDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedItem?: any;
}

export function CauLonFormDialog({ open, onOpenChange, selectedItem }: CauLonFormDialogProps) {
  const [activeTab, setActiveTab] = useState("thong-tin");
  const isEdit = !!selectedItem;

  const [hoSoFiles, setHoSoFiles] = useState([
    { id: 1, name: "HoSoHoanCong_C001.pdf", soHieu: "12/QD-BGTVT", ngayKy: "10/05/2010" }
  ]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden flex flex-col bg-slate-50">
        <DialogHeader className="p-6 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
              <Shield className="size-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {isEdit ? `Cập nhật Cầu lớn: ${selectedItem?.tenCau}` : "Thêm mới Cầu lớn"}
              </DialogTitle>
              <p className="text-sm text-slate-500 mt-1">
                Nhập đầy đủ thông tin kỹ thuật của công trình cầu theo các nhóm dữ liệu
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col md:flex-row w-full h-full">
            <TabsList className="h-full flex-col w-64 justify-start bg-slate-100 border-r border-slate-200 p-4 gap-2 rounded-none">
              <TabsTrigger value="thong-tin" className="w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Info className="size-4" /> Thông tin chung
              </TabsTrigger>
              <TabsTrigger value="thong-so" className="w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Ruler className="size-4" /> Thông số kỹ thuật
              </TabsTrigger>
              <TabsTrigger value="ket-cau" className="w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Shield className="size-4" /> Kết cấu & Nhịp
              </TabsTrigger>
              <TabsTrigger value="phu-tro" className="w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Hammer className="size-4" /> Công trình phụ trợ
              </TabsTrigger>
              <TabsTrigger value="tinh-trang" className="w-full justify-start gap-3 py-3 px-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                <Activity className="size-4" /> Tình trạng & Sử dụng
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto bg-white">

              {/* TAB 1: THÔNG TIN CHUNG */}
              <TabsContent value="thong-tin" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Info className="size-5 text-blue-500" /> Thông tin định danh</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Ngày áp dụng</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tên cầu <span className="text-red-500">*</span></Label>
                    <Input placeholder="Ví dụ: Cầu Nhật Tân" defaultValue={selectedItem?.tenCau} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tuyến đường</Label>
                    <Select defaultValue={selectedItem?.tuyenDuong || ""}>
                      <SelectTrigger><SelectValue placeholder="Chọn tuyến" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="QL1A">Quốc lộ 1A</SelectItem>
                        <SelectItem value="VD3">Vành đai 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Đơn vị quản lý</Label>
                    <Input placeholder="Ví dụ: Sở GTVT Hà Nội" />
                  </div>
                  <div className="space-y-2">
                    <Label>Loại cầu đường bộ</Label>
                    <Input placeholder="Gỗ, thép, bê tông..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Vị trí</Label>
                    <Input placeholder="Địa điểm chi tiết" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Lý trình</Label>
                      <Input placeholder="Km 0+000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Khoảng cách lý trình (m)</Label>
                      <Input type="number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Theo chiều</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Chọn chiều" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trai">Bên trái</SelectItem>
                          <SelectItem value="phai">Bên phải</SelectItem>
                          <SelectItem value="hai-chieu">Hai chiều</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>KC mép đường (m)</Label>
                      <Input type="number" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: THÔNG SỐ KỸ THUẬT */}
              <TabsContent value="thong-so" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Ruler className="size-5 text-blue-500" /> Thông số kỹ thuật mặt cầu</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-2"><Label>Chiều dài (m)</Label><Input type="number" /></div>
                  <div className="space-y-2"><Label>Chiều rộng (m)</Label><Input type="number" /></div>
                  <div className="space-y-2"><Label>Diện tích mặt cầu (m²)</Label><Input type="number" /></div>
                  <div className="space-y-2"><Label>Tải trọng thiết kế</Label><Input placeholder="H30..." /></div>
                  <div className="space-y-2"><Label>Tải trọng thực tế</Label><Input /></div>
                  <div className="space-y-2"><Label>Số nhịp</Label><Input type="number" /></div>
                </div>
                
                <h3 className="text-base font-bold pt-4 border-t">Diện tích sơn bảo vệ</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Diện tích sơn sắt thép (m²)</Label><Input type="number" /></div>
                  <div className="space-y-2"><Label>Diện tích sơn bê tông (m²)</Label><Input type="number" /></div>
                </div>
              </TabsContent>

              {/* TAB 3: KẾT CẤU & NHỊP */}
              <TabsContent value="ket-cau" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Shield className="size-5 text-blue-500" /> Kết cấu công trình</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Kết cấu mố</Label><Input placeholder="Bê tông cốt thép..." /></div>
                  <div className="space-y-2"><Label>Kết cấu trụ</Label><Input /></div>
                  <div className="space-y-2"><Label>Kết cấu nhịp</Label><Input placeholder="Dầm I, Dầm Super-T..." /></div>
                  <div className="space-y-2"><Label>Sơ đồ nhịp</Label><Input placeholder="3x33m..." /></div>
                  <div className="space-y-2"><Label>Chiều cao hạn chế (m)</Label><Input type="number" /></div>
                  <div className="space-y-2"><Label>Khung hạn chế</Label><Input placeholder="Có/Không" /></div>
                </div>
              </TabsContent>

              {/* TAB 4: CÔNG TRÌNH PHỤ TRỢ */}
              <TabsContent value="phu-tro" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Hammer className="size-5 text-blue-500" /> Phụ trợ mặt cầu</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Khe co giãn</Label><Input placeholder="Khe răng lược..." /></div>
                  <div className="space-y-2"><Label>Chủng loại khe co dãn</Label><Input /></div>
                  <div className="space-y-2"><Label>Lỗ thoát nước</Label><Input placeholder="Số lượng, loại..." /></div>
                  <div className="space-y-2"><Label>Bộ hành BTXM (m²)</Label><Input type="number" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Bộ hành lát gạch (m²)</Label><Input type="number" /></div>
                    <div className="space-y-2"><Label>Loại gạch</Label><Input placeholder="Terrazzo..." /></div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 5: TÌNH TRẠNG & SỬ DỤNG */}
              <TabsContent value="tinh-trang" className="p-8 m-0 space-y-8 animate-in fade-in duration-500">
                <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Activity className="size-5 text-blue-500" /> Tình trạng & Ghi chú</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tình trạng</Label>
                    <Select defaultValue="hoat-dong">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hoat-dong">Hoạt động bình thường</SelectItem>
                        <SelectItem value="xuong-cap">Xuống cấp - Cần sửa chữa</SelectItem>
                        <SelectItem value="dang-sua-chua">Đang sửa chữa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày đưa vào sử dụng</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Nội dung tình trạng chi tiết</Label>
                    <textarea 
                      placeholder="Mô tả chi tiết tình trạng hiện tại của cầu..."
                      className="w-full flex h-20 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Ghi chú</Label>
                    <textarea 
                      placeholder="Các ghi chú hoặc lưu ý khác nếu có..."
                      className="w-full flex h-20 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                    />
                  </div>
                </div>
              </TabsContent>

            </div>
          </Tabs>
        </div>

        <DialogFooter className="p-4 bg-white border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)}><X className="size-4 mr-2" /> Hủy bỏ</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 px-8" onClick={() => { alert("Lưu Mockup thành công!"); onOpenChange(false); }}>
            <Save className="size-4 mr-2" /> Lưu thông tin cầu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
