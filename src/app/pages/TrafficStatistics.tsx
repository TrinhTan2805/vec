import { useState } from "react";
import { 
  Download, Calendar, BarChart2, TrendingUp, AlertCircle, 
  Map as MapIcon, List, Filter, ChevronRight, Info,
  Car, Bike, Truck, Bus, Activity, Layers, ArrowRightLeft,
  Search, Plus, Clock, FileUp, Edit, Trash2, Eye, MapPin,
  CheckCircle2, Upload
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area,
  Cell, PieChart, Pie
} from 'recharts';
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SimpleMapView } from "../components/map/SimpleMapView";
import { cn } from "../components/ui/utils";
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

const dataWeekly = [
  { name: 'T2', oto: 4000, xemay: 24000, xl: 2400, routeB: 3500 },
  { name: 'T3', oto: 3000, xemay: 13980, xl: 2210, routeB: 3800 },
  { name: 'T4', oto: 2000, xemay: 38000, xl: 2290, routeB: 3100 },
  { name: 'T5', oto: 2780, xemay: 39080, xl: 2000, routeB: 4200 },
  { name: 'T6', oto: 1890, xemay: 48000, xl: 2181, routeB: 5000 },
  { name: 'T7', oto: 2390, xemay: 38000, xl: 2500, routeB: 4800 },
  { name: 'CN', oto: 3490, xemay: 43000, xl: 2100, routeB: 4100 },
];

const dataHourly = [
  { time: '06:00', vol: 1200, compare: 1000 },
  { time: '07:00', vol: 3500, compare: 2800 },
  { time: '08:00', vol: 5800, compare: 5200 },
  { time: '09:00', vol: 4200, compare: 4500 },
  { time: '10:00', vol: 2800, compare: 3100 },
  { time: '11:00', vol: 2600, compare: 2400 },
  { time: '12:00', vol: 3100, compare: 2900 },
  { time: '17:00', vol: 6200, compare: 5800 },
  { time: '18:00', vol: 5900, compare: 6100 },
];

const vehiclePieData = [
  { name: 'Xe máy', value: 80, color: '#0ea5e9' },
  { name: 'Ô tô con', value: 12, color: '#3b82f6' },
  { name: 'Xe tải', value: 5, color: '#f43f5e' },
  { name: 'Xe buýt', value: 3, color: '#10b981' },
];

const routes = [
  { id: 't1', name: 'QL32 - Cầu Diễn', status: 'normal', vol: '8.5k' },
  { id: 't2', name: 'Vành Đai 3 - Ngã tư sở', status: 'congested', vol: '12.2k' },
  { id: 't3', name: 'Đại lộ Thăng Long', status: 'normal', vol: '5.1k' },
  { id: 't4', name: 'Trần Duy Hưng', status: 'heavy', vol: '9.8k' },
];

const mockRecords = [
  { id: "R001", time: "10:00 10/05/2026", route: "QL32 - Cầu Diễn", vol: 1250, type: "Tự động (Sensor)" },
  { id: "R002", time: "10:15 10/05/2026", route: "Vành Đai 3", vol: 3400, type: "Camera AI" },
  { id: "R003", time: "10:30 10/05/2026", route: "Trần Duy Hưng", vol: 2100, type: "Thủ công" },
  { id: "R004", time: "10:45 10/05/2026", route: "Đại lộ Thăng Long", vol: 1800, type: "Tự động (Sensor)" },
];

