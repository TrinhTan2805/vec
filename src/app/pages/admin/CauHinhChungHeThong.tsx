import React, { useState } from "react";
import {
  Settings,
  CloudLightning,
  List,
  ShieldAlert,
  Clock,
  Database,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  Play,
  Check,
  XCircle,
  HardDrive,
  Calendar,
  Download,
  UploadCloud,
  Trash2,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

// ─── Default Configuration Values ─────────────────────────────────────────────
const DEFAULT_CONFIG = {
  uploadLimitMB: 10,
  recordsPerPage: "10",
  maintenanceMode: false,
  maxFailedLogins: 5,
  failedLoginsPeriod: 15,
  sessionTimeout: 30,
  autoBackup: true,
  backupFrequency: 24,
  backupRetention: 30,
  backupLocation: "S3 Bucket",
};

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

interface BackupItem {
  id: number;
  name: string;
  type: "Tự động" | "Thủ công";
  time: string;
  size: string;
  duration: string;
  status: "Thành công" | "Thất bại";
}

export default function CauHinhChungHeThong() {
  // ─── Navigation Tabs State ──────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<"config" | "backups">("config");

  // ─── Config States ──────────────────────────────────────────────────────────
  const [uploadLimitMB, setUploadLimitMB] = useState(DEFAULT_CONFIG.uploadLimitMB);
  const [recordsPerPage, setRecordsPerPage] = useState(DEFAULT_CONFIG.recordsPerPage);
  const [maintenanceMode, setMaintenanceMode] = useState(DEFAULT_CONFIG.maintenanceMode);
  const [maxFailedLogins, setMaxFailedLogins] = useState(DEFAULT_CONFIG.maxFailedLogins);
  const [failedLoginsPeriod, setFailedLoginsPeriod] = useState(DEFAULT_CONFIG.failedLoginsPeriod);
  const [sessionTimeout, setSessionTimeout] = useState(DEFAULT_CONFIG.sessionTimeout);
  const [autoBackup, setAutoBackup] = useState(DEFAULT_CONFIG.autoBackup);
  const [backupFrequency, setBackupFrequency] = useState(DEFAULT_CONFIG.backupFrequency);
  const [backupRetention, setBackupRetention] = useState(DEFAULT_CONFIG.backupRetention);
  const [backupLocation, setBackupLocation] = useState(DEFAULT_CONFIG.backupLocation);

  const [isDirty, setIsDirty] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);

  // ─── Backups List States ────────────────────────────────────────────────────
  const [backups, setBackups] = useState<BackupItem[]>([
    { id: 1, name: "backup_dldc_20241209_020000.sql", type: "Tự động", time: "2024-12-09 02:00:00", size: "2.4 GB", duration: "12 phút 34 giây", status: "Thành công" },
    { id: 2, name: "backup_dldc_20241208_020000.sql", type: "Tự động", time: "2024-12-08 02:00:00", size: "2.3 GB", duration: "11 phút 58 giây", status: "Thành công" },
    { id: 3, name: "backup_dldc_20241207_153000_manual.sql", type: "Thủ công", time: "2024-12-07 15:30:00", size: "2.3 GB", duration: "13 phút 02 giây", status: "Thành công" },
    { id: 4, name: "backup_dldc_20241207_020000.sql", type: "Tự động", time: "2024-12-07 02:00:00", size: "2.3 GB", duration: "12 phút 15 giây", status: "Thành công" },
    { id: 5, name: "backup_dldc_20241206_020000.sql", type: "Tự động", time: "2024-12-06 02:00:00", size: "0 B", duration: "0 giây", status: "Thất bại" },
  ]);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [recordsPerPageBackups, setRecordsPerPageBackups] = useState("10");

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    setIsDirty(false);
    showToast("Lưu cấu hình hệ thống thành công!", "success");
  };

  const handleReset = () => {
    setUploadLimitMB(DEFAULT_CONFIG.uploadLimitMB);
    setRecordsPerPage(DEFAULT_CONFIG.recordsPerPage);
    setMaintenanceMode(DEFAULT_CONFIG.maintenanceMode);
    setMaxFailedLogins(DEFAULT_CONFIG.maxFailedLogins);
    setFailedLoginsPeriod(DEFAULT_CONFIG.failedLoginsPeriod);
    setSessionTimeout(DEFAULT_CONFIG.sessionTimeout);
    setAutoBackup(DEFAULT_CONFIG.autoBackup);
    setBackupFrequency(DEFAULT_CONFIG.backupFrequency);
    setBackupRetention(DEFAULT_CONFIG.backupRetention);
    setBackupLocation(DEFAULT_CONFIG.backupLocation);
    setIsDirty(true);
    showToast("Đã khôi phục cấu hình về mặc định!", "success");
  };

  const handleFieldChange = (setter: Function, value: any) => {
    setter(value);
    setIsDirty(true);
  };

  // ─── Backup Actions ──────────────────────────────────────────────────────────
  const handleBackupNow = () => {
    setIsBackingUp(true);
    showToast("Đang bắt đầu sao lưu hệ thống dữ liệu kho DLDC...", "info");

    setTimeout(() => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

      const newBackup: BackupItem = {
        id: Date.now(),
        name: `backup_dldc_${dateStr}_${timeStr}_manual.sql`,
        type: "Thủ công",
        time: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
        size: "2.4 GB",
        duration: "10 phút 12 giây",
        status: "Thành công",
      };

      setBackups((prev) => [newBackup, ...prev]);
      setIsBackingUp(false);
      showToast("Sao lưu dữ liệu hệ thống thành công!", "success");
    }, 2500);
  };

  const handleDeleteBackup = (id: number, name: string) => {
    setBackups((prev) => prev.filter((b) => b.id !== id));
    showToast(`Đã xóa bản sao lưu ${name}!`, "success");
  };

  const handleDownloadBackup = (name: string) => {
    showToast(`Đang chuẩn bị tải xuống tệp ${name}...`, "info");
  };

  const handleRestoreBackup = (name: string) => {
    showToast(`Khôi phục hệ thống thành công từ tệp ${name}!`, "success");
  };

  // ─── Calculate Stats ────────────────────────────────────────────────────────
  const totalBackups = backups.length;
  const successCount = backups.filter((b) => b.status === "Thành công").length;
  const failedCount = backups.filter((b) => b.status === "Thất bại").length;
  const totalSizeGB = (
    backups.reduce((acc, curr) => {
      const sizeVal = parseFloat(curr.size);
      return acc + (isNaN(sizeVal) ? 0 : sizeVal);
    }, 0)
  ).toFixed(1);

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
          {toast.type === "info" && <Loader2 className="size-5 text-blue-600 animate-spin" />}
          {toast.type === "error" && <AlertTriangle className="size-5 text-[#dc2626]" />}
          <span className="text-[13px] font-medium">{toast.message}</span>
        </div>
      )}

      {/* Main Top Header and Tabs Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
            <Settings className="size-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#020817]">Thiết lập cấu hình hệ thống</h1>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
          <button
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
              activeTab === "config" 
                ? "bg-white text-blue-600 shadow-xs" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Settings className="size-4" /> Cấu hình chung
          </button>
          <button
            onClick={() => setActiveTab("backups")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
              activeTab === "backups" 
                ? "bg-white text-blue-600 shadow-xs" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Database className="size-4" /> Danh sách sao lưu
          </button>
        </div>

        {/* Action Controls for Config Tab */}
        {activeTab === "config" && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="h-9 px-4 text-[13px] font-medium border-slate-200 text-[#64748b] hover:bg-slate-50 transition-colors gap-1.5"
            >
              <RefreshCw className="size-3.5" /> Đặt lại mặc định
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isDirty}
              className={`h-9 px-4 text-[13px] font-medium transition-colors gap-1.5 ${
                isDirty 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" 
                  : "bg-slate-100 text-[#64748b] cursor-not-allowed border border-transparent"
              }`}
            >
              Lưu cấu hình
            </Button>
          </div>
        )}
      </div>

      {/* ─── TAB 1: Cấu hình chung ────────────────────────────────────────────── */}
      {activeTab === "config" && (
        <div className="space-y-4">
          {/* 1. Cấu hình giới hạn dung lượng tải lên */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center">
                <CloudLightning className="size-4.5 text-blue-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Cấu hình giới hạn dung lượng tải lên</h2>
            </div>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[13px] font-semibold text-[#020817]">Giới hạn dung lượng tối đa cho mỗi tập tin (MB)</p>
                  <p className="text-[12px] text-[#64748b]">Quy định kích thước tệp tin lớn nhất được phép tải lên hệ thống</p>
                </div>
                <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={uploadLimitMB}
                    onChange={(e) => handleFieldChange(setUploadLimitMB, Math.min(100, Math.max(1, Number(e.target.value))))}
                    className="w-14 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                  />
                  <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                    MB
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={uploadLimitMB}
                  onChange={(e) => handleFieldChange(setUploadLimitMB, Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] font-medium text-slate-400">
                  <span>1 MB</span>
                  <span>100 MB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Cấu hình hiển thị danh sách */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <List className="size-4.5 text-emerald-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Cấu hình hiển thị danh sách</h2>
            </div>
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-[13px] font-semibold text-[#020817]">Số lượng bản ghi hiển thị mặc định trên mỗi trang</p>
                <p className="text-[12px] text-[#64748b]">Số lượng dòng dữ liệu được hiển thị trên một trang bảng</p>
              </div>
              <div className="relative">
                <select
                  value={recordsPerPage}
                  onChange={(e) => handleFieldChange(setRecordsPerPage, e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-md pl-3 pr-10 py-1.5 text-[13px] font-medium shadow-xs outline-none focus:border-blue-500 cursor-pointer h-9 w-44"
                >
                  <option value="10">10 bản ghi/trang</option>
                  <option value="20">20 bản ghi/trang</option>
                  <option value="50">50 bản ghi/trang</option>
                  <option value="100">100 bản ghi/trang</option>
                </select>
                <ChevronDown className="size-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </CardContent>
          </Card>

          {/* 3. Cấu hình chế độ bảo trì hệ thống */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Settings className="size-4.5 text-purple-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Cấu hình chế độ bảo trì hệ thống</h2>
            </div>
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-[13px] font-semibold text-[#020817]">Bật/Tắt chế độ bảo trì</p>
                <p className="text-[12px] text-[#64748b]">Khi bật, hệ thống sẽ tạm dừng hoạt động và hiển thị thông báo bảo trì cho người dùng</p>
              </div>
              <button
                onClick={() => handleFieldChange(setMaintenanceMode, !maintenanceMode)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  maintenanceMode ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    maintenanceMode ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </CardContent>
          </Card>

          {/* 4. Cấu hình giới hạn đăng nhập sai */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-rose-50 flex items-center justify-center">
                <ShieldAlert className="size-4.5 text-rose-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Cấu hình giới hạn đăng nhập sai</h2>
            </div>
            <CardContent className="p-5 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Số lần sai mật khẩu tối đa</p>
                    <p className="text-[12px] text-[#64748b]">Số lần đăng nhập sai tối đa trước khi khóa tài khoản tạm thời</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input
                      type="number"
                      min={3}
                      max={10}
                      value={maxFailedLogins}
                      onChange={(e) => handleFieldChange(setMaxFailedLogins, Math.min(10, Math.max(3, Number(e.target.value))))}
                      className="w-14 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                      lần
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={3}
                    max={10}
                    value={maxFailedLogins}
                    onChange={(e) => handleFieldChange(setMaxFailedLogins, Number(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                    <span>3 lần</span>
                    <span>10 lần</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Giới hạn số lần đăng nhập sai trong khoảng thời gian (phút)</p>
                    <p className="text-[12px] text-[#64748b]">Khoảng thời gian sai lần đăng nhập liên tiếp được tính cộng dồn</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input
                      type="number"
                      min={5}
                      max={60}
                      value={failedLoginsPeriod}
                      onChange={(e) => handleFieldChange(setFailedLoginsPeriod, Math.min(60, Math.max(5, Number(e.target.value))))}
                      className="w-14 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                      phút
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={5}
                    max={60}
                    value={failedLoginsPeriod}
                    onChange={(e) => handleFieldChange(setFailedLoginsPeriod, Number(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                    <span>5 phút</span>
                    <span>60 phút</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Cấu hình phiên làm việc */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-amber-50 flex items-center justify-center">
                <Clock className="size-4.5 text-amber-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Cấu hình phiên làm việc</h2>
            </div>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[13px] font-semibold text-[#020817]">Thời gian timeout phiên làm việc (phút)</p>
                  <p className="text-[12px] text-[#64748b]">Thời gian không hoạt động trước khi đăng xuất tự động người dùng</p>
                </div>
                <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={sessionTimeout}
                    onChange={(e) => handleFieldChange(setSessionTimeout, Math.min(120, Math.max(5, Number(e.target.value))))}
                    className="w-14 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                  />
                  <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                    phút
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min={5}
                  max={120}
                  value={sessionTimeout}
                  onChange={(e) => handleFieldChange(setSessionTimeout, Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] font-medium text-slate-400">
                  <span>5 phút</span>
                  <span>120 phút</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. Cấu hình sao lưu dự phòng */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-rose-50 flex items-center justify-center">
                <Database className="size-4.5 text-rose-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Cấu hình sao lưu dự phòng</h2>
            </div>
            <CardContent className="p-5 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[13px] font-semibold text-[#020817]">Bật tự động sao lưu</p>
                  <p className="text-[12px] text-[#64748b]">Tự động sao lưu dữ liệu hệ thống theo lịch trình</p>
                </div>
                <button
                  onClick={() => handleFieldChange(setAutoBackup, !autoBackup)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                    autoBackup ? "bg-blue-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      autoBackup ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Tần suất sao lưu (giờ)</p>
                    <p className="text-[12px] text-[#64748b]">Số giờ giữa các lần sao lưu tự động</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input
                      type="number"
                      min={1}
                      max={36}
                      value={backupFrequency}
                      onChange={(e) => handleFieldChange(setBackupFrequency, Math.min(36, Math.max(1, Number(e.target.value))))}
                      className="w-14 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                      giờ
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={1}
                    max={36}
                    value={backupFrequency}
                    onChange={(e) => handleFieldChange(setBackupFrequency, Number(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                    <span>1 giờ</span>
                    <span>36 giờ</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Thời gian giữ lại sao lưu (ngày)</p>
                    <p className="text-[12px] text-[#64748b]">Số ngày giữ lại các bản sao lưu trước khi xóa</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input
                      type="number"
                      min={1}
                      max={365}
                      value={backupRetention}
                      onChange={(e) => handleFieldChange(setBackupRetention, Math.min(365, Math.max(1, Number(e.target.value))))}
                      className="w-14 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                      ngày
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={1}
                    max={365}
                    value={backupRetention}
                    onChange={(e) => handleFieldChange(setBackupRetention, Number(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                    <span>1 ngày</span>
                    <span>365 ngày</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-[13px] font-semibold text-[#020817]">Vị trí lưu trữ sao lưu</p>
                  <p className="text-[12px] text-[#64748b]">Địa điểm lưu trữ các bản sao lưu</p>
                </div>
                <div className="relative">
                  <select
                    value={backupLocation}
                    onChange={(e) => handleFieldChange(setBackupLocation, e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-md pl-3 pr-10 py-1.5 text-[13px] font-medium shadow-xs outline-none focus:border-blue-500 cursor-pointer h-9 w-44 text-center"
                  >
                    <option value="S3 Bucket">S3 Bucket</option>
                    <option value="Local Server">Local Server</option>
                    <option value="Google Drive">Google Drive</option>
                  </select>
                  <ChevronDown className="size-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ─── TAB 2: Danh sách sao lưu ─────────────────────────────────────────── */}
      {activeTab === "backups" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          
          {/* Header Panel for Backup Tab */}
          <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                <Database className="size-4.5 text-blue-600" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-[14px] font-semibold text-[#020817]">Sao lưu dự phòng</h2>
                <p className="text-[12px] text-[#64748b]">Quản lý và thực hiện sao lưu dữ liệu hệ thống kho DLDC</p>
              </div>
            </div>
            <Button
              onClick={handleBackupNow}
              disabled={isBackingUp}
              className={`h-9 px-4 text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg flex items-center gap-1.5 shadow-sm ${
                isBackingUp ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isBackingUp ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Play className="size-3.5 fill-white" />
              )}
              Sao lưu ngay
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat 1: Tổng bản sao lưu */}
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                <Database className="size-5 text-blue-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[12px] font-semibold text-[#64748b]">Tổng bản sao lưu</p>
                <p className="text-[20px] font-bold text-[#020817] leading-none">{totalBackups}</p>
              </div>
            </div>

            {/* Stat 2: Thành công */}
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="size-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                <CheckCircle className="size-5 text-green-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[12px] font-semibold text-[#64748b]">Thành công</p>
                <p className="text-[20px] font-bold text-green-600 leading-none">{successCount}</p>
              </div>
            </div>

            {/* Stat 3: Thất bại */}
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="size-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                <XCircle className="size-5 text-red-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[12px] font-semibold text-[#64748b]">Thất bại</p>
                <p className="text-[20px] font-bold text-red-600 leading-none">{failedCount}</p>
              </div>
            </div>

            {/* Stat 4: Dung lượng */}
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100">
                <HardDrive className="size-5 text-purple-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[12px] font-semibold text-[#64748b]">Dung lượng</p>
                <p className="text-[20px] font-bold text-purple-600 leading-none">{totalSizeGB} GB</p>
              </div>
            </div>

          </div>

          {/* Schedule Info Banner */}
          <div className="flex items-center gap-2.5 p-3.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-[13px] font-medium">
            <Calendar className="size-4.5 text-blue-600" />
            <span>Lịch sao lưu tự động: Hàng ngày lúc 02:00 AM | Lưu trữ: {backupRetention} ngày</span>
          </div>

          {/* Backup Log Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                    <th className="px-5 py-3 w-16 text-center">STT</th>
                    <th className="px-5 py-3">Tên file</th>
                    <th className="px-5 py-3 w-32">Loại</th>
                    <th className="px-5 py-3 w-48">Ngày giờ</th>
                    <th className="px-5 py-3 w-32">Dung lượng</th>
                    <th className="px-5 py-3 w-36">Thời gian</th>
                    <th className="px-5 py-3 w-36">Trạng thái</th>
                    <th className="px-5 py-3 w-32 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {backups.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 text-center text-slate-500 font-semibold">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 font-mono font-medium text-slate-700">
                          <Database className="size-4 text-slate-400 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.type === "Tự động"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-medium font-mono">{item.time}</td>
                      <td className="px-5 py-4 text-slate-500 font-semibold">{item.size}</td>
                      <td className="px-5 py-4 text-slate-500 font-medium font-mono flex items-center gap-1.5 h-12">
                        <Clock className="size-3.5 text-slate-400" />
                        <span>{item.duration}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          item.status === "Thành công"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}>
                          <span className={`size-1.5 rounded-full ${
                            item.status === "Thành công" ? "bg-green-500" : "bg-red-500"
                          }`} />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {item.status === "Thành công" && (
                            <>
                              <button
                                onClick={() => handleDownloadBackup(item.name)}
                                className="p-1.5 rounded text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                title="Tải xuống tệp sao lưu"
                              >
                                <Download className="size-4" />
                              </button>
                              <button
                                onClick={() => handleRestoreBackup(item.name)}
                                className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                title="Khôi phục từ bản sao lưu này"
                              >
                                <UploadCloud className="size-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteBackup(item.id, item.name)}
                            className="p-1.5 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                            title="Xóa bản sao lưu"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50 gap-3">
              <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium">
                <span>Hiển thị</span>
                <div className="relative">
                  <select
                    value={recordsPerPageBackups}
                    onChange={(e) => setRecordsPerPageBackups(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded pl-2.5 pr-7 py-1 text-[12px] font-semibold outline-none cursor-pointer"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <ChevronDown className="size-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span>bản ghi/trang</span>
              </div>

              <div className="flex items-center gap-3 text-[12px] text-slate-500 font-medium">
                <span>1 - {totalBackups} / {totalBackups}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled
                    className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed font-medium hover:bg-slate-50 transition-colors"
                  >
                    Trước
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded font-semibold shadow-xs">
                    1
                  </button>
                  <button
                    disabled
                    className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed font-medium hover:bg-slate-50 transition-colors"
                  >
                    Sau
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
