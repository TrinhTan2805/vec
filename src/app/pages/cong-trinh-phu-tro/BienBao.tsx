import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, X, Save, LayoutDashboard, Layers, Hammer, BarChart3, AlertTriangle, ShieldCheck, Map as MapIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";
import { ListHeaderStats } from "../../components/infrastructure/ListHeaderStats";


// TT10 - Biển báo: gồm cột biển báo + biển báo
interface CotBienBao {
  id: string;
  ma: string;
  tuyenDuong: string;
  donViQL: string;
  lyTrinh: string;
  khcLyTrinh: string;
  khcMepDuong: string;
  phanLoaiCot: string;
  loaiCot: string;
  soCot: string;
  viTri: string;
  tinhTrang: string;
  ngayApDung: string;
  noiDung: string;
  ghiChu: string;
  // Bảng biển báo (sub-records, presented as text for mockup)
  bienBao: string; // ví dụ "P.101, P.102..."
  loaiBienBao: string;
  noiDungBien: string;
  laBienCamTheoGio: string;
}

const mockData: CotBienBao[] = [
  { id:"1", ma:"BB-001", tuyenDuong:"QL1A", donViQL:"Sở GTVT Hà Nội", lyTrinh:"Km 3+200", khcLyTrinh:"0m", khcMepDuong:"2m", phanLoaiCot:"Cột đơn", loaiCot:"Cột thép hộp", soCot:"1", viTri:"Lề đường phải", tinhTrang:"Hoạt động", ngayApDung:"01/01/2022", noiDung:"P.102 - Biển cấm xe tải", ghiChu:"", bienBao:"P.102", loaiBienBao:"Biển cấm", noiDungBien:"Cấm xe tải từ 3,5T", laBienCamTheoGio:"Không" },
  { id:"2", ma:"BB-002", tuyenDuong:"Vành đai 3", donViQL:"Sở GTVT Hà Nội", lyTrinh:"Km 8+500", khcLyTrinh:"50m", khcMepDuong:"2.5m", phanLoaiCot:"Cột đôi", loaiCot:"Cột thép tròn", soCot:"2", viTri:"Dải phân cách", tinhTrang:"Hoạt động", ngayApDung:"20/03/2021", noiDung:"I.407 - Biển chỉ hướng", ghiChu:"", bienBao:"I.407", loaiBienBao:"Biển chỉ dẫn", noiDungBien:"Hướng về Hà Nội - Lạng Sơn", laBienCamTheoGio:"Không" },
  { id:"3", ma:"BB-003", tuyenDuong:"Đường Láng", donViQL:"Sở GTVT Hà Nội", lyTrinh:"Km 1+000", khcLyTrinh:"0m", khcMepDuong:"1.5m", phanLoaiCot:"Cột đơn", loaiCot:"Cột BTCT", soCot:"1", viTri:"Lề đường phải", tinhTrang:"Bảo trì", ngayApDung:"10/06/2019", noiDung:"P.117 - Biển cấm theo giờ", ghiChu:"Cột bị nghiêng, cần dựng lại", bienBao:"P.117", loaiBienBao:"Biển cấm", noiDungBien:"Cấm đỗ xe 7h-9h và 16h-19h", laBienCamTheoGio:"Có" },
  { id:"4", ma:"BB-004", tuyenDuong:"QL6", donViQL:"Cục Đường bộ VN", lyTrinh:"Km 15+300", khcLyTrinh:"0m", khcMepDuong:"2m", phanLoaiCot:"Cột đơn", loaiCot:"Cột thép hộp", soCot:"1", viTri:"Lề đường trái", tinhTrang:"Hoạt động", ngayApDung:"05/01/2023", noiDung:"W.225 - Biển nguy hiểm", ghiChu:"", bienBao:"W.225", loaiBienBao:"Biển nguy hiểm", noiDungBien:"Cầu yếu phía trước 500m", laBienCamTheoGio:"Không" },
  { id:"5", ma:"BB-005", tuyenDuong:"Vành đai 2", donViQL:"Sở GTVT Hà Nội", lyTrinh:"Km 5+700", khcLyTrinh:"20m", khcMepDuong:"2m", phanLoaiCot:"Cột đơn", loaiCot:"Cột thép hộp", soCot:"1", viTri:"Lề đường phải", tinhTrang:"Hoạt động", ngayApDung:"15/09/2022", noiDung:"R.407 - Biển tốc độ", ghiChu:"", bienBao:"R.407", loaiBienBao:"Biển hiệu lệnh", noiDungBien:"Tốc độ tối đa 60 km/h", laBienCamTheoGio:"Không" },
];

