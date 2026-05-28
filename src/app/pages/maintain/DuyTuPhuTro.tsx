import React, { useState, useEffect } from "react";
import { Plus, FileDown, Search, Edit, Trash2, Eye, MapPin, Hammer, Calendar, Building2, CircleDot, Layers, GitMerge, Route as RouteIcon, Shield, Wrench, Waves, Navigation, LayoutDashboard, Map as MapIcon, X, Save, Settings } from "lucide-react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { ScrollArea } from "../../components/ui/scroll-area";
import { cn } from "../../components/ui/utils";

// Specialized Groups Data Configuration
const GROUP_CONFIG: Record<string, { title: string, tabs: { id: string, label: string, icon: any }[] }> = {
  "cau-ham": {
    title: "Nhóm Công trình Cầu & Hầm",
    tabs: [
      { id: "cau", label: "Cầu", icon: <Building2 className="size-4" /> },
      { id: "ham", label: "Hầm", icon: <CircleDot className="size-4" /> },
      { id: "thiet-bi", label: "Thiết bị trong hầm", icon: <Layers className="size-4" /> },
      { id: "chung", label: "Chung", icon: <Shield className="size-4" /> },
    ]
  },
  "ket-cau-phu-tro": {
    title: "Nhóm Kết cấu Đường bộ & Phụ trợ",
    tabs: [
      { id: "be-mat", label: "Bề mặt & Lề đường", icon: <RouteIcon className="size-4" /> },
      { id: "hanh-lang", label: "Hành lang & Bảo vệ", icon: <Shield className="size-4" /> },
      { id: "thoat-nuoc", label: "Thoát nước", icon: <Waves className="size-4" /> },
      { id: "ve-sinh", label: "Vệ sinh", icon: <Hammer className="size-4" /> },
    ]
  },
  "bao-hieu-chi-dan": {
    title: "Nhóm Hệ thống Báo hiệu & Chỉ dẫn",
    tabs: [
      { id: "bien-bao", label: "Biển báo", icon: <CircleDot className="size-4" /> },
      { id: "coc-tieu", label: "Cọc tiêu & Mốc", icon: <Navigation className="size-4" /> },
      { id: "khac", label: "Khác", icon: <Layers className="size-4" /> },
    ]
  },
  "tin-hieu-camera": {
    title: "Nhóm Hệ thống Đèn tín hiệu & Camera",
    tabs: [
      { id: "den", label: "Đèn tín hiệu", icon: <CircleDot className="size-4" /> },
      { id: "camera", label: "Camera", icon: <Eye className="size-4" /> },
    ]
  },
  "giao-cat-khac": {
    title: "Nhóm Giao cắt & Công trình khác",
    tabs: [
      { id: "duong-sat", label: "Đường sắt", icon: <GitMerge className="size-4" /> },
      { id: "chung", label: "Chung", icon: <Plus className="size-4" /> },
    ]
  },
  "phu-tro": {
    title: "Duy tu công trình phụ trợ",
    tabs: [
      { id: "all", label: "Tất cả hạng mục", icon: <Hammer className="size-4" /> },
    ]
  }
};

