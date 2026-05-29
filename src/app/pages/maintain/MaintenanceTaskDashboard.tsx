import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  Calendar, Plus, Filter, MoreHorizontal, Clock, 
  AlertTriangle, CheckCircle2, Search, ArrowRight, 
  Hammer, AlertCircle, Wrench, Image, Check, FileText,
  DollarSign, Package
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";

interface Task {
  id: string;
  title: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  assignee: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  type: 'Bảo dưỡng' | 'Sửa chữa';
  cost?: string;
  materials?: string;
}

const initialTasks: Task[] = [
  { id: "BD-001", title: "Bảo dưỡng định kỳ trạm thu phí IC3 Km182", location: "Trạm thu phí IC3", priority: "medium", dueDate: "05/06/2026", assignee: "Đội Vận hành VEC", status: "todo", type: "Bảo dưỡng", cost: "15,000,000đ", materials: "Thiết bị điện tử, dây cáp mạng" },
  { id: "BD-002", title: "Vệ sinh hệ thống thoát nước hầm Đèo Cả", location: "Hầm Đèo Cả, Km405", priority: "high", dueDate: "02/06/2026", assignee: "Xí nghiệp hầm", status: "in_progress", type: "Bảo dưỡng", cost: "35,000,000đ", materials: "Máy xịt áp lực, chổi quét chuyên dụng" },
  { id: "SC-101", title: "Thảm lại bê tông nhựa mặt đường bị hằn lún nặng", location: "Km 212+800 (Trái tuyến)", priority: "critical", dueDate: "29/05/2026", assignee: "Công ty cầu đường Đông Á", status: "in_progress", type: "Sửa chữa", cost: "1,200,000,000đ", materials: "Nhựa đường hạt mịn, dầu bám dính" },
  { id: "SC-102", title: "Thay thế tôn hộ lan bị đâm hỏng do tai nạn giao thông", location: "Km 218+300", priority: "high", dueDate: "30/05/2026", assignee: "Đội Tuần kiểm số 2", status: "todo", type: "Sửa chữa", cost: "45,000,000đ", materials: "Tấm tôn sóng hộ lan 4m, bu lông liên kết" },
  { id: "SC-103", title: "Sửa chữa khe co giãn Cầu Vực Vòng", location: "Cầu Vực Vòng Km214", priority: "high", dueDate: "25/05/2026", assignee: "Công ty Cầu đường bộ VEC", status: "review", type: "Sửa chữa", cost: "250,000,000đ", materials: "Keo trám khe chuyên dụng, thép neo" },
  { id: "BD-003", title: "Vệ sinh phát quang cỏ dải phân cách giữa Km210-Km215", location: "Km 210 - Km 215", priority: "low", dueDate: "10/06/2026", assignee: "Hợp tác xã dịch vụ VEC", status: "done", type: "Bảo dưỡng", cost: "18,000,000đ", materials: "Xăng dầu cho máy phát cỏ" },
];

