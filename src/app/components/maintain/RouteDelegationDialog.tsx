import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Search, Save, X, Route, Route as RouteIcon, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/badge";

export interface DelegationRecord {
  id: string;
  assigneeType: "Đơn vị" | "Cá nhân";
  assigneeName: string;
  role: "Đơn vị quản lý" | "Tuần đường" | "Tuần kiểm" | "Tuần đèn" | "Tuần sông";
  assignedRoutes: string[];
}

interface RouteDelegationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (record: Partial<DelegationRecord>) => void;
  item?: DelegationRecord | null;
}

// Danh sách tuyến mẫu để gán quyền
const MOCK_ROUTES_POOL = [
  { id: "R-01", name: "Quốc lộ 1A", type: "Đường bộ" },
  { id: "R-02", name: "Quốc lộ 5", type: "Đường bộ" },
  { id: "R-03", name: "Quốc lộ 32", type: "Đường bộ" },
  { id: "R-04", name: "Vành đai 2", type: "Đường bộ" },
  { id: "R-05", name: "Vành đai 3", type: "Đường bộ" },
  { id: "R-06", name: "Đại lộ Thăng Long", type: "Đường bộ" },
  { id: "B-01", name: "Cầu Vĩnh Tuy", type: "Cầu" },
  { id: "B-02", name: "Cầu Thanh Trì", type: "Cầu" },
  { id: "W-01", name: "Sông Hồng", type: "Đường thuỷ" },
  { id: "W-02", name: "Sông Đuống", type: "Đường thuỷ" },
];

