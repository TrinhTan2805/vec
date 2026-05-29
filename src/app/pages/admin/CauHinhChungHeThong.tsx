import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  Settings,
  Shield,
  Network,
  HardDrive,
  Save,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  Image,
  FileText,
  Video,
  X,
  Database,
  Activity,
  Check,
  LockKeyhole,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

// ─── Types ────────────────────────────────────────────────────────────────────
interface IpAddress {
  id: number;
  ip: string;
  description: string;
  addedAt: string;
}

interface LoginPolicy {
  maxAttempts: number;
  lockDurationMinutes: number;
}

interface StoragePolicy {
  maxImageMB: number;
  maxVideoMB: number;
  maxDocumentMB: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_IPS: IpAddress[] = [
  { id: 1, ip: "192.168.1.0/24", description: "Mạng nội bộ VEC trụ sở chính", addedAt: "01/05/2026" },
  { id: 2, ip: "10.0.0.0/8",    description: "Mạng VPN toàn hệ thống",        addedAt: "10/05/2026" },
  { id: 3, ip: "203.162.4.190", description: "IP tĩnh cán bộ làm việc từ xa",  addedAt: "15/05/2026" },
];

// ─── IP Dialog ────────────────────────────────────────────────────────────────
interface IpDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (ip: string, desc: string) => void;
}

