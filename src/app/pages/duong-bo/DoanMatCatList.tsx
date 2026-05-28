import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, Route, GitMerge, Scissors, Layers, BarChart3, AlertTriangle } from "lucide-react";
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
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { DoanDuongBoFormDialog } from "../../components/infrastructure/DoanDuongBoFormDialog";
import { ListHeaderStats } from "../../components/infrastructure/ListHeaderStats";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../components/ui/dialog";
import { Trash2 as TrashIcon } from "lucide-react";


interface DoanMatCat {
  id: string;
  maDoan: string;
  tenDoan: string;
  tuyenDuong: string;
  donViQL: string;
  loaiDuong: string;
  capDuong: string;
  bacDuong: string;
  capKT: string;
  capQH: string;
  diemDau: string;
  diemCuoi: string;
  chieuDai: number;
  chieuRong: number;
  loaiKetCau: string;
  trangThai: string;
}

const mockData: DoanMatCat[] = [
  { id: "1", maDoan: "MC-001", tenDoan: "Đoạn mặt cắt 40m", tuyenDuong: "QL1A", donViQL: "Sở GTVT Hà Nội", loaiDuong: "Đường đô thị", capDuong: "Cấp I", bacDuong: "Bậc 1", capKT: "TCVN 4054:2005", capQH: "2030", diemDau: "Mai Dịch", diemCuoi: "Vành đai 3", chieuDai: 1.5, chieuRong: 40, loaiKetCau: "Bê tông nhựa", trangThai: "Hoạt động" },
  { id: "2", maDoan: "MC-002", tenDoan: "Đoạn mặt cắt 50m", tuyenDuong: "QL1A", donViQL: "Sở GTVT Hà Nội", loaiDuong: "Đường chính", capDuong: "Cấp II", bacDuong: "Bậc 2", capKT: "TCVN 4054:2005", capQH: "2030", diemDau: "Vành đai 3", diemCuoi: "Khuất Duy Tiến", chieuDai: 2.8, chieuRong: 50, loaiKetCau: "Bê tông nhựa", trangThai: "Hoạt động" },
  { id: "3", maDoan: "MC-003", tenDoan: "Đoạn mặt cắt 35m", tuyenDuong: "QL1A", donViQL: "Sở GTVT Hà Nội", loaiDuong: "Đường phụ", capDuong: "Cấp III", bacDuong: "Bậc 3", capKT: "TCVN 4054:2005", capQH: "2030", diemDau: "Khuất Duy Tiến", diemCuoi: "Nguyễn Xiển", chieuDai: 4.1, chieuRong: 35, loaiKetCau: "Bê tông xi măng", trangThai: "Bảo trì" },
];

