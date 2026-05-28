import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCard: any;
  selectedItem: any;
  onConfirmDelete: () => void;
}

export function DeleteDialog({ open, onOpenChange, selectedCard, selectedItem, onConfirmDelete }: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[500px] bg-white border-slate-200 shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-slate-900 text-lg flex items-center gap-2 font-bold">
            <AlertCircle className="size-5 text-red-500" />
            Xác nhận xóa
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Thao tác này không thể hoàn tác
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <p className="text-red-600 text-sm mb-2 font-semibold">⚠️ Cảnh báo</p>
            <p className="text-slate-700 text-sm">
              Bạn có chắc chắn muốn xóa <span className="font-bold text-slate-900">{selectedCard?.title || 'Cầu'}</span> này không?
            </p>
          </div>

          <div className="border border-slate-100 rounded-lg bg-slate-50 p-4">
            <h4 className="text-slate-900 font-bold mb-3 text-sm">Thông tin sẽ bị xóa:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Tên:</span>
                <span className="text-slate-900 font-medium">{selectedItem?.fullName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mã:</span>
                <span className="text-slate-900 font-medium">{selectedItem?.idNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ngày đăng ký:</span>
                <span className="text-slate-900 font-medium">{selectedItem?.registrationDate || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
            <p className="text-yellow-700 text-xs">
              💡 Lưu ý: Tất cả dữ liệu liên quan bao gồm lịch sử bảo trì, kiểm tra và hồ sơ kỹ thuật sẽ bị xóa vĩnh viễn.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            Hủy
          </Button>
          <Button 
            size="sm"
            onClick={() => {
              onConfirmDelete();
              onOpenChange(false);
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Xóa vĩnh viễn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
