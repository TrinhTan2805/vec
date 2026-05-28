import React, { useState } from "react";
import { Plus, FileDown, Search, Edit, Trash2, Eye, GitMerge, CheckCircle2, ClipboardList, Clock, Map as MapIcon, X, Save } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
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
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { HandoverDetailDialog, HandoverRecord } from "../../components/maintain/HandoverDetailDialog";
import { HandoverFormDialog } from "../../components/maintain/HandoverFormDialog";

type HandoverStatus = "active" | "pending" | "completed";

// Data interface imported from HandoverDetailDialog

const mockData: HandoverRecord[] = [
  { id: "BG-001", sectionName: "Đoạn Km0+000 – Km5+000", routeName: "Quốc lộ 1A", handoverDate: "2026-01-15", contractor: "Công ty XD Thăng Long", supervisor: "Ban QLDA GTĐT HN", length: 5.0, width: 10.5, projectName: "Dự án nâng cấp QL1A", status: "active", note: "Đang thi công mặt đường", lat: 21.028, lng: 105.854 },
  { id: "BG-002", sectionName: "Đoạn Km12+000 – Km18+500", routeName: "Quốc lộ 5", handoverDate: "2026-02-01", contractor: "Tổng công ty 1", supervisor: "Sở GTVT Hà Nội", length: 6.5, width: 12.0, projectName: "Dự án cải tạo QL5 đoạn HN – HP", status: "completed", note: "Đã hoàn trả mặt đường", lat: 21.035, lng: 105.862 },
  { id: "BG-003", sectionName: "Đoạn Km3+500 – Km7+200", routeName: "Quốc lộ 32", handoverDate: "2026-03-10", contractor: "UDIC", supervisor: "Ban QLDA GTĐT HN", length: 3.7, width: 8.0, projectName: "Xây dựng cầu vượt nút giao Cầu Giấy", status: "pending", note: "Chờ nghiệm thu", lat: 21.022, lng: 105.840 },
  { id: "BG-004", sectionName: "Đoạn Km0+800 – Km2+400", routeName: "Đường Vành đai 2", handoverDate: "2026-04-05", contractor: "Đầu tư XD Hà Nội", supervisor: "Hạt QLĐB 1", length: 1.6, width: 14.0, projectName: "Dự án mở rộng Vành đai 2 đoạn Vĩnh Tuy", status: "active", note: "Đang dải móng cấp phối", lat: 21.015, lng: 105.872 },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200">Đã hoàn trả</Badge>;
    case "active":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200">Đang thi công</Badge>;
    case "pending":
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100/80 border-amber-200">Chờ nghiệm thu</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function BanGiaoXDCB() {
  const [data, setData] = useState<HandoverRecord[]>(mockData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HandoverRecord | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<Partial<HandoverRecord>>({});

  const stats = {
    total: data.length,
    active: data.filter(i => i.status === "active").length,
    pending: data.filter(i => i.status === "pending").length,
    completed: data.filter(i => i.status === "completed").length,
  };

  const openAdd = () => {
    setFormMode("add");
    setFormData({ status: "active" });
    setIsFormOpen(true);
  };

  const openEdit = (item: HandoverRecord) => {
    setFormMode("edit");
    setFormData({ ...item });
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const openDetail = (item: HandoverRecord) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };



  const handleSave = () => {
    if (formMode === "add") {
      const newItem: HandoverRecord = {
        ...formData as HandoverRecord,
        id: `BG-${String(data.length + 1).padStart(3, "0")}`,
        lat: 21.028 + Math.random() * 0.02,
        lng: 105.854 + Math.random() * 0.02,
      };
      setData(prev => [newItem, ...prev]);
    } else {
      setData(prev => prev.map(i => i.id === selectedItem?.id ? { ...i, ...formData } as HandoverRecord : i));
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    setData(prev => prev.filter(i => i.id !== selectedItem?.id));
    setIsDeleteOpen(false);
  };

  const mapMarkers = selectedItem ? [{
    id: selectedItem.id,
    name: selectedItem.sectionName,
    lat: selectedItem.lat,
    lng: selectedItem.lng,
    type: "công trường",
    description: selectedItem.projectName,
  }] : [];

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-end gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Button variant="outline" className="border-slate-200 h-10">
          <FileDown className="mr-2 size-4" />
          Xuất Excel
        </Button>
        <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white h-10">
          <Plus className="mr-2 size-4" />
          Thêm mới bàn giao
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><ClipboardList className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">Tổng đoạn bàn giao</p><p className="text-2xl font-bold text-slate-900">{stats.total}</p></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><GitMerge className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">Đang thi công</p><p className="text-2xl font-bold text-sky-600">{stats.active}</p></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Clock className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">Chờ nghiệm thu</p><p className="text-2xl font-bold text-amber-600">{stats.pending}</p></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600"><CheckCircle2 className="size-6" /></div>
          <div><p className="text-xs text-slate-500 font-medium">Đã hoàn trả</p><p className="text-2xl font-bold text-green-600">{stats.completed}</p></div>
        </div>
      </div>

      {/* Filter + Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b p-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Mã / Tên đoạn..." className="pl-10 h-10 border-slate-200 bg-white" />
              </div>
              <Select>
                <SelectTrigger className="h-10 border-slate-200 bg-white"><SelectValue placeholder="Tuyến đường" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả tuyến đường</SelectItem>
                  <SelectItem value="ql1a">Quốc lộ 1A</SelectItem>
                  <SelectItem value="ql5">Quốc lộ 5</SelectItem>
                  <SelectItem value="ql32">Quốc lộ 32</SelectItem>
                  <SelectItem value="vd2">Đường Vành đai 2</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-10 border-slate-200 bg-white"><SelectValue placeholder="Đơn vị thi công" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả đơn vị</SelectItem>
                  <SelectItem value="tl">Công ty XD Thăng Long</SelectItem>
                  <SelectItem value="tc1">Tổng công ty 1</SelectItem>
                  <SelectItem value="udic">UDIC</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-10 border-slate-200 bg-white"><SelectValue placeholder="Tình trạng" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang thi công</SelectItem>
                  <SelectItem value="pending">Chờ nghiệm thu</SelectItem>
                  <SelectItem value="completed">Đã hoàn trả</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 w-full">
                <Search className="mr-2 size-4" />Tìm kiếm
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              Hiển thị <span className="font-bold text-slate-900">{data.length}</span> kết quả
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-12 text-center">STT</TableHead>
                <TableHead>Đoạn đường bàn giao</TableHead>
                <TableHead>Tuyến đường</TableHead>
                <TableHead>Dự án / Công trình</TableHead>
                <TableHead>Ngày bàn giao</TableHead>
                <TableHead>Đơn vị thi công</TableHead>
                <TableHead>Dài (km)</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-slate-500 font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="font-bold text-slate-900">{item.sectionName}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tighter">Mã: {item.id}</div>
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium">{item.routeName}</TableCell>
                  <TableCell className="text-slate-600 text-sm max-w-[180px] truncate" title={item.projectName}>{item.projectName}</TableCell>
                  <TableCell className="text-slate-600">{item.handoverDate}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{item.contractor}</TableCell>
                  <TableCell className="text-slate-700 font-medium">{item.length.toFixed(1)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => openDetail(item)} title="Xem chi tiết">
                        <Eye className="size-4" />
                      </Button>

                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" onClick={() => openEdit(item)} title="Chỉnh sửa">
                        <Edit className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }} title="Xóa">
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

      {/* ===== ADD / EDIT FORM DIALOG ===== */}
      <HandoverFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        item={formMode === "edit" ? selectedItem || undefined : undefined}
        onSave={handleSave}
      />

      {/* ===== DETAIL DIALOG ===== */}
      <HandoverDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        item={selectedItem}
        onEdit={(item) => openEdit(item)}
      />

      {/* ===== DELETE DIALOG ===== */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={{ title: "Đoạn đường bàn giao XDCB" }}
        selectedItem={{
          fullName: selectedItem?.sectionName,
          idNumber: selectedItem?.id,
          registrationDate: selectedItem?.handoverDate
        }}
        onConfirmDelete={handleDelete}
      />
    </div>
  );
}
