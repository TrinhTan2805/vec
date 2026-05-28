import React, { useState } from "react";
import { Plus, FileDown, Search, Edit, Trash2, Eye, MapPin, Route, Calendar, LayoutDashboard, Layers, Map as MapIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { RepairFormDialog } from "../../components/maintain/RepairFormDialog";
import { RepairDetailDialog } from "../../components/maintain/RepairDetailDialog";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { LinearRouteDiagram } from "../../components/map/LinearRouteDiagram";

const roadRepairs2026 = [
  { 
    id: "RD-001", 
    assetName: "Quốc lộ 1A", 
    startKm: "Km15+200", 
    endKm: "Km15+500", 
    startDate: "2026-03-01", 
    endDate: "2026-03-15", 
    status: "completed", 
    contractor: "Công ty XD Thăng Long", 
    progress: 100, 
    toaDo: [21.052, 105.823],
    period: "1/2026",
    unit: "dv1",
    mileage: 15200,
    edgeDist: 0.5,
    position: "Trái",
    length: 300,
    width: 7.5,
    volume: 2250,
    explanation: "Sửa chữa định kỳ mặt đường",
    handoverDate: "15/03/2026",
    warranty: 12,
    structure: ["Cào bóc mặt đường BTN", "Thảm BTNC 12.5"],
    thickness: ["+5", "+5"]
  },
  { 
    id: "RD-002", 
    assetName: "Quốc lộ 5", 
    startKm: "Km22+100", 
    endKm: "Km22+800", 
    startDate: "2026-03-10", 
    endDate: "2026-04-10", 
    status: "ongoing", 
    contractor: "Tổng công ty 1", 
    progress: 45, 
    toaDo: [21.011, 105.901],
    period: "1/2026",
    unit: "dv2",
    mileage: 22100,
    edgeDist: 0,
    position: "Để mặt đường",
    length: 700,
    width: 12,
    volume: 8400,
    explanation: "Khắc phục hư hỏng lún võng",
    handoverDate: "10/04/2026",
    warranty: 24,
    structure: ["Bù vênh cấp phối đá dăm", "Thảm BTNC 19", "Thảm BTNC 12.5"],
    thickness: ["+10", "+7", "+5"]
  },
  { 
    id: "RD-003", 
    assetName: "Quốc lộ 32", 
    startKm: "Km5+600", 
    endKm: "Km6+200", 
    startDate: "2026-04-05", 
    endDate: "2026-04-30", 
    status: "pending", 
    contractor: "Chưa giao thầu", 
    progress: 0, 
    toaDo: [21.077, 105.748],
    period: "2/2026",
    unit: "dv3",
    mileage: 5600,
    edgeDist: 1.2,
    position: "Phải",
    length: 600,
    width: 7,
    volume: 4200,
    explanation: "Đang trình phê duyệt BCKTKT",
    handoverDate: "30/04/2026",
    warranty: 12,
    structure: ["Láng nhựa đường 3 lớp"],
    thickness: ["—"]
  },
];

const roadRepairs2027 = [
  { id: "PL-001", assetName: "Quốc lộ 1A", startKm: "Km10+000", endKm: "Km12+000", startDate: "2027-01-15", endDate: "2027-02-28", status: "scheduled", contractor: "Đang mời thầu", progress: 0, toaDo: [21.082, 105.811] },
  { id: "PL-002", assetName: "Quốc lộ 5", startKm: "Km30+500", endKm: "Km32+000", startDate: "2027-03-10", endDate: "2027-04-20", status: "planned", contractor: "Chưa xác định", progress: 0, toaDo: [20.985, 105.981] },
];

const reportRoadRepairData = [
  {
    stt: 1,
    roadName: "QL.32-DP(Km19+500-Km24+000)",
    period: "2/2021",
    unit: "Đội QLGT số 5",
    startPoint: "Km21+675",
    endPoint: "Km21+750",
    mileage: 21675,
    edgeDist: 0,
    position: "Trái",
    length: 75,
    width: 6,
    volume: 487.5,
    explanation: "487,5m2",
    handoverDate: "26/06/2021",
    warranty: 12,
    structure: [
      "Cào bóc mặt đường BTN + thảm BTNC 12.5 chiều dày TB 5 cm",
      "Thảm BTN C12.5 dày 5 cm"
    ],
    thickness: ["+5", "+5"]
  },
  {
    stt: 2,
    roadName: "QL.32-DP(Km19+500-Km24+000)",
    period: "2/2021",
    unit: "Đội QLGT số 5",
    startPoint: "Km21+770",
    endPoint: "Km21+824",
    mileage: 21770,
    edgeDist: 0,
    position: "Trái",
    length: 54,
    width: 6,
    volume: 367,
    explanation: "367 m2",
    handoverDate: "26/06/2021",
    warranty: 12,
    structure: [
      "Thảm BTN C12.5 dày 5 cm",
      "Cào bóc mặt đường BTN + thảm BTNC 12.5 chiều dày TB 5 cm"
    ],
    thickness: ["+5", "+5"]
  },
  {
    stt: 3,
    roadName: "QL.32-PT1(Km24+000-Km27+00)",
    period: "2/2021",
    unit: "Đội QLGT số 5",
    startPoint: "Km24+650",
    endPoint: "Km24+680",
    mileage: 24650,
    edgeDist: 0,
    position: "Trái",
    length: 30,
    width: 6,
    volume: 210,
    explanation: "210 m2",
    handoverDate: "26/06/2021",
    warranty: 12,
    structure: [
      "Thảm BTN C12.5 dày 5 cm"
    ],
    thickness: ["+5"]
  },
  {
    stt: 4,
    roadName: "QL.32-PT1(Km24+000-Km27+00)",
    period: "2/2021",
    unit: "Đội QLGT số 5",
    startPoint: "Km24+703",
    endPoint: "Km24+765",
    mileage: 24703,
    edgeDist: 0,
    position: "Trái",
    length: 62,
    width: 6,
    volume: 434,
    explanation: "434m2",
    handoverDate: "26/06/2021",
    warranty: 12,
    structure: [
      "Thảm BTN C12.5 dày 5 cm"
    ],
    thickness: ["+5"]
  },
  {
    stt: 5,
    roadName: "QL.32-PT1(Km24+000-Km27+00)",
    period: "2/2021",
    unit: "Đội QLGT số 5",
    startPoint: "Km24+936",
    endPoint: "Km25+025",
    mileage: 24936,
    edgeDist: 0,
    position: "Trái",
    length: 89,
    width: 6,
    volume: 636,
    explanation: "663",
    handoverDate: "26/06/2021",
    warranty: 12,
    structure: [
      "Thảm BTN C12.5 dày 5 cm"
    ],
    thickness: ["+5"]
  },
  {
    stt: 6,
    roadName: "QL.32-PT1(Km24+000-Km27+00)",
    period: "2/2021",
    unit: "Đội QLGT số 5",
    startPoint: "Km25+036",
    endPoint: "Km25+081",
    mileage: 25036,
    edgeDist: 0,
    position: "Trái",
    length: 45,
    width: 6,
    volume: 315,
    explanation: "315m2",
    handoverDate: "26/06/2021",
    warranty: 12,
    structure: [
      "Thảm BTN C12.5 dày 5 cm"
    ],
    thickness: ["+5"]
  },
  {
    stt: 7,
    roadName: "QL.32-ST(Km41+000-Km48+000)",
    period: "2/2021",
    unit: "Đội QLGT số 4",
    startPoint: "27000",
    endPoint: "48000",
    mileage: 41007,
    edgeDist: 3,
    position: "Trái",
    length: 85,
    width: 7,
    volume: 595,
    explanation: "duy tu quý 2",
    handoverDate: "15/06/2021",
    warranty: 12,
    structure: [
      "Láng nhựa đường 3 lớp"
    ],
    thickness: ["—"]
  },
  {
    stt: 8,
    roadName: "QL.32-ST(Km41+000-Km48+000)",
    period: "2/2021",
    unit: "Đội QLGT số 4",
    startPoint: "27000",
    endPoint: "48000",
    mileage: 41103,
    edgeDist: 4,
    position: "Trái",
    length: 22,
    width: 3.3,
    volume: 72.6,
    explanation: "duy tu quý 2",
    handoverDate: "15/06/2021",
    warranty: 12,
    structure: [
      "Láng nhựa đường 3 lớp"
    ],
    thickness: ["—"]
  },
  {
    stt: 9,
    roadName: "QL.32-ST(Km41+000-Km48+000)",
    period: "2/2021",
    unit: "Đội QLGT số 4",
    startPoint: "27000",
    endPoint: "48000",
    mileage: 41140,
    edgeDist: 5,
    position: "Trái",
    length: 36,
    width: 3.2,
    volume: 115.2,
    explanation: "duy tu quý 2",
    handoverDate: "15/06/2021",
    warranty: 12,
    structure: [
      "Láng nhựa đường 3 lớp"
    ],
    thickness: ["—"]
  },
  {
    stt: 10,
    roadName: "QL.32-ST(Km41+000-Km48+000)",
    period: "2/2021",
    unit: "Đội QLGT số 4",
    startPoint: "Km41+255",
    endPoint: "Km41+275",
    mileage: 41255,
    edgeDist: 2.5,
    position: "Trái",
    length: 20,
    width: 7,
    volume: 140,
    explanation: "",
    handoverDate: "15/06/2021",
    warranty: 12,
    structure: [
      "Láng nhựa đường 3 lớp"
    ],
    thickness: ["—"]
  },
  {
    stt: 11,
    roadName: "QL.32-ST(Km41+000-Km48+000)",
    period: "2/2021",
    unit: "Đội QLGT số 4",
    startPoint: "Km41+300",
    endPoint: "Km41+310",
    mileage: 41300,
    edgeDist: 5,
    position: "Trái",
    length: 10,
    width: 2,
    volume: 20,
    explanation: "duy tu q2",
    handoverDate: "15/06/2021",
    warranty: 12,
    structure: [
      "Láng nhựa đường 3 lớp"
    ],
    thickness: ["—"]
  },
  {
    stt: 12,
    roadName: "QL.32-ST(Km41+000-Km48+000)",
    period: "2/2021",
    unit: "Đội QLGT số 4",
    startPoint: "Km41+350",
    endPoint: "Km41+400",
    mileage: 41350,
    edgeDist: 4.5,
    position: "Phải",
    length: 50,
    width: 3.5,
    volume: 175,
    explanation: "duy tu q2",
    handoverDate: "15/06/2021",
    warranty: 12,
    structure: [
      "Thảm BTN C12.5 dày 5 cm"
    ],
    thickness: ["+5"]
  }
];

export default function SuaChuaMatDuong() {
  const [activeTab, setActiveTab] = useState("2026");
  const [viewMode, setViewMode] = useState<"list" | "map" | "plan">("list");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [diagramRoute, setDiagramRoute] = useState("Quốc lộ 1A");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200">Đã hoàn thành</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200">Đang thi công</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100/80 border-amber-200">Chờ phê duyệt</Badge>;
      case "planned":
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200">Dự kiến</Badge>;
      case "scheduled":
        return <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200">Đã có kế hoạch</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const currentRepairs = activeTab === "2026" ? roadRepairs2026 : roadRepairs2027;

  const stats = {
    total: currentRepairs.length,
    ongoing: currentRepairs.filter(r => r.status === "ongoing").length,
    pending: currentRepairs.filter(r => r.status === "pending").length,
    completed: currentRepairs.filter(r => r.status === "completed").length,
    planned: currentRepairs.filter(r => r.status === "planned" || r.status === "scheduled").length,
  };

  return (
    <div className="space-y-6">
      {/* Top bar: Tabs + Action Buttons */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-slate-100/50 p-1 border">
            <TabsTrigger value="2026" className="gap-2 px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Route className="size-4" />
              Thực hiện năm 2026
            </TabsTrigger>
            <TabsTrigger value="2027" className="gap-2 px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Calendar className="size-4" />
              Kế hoạch năm 2027
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center rounded-md border p-1 bg-slate-50 mr-2">
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 shadow-none" title="Dạng danh sách">
              <LayoutDashboard className="h-4 w-4 mr-2 hidden sm:block" /> Danh sách
            </Button>
            <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 shadow-none" title="Bản đồ không gian (GIS)">
              <MapIcon className="h-4 w-4 mr-2 hidden sm:block" /> Bản đồ
            </Button>
            <Button variant={viewMode === "plan" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("plan")} className="h-8 shadow-none" title="Bình đồ thiết kế">
              <Route className="h-4 w-4 mr-2 hidden sm:block" /> Bình đồ
            </Button>
          </div>

          <Button onClick={() => { setSelectedRepair(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white h-10">
            <Plus className="mr-2 size-4" />
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Route className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">Tổng sửa chữa</p><p className="text-2xl font-bold text-slate-900">{stats.total}</p></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Search className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">Đang thi công</p><p className="text-2xl font-bold text-sky-600">{stats.ongoing}</p></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Calendar className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">{activeTab === "2027" ? "Kế hoạch" : "Chờ phê duyệt"}</p><p className="text-2xl font-bold text-amber-600">{activeTab === "2027" ? stats.planned : stats.pending}</p></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600"><Eye className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">Đã hoàn thành</p><p className="text-2xl font-bold text-green-600">{stats.completed}</p></div>
        </div>
      </div>

      {/* Search & Table Card */}
      {viewMode === "list" && (
      <div className="space-y-6">
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b p-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    placeholder="Mã sửa chữa..."
                    className="pl-10 h-10 border-slate-200 bg-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="h-10 border-slate-200 bg-white">
                    <SelectValue placeholder="Tuyến đường" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả tuyến đường</SelectItem>
                    <SelectItem value="ql1a">Quốc lộ 1A</SelectItem>
                    <SelectItem value="ql5">Quốc lộ 5</SelectItem>
                    <SelectItem value="ql32">Quốc lộ 32</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="h-10 border-slate-200 bg-white">
                    <SelectValue placeholder="Đơn vị quản lý" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả đơn vị</SelectItem>
                    <SelectItem value="dv1">Hạt quản lý đường bộ 1</SelectItem>
                    <SelectItem value="dv2">Hạt quản lý đường bộ 2</SelectItem>
                    <SelectItem value="dv3">Công ty CP Quản lý & XD đường bộ Hà Nội</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="h-10 border-slate-200 bg-white">
                    <SelectValue placeholder="Tình trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả tình trạng</SelectItem>
                    <SelectItem value="pending">Chờ phê duyệt</SelectItem>
                    <SelectItem value="ongoing">Đang thi công</SelectItem>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    {activeTab === "2027" && (
                      <>
                        <SelectItem value="planned">Dự kiến</SelectItem>
                        <SelectItem value="scheduled">Đã có kế hoạch</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <Select defaultValue={activeTab}>
                  <SelectTrigger className="h-10 border-slate-200 bg-white">
                    <SelectValue placeholder="Năm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">Năm 2026</SelectItem>
                    <SelectItem value="2025">Năm 2025</SelectItem>
                    <SelectItem value="2024">Năm 2024</SelectItem>
                    <SelectItem value="2023">Năm 2023</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-full">
                  <Search className="mr-2 size-4" />
                  Tìm kiếm
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                Hiển thị <span className="font-bold text-slate-900">{currentRepairs.length}</span> kết quả
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Phạm vi sửa chữa</TableHead>
                  <TableHead>Ngày khởi công</TableHead>
                  <TableHead>Dự kiến hoàn thành</TableHead>
                  <TableHead>Đơn vị thi công</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRepairs.map((repair, index) => (
                  <TableRow key={repair.id}>
                    <TableCell className="text-center text-slate-500 font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-900">{repair.assetName}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tighter">Mã: {repair.id}</div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-600">
                      {repair.startKm} - {repair.endKm}
                    </TableCell>
                    <TableCell className="text-slate-600">{repair.startDate}</TableCell>
                    <TableCell className="text-slate-600">{repair.endDate}</TableCell>
                    <TableCell className="text-slate-600">{repair.contractor}</TableCell>
                    <TableCell>{getStatusBadge(repair.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-blue-600"
                          onClick={() => { setSelectedRepair(repair); setIsDetailOpen(true); }}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-blue-600"
                          onClick={() => { setSelectedRepair(repair); setIsFormOpen(true); }}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-red-600"
                          onClick={() => { setSelectedRepair(repair); setIsDeleteOpen(true); }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      )}

      {viewMode === "map" && (
        <Card className="h-[650px] flex flex-col relative overflow-hidden ring-1 ring-slate-200">
          <CardHeader className="py-3 border-b z-10 bg-white/95 backdrop-blur shadow-sm flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-600" /> Hệ thống Bản đồ duy tu mặt đường</CardTitle>
            <div className="flex items-center gap-4 text-xs font-semibold px-4 py-2 bg-slate-50 rounded-lg border">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-blue-500"></span> Đang thi công</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-amber-500"></span> Chờ phê duyệt / Dự kiến</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-green-500"></span> Đã hoàn thành</div>
            </div>
          </CardHeader>
          <div className="flex-1 relative">
            <SimpleMapView 
              markers={currentRepairs.filter(r => r.toaDo).map(p => ({ 
                id: p.id, lat: p.toaDo[0], lng: p.toaDo[1], name: p.assetName, type: p.status, 
                color: p.status === 'ongoing' ? '#3b82f6' : (p.status === 'completed' ? '#22c55e' : '#f59e0b') 
              }))} 
              center={[21.0285, 105.8542]}
              zoom={11}
              isActive={viewMode === "map"}
            />
          </div>
        </Card>
      )}

      {viewMode === "plan" && (
        <Card className="flex flex-col relative overflow-hidden bg-slate-50">
          <div className="p-4 bg-white border-b flex items-center gap-4 shadow-sm z-10 relative">
            <span className="text-sm font-bold text-slate-700">Chọn tuyến đường:</span>
            <Select value={diagramRoute} onValueChange={setDiagramRoute}>
              <SelectTrigger className="w-[250px] bg-white h-10 border-slate-200 shadow-sm font-semibold text-blue-700">
                <SelectValue placeholder="Chọn tuyến đường..." />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(currentRepairs.map((r: any) => r.assetName))).map((route: any) => (
                  <SelectItem key={route} value={route}>{route}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1"></div>
            <Button variant="outline" size="sm" onClick={() => setViewMode("list")} className="h-9">
              <LayoutDashboard className="size-4 mr-2" /> Về danh sách
            </Button>
          </div>
          
          <LinearRouteDiagram 
            routeName={diagramRoute}
            data={currentRepairs.filter(r => r.assetName === diagramRoute).map(r => ({
              id: r.id,
              startKm: r.startKm,
              endKm: r.endKm,
              title: `Mã DS: ${r.id}`,
              status: r.status,
              position: r.position,
              color: r.status === 'completed' ? '#10b981' : r.status === 'ongoing' ? '#3b82f6' : '#f59e0b',
            }))}
            emptyMessage={`Không có dữ liệu mặt đường, hư hỏng nào được ghi nhận trên tuyến ${diagramRoute} trong khoảng thời gian này.`}
          />
        </Card>
      )}

      <RepairFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        type="road"
        item={selectedRepair}
      />

      <RepairDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        type="road"
        item={selectedRepair}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={{ title: "Hồ sơ sửa chữa mặt đường" }}
        selectedItem={{
          fullName: selectedRepair?.assetName,
          idNumber: selectedRepair?.id,
          registrationDate: selectedRepair?.startDate
        }}
        onConfirmDelete={() => alert("Đã xóa bản ghi")}
      />

      {/* Excel Report Preview Dialog */}
      <div className={isReportOpen ? "block" : "hidden"}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-[75vw] max-w-[1400px] border-none shadow-2xl relative overflow-hidden bg-slate-50 animate-in fade-in zoom-in duration-300">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 z-20 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 rounded-full"
              onClick={() => setIsReportOpen(false)}
            >
              <Plus className="size-5 rotate-45" />
            </Button>
            <CardHeader className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-green-50 flex items-center justify-center">
                  <FileDown className="size-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Xem trước báo cáo Excel</h3>
                  <p className="text-xs text-slate-500 font-medium tracking-wide flex items-center gap-1.5 uppercase">
                    Báo cáo chi tiết sửa chữa mặt đường bộ
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setIsReportOpen(false)} className="h-10 px-6 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">Đóng</Button>
                <Button className="h-10 px-8 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg shadow-green-100 transition-all flex items-center gap-2">
                  <FileDown className="size-4" />
                  Tải về Excel (.xlsx)
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white overflow-x-auto">
              <div 
                className="min-w-[1500px] mx-auto shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-slate-100 p-12 bg-white rounded-sm min-h-[1000px] font-serif font-['Times_New_Roman']"
              >
                {/* 17-Column Table */}
                <div className="overflow-x-auto border border-slate-300">
                  <table className="w-full border-collapse text-[11px] bg-white text-slate-800 leading-tight">
                    <caption className="caption-top p-12 bg-white">
                      <div className="flex justify-between items-start w-full font-serif font-['Times_New_Roman']">
                        <div className="text-center w-[400px]">
                          <p className="font-bold uppercase text-[18px] m-0">SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
                          <p className="font-bold uppercase text-[18px] mt-[5px] mb-0 mx-0 underline">BAN DUY TU CÁC CÔNG TRÌNH HTGT</p>
                        </div>
                        <div className="text-center w-[400px]">
                          <p className="font-bold uppercase text-[18px] m-0">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                          <p className="font-bold text-[19px] mt-[5px] mb-0 mx-0">Độc lập - Tự do - Hạnh phúc</p>
                          <div className="w-[160px] h-[1.5px] bg-black mt-2 mx-auto"></div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-[60px] mb-5">
                        <h4 className="text-[26px] font-bold uppercase m-0">BÁO CÁO CHI TIẾT SỬA CHỮA MẶT ĐƯỜNG</h4>
                        <p className="text-[20px] font-bold italic mt-2.5">quý 4 năm 2025</p>
                      </div>
                    </caption>
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-300 font-bold">
                        <th className="border-r border-slate-300 p-2 text-center w-10">STT</th>
                        <th className="border-r border-slate-300 p-2 text-center w-40">Tên đường, phố(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-20">Quý/Năm</th>
                        <th className="border-r border-slate-300 p-2 text-center w-32">Đơn vị quản lý(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Điểm đầu</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Điểm cuối</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Khoảng cách lý trình(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Khoảng cách mép đường(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-20">Vị trí(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-16">Chiều dài(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-16">Chiều rộng(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-20">Khối lượng</th>
                        <th className="border-r border-slate-300 p-2 text-center w-32">Giải trình</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Ngày bàn giao đưa vào sử dụng(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-20">Thời gian bảo hành(*)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-60">Tên loại kết cấu xử lý(*)</th>
                        <th className="p-2 text-center w-16">Độ dày(*)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportRoadRepairData.map((row) => (
                        <tr key={row.stt} className="border-b border-slate-200">
                          <td className="border-r border-slate-300 p-2 text-center">{row.stt}</td>
                          <td className="border-r border-slate-300 p-2">{row.roadName}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.period}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.unit}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.startPoint}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.endPoint}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.mileage.toLocaleString()}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.edgeDist}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.position}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.length}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.width}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.volume.toLocaleString()}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.explanation}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.handoverDate}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.warranty}</td>
                          <td className="border-r border-slate-300 p-2">
                            {row.structure.map((s, idx) => (
                              <div key={idx} className={idx > 0 ? "border-t border-slate-100 pt-1 mt-1" : ""}>
                                + {s}
                              </div>
                            ))}
                          </td>
                          <td className="p-2 text-center font-bold">
                            {row.thickness.map((t, idx) => (
                              <div key={idx} className={idx > 0 ? "border-t border-slate-100 pt-1 mt-1" : ""}>
                                {t}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                      {/* Empty rows to simulate Excel length */}
                      {Array.from({length: 15}).map((_, i) => (
                        <tr key={`empty-${i}`} className="border-b border-slate-100 h-8">
                          {Array.from({length: 16}).map((__, j) => (
                            <td key={j} className="border-r border-slate-300"></td>
                          ))}
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer signatures */}
                <div className="grid grid-cols-2 gap-20 mt-20 text-center font-serif">
                   <div className="space-y-2">
                    <p className="italic text-slate-700 text-sm italic">Hà Nội, ngày......tháng......năm 2025</p>
                    <div className="space-y-24 mt-4">
                      <p className="font-bold uppercase text-sm">Người lập biểu</p>
                      <p className="font-bold italic text-slate-300">_______________________</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white opacity-0 text-sm">.</p>
                    <div className="space-y-24 mt-4">
                      <p className="font-bold uppercase text-sm">Xác nhận của Sở Giao thông vận tải</p>
                      <p className="font-bold italic text-slate-300">_______________________</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
