import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Route, Building2, CircleDot, Navigation, AlertCircle, Clock, CheckCircle, ChevronDown, ChevronUp, Layers, BarChart3, X, AlertTriangle, MapPin, TableProperties, Eye, EyeOff, Filter, HardHat, Waves, Search, Settings, Map, Plus, SlidersHorizontal, Activity, UserCheck } from "lucide-react";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { SimpleMapView } from "../components/map/SimpleMapView";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { DetailDialog } from "../components/infrastructure/DetailDialog";
import { EditDialog } from "../components/infrastructure/EditDialog";
import { DeleteDialog } from "../components/infrastructure/DeleteDialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import { cn } from "../components/ui/utils";

const DEFAULT_LAYER_COLORS: Record<string, string> = {
  tuyenDuong: "#3b82f6", cau: "#3b82f6", ham: "#3b82f6", duongNgang: "#3b82f6", nutGiao: "#3b82f6", hanhLang: "#3b82f6", phuTro: "#3b82f6", congNghe: "#3b82f6", dauNoi: "#3b82f6", haTangVT: "#3b82f6",
  tuyenDuongThuy: "#06b6d4", nhanhLuong: "#06b6d4",
  tuyenDuongSat: "#6366f1", truCau: "#6366f1",
  tuanDuong: "#eab308", tuanDen: "#eab308", tuanSong: "#eab308", tuanSat: "#eab308",
  suCo: "#be123c", viPham: "#ef4444", taiNan: "#9f1239",
  matDuong: "#f97316", cau_sua: "#f97316", cot: "#f97316",
  dangThiCong: "#10b981", dangBanGiao: "#10b981", moiBanGiao: "#10b981",
  duong1Chieu: "#3f3f46", camTrongTai: "#3f3f46", duongCam: "#3f3f46",
};

function DynamicColorDot({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.style.backgroundColor = color;
  }, [color]);
  return <div ref={ref} className="size-3 rounded-full border border-border/50 flex-shrink-0" />;
}

const stats = [
  {
    title: "Tổng số đường bộ",
    value: "2,847",
    subtitle: "Tổng số đường trong hệ",
    icon: <Route className="size-5" />,
    change: "+ 8.1%",
    color: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    title: "Quản lý cầu, hầm",
    value: "1,234",
    subtitle: "Cầu, hầm lớn",
    icon: <Building2 className="size-5" />,
    change: "+ 4.1%",
    color: "bg-slate-500/20",
    iconColor: "text-slate-400",
  },
  {
    title: "Báo cáo & Kiểm định",
    value: "456",
    subtitle: "Tuyến đường dừng",
    icon: <CircleDot className="size-5" />,
    change: "+ 2.4%",
    color: "bg-slate-600/20",
    iconColor: "text-slate-300",
  },
  {
    title: "Chu kỳ bảo trì hoàn tất",
    value: "89",
    subtitle: "Tuyến đường bảo trì xong",
    icon: <Navigation className="size-5" />,
    change: "+ 15.3%",
    color: "bg-primary/30",
    iconColor: "text-primary",
  },
];

const recentFieldEvents = [
  {
    id: "CI001",
    type: "Check-in",
    address: "Tuyến QL32 - Cầu Diễn",
    location: "Km 12+200",
    route: "QL32",
    user: "Nguyễn Văn A",
    reporter: "Nguyễn Văn A",
    status: "Hoàn thành",
    time: "09:15",
    reportedDate: "10/05/2026",
    image: "/images/violations/violation_1.png",
    lat: 21.0360,
    lng: 105.7950,
  },
  {
    id: "VD001",
    type: "Sự cố",
    address: "Cầu Nhật Tân",
    location: "Trụ P5",
    route: "Võ Chí Công",
    user: "Trần Thị B",
    reporter: "Trần Thị B",
    status: "Chờ xử lý",
    time: "10:30",
    reportedDate: "10/05/2026",
    image: "/images/violations/violation_2.png",
    lat: 21.0815,
    lng: 105.8291,
  },
  {
    id: "VP001",
    type: "Vi phạm",
    address: "Hoàn Kiếm, Hà Nội",
    location: "Tràng Tiền",
    route: "Đường đô thị",
    user: "Lê Văn C",
    violator: "Hộ kinh doanh lấn chiếm",
    reporter: "Lê Văn C",
    status: "Đang xử lý",
    time: "14:30",
    reportedDate: "10/05/2026",
    image: "/images/violations/violation_3.png",
    lat: 21.0250,
    lng: 105.8520,
  },
  {
    id: "CI002",
    type: "Check-in",
    address: "Đại lộ Thăng Long",
    location: "Hầm chui HS2",
    route: "ĐL Thăng Long",
    user: "Phạm Văn D",
    reporter: "Phạm Văn D",
    status: "Hoàn thành",
    time: "15:45",
    reportedDate: "10/05/2026",
    image: "/images/violations/violation_4.png",
    lat: 21.0118,
    lng: 105.8386,
  }
];

