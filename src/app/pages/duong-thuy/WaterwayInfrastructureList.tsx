import { useState, useMemo } from "react";
import { Search, Plus, FileDown, Eye, Edit, Trash2, MapPin, Waves , Map as MapIcon, LayoutDashboard, Layers} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { EditDialog } from "../../components/infrastructure/EditDialog";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { SimpleMapView } from "../../components/map/SimpleMapView";

interface WaterwayItem {
  id: number;
  code: string;
  name: string;
  length: string;
  type: string;
  startPoint: string;
  endPoint: string;
  status: "active" | "maintenance" | "inactive";
  updated: string;
}

const mockData: WaterwayItem[] = [
  { id: 1, code: "DT-001", name: "Tuyến Sông Hồng", length: "120", type: "Tuyến đường thủy", startPoint: "Hà Nội", endPoint: "Hưng Yên", status: "active", updated: "2024-03-20" },
  { id: 2, code: "DT-002", name: "Luồng Lạch Giang", length: "45", type: "Luồng chạy tàu", startPoint: "Nam Định", endPoint: "Biển Đông", status: "maintenance", updated: "2024-03-18" },
  { id: 3, code: "DT-003", name: "Tuyến Sông Đuống", length: "68", type: "Tuyến đường thủy", startPoint: "Hà Nội", endPoint: "Bắc Ninh", status: "active", updated: "2024-03-15" },
  { id: 4, code: "DT-004", name: "Nhánh Sông Luộc", length: "32", type: "Nhánh luồng", startPoint: "Hưng Yên", endPoint: "Thái Bình", status: "active", updated: "2024-03-12" },
  { id: 5, code: "DT-005", name: "Luồng Sông Thái Bình", length: "57", type: "Luồng chạy tàu", startPoint: "Hải Dương", endPoint: "Hải Phòng", status: "inactive", updated: "2024-03-10" },
];

const STATUS_CONFIG = {
  active: { label: "Đang vận hành", className: "bg-green-100 text-green-700 hover:bg-green-100 border-none" },
  maintenance: { label: "Bảo trì", className: "bg-orange-100 text-orange-700 hover:bg-orange-100 border-none" },
  inactive: { label: "Ngừng hoạt động", className: "bg-slate-100 text-slate-600 hover:bg-slate-100 border-none" },
};

interface WaterwayInfrastructureListProps {
  title: string;
  category: string;
  icon?: React.ReactNode;
}

