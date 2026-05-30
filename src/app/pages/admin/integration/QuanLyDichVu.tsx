import React, { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Globe, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const MOCK_SERVICES = [
  { id: "SRV.01", name: "Dịch vụ tổng hợp tài sản", endpoint: "/api/v1/assets/summary", method: "GET", status: "Hoạt động", type: "Tích hợp ngoài" },
  { id: "SRV.02", name: "Dịch vụ chi tiết tài sản", endpoint: "/api/v1/assets/details", method: "GET", status: "Hoạt động", type: "Tích hợp ngoài" },
  { id: "SRV.03", name: "API Cập nhật lịch bảo trì", endpoint: "/api/v1/maintenance/schedule", method: "POST", status: "Bảo trì", type: "Tích hợp nội bộ" },
  { id: "SRV.04", name: "Dịch vụ tiếp nhận yêu cầu", endpoint: "/api/v1/requests", method: "POST", status: "Hoạt động", type: "Tích hợp ngoài" },
];

export default function QuanLyDichVu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState(MOCK_SERVICES);

  const filteredServices = services.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#020817] font-sans antialiased">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
            <Globe className="size-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#020817]">Quản lý dịch vụ tích hợp</h1>
            <p className="text-[12px] text-slate-500 font-medium">Tìm kiếm, cập nhật và quản lý các API tích hợp</p>
          </div>
        </div>
        <Button className="h-9 px-4 text-[13px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm gap-1.5 flex items-center">
          <Plus className="size-4" /> Thêm mới dịch vụ
        </Button>
      </div>

      {/* Main Content */}
      <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Tìm kiếm dịch vụ"
              placeholder="Tìm theo tên, mã dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-[13px] border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
            />
          </div>
          <Button variant="outline" className="h-9 px-4 text-[13px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50 gap-1.5 flex items-center">
            <Filter className="size-4" /> Bộ lọc
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="px-5 py-3.5 font-semibold w-24">Mã DV</th>
                <th className="px-5 py-3.5 font-semibold">Tên dịch vụ</th>
                <th className="px-5 py-3.5 font-semibold">Endpoint & Method</th>
                <th className="px-5 py-3.5 font-semibold">Phân loại</th>
                <th className="px-5 py-3.5 font-semibold">Trạng thái</th>
                <th className="px-5 py-3.5 font-semibold text-right w-24">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-700">{service.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-900">{service.name}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${service.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {service.method}
                      </span>
                      <span className="font-mono text-[12px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{service.endpoint}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{service.type}</td>
                  <td className="px-5 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border ${
                      service.status === 'Hoạt động' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {service.status === 'Hoạt động' ? <CheckCircle className="size-3.5" /> : <AlertTriangle className="size-3.5" />}
                      {service.status}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button aria-label="Button" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Chỉnh sửa">
                        <Edit className="size-4" />
                      </button>
                      <button aria-label="Button" className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500 font-medium">
                    Không tìm thấy dịch vụ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
