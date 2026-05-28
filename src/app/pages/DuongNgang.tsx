import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, X, Save, LayoutDashboard, Layers, GitMerge, BarChart3, AlertTriangle, ShieldCheck, Map as MapIcon } from "lucide-react";

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

interface DuongNgang {
  id: string;
  ma: string;
  ten: string;
  donViQL: string;
  lyTrinh: string;
  khcLyTrinh: string;
  viTri: string;
  tinhTrangTrucGac: string;
  hinhThucGiaoCat: string;
  loaiRaoChan: string;
  tinhTrang: string;
  chieuGiaoCat: string;
  chieuRong: string;
  ngayApDung: string;
  noiDung: string;
  ghiChu: string;
}

const mockData: DuongNgang[] = [
  { id:"1", ma:"DN-001", ten:"Đường ngang Km 15+200", donViQL:"Công ty QLĐS Hà Nội", lyTrinh:"Km 15+200", khcLyTrinh:"0m", viTri:"Trái tuyến", tinhTrangTrucGac:"Có người gác", hinhThucGiaoCat:"Đường ngang có gác chắn", loaiRaoChan:"Chắn tự động", tinhTrang:"Hoạt động", chieuGiaoCat:"Vuông góc (90°)", chieuRong:"6m", ngayApDung:"01/01/2022", noiDung:"Giao cắt đường sắt Hà Nội - Lạng Sơn", ghiChu:"" },
  { id:"2", ma:"DN-002", ten:"Đường ngang Km 22+800", donViQL:"Công ty QLĐS Hà Nội", lyTrinh:"Km 22+800", khcLyTrinh:"0m", viTri:"Phải tuyến", tinhTrangTrucGac:"Không có người gác", hinhThucGiaoCat:"Đường ngang không có gác chắn", loaiRaoChan:"Biển báo", tinhTrang:"Hoạt động", chieuGiaoCat:"Chéo (75°)", chieuRong:"4m", ngayApDung:"15/06/2020", noiDung:"Giao cắt đường sắt cấp thấp", ghiChu:"Cần nâng cấp thành đường ngang có gác chắn" },
  { id:"3", ma:"DN-003", ten:"Đường ngang Km 31+500", donViQL:"Công ty QLĐS Hà Nội", lyTrinh:"Km 31+500", khcLyTrinh:"20m", viTri:"Trái tuyến", tinhTrangTrucGac:"Có người gác", hinhThucGiaoCat:"Đường ngang có gác chắn", loaiRaoChan:"Chắn cơ học", tinhTrang:"Bảo trì", chieuGiaoCat:"Vuông góc (90°)", chieuRong:"8m", ngayApDung:"01/03/2019", noiDung:"Giao cắt tuyến đường sắt Bắc Nam", ghiChu:"Hệ thống chắn đang bảo dưỡng" },
  { id:"4", ma:"DN-004", ten:"Đường ngang Km 45+100", donViQL:"Công ty QLĐS Hà Nội", lyTrinh:"Km 45+100", khcLyTrinh:"0m", viTri:"Phải tuyến", tinhTrangTrucGac:"Có người gác", hinhThucGiaoCat:"Đường ngang có gác chắn", loaiRaoChan:"Chắn tự động", tinhTrang:"Hoạt động", chieuGiaoCat:"Vuông góc (90°)", chieuRong:"7m", ngayApDung:"20/08/2021", noiDung:"", ghiChu:"" },
];

