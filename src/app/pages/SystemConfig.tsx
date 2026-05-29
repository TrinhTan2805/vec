import React, { useState } from "react";
import { 
  Settings, 
  RefreshCw, 
  Save, 
  UploadCloud, 
  List, 
  Wrench, 
  ShieldAlert, 
  Clock, 
  Database,
  Info
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function SystemConfig() {
  // Config state matching the second screenshot
  const [maxUploadSize, setMaxUploadSize] = useState(10);
  const [pageSize, setPageSize] = useState("10");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const [maxLoginFailures, setMaxLoginFailures] = useState(5);
  const [lockoutTimeWindow, setLockoutTimeWindow] = useState(15);
  
  const [sessionTimeout, setSessionTimeout] = useState(30);
  
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState(24);
  const [backupRetention, setBackupRetention] = useState(30);
  const [backupStorage, setBackupStorage] = useState("S3 Bucket");

  const handleSaveConfig = () => {
    alert(
      `Hệ thống đã kiểm tra điều kiện dữ liệu.\nLưu cấu hình hệ thống thành công!\n\n` +
      `- Giới hạn tệp: ${maxUploadSize} MB\n` +
      `- Bản ghi/Trang: ${pageSize}\n` +
      `- Bảo trì: ${maintenanceMode ? "BẬT" : "TẮT"}\n` +
      `- Đăng nhập sai: tối đa ${maxLoginFailures} lần trong ${lockoutTimeWindow} phút\n` +
      `- Phiên làm việc: ${sessionTimeout} phút\n` +
      `- Tự động sao lưu: ${autoBackup ? "BẬT" : "TẮT"} (Mỗi ${backupFrequency} giờ, lưu trữ ${backupRetention} ngày tại ${backupStorage})`
    );
  };

  const handleResetDefaults = () => {
    if (confirm("Bạn có chắc chắn muốn khôi phục tất cả cấu hình về mặc định của hệ thống?")) {
      setMaxUploadSize(10);
      setPageSize("10");
      setMaintenanceMode(false);
      setMaxLoginFailures(5);
      setLockoutTimeWindow(15);
      setSessionTimeout(30);
      setAutoBackup(true);
      setBackupFrequency(24);
      setBackupRetention(30);
      setBackupStorage("S3 Bucket");
      alert("Đã khôi phục các tham số cấu hình về mặc định.");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Settings className="size-5.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Thiết lập cấu hình hệ thống</h2>
            <p className="text-xs text-slate-400">Điều chỉnh các tham số vận hành, bảo mật và sao lưu dữ liệu toàn hệ thống.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="h-9 px-4 text-xs font-bold text-slate-600 gap-1.5 border-slate-200 rounded-lg hover:bg-slate-50"
            onClick={handleResetDefaults}
          >
            <RefreshCw className="size-3.5 text-slate-500" />
            Đặt lại mặc định
          </Button>
          <Button 
            className="h-9 px-4 text-xs font-bold bg-[#00A8CC] hover:bg-[#0092b3] text-white gap-1.5 rounded-lg shadow-sm"
            onClick={handleSaveConfig}
          >
            <Save className="size-3.5" />
            Lưu cấu hình
          </Button>
        </div>
      </div>

      {/* Main Configurations List */}
      <div className="space-y-4">

        {/* 1. Cấu hình giới hạn dung lượng tải lên */}
        <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                <UploadCloud className="size-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Cấu hình giới hạn dung lượng tải lên</h4>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-xs font-bold text-slate-700 block">Giới hạn dung lượng tối đa cho mỗi tệp tin (MB)</label>
                  <span className="text-[11px] text-slate-400">Quy định kích thước tệp tin lớn nhất được phép tải lên hệ thống</span>
                </div>
                <div className="flex items-center gap-1.5 border rounded-lg px-2 py-1 bg-slate-50">
                  <input 
                    title="Dung lượng tối đa"
                    type="number" 
                    value={maxUploadSize}
                    onChange={(e) => setMaxUploadSize(Number(e.target.value))}
                    className="w-10 bg-transparent text-right font-bold text-xs outline-none" 
                  />
                  <span className="text-[10px] text-slate-400 font-bold">MB</span>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400">1 MB</span>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={maxUploadSize}
                  onChange={(e) => setMaxUploadSize(Number(e.target.value))}
                  className="flex-1 accent-[#00A8CC]" 
                  aria-label="Giới hạn dung lượng tối đa cho mỗi tệp tin"
                />
                <span className="text-[10px] font-bold text-slate-400">100 MB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Cấu hình hiển thị danh sách */}
        <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <List className="size-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Cấu hình hiển thị danh sách</h4>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-700 block">Số lượng bản ghi hiển thị mặc định trên mỗi trang</label>
                <span className="text-[11px] text-slate-400">Số lượng dòng dữ liệu được hiển thị trên một trang bảng</span>
              </div>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="h-9 w-40 text-xs border-slate-200 bg-white font-semibold">
                  <SelectValue placeholder="10 bản ghi/trang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 bản ghi/trang</SelectItem>
                  <SelectItem value="25">25 bản ghi/trang</SelectItem>
                  <SelectItem value="50">50 bản ghi/trang</SelectItem>
                  <SelectItem value="100">100 bản ghi/trang</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 3. Cấu hình chế độ bảo trì hệ thống */}
        <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                <Wrench className="size-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Cấu hình chế độ bảo trì hệ thống</h4>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-700 block">Bật/Tắt chế độ bảo trì</label>
                <span className="text-[11px] text-slate-400">Khi bật, hệ thống sẽ tạm dừng hoạt động và hiển thị thông báo bảo trì tới người dùng</span>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full border-none transition-all ${
                  maintenanceMode ? "bg-[#00A8CC]" : "bg-slate-200"
                }`}
                aria-label="Bật/Tắt chế độ bảo trì"
              >
                <span className={`inline-block size-4 transform rounded-full bg-white transition-all ${
                  maintenanceMode ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 4. Cấu hình giới hạn đăng nhập sai */}
        <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                <ShieldAlert className="size-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Cấu hình giới hạn đăng nhập sai</h4>
              </div>
            </div>

            {/* Slider 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-xs font-bold text-slate-700 block">Số lần sai mật khẩu tối đa</label>
                  <span className="text-[11px] text-slate-400">Số lần đăng nhập sai tối đa trước khi tài khoản bị khóa tạm thời</span>
                </div>
                <div className="flex items-center gap-1.5 border rounded-lg px-2 py-1 bg-slate-50">
                  <input 
                    title="Số lần đăng nhập sai tối đa"
                    type="number" 
                    value={maxLoginFailures}
                    onChange={(e) => setMaxLoginFailures(Number(e.target.value))}
                    className="w-10 bg-transparent text-right font-bold text-xs outline-none" 
                  />
                  <span className="text-[10px] text-slate-400 font-bold">lần</span>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400">3 lần</span>
                <input 
                  type="range" 
                  min="3" 
                  max="10" 
                  value={maxLoginFailures}
                  onChange={(e) => setMaxLoginFailures(Number(e.target.value))}
                  className="flex-1 accent-[#00A8CC]" 
                  aria-label="Số lần sai mật khẩu tối đa"
                />
                <span className="text-[10px] font-bold text-slate-400">10 lần</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-xs font-bold text-slate-700 block">Giới hạn số lần đăng nhập sai trong khoảng thời gian (phút)</label>
                  <span className="text-[11px] text-slate-400">Khoảng thời gian sai đăng nhập sai liên tiếp được tính cộng dồn</span>
                </div>
                <div className="flex items-center gap-1.5 border rounded-lg px-2 py-1 bg-slate-50">
                  <input 
                    title="Khoảng thời gian đăng nhập sai liên tiếp"
                    type="number" 
                    value={lockoutTimeWindow}
                    onChange={(e) => setLockoutTimeWindow(Number(e.target.value))}
                    className="w-10 bg-transparent text-right font-bold text-xs outline-none" 
                  />
                  <span className="text-[10px] text-slate-400 font-bold">phút</span>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400">5 phút</span>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  value={lockoutTimeWindow}
                  onChange={(e) => setLockoutTimeWindow(Number(e.target.value))}
                  className="flex-1 accent-[#00A8CC]" 
                  aria-label="Giới hạn số lần đăng nhập sai trong khoảng thời gian"
                />
                <span className="text-[10px] font-bold text-slate-400">60 phút</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Cấu hình phiên làm việc */}
        <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                <Clock className="size-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Cấu hình phiên làm việc</h4>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-xs font-bold text-slate-700 block">Thời gian timeout phiên làm việc (phút)</label>
                  <span className="text-[11px] text-slate-400">Thời gian không hoạt động trước khi đăng xuất tự động người dùng</span>
                </div>
                <div className="flex items-center gap-1.5 border rounded-lg px-2 py-1 bg-slate-50">
                  <input 
                    title="Thời gian timeout"
                    type="number" 
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(Number(e.target.value))}
                    className="w-10 bg-transparent text-right font-bold text-xs outline-none" 
                  />
                  <span className="text-[10px] text-slate-400 font-bold">phút</span>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400">5 phút</span>
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="flex-1 accent-[#00A8CC]" 
                  aria-label="Thời gian timeout phiên làm việc"
                />
                <span className="text-[10px] font-bold text-slate-400">120 phút</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Cấu hình sao lưu dự phòng */}
        <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                <Database className="size-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Cấu hình sao lưu dự phòng</h4>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-700 block">Bật tự động sao lưu</label>
                <span className="text-[11px] text-slate-400">Tự động sao lưu dữ liệu hệ thống theo lịch trình</span>
              </div>
              <button 
                onClick={() => setAutoBackup(!autoBackup)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full border-none transition-all ${
                  autoBackup ? "bg-blue-600" : "bg-slate-200"
                }`}
                aria-label="Bật tự động sao lưu"
              >
                <span className={`inline-block size-4 transform rounded-full bg-white transition-all ${
                  autoBackup ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>

            {autoBackup && (
              <>
                {/* Frequency Slider */}
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block">Tần suất sao lưu (giờ)</label>
                      <span className="text-[11px] text-slate-400">Số giờ giữa các lần sao lưu tự động</span>
                    </div>
                    <div className="flex items-center gap-1.5 border rounded-lg px-2 py-1 bg-slate-50">
                      <input 
                        title="Tần suất sao lưu"
                        type="number" 
                        value={backupFrequency}
                        onChange={(e) => setBackupFrequency(Number(e.target.value))}
                        className="w-10 bg-transparent text-right font-bold text-xs outline-none" 
                      />
                      <span className="text-[10px] text-slate-400 font-bold">giờ</span>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-400">1 giờ</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="36" 
                      value={backupFrequency}
                      onChange={(e) => setBackupFrequency(Number(e.target.value))}
                      className="flex-1 accent-[#00A8CC]" 
                      aria-label="Tần suất sao lưu"
                    />
                    <span className="text-[10px] font-bold text-slate-400">36 giờ</span>
                  </div>
                </div>

                {/* Retention Slider */}
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block">Thời gian giữ lại sao lưu (ngày)</label>
                      <span className="text-[11px] text-slate-400">Số ngày giữ lại các bản sao lưu trước khi xóa</span>
                    </div>
                    <div className="flex items-center gap-1.5 border rounded-lg px-2 py-1 bg-slate-50">
                      <input 
                        title="Thời gian giữ lại sao lưu"
                        type="number" 
                        value={backupRetention}
                        onChange={(e) => setBackupRetention(Number(e.target.value))}
                        className="w-10 bg-transparent text-right font-bold text-xs outline-none" 
                      />
                      <span className="text-[10px] text-slate-400 font-bold">ngày</span>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-400">1 ngày</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="365" 
                      value={backupRetention}
                      onChange={(e) => setBackupRetention(Number(e.target.value))}
                      className="flex-1 accent-[#00A8CC]" 
                      aria-label="Thời gian giữ lại sao lưu"
                    />
                    <span className="text-[10px] font-bold text-slate-400">365 ngày</span>
                  </div>
                </div>

                {/* Backup Storage Target */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block">Vị trí lưu trữ sao lưu</label>
                    <span className="text-[11px] text-slate-400">Địa điểm lưu trữ các bản sao lưu</span>
                  </div>
                  <Select value={backupStorage} onValueChange={setBackupStorage}>
                    <SelectTrigger className="h-9 w-40 text-xs border-slate-200 bg-white font-semibold">
                      <SelectValue placeholder="S3 Bucket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S3 Bucket">S3 Bucket</SelectItem>
                      <SelectItem value="Local Disk">Đĩa cục bộ (Local)</SelectItem>
                      <SelectItem value="NAS Storage">Ổ lưu trữ mạng NAS</SelectItem>
                      <SelectItem value="FTP Server">Máy chủ FTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
