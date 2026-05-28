import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Map as MapIcon, Eye, Ruler, Layers, Scissors, Upload, Route, LayoutDashboard, BarChart3, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

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
import { StraightLineDiagramDialog } from "../../components/infrastructure/StraightLineDiagramDialog";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";
import { RouteAssetDialog } from "../../components/infrastructure/RouteAssetDialog";
import { ListHeaderStats } from "../../components/infrastructure/ListHeaderStats";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";


interface TuyenDuong {
  id: string;
  maTuyen: string;
  tenTuyen: string;
  loaiDuong: string;
  chieuDai: number;
  diemDau: string;
  diemCuoi: string;
  trangThai: string;
  tuKm: number;
  denKm: number;
  donViQuanLy: string;
  toaDo?: [number, number][];
  segmentsCount?: number;
}

const mockData: TuyenDuong[] = [
  { 
    id: "1", maTuyen: "QL1A", tenTuyen: "Quốc lộ 1A", loaiDuong: "Quốc lộ", chieuDai: 2300, 
    diemDau: "Hà Nội", diemCuoi: "TP.HCM", trangThai: "Hoạt động",
    tuKm: 0, denKm: 2300, donViQuanLy: "Cục Đường bộ Việt Nam", segmentsCount: 5
  },
  { 
    id: "2", maTuyen: "QL5", tenTuyen: "Quốc lộ 5", loaiDuong: "Quốc lộ", chieuDai: 105, 
    diemDau: "Hà Nội", diemCuoi: "Hải Phòng", trangThai: "Hoạt động",
    tuKm: 0, denKm: 105, donViQuanLy: "Sở GTVT Hà Nội", segmentsCount: 3
  },
  { 
    id: "3", maTuyen: "QL13", tenTuyen: "Quốc lộ 13", loaiDuong: "Quốc lộ", chieuDai: 150, 
    diemDau: "TP.HCM", diemCuoi: "Bình Phước", trangThai: "Bảo trì",
    tuKm: 0, denKm: 150, donViQuanLy: "Sở GTVT Bình Dương", segmentsCount: 2
  },
  { 
    id: "4", maTuyen: "DT741", tenTuyen: "Đường tỉnh 741", loaiDuong: "Đường tỉnh", chieuDai: 45, 
    diemDau: "Long An", diemCuoi: "Tiền Giang", trangThai: "Hoạt động",
    tuKm: 0, denKm: 45, donViQuanLy: "Sở GTVT Long An", segmentsCount: 1
  },
];

