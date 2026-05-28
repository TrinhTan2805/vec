import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Camera, MapPin, Upload, LayoutDashboard, Layers , Map as MapIcon} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";

interface CameraGiaoThong {
  id: string;
  maCamera: string;
  tenCamera: string;
  viTri: string;
  loaiCamera: string;
  tinhTrang: string;
  urlStream?: string;
}

const mockData: CameraGiaoThong[] = [
  { id: "1", maCamera: "CAM001", tenCamera: "Camera Nút giao BigC", viTri: "Ngã tư Trần Duy Hưng - Khuất Duy Tiến", loaiCamera: "PTZ", tinhTrang: "Hoạt động", urlStream: "stream1" },
  { id: "2", maCamera: "CAM002", tenCamera: "Camera Cầu Giấy", viTri: "Đầu cầu Giấy (phía Kim Mã)", loaiCamera: "Cố định", tinhTrang: "Ngoại tuyến", urlStream: "stream2" },
];

export default function CameraGiaoThong() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<CameraGiaoThong[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CameraGiaoThong | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [drawingMode, setDrawingMode] = useState<'point' | 'polyline' | 'polygon' | undefined>(undefined);
  const [drawnRoute, setDrawnRoute] = useState<[number, number][]>([]);
  const [formData, setFormData] = useState({
    maCamera: "",
    tenCamera: "",
    viTri: "",
    loaiCamera: "Cố định",
    tinhTrang: "Hoạt động",
  });

  const cameraFields = [
    { name: "maCamera", label: "Mã camera" },
    { name: "tenCamera", label: "Tên camera" },
    { name: "viTri", label: "Vị trí lắp đặt" },
    { name: "loaiCamera", label: "Loại camera" },
    { name: "tinhTrang", label: "Tình trạng" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAdd = () => {
    setFormData({
      maCamera: "",
      tenCamera: "",
      viTri: "",
      loaiCamera: "Cố định",
      tinhTrang: "Hoạt động",
    });
    setSelectedItem(null);
    setDrawnRoute([]);
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleEdit = (item: CameraGiaoThong) => {
    setFormData({
      maCamera: item.maCamera,
      tenCamera: item.tenCamera,
      viTri: item.viTri,
      loaiCamera: item.loaiCamera,
      tinhTrang: item.tinhTrang,
    });
    setSelectedItem(item);
    setDrawnRoute([[21.0285, 105.8542]]); // Mock coordinate
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa camera này?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setData(data.map((item) => (item.id === selectedItem.id ? { ...item, ...formData } : item)));
    } else {
      const newItem: CameraGiaoThong = { id: Date.now().toString(), ...formData };
      setData([...data, newItem]);
    }
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="size-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm camera..."
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
          <CardTitle>Danh sách camera giao thông ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã camera</TableHead>
                  <TableHead>Tên camera</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Loại camera</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.maCamera}</TableCell>
                    <TableCell>{item.tenCamera}</TableCell>
                    <TableCell>{item.viTri}</TableCell>
                    <TableCell>{item.loaiCamera}</TableCell>
                    <TableCell>
                      <Badge variant={item.tinhTrang === "Hoạt động" ? "default" : "secondary"}>
                        {item.tinhTrang}
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
            <DialogTitle>{selectedItem ? "Cập nhật camera" : "Thêm mới camera"}</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="bg-slate-50 px-6 border-b h-12 justify-start rounded-none">
              <TabsTrigger value="info">Thông tin chung</TabsTrigger>
              <TabsTrigger value="location">Vị trí</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="flex-1 overflow-auto p-6 m-0">
              <form id="camera-form" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maCamera">Mã camera</Label>
                      <Input id="maCamera" value={formData.maCamera} onChange={(e) => setFormData({ ...formData, maCamera: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenCamera">Tên camera</Label>
                      <Input id="tenCamera" value={formData.tenCamera} onChange={(e) => setFormData({ ...formData, tenCamera: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="viTri">Vị trí lắp đặt</Label>
                    <Input id="viTri" value={formData.viTri} onChange={(e) => setFormData({ ...formData, viTri: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loaiCamera">Loại camera</Label>
                      <Select value={formData.loaiCamera} onValueChange={(value) => setFormData({ ...formData, loaiCamera: value })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cố định">Cố định</SelectItem>
                          <SelectItem value="PTZ">PTZ (Xoay quét)</SelectItem>
                          <SelectItem value="AI (Đếm xe)">AI (Đếm xe)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tinhTrang">Tình trạng</Label>
                      <Select value={formData.tinhTrang} onValueChange={(value) => setFormData({ ...formData, tinhTrang: value })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                          <SelectItem value="Ngoại tuyến">Ngoại tuyến</SelectItem>
                          <SelectItem value="Hư hỏng">Hư hỏng</SelectItem>
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
            <Button type="submit" form="camera-form">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Detail Dialog */}
      <DetailDialog 
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? {
          ...selectedItem,
          fullName: selectedItem.tenCamera,
          idNumber: selectedItem.maCamera,
          status: selectedItem.tinhTrang
        } : null}
        selectedCard={{ title: "Camera giao thông" }}
        onEditClick={() => {
          setIsDetailDialogOpen(false);
          if (selectedItem) handleEdit(selectedItem);
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Camera"
        fields={cameraFields}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />
    </div>
  );
}
