import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Search, Edit, Map as MapIcon, List as ListIcon, Layers, Trash2 } from "lucide-react";

import { Badge } from "../../components/ui/badge";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";


interface ToChucData {
  id: string;
  tuyenDuong: string;
  lyTrinh: string;
  phuongXa: string;
  phanLoai: string;
  moTa: string;
  tuNgay?: string;
  denNgay?: string;
  ghiChu?: string;
  toaDo?: [number, number];
}

const mockData: ToChucData[] = [
  { id: "1", tuyenDuong: "Quốc lộ 1A (QL1A)", lyTrinh: "Km 0 - Km 2300", phuongXa: "Nhiều phường/xã", phanLoai: "Đường 2 chiều", moTa: "Lưu thông bình thường", tuNgay: "2024-01-01T00:00", denNgay: "2025-12-31T23:59", ghiChu: "", toaDo: [21.0285, 105.8542] },
  { id: "2", tuyenDuong: "Quốc lộ 5 (QL5)", lyTrinh: "Km 0 - Km 105", phuongXa: "Phường Phúc Đồng", phanLoai: "Đường 1 chiều", moTa: "Một chiều ô tô, hai chiều xe máy", tuNgay: "", denNgay: "", ghiChu: "Theo hướng Hải Phòng", toaDo: [21.0425, 105.9012] },
  { id: "3", tuyenDuong: "Quốc lộ 13 (QL13)", lyTrinh: "Km 0 - Km 150", phuongXa: "Xã Phước Bình", phanLoai: "Cấm loại xe", moTa: "Cấm xe tải nặng và container", tuNgay: "", denNgay: "", ghiChu: "Chỉ vào ban ngày", toaDo: [11.0285, 106.8542] },
  { id: "4", tuyenDuong: "Đường tỉnh 741 (DT741)", lyTrinh: "Km 0 - Km 45", phuongXa: "Thị trấn Phước Vĩnh", phanLoai: "Hạn chế tải trọng", moTa: "Cấm xe tải qua cầu trên 10T", tuNgay: "2024-06-01T00:00", denNgay: "", ghiChu: "Bảo vệ cầu yếu", toaDo: [11.3285, 106.8842] },
];

