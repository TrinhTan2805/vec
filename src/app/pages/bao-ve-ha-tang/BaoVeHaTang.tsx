import React, { useState } from "react";
import { Plus, FileDown, Search, Edit, Trash2, Eye, AlertTriangle, ShieldAlert, MapPin, Clock, User, Building2, CheckCircle2, ThumbsUp, MessageSquare, Share2, Save, X, AlertCircle, Filter, ChevronLeft, ChevronRight, Send, Map, Book, BookOpen, Wrench, ThermometerSun, CloudRain, Mic, Camera, LayoutGrid, Check, LayoutDashboard, Layers, Map as MapIcon } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "../../components/ui/dialog";

// Mock Comments
const mockCommentsData: Record<string, any[]> = {
  "VD-001": [{ id: 1, user: "Trần Thị B", avatar: "TB", text: "Đã kiểm tra sơ bộ, cần theo dõi thêm.", inPatrol: true, inInspection: false }],
  "VP-002": [{ id: 2, user: "Phạm Thị D", avatar: "PD", text: "Yêu cầu tháo dỡ ngay.", inPatrol: false, inInspection: true }],
};
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { SimpleMapView } from "../../components/map/SimpleMapView";

// ====== Data ======
const issuesList = [
  {
    id: "VD-001", objectName: "Quốc lộ 1A – Km234", type: "Hư hỏng mặt đường",
    reporter: "Nguyễn Văn A", avatar: "NV", unit: "Hạt QLĐB 1",
    date: "2026-03-05", time: "08:32",
    status: "unprocessed", note: "Ổ gà lớn, nguy hiểm cho xe cộ lưu thông vào ban đêm. Cần xử lý khẩn cấp.",
    likes: 4, comments: 2, views: 125, location: "Hà Nội", severity: "high",
    color: "red",
    inPatrolLog: true, inInspectionLog: false, inRepairPlan: true,
    images: [
      "/infra/road_pothole.png",
      "/infra/road_flooding.png",
      "/infra/bridge_crack.png",
    ],
  },
  {
    id: "VD-002", objectName: "Cầu Vĩnh Tuy", type: "Vết nứt kết cấu",
    reporter: "Trần Thị B", avatar: "TB", unit: "Hạt QLĐB 2",
    date: "2026-03-10", time: "14:15",
    status: "maintained", note: "Phát hiện vết nứt tại trụ P3, chiều dài khoảng 0.8m. Đã xử lý.",
    likes: 7, comments: 3, views: 342, location: "Long Biên, HN", severity: "medium",
    color: "amber",
    images: [
      "/infra/bridge_crack.png",
      "/infra/road_pothole.png",
    ],
  },
  {
    id: "VD-003", objectName: "Đường Vành đai 2", type: "Ngập nước",
    reporter: "Lê Văn C", avatar: "LC", unit: "Hạt QLĐB 3",
    date: "2026-03-18", time: "06:50",
    status: "planned", note: "Hệ thống thoát nước bị tắc, ngập sâu khoảng 30cm sau mưa lớn.",
    likes: 12, comments: 5, views: 521, location: "Cầu Giấy, HN", severity: "high",
    color: "blue",
    images: [
      "/infra/road_flooding.png",
    ],
  },
  {
    id: "VD-004", objectName: "Hầm Kim Liên", type: "Đèn chiếu sáng hỏng",
    reporter: "Phạm Thị D", avatar: "PD", unit: "Hạt QLĐB 1",
    date: "2026-03-20", time: "22:10",
    status: "reported", note: "3 bộ đèn chiếu sáng hỏng liên tiếp tại khu vực đầu hầm phía Nam.",
    likes: 3, comments: 1, views: 89, location: "Đống Đa, HN", severity: "medium",
    color: "purple",
    images: [
      "/infra/tunnel_lights.png",
      "/infra/road_pothole.png",
      "/infra/road_flooding.png",
      "/infra/bridge_crack.png",
    ],
  },
];

const violationsList = [
  {
    id: "VP-001", objectName: "Quốc lộ 1A – Km234", type: "Xây dựng trái phép",
    reporter: "Nguyễn Văn A", avatar: "NV", unit: "Hạt QLĐB 1",
    date: "2026-03-05", time: "09:00",
    violator: "Công ty XD Minh Phát",
    status: "unprocessed", note: "Phát hiện công trình xây dựng vi phạm hành lang ATGT tại Km234+500. Chiếm dụng 15m².",
    likes: 9, comments: 4, views: 1045, location: "Hà Nội", severity: "high",
    color: "red",
    images: [
      "/infra/illegal_construction.png",
      "/infra/road_cut.png",
    ],
  },
  {
    id: "VP-002", objectName: "Km 235 – QL1A", type: "Lấn chiếm vỉa hè",
    reporter: "Nguyễn Văn A", avatar: "NV", unit: "Hạt QLĐB 1",
    date: "2026-03-11", time: "15:30",
    violator: "Hộ KD Trần Thế",
    status: "planned", note: "Kiốt kinh doanh lấn ra lòng đường, gây cản trở lưu thông.",
    likes: 5, comments: 2, views: 420, location: "Hà Nội", severity: "medium",
    color: "amber",
    inPatrolLog: false, inInspectionLog: true, inRepairPlan: false,
    images: [
      "/infra/sidewalk_encroach.png",
      "/infra/road_debris.png",
      "/infra/illegal_construction.png",
    ],
  },
  {
    id: "VP-003", objectName: "Km 45 – QL5", type: "Đổ phế thải",
    reporter: "Lê Thị B", avatar: "LB", unit: "Hạt QLĐB 2",
    date: "2026-03-12", time: "07:20",
    violator: "Công ty VT Thống Nhất",
    status: "done", note: "Đổ phế liệu xây dựng trên lề đường, đã xử lý và dọn dẹp.",
    likes: 3, comments: 1, views: 76, location: "Gia Lâm, HN", severity: "low",
    color: "green",
    images: [
      "/infra/road_debris.png",
    ],
  },
  {
    id: "VP-004", objectName: "Đường Vành đai 3", type: "Cắt đường trái phép",
    reporter: "Phạm Thị D", avatar: "PD", unit: "Hạt QLĐB 3",
    date: "2026-03-22", time: "08:45",
    violator: "Cty CP Hạ tầng ABC",
    status: "reported", note: "Cắt mặt đường để lắp đặt đường ống chưa được cấp phép.",
    likes: 11, comments: 6, views: 645, location: "Hoàng Mai, HN", severity: "high",
    color: "red",
    images: [
      "/infra/road_cut.png",
      "/infra/illegal_construction.png",
      "/infra/road_pothole.png",
      "/infra/sidewalk_encroach.png",
    ],
  },
];

const avatarColors: Record<string, string> = {
  NV: "bg-blue-500", TB: "bg-purple-500", LC: "bg-green-500",
  PD: "bg-orange-500", LB: "bg-pink-500",
};

