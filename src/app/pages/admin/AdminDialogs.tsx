import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Save, AlertCircle, Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useState, useEffect } from "react";

interface AdminItem {
  id: number;
  code: string;
  name: string;
  type: string;
  actor: string;
  status: "active" | "maintenance" | "inactive";
  updated: string;
  description?: string;
}

interface AdminEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  selectedItem: AdminItem | null;
  onSave: (data: any) => void;
}

export function AdminEditDialog({ open, onOpenChange, title, selectedItem, onSave }: AdminEditDialogProps) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    actor: "",
    status: "active",
    description: "",
    email: "",
    phone: "",
    department: "",
    updated: "",
  });

  const [groupUsers, setGroupUsers] = useState<{id: number, name: string, username: string}[]>([]);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: "Người dùng mới " + Math.floor(Math.random() * 100),
      username: "user" + Math.floor(Math.random() * 1000)
    };
    setGroupUsers([...groupUsers, newUser]);
  };

  const handleRemoveUser = (id: number) => {
    setGroupUsers(groupUsers.filter(u => u.id !== id));
  };

  useEffect(() => {
    if (selectedItem && open) {
      setFormData({
        code: selectedItem.code,
        name: selectedItem.name,
        type: selectedItem.type,
        actor: selectedItem.actor,
        status: selectedItem.status,
        description: selectedItem.description || "",
        email: selectedItem.code.toLowerCase() + "@hanoi.gov.vn",
        phone: "09" + Math.floor(10000000 + Math.random() * 90000000),
        department: selectedItem.actor,
        updated: selectedItem.updated || new Date().toISOString().split('T')[0],
      });
    } else if (open) {
      setFormData({
        code: "",
        name: "",
        type: "",
        actor: "Admin (Current User)",
        status: "active",
        description: "",
        email: "",
        phone: "",
        department: "",
        updated: new Date().toISOString().split('T')[0],
      });
    }
    
    if (open && title === "Nhóm quyền người dùng") {
      setGroupUsers([
        { id: 1, name: "Nguyễn Văn A", username: "nguyenvana" },
        { id: 2, name: "Trần Thị B", username: "tranthib" }
      ]);
    }
  }, [selectedItem, open, title]);

  const handleSave = () => {
    if (!formData.code || !formData.name) {
      alert("Hệ thống kiểm tra điều kiện dữ liệu: Vui lòng nhập đầy đủ Mã và Tên. Lưu không thành công!");
      return;
    }
    
    // Validate custom constraints if needed
    
    alert(`Hệ thống đã kiểm tra điều kiện dữ liệu.\nLưu thông tin ${title} thành công!`);
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle>{selectedItem ? "Sửa" : "Thêm mới"} {title}</DialogTitle>
          <DialogDescription>
            Nhập các thông tin cấu hình bên dưới và nhấn Lưu để cập nhật hệ thống.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-left font-medium text-slate-700">Mã/ID</Label>
            <Input id="code" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="col-span-3" placeholder="VD: SYNC-001" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left font-medium text-slate-700">Tên/Nội dung</Label>
            <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-left font-medium text-slate-700">Loại</Label>
            <Input id="type" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="col-span-3" placeholder="VD: Tự động, Thủ công..." />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-left font-medium text-slate-700">Trạng thái</Label>
            <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="maintenance">Chờ duyệt / Bảo trì</SelectItem>
                <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left font-medium text-slate-700">Người thực hiện</Label>
            <Input value={formData.actor} disabled className="col-span-3 bg-slate-50 text-slate-500" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left font-medium text-slate-700">Cập nhật</Label>
            <Input value={formData.updated} disabled className="col-span-3 bg-slate-50 text-slate-500" />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="desc" className="text-left font-medium text-slate-700 pt-2">Ghi chú</Label>
            <Textarea id="desc" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="col-span-3" rows={3} />
          </div>

          {title === "Đồng bộ tài khoản SSO" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-left font-medium text-slate-700">Email</Label>
                <Input id="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-left font-medium text-slate-700">Điện thoại</Label>
                <Input id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-left font-medium text-slate-700">Đơn vị công tác</Label>
                <Input id="department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="col-span-3" />
              </div>
            </>
          )}

          {title === "Nhóm quyền người dùng" && (
            <div className="col-span-4 mt-4 border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-left font-semibold text-slate-800">Danh sách người dùng trong nhóm</Label>
                <Button size="sm" variant="outline" className="h-8 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" onClick={handleAddUser} type="button">
                  <Plus className="size-4 mr-1" /> Thêm người dùng
                </Button>
              </div>
              <div className="border rounded-md overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Tài khoản</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead className="w-[80px] text-center">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-slate-700 py-2">{user.username}</TableCell>
                        <TableCell className="py-2">{user.name}</TableCell>
                        <TableCell className="text-center py-2">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleRemoveUser(user.id)} type="button">
                            <Trash2 className="size-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {groupUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-slate-500 py-4">Chưa có người dùng nào trong nhóm</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave}>
            <Save className="size-4 mr-2" /> Lưu thông tin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AdminDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  selectedItem: AdminItem | null;
}

export function AdminDetailDialog({ open, onOpenChange, title, selectedItem }: AdminDetailDialogProps) {
  if (!selectedItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle>Chi tiết {title}</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của bản ghi.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 text-sm text-slate-700">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-left font-medium text-slate-700">Mã/ID</span>
            <Input readOnly value={selectedItem.code} className="col-span-3 bg-slate-50" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-left font-medium text-slate-700">Tên/Nội dung</span>
            <Input readOnly value={selectedItem.name} className="col-span-3 bg-slate-50" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-left font-medium text-slate-700">Loại</span>
            <Input readOnly value={selectedItem.type} className="col-span-3 bg-slate-50" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-left font-medium text-slate-700">Trạng thái</span>
            <div className="col-span-3 flex items-center h-10 px-3 rounded-md border border-slate-200 bg-slate-50">
              {selectedItem.status === 'active' && <span className="text-green-600 font-medium">Hoạt động</span>}
              {selectedItem.status === 'maintenance' && <span className="text-amber-600 font-medium">Chờ duyệt / Bảo trì</span>}
              {selectedItem.status === 'inactive' && <span className="text-slate-500 font-medium">Vô hiệu hóa</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-left font-medium text-slate-700">Người thực hiện</span>
            <Input readOnly value={selectedItem.actor} className="col-span-3 bg-slate-50 text-slate-500" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-left font-medium text-slate-700">Cập nhật</span>
            <Input readOnly value={selectedItem.updated} className="col-span-3 bg-slate-50 text-slate-500" />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <span className="text-left font-medium text-slate-700 pt-2">Ghi chú</span>
            <Textarea readOnly value={selectedItem.description || ""} rows={3} className="col-span-3 bg-slate-50 text-slate-700" />
          </div>

          {title === "Nhóm quyền người dùng" && (
            <div className="col-span-4 mt-4 border-t pt-4">
              <Label className="text-left font-semibold text-slate-800 mb-3 block">Danh sách người dùng trong nhóm</Label>
              <div className="border rounded-md overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Tài khoản</TableHead>
                      <TableHead>Họ tên</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700 py-2">nguyenvana</TableCell>
                      <TableCell className="py-2">Nguyễn Văn A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-slate-700 py-2">tranthib</TableCell>
                      <TableCell className="py-2">Trần Thị B</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
