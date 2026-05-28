import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Hammer, MapPin, GitMerge, Upload, LayoutDashboard, Layers , Map as MapIcon} from "lucide-react";

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

interface ThoatNuoc {
  id: string;
  maTN: string;
  loaiTN: string;
  tenTN: string;
  tuyenDuong: string;
  viTri: string;
  tinhTrang: string;
}

const mockData: ThoatNuoc[] = [
  { id: "1", maTN: "TN001", loaiTN: "Cống tròn", tenTN: "Cống tròn D1000", tuyenDuong: "QL1A", viTri: "Km 5+120", tinhTrang: "Tốt" },
  { id: "2", maTN: "TN002", loaiTN: "Rãnh dọc", tenTN: "Rãnh dọc hình chữ U", tuyenDuong: "QL5", viTri: "Km 0+500 - Km 1+200", tinhTrang: "Bị lấp" },
  { id: "3", maTN: "TN003", loaiTN: "Hố ga", tenTN: "Hố ga bê tông đúc sẵn", tuyenDuong: "DT741", viTri: "Km 2+400", tinhTrang: "Tốt" },
];

export default function HeThongThoatNuoc() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<ThoatNuoc[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ThoatNuoc | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [drawingMode, setDrawingMode] = useState<'point' | 'polyline' | 'polygon' | undefined>(undefined);
  const [drawnRoute, setDrawnRoute] = useState<[number, number][]>([]);
  const [formData, setFormData] = useState({
    maTN: "",
    loaiTN: "",
    tenTN: "",
    tuyenDuong: "",
    viTri: "",
    tinhTrang: "Tốt",
  });

  const drainageFields = [
    { name: "maTN", label: "Mã hạng mục" },
    { name: "tenTN", label: "Tên hạng mục" },
    { name: "loaiTN", label: "Loại" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "viTri", label: "Vị trí" },
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
      maTN: "",
      loaiTN: "",
      tenTN: "",
      tuyenDuong: "",
      viTri: "",
      tinhTrang: "Tốt",
    });
    setSelectedItem(null);
    setDrawnRoute([]);
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleEdit = (item: ThoatNuoc) => {
    setFormData({
      maTN: item.maTN,
      loaiTN: item.loaiTN,
      tenTN: item.tenTN,
      tuyenDuong: item.tuyenDuong,
      viTri: item.viTri,
      tinhTrang: item.tinhTrang,
    });
    setSelectedItem(item);
    setDrawnRoute([[21.0285, 105.8542], [21.0385, 105.8642]]); // Mock polyline
    setDrawingMode(undefined);
    setActiveTab("info");
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa hạng mục này?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setData(data.map((item) => (item.id === selectedItem.id ? { ...item, ...formData } : item)));
    } else {
      const newItem: ThoatNuoc = { id: Date.now().toString(), ...formData };
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
                placeholder="Tìm kiếm hạng mục..."
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
          <CardTitle>Danh sách hạng mục thoát nước ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã TN</TableHead>
                  <TableHead>Tên hạng mục</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.maTN}</TableCell>
                    <TableCell>{item.tenTN}</TableCell>
                    <TableCell>{item.loaiTN}</TableCell>
                    <TableCell>{item.tuyenDuong}</TableCell>
                    <TableCell>{item.viTri}</TableCell>
                    <TableCell>
                      <Badge variant={item.tinhTrang === "Tốt" ? "default" : "secondary"}>
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
            <DialogTitle>{selectedItem ? "Cập nhật hạng mục" : "Thêm mới hạng mục"}</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="bg-slate-50 px-6 border-b h-12 justify-start rounded-none">
              <TabsTrigger value="info">Thông tin chung</TabsTrigger>
              <TabsTrigger value="location">Vị trí</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="flex-1 overflow-auto p-6 m-0">
              <form id="thoat-nuoc-form" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maTN">Mã hạng mục</Label>
                      <Input id="maTN" value={formData.maTN} onChange={(e) => setFormData({ ...formData, maTN: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenTN">Tên hạng mục</Label>
                      <Input id="tenTN" value={formData.tenTN} onChange={(e) => setFormData({ ...formData, tenTN: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loaiTN">Loại hạng mục</Label>
                      <Select value={formData.loaiTN} onValueChange={(value) => setFormData({ ...formData, loaiTN: value })}>
                        <SelectTrigger><SelectValue placeholder="Chọn loại hạng mục" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cống tròn">Cống tròn</SelectItem>
                          <SelectItem value="Cống hộp">Cống hộp</SelectItem>
                          <SelectItem value="Rãnh dọc">Rãnh dọc</SelectItem>
                          <SelectItem value="Hố ga">Hố ga</SelectItem>
                          <SelectItem value="Kênh dẫn">Kênh dẫn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tinhTrang">Tình trạng</Label>
                      <Select value={formData.tinhTrang} onValueChange={(value) => setFormData({ ...formData, tinhTrang: value })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tốt">Tốt</SelectItem>
                          <SelectItem value="Bị lấp">Bị lấp</SelectItem>
                          <SelectItem value="Hư hỏng">Hư hỏng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tuyenDuong">Tuyến đường</Label>
                      <Input id="tuyenDuong" value={formData.tuyenDuong} onChange={(e) => setFormData({ ...formData, tuyenDuong: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="viTri">Vị trí (Lý trình)</Label>
                      <Input id="viTri" value={formData.viTri} onChange={(e) => setFormData({ ...formData, viTri: e.target.value })} required />
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
                    variant={drawingMode === 'polyline' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setDrawingMode(drawingMode === 'polyline' ? undefined : 'polyline')}
                  >
                    <GitMerge className="size-4 mr-1" /> Tuyến
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
            <Button type="submit" form="thoat-nuoc-form">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Detail Dialog */}
      <DetailDialog 
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? {
          ...selectedItem,
          fullName: selectedItem.tenTN,
          idNumber: selectedItem.maTN,
          status: selectedItem.tinhTrang
        } : null}
        selectedCard={{ title: "Hệ thống thoát nước" }}
        onEditClick={() => {
          setIsDetailDialogOpen(false);
          if (selectedItem) handleEdit(selectedItem);
        }}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Hệ thống thoát nước"
        fields={drainageFields}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />
    </div>
  );
}