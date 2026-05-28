import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Navigation, MapPin, Upload, BarChart3, AlertTriangle, ShieldCheck, LayoutDashboard, Layers , Map as MapIcon} from "lucide-react";

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

interface NutGiao {
  id: string;
  maNG: string;
  tenNG: string;
  loaiNG: string;
  viTri: string;
  tuyenCatNhau: string;
  hinhThucGiao: string;
  trangThai: string;
}

const mockData: NutGiao[] = [
  { id: "1", maNG: "NG001", tenNG: "Nút giao Mai Dịch", loaiNG: "Nút giao khác mức", viTri: "Cầu Giấy, Hà Nội", tuyenCatNhau: "Vành đai 3 - QL32", hinhThucGiao: "Ngã tư", trangThai: "Hoạt động" },
  { id: "2", maNG: "NG002", tenNG: "Nút giao Pháp Vân", loaiNG: "Nút giao khác mức", viTri: "Hoàng Mai, Hà Nội", tuyenCatNhau: "Pháp Vân - Cầu Giẽ - Vành đai 3", hinhThucGiao: "Liên thông", trangThai: "Hoạt động" },
  { id: "3", maNG: "NG003", tenNG: "Nút giao Ngã Tư Sở", loaiNG: "Nút giao cùng mức", viTri: "Đống Đa, Hà Nội", tuyenCatNhau: "Nguyễn Trãi - Tây Sơn - Trường Chinh", hinhThucGiao: "Ngã tư", trangThai: "Hoạt động" },
];

export default function NutGiao() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<NutGiao[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NutGiao | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [drawingMode, setDrawingMode] = useState<'point' | 'polyline' | 'polygon' | undefined>(undefined);
  const [drawnRoute, setDrawnRoute] = useState<[number, number][]>([]);
  const [formData, setFormData] = useState({
    maNG: "",
    tenNG: "",
    loaiNG: "",
    viTri: "",
    tuyenCatNhau: "",
    hinhThucGiao: "",
    trangThai: "Hoạt động",
  });

  const junctionFields = [
    { name: "maNG", label: "Mã nút giao" },
    { name: "tenNG", label: "Tên nút giao" },
    { name: "loaiNG", label: "Loại nút giao" },
    { name: "viTri", label: "Vị trí" },
    { name: "tuyenCatNhau", label: "Tuyến cắt nhau" },
    { name: "hinhThucGiao", label: "Hình thức giao" },
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
      maNG: "",
      tenNG: "",
      loaiNG: "",
      viTri: "",
      tuyenCatNhau: "",
      hinhThucGiao: "",
      trangThai: "Hoạt động",
    });
    setSelectedItem(null);
    setDrawnRoute([]);
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleEdit = (item: NutGiao) => {
    setFormData({
      maNG: item.maNG,
      tenNG: item.tenNG,
      loaiNG: item.loaiNG,
      viTri: item.viTri,
      tuyenCatNhau: item.tuyenCatNhau,
      hinhThucGiao: item.hinhThucGiao,
      trangThai: item.trangThai,
    });
    setSelectedItem(item);
    setDrawnRoute([[21.0285, 105.8542]]); // Mock coordinate
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa nút giao này?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setData(data.map((item) => (item.id === selectedItem.id ? { ...item, ...formData } : item)));
    } else {
      const newItem: NutGiao = { id: Date.now().toString(), ...formData };
      setData([...data, newItem]);
    }
    setIsAddDialogOpen(false);
  };

  const stats = [
    { 
      label: "Tổng số nút giao", 
      value: "235 nút", 
      change: "5 nút", 
      trend: "up" as const, 
      icon: <Navigation className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Nút giao thêm mới 2026", 
      value: "15 nút", 
      change: "2 nút", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Nút giao đến hạn bảo trì", 
      value: "8 nút", 
      change: "0 nút", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Nút giao khác mức", 
      value: "45 nút", 
      change: "1 nút", 
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
                placeholder="Tìm kiếm nút giao..."
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
          <CardTitle>Danh sách nút giao ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã NG</TableHead>
                  <TableHead>Tên nút giao</TableHead>
                  <TableHead>Loại nút giao</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Các tuyến cắt nhau</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.maNG}</TableCell>
                    <TableCell>{item.tenNG}</TableCell>
                    <TableCell>{item.loaiNG}</TableCell>
                    <TableCell>{item.viTri}</TableCell>
                    <TableCell>{item.tuyenCatNhau}</TableCell>
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
            <DialogTitle>{selectedItem ? "Cập nhật nút giao" : "Thêm mới nút giao"}</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="bg-slate-50 px-6 border-b h-12 justify-start rounded-none">
              <TabsTrigger value="info">Thông tin chung</TabsTrigger>
              <TabsTrigger value="location">Vị trí</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="flex-1 overflow-auto p-6 m-0">
              <form id="nut-giao-form" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maNG">Mã nút giao</Label>
                      <Input id="maNG" value={formData.maNG} onChange={(e) => setFormData({ ...formData, maNG: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenNG">Tên nút giao</Label>
                      <Input id="tenNG" value={formData.tenNG} onChange={(e) => setFormData({ ...formData, tenNG: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loaiNG">Loại nút giao</Label>
                      <Select value={formData.loaiNG} onValueChange={(value) => setFormData({ ...formData, loaiNG: value })}>
                        <SelectTrigger><SelectValue placeholder="Chọn loại nút" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nút giao cùng mức">Nút giao cùng mức</SelectItem>
                          <SelectItem value="Nút giao khác mức">Nút giao khác mức</SelectItem>
                          <SelectItem value="Vòng xuyến">Vòng xuyến</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hinhThucGiao">Hình thức giao</Label>
                      <Input id="hinhThucGiao" value={formData.hinhThucGiao} onChange={(e) => setFormData({ ...formData, hinhThucGiao: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="viTri">Vị trí (Quận/Huyện)</Label>
                    <Input id="viTri" value={formData.viTri} onChange={(e) => setFormData({ ...formData, viTri: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tuyenCatNhau">Các tuyến cắt nhau</Label>
                    <Input id="tuyenCatNhau" value={formData.tuyenCatNhau} onChange={(e) => setFormData({ ...formData, tuyenCatNhau: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trangThai">Trạng thái</Label>
                    <Select value={formData.trangThai} onValueChange={(value) => setFormData({ ...formData, trangThai: value })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                        <SelectItem value="Bảo trì">Bảo trì</SelectItem>
                        <SelectItem value="Tạm ngưng">Tạm ngưng</SelectItem>
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
            <Button type="submit" form="nut-giao-form">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Detail Dialog */}
      <DetailDialog 
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? {
          ...selectedItem,
          fullName: selectedItem.tenNG,
          idNumber: selectedItem.maNG,
          status: selectedItem.trangThai
        } : null}
        selectedCard={{ title: "Nút giao" }}
        onEditClick={() => {
          setIsDetailDialogOpen(false);
          if (selectedItem) handleEdit(selectedItem);
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Nút giao"
        fields={junctionFields}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />
    </div>
  );
}