export default function MaintenanceTaskDashboard({ title = "Quản lý Duy tu & Sửa chữa", category = "Bảo dưỡng" as "Bảo dưỡng" | "Sửa chữa" }) {
  const location = useLocation();
  const path = location.pathname;

  const [mode, setMode] = useState<"plan" | "update" | "search" | "detail" | "alert">("update");
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Create task states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskLocation, setTaskLocation] = useState("");
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high' | 'critical'>("medium");
  const [taskDueDate, setTaskDueDate] = useState("30/05/2026");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskCost, setTaskCost] = useState("");
  const [taskMaterials, setTaskMaterials] = useState("");

  useEffect(() => {
    if (path.includes("lap-ke-hoach")) {
      setMode("plan");
    } else if (path.includes("cap-nhat")) {
      setMode("update");
    } else if (path.includes("tim-kiem")) {
      setMode("search");
    } else if (path.includes("chi-tiet")) {
      setMode("detail");
    } else if (path.includes("canh-bao")) {
      setMode("alert");
    }
  }, [path]);

  const filteredTasks = tasks.filter(t => t.type === category && (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase())));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return 'Khẩn cấp';
      case 'high': return 'Cao';
      case 'medium': return 'Trung bình';
      case 'low': return 'Thấp';
      default: return 'Không xác định';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo': return 'Cần thực hiện';
      case 'in_progress': return 'Đang thi công';
      case 'review': return 'Chờ nghiệm thu';
      case 'done': return 'Đã hoàn thành';
      default: return '';
    }
  };

  const handleCreateTask = () => {
    if (!taskTitle) return;
    const prefix = category === "Bảo dưỡng" ? "BD" : "SC";
    const newId = `${prefix}-${String(tasks.length + 1).padStart(3, '0')}`;
    const newTask: Task = {
      id: newId,
      title: taskTitle,
      location: taskLocation,
      priority: taskPriority,
      dueDate: taskDueDate,
      assignee: taskAssignee || "Chưa giao việc",
      status: "todo",
      type: category,
      cost: taskCost ? parseInt(taskCost.replace(/\D/g, "")).toLocaleString("vi-VN") + "đ" : "0đ",
      materials: taskMaterials || "Không có"
    };

    setTasks([newTask, ...tasks]);
    setIsCreateOpen(false);
    // Reset Form
    setTaskTitle("");
    setTaskLocation("");
    setTaskPriority("medium");
    setTaskDueDate("30/05/2026");
    setTaskAssignee("");
    setTaskCost("");
    setTaskMaterials("");
  };

  const handleMoveStatus = (task: Task, nextStatus: 'todo' | 'in_progress' | 'review' | 'done') => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: nextStatus } : t));
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <div 
      onClick={() => { setSelectedTask(task); setIsDetailOpen(true); }}
      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group relative mb-3"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-50 border px-1.5 py-0.5 rounded">{task.id}</span>
        <Badge className={`text-[10px] font-semibold px-2 py-0 border ${getPriorityColor(task.priority)}`} variant="outline">
          {getPriorityLabel(task.priority)}
        </Badge>
      </div>
      <h4 className="text-sm font-semibold text-slate-800 mb-3 leading-snug group-hover:text-indigo-650 transition-colors">{task.title}</h4>
      <div className="space-y-1.5 mb-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{task.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-slate-400 shrink-0" />
          <span className={task.priority === 'critical' ? 'text-rose-600 font-semibold' : ''}>Hạn: {task.dueDate}</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-2.5">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center text-[10px] font-bold">
            {task.assignee.charAt(0)}
          </div>
          <span className="text-[10px] font-semibold text-slate-600 truncate max-w-[90px]">{task.assignee}</span>
        </div>
        
        {/* Quick moves */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
          {task.status === 'todo' && (
            <Button size="icon" variant="ghost" className="h-6 w-6 text-indigo-600 hover:bg-indigo-50" onClick={() => handleMoveStatus(task, 'in_progress')} title="Bắt đầu thi công"><ArrowRight className="size-3.5" /></Button>
          )}
          {task.status === 'in_progress' && (
            <Button size="icon" variant="ghost" className="h-6 w-6 text-amber-600 hover:bg-amber-50" onClick={() => handleMoveStatus(task, 'review')} title="Gửi nghiệm thu"><Check className="size-3.5" /></Button>
          )}
          {task.status === 'review' && (
            <Button size="icon" variant="ghost" className="h-6 w-6 text-emerald-600 hover:bg-emerald-50" onClick={() => handleMoveStatus(task, 'done')} title="Duyệt hoàn thành"><CheckCircle2 className="size-3.5" /></Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4 shrink-0 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
            {category === "Bảo dưỡng" ? <Wrench className="size-4 text-indigo-500" /> : <Hammer className="size-4 text-indigo-500" />}
            Nghiệp vụ {category.toLowerCase()} tài sản kỹ thuật đường cao tốc.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 w-60 shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          </div>
          {mode === "plan" && (
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm" onClick={() => setIsCreateOpen(true)}>
              <Plus className="size-4" />
              Lập lệnh công việc
            </Button>
          )}
          {mode === "alert" && (
            <Badge className="bg-rose-100 text-rose-700 border-none hover:bg-rose-100 px-3 py-1.5 flex items-center gap-1.5"><AlertCircle className="size-3.5" /> Có 2 cảnh báo kỹ thuật trễ hạn</Badge>
          )}
        </div>
      </div>

      {/* Dynamic Render based on mode */}
      {mode === "update" ? (
        /* Kanban Board View */
        <div className="flex-1 min-h-0 overflow-x-auto pb-2">
          <div className="flex gap-4 h-full min-w-[1000px]">
            {/* Cột: Cần thực hiện */}
            <div className="flex-1 flex flex-col bg-slate-50 rounded-xl border border-slate-200/60 overflow-hidden">
              <div className="p-3.5 border-b border-slate-200 bg-slate-100/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-slate-400" />
                  <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Cần thực hiện</h3>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded-full">{filteredTasks.filter(t => t.status === 'todo').length}</span>
                </div>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:text-indigo-600" onClick={() => setIsCreateOpen(true)}><Plus className="size-4" /></Button>
              </div>
              <div className="p-3 flex-1 overflow-y-auto">
                {filteredTasks.filter(t => t.status === 'todo').map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            {/* Cột: Đang thi công */}
            <div className="flex-1 flex flex-col bg-indigo-50/20 rounded-xl border border-indigo-100/50 overflow-hidden">
              <div className="p-3.5 border-b border-indigo-100 bg-indigo-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-indigo-500 animate-pulse" />
                  <h3 className="font-bold text-indigo-900 text-xs uppercase tracking-wider">Đang thực hiện</h3>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">{filteredTasks.filter(t => t.status === 'in_progress').length}</span>
                </div>
              </div>
              <div className="p-3 flex-1 overflow-y-auto">
                {filteredTasks.filter(t => t.status === 'in_progress').map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            {/* Cột: Chờ nghiệm thu */}
            <div className="flex-1 flex flex-col bg-amber-50/20 rounded-xl border border-amber-100/50 overflow-hidden">
              <div className="p-3.5 border-b border-amber-100 bg-amber-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-amber-500" />
                  <h3 className="font-bold text-amber-900 text-xs uppercase tracking-wider">Chờ nghiệm thu</h3>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">{filteredTasks.filter(t => t.status === 'review').length}</span>
                </div>
              </div>
              <div className="p-3 flex-1 overflow-y-auto">
                {filteredTasks.filter(t => t.status === 'review').map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            {/* Cột: Đã hoàn thành */}
            <div className="flex-1 flex flex-col bg-emerald-50/20 rounded-xl border border-emerald-100/50 overflow-hidden">
              <div className="p-3.5 border-b border-emerald-100 bg-emerald-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-emerald-900 text-xs uppercase tracking-wider">Đã hoàn thành</h3>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">{filteredTasks.filter(t => t.status === 'done').length}</span>
                </div>
              </div>
              <div className="p-3 flex-1 overflow-y-auto">
                {filteredTasks.filter(t => t.status === 'done').map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Table / List View for Search, Plan, Details */
        <Card className="flex-1 shadow-sm border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-slate-50/30 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700">Tất cả danh sách việc {category.toLowerCase()}</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Mã công việc</th>
                  <th className="px-6 py-4 font-semibold">Tên công việc</th>
                  <th className="px-6 py-4 font-semibold">Vị trí lý trình</th>
                  <th className="px-6 py-4 font-semibold">Cán bộ thi công</th>
                  <th className="px-6 py-4 font-semibold">Hạn hoàn thành</th>
                  <th className="px-6 py-4 font-semibold text-right">Chi phí ước tính</th>
                  <th className="px-6 py-4 font-semibold">Độ khẩn cấp</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái hiện tại</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((item, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => { setSelectedTask(item); setIsDetailOpen(true); }}
                  >
                    <td className="px-6 py-4 font-bold text-indigo-650 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-800 max-w-sm truncate">{item.title}</td>
                    <td className="px-6 py-4 text-slate-600">{item.location}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{item.assignee}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.dueDate}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-800">{item.cost}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={`${getPriorityColor(item.priority)} font-semibold text-[10px]`}>
                        {getPriorityLabel(item.priority)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        item.status === 'done' ? 'bg-emerald-100 text-emerald-800 border-none' : 
                        item.status === 'review' ? 'bg-amber-100 text-amber-800 border-none' : 
                        item.status === 'in_progress' ? 'bg-blue-100 text-blue-800 border-none' : 
                        'bg-slate-100 text-slate-800 border-none'
                      }>
                        {getStatusLabel(item.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Dialog for Lập công việc mới */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl border p-0 overflow-hidden shadow-lg">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Plus className="size-5 text-indigo-600" />
              Lập lệnh công việc {category.toLowerCase()} mới
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Tên hạng mục {category.toLowerCase()}</label>
              <input 
                type="text" 
                placeholder="VD: Kiểm tu thiết bị camera quan sát làn thu phí..." 
                className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Vị trí / Lý trình</label>
                <input 
                  type="text" 
                  placeholder="VD: Km 182, Trạm IC3" 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={taskLocation}
                  onChange={(e) => setTaskLocation(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Cán bộ / Đội thực hiện</label>
                <input 
                  type="text" 
                  placeholder="VD: Đội Vận hành VEC" 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Mức độ khẩn</label>
                <select 
                  className="w-full text-sm px-3.5 py-2 border rounded-md bg-white"
                  value={taskPriority}
                  onChange={(e: any) => setTaskPriority(e.target.value)}
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                  <option value="critical">Khẩn cấp</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Hạn hoàn thành</label>
                <input 
                  type="text" 
                  placeholder="VD: 30/05/2026" 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Dự chi ngân sách (VNĐ)</label>
                <input 
                  type="text" 
                  placeholder="Nhập số tiền..." 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={taskCost}
                  onChange={(e) => setTaskCost(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Vật tư dự kiến tiêu hao</label>
                <input 
                  type="text" 
                  placeholder="Nhập vật tư thiết bị..." 
                  className="w-full text-sm px-3.5 py-2 border rounded-md focus:outline-none"
                  value={taskMaterials}
                  onChange={(e) => setTaskMaterials(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t bg-slate-50 gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)} className="h-9 px-4">Đóng</Button>
            <Button size="sm" onClick={handleCreateTask} className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white">Tạo lệnh giao việc</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Chi tiết công việc / Nghiệm thu */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        {selectedTask && (
          <DialogContent className="sm:max-w-[550px] rounded-xl border p-0 overflow-hidden shadow-lg">
            <DialogHeader className="px-6 py-4 border-b bg-muted/20">
              <div className="flex justify-between items-center mr-6">
                <DialogTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="size-5 text-indigo-600" />
                  Chi tiết phiếu công tác: {selectedTask.id}
                </DialogTitle>
                <Badge className={selectedTask.status === "done" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}>
                  {getStatusLabel(selectedTask.status)}
                </Badge>
              </div>
            </DialogHeader>
            <div className="p-6 space-y-5 text-sm">
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{selectedTask.title}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-4 mt-1">
                  <span><span className="font-medium text-slate-700">Lý trình:</span> {selectedTask.location}</span>
                  <span><span className="font-medium text-slate-700">Hạn chót:</span> {selectedTask.dueDate}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5 flex items-center gap-1"><User className="size-3" /> Người thực hiện</p>
                  <p className="font-semibold text-slate-800">{selectedTask.assignee}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5 flex items-center gap-1"><Badge variant="outline" className="p-0 border-none"><DollarSign className="size-3" /></Badge> Chi phí ước tính</p>
                  <p className="font-bold text-slate-850 text-indigo-650">{selectedTask.cost || "Chưa dự toán"}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-400 flex items-center gap-1"><Package className="size-3.5" /> Vật tư sử dụng</p>
                <p className="text-slate-700 font-medium bg-slate-50 p-2.5 rounded border">{selectedTask.materials || "Không có vật tư đặc thù"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-400 flex items-center gap-1"><Image className="size-3.5" /> Ảnh nghiệm thu công tác</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-28 rounded-lg bg-slate-100 border flex flex-col items-center justify-center text-slate-400 text-xs">
                    [Ảnh hiện trạng trước]
                  </div>
                  <div className="h-28 rounded-lg bg-slate-100 border flex flex-col items-center justify-center text-slate-400 text-xs">
                    {selectedTask.status === "done" ? "[Ảnh hiện trạng hoàn thành]" : "[Chưa nghiệm thu]"}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="px-6 py-4 border-t bg-slate-50 gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsDetailOpen(false)} className="h-9 px-4">Đóng</Button>
              {selectedTask.status === "review" && (
                <Button size="sm" className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { handleMoveStatus(selectedTask, "done"); setIsDetailOpen(false); }}>
                  Duyệt nghiệm thu hoàn thành
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
