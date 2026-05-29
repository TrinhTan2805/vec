import React, { useState, useMemo } from "react";
import {
  AlertOctagon,
  XCircle,
  AlertTriangle,
  Info,
  Search,
  ChevronDown,
  Filter,
  FileSpreadsheet,
  Calendar,
  CheckCircle,
  Eye,
  Trash2,
  X,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

interface LogItem {
  id: number;
  time: string;
  level: "Nghiêm trọng" | "Lỗi" | "Cảnh báo" | "Thông tin";
  module: string;
  code: string;
  message: string;
  user: string;
  status: "Chưa xử lý" | "Đã xử lý";
}

const INITIAL_LOGS: LogItem[] = [
  {
    id: 1,
    time: "22/12/2024 14:25:33",
    level: "Nghiêm trọng",
    module: "Database Connection",
    code: "DB_CONNECTION_TIMEOUT",
    message: "Không thể kết nối đến cơ sở dữ liệu sau 30 giây",
    user: "system",
    status: "Chưa xử lý",
  },
  {
    id: 2,
    time: "22/12/2024 14:20:15",
    level: "Lỗi",
    module: "Data Processing",
    code: "DATA_VALIDATION_FAILED",
    message: 'Dữ liệu không hợp lệ: Thiếu trường bắt buộc "citizenId"',
    user: "Nguyễn Văn An",
    status: "Đã xử lý",
  },
  {
    id: 3,
    time: "22/12/2024 14:15:42",
    level: "Cảnh báo",
    module: "API Gateway",
    code: "RATE_LIMIT_EXCEEDED",
    message: "Vượt quá giới hạn 100 request/phút từ IP 192.168.1.120",
    user: "System",
    status: "Chưa xử lý",
  },
  {
    id: 4,
    time: "22/12/2024 14:10:28",
    level: "Lỗi",
    module: "File Storage",
    code: "FILE_UPLOAD_FAILED",
    message: "Không thể tải lên file: Dung lượng vượt quá 50MB",
    user: "Trần Thị Bình",
    status: "Đã xử lý",
  },
  {
    id: 5,
    time: "22/12/2024 14:05:55",
    level: "Nghiêm trọng",
    module: "Authentication",
    code: "AUTH_SERVICE_DOWN",
    message: "Dịch vụ xác thực không phản hồi",
    user: "System",
    status: "Chưa xử lý",
  },
  {
    id: 6,
    time: "22/12/2024 14:00:12",
    level: "Cảnh báo",
    module: "Data Collection",
    code: "EXTERNAL_API_SLOW",
    message: "API bên ngoài phản hồi chậm (>5s): Ministry of Justice API",
    user: "System",
    status: "Chưa xử lý",
  },
  {
    id: 7,
    time: "22/12/2024 13:55:40",
    level: "Thông tin",
    module: "System Monitor",
    code: "HIGH_MEMORY_USAGE",
    message: "Mức sử dụng bộ nhớ cao: 85%",
    user: "System",
    status: "Đã xử lý",
  },
  {
    id: 8,
    time: "22/12/2024 13:50:11",
    level: "Thông tin",
    module: "User Management",
    code: "USER_ROLE_UPDATED",
    message: "Cập nhật quyền hạn cho tài khoản 'an.nv'",
    user: "admin",
    status: "Đã xử lý",
  },
];

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

export default function NhatKyHoatDong() {
  // ─── States ─────────────────────────────────────────────────────────────────
  const [logs, setLogs] = useState<LogItem[]>(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [toast, setToast] = useState<ToastProps | null>(null);
  const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Filter Logs Logic ──────────────────────────────────────────────────────
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.module.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        levelFilter === "all" || log.level === levelFilter;

      const matchesModule =
        moduleFilter === "all" || log.module === moduleFilter;

      return matchesSearch && matchesLevel && matchesModule;
    });
  }, [logs, searchTerm, levelFilter, moduleFilter]);

  // ─── Action Handlers ────────────────────────────────────────────────────────
  const handleResolveLog = (id: number, code: string) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === id ? { ...log, status: "Đã xử lý" as const } : log
      )
    );
    showToast(`Đã xử lý thành công lỗi phát sinh ${code}!`, "success");
  };

  const handleExportExcel = () => {
    showToast("Đang chuẩn bị trích xuất danh sách nhật ký lỗi ra file Excel...", "info");
    setTimeout(() => {
      showToast("Xuất file Excel nhật ký lỗi thành công!", "success");
    }, 2000);
  };

  // ─── Stats Calculations ─────────────────────────────────────────────────────
  const stats = useMemo(() => {
    let critical = 0;
    let error = 0;
    let warning = 0;
    let unresolved = 0;

    logs.forEach((log) => {
      if (log.level === "Nghiêm trọng") critical++;
      if (log.level === "Lỗi") error++;
      if (log.level === "Cảnh báo") warning++;
      if (log.status === "Chưa xử lý") unresolved++;
    });

    return { critical, error, warning, unresolved };
  }, [logs]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#020817] font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : toast.type === "info"
            ? "bg-blue-50 border-blue-200 text-blue-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" && <CheckCircle className="size-5 text-[#16a34a]" />}
          {toast.type === "info" && <Filter className="size-5 text-blue-600 animate-pulse" />}
          {toast.type === "error" && <AlertTriangle className="size-5 text-[#dc2626]" />}
          <span className="text-[13px] font-medium">{toast.message}</span>
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Critical */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
            <AlertOctagon className="size-5 text-red-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">Nghiêm trọng (24h)</p>
            <p className="text-[20px] font-bold text-red-600 leading-none">{stats.critical}</p>
          </div>
        </div>

        {/* Error */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
            <XCircle className="size-5 text-orange-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">Lỗi (24h)</p>
            <p className="text-[20px] font-bold text-orange-600 leading-none">{stats.error}</p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
            <AlertTriangle className="size-5 text-amber-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">Cảnh báo (24h)</p>
            <p className="text-[20px] font-bold text-amber-600 leading-none">{stats.warning}</p>
          </div>
        </div>

        {/* Unresolved */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
            <Info className="size-5 text-blue-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">Chưa xử lý</p>
            <p className="text-[20px] font-bold text-blue-600 leading-none">{stats.unresolved}</p>
          </div>
        </div>
      </div>

      {/* Advanced Filters Block */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
        
        {/* Filters Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Keyword Search */}
          <div className="relative md:col-span-1">
            <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm mã lỗi, thông báo, module..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg h-9.5 pl-9 pr-4 text-[13px] outline-none focus:border-blue-500 shadow-3xs"
            />
          </div>

          {/* Level Dropdown */}
          <div className="relative">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg h-9.5 pl-3 pr-10 text-[13px] font-medium cursor-pointer outline-none focus:border-blue-500 shadow-3xs appearance-none"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="Nghiêm trọng">Nghiêm trọng</option>
              <option value="Lỗi">Lỗi</option>
              <option value="Cảnh báo">Cảnh báo</option>
              <option value="Thông tin">Thông tin</option>
            </select>
            <ChevronDown className="size-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Module Dropdown */}
          <div className="relative">
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg h-9.5 pl-3 pr-10 text-[13px] font-medium cursor-pointer outline-none focus:border-blue-500 shadow-3xs appearance-none"
            >
              <option value="all">Tất cả module</option>
              <option value="Database Connection">Database Connection</option>
              <option value="Data Processing">Data Processing</option>
              <option value="API Gateway">API Gateway</option>
              <option value="File Storage">File Storage</option>
              <option value="Authentication">Authentication</option>
              <option value="Data Collection">Data Collection</option>
              <option value="System Monitor">System Monitor</option>
            </select>
            <ChevronDown className="size-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Datepicker Range */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg h-9.5 px-3 shadow-3xs text-[13px]">
            <Calendar className="size-4 text-slate-400 shrink-0" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="outline-none border-none bg-transparent w-full text-slate-600 font-semibold"
            />
            <span className="text-slate-400">-</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="outline-none border-none bg-transparent w-full text-slate-600 font-semibold"
            />
          </div>
        </div>

        {/* Buttons Action Row */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-50">
          <Button
            className="h-8.5 px-4 text-[12px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Filter className="size-3.5" /> Lọc kết quả
          </Button>
          <Button
            onClick={handleExportExcel}
            variant="outline"
            className="h-8.5 px-4 text-[12px] font-semibold border-slate-200 text-[#64748b] hover:bg-slate-50 transition-colors rounded-lg flex items-center gap-1.5 shadow-3xs"
          >
            <FileSpreadsheet className="size-3.5 text-green-600" /> Xuất Excel
          </Button>
        </div>

      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-[#020817]">
            Nhật ký lỗi ({filteredLogs.length} bản ghi)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                <th className="px-5 py-3 w-48">Thời gian</th>
                <th className="px-5 py-3 w-32">Mức độ</th>
                <th className="px-5 py-3 w-44">Module</th>
                <th className="px-5 py-3 w-48">Mã lỗi</th>
                <th className="px-5 py-3">Thông báo lỗi</th>
                <th className="px-5 py-3 w-36">Người dùng</th>
                <th className="px-5 py-3 w-32">Trạng thái</th>
                <th className="px-5 py-3 w-28 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-medium text-slate-500">{item.time}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.level === "Nghiêm trọng"
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : item.level === "Lỗi"
                        ? "bg-orange-50 text-orange-700 border border-orange-100"
                        : item.level === "Cảnh báo"
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : "bg-blue-50 text-blue-700 border border-blue-100"
                    }`}>
                      {item.level}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{item.module}</td>
                  <td className="px-5 py-4 font-mono text-[12px] bg-slate-50/40 rounded px-1.5 py-0.5 border border-slate-100 text-slate-600 font-medium">
                    {item.code}
                  </td>
                  <td className="px-5 py-4 text-slate-600 font-medium leading-relaxed max-w-xs truncate" title={item.message}>
                    {item.message}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#020817]">{item.user}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.status === "Đã xử lý"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      <span className={`size-1.5 rounded-full ${
                        item.status === "Đã xử lý" ? "bg-green-500" : "bg-red-500"
                      }`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedLog(item);
                          setIsDetailOpen(true);
                        }}
                        className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Xem chi tiết log lỗi"
                      >
                        <Eye className="size-4" />
                      </button>
                      {item.status === "Chưa xử lý" && (
                        <button
                          onClick={() => handleResolveLog(item.id, item.code)}
                          className="p-1 text-[11px] font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded px-2 py-0.5 transition-all shadow-3xs shrink-0"
                        >
                          Xử lý
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── MODAL: Chi tiết lỗi ────────────────────────────────────────────── */}
      {isDetailOpen && selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-[15px] font-bold text-[#020817] flex items-center gap-1.5">
                <AlertOctagon className="size-4.5 text-red-600 animate-pulse" /> Chi tiết nhật ký lỗi phát sinh
              </h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-[13px]">
              
              {/* Row 1: Time */}
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 font-semibold">Thời gian:</span>
                <span className="col-span-2 font-mono font-bold text-slate-700">{selectedLog.time}</span>
              </div>

              {/* Row 2: Level */}
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 font-semibold">Mức độ:</span>
                <div className="col-span-2">
                  <span className={`inline-flex px-2.5 py-0.5 rounded text-[11px] font-bold ${
                    selectedLog.level === "Nghiêm trọng"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : selectedLog.level === "Lỗi"
                      ? "bg-orange-50 text-orange-700 border border-orange-100"
                      : selectedLog.level === "Cảnh báo"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-blue-50 text-blue-700 border border-blue-100"
                  }`}>
                    {selectedLog.level}
                  </span>
                </div>
              </div>

              {/* Row 3: Module */}
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 font-semibold">Phân hệ (Module):</span>
                <span className="col-span-2 font-bold text-slate-700">{selectedLog.module}</span>
              </div>

              {/* Row 4: Code */}
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 font-semibold">Mã sự cố (Code):</span>
                <span className="col-span-2 font-mono font-bold text-red-600 bg-red-50/50 rounded px-1.5 py-0.5 border border-red-100 w-fit">
                  {selectedLog.code}
                </span>
              </div>

              {/* Row 5: Message */}
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 font-semibold">Thông báo lỗi:</span>
                <span className="col-span-2 font-semibold text-slate-600 leading-relaxed">{selectedLog.message}</span>
              </div>

              {/* Row 6: User */}
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2.5">
                <span className="text-slate-400 font-semibold">Người dùng thực thi:</span>
                <span className="col-span-2 font-bold text-[#020817]">{selectedLog.user}</span>
              </div>

              {/* Row 7: Status */}
              <div className="grid grid-cols-3">
                <span className="text-slate-400 font-semibold">Trạng thái xử lý:</span>
                <div className="col-span-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    selectedLog.status === "Đã xử lý"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    <span className={`size-1.5 rounded-full ${
                      selectedLog.status === "Đã xử lý" ? "bg-green-500" : "bg-red-500"
                    }`} />
                    {selectedLog.status}
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-200 bg-slate-50">
              {selectedLog.status === "Chưa xử lý" && (
                <Button
                  onClick={() => {
                    handleResolveLog(selectedLog.id, selectedLog.code);
                    setIsDetailOpen(false);
                  }}
                  className="h-8.5 text-[12px] font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Xử lý ngay
                </Button>
              )}
              <Button
                onClick={() => setIsDetailOpen(false)}
                variant="outline"
                className="h-8.5 text-[12px] font-medium"
              >
                Đóng lại
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
