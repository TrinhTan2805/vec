import { useState } from "react";
import { Save, Settings, Server, Bell, Globe, Key, Database, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function SystemConfig() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cấu hình Hệ thống & Tích hợp</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý tham số hệ thống chung, API Gateway kết nối IOC và các kênh thông báo.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <Button 
            variant={activeTab === "general" ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => setActiveTab("general")}
          >
            <Settings className="h-4 w-4 mr-2" /> Cấu hình Chung
          </Button>
          <Button 
            variant={activeTab === "api" ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => setActiveTab("api")}
          >
            <Server className="h-4 w-4 mr-2" /> Tích hợp API (Gateway)
          </Button>
          <Button 
            variant={activeTab === "notif" ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => setActiveTab("notif")}
          >
            <Bell className="h-4 w-4 mr-2" /> Kênh Thông báo
          </Button>
          <Button 
            variant={activeTab === "backup" ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => setActiveTab("backup")}
          >
            <Database className="h-4 w-4 mr-2" /> Dữ liệu & Backup
          </Button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>Cấu hình Hệ thống Chung</CardTitle>
                <CardDescription>Các thông số cơ bản hoạt động của phần mềm quản lý KCHT.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tên Hệ thống hiển thị</label>
                      <input title="Tên Hệ thống hiển thị" type="text" defaultValue="Quản lý KCHT VEC" className="w-full bg-background rounded-md border border-input px-3 py-2 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mã Tỉnh/Thành phố (Mặc định)</label>
                      <input title="Mã Tỉnh/Thành phố" type="text" defaultValue="01 (Hà Nội)" disabled className="w-full bg-slate-100 rounded-md border border-input px-3 py-2 text-sm" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quy định SLA Xử lý Khẩn cấp (Giờ)</label>
                    <input title="Quy định SLA" type="number" defaultValue="2" className="w-full bg-background rounded-md border border-input px-3 py-2 text-sm" />
                    <p className="text-xs text-muted-foreground">Thời gian tối đa để bắt đầu xử lý sự cố cấp độ "Khẩn cấp" trước khi bị đánh dấu vi phạm SLA.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      Bật/Tắt Chế độ Offline (Mobile App)
                      <input type="checkbox" defaultChecked className="toggle" />
                    </label>
                    <p className="text-xs text-muted-foreground">Cho phép Tuần đường viên lưu tạm phiếu check-in và sự cố khi mất sóng 4G/5G.</p>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t">
                  <Button><Save className="w-4 h-4 mr-2" /> Lưu thay đổi</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "api" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-blue-600"/> API Gateway & Tích hợp IOC</CardTitle>
                <CardDescription>Quản lý các endpoints kết nối liên thông dữ liệu ra hệ thống bên ngoài.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4 space-y-4 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Kết nối Cổng Thông tin Giao Thông TP (IOC)</h4>
                      <p className="text-xs text-slate-500 mt-1">Đẩy dữ liệu Phân luồng & Sự cố lớn tự động về IOC thành phố.</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-700">Đang Kết nối</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500">Endpoint URL</label>
                      <input title="URL" type="text" defaultValue="https://ioc-hanoi.gov.vn/api/v1/traffic-sync" className="w-full bg-background rounded border px-3 py-2 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500">Bearer Token / API Key</label>
                      <div className="flex">
                        <input title="Token Key" type="password" defaultValue="************************" className="w-full bg-background rounded-l border px-3 py-2 text-sm" />
                        <Button variant="outline" className="rounded-l-none border-l-0"><Key className="w-4 h-4 text-slate-500"/></Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm"><RefreshCw className="w-3 h-3 mr-2"/> Test Connection</Button>
                    <Button size="sm">Cập nhật Key</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Kênh VOV Giao Thông (Webhook)</h4>
                      <p className="text-xs text-slate-500 mt-1">Bắn tín hiệu các điểm ùn tắc và sự cố rào chắn đường.</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">Đã tắt</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notif" && (
            <Card>
              <CardHeader>
                <CardTitle>Cấu hình Kênh Thông báo</CardTitle>
                <CardDescription>Thiết lập thông số máy chủ gửi Mail (SMTP) và SMS Brandname.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-center py-12 text-slate-500">
                <Bell className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p>Nội dung cấu hình SMTP Server / SMS / Zalo ZNS đang được phát triển.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "backup" && (
            <Card>
              <CardHeader>
                <CardTitle>Đồng bộ & Lưu trữ Dữ liệu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center py-12 text-slate-500">
                <Database className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p>Tính năng yêu cầu quyền Super Admin cấp rễ.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
