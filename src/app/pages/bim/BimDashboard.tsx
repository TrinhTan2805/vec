import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Box, Layers, Play, Settings, AlertTriangle, Info, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export default function BimDashboard() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý Mô hình BIM 3D</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi trực quan kết cấu Cầu, Hầm lớn bằng mô hình Building Information Modeling.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select title="Chọn mô hình" aria-label="Chọn mô hình" className="px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 font-medium">
            <option>Cầu Sông Lô - Km 114+200</option>
            <option>Hầm Đèo Cả</option>
            <option>Cầu vượt nút giao IC3</option>
          </select>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Layers className="size-4" />
            Tải mô hình
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Left Panel - Objects Tree */}
        <Card className="w-64 flex flex-col shrink-0 shadow-sm border-slate-200">
          <CardHeader className="py-3 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Box className="size-4" />
              Cấu trúc tài sản
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="p-2 space-y-1 text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer bg-blue-50/50 text-blue-700">
                <span className="w-4 flex justify-center text-slate-400">▼</span>
                <Box className="size-4 opacity-70" />
                Kết cấu nhịp
              </div>
              <div className="pl-8 space-y-1">
                <div className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer">
                  Dầm chính (D1 - D5)
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer text-amber-600 bg-amber-50">
                  <AlertTriangle className="size-3" />
                  Bản mặt cầu
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer">
                  Khe co giãn
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer mt-1">
                <span className="w-4 flex justify-center text-slate-400">▶</span>
                <Box className="size-4 opacity-70" />
                Kết cấu phần dưới
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer">
                <span className="w-4 flex justify-center text-slate-400">▶</span>
                <Box className="size-4 opacity-70" />
                Hệ thống phụ trợ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center Panel - 3D Viewer Area */}
        <div className="flex-1 bg-slate-900 rounded-xl relative overflow-hidden ring-1 ring-inset ring-white/10 shadow-inner flex items-center justify-center">
          {/* Simulated 3D Environment */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950"></div>

          {/* Grid floor */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] [transform:rotateX(75deg)] origin-bottom opacity-50"></div>

          <div className="z-10 text-center">
            <Box className="size-24 text-blue-500/50 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse" />
            <p className="text-slate-400 font-medium">BIM Viewer Integration Space</p>
            <p className="text-xs text-slate-500 mt-2">(Chức năng xem 3D sẽ tích hợp SDK của Autodesk Forge hoặc IFC.js)</p>
          </div>

          {/* Viewer Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="bg-slate-800/80 text-white hover:bg-slate-700 border-none backdrop-blur-md">
              <ZoomIn className="size-4" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-slate-800/80 text-white hover:bg-slate-700 border-none backdrop-blur-md">
              <ZoomOut className="size-4" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-slate-800/80 text-white hover:bg-slate-700 border-none backdrop-blur-md mt-2">
              <RotateCcw className="size-4" />
            </Button>
          </div>

          {/* Overlay Warning */}
          <div className="absolute top-6 left-6 max-w-xs bg-slate-800/80 backdrop-blur-md border border-amber-500/30 p-3 rounded-lg text-white shadow-lg">
            <div className="flex gap-2 items-start">
              <AlertTriangle className="size-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-amber-400">Cảnh báo: Bản mặt cầu</div>
                <div className="text-[10px] text-slate-300 mt-1">Xuất hiện vết nứt ngang vị trí nhịp số 3. BCI hiện tại: 65. Đề xuất kiểm tra thực địa.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <Card className="w-80 flex flex-col shrink-0 shadow-sm border-slate-200">
          <CardHeader className="py-3 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Info className="size-4" />
              Thuộc tính đối tượng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 overflow-y-auto flex-1 space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Thông tin chung</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Tên cấu kiện</span>
                  <span className="font-medium text-slate-900">Bản mặt cầu (Nhịp 3)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Mã định danh (GUID)</span>
                  <span className="font-medium text-slate-900 truncate max-w-[120px]">3k9A_v$b5F1Rx...</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Vật liệu</span>
                  <span className="font-medium text-slate-900">Bê tông cốt thép</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Năm thi công</span>
                  <span className="font-medium text-slate-900">2012</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lịch sử bảo trì</h4>
              <div className="space-y-3">
                <div className="relative pl-4 border-l-2 border-blue-500">
                  <div className="absolute -left-[5px] top-1.5 size-2 rounded-full bg-blue-500 ring-4 ring-white"></div>
                  <div className="text-xs font-medium text-slate-900">Kiểm tra định kỳ (Tháng 09/2023)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Phát hiện vết nứt vi hướng d=0.2mm</div>
                </div>
                <div className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute -left-[5px] top-1.5 size-2 rounded-full bg-slate-300 ring-4 ring-white"></div>
                  <div className="text-xs font-medium text-slate-900">Sửa chữa bề mặt (Tháng 03/2021)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Bơm keo Epoxy xử lý nứt</div>
                </div>
              </div>
            </div>

            <Button className="w-full mt-4" variant="outline">Xem chi tiết hồ sơ tài sản</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
