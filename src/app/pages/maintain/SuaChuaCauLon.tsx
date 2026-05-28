import React, { useState } from "react";
import { Plus, FileDown, Search, Edit, Trash2, Eye, MapPin, Building2, Calendar, LayoutDashboard, Layers, Map as MapIcon, Route } from "lucide-react";
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

const bridgeRepairs2026 = [
  { id: "BR-001", assetName: "Cầu Nhật Tân", startKm: "Nhịp dầm T4", endKm: "Nhịp dầm T5", startDate: "2026-02-15", endDate: "2026-03-30", status: "completed", contractor: "UDIC", progress: 100, toaDo: [21.093, 105.819] },
  { id: "BR-002", assetName: "Cầu Vĩnh Tuy", startKm: "P2", endKm: "P3", startDate: "2026-03-20", endDate: "2026-05-20", status: "ongoing", contractor: "Đầu tư xây dựng Hà Nội", progress: 30, toaDo: [21.006, 105.874] },
  { id: "BR-003", assetName: "Cầu Đông Trù", startKm: "Nhịp chính", endKm: "Nhịp phụ T1", startDate: "2026-04-01", endDate: "2026-06-30", status: "pending", contractor: "Chưa giao thầu", progress: 0, toaDo: [21.066, 105.897] },
];

const bridgeRepairs2027 = [
  { id: "BPL-001", assetName: "Cầu Long Biên", startKm: "Trụ P1", endKm: "Trụ P4", startDate: "2027-02-01", endDate: "2027-04-30", status: "scheduled", contractor: "Đang khảo sát", progress: 0, toaDo: [21.041, 105.861] },
  { id: "BPL-002", assetName: "Cầu Chương Dương", startKm: "Nhịp T1", endKm: "Nhịp T3", startDate: "2027-05-01", endDate: "2027-07-30", status: "planned", contractor: "Chưa xác định", progress: 0, toaDo: [21.037, 105.858] },
];

export default function SuaChuaCauLon() {
  const [activeTab, setActiveTab] = useState("2026");
  const [viewMode, setViewMode] = useState<"list" | "map" | "plan">("list");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<any>(null);

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

  const currentRepairs = activeTab === "2026" ? bridgeRepairs2026 : bridgeRepairs2027;

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
              <Building2 className="size-4" />
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
          <Button variant="outline" className="border-slate-200 h-10">
            <FileDown className="mr-2 size-4" />
            Văn bản
          </Button>
          <Button onClick={() => { setSelectedRepair(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white h-10">
            <Plus className="mr-2 size-4" />
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Building2 className="size-6" /></div>
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
                    placeholder="Mã / Tên cầu..."
                    className="pl-10 h-10 border-slate-200 bg-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="h-10 border-slate-200 bg-white">
                    <SelectValue placeholder="Tên cầu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả cầu lớn</SelectItem>
                    <SelectItem value="nhat-tan">Cầu Nhật Tân</SelectItem>
                    <SelectItem value="vinh-tuy">Cầu Vĩnh Tuy</SelectItem>
                    <SelectItem value="dong-tru">Cầu Đông Trù</SelectItem>
                    <SelectItem value="long-bien">Cầu Long Biên</SelectItem>
                    <SelectItem value="chuong-duong">Cầu Chương Dương</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="h-10 border-slate-200 bg-white">
                    <SelectValue placeholder="Đơn vị quản lý" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả đơn vị</SelectItem>
                    <SelectItem value="udic">UDIC</SelectItem>
                    <SelectItem value="hxd">Đầu tư XD Hà Nội</SelectItem>
                    <SelectItem value="dv3">Ban QLDA GTĐT HN</SelectItem>
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
                  <TableHead>Tên cầu</TableHead>
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
            <CardTitle className="text-base flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-600" /> Bản đồ kết cấu cầu lớn</CardTitle>
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
        <Card className="h-[650px] flex flex-col relative overflow-hidden bg-slate-50 border-dashed">
          <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-500 text-center p-8">
            <Route className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-medium text-slate-700 mb-2">Bản vẽ Bố trí chung / Bình đồ tổng thể cầu</h3>
            <p className="max-w-md text-sm text-slate-500">
              Chế độ Bình đồ 3D BIM cho kiến trúc và nhịp cầu lớn. Hỗ trợ hiển thị vị trí trụ cầu, mố cầu và điểm hư hỏng trực tiếp trên bản vẽ.
            </p>
            <Button variant="outline" className="mt-6 bg-white" onClick={() => setViewMode("list")}>Quay lại dạng Danh sách</Button>
          </div>
        </Card>
      )}

      <RepairFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        type="bridge"
        item={selectedRepair}
      />

      <RepairDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        type="bridge"
        item={selectedRepair}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={{ title: "Hồ sơ sửa chữa mặt đường cầu lớn" }}
        selectedItem={{
          fullName: selectedRepair?.assetName,
          idNumber: selectedRepair?.id,
          registrationDate: selectedRepair?.startDate
        }}
        onConfirmDelete={() => alert("Đã xóa bản ghi")}
      />
    </div>
  );
}