// Danh sách 59 hạng mục lịch sử duy tu phân loại theo Tab/Nhóm
const MAINTENANCE_ITEMS_BY_TAB: Record<string, string[]> = {
  // Cầu & Hầm
  "cau": [
    "Mố cầu",
    "Trụ cầu",
    "Gối cầu",
    "Cầu khác (cầu nhỏ, trung; cầu vượt nhẹ; cầu đi bộ)",
    "Dầm cầu",
    "Bản mặt cầu",
    "Khung thép cầu",
    "Khe co giãn"
  ],
  "ham": [
    "Hầm đường bộ",
    "Cửa sắt của hầm",
    "Kính của hầm"
  ],
  "thiet-bi": [
    "Máy bơm của hầm",
    "Quạt thông gió của hầm",
    "Hệ thống điện của hầm",
    "Đèn tích điện của hầm",
    "Bình cứu hỏa của hầm",
    "Cảm biến khí độc, bụi"
  ],
  "chung": [
    "Lan can cầu, hầm",
    "Đèn cầu, hầm",
    "Hạng mục duy tu khác"
  ],

  // Kết cấu & Phụ trợ
  "be-mat": [
    "Mặt đường bộ",
    "Lề đường",
    "Lối rẽ"
  ],
  "hanh-lang": [
    "Kè",
    "Tường chắn",
    "Taluy",
    "Phát quang"
  ],
  "thoat-nuoc": [
    "Rãnh nước",
    "Cống",
    "Hố ga",
    "Hệ thống thoát nước trên cầu, đường trên cao"
  ],
  "ve-sinh": [
    "Phát quang",
    "Vệ sinh mặt đường",
    "Thu gom rác dọc tuyến"
  ],

  // Báo hiệu & Chỉ dẫn
  "bien-bao": [
    "Biển báo đường bộ",
    "Cột biển báo đường bộ",
    "Giá long môn",
    "Cột cần vươn"
  ],
  "coc-tieu": [
    "Cọc tiêu",
    "Đinh phản quang",
    "Tiêu phản quang",
    "Cột Km",
    "Cọc H",
    "Mốc lộ giới"
  ],
  "khac": [
    "Gương cầu lồi",
    "Dải phân cách",
    "Bó vỉa",
    "Ụ chống va xô",
    "Lan can phòng hộ",
    "Hàng rào",
    "Tấm chống chói",
    "Tấm chống ồn",
    "Vạch kẻ đường",
    "Gồ giảm tốc",
    "Đảo giao thông"
  ],

  // Đèn & Camera
  "den": [
    "Nút đèn tín hiệu giao thông",
    "Cột đèn tín hiệu giao thông",
    "Đèn tín hiệu giao thông",
    "Tủ điều khiển tín hiệu"
  ],
  "camera": [
    "Nút camera giao thông",
    "Cột camera giao thông",
    "Camera giao thông",
    "Biển điện tử VMS"
  ],

  // Giao cắt khác
  "duong-sat": [
    "Đường ngang (giao cắt đường sắt)",
    "Chắn đường ngang",
    "Nhà gác"
  ]
};

// Hàm hỗ trợ lọc động danh sách hạng mục duy tu theo Tab hoặc Nhóm đang chọn
const getMaintenanceItems = (tab: string, currentPath: string): string[] => {
  if (tab && tab !== "all" && MAINTENANCE_ITEMS_BY_TAB[tab]) {
    return MAINTENANCE_ITEMS_BY_TAB[tab];
  }
  
  if (currentPath && currentPath !== "phu-tro") {
    const groupTabs = GROUP_CONFIG[currentPath]?.tabs || [];
    const items: string[] = [];
    groupTabs.forEach(t => {
      if (MAINTENANCE_ITEMS_BY_TAB[t.id]) {
        items.push(...MAINTENANCE_ITEMS_BY_TAB[t.id]);
      }
    });
    if (items.length > 0) return items;
  }
  
  return Object.values(MAINTENANCE_ITEMS_BY_TAB).flat();
};

