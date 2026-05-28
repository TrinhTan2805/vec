import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { TriangleAlert, Info, PenTool, AlertOctagon, FileText, Download } from "lucide-react";
import { Button } from "../ui/button";
import { useMemo } from "react";

export interface StraightLinePoint {
  km: number;
  label: string;
  type: "sign_warning" | "sign_info" | "sign_danger" | "bridge" | "tunnel" | "intersection" | "crossing" | "none";
  side?: "top" | "bottom" | "center";
}

export interface StraightLineSegment {
  startKm: number;
  endKm: number;
  label: string;
  type: "repair" | "defect" | "layer";
  color?: string;
  position?: "top" | "bottom" | "center";
}

interface StraightLineDiagramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  startKm?: number;
  endKm?: number;
  points: StraightLinePoint[];
  segments?: StraightLineSegment[];
}

export function StraightLineDiagramDialog({ 
  open, 
  onOpenChange, 
  title, 
  startKm = 10, // Default for demo
  endKm = 15,
  points, 
  segments = [] 
}: StraightLineDiagramDialogProps) {
  
  const totalLength = Math.max(endKm - startKm, 1);
  const PIXELS_PER_KM = 800;
  const containerWidth = totalLength * PIXELS_PER_KM;

  const renderIcon = (type: string) => {
    switch (type) {
      case "sign_warning": return <TriangleAlert className="size-4 text-amber-500 fill-amber-100" />;
      case "sign_info": return <Info className="size-4 text-blue-500 fill-blue-100" />;
      case "sign_danger": return <AlertOctagon className="size-4 text-red-500 fill-red-100" />;
      case "bridge": return <span className="font-black text-[10px]">CẦU</span>;
      case "tunnel": return <span className="font-black text-[10px]">HẦM</span>;
      default: return <div className="w-2 h-2 rounded-full bg-slate-500" />;
    }
  };

  // Generate hectometer marks and km posts array
  const lengthMarkers = useMemo(() => {
    const marks = [];
    const minKm = Math.floor(startKm);
    const maxKm = Math.ceil(endKm);
    
    for (let k = minKm; k <= maxKm; k++) {
      if (k >= startKm && k <= endKm) {
        marks.push({ type: 'km', val: k, title: `Km ${k}` });
      }
      for (let h = 1; h < 10; h++) {
        const val = k + h * 0.1;
        if (val > startKm && val < endKm) {
          marks.push({ type: 'hm', val, title: h.toString() });
        }
      }
    }
    return marks;
  }, [startKm, endKm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full max-h-[95vh] overflow-hidden flex flex-col p-0 border-0 bg-slate-100">
        <DialogHeader className="p-4 border-b bg-white shadow-sm shrink-0 flex flex-row items-center justify-between">
          <div>
            <Badge className="mb-2 bg-blue-600 hover:bg-blue-700">DỮ LIỆU SỐ HÓA</Badge>
            <DialogTitle className="text-xl font-bold text-slate-800">{title}</DialogTitle>
          </div>
          <div className="flex bg-slate-800 text-white rounded-md flex-col text-xs p-2 px-4 space-y-1 opacity-90 shadow-lg border border-slate-700">
            <div className="flex justify-between gap-6">
              <span className="text-slate-300">TỶ LỆ</span>
              <span className="font-bold font-mono">1:5.000</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-slate-300">TỔNG TÀI SẢN</span>
              <span className="font-bold font-mono">{points.length}</span>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto relative bg-[#cbd5e1] p-10 pb-20 custom-scrollbar">
          {/* Main Container scrolling horizontally */}
          <div 
            className="relative h-[400px] mt-10 transition-all duration-300"
            style={{ width: `${containerWidth}px` }}
          >
            {/* The Road Surface */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[140px] bg-[#222222] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col justify-center border-y-2 border-slate-400">
              {/* Lane lines */}
              <div className="absolute top-[20%] left-0 right-0 border-b-2 border-dashed border-white/20 h-px" />
              {/* Center Line directly in middle */}
              <div className="w-full border-b-[3px] border-amber-400" />
              <div className="absolute bottom-[20%] left-0 right-0 border-b-2 border-dashed border-white/20 h-px" />
              
              {/* Render segments (Hư hỏng mặt đường) */}
              {segments.map((seg, i) => {
                const sLeft = ((seg.startKm - startKm) / totalLength) * 100;
                const sWidth = ((seg.endKm - seg.startKm) / totalLength) * 100;
                const isBottom = seg.position === "bottom";
                const isTop = seg.position === "top";
                
                return (
                  <div 
                    key={i}
                    className="absolute bg-emerald-500/80 rounded border border-emerald-400 group cursor-pointer hover:bg-emerald-400/90 hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all z-20 flex items-center justify-center p-1"
                    style={{ 
                      left: `${sLeft}%`, 
                      width: `${sWidth}%`, 
                      height: '35%',
                      backgroundColor: seg.color || '#10b981',
                      top: isTop ? '5%' : isBottom ? 'auto' : '32.5%',
                      bottom: isBottom ? '5%' : 'auto',
                    }}
                    title={seg.label}
                  >
                    <div className="text-[9px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis shadow-sm">{seg.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Scale lines/Background lines */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
              <div className="absolute top-[20%] left-0 right-0 border-b border-cyan-400/50" />
              <div className="absolute bottom-[20%] left-0 right-0 border-b border-red-500/40" />
              <div className="absolute top-[80%] left-0 right-0 bg-white/20 h-8 backdrop-blur-[1px]" />
            </div>

            {/* Hectometers and Km Posts */}
            {lengthMarkers.map((mark, i) => {
              const leftPos = ((mark.val - startKm) / totalLength) * 100;
              if (mark.type === 'km') {
                return (
                  <div key={`km-${i}`} className="absolute top-1/2 h-[70px] w-0 border-l-2 border-white/30" style={{ left: `${leftPos}%` }}>
                    <div className="absolute bottom-[40px] -translate-x-1/2 flex flex-col items-center">
                      <div className="bg-white rounded-t-full rounded-b-sm border border-slate-300 w-8 h-10 flex flex-col items-center justify-end pb-1 shadow-md z-10 overflow-hidden relative">
                        <div className="absolute top-0 w-full h-4 bg-red-600 rounded-t-full"></div>
                        <span className="text-[8px] font-black uppercase text-red-600 mt-1 leading-none">Km</span>
                        <span className="text-xs font-black text-slate-800 leading-none">{mark.val}</span>
                      </div>
                      <div className="w-1 h-3 bg-red-800/80 mt-1"></div>
                      <div className="text-red-500 font-bold text-[16px] mt-1 drop-shadow-md">{mark.val}</div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={`hm-${i}`} className="absolute top-1/2 h-full" style={{ left: `${leftPos}%` }}>
                    <div className="absolute top-[35px] -translate-x-1/2 bg-white/90 border border-red-500 rounded-[2px] w-4 h-5 flex items-center justify-center text-[10px] font-black text-red-600 z-10 shadow-sm">
                      {mark.title}
                    </div>
                  </div>
                );
              }
            })}

            {/* Points (Signs, bridges) */}
            {points.map((point, i) => {
              const leftPos = ((point.km - startKm) / totalLength) * 100;
              const isTop = point.side === "top" || i % 2 === 0;
              const isCenter = point.side === "center";
              
              if (isCenter) {
                return (
                  <div key={`p-${i}`} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-30" style={{ left: `${leftPos}%`, transform: 'translate(-50%, -50%)' }}>
                     <div className="bg-blue-600 border-2 border-white text-white p-1 rounded-md shadow-lg transform group-hover:scale-110 transition-transform">
                        {renderIcon(point.type)}
                     </div>
                     <Badge className="mt-2 bg-blue-500/90 text-[9px] pointer-events-none absolute top-full whitespace-nowrap">{point.label}</Badge>
                  </div>
                )
              }

              return (
                <div key={`p-${i}`} className={`absolute ${isTop ? "top-4" : "bottom-[-10px]"} flex flex-col items-center group cursor-pointer z-30`} style={{ left: `${leftPos}%`, transform: 'translateX(-50%)' }}>
                  {isTop ? (
                    <>
                      <div className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-1 rounded-full shadow-md whitespace-nowrap border-2 border-white mb-1 transition-colors">
                        {point.label}
                      </div>
                      <div className="w-0.5 h-12 bg-slate-400"></div>
                      <div className="bg-white p-1 rounded border shadow-sm mt-0 relative top-[-1px]">
                        {renderIcon(point.type)}
                      </div>
                      {/* Connection to road */}
                      <div className="w-0.5 h-8 bg-slate-300"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500 border border-white"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-amber-500 border border-white"></div>
                      <div className="w-0.5 h-6 bg-slate-300"></div>
                      <div className="bg-white p-1 rounded border shadow-sm relative bottom-[-1px]">
                        {renderIcon(point.type)}
                      </div>
                      <div className="w-0.5 h-8 bg-slate-400"></div>
                      <div className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[10px] font-medium px-2 py-1 rounded shadow-md whitespace-nowrap mt-1 transition-colors">
                        {point.label}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            
          </div>
          
          {/* Overlay Helper Text */}
          <div className="absolute right-10 bottom-10 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs pointer-events-none">
            Cuộn sang phải/trái để xem lý trình
          </div>

        </div>

        {/* Legend */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex gap-6 items-center">
            <span className="text-sm font-semibold text-slate-500">Ghi chú:</span>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div> Công trình phụ trợ
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <TriangleAlert className="size-3 text-amber-500" /> Văn bản pháp lý / Biển cảnh báo
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-6 h-3 rounded bg-emerald-500"></div> Sửa chữa, Bảo trì
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-6 h-3 rounded bg-red-500"></div> Mặt đường hư hỏng
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="size-4 mr-2" /> Tải bình đồ (PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
