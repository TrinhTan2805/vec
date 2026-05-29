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
  type: "success" | "error";
}

export default function CauHinhChungHeThong() {
  // ─── Component State ────────────────────────────────────────────────────────
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

  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
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

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#020817] font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle className="size-5 text-[#16a34a]" />
          ) : (
            <AlertTriangle className="size-5 text-[#dc2626]" />
          )}
          <span className="text-[13px] font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
            <Settings className="size-5 text-blue-600 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#020817]">Thiết lập cấu hình hệ thống</h1>
          </div>
        </div>
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
      </div>

      {/* Main Settings Form */}
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
            
            {/* Custom Toggle Switch */}
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
            
            {/* Sub-item 1: Số lần sai mật khẩu tối đa */}
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
              
              {/* Slider for Sub-item 1 */}
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

            {/* Sub-item 2: Giới hạn số lần đăng nhập sai trong khoảng thời gian (phút) */}
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

              {/* Slider for Sub-item 2 */}
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

            {/* Slider */}
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
            
            {/* Sub-item 1: Bật tự động sao lưu */}
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

            {/* Sub-item 2: Tần suất sao lưu (giờ) */}
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

              {/* Slider for Sub-item 2 */}
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

            {/* Sub-item 3: Thời gian giữ lại sao lưu (ngày) */}
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

              {/* Slider for Sub-item 3 */}
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

            {/* Sub-item 4: Vị trí lưu trữ sao lưu */}
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
    </div>
  );
}
