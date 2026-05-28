import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  FileText, 
  Settings, 
  Gavel, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSearch,
  Download,
  ExternalLink,
  MessageSquare,
  Send,
  Paperclip,
  Plus,
  Edit2,
  Trash2
} from "lucide-react";
import { SimpleMapView } from "../map/SimpleMapView";

interface ProjectDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
}

export function ProjectDetailDialog({
  open,
  onOpenChange,
  project,
}: ProjectDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("status");

  // State quản lý checklist tiến độ
  const [progressTasks, setProgressTasks] = useState([
    { id: 1, task: "Hoàn thành đổ bê tông trụ T4",  startDate: "10/03/2026", endDate: "20/03/2026", contractor: "Tổ thi công số 1", supervisor: "Anh Tuấn (TVGS)", status: "Đã hoàn thành", progress: 100 },
    { id: 2, task: "Lắp đặt dầm thép nhịp chính", startDate: "01/03/2026", endDate: "15/03/2026", contractor: "Liên danh xây dựng 18", supervisor: "Anh Tuấn (TVGS)", status: "Đang thi công", progress: 85 },
    { id: 3, task: "Giải phóng mặt bằng đoạn cuối tuyến", startDate: "15/01/2026", endDate: "30/03/2026", contractor: "BQLDA Quận Tây Hồ", supervisor: "Sở GTVT Hà Nội", status: "Vướng mắc", progress: 40 },
  ]);

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [taskForm, setTaskForm] = useState({
    task: "", startDate: "", endDate: "", contractor: "", supervisor: "", status: "Đang thi công", progress: 0
  });

  const handleSaveTask = () => {
    if (editingTask) {
      setProgressTasks(progressTasks.map(t => t.id === editingTask.id ? { ...t, ...taskForm } : t));
    } else {
      setProgressTasks([...progressTasks, { id: Date.now(), ...taskForm }]);
    }
    setIsTaskDialogOpen(false);
  };

  const handleDeleteTask = (id: number) => {
    if (confirm("Chắc chắn muốn xóa hạng mục này?")) {
      setProgressTasks(progressTasks.filter(t => t.id !== id));
    }
  };
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] xl:max-w-7xl w-[66.6vw] h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b bg-slate-50/50">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl font-bold text-slate-900">{project.name}</DialogTitle>
                <Badge className={project.status === "Đang thi công" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="size-3.5" />
                {project.location} | Mã dự án: {project.id}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiến độ tổng thể</p>
              <p className="text-3xl font-black text-blue-600">{project.progress || 0}%</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="px-6 border-b h-14 bg-white justify-start gap-2 rounded-none w-full overflow-x-auto">
            <TabsTrigger value="status" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
              <TrendingUp className="size-4" />
              Thông tin hiện trạng
            </TabsTrigger>
            <TabsTrigger value="technical" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
              <Settings className="size-4" />
              Hồ sơ kỹ thuật
            </TabsTrigger>
            <TabsTrigger value="legal" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
              <Gavel className="size-4" />
              Hồ sơ pháp lý
            </TabsTrigger>
            <TabsTrigger value="geometry" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
              <MapPin className="size-4" />
              Vị trí trên bản đồ
            </TabsTrigger>
            <TabsTrigger value="discussion" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
              <MessageSquare className="size-4" />
              Trao đổi & Thảo luận
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <div className="p-6">
              <TabsContent value="status" className="m-0 space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                      <DollarSign className="size-3.5" />
                      Tài chính
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Tổng mức đầu tư</p>
                      <p className="text-lg font-bold text-slate-900">{project.budget || "1,250 tỷ VNĐ"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Đã giải ngân</p>
                      <p className="text-sm font-semibold text-green-600">540 tỷ VNĐ (43%)</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                      <Calendar className="size-3.5" />
                      Thời gian
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Ngày khởi công</p>
                      <p className="text-sm font-semibold text-slate-900">{project.startDate || "15/01/2024"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Dự kiến hoàn thành</p>
                      <p className="text-sm font-semibold text-slate-900">{project.expectedEndDate || "30/06/2026"}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                      <BarChart3 className="size-3.5" />
                      Nhà thầu
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Đơn vị thi công</p>
                      <p className="text-sm font-semibold text-slate-900">{project.contractor || "Tổng công ty Xây dựng"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Tư vấn giám sát</p>
                      <p className="text-sm font-semibold text-slate-900">Công ty CP Tư vấn Thăng Long</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Clock className="size-4 text-blue-600" />
                      Chi tiết tiến độ & Hạng mục công việc
                    </h4>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                      onClick={() => {
                        setEditingTask(null);
                        setTaskForm({ task: "", startDate: "", endDate: "", contractor: "", supervisor: "", status: "Đang thi công", progress: 0 });
                        setIsTaskDialogOpen(true);
                      }}
                    >
                      <Plus className="size-4 mr-2" /> Thêm tiến độ
                    </Button>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold text-slate-600">Hạng mục / Công việc</th>
                          <th className="py-3 px-4 text-left font-semibold text-slate-600">Thời gian (Kế hoạch)</th>
                          <th className="py-3 px-4 text-left font-semibold text-slate-600">Nhà thầu / Đơn vị</th>
                          <th className="py-3 px-4 text-left font-semibold text-slate-600">Giám sát</th>
                          <th className="py-3 px-4 text-left font-semibold text-slate-600">Tình trạng</th>
                          <th className="py-3 px-4 text-right font-semibold text-slate-600">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progressTasks.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-500">Chưa có dữ liệu tiến độ</td>
                          </tr>
                        )}
                        {progressTasks.map(task => (
                          <tr key={task.id} className="border-b border-slate-100/60 hover:bg-slate-50 transition-colors last:border-0">
                            <td className="py-3 px-4 font-medium text-slate-700 max-w-[200px] truncate" title={task.task}>{task.task}</td>
                            <td className="py-3 px-4 text-slate-600 text-[11px]">
                              {task.startDate} - {task.endDate}
                            </td>
                            <td className="py-3 px-4 text-slate-600">{task.contractor}</td>
                            <td className="py-3 px-4 text-slate-600">{task.supervisor}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Badge className={`text-[10px] whitespace-nowrap px-1.5 py-0 ${
                                  task.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-700' : 
                                  task.status === 'Đang thi công' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {task.status}
                                </Badge>
                                <span className="font-bold text-xs text-slate-500">{task.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-blue-600 hover:bg-blue-50"
                                  onClick={() => { setEditingTask(task); setTaskForm(task); setIsTaskDialogOpen(true); }}
                                >
                                  <Edit2 className="size-3.5" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-red-600 hover:bg-red-50"
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="m-0 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900">Danh sách hồ sơ kỹ thuật</h4>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">8 tài liệu</Badge>
                </div>
                <div className="grid gap-3">
                  {[
                    { name: "Thiết kế kỹ thuật - Phần Cầu chính", size: "24.5 MB", type: "PDF", date: "12/12/2023" },
                    { name: "Bản vẽ hoàn công Giai đoạn 1", size: "15.2 MB", type: "DWG", date: "05/02/2024" },
                    { name: "Báo cáo khảo sát địa chất bổ sung", size: "8.1 MB", type: "PDF", date: "20/01/2024" },
                    { name: "Quy trình thi công đặc thù nhịp dây văng", size: "4.3 MB", type: "PDF", date: "10/11/2023" },
                  ].map((doc, i) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50">
                          <FileSearch className="size-5 text-slate-500 group-hover:text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{doc.name}</p>
                          <p className="text-[10px] text-slate-400">Định dạng: {doc.type} | Dung lượng: {doc.size} | Ngày cập nhật: {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 h-8 w-8">
                          <Download className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 h-8 w-8">
                          <ExternalLink className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="legal" className="m-0 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900">Hồ sơ pháp lý & Quyết định đầu tư</h4>
                  <Badge variant="outline" className="text-amber-600 border-amber-200">5 tài liệu</Badge>
                </div>
                <div className="grid gap-3">
                  {[
                    { name: "Quyết định phê duyệt dự án đầu tư số 1234/QĐ-UBND", status: "Hiệu lực", date: "15/10/2023" },
                    { name: "Giấy phép xây dựng số 56/GPXD", status: "Hiệu lực", date: "20/12/2023" },
                    { name: "Văn bản chấp thuận phương án GPMB", status: "Hiệu lực", date: "05/11/2023" },
                    { name: "Hợp đồng kinh tế số 89/HĐKT-BQLDA", status: "Đã ký", date: "10/01/2024" },
                  ].map((doc, i) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-amber-200 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-amber-50">
                          <FileText className="size-5 text-slate-500 group-hover:text-amber-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400">Ngày ban hành: {doc.date}</span>
                            <Badge className="h-4 text-[8px] bg-green-50 text-green-600 border-green-100">{doc.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-amber-600 h-8 w-8">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="geometry" className="m-0 p-0 h-[450px] border rounded-xl overflow-hidden relative">
                <SimpleMapView 
                  height="100%"
                  markers={[]}
                  routes={[{
                    id: project.id,
                    name: project.name,
                    coordinates: [[21.05, 105.85], [21.07, 105.88], [21.08, 105.90]], // Mock coordinates
                    color: "#2563eb"
                  }]}
                  center={[21.06, 105.87]}
                  zoom={13}
                  isActive={activeTab === 'geometry'}
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg border shadow-lg z-[1000]">
                  <p className="text-xs font-bold text-slate-700 mb-1">Tọa độ trung tâm</p>
                  <code className="text-[10px] text-blue-600">21.0600°N, 105.8700°E</code>
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="m-0 flex flex-col h-[450px] border rounded-xl overflow-hidden bg-slate-50 mt-4">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0 text-xs">HT</div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-sm text-slate-900">Hoàng Tiến (BQLDA)</span>
                        <span className="text-[10px] text-slate-400">10:45 AM</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl rounded-tl-none border shadow-sm text-sm text-slate-700 mt-1">
                        Bản vẽ thiết kế thi công giai đoạn 2 đã được phê duyệt và upload tại mục hồ sơ kỹ thuật. Đề nghị các bên theo dõi nhé!
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0 text-xs">TV</div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-baseline gap-2 flex-row-reverse">
                        <span className="font-semibold text-sm text-slate-900">Tuấn Việt (Nhà thầu)</span>
                        <span className="text-[10px] text-slate-400">11:15 AM</span>
                      </div>
                      <div className="bg-blue-600 text-white p-3 rounded-xl rounded-tr-none shadow-sm text-sm mt-1 max-w-[85%]">
                        Xác nhận đã nhận thông tin và tải đủ tài liệu. Sẽ bắt đầu triển khai móc nối trên thực địa vào sáng mai.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0 text-xs">GS</div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-sm text-slate-900">Anh Tuấn (Tư vấn GS)</span>
                        <span className="text-[10px] text-slate-400">13:30 PM</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl rounded-tl-none border shadow-sm text-sm text-slate-700 mt-1">
                        Anh em chú ý vấn đề phân luồng giao thông nhé, tôi vừa đi kiềm tra thấy biển báo tạm chưa lắp đủ, cần bổ sung ngay chiều nay.
                        <div className="mt-2 flex gap-2">
                            <div className="flex items-center gap-1.5 p-1.5 border rounded bg-slate-50 text-xs text-blue-600 cursor-pointer hover:bg-slate-100">
                                <FileText className="size-3" /> BB_KiemTra_1503.pdf
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white border-t flex items-center gap-3">
                  <button title="Đính kèm file" aria-label="Đính kèm file" className="shrink-0 p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <Paperclip className="size-4" />
                  </button>
                  <input type="text" placeholder="Nhập trao đổi, chỉ đạo hoặc cập nhật tiến độ dự án..." className="flex-1 border-0 bg-slate-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors">
                    <Send className="size-4" /> Gửi
                  </button>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        {/* Cửa sổ thêm/sửa tiến độ dự án */}
        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogContent className="max-w-2xl bg-white border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-lg">{editingTask ? "Cập nhật tiến độ" : "Thêm mới tiến độ hạng mục"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Hạng mục công việc / Checklist <span className="text-red-500">*</span></Label>
                <Input value={taskForm.task} onChange={e => setTaskForm({...taskForm, task: e.target.value})} placeholder="Vd: Thi công khoan nhồi móng..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Từ ngày (hoặc Khởi công)</Label>
                  <Input type="date" value={taskForm.startDate} onChange={e => setTaskForm({...taskForm, startDate: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Đến ngày</Label>
                  <Input type="date" value={taskForm.endDate} onChange={e => setTaskForm({...taskForm, endDate: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nhà thầu / Đơn vị thi công</Label>
                  <Input value={taskForm.contractor} onChange={e => setTaskForm({...taskForm, contractor: e.target.value})} placeholder="Tổ thi công số 1..." />
                </div>
                <div className="space-y-2">
                  <Label>Giám sát / Cán bộ QL</Label>
                  <Input value={taskForm.supervisor} onChange={e => setTaskForm({...taskForm, supervisor: e.target.value})} placeholder="Anh Tuấn (TVGS)..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tình trạng thực hiện</Label>
                  <Select value={taskForm.status} onValueChange={(value) => setTaskForm({ ...taskForm, status: value })}>
                    <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Đã hoàn thành">Đã hoàn thành</SelectItem>
                      <SelectItem value="Đang thi công">Đang thi công</SelectItem>
                      <SelectItem value="Vướng mắc">Vướng mắc / Tạm dừng</SelectItem>
                      <SelectItem value="Chưa bắt đầu">Chưa bắt đầu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tỷ lệ hoàn thành (%)</Label>
                  <Input type="number" min="0" max="100" value={taskForm.progress} onChange={e => setTaskForm({...taskForm, progress: parseInt(e.target.value) || 0})} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>Hủy</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveTask}>Lưu hạng mục</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </DialogContent>
    </Dialog>
  );
}


