import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Search, Plus, FileText, Calendar, Filter, Download, ArrowRight, CheckCircle2, AlertTriangle, Eye, Edit, EyeOff } from "lucide-react";

export default function KiemKeTaiSan() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedKiemKe, setSelectedKiemKe] = useState<any>(null);

  const kiemKeList = [
    { id: "KK-2026-001", name: "Kiểm kê định kỳ tháng 5/2026", range: "Tuyến Nội Bài - Lào Cai", date: "15/05/2026 - 20/05/2026", status: "completed", by: "Nguyễn Văn A" },
    { id: "KK-2026-002", name: "Kiểm kê đột xuất hệ thống chiếu sáng", range: "Nút giao IC3", date: "28/05/2026 - 30/05/2026", status: "processing", by: "Trần Thị B" },
    { id: "KK-2026-003", name: "Kiểm kê tài sản thiết bị O&M", range: "Kho Hạt QLĐB 1", date: "01/06/2026 - 05/06/2026", status: "planning", by: "Lê Văn C" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Đã hoàn thành</Badge>;
      case 'processing': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Đang thực hiện</Badge>;
      case 'planning': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Đang lập kế hoạch</Badge>;
      default: return null;
    }
  };

  const assetDetails = [
    { code: "TB-001", name: "Biển báo tốc độ tối đa 100", sysQty: 12, realQty: 11, diff: -1, note: "Mất 1 biển tại Km 12+500", status: "diff" },
    { code: "TB-002", name: "Cột Km", sysQty: 50, realQty: 50, diff: 0, note: "", status: "ok" },
    { code: "TB-003", name: "Đèn chiếu sáng 150W", sysQty: 120, realQty: 120, diff: 0, note: "", status: "ok" },
    { code: "TB-004", name: "Lan can phòng hộ", sysQty: 2500, realQty: 2450, diff: -50, note: "Hư hỏng 50m đoạn Km 15", status: "diff" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý Kiểm kê Tài sản</h1>
          <p className="text-muted-foreground mt-1">Lập kế hoạch, theo dõi và đối soát kết quả kiểm kê tài sản định kỳ.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 size-4" /> Lập phiếu kiểm kê
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Đang lập kế hoạch</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">1</h3>
            </div>
            <div className="size-10 bg-amber-50 rounded-full flex items-center justify-center">
              <Calendar className="size-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Đang thực hiện</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">1</h3>
            </div>
            <div className="size-10 bg-blue-50 rounded-full flex items-center justify-center">
              <FileText className="size-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Đã hoàn thành</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">1</h3>
            </div>
            <div className="size-10 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="size-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="shadow-sm">
        <div className="p-4 border-b flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <Input placeholder="Tìm kiếm đợt kiểm kê..." className="pl-9 w-64 bg-white" />
            </div>
            <Button variant="outline" className="gap-2 bg-white">
              <Filter className="size-4" /> Lọc
            </Button>
          </div>
          <Button variant="outline" className="gap-2 bg-white">
            <Download className="size-4" /> Xuất Excel
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-semibold">Mã đợt</th>
                <th className="px-4 py-3 font-semibold">Tên đợt kiểm kê</th>
                <th className="px-4 py-3 font-semibold">Phạm vi tài sản</th>
                <th className="px-4 py-3 font-semibold">Thời gian dự kiến</th>
                <th className="px-4 py-3 font-semibold">Người lập</th>
                <th className="px-4 py-3 font-semibold">Trạng thái</th>
                <th className="px-4 py-3 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {kiemKeList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.range}</td>
                  <td className="px-4 py-3 text-slate-600">{item.date}</td>
                  <td className="px-4 py-3">{item.by}</td>
                  <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => { setSelectedKiemKe(item); setIsDetailOpen(true); }}>
                      Chi tiết <ArrowRight className="ml-1 size-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Dialog Lập Phiếu */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo phiếu kiểm kê mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tên đợt kiểm kê</label>
              <Input placeholder="VD: Kiểm kê định kỳ quý 2/2026..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Thời gian dự kiến</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" />
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phạm vi tài sản (Tuyến/Hạt/Kho)</label>
              <Input placeholder="Nhập phạm vi..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nhân sự phụ trách</label>
              <Input placeholder="Chọn nhân sự..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Hủy</Button>
            <Button onClick={() => setIsCreateOpen(false)}>Tạo phiếu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Chi Tiết Đợt Kiểm Kê */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Chi tiết đợt kiểm kê: {selectedKiemKe?.name}
              {selectedKiemKe && getStatusBadge(selectedKiemKe.status)}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-2 bg-slate-50 border rounded-lg px-4 flex gap-6 text-sm mb-2">
            <div><span className="text-slate-500">Mã đợt:</span> <span className="font-semibold">{selectedKiemKe?.id}</span></div>
            <div><span className="text-slate-500">Phạm vi:</span> <span className="font-semibold">{selectedKiemKe?.range}</span></div>
            <div><span className="text-slate-500">Thời gian:</span> <span className="font-semibold">{selectedKiemKe?.date}</span></div>
          </div>

          <div className="flex-1 overflow-auto border rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-600 sticky top-0 shadow-sm">
                <tr>
                  <th className="px-4 py-3 font-semibold">Mã TS</th>
                  <th className="px-4 py-3 font-semibold">Tên tài sản</th>
                  <th className="px-4 py-3 font-semibold text-right">SL Hệ thống</th>
                  <th className="px-4 py-3 font-semibold text-right">SL Thực tế</th>
                  <th className="px-4 py-3 font-semibold text-right">Chênh lệch</th>
                  <th className="px-4 py-3 font-semibold">Ghi chú & Lý do</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assetDetails.map((item, idx) => (
                  <tr key={idx} className={item.status === 'diff' ? 'bg-rose-50/50' : 'hover:bg-slate-50'}>
                    <td className="px-4 py-3 font-medium">{item.code}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-right font-medium text-slate-500">{item.sysQty}</td>
                    <td className="px-4 py-3 text-right">
                      {selectedKiemKe?.status === 'planning' ? (
                        <span className="text-slate-300">-</span>
                      ) : (
                        <span className="font-bold">{item.realQty}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {selectedKiemKe?.status === 'planning' ? '-' : (
                        item.diff === 0 ? <span className="text-green-600">0</span> : <span className="text-rose-600 font-bold">{item.diff}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <DialogFooter className="mt-4 pt-4 border-t gap-2">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
            <Button variant="outline" className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50">
              <Download className="size-4" /> Xuất Báo Cáo
            </Button>
            {selectedKiemKe?.status === 'processing' && (
              <Button className="bg-green-600 hover:bg-green-700">
                Cập nhật kết quả lên hệ thống
              </Button>
            )}
            {selectedKiemKe?.status === 'planning' && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                Phát hành phiếu kiểm kê
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
