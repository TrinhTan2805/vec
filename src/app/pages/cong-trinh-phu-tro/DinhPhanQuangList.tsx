import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, Lightbulb, LayoutDashboard, Map as MapIcon, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { DetailDialog } from "../../components/infrastructure/DetailDialog";

export default function DinhPhanQuangList() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const mockData = [
    { id: "1", loai: "Đinh phản quang nhôm", tuyen: "Vành đai 3", viTri: "Km 12+000", soLuong: 100, tinhTrang: "Bình thường" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Lightbulb className="size-5 text-yellow-500" /> Quản lý Đinh phản quang</CardTitle>
          <Button size="sm" className="bg-blue-600"><Plus className="size-4 mr-2" /> Thêm mới</Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
             <Search className="size-5 text-muted-foreground" />
             <Input placeholder="Tìm kiếm đinh phản quang..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Loại vạch/đinh</TableHead>
                <TableHead>Tuyến đường</TableHead>
                <TableHead>Vị trí lý trình</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.loai}</TableCell>
                  <TableCell>{item.tuyen}</TableCell>
                  <TableCell>{item.viTri}</TableCell>
                  <TableCell>{item.soLuong}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-50 text-green-700">{item.tinhTrang}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedItem({...item, fullName: item.loai}); setIsDetailDialogOpen(true); }}><Eye className="size-4" /></Button>
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
        selectedItem={selectedItem ? { ...selectedItem, idNumber: selectedItem.loai, status: selectedItem.tinhTrang } : null}
        selectedCard={{ title: "Đinh phản quang" }}
        onEditClick={() => {}}
      />
    </div>
  );
}