const MOCK_DATA: any[] = [
  // Cầu & Hầm
  { id: "CH-001", group: "cau-ham", tab: "cau", assetName: "Cầu Nhật Tân", itemType: "Mố cầu", location: "Mố M1", quantity: 1, unit: "Cái", startDate: "2026-02-01", endDate: "2026-02-28", status: "completed", toaDo: [21.052, 105.823] },
  { id: "CH-002", group: "cau-ham", tab: "ham", assetName: "Hầm Kim Liên", itemType: "Vệ sinh kính hầm", location: "Toàn hầm", quantity: 1200, unit: "m2", startDate: "2026-03-05", endDate: "2026-04-05", status: "ongoing", toaDo: [21.011, 105.901] },
  { id: "CH-003", group: "cau-ham", tab: "thiet-bi", assetName: "Hầm Thủ Thiêm", itemType: "Sửa máy bơm", location: "Trạm bơm số 1", quantity: 2, unit: "Bộ", startDate: "2026-04-01", endDate: "2026-04-30", status: "pending", toaDo: [21.077, 105.748] },
  
  // Kết cấu & Phụ trợ (from image 3)
  { id: "PT-001", group: "ket-cau-phu-tro", tab: "be-mat", assetName: "Quốc lộ 1A", itemType: "Biển báo giao thông", location: "Km10+200", quantity: 12, unit: "Cái", startDate: "2026-02-01", endDate: "2026-02-28", status: "completed", toaDo: [21.082, 105.811] },
  { id: "PT-002", group: "ket-cau-phu-tro", tab: "hanh-lang", assetName: "Quốc lộ 5", itemType: "Lan can phòng hộ", location: "Km22+000 – Km22+500", quantity: 500, unit: "m", startDate: "2026-03-05", endDate: "2026-04-05", status: "ongoing", toaDo: [20.985, 105.981] },
  { id: "PT-003", group: "ket-cau-phu-tro", tab: "coc-tieu", assetName: "Quốc lộ 32", itemType: "Cọc tiêu", location: "Km5+000 – Km6+500", quantity: 150, unit: "Cái", startDate: "2026-04-01", endDate: "2026-04-30", status: "pending", toaDo: [21.037, 105.858] },

  // Báo hiệu & Chỉ dẫn
  { id: "BH-001", group: "bao-hieu-chi-dan", tab: "bien-bao", assetName: "Đường Giải Phóng", itemType: "Biển điện tử VMS", location: "Ngã tư Vọng", quantity: 1, unit: "Cái", startDate: "2026-05-01", endDate: "2026-05-15", status: "planned", toaDo: [21.010, 105.845] },
  
  // Đèn & Camera
  { id: "TC-001", group: "tin-hieu-camera", tab: "den", assetName: "Ngã tư Sở", itemType: "Tủ điều khiển đèn", location: "Góc Tây Nam", quantity: 1, unit: "Tủ", startDate: "2026-06-01", endDate: "2026-06-10", status: "scheduled", toaDo: [21.006, 105.821] },
];

