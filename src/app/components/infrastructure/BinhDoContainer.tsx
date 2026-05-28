import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, FileDown, Plus, Edit, Trash2, Eye, Map, Download, Layers, FileText, X, Save, Info, Filter } from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { LinearRouteDiagram, LinearRouteItem } from "../map/LinearRouteDiagram";

const ASSET_OPTIONS = [
  { id: "bien-bao", label: "Biển báo hiệu" },
  { id: "cot-moc", label: "Cột mốc, cọc tiêu" },
  { id: "chieu-sang", label: "Đèn chiếu sáng" },
  { id: "thoat-nuoc", label: "Rãnh thoát nước" },
];

const ISSUE_OPTIONS = [
  { id: "sua-chua", label: "Bề mặt cần sửa chữa" },
  { id: "vi-pham", label: "Vi phạm HLATGT" },
  { id: "tai-nan", label: "Điểm đen tai nạn" },
  { id: "ngap-ung", label: "Điểm ngập úng" },
];

interface OverlayItem {
  id: string;
  name: string;
  type: string;
  km: string;
  posX: number; // percentage 0-100
  posY: number; // percentage 0-100
  category: "asset" | "legal" | "repair";
}

interface BinhDoContainerProps {
  title: string;
  type: "road" | "bridge" | "intersection";
  imageUrl: string;
}

