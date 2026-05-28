import { useState, useMemo } from "react";
import { Search, Plus, FileDown, Eye, Edit, Trash2, Shield, Settings, Users, Lock, History, AlertTriangle, FileText, Zap, RefreshCw, UserPlus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { AdminEditDialog, AdminDetailDialog } from "./AdminDialogs";

interface AdminItem {
  id: number;
  code: string;
  name: string;
  type: string;
  actor: string;
  status: "active" | "maintenance" | "inactive";
  updated: string;
  description?: string;
}

const STATUS_CONFIG = {
  active: { label: "Hoạt động", className: "bg-green-100 text-green-700 hover:bg-green-100 border-none" },
  maintenance: { label: "Chờ duyệt", className: "bg-orange-100 text-orange-700 hover:bg-orange-100 border-none" },
  inactive: { label: "Đã hủy", className: "bg-slate-100 text-slate-600 hover:bg-slate-100 border-none" },
};

const mockDataMap: Record<string, AdminItem[]> = {
  "Chính sách truy cập": [
    { id: 1, code: "POL-001", name: "Chính sách mật khẩu mạnh", type: "Bảo mật", actor: "System", status: "active", updated: "2024-01-01", description: "Yêu cầu ít nhất 8 ký tự, 1 chữ hoa, 1 số" },
    { id: 2, code: "POL-002", name: "Giới hạn đăng nhập sai", type: "Bảo mật", actor: "System", status: "active", updated: "2024-01-01", description: "Khóa tài khoản sau 5 lần nhập sai" },
  ],
  "Nhóm quyền người dùng": [
    { id: 1, code: "ROLE-001", name: "Quản trị hệ thống", type: "Toàn quyền", actor: "Admin", status: "active", updated: "2024-05-27", description: "Quản trị toàn bộ ứng dụng và dữ liệu hệ thống" },
    { id: 2, code: "ROLE-002", name: "Cán bộ chuyên môn", type: "Nghiệp vụ", actor: "Admin", status: "active", updated: "2024-05-27", description: "Quyền khai thác, cập nhật dữ liệu hạ tầng giao thông" },
    { id: 3, code: "ROLE-003", name: "Người dân / Doanh nghiệp", type: "Truy cập cơ bản", actor: "System", status: "maintenance", updated: "2024-05-20", description: "Nhóm quyền tra cứu và xem báo cáo công khai" },
  ],
  "Cấu hình đồng bộ DMDC": [
    { id: 1, code: "SYNC-001", name: "Đồng bộ Cơ cấu tổ chức", type: "Tự động", actor: "System", status: "active", updated: "2024-05-27", description: "Đồng bộ từ hệ thống LGSP mỗi 24h" },
    { id: 2, code: "SYNC-002", name: "Đồng bộ Danh mục địa bàn hành chính", type: "Thủ công", actor: "Admin", status: "active", updated: "2024-05-26", description: "Đồng bộ khi có biến động" },
    { id: 3, code: "SYNC-003", name: "Đồng bộ Dữ liệu dân cư", type: "Tự động", actor: "System", status: "maintenance", updated: "2024-05-20", description: "Đang tạm dừng bảo trì kết nối" },
  ],
  "Đồng bộ tài khoản SSO": [
    { id: 1, code: "USR-001", name: "Nguyễn Văn A", type: "Chuyên viên", actor: "UBND TP", status: "active", updated: "2024-05-27", description: "Đồng bộ lúc 14:00" },
    { id: 2, code: "USR-002", name: "Trần Thị B", type: "Trưởng phòng", actor: "Sở GTVT", status: "active", updated: "2024-05-27", description: "Đồng bộ lúc 14:00" },
    { id: 3, code: "USR-003", name: "Lê C", type: "Chuyên viên", actor: "UBND TP", status: "maintenance", updated: "2024-05-20", description: "Tài khoản tạm khóa" },
  ],
  "Xác thực người dùng SSO": [
    { id: 1, code: "LOG-SSO-001", name: "Đăng nhập từ Dịch vụ công (Thành công)", type: "Đăng nhập", actor: "System", status: "active", updated: "2024-05-27 15:00", description: "Cấp token: eyJhbGciOiJIUzI1Ni... (Hết hạn 1h)" },
    { id: 2, code: "LOG-SSO-002", name: "Đăng nhập từ Dịch vụ công (Lỗi sai mật khẩu)", type: "Đăng nhập", actor: "System", status: "inactive", updated: "2024-05-27 14:30", description: "Từ chối truy cập (Mã lỗi: 401)" },
    { id: 3, code: "LOG-SSO-003", name: "Đăng nhập từ App Mobile (Thành công)", type: "Đăng nhập", actor: "System", status: "active", updated: "2024-05-27 14:15", description: "Cấp token: eyJhbGciOiJIUzI1Ni... (Hết hạn 24h)" },
  ],
  "API đồng bộ danh mục": [
    { id: 1, code: "API-001", name: "GET /api/v1/dmdc/co-cau-to-chuc", type: "REST API", actor: "Admin", status: "active", updated: "2024-05-27", description: "API lấy danh mục cơ cấu tổ chức từ LGSP" },
    { id: 2, code: "API-002", name: "GET /api/v1/dmdc/dia-ban", type: "REST API", actor: "Admin", status: "active", updated: "2024-05-26", description: "API lấy danh mục địa bàn hành chính từ LGSP" },
  ],
  "Nhật ký trao đổi dữ liệu": [
    { id: 1, code: "LOG-SYNC-001", name: "Đồng bộ Cơ cấu tổ chức (Thành công)", type: "Đồng bộ vào", actor: "System", status: "active", updated: "2024-05-27 14:00", description: "Nhận 150 bản ghi từ LGSP" },
    { id: 2, code: "LOG-SYNC-002", name: "Đồng bộ Dữ liệu dân cư (Lỗi)", type: "Đồng bộ vào", actor: "System", status: "inactive", updated: "2024-05-27 13:30", description: "Timeout khi kết nối API C06" },
    { id: 3, code: "LOG-SYNC-003", name: "Chia sẻ Dữ liệu giao thông", type: "Đồng bộ ra", actor: "Admin", status: "active", updated: "2024-05-27 10:00", description: "Gửi 50 bản ghi lên LGSP" },
  ],
  "Tài khoản người dùng": [
    { id: 1, code: "USR-001", name: "Nguyễn Văn A", type: "Admin", actor: "System", status: "active", updated: "2024-05-27", description: "Quản trị viên hệ thống" },
    { id: 2, code: "USR-002", name: "Trần Thị B", type: "Chuyên viên", actor: "Admin", status: "active", updated: "2024-05-26", description: "Cán bộ nghiệp vụ" },
  ],
  "Cơ cấu tổ chức": [
    { id: 1, code: "ORG-001", name: "Sở GTVT Hà Nội", type: "Cơ quan chủ quản", actor: "Admin", status: "active", updated: "2024-05-27", description: "Đơn vị quản lý cấp 1" },
    { id: 2, code: "ORG-002", name: "Phòng Quản lý KCHT", type: "Phòng ban", actor: "Admin", status: "active", updated: "2024-05-26", description: "Phòng nghiệp vụ chuyên môn" },
  ],
  "Danh mục địa phận": [
    { id: 1, code: "LOC-001", name: "Quận Ba Đình", type: "Cấp Quận/Huyện", actor: "Admin", status: "active", updated: "2024-05-27", description: "Khu vực trung tâm" },
    { id: 2, code: "LOC-002", name: "Quận Hoàn Kiếm", type: "Cấp Quận/Huyện", actor: "Admin", status: "active", updated: "2024-05-26", description: "Khu vực phố cổ" },
  ],
  "Thời gian chờ (timeout)": [
    { id: 1, code: "TO-001", name: "Thời gian chờ đăng nhập", type: "Cấu hình phiên", actor: "System", status: "active", updated: "2024-05-27", description: "15 phút không thao tác sẽ đăng xuất" },
    { id: 2, code: "TO-002", name: "Thời gian chờ gọi API", type: "Cấu hình hệ thống", actor: "System", status: "active", updated: "2024-05-26", description: "Timeout API là 30s" },
  ],
  "Lịch sử tác động": [
    { id: 1, code: "ACT-001", name: "Thêm mới Tuyến đường bộ", type: "Insert", actor: "nva", status: "active", updated: "2024-05-27 10:00", description: "Tạo mới QL1A" },
    { id: 2, code: "ACT-002", name: "Cập nhật Biển báo", type: "Update", actor: "ttb", status: "active", updated: "2024-05-27 09:30", description: "Sửa tọa độ biển báo" },
  ],
  "Lịch sử lỗi phát sinh": [
    { id: 1, code: "ERR-001", name: "Mất kết nối cơ sở dữ liệu", type: "Database", actor: "System", status: "inactive", updated: "2024-05-27 08:00", description: "Lỗi kết nối timeout" },
    { id: 2, code: "ERR-002", name: "Lỗi đồng bộ LGSP", type: "Network", actor: "System", status: "inactive", updated: "2024-05-26 14:00", description: "API trả về 500" },
  ],
  "Chính sách lưu trữ nhật ký": [
    { id: 1, code: "RET-001", name: "Lưu trữ nhật ký tác động", type: "Lưu trữ", actor: "Admin", status: "active", updated: "2024-05-27", description: "Lưu trong 12 tháng" },
    { id: 2, code: "RET-002", name: "Lưu trữ lỗi hệ thống", type: "Lưu trữ", actor: "Admin", status: "active", updated: "2024-05-26", description: "Lưu trong 3 tháng" },
  ],
  "Lưu log hệ thống": [
    { id: 1, code: "LOG-SYS-001", name: "Log hệ thống ngày 27/05", type: "System Log", actor: "System", status: "active", updated: "2024-05-27", description: "Kích thước 50MB" },
    { id: 2, code: "LOG-SYS-002", name: "Log hệ thống ngày 26/05", type: "System Log", actor: "System", status: "active", updated: "2024-05-26", description: "Kích thước 45MB" },
  ],
  "Gửi log tập trung (API)": [
    { id: 1, code: "API-LOG-001", name: "Đẩy log tác động sang SOC", type: "Tự động", actor: "System", status: "active", updated: "2024-05-27", description: "Đẩy dữ liệu mỗi 5 phút" },
    { id: 2, code: "API-LOG-002", name: "Đẩy log lỗi sang SOC", type: "Tự động", actor: "System", status: "maintenance", updated: "2024-05-26", description: "Bảo trì kết nối" },
  ],
};

const getDefaultData = (): AdminItem[] => [
  { id: 1, code: "ADM-001", name: "Dữ liệu cấu hình hệ thống", type: "Hệ thống", actor: "Admin", status: "active", updated: "2024-03-28" },
];

interface AdminOperationListProps {
  title: string;
  category: string;
  icon?: React.ReactNode;
}

export default function AdminOperationList({ title, category, icon }: AdminOperationListProps) {
  const baseData: AdminItem[] = mockDataMap[title] || getDefaultData();

  const [searchCode, setSearchCode] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appliedSearch, setAppliedSearch] = useState({ code: "", status: "all" });

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);

  const filteredData = useMemo(() => {
    return baseData.filter((item) => {
      const matchCode = appliedSearch.code
        ? item.code.toLowerCase().includes(appliedSearch.code.toLowerCase()) ||
          item.name.toLowerCase().includes(appliedSearch.code.toLowerCase())
        : true;
      const matchStatus = appliedSearch.status !== "all" ? item.status === appliedSearch.status : true;
      return matchCode && matchStatus;
    });
  }, [appliedSearch, baseData]);

  const stats = {
    total: baseData.length,
    active: baseData.filter((d) => d.status === "active").length,
    pending: baseData.filter((d) => d.status === "maintenance").length,
    inactive: baseData.filter((d) => d.status === "inactive").length,
  };

  const toDialogItem = (item: AdminItem | null) =>
    item
      ? {
          fullName: item.name,
          idNumber: item.code,
          birthDate: item.actor,
          fatherName: item.description || "—",
          motherName: "—",
          gender: item.type,
          status: STATUS_CONFIG[item.status].label,
          condition: "Đã xác nhận",
          registrationDate: item.updated,
          nationality: "Việt Nam",
        }
      : null;

  const selectedCard = { title };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Settings className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Tổng số bản ghi</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Zap className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Đang hoạt động</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <AlertTriangle className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Chờ xử lý</p>
            <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Trash2 className="size-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Vô hiệu hóa</p>
            <p className="text-2xl font-bold text-slate-600">{stats.inactive}</p>
          </div>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-slate-200 h-9"
                onClick={() => setIsExcelOpen(true)}
              >
                <FileDown className="size-4" />
                Xuất Excel
              </Button>
              {title !== "Nhật ký trao đổi dữ liệu" && title !== "Lịch sử tác động" && title !== "Lịch sử lỗi phát sinh" && title !== "Lưu log hệ thống" && title !== "Đồng bộ tài khoản SSO" && title !== "Xác thực người dùng SSO" && (
                <Button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 h-9"
                  onClick={() => { setSelectedItem(null); setIsEditOpen(true); }}
                >
                  <Plus className="size-4" />
                  Thêm mới
                </Button>
              )}
              {title === "Đồng bộ tài khoản SSO" && (
                <Button
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 h-9 text-white"
                  onClick={() => { alert("Chức năng Quản lý đồng bộ tài khoản đang chạy...\nĐồng bộ thành công 50 tài khoản mới từ SSO!"); }}
                >
                  <RefreshCw className="size-4" />
                  Quản lý đồng bộ tài khoản
                </Button>
              )}
              {title === "Xác thực người dùng SSO" && (
                <Button
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 h-9 text-white"
                  onClick={() => { alert("Hệ thống tích hợp gửi thông tin đăng nhập đến hệ thống...\n\nHệ thống kiểm tra thông tin đăng nhập thành công!\n\nTrả về kết quả: Đăng nhập thành công kèm theo Token (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"); }}
                >
                  <Shield className="size-4" />
                  Test Đăng Nhập SSO
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div className="relative col-span-1 sm:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Tìm kiếm mã hoặc tên..."
                className="pl-10 h-10 border-slate-200 bg-white"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="h-10 border-slate-200 bg-white">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="maintenance">Chờ duyệt</SelectItem>
                <SelectItem value="inactive">Đã hủy/Vô hiệu</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 col-span-1"
              onClick={() => setAppliedSearch({ code: searchCode, status: filterStatus })}
            >
              <Search className="mr-2 size-4" />
              Tìm kiếm
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-12 text-center">STT</TableHead>
                <TableHead>Mã/ID</TableHead>
                <TableHead>Tên/Nội dung</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Người thực hiện</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-slate-500 font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <button
                      className="font-bold text-blue-600 hover:underline text-left text-xs"
                      onClick={() => { setSelectedItem(item); setIsDetailOpen(true); }}
                    >
                      {item.code}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-slate-900 line-clamp-1">{item.name}</div>
                    {item.description && <div className="text-xs text-slate-400 line-clamp-1 italic">{item.description}</div>}
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm whitespace-nowrap">{item.type}</TableCell>
                  <TableCell className="text-slate-700 text-sm">{item.actor}</TableCell>
                  <TableCell>
                    <Badge className={`${STATUS_CONFIG[item.status].className} px-2.5 py-0.5 rounded-full text-[11px] font-medium`}>
                      {STATUS_CONFIG[item.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm whitespace-nowrap">{item.updated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-blue-600"
                        title="Xem chi tiết"
                        onClick={() => { setSelectedItem(item); setIsDetailOpen(true); }}
                      >
                        <Eye className="size-4" />
                      </Button>
                      {title === "Nhóm quyền người dùng" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-indigo-600"
                          title="Thêm tài khoản vào nhóm"
                          onClick={() => { setSelectedItem(item); setIsEditOpen(true); }}
                        >
                          <UserPlus className="size-4" />
                        </Button>
                      )}
                      {title === "API đồng bộ danh mục" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-green-600"
                          title="Gửi yêu cầu đồng bộ (Test API)"
                          onClick={() => {
                            alert("Hệ thống tích hợp gửi yêu cầu đến Hệ thống LGSP...\nLGSP gửi yêu cầu đồng bộ danh mục dùng chung theo thông tin được khai báo.\nHệ thống kiểm tra các thông tin yêu cầu...\n\nKết quả: Gửi lại dữ liệu danh mục dùng chung thành công!");
                          }}
                        >
                          <Zap className="size-4" />
                        </Button>
                      )}
                      {title !== "Nhật ký trao đổi dữ liệu" && title !== "Lịch sử tác động" && title !== "Lịch sử lỗi phát sinh" && title !== "Lưu log hệ thống" && title !== "Xác thực người dùng SSO" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-blue-600"
                            title="Chỉnh sửa"
                            onClick={() => { setSelectedItem(item); setIsEditOpen(true); }}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-red-600"
                            title="Xóa/Vô hiệu hóa"
                            onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
            <p className="text-sm text-slate-500">
              Hiển thị 1-{filteredData.length} trong số {filteredData.length} bản ghi
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AdminDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        title={title}
        selectedItem={selectedItem}
      />
      <AdminEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={title}
        selectedItem={selectedItem}
        onSave={(data) => { console.log(data); }}
      />
      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        selectedCard={selectedCard}
        selectedItem={toDialogItem(selectedItem)}
        onConfirmDelete={() => alert(`Hệ thống đã kiểm tra điều kiện dữ liệu.\nXóa thành công bản ghi: ${selectedItem?.code}!`)}
      />

      {/* Excel Preview Placeholder */}
      {isExcelOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <Card className="w-[80vw] max-w-[1200px] bg-white p-8">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Xem trước Excel: {title}</h3>
                <Button variant="ghost" onClick={() => setIsExcelOpen(false)}><Plus className="size-5 rotate-45" /></Button>
             </div>
             <div className="border border-slate-200 p-8 text-center">
                <p className="font-bold border-b pb-4 mb-4 uppercase">BC DANH SÁCH {title.toUpperCase()}</p>
                <table className="w-full text-sm">
                   <thead><tr className="border-b bg-slate-50"><th>STT</th><th>Mã</th><th>Tên</th><th>Loại</th><th>Cập nhật</th></tr></thead>
                   <tbody>
                      {baseData.map((d, i) => (
                        <tr key={d.id} className="border-b"><td className="p-2">{i+1}</td><td className="p-2">{d.code}</td><td className="p-2">{d.name}</td><td className="p-2">{d.type}</td><td className="p-2">{d.updated}</td></tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div className="mt-6 flex justify-end gap-2">
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => {
                  alert("Hệ thống xuất kết quả báo cáo file Excel xuống thiết bị thành công!");
                  setIsExcelOpen(false);
                }}>Tải xuống Excel</Button>
             </div>
          </Card>
        </div>
      )}
    </div>
  );
}
