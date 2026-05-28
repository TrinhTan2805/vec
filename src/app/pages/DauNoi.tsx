import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, GitMerge, MapPin, Upload, BarChart3, AlertTriangle, ShieldCheck, LayoutDashboard, Layers , Map as MapIcon} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SimpleMapView } from "../components/map/SimpleMapView";
import { DetailDialog } from "../components/infrastructure/DetailDialog";
import { ImportDialog } from "../components/infrastructure/ImportDialog";
import { ListHeaderStats } from "../components/infrastructure/ListHeaderStats";

interface DauNoi {
  id: string;
  maDN: string;
  tenDN: string;
  tuyenDuong: string;
  lyTrinh: string;
  loaiDauNoi: string;
  chuDauTu: string;
  trangThai: string;
}

const mockData: DauNoi[] = [
  { id: "1", maDN: "DN001", tenDN: "Đấu nối KCN Quang Minh", tuyenDuong: "Võ Văn Kiệt", lyTrinh: "Km 8+200", loaiDauNoi: "Đấu nối trực tiếp", chuDauTu: "BQL KCN", trangThai: "Hoạt động" },
  { id: "2", maDN: "DN002", tenDN: "Đấu nối khu đô thị Ciputra", tuyenDuong: "Vành đai 2", lyTrinh: "Km 2+500", loaiDauNoi: "Đấu nối qua đường gom", chuDauTu: "Ciputra", trangThai: "Đang thi công" },
];