const INITIAL_MARKERS = [
  {
    id: 1,
    name: "Cầu Nhật Tân",
    lat: 21.0815,
    lng: 105.8291,
    type: "Cầu",
    description: "Cầu treo bắc qua sông Hồng, chiều dài 3.9km",
    currentStatus: { condition: "Tốt", lastInspection: "15/02/2026" }
  },
  {
    id: 2,
    name: "Cầu Vĩnh Tuy",
    lat: 21.0086,
    lng: 105.8678,
    type: "Cầu",
    description: "Cầu bắc qua sông Hồng, cần kiểm định Q2/2026",
    currentStatus: { condition: "Trung bình", lastInspection: "28/01/2026" }
  },
  {
    id: 5,
    name: "QL1A - Hà Nội",
    lat: 21.0285,
    lng: 105.8542,
    type: "Quốc lộ",
    description: "Đoạn qua trung tâm Hà Nội",
    currentStatus: { condition: "Tốt", lastInspection: "18/03/2026" }
  },
  { id: 20, name: "Hầm Kim Liên", lat: 21.0118, lng: 105.8386, type: "Hầm", description: "Hầm chui cơ giới nút giao Kim Liên" },
  { id: 22, name: "Tuyến ĐTNĐ Sông Hồng", lat: 21.0028, lng: 105.8753, type: "Đường thủy", description: "Tuyến đường thủy nội địa quốc gia" },
  { id: 23, name: "Tuyến ĐS Cát Linh - Hà Đông", lat: 21.0245, lng: 105.8412, type: "Đường sắt", description: "Tuyến đường sắt đô thị số 2A" },
  { id: 24, name: "Vi phạm lấn chiếm", lat: 21.0185, lng: 105.8112, type: "Vi phạm", description: "Lấn chiếm hành lang an toàn" },
  // Hư hỏng mặt đường
  { id: 101, name: "Sụt lún mặt đường vành đai 3", lat: 21.0325, lng: 105.8012, type: "Hư hỏng mặt đường (nghiêm trọng)", description: "Sụt lún 50cm do mưa lớn kéo dài, cần khắc phục gấp" },
  { id: 1011, name: "Ổ gà tuyến QL32", lat: 21.0500, lng: 105.7500, type: "Hư hỏng mặt đường (nghiêm trọng)", description: "Xuất hiện nhiều ổ gà sâu 10-15cm gây nguy hiểm cho người đi xe máy" },
  { id: 1012, name: "Rạn nứt mặt nhựa đường Giải Phóng", lat: 20.9850, lng: 105.8420, type: "Hư hỏng mặt đường (nghiêm trọng)", description: "Bề mặt nhựa đường nứt nẻ chân chim diện rộng do xe quá tải" },

  // Công trình thi công
  { id: 102, name: "Dự án mở rộng ngã tư Sở", lat: 21.0155, lng: 105.8200, type: "Công trình thi công", description: "Đang rào chắn thi công hầm chui cơ giới" },
  { id: 1021, name: "Thi công cầu vượt Mai Dịch", lat: 21.0380, lng: 105.7820, type: "Công trình thi công", description: "Lắp ráp dầm thép vượt rào, hiện đang cấm một phần đường" },
  { id: 1022, name: "Lát đá vỉa hè Tôn Đức Thắng", lat: 21.0260, lng: 105.8330, type: "Công trình thi công", description: "Đang đào xới vỉa hè để thay thế đá lát mẻ nứt" },

  // Ngập lụt
  { id: 103, name: "Điểm ngập úng Nguyễn Trãi", lat: 20.9985, lng: 105.8055, type: "Ngập lụt", description: "Ngập sâu 40cm cục bộ chiều nay, các phương tiện chết máy nhiều" },
  { id: 1031, name: "Ngập lụt phố Thái Hà", lat: 21.0140, lng: 105.8200, type: "Ngập lụt", description: "Nước ngập tràn bờ lên vỉa hè sau trận mưa rào kéo dài 2 tiếng" },
  { id: 1032, name: "Đọng nước cục bộ Triều Khúc", lat: 20.9840, lng: 105.7990, type: "Ngập lụt", description: "Mưa lớn gây đọng nước kéo dài do tắc cống tiêu thoát nước" },

  // Hư hỏng cầu
  { id: 104, name: "Nứt khe co giãn Cầu Chương Dương", lat: 21.0350, lng: 105.8550, type: "Hư hỏng cầu", description: "Yêu cầu giảm tốc độ qua cầu và tiến hành duy tu bản thép" },
  { id: 1041, name: "Tróc sơn, rỉ sét Cầu Long Biên", lat: 21.0425, lng: 105.8590, type: "Hư hỏng cầu", description: "Phát hiện bong tróc sơn, rỉ sét chân dầm cần sơn bảo dưỡng" },
  { id: 1042, name: "Đứt cáp can Cầu Thanh Trì", lat: 20.9950, lng: 105.8900, type: "Hư hỏng cầu", description: "Xe container va chạm làm đứt 5m cáp, móp lan can thành cầu" },

  // Công trình đang bàn giao
  { id: 105, name: "Cầu vượt đi bộ Tây Sơn", lat: 21.0100, lng: 105.8250, type: "Công trình đang bàn giao", description: "Chuẩn bị thông xe kỹ thuật vào cuối sáng thứ 6 tuần này" },
  { id: 1051, name: "Tuyến đường sắt Nhổn - Ga Hà Nội", lat: 21.0300, lng: 105.8050, type: "Công trình đang bàn giao", description: "Đang hoàn tất hồ sơ nghiệm thu dứt điểm cho đoạn chạy trên cao" },
  { id: 1052, name: "Nút giao Pháp Vân - Cầu Giẽ", lat: 20.9540, lng: 105.8420, type: "Công trình đang bàn giao", description: "Bàn giao các hạng mục vuốt nối mặt đường phụ trợ cho chủ đầu tư" },
  ...recentFieldEvents.map((v: any) => ({
    id: v.id,
    name: v.address,
    lat: v.lat,
    lng: v.lng,
    type: v.type,
    description: v.location,
    image: v.image,
    time: v.time,
    date: v.reportedDate,
    violator: v.violator || v.user,
    status: v.status
  }))
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [mapMarkers, setMapMarkers] = useState(INITIAL_MARKERS);
  const [isViolationsOpen, setIsViolationsOpen] = useState(true);
  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [layers, setLayers] = useState({
    duongBo: {
      tuyenDuong: true,
      cau: true,
      ham: true,
      duongNgang: false,
      nutGiao: true,
      hanhLang: false,
      phuTro: false,
      congNghe: false,
      dauNoi: false,
      haTangVT: false,
    },
    duongThuy: {
      tuyenDuongThuy: false,
      nhanhLuong: false,
    },
    duongSat: {
      tuyenDuongSat: false,
      truCau: false,
    },
    baoVe: {
      tuanDuong: false,
      tuanDen: false,
      tuanSong: false,
      tuanSat: false,
    },
    phanAnh: {
      suCo: true,
      viPham: true,
      taiNan: false,
    },
    suaChua: {
      matDuong: false,
      cau: false,
      cot: false,
    },
    congTrinh: {
      dangThiCong: false,
      dangBanGiao: false,
      moiBanGiao: false,
    },
    toChucGT: {
      duong1Chieu: false,
      camTrongTai: false,
      duongCam: false,
    }
  });

  const [activeTab, setActiveTab] = useState<string | null>(null);

  const quickSearchTabs = [
    { id: 'vi_pham', label: 'Vi phạm', icon: <AlertTriangle className="size-4" /> },
    { id: 'hu_hong_mat_duong', label: 'Hư hỏng mặt đường (nghiêm trọng)', icon: <AlertCircle className="size-4" /> },
    { id: 'cong_trinh_thi_cong', label: 'Công trình thi công', icon: <HardHat className="size-4" /> },
    { id: 'ngap_lut', label: 'Ngập lụt', icon: <Waves className="size-4" /> },
    { id: 'hu_hong_cau', label: 'Hư hỏng cầu', icon: <Building2 className="size-4" /> },
    { id: 'ban_giao', label: 'Công trình đang bàn giao', icon: <CheckCircle className="size-4" /> },
  ];


  const [baseLayer, setBaseLayer] = useState<'Bản đồ nền giao thông' | 'Bản đồ vệ tinh' | 'Bản đồ địa hình'>('Bản đồ nền giao thông');
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCondition, setFilterCondition] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([21.0285, 105.8542]);
  const [mapZoom, setMapZoom] = useState(11);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState<any[]>([]);

  const [layerColors, setLayerColors] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('gthnLayerColors');
      return saved ? { ...DEFAULT_LAYER_COLORS, ...JSON.parse(saved) } : DEFAULT_LAYER_COLORS;
    } catch {
      return DEFAULT_LAYER_COLORS;
    }
  });
  const [isLayerSettingsOpen, setIsLayerSettingsOpen] = useState(false);
  
  // State for Add GIS Feature
  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
  const [addFeatureType, setAddFeatureType] = useState('point');

  // State for Layer Info
  const [isLayerInfoOpen, setIsLayerInfoOpen] = useState(false);
  const [selectedLayerInfo, setSelectedLayerInfo] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem('gthnLayerColors', JSON.stringify(layerColors));
  }, [layerColors]);

  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        const res = await fetch('/geojson/manifest.json');
        if (res.ok) {
          const manifest = await res.json();
          const loadedData = await Promise.all(
            manifest.map(async (item: any) => {
              const gjRes = await fetch(`/geojson/${item.file}`);
              if (gjRes.ok) {
                const data = await gjRes.json();
                return {
                  name: item.name,
                  type: item.name,
                  data
                };
              }
              return null;
            })
          );
          setGeoJsonData(loadedData.filter(Boolean));
        }
      } catch (err) {
        console.error("Failed to load geojson data:", err);
      }
    };
    fetchGeoJson();
  }, []);

  const layerLabels: Record<string, string> = {
    duongBo: "TÀI SẢN ĐƯỜNG BỘ",
    duongThuy: "TÀI SẢN ĐƯỜNG THỦY",
    duongSat: "TÀI SẢN ĐƯỜNG SẮT",
    baoVe: "BẢO VỆ KCHT",
    phanAnh: "LỚP PHẢN ÁNH",
    suaChua: "SỬA CHỮA",
    congTrinh: "CÔNG TRÌNH THI CÔNG",
    toChucGT: "TỔ CHỨC GIAO THÔNG",
    tuyenDuong: "Tuyến đường",
    cau: "Cầu",
    ham: "Hầm",
    duongNgang: "Đường ngang",
    nutGiao: "Nút giao",
    hanhLang: "Hành lang an toàn",
    phuTro: "Công trình phụ trợ",
    congNghe: "Hệ thống công nghệ",
    dauNoi: "Đấu nối",
    haTangVT: "Hạ tầng vận tải",
    tuyenDuongThuy: "Tuyến ĐTNĐ",
    nhanhLuong: "Nhánh của luồng",
    tuyenDuongSat: "Tuyến ĐS đô thị",
    truCau: "Trụ cầu ĐS đô thị",
    tuanDuong: "Tuần đường",
    tuanDen: "Tuần đèn",
    tuanSong: "Tuần sông",
    tuanSat: "Tuần sắt",
    suCo: "Sự cố",
    viPham: "Vi phạm",
    taiNan: "Tai nạn",
    matDuong: "Mặt đường",
    cot: "Cột biển",
    dangThiCong: "Đang thi công",
    dangBanGiao: "Đang bàn giao",
    moiBanGiao: "Mới bàn giao",
    duong1Chieu: "Đường 1 chiều",
    camTrongTai: "Cấm trọng tải theo giờ",
    duongCam: "Đường cấm",
  };

  const layerGroups = {
    duongBo: ['tuyenDuong', 'cau', 'ham', 'duongNgang', 'nutGiao', 'hanhLang', 'phuTro', 'congNghe', 'dauNoi', 'haTangVT'],
    duongThuy: ['tuyenDuongThuy', 'nhanhLuong'],
    duongSat: ['tuyenDuongSat', 'truCau'],
    baoVe: ['tuanDuong', 'tuanDen', 'tuanSong', 'tuanSat'],
    phanAnh: ['suCo', 'viPham', 'taiNan'],
    suaChua: ['matDuong', 'cau', 'cot'],
    congTrinh: ['dangThiCong', 'dangBanGiao', 'moiBanGiao'],
    toChucGT: ['duong1Chieu', 'camTrongTai', 'duongCam'],
  };

  const toggleLayer = (group: keyof typeof layers, layer: string) => {
    setLayers((prev: any) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [layer]: !prev[group][layer],
      },
    }));
  };

  const toggleGroup = (group: keyof typeof layers) => {
    const allOn = Object.values(layers[group]).every(v => v);
    setLayers((prev: any) => {
      const newGroup = { ...prev[group] };
      Object.keys(newGroup).forEach((key) => {
        newGroup[key] = !allOn;
      });
      return { ...prev, [group]: newGroup };
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang xử lý": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Chờ xử lý": return "bg-blue-400/10 text-blue-300 border-blue-400/30";
      case "Đã xử lý": return "bg-blue-600/10 text-blue-500 border-blue-600/30";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  const handleViolationClick = (lat?: number, lng?: number) => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
      setMapZoom(16);
      if (!layers.phanAnh.viPham) {
        setLayers(prev => ({ ...prev, phanAnh: { ...prev.phanAnh, viPham: true } }));
      }
    }
  };

  const handleEdit = (marker: any) => { setSelectedItem(marker); setIsEditOpen(true); };
  const handleDelete = (marker: any) => { setSelectedItem(marker); setIsDeleteOpen(true); };
  const handleViewDetails = (marker: any) => { setSelectedItem(marker); setIsDetailOpen(true); };

  const handleFlyTo = (lat: number, lng: number) => {
    setMapCenter([lat, lng]);
    setMapZoom(16);
  };

  const dynamicBottom = isViolationsOpen ? 'bottom-[14.5rem]' : 'bottom-[5.5rem]';

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <SimpleMapView markers={mapMarkers.filter(m => {
          if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            return m.name.toLowerCase().includes(query) || m.type.toLowerCase().includes(query);
          }
          return true;
        })}
          geoJsonData={geoJsonData}
          layerColors={layerColors}
          height="100%"
          center={mapCenter} zoom={mapZoom}
          baseLayer={baseLayer}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
          bottomOffsetClass={dynamicBottom}
          onOpenSettings={() => setIsLayerSettingsOpen(true)}
          onOpenInfo={(layer) => {
            setSelectedLayerInfo(layer);
            setIsLayerInfoOpen(true);
          }}
        />
      </div>



      <div className="absolute bottom-6 left-6 right-6 z-[1000] pointer-events-auto transition-all duration-300">
        <div className="bg-card/95 border border-border rounded-lg backdrop-blur-md shadow-xl flex flex-col">
          <div className="px-4 py-2 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-primary" />
              <h3 className="text-sm font-medium">Hoạt động thực địa mới nhất</h3>
              <Badge className="bg-primary/20 text-primary">{recentFieldEvents.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsViolationsOpen(!isViolationsOpen)}>{isViolationsOpen ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}</Button>
          </div>
          {isViolationsOpen && (
            <div className="p-2 flex gap-3 overflow-x-auto scrollbar-thin">
              {recentFieldEvents.map((v) => (
                <div key={v.id} onClick={() => handleViolationClick(v.lat, v.lng)} className="bg-secondary/15 border border-border/50 rounded-lg p-2.5 min-w-[320px] cursor-pointer hover:bg-secondary/25 transition-all">
                  <div className="flex gap-3">
                    <div className="relative">
                      <img src={v.image} alt={v.id} className="w-20 h-20 object-cover rounded-md bg-white border border-border/50" />
                      <div className={cn(
                        "absolute -top-2 -left-2 size-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm",
                        v.type === 'Check-in' ? "bg-emerald-500 text-white" :
                        v.type === 'Sự cố' ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                      )}>
                        {v.type === 'Check-in' ? <UserCheck className="size-3" /> :
                         v.type === 'Sự cố' ? <AlertCircle className="size-3" /> : <AlertTriangle className="size-3" />}
                      </div>
                    </div>
                    <div className="text-[11px] space-y-1.5 flex-1 relative">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={cn(
                          "text-[9px] px-1 py-0 h-4",
                          v.type === 'Check-in' ? "border-emerald-200 text-emerald-700 bg-emerald-50" :
                          v.type === 'Sự cố' ? "border-amber-200 text-amber-700 bg-amber-50" : "border-red-200 text-red-700 bg-red-50"
                        )}>
                          {v.type}
                        </Badge>
                        <span className="text-muted-foreground">{v.time}</span>
                      </div>
                      <p className="font-bold text-sm text-slate-800 line-clamp-1">{v.address}</p>
                      <p className="text-slate-600 truncate">{v.type === 'Check-in' ? 'Nhân viên: ' : 'Đối tượng: '}{v.user || v.violator}</p>
                      <div className="flex items-center justify-between mt-1 pt-1 border-t border-border/40">
                        <Badge className={cn("text-[10px] h-5", getStatusColor(v.status))}>{v.status}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 px-2 py-0 text-[10px] text-blue-600 hover:bg-blue-50/50 hover:text-blue-800 font-medium"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            navigate(v.type === 'Vi phạm' ? '/bao-ve-ha-tang' : '/bao-ve/kiem-tra-kcht'); 
                          }}
                        >
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`absolute right-6 z-[1000] pointer-events-auto transition-all duration-300 flex flex-col gap-2 ${dynamicBottom}`}>
        {/* Draw GIS Features Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="h-10 w-10 bg-blue-600 text-white shadow-xl rounded-lg hover:bg-blue-700 transition-colors" title="Thêm mới dữ liệu GIS">
              <Plus className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md border-border/50 shadow-xl mb-2 min-w-[200px]">
            <DropdownMenuItem className="gap-2 cursor-pointer py-2.5 hover:bg-blue-50 focus:bg-blue-50 outline-none" onClick={() => { setAddFeatureType('point'); setIsAddFeatureOpen(true); }}>
               <MapPin className="size-4 text-blue-600" />
               <span className="font-medium text-slate-700">Thêm điểm / Nút giao</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer py-2.5 hover:bg-emerald-50 focus:bg-emerald-50 outline-none" onClick={() => { setAddFeatureType('line'); setIsAddFeatureOpen(true); }}>
               <Route className="size-4 text-emerald-600" />
               <span className="font-medium text-slate-700">Vẽ tuyến / Đường / Cầu</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer py-2.5 hover:bg-amber-50 focus:bg-amber-50 outline-none" onClick={() => { setAddFeatureType('polygon'); setIsAddFeatureOpen(true); }}>
               <Layers className="size-4 text-amber-600" />
               <span className="font-medium text-slate-700">Vẽ vùng ranh giới</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Map Base Layers Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="h-10 w-10 bg-card border border-border shadow-xl rounded-lg hover:bg-secondary/40 transition-colors">
              <Map className="size-5 text-slate-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md border-border/50 shadow-xl mb-2">
            {['Bản đồ nền giao thông', 'Bản đồ vệ tinh', 'Bản đồ địa hình'].map((l) => (
              <DropdownMenuItem
                key={l}
                onClick={() => setBaseLayer(l as any)}
                className={`text-[11px] uppercase py-2 cursor-pointer font-medium ${baseLayer === l ? 'text-primary bg-primary/5' : 'text-slate-600'}`}
              >
                {l}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="absolute top-6 left-[72px] right-6 z-[1000] pointer-events-auto flex flex-row items-start gap-4">
        <div className="w-80 lg:w-[380px] relative flex-shrink-0 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="size-[18px] text-slate-500 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm tài sản, vi phạm..."
            className="w-full bg-card border-0 rounded-full py-3.5 pl-11 pr-12 text-[15px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-shadow placeholder:text-slate-500 font-medium text-slate-800"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveTab(null);
            }}
          />
          <button 
            className="absolute inset-y-0 right-2 flex items-center justify-center w-10 text-slate-400 hover:text-blue-600 transition-colors bg-transparent border-0 outline-none p-0 cursor-pointer"
            onClick={() => setIsFilterOpen(true)}
            title="Bộ lọc nâng cao"
          >
            <SlidersHorizontal className="size-[18px]" />
          </button>
        </div>

        <div className="flex flex-1 gap-2.5 overflow-x-auto justify-start py-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {quickSearchTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (activeTab === tab.id) {
                  setActiveTab(null);
                  setSearchQuery("");
                } else {
                  setActiveTab(tab.id);
                  setSearchQuery(tab.label);
                }
              }}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-card rounded-full whitespace-nowrap text-[14px] font-medium transition-all shadow-[0px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] hover:bg-slate-50 ${activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 shadow-none border border-blue-200/50 hover:bg-blue-100'
                : 'text-slate-600 border border-transparent'
                }`}
            >
              <span className={activeTab === tab.id ? "text-blue-600" : "text-slate-500"}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Search / Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-2xl bg-white border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2 text-blue-800">
              <SlidersHorizontal className="size-5" /> 
              Tìm kiếm nâng cao / Lọc thuộc tính
            </DialogTitle>
            <DialogDescription>
              Thiết lập các tiêu chí chi tiết để tìm kiếm chính xác tài sản hạ tầng hoặc vi phạm sự cố.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Loại thuộc tính</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-slate-50"><SelectValue placeholder="Tất cả" /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="all">Tất cả tài sản & Sự cố</SelectItem>
                   <SelectItem value="asset">Tài sản hạ tầng</SelectItem>
                   <SelectItem value="violation">Vi phạm / Sự cố</SelectItem>
                   <SelectItem value="maintenance">Công trình bảo trì</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Tình trạng kiểm định</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Tốt', 'Trung bình', 'Kém', 'Cáo cấp'].map(cond => (
                  <Badge 
                    key={cond} 
                    variant={filterCondition === cond ? 'default' : 'outline'} 
                    className={`cursor-pointer px-3 py-1 ${filterCondition === cond ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-slate-100 text-slate-600 bg-white border-slate-200'}`}
                    onClick={() => setFilterCondition(filterCondition === cond ? null : cond)}
                  >
                    {cond}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Trạng thái xử lý (Sự cố)</Label>
              <Select defaultValue="any">
                <SelectTrigger className="bg-slate-50"><SelectValue placeholder="Bất kỳ" /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="any">Bất kỳ trạng thái</SelectItem>
                   <SelectItem value="done">Đã xử lý</SelectItem>
                   <SelectItem value="pending">Đang xử lý</SelectItem>
                   <SelectItem value="waiting">Chờ xử lý</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Khu vực / Quận Huyện</Label>
              <Select defaultValue="all_districts">
                <SelectTrigger className="bg-slate-50"><SelectValue placeholder="Toàn thành phố" /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="all_districts">Toàn thành phố Hà Nội</SelectItem>
                   <SelectItem value="hoankiem">Quận Hoàn Kiếm</SelectItem>
                   <SelectItem value="badinh">Quận Ba Đình</SelectItem>
                    <SelectItem value="caugiay">Quận Cầu Giấy</SelectItem>
                   <SelectItem value="donganh">Huyện Đông Anh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Tuyến đường tham chiếu</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-slate-50"><SelectValue placeholder="Tất cả tuyến đường" /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="all">Tất cả các tuyến</SelectItem>
                   <SelectItem value="ql32">Quốc lộ 32</SelectItem>
                   <SelectItem value="ql1a">Quốc lộ 1A</SelectItem>
                   <SelectItem value="ql5">Quốc lộ 5</SelectItem>
                   <SelectItem value="vdt">Đường vành đai thủ đô</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Đơn vị quản lý / Bảo trì</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-slate-50"><SelectValue placeholder="Tất cả đơn vị" /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="all">Tất cả các đơn vị</SelectItem>
                   <SelectItem value="dv1">Công ty CP Công trình Giao thông 1</SelectItem>
                   <SelectItem value="dv2">Công ty CP Công trình Giao thông 2</SelectItem>
                   <SelectItem value="dv3">TT Quản lý Hạ tầng Giao thông</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label className="font-bold text-slate-700">Chi tiết Danh mục tài sản</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-slate-50"><SelectValue placeholder="Mọi loại tài sản" /></SelectTrigger>
                <SelectContent>
                   <SelectItem value="all">Mọi loại tài sản trực thuộc</SelectItem>
                   <SelectItem value="bridge">Hệ thống Cầu</SelectItem>
                   <SelectItem value="tunnel">Hệ thống Hầm</SelectItem>
                   <SelectItem value="sign">Biển báo & Vạch kẻ đường</SelectItem>
                   <SelectItem value="drain">Hệ thống thoát nước</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <Button variant="ghost" onClick={() => setFilterCondition(null)} className="text-slate-500 font-medium hover:text-slate-700">
              Xóa bộ lọc
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-200" onClick={() => setIsFilterOpen(false)}>Hủy</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setIsFilterOpen(false)}>
                <Search className="size-4 mr-2" /> Áp dụng bộ lọc
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        selectedCard={selectedItem}
        selectedItem={selectedItem}
        onEditClick={() => {
          setIsDetailOpen(false);
          setIsEditOpen(true);
        }}
      />
      <EditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        selectedCard={selectedItem}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={selectedItem}
        selectedItem={selectedItem}
        onConfirmDelete={() => {
          setIsDeleteOpen(false);
          // Handle delete logic here if needed
        }}
      />
      <Dialog open={isLayerSettingsOpen} onOpenChange={setIsLayerSettingsOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Cá nhân hóa lớp bản đồ</DialogTitle>
            <DialogDescription>
              Thay đổi màu sắc hiển thị của các lớp dữ liệu. Các thay đổi sẽ được lưu tự động.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-6 scrollbar-thin">
            {Object.entries(layerGroups).map(([groupKey, layerKeys]) => (
              <div key={groupKey} className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-md uppercase tracking-wider">{layerLabels[groupKey]}</h4>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  {layerKeys.map((key) => (
                    <div key={key} className="flex items-center justify-between border border-border/40 p-2 rounded-lg bg-card hover:bg-secondary/10 transition-colors">
                      <Label htmlFor={`color-${key}`} className="text-[11px] font-medium cursor-pointer truncate mr-2" title={layerLabels[key]}>{layerLabels[key]}</Label>
                      <input
                        type="color"
                        id={`color-${key}`}
                        value={layerColors[key] || '#3b82f6'}
                        onChange={(e) => setLayerColors(prev => ({ ...prev, [key]: e.target.value }))}
                        className="h-6 w-10 cursor-pointer rounded flex-shrink-0 p-0 border-none bg-transparent"
                        title={`Chọn màu cho lớp ${layerLabels[key]}`}
                        aria-label={`Chọn màu cho lớp ${layerLabels[key]}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-border mt-2">
            <Button variant="outline" onClick={() => {
              setLayerColors(DEFAULT_LAYER_COLORS);
              localStorage.removeItem('gthnLayerColors');
            }}>Trở về mặc định</Button>
            <Button onClick={() => setIsLayerSettingsOpen(false)}>Hoàn tất</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thông tin lớp dữ liệu Dialog */}
      <Dialog open={isLayerInfoOpen} onOpenChange={setIsLayerInfoOpen}>
        <DialogContent className="max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-xl text-blue-800 flex items-center gap-2">
              <Layers className="size-5" /> Thông tin Lớp dữ liệu
            </DialogTitle>
          </DialogHeader>
          {selectedLayerInfo && (
            <div className="space-y-4 py-2">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h4 className="font-bold text-lg text-slate-800">{selectedLayerInfo.name}</h4>
                <p className="text-sm text-slate-500 mt-1">Dữ liệu mô phỏng thuộc nhóm quản lý hạ tầng giao thông. Hiện tại lớp này đang hiển thị trạng thái hiện trường của các hạng mục thuộc {selectedLayerInfo.name}.</p>
              </div>
              <div className="space-y-3">
                <p className="text-[13px] font-bold text-slate-700">Trường thông tin thuộc tính:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white">Tên gọi / Mã tài sản</Badge>
                  <Badge variant="outline" className="bg-white">Tọa độ không gian (GIS)</Badge>
                  <Badge variant="outline" className="bg-white">Lịch sử bảo trì</Badge>
                  <Badge variant="outline" className="bg-white">Thông tin quản lý</Badge>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsLayerInfoOpen(false)}>Đóng</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Thêm mới GIS Feature Dialog */}
      <Dialog open={isAddFeatureOpen} onOpenChange={setIsAddFeatureOpen}>
        <DialogContent className="max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-xl text-blue-800 flex items-center gap-2">
              {addFeatureType === 'point' && <MapPin className="size-5" />}
              {addFeatureType === 'line' && <Route className="size-5 text-emerald-600" />}
              {addFeatureType === 'polygon' && <Layers className="size-5 text-amber-600" />}
              {addFeatureType === 'point' ? 'Thêm mới Điểm / Tọa độ' : addFeatureType === 'line' ? 'Vẽ Tuyến đường / Cầu' : 'Vẽ Vùng không gian'}
            </DialogTitle>
            <DialogDescription>
              Di chuyển chuột trên bản đồ để bắt đầu gắn vị trí sau khi nhập thông tin lưới.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tên đối tượng <span className="text-red-500">*</span></Label>
              <Input placeholder="Nhập tên tài sản / hạng mục..." />
            </div>
            <div className="space-y-2">
              <Label>Nhóm Lớp dữ liệu Lớp (Layer ID)</Label>
              <Select defaultValue="tuyenDuong">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn Lớp..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuyenDuong">Tuyến đường bộ</SelectItem>
                  <SelectItem value="cau">Hệ thống Cầu, Vượt</SelectItem>
                  <SelectItem value="ham">Hệ thống Hầm</SelectItem>
                  <SelectItem value="bienBao">Hệ thống Biển báo</SelectItem>
                  <SelectItem value="suCo">Phản ánh & Sự cố</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {addFeatureType === 'point' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vĩ độ (Lat)</Label>
                  <Input type="number" defaultValue={21.0285} step="0.0001" />
                </div>
                <div className="space-y-2">
                  <Label>Kinh độ (Lng)</Label>
                  <Input type="number" defaultValue={105.8542} step="0.0001" />
                </div>
              </div>
            )}
            {addFeatureType !== 'point' && (
              <div className="p-4 bg-slate-50 border rounded-lg flex items-center justify-center border-dashed border-slate-300">
                <p className="text-sm text-slate-500 text-center">Sau khi nhấn Bắt đầu vẽ, click lên bản đồ để tạo các vertex. Nhấp đúp để hoàn thành.</p>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" onClick={() => setIsAddFeatureOpen(false)}>Hủy bỏ</Button>
            <Button className="bg-blue-600 text-white" onClick={() => setIsAddFeatureOpen(false)}>
              <Map className="size-4 mr-2" /> Bắt đầu vẽ trên bản đồ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}