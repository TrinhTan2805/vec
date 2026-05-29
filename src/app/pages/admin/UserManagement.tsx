import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Filter,
  FileSpreadsheet,
  Eye,
  Lock,
  Unlock,
  UserPlus,
  Pencil,
  Trash2,
  KeyRound,
  X,
  Save,
  AlertTriangle,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

// ─── Types ───────────────────────────────────────────────────────────────────
type UserRole = "Quản trị viên" | "Chuyên viên" | "Người xem";
type UserStatus = "active" | "inactive";

interface UserItem {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  unit: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_USERS: UserItem[] = [
  { id: 1, fullName: "Nguyễn Văn An", username: "nguyenvanan", email: "nguyenvanan@vec.com.vn", phone: "0912345678", unit: "Ban Quản lý Kỹ thuật", role: "Quản trị viên", status: "active", lastLogin: "10:30 21/05/2026" },
  { id: 2, fullName: "Trần Thị Bình", username: "tranthibinh", email: "tranthibinh@vec.com.vn", phone: "0923456789", unit: "Ban Quản lý Tài sản", role: "Chuyên viên", status: "active", lastLogin: "08:15 20/05/2026" },
  { id: 3, fullName: "Lê Văn Cường", username: "levancuong", email: "levancuong@vec.com.vn", phone: "0934567890", unit: "Phòng Bảo trì - Bảo dưỡng", role: "Người xem", status: "inactive", lastLogin: "14:20 19/05/2026" },
  { id: 4, fullName: "Phạm Thị Dung", username: "phamthidung", email: "phamthidung@vec.com.vn", phone: "0945678901", unit: "Trung tâm CNTT", role: "Chuyên viên", status: "active", lastLogin: "09:05 18/05/2026" },
  { id: 5, fullName: "Hoàng Văn Đức", username: "hoangvanduc", email: "hoangvanduc@vec.com.vn", phone: "0956789012", unit: "Ban Giám sát Vận hành", role: "Chuyên viên", status: "inactive", lastLogin: "16:40 15/05/2026" },
  { id: 6, fullName: "Vũ Thị Hoa", username: "vuthihoa", email: "vuthihoa@vec.com.vn", phone: "0967890123", unit: "Ban Quản lý Kỹ thuật", role: "Người xem", status: "active", lastLogin: "11:00 22/05/2026" },
];

const UNITS = [
  "Ban Quản lý Kỹ thuật",
  "Ban Quản lý Tài sản",
  "Phòng Bảo trì - Bảo dưỡng",
  "Trung tâm CNTT",
  "Ban Giám sát Vận hành",
  "Ban Giám đốc",
];

// ─── Badge helpers (rounded-full, nền nhạt, chữ đậm — theo chuẩn 5.8) ───────
const roleBadgeClass: Record<UserRole, string> = {
  "Quản trị viên": "bg-blue-50 text-[#2563eb] border border-blue-200",
  "Chuyên viên":   "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Người xem":     "bg-slate-100 text-slate-600 border border-slate-200",
};

// ─── Error state helpers ──────────────────────────────────────────────────────
interface FieldError { fullName?: string; username?: string; email?: string; }

// ─── UserFormDialog (Thêm / Sửa) — theo chuẩn 5.4 + 5.2 + 5.7 ──────────────
interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: UserItem | null;
  onSave: (data: Partial<UserItem>) => void;
}

