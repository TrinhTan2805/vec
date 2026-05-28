/* eslint-disable react/forbid-component-props */
import React, { useMemo } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Route, MapPin, Target, TriangleAlert, ShieldAlert, Navigation } from "lucide-react";

export interface LinearRouteItem {
  id: string | number;
  startKm: string; // e.g. "Km15+200"
  endKm?: string; // Optional for point features
  title: string;
  status?: string;
  position?: string; // "Trái", "Phải", "Giữa", "Toàn mặt đường"
  color?: string;
  category?: "asset" | "legal" | "repair" | string;
}

interface LinearRouteDiagramProps {
  data: LinearRouteItem[];
  routeName: string;
  emptyMessage?: string;
}

const parseKm = (kmStr: string): number => {
  if (!kmStr) return 0;
  const match = kmStr.match(/Km(\d+)\+(\d+)/i);
  if (match) {
    return parseInt(match[1]) * 1000 + parseInt(match[2]);
  }
  return 0;
};

const formatKm = (m: number): string => {
  const km = Math.floor(m / 1000);
  const meter = Math.floor(m % 1000);
  return `Km${km}+${meter.toString().padStart(3, "0")}`;
};

export const LinearRouteDiagram = ({ data, routeName, emptyMessage = "Không có dữ liệu hiển thị trên tuyến này" }: LinearRouteDiagramProps) => {
  const minMax = useMemo(() => {
    if (!data || !data.length) return { min: 0, max: 0, range: 0, items: [] };
    
    let min = Infinity;
    let max = -Infinity;
    
    const parsedItems = data.map(item => {
      const start = parseKm(item.startKm);
      const end = item.endKm ? parseKm(item.endKm) : start;
      const s = Math.min(start, end);
      const e = Math.max(start, end);
      
      if (s < min) min = s;
      if (e > max) max = e;
      
      return { ...item, _startM: s, _endM: e };
    });
    
    // add some buffer (e.g., 200m on each side)
    const buffer = 200;
    min = Math.max(0, min - buffer);
    max = max + buffer;
    
    return {
      min,
      max,
      range: max - min,
      items: parsedItems
    };
  }, [data]);

  if (!data || data.length === 0 || minMax.range <= 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-slate-50 border border-dashed border-slate-300 rounded-xl h-[500px]">
        <Route className="size-16 text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-400 mb-1">{routeName}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // To prevent the diagram from being excessively wide (e.g., > 30000px), we scale it down.
  // We'll aim for a target width of roughly 2000-5000px for reasonable scrolling experience.
  let pixelsPerMeter = 1;
  const maxDesiredWidth = 6000;
  if (minMax.range > maxDesiredWidth) {
    pixelsPerMeter = maxDesiredWidth / minMax.range;
  }
  // Enforce a minimum width so we don't have super tiny elements if range is just 100m.
  const minDesiredWidth = 800;
  if (minMax.range * pixelsPerMeter < minDesiredWidth) {
    pixelsPerMeter = minDesiredWidth / Math.max(minMax.range, 1);
  }

  const totalWidth = minMax.range * pixelsPerMeter;
  
  // Mark intervals: scale depending on range size
  let interval = 100;
  if (minMax.range > 10000) interval = 1000; // tick every 1km
  else if (minMax.range > 2000) interval = 500; // tick every 500m
  
  const marks = [];
  const startMark = Math.ceil(minMax.min / interval) * interval;
  for (let m = startMark; m <= minMax.max; m += interval) {
    marks.push(m);
  }

  const getPositionClass = (pos?: string) => {
    switch(pos?.toLowerCase().trim()) {
      case "trái": return "top-2 h-10"; // top lane
      case "phải": return "bottom-2 h-10"; // bottom lane
      case "giữa": return "top-1/2 -translate-y-1/2 h-8"; // middle
      case "toàn mặt đường":
      default: return "inset-y-2 h-[calc(100%-16px)]"; // full width minus padding
    }
  };

  const getStatusColor = (status?: string, category?: string) => {
    if (category === "asset") return "bg-blue-500 border-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]";
    if (category === "legal") return "bg-amber-400 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)]";
    
    switch (status) {
      case "completed": return "bg-emerald-500 border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
      case "ongoing": return "bg-blue-500 border-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]";
      case "pending": return "bg-amber-500 border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.3)]";
      default: return "bg-emerald-500 border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]"; // default repair color
    }
  };

  const getCategoryIcon = (category?: string) => {
    if (category === "asset") return <MapPin className="text-white size-3" />;
    if (category === "legal") return <ShieldAlert className="text-white size-3" />;
    if (category === "repair") return <Target className="text-white size-3" />;
    return null;
  };

  return (
    <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col h-[650px] shadow-sm">
      <div className="px-6 py-4 bg-slate-50/90 border-b flex items-center justify-between z-10 backdrop-blur-md">
        <div>
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Route className="size-5 text-blue-600" />
            Bình đồ duỗi thẳng: {routeName}
          </h3>
          <p className="text-sm text-slate-500 mt-1">Đoạn tuyến: <span className="font-semibold text-slate-700">{formatKm(minMax.min)}</span> - <span className="font-semibold text-slate-700">{formatKm(minMax.max)}</span></p>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-slate-600 bg-white px-4 py-2 border rounded-full shadow-sm">
          <div className="flex items-center gap-2"><div className="size-3.5 rounded bg-emerald-500 border border-emerald-600"></div> Đã hoàn thành</div>
          <div className="flex items-center gap-2"><div className="size-3.5 rounded bg-blue-500 border border-blue-600"></div> Đang thi công</div>
          <div className="flex items-center gap-2"><div className="size-3.5 rounded bg-amber-500 border border-amber-600"></div> Chờ phê duyệt</div>
        </div>
      </div>
      
      {/* Scroll area using CSS standard for custom behavior as it's complex visually */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-100/50 custom-scrollbar relative">
        <div className="relative p-12 min-h-[400px] flex items-center" style={{ width: `${Math.max(totalWidth + 100, 800)}px` }}>
          
          {/* Main Road Track */}
          <div className="absolute inset-x-12 h-36 bg-slate-300/40 rounded border-y-[6px] border-slate-300 pointer-events-none">
            {/* Center dashed line */}
            <div className="absolute top-1/2 left-0 right-0 h-0 border-t-[3px] border-dashed border-white -translate-y-1/2"></div>
            
            {/* Start/End labels inside the track, far left/right */}
            <div className="absolute top-1/2 -left-3 -translate-x-full -translate-y-1/2 bg-slate-700 text-white text-[10px] px-2 py-1 rounded font-bold">{formatKm(minMax.min)}</div>
            <div className="absolute top-1/2 -right-3 translate-x-full -translate-y-1/2 bg-slate-700 text-white text-[10px] px-2 py-1 rounded font-bold">{formatKm(minMax.max)}</div>
          </div>

            {/* Render Items Layer - outside track so z-index works purely over the track */}
            <div className="absolute inset-x-12 h-36 border-transparent pointer-events-none z-20">
              {minMax.items.map((item) => {
                const isPoint = item._startM === item._endM;
                const width = Math.max((item._endM - item._startM) * pixelsPerMeter, isPoint ? 20 : 16);
                const left = (item._startM - minMax.min) * pixelsPerMeter - (isPoint ? width/2 : 0); // center point features
                
                return (
                  <div 
                    key={item.id}
                    className={`absolute ${getPositionClass(item.position)} ${getStatusColor(item.status, item.category)} rounded${isPoint ? '-full' : ''} shadow-md border group cursor-pointer hover:z-30 transition-all hover:scale-110 hover:brightness-110 flex items-center justify-center pointer-events-auto backdrop-blur-sm bg-opacity-90`}
                    style={{ left: `${left}px`, width: `${width}px` }}
                  >
                    {/* Subtle diagonal pattern overlay for texture if line */}
                    {!isPoint && <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#fff_2px,#fff_4px)] rounded pointer-events-none"></div>}
                    
                    {isPoint ? getCategoryIcon(item.category) : (
                      <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 truncate px-1 drop-shadow-md z-10 transition-opacity">
                        {width > 60 ? item.position : ""}
                      </span>
                    )}

                    {/* Hover Tooltip */}
                    <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-80 bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 transform group-hover:translate-y-0 translate-y-2">
                      <div className="font-bold text-base mb-1 text-blue-400">{item.title}</div>
                      <div className="text-slate-300 mb-3 truncate font-mono bg-slate-800 px-3 py-1.5 rounded-md mt-2 inline-block border border-slate-700 w-full text-center">
                        {isPoint ? (
                          <span className="text-amber-400">{item.startKm}</span>
                        ) : (
                          <>
                            <span className="text-amber-400">{item.startKm}</span> <span className="text-slate-500 mx-2">→</span> <span className="text-emerald-400">{item.endKm}</span> <br/>
                            <span className="text-slate-400 text-[10px]">(Khoảng cách: {item._endM - item._startM}m)</span>
                          </>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-slate-400 mt-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <span className="text-left font-medium">Vị trí:</span> 
                        <span className="text-white font-bold text-right">{item.position || "Toàn mặt đường"}</span>
                        
                        <span className="text-left font-medium">Loại:</span> 
                        <span className="text-white font-bold text-right">
                          {item.category === 'asset' ? 'Công trình PT' : item.category === 'legal' ? 'Văn bản PL' : 'Bảo trì'}
                        </span>
                        
                        {item.status && (
                          <>
                            <span className="text-left font-medium">Trạng thái:</span> 
                            <span className={`font-bold text-right ${item.status === 'completed' ? 'text-emerald-400' : item.status === 'ongoing' ? 'text-blue-400' : 'text-amber-400'}`}>
                              {item.status === "completed" ? "Hoàn thành" : item.status === "ongoing" ? "Đang thi công" : "Chờ duyệt"}
                            </span>
                          </>
                        )}
                      </div>
                    
                    {/* Tooltip Chevron */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-slate-900"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Markers / Ruler Top */}
          <div className="absolute top-20 left-12 right-12 h-6 pointer-events-none opacity-60">
            {marks.map(m => {
              const left = (m - minMax.min) * pixelsPerMeter;
              return (
                <div key={m} className="absolute h-full flex flex-col items-center" style={{ left: `${left}px` }}>
                  <div className="text-[9px] font-bold text-slate-500 mb-1 whitespace-nowrap bg-white px-1 rounded-sm">{formatKm(m)}</div>
                  <div className="w-[1px] h-4 bg-slate-400"></div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-top: 1px solid #e2e8f0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 6px;
          border: 3px solid #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};
