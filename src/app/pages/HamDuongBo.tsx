import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, X, Save, LayoutDashboard, Layers, CircleDot, BarChart3, AlertTriangle, Route, Map as MapIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { SimpleMapView } from "../components/map/SimpleMapView";
import { DetailDialog } from "../components/infrastructure/DetailDialog";
import { ImportDialog } from "../components/infrastructure/ImportDialog";
import { ListHeaderStats } from "../components/infrastructure/ListHeaderStats";

interface HamDuongBo {
  id: string;
  maHam: string;
  tenHam: string;
  tenLoaiHam: string;
  diemDau: string;
  khcLyTrinh: string;
  diemCuoi: string;
  donViQL: string;
  tinhTrang: string;
  ghiChu: string;
}

const mockData: HamDuongBo[] = [
  { id:"1", maHam:"TU-001", tenHam:"Hầm Kim Liên", tenLoaiHam:"Hầm chui đô thị", diemDau:"Ngã tư Đại Cồ Việt", khcLyTrinh:"340m", diemCuoi:"Ngã tư Chùa Bộc", donViQL:"Sở GTVT Hà Nội", tinhTrang:"Hoạt động", ghiChu:"Hầm chui cho phương tiện cơ giới" },
  { id:"2", maHam:"TU-002", tenHam:"Hầm Văn Cao - Liễu Giai", tenLoaiHam:"Hầm chui đô thị", diemDau:"Ngã sáu Đào Tấn", khcLyTrinh:"480m", diemCuoi:"Đường Liễu Giai", donViQL:"Sở GTVT Hà Nội", tinhTrang:"Hoạt động", ghiChu:"Thuộc dự án đường Văn Cao kéo dài" },
  { id:"3", maHam:"TU-003", tenHam:"Hầm Kim Mã", tenLoaiHam:"Hầm đường sắt đô thị", diemDau:"Ga Kim Mã - L3", khcLyTrinh:"1200m", diemCuoi:"Ga Cát Linh - L3", donViQL:"Ban QLDA Đường sắt đô thị", tinhTrang:"Hoạt động", ghiChu:"Tuyến Metro số 3" },
  { id:"4", maHam:"TU-004", tenHam:"Hầm Trần Duy Hưng", tenLoaiHam:"Hầm chui đô thị", diemDau:"Đường Trần Duy Hưng", khcLyTrinh:"250m", diemCuoi:"Đường Hoàng Minh Giám", donViQL:"Sở GTVT Hà Nội", tinhTrang:"Bảo trì", ghiChu:"Đang sửa chữa hệ thống thoát nước" },
  { id:"5", maHam:"TU-005", tenHam:"Hầm đường bộ Cổ Ngư", tenLoaiHam:"Hầm chui đô thị", diemDau:"Đường Thanh Niên", khcLyTrinh:"180m", diemCuoi:"Đường Hoàng Hoa Thám", donViQL:"Sở GTVT Hà Nội", tinhTrang:"Hoạt động", ghiChu:"" },
];

