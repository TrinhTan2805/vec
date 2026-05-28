import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";

interface HistoryItem {
  id: string;
  date: string;
  type: string;
  content: string;
  unit: string;
  cost?: string;
  status: string;
  notes?: string;
}

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: HistoryItem[];
  type: "maintenance" | "inspection";
}

export function HistoryDialog({ open, onOpenChange, title, data, type }: HistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto mt-4">
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-12">STT</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>{type === "maintenance" ? "Loại bảo trì" : "Loại kiểm tra"}</TableHead>
                <TableHead>Nội dung / Kết quả</TableHead>
                <TableHead>Đơn vị / Người thực hiện</TableHead>
                {type === "maintenance" && <TableHead>Chi phí</TableHead>}
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={type === "maintenance" ? 7 : 6} className="text-center py-8 text-muted-foreground">
                    Chưa có dữ liệu lịch sử
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                    <TableCell className="font-medium text-blue-600">{item.type}</TableCell>
                    <TableCell>{item.content}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    {type === "maintenance" && <TableCell className="font-bold">{item.cost}</TableCell>}
                    <TableCell>
                      <Badge variant={item.status === "Hoàn thành" || item.status === "Đạt" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
