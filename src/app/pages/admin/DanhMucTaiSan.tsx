import { useState } from "react";
import { Plus, Search, Edit, Trash2, Settings2 } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface TaiSanItem {
  id: string;
  code: string;
  name: string;
  description: string;
}

export default function DanhMucTaiSan() {
  const [items, setItems] = useState<TaiSanItem[]>([
    { id: "1", code: "TS_01", name: "Cột Km", description: "Cột Km trên tuyến" },
    { id: "2", code: "TS_02", name: "Cột H", description: "Cột H trên tuyến" },
    { id: "3", code: "TS_03", name: "Rãnh dọc", description: "Rãnh thoát nước dọc" },
    { id: "4", code: "TS_04", name: "Hộ lan", description: "Hệ thống hộ lan tôn lượn sóng" },
    { id: "5", code: "TS_05", name: "Camera giám sát", description: "Camera quan sát trên tuyến" },
    { id: "6", code: "TS_06", name: "Biển báo điện tử", description: "VMS" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TaiSanItem | null>(null);

  const [formData, setFormData] = useState({ code: "", name: "", description: "" });

  const handleAdd = () => {
    if (!formData.name || !formData.code) {
      toast.error(`Vui lòng nhập đủ Mã và Tên tài sản!`);
      return;
    }
    const newItem: TaiSanItem = {
      id: Date.now().toString(),
      code: formData.code,
      name: formData.name,
      description: formData.description,
    };
    setItems([...items, newItem]);
    setIsAddDialogOpen(false);
    setFormData({ code: "", name: "", description: "" });
    toast.success("Thêm mới danh mục thành công.");
  };

  const handleEdit = () => {
    if (!formData.name || !formData.code) {
      toast.error(`Vui lòng nhập đủ Mã và Tên tài sản!`);
      return;
    }
    setItems(items.map(item => item.id === selectedItem?.id ? { ...item, ...formData } : item));
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    setFormData({ code: "", name: "", description: "" });
    toast.success("Cập nhật danh mục thành công.");
  };

  const handleDelete = () => {
    setItems(items.filter(item => item.id !== selectedItem?.id));
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
    toast.success("Xóa danh mục thành công.");
  };

  const openEditDialog = (item: TaiSanItem) => {
    setSelectedItem(item);
    setFormData({ code: item.code, name: item.name, description: item.description });
    setIsEditDialogOpen(true);
  };

  const openConfigDialog = (item: TaiSanItem) => {
    setSelectedItem(item);
    setIsConfigDialogOpen(true);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý danh mục tài sản trên tuyến</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
            onClick={() => {
              setFormData({ code: "", name: "", description: "" });
              setIsAddDialogOpen(true);
            }}
          >
            <Plus className="size-4 mr-2" />
            Thêm mới
          </Button>
        </div>
      </div>

      <Card className="p-4 border-slate-200/60 shadow-sm bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              placeholder={`Tìm kiếm tài sản...`} 
              className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-slate-200/60 shadow-md bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider w-16">STT</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider w-32">Mã TS</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Tên tài sản</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Mô tả</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right w-36">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-4 px-6 text-sm text-slate-500 font-medium">{index + 1}</td>
                  <td className="py-4 px-6 text-sm font-mono text-blue-600 font-medium">{item.code}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-slate-900 block">{item.name}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{item.description}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="size-8 p-0 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => openConfigDialog(item)} title="Cấu hình hệ tọa độ & trường">
                        <Settings2 className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="size-8 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50" onClick={() => openEditDialog(item)}>
                        <Edit className="size-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="size-8 p-0 text-slate-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Không tìm thấy dữ liệu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm mới tài sản</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Mã tài sản <span className="text-red-500">*</span></label>
              <Input value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder={`Nhập mã...`} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tên tài sản <span className="text-red-500">*</span></label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={`Nhập tên...`} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Mô tả</label>
              <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Nhập mô tả thêm..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAdd}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cập nhật tài sản</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Mã tài sản <span className="text-red-500">*</span></label>
              <Input value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tên tài sản <span className="text-red-500">*</span></label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Mô tả</label>
              <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleEdit}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader className="pt-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">Xác nhận xóa</DialogTitle>
            <DialogDescription className="text-center">
              Bạn có chắc chắn muốn xóa tài sản này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2 pb-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Hủy bỏ</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600">Xác nhận xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Config Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cấu hình thuộc tính tài sản: {selectedItem?.name}</DialogTitle>
            <DialogDescription>
              Tùy chỉnh hệ tọa độ, kiểu dữ liệu, và các trường thông tin hiển thị.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="toado" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="toado">Hệ tọa độ & Kiểu DL</TabsTrigger>
              <TabsTrigger value="truong">Trường thông tin</TabsTrigger>
              <TabsTrigger value="nhan">Nhãn hiển thị</TabsTrigger>
            </TabsList>
            
            <TabsContent value="toado" className="p-4 border rounded-md mt-2 space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Hệ tọa độ</label>
                <Input defaultValue="VN-2000" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Kiểu dữ liệu hình học (Geometry Type)</label>
                <Input defaultValue="Point" />
              </div>
              <Button size="sm">Lưu cấu hình</Button>
            </TabsContent>
            
            <TabsContent value="truong" className="p-4 border rounded-md mt-2 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">Danh sách trường dữ liệu</h3>
                <Button size="sm" variant="outline"><Plus className="size-4 mr-1"/> Thêm trường</Button>
              </div>
              <div className="text-sm text-slate-500 border p-4 rounded-md text-center bg-slate-50">
                Chức năng thêm, sửa, xóa trường dữ liệu sẽ được hiển thị ở đây.
              </div>
            </TabsContent>
            
            <TabsContent value="nhan" className="p-4 border rounded-md mt-2 space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nhãn hiển thị mặc định trên bản đồ</label>
                <Input defaultValue="{name} - {code}" />
              </div>
              <div className="text-sm text-slate-500 border p-4 rounded-md text-center bg-slate-50 mt-4">
                Chức năng cấu hình nhãn hiển thị và kiểu trường (String, Number, Date, v.v.)
              </div>
              <Button size="sm">Lưu cấu hình</Button>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button onClick={() => setIsConfigDialogOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
