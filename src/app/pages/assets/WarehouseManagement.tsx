import React, { useState } from "react";
import { 
  PackageSearch, ArrowRightLeft, Plus, Search, Filter, Warehouse, 
  MapPin, CheckCircle2, AlertTriangle, Info, Clock, Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function WarehouseManagement() {
  const [activeTab, setActiveTab] = useState<'kho'|'dieu-chuyen'>('kho');

  const mockInventory = [
    { id: "VT-001", name: "Biển báo tốc độ phản quang", category: "Biển báo", location: "Kho Vực Vòng", quantity: 15, status: "Mới 100%" },
    { id: "VT-002", name: "Đèn LED cao áp 150W", category: "Hệ thống chiếu sáng", location: "Kho Liêm Tuyền", quantity: 45, status: "Thu hồi - Đạt 80%" },
    { id: "VT-003", name: "Tấm tôn sóng hộ lan 3m", category: "Tôn hộ lan", location: "Kho Cao Bồ", quantity: 120, status: "Mới 100%" },
    { id: "VT-004", name: "Cọc tiêu phản quang nhựa dẻo", category: "Cột KM", location: "Kho Vực Vòng", quantity: 8, status: "Cần thay thế" },
  ];

  const mockTransfers = [
    { id: "DC-2026-001", item: "Tấm tôn sóng hộ lan 3m", qty: 20, from: "Kho Cao Bồ", to: "Km 215 - Đội Sửa chữa", date: "28/05/2026", status: "Hoàn thành" },
    { id: "DC-2026-002", item: "Đèn LED cao áp 150W", qty: 5, from: "Kho Liêm Tuyền", to: "Kho Vực Vòng", date: "29/05/2026", status: "Đang vận chuyển" },
    { id: "DC-2026-003", item: "Biển cảnh báo thi công", qty: 2, from: "Kho Vực Vòng", to: "Km 200 - Đội Tuần 1", date: "30/05/2026", status: "Chờ xuất kho" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Kho tài sản trên tuyến</h1>
          <p className="text-sm text-slate-500">Quản lý danh mục tài sản thu hồi lưu kho và điều chuyển tài sản</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" /> Báo cáo Xuất/Nhập/Tồn
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            {activeTab === 'kho' ? <><Plus className="size-4" /> Nhập kho mới</> : <><ArrowRightLeft className="size-4" /> Tạo Lệnh điều chuyển</>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Tổng mã vật tư lưu kho</p>
              <p className="text-3xl font-bold mt-1">1,245</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-xl"><Warehouse className="size-8 text-slate-300" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Tổng kho vật lý</p>
              <p className="text-2xl font-bold text-indigo-600">8</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-xl"><MapPin className="size-6 text-indigo-600" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Lệnh điều chuyển đang xử lý</p>
              <p className="text-2xl font-bold text-amber-600">14</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl"><Clock className="size-6 text-amber-600" /></div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Vật tư sắp hết/cần bổ sung</p>
              <p className="text-2xl font-bold text-rose-600">5</p>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl"><AlertTriangle className="size-6 text-rose-600" /></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-0 pt-4 px-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveTab('kho')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'kho' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Danh mục vật tư lưu kho
              </button>
              <button 
                onClick={() => setActiveTab('dieu-chuyen')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'dieu-chuyen' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Lịch sử điều chuyển / Xuất kho
              </button>
            </div>
            <div className="relative bottom-2">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder={activeTab === 'kho' ? "Tìm vật tư..." : "Tìm mã lệnh điều chuyển..."} 
                className="w-64 pl-9 pr-3 py-1.5 text-sm border border-slate-200 bg-slate-50 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          
          {activeTab === 'kho' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Mã VT</th>
                  <th className="px-6 py-3.5 font-medium">Tên vật tư / Tài sản</th>
                  <th className="px-6 py-3.5 font-medium">Phân loại</th>
                  <th className="px-6 py-3.5 font-medium">Vị trí lưu kho</th>
                  <th className="px-6 py-3.5 font-medium text-center">Tồn kho</th>
                  <th className="px-6 py-3.5 font-medium">Tình trạng</th>
                  <th className="px-6 py-3.5 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockInventory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 text-slate-600">{item.category}</td>
                    <td className="px-6 py-4 text-slate-600 flex items-center gap-1.5 mt-0.5"><MapPin className="size-3.5 text-slate-400" /> {item.location}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline" className={`border-none ${item.quantity < 10 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>{item.quantity}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                        item.status.includes('Mới') ? 'bg-emerald-50 text-emerald-700' : 
                        item.status.includes('Thu hồi') ? 'bg-blue-50 text-blue-700' : 
                        'bg-amber-50 text-amber-700'
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">Cập nhật</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'dieu-chuyen' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Mã ĐC</th>
                  <th className="px-6 py-3.5 font-medium">Vật tư / Tài sản</th>
                  <th className="px-6 py-3.5 font-medium text-center">Số lượng</th>
                  <th className="px-6 py-3.5 font-medium">Từ (Kho xuất)</th>
                  <th className="px-6 py-3.5 font-medium">Đến (Nơi nhận)</th>
                  <th className="px-6 py-3.5 font-medium">Ngày thực hiện</th>
                  <th className="px-6 py-3.5 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTransfers.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.item}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{item.qty}</td>
                    <td className="px-6 py-4 text-slate-600">{item.from}</td>
                    <td className="px-6 py-4 font-medium text-indigo-700 flex items-center gap-1"><ArrowRightLeft className="size-3 text-indigo-400" /> {item.to}</td>
                    <td className="px-6 py-4 text-slate-600">{item.date}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`border-none ${
                        item.status === 'Hoàn thành' ? 'bg-emerald-100 text-emerald-700' : 
                        item.status === 'Đang vận chuyển' ? 'bg-amber-100 text-amber-700' : 
                        'bg-slate-100 text-slate-700'
                      }`}>{item.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
