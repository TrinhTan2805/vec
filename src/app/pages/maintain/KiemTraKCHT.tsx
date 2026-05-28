import React, { useState } from "react";
import { Plus, FileDown, Search, Edit, Trash2, Eye, MapPin, Map as MapIcon, Route, ShieldCheck, ClipboardCheck, AlertTriangle, CheckCircle2, Save, X, BarChart3, Upload, ImageIcon, Wrench, MessageSquare, Building2, Send, ClipboardList, Zap, ShieldAlert, ExternalLink } from "lucide-react";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../../components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../../components/ui/select";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";

// ====== Mock data per patrol type ======
const inspectionsRoad = [
  { id: "KT-D-001", objectName: "Quốc lộ 1A", objectType: "Tự thu quốc lộ", inspector: "Nguyễn Văn A", unit: "Hạt QLĐB 1", date: "2026-03-05", result: "qualified", violations: 0, note: "Tình trạng tốt", images: [] },
  { id: "KT-D-002", objectName: "Quốc lộ 32", objectType: "Quốc lộ", inspector: "Phạm Thị D", unit: "Hạt QLĐB 1", date: "2026-03-20", result: "qualified", violations: 0, note: "Bình thường", images: [] },
  { id: "KT-D-003", objectName: "Đường Vành đai 2", objectType: "Đường đô thị", inspector: "Tống Văn E", unit: "Hạt QLĐB 2", date: "2026-03-22", result: "warning", violations: 1, note: "Vỉa hè bị lấn chiếm", images: ["/infra/sidewalk_encroach.png"], inMaintenancePlan: true },
];

const inspectionsLight = [
  { id: "KT-L-001", objectName: "Nút giao Cầu Giấy", objectType: "Nút giao / Đèn", inspector: "Lê Văn C", unit: "Hạt QLĐB 1", date: "2026-03-10", result: "warning", violations: 1, note: "3 bộ đèn hỏng", images: ["/infra/tunnel_lights.png"], isReportedManager: true },
  { id: "KT-L-002", objectName: "Nút giao Ngã Tư Sở", objectType: "Nút giao / Đèn", inspector: "Trần Thị B", unit: "Hạt QLĐB 3", date: "2026-03-18", result: "qualified", violations: 0, note: "Hoạt động tốt", images: [] },
];

const inspectionsBridge = [
  { id: "KT-C-001", objectName: "Cầu Vĩnh Tuy", objectType: "Cầu lớn", inspector: "Trần Thị B", unit: "Hạt QLĐB 2", date: "2026-03-10", result: "violation", violations: 2, note: "Phát hiện lều quán trái phép", images: ["/infra/illegal_construction.png"] },
  { id: "KT-C-002", objectName: "Hầm Kim Liên", objectType: "Hầm", inspector: "Lê Văn C", unit: "Hạt QLĐB 3", date: "2026-03-15", result: "warning", violations: 1, note: "Đèn chiếu sáng hỏng 3 bộ", images: ["/infra/tunnel_lights.png"] },
  { id: "KT-C-003", objectName: "Cầu Nhật Tân", objectType: "Cầu lớn", inspector: "Phạm Thị D", unit: "Hạt QLĐB 2", date: "2026-03-25", result: "qualified", violations: 0, note: "Bình thường", images: [] },
];

const inspectionsCrossroad = [
  { id: "KT-X-001", crossroadName: "Đường ngang 1", objectName: "Đường ngang Giải Phóng", objectType: "Đường ngang", inspector: "Nguyễn Văn G", unit: "Hạt QLĐB 1", date: "2026-03-25", result: "qualified", violations: 0, note: "An toàn", images: [] },
];

