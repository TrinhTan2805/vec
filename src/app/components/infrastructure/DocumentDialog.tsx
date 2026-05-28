import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { FileText, Eye, Download } from "lucide-react";

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  url: string;
}

interface DocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  documents: DocumentItem[];
}

export function DocumentDialog({ open, onOpenChange, title, documents }: DocumentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto mt-4 space-y-3">
          {documents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
              <FileText className="size-12 mx-auto mb-3 opacity-20" />
              Chưa có hồ sơ được tải lên
            </div>
          ) : (
            documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-slate-900">{doc.name}</h4>
                    <p className="text-xs text-slate-500">{doc.type} • {doc.size} • {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="Xem">
                    <Eye className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Tải xuống">
                    <Download className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