export default function DuongNgangPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<DuongNgang[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DuongNgang | null>(null);

  const importFields = [
    { name: "ma", label: "Mã đường ngang" },
    { name: "ten", label: "Tên/Ký hiệu" },
    { name: "donViQL", label: "Đơn vị quản lý" },
    { name: "lyTrinh", label: "Lý trình" },
    { name: "khcLyTrinh", label: "Khoảng cách lý trình (m)" },
    { name: "viTri", label: "Vị trí" },
    { name: "tinhTrangTrucGac", label: "Tình trạng trực gác" },
    { name: "hinhThucGiaoCat", label: "Hình thức giao cắt" },
    { name: "loaiRaoChan", label: "Loại rào chắn" },
    { name: "chieuGiaoCat", label: "Chiều giao cắt" },
    { name: "chieuRong", label: "Chiều rộng (m)" },
    { name: "tinhTrang", label: "Tình trạng" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((v) => v.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    if (confirm("Xóa đường ngang này?")) setData(data.filter((i) => i.id !== id));
  };

  const trucGacColor = (val: string) =>
    val === "Có người gác"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-orange-50 text-orange-700 border-orange-200";

  const stats = [
    { 
      label: "Tổng số đường ngang", 
      value: "45 điểm", 
      change: "3 điểm", 
      trend: "up" as const, 
      icon: <GitMerge className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Đường ngang thêm mới 2026", 
      value: "3 điểm", 
      change: "0 điểm", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Đường ngang đến hạn bảo trì", 
      value: "12 điểm", 
      change: "2 điểm", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Tổng điểm trực gác", 
      value: "35 điểm", 
      change: "0 điểm", 
      trend: "up" as const, 
      icon: <ShieldCheck className="size-6 text-indigo-600" />, 
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
              <Input placeholder="Tìm kiếm đường ngang, lý trình, tình trạng..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
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
        <CardHeader><CardTitle>Danh sách Đường ngang (giao cắt đường sắt) ({filteredData.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã</TableHead>
                  <TableHead>Tên/Ký hiệu</TableHead>
                  <TableHead>Đơn vị QL</TableHead>
                  <TableHead>Lý trình</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Tình trạng trực gác</TableHead>
                  <TableHead>Hình thức giao cắt</TableHead>
                  <TableHead>Loại rào chắn</TableHead>
                  <TableHead>Chiều giao cắt</TableHead>
                  <TableHead>Chiều rộng</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-blue-600 font-medium">{item.ma}</TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">{item.ten}</TableCell>
                    <TableCell className="text-sm text-slate-500">{item.donViQL}</TableCell>
                    <TableCell>{item.lyTrinh}</TableCell>
                    <TableCell className="text-sm">{item.viTri}</TableCell>
                    <TableCell><span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${trucGacColor(item.tinhTrangTrucGac)}`}>{item.tinhTrangTrucGac}</span></TableCell>
                    <TableCell className="text-sm">{item.hinhThucGiaoCat}</TableCell>
                    <TableCell className="text-sm">{item.loaiRaoChan}</TableCell>
                    <TableCell className="text-sm">{item.chieuGiaoCat}</TableCell>
                    <TableCell className="font-medium">{item.chieuRong}</TableCell>
                    <TableCell><Badge variant={item.tinhTrang === "Hoạt động" ? "default" : "secondary"}>{item.tinhTrang}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">

                        <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }}><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsFormDialogOpen(true); }}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="size-4 text-destructive" /></Button>
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
        selectedCard={{ title: "Đường ngang" }}
        selectedItem={selectedItem ? { ...selectedItem, fullName: selectedItem.ten, idNumber: selectedItem.ma, status: selectedItem.tinhTrang } : null}
        onEditClick={() => { setIsDetailDialogOpen(false); setIsFormDialogOpen(true); }}
      />

      {/* FORM DIALOG */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{selectedItem ? `Cập nhật: ${selectedItem.ten}` : "Thêm mới Đường ngang"}</DialogTitle></DialogHeader>
          <div className="space-y-5 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><Label>Tên/Ký hiệu</Label><Input defaultValue={selectedItem?.ten} placeholder="Đường ngang Km..." /></div>
              <div className="space-y-1"><Label>Mã</Label><Input defaultValue={selectedItem?.ma} placeholder="DN-001" /></div>
              <div className="space-y-1"><Label>Đơn vị quản lý</Label><Input defaultValue={selectedItem?.donViQL} /></div>
              <div className="space-y-1"><Label>Ngày áp dụng</Label><Input type="date" /></div>
              <div className="space-y-1"><Label>Lý trình</Label><Input defaultValue={selectedItem?.lyTrinh} placeholder="Km 15+200" /></div>
              <div className="space-y-1"><Label>Khoảng cách lý trình (m)</Label><Input type="number" defaultValue={selectedItem?.khcLyTrinh} /></div>
              <div className="space-y-1"><Label>Vị trí</Label><Input defaultValue={selectedItem?.viTri} /></div>
              <div className="space-y-1"><Label>Tình trạng trực gác</Label>
                <Select defaultValue={selectedItem?.tinhTrangTrucGac || "Có người gác"}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Có người gác">Có người gác</SelectItem>
                    <SelectItem value="Không có người gác">Không có người gác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Hình thức giao cắt</Label>
                <Select defaultValue={selectedItem?.hinhThucGiaoCat || "Đường ngang có gác chắn"}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đường ngang có gác chắn">Đường ngang có gác chắn</SelectItem>
                    <SelectItem value="Đường ngang không có gác chắn">Đường ngang không có gác chắn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Loại rào chắn</Label>
                <Select defaultValue={selectedItem?.loaiRaoChan || "Chắn tự động"}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chắn tự động">Chắn tự động</SelectItem>
                    <SelectItem value="Chắn cơ học">Chắn cơ học</SelectItem>
                    <SelectItem value="Biển báo">Biển báo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Chiều giao cắt</Label><Input defaultValue={selectedItem?.chieuGiaoCat} placeholder="Vuông góc (90°)..." /></div>
              <div className="space-y-1"><Label>Chiều rộng (m)</Label><Input type="number" defaultValue={selectedItem?.chieuRong} /></div>
              <div className="space-y-1"><Label>Tình trạng</Label>
                <Select defaultValue={selectedItem?.tinhTrang || "Hoạt động"}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                    <SelectItem value="Bảo trì">Bảo trì</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                <div className="space-y-1 col-span-2">
                  <Label htmlFor="comment-textarea">Nội dung / Ghi chú</Label>
                  <textarea 
                    id="comment-textarea"
                    placeholder="Nhập nội dung / ghi chú..."
                    className="w-full h-16 rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                    defaultValue={selectedItem?.noiDung || selectedItem?.ghiChu}
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
        title="Nhập dữ liệu Đường ngang" fields={importFields} onImportComplete={(_d) => {}} />
    </div>
  );
}
