import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FileText, Eye, Trash, Plus, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

interface TechnicalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCard: any;
  selectedItem: any;
}

interface TechnicalFile {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  category: string;
}

export function TechnicalDialog({ open, onOpenChange, selectedCard, selectedItem }: TechnicalDialogProps) {
  const [files, setFiles] = useState<TechnicalFile[]>([
    {
      id: 1,
      name: "Bản vẽ thiết kế cầu.pdf",
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "15/03/2026",
      uploadedBy: "Nguyễn Văn A",
      category: "Thiết kế"
    },
    {
      id: 2,
      name: "Hồ sơ hoàn công.pdf",
      type: "PDF",
      size: "5.8 MB",
      uploadDate: "20/03/2026",
      uploadedBy: "Trần Thị B",
      category: "Hoàn công"
    },
    {
      id: 3,
      name: "Báo cáo khảo sát địa chất.docx",
      type: "DOCX",
      size: "1.2 MB",
      uploadDate: "10/02/2026",
      uploadedBy: "Lê Văn C",
      category: "Khảo sát"
    },
    {
      id: 4,
      name: "Thuyết minh kỹ thuật.pdf",
      type: "PDF",
      size: "3.4 MB",
      uploadDate: "05/02/2026",
      uploadedBy: "Phạm Văn D",
      category: "Kỹ thuật"
    },
    {
      id: 5,
      name: "Dự toán chi tiết.xlsx",
      type: "XLSX",
      size: "850 KB",
      uploadDate: "28/01/2026",
      uploadedBy: "Hoàng Thị E",
      category: "Dự toán"
    },
  ]);

  const handleDeleteFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF':
        return <FileText className="size-5 text-red-400" />;
      case 'DOCX':
        return <FileText className="size-5 text-blue-400" />;
      case 'XLSX':
        return <FileText className="size-5 text-green-400" />;
      default:
        return <FileText className="size-5 text-slate-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Thiết kế':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Hoàn công':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Khảo sát':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Kỹ thuật':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Dự toán':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[90vw] max-h-[95vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-6">
        <DialogHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-slate-900 text-lg font-bold">
                Hồ sơ kỹ thuật - {selectedCard?.title || 'Cầu'}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500">
                Quản lý hồ sơ và tài liệu kỹ thuật
              </DialogDescription>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-500">{files.length} tài liệu</p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <Plus className="size-4 mr-2" />
                Thêm file
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 py-3">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Tổng file</p>
            <p className="text-xl font-bold text-slate-900">{files.length}</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">File PDF</p>
            <p className="text-xl font-bold text-blue-600">{files.filter(f => f.type === 'PDF').length}</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Tổng dung lượng</p>
            <p className="text-xl font-bold text-green-600">13.7 MB</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
            <p className="text-xs text-slate-500 mb-1">Cập nhật gần đây</p>
            <p className="text-xl font-bold text-purple-600">20/03/2026</p>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto border border-slate-100 rounded-lg min-h-0 bg-white">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 shadow-sm z-10">
              <tr>
                <th className="text-left py-3 px-4 font-bold text-slate-600">Tên file</th>
                <th className="text-left py-3 px-4 font-bold text-slate-600">Loại</th>
                <th className="text-left py-3 px-4 font-bold text-slate-600">Danh mục</th>
                <th className="text-left py-3 px-4 font-bold text-slate-600">Dung lượng</th>
                <th className="text-left py-3 px-4 font-bold text-slate-600">Ngày tải lên</th>
                <th className="text-left py-3 px-4 font-bold text-slate-600">Người tải</th>
                <th className="text-left py-3 px-4 font-bold text-slate-600 min-w-[180px]">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <span className="text-slate-900 font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
                      {file.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className={`${getCategoryColor(file.category)} text-xs border`}>
                      {file.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{file.size}</td>
                  <td className="py-3 px-4 text-slate-600">{file.uploadDate}</td>
                  <td className="py-3 px-4 text-slate-600">{file.uploadedBy}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-3"
                        title="Xem trực tiếp"
                      >
                        <Eye className="size-4 mr-1" />
                        Xem
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 h-8 px-3"
                        title="Tải xuống"
                      >
                        <Download className="size-4 mr-1" />
                        Tải
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-3"
                        title="Xóa file"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash className="size-4 mr-1" />
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* File Preview Area */}
        <div className="border-t border-slate-100 pt-4 mt-4 bg-white/50">
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 shadow-inner">
            <div className="text-center">
              <ExternalLink className="size-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-900 font-medium mb-2">Vùng xem trước tài liệu</p>
              <p className="text-slate-500 text-sm">Nhấp vào nút "Xem" để xem file trực tiếp trên web</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