export default function TuyenDuongBo() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<TuyenDuong[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUnit, setFilterUnit] = useState("all");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [isDiagramDialogOpen, setIsDiagramDialogOpen] = useState(false);
  const [isAssetListDialogOpen, setIsAssetListDialogOpen] = useState(false);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isSplitDialogOpen, setIsSplitDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);



  const [selectedItem, setSelectedItem] = useState<TuyenDuong | null>(null);
  const [formData, setFormData] = useState({
    maTuyen: "",
    tenTuyen: "",
    loaiDuong: "",
    chieuDai: "",
    diemDau: "",
    diemCuoi: "",
    trangThai: "Hoạt động",
    tuKm: "0",
    denKm: "0",
    donViQuanLy: ""
  });

  const [splitSegments, setSplitSegments] = useState([{ from: 0, to: 0 }]);

  const routeFields = [
    { name: "maTuyen", label: "Mã tuyến" },
    { name: "tenTuyen", label: "Tên tuyến" },
    { name: "capDuong", label: "Cấp đường" },
    { name: "chieuDai", label: "Chiều dài (km)" },
    { name: "tuKm", label: "Từ Km" },
    { name: "denKm", label: "Đến Km" },
    { name: "donViQuanLy", label: "Đơn vị quản lý" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const [activeTab, setActiveTab] = useState("info");
  const [drawingMode, setDrawingMode] = useState<'point' | 'polyline' | 'polygon'>('polyline');
  const [drawnRoute, setDrawnRoute] = useState<[number, number][]>([]);

  const filteredData = data.filter((item) => {
    const matchesSearch = searchTerm === "" || searchTerm === "all" || Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesUnit = filterUnit === "all" || item.donViQuanLy.toLowerCase().includes(filterUnit.toLowerCase());
    
    return matchesSearch && matchesUnit;
  });

  const handleAdd = () => {
    setFormData({
      maTuyen: "",
      tenTuyen: "",
      loaiDuong: "Quốc lộ",
      chieuDai: "",
      diemDau: "",
      diemCuoi: "",
      trangThai: "Hoạt động",
      tuKm: "0",
      denKm: "0",
      donViQuanLy: ""
    });
    setDrawnRoute([]);
    setDrawingMode('polyline');
    setActiveTab("info");
    setSelectedItem(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (item: TuyenDuong) => {
    setFormData({
      maTuyen: item.maTuyen,
      tenTuyen: item.tenTuyen,
      loaiDuong: item.loaiDuong,
      chieuDai: item.chieuDai.toString(),
      diemDau: item.diemDau,
      diemCuoi: item.diemCuoi,
      trangThai: item.trangThai,
      tuKm: item.tuKm.toString(),
      denKm: item.denKm.toString(),
      donViQuanLy: item.donViQuanLy
    });
    const route = roadRoutes.find(r => r.name === item.tenTuyen);
    setDrawnRoute(route ? route.coordinates : []);
    setDrawingMode('polyline');
    setActiveTab("info");
    setSelectedItem(item);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (item: TuyenDuong) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setData(data.filter((item) => item.id !== selectedItem.id));
      setIsDeleteDialogOpen(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      // Update
      setData(
        data.map((item) =>
          item.id === selectedItem.id
            ? { 
                ...item, 
                ...formData, 
                chieuDai: parseFloat(formData.chieuDai),
                tuKm: parseFloat(formData.tuKm),
                denKm: parseFloat(formData.denKm),
                toaDo: drawnRoute
              }
            : item
        )
      );
    } else {
      // Add new
      const newItem: TuyenDuong = {
        id: Date.now().toString(),
        ...formData,
        chieuDai: parseFloat(formData.chieuDai),
        tuKm: parseFloat(formData.tuKm),
        denKm: parseFloat(formData.denKm),
        toaDo: drawnRoute
      };
      setData([...data, newItem]);
    }
    setIsAddDialogOpen(false);
  };

  const handleExportExcel = () => {
    alert("Xuất file Excel - Chức năng sẽ được triển khai");
  };

  const roadRoutes = [
    {
      id: "r1",
      name: "Quốc lộ 1A",
      coordinates: [
        [21.0285, 105.8542],
        [20.95, 105.9],
        [20.8, 105.95],
        [20.6, 106.0],
      ] as [number, number][],
    }
  ];

  const stats = [
    { 
      label: "Tổng số km đường bộ", 
      value: "4,628 km", 
      change: "125 km", 
      trend: "up" as const, 
      icon: <Route className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Tuyến đường thêm mới 2026", 
      value: "156 km", 
      change: "12%", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Tuyến đường đến hạn bảo trì", 
      value: "84 km", 
      change: "5%", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Tổng số tuyến đường bộ", 
      value: "3,424 tuyến", 
      change: "32 tuyến", 
      trend: "up" as const, 
      icon: <ShieldCheck className="size-6 text-indigo-600" />, 
      color: "bg-indigo-600" 
    },
  ];

  return (
    <div className="space-y-6">
      <ListHeaderStats stats={stats} />
      
      {/* Search and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div>
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full xl:w-auto">
                <div className="w-full sm:w-[320px]">
                  <Select value={searchTerm === "" ? "all" : searchTerm} onValueChange={(val) => setSearchTerm(val === "all" ? "" : val)}>
                    <SelectTrigger className="h-10 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors w-full focus:ring-blue-500/30">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Search className="size-4" />
                        <SelectValue placeholder="Tìm kiếm mã / tên tuyến..." />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả tuyến đường</SelectItem>
                      <SelectItem value="QL1A">Quốc lộ 1A</SelectItem>
                      <SelectItem value="QL2">Quốc lộ 2</SelectItem>
                      <SelectItem value="QL3">Quốc lộ 3</SelectItem>
                      <SelectItem value="QL5">Quốc lộ 5</SelectItem>
                      <SelectItem value="DT741">Đường tỉnh 741</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-[280px]">
                  <Select value={filterUnit} onValueChange={setFilterUnit}>
                    <SelectTrigger className="h-10 border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors w-full focus:ring-blue-500/30">
                      <SelectValue placeholder="Đơn vị quản lý" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả đơn vị quản lý</SelectItem>
                      <SelectItem value="Cục Đường bộ">Cục Đường bộ Việt Nam</SelectItem>
                      <SelectItem value="Sở GTVT">Sở Giao thông Vận tải</SelectItem>
                      <SelectItem value="Vietnam Expressway">Vietnam Expressway</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <div className="flex items-center rounded-md border p-1 bg-slate-50 mr-1 sm:mr-2">
                  <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 shadow-none" title="Dạng danh sách">
                    <LayoutDashboard className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Danh sách</span>
                  </Button>
                  <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 shadow-none" title="Bản đồ không gian (GIS)">
                    <MapIcon className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Bản đồ</span>
                  </Button>
                </div>

                <Button onClick={handleAdd} className="h-10 px-4">
                  <Plus className="mr-2 size-4" />
                  Thêm mới
                </Button>
                <Button 
                  variant="outline" 
                  className="h-10 px-3 border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsImportDialogOpen(true)}
                >
                  <Upload className="size-4 sm:mr-2" />
                  <span className="hidden sm:inline">Nhập dữ liệu</span>
                </Button>
                <Button variant="outline" onClick={() => setIsMergeDialogOpen(true)} className="h-10 px-3 border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors">
                  <Layers className="size-4 sm:mr-2" />
                  <span className="hidden sm:inline">Gộp tuyến</span>
                </Button>
                <Button variant="outline" className="h-10 px-3 border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors" onClick={handleExportExcel}>
                  <Download className="size-4 sm:mr-2" />
                  <span className="hidden sm:inline">Xuất Excel</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      {viewMode === "list" && (
        <Card>
        <CardHeader>
          <CardTitle>Danh sách tuyến đường ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-bold">Mã tuyến</TableHead>
                  <TableHead className="font-bold">Tên tuyến</TableHead>
                  <TableHead className="font-bold">Lý trình (Km)</TableHead>
                  <TableHead className="font-bold">Chiều dài (km)</TableHead>
                  <TableHead className="font-bold">Số đoạn</TableHead>
                  <TableHead className="font-bold">Đơn vị quản lý</TableHead>
                  <TableHead className="font-bold">Trạng thái</TableHead>
                  <TableHead className="text-right font-bold">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      Không tìm thấy dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-blue-600">{item.maTuyen}</TableCell>
                      <TableCell className="font-medium">{item.tenTuyen}</TableCell>
                      <TableCell className="text-slate-600">
                        Km{item.tuKm} - Km{item.denKm}
                      </TableCell>
                      <TableCell>{item.chieuDai}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none">
                          {item.segmentsCount || 0} đoạn
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{item.donViQuanLy}</TableCell>
                      <TableCell>
                        <Badge
                          className={item.trangThai === "Hoạt động" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" : "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none"}
                        >
                          {item.trangThai}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">

                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              setSelectedItem(item);
                              setIsSplitDialogOpen(true);
                            }} 
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50" 
                            title="Tách tuyến thành đoạn"
                          >
                            <Scissors className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }} className="text-slate-600 hover:text-slate-900 hover:bg-slate-50" title="Xem chi tiết">
                            <Eye className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsDiagramDialogOpen(true); }} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50" title="Bình đồ duỗi thẳng">
                            <Ruler className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsAssetListDialogOpen(true); }} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" title="Danh sách tài sản trên tuyến">
                            <Layers className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="text-slate-600 hover:text-slate-900 hover:bg-slate-50" title="Sửa">
                            <Edit className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item)} className="text-destructive hover:text-destructive hover:bg-destructive/10" title="Xóa">
                            <Trash2 className="size-4" />
                          </Button>

                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="!max-w-[80%] max-h-[95vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-6">
          <DialogHeader className="border-b border-slate-100 pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-slate-900 text-lg">
                  {selectedItem ? "Cập nhật tuyến đường" : "Thêm mới tuyến đường"}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Nhập thông tin tuyến đường và xác định vị trí trên bản đồ
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden min-h-0">
            <TabsList className="bg-slate-50 border-b border-slate-200 rounded-none justify-start w-full h-12 flex-shrink-0 overflow-x-auto">
              <TabsTrigger value="info" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-slate-500 text-sm px-5 py-2 whitespace-nowrap">Thông tin chung</TabsTrigger>
              <TabsTrigger value="geometry" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-slate-500 text-sm px-5 py-2 whitespace-nowrap">Vị trí trên bản đồ</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="flex-1 overflow-auto mt-4 min-h-0">
              <form id="route-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Basic Info Section */}
                    <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
                      <h3 className="text-slate-900 font-semibold mb-3 border-b border-slate-200/60 pb-2">Thông tin cơ bản</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="maTuyen">Mã tuyến *</Label>
                            <Input id="maTuyen" value={formData.maTuyen} onChange={(e) => setFormData({ ...formData, maTuyen: e.target.value })} required className="border-slate-200 bg-white" placeholder="VD: QL1A" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tenTuyen">Tên tuyến *</Label>
                            <Input id="tenTuyen" value={formData.tenTuyen} onChange={(e) => setFormData({ ...formData, tenTuyen: e.target.value })} required className="border-slate-200 bg-white" placeholder="VD: Quốc lộ 1A" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="loaiDuong">Loại đường *</Label>
                            <Select value={formData.loaiDuong} onValueChange={(value) => setFormData({ ...formData, loaiDuong: value })}>
                              <SelectTrigger className="border-slate-200 bg-white"><SelectValue placeholder="Chọn loại đường" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Quốc lộ">Quốc lộ</SelectItem>
                                <SelectItem value="Đường tỉnh">Đường tỉnh</SelectItem>
                                <SelectItem value="Đường huyện">Đường huyện</SelectItem>
                                <SelectItem value="Đường đô thị">Đường đô thị</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="trangThai">Tình trạng</Label>
                            <Select value={formData.trangThai} onValueChange={(value) => setFormData({ ...formData, trangThai: value })}>
                              <SelectTrigger className="border-slate-200 bg-white"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                                <SelectItem value="Bảo trì">Bảo trì</SelectItem>
                                <SelectItem value="Tạm ngưng">Tạm ngưng</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Section */}
                    <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
                      <h3 className="text-slate-900 font-semibold mb-3 border-b border-slate-200/60 pb-2">Vị trí chặng</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="diemDau">Điểm bắt đầu *</Label>
                            <Input id="diemDau" value={formData.diemDau} onChange={(e) => setFormData({ ...formData, diemDau: e.target.value })} required className="border-slate-200 bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="diemCuoi">Điểm kết thúc *</Label>
                            <Input id="diemCuoi" value={formData.diemCuoi} onChange={(e) => setFormData({ ...formData, diemCuoi: e.target.value })} required className="border-slate-200 bg-white" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tuKm">Từ Km *</Label>
                            <Input id="tuKm" type="number" value={formData.tuKm} onChange={(e) => setFormData({ ...formData, tuKm: e.target.value })} required className="border-slate-200 bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="denKm">Đến Km *</Label>
                            <Input id="denKm" type="number" value={formData.denKm} onChange={(e) => setFormData({ ...formData, denKm: e.target.value })} required className="border-slate-200 bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="chieuDai">Trọng tải (km) *</Label>
                            <Input id="chieuDai" type="number" step="0.1" value={formData.chieuDai} onChange={(e) => setFormData({ ...formData, chieuDai: e.target.value })} required className="border-slate-200 bg-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Management Section */}
                    <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
                      <h3 className="text-slate-900 font-semibold mb-3 border-b border-slate-200/60 pb-2">Thông tin quản lý</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="donViQuanLy">Đơn vị quản lý *</Label>
                          <Input id="donViQuanLy" value={formData.donViQuanLy} onChange={(e) => setFormData({ ...formData, donViQuanLy: e.target.value })} required className="border-slate-200 bg-white" placeholder="VD: Cục Đường bộ Việt Nam" />
                        </div>
                      </div>
                    </div>

                    {/* Notes Section */}
                    <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
                      <h3 className="text-slate-900 font-semibold mb-3 border-b border-slate-200/60 pb-2">Ghi chú</h3>
                      <div className="space-y-4">
                         <p className="text-slate-500 text-sm italic">Chưa có tính năng nhập ghi chú hoặc tài liệu đính kèm cho phiên bản này.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="geometry" className="p-0 m-0 overflow-hidden relative flex flex-col h-[500px]">
              <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md border max-w-[250px]">
                <h4 className="font-semibold text-sm mb-2">Vẽ trên bản đồ số</h4>
                
                <div className="grid grid-cols-3 gap-1 mb-3">
                  <button 
                    onClick={() => setDrawingMode('point')}
                    className={`flex flex-col items-center gap-1 p-2 rounded border text-[10px] transition-colors ${drawingMode === 'point' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="w-4 h-4 rounded-full bg-current opacity-20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-current opacity-100"></div>
                    </div>
                    <span>Điểm</span>
                  </button>
                  <button 
                    onClick={() => setDrawingMode('polyline')}
                    className={`flex flex-col items-center gap-1 p-2 rounded border text-[10px] transition-colors ${drawingMode === 'polyline' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 19L19 5" />
                    </svg>
                    <span>Đường</span>
                  </button>
                  <button 
                    onClick={() => setDrawingMode('polygon')}
                    className={`flex flex-col items-center gap-1 p-2 rounded border text-[10px] transition-colors ${drawingMode === 'polygon' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="w-4 h-4 border-2 border-current opacity-80 [clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)]"></div>
                    <span>Vùng</span>
                  </button>
                </div>
                
                <p className="text-[10px] text-slate-500 leading-tight">
                  {drawingMode === 'point' ? 'Nhấp vào bản đồ để đánh dấu điểm.' : 
                   drawingMode === 'polyline' ? 'Nhấp vào bản đồ để thêm các điểm mốc cho tuyến đường.' : 
                   'Nhấp vào bản đồ để vẽ ranh giới cho vùng diện tích.'}
                </p>
                <div className="mt-2 text-[10px] font-mono bg-slate-50 p-1.5 rounded flex justify-between items-center">
                  <span>Số điểm: {drawnRoute.length}</span>
                </div>
              </div>
              <SimpleMapView 
                markers={typeof filteredData !== 'undefined' ? filteredData.map((item: any) => ({
                id: item.id || String(Math.random()),
                lat: item.toaDo ? item.toaDo[0] : 21.0285 + (Math.random() - 0.5) * 0.1,
                lng: item.toaDo ? item.toaDo[1] : 105.8542 + (Math.random() - 0.5) * 0.1,
                name: item.tenTuyen || item.tenCau || item.tenHam || item.tuyenDuong || item.tenGa || item.tenTram || item.tenBien || item.assetName || "Tài sản GIS",
                type: item.loaiDuong || item.loaiCau || item.tenLoaiHam || item.phanLoai || item.loaiBien || item.status || "Tài sản GIS"
              })) : []} 
                height="500px" 
                isDrawingMode={true} 
                drawingMode={drawingMode}
                initialCoordinates={drawnRoute}
                onRoutesChange={setDrawnRoute}
                onLocationChange={(lat, lng) => {
                  if (drawingMode === 'point') {
                    setDrawnRoute([[lat, lng]]);
                  }
                }}
                isActive={activeTab === "geometry"}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="p-6 border-t bg-slate-50/50">
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" form="route-form">Lưu dữ liệu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <DetailDialog 
        open={isDetailDialogOpen} 
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem}
        selectedCard={{ title: "Tuyến đường bộ" }}
        onEditClick={() => { setIsDetailDialogOpen(false); handleEdit(selectedItem!); }}
      />

      <StraightLineDiagramDialog 
        open={isDiagramDialogOpen}
        onOpenChange={setIsDiagramDialogOpen}
        title={`Bình đồ duỗi thẳng: ${selectedItem?.tenTuyen}`}
        startKm={69}
        endKm={72}
        points={[
          { km: 69.4, label: "Biển báo P.102 (Km69+400)", type: "sign_info", side: "top" },
          { km: 70.8, label: "Cột Km 70+800", type: "sign_info", side: "top" },
          { km: 70.25, label: "Ngã 3 rẽ trái", type: "sign_warning", side: "bottom" },
          { km: 71.3, label: "Công trường", type: "sign_warning", side: "bottom" },
          { km: 69.6, label: "Cầu vượt Tân Tiến", type: "bridge", side: "center" }
        ]}
        segments={[
          { startKm: 69.1, endKm: 69.4, label: "Sửa chữa mặt đường đoạn 1 (Km69+100 - Km69+400)", type: "repair", color: "#10b981", position: "top" },
          { startKm: 70.1, endKm: 70.8, label: "Hư hỏng mặt đường nặng (Km70+100 - Km70+800)", type: "defect", color: "#ef4444", position: "bottom" }
        ]}
      />


      <RouteAssetDialog 
        open={isAssetListDialogOpen}
        onOpenChange={setIsAssetListDialogOpen}
        routeName={selectedItem?.tenTuyen || ""}
        assets={[
          { id: "a1", type: "Cột Km", km: "Km10+200", side: "Phải", status: "Tốt", note: "Mới sơn lại" },
          { id: "a2", type: "Cột Km", km: "Km10+500", side: "Phải", status: "Bình thường" },
          { id: "a3", type: "Cột H", km: "Km10+250", h: "H1", side: "Trái", status: "Tốt" },
          { id: "a4", type: "Biển báo", km: "Km11+100", side: "Phải", status: "Cần bảo trì", note: "Biển báo mờ, cần thay thế" },
          { id: "a5", type: "Lý trình", km: "Km12+000", side: "Giữa", status: "Bình thường" },
          { id: "a6", type: "Cột Km", km: "Km13+400", side: "Phải", status: "Hư hỏng", note: "Bị gãy do tai nạn" },
          { id: "a7", type: "Biển báo", km: "Km15+000", side: "Trái", status: "Tốt", note: "Biển báo hiệu lệnh" }
        ]}
      />
      {/* Split Dialog */}
      <Dialog open={isSplitDialogOpen} onOpenChange={setIsSplitDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tách tuyến thành các đoạn</DialogTitle>
            <DialogDescription>
              Tách tuyến {selectedItem?.tenTuyen} thành một hoặc nhiều đoạn đường mới. Tuyến gốc vẫn được giữ nguyên.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Lý trình hiện tại</p>
                <div className="text-lg font-bold text-blue-900">
                  Km{selectedItem?.tuKm} - Km{selectedItem?.denKm}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Tổng chiều dài</p>
                <div className="text-lg font-bold text-blue-900">{selectedItem?.chieuDai} km</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-bold text-slate-700">Định nghĩa các đoạn mới</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSplitSegments([...splitSegments, { from: 0, to: 0 }])}
                  className="h-8 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="size-3 mr-1" />
                  Thêm đoạn
                </Button>
              </div>
              
              <div className="space-y-3 max-h-[250px] overflow-auto pr-2">
                {splitSegments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-100 group">
                    <div className="flex-none bg-white w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {index + 1}
                    </div>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-slate-500">Từ Km</Label>
                        <Input 
                          type="number" 
                          value={segment.from} 
                          onChange={(e) => {
                            const newSegments = [...splitSegments];
                            newSegments[index].from = Number(e.target.value);
                            setSplitSegments(newSegments);
                          }}
                          className="h-9 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-slate-500">Đến Km</Label>
                        <Input 
                          type="number" 
                          value={segment.to} 
                          onChange={(e) => {
                            const newSegments = [...splitSegments];
                            newSegments[index].to = Number(e.target.value);
                            setSplitSegments(newSegments);
                          }}
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setSplitSegments(splitSegments.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Đoạn thừa (chưa tách)</span>
                <span className="text-[10px] text-orange-600 italic">* Các đoạn này sẽ không được tạo bản ghi mới</span>
              </div>
              <div className="text-sm font-medium text-orange-900">
                {/* Simplified logic for leftover: just showing what's after the last segment */}
                {(() => {
                  const maxTo = Math.max(...splitSegments.map(s => s.to), 0);
                  const totalDen = selectedItem?.denKm || 0;
                  if (maxTo < totalDen) {
                    return `Km${maxTo} - Km${totalDen}`;
                  }
                  return "Không có đoạn thừa";
                })()}
              </div>
            </div>
          </div>
          <DialogFooter className="bg-slate-50 p-6 -mx-6 -mb-6 border-t mt-4 rounded-b-lg">
            <Button variant="outline" onClick={() => setIsSplitDialogOpen(false)}>Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              alert(`Xác nhận tách thành ${splitSegments.length} đoạn. Dữ liệu các đoạn đã được đẩy sang màn Quản lý đoạn đường bộ. Tuyến gốc ${selectedItem?.tenTuyen} vẫn được giữ nguyên.`);
              setIsSplitDialogOpen(false);
              setSplitSegments([{ from: 0, to: 0 }]);
            }}>
              Xác nhận tách & đẩy dữ liệu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Merge Dialog */}
      <Dialog open={isMergeDialogOpen} onOpenChange={setIsMergeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gộp các tuyến đường</DialogTitle>
            <DialogDescription>
              Chọn 2 tuyến đường để gộp thành 1 tuyến duy nhất.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tuyến đường thứ nhất</Label>
              <Select>
                <SelectTrigger className="border-slate-200">
                  <SelectValue placeholder="Chọn tuyến 1" />
                </SelectTrigger>
                <SelectContent>
                  {data.map(t => <SelectItem key={t.id} value={t.id}>{t.maTuyen} - {t.tenTuyen}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="text-center text-slate-400 font-bold">+</div>
            <div className="space-y-2">
              <Label>Tuyến đường thứ hai</Label>
              <Select>
                <SelectTrigger className="border-slate-200">
                  <SelectValue placeholder="Chọn tuyến 2" />
                </SelectTrigger>
                <SelectContent>
                  {data.filter(t => t.id !== "1").map(t => <SelectItem key={t.id} value={t.id}>{t.maTuyen} - {t.tenTuyen}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2 border-t mt-4 space-y-2">
              <Label htmlFor="newName">Tên tuyến sau khi gộp</Label>
              <Input id="newName" placeholder="Nhập tên tuyến mới" className="border-slate-200" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMergeDialogOpen(false)}>Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              alert("Gộp tuyến thành công!");
              setIsMergeDialogOpen(false);
            }}>
              Xác nhận gộp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ImportDialog 
        open={isImportDialogOpen} 
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Tuyến đường bộ"
        fields={routeFields}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />

      <DeleteDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCard={{ title: "Tuyến đường bộ" }}
        selectedItem={selectedItem ? {
          fullName: selectedItem.tenTuyen,
          idNumber: selectedItem.maTuyen,
          registrationDate: "15/01/2024" // Mock date
        } : null}
        onConfirmDelete={confirmDelete}
      />

    </div>
  );
}
