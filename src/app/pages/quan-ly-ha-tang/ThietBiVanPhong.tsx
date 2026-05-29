import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Search, Plus, Monitor, HardDrive, Printer, Server, Download, Filter, Building, Cpu } from "lucide-react";

export default function ThietBiVanPhong() {
  const dsThietBi = [
    { id: "TB-VP-001", name: "Máy tính để bàn Dell Optiplex", type: "Máy tính", location: "Trung tâm điều hành", status: "hoat_dong", assignee: "Nguyễn Văn A" },
    { id: "TB-VP-002", name: "Máy in Laser HP M404", type: "Thiết bị ngoại vi", location: "Hạt QLĐB Cầu Giẽ", status: "hong_hoc", assignee: "Lê Văn C" },
    { id: "TB-VP-003", name: "Máy chủ Server Rack Dell", type: "Máy chủ", location: "Trung tâm dữ liệu", status: "hoat_dong", assignee: "Trần Thị B" },
    { id: "TB-VP-004", name: "Switch Cisco Catalyst 24 port", type: "Thiết bị mạng", location: "Hạt QLĐB Nội Bài", status: "bao_tri", assignee: "Phạm Hữu D" },
    { id: "TB-VP-005", name: "Màn hình giám sát 55 inch", type: "Màn hình", location: "Trung tâm điều hành", status: "hoat_dong", assignee: "Nguyễn Văn A" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hoat_dong': return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Hoạt động tốt</Badge>;
      case 'hong_hoc': return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Hư hỏng</Badge>;
      case 'bao_tri': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">Đang bảo trì</Badge>;
      default: return null;
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'Máy tính': return <Monitor className="size-8 text-blue-500" />;
      case 'Thiết bị mạng': return <Server className="size-8 text-indigo-500" />;
      case 'Thiết bị ngoại vi': return <Printer className="size-8 text-slate-500" />;
      case 'Máy chủ': return <HardDrive className="size-8 text-emerald-500" />;
      default: return <Cpu className="size-8 text-slate-500" />;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Thiết bị Văn phòng & CNTT</h1>
          <p className="text-muted-foreground mt-1">Quản lý vòng đời máy tính, máy in, thiết bị mạng tại các hạt và trung tâm điều hành.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="size-4" /> Thêm thiết bị mới
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-xl"><Monitor className="size-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Máy tính / Laptop</p>
              <p className="text-2xl font-bold text-slate-800">124</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-xl"><Server className="size-6 text-emerald-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Máy chủ / Mạng</p>
              <p className="text-2xl font-bold text-slate-800">32</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-purple-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-xl"><Printer className="size-6 text-purple-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Thiết bị ngoại vi</p>
              <p className="text-2xl font-bold text-slate-800">85</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-red-500 bg-red-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl"><Cpu className="size-6 text-red-600" /></div>
            <div>
              <p className="text-sm font-medium text-red-600">Đang hỏng/bảo trì</p>
              <p className="text-2xl font-bold text-red-700">12</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b flex items-center justify-between bg-slate-50/80 rounded-t-xl">
          <div className="flex gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm mã thiết bị, tên..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 w-64 bg-white"
              />
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            </div>
            <select title="Chọn vị trí" aria-label="Chọn vị trí" className="px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 bg-white">
              <option>Tất cả vị trí</option>
              <option>Trung tâm điều hành</option>
              <option>Hạt QLĐB Nội Bài</option>
            </select>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-white">
            <Download className="size-4" />
            Xuất Excel
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {dsThietBi.map(item => (
            <div key={item.id} className="border border-slate-100 shadow-sm rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all bg-white group cursor-pointer relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  {getIcon(item.type)}
                </div>
                {getStatusBadge(item.status)}
              </div>
              
              <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
              <p className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded inline-block mb-3">{item.id}</p>
              
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building className="size-3.5 text-slate-400" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="size-3.5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold">U</div>
                  <span>{item.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t flex justify-center text-sm text-slate-500">
          Đang hiển thị 5 trên 241 thiết bị
        </div>
      </Card>
    </div>
  );
}
