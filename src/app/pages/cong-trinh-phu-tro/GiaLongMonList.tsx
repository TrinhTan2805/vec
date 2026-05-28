import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, Layers, LayoutDashboard, Map as MapIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";

export default function GiaLongMonList() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const mockData = [
    { 
      id: "GLM-001", 
      ma: "GLM-001", 
      tuyen: "Vành đai 3", 
      viTri: "Km 5+100", 
      loai: "Giá long môn thép", 
      chieuCao: "5.5",
      khoangCach: "12.0",
      tinhTrang: "Bình thường",
      ngayApDung: "01/01/2024",
      ghiChu: "Thiết bị lắp đặt biển báo điện tử VMS."
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Layers className="size-5 text-indigo-500" /> Quản lý Giá long môn</CardTitle>
          <Button size="sm" className="bg-blue-600"><Plus className="size-4 mr-2" /> Thêm mới</Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
             <Search className="size-5 text-muted-foreground" />
             <Input placeholder="Tìm kiếm giá long môn..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Mã định danh</TableHead>
                <TableHead>Tuyến đường</TableHead>
                <TableHead>Vị trí lý trình</TableHead>
                <TableHead>Chủng loại</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.ma}</TableCell>
                  <TableCell>{item.tuyen}</TableCell>
                  <TableCell>{item.viTri}</TableCell>
                  <TableCell>{item.loai}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">{item.tinhTrang}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedItem({...item, fullName: item.ma}); setIsDetailDialogOpen(true); }}><Eye className="size-4" /></Button>
                    <Button variant="ghost" size="icon"><Edit className="size-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="size-4 text-red-500" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <DetailDialog 
        open={isDetailDialogOpen} 
        onOpenChange={setIsDetailDialogOpen} 
        selectedItem={selectedItem ? { ...selectedItem, idNumber: selectedItem.ma, status: selectedItem.tinhTrang } : null}
        selectedCard={{ title: "Giá long môn" }}
        onEditClick={() => {}}
      />
    </div>
  );
}
