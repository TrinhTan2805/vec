import { useState } from "react";
import { Map, Layers, RefreshCcw, Maximize } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { SimpleMapView } from "../components/map/SimpleMapView";

const mockTrafficRoutes = [
  // Vành Đai 3 - Red (Ùn tắc)
  {
    id: "r1",
    name: "Vành Đai 3 (Khuất Duy Tiến)",
    color: "#ef4444",
    weight: 6,
    coordinates: [
      [21.011, 105.795],
      [21.005, 105.798],
      [20.995, 105.805],
      [20.985, 105.815],
    ] as [number, number][]
  },
  // Vành Đai 3 - Orange (Lưu lượng cao)
  {
    id: "r2",
    name: "Vành Đai 3 (Nguyễn Xiển)",
    color: "#f59e0b",
    weight: 6,
    coordinates: [
      [20.985, 105.815],
      [20.975, 105.825],
      [20.965, 105.845],
    ] as [number, number][]
  },
  // QL32 - Red
  {
    id: "r3",
    name: "QL32 - Cầu Diễn",
    color: "#ef4444",
    weight: 5,
    coordinates: [
      [21.045, 105.750],
      [21.040, 105.760],
      [21.037, 105.770],
    ] as [number, number][]
  },
  // Trần Duy Hưng - Orange
  {
    id: "r4",
    name: "Trần Duy Hưng",
    color: "#f59e0b",
    weight: 5,
    coordinates: [
      [21.011, 105.795],
      [21.010, 105.805],
      [21.008, 105.815],
    ] as [number, number][]
  },
  // Đại lộ Thăng Long - Green (Thông thoáng)
  {
    id: "r5",
    name: "Đại lộ Thăng Long",
    color: "#10b981",
    weight: 5,
    coordinates: [
      [21.011, 105.795],
      [21.015, 105.750],
      [21.018, 105.700],
    ] as [number, number][]
  },
  // Lê Văn Lương - Red
  {
    id: "r6",
    name: "Lê Văn Lương",
    color: "#ef4444",
    weight: 5,
    coordinates: [
      [21.005, 105.798],
      [21.008, 105.810],
      [21.010, 105.820],
    ] as [number, number][]
  }
];

export default function TrafficHeatmap() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bản đồ Mật độ Lưu lượng (Heatmap)</h1>
          <p className="text-muted-foreground mt-1">
            Trực quan hóa mức độ lưu lượng phương tiện và điểm đen ùn tắc theo thời gian thực
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Layers className="h-4 w-4 mr-2" /> Chọn Layer</Button>
          <Button><RefreshCcw className="h-4 w-4 mr-2" /> Làm mới dữ liệu</Button>
        </div>
      </div>

      <Card className="flex-1 min-h-[600px] flex flex-col relative overflow-hidden">
        <CardContent className="p-0 relative flex-1 flex flex-col">
          <SimpleMapView 
             isActive={true} 
             center={[21.015, 105.800]} 
             zoom={13} 
             markers={[]}
             routes={mockTrafficRoutes}
          />
          
          {/* Legend Overlay */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 z-10">
            <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Cường độ giao thông</h3>
            <div className="space-y-3">
              <div className="flex items-center text-xs font-medium text-slate-700">
                 <div className="w-6 h-1 rounded-full bg-red-500 mr-3"></div> Ùn tắc nghiêm trọng
              </div>
              <div className="flex items-center text-xs font-medium text-slate-700">
                 <div className="w-6 h-1 rounded-full bg-amber-500 mr-3"></div> Lưu lượng cao
              </div>
              <div className="flex items-center text-xs font-medium text-slate-700">
                 <div className="w-6 h-1 rounded-full bg-emerald-500 mr-3"></div> Thông thoáng
              </div>
            </div>
          </div>
          
          <Button variant="secondary" size="icon" className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 shadow-md border-slate-200 z-10">
            <Maximize className="h-4 w-4" />
          </Button>

          {/* Time controls slider overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-700 w-[600px] z-10">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>00:00</span>
              <span>06:00</span>
              <span className="text-rose-400">08:00 (Cao điểm)</span>
              <span>12:00</span>
              <span>15:00</span>
              <span className="text-rose-400">18:00 (Cao điểm)</span>
              <span>23:59</span>
            </div>
            <input 
              type="range" 
              title="Khung giờ dữ liệu mật độ"
              min="0" max="24" defaultValue="18" 
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="mt-3 text-center text-sm text-white font-medium">
              Đang xem lịch sử lúc: <span className="text-rose-400">18:00 Hôm nay</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