export default function BienBaoPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<CotBienBao[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loaiFilter, setLoaiFilter] = useState("all");

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CotBienBao | null>(null);

  const importFields = [
    { name: "ma", label: "Mã cột biển báo" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "donViQL", label: "Đơn vị quản lý" },
    { name: "lyTrinh", label: "Lý trình" },
    { name: "khcLyTrinh", label: "Khoảng cách lý trình (m)" },
    { name: "khcMepDuong", label: "Khoảng cách mép đường (m)" },
    { name: "phanLoaiCot", label: "Phân loại cột biển báo" },
    { name: "loaiCot", label: "Loại cột" },
    { name: "soCot", label: "Số cột" },
    { name: "viTri", label: "Vị trí" },
    { name: "bienBao", label: "Loại biển báo (ký hiệu)" },
    { name: "loaiBienBao", label: "Phân loại biển báo" },
    { name: "noiDungBien", label: "Nội dung biển báo" },
    { name: "laBienCamTheoGio", label: "Là biển cấm theo giờ" },
    { name: "tinhTrang", label: "Tình trạng" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const filteredData = data.filter((item) => {
    const matchSearch = Object.values(item).some((v) => v.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    const matchLoai = loaiFilter === "all" || item.loaiBienBao === loaiFilter;
    return matchSearch && matchLoai;
  });

  const handleDelete = (id: string) => {
    if (confirm("Xóa biển báo này?")) setData(data.filter((i) => i.id !== id));
  };

  const loaiBadgeColor = (loai: string) => {
    if (loai === "Biển cấm") return "bg-red-50 text-red-700 border-red-200";
    if (loai === "Biển nguy hiểm") return "bg-orange-50 text-orange-700 border-orange-200";
    if (loai === "Biển hiệu lệnh") return "bg-blue-50 text-blue-700 border-blue-200";
    if (loai === "Biển chỉ dẫn") return "bg-green-50 text-green-700 border-green-200";
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  const stats = [
    { 
      label: "Tổng số biển báo đường bộ", 
      value: "8,642 biển", 
      change: "245 biển", 
      trend: "up" as const, 
      icon: <Hammer className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Biển báo thêm mới 2026", 
      value: "156 biển", 
      change: "12%", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Biển báo đến hạn bảo trì", 
      value: "84 biển", 
      change: "5%", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Biển báo đúng quy chuẩn", 
      value: "8,421 biển", 
      change: "32 biển", 
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
            <div className="flex flex-1 items-center gap-3 flex-wrap">
              <Search className="size-5 text-muted-foreground" />
              <Input placeholder="Tìm kiếm mã, tuyến đường, nội dung biển..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-xs" />
              <Select value={loaiFilter} onValueChange={setLoaiFilter}>
                <SelectTrigger className="w-44"><SelectValue placeholder="Lọc loại biển" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại biển</SelectItem>
                  <SelectItem value="Biển cấm">Biển cấm</SelectItem>
                  <SelectItem value="Biển nguy hiểm">Biển nguy hiểm</SelectItem>
                  <SelectItem value="Biển hiệu lệnh">Biển hiệu lệnh</SelectItem>
                  <SelectItem value="Biển chỉ dẫn">Biển chỉ dẫn</SelectItem>
                </SelectContent>
              </Select>
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
        <CardHeader><CardTitle>Danh sách Biển báo ({filteredData.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã cột</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Đơn vị QL</TableHead>
                  <TableHead>Lý trình</TableHead>
                  <TableHead>Kc. mép đường</TableHead>
                  <TableHead>Phân loại cột</TableHead>
                  <TableHead>Loại cột</TableHead>
                  <TableHead>Số cột</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Ký hiệu biển</TableHead>
                  <TableHead>Loại biển</TableHead>
                  <TableHead>Nội dung biển</TableHead>
                  <TableHead>Cấm theo giờ</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-blue-600 font-medium">{item.ma}</TableCell>
                    <TableCell className="text-sm font-semibold">{item.tuyenDuong}</TableCell>
                    <TableCell className="text-sm text-slate-500">{item.donViQL}</TableCell>
                    <TableCell>{item.lyTrinh}</TableCell>
                    <TableCell className="text-center">{item.khcMepDuong}</TableCell>
                    <TableCell className="text-sm">{item.phanLoaiCot}</TableCell>
                    <TableCell className="text-sm">{item.loaiCot}</TableCell>
                    <TableCell className="text-center font-medium">{item.soCot}</TableCell>
                    <TableCell className="text-sm text-slate-600">{item.viTri}</TableCell>
                    <TableCell className="font-mono font-bold">{item.bienBao}</TableCell>
                    <TableCell><span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${loaiBadgeColor(item.loaiBienBao)}`}>{item.loaiBienBao}</span></TableCell>
                    <TableCell className="text-sm max-w-[160px] truncate" title={item.noiDungBien}>{item.noiDungBien}</TableCell>
                    <TableCell className="text-center">{item.laBienCamTheoGio === "Có" ? <span className="text-orange-600 font-bold">✓</span> : "—"}</TableCell>
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
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <span className="font-mono text-blue-700">{selectedItem?.bienBao}</span>
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${loaiBadgeColor(selectedItem?.loaiBienBao || "")}`}>{selectedItem?.loaiBienBao}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-5 pt-2">
              <section>
                <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Thông tin cột biển báo</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <div><span className="text-slate-500">Mã cột:</span><span className="font-semibold ml-2">{selectedItem.ma}</span></div>
                  <div><span className="text-slate-500">Ngày áp dụng:</span><span className="font-semibold ml-2">{selectedItem.ngayApDung}</span></div>
                  <div><span className="text-slate-500">Tuyến đường:</span><span className="font-semibold ml-2">{selectedItem.tuyenDuong}</span></div>
                  <div><span className="text-slate-500">Đơn vị quản lý:</span><span className="font-semibold ml-2">{selectedItem.donViQL}</span></div>
                  <div><span className="text-slate-500">Lý trình:</span><span className="font-semibold ml-2">{selectedItem.lyTrinh}</span></div>
                  <div><span className="text-slate-500">Kc. lý trình:</span><span className="font-semibold ml-2">{selectedItem.khcLyTrinh}</span></div>
                  <div><span className="text-slate-500">Kc. mép đường:</span><span className="font-semibold ml-2">{selectedItem.khcMepDuong}</span></div>
                  <div><span className="text-slate-500">Vị trí:</span><span className="font-semibold ml-2">{selectedItem.viTri}</span></div>
                  <div><span className="text-slate-500">Phân loại cột:</span><span className="font-semibold ml-2">{selectedItem.phanLoaiCot}</span></div>
                  <div><span className="text-slate-500">Loại cột:</span><span className="font-semibold ml-2">{selectedItem.loaiCot}</span></div>
                  <div><span className="text-slate-500">Số cột:</span><span className="font-semibold ml-2">{selectedItem.soCot}</span></div>
                  <div><span className="text-slate-500">Tình trạng:</span><Badge variant={selectedItem.tinhTrang === "Hoạt động" ? "default" : "secondary"} className="ml-2">{selectedItem.tinhTrang}</Badge></div>
                </div>
              </section>
              <section>
                <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Thông tin biển báo</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <div><span className="text-slate-500">Ký hiệu biển:</span><span className="font-mono font-bold text-blue-700 ml-2">{selectedItem.bienBao}</span></div>
                  <div><span className="text-slate-500">Phân loại biển:</span><span className="font-semibold ml-2">{selectedItem.loaiBienBao}</span></div>
                  <div className="col-span-2"><span className="text-slate-500">Nội dung biển:</span><span className="font-semibold ml-2">{selectedItem.noiDungBien}</span></div>
                  <div><span className="text-slate-500">Là biển cấm theo giờ:</span><span className="font-semibold ml-2 text-orange-600">{selectedItem.laBienCamTheoGio}</span></div>
                </div>
              </section>
              {selectedItem.ghiChu && (
                <section>
                  <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 border-b pb-1">Ghi chú</h4>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border">{selectedItem.ghiChu}</p>
                </section>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* FORM DIALOG */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{selectedItem ? `Cập nhật Biển Báo: ${selectedItem.ma}` : "Thêm mới Biển báo"}</DialogTitle></DialogHeader>
          <div className="space-y-6 pt-2">
            <section>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Cột biển báo</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Mã cột</Label><Input defaultValue={selectedItem?.ma} placeholder="BB-001" /></div>
                <div className="space-y-1"><Label>Tuyến đường</Label><Input defaultValue={selectedItem?.tuyenDuong} /></div>
                <div className="space-y-1"><Label>Đơn vị quản lý</Label><Input defaultValue={selectedItem?.donViQL} /></div>
                <div className="space-y-1"><Label>Ngày áp dụng</Label><Input type="date" /></div>
                <div className="space-y-1"><Label>Lý trình</Label><Input defaultValue={selectedItem?.lyTrinh} placeholder="Km 0+000" /></div>
                <div className="space-y-1"><Label>Kc. lý trình (m)</Label><Input type="number" defaultValue={selectedItem?.khcLyTrinh} /></div>
                <div className="space-y-1"><Label>Kc. mép đường (m)</Label><Input type="number" defaultValue={selectedItem?.khcMepDuong} /></div>
                <div className="space-y-1"><Label>Vị trí</Label><Input defaultValue={selectedItem?.viTri} /></div>
                <div className="space-y-1"><Label>Phân loại cột biển báo</Label>
                  <Select defaultValue={selectedItem?.phanLoaiCot || "Cột đơn"}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cột đơn">Cột đơn</SelectItem>
                      <SelectItem value="Cột đôi">Cột đôi</SelectItem>
                      <SelectItem value="Cột cổng">Cột cổng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1"><Label>Loại cột</Label><Input defaultValue={selectedItem?.loaiCot} placeholder="Cột thép hộp, cột BTCT..." /></div>
                <div className="space-y-1"><Label>Số cột</Label><Input type="number" defaultValue={selectedItem?.soCot} /></div>
                <div className="space-y-1"><Label>Tình trạng</Label>
                  <Select defaultValue={selectedItem?.tinhTrang || "Hoạt động"}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                      <SelectItem value="Bảo trì">Bảo trì</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>
            <section>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Bảng biển báo</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Ký hiệu biển</Label><Input defaultValue={selectedItem?.bienBao} placeholder="P.102, W.225..." /></div>
                <div className="space-y-1"><Label>Phân loại biển báo</Label>
                  <Select defaultValue={selectedItem?.loaiBienBao || "Biển cấm"}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Biển cấm">Biển cấm</SelectItem>
                      <SelectItem value="Biển nguy hiểm">Biển nguy hiểm</SelectItem>
                      <SelectItem value="Biển hiệu lệnh">Biển hiệu lệnh</SelectItem>
                      <SelectItem value="Biển chỉ dẫn">Biển chỉ dẫn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 col-span-2"><Label>Nội dung biển báo</Label><Input defaultValue={selectedItem?.noiDungBien} placeholder="Mô tả nội dung biển" /></div>
                <div className="space-y-1"><Label>Là biển cấm theo giờ</Label>
                  <Select defaultValue={selectedItem?.laBienCamTheoGio || "Không"}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Có">Có</SelectItem>
                      <SelectItem value="Không">Không</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 col-span-2">
                  <Label htmlFor="note">Nội dung chi tiết / Ghi chú</Label>
                  <textarea 
                    id="note"
                    placeholder="Nhập nội dung/ghi chú chi tiết..."
                    className="w-full h-16 rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                    defaultValue={selectedItem?.ghiChu || selectedItem?.noiDung}
                  ></textarea>
                </div>
              </div>
            </section>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}><X className="size-4 mr-2" />Hủy bỏ</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { alert("Lưu Mockup!"); setIsFormDialogOpen(false); }}><Save className="size-4 mr-2" />Lưu thông tin</Button>
          </div>
        </DialogContent>
      </Dialog>


      <ImportDialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Biển báo" fields={importFields} onImportComplete={(_d) => {}} />
    </div>
  );
}