export default function TrafficStatistics() {
  const [activeTab, setActiveTab] = useState("records");
  const [selectedRoutes, setSelectedRoutes] = useState(['t1']);
  const [records, setRecords] = useState(mockRecords);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [historyRecord, setHistoryRecord] = useState<any>(null);

  const toggleRoute = (id: string) => {
    if (selectedRoutes.includes(id)) {
      if (selectedRoutes.length > 1) {
        setSelectedRoutes(selectedRoutes.filter(r => r !== id));
      }
    } else {
      setSelectedRoutes([...selectedRoutes, id]);
    }
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const showHistory = (record: any) => {
    setHistoryRecord(record);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="bg-white border-slate-200" onClick={() => setIsImportDialogOpen(true)}>
            <FileUp className="h-4 w-4 mr-2 text-emerald-600" /> Import Excel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" /> Xuất Báo cáo
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between bg-white/50 backdrop-blur-md p-1 rounded-xl border border-slate-200 mb-6 overflow-x-auto">
          <TabsList className="bg-transparent border-none">
            <TabsTrigger value="records" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6">
              <List className="size-4 mr-2" /> Dữ liệu đo đếm
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6">
              <BarChart2 className="size-4 mr-2" /> Thống kê chi tiết
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6">
              <MapIcon className="size-4 mr-2" /> Bản đồ điểm đo
            </TabsTrigger>
            <TabsTrigger value="compare" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-6">
              <ArrowRightLeft className="size-4 mr-2" /> So sánh tuyến
            </TabsTrigger>
          </TabsList>
          
          <div className="hidden lg:flex items-center gap-2 pr-2">
             <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 py-1 px-3">
                <Activity className="size-3 animate-pulse" /> 156 điểm đang truyền tin
             </Badge>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6 m-0 outline-none">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-none shadow-sm overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng lưu lượng (24h)</CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                  <Activity className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">1,842,500</div>
                <div className="flex items-center gap-1.5 mt-2">
                   <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-none px-1.5 py-0">
                      <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
                   </Badge>
                   <span className="text-[10px] text-slate-400 font-medium">so với cùng kỳ</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Cao điểm sáng</CardTitle>
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:scale-110 transition-transform">
                  <Clock className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">8,500 <span className="text-xs font-normal text-slate-400">PCU/h</span></div>
                <p className="text-[11px] text-slate-500 mt-2 flex items-center">
                   <AlertCircle className="size-3 mr-1 text-amber-500" /> Vượt 120% năng lực thông hành
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Phân bổ phương tiện</CardTitle>
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform">
                  <BarChart2 className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mt-1">
                   <div className="flex items-center gap-2">
                      <Bike className="size-3 text-sky-500" />
                      <span className="text-xs font-bold">80% <span className="text-[10px] font-normal text-slate-400 ml-1">Xe máy</span></span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Car className="size-3 text-blue-600" />
                      <span className="text-xs font-bold">15% <span className="text-[10px] font-normal text-slate-400 ml-1">Ô tô</span></span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Truck className="size-3 text-rose-500" />
                      <span className="text-xs font-bold">4% <span className="text-[10px] font-normal text-slate-400 ml-1">Xe tải</span></span>
                   </div>
                   <div className="flex items-center gap-2">
                      <Bus className="size-3 text-emerald-500" />
                      <span className="text-xs font-bold">1% <span className="text-[10px] font-normal text-slate-400 ml-1">Xe buýt</span></span>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden group bg-slate-900 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-300">Chỉ số tắc nghẽn (TCI)</CardTitle>
                <div className="p-2 bg-white/10 rounded-lg text-amber-400">
                  <Activity className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-400">6.8 / 10</div>
                <p className="text-[11px] text-slate-400 mt-2 font-medium">Mức độ ùn tắc: <span className="text-amber-400">TRUNG BÌNH CAO</span></p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
                <div>
                  <CardTitle className="text-base font-bold">Diễn biến Lưu lượng theo Giờ</CardTitle>
                  <CardDescription className="text-xs">Dữ liệu tổng hợp từ các điểm đo cảm biến & Camera</CardDescription>
                </div>
                <Select defaultValue="t1">
                   <SelectTrigger className="w-[200px] h-8 text-xs font-bold">
                      <SelectValue placeholder="Chọn tuyến đường" />
                   </SelectTrigger>
                   <SelectContent>
                      {routes.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                   </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataHourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`${value} xe`, 'Lưu lượng']} 
                      />
                      <Area type="monotone" dataKey="vol" name="Lượng xe (PCU)" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="border-b border-slate-50 pb-4">
                <CardTitle className="text-base font-bold">Cơ cấu Phương tiện</CardTitle>
                <CardDescription className="text-xs">Tỷ lệ theo chủng loại phương tiện</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vehiclePieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {vehiclePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                   {vehiclePieData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full" style={{backgroundColor: item.color}} />
                            <span className="text-xs font-medium text-slate-600">{item.name}</span>
                         </div>
                         <span className="text-xs font-bold text-slate-900">{item.value}%</span>
                      </div>
                   ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-6 m-0 outline-none">
           <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                 <div>
                    <CardTitle className="text-lg font-bold">Danh sách Bản ghi Đo đếm</CardTitle>
                    <CardDescription className="text-xs">Quản lý, thêm mới và chỉnh sửa dữ liệu lưu lượng thực tế</CardDescription>
                 </div>
                 <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600" onClick={handleAdd}>
                       <Plus className="size-4 mr-1" /> Thêm bản ghi
                    </Button>
                 </div>
              </CardHeader>
              <Table>
                 <TableHeader className="bg-slate-50/50">
                    <TableRow>
                       <TableHead className="font-bold">Mã bản ghi</TableHead>
                       <TableHead className="font-bold">Thời gian</TableHead>
                       <TableHead className="font-bold">Tuyến đường/Nút giao</TableHead>
                       <TableHead className="font-bold">Lưu lượng (PCU)</TableHead>
                       <TableHead className="font-bold">Phương thức</TableHead>
                       <TableHead className="text-right font-bold">Thao tác</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {records.map((record) => (
                       <TableRow key={record.id} className="hover:bg-slate-50/30">
                          <TableCell 
                            className="font-bold text-blue-600 cursor-pointer hover:underline"
                            onClick={() => showHistory(record)}
                          >
                            {record.id}
                          </TableCell>
                          <TableCell>{record.time}</TableCell>
                          <TableCell className="font-medium">{record.route}</TableCell>
                          <TableCell className="font-bold">{record.vol.toLocaleString()} xe</TableCell>
                          <TableCell>
                             <Badge variant="outline" className={cn(
                               "text-[10px]",
                               record.type.includes("Tự động") ? "text-emerald-600 border-emerald-200 bg-emerald-50" : 
                               record.type.includes("Camera") ? "text-blue-600 border-blue-200 bg-blue-50" : "text-slate-600"
                             )}>
                                {record.type}
                             </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                             <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="icon" className="size-8" onClick={() => handleEdit(record)}>
                                   <Edit className="size-4 text-blue-600" />
                                </Button>
                                <Button variant="ghost" size="icon" className="size-8" onClick={() => handleDelete(record.id)}>
                                   <Trash2 className="size-4 text-red-500" />
                                </Button>
                             </div>
                          </TableCell>
                       </TableRow>
                    ))}
                 </TableBody>
              </Table>
           </Card>
        </TabsContent>

        <TabsContent value="map" className="m-0 outline-none">
          <Card className="h-[650px] overflow-hidden border-none shadow-sm relative">
             <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200 w-80">
                <div className="relative mb-4">
                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="Tìm điểm đo, camera..." className="pl-9 h-9" />
                </div>
                <h4 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest">Loại điểm đo</h4>
                <div className="space-y-3">
                   <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            <Activity className="size-4" />
                         </div>
                         <div>
                            <p className="text-xs font-bold">Vòng từ cảm biến</p>
                            <p className="text-[10px] text-slate-500">84 điểm hoạt động</p>
                         </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] h-5">98%</Badge>
                   </div>
                   <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <MapIcon className="size-4" />
                         </div>
                         <div>
                            <p className="text-xs font-bold">Camera AI (VMS)</p>
                            <p className="text-[10px] text-slate-500">42 điểm hoạt động</p>
                         </div>
                      </div>
                      <Badge variant="outline" className="text-[10px] h-5">92%</Badge>
                   </div>
                </div>
             </div>
             <SimpleMapView 
               isActive={activeTab === 'map'} 
               center={[21.0285, 105.8542]} 
               zoom={14} 
               markers={[
                 { id: 'm1', lat: 21.036, lng: 105.834, name: 'Điểm đo Cầu Giấy', type: 'camera' },
                 { id: 'm2', lat: 21.028, lng: 105.854, name: 'Điểm đo Phố Huế', type: 'sensor' },
                 { id: 'm3', lat: 21.045, lng: 105.820, name: 'Điểm đo Võ Chí Công', type: 'camera' },
               ]}
             />
          </Card>
        </TabsContent>

        <TabsContent value="compare" className="m-0 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
             <Card className="border-none shadow-sm bg-white lg:col-span-1">
                <CardHeader>
                   <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Chọn tuyến so sánh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   {routes.map(r => (
                      <div 
                        key={r.id} 
                        onClick={() => toggleRoute(r.id)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all",
                          selectedRoutes.includes(r.id) ? "bg-blue-50 border-blue-200" : "bg-white border-slate-100 hover:border-slate-200"
                        )}
                      >
                         <div className="flex flex-col">
                            <span className="text-xs font-bold">{r.name}</span>
                            <span className="text-[10px] text-slate-500">{r.vol} xe/h</span>
                         </div>
                         <div className={cn(
                           "size-5 rounded-full border flex items-center justify-center transition-colors",
                           selectedRoutes.includes(r.id) ? "bg-blue-600 border-blue-600" : "border-slate-300"
                         )}>
                            {selectedRoutes.includes(r.id) && <div className="size-1.5 rounded-full bg-white" />}
                         </div>
                      </div>
                   ))}
                   <Button className="w-full mt-4 bg-slate-900 text-white hover:bg-slate-800 rounded-xl">
                      <ArrowRightLeft className="size-4 mr-2" /> Cập nhật biểu đồ
                   </Button>
                </CardContent>
             </Card>

             <Card className="lg:col-span-3 border-none shadow-sm bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
                   <div>
                      <CardTitle className="text-base font-bold">Biểu đồ so sánh lưu lượng</CardTitle>
                      <CardDescription className="text-xs">So sánh trực tiếp giữa {selectedRoutes.length} điểm đo đã chọn</CardDescription>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold">24 GIỜ</Button>
                      <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold bg-slate-100">7 NGÀY</Button>
                      <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold">30 NGÀY</Button>
                   </div>
                </CardHeader>
                <CardContent className="pt-8">
                   <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={dataWeekly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            {selectedRoutes.includes('t1') && <Line type="monotone" dataKey="oto" name="QL32 - Cầu Diễn" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />}
                            {selectedRoutes.includes('t2') && <Line type="monotone" dataKey="routeB" name="Vành Đai 3 - Ngã tư sở" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />}
                         </LineChart>
                      </ResponsiveContainer>
                   </div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Record Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
         <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
               <DialogTitle>{selectedRecord ? "Cập nhật bản ghi" : "Thêm bản ghi lưu lượng mới"}</DialogTitle>
               <DialogDescription>Nhập thông tin đo đếm thực tế và chi tiết loại phương tiện.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2 col-span-2 sm:col-span-1">
                     <Label>Tuyến đường/Nút giao</Label>
                     <Select defaultValue={selectedRecord?.route || "t1"}>
                        <SelectTrigger>
                           <SelectValue placeholder="Chọn tuyến đường" />
                        </SelectTrigger>
                        <SelectContent>
                           {routes.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="grid gap-2 col-span-2 sm:col-span-1">
                     <Label>Phương thức đo đếm</Label>
                     <Select defaultValue={selectedRecord?.type || "Tự động (Sensor)"}>
                        <SelectTrigger>
                           <SelectValue placeholder="Chọn phương thức" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Tự động (Sensor)">Tự động (Sensor)</SelectItem>
                           <SelectItem value="Camera AI">Camera AI</SelectItem>
                           <SelectItem value="Thủ công">Thủ công</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2 col-span-2 sm:col-span-1">
                     <Label>Thời gian đo đếm</Label>
                     <Input type="datetime-local" defaultValue={selectedRecord ? "2026-05-10T10:00" : ""} />
                  </div>
                  <div className="grid gap-2 col-span-2 sm:col-span-1">
                     <Label className="text-blue-600 font-bold">Tổng lưu lượng quy đổi (PCU)</Label>
                     <Input type="number" placeholder="Nhập lượng xe..." className="border-blue-200 bg-blue-50/30 font-bold" defaultValue={selectedRecord?.vol || ""} />
                  </div>
               </div>

               <div className="space-y-4 pt-2 border-t">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Chi tiết theo loại phương tiện</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                     <div className="space-y-1.5">
                        <Label className="text-[10px] flex items-center gap-1"><Bike className="size-3" /> Xe máy</Label>
                        <Input type="number" placeholder="0" className="h-8 text-xs" />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] flex items-center gap-1"><Car className="size-3" /> Ô tô con</Label>
                        <Input type="number" placeholder="0" className="h-8 text-xs" />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] flex items-center gap-1"><Truck className="size-3" /> Xe tải</Label>
                        <Input type="number" placeholder="0" className="h-8 text-xs" />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] flex items-center gap-1"><Bus className="size-3" /> Xe buýt</Label>
                        <Input type="number" placeholder="0" className="h-8 text-xs" />
                     </div>
                  </div>
               </div>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
               <Button className="bg-blue-600" onClick={() => setIsAddDialogOpen(false)}>Lưu dữ liệu</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* Import Excel Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
         <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
               <DialogTitle>Import Dữ liệu từ Excel</DialogTitle>
               <DialogDescription>Tải lên tệp Excel chứa dữ liệu lưu lượng đo đếm hàng loạt.</DialogDescription>
            </DialogHeader>
            <div className="py-8 flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="size-8" />
               </div>
               <p className="font-bold text-slate-900">Kéo thả tệp vào đây hoặc click để chọn</p>
               <p className="text-xs text-slate-500 mt-2">Hỗ trợ định dạng .xlsx, .xls. Dung lượng tối đa 10MB</p>
               <Button variant="link" className="mt-4 text-blue-600 flex items-center gap-2">
                  <Download className="size-4" /> Tải tệp mẫu (.xlsx)
               </Button>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>Đóng</Button>
               <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsImportDialogOpen(false)}>Bắt đầu Import</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
         <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <Activity className="size-5 text-blue-600" />
                  Lịch sử đo đếm: {historyRecord?.route}
               </DialogTitle>
               <DialogDescription>Dữ liệu đo đếm lịch sử trong 24 giờ qua tại tuyến đường này.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
               <div className="h-[250px] w-full bg-slate-50 rounded-xl p-4 border">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={dataHourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="vol" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorHist)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="border rounded-xl overflow-hidden">
                  <Table>
                     <TableHeader className="bg-slate-50">
                        <TableRow>
                           <TableHead className="text-[11px] font-bold">Thời gian</TableHead>
                           <TableHead className="text-[11px] font-bold text-right">Lưu lượng</TableHead>
                           <TableHead className="text-[11px] font-bold">Trạng thái</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {[1, 2, 3, 4, 5].map((i) => (
                           <TableRow key={i} className="text-xs">
                              <TableCell>{i*2}:00 10/05/2026</TableCell>
                              <TableCell className="text-right font-bold">{Math.floor(Math.random() * 5000 + 1000).toLocaleString()} PCU</TableCell>
                              <TableCell>
                                 <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-600 border-emerald-100">Bình thường</Badge>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>
            </div>
            <DialogFooter>
               <Button onClick={() => setIsHistoryDialogOpen(false)}>Đóng</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}