export default function ToChucGiaoThong() {
  const [data, setData] = useState<ToChucData[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ToChucData | null>(null);

  
  const [formData, setFormData] = useState({
    phanLoai: "",
    moTa: "",
    tuNgay: "",
    denNgay: "",
    ghiChu: ""
  });

  const filteredData = data.filter(item => {
    const matchesSearch = item.tuyenDuong.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.phanLoai.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.phanLoai === filterType;
    let matchesDate = true;
    if (filterDate) {
      const filterTime = new Date(filterDate).getTime();
      const start = item.tuNgay ? new Date(item.tuNgay).getTime() : 0;
      const end = item.denNgay ? new Date(item.denNgay).getTime() : Infinity;
      if (filterTime < start || filterTime > end) {
        matchesDate = false;
      }
    }
    return matchesSearch && matchesType && matchesDate;
  });

  const stats = {
    total: data.length,
    twoWay: data.filter(d => d.phanLoai.includes('2 chiều')).length,
    oneWay: data.filter(d => d.phanLoai.includes('1 chiều')).length,
    restricted: data.filter(d => d.phanLoai.includes('Cấm') || d.phanLoai.includes('Hạn chế')).length,
  };

  const handleEdit = (item: ToChucData) => {
    setSelectedItem(item);
    setFormData({
      phanLoai: item.phanLoai,
      moTa: item.moTa,
      tuNgay: item.tuNgay || "",
      denNgay: item.denNgay || "",
      ghiChu: item.ghiChu || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: ToChucData) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setData(data.filter(d => d.id !== selectedItem.id));
      setIsDeleteDialogOpen(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setData(data.map(item => item.id === selectedItem.id ? { ...item, ...formData } : item));
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4 flex flex-col justify-center items-center">
            <span className="text-sm font-medium text-blue-600 mb-1">Tổng số tuyến</span>
            <span className="text-2xl font-bold text-blue-700">{stats.total}</span>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-4 flex flex-col justify-center items-center">
            <span className="text-sm font-medium text-green-600 mb-1">Đường 2 chiều</span>
            <span className="text-2xl font-bold text-green-700">{stats.twoWay}</span>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-4 flex flex-col justify-center items-center">
            <span className="text-sm font-medium text-purple-600 mb-1">Đường 1 chiều</span>
            <span className="text-2xl font-bold text-purple-700">{stats.oneWay}</span>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-100">
          <CardContent className="p-4 flex flex-col justify-center items-center">
            <span className="text-sm font-medium text-orange-600 mb-1">Cấm / Hạn chế xe</span>
            <span className="text-2xl font-bold text-orange-700">{stats.restricted}</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between flex-wrap gap-4 items-center border-b pb-4 mb-4">
            <div className="flex items-center rounded-md border p-1 bg-slate-50/80">
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("list")}
                className="h-8 shadow-none"
              >
                <ListIcon className="h-4 w-4 mr-2" /> Dạng danh sách
              </Button>
              <Button 
                variant={viewMode === "map" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setViewMode("map")}
                className="h-8 shadow-none"
              >
                <MapIcon className="h-4 w-4 mr-2" /> Không gian bản đồ (GIS)
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex flex-1 items-center gap-2 min-w-[250px] relative">
              <Search className="absolute left-3 size-5 text-muted-foreground" />
              <Input
                placeholder="Tìm tuyến đường, phân loại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px] h-10">
                <SelectValue placeholder="Phân loại tổ chức" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả phân loại</SelectItem>
                <SelectItem value="Đường 2 chiều">Đường 2 chiều</SelectItem>
                <SelectItem value="Đường 1 chiều">Đường 1 chiều</SelectItem>
                <SelectItem value="Đường 1 chiều ô tô">Đường 1 chiều ô tô</SelectItem>
                <SelectItem value="Cấm tải trọng">Cấm tải trọng</SelectItem>
                <SelectItem value="Cấm loại xe">Cấm loại xe</SelectItem>
                <SelectItem value="Hạn chế tải trọng">Hạn chế tải trọng</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 border rounded-md px-3 h-10 bg-white shadow-sm border-slate-200">
              <Label className="text-sm text-slate-500 whitespace-nowrap hidden sm:block">Thời gian: </Label>
              <Input 
                type="date" 
                value={filterDate} 
                onChange={(e) => setFilterDate(e.target.value)} 
                className="border-0 p-0 text-sm h-8 w-auto focus-visible:ring-0 shadow-none bg-transparent"
              />
              {filterDate && (
                <button onClick={() => setFilterDate("")} className="text-[10px] bg-red-100 text-red-600 font-semibold px-2 py-1 rounded-sm ml-1">XÓA</button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Danh sách tổ chức giao thông ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-bold">Tuyến đường / Vị trí</TableHead>
                    <TableHead className="font-bold">Lý trình áp dụng</TableHead>
                    <TableHead className="font-bold">Phường/Xã</TableHead>
                    <TableHead className="font-bold">Phân loại tổ chức</TableHead>
                    <TableHead className="font-bold">Thời gian áp dụng</TableHead>
                    <TableHead className="font-bold">Mô tả / Ghi chú</TableHead>
                    <TableHead className="text-right font-bold w-[100px]">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-blue-600">{item.tuyenDuong}</TableCell>
                      <TableCell>{item.lyTrinh}</TableCell>
                      <TableCell className="text-slate-600">{item.phuongXa}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-slate-200 ${item.phanLoai === 'Đường 2 chiều' ? 'bg-green-50 text-green-700' : item.phanLoai.includes('1 chiều') ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'}`}>
                          {item.phanLoai}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs">
                        {item.tuNgay ? (
                          <>
                            <p>Từ: {new Date(item.tuNgay).toLocaleString('vi-VN', {dateStyle: 'short', timeStyle: 'short'})}</p>
                            <p>Đến: {item.denNgay ? new Date(item.denNgay).toLocaleString('vi-VN', {dateStyle: 'short', timeStyle: 'short'}) : 'Không thời hạn'}</p>
                          </>
                        ) : (
                          "Thường xuyên"
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        <p>{item.moTa}</p>
                        {item.ghiChu && <p className="text-xs text-slate-400 mt-1 italic">Lưu ý: {item.ghiChu}</p>}
                      </TableCell>
                      <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="text-slate-600 hover:text-blue-600 hover:bg-slate-50" title="Chỉnh sửa phân luồng">
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item)} className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Xóa phân luồng">
                            <Trash2 className="size-4" />
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-slate-500 py-6">Không tìm thấy dữ liệu tổ chức giao thông</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="h-[600px] flex flex-col relative overflow-hidden ring-1 ring-slate-200">
          <CardHeader className="py-3 border-b z-10 bg-white/95 backdrop-blur shadow-sm flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-600" /> Bản đồ Tổ chức Phân luồng</CardTitle>
            <div className="flex items-center gap-4 text-xs font-semibold px-4 py-2 bg-slate-50 rounded-lg border">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-green-500"></span> Đường 2 chiều</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-purple-500"></span> Đường 1 chiều</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-orange-500"></span> Cấm tải / Hạn chế xe</div>
            </div>
          </CardHeader>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center flex-col text-slate-500 z-0">
               <MapIcon className="h-12 w-12 text-slate-300 mb-2" />
               <p>Hệ thống WebGIS hiển thị tuyến đường tổ chức</p>
               <div className="flex gap-2 font-medium mt-2">
                 <Badge variant="outline" className="bg-white">{stats.twoWay} Đường 2 chiều</Badge>
                 <Badge variant="outline" className="bg-white">{stats.oneWay} Đường 1 chiều</Badge>
                 <Badge variant="outline" className="bg-white">{stats.restricted} Cấm xe tải</Badge>
               </div>
            </div>
            {/* Lớp dữ liệu đa tuyến */}
            <SimpleMapView 
              markers={filteredData.filter(d => d.toaDo).map(item => ({
                id: item.id,
                lat: item.toaDo![0],
                lng: item.toaDo![1],
                name: item.tuyenDuong + ' - ' + item.phanLoai,
                type: item.phanLoai 
              }))} 
              center={[21.0285, 105.8542]}
              zoom={11}
              isActive={viewMode === "map"}
            />
          </div>
        </Card>
      )}



      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tổ chức phân luồng giao thông</DialogTitle>
            <DialogDescription>
              Cập nhật quy định thông hành cho tuyến <strong className="text-blue-600">{selectedItem?.tuyenDuong}</strong> ({selectedItem?.lyTrinh})
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            <div className="space-y-2">
              <Label className="font-medium">Loại phân luồng / Quy định</Label>
              <Select value={formData.phanLoai} onValueChange={(val) => setFormData({...formData, phanLoai: val})}>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder="Chọn loại phân luồng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Đường 2 chiều">Đường 2 chiều (Mặc định)</SelectItem>
                  <SelectItem value="Đường 1 chiều">Đường 1 chiều</SelectItem>
                  <SelectItem value="Đường 1 chiều ô tô">Đường 1 chiều ô tô</SelectItem>
                  <SelectItem value="Cấm tải trọng">Cấm tải trọng</SelectItem>
                  <SelectItem value="Cấm loại xe">Cấm loại xe</SelectItem>
                  <SelectItem value="Cấm theo giờ">Cấm theo giờ</SelectItem>
                  <SelectItem value="Hạn chế tải trọng">Hạn chế tải trọng</SelectItem>
                  <SelectItem value="Cấm xe máy">Cấm xe máy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Mô tả / Hiệu lệnh chi tiết</Label>
              <Input 
                value={formData.moTa} 
                onChange={(e) => setFormData({...formData, moTa: e.target.value})} 
                placeholder="Ví dụ: Cấm xe tải trên 10T từ 6h-9h hoặc Hết cấm tải trọng..."
                className="border-slate-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-medium text-xs text-slate-500">Từ ngày giờ</Label>
                <Input 
                  type="datetime-local" 
                  value={formData.tuNgay} 
                  onChange={(e) => setFormData({...formData, tuNgay: e.target.value})} 
                  className="border-slate-300 h-9"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-xs text-slate-500">Đến ngày giờ</Label>
                <Input 
                  type="datetime-local" 
                  value={formData.denNgay} 
                  onChange={(e) => setFormData({...formData, denNgay: e.target.value})} 
                  className="border-slate-300 h-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Ghi chú thêm</Label>
              <textarea 
                value={formData.ghiChu} 
                onChange={(e) => setFormData({...formData, ghiChu: e.target.value})} 
                placeholder="Nhập ghi chú (nếu có)..."
                className="w-full min-h-[80px] p-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <DialogFooter className="pt-4 mt-6 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl">Hủy bỏ</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCard={{ title: "Tổ chức giao thông" }}
        selectedItem={selectedItem ? {
          fullName: selectedItem.tuyenDuong,
          idNumber: selectedItem.phanLoai,
          registrationDate: selectedItem.lyTrinh
        } : null}
        onConfirmDelete={confirmDelete}
      />
    </div>

  );
}