function AddIpDialog({ open, onOpenChange, onAdd }: IpDialogProps) {
  const [ip, setIp] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState<{ ip?: string }>({});

  React.useEffect(() => {
    if (open) { setIp(""); setDesc(""); setErrors({}); }
  }, [open]);

  const validate = () => {
    const e: typeof errors = {};
    if (!ip.trim()) e.ip = "Địa chỉ mạng không được để trống";
    else if (!/^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/.test(ip.trim())) e.ip = "Địa chỉ mạng không đúng định dạng (VD: 192.168.1.0/24)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onAdd(ip.trim(), desc.trim());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-medium text-[#020817] flex items-center gap-2">
            <Network className="size-5 text-[#2563eb]" /> Thêm địa chỉ mạng
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[#64748b]">
            Hệ thống sẽ kiểm tra địa chỉ mạng khi Quản trị viên đăng nhập và chỉ cho phép nếu nằm trong danh sách.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label className={`text-[14px] font-medium ${errors.ip ? "text-[#dc2626]" : "text-[#020817]"}`}>
              Địa chỉ mạng <span className="text-[#dc2626]">*</span>
            </Label>
            <Input
              value={ip}
              onChange={e => { setIp(e.target.value); setErrors({}); }}
              placeholder="VD: 192.168.1.0/24 hoặc 203.162.4.190"
              className={`h-10 text-[13px] font-mono ${errors.ip ? "border-[#dc2626] bg-red-50" : ""}`}
            />
            {errors.ip && <p className="text-[12px] text-[#dc2626]">{errors.ip}</p>}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[14px] font-medium text-[#020817]">Mô tả</Label>
            <Input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="VD: Mạng nội bộ văn phòng..."
              className="h-10 text-[13px]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">Hủy bỏ</Button>
          <Button onClick={handleSave} className="bg-[#2563eb] hover:bg-blue-700 text-white gap-1.5 text-[13px]">
            <Save className="size-4" /> Thêm địa chỉ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── DeleteConfirm Dialog ─────────────────────────────────────────────────────
interface DeleteIpDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  ip: IpAddress | null;
  onConfirm: () => void;
}

function DeleteIpDialog({ open, onOpenChange, ip, onConfirm }: DeleteIpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-medium text-[#dc2626] flex items-center gap-2">
            <Trash2 className="size-5" /> Xóa địa chỉ mạng
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 space-y-3">
          <p className="text-[13px] text-[#020817]">
            Bạn có chắc muốn xóa địa chỉ <span className="font-medium font-mono">{ip?.ip}</span> khỏi danh sách cho phép?
          </p>
          <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md border border-red-200 text-[12px] text-[#dc2626]">
            <AlertTriangle className="size-4 mt-0.5 shrink-0" />
            <span>Sau khi xóa, địa chỉ mạng này sẽ không còn được phép truy cập hệ thống quản trị.</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">Hủy bỏ</Button>
          <Button onClick={onConfirm} className="bg-[#dc2626] hover:bg-red-700 text-white gap-1.5 text-[13px]">
            <Trash2 className="size-4" /> Xác nhận xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Toast-style notification ─────────────────────────────────────────────────
interface ToastProps { message: string; type: "success" | "error"; }

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CauHinhChungHeThong() {
  const location = useLocation();

  // Determine active tab dynamically from path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/admin/chinh-sach-mat-khau") return "password";
    if (path === "/admin/khoa-tai-khoan") return "lockout";
    return "password"; // fallback default
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  // -- Login Policy state
  const [loginPolicy, setLoginPolicy] = useState<LoginPolicy>({ maxAttempts: 5, lockDurationMinutes: 30 });
  const [loginPolicyDirty, setLoginPolicyDirty] = useState(false);
  const [loginErrors, setLoginErrors] = useState<{ maxAttempts?: string; lockDuration?: string }>({});

  // -- IP Whitelist state
  const [ips, setIps] = useState<IpAddress[]>(INITIAL_IPS);
  const [addIpOpen, setAddIpOpen] = useState(false);
  const [deleteIpOpen, setDeleteIpOpen] = useState(false);
  const [selectedIp, setSelectedIp] = useState<IpAddress | null>(null);

  // -- Storage Policy state
  const [storage, setStorage] = useState<StoragePolicy>({ maxImageMB: 10, maxVideoMB: 500, maxDocumentMB: 50 });
  const [storageDirty, setStorageDirty] = useState(false);
  const [storageErrors, setStorageErrors] = useState<{ image?: string; video?: string; document?: string }>({});

  // -- Password policy & 2FA states
  const [pwdPolicy, setPwdPolicy] = useState({
    minLen: 8,
    requireUpperLower: true,
    requireNumberSymbol: true,
    autoRotate: true,
  });
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);
  const [pwdPolicyDirty, setPwdPolicyDirty] = useState(false);

  // -- File extension checkboxes state
  const [allowedExtensions, setAllowedExtensions] = useState<Record<string, boolean>>({
    jpg: true, png: true, gif: false, webp: true,
    mp4: true, mov: true, avi: false, mkv: false,
    pdf: true, docx: true, xlsx: true, zip: true
  });
  const [extensionsDirty, setExtensionsDirty] = useState(false);

  // -- Toast
  const [toast, setToast] = useState<ToastProps | null>(null);
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Login Policy handlers ─────────────────────────────────────────────────
  const handleLoginPolicyChange = (field: keyof LoginPolicy, value: string) => {
    setLoginPolicy(prev => ({ ...prev, [field]: Number(value) }));
    setLoginPolicyDirty(true);
    setLoginErrors({});
  };

  const validateLoginPolicy = () => {
    const e: typeof loginErrors = {};
    if (!loginPolicy.maxAttempts || loginPolicy.maxAttempts < 1 || loginPolicy.maxAttempts > 20)
      e.maxAttempts = "Số lần tối đa phải từ 1 đến 20";
    if (!loginPolicy.lockDurationMinutes || loginPolicy.lockDurationMinutes < 1 || loginPolicy.lockDurationMinutes > 1440)
      e.lockDuration = "Thời gian khóa phải từ 1 đến 1440 phút";
    setLoginErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveLoginPolicy = () => {
    if (!validateLoginPolicy()) return;
    setLoginPolicyDirty(false);
    showToast("Hệ thống đã lưu cấu hình đăng nhập thành công!", "success");
  };

  // ── IP handlers ───────────────────────────────────────────────────────────
  const handleAddIp = (ip: string, desc: string) => {
    const newIp: IpAddress = {
      id: Date.now(), ip, description: desc,
      addedAt: new Date().toLocaleDateString("vi-VN"),
    };
    setIps(prev => [...prev, newIp]);
    showToast(`Đã thêm địa chỉ mạng ${ip} thành công!`, "success");
  };

  const handleDeleteIp = () => {
    if (!selectedIp) return;
    setIps(prev => prev.filter(i => i.id !== selectedIp.id));
    showToast(`Đã xóa địa chỉ mạng ${selectedIp.ip}!`, "success");
    setDeleteIpOpen(false);
    setSelectedIp(null);
  };

  // ── Storage handlers ──────────────────────────────────────────────────────
  const handleStorageChange = (field: keyof StoragePolicy, value: string) => {
    setStorage(prev => ({ ...prev, [field]: Number(value) }));
    setStorageDirty(true);
    setStorageErrors({});
  };

  const validateStorage = () => {
    const e: typeof storageErrors = {};
    if (!storage.maxImageMB || storage.maxImageMB < 1) e.image = "Dung lượng tối thiểu là 1 MB";
    if (!storage.maxVideoMB || storage.maxVideoMB < 1)  e.video = "Dung lượng tối thiểu là 1 MB";
    if (!storage.maxDocumentMB || storage.maxDocumentMB < 1) e.document = "Dung lượng tối thiểu là 1 MB";
    setStorageErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveStorage = () => {
    if (!validateStorage()) return;
    setStorageDirty(false);
    showToast("Đã lưu cấu hình dung lượng tải tệp!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle className="size-5 text-[#16a34a]" /> : <AlertTriangle className="size-5 text-[#dc2626]" />}
          <span className="text-[13px] font-medium">{toast.message}</span>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[#f1f5f9] p-1 rounded-xl w-fit flex gap-1 border border-slate-200 flex-wrap">
          <TabsTrigger
            value="password"
            className="px-4 py-2 text-sm font-medium gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            <Shield className="size-4" /> Thiết lập chính sách mật khẩu
          </TabsTrigger>
          <TabsTrigger
            value="lockout"
            className="px-4 py-2 text-sm font-medium gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            <Lock className="size-4" /> Khóa tài khoản sau số lần đăng nhập sai
          </TabsTrigger>
          <TabsTrigger
            value="ip"
            className="px-4 py-2 text-sm font-medium gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            <Network className="size-4" /> Danh sách IP được phép
          </TabsTrigger>
          <TabsTrigger
            value="storage"
            className="px-4 py-2 text-sm font-medium gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            <HardDrive className="size-4" /> Cấu hình dung lượng tệp
          </TabsTrigger>
        </TabsList>

        {/* ══ SECTION 1: Thiết lập chính sách mật khẩu ════════════════════════ */}
        <TabsContent value="password" className="space-y-5 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left: Cấu hình mật khẩu phức tạp & 2FA */}
            <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                  <div className="size-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Shield className="size-5 text-[#16a34a]" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#020817]">Yêu cầu độ phức tạp mật khẩu & 2FA</h2>
                    <p className="text-[12px] text-[#64748b]">Cấu hình các tiêu chí bắt buộc khi người dùng tạo hoặc thay đổi mật khẩu.</p>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4">
                  {/* Độ dài mật khẩu */}
                  <div className="space-y-1.5 max-w-md">
                    <Label className="text-[13px] font-medium text-[#020817]">Độ dài mật khẩu tối thiểu</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        min={6} max={32}
                        value={pwdPolicy.minLen}
                        onChange={e => {
                          setPwdPolicy(prev => ({ ...prev, minLen: Number(e.target.value) }));
                          setPwdPolicyDirty(true);
                        }}
                        className="h-10 text-[13px] pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#64748b]">ký tự</span>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pwdPolicy.requireUpperLower}
                        onChange={e => {
                          setPwdPolicy(prev => ({ ...prev, requireUpperLower: e.target.checked }));
                          setPwdPolicyDirty(true);
                        }}
                        className="size-4 rounded text-[#2563eb] focus:ring-[#2563eb] border-slate-300"
                      />
                      <div className="text-[13px]">
                        <p className="font-medium text-[#020817]">Chứa cả chữ hoa & chữ thường</p>
                        <p className="text-[11px] text-[#64748b]">Yêu cầu có ít nhất 1 chữ cái viết hoa và 1 chữ cái viết thường (VD: A-Z và a-z).</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pwdPolicy.requireNumberSymbol}
                        onChange={e => {
                          setPwdPolicy(prev => ({ ...prev, requireNumberSymbol: e.target.checked }));
                          setPwdPolicyDirty(true);
                        }}
                        className="size-4 rounded text-[#2563eb] focus:ring-[#2563eb] border-slate-300"
                      />
                      <div className="text-[13px]">
                        <p className="font-medium text-[#020817]">Chứa số và ký tự đặc biệt</p>
                        <p className="text-[11px] text-[#64748b]">Yêu cầu có ít nhất 1 chữ số và 1 ký tự đặc biệt (VD: 0-9 và @, #, $, %...).</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pwdPolicy.autoRotate}
                        onChange={e => {
                          setPwdPolicy(prev => ({ ...prev, autoRotate: e.target.checked }));
                          setPwdPolicyDirty(true);
                        }}
                        className="size-4 rounded text-[#2563eb] focus:ring-[#2563eb] border-slate-300"
                      />
                      <div className="text-[13px]">
                        <p className="font-medium text-[#020817]">Bắt buộc thay đổi mật khẩu định kỳ</p>
                        <p className="text-[11px] text-[#64748b]">Hệ thống tự động yêu cầu người dùng đổi mật khẩu mới sau mỗi 90 ngày.</p>
                      </div>
                    </label>
                  </div>

                  <hr className="border-slate-100" />

                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="flex gap-2">
                      <LockKeyhole className="size-4 text-[#16a34a] mt-0.5" />
                      <div className="text-[12px]">
                        <p className="font-medium text-[#15803d]">Bắt buộc Xác thực 2 lớp (2FA)</p>
                        <p className="text-[#166534]">Yêu cầu Google Authenticator hoặc OTP khi đăng nhập hệ thống.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFaEnabled}
                        onChange={e => {
                          setTwoFaEnabled(e.target.checked);
                          setPwdPolicyDirty(true);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>
                </CardContent>
              </div>

              <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-end bg-slate-50 rounded-b-lg">
                <Button
                  onClick={() => {
                    setPwdPolicyDirty(false);
                    showToast("Đã lưu chính sách mật khẩu và cấu hình 2FA thành công!", "success");
                  }}
                  disabled={!pwdPolicyDirty}
                  className={`gap-1.5 text-[13px] h-9 px-4 ${pwdPolicyDirty ? "bg-[#2563eb] hover:bg-blue-700 text-white" : "bg-slate-100 text-[#64748b] cursor-not-allowed"}`}
                >
                  <Save className="size-4" /> Lưu cấu hình
                </Button>
              </div>
            </Card>

            {/* Right: Hướng dẫn chính sách an toàn thông tin */}
            <Card className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                  <div className="size-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Info className="size-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#020817]">Quy chuẩn mật khẩu VEC</h2>
                    <p className="text-[12px] text-[#64748b]">Tiêu chuẩn an toàn thông tin cho toàn bộ tài khoản Cán bộ.</p>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4 text-[13px] text-[#64748b]">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="font-semibold text-[#020817] mb-1">Mã hóa mật khẩu</p>
                      <p className="text-[12px]">Mật khẩu được băm (hashing) 1 chiều bằng thuật toán mã hóa tối tân **BCrypt / SHA-256** kèm muối (salt) trước khi lưu trữ.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="font-semibold text-[#020817] mb-1">Tình trạng bảo mật hiện tại</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
                        <span className="text-[12px] font-semibold text-[#16a34a]">Rất an toàn (Strong)</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 text-[#2563eb] rounded-lg border border-blue-100 text-[12px]">
                      <p className="font-semibold mb-1">Khuyên dùng:</p>
                      <span>Nên kích hoạt chế độ đổi mật khẩu định kỳ 90 ngày và bắt buộc xác thực 2 lớp (2FA) đối với các tài khoản có quyền Quản trị tối cao.</span>
                    </div>
                  </div>
                </CardContent>
              </div>
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-lg text-center text-[12px] text-slate-400">
                Tuân thủ quy chuẩn ISO 27001
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ══ SECTION 2: Khóa tài khoản sau số lần đăng nhập sai ══════════════════ */}
        <TabsContent value="lockout" className="space-y-5 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left: Cấu hình khóa tài khoản tự động */}
            <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                  <div className="size-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Lock className="size-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#020817]">Cấu hình khóa tài khoản tự động</h2>
                    <p className="text-[12px] text-[#64748b]">Tạm thời khóa tài khoản khi người dùng nhập sai thông tin đăng nhập quá số lần quy định.</p>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Số lần đăng nhập sai tối đa */}
                    <div className="space-y-1.5">
                      <Label className={`text-[13px] font-medium ${loginErrors.maxAttempts ? "text-[#dc2626]" : "text-[#020817]"}`}>
                        Số lần đăng nhập sai tối đa <span className="text-[#dc2626]">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          type="number"
                          min={1} max={20}
                          value={loginPolicy.maxAttempts}
                          onChange={e => handleLoginPolicyChange("maxAttempts", e.target.value)}
                          className={`h-10 text-[13px] pr-14 ${loginErrors.maxAttempts ? "border-[#dc2626] bg-red-50" : ""}`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#64748b]">lần</span>
                      </div>
                      {loginErrors.maxAttempts
                        ? <p className="text-[12px] text-[#dc2626]">{loginErrors.maxAttempts}</p>
                        : <p className="text-[12px] text-[#64748b]">Cho phép nhập sai tối đa 1 đến 20 lần trước khi khóa.</p>
                      }
                    </div>

                    {/* Thời gian khóa */}
                    <div className="space-y-1.5">
                      <Label className={`text-[13px] font-medium ${loginErrors.lockDuration ? "text-[#dc2626]" : "text-[#020817]"}`}>
                        Thời gian khóa tài khoản <span className="text-[#dc2626]">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          type="number"
                          min={1} max={1440}
                          value={loginPolicy.lockDurationMinutes}
                          onChange={e => handleLoginPolicyChange("lockDurationMinutes", e.target.value)}
                          className={`h-10 text-[13px] pr-16 ${loginErrors.lockDuration ? "border-[#dc2626] bg-red-50" : ""}`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#64748b]">phút</span>
                      </div>
                      {loginErrors.lockDuration
                        ? <p className="text-[12px] text-[#dc2626]">{loginErrors.lockDuration}</p>
                        : <p className="text-[12px] text-[#64748b]">Thời gian tạm khóa tài khoản (Tối đa 1440 phút / 24h).</p>
                      }
                    </div>
                  </div>

                  {/* Info callout */}
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-md border border-blue-200 text-[12px] text-[#2563eb]">
                    <Info className="size-4 mt-0.5 shrink-0" />
                    <span>Khi bị khóa, hệ thống sẽ hiển thị thông báo cảnh báo trực quan và yêu cầu người dùng liên hệ với Quản trị viên để được hỗ trợ mở khóa.</span>
                  </div>
                </CardContent>
              </div>

              <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-lg">
                <span className="text-[12px] text-[#64748b]">Bảo mật đăng nhập hệ thống VEC</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSaveLoginPolicy}
                    disabled={!loginPolicyDirty}
                    className={`gap-1.5 text-[13px] h-9 px-4 ${loginPolicyDirty ? "bg-[#2563eb] hover:bg-blue-700 text-white" : "bg-slate-100 text-[#64748b] cursor-not-allowed"}`}
                  >
                    <Save className="size-4" /> Lưu cấu hình
                  </Button>
                  {!loginPolicyDirty && <span className="text-[12px] text-[#16a34a] flex items-center gap-1"><CheckCircle className="size-3.5" /> Đã lưu</span>}
                </div>
              </div>
            </Card>

            {/* Right: Danh sách tài khoản đang bị tạm khóa */}
            <Card className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                  <div className="size-9 rounded-lg bg-red-50 flex items-center justify-center">
                    <ShieldAlert className="size-5 text-[#dc2626]" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#020817]">Tài khoản đang bị khóa</h2>
                    <p className="text-[12px] text-[#64748b]">Danh sách cán bộ đăng nhập sai quá số lần và đang bị khóa tạm thời.</p>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  {[
                    { user: "guest_reporter", ip: "27.72.90.101", lockedAt: "Hôm nay, 01:10", timeLeft: "12 phút" },
                    { user: "test_operator", ip: "14.232.8.210", lockedAt: "Hôm nay, 00:45", timeLeft: "5 phút" }
                  ].map((acc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 text-[12px]">
                      <div>
                        <p className="font-semibold text-[#020817] font-mono">{acc.user}</p>
                        <p className="text-[10px] text-[#64748b]">Khóa: {acc.lockedAt}</p>
                        <p className="text-[10px] text-red-600 font-medium mt-1">Còn lại: {acc.timeLeft}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-[11px] text-[#2563eb] border-blue-200 hover:bg-blue-50 px-3"
                        onClick={() => showToast(`Đã mở khóa thủ công cho tài khoản ${acc.user}!`, "success")}
                      >
                        Mở khóa
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </div>
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-lg text-center text-[12px] text-[#64748b]">
                Hệ thống bảo vệ Brute-force đang bật
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ══ SECTION 2: Danh sách địa chỉ mạng + Nhật ký bảo mật ══════════════ */}
        <TabsContent value="ip" className="space-y-5 outline-none">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Whitelist IP Table (2/3 width on large screens) */}
            <Card className="xl:col-span-2 bg-white border border-slate-200 shadow-sm rounded-lg">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Network className="size-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#020817]">Danh sách địa chỉ mạng được phép (Whitelist IP)</h2>
                    <p className="text-[12px] text-[#64748b]">Các địa chỉ IP hoặc dải mạng (CIDR) được quyền truy cập vào hệ thống quản trị.</p>
                  </div>
                </div>
                <Button
                  onClick={() => setAddIpOpen(true)}
                  className="bg-[#2563eb] hover:bg-blue-700 text-white gap-1.5 text-[13px] h-9 px-3"
                  id="btn-add-ip"
                >
                  <Plus className="size-4" /> Thêm địa chỉ
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] text-[#64748b] font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 text-center w-12">STT</th>
                      <th className="px-4 py-3">Địa chỉ mạng (IP/CIDR)</th>
                      <th className="px-4 py-3">Mô tả mục đích</th>
                      <th className="px-4 py-3">Ngày kích hoạt</th>
                      <th className="px-4 py-3 text-center w-24">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px]">
                    {ips.length > 0 ? ips.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-center text-[#64748b]">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Shield className="size-3.5 text-[#16a34a] shrink-0" />
                            <span className="font-mono font-medium text-[#020817]">{item.ip}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#64748b]">{item.description || "—"}</td>
                        <td className="px-4 py-3 text-[#64748b]">{item.addedAt}</td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost" size="icon"
                            className="size-8 text-[#64748b] hover:text-[#dc2626] hover:bg-red-50 rounded"
                            title="Xóa địa chỉ mạng"
                            onClick={() => { setSelectedIp(item); setDeleteIpOpen(true); }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5}>
                          <div className="flex flex-col items-center py-10 text-[#64748b]">
                            <Network className="size-9 mb-2 text-slate-300" />
                            <p className="text-[14px] font-medium mb-3">Chưa có địa chỉ mạng nào được thêm</p>
                            <Button variant="outline" onClick={() => setAddIpOpen(true)} className="text-[13px] gap-1.5">
                              <Plus className="size-4" /> Thêm địa chỉ mạng
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Cấu hình nâng cao địa chỉ mạng */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/30 space-y-3.5">
                <h3 className="text-[13px] font-semibold text-[#020817] flex items-center gap-1.5">
                  <Settings className="size-4 text-slate-500" /> Cấu hình nâng cao địa chỉ mạng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Advanced setting 1 */}
                  <div className="flex items-start justify-between p-3 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow">
                    <div className="space-y-0.5 pr-2">
                      <p className="font-semibold text-[12px] text-[#020817]">Bảo vệ nâng cao (Enhanced Security)</p>
                      <p className="text-[11px] text-[#64748b]">Tự động chặn IP gửi liên tiếp 15 yêu cầu sai trong 1 phút.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-8 h-4.5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#2563eb]"></div>
                    </label>
                  </div>

                  {/* Advanced setting 2 */}
                  <div className="flex items-start justify-between p-3 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow">
                    <div className="space-y-0.5 pr-2">
                      <p className="font-semibold text-[12px] text-[#020817]">Bỏ qua Whitelist cho Superadmin</p>
                      <p className="text-[11px] text-[#64748b]">Cho phép tài khoản Root đăng nhập từ bất kỳ địa chỉ IP nào.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-8 h-4.5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#2563eb]"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-[12px] text-[#64748b]">
                <span>Mã xác thực IP được kiểm tra tự động ở mỗi yêu cầu API quản trị.</span>
                <span className="font-medium">Tổng số: {ips.length} địa chỉ</span>
              </div>
            </Card>

            {/* Right Side: Security Access Logs (1/3 width) */}
            <Card className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                  <div className="size-9 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Activity className="size-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#020817]">Nhật ký đăng nhập gần đây</h2>
                    <p className="text-[12px] text-[#64748b]">Giám sát các lần đăng nhập của quản trị viên và trạng thái IP.</p>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3.5">
                  {[
                    { user: "admin_vec", ip: "192.168.1.15", time: "Hôm nay, 01:25", status: "success", desc: "Mạng nội bộ Trụ sở" },
                    { user: "can_bo_01", ip: "10.0.1.44", time: "Hôm nay, 00:52", status: "success", desc: "Kết nối VPN an toàn" },
                    { user: "can_bo_02", ip: "114.125.68.99", time: "Hôm qua, 23:18", status: "blocked_ip", desc: "IP lạ không thuộc whitelist" },
                    { user: "unknown", ip: "203.162.4.190", time: "Hôm qua, 18:45", status: "failed_pwd", desc: "Sai mật khẩu lần 3" },
                    { user: "external_dev", ip: "1.53.8.44", time: "28/05, 14:30", status: "blocked_ip", desc: "Truy cập bị chặn ở cổng gateway" }
                  ].map((log, i) => (
                    <div key={i} className="flex flex-col gap-1 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[13px] text-[#020817] font-mono">{log.user}</span>
                        {log.status === "success" && (
                          <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px] px-1.5 py-0.5 rounded">
                            Thành công
                          </Badge>
                        )}
                        {log.status === "blocked_ip" && (
                          <Badge className="bg-red-50 text-red-700 border-red-200 text-[10px] px-1.5 py-0.5 rounded">
                            Bị chặn (IP)
                          </Badge>
                        )}
                        {log.status === "failed_pwd" && (
                          <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] px-1.5 py-0.5 rounded">
                            Lỗi mật khẩu
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between text-[11px] text-[#64748b]">
                        <span className="font-mono">{log.ip}</span>
                        <span>{log.time}</span>
                      </div>
                      <p className="text-[11px] text-[#64748b] italic">{log.desc}</p>
                    </div>
                  ))}
                </CardContent>
              </div>

              <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 rounded-b-lg flex justify-between items-center text-[12px]">
                <span className="text-[#64748b] flex items-center gap-1">
                  <ShieldAlert className="size-3.5 text-[#dc2626]" /> 2 sự cố chặn IP trong 24h qua
                </span>
                <Button variant="link" className="text-[12px] text-[#2563eb] p-0 h-auto">Xem tất cả nhật ký</Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ══ SECTION 3: Cấu hình dung lượng tải tệp + Trạng thái bộ nhớ ═══════════ */}
        <TabsContent value="storage" className="space-y-5 outline-none">
          {/* Main Card: Configuration Inputs */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-lg">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
              <div className="size-9 rounded-lg bg-orange-50 flex items-center justify-center">
                <HardDrive className="size-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#020817]">Cấu hình dung lượng tải tệp</h2>
                <p className="text-[12px] text-[#64748b]">Thiết lập giới hạn dung lượng tối đa cho video, hình ảnh và tài liệu trên ứng dụng web, di động.</p>
              </div>
            </div>
            <CardContent className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
                {/* Hình ảnh */}
                <div className="space-y-1.5">
                  <Label className={`text-[13px] font-medium flex items-center gap-1.5 ${storageErrors.image ? "text-[#dc2626]" : "text-[#020817]"}`}>
                    <Image className="size-4 text-[#2563eb]" /> Hình ảnh <span className="text-[#dc2626]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="number" min={1}
                      value={storage.maxImageMB}
                      onChange={e => handleStorageChange("maxImageMB", e.target.value)}
                      className={`h-10 text-[13px] pr-12 ${storageErrors.image ? "border-[#dc2626] bg-red-50" : ""}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#64748b]">MB</span>
                  </div>
                  {storageErrors.image
                    ? <p className="text-[12px] text-[#dc2626]">{storageErrors.image}</p>
                    : <p className="text-[12px] text-[#64748b]">Dung lượng tối đa mỗi ảnh tải lên</p>
                  }
                </div>

                {/* Video */}
                <div className="space-y-1.5">
                  <Label className={`text-[13px] font-medium flex items-center gap-1.5 ${storageErrors.video ? "text-[#dc2626]" : "text-[#020817]"}`}>
                    <Video className="size-4 text-indigo-600" /> Video <span className="text-[#dc2626]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="number" min={1}
                      value={storage.maxVideoMB}
                      onChange={e => handleStorageChange("maxVideoMB", e.target.value)}
                      className={`h-10 text-[13px] pr-12 ${storageErrors.video ? "border-[#dc2626] bg-red-50" : ""}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#64748b]">MB</span>
                  </div>
                  {storageErrors.video
                    ? <p className="text-[12px] text-[#dc2626]">{storageErrors.video}</p>
                    : <p className="text-[12px] text-[#64748b]">Dung lượng tối đa mỗi video tải lên</p>
                  }
                </div>

                {/* Tài liệu */}
                <div className="space-y-1.5">
                  <Label className={`text-[13px] font-medium flex items-center gap-1.5 ${storageErrors.document ? "text-[#dc2626]" : "text-[#020817]"}`}>
                    <FileText className="size-4 text-orange-600" /> Tài liệu <span className="text-[#dc2626]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="number" min={1}
                      value={storage.maxDocumentMB}
                      onChange={e => handleStorageChange("maxDocumentMB", e.target.value)}
                      className={`h-10 text-[13px] pr-12 ${storageErrors.document ? "border-[#dc2626] bg-red-50" : ""}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#64748b]">MB</span>
                  </div>
                  {storageErrors.document
                    ? <p className="text-[12px] text-[#dc2626]">{storageErrors.document}</p>
                    : <p className="text-[12px] text-[#64748b]">Dung lượng tối đa mỗi tài liệu (.pdf, .docx...)</p>
                  }
                </div>
              </div>

              {/* Summary badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: "Ảnh", value: storage.maxImageMB, icon: Image, color: "bg-blue-50 text-[#2563eb] border-blue-200" },
                  { label: "Video", value: storage.maxVideoMB, icon: Video, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
                  { label: "Tài liệu", value: storage.maxDocumentMB, icon: FileText, color: "bg-orange-50 text-orange-700 border-orange-200" },
                ].map(s => (
                  <Badge key={s.label} className={`flex items-center gap-1.5 rounded-full px-3 py-1 border text-[12px] font-medium ${s.color}`}>
                    <s.icon className="size-3.5" />
                    {s.label}: tối đa {s.value} MB
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  onClick={handleSaveStorage}
                  disabled={!storageDirty}
                  className={`gap-1.5 text-[13px] h-9 px-4 ${storageDirty ? "bg-[#2563eb] hover:bg-blue-700 text-white" : "bg-slate-100 text-[#64748b] cursor-not-allowed"}`}
                >
                  <Save className="size-4" /> Lưu cấu hình
                </Button>
                {!storageDirty && <span className="text-[12px] text-[#16a34a] flex items-center gap-1"><CheckCircle className="size-3.5" /> Đã lưu</span>}
              </div>
            </CardContent>
          </Card>

          {/* Side-by-side additional storage components to fill layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* System Storage allocation */}
            <Card className="bg-white border border-slate-200 shadow-sm rounded-lg">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                <div className="size-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Database className="size-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-[16px] font-semibold text-[#020817]">Trạng thái bộ nhớ lưu trữ hệ thống</h2>
                  <p className="text-[12px] text-[#64748b]">Phân bổ dung lượng lưu trữ trên máy chủ đám mây S3 của VEC.</p>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[13px] font-medium">
                    <span className="text-[#020817]">Tổng dung lượng đã sử dụng</span>
                    <span className="text-[#64748b]">1.22 TB / 5.00 TB (24.4%)</span>
                  </div>
                  {/* Segmented Progress Bar */}
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: "8%" }} title="Hình ảnh: 400 GB" />
                    <div className="h-full bg-indigo-500 transition-all" style={{ width: "13%" }} title="Video: 650 GB" />
                    <div className="h-full bg-orange-500 transition-all" style={{ width: "3.4%" }} title="Tài liệu: 170 GB" />
                  </div>
                </div>

                {/* Storage breakdown legend */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-50">
                    <div className="size-3 rounded-full bg-blue-500 shrink-0" />
                    <div className="text-[12px]">
                      <p className="font-semibold text-[#020817]">Hình ảnh</p>
                      <p className="text-[#64748b]">400 GB (~8.0%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-50">
                    <div className="size-3 rounded-full bg-indigo-500 shrink-0" />
                    <div className="text-[12px]">
                      <p className="font-semibold text-[#020817]">Video giám sát</p>
                      <p className="text-[#64748b]">650 GB (~13.0%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-50">
                    <div className="size-3 rounded-full bg-orange-500 shrink-0" />
                    <div className="text-[12px]">
                      <p className="font-semibold text-[#020817]">Tài liệu, báo cáo</p>
                      <p className="text-[#64748b]">170 GB (~3.4%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-50 bg-slate-50">
                    <div className="size-3 rounded-full bg-slate-300 shrink-0" />
                    <div className="text-[12px]">
                      <p className="font-semibold text-[#020817]">Dung lượng trống</p>
                      <p className="text-[#64748b]">3.78 TB (~75.6%)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Allowed file formats */}
            <Card className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                  <div className="size-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Shield className="size-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#020817]">Cấu hình định dạng tệp tin cho phép</h2>
                    <p className="text-[12px] text-[#64748b]">Giới hạn các loại tệp tin mở rộng mà người dùng được phép tải lên hệ thống.</p>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4">
                  {/* Extension Groups */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Định dạng hình ảnh</h3>
                      <div className="flex flex-wrap gap-2">
                        {["jpg", "png", "gif", "webp"].map(ext => (
                          <label key={ext} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium cursor-pointer transition-colors ${allowedExtensions[ext] ? "bg-blue-50 border-blue-200 text-[#2563eb]" : "bg-white border-slate-200 text-slate-500"}`}>
                            <input
                              type="checkbox"
                              checked={allowedExtensions[ext]}
                              onChange={e => {
                                setAllowedExtensions(prev => ({ ...prev, [ext]: e.target.checked }));
                                setExtensionsDirty(true);
                              }}
                              className="sr-only"
                            />
                            <span>.{ext}</span>
                            {allowedExtensions[ext] && <Check className="size-3.5" />}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Định dạng video</h3>
                      <div className="flex flex-wrap gap-2">
                        {["mp4", "mov", "avi", "mkv"].map(ext => (
                          <label key={ext} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium cursor-pointer transition-colors ${allowedExtensions[ext] ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-500"}`}>
                            <input
                              type="checkbox"
                              checked={allowedExtensions[ext]}
                              onChange={e => {
                                setAllowedExtensions(prev => ({ ...prev, [ext]: e.target.checked }));
                                setExtensionsDirty(true);
                              }}
                              className="sr-only"
                            />
                            <span>.{ext}</span>
                            {allowedExtensions[ext] && <Check className="size-3.5" />}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">Định dạng văn bản & lưu trữ</h3>
                      <div className="flex flex-wrap gap-2">
                        {["pdf", "docx", "xlsx", "zip"].map(ext => (
                          <label key={ext} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium cursor-pointer transition-colors ${allowedExtensions[ext] ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-slate-200 text-slate-500"}`}>
                            <input
                              type="checkbox"
                              checked={allowedExtensions[ext]}
                              onChange={e => {
                                setAllowedExtensions(prev => ({ ...prev, [ext]: e.target.checked }));
                                setExtensionsDirty(true);
                              }}
                              className="sr-only"
                            />
                            <span>.{ext}</span>
                            {allowedExtensions[ext] && <Check className="size-3.5" />}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-end bg-slate-50 rounded-b-lg">
                <Button
                  onClick={() => {
                    setExtensionsDirty(false);
                    showToast("Đã cập nhật các định dạng tệp tin cho phép!", "success");
                  }}
                  disabled={!extensionsDirty}
                  className={`gap-1.5 text-[13px] h-9 px-4 ${extensionsDirty ? "bg-[#2563eb] hover:bg-blue-700 text-white" : "bg-slate-100 text-[#64748b] cursor-not-allowed"}`}
                >
                  <Save className="size-4" /> Lưu cấu hình
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Dialogs ──────────────────────────────────────────────────────────── */}
      <AddIpDialog    open={addIpOpen}    onOpenChange={setAddIpOpen}    onAdd={handleAddIp} />
      <DeleteIpDialog open={deleteIpOpen} onOpenChange={setDeleteIpOpen} ip={selectedIp} onConfirm={handleDeleteIp} />
    </div>
  );
}
