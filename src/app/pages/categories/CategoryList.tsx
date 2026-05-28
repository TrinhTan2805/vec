import { useState, useEffect } from "react";
import { Plus, Search, FileDown, Edit, Trash2, Eye, MoreVertical, ChevronRight, Filter } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface CategoryListProps {
  title: string;
  categoryGroup: string;
  initialItems?: any[];
}

export default function CategoryList({ title, categoryGroup, initialItems }: CategoryListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data for categories
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (initialItems) {
      setItems(initialItems);
    } else {
      setItems([
        { id: "1", name: `${title} - Mẫu 1`, code: "CODE-001", description: "Mô tả mẫu số 1", file: "Quy_dinh_001.pdf" },
        { id: "2", name: `${title} - Mẫu 2`, code: "CODE-002", description: "Mô tả mẫu số 2", file: null },
        { id: "3", name: `${title} - Mẫu 3`, code: "CODE-003", description: "Mô tả mẫu số 3", file: "Tai_lieu.docx" },
        { id: "4", name: `${title} - Mẫu 4`, code: "CODE-004", description: "Mô tả mẫu số 4", file: null },
        { id: "5", name: `${title} - Mẫu 5`, code: "CODE-005", description: "Mô tả mẫu số 5", file: "Huong_dan.pdf" },
      ]);
    }
  }, [initialItems, title]);

  const handleDelete = () => {
    setItems(items.filter(item => item.id !== selectedItem?.id));
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const handleExport = () => {
    alert(`Đang xuất danh sách ${title} ra file Excel...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <span>Danh mục</span>
            <ChevronRight className="size-3" />
            <span>{categoryGroup}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={handleExport}
          >
            <FileDown className="size-4 mr-2 text-green-600" />
            Xuất Excel
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="size-4 mr-2" />
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Filters Card */}
      <Card className="p-4 border-slate-200/60 shadow-sm bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              placeholder={`Tìm kiếm ${title.toLowerCase()}...`} 
              className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-slate-200">
            <Filter className="size-4 mr-2 text-slate-500" />
            Lọc nâng cao
          </Button>
        </div>
      </Card>

      {/* Table Section */}
      <Card className="overflow-hidden border-slate-200/60 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">STT</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Mã danh mục</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Tên danh mục</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Mô tả</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">File đính kèm</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, index) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-4 px-6 text-sm text-slate-500 font-medium">{index + 1}</td>
                  <td className="py-4 px-6 text-sm font-mono text-blue-600 font-medium">{item.code}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-slate-900 block">{item.name}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 max-w-xs truncate">{item.description}</td>
                  <td className="py-4 px-6">
                    {item.file ? (
                      <a href="#" className="flex w-max items-center gap-1.5 text-sm text-blue-600 hover:underline font-medium">
                        <FileDown className="size-4" />
                        {item.file}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400 italic">Không có</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="size-8 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="size-8 p-0 text-slate-500 hover:text-amber-600 hover:bg-amber-50">
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
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">Hiển thị 1-5 trên 42 bản ghi</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="h-8 text-xs">Trước</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-white text-blue-600 border-blue-200">1</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-white">2</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-white">3</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-white">Sau</Button>
          </div>
        </div>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm {title.toLowerCase()} mới</DialogTitle>
            <DialogDescription>
              Nhập đầy đủ thông tin bên dưới để thêm vào danh mục.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Mã danh mục <span className="text-red-500">*</span></label>
              <Input placeholder="Ví dụ: TYPE-01" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tên {title.toLowerCase()} <span className="text-red-500">*</span></label>
              <Input placeholder={`Nhập tên ${title.toLowerCase()}...`} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Mô tả</label>
              <Input placeholder="Nhập mô tả thêm..." />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">File đính kèm</label>
              <div className="flex items-center gap-2">
                <Input type="file" className="cursor-pointer file:text-sm file:font-medium file:text-blue-600 file:bg-blue-50 file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:bg-blue-100" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddDialogOpen(false)}>Lưu dữ liệu</Button>
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
              Bạn có chắc chắn muốn xóa <strong>{selectedItem?.name}</strong>? 
              Dữ liệu sau khi xóa sẽ không thể khôi phục.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2 pb-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Hủy bỏ</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600">Xác nhận xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
