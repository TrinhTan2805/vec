import { useState } from "react";
import { Route, Building2, CircleDot, Waves, Construction, AlertTriangle, AlertCircle, CheckCircle2, Clock, ChevronRight, ArrowUpRight, ArrowDownRight, Map, ShieldCheck, Zap, Activity, UserCheck, Settings, Calendar, Filter, ChevronDown, Database, Layers, Smartphone, Wrench } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import { cn } from "../components/ui/utils";
import { Link } from "react-router";

const kpis = [
  {
    title: "Tổng số km quản lý",
    value: "4,628",
    change: "+12.5%",
    trend: "up",
    icon: <Building2 className="size-5" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/duong-bo/tuyen",
  },
  {
    title: "Tổng số km bảo trì năm 2026",
    value: "156",
    change: "-4.2%",
    trend: "down",
    icon: <Construction className="size-5" />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "/duy-tu/sua-chua-mat-duong",
  },
  {
    title: "Phản ánh vi phạm trong tháng",
    value: "84",
    change: "+18.3%",
    trend: "up",
    icon: <AlertTriangle className="size-5" />,
    color: "text-amber-600",
    bg: "bg-amber-50",
    href: "/bao-ve-ha-tang?tab=vi-pham",
  },
  {
    title: "Tỉ lệ tuyến được checkin",
    value: "94.8%",
    change: "+2.1%",
    trend: "up",
    icon: <CheckCircle2 className="size-5" />,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    href: "/bao-ve/kiem-tra-kcht",
  },
];

const infraData = [
  { name: 'Đường bộ', value: 2847, color: '#3b82f6' },
  { name: 'Đường thủy', value: 1234, color: '#06b6d4' },
  { name: 'Đường sắt', value: 547, color: '#6366f1' },
];

const maintenanceProgress = [
  { month: 'T10', completed: 45, pending: 12, delayed: 5 },
  { month: 'T11', completed: 52, pending: 15, delayed: 3 },
  { month: 'T12', completed: 48, pending: 20, delayed: 8 },
  { month: 'T01', completed: 61, pending: 10, delayed: 2 },
  { month: 'T02', completed: 55, pending: 18, delayed: 4 },
  { month: 'T03', completed: 67, pending: 8, delayed: 1 },
];

const trendData = [
  { day: 'Thứ 2', incidents: 12, resolution: 10 },
  { day: 'Thứ 3', incidents: 15, resolution: 14 },
  { day: 'Thứ 4', incidents: 8, resolution: 12 },
  { day: 'Thứ 5', incidents: 20, resolution: 15 },
  { day: 'Thứ 6', incidents: 14, resolution: 18 },
  { day: 'Thứ 7', incidents: 10, resolution: 12 },
  { day: 'Chủ nhật', incidents: 5, resolution: 8 },
];

const recentActivities = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    action: "Đã báo cáo vi phạm mới",
    target: "Quốc lộ 1A - Km 1500",
    time: "10 phút trước",
    type: "violation",
  },
  {
    id: 2,
    user: "Trần Thị B",
    action: "Đã check-in tuần đường",
    target: "Cầu Nhật Tân",
    time: "45 phút trước",
    type: "checkin",
  },
  {
    id: 3,
    user: "Lê Văn C",
    action: "Đã ghi nhận sự cố mới",
    target: "Hầm Kim Liên",
    time: "2 giờ trước",
    type: "issue",
  },
  {
    id: 4,
    user: "Phạm Văn D",
    action: "Đã check-in tuần đường",
    target: "Đường vành đai 3",
    time: "5 giờ trước",
    type: "checkin",
  },
];