export default function DuyTuPhuTro() {
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "phu-tro";
  const config = GROUP_CONFIG[path] || GROUP_CONFIG["phu-tro"];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUseCase, setActiveUseCase] = useState("");
  
  const [viewMode, setViewMode] = useState<"list" | "map" | "plan">("list");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Get all Use Cases grouped by Tab for the current path
  const allUseCasesInGroup = React.useMemo(() => {
    return config.tabs.map(tab => ({
      tabId: tab.id,
      tabLabel: tab.label,
      tabIcon: tab.icon,
      items: MAINTENANCE_ITEMS_BY_TAB[tab.id] || []
    }));
  }, [config]);

  // Update active Use Case when path changes
  useEffect(() => {
    if (allUseCasesInGroup.length > 0 && allUseCasesInGroup[0].items.length > 0) {
      setActiveUseCase(allUseCasesInGroup[0].items[0]);
    }
  }, [path, allUseCasesInGroup]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200 shadow-none">Đã hoàn thành</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 shadow-none">Đang thi công</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 shadow-none">Chờ phê duyệt</Badge>;
      case "planned":
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200 shadow-none">Dự kiến</Badge>;
      case "scheduled":
        return <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 shadow-none">Đã có kế hoạch</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredItems = MOCK_DATA.filter(item => 
    (path === "phu-tro" || item.group === path) && 
    (activeUseCase === "" || item.itemType === activeUseCase || item.itemType === "Mố cầu" || item.itemType === "Vệ sinh kính hầm") 
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* LEFT SIDEBAR: Use Case Navigation */}
      <Card className="w-full md:w-[320px] shrink-0 flex flex-col overflow-hidden border-slate-200 shadow-sm bg-white rounded-xl">
        <div className="p-4 border-b bg-slate-50/80">
          <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2 leading-tight">
            <Hammer className="size-4 text-blue-600 shrink-0" /> {config.title}
          </h2>
          <div className="relative mt-3">
            <Search className="absolute left-2.5 top-2.5 size-4 text-slate-400" />
            <Input 
              placeholder="Tìm hạng mục nghiệm thu..." 
              className="pl-9 h-9 text-sm bg-white border-slate-200 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1 bg-white">
          <div className="p-3 space-y-6">
            {allUseCasesInGroup.map(group => {
              const filteredItems = group.items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
              if (filteredItems.length === 0) return null;
              
              return (
                <div key={group.tabId}>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-2 flex items-center gap-2">
                    {group.tabIcon} {group.tabLabel}
                  </h3>
                  <div className="space-y-1">
                    {filteredItems.map(uc => {
                      const isActive = activeUseCase === uc;
                      return (
                        <button
                          key={uc}
                          onClick={() => setActiveUseCase(uc)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center justify-between group",
                            isActive 
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-600" 
                              : "hover:bg-slate-50 text-slate-600"
                          )}
                        >
                          <span className="truncate pr-2 leading-snug">{uc}</span>
                          <Badge variant="outline" className={cn(
                            "ml-auto text-[9px] px-1.5 py-0 min-w-[20px] justify-center transition-colors shadow-none font-bold",
                            isActive ? "border-white/20 bg-white/20 text-white" : "border-slate-200 text-slate-400 group-hover:bg-white group-hover:border-slate-300"
                          )}>
                            {Math.floor((uc.length * 3) % 12)}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Header KPI & Stepper for selected UC */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0 flex flex-col gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
            <Layers className="size-48" />
          </div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-600 mb-1.5 font-bold uppercase tracking-widest">
                <Shield className="size-4" /> Bảng điều khiển Nghiệm thu
              </div>
              <h1 className="text-xl font-black text-slate-900 leading-tight tracking-tight">
                {activeUseCase || "Chọn hạng mục cần nghiệm thu"}
              </h1>
              <p className="text-xs text-slate-500 mt-1">Hồ sơ thiết kế, hoàn công và biên bản nghiệm thu chất lượng</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => { setSelectedItem(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 h-9 px-5 font-bold text-xs">
                <Plus className="mr-2 size-4" /> Thêm hồ sơ
              </Button>
            </div>
          </div>
          
          {/* Stepper Mockup */}
          <div className="pt-4 border-t border-slate-100 relative z-10">
            <div className="flex items-center justify-between relative px-8 max-w-2xl mx-auto">
              <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[65%] rounded-full"></div>
              </div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-2 w-20">
                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 ring-4 ring-white"><Calendar className="size-3.5" /></div>
                <span className="text-[10px] font-bold text-slate-700 text-center uppercase tracking-wider">Kế hoạch</span>
              </div>
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-2 w-20">
                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 ring-4 ring-white"><Hammer className="size-3.5" /></div>
                <span className="text-[10px] font-bold text-slate-700 text-center uppercase tracking-wider">Thi công</span>
              </div>
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center gap-2 w-20">
                <div className="size-8 rounded-full bg-blue-50 border-2 border-blue-600 text-blue-600 flex items-center justify-center ring-4 ring-white"><Search className="size-3.5" /></div>
                <span className="text-[10px] font-bold text-blue-700 text-center uppercase tracking-wider">Kiểm định</span>
              </div>
              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center gap-2 w-20">
                <div className="size-8 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-400 flex items-center justify-center ring-4 ring-white"><FileDown className="size-3.5" /></div>
                <span className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider">Nghiệm thu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar & Filter */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex items-center rounded-lg border p-1 bg-white shadow-sm">
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 shadow-none text-xs"><LayoutDashboard className="h-3.5 w-3.5 mr-2" /> Danh sách</Button>
            <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 shadow-none text-xs"><MapIcon className="h-3.5 w-3.5 mr-2" /> Bản đồ</Button>
            <Button variant={viewMode === "plan" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("plan")} className="h-8 shadow-none text-xs"><RouteIcon className="h-3.5 w-3.5 mr-2" /> Bình đồ</Button>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
              <Input placeholder="Tìm mã hồ sơ..." className="pl-8 w-56 bg-white border-slate-200 shadow-sm h-9 text-xs" />
            </div>
            <Button variant="outline" className="bg-white h-9 font-medium text-xs"><FileDown className="mr-2 size-3.5" /> Báo cáo</Button>
          </div>
        </div>

        {/* Data Table Area */}
        {viewMode === "list" && (
          <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 shadow-sm bg-white rounded-xl">
             <CardContent className="p-0 flex-1 overflow-auto">
                <Table>
                  <TableHeader className="bg-slate-50/80 sticky top-0 z-10 shadow-sm">
                    <TableRow>
                      <TableHead className="w-[60px] text-center font-bold text-slate-700 text-xs">STT</TableHead>
                      <TableHead className="min-w-[150px] font-bold text-slate-700 text-xs">Tuyến đường</TableHead>
                      <TableHead className="min-w-[150px] font-bold text-slate-700 text-xs">Vị trí thi công</TableHead>
                      <TableHead className="font-bold text-slate-700 text-xs">Khối lượng</TableHead>
                      <TableHead className="font-bold text-slate-700 text-xs">Khởi công</TableHead>
                      <TableHead className="font-bold text-slate-700 text-xs">Tình trạng</TableHead>
                      <TableHead className="text-right w-[120px] font-bold text-slate-700 text-xs">Hồ sơ Kỹ thuật</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                      <TableRow key={item.id} className="hover:bg-blue-50/30 transition-colors">
                        <TableCell className="text-center font-medium text-slate-500 text-xs">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-md bg-blue-50 flex items-center justify-center text-blue-600"><MapPin className="size-3.5" /></div>
                            <div>
                              <p className="font-bold text-slate-900 text-xs">{item.assetName}</p>
                              <p className="text-[9px] text-slate-500 uppercase tracking-widest">{item.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-700 text-xs">{item.location}</TableCell>
                        <TableCell className="font-bold text-slate-900 text-xs">{item.quantity} {item.unit}</TableCell>
                        <TableCell className="text-slate-600 text-xs">{item.startDate}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold text-xs" onClick={() => { setSelectedItem(item); setIsDetailOpen(true); }}>
                            <Eye className="size-3.5 mr-1.5" /> Chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-[200px] text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Layers className="size-8 text-slate-300" />
                            <p className="text-sm">Chưa có hồ sơ nghiệm thu nào cho hạng mục này.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
             </CardContent>
          </Card>
        )}
        
        {viewMode === "map" && (
          <Card className="flex-1 overflow-hidden border-slate-200 shadow-sm rounded-xl">
            <SimpleMapView />
          </Card>
        )}

        {viewMode === "plan" && (
          <Card className="flex-1 flex items-center justify-center border-slate-200 shadow-sm bg-slate-50 rounded-xl">
            <div className="text-center text-slate-500">
              <RouteIcon className="size-12 mx-auto mb-4 text-slate-300" />
              <p>Bản vẽ bình đồ hoàn công đang được cập nhật...</p>
            </div>
          </Card>
        )}
      </div>

      {/* ===== DIALOGS ===== */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl p-0 gap-0 overflow-hidden bg-white rounded-xl">
          <DialogHeader className="p-5 border-b bg-slate-50/50">
            <DialogTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-sm shadow-blue-500/30">
                <Hammer className="size-4" />
              </div>
              {selectedItem ? "Chỉnh sửa hồ sơ sửa chữa" : "Thêm mới hồ sơ nghiệm thu"}
            </DialogTitle>
          </DialogHeader>
          <div className="p-8 h-[30vh] flex flex-col items-center justify-center text-slate-500 gap-4">
            <Settings className="size-10 text-slate-300 animate-spin-slow" />
            <p className="font-medium text-sm">Tính năng nhập liệu chi tiết đang được phát triển...</p>
          </div>
          <DialogFooter className="p-4 px-5 border-t bg-slate-50/50 shrink-0">
            <Button variant="outline" className="h-9 px-6 border-slate-200 font-semibold text-xs" onClick={() => setIsFormOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedItem && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="w-[95vw] max-w-2xl rounded-xl p-0 overflow-hidden">
            <DialogHeader className="p-5 border-b bg-slate-50/50">
              <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Shield className="size-5 text-blue-600" /> Hồ sơ Kỹ thuật: {selectedItem.itemType}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-6 bg-white">
              {[
                { label: "Mã hồ sơ", value: selectedItem.id },
                { label: "Tuyến đường", value: selectedItem.assetName },
                { label: "Vị trí thi công", value: selectedItem.location },
                { label: "Khối lượng", value: `${selectedItem.quantity} ${selectedItem.unit}` },
                { label: "Khởi công", value: selectedItem.startDate },
                { label: "Nghiệm thu dự kiến", value: selectedItem.endDate },
              ].map(f => (
                <div key={f.label} className="border-b border-slate-100 pb-2">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{f.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{f.value}</p>
                </div>
              ))}
            </div>
            <DialogFooter className="p-4 px-6 border-t bg-slate-50/50">
              <Button variant="outline" className="h-9 px-6 font-semibold text-xs" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <DeleteDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} selectedCard={{ title: "Hồ sơ duy tu bảo trì" }} selectedItem={null} onConfirmDelete={() => {}} />
    </div>
  );
}
