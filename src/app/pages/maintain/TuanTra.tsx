import React, { useState } from "react";
import { Plus, FileDown, Search, Edit, Trash2, Eye, Shield, Users, Clock, CalendarOff, BarChart3, Map as MapIcon, Save, X, Navigation, Settings } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../../components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { RouteDelegationDialog, DelegationRecord } from "../../components/maintain/RouteDelegationDialog";

// ====== Mock data ======
const scheduleByObject = [
  { id: "TT-001", objectType: "Đường bộ", objectName: "Quốc lộ 1A", patroller: "Nguyễn Văn A", unit: "Hạt QLĐB 1", date: "2026-03-20", shift: "Ca sáng 06:00–10:00", status: "completed", note: "Bình thường" },
  { id: "TT-002", objectType: "Cầu", objectName: "Cầu Vĩnh Tuy", patroller: "Trần Thị B", unit: "Hạt QLĐB 2", date: "2026-03-21", shift: "Ca chiều 14:00–18:00", status: "completed", note: "Phát hiện vết nứt P3" },
  { id: "TT-003", objectType: "Đèn", objectName: "Nút giao Cầu Giấy", patroller: "Lê Văn C", unit: "Hạt QLĐB 1", date: "2026-03-22", shift: "Ca tối 20:00–00:00", status: "ongoing", note: "" },
  { id: "TT-004", objectType: "Hầm", objectName: "Hầm Kim Liên", patroller: "Phạm Thị D", unit: "Hạt QLĐB 3", date: "2026-03-23", shift: "Ca sáng 06:00–10:00", status: "pending", note: "Chờ phân công" },
];

const scheduleByEmployee = [
  { id: "NV-001", patroller: "Nguyễn Văn A", unit: "Hạt QLĐB 1", totalAssigned: 12, completed: 10, missed: 1, upcoming: 1 },
  { id: "NV-002", patroller: "Trần Thị B", unit: "Hạt QLĐB 2", totalAssigned: 8, completed: 8, missed: 0, upcoming: 0 },
  { id: "NV-003", patroller: "Lê Văn C", unit: "Hạt QLĐB 1", totalAssigned: 15, completed: 12, missed: 2, upcoming: 1 },
  { id: "NV-004", patroller: "Phạm Thị D", unit: "Hạt QLĐB 3", totalAssigned: 6, completed: 3, missed: 0, upcoming: 3 },
];

const timeRules = [
  { id: "KG-001", shift: "Ca sáng", startTime: "06:00", endTime: "10:00", objectTypes: "Đường bộ, Cầu", status: "active" },
  { id: "KG-002", shift: "Ca trưa", startTime: "10:00", endTime: "14:00", objectTypes: "Đèn, Nút giao", status: "active" },
  { id: "KG-003", shift: "Ca chiều", startTime: "14:00", endTime: "18:00", objectTypes: "Đường bộ, Hầm", status: "active" },
  { id: "KG-004", shift: "Ca tối", startTime: "20:00", endTime: "00:00", objectTypes: "Đường bộ, Đèn", status: "active" },
];

const dayOffRules = [
  { id: "NN-001", date: "2026-01-01", name: "Tết Dương lịch", type: "Lễ quốc gia", isPatrol: false },
  { id: "NN-002", date: "2026-01-28", name: "Tết Nguyên Đán (30 tháng Chạp)", type: "Lễ quốc gia", isPatrol: true },
  { id: "NN-003", date: "2026-02-01", name: "Mùng 4 Tết", type: "Lễ quốc gia", isPatrol: false },
  { id: "NN-004", date: "2026-04-30", name: "Ngày Giải phóng Miền Nam", type: "Lễ quốc gia", isPatrol: false },
];

const mapMarkers = [
  { id: "TT-001", name: "QL1A – Nguyễn Văn A đang tuần", lat: 21.028, lng: 105.854, type: "tuần tra", description: "Ca sáng – 06:00 đến 10:00" },
  { id: "TT-002", name: "Cầu Vĩnh Tuy – Trần Thị B", lat: 21.018, lng: 105.878, type: "tuần tra", description: "Phát hiện vết nứt P3" },
  { id: "TT-003", name: "Nút giao Cầu Giấy – Lê Văn C", lat: 21.031, lng: 105.800, type: "tuần đèn", description: "Ca tối – 20:00 đến 00:00" },
];

