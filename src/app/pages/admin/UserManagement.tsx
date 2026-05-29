import React, { useState, useMemo } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  SlidersHorizontal, 
  RefreshCw, 
  Download, 
  Eye, 
  Lock, 
  Unlock, 
  ChevronDown,
  UserPlus
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { AdminEditDialog, AdminDetailDialog } from "./AdminDialogs";

interface UserItem {
  id: number;
  fullName: string;
  username: string;
  email: string;
  unit: string;
  role: "Quản trị viên" | "Biên tập viên" | "Người xem" | "Chọn vai trò";
  groupCount: number;
  status: "active" | "inactive";
  lastLogin: string;
}

export default function UserManagement() {
  // Mock users matching the screenshot
  const [users, setUsers] = useState<UserItem[]>([
    { id: 1, fullName: "Nguyễn Văn An", username: "nguyenvanan", email: "nguyenvanan@moj.gov.vn", unit: "Vụ Pháp luật Dân sự", role: "Quản trị viên", groupCount: 2, status: "active", lastLogin: "10:30:15 21.05.2026" },
    { id: 2, fullName: "Trần Thị Bình", username: "tranthibinh", email: "tranthibinh@moj.gov.vn", unit: "Cục Đăng ký Quốc gia", role: "Biên tập viên", groupCount: 1, status: "active", lastLogin: "08:15:00 20.05.2026" },
    { id: 3, fullName: "Lê Văn Cường", username: "levancuong", email: "levancuong@moj.gov.vn", unit: "Cục Công chứng", role: "Người xem", groupCount: 1, status: "inactive", lastLogin: "14:20:30 19.05.2026" },
    { id: 4, fullName: "Phạm Thị Dung", username: "phamthidung", email: "phamthidung@moj.gov.vn", unit: "Cục Bổ trợ tư pháp", role: "Biên tập viên", groupCount: 1, status: "inactive", lastLogin: "09:05:10 14:05.2026" },
    { id: 5, fullName: "Hoàng Văn Đồng bộ", username: "hoangvandongbo", email: "hoangvandongbo@moj.gov.vn", unit: "Cục Công nghệ thông tin", role: "Chọn vai trò", groupCount: 0, status: "active", lastLogin: "10:30:15 21.05.2026" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState("10");

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: 2847, // From user's screenshot
      active: 2654,
      inactive: 193
    };
  }, []);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchText = searchTerm.toLowerCase();
      return (
        user.fullName.toLowerCase().includes(matchText) ||
        user.username.toLowerCase().includes(matchText) ||
        user.email.toLowerCase().includes(matchText) ||
        user.unit.toLowerCase().includes(matchText)
      );
    });
  }, [users, searchTerm]);

  // Actions
  const handleToggleStatus = (id: number, currentStatus: "active" | "inactive", name: string) => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: nextStatus } : u));
    alert(`Đã ${nextStatus === "active" ? "mở khóa" : "khóa"} tài khoản của người dùng: ${name}`);
  };

  const handleRoleChange = (id: number, newRole: any) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    alert(`Đã cập nhật vai trò mới: ${newRole}`);
  };

  const handleSync = () => {
    alert("Bắt đầu đồng bộ danh sách tài khoản từ hệ thống SSO dùng chung...\nĐồng bộ hoàn tất thành công!");
  };

  const handleExport = () => {
    alert("Hệ thống kết xuất danh sách người dùng thành công dưới định dạng Excel.");
  };

  // Convert UserItem to AdminItem format for dialogs
  const toAdminItem = (user: UserItem | null) => {
    if (!user) return null;
    return {
      id: user.id,
      code: user.username,
      name: user.fullName,
      type: user.role,
      actor: user.unit,
      status: user.status === "active" ? "active" : "inactive" as any,
      updated: user.lastLogin,
      description: user.email
    };
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex items-center justify-between">
        <div>
          <nav className="text-xs text-slate-400 font-semibold mb-1">
            Quản trị & vận hành / Quản trị người dùng / <span className="text-slate-600">Quản lý người dùng</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý người dùng</h1>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-5 rounded-xl shadow-lg shadow-blue-200"
          onClick={() => { setSelectedUser(null); setIsEditOpen(true); }}
        >
          <UserPlus className="size-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-slate-200/60 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Tổng người dùng</p>
              <p className="text-3xl font-extrabold text-slate-800">{stats.total.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Đang hoạt động</p>
              <p className="text-3xl font-extrabold text-emerald-600">{stats.active.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <UserX className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Không hoạt động</p>
              <p className="text-3xl font-extrabold text-orange-600">{stats.inactive.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Actions Row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input 
            placeholder="Tìm kiếm theo tên, email, tên đăng nhập..." 
            className="pl-11 h-10 border-slate-200/80 bg-slate-50/30 focus:bg-white rounded-xl text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-200 h-10 w-10 p-0 rounded-xl" title="Bộ lọc nâng cao">
            <SlidersHorizontal className="size-4 text-slate-600" />
          </Button>
          <Button 
            variant="outline" 
            className="border-slate-200 h-10 font-bold text-slate-700 gap-2 rounded-xl"
            onClick={handleSync}
          >
            <RefreshCw className="size-4 text-slate-500" />
            Đồng bộ
          </Button>
          <Button 
            variant="outline" 
            className="border-slate-200 h-10 font-bold text-slate-700 gap-2 rounded-xl"
            onClick={handleExport}
          >
            <Download className="size-4 text-slate-500" />
            Kết xuất
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 text-center w-12 font-bold">STT</th>
                <th className="px-5 py-3.5 font-bold">Họ tên</th>
                <th className="px-5 py-3.5 font-bold">Tên đăng nhập</th>
                <th className="px-5 py-3.5 font-bold">Email</th>
                <th className="px-5 py-3.5 font-bold">Đơn vị</th>
                <th className="px-5 py-3.5 font-bold w-40">Vai trò</th>
                <th className="px-5 py-3.5 font-bold">Nhóm người dùng</th>
                <th className="px-5 py-3.5 font-bold">Trạng thái</th>
                <th className="px-5 py-3.5 font-bold">Đăng nhập gần nhất</th>
                <th className="px-5 py-3.5 text-center w-24 font-bold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/40">
                  <td className="px-5 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
                  <td className="px-5 py-4 font-bold text-slate-900">{item.fullName}</td>
                  <td className="px-5 py-4 font-mono font-medium text-slate-600">{item.username}</td>
                  <td className="px-5 py-4 text-slate-600 text-xs font-semibold">{item.email}</td>
                  <td className="px-5 py-4 text-slate-700 text-xs font-medium">{item.unit}</td>
                  <td className="px-5 py-4">
                    <Select 
                      value={item.role} 
                      onValueChange={(val) => handleRoleChange(item.id, val)}
                    >
                      <SelectTrigger className={`h-8 text-xs font-bold rounded-full w-[130px] border-none focus:ring-0 focus:ring-offset-0 justify-center gap-1 cursor-pointer transition-colors shadow-sm ${
                        item.role === "Quản trị viên" ? "bg-blue-50 text-blue-600 hover:bg-blue-100/80" :
                        item.role === "Biên tập viên" ? "bg-sky-50 text-sky-600 hover:bg-sky-100/80" :
                        item.role === "Người xem" ? "bg-slate-100 text-slate-500 hover:bg-slate-200/80" :
                        "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Quản trị viên">Quản trị viên</SelectItem>
                        <SelectItem value="Biên tập viên">Biên tập viên</SelectItem>
                        <SelectItem value="Người xem">Người xem</SelectItem>
                        <SelectItem value="Chọn vai trò">Chọn vai trò</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-5 py-4">
                    <button 
                      className="text-xs text-blue-600 hover:underline font-bold inline-flex items-center gap-1.5"
                      onClick={() => alert(`Xem chi tiết các nhóm của người dùng: ${item.fullName}`)}
                    >
                      <Users className="size-3.5 text-blue-500" />
                      {item.groupCount} nhóm
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <Badge className={
                      item.status === "active" 
                        ? "bg-green-50 text-green-700 hover:bg-green-50 border-none px-2.5 py-0.5 rounded-md font-bold text-[11px]" 
                        : "bg-orange-50 text-orange-700 hover:bg-orange-50 border-none px-2.5 py-0.5 rounded-md font-bold text-[11px]"
                    }>
                      {item.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs font-medium">{item.lastLogin}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Xem chi tiết"
                        onClick={() => { setSelectedUser(item); setIsDetailOpen(true); }}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 rounded-lg ${item.status === 'active' ? 'text-orange-500 hover:text-orange-600 hover:bg-orange-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                        title={item.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        onClick={() => handleToggleStatus(item.id, item.status, item.fullName)}
                      >
                        {item.status === "active" ? <Unlock className="size-4" /> : <Lock className="size-4" />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-500 italic">Không tìm thấy người dùng nào phù hợp.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Hiển thị</span>
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger className="h-7 w-[70px] text-xs border-slate-200 bg-white">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>bản ghi/trang</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-slate-500" disabled>Trước</Button>
            <Button className="h-8 w-8 text-xs font-bold bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-slate-500" disabled>Sau</Button>
          </div>
        </div>
      </Card>

      {/* Dialogs */}
      <AdminDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        title="Tài khoản người dùng"
        selectedItem={toAdminItem(selectedUser)}
      />
      <AdminEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Tài khoản người dùng"
        selectedItem={toAdminItem(selectedUser)}
        onSave={(data) => {
          if (selectedUser) {
            // Update mock
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, fullName: data.name, email: data.description, role: data.type } : u));
          } else {
            // Add mock
            const newUser: UserItem = {
              id: Date.now(),
              fullName: data.name,
              username: data.code,
              email: data.email || (data.code + "@moj.gov.vn"),
              unit: data.department || "Vụ chuyên môn",
              role: data.type || "Chọn vai trò",
              groupCount: 1,
              status: "active",
              lastLogin: "—"
            };
            setUsers([...users, newUser]);
          }
        }}
      />
    </div>
  );
}
