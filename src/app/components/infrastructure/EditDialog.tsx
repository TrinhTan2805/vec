import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Save, Upload, MapPin, RefreshCcw, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { SimpleMapView } from "../map/SimpleMapView";

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCard: any;
  selectedItem: any;
}

export function EditDialog({ open, onOpenChange, selectedCard, selectedItem }: EditDialogProps) {
  const [formData, setFormData] = useState({
    fullName: selectedItem?.fullName || '',
    idNumber: selectedItem?.idNumber || '',
    birthDate: selectedItem?.birthDate || '',
    fatherName: selectedItem?.fatherName || '',
    motherName: selectedItem?.motherName || '',
    gender: selectedItem?.gender || '',
    nationality: selectedItem?.nationality || '',
    latitude: selectedItem?.latitude || '21.0285',
    longitude: selectedItem?.longitude || '105.8542',
  });

  const [activeTab, setActiveTab] = useState("info");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] xl:max-w-7xl w-[66.6vw] max-h-[90vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-slate-900 text-xl font-bold">Chỉnh sửa thông tin tài sản</DialogTitle>
              <DialogDescription className="text-slate-500">
                Cập nhật thông tin chi tiết cho tài sản kết cấu hạ tầng giao thông.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-blue-400">Đồng bộ cuối lúc 13:30 25/04/2026</p>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                <Save className="size-4 mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Edit Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden min-h-0">
          <TabsList className="bg-slate-50 border-b border-slate-200 rounded-none justify-start w-full h-12 flex-shrink-0">
            <TabsTrigger value="info" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">
              Thông tin tài sản
            </TabsTrigger>
            <TabsTrigger value="location" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">
              Vị trí
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">
              Hồ sơ kỹ thuật
            </TabsTrigger>
            {selectedCard?.title === "Cầu" && (
              <>
                <TabsTrigger value="piers" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">Mố trụ</TabsTrigger>
                <TabsTrigger value="spans" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">Nhịp</TabsTrigger>
                <TabsTrigger value="bearings" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">Gối</TabsTrigger>
              </>
            )}
            {selectedCard?.title === "Tổng số tuyến đường" && (
              <>
                <TabsTrigger value="geometry" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">Hình học</TabsTrigger>
                <TabsTrigger value="legal" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-slate-600 text-sm px-6 py-2">Pháp lý</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Tab 1: Thông tin tài sản */}
          <TabsContent value="info" className="flex-1 overflow-auto mt-4 min-h-0 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-slate-700 text-sm mb-2 block">Tên đường</Label>
                  <Input 
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="idNumber" className="text-slate-700 text-sm mb-2 block">Mã đường</Label>
                  <Input 
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="birthDate" className="text-slate-700 text-sm mb-2 block">Độ dài (km)</Label>
                  <Input 
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="gender" className="text-slate-700 text-sm mb-2 block">Loại</Label>
                  <Input 
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fatherName" className="text-slate-700 text-sm mb-2 block">Điểm bắt đầu</Label>
                  <Input 
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="motherName" className="text-slate-700 text-sm mb-2 block">Điểm kết thúc</Label>
                  <Input 
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => setFormData({...formData, motherName: e.target.value})}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="nationality" className="text-slate-700 text-sm mb-2 block">Quốc tịch</Label>
                  <Input 
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    className="bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <Label htmlFor="note" className="text-slate-700 text-sm mb-2 block">Ghi chú</Label>
                  <Textarea 
                    id="note"
                    rows={3}
                    className="bg-white border-slate-200 text-slate-900"
                    placeholder="Nhập ghi chú..."
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Vị trí */}
          <TabsContent value="location" className="flex-1 overflow-auto mt-4 min-h-0 p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude" className="text-slate-700 font-medium">Vĩ độ (Latitude)</Label>
                  <Input 
                    id="latitude"
                    value={formData.latitude}
                    onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                    placeholder="21.0285"
                    className="bg-white border-slate-200 text-slate-900 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude" className="text-slate-700 font-medium">Kinh độ (Longitude)</Label>
                  <Input 
                    id="longitude"
                    value={formData.longitude}
                    onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                    placeholder="105.8542"
                    className="bg-white border-slate-200 text-slate-900 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-800 font-medium">Chọn vị trí trên bản đồ</h3>
                  <Button size="sm" variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-100">
                    <MapPin className="size-4 mr-2" />
                    Chọn vị trí
                  </Button>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg h-[400px] overflow-hidden">
                  <SimpleMapView 
                    markers={[]} 
                    height="100%" 
                    isDrawingMode={true}
                    drawingMode="point"
                    isActive={activeTab === "location"}
                    initialMarker={{ lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) }}
                    onLocationChange={(lat, lng) => {
                      setFormData(prev => ({ ...prev, latitude: lat.toFixed(6), longitude: lng.toFixed(6) }));
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Hồ sơ kỹ thuật */}
          <TabsContent value="files" className="flex-1 overflow-auto mt-4 min-h-0">
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
                <h3 className="text-slate-800 font-medium mb-4">Hồ sơ kỹ thuật</h3>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-white/50">
                  <Upload className="size-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 mb-2 font-medium">Kéo thả file vào đây hoặc click để chọn</p>
                  <p className="text-slate-400 text-sm">Hỗ trợ: PDF, DOC, DOCX, XLS, XLSX (Tối đa 10MB)</p>
                  <Button size="sm" variant="outline" className="border-slate-200 text-slate-600 mt-4 hover:bg-slate-100">
                    <Upload className="size-4 mr-2" />
                    Chọn file
                  </Button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
                <h3 className="text-slate-800 font-medium mb-4">Hồ sơ hoàn công</h3>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-white/50">
                  <Upload className="size-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 mb-2 font-medium">Kéo thả file vào đây hoặc click để chọn</p>
                  <p className="text-slate-400 text-sm">Hỗ trợ: PDF, DOC, DOCX, XLS, XLSX (Tối đa 10MB)</p>
                  <Button size="sm" variant="outline" className="border-slate-200 text-slate-600 mt-4 hover:bg-slate-100">
                    <Upload className="size-4 mr-2" />
                    Chọn file
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Bridge Components Editing */}
          <TabsContent value="piers" className="flex-1 overflow-auto p-6 min-h-0">
            <div className="space-y-4 text-slate-900">
              <div className="flex justify-between items-center mb-4 text-slate-900">
                <h3 className="text-slate-800 font-medium">Danh sách mố trụ</h3>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                  <Plus className="size-4 mr-2" /> Thêm mố trụ
                </Button>
              </div>
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Ký hiệu</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Loại</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500 text-slate-900">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4"><Input defaultValue="M1" className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4"><Input defaultValue="Mố chữ U" className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4"><Button size="sm" variant="ghost" className="text-red-500"><Trash className="size-4" /></Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spans" className="flex-1 overflow-auto p-6 min-h-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-800 font-medium">Danh sách nhịp cầu</h3>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                  <Plus className="size-4 mr-2" /> Thêm nhịp
                </Button>
              </div>
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Tên nhịp</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Chiều dài</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4"><Input defaultValue="Nhịp 1" className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4"><Input defaultValue="33.0m" className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4"><Button size="sm" variant="ghost" className="text-red-500"><Trash className="size-4" /></Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bearings" className="flex-1 overflow-auto p-6 min-h-0">
             <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-800 font-medium">Danh sách gối cầu</h3>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                  <Plus className="size-4 mr-2" /> Thêm gối
                </Button>
              </div>
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Vị trí</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Loại gối</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4"><Input defaultValue="M1" className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4"><Input defaultValue="Gối cao su" className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4"><Button size="sm" variant="ghost" className="text-red-500"><Trash className="size-4" /></Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Road Details Editing */}
          <TabsContent value="geometry" className="flex-1 overflow-auto p-6 min-h-0">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-slate-800 font-medium border-b pb-2">Thông số mặt cắt</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-slate-500 mb-1 block">Bề rộng nền đường (m)</Label>
                    <Input defaultValue="20.5" className="h-10 bg-white border-slate-200 text-slate-900" />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500 mb-1 block">Bề rộng mặt đường (m)</Label>
                    <Input defaultValue="15.0" className="h-10 bg-white border-slate-200 text-slate-900" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-slate-800 font-medium border-b pb-2">Yêu tố kỹ thuật khác</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-slate-500 mb-1 block">Độ dốc dọc tối đa (%)</Label>
                    <Input defaultValue="4.5" className="h-10 bg-white border-slate-200 text-slate-900" />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500 mb-1 block">Bán kính đường cong tối thiểu (m)</Label>
                    <Input defaultValue="250" className="h-10 bg-white border-slate-200 text-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="legal" className="flex-1 overflow-auto p-6 min-h-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4 text-slate-900">
                <h3 className="text-slate-800 font-medium">Văn bản pháp lý liên quan</h3>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                  <Upload className="size-4 mr-2" /> Tải lên văn bản
                </Button>
              </div>
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Số văn bản</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Nội dung trích yếu</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4"><Input defaultValue="123/QD-UBND" className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4 text-slate-600"><Input defaultValue="Phê duyệt quy hoạch..." className="h-8 py-0 bg-white border-slate-200 text-slate-900" /></td>
                      <td className="py-3 px-4"><Button size="sm" variant="ghost" className="text-red-500"><Trash className="size-4" /></Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
