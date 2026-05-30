import React from "react";
import { Activity, ArrowUpRight, ArrowDownRight, Server, ShieldCheck, Clock, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const MOCK_STATS = [
  { title: "Tổng số Requests (24h)", value: "1.2M", change: "+12.5%", trend: "up", icon: Activity, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { title: "Dịch vụ đang hoạt động", value: "24/25", change: "96%", trend: "up", icon: Server, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { title: "Tỷ lệ lỗi (Error Rate)", value: "0.02%", change: "-0.01%", trend: "down", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  { title: "Độ trễ trung bình", value: "124ms", change: "+5ms", trend: "up", icon: Clock, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
];

const MOCK_STATUS = [
  { id: "SRV.01", name: "Dịch vụ tổng hợp tài sản", uptime: "99.99%", latency: "45ms", status: "Online", lastChecked: "Vừa xong", reqCount: "450K" },
  { id: "SRV.02", name: "Dịch vụ chi tiết tài sản", uptime: "99.95%", latency: "120ms", status: "Online", lastChecked: "Vừa xong", reqCount: "320K" },
  { id: "SRV.03", name: "API Cập nhật lịch bảo trì", uptime: "85.50%", latency: "-", status: "Offline", lastChecked: "5 phút trước", reqCount: "12K" },
  { id: "SRV.04", name: "Dịch vụ tiếp nhận yêu cầu", uptime: "99.90%", latency: "210ms", status: "Online", lastChecked: "Vừa xong", reqCount: "418K" },
];

export default function GiamSatDichVu() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#020817] font-sans antialiased">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <Activity className="size-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#020817]">Giám sát tình trạng dịch vụ</h1>
            <p className="text-[12px] text-slate-500 font-medium">Theo dõi hoạt động, độ trễ và tỷ lệ lỗi của các API thời gian thực</p>
          </div>
        </div>
        <Button variant="outline" className="h-9 px-4 text-[13px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50 gap-1.5 flex items-center">
          <RefreshCw className="size-4" /> Làm mới dữ liệu
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat, index) => (
          <Card key={index} className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-[12.5px] font-semibold text-slate-500">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
                    <div className={`flex items-center text-[11px] font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {stat.change}
                    </div>
                  </div>
                </div>
                <div className={`size-10 rounded-lg ${stat.bg} flex items-center justify-center border ${stat.border}`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Table */}
      <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-[14px] font-semibold text-[#020817]">Chi tiết trạng thái dịch vụ</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="px-5 py-3.5 font-semibold">Tên dịch vụ</th>
                <th className="px-5 py-3.5 font-semibold">Uptime (30 ngày)</th>
                <th className="px-5 py-3.5 font-semibold">Độ trễ trung bình</th>
                <th className="px-5 py-3.5 font-semibold">Số Requests</th>
                <th className="px-5 py-3.5 font-semibold">Kiểm tra cuối</th>
                <th className="px-5 py-3.5 font-semibold text-right">Trạng thái (Ping)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STATUS.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">{service.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{service.id}</div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{service.uptime}</td>
                  <td className="px-5 py-4 font-mono text-slate-600">{service.latency}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{service.reqCount}</td>
                  <td className="px-5 py-4 text-slate-500">{service.lastChecked}</td>
                  <td className="px-5 py-4 text-right">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border ${
                      service.status === 'Online' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {service.status === 'Online' ? <CheckCircle className="size-3.5" /> : <AlertCircle className="size-3.5" />}
                      {service.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
