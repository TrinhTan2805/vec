import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Percent,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Lock,
  X,
  Save,
  CheckCircle,
  AlertTriangle,
  FolderOpen,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

interface GroupItem {
  id: number;
  name: string;
  code: string;
  description: string;
  department: string;
  members: number;
  functions: number;
  status: "Hoạt động" | "Tạm dừng";
  createdAt: string;
}

const INITIAL_GROUPS: GroupItem[] = [
  {
    id: 1,
    name: "Nhóm Pháp luật Dân sự",
    code: "PLDS",
    description: "Quản lý và biên tập dữ liệu pháp luật dân sự",
    department: "Vụ Pháp luật Dân sự",
    members: 12,
    functions: 8,
    status: "Hoạt động",
    createdAt: "01/01/2024",
  },
  {
    id: 2,
    name: "Nhóm Đăng ký Kinh doanh",
    code: "DKKD",
    description: "Quản lý dữ liệu đăng ký kinh doanh",
    department: "Cục Đăng ký Quốc gia",
    members: 25,
    functions: 12,
    status: "Hoạt động",
    createdAt: "05/01/2024",
  },
  {
    id: 3,
    name: "Nhóm Công chứng",
    code: "CC",
    description: "Quản lý dữ liệu công chứng toàn quốc",
    department: "Cục Công chứng",
    members: 18,
    functions: 10,
    status: "Hoạt động",
    createdAt: "10/01/2024",
  },
  {
    id: 4,
    name: "Nhóm Trợ giúp pháp lý",
    code: "TGPL",
    description: "Quản lý dữ liệu trợ giúp pháp lý",
    department: "Cục Bổ trợ tư pháp",
    members: 8,
    functions: 6,
    status: "Hoạt động",
    createdAt: "15/01/2024",
  },
];

interface ToastProps {
  message: string;
  type: "success" | "error";
}

