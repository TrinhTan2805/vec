import { useState } from "react";
import { 
  Search, Plus, Edit, Trash2, Download, Eye, FileText, 
  MapPin, Upload, BarChart3, AlertTriangle, ShieldCheck, 
  LayoutDashboard, Layers, Map as MapIcon, HardHat, Calendar,
  Clock, CheckCircle2, AlertCircle, Route
} from "lucide-react";
import { cn } from "../../components/ui/utils";

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
import { ListHeaderStats } from "../../components/infrastructure/ListHeaderStats";

interface GiayPhep {
  id: string;
  soGP: string;
  tenDuAn: string;
  donViThiCong: string;
  viTri: string;
  thoiGian: string;
  trangThai: "Đang chờ duyệt" | "Đã cấp phép" | "Đang thi công" | "Đã hoàn trả" | "Quá hạn";
  tienDoHoanTra: number;
}

const mockData: GiayPhep[] = [
  { 
    id: "1", 
    soGP: "GP/2026/001", 
    tenDuAn: "Sửa chữa cáp viễn thông FPT", 
    donViThiCong: "Công ty FPT Telecom", 
    viTri: "Số 15 Cầu Giấy", 
    thoiGian: "10/04/2026 - 15/04/2026", 
    trangThai: "Đang thi công",
    tienDoHoanTra: 45
  },
  { 
    id: "2", 
    soGP: "GP/2026/012", 
    tenDuAn: "Lắp đặt đường ống nước sạch", 
    donViThiCong: "Công ty Nước sạch Hà Nội", 
    viTri: "Ngã tư Sở - Đường Láng", 
    thoiGian: "05/04/2026 - 20/04/2026", 
    trangThai: "Đã cấp phép",
    tienDoHoanTra: 0
  },
  { 
    id: "3", 
    soGP: "GP/2026/005", 
    tenDuAn: "Ngầm hóa lưới điện", 
    donViThiCong: "EVN Hà Nội", 
    viTri: "Phố Huế", 
    thoiGian: "01/03/2026 - 15/03/2026", 
    trangThai: "Đã hoàn trả",
    tienDoHoanTra: 100
  },
  { 
    id: "4", 
    soGP: "GP/2025/156", 
    tenDuAn: "Sửa chữa cống thoát nước", 
    donViThiCong: "Thoát nước Hà Nội", 
    viTri: "Trần Duy Hưng", 
    thoiGian: "20/03/2026 - 25/03/2026", 
    trangThai: "Quá hạn",
    tienDoHoanTra: 80
  },
];

