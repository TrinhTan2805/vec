import { useState } from "react";
import { Search, Plus, Edit, Trash2, Download, Eye, Upload, X, Save } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { ImportDialog } from "../../components/infrastructure/ImportDialog";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";

interface CauKhac {
  id: string;
  maCau: string;
  tenCau: string;
  loaiCau: string;
  tuyenDuong: string;
  lyTrinh: string;
  khcLyTrinh: string;
  theoChieu: string;
  khcMepDuong: string;
  viTri: string;
  chieuDai: string;
  chieuRong: string;
  taiTrongTK: string;
  taiTrongTT: string;
  loaiMaiChe: string;        // Chỉ cầu đi bộ
  ketCauMo: string;
  ketCauNhip: string;
  soNhip: string;
  tinhTrang: string;
  ngayApDung: string;
  noivDung: string;
  donViQL: string;
}

const mockData: CauKhac[] = [
  { id:"1", maCau:"CB-001", tenCau:"Cầu đi bộ Hoàn Kiếm", loaiCau:"Cầu đi bộ", tuyenDuong:"Đường Đinh Tiên Hoàng", lyTrinh:"Km 0+200", khcLyTrinh:"50m", theoChieu:"Trái", khcMepDuong:"1.5m", viTri:"Bên phải hướng lưu thông", chieuDai:"65m", chieuRong:"3.5m", taiTrongTK:"", taiTrongTT:"", loaiMaiChe:"Mái che kính", ketCauMo:"BTCT", ketCauNhip:"Khung thép", soNhip:"3", tinhTrang:"Hoạt động", ngayApDung:"01/01/2020", noivDung:"Cầu đi bộ qua hồ", donViQL:"Sở GTVT Hà Nội" },
  { id:"2", maCau:"CV-001", tenCau:"Cầu vượt nhẹ Chùa Bộc", loaiCau:"Cầu vượt nhẹ", tuyenDuong:"Đường Chùa Bộc", lyTrinh:"Km 1+500", khcLyTrinh:"0m", theoChieu:"Thẳng", khcMepDuong:"0m", viTri:"Nút giao thông", chieuDai:"250m", chieuRong:"8m", taiTrongTK:"H30", taiTrongTT:"H30", loaiMaiChe:"", ketCauMo:"Trụ BTCT", ketCauNhip:"Dầm bê tông", soNhip:"8", tinhTrang:"Hoạt động", ngayApDung:"15/03/2018", noivDung:"Cầu vượt nút giao thông", donViQL:"Sở GTVT Hà Nội" },
  { id:"3", maCau:"CN-001", tenCau:"Cầu nhỏ Kênh Bắc", loaiCau:"Cầu nhỏ, trung", tuyenDuong:"Đê Hữu Hồng", lyTrinh:"Km 12+300", khcLyTrinh:"20m", theoChieu:"Trái", khcMepDuong:"2m", viTri:"Bên trái", chieuDai:"15m", chieuRong:"6m", taiTrongTK:"H13", taiTrongTT:"H13", loaiMaiChe:"", ketCauMo:"Mố đá xây", ketCauNhip:"Dầm BTCT", soNhip:"1", tinhTrang:"Bảo trì", ngayApDung:"01/01/2015", noivDung:"Cầu vượt kênh", donViQL:"Cục Đường bộ VN" },
  { id:"4", maCau:"CV-002", tenCau:"Cầu vượt nhẹ Ngã Tư Sở", loaiCau:"Cầu vượt nhẹ", tuyenDuong:"QL6", lyTrinh:"Km 5+000", khcLyTrinh:"0m", theoChieu:"Thẳng", khcMepDuong:"0m", viTri:"Nút giao thông", chieuDai:"290m", chieuRong:"10m", taiTrongTK:"H30", taiTrongTT:"H30", loaiMaiChe:"", ketCauMo:"Trụ BTCT", ketCauNhip:"Dầm I bê tông", soNhip:"10", tinhTrang:"Hoạt động", ngayApDung:"20/05/2012", noivDung:"Cầu vượt nút ngã tư sở", donViQL:"Sở GTVT Hà Nội" },
  { id:"5", maCau:"CB-002", tenCau:"Cầu đi bộ Nhật Tân", loaiCau:"Cầu đi bộ", tuyenDuong:"Đê Yên Phụ", lyTrinh:"Km 3+100", khcLyTrinh:"30m", theoChieu:"Phải", khcMepDuong:"2m", viTri:"Bên phải", chieuDai:"80m", chieuRong:"4m", taiTrongTK:"", taiTrongTT:"", loaiMaiChe:"Mái vòm kim loại", ketCauMo:"BTCT", ketCauNhip:"Vòm thép", soNhip:"2", tinhTrang:"Hoạt động", ngayApDung:"01/06/2018", noivDung:"Cầu đi bộ kết nối khu dân cư", donViQL:"Sở GTVT Hà Nội" },
];

