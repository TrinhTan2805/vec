import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, TrafficCone, LayoutDashboard, Map as MapIcon, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";

export default function DoanCocTieuList() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const mockData = [
    { id: "1", ma: "CT-001", tuyen: "QL1A", loai: "Cọc tiêu bê tông", chieuDai: 500, soLuong: 20, tinhTrang: "Bình thường" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><TrafficCone className="size-5 text-orange-500" /> Quản lý Đoạn cọc tiêu</CardTitle>
          <Button size="sm" className="bg-blue-600"><Plus className="size-4 mr-2" /> Thêm mới</Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
             <Search className="size-5 text-muted-foreground" />
             <Input placeholder="Tìm kiếm đoạn cọc tiêu..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Tuyến đường</TableHead>
                <TableHead>Loại cọc tiêu</TableHead>
                <TableHead>Chiều dài (m)</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.ma}</TableCell>
                  <TableCell>{item.tuyen}</TableCell>
                  <TableCell>{item.loai}</TableCell>
                  <TableCell>{item.chieuDai}</TableCell>
                  <TableCell>{item.soLuong}</TableCell>
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
        selectedCard={{ title: "Đoạn cọc tiêu" }}
        onEditClick={() => {}}
      />
    </div>
  );
}