export default function NhomQuyenNguoiDung() {
  // ─── States ─────────────────────────────────────────────────────────────────
  const [groups, setGroups] = useState<GroupItem[]>(INITIAL_GROUPS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [toast, setToast] = useState<ToastProps | null>(null);

  // Modals state
  const [selectedGroup, setSelectedGroup] = useState<GroupItem | null>(null);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  // Form states (for Add/Edit)
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDept, setFormDept] = useState("");
  const [formStatus, setFormStatus] = useState<"Hoạt động" | "Tạm dừng">("Hoạt động");
  const [editId, setEditId] = useState<number | null>(null);

  // Permission selection state
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    "ha_tang_view": true, "ha_tang_edit": false,
    "duy_tu_view": true, "duy_tu_edit": false,
    "bao_cao_view": true, "bao_cao_export": true,
    "he_thong_config": false,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Filter Logic ───────────────────────────────────────────────────────────
  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      const matchesSearch =
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && g.status === "Hoạt động") ||
        (statusFilter === "inactive" && g.status === "Tạm dừng");

      return matchesSearch && matchesStatus;
    });
  }, [groups, searchTerm, statusFilter]);

  // ─── Group CRUD Handlers ────────────────────────────────────────────────────
  const openAddModal = () => {
    setEditId(null);
    setFormName("");
    setFormCode("");
    setFormDesc("");
    setFormDept("");
    setFormStatus("Hoạt động");
    setIsAddEditOpen(true);
  };

  const openEditModal = (item: GroupItem) => {
    setEditId(item.id);
    setFormName(item.name);
    setFormCode(item.code);
    setFormDesc(item.description);
    setFormDept(item.department);
    setFormStatus(item.status);
    setIsAddEditOpen(true);
  };

  const handleSaveGroup = () => {
    if (!formName.trim() || !formCode.trim()) {
      showToast("Tên nhóm và Mã nhóm không được để trống!", "error");
      return;
    }

    if (editId !== null) {
      // Edit
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editId
            ? {
                ...g,
                name: formName,
                code: formCode,
                description: formDesc,
                department: formDept,
                status: formStatus,
              }
            : g
        )
      );
      showToast("Cập nhật nhóm quyền thành công!", "success");
    } else {
      // Add
      const newGroup: GroupItem = {
        id: Date.now(),
        name: formName,
        code: formCode,
        description: formDesc,
        department: formDept,
        members: 0,
        functions: 4,
        status: formStatus,
        createdAt: new Date().toLocaleDateString("vi-VN"),
      };
      setGroups((prev) => [...prev, newGroup]);
      showToast("Thêm nhóm quyền mới thành công!", "success");
    }
    setIsAddEditOpen(false);
  };

  const handleDeleteGroup = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa nhóm quyền "${name}"?`)) {
      setGroups((prev) => prev.filter((g) => g.id !== id));
      showToast("Đã xóa nhóm quyền thành công!", "success");
    }
  };

  // ─── Stats ──────────────────────────────────────────────────────────────────
  const totalGroups = groups.length;
  const activeGroups = groups.filter((g) => g.status === "Hoạt động").length;
  const totalMembers = groups.reduce((sum, g) => sum + g.members, 0);
  const avgMembers = totalGroups > 0 ? Math.round(totalMembers / totalGroups) : 0;

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

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Groups */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
            <Users className="size-5 text-blue-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">Tổng nhóm</p>
            <p className="text-[20px] font-bold text-[#020817] leading-none">{totalGroups}</p>
          </div>
        </div>

        {/* Active Groups */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
            <UserCheck className="size-5 text-green-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">Đang hoạt động</p>
            <p className="text-[20px] font-bold text-green-600 leading-none">{activeGroups}</p>
          </div>
        </div>

        {/* Total Members */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100">
            <Users className="size-5 text-purple-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">Tổng thành viên</p>
            <p className="text-[20px] font-bold text-purple-600 leading-none">{totalMembers}</p>
          </div>
        </div>

        {/* Avg Members */}
        <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
            <Users className="size-5 text-orange-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#64748b]">TB thành viên/nhóm</p>
            <p className="text-[20px] font-bold text-orange-600 leading-none">{avgMembers}</p>
          </div>
        </div>

      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên nhóm, mã nhóm, đơn vị..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg h-9.5 pl-9 pr-4 text-[13px] outline-none focus:border-blue-500 shadow-3xs"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full sm:w-44">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg h-9.5 pl-3 pr-10 text-[13px] font-medium cursor-pointer outline-none focus:border-blue-500 shadow-3xs appearance-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm dừng</option>
          </select>
          <ChevronDown className="size-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Add Group Button */}
        <Button
          onClick={openAddModal}
          className="w-full sm:w-auto h-9.5 px-4 text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg flex items-center justify-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="size-4" /> Thêm nhóm mới
        </Button>

      </div>

      {/* Grid List of Permission Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGroups.map((item) => (
          <Card key={item.id} className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-350 hover:shadow-md transition-all">
            
            {/* Card Content Top */}
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-bold text-[#020817]">{item.name}</h3>
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold">
                      {item.code}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#64748b] leading-relaxed font-medium">{item.description}</p>
                  <p className="text-[11px] text-slate-400 font-semibold italic">{item.department}</p>
                </div>

                {/* Edit & Delete Action Icons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Chỉnh sửa thông tin nhóm"
                  >
                    <Edit className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(item.id, item.name)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Xóa nhóm quyền"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Stats numbers row inside Card */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-[#64748b]">Thành viên</p>
                  <p className="text-[15px] font-bold text-[#020817] leading-none">{item.members}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-[#64748b]">Chức năng</p>
                  <p className="text-[15px] font-bold text-[#020817] leading-none">{item.functions}</p>
                </div>
                <div className="space-y-1 flex flex-col items-center">
                  <p className="text-[11px] font-semibold text-[#64748b] mb-0.5">Trạng thái</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold leading-none ${
                    item.status === "Hoạt động"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="text-[11px] font-semibold text-slate-400">
                Tạo ngày: {item.createdAt}
              </div>
            </div>

            {/* Bottom Actions Row of Cards */}
            <div className="grid grid-cols-3 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => {
                  setSelectedGroup(item);
                  setIsDetailOpen(true);
                }}
                className="py-2.5 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-slate-600 hover:text-slate-900 border-r border-slate-100 hover:bg-slate-100/50 transition-colors"
              >
                <Eye className="size-3.5 text-slate-500" /> Chi tiết
              </button>
              <button
                onClick={() => {
                  setSelectedGroup(item);
                  setIsMembersOpen(true);
                }}
                className="py-2.5 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-slate-600 hover:text-slate-900 border-r border-slate-100 hover:bg-slate-100/50 transition-colors"
              >
                <UserPlus className="size-3.5 text-slate-500" /> Thành viên
              </button>
              <button
                onClick={() => {
                  setSelectedGroup(item);
                  setIsPermissionsOpen(true);
                }}
                className="py-2.5 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-colors"
              >
                <Lock className="size-3.5 text-slate-500" /> Phân quyền
              </button>
            </div>

          </Card>
        ))}
      </div>

      {/* ─── MODAL 1: Thêm/Sửa Nhóm ────────────────────────────────────────── */}
      {isAddEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-[15px] font-bold text-[#020817]">
                {editId ? "Chỉnh sửa nhóm quyền" : "Thêm nhóm quyền mới"}
              </h3>
              <button
                onClick={() => setIsAddEditOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold">Tên nhóm quyền *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nhập tên nhóm (VD: Nhóm Pháp luật Dân sự)"
                  className="w-full bg-white border border-slate-200 rounded-lg h-9.5 px-3 text-[13px] outline-none focus:border-blue-500 shadow-3xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold">Mã nhóm *</label>
                <input
                  type="text"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="Nhập mã viết tắt (VD: PLDS)"
                  className="w-full bg-white border border-slate-200 rounded-lg h-9.5 px-3 text-[13px] font-mono outline-none focus:border-blue-500 shadow-3xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold">Mô tả mục đích</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Mô tả chức năng hoặc vai trò của nhóm..."
                  rows={2}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-[13px] outline-none focus:border-blue-500 shadow-3xs resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold">Đơn vị quản lý</label>
                <input
                  type="text"
                  value={formDept}
                  onChange={(e) => setFormDept(e.target.value)}
                  placeholder="Nhập tên phòng ban (VD: Cục Công chứng)"
                  className="w-full bg-white border border-slate-200 rounded-lg h-9.5 px-3 text-[13px] outline-none focus:border-blue-500 shadow-3xs"
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <label className="text-[13px] font-semibold">Trạng thái hoạt động</label>
                <button
                  onClick={() => setFormStatus(formStatus === "Hoạt động" ? "Tạm dừng" : "Hoạt động")}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                    formStatus === "Hoạt động" ? "bg-blue-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      formStatus === "Hoạt động" ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-200 bg-slate-50">
              <Button
                variant="outline"
                onClick={() => setIsAddEditOpen(false)}
                className="h-8.5 text-[12px] font-medium"
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={handleSaveGroup}
                className="h-8.5 text-[12px] font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1"
              >
                <Save className="size-3.5" /> Lưu lại
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: Chi tiết Nhóm Quyền ──────────────────────────────────── */}
      {isDetailOpen && selectedGroup && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-[15px] font-bold text-[#020817] flex items-center gap-1.5">
                <FolderOpen className="size-4.5 text-blue-600" /> Chi tiết nhóm quyền
              </h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-[13px]">
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-semibold">Tên nhóm:</span>
                <span className="col-span-2 font-bold text-[#020817]">{selectedGroup.name}</span>
              </div>
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-semibold">Mã nhóm:</span>
                <span className="col-span-2 font-mono font-bold text-blue-700">{selectedGroup.code}</span>
              </div>
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-semibold">Mô tả:</span>
                <span className="col-span-2 text-slate-600 font-medium">{selectedGroup.description || "—"}</span>
              </div>
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-semibold">Đơn vị:</span>
                <span className="col-span-2 font-semibold text-slate-700">{selectedGroup.department}</span>
              </div>
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-semibold">Thành viên:</span>
                <span className="col-span-2 font-bold text-[#020817]">{selectedGroup.members} người</span>
              </div>
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-semibold">Số chức năng:</span>
                <span className="col-span-2 font-bold text-[#020817]">{selectedGroup.functions} chức năng</span>
              </div>
              <div className="grid grid-cols-3 border-b border-slate-100 pb-2">
                <span className="text-slate-400 font-semibold">Ngày khởi tạo:</span>
                <span className="col-span-2 font-semibold text-slate-600">{selectedGroup.createdAt}</span>
              </div>
              <div className="grid grid-cols-3 pb-1">
                <span className="text-slate-400 font-semibold">Trạng thái:</span>
                <span className={`inline-flex w-fit px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedGroup.status === "Hoạt động"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {selectedGroup.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end px-5 py-3 border-t border-slate-200 bg-slate-50">
              <Button
                onClick={() => setIsDetailOpen(false)}
                className="h-8.5 text-[12px] font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Đóng lại
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: Thành viên của Nhóm Quyền ──────────────────────────────── */}
      {isMembersOpen && selectedGroup && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-[15px] font-bold text-[#020817] flex items-center gap-1.5">
                <Users className="size-4.5 text-blue-600" /> Quản lý thành viên ({selectedGroup.name})
              </h3>
              <button
                onClick={() => setIsMembersOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <p className="text-[12px] text-[#64748b]">Tích chọn các cán bộ nghiệp vụ trực thuộc nhóm này:</p>
              
              <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-lg p-2.5 divide-y divide-slate-100 bg-slate-50/20 text-[13px] space-y-2">
                {[
                  { name: "Nguyễn Văn An", email: "an.nv@vec.com.vn" },
                  { name: "Trần Thị Bình", email: "binh.tt@vec.com.vn" },
                  { name: "Phạm Hồng Cường", email: "cuong.ph@vec.com.vn" },
                  { name: "Lê Minh Dương", email: "duong.lm@vec.com.vn" },
                  { name: "Đoàn Quốc Dũng", email: "dung.dq@vec.com.vn" },
                ].map((member, i) => (
                  <label key={i} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-slate-50 rounded px-2 transition-colors">
                    <input
                      type="checkbox"
                      defaultChecked={i < 2}
                      className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{member.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{member.email}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
              <Button
                variant="outline"
                onClick={() => setIsMembersOpen(false)}
                className="h-8.5 text-[12px] font-medium"
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={() => {
                  setIsMembersOpen(false);
                  showToast("Cập nhật danh sách thành viên nhóm thành công!", "success");
                }}
                className="h-8.5 text-[12px] font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 4: Phân Quyền Chi Tiết ───────────────────────────────────── */}
      {isPermissionsOpen && selectedGroup && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-[15px] font-bold text-[#020817] flex items-center gap-1.5">
                <ShieldCheck className="size-4.5 text-blue-600" /> Bảng phân quyền chi tiết ({selectedGroup.name})
              </h3>
              <button
                onClick={() => setIsPermissionsOpen(false)}
                className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
              <p className="text-[12px] text-[#64748b]">Tích chọn các đặc quyền chức năng cấp phép cho nhóm:</p>
              
              <div className="space-y-4 text-[13px]">
                
                {/* Module 1: Hạ tầng đường bộ */}
                <div className="space-y-2">
                  <h4 className="font-bold text-blue-700 border-b border-blue-100 pb-1 uppercase text-[11px] tracking-wider">
                    Phân hệ quản lý kết cấu hạ tầng
                  </h4>
                  <div className="grid grid-cols-2 gap-3 pl-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.ha_tang_view}
                        onChange={(e) => setPermissions(prev => ({ ...prev, ha_tang_view: e.target.checked }))}
                        className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-700">Xem danh sách & chi tiết</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.ha_tang_edit}
                        onChange={(e) => setPermissions(prev => ({ ...prev, ha_tang_edit: e.target.checked }))}
                        className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-700">Thêm mới & Cập nhật</span>
                    </label>
                  </div>
                </div>

                {/* Module 2: Tuần đường & Duy tu */}
                <div className="space-y-2">
                  <h4 className="font-bold text-emerald-700 border-b border-emerald-100 pb-1 uppercase text-[11px] tracking-wider">
                    Phân hệ tuần tra & Duy tu sửa chữa
                  </h4>
                  <div className="grid grid-cols-2 gap-3 pl-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.duy_tu_view}
                        onChange={(e) => setPermissions(prev => ({ ...prev, duy_tu_view: e.target.checked }))}
                        className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-700">Xem báo cáo sự cố</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.duy_tu_edit}
                        onChange={(e) => setPermissions(prev => ({ ...prev, duy_tu_edit: e.target.checked }))}
                        className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-700">Phê duyệt & Nghiệm thu</span>
                    </label>
                  </div>
                </div>

                {/* Module 3: Báo cáo */}
                <div className="space-y-2">
                  <h4 className="font-bold text-orange-700 border-b border-orange-100 pb-1 uppercase text-[11px] tracking-wider">
                    Thống kê & Báo cáo tổng hợp
                  </h4>
                  <div className="grid grid-cols-2 gap-3 pl-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.bao_cao_view}
                        onChange={(e) => setPermissions(prev => ({ ...prev, bao_cao_view: e.target.checked }))}
                        className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-700">Tra cứu số liệu báo cáo</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.bao_cao_export}
                        onChange={(e) => setPermissions(prev => ({ ...prev, bao_cao_export: e.target.checked }))}
                        className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-700">Xuất file Excel / PDF</span>
                    </label>
                  </div>
                </div>

                {/* Module 4: Hệ thống */}
                <div className="space-y-2">
                  <h4 className="font-bold text-rose-700 border-b border-rose-100 pb-1 uppercase text-[11px] tracking-wider">
                    Thiết lập hệ thống & Nhật ký logs
                  </h4>
                  <div className="pl-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.he_thong_config}
                        onChange={(e) => setPermissions(prev => ({ ...prev, he_thong_config: e.target.checked }))}
                        className="size-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="font-medium text-slate-700">Cấu hình chung & Quản lý logs</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
              <Button
                variant="outline"
                onClick={() => setIsPermissionsOpen(false)}
                className="h-8.5 text-[12px] font-medium"
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={() => {
                  setIsPermissionsOpen(false);
                  showToast("Cập nhật phân quyền truy cập thành công!", "success");
                }}
                className="h-8.5 text-[12px] font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1"
              >
                <Save className="size-3.5" /> Lưu lại
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
