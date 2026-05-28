import { useState } from "react";
import { Map, Navigation, User, Search, RefreshCw, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export default function RealtimeTracking() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Giám sát Tuần đường Real-time</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi vị trí và quỹ tích đi tuần của nhân viên theo thời gian thực
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Làm mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Danh sách */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader className="pb-3 shrink-0">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Tuần đường viên</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">3 Online</Badge>
              </CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhân viên..."
                  className="w-full bg-background rounded-md border border-input pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              <div className="divide-y">
                {[
                  { name: "Nguyễn Văn A", route: "Tuyến QL32 - Nhổn", status: "Đang di chuyển", time: "Vừa xong", online: true },
                  { name: "Trần Thị B", route: "Vành đai 3 trên cao", status: "Dừng 5p", time: "5 phút trước", online: true },
                  { name: "Lê Văn C", route: "Đại lộ Thăng Long", status: "Mất tín hiệu", time: "15 phút trước", online: false },
                ].map((user, idx) => (
                  <div key={idx} className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${idx === 0 ? 'bg-slate-50 border-l-2 border-l-blue-600' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${user.online ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Navigation className="h-3 w-3" /> {user.route}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={user.online ? (user.status.includes('Dừng') ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-emerald-600 border-emerald-200 bg-emerald-50') : 'text-slate-500'}>
                          {user.status}
                        </Badge>
                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3" /> {user.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)] relative overflow-hidden flex flex-col">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Map className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Bản đồ Giám sát Thời gian thực</h3>
              <p className="text-slate-500 max-w-md">
                Component WebGIS (Leaflet/Mapbox) sẽ được tích hợp tại đây, vẽ quỹ tích `Polyline` dựa trên dữ liệu GPS truyền về qua WebSocket.
              </p>
            </div>
            
            {/* Overlay controls */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border w-64">
              <h4 className="font-medium text-sm mb-3">Lớp dữ liệu (Layers)</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Vị trí hiện tại
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Quỹ tích di chuyển (Hôm nay)
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Tuyến được phân công (Buffer)
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