export default function DoanMatCatList() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // States for Merge and Split features
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [isSplitDialogOpen, setIsSplitDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [splitItem, setSplitItem] = useState<any>(null);
  const [splitSegments, setSplitSegments] = useState([{ from: 0, to: 0 }]);


  const toggleSelectAll = () => {
    if (selectedIds.length === mockData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockData.map(item => item.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const fields = [
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "tenDoan", label: "Tên đoạn" },
    { name: "donViQL", label: "Đơn vị quản lý" },
    { name: "loaiDuong", label: "Loại đường" },
    { name: "capDuong", label: "Cấp đường" },
    { name: "bacDuong", label: "Bậc đường" },
    { name: "capKT", label: "Cấp kỹ thuật" },
    { name: "capQH", label: "Cấp quy hoạch" },
    { name: "diemDau", label: "Điểm đầu" },
    { name: "diemCuoi", label: "Điểm cuối" },
    { name: "chieuDai", label: "Chiều dài (km)" },
    { name: "chieuRong", label: "Chiều rộng (m)" },
    { name: "loaiKetCau", label: "Loại kết cấu mặt" },
    { name: "trangThai", label: "Tình trạng" },
    { name: "shape", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const stats = [
    { 
      label: "Tổng số đoạn đường theo mặt cắt", 
      value: "432 đoạn", 
      change: "15 đoạn", 
      trend: "up" as const, 
      icon: <Layers className="size-6 text-blue-600" />, 
      color: "bg-blue-600" 
    },
    { 
      label: "Đoạn đường mặt cắt thêm mới 2026", 
      value: "28 đoạn", 
      change: "5%", 
      trend: "up" as const, 
      icon: <BarChart3 className="size-6 text-emerald-600" />, 
      color: "bg-emerald-600" 
    },
    { 
      label: "Đoạn đường mặt cắt đến hạn bảo trì", 
      value: "12 đoạn", 
      change: "2 đoạn", 
      trend: "down" as const, 
      icon: <AlertTriangle className="size-6 text-amber-600" />, 
      color: "bg-amber-600" 
    },
    { 
      label: "Tổng số km đoạn mặt cắt", 
      value: "945 km", 
      change: "25 km", 
      trend: "up" as const, 
      icon: <Route className="size-6 text-indigo-600" />, 
      color: "bg-indigo-600" 
    },
  ];

  return (
    <div className="space-y-6">
      <ListHeaderStats stats={stats} />
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="size-5 text-muted-foreground" />
              <Input placeholder="Tìm kiếm đoạn theo mặt cắt..." className="max-w-sm" />
            </div>
            <div className="flex gap-2">
              {selectedIds.length >= 2 && (
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => setIsMergeDialogOpen(true)}>
                  <GitMerge className="size-4 mr-2" /> Gộp {selectedIds.length} đoạn
                </Button>
              )}
              <Button size="sm" variant="outline"><Upload className="size-4 mr-2" /> Nhập dữ liệu</Button>
              <Button size="sm" variant="outline"><Download className="size-4 mr-2" /> Xuất</Button>
              <Button size="sm" className="bg-blue-600" onClick={() => { setSelectedItem(null); setIsFormDialogOpen(true); }}><Plus className="size-4 mr-2" /> Thêm mới</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Danh sách đoạn đường theo mặt cắt</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedIds.length > 0 && selectedIds.length === mockData.length}
                    onClick={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Tên đoạn</TableHead>
                <TableHead>Chiều rộng (m)</TableHead>
                <TableHead>Kết cấu mặt</TableHead>
                <TableHead>Chiều dài (km)</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id} className={selectedIds.includes(item.id) ? "bg-slate-50" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.includes(item.id)}
                      onClick={() => toggleSelect(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.tenDoan}</TableCell>
                  <TableCell>{item.chieuRong}</TableCell>
                  <TableCell>{item.loaiKetCau}</TableCell>
                  <TableCell>{item.chieuDai}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">{item.trangThai}</Badge></TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }} title="Xem chi tiết"><Eye className="size-4 text-slate-500" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedItem(item); setIsFormDialogOpen(true); }} title="Sửa"><Edit className="size-4 text-blue-500" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSplitItem(item); setSplitSegments([{ from: 0, to: 0 }]); setIsSplitDialogOpen(true); }} title="Tách đoạn đường"><Scissors className="size-4 text-amber-500" /></Button>
                    <Button variant="ghost" size="icon" className="text-red-600" onClick={() => { setSelectedItem(item); setIsDeleteDialogOpen(true); }} title="Xóa"><Trash2 className="size-4" /></Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DoanDuongBoFormDialog 
        open={isFormDialogOpen} 
        onOpenChange={setIsFormDialogOpen} 
        type="mat-cat"
        selectedItem={selectedItem}
      />
      <DetailDialog 
        open={isDetailDialogOpen} 
        onOpenChange={setIsDetailDialogOpen} 
        onEditClick={() => { setIsDetailDialogOpen(false); setIsFormDialogOpen(true); }}
        selectedItem={selectedItem ? { ...selectedItem, fullName: selectedItem.tenDoan, idNumber: selectedItem.maDoan, status: selectedItem.trangThai } : null}
        selectedCard={{ title: "Đoạn đường theo mặt cắt" }}
      />

      <DeleteDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCard={{ title: "Đoạn đường theo mặt cắt" }}
        selectedItem={selectedItem ? {
          fullName: selectedItem.tenDoan,
          idNumber: selectedItem.maDoan,
          registrationDate: "12/03/2024"
        } : null}
        onConfirmDelete={() => {
          if (selectedItem) {
            // Mock delete
            setIsDeleteDialogOpen(false);
          }
        }}
      />

      
      {/* Mock Merge Dialog */}
      <Dialog open={isMergeDialogOpen} onOpenChange={setIsMergeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><GitMerge className="size-5 text-amber-500" /> Gộp đoạn đường</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-slate-600">Bạn đang chọn gộp <strong>{selectedIds.length}</strong> đoạn mặt cắt thành một đoạn duy nhất. Khoảng chia mặt cắt sẽ được tổng hợp lại.</p>
            <div className="space-y-2">
              <Label>Tên đoạn (mặt cắt sau khi gộp) <span className="text-red-500">*</span></Label>
              <Input placeholder="Nhập tên đoạn mặt cắt mới..." />
            </div>
            <p className="text-xs text-orange-600 italic">* Các thông tin phân bổ kết cấu mặt đường sẽ được tiếp nối liền mạch.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMergeDialogOpen(false)}>Hủy</Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => { setIsMergeDialogOpen(false); setSelectedIds([]); }}>Xác nhận Gộp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Synchronized Split Dialog */}
      <Dialog open={isSplitDialogOpen} onOpenChange={setIsSplitDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tách đoạn đường</DialogTitle>
            <DialogDescription>
              Chia tách đoạn {splitItem?.tenDoan} thành một hoặc nhiều đoạn đường mới dựa trên mặt cắt. Đoạn gốc vẫn được giữ nguyên.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div>
                <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">Cơ sở mặt cắt (Dự kiến)</p>
                <div className="text-lg font-bold text-indigo-900">
                  Km0 - Km{splitItem?.chieuDai}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">Tổng chiều dài</p>
                <div className="text-lg font-bold text-indigo-900">{splitItem?.chieuDai} km</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-bold text-slate-700">Định nghĩa các phân đoạn mặt cắt mới</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSplitSegments([...splitSegments, { from: 0, to: 0 }])}
                  className="h-8 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
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
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Phần mặt cắt còn lại</span>
                <span className="text-[10px] text-orange-600 italic">* Các đoạn này sẽ không được tạo bản ghi mới</span>
              </div>
              <div className="text-sm font-medium text-orange-900">
                {(() => {
                  const maxTo = Math.max(...splitSegments.map(s => s.to), 0);
                  const totalDen = splitItem?.chieuDai || 0;
                  if (maxTo < totalDen) {
                    return `Km${maxTo} - Km${totalDen}`;
                  }
                  return "Đã phủ hết mặt cắt";
                })()}
              </div>
            </div>
          </div>
          <div className="bg-blue-50/50 p-4 border-y text-[11px] text-blue-600 leading-relaxed italic">
            * Lưu ý: Các thông số về chiều rộng (m) và loại kết cấu mặt sẽ được kế thừa từ lớp mặt cắt hiện tại cho tất cả các phân đoạn mới.
          </div>
          <DialogFooter className="bg-slate-50 p-6 -mx-6 -mb-6 border-t mt-4 rounded-b-lg">
            <Button variant="outline" onClick={() => setIsSplitDialogOpen(false)}>Hủy</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => {
              alert(`Xác nhận tách thành ${splitSegments.length} đoạn mặt cắt. Dữ liệu đã được cập nhật hệ thống.`);
              setIsSplitDialogOpen(false);
              setSplitSegments([{ from: 0, to: 0 }]);
            }}>
              Xác nhận tách & đẩy dữ liệu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
