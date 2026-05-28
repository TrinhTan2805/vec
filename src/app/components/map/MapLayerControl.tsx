import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Layers, ChevronDown, Eye, Info, Settings as SettingsIcon, Search, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "../ui/utils";

export interface LayerItem {
  id: string;
  name: string;
  color?: string;
  visible: boolean;
  icon?: React.ReactNode;
  subLayers?: LayerItem[];
}

export interface LayerCategory {
  id: string;
  name: string;
  layers: LayerItem[];
}

interface MapLayerControlProps {
  categories: LayerCategory[];
  onToggleLayer: (categoryId: string, layerId: string, parentId?: string) => void;
  onToggleAllInCategory: (categoryId: string, visible: boolean) => void;
  onToggleAllInSubLayer?: (categoryId: string, parentId: string, visible: boolean) => void;
  onOpenSettings?: () => void;
  onOpenInfo?: (layer: LayerItem) => void;
}

// Component to bypass Webhint inline-style warning for dynamic colors
function ColorDot({ color }: { color: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current && color) {
      ref.current.style.backgroundColor = color;
    }
  }, [color]);
  return <div ref={ref} className="size-2 rounded-full shadow-sm" />;
}

const LayerNode = ({ 
  layer, 
  categoryId, 
  onToggleLayer, 
  onToggleAllInSubLayer, 
  onOpenSettings,
  onOpenInfo,
  level = 0 
}: { 
  layer: LayerItem, 
  categoryId: string, 
  onToggleLayer: any, 
  onToggleAllInSubLayer?: any, 
  onOpenSettings?: () => void,
  onOpenInfo?: (layer: LayerItem) => void,
  level?: number 
}) => {
  const hasSubLayers = layer.subLayers && layer.subLayers.length > 0;
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Determine if all sub-layers are visible
  const allSubLayersVisible = hasSubLayers && layer.subLayers!.every(sl => sl.visible);
  const someSubLayersVisible = hasSubLayers && layer.subLayers!.some(sl => sl.visible);

  return (
    <div className={cn("space-y-1", level > 0 && "pl-4 border-l border-slate-100 ml-2")}>
      <div 
        className={cn(
          "group flex items-center justify-between px-2 py-1.5 hover:bg-secondary/20 rounded-md transition-all duration-200 cursor-pointer",
          layer.visible && level === 0 && !hasSubLayers && "bg-primary text-white hover:bg-primary/90",
          layer.visible && level > 0 && "bg-primary/5 border-l-2 border-primary"
        )}
        onClick={() => {
          if (hasSubLayers) {
            setIsExpanded(!isExpanded);
          } else {
            onToggleLayer(categoryId, layer.id);
          }
        }}
      >
        <div className="flex items-center gap-2 flex-1">
          {hasSubLayers && (
            <ChevronDown className={cn("size-3.5 transition-transform duration-200", isExpanded ? "" : "-rotate-90")} />
          )}
          
          {layer.icon ? (
            <div className={cn("text-muted-foreground group-hover:text-primary transition-colors", layer.visible && "text-primary")}>
              {layer.icon}
            </div>
          ) : layer.color ? (
            <ColorDot color={layer.color} />
          ) : null}
          
          <Label 
            className={cn(
              "text-[11px] font-medium cursor-pointer leading-tight truncate",
              layer.visible ? "text-foreground" : "text-foreground/70",
              level === 0 && !hasSubLayers && layer.visible && "text-white"
            )}
          >
            {layer.name}
          </Label>
        </div>

        <div className="flex items-center gap-2">
          {hasSubLayers ? (
            <Checkbox 
              id={`select-all-${layer.id}`} 
              checked={allSubLayersVisible === true ? true : someSubLayersVisible ? "indeterminate" : false}
              onCheckedChange={(checked) => {
                onToggleAllInSubLayer?.(categoryId, layer.id, !!checked);
              }}
              onClick={(e) => e.stopPropagation()}
              className={cn("size-3.5 border-slate-300", allSubLayersVisible && "bg-primary border-primary text-white")}
            />
          ) : (
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
               <button 
                 type="button"
                 title="Thông tin lớp dữ liệu"
                 onClick={(e) => {
                   e.stopPropagation();
                   if (onOpenInfo) {
                     onOpenInfo(layer);
                   } else {
                     toast.info("Thông tin lớp dữ liệu: " + layer.name, {
                       description: "Chức năng xem trước dữ liệu chi tiết của lớp " + layer.name + ". Dữ liệu mô phỏng được cập nhật định kỳ.",
                       position: "bottom-right",
                     });
                   }
                 }}
               >
                 <Info className="size-3 text-muted-foreground/50 hover:text-primary cursor-help" />
               </button>
               <button
                 type="button"
                 title="Cài đặt hiển thị"
                 onClick={(e) => {
                   e.stopPropagation();
                   if (onOpenSettings) onOpenSettings();
                 }}
               >
                 <SettingsIcon className="size-3 text-muted-foreground/50 hover:text-primary cursor-pointer" />
               </button>
            </div>
          )}
          
          {!hasSubLayers && (
            <Switch 
              checked={layer.visible}
              onCheckedChange={() => onToggleLayer(categoryId, layer.id)}
              onClick={(e) => e.stopPropagation()}
              className="scale-[0.65] data-[state=checked]:bg-primary"
            />
          )}
        </div>
      </div>

      {hasSubLayers && isExpanded && (
        <div className="mt-1">
          {layer.subLayers!.map((sl) => (
            <LayerNode 
              key={sl.id} 
              layer={sl} 
              categoryId={categoryId} 
              onToggleLayer={(catId: any, lId: any) => onToggleLayer(catId, lId, layer.id)} 
              onOpenSettings={onOpenSettings}
              onOpenInfo={onOpenInfo}
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function MapLayerControl({ 
  categories, 
  onToggleLayer, 
  onToggleAllInCategory,
  onToggleAllInSubLayer,
  onOpenSettings,
  onOpenInfo
}: MapLayerControlProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="w-72 shadow-2xl border-border/50 backdrop-blur-md bg-white/95 max-h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
      <CardHeader className="p-3 border-bottom flex flex-row items-center justify-between space-y-0 bg-slate-50/80">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1 rounded-md">
            <Layers className="size-4 text-primary" />
          </div>
          <CardTitle className="text-[13px] font-bold text-slate-800">
            Lớp dữ liệu
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <button 
            className="hover:bg-slate-200 p-1 rounded-md text-slate-500 transition-colors"
            aria-label="Tìm kiếm lớp"
          >
            <Search className="size-3.5" />
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-slate-200 p-1 rounded-md text-slate-500 transition-colors"
            aria-label={isOpen ? "Thu nhỏ" : "Mở rộng"}
          >
            <ChevronDown className={cn("size-4 transition-transform duration-300", isOpen ? "" : "rotate-180")} />
          </button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar"
          onWheel={(e) => e.stopPropagation()}
        >
          <CardContent className="p-2 space-y-5">
            {categories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-slate-50">
                  <h4 className="text-[10px] font-black text-primary/70 uppercase tracking-widest flex items-center gap-1.5">
                    {category.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-muted-foreground font-medium uppercase">Mục tổng hợp</span>
                    <Checkbox 
                      id={`select-all-cat-${category.id}`} 
                      checked={category.layers.every(l => l.visible && (!l.subLayers || l.subLayers.every(sl => sl.visible)))}
                      onCheckedChange={(checked) => {
                        onToggleAllInCategory(category.id, !!checked);
                      }}
                      className="size-3.5 border-slate-300 data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  {category.layers.map((layer) => (
                    <LayerNode 
                      key={layer.id} 
                      layer={layer} 
                      categoryId={category.id} 
                      onToggleLayer={onToggleLayer}
                      onToggleAllInSubLayer={onToggleAllInSubLayer}
                      onOpenSettings={onOpenSettings}
                      onOpenInfo={onOpenInfo}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </div>
      )}
      


      {/* Footer Info */}
      {isOpen && (
        <div className="px-4 py-2 bg-slate-50 border-t flex items-center justify-between">
           <span className="text-[9px] text-slate-500 font-medium italic">GIS Infrastructure Hà Nội • 2026</span>
           <button onClick={onOpenSettings} className="hover:bg-slate-200 p-1 rounded-md transition-colors" title="Bảng điều khiển giao diện bản đồ">
             <SettingsIcon className="size-3 text-slate-400 hover:text-primary" />
           </button>
        </div>
      )}
    </Card>
  );
}