export default function DauNoi() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<DauNoi[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DauNoi | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [drawingMode, setDrawingMode] = useState<'point' | 'polyline' | 'polygon' | undefined>(undefined);
  const [drawnRoute, setDrawnRoute] = useState<[number, number][]>([]);
  const [formData, setFormData] = useState({
    maDN: "",
    tenDN: "",
    tuyenDuong: "",
    lyTrinh: "",
    loaiDauNoi: "Đấu nối trực tiếp",
    chuDauTu: "",
    trangThai: "Hoạt động",
  });

  const connectionFields = [
    { name: "maDN", label: "Mã đấu nối" },
    { name: "tenDN", label: "Tên điểm đấu nối" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "lyTrinh", label: "Lý trình" },
    { name: "loaiDauNoi", label: "Loại đấu nối" },
    { name: "chuDauTu", label: "Chủ đầu tư" },
    { name: "trangThai", label: "Trạng thái" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAdd = () => {
    setFormData({
      maDN: "",
      tenDN: "",
      tuyenDuong: "",
      lyTrinh: "",
      loaiDauNoi: "Đấu nối trực tiếp",
      chuDauTu: "",
      trangThai: "Hoạt động",
    });
    setSelectedItem(null);
    setDrawnRoute([]);
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleEdit = (item: DauNoi) => {
    setFormData({
      maDN: item.maDN,
      tenDN: item.tenDN,
      tuyenDuong: item.tuyenDuong,
      lyTrinh: item.lyTrinh,
      loaiDauNoi: item.loaiDauNoi,
      chuDauTu: item.chuDauTu,
      trangThai: item.trangThai,
    });
    setSelectedItem(item);
    setDrawnRoute([[21.0285, 105.8542]]); // Mock coordinate
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa điểm đấu nối này?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setData(data.map((item) => (item.id === selectedItem.id ? { ...item, ...formData } : item)));
    } else {
      const newItem: DauNoi = { id: Date.now().toString(), ...formData };
      setData([...data, newItem]);
    }
    setIsAddDialogOpen(false);
  };

  const stats = [
    { 
      label: "Tổng số điểm đấu nối", 
      value: "1,234 điểm", 
      change: "45 điểm", 
      trend: "up" as const, 
      icon: <GitMerge className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Đấu nối thêm mới 2026", 
      value: "45 điểm", 
      change: "5%", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Đấu nối đến hạn bảo trì", 
      value: "12 điểm", 
      change: "2 điểm", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Đấu nối đúng quy chuẩn", 
      value: "1,180 điểm", 
      change: "15 điểm", 
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
                placeholder="Tìm kiếm điểm đấu nối..."
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

              <Button onClick={handleAdd}>
                <Plus className="mr-2 size-4" />
                Thêm mới
              </Button>
              <Button
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsImportDialogOpen(true)}
              >
                <Upload className="mr-2 size-4" />
                Nhập dữ liệu
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
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
          <CardTitle>Danh sách điểm đấu nối ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã DN</TableHead>
                  <TableHead>Tên điểm đấu nối</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Lý trình</TableHead>
                  <TableHead>Loại đấu nối</TableHead>
                  <TableHead>Chủ đầu tư</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.maDN}</TableCell>
                    <TableCell>{item.tenDN}</TableCell>
                    <TableCell>{item.tuyenDuong}</TableCell>
                    <TableCell>{item.lyTrinh}</TableCell>
                    <TableCell>{item.loaiDauNoi}</TableCell>
                    <TableCell>{item.chuDauTu}</TableCell>
                    <TableCell>
                      <Badge variant={item.trangThai === "Hoạt động" ? "default" : "secondary"}>
                        {item.trangThai}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDetailDialogOpen(true);
                          }}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Edit className="size-4" /></Button>
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle>{selectedItem ? "Cập nhật điểm đấu nối" : "Thêm mới điểm đấu nối"}</DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="bg-slate-50 px-6 border-b h-12 justify-start rounded-none">
              <TabsTrigger value="info">Thông tin chung</TabsTrigger>
              <TabsTrigger value="location">Vị trí</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="flex-1 overflow-auto p-6 m-0">
              <form id="dau-noi-form" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maDN">Mã đấu nối</Label>
                      <Input id="maDN" value={formData.maDN} onChange={(e) => setFormData({ ...formData, maDN: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenDN">Tên điểm đấu nối</Label>
                      <Input id="tenDN" value={formData.tenDN} onChange={(e) => setFormData({ ...formData, tenDN: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tuyenDuong">Tuyến đường</Label>
                      <Input id="tuyenDuong" value={formData.tuyenDuong} onChange={(e) => setFormData({ ...formData, tuyenDuong: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lyTrinh">Lý trình</Label>
                      <Input id="lyTrinh" value={formData.lyTrinh} onChange={(e) => setFormData({ ...formData, lyTrinh: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loaiDauNoi">Loại đấu nối</Label>
                      <Select value={formData.loaiDauNoi} onValueChange={(value) => setFormData({ ...formData, loaiDauNoi: value })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Đấu nối trực tiếp">Đấu nối trực tiếp</SelectItem>
                          <SelectItem value="Đấu nối qua đường gom">Đấu nối qua đường gom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chuDauTu">Chủ đầu tư</Label>
                      <Input id="chuDauTu" value={formData.chuDauTu} onChange={(e) => setFormData({ ...formData, chuDauTu: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trangThai">Trạng thái</Label>
                    <Select value={formData.trangThai} onValueChange={(value) => setFormData({ ...formData, trangThai: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                        <SelectItem value="Đang thi công">Đang thi công</SelectItem>
                        <SelectItem value="Tạm dừng">Tạm dừng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="location" className="flex-1 p-0 m-0 overflow-hidden relative data-[state=active]:flex flex-col min-h-[400px]">
              <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md border max-w-[200px]">
                <h4 className="font-semibold text-sm mb-2">Vẽ trên bản đồ</h4>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={drawingMode === 'point' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDrawingMode(drawingMode === 'point' ? undefined : 'point')}
                  >
                    <MapPin className="size-4 mr-1" /> Điểm
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setDrawnRoute([])}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
              <SimpleMapView
                isActive={activeTab === 'location'}
                center={[21.0285, 105.8542]}
                zoom={14}
                isDrawingMode={true}
                drawingMode={drawingMode}
                onLocationChange={(lat, lng) => {
                  if (drawingMode === 'point') {
                    setDrawnRoute([[lat, lng]]);
                  }
                }}
                initialCoordinates={drawnRoute}
                markers={typeof filteredData !== 'undefined' ? filteredData.map((item: any) => ({
                id: item.id || String(Math.random()),
                lat: item.toaDo ? item.toaDo[0] : 21.0285 + (Math.random() - 0.5) * 0.1,
                lng: item.toaDo ? item.toaDo[1] : 105.8542 + (Math.random() - 0.5) * 0.1,
                name: item.tenTuyen || item.tenCau || item.tenHam || item.tuyenDuong || item.tenGa || item.tenTram || item.tenBien || item.assetName || "Tài sản GIS",
                type: item.loaiDuong || item.loaiCau || item.tenLoaiHam || item.phanLoai || item.loaiBien || item.status || "Tài sản GIS"
              })) : []}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="p-4 border-t bg-slate-50">
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
            <Button type="submit" form="dau-noi-form">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Detail Dialog */}
      <DetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? {
          ...selectedItem,
          fullName: selectedItem.tenDN,
          idNumber: selectedItem.maDN,
          status: selectedItem.trangThai
        } : null}
        selectedCard={{ title: "Đấu nối" }}
        onEditClick={() => {
          setIsDetailDialogOpen(false);
          if (selectedItem) handleEdit(selectedItem);
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Đấu nối"
        fields={connectionFields}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />
    </div>
  );
}