export default function WaterwayInfrastructureList({ title, category, icon }: WaterwayInfrastructureListProps) {
  const [searchCode, setSearchCode] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [appliedSearch, setAppliedSearch] = useState({ code: "", status: "all", type: "all" });

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WaterwayItem | null>(null);

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchCode = appliedSearch.code
        ? item.code.toLowerCase().includes(appliedSearch.code.toLowerCase()) ||
          item.name.toLowerCase().includes(appliedSearch.code.toLowerCase())
        : true;
      const matchStatus = appliedSearch.status !== "all" ? item.status === appliedSearch.status : true;
      const matchType = appliedSearch.type !== "all" ? item.type === appliedSearch.type : true;
      return matchCode && matchStatus && matchType;
    });
  }, [appliedSearch]);

  const stats = {
    total: mockData.length,
    active: mockData.filter((d) => d.status === "active").length,
    maintenance: mockData.filter((d) => d.status === "maintenance").length,
    inactive: mockData.filter((d) => d.status === "inactive").length,
  };

  const toDialogItem = (item: WaterwayItem | null) =>
    item
      ? {
          fullName: item.name,
          idNumber: item.code,
          chieuDai: item.length,
          diemDau: item.startPoint,
          diemCuoi: item.endPoint,
          loai: item.type,
          tinhTrang: STATUS_CONFIG[item.status].label,
          ngayCapNhat: item.updated,
        }
      : null;

  const selectedCard = { title };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Waves className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Tổng số</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Waves className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Đang vận hành</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <Waves className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Đang bảo trì</p>
            <p className="text-2xl font-bold text-orange-600">{stats.maintenance}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Waves className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Ngừng hoạt động</p>
            <p className="text-2xl font-bold text-slate-600">{stats.inactive}</p>
          </div>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-3">

              <div className="flex items-center rounded-md border p-1 bg-slate-50 mr-2">
                <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 shadow-none" title="Dạng danh sách">
                  <LayoutDashboard className="h-4 w-4 mr-2 hidden sm:block" /> Danh sách
                </Button>
                <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 shadow-none" title="Bản đồ không gian (GIS)">
                  <MapIcon className="h-4 w-4 mr-2 hidden sm:block" /> Bản đồ
                </Button>
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-slate-200 h-9"
                onClick={() => setIsExcelOpen(true)}
              >
                <FileDown className="size-4" />
                Xuất Excel
              </Button>
              <Button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 h-9"
                onClick={() => { setSelectedItem(null); setIsEditOpen(true); }}
              >
                <Plus className="size-4" />
                Thêm mới
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Mã hoặc tên..."
                className="pl-10 h-10 border-slate-200 bg-white"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-10 border-slate-200 bg-white">
                <SelectValue placeholder="Tình trạng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả tình trạng</SelectItem>
                <SelectItem value="active">Đang vận hành</SelectItem>
                <SelectItem value="maintenance">Bảo trì</SelectItem>
                <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="h-10 border-slate-200 bg-white">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="Tuyến đường thủy">Tuyến đường thủy</SelectItem>
                <SelectItem value="Luồng chạy tàu">Luồng chạy tàu</SelectItem>
                <SelectItem value="Nhánh luồng">Nhánh luồng</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 col-span-1"
              onClick={() => setAppliedSearch({ code: searchCode, status: filterStatus, type: filterType })}
            >
              <Search className="mr-2 size-4" />
              Tìm kiếm
            </Button>
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Hiển thị <span className="font-bold text-slate-900">{filteredData.length}</span> kết quả
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-12 text-center">STT</TableHead>
                <TableHead>Mã định danh</TableHead>
                <TableHead>Tên gọi</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Chiều dài/Quy mô</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead>Cập nhật cuối</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-slate-500 font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <button
                      className="font-bold text-blue-600 hover:underline text-left"
                      onClick={() => { setSelectedItem(item); setIsDetailOpen(true); }}
                    >
                      {item.code}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.startPoint} → {item.endPoint}</div>
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">{item.type}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{item.length} km</TableCell>
                  <TableCell>
                    <Badge className={`${STATUS_CONFIG[item.status].className} px-2.5 py-0.5 rounded-full text-xs font-medium`}>
                      {STATUS_CONFIG[item.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">{item.updated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-blue-600"
                        title="Xem chi tiết"
                        onClick={() => { setSelectedItem(item); setIsDetailOpen(true); }}
                      >
                        <Eye className="size-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-blue-600"
                        title="Chỉnh sửa"
                        onClick={() => { setSelectedItem(item); setIsEditOpen(true); }}
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-red-600"
                        title="Xóa"
                        onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
            <p className="text-sm text-slate-500">
              Hiển thị 1-{filteredData.length} trong tổng số {filteredData.length} bản ghi
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <DetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        selectedCard={selectedCard}
        selectedItem={toDialogItem(selectedItem)}
        onEditClick={() => { setIsDetailOpen(false); setIsEditOpen(true); }}
      />

      {/* Edit Dialog */}
      <EditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        selectedCard={selectedCard}
        selectedItem={toDialogItem(selectedItem)}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={selectedCard}
        selectedItem={toDialogItem(selectedItem)}
        onConfirmDelete={() => alert("Đã xóa bản ghi")}
      />

      {/* Excel Export Dialog */}
      {isExcelOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-[75vw] max-w-[1200px] border-none shadow-2xl relative overflow-hidden bg-slate-50 animate-in fade-in zoom-in duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-20 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 rounded-full"
              onClick={() => setIsExcelOpen(false)}
            >
              <Plus className="size-5 rotate-45" />
            </Button>
            <div className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-green-50 flex items-center justify-center">
                  <FileDown className="size-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Xem trước báo cáo Excel</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                    Báo cáo danh sách {title}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setIsExcelOpen(false)} className="h-10 px-6 font-medium text-slate-600">
                  Đóng
                </Button>
                <Button className="h-10 px-8 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-100 flex items-center gap-2">
                  <FileDown className="size-4" />
                  Tải về Excel (.xlsx)
                </Button>
              </div>
            </div>
            <div className="p-8 bg-white overflow-x-auto">
              {/* eslint-disable react/forbid-component-props */}
              <div
                className="min-w-[900px] mx-auto shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-slate-100 p-10 bg-white rounded-sm"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                  <div style={{ textAlign: "center", width: "350px" }}>
                    <p style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "16px", margin: "0" }}>SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
                    <p style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "16px", margin: "5px 0 0 0", textDecoration: "underline" }}>
                      BAN QUẢN LÝ ĐƯỜNG THỦY NỘI ĐỊA
                    </p>
                  </div>
                  <div style={{ textAlign: "center", width: "350px" }}>
                    <p style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "16px", margin: "0" }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                    <p style={{ fontWeight: "bold", fontSize: "16px", margin: "5px 0 0 0" }}>Độc lập - Tự do - Hạnh phúc</p>
                    <div style={{ width: "160px", height: "1.5px", backgroundColor: "#000", margin: "8px auto 0" }}></div>
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "22px", fontWeight: "bold", textTransform: "uppercase", margin: "0" }}>DANH SÁCH {title.toUpperCase()}</h4>
                  <p style={{ fontSize: "16px", fontStyle: "italic", marginTop: "8px" }}>Năm 2024</p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-slate-300">
                  <table className="w-full border-collapse text-[11px] bg-white text-slate-800 leading-tight">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-300 font-bold">
                        <th className="border-r border-slate-300 p-2 text-center w-10">STT</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Mã định danh</th>
                        <th className="border-r border-slate-300 p-2 text-center w-48">Tên gọi</th>
                        <th className="border-r border-slate-300 p-2 text-center w-32">Loại</th>
                        <th className="border-r border-slate-300 p-2 text-center w-28">Chiều dài (km)</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Điểm đầu</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Điểm cuối</th>
                        <th className="border-r border-slate-300 p-2 text-center w-24">Tình trạng</th>
                        <th className="p-2 text-center w-24">Cập nhật cuối</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.map((row, idx) => (
                        <tr key={row.id} className="border-b border-slate-200">
                          <td className="border-r border-slate-300 p-2 text-center">{idx + 1}</td>
                          <td className="border-r border-slate-300 p-2 text-center font-medium">{row.code}</td>
                          <td className="border-r border-slate-300 p-2">{row.name}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.type}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.length}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.startPoint}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{row.endPoint}</td>
                          <td className="border-r border-slate-300 p-2 text-center">{STATUS_CONFIG[row.status].label}</td>
                          <td className="p-2 text-center">{row.updated}</td>
                        </tr>
                      ))}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <tr key={`e-${i}`} className="border-b border-slate-100 h-7">
                          {Array.from({ length: 9 }).map((__, j) => (
                            <td key={j} className="border-r border-slate-200"></td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-20 mt-16 text-center">
                  <div className="space-y-2">
                    <p className="italic text-slate-700 text-sm">Hà Nội, ngày......tháng......năm 2024</p>
                    <div className="space-y-24 mt-4">
                      <p className="font-bold uppercase text-sm">Người lập biểu</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white opacity-0 text-sm">.</p>
                    <div className="space-y-24 mt-4">
                      <p className="font-bold uppercase text-sm">Xác nhận của Sở Giao thông vận tải</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* eslint-enable react/forbid-component-props */}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
