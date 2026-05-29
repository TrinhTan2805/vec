import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Package, Search, Filter, Plus, ArrowRightLeft, Download, AlertTriangle } from "lucide-react";

export default function InventoryManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý Kho & Vật tư</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý xuất/nhập/tồn kho vật tư dự phòng, thiết bị O&M trên tuyến cao tốc.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <ArrowRightLeft className="size-4" />
            Điều chuyển kho
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="size-4" />
            Nhập kho vật tư
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Tổng mã vật tư</CardTitle>
            <Package className="size-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-slate-500 mt-1">Đang lưu trữ tại 5 kho</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Sắp hết tồn kho</CardTitle>
            <AlertTriangle className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">32</div>
            <p className="text-xs text-amber-600 mt-1">Cần lập kế hoạch mua sắm</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Giá trị tồn kho (VNĐ)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-700">12.5 Tỷ</div>
            <p className="text-xs text-slate-500 mt-1">Tính đến 28/05/2026</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Giao dịch xuất/nhập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">85</div>
            <p className="text-xs text-slate-500 mt-1">Trong tháng này</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
          <div className="flex gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Mã vật tư, tên thiết bị..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            </div>
            <select title="Chọn kho" aria-label="Chọn kho" className="px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 bg-white">
              <option>Tất cả kho (5)</option>
              <option>Kho Hạt QLĐB Nội Bài - Lào Cai</option>
              <option>Kho Hạt QLĐB Cầu Giẽ - Ninh Bình</option>
            </select>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="size-4" />
            Xuất Excel
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã Vật Tư</th>
                <th className="px-6 py-4 font-semibold">Tên Vật Tư / Thiết bị</th>
                <th className="px-6 py-4 font-semibold">Kho lưu trữ</th>
                <th className="px-6 py-4 font-semibold text-right">Tồn kho</th>
                <th className="px-6 py-4 font-semibold">Đơn vị</th>
                <th className="px-6 py-4 font-semibold">Tình trạng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "VT-0012", name: "Đèn LED chiếu sáng cao tốc 150W", kho: "Kho Cầu Giẽ - Ninh Bình", qty: 45, unit: "Bộ", status: "Bình thường", sc: "text-slate-600" },
                { id: "VT-0089", name: "Mắt phản quang dẫn hướng (vàng)", kho: "Kho Nội Bài - Lào Cai", qty: 15, unit: "Cái", status: "Sắp hết", sc: "text-amber-600 font-semibold" },
                { id: "VT-0142", name: "Biển báo hiệu lệnh tròn D700", kho: "Kho Cầu Giẽ - Ninh Bình", qty: 8, unit: "Biển", status: "Sắp hết", sc: "text-amber-600 font-semibold" },
                { id: "VT-0351", name: "Cọc tiêu nhựa dẻo phản quang", kho: "Kho Đà Nẵng - Quảng Ngãi", qty: 250, unit: "Cái", status: "Bình thường", sc: "text-slate-600" },
                { id: "VT-0420", name: "Module quang SFP Camera ITS", kho: "Kho TTĐH Nội Bài", qty: 2, unit: "Cái", status: "Hết hàng", sc: "text-red-600 font-semibold" },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.kho}</td>
                  <td className="px-6 py-4 text-right font-medium">{item.qty}</td>
                  <td className="px-6 py-4 text-slate-600">{item.unit}</td>
                  <td className={`px-6 py-4 ${item.sc}`}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
