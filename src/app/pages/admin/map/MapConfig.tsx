import React, { useState } from "react";
import { 
  Map, Plus, Search, Filter, Edit, Trash2, Globe, Server, 
  Layers, CheckCircle, AlertTriangle, Key, Maximize, Save 
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const MOCK_MAP_SERVICES = [
  {
    id: "map-001",
    name: "VEC GIS Base Map",
    source: "VEC Internal Server",
    type: "WMS",
    url: "https://gis.vec.vn/geoserver/wms",
    status: "active",
    zoom: "5 - 20",
    layers: "vec:expressway, vec:stations",
  },
  {
    id: "map-002",
    name: "Google Maps Satellite",
    source: "Google API",
    type: "XYZ Tile",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    status: "active",
    zoom: "1 - 22",
    layers: "N/A",
  },
  {
    id: "map-003",
    name: "Mapbox Streets",
    source: "Mapbox",
    type: "Vector Tile",
    url: "mapbox://styles/mapbox/streets-v11",
    status: "inactive",
    zoom: "0 - 22",
    layers: "N/A",
  },
  {
    id: "map-004",
    name: "OpenStreetMap Standard",
    source: "OSM",
    type: "XYZ Tile",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    status: "active",
    zoom: "0 - 19",
    layers: "N/A",
  }
];

export default function MapConfig() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12 font-sans antialiased text-[#020817]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 flex-shrink-0">
            <Map className="size-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Cấu hình bản đồ nền</h1>
            <p className="text-[13px] text-slate-500 font-medium mt-1">
              Quản lý danh sách các dịch vụ bản đồ (WMS, XYZ, Vector), thông số kết nối và vùng dữ liệu.
            </p>
          </div>
        </div>
        <Button className="h-10 px-4 text-[13px] font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-lg shadow-sm">
          <Plus className="size-4" /> Thêm mới cấu hình
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column: Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                <Server className="size-6" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-500">Dịch vụ đang hoạt động</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">3 <span className="text-[13px] font-medium text-slate-500">/ 4</span></h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Layers className="size-6" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-500">Chuẩn kết nối ưu tiên</p>
                <h3 className="text-[16px] font-bold text-slate-900 mt-1">XYZ Tile & WMS</h3>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[13px] text-slate-600 leading-relaxed shadow-inner">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="size-4 text-amber-500" /> Hướng dẫn cấu hình
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Mỗi dịch vụ cần đường dẫn (URL) hợp lệ.</li>
              <li>Đối với WMS, bắt buộc phải khai báo tên lớp (Layers).</li>
              <li>Đối với dịch vụ bên thứ ba (Google, Mapbox), cần cấu hình Token bảo mật.</li>
            </ul>
          </div>
        </div>

        {/* Right column: Data Table */}
        <div className="lg:col-span-3">
          <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-[15px] font-bold text-slate-800">Danh sách dịch vụ bản đồ</h2>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm cấu hình..."
                    className="w-full pl-8 pr-3 py-1.5 text-[13px] bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm transition-shadow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="h-8 px-3 text-[13px] font-medium border-slate-200 hover:bg-slate-50 gap-2">
                  <Filter className="size-3.5" /> Lọc
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-[13px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="px-4 py-3 font-semibold">Tên dịch vụ / Nguồn</th>
                    <th className="px-4 py-3 font-semibold">Loại / Thông số</th>
                    <th className="px-4 py-3 font-semibold w-1/3">Đường dẫn kết nối (URL)</th>
                    <th className="px-4 py-3 font-semibold text-center">Trạng thái</th>
                    <th className="px-4 py-3 font-semibold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_MAP_SERVICES.map((service) => (
                    <tr key={service.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <Globe className="size-4 text-slate-400" /> {service.name}
                        </div>
                        <div className="text-slate-500 text-[12px] mt-0.5">{service.source}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {service.type}
                        </div>
                        <div className="text-slate-500 text-[12px] mt-1 flex items-center gap-1">
                          <Maximize className="size-3" /> Zoom: {service.zoom}
                        </div>
                        {service.type === "WMS" && (
                          <div className="text-slate-500 text-[12px] mt-0.5 flex items-center gap-1">
                            <Layers className="size-3" /> {service.layers}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-[11px] break-all">
                        {service.url}
                        {service.source === "Mapbox" && (
                          <div className="mt-1 text-amber-600 flex items-center gap-1">
                            <Key className="size-3" /> Yêu cầu API Token
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {service.status === "active" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full border border-emerald-200">
                            <CheckCircle className="size-3" /> Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-full border border-slate-200">
                            <AlertTriangle className="size-3" /> Tạm ngưng
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded">
                            <Edit className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:bg-red-50 hover:text-red-600 rounded">
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[12px] text-slate-500 font-medium">Hiển thị {MOCK_MAP_SERVICES.length} dịch vụ</span>
              {/* Pagination Mock */}
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-7 px-2 text-[12px]" disabled>Trước</Button>
                <Button variant="outline" size="sm" className="h-7 px-2 text-[12px] bg-blue-50 text-blue-600 border-blue-200">1</Button>
                <Button variant="outline" size="sm" className="h-7 px-2 text-[12px]">Sau</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