export default function GiayPhepDaoDuong() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [data, setData] = useState<GiayPhep[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GiayPhep | null>(null);
  const [activeTab, setActiveTab] = useState("info");
  const [drawingMode, setDrawingMode] = useState<'point' | 'polyline' | 'polygon' | undefined>(undefined);
  
  const [formData, setFormData] = useState({
    soGP: "",
    tenDuAn: "",
    donViThiCong: "",
    viTri: "",
    thoiGian: "",
    trangThai: "Đã cấp phép" as any,
    tienDoHoanTra: 0,
  });

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const stats = [
    { 
      label: "Tổng số Giấy phép", 
      value: "156 bản", 
      change: "+12", 
      trend: "up" as const, 
      icon: <FileText className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Đang thi công đào cắt", 
      value: "24 điểm", 
      change: "Ổn định", 
      trend: "up" as const, 
      icon: <HardHat className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Quá hạn hoàn trả", 
      value: "05 vị trí", 
      change: "+2", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-red-600" />, 
      color: "bg-red-600" 
    },
    { 
      label: "Đã hoàn trả mặt đường", 
      value: "127 vị trí", 
      change: "92%", 
      trend: "up" as const, 
      icon: <CheckCircle2 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã cấp phép": return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Đã cấp phép</Badge>;
      case "Đang thi công": return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Đang thi công</Badge>;
      case "Đã hoàn trả": return <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Đã hoàn trả</Badge>;
      case "Quá hạn": return <Badge variant="destructive">Quá hạn</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAdd = () => {
    setFormData({
      soGP: "",
      tenDuAn: "",
      donViThiCong: "",
      viTri: "",
      thoiGian: "",
      trangThai: "Đã cấp phép",
      tienDoHoanTra: 0,
    });
    setSelectedItem(null);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <ListHeaderStats stats={stats} />
      
      <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  placeholder="Tìm kiếm số GP, tên dự án, đơn vị..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="approved">Đã cấp phép</SelectItem>
                  <SelectItem value="working">Đang thi công</SelectItem>
                  <SelectItem value="finished">Đã hoàn trả</SelectItem>
                  <SelectItem value="overdue">Quá hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center rounded-lg border p-1 bg-slate-100/50 mr-2">
                <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 px-3">
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Danh sách
                </Button>
                <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 px-3">
                  <MapIcon className="h-4 w-4 mr-2" /> Bản đồ GIS
                </Button>
              </div>

              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 size-4" /> Cấp phép mới
              </Button>
              <Button variant="outline" className="bg-white border-slate-200">
                <Download className="mr-2 size-4" /> Xuất Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "list" ? (
        <Card className="border-none shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[150px] font-bold">Số Giấy phép</TableHead>
                <TableHead className="font-bold">Dự án/Công trình</TableHead>
                <TableHead className="font-bold">Đơn vị thi công</TableHead>
                <TableHead className="font-bold">Thời gian</TableHead>
                <TableHead className="font-bold">Trạng thái</TableHead>
                <TableHead className="font-bold">Tiến độ hoàn trả</TableHead>
                <TableHead className="text-right font-bold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/30 transition-colors">
                  <TableCell className="font-bold text-blue-700">{item.soGP}</TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900">{item.tenDuAn}</div>
                    <div className="text-xs text-slate-500 flex items-center mt-1">
                      <MapPin className="size-3 mr-1" /> {item.viTri}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{item.donViThiCong}</TableCell>
                  <TableCell className="text-slate-600 text-xs">
                    <div className="flex items-center gap-1"><Calendar className="size-3" /> {item.thoiGian.split(' - ')[0]}</div>
                    <div className="flex items-center gap-1 mt-1 text-slate-400">đến {item.thoiGian.split(' - ')[1]}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.trangThai)}</TableCell>
                  <TableCell>
                    <div className="w-full space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                        <span>{item.tienDoHoanTra}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-500",
                            item.tienDoHoanTra === 100 ? "bg-emerald-500" : 
                            item.tienDoHoanTra > 50 ? "bg-blue-500" : "bg-amber-500"
                          )} 
                          style={{ width: `${item.tienDoHoanTra}%` }} 
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }}>
                        <Eye className="size-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8">
                        <Edit className="size-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8">
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="h-[650px] overflow-hidden border-none shadow-sm relative">
          <div className="absolute top-4 left-4 z-10 space-y-2">
             <div className="bg-white/95 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-200 min-w-[200px]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Lọc bản đồ</h4>
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-sm">
                      <div className="size-3 rounded-full bg-amber-500" />
                      <span>Đang thi công (24)</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm">
                      <div className="size-3 rounded-full bg-blue-500" />
                      <span>Sắp thi công (12)</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm">
                      <div className="size-3 rounded-full bg-red-500" />
                      <span>Quá hạn hoàn trả (5)</span>
                   </div>
                </div>
             </div>
          </div>
          <SimpleMapView 
            isActive={viewMode === "map"}
            center={[21.0285, 105.8542]}
            zoom={13}
            markers={data.map(item => ({
              id: item.id,
              lat: 21.0285 + (Math.random() - 0.5) * 0.05,
              lng: 105.8542 + (Math.random() - 0.5) * 0.05,
              name: item.tenDuAn,
              type: item.trangThai
            }))}
          />
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[1100px] !max-w-[1100px] w-[95vw] h-[90vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl rounded-2xl">
          <DialogHeader className="p-6 bg-slate-50/80 backdrop-blur-md border-b">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="size-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                 <Plus className="size-5" />
              </div>
              {selectedItem ? "Cập nhật Giấy phép" : "Cấp phép đào đường mới"}
            </DialogTitle>
            <DialogDescription className="text-sm mt-2">Nhập đầy đủ thông tin dự án, lý trình và vị trí thi công thực tế.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="bg-slate-50/50 px-6 border-b h-14 justify-start rounded-none gap-8">
              <TabsTrigger value="info" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14 px-0 font-bold text-sm">1. Thông tin chung</TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14 px-0 font-bold text-sm">2. Vị trí không gian (GIS)</TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14 px-0 font-bold text-sm">3. Hồ sơ đính kèm</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="p-8 overflow-auto flex-1 m-0 bg-white">
              <div className="space-y-8 max-w-5xl mx-auto">
                 {/* Khối 1: Thông tin cơ bản */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-3">
                      <Label className="font-bold text-slate-700">Số Giấy phép</Label>
                      <Input placeholder="Ví dụ: GP/2026/..." className="h-11 bg-slate-50" />
                    </div>
                    <div className="space-y-3">
                      <Label className="font-bold text-slate-700">Tên Dự án/Công trình</Label>
                      <Input placeholder="Tên công trình đào cắt..." className="h-11 bg-slate-50" />
                    </div>
                    <div className="space-y-3">
                      <Label className="font-bold text-slate-700">Đơn vị thi công</Label>
                      <Input placeholder="Tên công ty thực hiện..." className="h-11 bg-slate-50" />
                    </div>
                    <div className="space-y-3">
                      <Label className="font-bold text-slate-700">Đại diện đơn vị (SĐT)</Label>
                      <Input placeholder="09xx..." className="h-11 bg-slate-50" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="font-bold text-slate-700">Tuyến đường/Địa điểm</Label>
                      <Input placeholder="Số nhà, tên phố..." className="h-11 bg-slate-50" />
                    </div>
                 </div>

                 <div className="h-[1px] w-full bg-slate-100 my-4" />

                 {/* Khối 2: Lý trình & Chiều dài */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                    <div className="space-y-3">
                      <Label className="font-bold text-blue-700">Lý trình đầu (Km + m)</Label>
                      <Input placeholder="VD: Km1+200" className="h-11 border-blue-200 bg-blue-50/50" />
                    </div>
                    <div className="space-y-3">
                      <Label className="font-bold text-blue-700">Lý trình cuối (Km + m)</Label>
                      <Input placeholder="VD: Km2+500" className="h-11 border-blue-200 bg-blue-50/50" />
                    </div>
                    <div className="space-y-3">
                      <Label className="font-bold text-emerald-700">Chiều dài thi công (m)</Label>
                      <Input type="number" placeholder="Độ dài..." className="h-11 border-emerald-200 bg-emerald-50/50" />
                    </div>

                    <div className="space-y-3">
                      <Label className="font-bold text-slate-700">Ngày bắt đầu</Label>
                      <Input type="date" className="h-11 bg-slate-50" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="font-bold text-amber-700">Ngày dự kiến kết thúc</Label>
                      <Input type="date" className="h-11 border-amber-200 bg-amber-50/50" />
                    </div>
                 </div>

                 <div className="h-[1px] w-full bg-slate-100 my-4" />

                 {/* Khối 3: Nội dung */}
                 <div className="space-y-3">
                    <Label className="font-bold text-slate-700">Nội dung thi công</Label>
                    <textarea 
                       placeholder="Mô tả chi tiết nội dung, phương án thi công..." 
                       className="w-full h-28 p-4 border rounded-xl text-sm bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                 </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="flex-1 p-0 m-0 relative bg-slate-100">
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-xl border border-slate-200 w-80">
                <div className="flex items-center gap-2 mb-4">
                   <MapPin className="size-5 text-blue-600" />
                   <h4 className="text-sm font-bold text-slate-800">Định vị theo Lý trình</h4>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                   Hệ thống tự động xác định vị trí thi công trên bản đồ thông qua thông tin Lý trình đã nhập.
                </p>
                
                <div className="space-y-3 bg-slate-50 p-3 rounded-lg border">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Lý trình đầu:</span>
                      <span className="font-bold text-blue-600">Km1+200</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Lý trình cuối:</span>
                      <span className="font-bold text-blue-600">Km2+500</span>
                   </div>
                   <div className="w-full h-[1px] bg-slate-200 my-1" />
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Tổng chiều dài:</span>
                      <span className="font-bold text-emerald-600">1,300 m</span>
                   </div>
                </div>

                <Button className="w-full mt-4 bg-slate-900 text-white hover:bg-slate-800">
                   <Layers className="size-4 mr-2" /> Cập nhật vị trí bản đồ
                </Button>
              </div>
              <SimpleMapView 
                isActive={activeTab === 'location'} 
                center={[21.0285, 105.8542]} 
                zoom={14} 
                markers={[]}
                routes={[
                  {
                     id: "temp-route",
                     name: "Đoạn đường thi công",
                     color: "#f59e0b",
                     weight: 6,
                     coordinates: [
                        [21.025, 105.850],
                        [21.030, 105.855]
                     ] as [number, number][]
                  }
                ]}
              />
            </TabsContent>

            <TabsContent value="docs" className="p-8 flex-1 overflow-auto m-0 bg-white">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group">
                     <div className="size-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <Upload className="size-8 text-blue-600" />
                     </div>
                     <p className="text-base font-bold text-slate-900">Văn bản xin phép (.pdf)</p>
                     <p className="text-sm text-slate-500 mt-2">Kéo thả hoặc click để tải lên</p>
                  </div>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-400 transition-all cursor-pointer group">
                     <div className="size-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <MapIcon className="size-8 text-emerald-600" />
                     </div>
                     <p className="text-base font-bold text-slate-900">Bản vẽ kỹ thuật (.jpg, .pdf)</p>
                     <p className="text-sm text-slate-500 mt-2">Kéo thả hoặc click để tải lên</p>
                  </div>
               </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="p-6 bg-slate-50/80 backdrop-blur-md border-t gap-3 mt-auto">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="bg-white px-8 h-11 font-semibold">Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 h-11 font-semibold">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <DetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedItem={selectedItem ? {
          ...selectedItem,
          fullName: selectedItem.tenDuAn,
          idNumber: selectedItem.soGP,
          status: selectedItem.trangThai
        } : null}
        onEditClick={() => {}}
        selectedCard={{ title: "Giấy phép đào đường" }}
      />
    </div>
  );
}
