import { useState, useMemo, useRef } from "react";
import { Search, Plus, Bell, CheckCircle2, XCircle, AlertCircle, Info, Eye, Check, Trash2, Mail, AlertTriangle, Clock, Send, Paperclip, Image as ImageIcon, Users, FileText, Filter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../components/ui/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  date: string;
  source: string;
  priority: "High" | "Medium" | "Low";
  status: "Read" | "Unread";
  type: "success" | "error" | "warning" | "info";
  readByCount: number;
}

const PRIORITY_CONFIG = {
  High: { label: "Cao", className: "bg-red-100 text-red-600 border-none" },
  Medium: { label: "Trung bình", className: "bg-orange-100 text-orange-600 border-none" },
  Low: { label: "Thấp", className: "bg-slate-100 text-slate-500 border-none" },
};

const TYPE_CONFIG = {
  success: { icon: <CheckCircle2 className="size-5 text-green-600" />, className: "border-l-green-500" },
  error: { icon: <XCircle className="size-5 text-red-600" />, className: "border-l-red-500" },
  warning: { icon: <AlertTriangle className="size-5 text-orange-500" />, className: "border-l-orange-500" },
  info: { icon: <Info className="size-5 text-blue-500" />, className: "border-l-blue-500" },
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "Thu thập dữ liệu thành công",
    description: "Hệ thống đã tiếp nhận thành công 2,345 bản ghi từ CSDL Hộ tịch điện tử. Mã giao dịch: TXN-2025120701234.",
    time: "10:30",
    date: "07/12/2024",
    source: "Thu thập dữ liệu",
    priority: "Medium",
    status: "Unread",
    type: "success",
    readByCount: 45,
  },
  {
    id: 2,
    title: "Phát hiện lỗi dữ liệu",
    description: "Phát hiện 34 lỗi trong dữ liệu từ hệ thống Thi hành án dân sự. Vui lòng kiểm tra và xử lý.",
    time: "10:25",
    date: "07/12/2024",
    source: "Kiểm tra chất lượng",
    priority: "High",
    status: "Unread",
    type: "error",
    readByCount: 12,
  },
  {
    id: 3,
    title: "Yêu cầu phê duyệt danh mục mới",
    description: "Có yêu cầu phê duyệt danh mục \"CSDL Công chứng viên\" từ Nguyễn Văn A - Vụ Bổ trợ tư pháp",
    time: "09:15",
    date: "07/12/2024",
    source: "Quản lý danh mục",
    priority: "High",
    status: "Read",
    type: "warning",
    readByCount: 3,
  },
  {
    id: 4,
    title: "Hoàn tất đồng bộ dữ liệu",
    description: "Quy trình đồng bộ dữ liệu với hệ thống DLDC-A đã hoàn tất. 1,567 bản ghi đã được cập nhật.",
    time: "08:45",
    date: "07/12/2024",
    source: "Đồng bộ dữ liệu",
    priority: "Low",
    status: "Read",
    type: "success",
    readByCount: 89,
  },
  {
    id: 5,
    title: "Cập nhật hệ thống",
    description: "Hệ thống sẽ được bảo trì vào 22:00 - 23:00 ngày 10/12/2024. Vui lòng lưu công việc trước thời gian này.",
    time: "07:00",
    date: "07/12/2024",
    source: "Hệ thống",
    priority: "Medium",
    status: "Read",
    type: "info",
    readByCount: 156,
  },
];

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  
  const [composeOpen, setComposeOpen] = useState(false);
  const [readByOpen, setReadByOpen] = useState(false);
  const [selectedNotify, setSelectedNotify] = useState<Notification | null>(null);

  const [composeForm, setComposeForm] = useState({ 
    title: "", 
    content: "", 
    priority: "Medium" as "High" | "Medium" | "Low",
    recipientType: "All" as "All" | "Unit" | "Individual",
    selectedRecipients: [] as string[]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MOCK_UNITS = ["Phòng Hạ tầng", "Vụ Bổ trợ tư pháp", "Đội CSGT số 1", "Đội CSGT số 2", "Trung tâm Điều khiển"];
  const MOCK_PEOPLE = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Văn D", "Vũ Thị E"];

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            n.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" ? true : filter === "unread" ? n.status === "Unread" : n.status === "Read";
      return matchesSearch && matchesFilter;
    });
  }, [notifications, searchQuery, filter]);

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => n.status === "Unread").length,
    highPriority: notifications.filter(n => n.priority === "High").length,
    today: notifications.length, // Mocked for simplicity
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: "Read" } : n));
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleCompose = () => {
    const newNotify: Notification = {
      id: Date.now(),
      title: composeForm.title,
      description: composeForm.content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('vi-VN'),
      source: "Hệ thống",
      priority: composeForm.priority,
      status: "Unread",
      type: "info",
      readByCount: 0
    };
    setNotifications([newNotify, ...notifications]);
    setComposeOpen(false);
    setComposeForm({ 
      title: "", 
      content: "", 
      priority: "Medium",
      recipientType: "All",
      selectedRecipients: []
    });
  };

  const toggleRecipient = (name: string) => {
    setComposeForm(prev => ({
      ...prev,
      selectedRecipients: prev.selectedRecipients.includes(name)
        ? prev.selectedRecipients.filter(r => r !== name)
        : [...prev.selectedRecipients, name]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-slate-200 overflow-hidden bg-white/50 backdrop-blur-md">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">Tổng thông báo</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
               <Bell className="size-7" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200 overflow-hidden bg-white/50 backdrop-blur-md">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">Chưa đọc</p>
              <p className="text-3xl font-bold text-blue-600">{stats.unread}</p>
            </div>
            <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400">
               <Mail className="size-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 overflow-hidden bg-white/50 backdrop-blur-md text-red-600">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">Ưu tiên cao</p>
              <p className="text-3xl font-bold text-red-600">{stats.highPriority}</p>
            </div>
            <div className="size-12 rounded-xl bg-red-50 flex items-center justify-center text-red-400">
               <AlertCircle className="size-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 overflow-hidden bg-white/50 backdrop-blur-md">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">Hôm nay</p>
              <p className="text-3xl font-bold text-green-600">{stats.today}</p>
            </div>
            <div className="size-12 rounded-xl bg-green-50 flex items-center justify-center text-green-400">
               <Clock className="size-7" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Card className="border-slate-200 shadow-xl overflow-hidden bg-white">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              placeholder="Tìm kiếm thông báo..." 
              className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus:bg-white transition-all rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
             <Button 
                variant={filter === "all" ? "default" : "ghost"} 
                className={cn("h-9 px-6 rounded-lg font-semibold", filter === "all" ? "bg-blue-600 shadow-md" : "text-slate-600")}
                onClick={() => setFilter("all")}
             >
               Tất cả
             </Button>
             <Button 
                variant={filter === "unread" ? "default" : "ghost"} 
                className={cn("h-9 px-6 rounded-lg font-semibold", filter === "unread" ? "bg-blue-600 shadow-md" : "text-slate-600")}
                onClick={() => setFilter("unread")}
             >
               Chưa đọc ({stats.unread})
             </Button>
             <Button 
                variant={filter === "read" ? "default" : "ghost"} 
                className={cn("h-9 px-6 rounded-lg font-semibold", filter === "read" ? "bg-get text-blue-600 shadow-sm bg-white" : "text-slate-600")}
                onClick={() => setFilter("read")}
             >
               Đã đọc
             </Button>
          </div>

          <Button 
            className="h-11 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 rounded-xl font-bold flex gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => setComposeOpen(true)}
          >
            <Plus className="size-5" />
            Soạn thông báo
          </Button>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <div 
                key={n.id} 
                className={cn(
                  "p-6 transition-all hover:bg-slate-50 border-l-[4px]",
                  TYPE_CONFIG[n.type].className,
                  n.status === "Unread" && "bg-blue-50/20 shadow-[inset_-10px_0_20px_-15px_rgba(59,130,246,0.1)]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {TYPE_CONFIG[n.type].icon}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-lg leading-tight">{n.title}</h4>
                        {n.status === "Unread" && <span className="size-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={cn("px-3 py-0.5 font-bold uppercase text-[10px] tracking-wider", PRIORITY_CONFIG[n.priority].className)}>
                          {PRIORITY_CONFIG[n.priority].label}
                        </Badge>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-[15px] leading-relaxed max-w-4xl">
                      {n.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm pt-1">
                      <div className="flex items-center gap-5 text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-4" />
                          {n.time} - {n.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          Nguồn: <span className="text-slate-500 font-semibold">{n.source}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="size-9 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Những ai đã đọc"
                          onClick={() => { setSelectedNotify(n); setReadByOpen(true); }}
                        >
                          <Eye className="size-5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("size-9 rounded-full transition-colors", n.status === "Unread" ? "text-slate-400 hover:text-green-600 hover:bg-green-50" : "text-green-500 cursor-default")}
                          title={n.status === "Unread" ? "Đánh dấu đã đọc" : "Đã đọc"}
                          disabled={n.status === "Read"}
                          onClick={() => handleMarkAsRead(n.id)}
                        >
                          <Check className="size-5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="size-9 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Xóa thông báo"
                          onClick={() => handleDelete(n.id)}
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center space-y-4">
              <div className="size-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="size-10" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Không tìm thấy thông báo</p>
                <p className="text-slate-500">Thử thay đổi từ khóa hoặc bộ lọc của bạn</p>
              </div>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setFilter("all"); }}>Xóa tất cả bộ lọc</Button>
            </div>
          )}
        </div>
      </Card>

      {/* Compose notification dialog */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
            <DialogHeader className="mb-0">
              <DialogTitle className="text-2xl font-black flex items-center gap-3">
                <Plus className="size-7 p-1.5 bg-white/20 rounded-lg" />
                Soạn thông báo mới
              </DialogTitle>
            </DialogHeader>
            <p className="text-blue-100/80 mt-2 font-medium">Lựa chọn đối tượng và nội dung cần thông báo.</p>
            <div className="absolute right-0 bottom-0 opacity-10 p-4">
                <Bell className="size-40" />
            </div>
          </div>
          
          <div className="p-8 space-y-6 bg-white overflow-y-auto max-h-[70vh]">
            {/* Recipient Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">Người nhận</label>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                {[
                  { id: "All", label: "Tất cả" },
                  { id: "Unit", label: "Theo đơn vị" },
                  { id: "Individual", label: "Cá nhân" },
                ].map((t) => (
                  <button
                    key={t.id}
                    className={cn(
                      "flex-1 h-10 rounded-xl text-sm font-bold transition-all transform active:scale-95",
                      composeForm.recipientType === t.id
                        ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    )}
                    onClick={() => setComposeForm({ ...composeForm, recipientType: t.id as any, selectedRecipients: [] })}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {composeForm.recipientType !== "All" && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
                    {composeForm.recipientType === "Unit" ? "Chọn đơn vị" : "Chọn cá nhân"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(composeForm.recipientType === "Unit" ? MOCK_UNITS : MOCK_PEOPLE).map((item) => (
                      <button
                        key={item}
                        onClick={() => toggleRecipient(item)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                          composeForm.selectedRecipients.includes(item)
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                        )}
                      >
                        {item}
                        {composeForm.selectedRecipients.includes(item) && <Check className="inline-block ml-1 size-3" />}
                      </button>
                    ))}
                    {composeForm.selectedRecipients.length === 0 && (
                      <p className="text-sm text-slate-400 italic py-1">Vui lòng chọn ít nhất một {composeForm.recipientType === "Unit" ? "đơn vị" : "người"}...</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Tiêu đề thông báo</label>
              <Input 
                placeholder="Nhập tiêu đề ngắn gọn..." 
                className="h-12 border-slate-200 focus:ring-2 focus:ring-blue-500/20 rounded-xl font-medium" 
                value={composeForm.title}
                onChange={(e) => setComposeForm({...composeForm, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Nội dung chi tiết</label>
              <Textarea 
                placeholder="Viết nội dung thông báo tại đây..." 
                className="min-h-[150px] border-slate-200 focus:ring-2 focus:ring-blue-500/20 rounded-xl font-medium leading-relaxed"
                value={composeForm.content}
                onChange={(e) => setComposeForm({...composeForm, content: e.target.value})}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 text-center">Mức độ ưu tiên</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                   {["Low", "Medium", "High"].map((p) => (
                      <button
                        key={p}
                        className={cn(
                          "flex-1 h-9 rounded-lg text-xs font-bold transition-all",
                          composeForm.priority === p 
                            ? (p === "High" ? "bg-red-500 text-white shadow-md" : p === "Medium" ? "bg-orange-500 text-white shadow-md" : "bg-slate-400 text-white shadow-md")
                            : "text-slate-500 hover:text-slate-700"
                        )}
                        onClick={() => setComposeForm({...composeForm, priority: p as any})}
                      >
                        {p === "High" ? "Cao" : p === "Medium" ? "T.Bình" : "Thấp"}
                      </button>
                   ))}
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Tệp đính kèm</label>
                <div className="flex items-center gap-2">
                   <Button 
                      variant="outline" 
                      className="h-11 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl flex-1 border-dashed font-bold flex gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="size-4" />
                      Tài liệu
                   </Button>
                   <Button 
                      variant="outline" 
                      className="h-11 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl flex-1 border-dashed font-bold flex gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="size-4" />
                      Hình ảnh
                   </Button>
                   <input type="file" className="hidden" ref={fileInputRef} title="Đính kèm tệp" aria-label="Đính kèm tệp" />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-8 bg-slate-50/50 flex sm:justify-between items-center sm:gap-4 border-t border-slate-100">
            <Button variant="ghost" className="font-bold text-slate-500 hover:text-red-500" onClick={() => setComposeOpen(false)}>Hủy bỏ</Button>
            <Button className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-xl shadow-blue-200/50 flex gap-2 text-base" onClick={handleCompose}>
               Gửi thông báo
               <Send className="size-5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Read by list dialog */}
      <Dialog open={readByOpen} onOpenChange={setReadByOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
           <div className="bg-slate-900 p-6 text-white text-center">
              <h3 className="text-xl font-black uppercase text-blue-400">Danh sách người dùng đã đọc</h3>
              <p className="text-slate-400 font-medium text-sm mt-1">{selectedNotify?.title}</p>
           </div>
           <div className="p-6 max-h-[400px] overflow-y-auto">
              <div className="space-y-1">
                 {selectedNotify && Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 group transition-all">
                       <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {["NV", "TA", "LC", "MT"][i%4]}
                          </div>
                          <div>
                             <p className="font-bold text-slate-800 text-sm">Nguyen Van {i + 1}</p>
                             <p className="text-xs text-slate-400 font-medium">Phòng quản lý hạ tầng</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Vào lúc</p>
                          <p className="text-xs text-slate-600 font-black">10:3{i} - 07/12</p>
                       </div>
                    </div>
                 ))}
                 {selectedNotify?.readByCount === 0 && (
                    <div className="text-center py-10 space-y-3">
                       <Users className="size-12 mx-auto text-slate-200" />
                       <p className="text-slate-400 font-bold">Chưa có ai đọc thông báo này</p>
                    </div>
                 )}
              </div>
           </div>
           <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Toàn bộ danh sách: {selectedNotify?.readByCount} người đã đọc</p>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
