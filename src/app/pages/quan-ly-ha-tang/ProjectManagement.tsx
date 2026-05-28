import React, { useState } from "react";
import { Construction, MapPin, Calendar, Eye, Edit, Trash2, Map as MapIcon, Plus, Upload, LayoutDashboard, Route, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ProjectDetailDialog } from "../../components/infrastructure/ProjectDetailDialog";
import { EditDialog } from "../../components/infrastructure/EditDialog";
import { DeleteDialog } from "../../components/infrastructure/DeleteDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function ProjectManagement() {
  // Dự án đang xây dựng
  const ongoingProjects = [
    {
      id: "DA-2024-001",
      name: "Cầu Tứ Liên mới",
      type: "Cầu",
      location: "Quận Tây Hồ, Hà Nội",
      contractor: "Tổng công ty Xây dựng Công trình GT 1",
      startDate: "15/01/2024",
      expectedEndDate: "30/06/2026",
      progress: 45,
      budget: "1,250 tỷ VNĐ",
      status: "Đang thi công",
      toaDo: [21.0744, 105.8286]
    },
    {
      id: "DA-2024-002",
      name: "Mở rộng QL32 đoạn Km 15-25",
      type: "Quốc lộ",
      location: "Hưng Yên",
      contractor: "Công ty CP Đầu tư Xây dựng GT",
      startDate: "01/03/2024",
      expectedEndDate: "15/12/2025",
      progress: 68,
      budget: "850 tỷ VNĐ",
      status: "Đang thi công",
      toaDo: [20.9125, 106.0152]
    },
    {
      id: "DA-2024-003",
      name: "Nút giao Mai Dịch - Cầu Giấy",
      type: "Nút giao",
      location: "Quận Cầu Giấy, Hà Nội",
      contractor: "Liên danh Xây dựng 18 - Tasco",
      startDate: "20/02/2024",
      expectedEndDate: "20/08/2025",
      progress: 72,
      budget: "420 tỷ VNĐ",
      status: "Đang thi công",
      toaDo: [21.0371, 105.7770]
    }
  ];

  // Dự án chuẩn bị xây dựng
  const upcomingProjects = [
    {
      id: "DA-2026-001",
      name: "Đường Vành đai 4 - Đoạn Đông",
      type: "Quốc lộ",
      location: "Hà Nội - Hưng Yên",
      contractor: "Chưa đấu thầu",
      plannedStart: "Q2/2026",
      duration: "36 tháng",
      budget: "8,500 tỷ VNĐ",
      status: "Đang thiết kế",
      toaDo: [20.8523, 105.9321]
    },
    {
      id: "DA-2026-002",
      name: "Cầu Vĩnh Tuy 2",
      type: "Cầu",
      location: "Quận Long Biên, Hà Nội",
      contractor: "Đang lựa chọn nhà thầu",
      plannedStart: "Q3/2026",
      duration: "48 tháng",
      budget: "3,200 tỷ VNĐ",
      status: "Chuẩn bị",
      toaDo: [21.0112, 105.8752]
    },
    {
      id: "DA-2026-003",
      name: "Hầm chui Lê Văn Lương - Khuất Duy Tiến",
      type: "Hầm",
      location: "Quận Thanh Xuân, Hà Nội",
      contractor: "Chưa đấu thầu",
      plannedStart: "Q4/2026",
      duration: "30 tháng",
      budget: "1,800 tỷ VNĐ",
      status: "Phê duyệt",
      toaDo: [21.0055, 105.8015]
    }
  ];
  // Dự án đã bàn giao
  const handedOverProjects = [
    {
      id: "DA-2023-001",
      name: "Dự án cải tạo nút giao Chùa Bộc - Phạm Ngọc Thạch",
      type: "Nút giao",
      location: "Quận Đống Đa, Hà Nội",
      contractor: "Công ty Cổ phần Xây dựng 4",
      startDate: "10/06/2023",
      endDate: "15/12/2024",
      progress: 100,
      budget: "180 tỷ VNĐ",
      status: "Đã hoàn thành",
      toaDo: [21.0105, 105.8315]
    },
    {
      id: "DA-2023-002",
      name: "Sửa chữa khẩn cấp cầu Chương Dương (Giai đoạn 1)",
      type: "Cầu",
      location: "Hà Nội",
      contractor: "Công ty Cổ phần Cầu 12",
      startDate: "15/08/2023",
      endDate: "30/03/2024",
      progress: 100,
      budget: "45 tỷ VNĐ",
      status: "Đã bàn giao",
      toaDo: [21.0335, 105.8562]
    }
  ];
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsEditOpen(true);
  };

  const handleDelete = (project: any) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const handleViewDetail = (project: any) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleViewMap = (project: any) => {
    setSelectedProject(project);
    setIsMapOpen(true);
  };

  const [viewMode, setViewMode] = useState<"list" | "map" | "plan">("list");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-lg font-semibold text-slate-800">Cập nhật Kế hoạch & Tiến độ dự án</h2>
           <p className="text-sm text-slate-500">Quản lý báo cáo tiến độ, ngân sách các dự án đang và sắp triển khai</p>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center rounded-md border p-1 bg-slate-50 mr-2">
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 shadow-none" title="Dạng danh sách Kanban">
              <LayoutDashboard className="h-4 w-4 mr-2 hidden sm:block" /> Danh sách
            </Button>
            <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")} className="h-8 shadow-none" title="Bản đồ không gian (GIS)">
              <MapIcon className="h-4 w-4 mr-2 hidden sm:block" /> Bản đồ
            </Button>
            <Button variant={viewMode === "plan" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("plan")} className="h-8 shadow-none" title="Bình đồ tuyến thiết kế">
              <Route className="h-4 w-4 mr-2 hidden sm:block" /> Bình đồ
            </Button>
          </div>
          <Button variant="outline" className="bg-white border-slate-200 shadow-sm text-slate-700 hover:bg-slate-50">
            <Upload className="size-4 mr-2 text-green-600" />
            Nhập Excel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm text-white" onClick={() => setIsAddOpen(true)}>
            <Plus className="size-4 mr-2" />
            Thêm mới
          </Button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: ongoingProjects.map(p => `.proj-progress-${p.id} { width: ${p.progress}%; }`).join('\n') }} />
      
      {viewMode === "list" && (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Dự án đang xây dựng */}
        <Card className="bg-white border-slate-200 shadow-sm transition-all hover:shadow-md h-fit">
          <CardHeader className="pb-3 px-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Construction className="size-5 text-primary" />
                </div>
                <CardTitle className="text-foreground text-sm font-bold uppercase tracking-wide">Dự án đang xây dựng</CardTitle>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-2 py-0 h-5 text-[10px]">
                {ongoingProjects.length} dự án
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pb-4">
            {ongoingProjects.map((project) => (
              <div key={project.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-primary/30 hover:bg-white hover:shadow-sm transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{project.name}</h4>
                      <Badge variant="outline" className="text-[10px] text-primary border-primary/30 bg-primary/5 px-1.5 py-0">
                        {project.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3 text-slate-500 flex-shrink-0" />
                      <p className="text-xs text-slate-500">{project.location}</p>
                    </div>
                  </div>
                  <Badge className="text-[10px] bg-blue-100 text-blue-700 border-blue-200 px-1.5 py-0">
                    {project.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Tiến độ thi công</span>
                    <span className="text-xs font-bold text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`bg-primary h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary),0.4)] proj-progress-${project.id}`}
                      ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 py-3 border-y border-slate-200/60 text-[10px]">
                  <div>
                    <p className="text-slate-400 mb-0.5">Nhà thầu</p>
                    <p className="text-slate-700 font-medium truncate">{project.contractor}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Ngân sách</p>
                    <p className="text-slate-700 font-bold text-primary/80">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Khởi công</p>
                    <p className="text-slate-700 font-medium">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Tiến độ dự kiến</p>
                    <p className="text-slate-700 font-medium truncate">{project.expectedEndDate}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleViewDetail(project)}>
                    <Eye className="size-3.5" /> Chi tiết
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleEdit(project)}>
                    <Edit className="size-3.5" /> Sửa
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(project)}>
                    <Trash2 className="size-3.5" /> Xóa
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dự án chuẩn bị xây dựng */}
        <Card className="bg-white border-slate-200 shadow-sm transition-all hover:shadow-md h-fit">
          <CardHeader className="pb-3 px-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="size-5 text-blue-600" />
                </div>
                <CardTitle className="text-foreground text-sm font-bold uppercase tracking-wide">Dự án chuẩn bị xây dựng</CardTitle>
              </div>
              <Badge className="bg-blue-50 text-blue-600 border-blue-100 px-2 py-0 h-5 text-[10px]">
                {upcomingProjects.length} dự án
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pb-4">
            {upcomingProjects.map((project) => (
              <div key={project.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</h4>
                      <Badge variant="outline" className="text-[10px] text-blue-600 border-blue-200 bg-blue-50/50 px-1.5 py-0">
                        {project.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3 text-slate-500 flex-shrink-0" />
                      <p className="text-xs text-slate-500">{project.location}</p>
                    </div>
                  </div>
                  <Badge className="text-[10px] bg-slate-200 text-slate-700 border-slate-300 font-medium px-1.5 py-0">
                    {project.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 py-3 border-y border-slate-200/60 text-[10px]">
                  <div>
                    <p className="text-slate-400 mb-0.5">Nhà thầu</p>
                    <p className="text-slate-700 font-medium truncate">{project.contractor}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Ngân sách dự kiến</p>
                    <p className="text-slate-700 font-bold text-blue-600/80">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Khởi công dự kiến</p>
                    <p className="text-slate-700 font-medium">{project.plannedStart}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Thời gian thi công</p>
                    <p className="text-slate-700 font-medium">{project.duration}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleViewDetail(project)}>
                    <Eye className="size-3.5" /> Chi tiết
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleEdit(project)}>
                    <Edit className="size-3.5" /> Sửa
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(project)}>
                    <Trash2 className="size-3.5" /> Xóa
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dự án đã bàn giao */}
        <Card className="bg-white border-slate-200 shadow-sm transition-all hover:shadow-md h-fit">
          <CardHeader className="pb-3 px-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center border-green-500 bg-green-500 text-white">
                    ✓
                  </Badge>
                </div>
                <CardTitle className="text-foreground text-sm font-bold uppercase tracking-wide">Dự án bàn giao</CardTitle>
              </div>
              <Badge className="bg-green-50 text-green-600 border-green-100 px-2 py-0 h-5 text-[10px]">
                {handedOverProjects.length} dự án
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pb-4">
            {handedOverProjects.map((project) => (
              <div key={project.id} className="relative bg-teal-50/30 border border-teal-100 rounded-xl p-4 hover:border-green-300 hover:bg-white hover:shadow-sm transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">{project.name}</h4>
                      <Badge variant="outline" className="text-[10px] text-teal-600 border-teal-200 bg-teal-50 px-1.5 py-0">
                        {project.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3 text-slate-500 flex-shrink-0" />
                      <p className="text-xs text-slate-500">{project.location}</p>
                    </div>
                  </div>
                  <Badge className="text-[10px] bg-green-100 text-green-700 border-green-200 font-medium px-1.5 py-0">
                    {project.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2 py-3 border-y border-teal-100/60 text-[10px]">
                  <div>
                    <p className="text-slate-400 mb-0.5">Nhà thầu</p>
                    <p className="text-slate-700 font-medium truncate">{project.contractor}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Quyết toán</p>
                    <p className="text-slate-700 font-bold text-green-600">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-0.5">Thời gian thực hiện</p>
                    <p className="text-slate-700 font-medium">{project.startDate} - {project.endDate}</p>
                  </div>
                  <div className="flex items-end justify-end">
                     <Badge variant="outline" className="text-[9px] text-green-600 border-green-200 bg-green-50 px-1 py-0 h-4">Hoàn thành 100%</Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleViewDetail(project)}>
                    <Eye className="size-3.5" /> Chi tiết
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => handleEdit(project)}>
                    <Edit className="size-3.5" /> Sửa
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex-1 gap-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(project)}>
                    <Trash2 className="size-3.5" /> Xóa
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      )}

      {viewMode === "map" && (
        <Card className="h-[650px] flex flex-col relative overflow-hidden ring-1 ring-slate-200">
          <CardHeader className="py-3 border-b z-10 bg-white/95 backdrop-blur shadow-sm flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-600" /> Bản đồ Thiết kế Dự án (GIS)</CardTitle>
            <div className="flex items-center gap-4 text-xs font-semibold px-4 py-2 bg-slate-50 rounded-lg border">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-blue-500"></span> Đang thi công</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-amber-500"></span> Chuẩn bị xây dựng</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full shadow-sm bg-emerald-500"></span> Đã hoàn thành</div>
            </div>
          </CardHeader>
          <div className="flex-1 relative">
            <SimpleMapView 
              markers={[
                ...ongoingProjects.map(p => ({ id: p.id, lat: p.toaDo[0], lng: p.toaDo[1], name: p.name, type: p.status, color: '#3b82f6' })),
                ...upcomingProjects.map(p => ({ id: p.id, lat: p.toaDo[0], lng: p.toaDo[1], name: p.name, type: p.status, color: '#f59e0b' })),
                ...handedOverProjects.map(p => ({ id: p.id, lat: p.toaDo[0], lng: p.toaDo[1], name: p.name, type: p.status, color: '#10b981' }))
              ]} 
              center={[21.0285, 105.8542]}
              zoom={11}
              isActive={viewMode === "map"}
            />
          </div>
        </Card>
      )}

      {viewMode === "plan" && (
        <Card className="h-[650px] flex flex-col relative overflow-hidden bg-slate-50 border-dashed">
          <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-500 text-center p-8">
            <Route className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-medium text-slate-700 mb-2">Bình đồ Tuyến thiết kế cắt dọc/ngang (AutoCAD/BIM)</h3>
            <p className="max-w-md text-sm text-slate-500">
              Module Bình đồ thiết kế kỹ thuật công trình (BIM Viewer/DWG Viewer) sẽ được tích hợp tại đây, hỗ trợ render các bản vẽ chuyên sâu (3D Layer) cho từng dự án thi công.
            </p>
            <Button variant="outline" className="mt-6 bg-white" onClick={() => setViewMode("list")}>Quay lại dạng Danh sách</Button>
          </div>
        </Card>
      )}

      <ProjectDetailDialog 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        project={selectedProject} 
      />

      <EditDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        selectedCard={{ title: selectedProject?.type }}
        selectedItem={{
          fullName: selectedProject?.name,
          idNumber: selectedProject?.id,
          birthDate: selectedProject?.startDate || selectedProject?.plannedStart,
          nationality: selectedProject?.contractor,
          gender: selectedProject?.type
        }}
      />

      <DeleteDialog 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        selectedCard={{ title: "Dự án" }}
        selectedItem={{
          fullName: selectedProject?.name,
          idNumber: selectedProject?.id
        }}
        onConfirmDelete={() => {
          alert("Xóa dự án thành công!");
        }}
      />

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl h-[70vh] p-0 overflow-hidden">
          <SimpleMapView 
            height="100%"
            markers={typeof filteredData !== 'undefined' ? filteredData.map((item: any) => ({
                id: item.id || String(Math.random()),
                lat: item.toaDo ? item.toaDo[0] : 21.0285 + (Math.random() - 0.5) * 0.1,
                lng: item.toaDo ? item.toaDo[1] : 105.8542 + (Math.random() - 0.5) * 0.1,
                name: item.tenTuyen || item.tenCau || item.tenHam || item.tuyenDuong || item.tenGa || item.tenTram || item.tenBien || item.assetName || "Tài sản GIS",
                type: item.loaiDuong || item.loaiCau || item.tenLoaiHam || item.phanLoai || item.loaiBien || item.status || "Tài sản GIS"
              })) : []}
            routes={[{
              id: selectedProject?.id,
              name: selectedProject?.name,
              coordinates: [[21.05, 105.85], [21.07, 105.88], [21.08, 105.90]],
              color: "#3b82f6"
            }]}
            center={[21.06, 105.87]}
            zoom={13}
            isActive={isMapOpen}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-[1200px] xl:max-w-7xl w-[66.6vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-white">
          <DialogHeader className="p-6 border-b bg-slate-50/50">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Plus className="size-5 text-white" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-slate-900">Thêm mới Dự án giao thông</DialogTitle>
                </div>
                <p className="text-sm text-slate-500 mt-1">Khởi tạo hồ sơ dự án mới trong hệ thống quản lý hạ tầng GTHN</p>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="general" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="px-6 border-b h-14 bg-white justify-start gap-2 rounded-none w-full">
              <TabsTrigger value="general" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
                <LayoutDashboard className="size-4" />
                Thông tin chung
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
                <Upload className="size-4" />
                Hồ sơ kỹ thuật & Pháp lý
              </TabsTrigger>
              <TabsTrigger value="location" className="gap-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-14">
                <MapPin className="size-4" />
                Vị trí dự án (GIS)
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <div className="p-8">
                <TabsContent value="general" className="m-0 space-y-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Tên dự án <span className="text-red-500">*</span></Label>
                      <Input placeholder="Nhập tên dự án đầy đủ..." className="h-11 border-slate-200 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Loại công trình</Label>
                      <Select defaultValue="Cầu">
                        <SelectTrigger className="h-11 bg-white border-slate-200">
                          <SelectValue placeholder="Chọn loại công trình" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cầu">Dự án Xây dựng Cầu</SelectItem>
                          <SelectItem value="Hầm">Dự án Xây dựng Hầm</SelectItem>
                          <SelectItem value="Quốc lộ">Nâng cấp Quốc lộ</SelectItem>
                          <SelectItem value="Nút giao">Cải tạo Nút giao</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Địa điểm / Vị trí phân bổ</Label>
                      <Input placeholder="Nhập địa điểm thi công..." className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Chủ đầu tư / Ban quản lý</Label>
                      <Input placeholder="Tên đơn vị chủ quản..." className="h-11 border-slate-200" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Nhà thầu thi công</Label>
                      <Input placeholder="Tên công ty / Liên danh thi công..." className="h-11 border-slate-200" />
                    </div>
                    <div className="grid grid-cols-3 col-span-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Ngân sách (Tỷ VNĐ)</Label>
                        <Input type="number" placeholder="0" className="h-11 border-slate-200" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Khởi công dự kiến</Label>
                        <Input type="date" className="h-11 border-slate-200" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Hoàn thành dự kiến</Label>
                        <Input type="date" className="h-11 border-slate-200" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="m-0 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-700">Tài liệu đính kèm</Label>
                      <Badge variant="outline" className="text-[10px] text-slate-400">Tối đa 50MB/file</Badge>
                    </div>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all group bg-slate-50/30">
                      <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="size-8 text-blue-500" />
                      </div>
                      <p className="text-base font-bold text-slate-900">Kéo thả file tài liệu vào đây hoặc <span className="text-blue-600 hover:underline">Click để chọn file</span></p>
                      <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto font-medium">Hỗ trợ các định dạng: PDF, DOCX, XLSX, DWG, PNG, JPG (Thiết kế kỹ thuật, Phê duyệt dự án, v.v.)</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="m-0 space-y-4">
                   <div className="rounded-2xl border border-slate-200 overflow-hidden h-[450px] relative shadow-inner">
                      <SimpleMapView 
                        markers={[]}
                        height="100%"
                        center={[21.0285, 105.8542]}
                        zoom={12}
                        isActive={isAddOpen}
                      />
                      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur p-4 rounded-xl border shadow-xl max-w-xs">
                        <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                          <MapPin className="size-4 text-blue-600" />
                          Xác định vị trí GIS
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Bản đồ đang hiển thị khu vực trung tâm Hà Nội. Vị trí chính xác sẽ được trích xuất từ dữ liệu geometry đính kèm hoặc tọa độ nhập thủ công.</p>
                      </div>
                   </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>

          <DialogFooter className="p-6 border-t bg-slate-50/50 gap-3">
            <Button variant="ghost" onClick={() => setIsAddOpen(false)} className="h-11 px-8 font-bold text-slate-500 hover:bg-slate-200">
              Hủy bỏ
            </Button>
            <Button className="h-11 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200" onClick={() => setIsAddOpen(false)}>
              <Plus className="size-4 mr-2" />
              Tạo hồ sơ dự án
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
