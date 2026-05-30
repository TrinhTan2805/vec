import React, { useState } from "react";
import { 
  Map as MapIcon, Save, CheckCircle, Navigation2, Layers, 
  MapPin, Settings2, ShieldCheck, Globe
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

const AVAILABLE_MAPS = [
  {
    id: "map-001",
    name: "VEC GIS Base Map",
    source: "VEC Internal Server",
    type: "WMS",
    description: "Bản đồ số hóa độc quyền của VEC, đầy đủ các lớp hạ tầng đường bộ, hầm, cầu và trạm thu phí.",
    url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    isDefault: true
  },
  {
    id: "map-002",
    name: "Google Maps Satellite",
    source: "Google API",
    type: "XYZ Tile",
    description: "Bản đồ vệ tinh độ phân giải cao từ Google, phù hợp để giám sát thực địa và định vị sự cố.",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    isDefault: false
  },
  {
    id: "map-004",
    name: "OpenStreetMap Standard",
    source: "OSM",
    type: "XYZ Tile",
    description: "Bản đồ đường phố tiêu chuẩn mã nguồn mở, nhẹ và tốc độ tải nhanh.",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    isDefault: false
  }
];

export default function MapChange() {
  const [selectedMapId, setSelectedMapId] = useState("map-001");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Đã lưu cấu hình bản đồ nền mặc định thành công!");
    }, 800);
  };

  const selectedMap = AVAILABLE_MAPS.find(m => m.id === selectedMapId);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12 font-sans antialiased text-[#020817]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 flex-shrink-0">
            <Globe className="size-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Thay đổi bản đồ nền</h1>
            <p className="text-[13px] text-slate-500 font-medium mt-1">
              Lựa chọn bản đồ nền mặc định sẽ hiển thị trên toàn bộ phân hệ quản lý tài sản trên đường cao tốc.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Map Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-[14px] font-bold text-slate-800 flex items-center gap-2 px-1">
            <Layers className="size-4 text-blue-600" /> Danh sách bản đồ khả dụng
          </h2>
          
          <div className="space-y-3">
            {AVAILABLE_MAPS.map((map) => (
              <label 
                key={map.id}
                className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedMapId === map.id 
                    ? "bg-blue-50/50 border-blue-500 shadow-md ring-1 ring-blue-500" 
                    : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center size-5 rounded-full border flex-shrink-0 ${
                      selectedMapId === map.id ? "border-blue-600" : "border-slate-300"
                    }`}>
                      {selectedMapId === map.id && <div className="size-2.5 bg-blue-600 rounded-full" />}
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-slate-900 leading-tight">{map.name}</h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          {map.source}
                        </span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                          {map.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  {map.isDefault && selectedMapId !== map.id && (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      Mặc định hiện tại
                    </span>
                  )}
                  {selectedMapId === map.id && (
                    <div className="absolute top-4 right-4 flex items-center gap-3">
                      <Button 
                        onClick={(e) => {
                          e.preventDefault(); // Prevent label click when clicking button
                          handleSave();
                        }}
                        disabled={isSaving}
                        className="h-8 px-4 text-[12px] font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 rounded shadow-sm"
                      >
                        {isSaving ? (
                          <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        ) : (
                          <Save className="size-3.5" />
                        )}
                        {isSaving ? "Đang lưu..." : "Áp dụng bản đồ"}
                      </Button>
                      <CheckCircle className="size-5 text-blue-600" />
                    </div>
                  )}
                </div>
                <p className="text-[12px] text-slate-500 mt-3 pl-8 leading-relaxed">
                  {map.description}
                </p>
              </label>
            ))}
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6 flex items-start gap-3">
            <ShieldCheck className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-slate-800">Quyền thay đổi bản đồ</h4>
              <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                Chỉ cán bộ Quản trị hệ thống (QTHT) mới có quyền thay đổi bản đồ nền mặc định của toàn hệ thống.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Map Preview Mock */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                <MapIcon className="size-4 text-slate-500" /> Xem trước bản đồ: {selectedMap?.name}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white shadow-sm"><Settings2 className="size-4 text-slate-600" /></Button>
              </div>
            </div>
            
            <div className="flex-1 bg-slate-100 relative min-h-[500px] z-0">
              <MapContainer 
                center={[21.028511, 105.804817]} // Hanoi Coordinates
                zoom={10} 
                className="h-full w-full absolute inset-0"
                key={selectedMapId} // Force re-render when map changes
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; Bản đồ demo mô phỏng'
                  url={selectedMap?.url || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
              </MapContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