const inspectionsWatchtower = [
  { id: "KT-W-001", watchtowerName: "Chòi gác 1", objectName: "Chòi gác Bắc Thăng Long", objectType: "Chòi gác", inspector: "Nguyễn Văn H", unit: "Hạt QLĐB 1", date: "2026-03-26", result: "qualified", violations: 0, note: "An toàn", images: [] },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tabDataMap: Record<string, any[]> = {
  road: inspectionsRoad,
  light: inspectionsLight,
  crossroad: inspectionsCrossroad,
  watchtower: inspectionsWatchtower,
  bridge: inspectionsBridge,
};

// ====== Mock data for Excel Report (PHỤ LỤC 2) ======
const reportCompaniesRoad = [
  // ... (keeping existing road data)
  {
    name: "1. CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY",
    items: [
      { type: "Tuyến đường", total: 308, checked: 285, uncheck: 23, count: 7156 },
      { type: "Cầu đi bộ", total: 10, checked: 10, uncheck: 0, count: 1120 },
      { type: "Cầu nhỏ", total: 71, checked: 33, uncheck: 38, count: 526 },
      { type: "Giao cắt đường sắt", total: 10, checked: 10, uncheck: 0, count: 7441 },
    ]
  },
  {
    name: "2. CÔNG TY CP QUẢN LÝ & ĐTXD ĐƯỜNG BỘ HÀ NỘI",
    items: [
      { type: "Tuyến đường", total: 83, checked: 83, uncheck: 0, count: 2092 },
      { type: "Cầu đi bộ", total: 1, checked: 1, uncheck: 0, count: 49 },
      { type: "Cầu nhỏ", total: 169, checked: 152, uncheck: 17, count: 329 },
      { type: "Cầu thép", total: 10, checked: 9, uncheck: 1, count: 34 },
    ]
  },
  {
    name: "3. CÔNG TY CP CÔNG TRÌNH GIAO THÔNG 2 HÀ NỘI",
    items: [
      { type: "Tuyến đường", total: 448, checked: 444, uncheck: 4, count: 15757 },
      { type: "Cầu đi bộ", total: 38, checked: 37, uncheck: 1, count: 11805 },
      { type: "Cầu nhỏ", total: 138, checked: 93, uncheck: 45, count: 2569 },
      { type: "Cầu thép", total: 9, checked: 8, uncheck: 1, count: 1645 },
      { type: "Hầm cơ giới", total: 6, checked: 6, uncheck: 0, count: 280 },
      { type: "Hầm đi bộ", total: 31, checked: 30, uncheck: 1, count: 20380 },
      { type: "Giao cắt đường sắt", total: 1, checked: 1, uncheck: 0, count: 707 },
    ]
  },
  {
    name: "4. CÔNG TY CP CÔNG TRÌNH GIAO THÔNG HÀ NỘI",
    items: [
      { type: "Tuyến đường", total: 850, checked: 814, uncheck: 36, count: 31160 },
      { type: "Cầu đi bộ", total: 36, checked: 36, uncheck: 0, count: 5304 },
      { type: "Cầu nhỏ", total: 71, checked: 66, uncheck: 5, count: 4821 },
      { type: "Cầu thép", total: 16, checked: 16, uncheck: 0, count: 2917 },
      { type: "Hầm cơ giới", total: 1, checked: 1, uncheck: 0, count: 998 },
      { type: "Hầm đi bộ", total: 6, checked: 6, uncheck: 0, count: 1372 },
    ]
  }
];

const reportLightData = [
  {
    intersection: "Giảng Võ - Láng Hạ",
    items: [
      { time: "08:30 10/03/2026", staff: "Nguyễn Văn A", location: "Tủ điều khiển kỹ thuật", weather: "Nắng, khô ráo", content: "Kiểm tra định kỳ thiết bị", action: "Hoạt động bình thường", review: "Đã xác nhận", note: "" },
      { time: "22:15 15/03/2026", staff: "Trần Thị B", location: "Cột đèn tín hiệu nhánh A", weather: "Mưa phùn", content: "Phát hiện bóng LED bị mờ", action: "Thay mới tại chỗ", review: "Đạt yêu cầu", note: "Theo dõi thêm" },
      { time: "14:00 22/03/2026", staff: "Lê Văn C", location: "Dây dẫn ngầm hố ga 2", weather: "Mây mù", content: "Đường dây có dấu hiệu hở", action: "Bọc lại băng keo cách điện", review: "Cần xử lý", note: "Đề xuất thay dây" },
      { time: "02:45 25/03/2026", staff: "Tống Văn E", location: "Toàn bộ nút giao", weather: "Trời tối", content: "Tuần tra đêm định kỳ", action: "Không phát hiện sự cố", review: "Đạt", note: "" },
    ]
  },
  {
    intersection: "Thái Hà - Chùa Bộc",
    items: [
      { time: "09:00 12/03/2026", staff: "Phạm Thị D", location: "Tủ điện P1", weather: "Bình thường", content: "Vệ sinh thiết bị", action: "Hoạt động ổn định", review: "Tốt", note: "" },
      { time: "16:30 18/03/2026", staff: "Nguyễn Văn A", location: "Đèn bộ đi bộ", weather: "Nắng", content: "Gãy tay vươn đèn", action: "Đã gia cố tạm thời", review: "Cần thay thế", note: "Kế hoạch tuần sau" },
    ]
  }
];

const reportCheckData = [
  {
    date: "10/03/2026",
    item: "Sửa chữa khe co giãn Cầu Vĩnh Tuy (mố M0)",
    mileage: { from: "Km1+200", to: "Km1+350", pos: "Phải tuyến" },
    status: "Khe co giãn bị nứt vỡ bê tông chèn, gây xóc cho phương tiện",
    estimate: "1.5 m3",
    inspectorOpinion: { request: "Đục bỏ bê tông cũ, đổ lại bê tông cường độ cao R28", time: "15/03/2026" },
    recipient: "Lãnh đạo Ban QLDA",
    results: { volume: "1.5 m3", quality: "Đạt", actualTime: "14/03/2026", media: "Video/Ảnh" }
  },
  {
    date: "18/03/2026",
    item: "Sơn kẻ vạch đường Nguyễn Chí Thanh (đoạn ngã tư)",
    mileage: { from: "Km0+500", to: "Km1+000", pos: "Toàn tuyến" },
    status: "Vạch sơn bị mờ, bong tróc do lưu lượng giao thông lớn",
    estimate: "250 m2",
    inspectorOpinion: { request: "Sơn lại bằng sơn dẻo nhiệt phản quang 3M", time: "25/03/2026" },
    recipient: "Đội duy tu số 1",
    results: { volume: "260 m2", quality: "Tốt", actualTime: "24/03/2026", media: "Có" }
  },
  {
    date: "22/03/2026",
    item: "Sửa chữa hộ lan tôn sóng QL32",
    mileage: { from: "Km12+400", to: "", pos: "Trái tuyến" },
    status: "Hộ lan bị biến dạng do va xô",
    estimate: "4 tấm",
    inspectorOpinion: { request: "Thay mới tấm hộ lan và nắn chỉnh trụ", time: "28/03/2026" },
    recipient: "Hạt QLĐB số 3",
    results: { volume: "4 tấm", quality: "Đạt", actualTime: "27/03/2026", media: "Ảnh" }
  }
];

// ===== Mock data for 5 action detail dialogs =====
const mkPatrol = (staff: string, skipDays: number[] = [], doubledDays: number[] = []) =>
  Array.from({ length: 31 }, (_, i) => {
    const d = i + 1;
    const dow = (d - 1) % 7; // 0=Sun, Mar1 2026=Sun
    const checked = dow >= 1 && dow <= 5 && !skipDays.includes(d);
    const doubled = checked && doubledDays.includes(d);
    return {
      day: d, checked,
      count: checked ? (doubled ? 2 : 1) : 0,
      entries: checked ? Array.from({ length: (doubled ? 2 : 1) }, (_, i) => ({ 
          staff, 
          time: "08:30", 
          note: "Tuần tra định kỳ, tình trạng bình thường", 
          lat: 21.028 + (d * 0.001), 
          lng: 105.854 + (d * 0.001),
          accuracy: (Math.random() * 10 + 2).toFixed(1) + "m",
          weather: ["Nắng nhẹ", "Nhiều mây", "Mưa nhỏ"][Math.floor(Math.random() * 3)] + ", " + (25 + Math.floor(Math.random() * 10)) + "°C",
          mileage: `Km${d + 1}+${100 * (i + 1)}`,
          address: `${d + 1} Phố ${["Ngô Gia Tự", "Lý Thái Tổ", "Trần Hưng Đạo"][Math.floor(Math.random() * 3)]}, Hà Nội`,
          images: Array.from({ length: 2 }, (_, j) => `/images/patrol/patro_${(i + j) % 5 + 1}.png`),
          device: "iPhone 13 Pro"
        })) : [],
    };
  });

const mockPatrolData: Record<string, any[]> = {
  "KT-D-001": mkPatrol("Nguyễn Văn A"),
  "KT-D-002": mkPatrol("Phạm Thị D", [10, 17]),
  "KT-D-003": mkPatrol("Tống Văn E", [], [5, 12]),
  "KT-L-001": mkPatrol("Lê Văn C", [6, 13]),
  "KT-L-002": mkPatrol("Trần Thị B"),
  "KT-C-001": mkPatrol("Trần Thị B", [7]),
  "KT-C-002": mkPatrol("Lê Văn C", [3]),
  "KT-C-003": mkPatrol("Phạm Thị D"),
};

const mockDamageData: Record<string, any[]> = {
  "KT-D-001": [],
  "KT-D-002": [],
  "KT-D-003": [
    { id: "HD-001", desc: "Ổ gà mặt đường", km: "Km2+450", severity: "Trung bình", status: "Đang xử lý" },
    { id: "HD-002", desc: "Vỉa hè bị lấn chiếm", km: "Km3+100", severity: "Nhẹ", status: "Chưa xử lý" },
  ],
  "KT-L-001": [
    { id: "HD-003", desc: "3 bộ đèn LED cột 7-9 bị hỏng", km: "Cột đèn 7-9", severity: "Trung bình", status: "Đang sửa" },
  ],
  "KT-L-002": [],
  "KT-C-001": [],
  "KT-C-002": [
    { id: "HD-004", desc: "Đèn chiếu sáng hầm hỏng 3 bộ", km: "Cột đèn 12-14", severity: "Nặng", status: "Chưa xử lý" },
  ],
  "KT-C-003": [],
};

const mockViolationData: Record<string, any[]> = {
  "KT-D-001": [],
  "KT-D-002": [],
  "KT-D-003": [
    { id: "VP-001", type: "Lấn chiếm vỉa hè", violator: "Hộ KD Trần Thế", date: "2026-03-22", status: "Đang xử lý" },
  ],
  "KT-L-001": [
    { id: "VP-002", type: "Đào đường trái phép", violator: "Cty TNHH Viễn Thông ABC", date: "2026-03-10", status: "Đã xử phạt" },
  ],
  "KT-L-002": [],
  "KT-C-001": [
    { id: "VP-003", type: "Lều quán trái phép", violator: "Hộ KD Nguyễn Hải", date: "2026-03-10", status: "Chưa xử lý" },
    { id: "VP-004", type: "Lều quán trái phép", violator: "Hộ KD Lê Thanh", date: "2026-03-10", status: "Đã xử phạt" },
  ],
  "KT-C-002": [],
  "KT-C-003": [],
};

const mockAccidentData: Record<string, any[]> = {
  "KT-D-001": [],
  "KT-D-002": [],
  "KT-D-003": [
    { id: "TN-001", date: "2026-03-18", dead: 0, injured: 2, type: "Va chạm xe máy – ô tô", cause: "Vượt đèn đỏ" },
  ],
  "KT-L-001": [], "KT-L-002": [], "KT-C-001": [], "KT-C-002": [], "KT-C-003": [],
};

const mockInfraData: Record<string, any[]> = {
  "KT-D-001": [],
  "KT-D-002": [],
  "KT-D-003": [
    { id: "CT-001", name: "Lan can cầu vượt Km2", type: "Lan can", damage: "Biến dạng do va xô", status: "Cần sửa" },
    { id: "CT-002", name: "Hố ga Km3+200", type: "Hố ga", damage: "Nắp hố ga bị vỡ", status: "Đã sửa" },
  ],
  "KT-L-001": [],
  "KT-L-002": [],
  "KT-C-001": [
    { id: "CT-003", name: "Dầm cầu trụ P3", type: "Dầm cầu", damage: "Vết nứt kết cấu 0.8m", status: "Đang theo dõi" },
  ],
  "KT-C-002": [
    { id: "CT-004", name: "Đèn hầm Kim Liên", type: "Chiếu sáng", damage: "3 bộ đèn không hoạt động", status: "Chưa sửa" },
  ],
  "KT-C-003": [],
};

const getResultBadge = (result: string) => {
  switch (result) {
    case "qualified": return <Badge className="bg-green-100 text-green-700 border-green-200">Đạt</Badge>;
    case "warning": return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Cảnh báo</Badge>;
    case "violation": return <Badge className="bg-red-100 text-red-700 border-red-200">Vi phạm</Badge>;
    default: return <Badge variant="outline">{result}</Badge>;
  }
};

export default function KiemTraKCHT() {
  const [activeTab, setActiveTab] = useState("road");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isExportReviewOpen, setIsExportReviewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPatrolOpen, setIsPatrolOpen] = useState(false);
  const [isDamageOpen, setIsDamageOpen] = useState(false);
  const [isViolationOpen, setIsViolationOpen] = useState(false);
  const [isAccidentOpen, setIsAccidentOpen] = useState(false);
  const [isInfraOpen, setIsInfraOpen] = useState(false);
  const [selectedPatrolDay, setSelectedPatrolDay] = useState<any>(null);
  const [infraTypeTab, setInfraTypeTab] = useState("tuyen-duong");
  const [isDetailTabOpen, setIsDetailTabOpen] = useState(false);
  const [detailContentTab, setDetailContentTab] = useState("tuyen-duong");
  const [formInfraType, setFormInfraType] = useState("tuyen-duong");
  const [isReportDetailOpen, setIsReportDetailOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [isCheckinDetailOpen, setIsCheckinDetailOpen] = useState(false);
  const [selectedCheckin, setSelectedCheckin] = useState<any>(null);
  const [mapViewMode, setMapViewMode] = useState<'single' | 'history'>('single');
  const [historyMarkers, setHistoryMarkers] = useState<any[]>([]);
  const [historyRoute, setHistoryRoute] = useState<any>(null);

  const currentData = tabDataMap[activeTab] ?? [];

  const filteredData = currentData.filter(item => {
    const type = item.objectType.toLowerCase();
    if (infraTypeTab === "cau") return type.includes("cầu");
    if (infraTypeTab === "ham") return type.includes("hầm");
    return !type.includes("cầu") && !type.includes("hầm");
  });

  const stats = {
    total: currentData.length,
    totalIssues: currentData.reduce((sum, i) => sum + (i.violations || 0), 0),
    violationRecords: currentData.filter(i => i.result === "violation").length,
    warningRecords: currentData.filter(i => i.result === "warning").length,
  };

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-slate-100/50 p-1 border">
            <TabsTrigger value="road" className="gap-2 px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <ClipboardCheck className="size-4" />Tuần đường
            </TabsTrigger>
            <TabsTrigger value="light" className="gap-2 px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <ClipboardCheck className="size-4" />Tuần đèn
            </TabsTrigger>
            <TabsTrigger value="crossroad" className="gap-2 px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <ClipboardCheck className="size-4" />Đường ngang
            </TabsTrigger>
            <TabsTrigger value="watchtower" className="gap-2 px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <ClipboardCheck className="size-4" />Chòi gác
            </TabsTrigger>
            <TabsTrigger value="bridge" className="gap-2 px-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <ClipboardCheck className="size-4" />Tuần kiểm
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsExportReviewOpen(true)} className="border-slate-200 h-10">
            <FileDown className="mr-2 size-4" />Xuất Excel
          </Button>
          <Button onClick={() => { setSelectedItem(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white h-10">
            <Plus className="mr-2 size-4" />Thêm mới kiểm tra
          </Button>
        </div>
      </div>

      {/* Consolidated Filters */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                <Search className="size-3" /> Tên đối tượng
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input placeholder="Tìm kiếm tên..." className="pl-10 h-10 bg-white border-slate-200" />
              </div>
            </div>
            {activeTab !== "crossroad" && activeTab !== "watchtower" && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Loại đối tượng</label>
                <Select>
                  <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Tất cả loại" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="road">Đường bộ</SelectItem>
                    <SelectItem value="bridge">Cầu</SelectItem>
                    <SelectItem value="tunnel">Hầm</SelectItem>
                    <SelectItem value="intersection">Nút giao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase font-medium">Nhân viên / Cán bộ</label>
              <Select defaultValue="all">
                <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Chọn nhân viên" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhân viên</SelectItem>
                  <SelectItem value="nva">Nguyễn Văn A</SelectItem>
                  <SelectItem value="ptd">Phạm Thị D</SelectItem>
                  <SelectItem value="tve">Tống Văn E</SelectItem>
                  <SelectItem value="lvc">Lê Văn C</SelectItem>
                  <SelectItem value="ttb">Trần Thị B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Đơn vị quản lý</label>
              <Select>
                <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Tất cả đơn vị" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả đơn vị</SelectItem>
                  <SelectItem value="hat1">Hạt QLĐB 1</SelectItem>
                  <SelectItem value="hat2">Hạt QLĐB 2</SelectItem>
                  <SelectItem value="hat3">Hạt QLĐB 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Khoảng thời gian (Từ ngày - Đến ngày)</label>
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100">
                <Input type="date" className="h-9 flex-1 bg-white border-slate-200" defaultValue="2026-03-01" />
                <span className="text-slate-400 text-sm">đến</span>
                <Input type="date" className="h-9 flex-1 bg-white border-slate-200" defaultValue="2026-03-31" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Kết quả kiểm tra</label>
              <Select>
                <SelectTrigger className="h-10 bg-white border-slate-200"><SelectValue placeholder="Tất cả kết quả" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả kết quả</SelectItem>
                  <SelectItem value="qualified">Đạt yêu cầu</SelectItem>
                  <SelectItem value="warning">Cảnh báo</SelectItem>
                  <SelectItem value="violation">Vi phạm</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2 shrink-0">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 flex-1">
                <Search className="mr-2 size-4" />Tìm kiếm
              </Button>
              <Button variant="outline" onClick={() => setIsExportReviewOpen(true)} className="h-10 border-slate-200">
                <FileDown className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      {["crossroad", "watchtower"].includes(activeTab) ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><ClipboardCheck className="size-7" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{activeTab === "crossroad" ? "Số lượng đường ngang" : "Số lượng chòi gác"}</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-xs text-slate-400 mt-0.5">đối tượng trong kỳ</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-red-50 text-red-600"><ShieldAlert className="size-7" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">GHI NHẬN SỐ VI PHẠM</p>
              <p className="text-3xl font-bold text-red-600">{stats.totalIssues}</p>
              <p className="text-xs text-slate-400 mt-0.5">trường hợp vi phạm</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-red-50 text-red-600"><ShieldCheck className="size-7" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Số lượng vi phạm</p>
              <p className="text-3xl font-bold text-red-600">{stats.violationRecords}</p>
              <p className="text-xs text-slate-400 mt-0.5"></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><ClipboardCheck className="size-7" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Đã kiểm tra</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-xs text-slate-400 mt-0.5">đối tượng trong kỳ</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><AlertTriangle className="size-7" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Ghi nhận số vấn đề</p>
              <p className="text-3xl font-bold text-amber-600">{stats.totalIssues}</p>
              <p className="text-xs text-slate-400 mt-0.5">tổng số vấn đề phát sinh</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-red-50 text-red-600"><ShieldCheck className="size-7" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Ghi nhận số vi phạm</p>
              <p className="text-3xl font-bold text-red-600">{stats.violationRecords}</p>
              <p className="text-xs text-slate-400 mt-0.5">trường hợp vi phạm</p>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b py-3 px-4 space-y-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="size-2 bg-blue-600 rounded-full animate-pulse" />
              <h3 className="font-bold text-slate-800 tracking-tight text-sm uppercase">Danh sách biên bản kiểm tra</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium italic">Hiển thị {filteredData.length} kết quả</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl border border-slate-100 w-fit">
            {(["crossroad", "watchtower"].includes(activeTab) ? [
              { label: "Tuyến đường", value: "tuyen-duong" }
            ] : [
              { label: "Tuyến đường", value: "tuyen-duong" },
              { label: "Cầu", value: "cau" },
              { label: "Hầm", value: "ham" },
            ]).map(tab => (
              <button
                key={tab.value}
                onClick={() => setInfraTypeTab(tab.value)}
                className={`px-5 py-1.5 rounded-lg text-sm font-bold transition-all ${infraTypeTab === tab.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-white hover:text-slate-700"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-12 text-center">STT</TableHead>
                {["crossroad", "watchtower"].includes(activeTab) ? (
                  <>
                    <TableHead>{activeTab === "crossroad" ? "Tên đường ngang" : "Tên chòi gác"}</TableHead>
                    <TableHead>Tuyến đường</TableHead>
                    <TableHead>Cán bộ kiểm tra</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead className="text-center">Số checkin</TableHead>
                    <TableHead className="text-center">Số lượng yêu cầu</TableHead>
                    <TableHead className="text-center">Số lượng vi phạm</TableHead>
                    <TableHead>Kết quả</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Đối tượng kiểm tra</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Cán bộ kiểm tra</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead className="text-center">Số checkin</TableHead>
                    <TableHead className="text-center">Hư hỏng đường</TableHead>
                    <TableHead className="text-center">Vi phạm</TableHead>
                    <TableHead className="text-center">Số tai nạn</TableHead>
                    <TableHead className="text-center">Số hư hỏng CT</TableHead>
                    <TableHead>Kết quả</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={item.id}>
                  {["crossroad", "watchtower"].includes(activeTab) ? (
                    <>
                      <TableCell className="text-center text-slate-500">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900">{activeTab === "crossroad" ? (item.crossroadName || `Đường ngang ${idx + 1}`) : (item.watchtowerName || `Chòi gác ${idx + 1}`)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900">{item.objectName}</div>
                        <div className="text-[10px] text-slate-400 uppercase">Mã: {item.id}</div>
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium">{item.inspector}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{item.unit}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-lg font-black text-slate-400 text-blue-600">0</span>
                      </TableCell>
                      <TableCell className="text-center text-slate-400">—</TableCell>
                      <TableCell className="text-center text-slate-400">—</TableCell>
                      <TableCell>{getResultBadge(item.result)}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button title="Xem chi tiết" className="inline-flex items-center justify-center size-8 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200">
                            <Eye className="size-4" />
                          </button>
                          <button title="Xem vị trí" className="inline-flex items-center justify-center size-8 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200">
                            <MapPin className="size-4" />
                          </button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="text-center text-slate-500">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="font-bold text-slate-900">{item.objectName}</div>
                        <div className="text-[10px] text-slate-400 uppercase">Mã: {item.id}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{item.objectType}</Badge></TableCell>
                      <TableCell className="text-slate-700 font-medium">{item.inspector}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{item.unit}</TableCell>
                      {/* Số checkin */}
                      <TableCell className="text-center">
                        {(() => {
                          const count = (mockPatrolData[item.id] || []).reduce((s: number, d: any) => s + d.count, 0);
                          let colorClass = "text-slate-400 hover:text-slate-600";
                          if (count >= 22) colorClass = "text-green-600 hover:text-green-800";
                          else if (count > 0) colorClass = "text-amber-500 hover:text-amber-700";
                          
                          return (
                            <button
                              onClick={() => { setSelectedItem(item); setDetailContentTab("tuyen-duong"); setSelectedPatrolDay(null); setIsDetailTabOpen(true); }}
                              className={`text-lg font-black ${colorClass} hover:underline transition-colors`}
                            >
                              {count}
                            </button>
                          );
                        })()}
                      </TableCell>
                      {/* Hư hỏng đường */}
                      <TableCell className="text-center">
                        {item.result === "warning" && item.violations > 0
                          ? <button onClick={() => { setSelectedItem(item); setDetailContentTab("hu-hong-duong"); setSelectedPatrolDay(null); setIsDetailTabOpen(true); }}
                              className="font-bold text-amber-600 hover:underline hover:text-amber-800 transition-colors">
                              {item.violations}
                            </button>
                          : <span className="text-slate-400">—</span>}
                      </TableCell>
                      {/* Vi phạm */}
                      <TableCell className="text-center">
                        {item.result === "violation" && item.violations > 0
                          ? <button onClick={() => { setSelectedItem(item); setDetailContentTab("vi-pham"); setSelectedPatrolDay(null); setIsDetailTabOpen(true); }}
                              className="font-bold text-red-600 hover:underline hover:text-red-800 transition-colors">
                              {item.violations}
                            </button>
                          : <span className="text-slate-400">—</span>}
                      </TableCell>
                      {/* Số tai nạn */}
                      <TableCell className="text-center">
                        {(mockAccidentData[item.id] || []).length > 0
                          ? <button onClick={() => { setSelectedItem(item); setDetailContentTab("tai-nan"); setSelectedPatrolDay(null); setIsDetailTabOpen(true); }}
                              className="font-bold text-orange-600 hover:underline hover:text-orange-800 transition-colors">
                              {(mockAccidentData[item.id] || []).length}
                            </button>
                          : <span className="text-slate-400">—</span>}
                      </TableCell>
                      {/* Số hư hỏng CT */}
                      <TableCell className="text-center">
                        {(mockInfraData[item.id] || []).length > 0
                          ? <button onClick={() => { setSelectedItem(item); setDetailContentTab("hu-hong-ct"); setSelectedPatrolDay(null); setIsDetailTabOpen(true); }}
                              className="font-bold text-purple-600 hover:underline hover:text-purple-800 transition-colors">
                              {(mockInfraData[item.id] || []).length}
                            </button>
                          : <span className="text-slate-400">—</span>}
                      </TableCell>
                      <TableCell>{getResultBadge(item.result)}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            title="Xem chi tiết"
                            onClick={() => { setSelectedItem(item); setDetailContentTab("tuyen-duong"); setSelectedPatrolDay(null); setIsDetailTabOpen(true); }}
                            className="inline-flex items-center justify-center size-8 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200"
                          >
                            <Eye className="size-4" />
                          </button>
                          <button
                            title="Xem vị trí"
                            onClick={() => {
                              const lat = 21.028 + (Math.random() * 0.05);
                              const lng = 105.854 + (Math.random() * 0.05);
                              setMapMarkers([{ id: item.id, name: item.objectName, lat, lng, type: item.objectType, description: item.note }]);
                              setIsMapOpen(true);
                            }}
                            className="inline-flex items-center justify-center size-8 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-200"
                          >
                            <MapPin className="size-4" />
                          </button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ===== COMBINED DETAIL TABBED DIALOG ===== */}
      {selectedItem && (() => {
        const isHamType = (selectedItem.objectType || "").toLowerCase().includes("hầm");
        const tabs = [
          { id: "tuyen-duong", label: "Tuần đường", icon: <ClipboardList className="size-4" />, color: "text-blue-600" },
          { id: "hu-hong-duong", label: "Hư hỏng đường", icon: <AlertTriangle className="size-4" />, color: "text-amber-600" },
          { id: "hu-hong-ct", label: "Hư hỏng công trình", icon: <Building2 className="size-4" />, color: "text-purple-600" },
          { id: "vi-pham", label: "Vi phạm", icon: <ShieldAlert className="size-4" />, color: "text-red-600" },
          ...(!isHamType ? [{ id: "tai-nan", label: "Tai nạn", icon: <Zap className="size-4" />, color: "text-orange-600" }] : []),
        ];
        return (
          <Dialog open={isDetailTabOpen} onOpenChange={(open) => { setIsDetailTabOpen(open); if (!open) setSelectedPatrolDay(null); }}>
            <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-[90vw] max-h-[90vh] flex flex-col">
              <DialogHeader className="shrink-0">
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="size-5 text-blue-600" />
                  Chi tiết kiểm tra – {selectedItem.objectName}
                  <span className="text-xs font-normal text-slate-400 ml-1">({selectedItem.objectType})</span>
                </DialogTitle>
              </DialogHeader>
              {/* Tab nav */}
              <div className="flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl border border-slate-100 w-fit shrink-0 overflow-x-auto">
                {tabs.map(tab => (
                  <button key={tab.id}
                    onClick={() => { setDetailContentTab(tab.id); setSelectedPatrolDay(null); }}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${detailContentTab === tab.id ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:bg-white hover:text-slate-700"
                      }`}
                  >
                    {tab.icon}{tab.label}
                  </button>
                ))}
              </div>
              {/* Tab content */}
              <div className="flex-1 overflow-y-auto mt-3">

                {/* === Tuần đường === */}
                {detailContentTab === "tuyen-duong" && (
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Tháng 03/2026 · Cán bộ: <span className="font-semibold text-slate-800">{selectedItem.inspector}</span></p>
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-blue-500 inline-block" />Đã tuần</span>
                          <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-slate-200 inline-block" />Chưa tuần</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto pb-2">
                        {Array.from({ length: 30 }, (_, i) => {
                          const dayNum = i + 1;
                          const dayData = (mockPatrolData[selectedItem.id] || []).find((d: any) => d.day === dayNum);
                          const isChecked = dayData?.checked;
                          const count = dayData?.count || 0;
                          const isSel = selectedPatrolDay?.day === dayNum;
                          return (
                            <button key={dayNum}
                              onClick={() => isChecked ? setSelectedPatrolDay(isSel ? null : dayData) : undefined}
                              className={`flex-shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all text-xs ${isChecked
                                ? isSel
                                  ? "bg-blue-700 text-white shadow-lg ring-2 ring-blue-400 scale-105"
                                  : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer shadow-sm"
                                : "bg-slate-100 text-slate-400 cursor-default"
                                }`}
                            >
                              <span className="text-sm font-bold">{dayNum}</span>
                              {isChecked && <span className="text-[9px] mt-0.5 opacity-80">{count}×</span>}
                            </button>
                          );
                        })}
                      </div>

                      {selectedPatrolDay ? (
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 min-h-[300px]">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-bold text-blue-800">Ngày {selectedPatrolDay.day}/03/2026 – {selectedPatrolDay.count} lần check-in</p>
                            <Badge className="bg-blue-600 text-white">Chi tiết ghi nhận</Badge>
                          </div>
                          <div className="space-y-3">
                            {selectedPatrolDay.entries.map((e: any, idx: number) => (
                              <div key={idx} 
                                onClick={() => { setSelectedCheckin(e); setIsCheckinDetailOpen(true); }}
                                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-blue-100 shadow-sm hover:border-blue-400 transition-all cursor-pointer group"
                              >
                                <div className="flex size-10 rounded-full bg-blue-50 text-blue-600 items-center justify-center font-black text-xs flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">{idx + 1}</div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="font-bold text-slate-900 text-sm">{e.staff}</p>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs bg-slate-50 text-slate-500 px-2 py-1 rounded-md font-mono">{e.time}</span>
                                      <div className="size-6 flex items-center justify-center rounded bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                                        <MapPin className="size-3.5" />
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{e.note}</p>
                                  {e.images && e.images.length > 0 && (
                                    <div className="flex gap-2 mt-3">
                                      {e.images.map((img: string, i: number) => (
                                        <div key={i} className="size-12 rounded-lg border border-slate-100 bg-slate-100 overflow-hidden">
                                          <img src={img} alt="preview" className="size-full object-cover" />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                          <ClipboardList className="size-12 text-slate-300 mb-3" />
                          <p className="text-sm font-medium text-slate-400">Chọn một ngày để xem chi tiết tuần tra</p>
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                        {[
                          { label: "Ngày đã tuần", value: (mockPatrolData[selectedItem.id] || []).filter((d: any) => d.checked).length, color: "text-blue-600" },
                          { label: "Ngày chưa tuần", value: 31 - (mockPatrolData[selectedItem.id] || []).filter((d: any) => d.checked).length, color: "text-slate-400" },
                          { label: "Tổng lượt check-in", value: (mockPatrolData[selectedItem.id] || []).reduce((s: number, d: any) => s + d.count, 0), color: "text-emerald-600" },
                        ].map(s => (
                          <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col min-h-[500px]">
                        <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-600 uppercase flex items-center gap-2">
                            <MapIcon className="size-4 text-blue-600" />
                            Bản đồ tuần tra ngày {selectedPatrolDay?.day || "--"}
                          </p>
                          {selectedPatrolDay && (
                            <Badge className="bg-blue-100 text-blue-700">
                              {selectedPatrolDay.entries.length} điểm ghi nhận
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 bg-slate-100 relative">
                          <SimpleMapView
                            markers={selectedPatrolDay ? selectedPatrolDay.entries.map((e: any, i: number) => ({
                              id: `day-chk-${i}`,
                              name: e.staff,
                              lat: e.lat,
                              lng: e.lng,
                              type: 'tuần tra',
                              description: e.time + ": " + e.note
                            })) : []}
                            routes={selectedPatrolDay ? [{
                              id: 'day-route',
                              name: 'Lộ trình ngày',
                              coordinates: selectedPatrolDay.entries.map((e: any) => [e.lat, e.lng]),
                              color: '#3b82f6',
                              weight: 4
                            }] : []}
                            center={selectedPatrolDay && selectedPatrolDay.entries.length > 0 ? [selectedPatrolDay.entries[0].lat, selectedPatrolDay.entries[0].lng] : [21.028, 105.854]}
                            zoom={15}
                            height="100%"
                            isActive={isDetailTabOpen && detailContentTab === "tuyen-duong"}
                          />
                        </div>
                        {selectedPatrolDay && (
                          <div className="p-3 bg-white border-t space-y-2">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Điểm đang xem</p>
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">GPS</div>
                              <div className="text-xs">
                                <p className="font-bold text-slate-800">Tọa độ trung tâm</p>
                                <p className="text-slate-500 font-mono">{selectedPatrolDay.entries[0].lat.toFixed(4)}, {selectedPatrolDay.entries[0].lng.toFixed(4)}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* === Hư hỏng đường === */}
                {detailContentTab === "hu-hong-duong" && (
                  <div>
                    {(mockDamageData[selectedItem.id] || []).length === 0 ? (
                      <div className="text-center py-16">
                        <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                        <p className="font-semibold text-slate-600">Không ghi nhận hư hỏng nào</p>
                        <p className="text-sm text-slate-400 mt-1">Tuyến đang trong tình trạng tốt</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {(mockDamageData[selectedItem.id] || []).map((d: any, idx: number) => (
                          <div key={d.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-amber-50/50 transition-colors">
                            <div className="flex size-8 rounded-full bg-amber-100 items-center justify-center text-amber-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800">{d.desc}</p>
                              <p className="text-xs text-slate-500 mt-0.5 font-mono">{d.km}</p>
                            </div>
                            <Badge className={d.severity === "Nặng" ? "bg-red-100 text-red-700" : d.severity === "Trung bình" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}>{d.severity}</Badge>
                            <button onClick={() => { setSelectedReport({ ...d, category: "Hư hỏng mặt đường", route: selectedItem.objectName, reporter: selectedItem.inspector, unit: selectedItem.unit }); setIsReportDetailOpen(true); }}
                              className="text-xs text-blue-600 hover:underline font-semibold shrink-0 flex items-center gap-1">
                              <ExternalLink className="size-3" />Xem thêm
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* === Hư hỏng công trình === */}
                {detailContentTab === "hu-hong-ct" && (
                  <div>
                    {(mockInfraData[selectedItem.id] || []).length === 0 ? (
                      <div className="text-center py-16">
                        <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                        <p className="font-semibold text-slate-600">Không ghi nhận công trình hư hỏng</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {(mockInfraData[selectedItem.id] || []).map((c: any, idx: number) => (
                          <div key={c.id} className="flex items-start gap-4 p-3 rounded-xl border border-purple-100 bg-purple-50/30 hover:bg-purple-50 transition-colors">
                            <div className="flex size-8 rounded-full bg-purple-100 items-center justify-center text-purple-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800">{c.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">Loại: <span className="font-medium">{c.type}</span></p>
                              <p className="text-xs text-red-600 mt-1 italic">{c.damage}</p>
                            </div>
                            <button onClick={() => { setSelectedReport({ ...c, desc: c.name, km: c.type, severity: "Trung bình", category: "Hư hỏng công trình", route: selectedItem.objectName, reporter: selectedItem.inspector, unit: selectedItem.unit }); setIsReportDetailOpen(true); }}
                              className="text-xs text-blue-600 hover:underline font-semibold shrink-0 flex items-center gap-1">
                              <ExternalLink className="size-3" />Xem thêm
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* === Vi phạm === */}
                {detailContentTab === "vi-pham" && (
                  <div>
                    {(mockViolationData[selectedItem.id] || []).length === 0 ? (
                      <div className="text-center py-16">
                        <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                        <p className="font-semibold text-slate-600">Không ghi nhận vi phạm nào</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {(mockViolationData[selectedItem.id] || []).map((v: any, idx: number) => (
                          <div key={v.id} className="flex items-center gap-4 p-3 rounded-xl border border-red-100 bg-red-50/40 hover:bg-red-50 transition-colors">
                            <div className="flex size-8 rounded-full bg-red-100 items-center justify-center text-red-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800">{v.type}</p>
                              <p className="text-xs text-slate-500 mt-0.5">Đối tượng: <span className="font-medium text-slate-700">{v.violator}</span> · {v.date}</p>
                            </div>
                            <button onClick={() => { setSelectedReport({ ...v, desc: v.type, km: `Đối tượng: ${v.violator}`, severity: "Vi phạm", category: "Vi phạm giao thông", route: selectedItem.objectName, reporter: selectedItem.inspector, unit: selectedItem.unit }); setIsReportDetailOpen(true); }}
                              className="text-xs text-blue-600 hover:underline font-semibold shrink-0 flex items-center gap-1">
                              <ExternalLink className="size-3" />Xem thêm
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* === Tai nạn (only non-tunnel) === */}
                {detailContentTab === "tai-nan" && !isHamType && (
                  <div>
                    {(mockAccidentData[selectedItem.id] || []).length === 0 ? (
                      <div className="text-center py-16">
                        <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                        <p className="font-semibold text-slate-600">Không ghi nhận tai nạn nào</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {(mockAccidentData[selectedItem.id] || []).map((a: any, idx: number) => (
                          <div key={a.id} className="flex items-start gap-4 p-3 rounded-xl border border-orange-100 bg-orange-50/40 hover:bg-orange-50 transition-colors">
                            <div className="flex size-8 rounded-full bg-orange-100 items-center justify-center text-orange-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3"><p className="font-semibold text-slate-800">{a.type}</p><span className="text-xs text-slate-400">{a.date}</span></div>
                              <div className="flex gap-4 mt-1">
                                <span className="text-xs text-red-600 font-semibold">Chết: {a.dead}</span>
                                <span className="text-xs text-amber-600 font-semibold">Bị thương: {a.injured}</span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 italic">Nguyên nhân: {a.cause}</p>
                            </div>
                            <button onClick={() => { setSelectedReport({ ...a, desc: a.type, km: a.date, severity: "Nghiêm trọng", category: "Tai nạn giao thông", route: selectedItem.objectName, reporter: selectedItem.inspector, unit: selectedItem.unit }); setIsReportDetailOpen(true); }}
                              className="text-xs text-blue-600 hover:underline font-semibold shrink-0 flex items-center gap-1">
                              <ExternalLink className="size-3" />Xem thêm
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
              <DialogFooter className="shrink-0 pt-3 border-t border-slate-100">
                <Button variant="outline" onClick={() => { setIsDetailTabOpen(false); setSelectedPatrolDay(null); }}>Đóng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })()}

      {/* ===== REPORT DETAIL DIALOG (Phản ánh xử lý) ===== */}
      {selectedReport && (
        <Dialog open={isReportDetailOpen} onOpenChange={setIsReportDetailOpen}>
          <DialogContent className="w-[480px] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="size-5 text-amber-500" />
                Chi tiết vấn đề
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Reporter info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 rounded-full bg-blue-600 items-center justify-center text-white font-bold text-sm shrink-0">
                    {(selectedReport.reporter || "N").slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{selectedReport.reporter}</p>
                    <p className="text-xs text-slate-400">▾ {selectedReport.unit} · {selectedReport.km}</p>
                  </div>
                </div>
                <Badge className={selectedReport.status === "Đã xử lý" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                  {selectedReport.status || "Chưa xử lý"}
                </Badge>
              </div>
              {/* Category */}
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="size-3 mr-1" />{selectedReport.category}
                </Badge>
              </div>
              {/* Title & description */}
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedReport.route} – {selectedReport.km}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{selectedReport.desc}. Cần kiểm tra và xử lý theo quy định.</p>
              </div>
              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-mono">#{selectedReport.id || "VD-001"}</span>
                <Badge className={selectedReport.severity === "Nặng" || selectedReport.severity === "Nghiêm trọng" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}>
                  {selectedReport.severity || "Trung bình"}
                </Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">▾ {selectedReport.route}</span>
              </div>
              {/* Stats */}
              <div className="flex items-center gap-5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1.5"><Eye className="size-3.5" /> 125 lượt xem</span>
                <span className="flex items-center gap-1.5">&#128077; 4 lượt đánh dấu</span>
                <span className="flex items-center gap-1.5">&#128172; 2 bình luận</span>
              </div>
            </div>
            <DialogFooter className="gap-2 border-t border-slate-100 pt-3">
              <Button variant="outline" size="sm" onClick={() => setIsReportDetailOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== ADD/EDIT FORM DIALOG ===== */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[850px] w-[95vw] flex flex-col max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2 shrink-0 border-b">
            <DialogTitle className="flex items-center gap-2">
              <ClipboardCheck className="size-5 text-blue-600" />
              {selectedItem ? "Chỉnh sửa biên bản kiểm tra" : "Thêm mới công tác kiểm tra KCHT"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto min-h-0 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* Infrastructure type selector */}
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 mb-2 block">Loại hình hạ tầng *</label>
              <div className="flex gap-2">
                {[
                  { label: "Tuyến đường", value: "tuyen-duong", icon: "🛣️" },
                  { label: "Cầu", value: "cau", icon: "🌉" },
                  { label: "Hầm", value: "ham", icon: "🚇" },
                ].map(t => (
                  <button key={t.value} type="button"
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${formInfraType === t.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-slate-50"
                      }`}
                    onClick={() => setFormInfraType(t.value)}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Tên đối tượng kiểm tra *</label>
              <Input placeholder={
                formInfraType === "cau" ? "VD: Cầu Vĩnh Tuy, Cầu Nhật Tân..." :
                  formInfraType === "ham" ? "VD: Hầm Kim Liên, Hầm Sông Sài Gòn..." :
                    "VD: Quốc lộ 1A, Đường Vành đai 2..."
              } defaultValue={selectedItem?.objectName} className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Loại đối tượng</label>
              <Select defaultValue={selectedItem?.objectType}>
                <SelectTrigger className="h-10"><SelectValue placeholder="Chọn loại đối tượng" /></SelectTrigger>
                <SelectContent>
                  {formInfraType === "tuyen-duong" && (<>
                    <SelectItem value="Tự thu quốc lộ">Tự thu quốc lộ</SelectItem>
                    <SelectItem value="Quốc lộ">Quốc lộ</SelectItem>
                    <SelectItem value="Đường đô thị">Đường đô thị</SelectItem>
                    <SelectItem value="Đường tỉnh">Đường tỉnh</SelectItem>
                  </>)}
                  {formInfraType === "cau" && (<>
                    <SelectItem value="Cầu lớn">Cầu lớn</SelectItem>
                    <SelectItem value="Cầu trung">Cầu trung</SelectItem>
                    <SelectItem value="Cầu nhỏ">Cầu nhỏ</SelectItem>
                    <SelectItem value="Cầu bộ hành">Cầu bộ hành</SelectItem>
                  </>)}
                  {formInfraType === "ham" && (<>
                    <SelectItem value="Hầm đường bộ">Hầm đường bộ</SelectItem>
                    <SelectItem value="Hầm chìa khóa">Hầm chìa khóa</SelectItem>
                  </>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Ngày kiểm tra *</label>
              <Input type="date" defaultValue={selectedItem?.date} className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Cán bộ kiểm tra *</label>
              <Input placeholder="Họ tên cán bộ" defaultValue={selectedItem?.inspector} className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Đơn vị</label>
              <Select defaultValue={selectedItem?.unit}>
                <SelectTrigger className="h-10"><SelectValue placeholder="Chọn đơn vị" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hạt QLĐB 1">Hạt QLĐB 1</SelectItem>
                  <SelectItem value="Hạt QLĐB 2">Hạt QLĐB 2</SelectItem>
                  <SelectItem value="Hạt QLĐB 3">Hạt QLĐB 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Số vi phạm phát hiện</label>
              <Input type="number" min="0" defaultValue={selectedItem?.violations ?? 0} className="h-10" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Kết quả kiểm tra</label>
              <Select defaultValue={selectedItem?.result || "qualified"} onValueChange={(v) => {
                if (v === 'warning' || v === 'violation') {
                  // Hiển thị gợi ý gửi báo cáo
                }
              }}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualified">Đạt yêu cầu</SelectItem>
                  <SelectItem value="warning">Cảnh báo</SelectItem>
                  <SelectItem value="violation">Vi phạm</SelectItem>
                  <SelectItem value="planned">Kế hoạch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Ghi chú / Nội dung kiểm tra</label>
              <Input placeholder="Ghi chú..." defaultValue={selectedItem?.note} className="h-10" />
            </div>

            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-500 mb-1 block">Đề xuất xử lý (Nếu có hư hỏng/vi phạm)</label>
              <Input placeholder="Nhập đề xuất hoặc hướng giải quyết..." className="h-10" />
            </div>

            <div className="col-span-2 mt-2">
              <label className="text-xs font-medium text-slate-500 mb-2 block">Hình ảnh hiện trạng</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl py-6 px-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-slate-500 group">
                <div className="bg-white p-2 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="size-5 text-blue-500" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Bấm để tải ảnh lên</p>
                <p className="text-xs text-slate-400 mt-1">hoặc kéo thả vào đây (tối đa 5 ảnh)</p>
              </div>
            </div>

            <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Send className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Gửi thông báo cho quản lý</p>
                    <p className="text-[10px] text-slate-500">Hệ thống sẽ gửi báo cáo đến danh sách đã chọn</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] border-blue-200 text-blue-600">Đã chọn 2 người</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'm1', name: 'Nguyễn Văn A', role: 'Quản trị viên' },
                  { id: 'm2', name: 'Trần Thị B', role: 'Trưởng hạt' },
                  { id: 'm3', name: 'Lê Văn C', role: 'Phó hạt' },
                  { id: 'm4', name: 'Phạm Văn D', role: 'Tuần kiểm' },
                  { id: 'm5', name: 'Hoàng Văn E', role: 'Phòng hạ tầng' },
                  { id: 'm6', name: 'Vũ Thị F', role: 'Chủ đầu tư' },
                ].map((m) => (
                  <label key={m.id} className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 bg-white hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group">
                    <input type="checkbox" className="size-4 accent-blue-600" defaultChecked={m.id === 'm1' || m.id === 'm2'} />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 truncate">{m.name}</p>
                      <p className="text-[9px] text-slate-400 truncate">{m.role}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-3 flex justify-end">
                 <Button variant="link" className="h-auto p-0 text-[10px] text-blue-600">Thêm người nhận khác +</Button>
              </div>
            </div>
          </div>
          </div>
          <DialogFooter className="shrink-0 p-6 pt-3 border-t bg-slate-50/50">
            <Button variant="outline" onClick={() => setIsFormOpen(false)}><X className="mr-2 size-4" />Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" onClick={() => setIsFormOpen(false)}>
              <Save className="mr-2 size-4" />{selectedItem ? "Cập nhật biên bản" : "Lưu biên bản mới"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DETAIL DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="w-[820px] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ClipboardCheck className="size-5 text-blue-600" />Chi tiết biên bản kiểm tra KCHT
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-2">
              {[
                { label: "Mã kiểm tra", value: selectedItem.id },
                { label: "Đối tượng kiểm tra", value: selectedItem.objectName },
                { label: "Loại đối tượng", value: selectedItem.objectType },
                { label: "Cán bộ kiểm tra", value: selectedItem.inspector },
                { label: "Đơn vị", value: selectedItem.unit },
                { label: "Ngày kiểm tra", value: selectedItem.date },
                { label: "Số vi phạm", value: selectedItem.violations > 0 ? `${selectedItem.violations} vi phạm` : "Không có" },
                { label: "Ghi chú", value: selectedItem.note || "—" },
              ].map(f => (
                <div key={f.label} className="border-b border-slate-100 pb-3">
                  <p className="text-xs text-slate-400 mb-1">{f.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{f.value}</p>
                </div>
              ))}
              <div className="border-b border-slate-100 pb-3">
                <p className="text-xs text-slate-400 mb-1">Kết quả</p>
                {getResultBadge(selectedItem.result)}
              </div>

              {selectedItem.images && selectedItem.images.length > 0 && (
                <div className="col-span-2 border-t border-slate-100 pt-4 mt-1">
                  <p className="text-xs text-slate-500 font-medium mb-3">Hình ảnh hiện trường</p>
                  <div className="flex gap-2">
                    {selectedItem.images.map((img: string, i: number) => (
                      <img key={i} src={img} alt="hiện trường" className="h-28 w-40 object-cover rounded-xl border border-slate-200 shadow-sm" />
                    ))}
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="col-span-2 flex items-center justify-between pt-4 mt-2 border-t border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="h-9 gap-1.5 text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100">
                    <Send className="size-3.5" /> Báo quản lý
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 gap-1.5 text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100">
                    <ClipboardCheck className="size-3.5" /> Báo tuần kiểm
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 gap-1.5 text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100 hidden sm:flex">
                    <Wrench className="size-3.5" /> Đưa vào KH bảo dưỡng
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { setIsDetailOpen(false); setIsFormOpen(true); }}>
                    <Edit className="mr-2 size-4" />Chỉnh sửa
                  </Button>
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== PATROL HISTORY DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isPatrolOpen} onOpenChange={(open) => { setIsPatrolOpen(open); if (!open) setSelectedPatrolDay(null); }}>
          <DialogContent className="w-[85vw] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ClipboardList className="size-5 text-blue-600" />
                Lịch sử tuần đường – {selectedItem.objectName}
              </DialogTitle>
            </DialogHeader>
            <div className="py-2 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Tháng 03/2026 · Cán bộ: <span className="font-semibold text-slate-800">{selectedItem.inspector}</span></p>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-blue-500 inline-block" />Đã tuần</span>
                  <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-slate-200 inline-block" />Chưa tuần</span>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-7 gap-1.5 mb-1.5">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(d => (
                    <div key={d} className="text-center text-[11px] font-bold text-slate-400 py-0.5">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNum = i + 1;
                    if (dayNum > 31) return <div key={i} className="aspect-square" />;
                    const dayData = (mockPatrolData[selectedItem.id] || []).find((d: any) => d.day === dayNum);
                    const isChecked = dayData?.checked;
                    const count = dayData?.count || 0;
                    const isSel = selectedPatrolDay?.day === dayNum;
                    return (
                      <button key={i}
                        onClick={() => isChecked ? setSelectedPatrolDay(isSel ? null : dayData) : undefined}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all text-xs ${isChecked
                          ? isSel
                            ? "bg-blue-700 text-white shadow-lg ring-2 ring-blue-400"
                            : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer shadow-sm"
                          : "bg-slate-100 text-slate-400 cursor-default"
                          }`}
                      >
                        <span className="text-sm font-bold leading-none">{dayNum}</span>
                        {isChecked && <span className="text-[9px] mt-0.5 opacity-80">{count}×</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
              {selectedPatrolDay && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm font-bold text-blue-800 mb-3">Ngày {selectedPatrolDay.day}/03/2026 – {selectedPatrolDay.count} lần check-in</p>
                  <div className="space-y-2">
                    {selectedPatrolDay.entries.map((e: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-blue-100">
                        <div className="flex size-8 rounded-full bg-blue-100 items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-slate-800 text-sm">{e.staff}</p>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{e.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 italic">{e.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                {[
                  { label: "Ngày đã tuần", value: (mockPatrolData[selectedItem.id] || []).filter((d: any) => d.checked).length, color: "text-blue-600" },
                  { label: "Ngày chưa tuần", value: 31 - (mockPatrolData[selectedItem.id] || []).filter((d: any) => d.checked).length, color: "text-slate-400" },
                  { label: "Tổng lượt check-in", value: (mockPatrolData[selectedItem.id] || []).reduce((s: number, d: any) => s + d.count, 0), color: "text-emerald-600" },
                ].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsPatrolOpen(false); setSelectedPatrolDay(null); }}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== DAMAGE DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isDamageOpen} onOpenChange={setIsDamageOpen}>
          <DialogContent className="w-[85vw] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-500" />
                Hư hỏng trên tuyến – {selectedItem.objectName}
              </DialogTitle>
            </DialogHeader>
            <div className="py-2">
              {(mockDamageData[selectedItem.id] || []).length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                  <p className="font-semibold text-slate-600">Không ghi nhận hư hỏng nào</p>
                  <p className="text-sm text-slate-400 mt-1">Tuyến đang trong tình trạng tốt</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(mockDamageData[selectedItem.id] || []).map((d: any, idx: number) => (
                    <div key={d.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-amber-50/50 transition-colors">
                      <div className="flex size-8 rounded-full bg-amber-100 items-center justify-center text-amber-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800">{d.desc}</p>
                        <p className="text-xs text-slate-500 mt-0.5 font-mono">{d.km}</p>
                      </div>
                      <Badge className={d.severity === "Nặng" ? "bg-red-100 text-red-700 border-red-200" : d.severity === "Trung bình" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-green-100 text-green-700 border-green-200"}>{d.severity}</Badge>
                      <Badge variant="outline" className="text-xs shrink-0">{d.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDamageOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== VIOLATION DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isViolationOpen} onOpenChange={setIsViolationOpen}>
          <DialogContent className="w-[85vw] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldAlert className="size-5 text-red-500" />
                Vi phạm trên tuyến – {selectedItem.objectName}
              </DialogTitle>
            </DialogHeader>
            <div className="py-2">
              {(mockViolationData[selectedItem.id] || []).length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                  <p className="font-semibold text-slate-600">Không ghi nhận vi phạm nào</p>
                  <p className="text-sm text-slate-400 mt-1">Tuyến đang tuân thủ tốt</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(mockViolationData[selectedItem.id] || []).map((v: any, idx: number) => (
                    <div key={v.id} className="flex items-center gap-4 p-3 rounded-xl border border-red-100 bg-red-50/40 hover:bg-red-50 transition-colors">
                      <div className="flex size-8 rounded-full bg-red-100 items-center justify-center text-red-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800">{v.type}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Đối tượng: <span className="font-medium text-slate-700">{v.violator}</span> · {v.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">{v.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViolationOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== ACCIDENT DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isAccidentOpen} onOpenChange={setIsAccidentOpen}>
          <DialogContent className="w-[85vw] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="size-5 text-orange-500" />
                Tai nạn giao thông – {selectedItem.objectName}
              </DialogTitle>
            </DialogHeader>
            <div className="py-2">
              {(mockAccidentData[selectedItem.id] || []).length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                  <p className="font-semibold text-slate-600">Không ghi nhận tai nạn nào</p>
                  <p className="text-sm text-slate-400 mt-1">An toàn giao thông được đảm bảo tốt</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(mockAccidentData[selectedItem.id] || []).map((a: any, idx: number) => (
                    <div key={a.id} className="flex items-start gap-4 p-3 rounded-xl border border-orange-100 bg-orange-50/40 hover:bg-orange-50 transition-colors">
                      <div className="flex size-8 rounded-full bg-orange-100 items-center justify-center text-orange-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="font-semibold text-slate-800">{a.type}</p>
                          <span className="text-xs text-slate-400">{a.date}</span>
                        </div>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-red-600 font-semibold">Chết: {a.dead}</span>
                          <span className="text-xs text-amber-600 font-semibold">Bị thương: {a.injured}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 italic">Nguyên nhân: {a.cause}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAccidentOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== INFRASTRUCTURE DAMAGE DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isInfraOpen} onOpenChange={setIsInfraOpen}>
          <DialogContent className="w-[85vw] max-w-[95vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="size-5 text-purple-600" />
                Công trình hư hỏng – {selectedItem.objectName}
              </DialogTitle>
            </DialogHeader>
            <div className="py-2">
              {(mockInfraData[selectedItem.id] || []).length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="size-12 mx-auto mb-3 text-emerald-400" />
                  <p className="font-semibold text-slate-600">Không ghi nhận công trình hư hỏng</p>
                  <p className="text-sm text-slate-400 mt-1">Các công trình trên tuyến hoạt động tốt</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(mockInfraData[selectedItem.id] || []).map((c: any, idx: number) => (
                    <div key={c.id} className="flex items-start gap-4 p-3 rounded-xl border border-purple-100 bg-purple-50/30 hover:bg-purple-50 transition-colors">
                      <div className="flex size-8 rounded-full bg-purple-100 items-center justify-center text-purple-700 font-bold text-xs flex-shrink-0">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Loại: <span className="font-medium">{c.type}</span></p>
                        <p className="text-xs text-red-600 mt-1 italic">{c.damage}</p>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">{c.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInfraOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== DELETE DIALOG ===== */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={{ title: "Biên bản kiểm tra KCHT" }}
        selectedItem={{
          fullName: selectedItem?.objectName,
          idNumber: selectedItem?.id,
          registrationDate: selectedItem?.date
        }}
        onConfirmDelete={() => setIsDeleteOpen(false)}
      />

      {/* ===== EXCEL REPORT PREVIEW DIALOG ===== */}
      <Dialog open={isExportReviewOpen} onOpenChange={setIsExportReviewOpen}>
        <DialogContent className="sm:max-w-[75vw] w-[75vw] max-h-[90vh] overflow-y-auto bg-slate-50 p-0 overflow-hidden border-none shadow-2xl">
          <Card className="border-none shadow-none rounded-none relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-20 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 rounded-full"
              onClick={() => setIsExportReviewOpen(false)}
            >
              <Plus className="size-5 rotate-45" />
            </Button>
            <CardHeader className="bg-white border-b py-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg"><FileDown className="size-6 text-green-600" /></div>
                  Xem trước báo cáo Excel (Phụ lục 2)
                </DialogTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsExportReviewOpen(false)}>Đóng</Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <FileDown className="mr-2 size-4" /> Tải về Excel (.xlsx)
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div
                className="max-w-[70vw] mx-auto shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-slate-100 p-12 bg-white rounded-sm min-h-[1000px]"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {activeTab === 'road' ? (
                  <>
                    {/* Road Patrol Report Header */}
                    <div className="text-center space-y-2 mb-10">
                      <h4 className="text-xl font-bold uppercase tracking-tight text-slate-900">PHỤ LỤC 2: BÁO CÁO KẾT QUẢ CHECKIN TUẦN ĐƯỜNG</h4>
                      <h5 className="text-lg font-bold uppercase text-slate-800">THÁNG 03/2026 TỪ PHẦN MỀM GT247</h5>
                      <p className="text-base italic text-slate-500">(Từ 01/03/2026 đến 31/03/2026)</p>
                    </div>

                    {/* Road Patrol Report Table */}
                    <div className="overflow-x-auto border border-slate-300">
                      <table className="w-full border-collapse text-sm bg-white">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-300">
                            <th className="border-r border-slate-300 p-3 text-left font-bold text-slate-700 w-1/2">Công ty / Đối tượng</th>
                            <th className="border-r border-slate-300 p-3 text-center font-bold text-slate-700">Tổng số</th>
                            <th className="border-r border-slate-300 p-3 text-center font-bold text-slate-700">Đã checkin</th>
                            <th className="border-r border-slate-300 p-3 text-center font-bold text-slate-700">Chưa checkin</th>
                            <th className="p-3 text-center font-bold text-slate-700">Tổng lượt checkin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportCompaniesRoad.map((company, cIdx) => (
                            <React.Fragment key={cIdx}>
                              <tr className="bg-slate-100/50 border-b border-slate-200">
                                <td className="border-r border-slate-300 p-2 pl-4 font-bold text-slate-800" colSpan={5}>{company.name}</td>
                              </tr>
                              {company.items.map((item, iIdx) => (
                                <tr key={iIdx} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                                  <td className="border-r border-slate-300 p-2 pl-8 text-slate-600">— {item.type}</td>
                                  <td className="border-r border-slate-300 p-2 text-center text-slate-700 font-medium">{item.total.toLocaleString()}</td>
                                  <td className="border-r border-slate-300 p-2 text-center text-slate-700">{item.checked.toLocaleString()}</td>
                                  <td className="border-r border-slate-300 p-2 text-center text-red-500 font-medium">{item.uncheck > 0 ? item.uncheck.toLocaleString() : "0"}</td>
                                  <td className="p-2 text-center text-blue-600 font-bold">{item.count.toLocaleString()}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                          <tr className="bg-slate-900 text-white font-bold">
                            <td className="border-r border-slate-700 p-3 pl-4 uppercase">Tổng cộng toàn tỉnh</td>
                            <td className="border-r border-slate-700 p-3 text-center">{reportCompaniesRoad.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.total, 0), 0).toLocaleString()}</td>
                            <td className="border-r border-slate-700 p-3 text-center">{reportCompaniesRoad.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.checked, 0), 0).toLocaleString()}</td>
                            <td className="border-r border-slate-700 p-3 text-center text-red-300">{reportCompaniesRoad.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.uncheck, 0), 0).toLocaleString()}</td>
                            <td className="p-3 text-center text-blue-300 font-black text-lg">{reportCompaniesRoad.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.count, 0), 0).toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : activeTab === 'light' ? (
                  <>
                    {/* Light Patrol Report */}
                    {reportLightData.map((node, nIdx) => (
                      <div key={nIdx} className={nIdx > 0 ? "mt-16" : ""}>
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            Tên nút : <span className="text-blue-700 underline underline-offset-4">{node.intersection}</span>
                          </h4>
                        </div>

                        <div className="overflow-x-auto border border-slate-300">
                          <table className="w-full border-collapse text-[13px] bg-white text-slate-800">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-300 font-bold">
                                <th className="border-r border-slate-300 p-2 text-center w-32">Giờ ngày, tháng kiểm tra</th>
                                <th className="border-r border-slate-300 p-2 text-center w-32">Nhân viên tuần đèn</th>
                                <th className="border-r border-slate-300 p-2 text-center">Vị trí, lý trình, xảy ra, phát hiện sự cố</th>
                                <th className="border-r border-slate-300 p-2 text-center">Tình hình thời tiết; Diễn biến đột xuất, nội dung các sự cố</th>
                                <th className="border-r border-slate-300 p-2 text-center">Đã giải quyết, xử lý tại chỗ và kết quả</th>
                                <th className="border-r border-slate-300 p-2 text-center">Người nhận báo cáo ghi nhận xét, việc lưu ý hàng ngày. Ký tên</th>
                                <th className="p-2 text-center w-24">Ghi chú</th>
                              </tr>
                            </thead>
                            <tbody>
                              {node.items.map((item, itemIdx) => (
                                <tr key={itemIdx} className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors h-24">
                                  <td className="border-r border-slate-300 p-2 text-center">{item.time}</td>
                                  <td className="border-r border-slate-300 p-2 text-center font-medium">{item.staff}</td>
                                  <td className="border-r border-slate-300 p-2 text-slate-600 align-top">{item.location}</td>
                                  <td className="border-r border-slate-300 p-2 text-slate-600 align-top">
                                    <div className="font-semibold text-slate-800 mb-1">{item.weather}</div>
                                    <div>{item.content}</div>
                                  </td>
                                  <td className="border-r border-slate-300 p-2 text-center">
                                    <div className="inline-block px-2 py-1 rounded bg-slate-100 font-medium">{item.action}</div>
                                  </td>
                                  <td className="border-r border-slate-300 p-2 text-slate-500 italic text-xs align-bottom text-center">
                                    {item.review}
                                  </td>
                                  <td className="p-2 text-center text-slate-400">
                                    {item.note || "—"}
                                  </td>
                                </tr>
                              ))}
                              {node.items.length < 5 && Array.from({ length: 3 }).map((_, i) => (
                                <tr key={`empty-${i}`} className="border-b border-slate-100 h-10">
                                  <td className="border-r border-slate-300" colSpan={6}></td>
                                  <td></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </>
                ) : activeTab === 'bridge' ? (
                  <>
                    {/* Inspection Patrol Report (Tuần kiểm) */}
                    <div className="overflow-x-auto border border-slate-300">
                      <table className="w-full border-collapse text-[11px] bg-white text-slate-800">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-300 font-bold">
                            <th className="border-r border-slate-300 p-2 text-center" rowSpan={2}>Ngày tháng</th>
                            <th className="border-r border-slate-300 p-2 text-center" rowSpan={2}>Hạng mục công việc, ý kiến đề xuất của đơn vị BDTX, VHKTCTĐB</th>
                            <th className="border-r border-slate-300 p-2 text-center" colSpan={3}>Lý trình</th>
                            <th className="border-r border-slate-300 p-2 text-center" rowSpan={2}>Mô tả chi tiết thực trạng công tác QL, BDTX</th>
                            <th className="border-r border-slate-300 p-2 text-center" rowSpan={2}>Ước tính khối lượng</th>
                            <th className="border-r border-slate-300 p-2 text-center" colSpan={2}>Ý kiến người thực hiện tuần kiểm</th>
                            <th className="border-r border-slate-300 p-2 text-center" rowSpan={2}>Người nhận báo cáo ghi nhận xét, việc cần lưu ý. Ký tên</th>
                            <th className="p-2 text-center" colSpan={4}>Kết quả thực hiện của đơn vị BDTX, VHKTCTĐB</th>
                          </tr>
                          <tr className="bg-slate-50 border-b border-slate-300 font-bold">
                            <th className="border-r border-slate-300 p-1 text-center font-normal">Từ Km</th>
                            <th className="border-r border-slate-300 p-1 text-center font-normal">Đến Km</th>
                            <th className="border-r border-slate-300 p-1 text-center font-normal">Vị trí</th>
                            <th className="border-r border-slate-300 p-1 text-center font-normal">Yêu cầu sửa chữa hoặc xử lý vi phạm</th>
                            <th className="border-r border-slate-300 p-1 text-center font-normal">Thời gian hoàn thành</th>
                            <th className="border-r border-slate-300 p-1 text-center font-normal">Khối lượng</th>
                            <th className="border-r border-slate-300 p-1 text-center font-normal">Chất lượng</th>
                            <th className="border-r border-slate-300 p-1 text-center font-normal whitespace-nowrap">Thời gian hoàn thành thực tế</th>
                            <th className="p-1 text-center font-normal">Ảnh/Video sau khi sửa chữa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportCheckData.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors h-32">
                              <td className="border-r border-slate-300 p-2 text-center align-top">{row.date}</td>
                              <td className="border-r border-slate-300 p-2 font-bold text-slate-900 align-top">{row.item}</td>
                              <td className="border-r border-slate-300 p-1 text-center align-top">{row.mileage.from}</td>
                              <td className="border-r border-slate-300 p-1 text-center align-top">{row.mileage.to || "—"}</td>
                              <td className="border-r border-slate-300 p-1 text-center align-top font-medium italic">{row.mileage.pos}</td>
                              <td className="border-r border-slate-300 p-2 text-slate-600 align-top leading-tight">{row.status}</td>
                              <td className="border-r border-slate-300 p-2 text-center align-top font-black">{row.estimate}</td>
                              <td className="border-r border-slate-300 p-2 text-blue-700 align-top text-[10px] italic">{row.inspectorOpinion.request}</td>
                              <td className="border-r border-slate-300 p-2 text-center align-top">{row.inspectorOpinion.time}</td>
                              <td className="border-r border-slate-300 p-2 text-center align-bottom text-[10px] pb-4 italic text-slate-400">{row.recipient}</td>
                              <td className="border-r border-slate-300 p-1 text-center align-top font-medium">{row.results.volume}</td>
                              <td className="border-r border-slate-300 p-1 text-center align-top text-green-600 font-bold">{row.results.quality}</td>
                              <td className="border-r border-slate-300 p-1 text-center align-top">{row.results.actualTime}</td>
                              <td className="p-1 text-center align-top text-blue-500 underline text-[9px] cursor-pointer">{row.results.media}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}

                {/* Footer Signatures */}
                <div className="grid grid-cols-2 gap-20 mt-20 text-center font-serif">
                  <div className="space-y-24">
                    <p className="font-bold uppercase text-sm">Người lập biểu</p>
                    <p className="font-bold italic text-slate-400 opacity-50">_______________________</p>
                  </div>
                  <div className="space-y-24">
                    <p className="font-bold uppercase text-sm">Xác nhận của Sở Giao thông vận tải</p>
                    <p className="font-bold italic text-slate-400 opacity-50">_______________________</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* ===== MAP DIALOG ===== */}
      <Dialog open={isMapOpen} onOpenChange={(open) => { setIsMapOpen(open); if(!open) setMapViewMode('single'); }}>
        <DialogContent className="sm:max-w-[95vw] lg:max-w-[1400px] w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="flex flex-row items-center justify-between shrink-0 p-6 pb-2">
            <DialogTitle className="flex items-center gap-2">
              <MapIcon className="size-5 text-blue-600" />
              {mapViewMode === 'single' ? "Vị trí ghi nhận trên bản đồ số" : `Lộ trình tuần tra – ${mapMarkers[0]?.name}`}
            </DialogTitle>
            {mapViewMode === 'single' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setMapViewMode('history');
                  const baseLat = mapMarkers[0]?.lat || 21.028;
                  const baseLng = mapMarkers[0]?.lng || 105.854;
                  const history = [
                    { id: 'h1', name: 'Bắt đầu ca', lat: baseLat - 0.005, lng: baseLng - 0.005, time: '08:00', type: 'tuần tra', description: 'Bắt đầu di chuyển từ hạt' },
                    { id: 'h2', name: 'Điểm 1', lat: baseLat - 0.002, lng: baseLng - 0.003, time: '08:20', type: 'tuần tra', description: 'Kiểm tra Km1+500' },
                    { id: 'h3', name: 'Điểm 2 (Hiện tại)', lat: baseLat, lng: baseLng, time: '08:30', type: 'tuần tra', description: mapMarkers[0]?.description },
                    { id: 'h4', name: 'Điểm 3', lat: baseLat + 0.003, lng: baseLng + 0.002, time: '09:00', type: 'tuần tra', description: 'Kiểm tra Km2+100' },
                  ];
                  setHistoryMarkers(history);
                  setHistoryRoute({
                    id: 'route-1',
                    name: 'Lộ trình tuần tra',
                    coordinates: history.map(h => [h.lat, h.lng]),
                    color: '#3b82f6',
                    weight: 5
                  });
                }}
                className="mr-8 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Route className="size-4 mr-2" />
                Xem lịch sử/lộ trình
              </Button>
            )}
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden px-6 pb-4">
            {mapViewMode === 'history' && (
              <div className="col-span-1 lg:col-span-3 border rounded-xl bg-slate-50/50 flex flex-col overflow-hidden h-full shadow-inner">
                <div className="p-4 bg-white border-b flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-700">Lịch trình chi tiết</h4>
                  <Badge className="bg-blue-100 text-blue-700">{historyMarkers.length} điểm</Badge>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {historyMarkers.map((m, idx) => (
                    <div key={m.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative pl-10 hover:border-blue-300 transition-colors cursor-pointer group">
                      <div className="absolute left-5 top-5 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2 group-last:hidden" />
                      <div className="absolute left-5 top-5 size-5 rounded-full bg-blue-600 border-4 border-blue-50 -translate-x-1/2 z-10" />
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-xs text-blue-600">{m.time}</p>
                        <p className="text-[10px] text-slate-400">Dừng {idx+1}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{m.name}</p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{m.description}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white border-t">
                  <Button variant="ghost" size="sm" onClick={() => setMapViewMode('single')} className="w-full text-slate-500 text-xs"> Quay lại xem đơn điểm </Button>
                </div>
              </div>
            )}
            
            <div className={mapViewMode === 'history' ? 'lg:col-span-9' : 'col-span-12'}>
              <div className="rounded-xl overflow-hidden border border-slate-200 h-full relative group">
                <SimpleMapView
                  markers={mapViewMode === 'history' ? historyMarkers : mapMarkers}
                  routes={mapViewMode === 'history' && historyRoute ? [historyRoute] : []}
                  center={mapMarkers.length > 0 ? [mapMarkers[0].lat, mapMarkers[0].lng] : [21.028, 105.854]}
                  zoom={mapViewMode === 'history' ? 15 : 14}
                  height="100%"
                  isActive={isMapOpen}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="shrink-0 p-6 pt-3 border-t">
            <Button variant="outline" onClick={() => { setIsMapOpen(false); setMapViewMode('single'); }}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== CHECK-IN DETAIL DIALOG ===== */}
      {selectedCheckin && (
        <Dialog open={isCheckinDetailOpen} onOpenChange={setIsCheckinDetailOpen}>
          <DialogContent className="sm:max-w-[85vw] lg:max-w-[1000px] w-[90vw] flex flex-col max-h-[90vh] p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-2 shrink-0">
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="size-5 text-blue-600" />
                Chi tiết lượt check-in – {selectedCheckin.time}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto min-h-0 px-6 pb-6">
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {selectedCheckin.staff.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{selectedCheckin.staff}</p>
                      <p className="text-xs text-slate-500">Cán bộ tuần tra</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-slate-200">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Thời gian</p>
                      <p className="text-sm font-bold text-slate-800">{selectedCheckin.time}</p>
                      <p className="text-[11px] text-slate-500">10/03/2026</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Thiết bị</p>
                      <p className="text-sm font-bold text-slate-800">{selectedCheckin.device || "iPhone 13 Pro"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Độ chính xác GPS</p>
                      <p className="text-sm font-bold text-emerald-600">{selectedCheckin.accuracy}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Thời tiết</p>
                      <p className="text-sm font-bold text-slate-800">{selectedCheckin.weather}</p>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-slate-200 mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Lý trình (Mileage)</p>
                        <Badge className="bg-emerald-100 text-emerald-700 text-[9px] h-4">ĐÃ FIX GPS</Badge>
                      </div>
                      <p className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">{selectedCheckin.mileage || "Km1+200"}</p>
                    </div>
                    <div className="col-span-2 mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Địa chỉ ghi nhận</p>
                        <Badge className="bg-emerald-100 text-emerald-700 text-[9px] h-4">ĐÃ FIX GPS</Badge>
                      </div>
                      <p className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1.5 rounded leading-relaxed">{selectedCheckin.address || "123 Đường Bồ Đề, Long Biên, Hà Nội"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Hình ảnh hiện trường</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(selectedCheckin.images || []).map((img: string, i: number) => (
                      <div key={i} className="aspect-video rounded-lg border border-slate-200 bg-slate-100 overflow-hidden group/img relative">
                        <img src={img} alt="checkin" className="size-full object-cover transition-transform group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="size-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Ghi chú</p>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 italic">
                    "{selectedCheckin.note}"
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-[400px] md:h-auto sticky top-0">
                <SimpleMapView
                  markers={[{
                    id: 'current-chk',
                    name: selectedCheckin.staff,
                    lat: selectedCheckin.lat,
                    lng: selectedCheckin.lng,
                    type: 'tuần tra',
                    description: selectedCheckin.note
                  }]}
                  center={[selectedCheckin.lat, selectedCheckin.lng]}
                  zoom={16}
                  height="100%"
                  isActive={isCheckinDetailOpen}
                />
              </div>
            </div>
            <DialogFooter className="shrink-0 p-6 pt-3 border-t">
              <Button variant="outline" onClick={() => setIsCheckinDetailOpen(false)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
