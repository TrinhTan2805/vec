import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Layers, Monitor, Server, Video, ZoomIn, ZoomOut, Maximize, AlertCircle } from "lucide-react";

export default function FacilityLayout() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sơ đồ mặt bằng (2D)</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý vị trí, trạng thái thiết bị trên sơ đồ 2D của Nhà điều hành, Trạm thu phí.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select title="Chọn mặt bằng" aria-label="Chọn mặt bằng" className="px-3 py-2 text-sm border border-slate-200 rounded-md text-slate-600 font-medium">
            <option>Trạm thu phí IC3 (Nội Bài - Lào Cai)</option>
            <option>Trung tâm điều hành Cầu Giẽ</option>
            <option>Trạm dừng nghỉ Km57</option>
          </select>
          <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
            <Layers className="size-4" />
            Lưu cấu hình mặt bằng
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Toolbar */}
        <Card className="w-16 flex flex-col items-center py-4 shrink-0 shadow-sm border-slate-200 gap-4 bg-slate-50">
          <Button size="icon" variant="ghost" className="text-slate-500 hover:text-teal-600 hover:bg-teal-50" title="Thêm Camera">
            <Video className="size-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-slate-500 hover:text-teal-600 hover:bg-teal-50" title="Thêm Máy chủ">
            <Server className="size-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-slate-500 hover:text-teal-600 hover:bg-teal-50" title="Thêm Màn hình">
            <Monitor className="size-5" />
          </Button>
          <div className="h-px w-8 bg-slate-200 my-2"></div>
          <Button size="icon" variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
            <ZoomIn className="size-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
            <ZoomOut className="size-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
            <Maximize className="size-5" />
          </Button>
        </Card>

        {/* 2D Canvas Area */}
        <div className="flex-1 bg-white rounded-xl relative overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center p-8">
          {/* Blueprint Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMjBoMjBNMjAgMHYyMCIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-60"></div>
          
          <div className="relative w-full max-w-3xl aspect-[16/9] border-2 border-slate-300 bg-slate-50 shadow-md">
            {/* Rooms / Lanes representation */}
            <div className="absolute top-0 left-0 w-1/4 h-full border-r-2 border-slate-300 bg-slate-100 flex items-center justify-center">
              <span className="text-slate-400 font-medium rotate-[-90deg]">Nhà điều hành</span>
            </div>
            <div className="absolute top-1/4 left-1/4 w-3/4 h-1/4 border-b-2 border-slate-300 flex items-center justify-center">
              <span className="text-slate-400 font-medium">Làn ETC 1</span>
            </div>
            <div className="absolute top-2/4 left-1/4 w-3/4 h-1/4 border-b-2 border-slate-300 flex items-center justify-center bg-amber-50/50">
              <span className="text-slate-400 font-medium">Làn ETC 2 (Đang bảo trì)</span>
            </div>
            <div className="absolute top-3/4 left-1/4 w-3/4 h-1/4 flex items-center justify-center">
              <span className="text-slate-400 font-medium">Làn Hỗn hợp</span>
            </div>

            {/* Devices on Layout */}
            <div className="absolute top-[35%] left-[30%] bg-white p-1 rounded-md shadow ring-1 ring-slate-200 cursor-pointer hover:ring-teal-500 group">
              <Video className="size-4 text-emerald-500" />
              <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">Cam Làn 1 (Hoạt động)</div>
            </div>

            <div className="absolute top-[60%] left-[30%] bg-white p-1 rounded-md shadow ring-1 ring-red-400 cursor-pointer hover:ring-teal-500 group animate-pulse">
              <Video className="size-4 text-red-500" />
              <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">Cam Làn 2 (Mất kết nối)</div>
            </div>

            <div className="absolute top-[10%] left-[10%] bg-white p-1 rounded-md shadow ring-1 ring-slate-200 cursor-pointer hover:ring-teal-500 group">
              <Server className="size-4 text-blue-500" />
              <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">Server Lưu trữ (Tải: 45%)</div>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <Card className="w-80 flex flex-col shrink-0 shadow-sm border-slate-200">
          <CardHeader className="py-3 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Video className="size-4" />
              Chi tiết thiết bị
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex gap-2">
              <AlertCircle className="size-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-red-700">Mất tín hiệu (Offline)</h4>
                <p className="text-[10px] text-red-600 mt-1">Từ: 08:30 28/05/2026. Nghi ngờ đứt cáp quang nội bộ.</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Tên thiết bị</span>
                <span className="font-medium text-slate-900">Cam Làn 2 (ETC)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Mã TS</span>
                <span className="font-medium text-blue-600">CAM-IC3-L2</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Loại/Model</span>
                <span className="font-medium text-slate-900">Hikvision ANPR 4MP</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Tọa độ (X, Y)</span>
                <span className="font-medium text-slate-900 text-xs">245, 180</span>
              </div>
            </div>
            
            <Button className="w-full mt-4" variant="outline">Tạo phiếu báo hỏng</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