function UserFormDialog({ open, onOpenChange, user, onSave }: UserFormDialogProps) {
  const [form, setForm] = useState({ fullName: "", username: "", email: "", phone: "", unit: "", role: "Chuyên viên" as UserRole });
  const [errors, setErrors] = useState<FieldError>({});
  const isEdit = !!user;

  React.useEffect(() => {
    if (open) {
      setErrors({});
      setForm(user
        ? { fullName: user.fullName, username: user.username, email: user.email, phone: user.phone, unit: user.unit, role: user.role }
        : { fullName: "", username: "", email: "", phone: "", unit: "", role: "Chuyên viên" }
      );
    }
  }, [open, user]);

  const validate = (): boolean => {
    const e: FieldError = {};
    if (!form.fullName.trim()) e.fullName = "Họ và tên không được để trống";
    if (!form.username.trim()) e.username = "Tên đăng nhập không được để trống";
    if (!form.email.trim()) e.email = "Email không được để trống";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email không đúng định dạng";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    onOpenChange(false);
  };

  // Helper: input class theo chuẩn 5.2 — viền đỏ khi có lỗi
  const inputCls = (field: keyof FieldError) =>
    `h-10 text-[13px] ${errors[field] ? "border-[#dc2626] bg-red-50 focus-visible:ring-[#dc2626]" : ""}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          {/* Tiêu đề trên trái — chuẩn 5.4 */}
          <DialogTitle className="text-[20px] font-medium text-[#020817] flex items-center gap-2">
            <UserPlus className="size-5 text-[#2563eb]" />
            {isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[#64748b]">
            {isEdit ? "Cập nhật thông tin người dùng và nhấn Lưu để xác nhận thay đổi." : "Nhập thông tin người dùng mới. Hệ thống sẽ lưu và xác nhận sau khi tạo thành công."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-2">
          {/* Họ và tên — required */}
          <div className="col-span-2 space-y-1.5">
            <Label className={`text-[14px] font-medium ${errors.fullName ? "text-[#dc2626]" : "text-[#020817]"}`}>
              Họ và tên <span className="text-[#dc2626]">*</span>
            </Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={e => { setForm({ ...form, fullName: e.target.value }); setErrors({ ...errors, fullName: undefined }); }}
              placeholder="Nhập họ và tên..."
              className={inputCls("fullName")}
            />
            {errors.fullName && <p className="text-[12px] text-[#dc2626]">{errors.fullName}</p>}
          </div>

          {/* Tên đăng nhập — required, disabled khi sửa */}
          <div className="space-y-1.5">
            <Label className={`text-[14px] font-medium ${errors.username ? "text-[#dc2626]" : "text-[#020817]"}`}>
              Tên đăng nhập <span className="text-[#dc2626]">*</span>
            </Label>
            <Input
              id="username"
              value={form.username}
              onChange={e => { setForm({ ...form, username: e.target.value }); setErrors({ ...errors, username: undefined }); }}
              placeholder="VD: nguyenvanan"
              disabled={isEdit}
              className={`${inputCls("username")} ${isEdit ? "bg-slate-100 text-[#64748b] cursor-not-allowed opacity-80" : ""}`}
            />
            {errors.username && <p className="text-[12px] text-[#dc2626]">{errors.username}</p>}
          </div>

          {/* Email — required */}
          <div className="space-y-1.5">
            <Label className={`text-[14px] font-medium ${errors.email ? "text-[#dc2626]" : "text-[#020817]"}`}>
              Email <span className="text-[#dc2626]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
              placeholder="VD: example@vec.com.vn"
              className={inputCls("email")}
            />
            {errors.email && <p className="text-[12px] text-[#dc2626]">{errors.email}</p>}
          </div>

          {/* Số điện thoại */}
          <div className="space-y-1.5">
            <Label className="text-[14px] font-medium text-[#020817]">Số điện thoại</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="VD: 0912345678"
              className="h-10 text-[13px]"
            />
          </div>

          {/* Quyền hạn — Select theo chuẩn 5.7 */}
          <div className="space-y-1.5">
            <Label className="text-[14px] font-medium text-[#020817]">Quyền hạn</Label>
            <Select value={form.role} onValueChange={v => setForm({ ...form, role: v as UserRole })}>
              <SelectTrigger className="h-10 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Quản trị viên">Quản trị viên</SelectItem>
                <SelectItem value="Chuyên viên">Chuyên viên</SelectItem>
                <SelectItem value="Người xem">Người xem</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Đơn vị */}
          <div className="col-span-2 space-y-1.5">
            <Label className="text-[14px] font-medium text-[#020817]">Đơn vị công tác</Label>
            <Select value={form.unit} onValueChange={v => setForm({ ...form, unit: v })}>
              <SelectTrigger className="h-10 text-[13px]"><SelectValue placeholder="Chọn đơn vị..." /></SelectTrigger>
              <SelectContent>
                {UNITS.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer buttons — Outline=Hủy, Primary=Lưu (chuẩn 5.1) */}
        <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="gap-1.5 text-[13px]">
            <X className="size-4" /> Hủy bỏ
          </Button>
          <Button onClick={handleSubmit} className="bg-[#2563eb] hover:bg-blue-700 text-white gap-1.5 text-[13px]">
            <Save className="size-4" /> {isEdit ? "Lưu thay đổi" : "Tạo người dùng"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── DetailDialog (Xem chi tiết) — chuẩn 5.4 ────────────────────────────────
interface DetailDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: UserItem | null;
}

function DetailDialog({ open, onOpenChange, user }: DetailDialogProps) {
  if (!user) return null;
  const fields = [
    { label: "Họ và tên",       value: user.fullName },
    { label: "Tên đăng nhập",   value: user.username },
    { label: "Email",            value: user.email },
    { label: "Số điện thoại",   value: user.phone },
    { label: "Đơn vị công tác", value: user.unit },
    { label: "Đăng nhập gần nhất", value: user.lastLogin },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-medium text-[#020817] flex items-center gap-2">
            <Eye className="size-5 text-[#64748b]" /> Chi tiết người dùng
          </DialogTitle>
        </DialogHeader>

        {/* Avatar + tên + role/status */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 mt-2">
          <div className="size-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-2xl font-medium shadow">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <p className="text-[16px] font-medium text-[#020817]">{user.fullName}</p>
            <p className="text-[13px] text-[#64748b] font-mono">@{user.username}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge className={`text-[12px] font-medium rounded-full px-2.5 py-0.5 ${roleBadgeClass[user.role]}`}>{user.role}</Badge>
              <Badge className={`text-[12px] font-medium rounded-full px-2.5 py-0.5 border ${user.status === "active" ? "bg-[#dcfce7] text-[#16a34a] border-green-200" : "bg-[#fee2e2] text-[#dc2626] border-red-200"}`}>
                {user.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Các trường thông tin — readonly input theo chuẩn 5.2 */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {fields.map(f => (
            <div key={f.label} className="space-y-1">
              <p className="text-[12px] font-medium text-[#64748b]">{f.label}</p>
              <div className="h-10 flex items-center px-3 text-[13px] text-[#020817] bg-slate-50 border border-slate-200 rounded-md">
                {f.value || "—"}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── ChangePwdDialog — chuẩn 5.4 + 5.2 ──────────────────────────────────────
interface ChangePwdDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: UserItem | null;
}

function ChangePwdDialog({ open, onOpenChange, user }: ChangePwdDialogProps) {
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errors, setErrors] = useState<{ newPwd?: string; confirmPwd?: string }>({});

  React.useEffect(() => { if (open) { setNewPwd(""); setConfirmPwd(""); setErrors({}); } }, [open]);

  const handleSave = () => {
    const e: typeof errors = {};
    if (!newPwd || newPwd.length < 8) e.newPwd = "Mật khẩu phải có ít nhất 8 ký tự";
    if (newPwd !== confirmPwd) e.confirmPwd = "Mật khẩu xác nhận không khớp";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    alert(`Hệ thống đã đặt lại mật khẩu thành công cho tài khoản: ${user?.username}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-medium text-[#020817] flex items-center gap-2">
            <KeyRound className="size-5 text-[#ca8a04]" /> Đổi mật khẩu
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[#64748b]">
            Đặt lại mật khẩu cho tài khoản <span className="font-medium text-[#020817]">@{user?.username}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label className={`text-[14px] font-medium ${errors.newPwd ? "text-[#dc2626]" : "text-[#020817]"}`}>
              Mật khẩu mới <span className="text-[#dc2626]">*</span>
            </Label>
            <Input
              type="password"
              value={newPwd}
              onChange={e => { setNewPwd(e.target.value); setErrors({ ...errors, newPwd: undefined }); }}
              placeholder="Tối thiểu 8 ký tự"
              className={`h-10 text-[13px] ${errors.newPwd ? "border-[#dc2626] bg-red-50" : ""}`}
            />
            {errors.newPwd && <p className="text-[12px] text-[#dc2626]">{errors.newPwd}</p>}
          </div>
          <div className="space-y-1.5">
            <Label className={`text-[14px] font-medium ${errors.confirmPwd ? "text-[#dc2626]" : "text-[#020817]"}`}>
              Xác nhận mật khẩu <span className="text-[#dc2626]">*</span>
            </Label>
            <Input
              type="password"
              value={confirmPwd}
              onChange={e => { setConfirmPwd(e.target.value); setErrors({ ...errors, confirmPwd: undefined }); }}
              placeholder="Nhập lại mật khẩu"
              className={`h-10 text-[13px] ${errors.confirmPwd ? "border-[#dc2626] bg-red-50" : ""}`}
            />
            {errors.confirmPwd && <p className="text-[12px] text-[#dc2626]">{errors.confirmPwd}</p>}
          </div>
          {/* Warning — chuẩn Warning color #ca8a04 */}
          <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-md border border-yellow-200 text-[12px] text-[#ca8a04]">
            <AlertTriangle className="size-4 mt-0.5 shrink-0" />
            <span>Mật khẩu mới phải có ít nhất 8 ký tự. Hệ thống sẽ áp dụng thay đổi và thông báo xác nhận.</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">Hủy bỏ</Button>
          <Button onClick={handleSave} className="bg-[#ca8a04] hover:bg-yellow-700 text-white gap-1.5 text-[13px]">
            <ShieldCheck className="size-4" /> Xác nhận đổi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── DeleteDialog — chuẩn Destructive #dc2626 ────────────────────────────────
interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: UserItem | null;
  onConfirm: () => void;
}

function DeleteDialog({ open, onOpenChange, user, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-medium text-[#dc2626] flex items-center gap-2">
            <Trash2 className="size-5" /> Xác nhận xóa người dùng
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 space-y-3">
          <p className="text-[13px] text-[#020817]">
            Bạn có chắc chắn muốn xóa tài khoản{" "}
            <span className="font-medium">"{user?.fullName}"</span> ({user?.username})?
          </p>
          <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md border border-red-200 text-[12px] text-[#dc2626]">
            <AlertTriangle className="size-4 mt-0.5 shrink-0" />
            <span>Hệ thống sẽ xóa toàn bộ dữ liệu liên quan. Hành động này không thể hoàn tác!</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-[13px]">Hủy bỏ</Button>
          {/* Destructive button — chỉ dùng cho xóa — chuẩn 5.1 */}
          <Button onClick={onConfirm} className="bg-[#dc2626] hover:bg-red-700 text-white gap-1.5 text-[13px]">
            <Trash2 className="size-4" /> Xác nhận xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UserManagement() {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog state
  const [formOpen, setFormOpen]     = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pwdOpen, setPwdOpen]       = useState(false);
  const [selected, setSelected]     = useState<UserItem | null>(null);

  // Stats
  const stats = useMemo(() => ({
    total:    users.length,
    active:   users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
  }), [users]);

  // Filtered + paginated
  const filtered = useMemo(() => {
    setCurrentPage(1);
    return users.filter(u => {
      const q = searchTerm.toLowerCase();
      const matchText = !q || u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.username.toLowerCase().includes(q);
      const matchRole   = filterRole   === "all" || u.role   === filterRole;
      const matchStatus = filterStatus === "all" || u.status === filterStatus;
      return matchText && matchRole && matchStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Actions
  const openAdd    = () => { setSelected(null); setFormOpen(true); };
  const openEdit   = (u: UserItem) => { setSelected(u); setFormOpen(true); };
  const openDetail = (u: UserItem) => { setSelected(u); setDetailOpen(true); };
  const openDelete = (u: UserItem) => { setSelected(u); setDeleteOpen(true); };
  const openPwd    = (u: UserItem) => { setSelected(u); setPwdOpen(true); };

  const handleSave = (data: Partial<UserItem>) => {
    if (selected) {
      setUsers(prev => prev.map(u => u.id === selected.id ? { ...u, ...data } : u));
    } else {
      setUsers(prev => [{
        id: Date.now(), fullName: data.fullName!, username: data.username!, email: data.email!,
        phone: data.phone || "", unit: data.unit || "", role: data.role || "Chuyên viên",
        status: "active", lastLogin: "—",
      }, ...prev]);
    }
  };

  const handleDelete = () => {
    if (!selected) return;
    setUsers(prev => prev.filter(u => u.id !== selected.id));
    alert(`Hệ thống đã xóa tài khoản "${selected.username}" thành công!`);
    setDeleteOpen(false);
  };

  const handleToggle = (u: UserItem) => {
    const next = u.status === "active" ? "inactive" : "active";
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: next } : x));
    alert(`Hệ thống đã ${next === "active" ? "mở khóa" : "khóa"} tài khoản: ${u.fullName}`);
  };

  const handleExport = () => alert("Hệ thống kết xuất danh sách người dùng thành công dưới định dạng Excel.");

  return (
    <div className="space-y-5">
      {/* ── Breadcrumb + Header ─────────────────────────────── chuẩn 5.15 */}
      <div className="flex items-start justify-between">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-[12px] text-[#64748b] mb-1.5 font-medium">
            <span>Quản trị</span>
            <span>/</span>
            <span className="font-medium text-[#020817]">Quản lý người dùng</span>
          </nav>
          {/* H1 — 24px medium */}
          <h1 className="text-[24px] font-medium text-[#020817]">Quản lý người dùng</h1>
          <p className="text-[13px] text-[#64748b] mt-0.5">Quản lý tài khoản, quyền hạn và trạng thái người dùng trong hệ thống VEC.</p>
        </div>
        {/* Primary button — chuẩn 5.1 */}
        <Button
          id="btn-add-user"
          onClick={openAdd}
          className="bg-[#2563eb] hover:bg-blue-700 text-white gap-2 text-[13px] h-10 px-4"
        >
          <UserPlus className="size-4" />
          Thêm người dùng
        </Button>
      </div>

      {/* ── Stats Cards ─────────────────────────────────────── chuẩn 5.6 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Tổng người dùng",  value: stats.total,    icon: Users,     bg: "bg-blue-50",    text: "text-[#2563eb]" },
          { label: "Đang hoạt động",   value: stats.active,   icon: UserCheck, bg: "bg-green-50",   text: "text-[#16a34a]" },
          { label: "Không hoạt động",  value: stats.inactive, icon: UserX,     bg: "bg-orange-50",  text: "text-orange-600" },
        ].map(s => (
          <Card key={s.label} className="bg-white border border-slate-200 shadow-sm rounded-lg">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`flex size-11 items-center justify-center rounded-lg ${s.bg} ${s.text}`}>
                <s.icon className="size-5" />
              </div>
              <div>
                <p className="text-[13px] text-[#64748b]">{s.label}</p>
                <p className={`text-[24px] font-medium ${s.text}`}>{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Toolbar: Search + Filter + Export ─────────────── chuẩn 5.11, 5.7 */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-1 gap-2 items-center flex-wrap">
          {/* Search — chuẩn 5.11 */}
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#64748b]" />
            <Input
              id="search-user"
              placeholder="Tìm theo tên, email, tên đăng nhập..."
              className="pl-10 h-10 text-[13px] border-slate-200"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter quyền hạn — chuẩn 5.7 */}
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="h-10 w-[160px] text-[13px] border-slate-200" id="filter-role">
              <Filter className="size-3.5 mr-1.5 text-[#64748b]" />
              <SelectValue placeholder="Quyền hạn" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả quyền</SelectItem>
              <SelectItem value="Quản trị viên">Quản trị viên</SelectItem>
              <SelectItem value="Chuyên viên">Chuyên viên</SelectItem>
              <SelectItem value="Người xem">Người xem</SelectItem>
            </SelectContent>
          </Select>
          {/* Filter trạng thái */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-10 w-[160px] text-[13px] border-slate-200" id="filter-status">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Export Excel — icon FileSpreadsheet màu Success theo chuẩn icon */}
        <Button
          variant="outline"
          id="btn-export"
          onClick={handleExport}
          className="h-10 text-[13px] gap-2 border-slate-200"
        >
          <FileSpreadsheet className="size-4 text-[#16a34a]" />
          Xuất Excel
        </Button>
      </div>

      {/* ── Table ────────────────────────────────────────────── chuẩn 5.3 */}
      <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            {/* Header — nền xám, chữ đậm, sticky */}
            <thead className="bg-slate-50 border-b border-slate-200 text-[12px] text-[#64748b] font-medium uppercase tracking-wide sticky top-0">
              <tr>
                <th className="px-4 py-3 text-center w-12">STT</th>
                <th className="px-4 py-3">Họ và tên</th>
                <th className="px-4 py-3">Tên đăng nhập</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Đơn vị</th>
                <th className="px-4 py-3">Quyền hạn</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Đăng nhập gần nhất</th>
                {/* Cột hành động — luôn cuối bên phải — chuẩn 5.3 */}
                <th className="px-4 py-3 text-center w-36">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-[#020817]">
              {paginated.length > 0 ? paginated.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-center text-[#64748b]">{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white text-[13px] font-medium shrink-0">
                        {item.fullName.charAt(0)}
                      </div>
                      <span className="font-medium">{item.fullName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[#64748b]">{item.username}</td>
                  <td className="px-4 py-3 text-[#64748b]">{item.email}</td>
                  <td className="px-4 py-3 text-[#020817]">{item.unit}</td>
                  <td className="px-4 py-3">
                    {/* Badge — rounded-full, nền nhạt — chuẩn 5.8 */}
                    <Badge className={`text-[12px] font-medium rounded-full px-2.5 py-0.5 ${roleBadgeClass[item.role]}`}>
                      {item.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`text-[12px] font-medium rounded-full px-2.5 py-0.5 border ${item.status === "active" ? "bg-[#dcfce7] text-[#16a34a] border-green-200" : "bg-[#fee2e2] text-[#dc2626] border-red-200"}`}>
                      {item.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[#64748b]">{item.lastLogin}</td>
                  {/* Thao tác — Ghost buttons, icon theo chuẩn 3 */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-0.5">
                      {/* Eye = xem chi tiết */}
                      <Button variant="ghost" size="icon" className="size-8 text-[#64748b] hover:text-[#020817] hover:bg-slate-100 rounded" title="Xem chi tiết" onClick={() => openDetail(item)}>
                        <Eye className="size-4" />
                      </Button>
                      {/* Pencil = chỉnh sửa, màu Indigo */}
                      <Button variant="ghost" size="icon" className="size-8 text-[#64748b] hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Chỉnh sửa" onClick={() => openEdit(item)}>
                        <Pencil className="size-4" />
                      </Button>
                      {/* KeyRound = đổi mật khẩu, màu Warning */}
                      <Button variant="ghost" size="icon" className="size-8 text-[#64748b] hover:text-[#ca8a04] hover:bg-yellow-50 rounded" title="Đổi mật khẩu" onClick={() => openPwd(item)}>
                        <KeyRound className="size-4" />
                      </Button>
                      {/* Lock/Unlock = khóa/mở tài khoản */}
                      <Button variant="ghost" size="icon"
                        className={`size-8 rounded ${item.status === "active" ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50" : "text-[#16a34a] hover:text-green-700 hover:bg-green-50"}`}
                        title={item.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        onClick={() => handleToggle(item)}
                      >
                        {item.status === "active" ? <Lock className="size-4" /> : <Unlock className="size-4" />}
                      </Button>
                      {/* Trash2 = xóa, màu Destructive — chuẩn 3 */}
                      <Button variant="ghost" size="icon" className="size-8 text-[#64748b] hover:text-[#dc2626] hover:bg-red-50 rounded" title="Xóa" onClick={() => openDelete(item)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                /* Empty state — chuẩn 5.16 */
                <tr>
                  <td colSpan={9}>
                    <div className="flex flex-col items-center justify-center py-12 text-[#64748b]">
                      <FolderOpen className="size-10 mb-2 text-slate-300" />
                      <p className="text-[14px] font-medium mb-3">Không có dữ liệu</p>
                      <Button variant="outline" onClick={openAdd} className="text-[13px] gap-1.5">
                        <UserPlus className="size-4" /> Thêm người dùng
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ──────────────────────────────────────── chuẩn 5.14 */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[13px] text-[#64748b]">
            <span>Hiển thị</span>
            <Select value={String(pageSize)} onValueChange={v => { setPageSize(Number(v)); setCurrentPage(1); }}>
              <SelectTrigger className="h-8 w-[70px] text-[13px] border-slate-200 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>bản ghi / trang — Tổng <span className="font-medium text-[#020817]">{filtered.length}</span> bản ghi</span>
          </div>

          <div className="flex items-center gap-1 text-[13px]">
            <span className="text-[#64748b] mr-2">{(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filtered.length)} / {filtered.length}</span>
            <Button variant="outline" size="sm" className="h-8 px-3 text-[13px]" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Trước</Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  size="sm"
                  className={`h-8 w-8 text-[13px] ${currentPage === page ? "bg-[#2563eb] text-white hover:bg-blue-700" : "bg-white border border-slate-200 text-[#020817] hover:bg-slate-50"}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button variant="outline" size="sm" className="h-8 px-3 text-[13px]" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Sau</Button>
          </div>
        </div>
      </Card>

      {/* ── Dialogs ──────────────────────────────────────────────────────── */}
      <UserFormDialog open={formOpen}   onOpenChange={setFormOpen}   user={selected} onSave={handleSave} />
      <DetailDialog   open={detailOpen} onOpenChange={setDetailOpen} user={selected} />
      <ChangePwdDialog open={pwdOpen}   onOpenChange={setPwdOpen}    user={selected} />
      <DeleteDialog   open={deleteOpen} onOpenChange={setDeleteOpen} user={selected} onConfirm={handleDelete} />
    </div>
  );
}
