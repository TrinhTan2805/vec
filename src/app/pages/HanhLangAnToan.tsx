import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Shield, MapPin, GitMerge, Upload, BarChart3, AlertTriangle, LayoutDashboard, Layers , Map as MapIcon} from "lucide-react";

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

interface HanhLang {
  id: string;
  maHL: string;
  tenHL: string;
  tuyenDuong: string;
  lyTrinhBatDau: string;
  lyTrinhKetThuc: string;
  chieuRong: string;
  trangThai: string;
}

const mockData: HanhLang[] = [
  { id: "1", maHL: "HL001", tenHL: "Hành lang QL1A - Đoạn Cầu Giấy", tuyenDuong: "QL1A", lyTrinhBatDau: "Km 0+000", lyTrinhKetThuc: "Km 5+000", chieuRong: "15m", trangThai: "An toàn" },
  { id: "2", maHL: "HL002", tenHL: "Hành lang QL5 - Khu vực Gia Lâm", tuyenDuong: "QL5", lyTrinhBatDau: "Km 10+500", lyTrinhKetThuc: "Km 15+200", chieuRong: "20m", trangThai: "Có vi phạm" },
  { id: "3", maHL: "HL003", tenHL: "Hành lang DT741 - Đoạn qua khu dân cư", tuyenDuong: "DT741", lyTrinhBatDau: "Km 2+000", lyTrinhKetThuc: "Km 4+500", chieuRong: "10m", trangThai: "An toàn" },
];

export default function HanhLangAnToan() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<HanhLang[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HanhLang | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [drawingMode, setDrawingMode] = useState<'point' | 'polyline' | 'polygon' | undefined>(undefined);
  const [drawnRoute, setDrawnRoute] = useState<[number, number][]>([]);
  const [formData, setFormData] = useState({
    maHL: "",
    tenHL: "",
    tuyenDuong: "",
    lyTrinhBatDau: "",
    lyTrinhKetThuc: "",
    chieuRong: "",
    trangThai: "An toàn",
  });

  const safetyCorridorFields = [
    { name: "maHL", label: "Mã hành lang" },
    { name: "tenHL", label: "Tên hành lang" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "lyTrinhBatDau", label: "Lý trình bắt đầu" },
    { name: "lyTrinhKetThuc", label: "Lý trình kết thúc" },
    { name: "chieuRong", label: "Chiều rộng" },
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
      maHL: "",
      tenHL: "",
      tuyenDuong: "",
      lyTrinhBatDau: "",
      lyTrinhKetThuc: "",
      chieuRong: "",
      trangThai: "An toàn",
    });
    setSelectedItem(null);
    setDrawnRoute([]);
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleEdit = (item: HanhLang) => {
    setFormData({
      maHL: item.maHL,
      tenHL: item.tenHL,
      tuyenDuong: item.tuyenDuong,
      lyTrinhBatDau: item.lyTrinhBatDau,
      lyTrinhKetThuc: item.lyTrinhKetThuc,
      chieuRong: item.chieuRong,
      trangThai: item.trangThai,
    });
    setSelectedItem(item);
    setDrawnRoute([[21.0285, 105.8542], [21.0385, 105.8642]]); // Mock polyline
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa hành lang này?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setData(data.map((item) => (item.id === selectedItem.id ? { ...item, ...formData } : item)));
    } else {
      const newItem: HanhLang = { id: Date.now().toString(), ...formData };
      setData([...data, newItem]);
    }
    setIsAddDialogOpen(false);
  };

  const stats = [
    { 
      label: "Tổng số hành lang an toàn", 
      value: "156 đoạn", 
      change: "12 km", 
      trend: "up" as const, 
      icon: <Shield className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Hành lang thêm mới 2026", 
      value: "8 km", 
      change: "5%", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Hành lang đến hạn bảo trì", 
      value: "15 đoạn", 
      change: "2 đoạn", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Số vụ vi phạm hành lang", 
      value: "24 vụ", 
      change: "4 vụ", 
      trend: "down" as const, 
      icon: <GitMerge className="size-6 text-red-600" />, 
      color: "bg-red-600" 
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
                placeholder="Tìm kiếm hành lang..."
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
          <CardTitle>Danh sách hành lang ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã HL</TableHead>
                  <TableHead>Tên hành lang</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Lý trình bắt đầu</TableHead>
                  <TableHead>Lý trình kết thúc</TableHead>
                  <TableHead>Chiều rộng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.maHL}</TableCell>
                    <TableCell>{item.tenHL}</TableCell>
                    <TableCell>{item.tuyenDuong}</TableCell>
                    <TableCell>{item.lyTrinhBatDau}</TableCell>
                    <TableCell>{item.lyTrinhKetThuc}</TableCell>
                    <TableCell>{item.chieuRong}</TableCell>
                    <TableCell>
                      <Badge variant={item.trangThai === "An toàn" ? "default" : "destructive"}>
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
            <DialogTitle>{selectedItem ? "Cập nhật hành lang" : "Thêm mới hành lang"}</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="bg-slate-50 px-6 border-b h-12 justify-start rounded-none">
              <TabsTrigger value="info">Thông tin chung</TabsTrigger>
              <TabsTrigger value="location">Vị trí</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="flex-1 overflow-auto p-6 m-0">
              <form id="hanh-lang-form" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maHL">Mã hành lang</Label>
                      <Input id="maHL" value={formData.maHL} onChange={(e) => setFormData({ ...formData, maHL: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenHL">Tên hành lang</Label>
                      <Input id="tenHL" value={formData.tenHL} onChange={(e) => setFormData({ ...formData, tenHL: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tuyenDuong">Tuyến đường</Label>
                    <Input id="tuyenDuong" value={formData.tuyenDuong} onChange={(e) => setFormData({ ...formData, tuyenDuong: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lyTrinhBatDau">Lý trình bắt đầu</Label>
                      <Input id="lyTrinhBatDau" value={formData.lyTrinhBatDau} onChange={(e) => setFormData({ ...formData, lyTrinhBatDau: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lyTrinhKetThuc">Lý trình kết thúc</Label>
                      <Input id="lyTrinhKetThuc" value={formData.lyTrinhKetThuc} onChange={(e) => setFormData({ ...formData, lyTrinhKetThuc: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chieuRong">Chiều rộng bảo vệ</Label>
                      <Input id="chieuRong" value={formData.chieuRong} onChange={(e) => setFormData({ ...formData, chieuRong: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trangThai">Trạng thái</Label>
                      <Select value={formData.trangThai} onValueChange={(value) => setFormData({ ...formData, trangThai: value })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="An toàn">An toàn</SelectItem>
                          <SelectItem value="Có vi phạm">Có vi phạm</SelectItem>
                          <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                    variant={drawingMode === 'polyline' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setDrawingMode(drawingMode === 'polyline' ? undefined : 'polyline')}
                  >
                    <GitMerge className="size-4 mr-1" /> Tuyến
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
                onRoutesChange={setDrawnRoute}
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
            <Button type="submit" form="hanh-lang-form">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Detail Dialog */}
      <DetailDialog 
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? {
          ...selectedItem,
          fullName: selectedItem.tenHL,
          idNumber: selectedItem.maHL,
          status: selectedItem.trangThai
        } : null}
        selectedCard={{ title: "Hành lang an toàn" }}
        onEditClick={() => {
          setIsDetailDialogOpen(false);
          if (selectedItem) handleEdit(selectedItem);
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Hành lang an toàn"
        fields={safetyCorridorFields}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />
    </div>
  );
}