export default function CauKhacList() {
  const [data, setData] = useState<CauKhac[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loaiFilter, setLoaiFilter] = useState("all");

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CauKhac | null>(null);

  const importFields = [
    { name: "maCau", label: "Mã cầu" },
    { name: "tenCau", label: "Tên cầu" },
    { name: "loaiCau", label: "Loại cầu đường bộ" },
    { name: "tuyenDuong", label: "Tuyến đường" },
    { name: "lyTrinh", label: "Lý trình" },
    { name: "chieuDai", label: "Chiều dài (m)" },
    { name: "chieuRong", label: "Chiều rộng (m)" },
    { name: "taiTrongTK", label: "Tải trọng thiết kế" },
    { name: "taiTrongTT", label: "Tải trọng thực tế" },
    { name: "ketCauNhip", label: "Kết cấu nhịp" },
    { name: "soNhip", label: "Số nhịp" },
    { name: "donViQL", label: "Đơn vị quản lý" },
    { name: "tinhTrang", label: "Tình trạng" },
    { name: "geometry", label: "Dữ liệu không gian (SHAPE)" },
  ];

  const filteredData = data.filter((item) => {
    const matchSearch = Object.values(item).some((v) => v.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    const matchLoai = loaiFilter === "all" || item.loaiCau === loaiFilter;
    return matchSearch && matchLoai;
  });

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) setData(data.filter((i) => i.id !== id));
  };

  const loaiColor = (loai: string) => {
    if (loai === "Cầu đi bộ") return "bg-purple-50 text-purple-700 border-purple-200";
    if (loai === "Cầu vượt nhẹ") return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3 flex-wrap">
              <Search className="size-5 text-muted-foreground" />
              <Input placeholder="Tìm kiếm tên cầu, mã, tuyến đường..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-xs" />
              <Select value={loaiFilter} onValueChange={setLoaiFilter}>
                <SelectTrigger className="w-44"><SelectValue placeholder="Lọc theo loại" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại cầu</SelectItem>
                  <SelectItem value="Cầu nhỏ, trung">Cầu nhỏ, trung</SelectItem>
                  <SelectItem value="Cầu vượt nhẹ">Cầu vượt nhẹ</SelectItem>
                  <SelectItem value="Cầu đi bộ">Cầu đi bộ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => { setSelectedItem(null); setIsFormDialogOpen(true); }}><Plus className="mr-2 size-4" />Thêm mới</Button>
              <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}><Upload className="mr-2 size-4" />Nhập dữ liệu</Button>
              <Button variant="outline"><Download className="mr-2 size-4" />Xuất Excel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Cầu nhỏ/trung, Cầu vượt nhẹ, Cầu đi bộ ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã cầu</TableHead>
                  <TableHead>Tên cầu</TableHead>
                  <TableHead>Loại cầu</TableHead>
                  <TableHead>Tuyến đường</TableHead>
                  <TableHead>Lý trình</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Chiều dài</TableHead>
                  <TableHead>Chiều rộng</TableHead>
                  <TableHead>Tải trọng TK</TableHead>
                  <TableHead>Kết cấu nhịp</TableHead>
                  <TableHead>Số nhịp</TableHead>
                  <TableHead>Đơn vị QL</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-blue-600 font-medium">{item.maCau}</TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">{item.tenCau}</TableCell>
                    <TableCell><span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${loaiColor(item.loaiCau)}`}>{item.loaiCau}</span></TableCell>
                    <TableCell className="text-sm">{item.tuyenDuong}</TableCell>
                    <TableCell>{item.lyTrinh}</TableCell>
                    <TableCell className="text-sm text-slate-500">{item.viTri}</TableCell>
                    <TableCell className="font-medium">{item.chieuDai}</TableCell>
                    <TableCell>{item.chieuRong}</TableCell>
                    <TableCell>{item.taiTrongTK || "—"}</TableCell>
                    <TableCell className="text-sm">{item.ketCauNhip}</TableCell>
                    <TableCell className="text-center">{item.soNhip}</TableCell>
                    <TableCell className="text-sm text-slate-500">{item.donViQL}</TableCell>
                    <TableCell><Badge variant={item.tinhTrang === "Hoạt động" ? "default" : "secondary"}>{item.tinhTrang}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">

                        <Button variant="ghost" size="icon" title="Xem chi tiết" onClick={() => { setSelectedItem(item); setIsDetailDialogOpen(true); }}><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" title="Chỉnh sửa" onClick={() => { setSelectedItem(item); setIsFormDialogOpen(true); }}><Edit className="size-4" /></Button>
                        <Button variant="ghost" size="icon" title="Xóa" onClick={() => handleDelete(item.id)}><Trash2 className="size-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* DETAIL DIALOG */}
      <DetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        selectedCard={{ title: "Cầu nhỏ/vượt/đi bộ" }}
        selectedItem={selectedItem ? { ...selectedItem, fullName: selectedItem.tenCau, idNumber: selectedItem.maCau, status: selectedItem.tinhTrang } : null}
        onEditClick={() => { setIsDetailDialogOpen(false); setIsFormDialogOpen(true); }}
      />

      {/* FORM DIALOG */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedItem ? `Cập nhật: ${selectedItem.tenCau}` : "Thêm mới Cầu nhỏ/Vượt nhẹ/Đi bộ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-2">
            <section>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Thông tin chung</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Tên cầu</Label><Input defaultValue={selectedItem?.tenCau} placeholder="Nhập tên cầu" /></div>
                <div className="space-y-1"><Label>Mã cầu</Label><Input defaultValue={selectedItem?.maCau} placeholder="CB-001" /></div>
                <div className="space-y-1"><Label>Loại cầu đường bộ</Label>
                  <Select defaultValue={selectedItem?.loaiCau || "Cầu nhỏ, trung"}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cầu nhỏ, trung">Cầu nhỏ, trung</SelectItem>
                      <SelectItem value="Cầu vượt nhẹ">Cầu vượt nhẹ</SelectItem>
                      <SelectItem value="Cầu đi bộ">Cầu đi bộ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1"><Label>Tuyến đường</Label><Input defaultValue={selectedItem?.tuyenDuong} /></div>
                <div className="space-y-1"><Label>Đơn vị quản lý</Label><Input defaultValue={selectedItem?.donViQL} /></div>
                <div className="space-y-1"><Label>Ngày áp dụng</Label><Input type="date" /></div>
              </div>
            </section>
            <section>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Vị trí / Lý trình</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Lý trình</Label><Input defaultValue={selectedItem?.lyTrinh} placeholder="Km 0+000" /></div>
                <div className="space-y-1"><Label>Khoảng cách lý trình (m)</Label><Input type="number" defaultValue={selectedItem?.khcLyTrinh} /></div>
                <div className="space-y-1"><Label>Theo chiều</Label><Select defaultValue={selectedItem?.theoChieu || "Trái"}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Trái">Trái</SelectItem><SelectItem value="Phải">Phải</SelectItem><SelectItem value="Thẳng">Thẳng</SelectItem></SelectContent></Select></div>
                <div className="space-y-1"><Label>Khoảng cách mép đường (m)</Label><Input type="number" defaultValue={selectedItem?.khcMepDuong} /></div>
                <div className="space-y-1 col-span-2"><Label>Vị trí</Label><Input defaultValue={selectedItem?.viTri} placeholder="Mô tả vị trí cụ thể" /></div>
              </div>
            </section>
            <section>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Thông số kỹ thuật</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Chiều dài (m)</Label><Input type="number" defaultValue={selectedItem?.chieuDai} /></div>
                <div className="space-y-1"><Label>Chiều rộng (m)</Label><Input type="number" defaultValue={selectedItem?.chieuRong} /></div>
                <div className="space-y-1"><Label>Tải trọng thiết kế</Label><Input defaultValue={selectedItem?.taiTrongTK} placeholder="H30, H13..." /></div>
                <div className="space-y-1"><Label>Tải trọng thực tế</Label><Input defaultValue={selectedItem?.taiTrongTT} /></div>
                <div className="space-y-1"><Label>Kết cấu mố</Label><Input defaultValue={selectedItem?.ketCauMo} /></div>
                <div className="space-y-1"><Label>Kết cấu nhịp</Label><Input defaultValue={selectedItem?.ketCauNhip} /></div>
                <div className="space-y-1"><Label>Số nhịp</Label><Input type="number" defaultValue={selectedItem?.soNhip} /></div>
                <div className="space-y-1"><Label>Loại mái che (Cầu đi bộ)</Label><Input defaultValue={selectedItem?.loaiMaiChe} placeholder="Mái kính, mái vòm..." /></div>
              </div>
            </section>
            <section>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Tình trạng</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Tình trạng</Label><Select defaultValue={selectedItem?.tinhTrang || "Hoạt động"}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Hoạt động">Hoạt động</SelectItem><SelectItem value="Bảo trì">Bảo trì</SelectItem><SelectItem value="Tạm ngưng">Tạm ngưng</SelectItem></SelectContent></Select></div>
                <div className="space-y-1 col-span-2"><Label htmlFor="noivDung">Nội dung / Ghi chú</Label><textarea id="noivDung" aria-label="Nội dung / Ghi chú" placeholder="Nhập nội dung hoặc ghi chú..." className="w-full h-16 rounded-md border border-input px-3 py-2 text-sm bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" defaultValue={selectedItem?.noivDung}></textarea></div>
              </div>
            </section>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}><X className="size-4 mr-2" />Hủy bỏ</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { alert("Lưu Mockup thành công!"); setIsFormDialogOpen(false); }}><Save className="size-4 mr-2" />Lưu thông tin</Button>
          </div>
        </DialogContent>
      </Dialog>


      <ImportDialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}
        title="Nhập dữ liệu Cầu (nhỏ/trung/vượt nhẹ/đi bộ)"
        fields={importFields} onImportComplete={(_d) => {}} />
    </div>
  );
}
