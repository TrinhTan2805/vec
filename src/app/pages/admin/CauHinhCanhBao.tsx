import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Bell, Plus, Settings2, ShieldAlert, Wrench, Search, Edit3, Trash2, CheckCircle2 } from "lucide-react";

export default function CauHinhCanhBao() {
  const [activeTab, setActiveTab] = useState('bao-tri');

  const ruleBaoTri = [
    { id: "R-001", asset: "Mặt đường", condition: "Chu kỳ 12 tháng", threshold: "Trước 30 ngày", target: "Phòng Kỹ thuật, Hạt QLĐB", status: "active" },
    { id: "R-002", asset: "Cầu lớn", condition: "Chu kỳ 6 tháng", threshold: "Trước 15 ngày", target: "Phòng Kỹ thuật", status: "active" },
    { id: "R-003", asset: "Biển báo hiệu", condition: "Khi bị mờ/phản quang yếu", threshold: "Ngay lập tức", target: "Hạt QLĐB", status: "inactive" },
    { id: "R-004", asset: "Đèn chiếu sáng", condition: "Chu kỳ 3 tháng", threshold: "Trước 7 ngày", target: "Phòng Thiết bị", status: "active" },
  ];

  const ruleThanhLy = [
    { id: "R-101", asset: "Máy tính bàn", condition: "Tuổi thọ > 5 năm", threshold: "Khi hết khấu hao", target: "Phòng Hành chính", status: "active" },
    { id: "R-102", asset: "Phương tiện tuần tra", condition: "Số Km > 200,000", threshold: "Ngay lập tức", target: "Phòng Kỹ thuật", status: "active" },
    { id: "R-103", asset: "Tôn hộ lan", condition: "Bị đâm đụng biến dạng > 50%", threshold: "Khi giám sát viên báo cáo", target: "Hạt QLĐB", status: "active" },
  ];

  const currentRules = activeTab === 'bao-tri' ? ruleBaoTri : ruleThanhLy;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Cấu hình Cảnh báo Tài sản</h1>
          <p className="text-muted-foreground mt-1">Thiết lập quy tắc và điều kiện để hệ thống tự động gửi cảnh báo bảo trì, kiểm tra hoặc thanh lý.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="size-4" /> Thêm quy tắc mới
        </Button>
      </div>

      <div className="flex bg-slate-100 rounded-xl p-1 gap-1 max-w-md">
        <button
          onClick={() => setActiveTab("bao-tri")}
          className={`flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === "bao-tri" ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          <Wrench className="size-4" /> Cảnh báo bảo trì
        </button>
        <button
          onClick={() => setActiveTab("thanh-ly")}
          className={`flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === "thanh-ly" ? "bg-white shadow text-red-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          <ShieldAlert className="size-4" /> Cảnh báo thanh lý
        </button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b flex items-center justify-between bg-slate-50/50 rounded-t-xl">
          <div className="flex gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm quy tắc..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 w-64 bg-white"
              />
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-white text-slate-600">
            <Settings2 className="size-4" /> Cài đặt chung
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã QT</th>
                <th className="px-6 py-4 font-semibold">Loại tài sản</th>
                <th className="px-6 py-4 font-semibold">Điều kiện kích hoạt</th>
                <th className="px-6 py-4 font-semibold">Ngưỡng thông báo</th>
                <th className="px-6 py-4 font-semibold">Phòng ban nhận</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">{rule.id}</td>
                  <td className="px-6 py-4 font-semibold text-blue-700">{rule.asset}</td>
                  <td className="px-6 py-4 text-slate-700">{rule.condition}</td>
                  <td className="px-6 py-4 text-amber-600 font-medium">{rule.threshold}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Bell className="size-3.5 text-slate-400" /> {rule.target}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {rule.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="size-3" /> Đang bật
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        Đang tắt
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                        <Edit3 className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentRules.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              Chưa có cấu hình nào.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