export default function HamDuongBoPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<HamDuongBo[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HamDuongBo | null>(null);

  const importFields = [
    { name: "maHam", label: "Mã hầm" },
    { name: "tenHam", label: "Tên hầm" },
    { name: "tenLoaiHam", label: "Tên loại hầm" },
    { name: "diemDau", label: "Điểm đầu" },
    { name: "khcLyTrinh", label: "Khoảng cách lý trình (m)" },
    { name: "diemCuoi", label: "Điểm cuối" },
    { name: "donViQL", label: "Đơn vị quản lý" },
    { name: "tinhTrang", label: "Tình trạng" },
    { name: "ghiChu", label: "Ghi chú" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((v) => v.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    if (confirm("Xóa hầm này?")) setData(data.filter((i) => i.id !== id));
  };

  const stats = [
    { 
      label: "Tổng số hầm đường bộ", 
      value: "12 hầm", 
      change: "2 hầm", 
      trend: "up" as const, 
      icon: <CircleDot className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Hầm đường bộ thêm mới 2026", 
      value: "2 hầm", 
      change: "0 hầm", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Hầm đường bộ đến hạn bảo trì", 
      value: "1 hầm", 
      change: "0 hầm", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Tổng số km hầm", 
      value: "8.5 km", 
      change: "0.5 km", 
      trend: "up" as const, 
      icon: <Route className="size-6 text-indigo-600" />, 
      color: "bg-indigo-600" 
    },
  ];

  return (
    <div className="space-y-6">
      <ListHeaderStats stats={stats} />
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="size-5 text-muted-foreground" />
              <Input 
                placeholder="Tìm kiếm tên hầm, mã, loại hầm..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="max-w-sm" 
                aria-label="Tìm kiếm hầm đường bộ"
              />
            </div>
            <div className="flex flex-wrap gap-2">
                <div className="flex items-center rounded-md border p-1 bg-slate-50 mr-2">
                  <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 shadow-none" title="Dạng danh sách">
                    <LayoutDashboard className="h-4 w-4 mr-2 hidden sm:block" /> Danh sách
                  </Button>
                  <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 shadow-none" title="Bản đồ không gian (GIS)">
                    <MapIcon className="h-4 w-4 mr-2 hidden sm:block" /> Bản đồ
                  </Button>
                </div>

              <Button onClick={() => { setSelectedItem(null); setIsFormDialogOpen(true); }}><Plus className="mr-2 size-4" />Thêm mới</Button>
              <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}><Upload className="mr-2 size-4" />Nhập dữ liệu</Button>
              <Button variant="outline"><Download className="mr-2 size-4" />Xuất Excel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "list" && (
        <Card>
        <CardHeader><CardTitle>Danh sách Hầm đường bộ ({filteredData.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã hầm</TableHead>
                  <TableHead>Tên hầm</TableHead>
                  <TableHead>Tên loại hầm</TableHead>
                  <TableHead>Điểm đầu</TableHead>
                  <TableHead>Kc. lý trình (m)</TableHead>
                  <TableHead>Điểm cuối</TableHead>
                  <TableHead>Đơn vị QL</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-blue-600 font-medium">{item.maHam}</TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">{item.tenHam}</TableCell>
                    <TableCell><span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 font-medium">{item.tenLoaiHam}</span></TableCell>
                    <TableCell className="text-sm text-slate-600">{item.diemDau}</TableCell>
                    <TableCell className="font-medium text-center">{item.khcLyTrinh}</TableCell>
                    <TableCell className="text-sm text-slate-600">{item.diemCuoi}</TableCell>
                    <TableCell className="text-sm text-slate-500">{item.donViQL}</TableCell>
                    <TableCell><Badge variant={item.tinhTrang === "Hoạt động" ? "default" : "secondary"}>{item.tinhTrang}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">

                        <Button variant="ghost" size="icon" title="Chi tiết" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }}><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" title="Chỉnh sửa" onClick={() => { setSelectedItem(item); setIsFormDialogOpen(true); }}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" title="Xóa" onClick={() => handleDelete(item.id)}><Trash2 className="size-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      )}
      {viewMode === "map" && (
        <Card className="h-[650px] flex flex-col relative overflow-hidden ring-1 ring-slate-200 mt-6 md:mt-0">
          <CardHeader className="py-3 border-b z-10 bg-white/95 backdrop-blur shadow-sm flex flex-row items-center justify-between">
            <h3 className="text-base font-bold flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-600" /> Hệ thống Bản đồ GIS</h3>
          </CardHeader>
          <div className="flex-1 relative">
            <SimpleMapView 
              markers={typeof filteredData !== 'undefined' ? filteredData.map((item: any) => ({
                id: item.id || String(Math.random()),
                lat: item.toaDo ? item.toaDo[0] : 21.0285 + (Math.random() - 0.5) * 0.1,
                lng: item.toaDo ? item.toaDo[1] : 105.8542 + (Math.random() - 0.5) * 0.1,
                name: item.tenTuyen || item.tenCau || item.tenHam || item.tuyenDuong || item.tenGa || item.tenTram || item.tenBien || item.assetName || "Tài sản GIS",
                type: item.loaiDuong || item.loaiCau || item.tenLoaiHam || item.phanLoai || item.loaiBien || item.status || "Tài sản GIS"
              })) : []} 
              center={[21.0285, 105.8542]}
              zoom={11}
              isActive={viewMode === "map"}
            />
          </div>
        </Card>
      )}

      {/* DETAIL DIALOG */}
      <DetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedCard={{ title: "Hầm đường bộ" }}
        selectedItem={selectedItem ? { ...selectedItem, fullName: selectedItem.tenHam, idNumber: selectedItem.maHam, status: selectedItem.tinhTrang } : null}
        onEditClick={() => { setIsDetailDialogOpen(false); setIsFormDialogOpen(true); }}
      />

      {/* FORM DIALOG */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedItem ? `Cập nhật: ${selectedItem.tenHam}` : "Thêm mới Hầm đường bộ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="tenHam">Tên hầm <span className="text-red-500">*</span></Label>
                <Input id="tenHam" defaultValue={selectedItem?.tenHam} placeholder="Nhập tên hầm" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="maHam">Mã hầm <span className="text-red-500">*</span></Label>
                <Input id="maHam" defaultValue={selectedItem?.maHam} placeholder="TU-001" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="tenLoaiHam">Tên loại hầm</Label>
                <Select defaultValue={selectedItem?.tenLoaiHam || "Hầm chui đô thị"}>
                  <SelectTrigger id="tenLoaiHam"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hầm chui đô thị">Hầm chui đô thị</SelectItem>
                    <SelectItem value="Hầm đường sắt đô thị">Hầm đường sắt đô thị</SelectItem>
                    <SelectItem value="Hầm xuyên núi">Hầm xuyên núi</SelectItem>
                    <SelectItem value="Hầm dìm">Hầm dìm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="donViQL">Đơn vị quản lý</Label>
                <Input id="donViQL" defaultValue={selectedItem?.donViQL} placeholder="Nhập đơn vị quản lý" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="diemDau">Điểm đầu</Label>
                <Input id="diemDau" defaultValue={selectedItem?.diemDau} placeholder="Mô tả vị trí điểm đầu" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="khcLyTrinh">Khoảng cách lý trình (m)</Label>
                <Input id="khcLyTrinh" type="number" defaultValue={selectedItem?.khcLyTrinh} placeholder="0" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="diemCuoi">Điểm cuối</Label>
                <Input id="diemCuoi" defaultValue={selectedItem?.diemCuoi} placeholder="Mô tả vị trí điểm cuối" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="tinhTrang">Tình trạng</Label>
                <Select defaultValue={selectedItem?.tinhTrang || "Hoạt động"}>
                  <SelectTrigger id="tinhTrang"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                    <SelectItem value="Bảo trì">Bảo trì</SelectItem>
                    <SelectItem value="Tạm ngưng">Tạm ngưng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="ghiChu">Ghi chú</Label>
                <textarea 
                  id="ghiChu"
                  placeholder="Nhập ghi chú nếu có..."
                  className="w-full h-16 rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                  defaultValue={selectedItem?.ghiChu}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}><X className="size-4 mr-2" />Hủy bỏ</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { alert("Lưu Mockup!"); setIsFormDialogOpen(false); }}><Save className="size-4 mr-2" />Lưu thông tin</Button>
          </div>
        </DialogContent>
      </Dialog>


      <ImportDialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Hầm đường bộ" fields={importFields} onImportComplete={(_d) => {}} />
    </div>
  );
}