const mockDelegations: DelegationRecord[] = [
  { id: "DEL-01", assigneeType: "Đơn vị", assigneeName: "Hạt QLĐB 1", role: "Đơn vị quản lý", assignedRoutes: ["Quốc lộ 1A", "Cầu Vĩnh Tuy", "Vành đai 2"] },
  { id: "DEL-02", assigneeType: "Đơn vị", assigneeName: "Công ty CP Cầu đường Bộ", role: "Đơn vị quản lý", assignedRoutes: ["Quốc lộ 5", "Cầu Thanh Trì"] },
  { id: "DEL-03", assigneeType: "Cá nhân", assigneeName: "Nguyễn Văn A", role: "Tuần đường", assignedRoutes: ["Quốc lộ 1A", "Đại lộ Thăng Long"] },
  { id: "DEL-04", assigneeType: "Cá nhân", assigneeName: "Trần Hữu Hùng", role: "Tuần đèn", assignedRoutes: ["Vành đai 2", "Vành đai 3"] },
];

const mockCheckinConfigs = [
  { id: "CHK-01", routeName: "Nguyễn Trãi", ward: "Thanh Xuân Trung", objectCategory: "Tuyến đường", objectType: "Đường bộ đô thị", checkinCount: 3, checkinUnit: "lần / ca", note: "Ra đều trong ca" },
  { id: "CHK-02", routeName: "Quốc lộ 32", ward: "Minh Khai", objectCategory: "Tuyến đường", objectType: "Quốc lộ", checkinCount: 4, checkinUnit: "lần / ca", note: "Đầu, giữa và cuối ca" },
  { id: "CHK-03", routeName: "Tỉnh lộ 70", ward: "Tây Mỗ", objectCategory: "Tuyến đường", objectType: "Đường tỉnh", checkinCount: 2, checkinUnit: "lần / ca", note: "Đầu ca và cuối ca" },
  { id: "CHK-04", routeName: "Hầm Kim Liên", ward: "Phương Liên", objectCategory: "Hầm", objectType: "Bất kỳ", checkinCount: 1, checkinUnit: "lần / tiếp", note: "Từng tiếp check-in 1 lần" },
  { id: "CHK-05", routeName: "Nút giao Cầu Giấy", ward: "Ngọc Khánh", objectCategory: "Đèn", objectType: "Bất kỳ", checkinCount: 1, checkinUnit: "lần / tiếp", note: "Từng tiếp check-in 1 lần" },
  { id: "CHK-06", routeName: "Đường ngang Giải Phóng", ward: "Phương Mai", objectCategory: "Đường ngang đường sắt", objectType: "Bất kỳ", checkinCount: 1, checkinUnit: "lần / ca", note: "Check-in đầu ca" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed": return <Badge className="bg-green-100 text-green-700 border-green-200">Checkin đủ</Badge>;
    case "ongoing": return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Chưa đủ checkin</Badge>;
    case "pending": return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Chưa checkin</Badge>;
    case "missed": return <Badge className="bg-red-100 text-red-700 border-red-200">Bỏ sót</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
};

export default function TuanTra() {
  const [activeTab, setActiveTab] = useState("schedule-object");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [configFormType, setConfigFormType] = useState<string>("Theo ca");

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [isDelegationOpen, setIsDelegationOpen] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  
  const [isRouteDetailOpen, setIsRouteDetailOpen] = useState(false);
  const [selectedRouteItem, setSelectedRouteItem] = useState<any>(null);

  const toggleRouteSelect = (id: string) => {
    setSelectedRoutes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const stats = {
    total: scheduleByObject.length,
    completed: scheduleByObject.filter(i => i.status === "completed").length,
    ongoing: scheduleByObject.filter(i => i.status === "ongoing").length,
    pending: scheduleByObject.filter(i => i.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-slate-100/50 p-1 border flex-wrap gap-1">
            <TabsTrigger value="schedule-object" className="gap-2 px-4 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Shield className="size-3.5" />Lịch theo đối tượng
            </TabsTrigger>
            <TabsTrigger value="schedule-employee" className="gap-2 px-4 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="size-3.5" />Lịch theo nhân viên
            </TabsTrigger>
            <TabsTrigger value="time-rules" className="gap-2 px-4 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Clock className="size-3.5" />Khung giờ đi tuần
            </TabsTrigger>
            <TabsTrigger value="day-off" className="gap-2 px-4 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <CalendarOff className="size-3.5" />Ngày nghỉ
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2 px-4 text-xs data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BarChart3 className="size-3.5" />Thống kê
            </TabsTrigger>
            <TabsTrigger value="route-delegation" className="gap-2 px-4 text-xs data-[state=active]:bg-green-600 data-[state=active]:text-white ml-auto border-l border-slate-200">
              <Navigation className="size-3.5" />Danh sách Tuyến quản lý & Phân quyền
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200 h-9 text-sm" onClick={() => setIsMapOpen(true)}>
            <MapIcon className="mr-2 size-4" />Bản đồ số
          </Button>
          <Button variant="outline" className="border-slate-200 h-9 text-sm">
            <FileDown className="mr-2 size-4" />Xuất Excel
          </Button>
          {activeTab !== "route-delegation" && (
            <Button onClick={() => { setSelectedItem(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm">
              <Plus className="mr-2 size-4" />Thêm mới
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats (only on schedule tabs) */}
      {(activeTab === "schedule-object" || activeTab === "schedule-employee") && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Shield className="size-6" /></div>
            <div><p className="text-xs text-slate-500 font-medium">Tổng lịch tuần</p><p className="text-2xl font-bold text-slate-900">{stats.total}</p></div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Users className="size-6" /></div>
            <div><p className="text-xs text-slate-500 font-medium">Đang thực hiện</p><p className="text-2xl font-bold text-sky-600">{stats.ongoing}</p></div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Clock className="size-6" /></div>
            <div><p className="text-xs text-slate-500 font-medium">Chờ phân công</p><p className="text-2xl font-bold text-amber-600">{stats.pending}</p></div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600"><Shield className="size-6" /></div>
            <div><p className="text-xs text-slate-500 font-medium">Đã hoàn thành</p><p className="text-2xl font-bold text-green-600">{stats.completed}</p></div>
          </div>
        </div>
      )}

      {/* ===== Tab: Phân quyền tuyến đường ===== */}
      {activeTab === "route-delegation" && (
        <Card className="border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="bg-slate-50/50 border-b p-4">
            <div className="flex gap-4 items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Navigation className="size-5 text-green-600" /> Danh sách Tuyến quản lý & Phân quyền
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Tìm tên tuyến..." className="pl-10 h-10 bg-white border-slate-200 text-sm" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="h-10 bg-white border-slate-200 text-sm"><SelectValue placeholder="Tất cả loại" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại hình</SelectItem>
                  <SelectItem value="duong">Đường bộ</SelectItem>
                  <SelectItem value="cau">Cầu</SelectItem>
                  <SelectItem value="ham">Hầm</SelectItem>
                  <SelectItem value="den">Đèn</SelectItem>
                  <SelectItem value="duongngang">Đường ngang ĐS</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-10 bg-white border-slate-200 text-sm"><SelectValue placeholder="Loại đường" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Loại đường (Tất cả)</SelectItem>
                  <SelectItem value="dothi">Đường bộ đô thị</SelectItem>
                  <SelectItem value="tinh">Đường tỉnh</SelectItem>
                  <SelectItem value="quoclo">Quốc lộ</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-10 bg-white border-slate-200 text-sm"><SelectValue placeholder="Đơn vị quản lý" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Đơn vị quản lý (Tất cả)</SelectItem>
                  <SelectItem value="h1">Hạt QLĐB 1</SelectItem>
                  <SelectItem value="h2">Hạt QLĐB 2</SelectItem>
                  <SelectItem value="cty">Công ty CP Cầu đường</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-10 bg-white border-slate-200 text-sm"><SelectValue placeholder="Người quản lý" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Người quản lý (Tất cả)</SelectItem>
                  <SelectItem value="nva">Nguyễn Văn A</SelectItem>
                  <SelectItem value="tvk">Trần Văn Kiểm</SelectItem>
                  <SelectItem value="ttb">Trần Thị B</SelectItem>
                  <SelectItem value="lvt">Lê Văn Tiến</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Thanh công cụ thao tác hàng loạt */}
            {selectedRoutes.length > 0 && (
              <div className="mt-3 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between animate-in slide-in-from-top-1">
                <span className="text-sm font-semibold text-blue-700">Đã chọn {selectedRoutes.length} tuyến đường</span>
                <Button onClick={() => setIsDelegationOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-sm shadow-md">
                  <span className="flex items-center gap-2"><Shield className="size-3.5" /> Phân quyền cho Đơn vị / Cán bộ</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-12 text-center">
                    <Checkbox checked={selectedRoutes.length === 6 && selectedRoutes.length > 0} onCheckedChange={() => {
                      if (selectedRoutes.length === 6) setSelectedRoutes([]);
                      else setSelectedRoutes(["R-01", "R-02", "B-01", "L-01", "W-01", "W-02"]);
                    }} />
                  </TableHead>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Tên tuyến đường / Tài sản</TableHead>
                  <TableHead>Loại hình</TableHead>
                  <TableHead>Đơn vị quản lý</TableHead>
                  <TableHead>Tuần đường</TableHead>
                  <TableHead>Tuần kiểm</TableHead>
                  <TableHead>Tuần đèn</TableHead>
                  <TableHead>Tuần sông</TableHead>
                  <TableHead className="text-center">Cấu hình Check-in</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "R-01", name: "Quốc lộ 1A", type: "Đường bộ", assignedUnit: "Hạt QLĐB 1", assignedPatroller: "Nguyễn Văn A", inspector: "Trần Văn Kiểm", lighter: "-", river: "-", checkin: "3 lần / ca" },
                  { id: "R-02", name: "Đại lộ Thăng Long", type: "Đường bộ", assignedUnit: "Công ty Cổ phần Cầu đường", assignedPatroller: "Lê Văn Tiến", inspector: "-", lighter: "-", river: "-", checkin: "2 lần / ca" },
                  { id: "B-01", name: "Cầu Vĩnh Tuy", type: "Cầu", assignedUnit: "Hạt QLĐB 2", assignedPatroller: "Trần Thị B", inspector: "Trần Văn Kiểm", lighter: "Hùng Đèn", river: "Ngô Sông", checkin: "1 lần / tiếp" },
                  { id: "L-01", name: "Nút giao Cầu Giấy", type: "Đèn tín hiệu", assignedUnit: "Hạt QLĐB 1", assignedPatroller: "-", inspector: "-", lighter: "Hùng Đèn", river: "-", checkin: "1 lần / tiếp" },
                  { id: "W-01", name: "Sông Hồng", type: "Đường thuỷ", assignedUnit: "Đoạn QLĐTNĐ 6", assignedPatroller: "-", inspector: "-", lighter: "-", river: "Ngô Sông", checkin: "Chưa cấu hình" },
                  { id: "W-02", name: "Sông Đuống", type: "Đường thuỷ", assignedUnit: "-", assignedPatroller: "-", inspector: "-", lighter: "-", river: "-", checkin: "Chưa cấu hình" },
                ].map((item, idx) => {
                  const isSelected = selectedRoutes.includes(item.id);
                  return (
                    <TableRow key={item.id} className={isSelected ? "bg-blue-50/50" : ""}>
                      <TableCell className="text-center">
                        <Checkbox checked={isSelected} onCheckedChange={() => toggleRouteSelect(item.id)} />
                      </TableCell>
                      <TableCell className="text-center text-slate-500">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase">Mã: {item.id}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className={`text-[10px] uppercase border-none px-0 font-bold ${item.type === 'Cầu' ? 'text-emerald-500' : item.type === 'Đường thuỷ' ? 'text-cyan-500' : 'text-blue-500'}`}>{item.type}</Badge></TableCell>
                      <TableCell className="text-sm font-medium text-blue-700">{item.assignedUnit}</TableCell>
                      <TableCell className="text-xs text-slate-600">{item.assignedPatroller}</TableCell>
                      <TableCell className="text-xs text-slate-600">{item.inspector}</TableCell>
                      <TableCell className="text-xs text-slate-600">{item.lighter}</TableCell>
                      <TableCell className="text-xs text-slate-600">{item.river}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`text-[10px] uppercase font-bold border-none px-2 py-0.5 ${item.checkin === "Chưa cấu hình" ? "text-slate-400 bg-slate-100" : "text-blue-700 bg-blue-100"}`}>{item.checkin}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedRouteItem(item); setIsRouteDetailOpen(true); }} className="h-8 w-8 hover:text-blue-600 text-slate-400"><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedRoutes([item.id]); setIsDelegationOpen(true); }} className="h-8 w-8 hover:text-blue-600 text-slate-400"><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedItem({ ...item, idNumber: item.id, fullName: item.name }); setIsDeleteOpen(true); }} className="h-8 w-8 hover:text-red-600 text-slate-400"><Trash2 className="size-4" /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ===== Tab: Lịch theo đối tượng ===== */}
      {activeTab === "schedule-object" && (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Tên đối tượng..." className="pl-10 h-10 bg-white border-slate-200" />
              </div>
              <Select>
                <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Loại đối tượng" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="road">Đường bộ</SelectItem>
                  <SelectItem value="bridge">Cầu</SelectItem>
                  <SelectItem value="light">Đèn / Nút giao</SelectItem>
                  <SelectItem value="tunnel">Hầm</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Đơn vị" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả đơn vị</SelectItem>
                  <SelectItem value="hat1">Hạt QLĐB 1</SelectItem>
                  <SelectItem value="hat2">Hạt QLĐB 2</SelectItem>
                  <SelectItem value="hat3">Hạt QLĐB 3</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Tình trạng" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="completed">Đã hoàn thành</SelectItem>
                  <SelectItem value="ongoing">Đang thực hiện</SelectItem>
                  <SelectItem value="pending">Chờ phân công</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10">
                <Search className="mr-2 size-4" />Tìm kiếm
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Danh sách tuyến đường</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Cán bộ tuần tra</TableHead>
                  <TableHead>Đơn vị</TableHead>
                  <TableHead>Ngày tuần</TableHead>
                  <TableHead>Ca tuần</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleByObject.map((item, idx) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center text-slate-500">{idx + 1}</TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-900">{item.objectName}</div>
                      <div className="text-[10px] text-slate-400 uppercase">Mã: {item.id}</div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{item.objectType}</Badge></TableCell>
                    <TableCell className="text-slate-700 font-medium">{item.patroller}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{item.unit}</TableCell>
                    <TableCell className="text-slate-600">{item.date}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{item.shift}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600" onClick={() => { setSelectedItem(item); setIsDetailOpen(true); }}><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600" onClick={() => { setSelectedItem(item); setIsFormOpen(true); }}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600" onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ===== Tab: Lịch theo nhân viên ===== */}
      {activeTab === "schedule-employee" && (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Tên cán bộ tuần..." className="pl-10 h-10 bg-white border-slate-200" />
              </div>
              <Select>
                <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Đơn vị" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả đơn vị</SelectItem>
                  <SelectItem value="hat1">Hạt QLĐB 1</SelectItem>
                  <SelectItem value="hat2">Hạt QLĐB 2</SelectItem>
                  <SelectItem value="hat3">Hạt QLĐB 3</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10">
                <Search className="mr-2 size-4" />Tìm kiếm
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Cán bộ tuần tra</TableHead>
                  <TableHead>Đơn vị</TableHead>
                  <TableHead className="text-center">Tổng lịch</TableHead>
                  <TableHead className="text-center">Đã thực hiện</TableHead>
                  <TableHead className="text-center">Bỏ sót</TableHead>
                  <TableHead className="text-center">Sắp tới</TableHead>
                  <TableHead className="text-center">Tỷ lệ</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleByEmployee.map((item, idx) => {
                  const rate = Math.round((item.completed / item.totalAssigned) * 100);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-center text-slate-500">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900">{item.patroller}</div>
                        <div className="text-[10px] text-slate-400">Mã: {item.id}</div>
                      </TableCell>
                      <TableCell className="text-slate-600">{item.unit}</TableCell>
                      <TableCell className="text-center font-bold text-slate-800">{item.totalAssigned}</TableCell>
                      <TableCell className="text-center"><span className="text-green-600 font-bold">{item.completed}</span></TableCell>
                      <TableCell className="text-center"><span className={item.missed > 0 ? "text-red-600 font-bold" : "text-slate-400"}>{item.missed}</span></TableCell>
                      <TableCell className="text-center"><span className="text-amber-600 font-bold">{item.upcoming}</span></TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${rate}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-8">{rate}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600"><Eye className="size-4" /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ===== Tab: Khung giờ đi tuần ===== */}
      {activeTab === "time-rules" && (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b p-4 flex flex-row items-center justify-between">
            <p className="text-sm text-slate-600 font-medium">Quản lý quy định khung giờ đi tuần</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-9">
              <Plus className="mr-2 size-4" />Thêm ca tuần
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Tên ca tuần</TableHead>
                  <TableHead>Giờ bắt đầu</TableHead>
                  <TableHead>Giờ kết thúc</TableHead>
                  <TableHead>Áp dụng cho</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeRules.map((rule, idx) => (
                  <TableRow key={rule.id}>
                    <TableCell className="text-center text-slate-500">{idx + 1}</TableCell>
                    <TableCell className="font-bold text-slate-900">{rule.shift}</TableCell>
                    <TableCell><Badge className="bg-blue-50 text-blue-700 border-blue-200">{rule.startTime}</Badge></TableCell>
                    <TableCell><Badge className="bg-slate-50 text-slate-700 border-slate-200">{rule.endTime}</Badge></TableCell>
                    <TableCell className="text-slate-600 text-sm">{rule.objectTypes}</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-700 border-green-200">Đang áp dụng</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600"><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600"><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ===== Tab: Ngày nghỉ ===== */}
      {activeTab === "day-off" && (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b p-4 flex flex-row items-center justify-between">
            <p className="text-sm text-slate-600 font-medium">Quản lý quy định ngày nghỉ không đi tuần</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-9">
              <Plus className="mr-2 size-4" />Thêm ngày nghỉ
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Ngày nghỉ</TableHead>
                  <TableHead>Tên ngày lễ</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Vẫn đi tuần?</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayOffRules.map((rule, idx) => (
                  <TableRow key={rule.id}>
                    <TableCell className="text-center text-slate-500">{idx + 1}</TableCell>
                    <TableCell className="font-bold text-slate-900">{rule.date}</TableCell>
                    <TableCell className="text-slate-700">{rule.name}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{rule.type}</Badge></TableCell>
                    <TableCell>
                      {rule.isPatrol
                        ? <Badge className="bg-amber-100 text-amber-700 border-amber-200">Có (trực đặc biệt)</Badge>
                        : <Badge className="bg-slate-100 text-slate-600 border-slate-200">Không đi tuần</Badge>
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600"><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600"><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ===== Tab: Thống kê ===== */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Tổng lịch tuần tháng 3", value: 48, color: "text-slate-900", bg: "bg-blue-50", icon: <Shield className="size-6 text-blue-600" /> },
              { label: "Đã thực hiện", value: 40, color: "text-green-600", bg: "bg-green-50", icon: <Shield className="size-6 text-green-600" /> },
              { label: "Bỏ sót / Thiếu", value: 3, color: "text-red-600", bg: "bg-red-50", icon: <Shield className="size-6 text-red-600" /> },
              { label: "Tỷ lệ hoàn thành", value: "83%", color: "text-indigo-600", bg: "bg-indigo-50", icon: <BarChart3 className="size-6 text-indigo-600" /> },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
                <div className={`flex size-12 items-center justify-center rounded-xl ${s.bg}`}>{s.icon}</div>
                <div><p className="text-xs text-slate-500 font-medium">{s.label}</p><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p></div>
              </div>
            ))}
          </div>
          <Card className="md:col-span-3 border-slate-200 shadow-sm">
            <CardHeader className="border-b p-4 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-800">Thống kê đi tuần theo đơn vị – Tháng 3/2026</p>
                <Button variant="outline" size="sm"><FileDown className="mr-2 size-4" />Xuất Excel</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead className="text-center">Tổng lịch</TableHead>
                    <TableHead className="text-center">Đã thực hiện</TableHead>
                    <TableHead className="text-center">Bỏ sót</TableHead>
                    <TableHead className="text-center">Tỷ lệ (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { unit: "Hạt QLĐB 1", total: 20, done: 18, missed: 1 },
                    { unit: "Hạt QLĐB 2", total: 16, done: 14, missed: 1 },
                    { unit: "Hạt QLĐB 3", total: 12, done: 8, missed: 1 },
                  ].map((row) => {
                    const rate = Math.round((row.done / row.total) * 100);
                    return (
                      <TableRow key={row.unit}>
                        <TableCell className="font-medium text-slate-800">{row.unit}</TableCell>
                        <TableCell className="text-center font-bold">{row.total}</TableCell>
                        <TableCell className="text-center text-green-600 font-bold">{row.done}</TableCell>
                        <TableCell className="text-center text-red-600 font-bold">{row.missed}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${rate}%` }} />
                            </div>
                            <span className="text-xs font-bold w-8">{rate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}



      {/* ===== ADD/EDIT FORM DIALOG ===== */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="w-[66vw] max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="size-5 text-blue-600" />
              {selectedItem ? "Chỉnh sửa lịch đi tuần" : "Thêm mới lịch đi tuần"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Danh sách tuyến đường *</label>
              <Input placeholder="Tên đường, cầu, hầm, nút đèn..." defaultValue={selectedItem?.objectName} className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Loại đối tượng</label>
              <Select defaultValue={selectedItem?.objectType}>
                <SelectTrigger className="h-10"><SelectValue placeholder="Chọn loại" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Đường bộ">Đường bộ</SelectItem>
                  <SelectItem value="Cầu">Cầu</SelectItem>
                  <SelectItem value="Đèn">Đèn / Nút giao</SelectItem>
                  <SelectItem value="Hầm">Hầm</SelectItem>
                  <SelectItem value="Chòi gác">Chòi gác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Cán bộ tuần tra *</label>
              <Input placeholder="Họ tên cán bộ" defaultValue={selectedItem?.patroller} className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Đơn vị</label>
              <Select defaultValue={selectedItem?.unit}>
                <SelectTrigger className="h-10"><SelectValue placeholder="Chọn đơn vị" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hạt QLĐB 1">Hạt QLĐB 1</SelectItem>
                  <SelectItem value="Hạt QLĐB 2">Hạt QLĐB 2</SelectItem>
                  <SelectItem value="Hạt QLĐB 3">Hạt QLĐB 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Ngày đi tuần</label>
              <Input type="date" defaultValue={selectedItem?.date} className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Ca tuần</label>
              <Select defaultValue={selectedItem?.shift}>
                <SelectTrigger className="h-10"><SelectValue placeholder="Chọn ca" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ca sáng 06:00–10:00">Ca sáng 06:00–10:00</SelectItem>
                  <SelectItem value="Ca trưa 10:00–14:00">Ca trưa 10:00–14:00</SelectItem>
                  <SelectItem value="Ca chiều 14:00–18:00">Ca chiều 14:00–18:00</SelectItem>
                  <SelectItem value="Ca tối 20:00–00:00">Ca tối 20:00–00:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Tình trạng</label>
              <Select defaultValue={selectedItem?.status || "pending"}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Chờ phân công</SelectItem>
                  <SelectItem value="ongoing">Đang thực hiện</SelectItem>
                  <SelectItem value="completed">Đã hoàn thành</SelectItem>
                  <SelectItem value="missed">Bỏ sót</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Ghi chú / Kết quả tuần tra</label>
              <Input placeholder="Ghi chú..." defaultValue={selectedItem?.note} className="h-10" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsFormOpen(false)}><X className="mr-2 size-4" />Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsFormOpen(false)}>
              <Save className="mr-2 size-4" />{selectedItem ? "Cập nhật" : "Lưu mới"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



      {/* ===== DETAIL DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="w-[66vw] max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="size-5 text-blue-600" />Chi tiết lịch đi tuần
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-2">
              {[
                { label: "Mã lịch", value: selectedItem.id },
                { label: "Danh sách tuyến đường", value: selectedItem.objectName },
                { label: "Loại đối tượng", value: selectedItem.objectType },
                { label: "Cán bộ tuần tra", value: selectedItem.patroller },
                { label: "Đơn vị", value: selectedItem.unit },
                { label: "Ngày đi tuần", value: selectedItem.date },
                { label: "Ca tuần", value: selectedItem.shift },
                { label: "Ghi chú", value: selectedItem.note || "—" },
              ].map(f => (
                <div key={f.label} className="border-b border-slate-100 pb-3">
                  <p className="text-xs text-slate-400 mb-1">{f.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{f.value}</p>
                </div>
              ))}
              <div className="border-b border-slate-100 pb-3">
                <p className="text-xs text-slate-400 mb-1">Tình trạng</p>
                {getStatusBadge(selectedItem.status)}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsDetailOpen(false); setIsFormOpen(true); }}>
                <Edit className="mr-2 size-4" />Chỉnh sửa
              </Button>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== MAP DIALOG ===== */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="w-[85vw] max-w-6xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapIcon className="size-5 text-green-600" />Quản lý tuần tra trên bản đồ số
            </DialogTitle>
          </DialogHeader>
          <div className="rounded-xl overflow-hidden border border-slate-200" style={{ height: "480px" }}>
            <SimpleMapView
              markers={mapMarkers}
              center={[21.025, 105.840]}
              zoom={12}
              height="480px"
              isActive={isMapOpen}
            />
          </div>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5"><span className="inline-block size-3 rounded-full bg-amber-500" />Tuần đường/cầu/hầm</span>
            <span className="flex items-center gap-1.5"><span className="inline-block size-3 rounded-full bg-yellow-400" />Tuần đèn/nút giao</span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMapOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DELETE DIALOG ===== */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={{ title: "Lịch đi tuần" }}
        selectedItem={{
          fullName: selectedItem?.objectName,
          idNumber: selectedItem?.id,
          registrationDate: selectedItem?.date
        }}
        onConfirmDelete={() => setIsDeleteOpen(false)}
      />

      {/* ===== DELEGATION BULK ASSIGNMENT DIALOG ===== */}
      <Dialog open={isDelegationOpen} onOpenChange={setIsDelegationOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="size-5 text-blue-600" />
              Thiết lập Phân quyền & Cấu hình Tuyến đường
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800 flex items-center gap-2">
              <Navigation className="size-4 text-blue-600" />
              Bạn đang phân quyền cho <strong>{selectedRoutes.length} tuyến/vùng tài sản.</strong>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Đơn vị tiếp nhận quản lý</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Chọn đơn vị (Cấp 1)" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cty">Công ty CP Công trình Giao thông</SelectItem>
                    <SelectItem value="cty2">Công ty Quản lý Thuỷ nội địa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Đội / Hạt trực thuộc (Tuỳ chọn)</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Chọn Đội / Hạt quản lý (Cấp 2)" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hat1">Hạt QLĐB 1</SelectItem>
                    <SelectItem value="hat2">Hạt QLĐB 2</SelectItem>
                    <SelectItem value="doi1">Đội Quản lý Cầu 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="col-span-2"><h4 className="text-xs uppercase font-bold text-slate-400">Thiết lập nhân viên chuyên trách (Cấp 3)</h4></div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Cán bộ Tuần đường</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Không chọn" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nv1">Nguyễn Văn A</SelectItem>
                    <SelectItem value="nv2">Lê Văn Tiến</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Cán bộ Tuần kiểm</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Không chọn" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nv1">Trần Văn Kiểm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Cán bộ Tuần đèn</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Không chọn" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nv1">Hùng Đèn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Cán bộ Tuần sông</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Không chọn" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nv1">Ngô Sông</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="col-span-2 pt-4 border-t border-slate-200 mt-2 border-dashed animate-in slide-in-from-bottom-2 fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="size-4 text-green-600" />
                <h4 className="text-xs uppercase font-bold text-slate-700">Cấu hình Tần suất & Số lượng Check-in</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Cấu hình Check-in theo</label>
                  <Select value={configFormType} onValueChange={setConfigFormType}>
                    <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Chọn loại" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Giờ">Giờ</SelectItem>
                      <SelectItem value="Theo ca">Theo ca</SelectItem>
                      <SelectItem value="Theo loại đường">Theo loại đường</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {configFormType === "Theo loại đường" && (
                  <div className="animate-in fade-in zoom-in-95 duration-200">
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Loại đường <span className="text-red-500">*</span></label>
                    <Select defaultValue="Đường bộ đô thị">
                      <SelectTrigger className="h-10 bg-white border-blue-200 focus:ring-blue-500"><SelectValue placeholder="Chọn loại đường" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Đường bộ đô thị">Đường bộ đô thị</SelectItem>
                        <SelectItem value="Đường tỉnh">Đường tỉnh</SelectItem>
                        <SelectItem value="Quốc lộ">Quốc lộ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className={configFormType !== "Theo loại đường" ? "col-span-1" : ""}>
                  <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Số lượng Check-in <span className="text-red-500">*</span></label>
                  <Select defaultValue="1">
                    <SelectTrigger className="h-10 bg-white"><SelectValue placeholder="Chọn số lượng" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(n => (
                        <SelectItem key={n} value={n.toString()}>{n} lần</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Ghi chú / Yêu cầu check-in</label>
                  <Input placeholder="Nhập yêu cầu thêm (VD: Checkin đều đặn các ca)..." className="h-10 bg-white" />
                </div>
              </div>
            </div>

          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDelegationOpen(false)}><X className="mr-2 size-4" />Hủy</Button>
            <Button onClick={() => { setIsDelegationOpen(false); setSelectedRoutes([]); }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8">
              <Save className="mr-2 size-4" />Lưu thay đổi phân quyền
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== ROUTE DELEGATION DETAIL DIALOG ===== */}
      {selectedRouteItem && (
        <Dialog open={isRouteDetailOpen} onOpenChange={setIsRouteDetailOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Navigation className="size-5 text-blue-600" />Chi tiết phân quyền tuyến đường
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedRouteItem.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">Mã: {selectedRouteItem.id}</Badge>
                    <Badge variant="outline" className={`text-xs ${selectedRouteItem.type === 'Cầu' ? 'text-emerald-500' : selectedRouteItem.type === 'Đường thuỷ' ? 'text-cyan-500' : 'text-blue-500'}`}>{selectedRouteItem.type}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Đơn vị quản lý tuyến</p>
                  <p className="text-sm font-medium text-blue-700">{selectedRouteItem.assignedUnit}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Cán bộ Tuần đường</p>
                  <p className="text-sm font-medium text-slate-800">{selectedRouteItem.assignedPatroller}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Cán bộ Tuần kiểm</p>
                  <p className="text-sm font-medium text-slate-800">{selectedRouteItem.inspector}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Cán bộ Tuần đèn / VMS</p>
                  <p className="text-sm font-medium text-slate-800">{selectedRouteItem.lighter}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Cán bộ Tuần sông</p>
                  <p className="text-sm font-medium text-slate-800">{selectedRouteItem.river}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsRouteDetailOpen(false); setSelectedRoutes([selectedRouteItem.id]); setIsDelegationOpen(true); }}>
                <Edit className="mr-2 size-4" />Chỉnh sửa phân quyền
              </Button>
              <Button variant="outline" onClick={() => setIsRouteDetailOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
