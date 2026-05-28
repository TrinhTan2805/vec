import { useState } from "react";
import { Merge, Search, Plus, Edit, Trash2, Download, Eye, Wrench, ClipboardCheck, History, ExternalLink, Filter, Upload, Route, Signpost, TrafficCone, Shield, Lightbulb, Camera, Monitor, Warehouse, Construction, Droplets, HelpCircle, ArrowRight, CheckCircle2, AlertCircle, FileSpreadsheet, MapIcon, Database, Check, Layers } from "lucide-react";
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
import { ImportDialog } from "../../components/infrastructure/ImportDialog";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { TechnicalDialog } from "../../components/infrastructure/TechnicalDialog";
import { DoanDuongBoFormDialog } from "../../components/infrastructure/DoanDuongBoFormDialog";

interface DoanDuong {
  id: string;
  maDoan: string;
  tenDoan: string;
  loaiDoan: string;
  chieuDai: number;
  lyTrinhDau: string;
  lyTrinhCuoi: string;
  tuyenDuong: string;
  trangThai: string;
}

const mockData: DoanDuong[] = [
  { id: "1", maDoan: "D001", tenDoan: "Đoạn qua nội thành", loaiDoan: "Theo địa phận", chieuDai: 5.5, lyTrinhDau: "Km 0+000", lyTrinhCuoi: "Km 5+500", tuyenDuong: "QL1A", trangThai: "Hoạt động" },
  { id: "2", maDoan: "D002", tenDoan: "Đoạn ngoại ô", loaiDoan: "Theo mặt cắt", chieuDai: 10.2, lyTrinhDau: "Km 5+500", lyTrinhCuoi: "Km 15+700", tuyenDuong: "QL1A", trangThai: "Bảo trì" },
  { id: "3", maDoan: "D003", tenDoan: "Đoạn đèo", loaiDoan: "Theo địa phận", chieuDai: 15.0, lyTrinhDau: "Km 20+000", lyTrinhCuoi: "Km 35+000", tuyenDuong: "QL13", trangThai: "Hoạt động" },
];

