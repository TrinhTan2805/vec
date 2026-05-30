import { useState } from "react";
import { Plus, Search, ChevronRight, Save, Trash2 } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { cn } from "../../components/ui/utils";

interface FunctionItem {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  order: string;
  linkedFeature: string;
  icon: string;
  active: boolean;
}

const initialItems: FunctionItem[] = [
  { id: "1", name: "Tổng quan", code: "TQ", parentId: null, order: "1", linkedFeature: "", icon: "", active: true },
  { id: "2", name: "Quản lý thu thập", code: "QLTT", parentId: null, order: "2", linkedFeature: "", icon: "", active: true },
  { id: "3", name: "Xử lý dữ liệu", code: "XLDL", parentId: null, order: "3", linkedFeature: "", icon: "", active: true },
  { id: "4", name: "Quản lý danh mục", code: "QLDM", parentId: null, order: "4", linkedFeature: "", icon: "", active: true },
  { id: "5", name: "Dữ liệu mở", code: "DLM", parentId: null, order: "5", linkedFeature: "", icon: "", active: true },
  { id: "6", name: "Quản lý dữ liệu chủ", code: "QLDLC", parentId: null, order: "6", linkedFeature: "", icon: "", active: true },
  { id: "7", name: "Cung cấp dữ liệu", code: "CCDL", parentId: null, order: "7", linkedFeature: "", icon: "", active: true },
  { id: "8", name: "Quản trị & vận hành", code: "QTVH", parentId: null, order: "8", linkedFeature: "", icon: "", active: true },
];

export default function DanhMucPhanQuyen() {
  const [items, setItems] = useState<FunctionItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<FunctionItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<FunctionItem>>({
    name: "",
    code: "",
    parentId: "null",
    order: "",
    linkedFeature: "",
    icon: "",
    active: true,
  });

  const handleSelect = (item: FunctionItem) => {
    setSelectedItem(item);
    setIsAdding(false);
    setFormData({
      name: item.name,
      code: item.code,
      parentId: item.parentId || "null",
      order: item.order,
      linkedFeature: item.linkedFeature,
      icon: item.icon,
      active: item.active,
    });
  };

  const handleAddNew = () => {
    setSelectedItem(null);
    setIsAdding(true);
    setFormData({
      name: "",
      code: "",
      parentId: "null",
      order: "1",
      linkedFeature: "",
      icon: "",
      active: true,
    });
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập tên chức năng!");
      return;
    }

    if (isAdding) {
      const newItem: FunctionItem = {
        id: Date.now().toString(),
        name: formData.name || "",
        code: formData.code || "",
        parentId: formData.parentId === "null" ? null : (formData.parentId || null),
        order: formData.order || "1",
        linkedFeature: formData.linkedFeature || "",
        icon: formData.icon || "",
        active: formData.active ?? true,
      };
      setItems([...items, newItem]);
      setIsAdding(false);
      setSelectedItem(newItem);
      toast.success("Thêm mới danh mục thành công.");
    } else if (selectedItem) {
      setItems(items.map(item => item.id === selectedItem.id ? { ...item, ...formData as FunctionItem } : item));
      toast.success("Cập nhật danh mục thành công.");
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      setItems(items.filter(item => item.id !== selectedItem.id));
      setSelectedItem(null);
      setFormData({
        name: "",
        code: "",
        parentId: "null",
        order: "",
        linkedFeature: "",
        icon: "",
        active: true,
      });
      toast.success("Xóa danh mục thành công.");
    }
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 p-4 animate-in fade-in duration-500">
      
      {/* Left Sidebar Menu */}
      <Card className="w-[300px] flex flex-col border-slate-200/60 shadow-sm bg-white overflow-hidden shrink-0">
        <div className="p-4 border-b border-slate-100 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              placeholder="Tìm kiếm menu..." 
              className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 rounded-lg h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-10 rounded-lg font-medium"
            onClick={handleAddNew}
          >
            <Plus className="size-4 mr-2" />
            Thêm mới
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {filteredItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors text-left",
                selectedItem?.id === item.id 
                  ? "bg-blue-50 text-blue-700 font-medium" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-2">
                <ChevronRight className={cn("size-3.5 text-slate-400", selectedItem?.id === item.id && "text-blue-500")} />
                <span>{item.name}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Right Content Form */}
      <Card className="flex-1 flex flex-col border-slate-200/60 shadow-sm bg-white overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            {isAdding ? "Thêm mới chức năng:" : "Cập nhật chức năng:"}
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-4xl">
            
            {/* Row 1 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-600">Chức năng cha</Label>
              <Select value={formData.parentId || "null"} onValueChange={(v) => setFormData({...formData, parentId: v})}>
                <SelectTrigger className="border-slate-200 h-10">
                  <SelectValue placeholder="Chọn chức năng cha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Chọn chức năng cha</SelectItem>
                  {items.map(item => (
                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-600">Số thứ tự</Label>
              <Input 
                value={formData.order} 
                onChange={(e) => setFormData({...formData, order: e.target.value})} 
                className="border-slate-200 h-10"
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-600">Tên chức năng <span className="text-red-500">*</span></Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="border-slate-200 h-10"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-600">Mã chức năng</Label>
              <Input 
                value={formData.code} 
                onChange={(e) => setFormData({...formData, code: e.target.value})} 
                className="border-slate-200 h-10"
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-600">Tính năng liên kết</Label>
              <Select value={formData.linkedFeature || "null"} onValueChange={(v) => setFormData({...formData, linkedFeature: v === "null" ? "" : v})}>
                <SelectTrigger className="border-slate-200 h-10">
                  <SelectValue placeholder="-- Chọn tính năng liên kết --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">-- Chọn tính năng liên kết --</SelectItem>
                  <SelectItem value="feature1">Tính năng 1</SelectItem>
                  <SelectItem value="feature2">Tính năng 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-600">Chọn icon</Label>
              <Select value={formData.icon || "null"} onValueChange={(v) => setFormData({...formData, icon: v === "null" ? "" : v})}>
                <SelectTrigger className="border-slate-200 h-10">
                  <SelectValue placeholder="-- Chọn icon --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">-- Chọn icon --</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="settings">Settings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 4 */}
            <div className="col-span-2 flex items-center gap-3 pt-2">
              <Label className="text-sm font-medium text-slate-600 min-w-[120px]">Trạng thái hoạt động</Label>
              <Switch 
                checked={formData.active} 
                onCheckedChange={(c) => setFormData({...formData, active: c})} 
              />
              <span className="text-sm text-slate-600">{formData.active ? "Hoạt động" : "Ngừng hoạt động"}</span>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
            onClick={handleSave}
          >
            <Save className="size-4 mr-2" />
            Lưu
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white min-w-[100px]"
            onClick={handleDelete}
            disabled={isAdding || !selectedItem}
          >
            <Trash2 className="size-4 mr-2" />
            Xóa
          </Button>
        </div>
      </Card>

    </div>
  );
}
