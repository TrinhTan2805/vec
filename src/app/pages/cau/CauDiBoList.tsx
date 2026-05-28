import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, LayoutDashboard, Map as MapIcon, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";

interface CauDiBo {
  id: string;
  maCau: string;
  tenCau: string;
  tuyenDuong: string;
  lyTrinh: string;
  chieuDai: string;
  chieuRong: string;
  loaiMaiChe: string;
  donViQL: string;
  trangThai: string;
}

const mockData: CauDiBo[] = [
  { id: "1", maCau: "BR-W-001", tenCau: "Cầu đi bộ Trần Duy Hưng", tuyenDuong: "Trần Duy Hưng", lyTrinh: "Km 0+500", chieuDai: "45 m", chieuRong: "3 m", loaiMaiChe: "Mái tôn", donViQL: "Sở GTVT Hà Nội", trangThai: "Hoạt động" },
];

export default function CauDiBoList() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<CauDiBo[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CauDiBo | null>(null);

  const bridgeFields = [
    { name: "ngayApDung", label: "Ngày áp dụng" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "tenCau", label: "Tên cầu" },
    { name: "donViQL", label: "Đơn vị quản lý" },
    { name: "loaiCau", label: "Loại cầu đường bộ" },
    { name: "lyTrinh", label: "Lý trình" },
    { name: "khoangCachLyTrinh", label: "Khoảng cách lý trình (m)" },
    { name: "theoChieu", label: "Theo chiều" },
    { name: "khoangCachMepDuong", label: "Khoảng cách mép đường (m)" },
    { name: "viTri", label: "Vị trí" },
    { name: "chieuDai", label: "Chiều dài (m)" },
    { name: "chieuRong", label: "Chiều rộng (m)" },
    { name: "loaiMaiChe", label: "Loại mái che" },
    { name: "trangThai", label: "Tình trạng" },
    { name: "noiDung", label: "Nội dung" },
    { name: "ngaySuDung", label: "Ngày đưa vào sử dụng" },
    { name: "ghiChu", label: "Ghi chú" },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="size-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm cầu đi bộ..."
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
          <CardTitle>Danh sách Cầu đi bộ ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã cầu</TableHead>
                  <TableHead>Tên cầu</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Mái che</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-blue-600">{item.maCau}</TableCell>
                    <TableCell className="font-medium">{item.tenCau}</TableCell>
                    <TableCell>{item.tuyenDuong}</TableCell>
                    <TableCell>{item.loaiMaiChe}</TableCell>
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
        selectedItem={selectedItem ? { ...selectedItem, fullName: selectedItem.tenCau, idNumber: selectedItem.maCau, status: selectedItem.trangThai } : null}
        selectedCard={{ title: "Cầu đi bộ" }}
        onEditClick={() => {}}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Cầu đi bộ"
        fields={bridgeFields}
        onImportComplete={() => {}}
      />
    </div>
  );
}