export default function DoanDuongBoList() {
  const [data, setData] = useState<DoanDuong[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);
  const [isTechnicalDialogOpen, setIsTechnicalDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCard, setSelectedCard] = useState<any>({ title: "Tổng số tuyến đường" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMergeToRouteDialogOpen, setIsMergeToRouteDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const sectionFields = [
    { name: "maDoan", label: "Mã đoạn" },
    { name: "tenDoan", label: "Tên đoạn" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "chieuDai", label: "Chiều dài (km)" },
    { name: "diemDau", label: "Điểm đầu" },
    { name: "diemCuoi", label: "Điểm cuối" },
    { name: "tuKm", label: "Từ Km" },
    { name: "denKm", label: "Đến Km" },
    { name: "donViQuanLy", label: "Đơn vị quản lý" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleConfirmDelete = () => {
    if (selectedItem) {
      setData(data.filter((item) => item.maDoan !== selectedItem.idNumber));
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      {/* Quick Actions / Stat Cards */}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="size-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm đoạn đường..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 text-sm">
                <Filter className="size-4 mr-2" />
                Lọc
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 text-sm"
                onClick={() => setIsImportDialogOpen(true)}
              >
                <Upload className="size-4 mr-2" />
                Nhập dữ liệu
              </Button>
              <Button size="sm" variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-10 px-4 text-sm">
                <Download className="size-4 mr-2" />
                Xuất
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 text-sm" onClick={() => { setSelectedItem(null); setIsFormDialogOpen(true); }}>
                <Plus className="size-4 mr-2" />
                Thêm mới
              </Button>
              <div className="flex gap-2 ml-2 pl-4 border-l border-slate-200">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`h-10 px-4 text-sm font-medium transition-all ${selectedIds.length > 1 ? "border-green-200 text-green-600 bg-green-50" : "border-slate-200 text-slate-400"}`}
                  disabled={selectedIds.length <= 1}
                  onClick={() => setIsMergeToRouteDialogOpen(true)}
                >
                  <Route className="size-4 mr-2" />
                  Gộp thành tuyến ({selectedIds.length})
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đoạn đường ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300" 
                      title="Chọn tất cả"
                      aria-label="Chọn tất cả đoạn đường"
                      onChange={(e) => {
                        if (e.target.checked) setSelectedIds(filteredData.map(d => d.id));
                        else setSelectedIds([]);
                      }}
                      checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                    />
                  </TableHead>
                  <TableHead className="font-medium text-slate-500">Mã đoạn</TableHead>
                  <TableHead className="font-medium text-slate-500">Tên đoạn</TableHead>
                  <TableHead className="font-medium text-slate-500">Tuyến</TableHead>
                  <TableHead className="font-medium text-slate-500">Lý trình</TableHead>
                  <TableHead className="font-medium text-slate-500">Chiều dài (km)</TableHead>
                  <TableHead className="font-medium text-slate-500">Loại</TableHead>
                  <TableHead className="font-medium text-slate-500">Trạng thái</TableHead>
                  <TableHead className="text-right font-medium text-slate-500 w-[200px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, idx) => {
                  // Map DoanDuong to common asset object for shared dialogs
                  const assetItem = {
                    stt: idx + 1,
                    status: "Hoạt động",
                    fullName: item.tenDoan,
                    idNumber: item.maDoan,
                    birthDate: item.chieuDai.toString(),
                    fatherName: item.lyTrinhDau,
                    motherName: item.lyTrinhCuoi,
                    gender: item.loaiDoan,
                    nationality: item.tuyenDuong,
                    registrationDate: "20/04/2025",
                    syncDate: "25/04/2026",
                    condition: item.trangThai === "Hoạt động" ? "Đạt tiêu chuẩn" : "Cần bảo trì"
                  };

                  return (
                    <TableRow key={item.id} className={`hover:bg-slate-50/50 transition-colors ${selectedIds.includes(item.id) ? "bg-blue-50/30" : ""}`}>
                      <TableCell>
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300" 
                          title="Chọn đoạn đường"
                          aria-label={`Chọn đoạn đường ${item.maDoan}`}
                          checked={selectedIds.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedIds([...selectedIds, item.id]);
                            else setSelectedIds(selectedIds.filter(id => id !== item.id));
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{item.maDoan}</TableCell>
                      <TableCell className="text-slate-900">{item.tenDoan}</TableCell>
                      <TableCell className="text-slate-600">{item.tuyenDuong}</TableCell>
                      <TableCell className="text-slate-600 whitespace-nowrap">{item.lyTrinhDau} - {item.lyTrinhCuoi}</TableCell>
                      <TableCell className="text-slate-600">{item.chieuDai}</TableCell>
                      <TableCell className="text-slate-600">{item.loaiDoan}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={item.trangThai === "Hoạt động" 
                            ? "bg-green-50 text-green-700 border-green-100 text-xs" 
                            : "bg-yellow-50 text-yellow-700 border-yellow-100 text-xs"
                          }
                        >
                          {item.trangThai}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => { setSelectedItem(assetItem); setIsDetailDialogOpen(true); }}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                            onClick={() => { setSelectedItem(assetItem); setIsFormDialogOpen(true); }}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button 
                             variant="ghost" 
                             size="icon" 
                             className="size-8 text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                             onClick={() => { setSelectedItem(assetItem); setIsMaintenanceDialogOpen(true); }}
                          >
                            <Wrench className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                            onClick={() => { setSelectedItem(assetItem); setIsInspectionDialogOpen(true); }}
                          >
                            <ClipboardCheck className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                            onClick={() => { setSelectedItem(assetItem); setIsTechnicalDialogOpen(true); }}
                          >
                            <History className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="size-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => { setSelectedItem(assetItem); setIsDeleteDialogOpen(true); }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* New Dialog Components */}
      <DetailDialog 
        open={isDetailDialogOpen} 
        onOpenChange={setIsDetailDialogOpen} 
        selectedCard={selectedCard}
        selectedItem={selectedItem}
        onEditClick={() => { setIsDetailDialogOpen(false); setIsFormDialogOpen(true); }}
      />
      <DoanDuongBoFormDialog 
        open={isFormDialogOpen} 
        onOpenChange={setIsFormDialogOpen} 
        selectedItem={selectedItem}
      />
      <DeleteDialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        selectedCard={selectedCard}
        selectedItem={selectedItem}
        onConfirmDelete={handleConfirmDelete}
      />
      <TechnicalDialog 
        open={isTechnicalDialogOpen} 
        onOpenChange={setIsTechnicalDialogOpen} 
        selectedCard={selectedCard}
        selectedItem={selectedItem}
      />
      
      {/* Maintenance History Dialog (Placeholder) */}
      <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Wrench className="size-5 text-blue-600" />
              Lịch sử bảo trì - {selectedItem?.fullName}
            </DialogTitle>
            <DialogDescription>
              Danh sách các đợt bảo trì, duy tu đoạn đường này.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto mt-4 border border-slate-100 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-500">Ngày</th>
                  <th className="text-left p-3 font-medium text-slate-500">Nội dung</th>
                  <th className="text-left p-3 font-medium text-slate-500">Đơn vị</th>
                  <th className="text-left p-3 font-medium text-slate-500">Chi phí (tr.đ)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="p-3">15/03/2026</td>
                  <td className="p-3">Vá ổ gà, thảm lại mặt đường (500m)</td>
                  <td className="p-3">Công ty CP Duy tu HN</td>
                  <td className="p-3">125.5</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="p-3">10/01/2026</td>
                  <td className="p-3">Sơn lại vạch kẻ đường</td>
                  <td className="p-3">Đội duy tu số 2</td>
                  <td className="p-3">15.2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>Đóng</Button>
            <Button className="bg-blue-600">Lập kế hoạch mới</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Inspection Dialog (Placeholder) */}
      <Dialog open={isInspectionDialogOpen} onOpenChange={setIsInspectionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <ClipboardCheck className="size-5 text-green-600" />
              Lịch sử kiểm tra - {selectedItem?.fullName}
            </DialogTitle>
            <DialogDescription>
              Thông tin các đợt kiểm tra, tuần đường định kỳ/đột xuất.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto mt-4 border border-slate-100 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-500">Ngày</th>
                  <th className="text-left p-3 font-medium text-slate-500">Loại kiểm tra</th>
                  <th className="text-left p-3 font-medium text-slate-500">Kết quả</th>
                  <th className="text-left p-3 font-medium text-slate-500">Người kiểm tra</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="p-3">20/04/2026</td>
                  <td className="p-3">Kiểm tra định kỳ</td>
                  <td className="p-3 text-green-600 font-medium">Bình thường</td>
                  <td className="p-3">Nguyễn Văn A</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="p-3">18/04/2026</td>
                  <td className="p-3">Kiểm tra ổ gà (Phản ánh)</td>
                  <td className="p-3 text-amber-600 font-medium">Phát hiện sự cố</td>
                  <td className="p-3">Trần Thị B</td>
                </tr>
              </tbody>
            </table>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsInspectionDialogOpen(false)}>Đóng</Button>
            <Button className="bg-blue-600">Thêm lượt kiểm tra</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Merge Sections to Route Dialog */}
      <Dialog open={isMergeToRouteDialogOpen} onOpenChange={setIsMergeToRouteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gộp đoạn thành tuyến</DialogTitle>
            <DialogDescription>
              Bạn đã chọn {selectedIds.length} đoạn đường. Gộp chúng lại thành một tuyến đường mới hoặc cập nhật vào tuyến cũ.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Các đoạn đã chọn</Label>
              <div className="flex flex-wrap gap-2">
                {selectedIds.map(id => {
                  const d = data.find(item => item.id === id);
                  return (
                    <Badge key={id} variant="secondary" className="bg-slate-100 text-slate-700">
                      {d?.maDoan}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Hành động</Label>
              <Select defaultValue="new">
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Tạo tuyến mới</SelectItem>
                  <SelectItem value="update">Gộp vào tuyến đã có</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetRoute">Tên/Mã tuyến đích</Label>
              <Input id="targetRoute" placeholder="Nhập tên tuyến" className="border-slate-200" />
            </div>
            <div className="p-3 bg-blue-50 rounded-md border border-blue-100 text-[11px] text-blue-700 leading-relaxed">
              <strong>Lưu ý:</strong> Khi gộp thành tuyến, hệ thống sẽ tự động tính toán lại lý trình (Km) dựa trên thứ tự các đoạn đường được gộp.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMergeToRouteDialogOpen(false)}>Hủy</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
              alert("Gộp đoạn thành tuyến thành công! Tuyến đường mới đã được tạo.");
              setIsMergeToRouteDialogOpen(false);
              setSelectedIds([]);
            }}>
              Xác nhận gộp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ImportDialog 
        open={isImportDialogOpen} 
        onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Đoạn đường bộ"
        fields={sectionFields}
        onImportComplete={(newData) => {
          // Success handled in dialog simulation
        }}
      />
    </div>
  );
}
