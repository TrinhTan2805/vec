import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, LayoutDashboard, Layers, Building2, BarChart3, AlertTriangle, ShieldCheck, Map as MapIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";
import { CauLonFormDialog } from "../../components/infrastructure/CauLonFormDialog";
import { ListHeaderStats } from "../../components/infrastructure/ListHeaderStats";

interface CauLon {
  id: string;
  maCau: string;
  tenCau: string;
  tuyenDuong: string;
  lyTrinh: string;
  chieuDai: string;
  chieuRong: string;
  donViQL: string;
  trangThai: string;
}

const mockData: CauLon[] = [
  { id: "1", maCau: "BR-001", tenCau: "Cầu Chương Dương", tuyenDuong: "QL1A", lyTrinh: "Km 0+000", chieuDai: "1.230 m", chieuRong: "19.5 m", donViQL: "Sở GTVT Hà Nội", trangThai: "Hoạt động" },
  { id: "2", maCau: "BR-002", tenCau: "Cầu Nhật Tân", tuyenDuong: "VD3-HN", lyTrinh: "Km 5+200", chieuDai: "3.900 m", chieuRong: "33.2 m", donViQL: "Sở GTVT Hà Nội", trangThai: "Hoạt động" },
  { id: "3", maCau: "BR-003", tenCau: "Cầu Thanh Trì", tuyenDuong: "VD3-HN", lyTrinh: "Km 8+100", chieuDai: "3.083 m", chieuRong: "33.1 m", donViQL: "Sở GTVT Hà Nội", trangThai: "Bảo trì" },
];

export default function CauLonList() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<CauLon[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CauLon | null>(null);

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
    { name: "taiTrongTK", label: "Tải trọng thiết kế" },
    { name: "taiTrongTT", label: "Tải trọng thực tế" },
    { name: "dienTichMatCau", label: "Diện tích mặt cầu (m²)" },
    { name: "dienTichSonSat", label: "Diện tích sơn sắt thép (m²)" },
    { name: "dienTichSonBT", label: "Diện tích sơn bê tông (m²)" },
    { name: "loThoatNuoc", label: "Lỗ thoát nước" },
    { name: "boHanhBTXM", label: "Bộ hành BTXM" },
    { name: "boHanhLatGach", label: "Bộ hành lát gạch" },
    { name: "loaiGach", label: "Loại gạch" },
    { name: "khungHanChe", label: "Khung hạn chế" },
    { name: "ketCauMo", label: "Kết cấu mố" },
    { name: "ketCauNhip", label: "Kết cấu nhịp" },
    { name: "soDoNhip", label: "Sơ đồ nhịp" },
    { name: "ketCauTru", label: "Kết cấu trụ" },
    { name: "chieuCaoHanChe", label: "Chiều cao hạn chế" },
    { name: "kheCoGian", label: "Khe co giãn" },
    { name: "chungLoaiKheCoGian", label: "Chủng loại khe co dãn" },
    { name: "soNhip", label: "Số nhịp" },
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

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa cầu này?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const stats = [
    { 
      label: "Tổng số cầu lớn", 
      value: "1,234 cầu", 
      change: "8 cầu", 
      trend: "up" as const, 
      icon: <Building2 className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Cầu lớn thêm mới 2026", 
      value: "12 cầu", 
      change: "15%", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Cầu lớn đến hạn bảo trì", 
      value: "5 cầu", 
      change: "2 cầu", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Cầu lớn cần kiểm định", 
      value: "45 cầu", 
      change: "3 cầu", 
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
                placeholder="Tìm kiếm theo tên cầu, mã, tuyến đường..."
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

              <Button onClick={() => { setSelectedItem(null); setIsFormDialogOpen(true); }}>
                <Plus className="mr-2 size-4" />
                Thêm mới
              </Button>
              <Button
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
                onClick={() => setIsImportDialogOpen(true)}
              >
                <Upload className="mr-2 size-4" />
                Nhập dữ liệu
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50">
                <Download className="mr-2 size-4" />
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "list" && (
        <Card>
        <CardHeader>
          <CardTitle>Danh sách Cầu lớn ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã cầu</TableHead>
                  <TableHead>Tên cầu</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Lý trình</TableHead>
                  <TableHead>Chiều dài (m)</TableHead>
                  <TableHead>Chiều rộng (m)</TableHead>
                  <TableHead>Đơn vị QL</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-blue-600 font-medium">{item.maCau}</TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">{item.tenCau}</TableCell>
                    <TableCell>{item.tuyenDuong}</TableCell>
                    <TableCell>{item.lyTrinh}</TableCell>
                    <TableCell className="font-medium">{item.chieuDai}</TableCell>
                    <TableCell className="font-medium">{item.chieuRong}</TableCell>
                    <TableCell className="text-sm text-slate-500">{item.donViQL}</TableCell>
                    <TableCell>
                      <Badge variant={item.trangThai === "Hoạt động" ? "default" : "secondary"}>
                        {item.trangThai}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">

                        <Button variant="ghost" size="icon" title="Xem chi tiết" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Chỉnh sửa" onClick={() => { setSelectedItem(item); setIsFormDialogOpen(true); }}>
                          <Edit className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Xóa" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
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


      {/* Detail Dialog */}
      <DetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? {
          ...selectedItem,
          fullName: selectedItem.tenCau,
          idNumber: selectedItem.maCau,
          status: selectedItem.trangThai
        } : null}
        selectedCard={{ title: "Cầu lớn" }}
        onEditClick={() => {
          setIsDetailDialogOpen(false);
          setIsFormDialogOpen(true);
        }}
      />

      {/* Form Dialog */}
      <CauLonFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        selectedItem={selectedItem}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Cầu lớn"
        fields={bridgeFields}
        onImportComplete={(_newData) => {}}
      />
    </div>
  );
}