const severityConfig: Record<string, { label: string; cls: string }> = {
  high: { label: "Nghiêm trọng", cls: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "Trung bình", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  low: { label: "Nhẹ", cls: "bg-green-100 text-green-700 border-green-200" },
};

const typeIconColor: Record<string, string> = {
  red: "bg-red-100 text-red-600", amber: "bg-amber-100 text-amber-600",
  blue: "bg-blue-100 text-blue-600", purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
};

// ====== Photo Grid (Instagram-style) ======
function PhotoGrid({ images, onOpenLightbox }: { images: string[]; onOpenLightbox: (idx: number) => void }) {
  if (!images || images.length === 0) return null;
  const count = images.length;
  if (count === 1) {
    return (
      <div className="rounded-xl overflow-hidden cursor-pointer" onClick={() => onOpenLightbox(0)}>
        <img src={images[0]} alt="img" className="w-full h-52 object-cover hover:brightness-90 transition-all" />
      </div>
    );
  }
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden">
        {images.map((img, i) => (
          <img key={i} src={img} alt="img" onClick={() => onOpenLightbox(i)}
            className="w-full h-40 object-cover cursor-pointer hover:brightness-90 transition-all" />
        ))}
      </div>
    );
  }
  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden">
        <img src={images[0]} alt="img" onClick={() => onOpenLightbox(0)}
          className="row-span-2 w-full h-52 object-cover cursor-pointer hover:brightness-90 transition-all" />
        <img src={images[1]} alt="img" onClick={() => onOpenLightbox(1)}
          className="w-full h-[102px] object-cover cursor-pointer hover:brightness-90 transition-all" />
        <img src={images[2]} alt="img" onClick={() => onOpenLightbox(2)}
          className="w-full h-[102px] object-cover cursor-pointer hover:brightness-90 transition-all" />
      </div>
    );
  }
  // 4+
  const shown = images.slice(0, 4);
  const extra = count - 4;
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden">
      {shown.map((img, i) => (
        <div key={i} className="relative cursor-pointer" onClick={() => onOpenLightbox(i)}>
          <img src={img} alt="img" className="w-full h-28 object-cover hover:brightness-90 transition-all" />
          {i === 3 && extra > 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded text-white font-bold text-2xl">+{extra}</div>
          )}
        </div>
      ))}
    </div>
  );
}

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  unprocessed: { label: "Chưa xử lý",              cls: "bg-rose-100 text-rose-700 border-rose-200" },
  planned:     { label: "Đã lên kế hoạch bảo trì", cls: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  maintained:  { label: "Đã bảo trì",               cls: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  reported:    { label: "Đã báo tuần kiểm",         cls: "bg-amber-100 text-amber-700 border-amber-200" },
  done:        { label: "Đã hoàn thành",             cls: "bg-green-100 text-green-700 border-green-200" },
  // backward-compat
  pending:    { label: "Chưa xử lý",    cls: "bg-rose-100 text-rose-700 border-rose-200" },
  processing: { label: "Đã lên kế hoạch", cls: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  resolved:   { label: "Đã hoàn thành", cls: "bg-green-100 text-green-700 border-green-200" },
};

const getStatusBadge = (status: string) => {
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return <Badge variant="outline">{status}</Badge>;
  return <Badge className={cfg.cls}>{cfg.label}</Badge>;
};

const STAFF_LIST = [
  { id: "s1", name: "Nguyễn Văn A", unit: "Hạt QLĐB 1", avatar: "NV" },
  { id: "s2", name: "Trần Thị B",   unit: "Hạt QLĐB 2", avatar: "TB" },
  { id: "s3", name: "Lê Văn C",     unit: "Hạt QLĐB 3", avatar: "LC" },
  { id: "s4", name: "Phạm Thị D",   unit: "Hạt QLĐB 1", avatar: "PD" },
  { id: "s5", name: "Hoàng Văn E",  unit: "Phòng KT",   avatar: "HE" },
  { id: "s6", name: "Bùi Thị F",    unit: "Phòng KH",   avatar: "BF" },
];

function FeedCard({ item, isIssue, onView, onEdit, onDelete }: {
  item: any; isIssue: boolean;
  onView: () => void; onEdit: (isLocked: boolean) => void; onDelete: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [comments, setComments] = useState(mockCommentsData[item.id] || []);
  
  const [inPatrol, setInPatrol] = useState(item.inPatrolLog || false);
  const [inInspection, setInInspection] = useState(item.inInspectionLog || false);
  const [inRepair, setInRepair] = useState(item.inRepairPlan || false);

  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [searchStaffQuery, setSearchStaffQuery] = useState("");
  const [sendNote, setSendNote] = useState("");
  const [cardStatus, setCardStatus] = useState(item.status || 'unprocessed');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const images: string[] = item.images || [];

  const filteredStaffList = STAFF_LIST.filter(s => 
    s.name.toLowerCase().includes(searchStaffQuery.toLowerCase()) ||
    s.unit.toLowerCase().includes(searchStaffQuery.toLowerCase())
  );
  const lat = 21.028 + (item.id.charCodeAt(3) % 10) * 0.003;
  const lng = 105.834 + (item.id.charCodeAt(4) % 10) * 0.003;

  const isCreator = item.reporter === "Nguyễn Văn A"; // Demo current user
  const isLocked = inPatrol || inInspection || inRepair;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Card Header - like a post header */}
      <div className="flex items-start gap-3 p-4 pb-3">
        {/* Avatar */}
        <div className={`flex size-10 rounded-full items-center justify-center text-white font-bold text-sm flex-shrink-0 ${avatarColors[item.avatar] || "bg-slate-400"}`}>
          {item.avatar}
        </div>
        {/* Reporter info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 text-sm">{item.reporter}</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs flex items-center gap-1"><Building2 className="size-3" />{item.unit}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-slate-400 text-xs flex items-center gap-1"><Clock className="size-3" />{item.time}, {item.date}</span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="size-3" />{item.location}</span>
          </div>
        </div>
        {/* Status badge – clickable to update */}
        <div className="flex-shrink-0 relative">
          <button
            onClick={() => setIsStatusMenuOpen(v => !v)}
            title="Bấm để cập nhật trạng thái"
            className="cursor-pointer focus:outline-none"
          >
            {getStatusBadge(cardStatus)}
          </button>
          {isStatusMenuOpen && (
            <div
              className="absolute right-0 top-full mt-1 z-50 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 flex flex-col gap-1 min-w-[180px]"
              onMouseLeave={() => setIsStatusMenuOpen(false)}
            >
              {([
                { key: 'unprocessed', label: 'Chưa xử lý',          cls: 'text-rose-700 hover:bg-rose-50' },
                { key: 'planned',     label: 'Đã lên kế hoạch',      cls: 'text-indigo-700 hover:bg-indigo-50' },
                { key: 'maintained',  label: 'Đang xử lý / Bảo trì', cls: 'text-cyan-700 hover:bg-cyan-50' },
                { key: 'done',        label: '✅ Đã xử lý',             cls: 'text-green-700 hover:bg-green-50' },
              ] as const).map(opt => (
                <button
                  key={opt.key}
                  onClick={() => { setCardStatus(opt.key); setIsStatusMenuOpen(false); }}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${opt.cls} ${
                    cardStatus === opt.key ? 'opacity-100 font-bold ring-1 ring-inset ring-current' : 'opacity-80'
                  }`}
                >
                  {cardStatus === opt.key && <span>✓</span>}{opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Colored accent bar + Type chip */}
      <div className="px-4 pb-3">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-3 ${typeIconColor[item.color]}`}>
          {isIssue ? <AlertTriangle className="size-3" /> : <ShieldAlert className="size-3" />}
          {item.type}
        </div>

        {/* Main title */}
        <h3 className="font-bold text-slate-900 text-base leading-snug mb-1">{item.objectName}</h3>
        {!isIssue && item.violator && (
          <p className="text-xs text-red-600 font-medium mb-2 flex items-center gap-1">
            <User className="size-3" />Đối tượng vi phạm: <span className="font-bold">{item.violator}</span>
          </p>
        )}

        {/* Note / Description — like post content */}
        <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.note}</p>

        {/* Photo Grid */}
        {images.length > 0 && (
          <div className="mb-3">
            <PhotoGrid images={images} onOpenLightbox={(idx) => setLightboxIdx(idx)} />
          </div>
        )}

        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-[10px] text-slate-500">#{item.id}</Badge>
          <Badge className={`text-[10px] ${severityConfig[item.severity]?.cls}`}>{severityConfig[item.severity]?.label}</Badge>
        </div>

        {/* Logging Selection for the Incident */}
        <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-slate-50 border-dashed">
          <label className="flex items-center justify-center gap-1.5 cursor-pointer flex-1 bg-slate-50 hover:bg-slate-100 py-2 px-2 rounded-xl border border-slate-100 transition-colors">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
              checked={inPatrol || inInspection} onChange={(e) => {setInPatrol(e.target.checked); setInInspection(e.target.checked);}} />
            <Book className="size-3.5 text-blue-600" />
            <span className="text-[11px] font-semibold text-slate-700">Đưa vào sổ quản lý</span>
          </label>
          <label className="flex items-center justify-center gap-1.5 cursor-pointer flex-1 bg-slate-50 hover:bg-slate-100 py-2 px-2 rounded-xl border border-slate-100 transition-colors">
            <input type="checkbox" className="rounded border-slate-300 text-orange-600 focus:ring-orange-500" 
              checked={inRepair} onChange={(e) => setInRepair(e.target.checked)} />
            <Wrench className="size-3.5 text-orange-600" />
            <span className="text-[11px] font-semibold text-slate-700">KH sửa chữa</span>
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 mx-4" />

      {/* Social-style action bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-1">
          <button onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${liked ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100"}`}
          >
            <ThumbsUp className="size-3.5" />
            {item.likes + (liked ? 1 : 0)}
          </button>
          <button onClick={() => setIsCommentOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors">
            <MessageSquare className="size-3.5" />
            {item.comments + (comments.length - (mockCommentsData[item.id] ? mockCommentsData[item.id].length : 0))}
          </button>
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 select-none">
            <Eye className="size-3.5" />
            {(item.views ?? 0).toLocaleString()}
          </span>
          <button
            onClick={() => {
              const text = `${item.type}: ${item.objectName} - ${item.note}`;
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({ title: item.objectName, text, url }).catch(() => {});
              } else {
                const zaloUrl = `https://zalo.me/share/url?href=${encodeURIComponent(url)}&title=${encodeURIComponent(item.objectName)}`;
                window.open(zaloUrl, '_blank');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Share2 className="size-3.5" />Chia sẻ
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onView} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
            <Eye className="size-3.5" />Xem
          </button>
          <button onClick={() => setIsSendOpen(true)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-violet-600 hover:bg-violet-50 transition-colors">
            <Send className="size-3.5" />Gửi
          </button>
          {isCreator && (
            <button onClick={() => onEdit(isLocked)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              <Edit className="size-3.5" />Sửa
            </button>
          )}
          {isCreator && !isLocked && (
            <button onClick={onDelete} title="Xóa" className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      </div>



      {/* ===== SEND TO PERSON DIALOG ===== */}
      <Dialog open={isSendOpen} onOpenChange={setIsSendOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="size-5 text-violet-600" />
              Gửi cho cán bộ phụ trách
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input 
                value={searchStaffQuery}
                onChange={(e) => setSearchStaffQuery(e.target.value)}
                placeholder="Tìm kiếm cán bộ, phòng ban..." 
                className="pl-9 h-10 border-slate-200 bg-slate-50 rounded-xl"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">Danh sách cán bộ ({filteredStaffList.length})</p>
              {filteredStaffList.length > 0 && (
                <button 
                  onClick={() => {
                    if (selectedStaffIds.length === filteredStaffList.length) {
                      setSelectedStaffIds([]);
                    } else {
                      setSelectedStaffIds(filteredStaffList.map(s => s.id));
                    }
                  }}
                  className="text-xs font-semibold text-violet-600 hover:underline"
                >
                  {selectedStaffIds.length === filteredStaffList.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
              {filteredStaffList.length === 0 ? (
                <p className="col-span-2 text-center text-sm text-slate-500 py-4">Không tìm thấy cán bộ nào.</p>
              ) : (
                filteredStaffList.map((s) => {
                  const isSelected = selectedStaffIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedStaffIds(prev => prev.filter(id => id !== s.id));
                        } else {
                          setSelectedStaffIds(prev => [...prev, s.id]);
                        }
                      }}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500 shadow-sm"
                          : "border-slate-200 hover:border-violet-300 hover:bg-violet-50 bg-white"
                      }`}
                    >
                      <div className={`flex size-8 rounded-full items-center justify-center text-white font-bold text-xs flex-shrink-0 ${avatarColors[s.avatar] || "bg-slate-400"}`}>
                        {s.avatar}
                      </div>
                      <div className="min-w-0 pr-4">
                        <p className="font-semibold text-slate-800 text-xs truncate">{s.name}</p>
                        <p className="text-[10px] text-slate-400">{s.unit}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute right-2.5 text-violet-600">
                          <CheckCircle2 className="size-4" />
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Ghi chú (tùy chọn)</p>
              <Input value={sendNote} onChange={(e) => setSendNote(e.target.value)} placeholder="Nội dung thông báo..." className="h-10 rounded-xl" />
            </div>
          </div>
          <DialogFooter className="gap-2 pt-2 border-t mt-4">
            <button onClick={() => setIsSendOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium transition-colors">Hủy</button>
            <button
              disabled={selectedStaffIds.length === 0}
              onClick={() => { 
                setIsSendOpen(false); 
                setSelectedStaffIds([]); 
                setSendNote(""); 
                setSearchStaffQuery("");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all shadow-sm ${
                selectedStaffIds.length > 0 ? "bg-violet-600 hover:bg-violet-700 hover:shadow-md" : "bg-slate-300 cursor-not-allowed text-slate-500"
              }`}
            >
              <Send className="size-4" />
              Gửi thông báo {selectedStaffIds.length > 0 && `(${selectedStaffIds.length})`}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== COMMENT DIALOG ===== */}
      <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
        <DialogContent className="max-w-lg overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="size-5 text-blue-600" />
              Bình luận ({item.comments + (comments.length - (mockCommentsData[item.id]?.length || 0))})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[50vh] overflow-y-auto pr-2">
            {comments.map((c: any, i: number) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`flex size-8 rounded-full items-center justify-center text-white font-bold text-xs flex-shrink-0 ${avatarColors[c.avatar] || "bg-slate-400"}`}>
                  {c.avatar}
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-100 p-3 rounded-2xl rounded-tl-none">
                  <p className="font-semibold text-slate-800 text-sm">{c.user}</p>
                  <p className="text-slate-600 text-sm mt-1">{c.text}</p>
                  
                  {/* Selectors for logs within comment */}
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-200">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                        checked={c.inPatrol || c.inInspection}
                        onChange={() => {
                          const newer = [...comments]; 
                          newer[i].inPatrol = !newer[i].inPatrol; 
                          newer[i].inInspection = newer[i].inPatrol;
                          setComments(newer);
                        }}
                      />
                      <span className="text-xs font-medium text-slate-600">Đưa vào sổ quản lý</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
            {comments.length === 0 && <p className="text-center text-sm text-slate-500 py-4">Chưa có bình luận nào.</p>}
          </div>
          <div className="pt-3 border-t flex gap-2 items-center bg-white">
            <Input 
              placeholder="Viết bình luận hoặc phân tích..." 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border-slate-200 bg-slate-50 rounded-xl h-10" 
              onKeyDown={(e) => {
                if(e.key === "Enter" && newComment.trim()) {
                  setComments([...comments, { id: Date.now(), user: "Tài khoản của tôi", avatar: "NV", text: newComment, inPatrol: false, inInspection: false }]);
                  setNewComment("");
                }
              }}
            />
            <Button 
              disabled={!newComment.trim()}
              onClick={() => {
                setComments([...comments, { id: Date.now(), user: "Tài khoản của tôi", avatar: "NV", text: newComment, inPatrol: false, inInspection: false }]);
                setNewComment("");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 h-10"
            >
              <Send className="size-4 mr-1.5" /> Gửi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== Lightbox ===== */}
      {lightboxIdx !== null && (
        <Dialog open={lightboxIdx !== null} onOpenChange={() => setLightboxIdx(null)}>
          <DialogContent className="max-w-4xl p-0 bg-black border-0 overflow-hidden">
            <div className="relative flex items-center justify-center min-h-[60vh]">
              <img src={images[lightboxIdx]} alt="preview" className="max-h-[80vh] max-w-full object-contain" />
              {/* Close */}
              <button onClick={() => setLightboxIdx(null)} title="Đóng"
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors">
                <X className="size-5" />
              </button>
              {/* Prev */}
              {lightboxIdx > 0 && (
                <button onClick={() => setLightboxIdx(lightboxIdx - 1)} title="ảnh trước"
                  className="absolute left-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors">
                  <ChevronLeft className="size-6" />
                </button>
              )}
              {/* Next */}
              {lightboxIdx < images.length - 1 && (
                <button onClick={() => setLightboxIdx(lightboxIdx + 1)} title="ảnh tiếp theo"
                  className="absolute right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors">
                  <ChevronRight className="size-6" />
                </button>
              )}
              {/* Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                {lightboxIdx + 1} / {images.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

const accidentsList: any[] = [];
const infrastructureList: any[] = [];

// ====== Main Component ======
export default function BaoVeHaTang() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [activeTab, setActiveTab] = useState<"issues" | "violations" | "accidents" | "infrastructure">("issues");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formLocked, setFormLocked] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSoTuanDuongOpen, setIsSoTuanDuongOpen] = useState(false);
  const [isSoTuanKiemOpen, setIsSoTuanKiemOpen] = useState(false);
  const [detailStatus, setDetailStatus] = useState('unprocessed');

  const [selectedType, setSelectedType] = useState("Hư hỏng mặt đường");
  const [formLyTrinh, setFormLyTrinh] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [formSeverity, setFormSeverity] = useState<'high' | 'low'>('high');

  const getLocationAddress = async () => {
    if (!navigator.geolocation) { alert("Trình duyệt không hỗ trợ GPS"); return; }
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=vi`);
          const data = await res.json();
          const addr = data.display_name || `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
          setFormAddress(addr);
        } catch {
          setFormAddress("Không lấy được địa chỉ");
        } finally {
          setIsGettingLocation(false);
        }
      },
      () => { setIsGettingLocation(false); alert("Không thể lấy vị trí GPS"); },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  React.useEffect(() => {
    if (isFormOpen) {
      setSelectedType(selectedItem?.type || "Hư hỏng mặt đường");
      setFormLyTrinh(selectedItem?.lyTrinh || "");
      setFormAddress(selectedItem?.location || "");
      setFormSeverity(selectedItem?.severity === 'low' ? 'low' : 'high');
    }
  }, [isFormOpen, selectedItem]);

  React.useEffect(() => {
    if (isDetailOpen && selectedItem) setDetailStatus(selectedItem.status || 'unprocessed');
  }, [isDetailOpen, selectedItem]);
  const [logFilter, setLogFilter] = useState("all");
  const [repairFilter, setRepairFilter] = useState("all");

  const baseData = activeTab === "issues" ? issuesList :
                   activeTab === "violations" ? violationsList :
                   activeTab === "accidents" ? accidentsList : infrastructureList;
  const currentData = baseData.filter(item => {
    if (logFilter === "in_log" && !(item.inPatrolLog || item.inInspectionLog)) return false;
    
    if (repairFilter === "in_plan" && !item.inRepairPlan) return false;
    if (repairFilter === "not_in_plan" && item.inRepairPlan) return false;
    
    return true;
  });

  const isIssue = activeTab === "issues";

  const stats = {
    total: currentData.length,
    pending: currentData.filter(i => i.status === "pending").length,
    processing: currentData.filter(i => i.status === "processing").length,
    resolved: currentData.filter(i => i.status === "resolved").length,
  };

  return (
    <div className="space-y-5">
      {/* ===== Top action bar ===== */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-sm gap-4">
        {/* Tab pills */}
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab("issues")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === "issues" ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <AlertTriangle className="size-4" />Danh sách vấn đề
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === "issues" ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-500"}`}>{issuesList.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("violations")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === "violations" ? "bg-white shadow text-red-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <ShieldAlert className="size-4" />Vi phạm giao thông
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === "violations" ? "bg-red-100 text-red-600" : "bg-slate-200 text-slate-500"}`}>{violationsList.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("accidents")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === "accidents" ? "bg-white shadow text-orange-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <AlertTriangle className="size-4" />Tai nạn
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === "accidents" ? "bg-orange-100 text-orange-600" : "bg-slate-200 text-slate-500"}`}>{accidentsList.length}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border p-1 bg-slate-50 mr-2">
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 shadow-none" title="Dạng danh sách">
              <LayoutDashboard className="h-4 w-4 mr-2 hidden sm:block" /> Danh sách
            </Button>
            <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 shadow-none" title="Bản đồ không gian (GIS)">
              <MapIcon className="h-4 w-4 mr-2 hidden sm:block" /> Bản đồ
            </Button>
          </div>
          <Button variant="outline" size="sm" className="h-9 border-slate-200" onClick={() => setIsSoTuanDuongOpen(true)}><Book className="mr-1.5 size-4 text-blue-600" />Xuất sổ tuần đường</Button>
          <Button variant="outline" size="sm" className="h-9 border-slate-200" onClick={() => setIsSoTuanKiemOpen(true)}><BookOpen className="mr-1.5 size-4 text-emerald-600" />Xuất sổ tuần kiểm</Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-9" onClick={() => { setSelectedItem(null); setFormLocked(false); setIsFormOpen(true); }}>
            <Plus className="mr-1.5 size-4" />{isIssue ? "Thêm vấn đề" : "Thêm mới"}
          </Button>
        </div>
      </div>

      {/* ===== Stats Row ===== */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Tổng", value: stats.total, icon: <AlertCircle className="size-5" />, cls: "text-slate-700 bg-slate-100" },
          { label: "Chờ xử lý", value: stats.pending, icon: <Clock className="size-5" />, cls: "text-amber-600 bg-amber-50" },
          { label: "Đang xử lý", value: stats.processing, icon: <AlertTriangle className="size-5" />, cls: "text-blue-600 bg-blue-50" },
          { label: "Đã xử lý", value: stats.resolved, icon: <CheckCircle2 className="size-5" />, cls: "text-green-600 bg-green-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-xl ${s.cls}`}>{s.icon}</div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Search & Filter bar ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input placeholder="Tìm kiếm..." className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-xl" />
        </div>
        <Select>
          <SelectTrigger className="h-10 w-44 bg-slate-50 border-slate-200 rounded-xl"><SelectValue placeholder="Loại" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            {isIssue ? (
              <>
                <SelectItem value="v1">Hư hỏng mặt đường</SelectItem>
                <SelectItem value="v2">Vết nứt kết cấu</SelectItem>
                <SelectItem value="v3">Ngập nước</SelectItem>
                <SelectItem value="v4">Đèn hỏng</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="v1">Xây dựng trái phép</SelectItem>
                <SelectItem value="v2">Lấn chiếm vỉa hè</SelectItem>
                <SelectItem value="v3">Đổ phế thải</SelectItem>
                <SelectItem value="v4">Cắt đường trái phép</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="h-10 w-40 bg-slate-50 border-slate-200 rounded-xl"><SelectValue placeholder="Tình trạng" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="pending">Chờ xử lý</SelectItem>
            <SelectItem value="processing">Đang xử lý</SelectItem>
            <SelectItem value="resolved">Đã xử lý</SelectItem>
          </SelectContent>
        </Select>
        <Select value={logFilter} onValueChange={setLogFilter}>
          <SelectTrigger className="h-10 w-44 bg-slate-50 border-slate-200 rounded-xl"><SelectValue placeholder="Nhật ký/Sổ" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả sổ</SelectItem>
            <SelectItem value="in_log">Đã vào sổ quản lý</SelectItem>
          </SelectContent>
        </Select>
        <Select value={repairFilter} onValueChange={setRepairFilter}>
          <SelectTrigger className="h-10 w-40 bg-slate-50 border-slate-200 rounded-xl"><SelectValue placeholder="Kế hoạch SC" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả KH SC</SelectItem>
            <SelectItem value="in_plan">Đã đưa vào kế hoạch</SelectItem>
            <SelectItem value="not_in_plan">Chưa đưa vào kế hoạch</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-xl px-5">
          <Filter className="mr-2 size-4" />Lọc
        </Button>
      </div>

      {/* ===== Feed Layout ===== */}
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentData.map((item) => (
            <FeedCard
              key={item.id}
              item={item}
              isIssue={isIssue}
              onView={() => { setSelectedItem(item); setIsDetailOpen(true); }}
              onEdit={(isLocked) => { setSelectedItem(item); setFormLocked(isLocked); setIsFormOpen(true); }}
              onDelete={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
            />
          ))}
        </div>
      ) : (
        <Card className="h-[650px] flex flex-col relative overflow-hidden ring-1 ring-slate-200">
          <CardHeader className="py-3 border-b z-10 bg-white/95 backdrop-blur shadow-sm flex flex-row items-center justify-between">
            <h3 className="text-base font-bold flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-600" /> Bản đồ GIS: {
              activeTab === "issues" ? "Vấn đề hạ tầng" :
              activeTab === "violations" ? "Vi phạm hành lang" :
              activeTab === "accidents" ? "Tai nạn giao thông" : "Công trình bảo vệ"
            }</h3>
          </CardHeader>
          <div className="flex-1 relative">
            <SimpleMapView 
              markers={currentData.map((item: any) => ({
                id: item.id,
                lat: 21.028 + (item.id.charCodeAt(3) % 10) * 0.003,
                lng: 105.834 + (item.id.charCodeAt(4) % 10) * 0.003,
                name: item.objectName,
                type: item.type
              }))} 
              center={[21.0285, 105.8542]}
              zoom={13}
              isActive={viewMode === "map"}
            />
          </div>
        </Card>
      )}

      {/* ===== ADD/EDIT FORM DIALOG ===== */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="w-[66vw] max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isIssue ? <AlertTriangle className="size-5 text-amber-500" /> : <ShieldAlert className="size-5 text-red-500" />}
              {selectedItem ? (isIssue ? "Chỉnh sửa vấn đề" : "Chỉnh sửa vi phạm") : (isIssue ? "Thêm vấn đề mới" : "Thêm vi phạm mới")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2 max-h-[70vh] overflow-y-auto px-1">

            {/* ── SECTION 1: PHÂN LOẠI SỰ CỐ ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">① Phân loại sự cố</span>
                <div className="flex-1 h-px bg-amber-100" />
              </div>

              {/* Loại vấn đề */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">
                  Loại vấn đề *
                  {formLocked && <span className="ml-2 text-[10px] text-amber-600 italic bg-amber-50 px-2 py-0.5 rounded-full">(Đã khoá)</span>}
                </label>
                <Select value={selectedType} onValueChange={setSelectedType} disabled={formLocked}>
                  <SelectTrigger className="h-10"><SelectValue placeholder="Chọn loại vấn đề" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hư hỏng mặt đường">Hư hỏng mặt đường</SelectItem>
                    <SelectItem value="Hư hỏng công trình">Hư hỏng công trình</SelectItem>
                    <SelectItem value="Tai nạn giao thông">Tai nạn giao thông</SelectItem>
                    <SelectItem value="Xây dựng trái phép">Xây dựng trái phép</SelectItem>
                    <SelectItem value="Lấn chiếm vỉa hè">Lấn chiếm vỉa hè</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mức độ sự cố */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Mức độ sự cố</label>
                <div className="flex gap-3">
                  <button type="button" disabled={formLocked} onClick={() => setFormSeverity('high')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      formSeverity === 'high'
                        ? 'border-red-400 bg-red-50 text-red-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50/50'
                    }`}>
                    <span className="text-base">⚠️</span> Nghiêm trọng
                  </button>
                  <button type="button" disabled={formLocked} onClick={() => setFormSeverity('low')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      formSeverity === 'low'
                        ? 'border-green-400 bg-green-50 text-green-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-green-200 hover:bg-green-50/50'
                    }`}>
                    <span className="text-base">✅</span> Không nghiêm trọng
                  </button>
                </div>
              </div>

              {/* Conditional detail fields */}
              {selectedType === "Hư hỏng mặt đường" && (
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Diện tích hư hỏng (m²)</label>
                  <div className="relative">
                    <Input disabled={formLocked} placeholder="Ví dụ: 5.5" className="h-10 pr-10" />
                    <Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" />
                  </div>
                </div>
              )}
              {selectedType === "Hư hỏng công trình" && (
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Loại công trình</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Rãnh nước</Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Hố ga</Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Cột Km</Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Cột H</Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Biển báo</Badge>
                  </div>
                  <div className="relative">
                    <Input disabled={formLocked} placeholder="Nhập tên công trình..." defaultValue="Tường chắn" className="h-10 pr-10 pl-9 font-medium text-blue-600 border-slate-300" />
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" />
                  </div>
                </div>
              )}
              {selectedType === "Tai nạn giao thông" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Số người chết</label>
                    <div className="relative"><Input disabled={formLocked} placeholder="..." className="h-10 pr-10" /><Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" /></div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Số người bị thương</label>
                    <div className="relative"><Input disabled={formLocked} placeholder="..." className="h-10 pr-10" /><Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" /></div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Hư hỏng công trình nào</label>
                    <div className="relative"><Input disabled={formLocked} placeholder="..." className="h-10 pr-10" /><Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" /></div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Nguyên nhân tai nạn</label>
                    <div className="relative"><Input disabled={formLocked} placeholder="..." className="h-10 pr-10" /><Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" /></div>
                  </div>
                </div>
              )}
            </div>

            {/* ── SECTION 2: VỊ TRÍ ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">② Vị trí</span>
                <div className="flex-1 h-px bg-blue-100" />
              </div>

              {/* Tuyến đường */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Tuyến đường</label>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <span className="text-[10px] text-slate-400 italic">Gần đây:</span>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Quốc lộ 1A</Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Quốc lộ 10</Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">QL.37</Badge>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer font-normal rounded">Cầu Vĩnh Tuy</Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input disabled={formLocked} placeholder="Tìm kiếm tuyến khác..." className="h-10 pl-9 pr-10" defaultValue={selectedItem?.objectName} />
                  <Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" />
                </div>
              </div>

              {/* Lý trình + Vị trí cùng hàng */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Lý trình</label>
                  <div className="relative">
                    <Input disabled={formLocked} value={formLyTrinh} onChange={(e) => setFormLyTrinh(e.target.value)}
                      placeholder="Km 12+300" className="h-10 pr-10 font-mono" />
                    <Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" />
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {["Km 0+000", "Km 5+000", "Km 12+300", "Km 25+500"].map(km => (
                      <button key={km} onClick={() => !formLocked && setFormLyTrinh(km)}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors font-mono">
                        {km}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Vị trí trên đường</label>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md bg-white shadow-sm text-slate-700"> Trái</button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md text-slate-500 hover:text-slate-700"> Phải</button>
                  </div>
                </div>
              </div>

              {/* Địa chỉ cụ thể (GPS) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-500">Địa chỉ cụ thể</label>
                  <button type="button" disabled={formLocked || isGettingLocation} onClick={getLocationAddress}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <MapPin className="size-3" />
                    {isGettingLocation ? "Đang lấy vị trí..." : "📍 Lấy vị trí GPS"}
                  </button>
                </div>
                <div className="relative">
                  <Input disabled={formLocked} placeholder="Ví dụ: Km 12+300, Thanh Trì..." className="h-10 pr-10"
                    value={formAddress} onChange={(e) => setFormAddress(e.target.value)} />
                  <Mic className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-blue-500 cursor-pointer" />
                </div>
                {formAddress && (
                  <p className="text-[10px] text-slate-400 mt-1 truncate">
                    <MapPin className="size-2.5 inline mr-0.5 text-green-500" />{formAddress}
                  </p>
                )}
              </div>
            </div>

            {/* ── SECTION 3: ĐIỀU KIỆN & XỬ LÝ ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">③ Điều kiện & Xử lý</span>
                <div className="flex-1 h-px bg-purple-100" />
              </div>

              {/* Thời tiết */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Thời tiết lúc ghi nhận</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md bg-white shadow-sm text-slate-700">
                    <Check className="size-3" /> ☀️ Nắng
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md text-slate-500 hover:text-slate-700">
                    🌧️ Mưa
                  </button>
                </div>
              </div>

              {/* Trạng thái xử lý */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Trạng thái xử lý</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 px-3 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50">Đã xử lý tạm thời</button>
                  <button className="py-2 px-3 text-xs font-semibold rounded-lg border border-blue-200 text-blue-700 bg-blue-100 flex justify-center items-center gap-1"><Check className="size-3" /> Cần xử lý ngay</button>
                  <button className="py-2 px-3 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50">Cần đưa vào kế hoạch</button>
                  <button className="py-2 px-3 text-xs font-semibold rounded-lg border border-green-200 text-green-700 bg-green-50 flex justify-center items-center gap-1"><CheckCircle2 className="size-3" /> Đã xử lý</button>
                </div>
              </div>
            </div>

            {/* ── SECTION 4: HÌNH ẢNH & MÔ TẢ ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">④ Hình ảnh & Mô tả</span>
                <div className="flex-1 h-px bg-green-100" />
              </div>

              {/* Ảnh minh họa */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Ảnh minh họa</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto size-8 text-blue-500" />
                    <div className="flex text-sm text-slate-600">
                      <span className="relative cursor-pointer rounded-md font-medium text-slate-500 focus-within:outline-none hover:text-blue-500">
                        Bấm để chụp ảnh hoặc chọn từ máy
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết */}
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Mô tả chi tiết</label>
                <div className="relative">
                  <textarea disabled={formLocked} placeholder="Mô tả chi tiết tình trạng vấn đề..." className="w-full min-h-[100px] p-3 pr-10 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={selectedItem?.note} />
                  <Mic className="absolute right-3 bottom-3 size-4 text-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsFormOpen(false)}><X className="mr-2 size-4" />Hủy</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsFormOpen(false)}>
              <Save className="mr-2 size-4" />{selectedItem ? "Cập nhật" : "Đăng ghi nhận"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DETAIL DIALOG ===== */}
      {selectedItem && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="w-[60vw] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {isIssue ? <AlertTriangle className="size-5 text-amber-500" /> : <ShieldAlert className="size-5 text-red-500" />}
                Chi tiết {isIssue ? "vấn đề" : "vi phạm"}
              </DialogTitle>
            </DialogHeader>
            {/* Social-style detail card */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`flex size-12 rounded-full items-center justify-center text-white font-bold ${avatarColors[selectedItem.avatar] || "bg-slate-400"}`}>
                  {selectedItem.avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{selectedItem.reporter}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><Building2 className="size-3" />{selectedItem.unit} · {selectedItem.time}, {selectedItem.date}</p>
                </div>
                <div className="ml-auto">{getStatusBadge(detailStatus)}</div>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${typeIconColor[selectedItem.color]}`}>
                {isIssue ? <AlertTriangle className="size-3" /> : <ShieldAlert className="size-3" />}
                {selectedItem.type}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{selectedItem.objectName}</p>
                {!isIssue && selectedItem.violator && (
                  <p className="text-sm text-red-600 font-medium mt-1 flex items-center gap-1">
                    <User className="size-3.5" />Đối tượng vi phạm: <strong>{selectedItem.violator}</strong>
                  </p>
                )}
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">{selectedItem.note}</p>
              </div>
              {/* Images */}
              {selectedItem.images && selectedItem.images.length > 0 && (
                <div className="rounded-xl overflow-hidden">
                  <PhotoGrid images={selectedItem.images} onOpenLightbox={() => {}} />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px]">#{selectedItem.id}</Badge>
                <Badge className={`text-[10px] ${severityConfig[selectedItem.severity]?.cls}`}>{severityConfig[selectedItem.severity]?.label}</Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1 ml-2"><MapPin className="size-3" />{selectedItem.location}</span>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Eye className="size-3.5" />{selectedItem.views || 0} lượt xem</span>
                <span className="flex items-center gap-1"><ThumbsUp className="size-3.5" />{selectedItem.likes} lượt đánh dấu</span>
                <span className="flex items-center gap-1"><MessageSquare className="size-3.5" />{selectedItem.comments} bình luận</span>
              </div>

              {/* === CẬP NHẬT TRẠNG THÁI === */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-2">🛠 Cập nhật trạng thái xử lý</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { key: 'unprocessed', label: 'Chưa xử lý',          cls: 'border-rose-200 text-rose-700 hover:bg-rose-50',   active: 'bg-rose-100 border-rose-400 text-rose-700 font-bold' },
                    { key: 'planned',     label: 'Đã lên kế hoạch',      cls: 'border-indigo-200 text-indigo-700 hover:bg-indigo-50', active: 'bg-indigo-100 border-indigo-400 text-indigo-700 font-bold' },
                    { key: 'maintained',  label: 'Đang xử lý / Bảo trì', cls: 'border-cyan-200 text-cyan-700 hover:bg-cyan-50',    active: 'bg-cyan-100 border-cyan-400 text-cyan-700 font-bold' },
                    { key: 'done',        label: '✅ Đã xử lý hoàn thành', cls: 'border-green-200 text-green-700 hover:bg-green-50',  active: 'bg-green-100 border-green-400 text-green-700 font-bold' },
                  ] as const).map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setDetailStatus(opt.key)}
                      className={`py-2 px-3 text-xs rounded-lg border-2 transition-all ${
                        detailStatus === opt.key ? opt.active : 'bg-white ' + opt.cls
                      }`}
                    >
                      {detailStatus === opt.key && <span className="mr-1">✓</span>}{opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => { setIsDetailOpen(false); setIsFormOpen(true); }}>
                <Edit className="mr-2 size-4" />Chỉnh sửa
              </Button>
              <Button
                className={`text-white ${
                  detailStatus === 'done' ? 'bg-green-600 hover:bg-green-700' :
                  detailStatus === 'planned' ? 'bg-indigo-600 hover:bg-indigo-700' :
                  detailStatus === 'maintained' ? 'bg-cyan-600 hover:bg-cyan-700' :
                  'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => setIsDetailOpen(false)}
              >
                <Save className="mr-2 size-4" />Lưu trạng thái
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== SỔ TUẦN ĐƯỜNG DIALOG ===== */}
      <Dialog open={isSoTuanDuongOpen} onOpenChange={setIsSoTuanDuongOpen}>
        <DialogContent className="w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Book className="size-5 text-blue-600" />
              Sổ theo dõi tuần đường
              <span className="ml-2 text-xs font-normal text-slate-400">Năm 2026 · Hạt QLĐB 1</span>
            </DialogTitle>
          </DialogHeader>
          {/* Header info */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-xl text-sm">
            <div><span className="text-xs text-slate-500">Đơn vị quản lý</span><p className="font-semibold text-slate-800">Hạt QLĐB 1 – Hà Nội</p></div>
            <div><span className="text-xs text-slate-500">Tuyến đường phụ trách</span><p className="font-semibold text-slate-800">Quốc lộ 1A, QL.37, QL.10</p></div>
            <div><span className="text-xs text-slate-500">Tổng chiều dài</span><p className="font-semibold text-slate-800">142.5 km</p></div>
          </div>
          {/* Log table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">STT</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">Ngày tuần</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">Tuyến – Lý trình</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">Cán bộ tuần đường</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">Thời tiết</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">Tình trạng đường</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">Vấn đề phát hiện</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold whitespace-nowrap">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { stt:1, date:"05/03/2026", tuyen:"Quốc lộ 1A", lyTrinh:"Km 230+000 – Km 236+000", canBo:"Nguyễn Văn A", thoiTiet:"Nắng", tinhTrang:"Bình thường", vanDe:"Ổ gà tại Km 234+200", status:"Chưa xử lý" },
                  { stt:2, date:"08/03/2026", tuyen:"Quốc lộ 1A", lyTrinh:"Km 226+000 – Km 230+000", canBo:"Trần Thị B", thoiTiet:"Mưa nhẹ", tinhTrang:"Ngập nhẹ cục bộ", vanDe:"Cống thoát nước bị tắc Km 228", status:"Đã xử lý" },
                  { stt:3, date:"10/03/2026", tuyen:"QL.37", lyTrinh:"Km 0+000 – Km 8+500", canBo:"Lê Văn C", thoiTiet:"Nắng", tinhTrang:"Bình thường", vanDe:"Biển báo P.245 bị mờ", status:"Có kế hoạch" },
                  { stt:4, date:"12/03/2026", tuyen:"Quốc lộ 1A", lyTrinh:"Km 236+000 – Km 241+500", canBo:"Nguyễn Văn A", thoiTiet:"Nhiều mây", tinhTrang:"Bình thường", vanDe:"Không phát hiện", status:"Hoàn thành" },
                  { stt:5, date:"15/03/2026", tuyen:"QL.10", lyTrinh:"Km 5+000 – Km 12+000", canBo:"Phạm Thị D", thoiTiet:"Nắng", tinhTrang:"Vết nứt dọc", vanDe:"Nứt mặt đường đoạn Km 9+300", status:"Chưa xử lý" },
                  { stt:6, date:"18/03/2026", tuyen:"Đường Vành đai 2", lyTrinh:"Km 0+000 – Km 6+200", canBo:"Lê Văn C", thoiTiet:"Mưa to", tinhTrang:"Ngập 30cm", vanDe:"Ngập úng nghiêm trọng, ùn tắc", status:"Đã xử lý" },
                ].map(row => (
                  <tr key={row.stt} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2.5 text-slate-500">{row.stt}</td>
                    <td className="px-3 py-2.5 font-medium text-slate-800 whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-slate-800">{row.tuyen}</p>
                      <p className="text-slate-400 font-mono text-[10px]">{row.lyTrinh}</p>
                    </td>
                    <td className="px-3 py-2.5 text-slate-700">{row.canBo}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        row.thoiTiet.includes('Mưa') ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>{row.thoiTiet.includes('Mưa') ? '🌧️' : '☀️'} {row.thoiTiet}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">{row.tinhTrang}</td>
                    <td className="px-3 py-2.5 text-slate-700 max-w-[180px]">{row.vanDe}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.status === 'Hoàn thành' || row.status === 'Đã xử lý' ? 'bg-green-100 text-green-700' :
                        row.status === 'Có kế hoạch' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Summary */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Tổng số buổi tuần', value: '6', color: 'text-slate-800 bg-slate-100' },
              { label: 'Phát hiện vấn đề', value: '5', color: 'text-amber-700 bg-amber-50' },
              { label: 'Đã xử lý', value: '2', color: 'text-green-700 bg-green-50' },
              { label: 'Chờ xử lý', value: '2', color: 'text-rose-700 bg-rose-50' },
            ].map(s => (
              <div key={s.label} className={`p-3 rounded-xl ${s.color} flex flex-col gap-1`}>
                <span className="text-[10px] font-medium opacity-80">{s.label}</span>
                <span className="text-2xl font-bold">{s.value}</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSoTuanDuongOpen(false)}>Đóng</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><FileDown className="mr-2 size-4" />Xuất Excel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== SỔ TUẦN KIỂM DIALOG ===== */}
      <Dialog open={isSoTuanKiemOpen} onOpenChange={setIsSoTuanKiemOpen}>
        <DialogContent className="w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="size-5 text-emerald-600" />
              Sổ theo dõi kiểm tra công trình
              <span className="ml-2 text-xs font-normal text-slate-400">Năm 2026 · Hạt QLĐB 1</span>
            </DialogTitle>
          </DialogHeader>
          {/* Header info */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-emerald-50 rounded-xl text-sm">
            <div><span className="text-xs text-slate-500">Đơn vị kiểm tra</span><p className="font-semibold text-slate-800">Phòng Quản lý Đường bộ</p></div>
            <div><span className="text-xs text-slate-500">Loại kiểm tra</span><p className="font-semibold text-slate-800">Định kỳ & Đột xuất</p></div>
            <div><span className="text-xs text-slate-500">Kỳ báo cáo</span><p className="font-semibold text-slate-800">Quý I/2026</p></div>
          </div>
          {/* Log table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">STT</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Ngày kiểm tra</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Công trình / Tuyến</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Loại KT</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Cán bộ kiểm tra</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Hạng mục kiểm tra</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Kết quả / Đề xuất</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Mức độ</th>
                  <th className="px-3 py-2.5 text-left text-slate-600 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { stt:1, date:"05/03/2026", ct:"Cầu Vĩnh Tuy", loaiKT:"Định kỳ", canBo:"Trần Thị B", hangMuc:"Kết cấu trụ, dầm, mặt cầu", ketQua:"Vết nứt tại trụ P3 – L≈0.8m. Đề xuất gia cường", mucDo:"Trung bình", status:"Đã lên KH" },
                  { stt:2, date:"10/03/2026", ct:"Quốc lộ 1A – Km234", loaiKT:"Đột xuất", canBo:"Nguyễn Văn A", hangMuc:"Mặt đường, thoát nước", ketQua:"Ổ gà nghiêm trọng – đường kính 1.2m. Cần vá ngay", mucDo:"Nghiêm trọng", status:"Chưa XL" },
                  { stt:3, date:"12/03/2026", ct:"Hầm Kim Liên", loaiKT:"Định kỳ", canBo:"Phạm Thị D", hangMuc:"Hệ thống chiếu sáng, PCCC", ketQua:"4 bóng đèn hỏng – khu vực cổng vào. Thay thế trong tuần", mucDo:"Nhẹ", status:"Đã xử lý" },
                  { stt:4, date:"15/03/2026", ct:"QL.10 – Đoạn Km5-12", loaiKT:"Định kỳ", canBo:"Lê Văn C", hangMuc:"Mặt đường, lề đường, biển báo", ketQua:"Nứt dọc L≈50m tại Km9+300. Đề xuất sửa chữa trong tháng 4", mucDo:"Trung bình", status:"Có kế hoạch" },
                  { stt:5, date:"18/03/2026", ct:"Đường Vành đai 2", loaiKT:"Đột xuất", canBo:"Lê Văn Bình", hangMuc:"Thoát nước, hành lang ATGT", ketQua:"Hệ thống thoát nước tắc nghẽn hoàn toàn. Cần nạo vét khẩn cấp", mucDo:"Nghiêm trọng", status:"Đã xử lý" },
                  { stt:6, date:"20/03/2026", ct:"Cầu Nhật Tân", loaiKT:"Định kỳ", canBo:"Trần Thị B", hangMuc:"Gối cầu, mặt đường trên cầu, lan can", ketQua:"Bình thường – không phát hiện hư hỏng", mucDo:"–", status:"Hoàn thành" },
                ].map(row => (
                  <tr key={row.stt} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2.5 text-slate-500">{row.stt}</td>
                    <td className="px-3 py-2.5 font-medium text-slate-800 whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-2.5">
                      <p className="font-medium text-slate-800">{row.ct}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        row.loaiKT === 'Đột xuất' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>{row.loaiKT}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-700">{row.canBo}</td>
                    <td className="px-3 py-2.5 text-slate-600 max-w-[150px]">{row.hangMuc}</td>
                    <td className="px-3 py-2.5 text-slate-700 max-w-[200px]">{row.ketQua}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.mucDo === 'Nghiêm trọng' ? 'bg-red-100 text-red-700' :
                        row.mucDo === 'Trung bình' ? 'bg-amber-100 text-amber-700' :
                        row.mucDo === 'Nhẹ' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>{row.mucDo}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.status === 'Hoàn thành' || row.status === 'Đã xử lý' ? 'bg-green-100 text-green-700' :
                        row.status === 'Có kế hoạch' || row.status === 'Đã lên KH' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Summary */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Tổng đợt kiểm tra', value: '6', color: 'text-slate-800 bg-slate-100' },
              { label: 'Nghiêm trọng', value: '2', color: 'text-red-700 bg-red-50' },
              { label: 'Đã xử lý / Hoàn thành', value: '3', color: 'text-green-700 bg-green-50' },
              { label: 'Chờ / Có KH', value: '3', color: 'text-indigo-700 bg-indigo-50' },
            ].map(s => (
              <div key={s.label} className={`p-3 rounded-xl ${s.color} flex flex-col gap-1`}>
                <span className="text-[10px] font-medium opacity-80">{s.label}</span>
                <span className="text-2xl font-bold">{s.value}</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSoTuanKiemOpen(false)}>Đóng</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white"><FileDown className="mr-2 size-4" />Xuất Excel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== DELETE DIALOG ===== */}
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={{ title: isIssue ? "Vấn đề ghi nhận" : "Vi phạm giao thông" }}
        selectedItem={{
          fullName: selectedItem?.objectName,
          idNumber: selectedItem?.id,
          registrationDate: selectedItem?.date
        }}
        onConfirmDelete={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
