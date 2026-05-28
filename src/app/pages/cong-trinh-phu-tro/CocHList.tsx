import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, LayoutDashboard, Map as MapIcon, Layers, Pin, BarChart3, AlertTriangle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";
import { ListHeaderStats } from "../../components/infrastructure/ListHeaderStats";

interface CocH {
  id: string;
  tuyenDuong: string;
  donViQL: string;
  lyTrinh: string;
  viTri: string;
  loaiCot: string;
  trangThai: string;
}

const mockData: any[] = [
  { 
    id: "CH-001", 
    tuyenDuong: "QL1A", 
    donViQL: "Sở GTVT Hà Nội", 
    lyTrinh: "Km 0+100", 
    khcLyTrinh: "100", 
    viTri: "Bên phải", 
    loaiCot: "Cọc H sắt", 
    trangThai: "Hoạt động",
    ngayApDung: "01/01/2024",
    ghiChu: "Cọc sắt sơn phản quang, tình trạng tốt."
  },
  { 
    id: "CH-002", 
    tuyenDuong: "QL1A", 
    donViQL: "Sở GTVT Hà Nội", 
    lyTrinh: "Km 0+200", 
    khcLyTrinh: "200", 
    viTri: "Bên phải", 
    loaiCot: "Cọc H bê tông", 
    trangThai: "Hoạt động",
    ngayApDung: "01/01/2024",
    ghiChu: "—"
  },
];

export default function CocHList() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<CocH[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CocH | null>(null);

  const cocHFields = [
    { name: "ngayApDung", label: "Ngày áp dụng" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "donViQL", label: "Đơn vị quản lý" },
    { name: "lyTrinh", label: "Lý trình" },
    { name: "khoangCachLyTrinh", label: "Khoảng cách lý trình (m)" },
    { name: "viTri", label: "Vị trí" },
    { name: "loaiCot", label: "Loại cột" },
    { name: "trangThai", label: "Tình trạng" },
    { name: "noiDung", label: "Nội dung" },
    { name: "ghiChu", label: "Ghi chú" },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const stats = [
    { 
      label: "Tổng số cọc H", 
      value: "12,345 cọc", 
      change: "450 cọc", 
      trend: "up" as const, 
      icon: <Pin className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Cọc H thêm mới 2026", 
      value: "450 cọc", 
      change: "4%", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Cọc H đến hạn bảo trì", 
      value: "84 cọc", 
      change: "5 cọc", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Cọc H đúng quy chuẩn", 
      value: "12,100 cọc", 
      change: "15 cọc", 
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
              <Input
                placeholder="Tìm kiếm cọc H..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
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

              <Button><Plus className="mr-2 size-4" /> Thêm mới</Button>
              <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
                <Upload className="mr-2 size-4" /> Nhập dữ liệu
              </Button>
              <Button variant="outline">
                <Download className="mr-2 size-4" /> Xuất Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "list" && (
        <Card>
        <CardHeader>
          <CardTitle>Danh sách Cọc H ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lý trình</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Loại cột</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold">{item.lyTrinh}</TableCell>
                    <TableCell>{item.tuyenDuong}</TableCell>
                    <TableCell>{item.viTri}</TableCell>
                    <TableCell>{item.loaiCot}</TableCell>
                    <TableCell>
                      <Badge variant={item.trangThai === "Hoạt động" ? "default" : "secondary"}>
                        {item.trangThai}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon"><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="size-4 text-destructive" /></Button>
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

      <DetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? { ...selectedItem, fullName: `Cọc H ${selectedItem.lyTrinh}`, idNumber: selectedItem.id, status: selectedItem.trangThai } : null}
        selectedCard={{ title: "Cọc H" }}
        onEditClick={() => {}}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Cọc H"
        fields={cocHFields}
        onImportComplete={() => {}}
      />
    </div>
  );
}
