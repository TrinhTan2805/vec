import React, { useState } from "react";
import { 
  FileText, CheckCircle2, AlertTriangle, FileDown, Plus, XCircle, Search, Clock, Archive
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function AssetDisposal() {
  const [activeTab, setActiveTab] = useState<'thanh-ly'|'thanh-huy'>('thanh-ly');

  const mockRequests = [
    { id: "TL-2026-001", title: "Thanh lý hệ thống đèn chiếu sáng cũ IC3", date: "15/05/2026", requester: "Đội Vận hành 2", status: "Chờ phê duyệt", value: "150,000,000 VNĐ" },
    { id: "TL-2026-002", title: "Thanh lý xe bán tải tuần đường BKS 29C-123.45", date: "10/05/2026", requester: "Phòng Quản lý Xe", status: "Đã phê duyệt", value: "200,000,000 VNĐ" },
    { id: "TL-2026-003", title: "Thanh lý 50 biển báo hỏng rỉ sét", date: "05/05/2026", requester: "Đội Tuần 1", status: "Hoàn thành", value: "25,000,000 VNĐ" },
  ];

  const mockHuyRequests = [
    { id: "TH-2026-001", title: "Thanh hủy barie gãy nát do tai nạn", date: "20/05/2026", requester: "Trạm Thu phí Cao Bồ", status: "Đã phê duyệt", reason: "Hư hỏng hoàn toàn, không thể khắc phục" },
    { id: "TH-2026-002", title: "Thanh hủy 10 bộ máy tính trạm cũ hỏng", date: "18/05/2026", requester: "Phòng IT", status: "Chờ phê duyệt", reason: "Lỗi phần cứng không thể sửa" },
  ];

  const data = activeTab === 'thanh-ly' ? mockRequests : mockHuyRequests;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Thanh lý & Thanh hủy tài sản</h1>
          <p className="text-sm text-slate-500">Quản lý quy trình đề xuất, phê duyệt và cập nhật hồ sơ thanh lý, thanh hủy tài sản</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileDown className="size-4" /> Xuất Báo cáo
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="size-4" /> Tạo Yêu cầu mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-xl"><Clock className="size-6 text-amber-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Chờ phê duyệt</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl"><CheckCircle2 className="size-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Đã phê duyệt</p>
              <p className="text-2xl font-bold text-slate-800">45</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl"><Archive className="size-6 text-emerald-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Đã hoàn thành lưu trữ</p>
              <p className="text-2xl font-bold text-slate-800">128</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-0 pt-4 px-6">
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab('thanh-ly')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'thanh-ly' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Yêu cầu Thanh lý tài sản
            </button>
            <button 
              onClick={() => setActiveTab('thanh-huy')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'thanh-huy' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Yêu cầu Thanh hủy tài sản
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between">
             <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={`Tìm mã yêu cầu...`} 
                  className="w-64 pl-9 pr-3 py-1.5 text-sm border border-slate-200 bg-white rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3.5 font-medium">Mã YC</th>
                <th className="px-6 py-3.5 font-medium">Nội dung đề xuất</th>
                <th className="px-6 py-3.5 font-medium">Ngày lập</th>
                <th className="px-6 py-3.5 font-medium">Đơn vị yêu cầu</th>
                {activeTab === 'thanh-ly' ? <th className="px-6 py-3.5 font-medium">Giá trị sổ sách</th> : <th className="px-6 py-3.5 font-medium">Lý do thanh hủy</th>}
                <th className="px-6 py-3.5 font-medium">Trạng thái</th>
                <th className="px-6 py-3.5 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{item.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{item.title}</td>
                  <td className="px-6 py-4 text-slate-600">{item.date}</td>
                  <td className="px-6 py-4 text-slate-600">{item.requester}</td>
                  {activeTab === 'thanh-ly' ? <td className="px-6 py-4 font-medium text-slate-700">{('value' in item) ? item.value : ''}</td> : <td className="px-6 py-4 text-slate-600">{('reason' in item) ? item.reason : ''}</td>}
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`border-none ${
                      item.status === 'Chờ phê duyệt' ? 'bg-amber-100 text-amber-700' :
                      item.status === 'Đã phê duyệt' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">Xem chi tiết</Button>
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