export default function OverviewPage() {
  const [timeFilter, setTimeFilter] = useState("2026");
  const [typeFilter, setTypeFilter] = useState("all");

  // Dynamic KPI values based on type filter (for demonstration)
  const getFilteredValue = (baseValue: string, type: string) => {
    if (type === 'all') return baseValue;
    const factor = type === 'road' ? 0.6 : type === 'river' ? 0.25 : 0.15;
    const numeric = parseInt(baseValue.replace(/,/g, ''));
    return isNaN(numeric) ? baseValue : Math.floor(numeric * factor).toLocaleString();
  };

  return (
    <div className="space-y-8 p-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-end gap-6">
        
        <div className="flex flex-wrap items-center gap-3 bg-white/50 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-3 border-r border-slate-200">
            <Calendar className="size-4 text-blue-600" />
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[140px] border-none bg-transparent focus:ring-0 h-8 font-semibold text-slate-700">
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">Năm 2026</SelectItem>
                <SelectItem value="2025">Năm 2025</SelectItem>
                <SelectItem value="q1">Quý 1 - 2026</SelectItem>
                <SelectItem value="m3">Tháng 03/2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 px-3">
            <Filter className="size-4 text-indigo-600" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px] border-none bg-transparent focus:ring-0 h-8 font-semibold text-slate-700">
                <SelectValue placeholder="Loại hạ tầng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả hạ tầng</SelectItem>
                <SelectItem value="road">Đường bộ</SelectItem>
                <SelectItem value="river">Đường sông (Thủy)</SelectItem>
                <SelectItem value="rail">Đường sắt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700 rounded-xl h-8 gap-2">
            <Activity className="size-3.5" />
            Áp dụng lọc
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Link key={i} to={kpi.href || "#"} className="block outline-none ring-0">
            <Card className="border-none shadow-md bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group cursor-pointer h-full">
              <div className={cn("absolute top-0 right-0 w-24 h-24 -translate-y-8 translate-x-8 rounded-full opacity-10 group-hover:scale-125 transition-transform duration-500", kpi.bg)} />
              <CardHeader className="pb-2 space-y-0">
                <div className="flex items-center justify-between pb-2">
                  <CardDescription className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    {kpi.title}
                  </CardDescription>
                  <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform", kpi.bg, kpi.color)}>
                    {kpi.icon}
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold group-hover:text-blue-600 transition-colors">
                  {getFilteredValue(kpi.value, typeFilter)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className={cn(
                    "flex items-center text-xs font-bold px-1.5 py-0.5 rounded-full",
                    kpi.trend === 'up' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  )}>
                    {kpi.trend === 'up' ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {kpi.change}
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium">so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Maintenance Progress Bar Chart */}
          <Card className="border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Construction className="size-5 text-blue-600" />
                Tiến độ bảo trì theo tháng
              </CardTitle>
              <CardDescription>Số lượng công việc hoàn thành và dự kiến trong 6 tháng gần nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maintenanceProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Bar dataKey="completed" name="Hoàn thành" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" name="Đang chờ" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="delayed" name="Chậm trễ" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trend Area Chart */}
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Activity className="size-5 text-amber-600" />
                  Diễn biến sự cố hạ tầng
                </CardTitle>
                <CardDescription>Số lượng phản ánh và tỷ lệ xử lý trong tuần</CardDescription>
              </div>
              <select
                aria-label="Chọn thời gian xem dữ liệu"
                className="text-xs font-bold bg-slate-50 border-none rounded-md px-2 py-1 outline-none cursor-pointer"
              >
                <option>Tuần này</option>
                <option>Tuần trước</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorResolution" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="incidents"
                      name="Số vụ việc"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorIncidents)"
                    />
                    <Area
                      type="monotone"
                      dataKey="resolution"
                      name="Đã xử lý"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorResolution)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Introduction & Activity */}
        <div className="lg:col-span-1 space-y-8">
          {/* Core Features Grid Block */}
          <Card className="border-none shadow-md bg-white overflow-hidden flex flex-col relative">
            {/* Subtle GIS Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ 
                backgroundImage: `radial-gradient(#2563eb 0.5px, transparent 0.5px), radial-gradient(#2563eb 0.5px, #ffffff 0.5px)`,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px'
              }} 
            />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-slate-900 border-b pb-2">Tính năng cốt lõi</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 pt-0 gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100 transition-all duration-300 group">
                  <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ring-1 ring-slate-100">
                    <Database className="size-5 text-blue-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1 leading-tight uppercase tracking-tight">Số hóa Dữ liệu gốc</h3>
                  <p className="text-[10px] text-slate-500 leading-snug">Quản lý hàng trăm loại tài sản, từ cấp đường, mố cầu đến cáp ngầm thông tin.</p>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-100 transition-all duration-300 group">
                  <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ring-1 ring-slate-100">
                    <Layers className="size-5 text-indigo-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1 leading-tight uppercase tracking-tight">Thông minh Không gian</h3>
                  <p className="text-[10px] text-slate-500 leading-snug">Nền tảng bản đồ số GIS đa lớp, trực quan hóa mọi biến động hạ tầng.</p>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-amber-50/50 hover:border-amber-100 transition-all duration-300 group">
                  <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ring-1 ring-slate-100">
                    <Wrench className="size-5 text-amber-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1 leading-tight uppercase tracking-tight">Vận hành & Duy tu</h3>
                  <p className="text-[10px] text-slate-500 leading-snug">Kiểm soát xuyên suốt vòng đời tài sản: từ bàn giao đến lịch sử bảo trì.</p>
                </div>
                {/* Feature 4 */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-100 transition-all duration-300 group">
                  <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ring-1 ring-slate-100">
                    <Smartphone className="size-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1 leading-tight uppercase tracking-tight">Chỉ huy Thực địa</h3>
                  <p className="text-[10px] text-slate-500 leading-snug">Phối hợp nhịp nhàng giữa điều hành và ứng dụng di động thực địa.</p>
                </div>
              </div>

              <div className="mt-auto bg-slate-900 rounded-xl p-3 text-center border-t border-slate-800 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-sm pointer-events-none" />
                <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-relaxed relative z-10 italic">
                  Một nền tảng duy nhất <br/>
                  <span className="text-blue-400 not-italic">Xóa bỏ ranh giới giữa dữ liệu và thực địa.</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity List */}
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <CardHeader className="pb-3 border-b border-slate-50">
              <CardTitle className="text-lg font-bold">Hoạt động mới nhất</CardTitle>
              <CardDescription>Cập nhật trạng thái hạ tầng theo thời gian thực</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-4 flex gap-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <div className={cn(
                      "size-10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm",
                      activity.type === 'violation' ? "bg-red-100 text-red-600" :
                        activity.type === 'checkin' ? "bg-emerald-100 text-emerald-600" :
                          activity.type === 'issue' ? "bg-amber-100 text-amber-600" :
                            "bg-blue-100 text-blue-600"
                    )}>
                      {activity.type === 'violation' ? <AlertTriangle className="size-4" /> :
                        activity.type === 'checkin' ? <UserCheck className="size-4" /> :
                          activity.type === 'issue' ? <AlertCircle className="size-4" /> :
                            <Activity className="size-4" />}
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {activity.user}
                      </p>
                      <p className="text-xs text-slate-600 leading-tight">
                        {activity.action} <span className="font-semibold">{activity.target}</span>
                      </p>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-xs font-bold text-blue-600 h-10 hover:bg-slate-50 bg-slate-50/30 rounded-none border-t border-slate-50 uppercase tracking-widest gap-2">
                Xem tất cả <ChevronRight className="size-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Navigation Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
        {[
          { label: "Bản đồ số", path: "/ban-do", icon: <Map className="size-5" />, color: "bg-blue-600" },
          { label: "Quản lý Dự án", path: "/quan-ly-du-an", icon: <Construction className="size-5" />, color: "bg-amber-600" },
          { label: "Bảo trì KCHT", path: "/duy-tu/sua-chua-mat-duong", icon: <Zap className="size-5" />, color: "bg-emerald-600" },
          { label: "P.Ánh Sự cố", path: "/bao-ve-ha-tang", icon: <AlertTriangle className="size-5" />, color: "bg-red-600" },
        ].map((tile, i) => (
          <Link
            key={i}
            to={tile.path}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-50 group no-underline"
          >
            <div className={cn("size-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform", tile.color)}>
              {tile.icon}
            </div>
            <span className="text-sm font-bold text-slate-700">{tile.label}</span>
          </Link>
        ))}
        <a
          href="https://gis.vagoge.com/App/WebGIS#mapmanager?mapid=16"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-50 group no-underline"
        >
          <div className="size-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform bg-indigo-600">
            <Layers className="size-5" />
          </div>
          <span className="text-sm font-bold text-slate-700">Quản trị GIS</span>
        </a>
      </div>
    </div>
  );
}
