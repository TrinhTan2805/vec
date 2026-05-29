import React, { useState } from "react";
import { 
  Search, Filter, Plus, FileDown, MoreHorizontal, MapPin, 
  Settings, CheckCircle2, AlertCircle, XCircle, LayoutGrid, List
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function AssetManagement() {
  const [activeCategory, setActiveCategory] = useState("Biển báo");
  const [viewMode, setViewMode] = useState<'table'|'grid'>('table');

  const categories = [
    "Biển báo", "Cầu", "Cống chui", "Cống thoát nước", "Cột KM", "Cột GPMB, Mốc Lộ giới",
    "Dải phân cách", "Đất hạ tầng", "Đường gom", "Giá long môn", "Hàng rào bảo vệ",
    "Hàng rào chống chói", "Hầm", "Hố ga", "Hệ thống chiếu sáng", "Hệ thống điện",
    "Hệ thống ITS", "Khung biển", "Mái dốc", "Mặt đường", "Nút giao đường bộ",
    "Phương tiện đi lại", "Rãnh dọc", "Rào chắn tôn", "Tôn hộ lan", "Thảm cỏ cây xanh",
    "Thiết bị cân xe", "Thiết bị O&M", "Thiết bị thí nghiệm", "Trạm dừng nghỉ",
    "Trạm thu phí", "Trung tâm điều hành", "Vạch kẻ đường", "Thiết bị văn phòng, CNTT"
  ];

  const mockData = [
    { id: "BB-001", name: "Biển báo tốc độ tối đa 120km/h", loc: "Km 210+500", route: "Cao tốc Pháp Vân - Cầu Giẽ", status: "Tốt", installDate: "15/04/2022" },
    { id: "BB-002", name: "Biển báo chỉ dẫn trạm dừng nghỉ", loc: "Km 212+000", route: "Cao tốc Pháp Vân - Cầu Giẽ", status: "Xuống cấp", installDate: "10/01/2019" },
    { id: "BB-003", name: "Biển cảnh báo công trường", loc: "Km 215+200", route: "Cao tốc Cầu Giẽ - Ninh Bình", status: "Hư hỏng", installDate: "05/08/2023" },
    { id: "BB-004", name: "Biển báo khoảng cách an toàn", loc: "Km 220+100", route: "Cao tốc Cầu Giẽ - Ninh Bình", status: "Tốt", installDate: "20/11/2021" },
    { id: "BB-005", name: "Biển cấm dừng đỗ", loc: "Km 225+500", route: "Cao tốc Cầu Giẽ - Ninh Bình", status: "Tốt", installDate: "12/03/2022" },
  ];

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col gap-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Tài sản / Thiết bị</h1>
          <p className="text-sm text-slate-500">Quản lý toàn bộ 35 nhóm tài sản thuộc kết cấu hạ tầng giao thông đường bộ</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileDown className="size-4" /> Xuất Excel
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="size-4" /> Thêm tài sản mới
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Sidebar Filter */}
        <Card className="w-72 shrink-0 h-full overflow-y-auto border-none shadow-sm hidden md:block">
          <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Filter className="size-4" /> Phân loại tài sản
            </h3>
            <div className="mt-3 relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm loại tài sản..." 
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="p-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeCategory === cat 
                    ? "bg-indigo-50 text-indigo-700 font-semibold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Card>

        {/* Main Content area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-slate-800">{activeCategory}</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Tổng: 1,245</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={`Tìm ${activeCategory.toLowerCase()}...`} 
                  className="w-64 pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  title="Xem dạng bảng"
                  aria-label="Xem dạng bảng"
                >
                  <List className="size-4" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  title="Xem dạng lưới"
                  aria-label="Xem dạng lưới"
                >
                  <LayoutGrid className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Mã TS</th>
                  <th className="px-6 py-3.5 font-medium">Tên tài sản</th>
                  <th className="px-6 py-3.5 font-medium">Vị trí (Lý trình)</th>
                  <th className="px-6 py-3.5 font-medium">Thuộc tuyến</th>
                  <th className="px-6 py-3.5 font-medium">Ngày lắp đặt</th>
                  <th className="px-6 py-3.5 font-medium">Trạng thái</th>
                  <th className="px-6 py-3.5 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 text-slate-600 flex items-center gap-1.5 mt-2"><MapPin className="size-3.5 text-slate-400" /> {item.loc}</td>
                    <td className="px-6 py-4 text-slate-600">{item.route}</td>
                    <td className="px-6 py-4 text-slate-600">{item.installDate}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`border-none gap-1 ${
                        item.status === 'Tốt' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Xuống cấp' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {item.status === 'Tốt' && <CheckCircle2 className="size-3" />}
                        {item.status === 'Xuống cấp' && <AlertCircle className="size-3" />}
                        {item.status === 'Hư hỏng' && <XCircle className="size-3" />}
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between text-sm text-slate-500">
            <div>Hiển thị 1 - 5 của 1,245 tài sản</div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Trước</Button>
              <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-200">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">...</Button>
              <Button variant="outline" size="sm">Tiếp</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
