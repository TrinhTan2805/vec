import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Network, Activity, ShieldCheck, Database, ArrowUpRight, RefreshCcw, AlertTriangle } from "lucide-react";

export default function IntegrationServices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tích hợp & Chia sẻ dữ liệu API</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý và giám sát các luồng dữ liệu kết nối giữa VEC, Bộ GTVT và các đối tác.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="size-4" />
            Đồng bộ thủ công
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Network className="size-4" />
            Thêm API Endpoint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Tổng API Kết nối</CardTitle>
            <Network className="size-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-emerald-600 mt-1">10 Đang hoạt động, 2 Tạm dừng</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Lượt request / 24h</CardTitle>
            <Activity className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-700">145.2K</div>
            <p className="text-xs text-slate-500 mt-1">~6.050 req/giờ</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Lỗi kết nối (5xx/4xx)</CardTitle>
            <AlertTriangle className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">23</div>
            <p className="text-xs text-slate-500 mt-1">Cần rà soát Log Cục ĐBVN</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Bảo mật (WAF)</CardTitle>
            <ShieldCheck className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">An toàn</div>
            <p className="text-xs text-slate-500 mt-1">Đã chặn 12 request bất thường</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
          <h3 className="text-sm font-semibold text-slate-800">Danh sách Dịch vụ (Endpoints)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Tên Dịch Vụ</th>
                <th className="px-6 py-4 font-semibold">Đối tác / Cơ quan</th>
                <th className="px-6 py-4 font-semibold">Phương thức</th>
                <th className="px-6 py-4 font-semibold">Tần suất</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Đồng bộ tài sản Cầu Đường", partner: "Cục Đường bộ VN", method: "POST (Push)", freq: "Realtime", status: "Hoạt động", statusColor: "bg-emerald-100 text-emerald-700" },
                { name: "Truyền dữ liệu Lưu lượng (ETC)", partner: "Trung tâm ĐH Giao thông QG", method: "GET (Pull)", freq: "5 phút/lần", status: "Hoạt động", statusColor: "bg-emerald-100 text-emerald-700" },
                { name: "Cảnh báo sự cố, tai nạn", partner: "Cục CSGT (C08)", method: "POST (Webhook)", freq: "Realtime", status: "Gián đoạn", statusColor: "bg-amber-100 text-amber-700" },
                { name: "Đồng bộ Danh mục chuẩn", partner: "Bộ GTVT", method: "GET (Pull)", freq: "1 lần/ngày", status: "Hoạt động", statusColor: "bg-emerald-100 text-emerald-700" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                    <Database className="size-4 text-slate-400" />
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.partner}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.method}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.freq}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