export const BinhDoContainer: React.FC<BinhDoContainerProps> = ({ title, type, imageUrl }) => {
  const [showAssets, setShowAssets] = useState(true);
  const [showLegal, setShowLegal] = useState(false);
  const [showRepairs, setShowRepairs] = useState(type === "road");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([]);
  const [selectedIssueTypes, setSelectedIssueTypes] = useState<string[]>([]);

  const [items, setItems] = useState<OverlayItem[]>([
    { id: "1", name: "Biển báo P.102", type: "Biển báo cấm", km: "Km12+500", posX: 25, posY: 45, category: "asset" },
    { id: "2", name: "Cột Km 13+000", type: "Cột mốc", km: "Km13+000", posX: 66, posY: 45, category: "asset" },
    { id: "3", name: "Quyết định 123/QĐ-UBND", type: "Văn bản pháp lý", km: "Km12+800", posX: 50, posY: 30, category: "legal" },
    { id: "4", name: "Sửa chữa mặt đường đoạn 1", type: "Bảo trì", km: "Km12+100 - Km12+400", posX: 15, posY: 55, category: "repair" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OverlayItem | null>(null);
  const [formData, setFormData] = useState<Partial<OverlayItem>>({
    name: "",
    type: "",
    km: "",
    category: "asset"
  });

  const filteredItems = items.filter(item => {
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (item.category === "asset" && !showAssets) return false;
    if (item.category === "legal" && !showLegal) return false;
    if (item.category === "repair" && !showRepairs) return false;
    return true;
  });

  const handleAddItem = (e: React.MouseEvent) => {
    // Determine click position relative to the container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setFormData({
      name: "",
      type: "",
      km: "Km...",
      posX: x,
      posY: y,
      category: "asset"
    });
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: OverlayItem) => {
    setFormData(item);
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa đối tượng này?")) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (selectedItem) {
      setItems(items.map(i => i.id === selectedItem.id ? { ...i, ...formData } as OverlayItem : i));
    } else {
      const newItem: OverlayItem = {
        id: Date.now().toString(),
        name: formData.name || "Đối tượng mới",
        type: formData.type || "Chưa phân loại",
        km: formData.km || "Km...",
        posX: 50,
        posY: 50,
        category: formData.category as any || "asset"
      };
      setItems([...items, newItem]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-blue-100 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Main Filter Bar */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 mb-6 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <Input 
                  placeholder="Tìm kiếm đối tượng (Km, tên, loại)..." 
                  className="pl-12 h-11 border-slate-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-11 border-blue-200 text-blue-700 hover:bg-white hover:text-blue-800 transition-all font-semibold shadow-sm rounded-xl">
                  <Download className="mr-2 size-4" />
                  Báo cáo PDF
                </Button>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${type === 'bridge' || type === 'intersection' ? 'lg:grid-cols-6' : 'lg:grid-cols-5'} gap-3 pt-3 border-t border-slate-200/60`}>
              {type === "bridge" && (
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-1.5">
                    <Filter className="size-3 text-blue-500" />
                    Tên cầu
                  </Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-300 transition-colors">
                      <SelectValue placeholder="Chọn cầu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả các cầu</SelectItem>
                      <SelectItem value="nhat-tan">Cầu Nhật Tân</SelectItem>
                      <SelectItem value="thanh-tri">Cầu Thanh Trì</SelectItem>
                      <SelectItem value="vinh-tuy">Cầu Vĩnh Tuy</SelectItem>
                      <SelectItem value="chuong-duong">Cầu Chương Dương</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {type === "intersection" && (
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-1.5">
                    <Filter className="size-3 text-blue-500" />
                    Tên nút giao
                  </Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-10 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-300 transition-colors">
                      <SelectValue placeholder="Chọn nút giao" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả nút giao</SelectItem>
                      <SelectItem value="mai-dich">Nút giao Mai Dịch</SelectItem>
                      <SelectItem value="nga-tu-so">Nút giao Ngã Tư Sở</SelectItem>
                      <SelectItem value="thanh-xuan">Nút giao Thanh Xuân</SelectItem>
                      <SelectItem value="phap-van">Nút giao Pháp Vân</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-1.5">
                  {(type !== 'bridge' && type !== 'intersection') && <Filter className="size-3 text-blue-500" />}
                  Tuyến đường
                </Label>
                <Select defaultValue="all">
                  <SelectTrigger className="h-10 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-300 transition-colors">
                    <SelectValue placeholder="Chọn tuyến đường" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả tuyến đường</SelectItem>
                    <SelectItem value="ql1a">Quốc lộ 1A</SelectItem>
                    <SelectItem value="ql5">Quốc lộ 5</SelectItem>
                    <SelectItem value="vd3">Vành đai 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">Lý trình đầu</Label>
                <Input placeholder="Ví dụ: Km0+000" className="h-10 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-300 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">Lý trình cuối</Label>
                <Input placeholder="Ví dụ: Km10+000" className="h-10 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-300 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1 font-sans">Tài sản hiển thị</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-10 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-300 justify-between font-normal px-3">
                      <span className="truncate">
                        {selectedAssetTypes.length === 0 ? "Tất cả tài sản" : 
                         selectedAssetTypes.length === ASSET_OPTIONS.length ? "Tất cả tài sản" :
                         `${selectedAssetTypes.length} loại tài sản`}
                      </span>
                      <Filter className="size-3.5 text-slate-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-2 rounded-xl border-slate-200 shadow-xl" align="start">
                    <div className="space-y-1">
                      {ASSET_OPTIONS.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" 
                          onClick={() => {
                            const newSelected = selectedAssetTypes.includes(option.id)
                              ? selectedAssetTypes.filter(id => id !== option.id)
                              : [...selectedAssetTypes, option.id];
                            setSelectedAssetTypes(newSelected);
                          }}
                        >
                          <Checkbox 
                            id={`asset-${option.id}`} 
                            checked={selectedAssetTypes.includes(option.id)}
                            onCheckedChange={() => {}} // Swallowed by div onClick for better hit area
                          />
                          <Label htmlFor={`asset-${option.id}`} className="text-sm font-medium cursor-pointer flex-1">{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1 font-sans">Vấn đề / Vi phạm</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-10 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-300 justify-between font-normal px-3">
                      <span className="truncate">
                        {selectedIssueTypes.length === 0 ? "Tất cả vấn đề / vi phạm" : 
                         selectedIssueTypes.length === ISSUE_OPTIONS.length ? "Tất cả vấn đề / vi phạm" :
                         `${selectedIssueTypes.length} loại vấn đề`}
                      </span>
                      <Filter className="size-3.5 text-slate-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-2 rounded-xl border-slate-200 shadow-xl" align="start">
                    <div className="space-y-1">
                      {ISSUE_OPTIONS.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                          onClick={() => {
                            const newSelected = selectedIssueTypes.includes(option.id)
                              ? selectedIssueTypes.filter(id => id !== option.id)
                              : [...selectedIssueTypes, option.id];
                            setSelectedIssueTypes(newSelected);
                          }}
                        >
                          <Checkbox 
                            id={`issue-${option.id}`} 
                            checked={selectedIssueTypes.includes(option.id)}
                            onCheckedChange={() => {}} // Swallowed by div onClick
                          />
                          <Label htmlFor={`issue-${option.id}`} className="text-sm font-medium cursor-pointer flex-1">{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Interactive Plan View */}
          <div className="mb-4">
             <LinearRouteDiagram 
               routeName={title}
               data={filteredItems.map(item => {
                 let startKm = item.km;
                 let endKm = item.km;
                 // Parse range like "Km12+100 - Km12+400"
                 if (item.km.includes("-")) {
                   const parts = item.km.split("-");
                   startKm = parts[0].trim();
                   endKm = parts[1].trim();
                 }

                 return {
                   id: item.id,
                   startKm,
                   endKm,
                   title: item.name,
                   category: item.category,
                   position: "Phải", // Mock position for rendering
                   status: item.category === "repair" ? "ongoing" : undefined
                 };
               })}
             />
             <div className="mt-4 flex gap-4 bg-slate-50 border p-3 rounded-xl justify-center items-center backdrop-blur-md">
                 <div className="text-sm font-semibold text-slate-700">Ghi chú nhanh:</div>
                 <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                   <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" /> Công trình phụ trợ
                 </div>
                 <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                   <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" /> Văn bản pháp lý
                 </div>
                 <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                   <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" /> Hoạt động bảo trì
                 </div>
                 <Button onClick={handleAddItem} size="sm" className="ml-auto bg-slate-800 text-white hover:bg-slate-700 h-8 rounded-lg">
                   <Plus className="mr-1 size-3" /> Thêm đối tượng
                 </Button>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table Section */}
      <Card className="border-slate-200 shadow-xl overflow-hidden rounded-3xl">
        <CardHeader className="py-5 px-6 border-b bg-slate-50/50">
          <CardTitle className="text-md font-bold text-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TableIcon className="size-5 text-slate-500" />
              Chi tiết các hạng mục ({filteredItems.length})
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100/50 text-slate-500 font-semibold border-b">
                <tr>
                  <th className="px-6 py-4 text-left">STT</th>
                  <th className="px-6 py-4 text-left">Tên đối tượng</th>
                  <th className="px-6 py-4 text-left">Lý trình</th>
                  <th className="px-6 py-4 text-left">Loại hạng mục</th>
                  <th className="px-6 py-4 text-left">Phân loại</th>
                  <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="px-6 py-4 font-bold text-blue-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{item.km}</td>
                    <td className="px-6 py-4 italic text-slate-500">{item.type}</td>
                    <td className="px-6 py-4">
                      <Badge className={`
                        shadow-none border-none px-3
                        ${item.category === "asset" ? "bg-blue-50 text-blue-600" : ""}
                        ${item.category === "legal" ? "bg-amber-50 text-amber-600" : ""}
                        ${item.category === "repair" ? "bg-emerald-50 text-emerald-600" : ""}
                      `}>
                        {item.category === "asset" ? "Hạng mục PT" : ""}
                        {item.category === "legal" ? "Văn bản PL" : ""}
                        {item.category === "repair" ? "Bảo trì" : ""}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-all duration-300">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-600 hover:bg-blue-50" onClick={() => handleEditItem(item)}><Eye className="size-5" /></Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-600 hover:bg-slate-100" onClick={() => handleEditItem(item)}><Edit className="size-5" /></Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-red-600 hover:bg-red-50" onClick={() => handleDeleteItem(item.id)}><Trash2 className="size-5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                {selectedItem ? <Edit className="size-5 text-blue-600" /> : <Plus className="size-5 text-blue-600" />}
              </div>
              {selectedItem ? "Cập nhật hạ tầng" : "Thêm mới hạ tầng"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Tên đối tượng</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                placeholder="Nhập tên biển báo, công trình..."
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Lý trình (Km)</Label>
                <Input 
                  value={formData.km} 
                  onChange={(e) => setFormData({ ...formData, km: e.target.value })} 
                  placeholder="Km12+..."
                  className="rounded-xl border-slate-200 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Phân loại</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val: any) => setFormData({ ...formData, category: val })}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asset">Công trình phụ trợ</SelectItem>
                    <SelectItem value="legal">Văn bản pháp lý</SelectItem>
                    <SelectItem value="repair">Sửa chữa mặt đường</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Loại cụ thể</Label>
              <Input 
                value={formData.type} 
                onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
                placeholder="Ví dụ: Biển báo cấm, Cột mốc..."
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 pt-6 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-11 px-6 font-semibold">Hủy</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-8 font-extrabold shadow-lg shadow-blue-100">
              <Save className="mr-2 size-4" />
              Lưu dữ liệu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FilterToggle = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <Button 
    variant={active ? "secondary" : "ghost"} 
    size="sm" 
    onClick={onClick}
    className={`
      h-9 rounded-xl px-4 font-semibold transition-all
      ${active ? "bg-white shadow-sm text-blue-700 ring-1 ring-blue-100/50" : "text-slate-500 hover:text-slate-700"}
    `}
  >
    <span className={`mr-2 transition-colors ${active ? "text-blue-600" : "text-slate-400"}`}>{icon}</span>
    {label}
  </Button>
);

const Construction = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
    <polyline points="7.5 19.79 7.5 14.6 3 12" />
    <polyline points="21 12 16.5 14.6 16.5 19.79" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TableIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);
