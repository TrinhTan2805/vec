import React, { useState } from "react";
import { 
  Box, UploadCloud, Sliders, Save, Layers, 
  RotateCcw, MoveVertical, Maximize, Cuboid, Monitor, CheckCircle, Image as ImageIcon
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const POINT_ASSET_TYPES = [
  { id: "asset-01", name: "Cột Camera giám sát", type: "Công nghệ", has3D: true },
  { id: "asset-02", name: "Biển báo điện tử VMS", type: "Công nghệ", has3D: true },
  { id: "asset-03", name: "Cột đèn chiếu sáng", type: "Phụ trợ", has3D: false },
  { id: "asset-04", name: "Trạm thu phí (Cabin)", type: "Kiến trúc", has3D: true },
  { id: "asset-05", name: "Cột Km", type: "Phụ trợ", has3D: false },
];

const SYSTEM_MODELS = [
  { id: "mod-01", name: "Camera_Pole_Type1.glb", thumbnail: "📷" },
  { id: "mod-02", name: "VMS_Gantry_Standard.glb", thumbnail: "🖥️" },
  { id: "mod-03", name: "Toll_Cabin_Modern.glb", thumbnail: "🏠" },
  { id: "mod-04", name: "StreetLight_Double.glb", thumbnail: "💡" },
];

export default function Map3DConfig() {
  const [selectedAsset, setSelectedAsset] = useState("asset-01");
  const [modelSource, setModelSource] = useState<"upload" | "system">("system");
  const [selectedModel, setSelectedModel] = useState("mod-01");
  const [isSaving, setIsSaving] = useState(false);

  // 3D Parameters
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState({ x: 0, y: 90, z: 0 });
  const [altitude, setAltitude] = useState(0);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Đã lưu cấu hình 3D cho loại tài sản thành công!");
    }, 800);
  };

  const activeAsset = POINT_ASSET_TYPES.find(a => a.id === selectedAsset);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12 font-sans antialiased text-[#020817]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 flex-shrink-0">
            <Cuboid className="size-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Cài đặt hiển thị 3D cho loại dữ liệu</h1>
            <p className="text-[13px] text-slate-500 font-medium mt-1">
              Gán mô hình 3D (GLB, GLTF, OBJ) và cấu hình thông số hiển thị (Tỷ lệ, Góc xoay, Độ cao) cho các loại tài sản dạng điểm.
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="h-10 px-6 text-[13px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-lg shadow-sm"
        >
          {isSaving ? (
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {isSaving ? "Đang lưu..." : "Lưu cấu hình 3D"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Asset Type Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-[14px] font-bold text-slate-800 flex items-center gap-2 px-1">
            <Layers className="size-4 text-indigo-600" /> Loại tài sản (Dạng điểm)
          </h2>
          
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-3 border-b border-slate-100 bg-slate-50">
              <input 
                type="text" 
                placeholder="Tìm loại tài sản..." 
                className="w-full text-[13px] px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {POINT_ASSET_TYPES.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset.id)}
                  className={`w-full text-left px-4 py-3 flex items-start justify-between transition-colors ${
                    selectedAsset === asset.id 
                      ? "bg-indigo-50 border-l-4 border-indigo-600" 
                      : "hover:bg-slate-50 border-l-4 border-transparent"
                  }`}
                >
                  <div>
                    <h3 className={`text-[13px] font-bold ${selectedAsset === asset.id ? "text-indigo-900" : "text-slate-800"}`}>
                      {asset.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 mt-1 inline-block">{asset.type}</span>
                  </div>
                  {asset.has3D && (
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Cuboid className="size-3" /> Đã có 3D
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Configuration */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
              <Box className="size-5 text-indigo-600" />
              <h2 className="text-[15px] font-bold text-slate-800">
                Cấu hình mô hình cho: <span className="text-indigo-600">{activeAsset?.name}</span>
              </h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Form Config */}
              <div className="space-y-6">
                {/* 1. Model Source */}
                <div className="space-y-3">
                  <h3 className="text-[13px] font-bold text-slate-800 flex items-center gap-2">
                    <span className="flex items-center justify-center size-5 rounded-full bg-indigo-100 text-indigo-700 text-[11px]">1</span> 
                    Nguồn mô hình 3D
                  </h3>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${modelSource === 'system' ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input type="radio" name="source" checked={modelSource === 'system'} onChange={() => setModelSource('system')} className="hidden" />
                      <Monitor className={`size-5 ${modelSource === 'system' ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-[13px] font-medium text-slate-700">Thư viện hệ thống</span>
                      {modelSource === 'system' && <CheckCircle className="size-4 text-indigo-600 ml-auto" />}
                    </label>
                    <label className={`flex-1 flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${modelSource === 'upload' ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input type="radio" name="source" checked={modelSource === 'upload'} onChange={() => setModelSource('upload')} className="hidden" />
                      <UploadCloud className={`size-5 ${modelSource === 'upload' ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-[13px] font-medium text-slate-700">Tải file mới (Upload)</span>
                      {modelSource === 'upload' && <CheckCircle className="size-4 text-indigo-600 ml-auto" />}
                    </label>
                  </div>
                  
                  {modelSource === 'system' ? (
                    <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <label className="text-[12px] font-semibold text-slate-600 mb-2 block">Chọn mô hình có sẵn</label>
                      <select 
                        className="w-full text-[13px] p-2 border border-slate-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                      >
                        {SYSTEM_MODELS.map(m => <option key={m.id} value={m.id}>{m.thumbnail} {m.name}</option>)}
                      </select>
                    </div>
                  ) : (
                    <div className="mt-3 p-6 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                      <UploadCloud className="size-8 text-slate-400 mb-2" />
                      <p className="text-[13px] font-semibold text-slate-700">Click hoặc kéo thả file 3D vào đây</p>
                      <p className="text-[11px] text-slate-500 mt-1">Định dạng hỗ trợ: .glb, .gltf, .obj (Max: 50MB)</p>
                    </div>
                  )}
                </div>

                <hr className="border-slate-100" />

                {/* 2. Model Parameters */}
                <div className="space-y-4">
                  <h3 className="text-[13px] font-bold text-slate-800 flex items-center gap-2">
                    <span className="flex items-center justify-center size-5 rounded-full bg-indigo-100 text-indigo-700 text-[11px]">2</span> 
                    Thông số hiển thị không gian
                  </h3>
                  
                  <div className="space-y-4 bg-white p-4 border border-slate-200 rounded-lg">
                    {/* Scale */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[12px] font-semibold text-slate-700 flex items-center gap-1.5">
                          <Maximize className="size-3.5 text-slate-400" /> Tỉ lệ (Scale)
                        </label>
                        <span className="text-[12px] font-bold text-indigo-600">{scale}x</span>
                      </div>
                      <input type="range" min="0.1" max="5" step="0.1" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
                    </div>

                    {/* Rotation */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[12px] font-semibold text-slate-700 flex items-center gap-1.5">
                          <RotateCcw className="size-3.5 text-slate-400" /> Góc xoay (Rotation)
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-medium mb-1 uppercase">Trục X (Độ)</span>
                          <input type="number" value={rotation.x} onChange={(e) => setRotation({...rotation, x: Number(e.target.value)})} className="w-full text-[13px] p-1.5 border border-slate-300 rounded text-center" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-medium mb-1 uppercase">Trục Y (Độ)</span>
                          <input type="number" value={rotation.y} onChange={(e) => setRotation({...rotation, y: Number(e.target.value)})} className="w-full text-[13px] p-1.5 border border-slate-300 rounded text-center" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-medium mb-1 uppercase">Trục Z (Độ)</span>
                          <input type="number" value={rotation.z} onChange={(e) => setRotation({...rotation, z: Number(e.target.value)})} className="w-full text-[13px] p-1.5 border border-slate-300 rounded text-center" />
                        </div>
                      </div>
                    </div>

                    {/* Altitude */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[12px] font-semibold text-slate-700 flex items-center gap-1.5">
                          <MoveVertical className="size-3.5 text-slate-400" /> Độ cao so với mặt đất (Altitude)
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="number" value={altitude} onChange={(e) => setAltitude(Number(e.target.value))} className="w-24 text-[13px] p-1.5 border border-slate-300 rounded text-center" />
                        <span className="text-[12px] text-slate-500">mét (m)</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* 3D Preview Panel */}
              <div className="h-full min-h-[400px] bg-slate-900 rounded-xl overflow-hidden relative flex flex-col border border-slate-800 shadow-inner">
                <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/60 to-transparent z-10 flex justify-between items-center">
                  <span className="text-white/90 text-[12px] font-medium flex items-center gap-2">
                    <ImageIcon className="size-3.5" /> Xem trước mô hình 3D
                  </span>
                  <div className="flex gap-1 text-[10px] text-white/50 bg-black/40 px-2 py-1 rounded">
                    <span>X: {rotation.x}°</span> | <span>Y: {rotation.y}°</span> | <span>Z: {rotation.z}°</span>
                  </div>
                </div>
                
                {/* Mock 3D Canvas rendering */}
                <div className="flex-1 flex items-center justify-center relative">
                  {/* Grid floor mock */}
                  <div className="absolute bottom-10 w-64 h-64 border border-indigo-500/20 rounded-full" style={{ transform: 'rotateX(70deg)' }}>
                    <div className="w-full h-full border border-indigo-500/20 rounded-full scale-75"></div>
                    <div className="w-full h-full border border-indigo-500/20 rounded-full scale-50 absolute top-0"></div>
                  </div>
                  
                  {/* 3D Object mock representation */}
                  <div className="relative z-10 flex flex-col items-center justify-center transform transition-transform duration-500" 
                    style={{ transform: `scale(${scale}) rotate(${rotation.y}deg) translateY(-${altitude * 2}px)` }}>
                    <Cuboid className="size-32 text-indigo-400 drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]" strokeWidth={1} />
                  </div>
                  
                  {/* Altitude reference line mock */}
                  {altitude > 0 && (
                    <div className="absolute bottom-10 w-px bg-indigo-500/50 border-r border-dashed border-indigo-400" 
                         style={{ height: `${altitude * 2 + 120}px` }}></div>
                  )}
                </div>

                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                  <p className="text-center text-[11px] text-slate-400">Sử dụng chuột trái để xoay, con lăn để thu phóng</p>
                </div>
              </div>
              
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
