import React from "react";
import { 
  FileText, CheckCircle2, Clock, Plus, Search, Calendar, FileDown,
  AlertCircle, TrendingUp, Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function InventoryManagement() {
  const mockPlans = [
    { id: "KK-001", name: "Kiểm kê định kỳ Quý 2/2026", type: "Định kỳ", startDate: "01/06/2026", endDate: "15/06/2026", status: "Đang thực hiện", progress: 45 },
    { id: "KK-002", name: "Kiểm kê đột xuất sau bão số 1", type: "Đột xuất", startDate: "10/05/2026", endDate: "12/05/2026", status: "Đã hoàn thành", progress: 100 },
    { id: "KK-003", name: "Kiểm kê vật tư lưu kho trạm Vực Vòng", type: "Kho", startDate: "20/06/2026", endDate: "25/06/2026", status: "Lên kế hoạch", progress: 0 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Kiểm kê tài sản</h1>
          <p className="text-sm text-slate-500">Lập kế hoạch, tạo phiếu kiểm kê và đối soát số liệu thực tế so với sổ sách</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileDown className="size-4" /> Báo cáo Kiểm kê
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="size-4" /> Lập Kế hoạch mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Kế hoạch chờ thực hiện</p>
              <p className="text-2xl font-bold text-slate-800">3</p>
            </div>
            <div className="bg-slate-100 p-3 rounded-xl"><Calendar className="size-6 text-slate-600" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Đang kiểm kê thực địa</p>
              <p className="text-2xl font-bold text-amber-600">1</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl"><Users className="size-6 text-amber-600" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Phiếu kiểm kê đã xử lý</p>
              <p className="text-2xl font-bold text-blue-600">145</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl"><FileText className="size-6 text-blue-600" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Tài sản phát hiện sai lệch</p>
              <p className="text-2xl font-bold text-rose-600">12</p>
            </div>
            <div className="bg-rose-100 p-3 rounded-xl"><AlertCircle className="size-6 text-rose-600" /></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-800">Danh sách Kế hoạch Kiểm kê</CardTitle>
              <CardDescription>Theo dõi tiến độ thực hiện kiểm kê theo từng kế hoạch được giao</CardDescription>
            </div>
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kế hoạch..." 
                className="w-64 pl-9 pr-3 py-1.5 text-sm border border-slate-200 bg-white rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3.5 font-medium">Mã KH</th>
                <th className="px-6 py-3.5 font-medium">Tên kế hoạch</th>
                <th className="px-6 py-3.5 font-medium">Loại hình</th>
                <th className="px-6 py-3.5 font-medium">Thời gian dự kiến</th>
                <th className="px-6 py-3.5 font-medium">Tiến độ</th>
                <th className="px-6 py-3.5 font-medium">Trạng thái</th>
                <th className="px-6 py-3.5 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPlans.map((plan, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{plan.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{plan.name}</td>
                  <td className="px-6 py-4 text-slate-600">{plan.type}</td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2"><Calendar className="size-3.5 text-slate-400" /> {plan.startDate} - {plan.endDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${plan.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${plan.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 w-8">{plan.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`border-none ${
                      plan.status === 'Lên kế hoạch' ? 'bg-slate-100 text-slate-700' :
                      plan.status === 'Đang thực hiện' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {plan.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">Chi tiết / Cập nhật</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