export function RouteDelegationDialog({ open, onOpenChange, onSave, item }: RouteDelegationDialogProps) {
  const isEdit = !!item;
  
  const [formData, setFormData] = useState<Partial<DelegationRecord>>(item || { 
    assigneeType: "Cá nhân",
    role: "Tuần đường",
    assignedRoutes: []
  });
  const [routeSearch, setRouteSearch] = useState("");

  React.useEffect(() => {
    if (open) {
      setFormData(item || { assigneeType: "Cá nhân", role: "Tuần đường", assignedRoutes: [] });
      setRouteSearch("");
    }
  }, [open, item]);

  const filteredRoutes = MOCK_ROUTES_POOL.filter(r => 
    r.name.toLowerCase().includes(routeSearch.toLowerCase()) || 
    r.type.toLowerCase().includes(routeSearch.toLowerCase())
  );

  const toggleRoute = (routeName: string) => {
    const current = formData.assignedRoutes || [];
    if (current.includes(routeName)) {
      setFormData({ ...formData, assignedRoutes: current.filter(r => r !== routeName) });
    } else {
      setFormData({ ...formData, assignedRoutes: [...current, routeName] });
    }
  };

  const selectAll = () => {
    const allFiltered = filteredRoutes.map(r => r.name);
    const set = new Set([...(formData.assignedRoutes || []), ...allFiltered]);
    setFormData({ ...formData, assignedRoutes: Array.from(set) });
  };

  const deselectAll = () => {
    const allFiltered = filteredRoutes.map(r => r.name);
    setFormData({ ...formData, assignedRoutes: (formData.assignedRoutes || []).filter(r => !allFiltered.includes(r)) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-50 flex flex-col p-0 overflow-hidden shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-lg shrink-0">
              <ShieldCheck className="size-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {isEdit ? "Cập nhật Phân quyền Tuyến đường" : "Thiết lập Phân quyền Tuyến đường"}
              </DialogTitle>
              <p className="text-sm text-slate-500 mt-1">Phân định phạm vi quản lý cho Đơn vị và Nhân viên tuần tra/tuần kiểm.</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Left pane: Assignee Form */}
          <div className="w-[320px] bg-white border-r border-slate-200 p-6 flex flex-col gap-5 shrink-0 z-10 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500">1</span> 
              Đối tượng phân quyền
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Loại phân cấp</label>
                <Select value={formData.assigneeType} onValueChange={(v: any) => setFormData({ ...formData, assigneeType: v, role: v === "Đơn vị" ? "Đơn vị quản lý" : "Tuần đường" })}>
                  <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đơn vị">Đơn vị (Hạt QLĐB, Công ty)</SelectItem>
                    <SelectItem value="Cá nhân">Cá nhân (Nhân sự)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Vai trò / Chuyên môn</label>
                <Select value={formData.role} onValueChange={(v: any) => setFormData({ ...formData, role: v })}>
                  <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {formData.assigneeType === "Đơn vị" ? (
                      <SelectItem value="Đơn vị quản lý">Đơn vị Quản lý tài sản</SelectItem>
                    ) : (
                      <>
                        <SelectItem value="Tuần đường">Tuần đường (Đường bộ)</SelectItem>
                        <SelectItem value="Tuần kiểm">Tuần kiểm (Cơ quan QLNN)</SelectItem>
                        <SelectItem value="Tuần đèn">Tuần đèn (Tín hiệu / VMS)</SelectItem>
                        <SelectItem value="Tuần sông">Tuần sông (Đường thuỷ)</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Tên Đơn vị / Cá nhân (*)</label>
                <Input 
                  placeholder={formData.assigneeType === "Đơn vị" ? "VD: Hạt QLĐB 1" : "VD: Nguyễn Văn A"} 
                  value={formData.assigneeName || ""} 
                  onChange={e => setFormData({ ...formData, assigneeName: e.target.value })}
                  className="bg-white border-blue-200 focus-visible:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-2">Đã chọn:</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-blue-600 leading-none">{(formData.assignedRoutes || []).length}</span>
                <span className="text-sm text-slate-500 font-medium pb-1">tuyến đường</span>
              </div>
            </div>
          </div>

          {/* Right pane: Route Selection checklist */}
          <div className="flex-1 flex flex-col bg-slate-50/50">
            <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500">2</span> 
                Danh sách Tuyến quản lý
              </h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input 
                  placeholder="Tìm theo tên tuyến..." 
                  className="pl-9 h-9 text-sm"
                  value={routeSearch}
                  onChange={e => setRouteSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="px-4 py-2 flex items-center justify-between bg-slate-100/50 border-b border-slate-200 shrink-0">
              <p className="text-xs font-semibold text-slate-500">Tìm thấy {filteredRoutes.length} kết quả</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={selectAll} className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold">Chọn tất cả</Button>
                <div className="w-px h-4 bg-slate-300 self-center" />
                <Button variant="ghost" size="sm" onClick={deselectAll} className="h-7 text-xs text-slate-500 hover:text-slate-700">Bỏ chọn lưới này</Button>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredRoutes.map((route) => {
                    const isSelected = (formData.assignedRoutes || []).includes(route.name);
                    return (
                      <div 
                        key={route.id} 
                        onClick={() => toggleRoute(route.name)}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-blue-50 border-blue-300 shadow-[0_2px_10px_rgba(59,130,246,0.1)]" 
                            : "bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className={`mt-0.5 flex items-center justify-center size-5 shrink-0 rounded border ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                          {isSelected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-bold truncate ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>{route.name}</p>
                          <Badge variant="outline" className={`mt-1 text-[10px] uppercase font-bold border-none px-0 ${
                            route.type === 'Đường bộ' ? 'text-blue-500' : 
                            route.type === 'Cầu' ? 'text-emerald-500' : 
                            'text-cyan-500'
                          }`}>
                            {route.type}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {filteredRoutes.length === 0 && (
                  <div className="text-center py-10 text-slate-400">
                    <RouteIcon className="size-10 mx-auto mb-3 opacity-20" />
                    <p>Không tìm thấy tuyến đường nào.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="p-5 border-t bg-white gap-3 z-20">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 px-8 text-slate-600 bg-slate-50">
            Hủy bỏ
          </Button>
          <Button onClick={() => onSave(formData)} disabled={!formData.assigneeName || formData.assignedRoutes?.length === 0} className="h-10 px-10 bg-blue-600 hover:bg-blue-700 font-bold shadow-md">
            <Save className="mr-2 size-4" />
            Lưu Ủy quyền
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
