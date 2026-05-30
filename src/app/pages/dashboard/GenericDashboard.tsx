import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { DASHBOARD_ROUTES_CONFIG } from "./dashboardData";
import { Card, CardContent } from "../../components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, Filter, Download, Activity, FileText } from "lucide-react";
import { Button } from "../../components/ui/button";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function GenericDashboard() {
  const location = useLocation();
  const config = DASHBOARD_ROUTES_CONFIG[location.pathname];

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-slate-500">
        <Activity className="size-12 mb-4 opacity-20" />
        <h2 className="text-xl font-bold">Chưa có dữ liệu cấu hình</h2>
        <p className="text-sm">Vui lòng cập nhật DASHBOARD_ROUTES_CONFIG cho đường dẫn {location.pathname}</p>
      </div>
    );
  }

  const renderTrendIcon = (trend?: string) => {
    if (trend === "up") return <ArrowUpRight className="size-3.5 text-emerald-500" />;
    if (trend === "down") return <ArrowDownRight className="size-3.5 text-red-500" />;
    if (trend === "neutral") return <Minus className="size-3.5 text-slate-400" />;
    return null;
  };

  const renderChart = () => {
    switch (config.chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={config.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={config.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={config.chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {config.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12 font-sans antialiased text-[#020817]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 flex-shrink-0">
            <Activity className="size-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">{config.title}</h1>
            <p className="text-[13px] text-slate-500 font-medium mt-1 leading-relaxed max-w-3xl">
              {config.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 px-4 text-[13px] font-semibold border-slate-200 hover:bg-slate-50 gap-2">
            <Filter className="size-4" /> Bộ lọc
          </Button>
          <Button className="h-9 px-4 text-[13px] font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Download className="size-4" /> Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.kpis.map((kpi, index) => (
          <Card key={index} className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <p className="text-[13px] font-semibold text-slate-500 mb-2">{kpi.label}</p>
              <div className="flex items-end justify-between mt-auto">
                <h3 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{kpi.value}</h3>
                {kpi.trendValue && (
                  <div className={`flex items-center gap-1 text-[12px] font-semibold ${
                    kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-500' : 'text-slate-500'
                  }`}>
                    {renderTrendIcon(kpi.trend)}
                    {kpi.trendValue}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <Card className="lg:col-span-1 bg-white border-slate-200 shadow-sm rounded-xl">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-[14px] font-bold text-slate-800">Biểu đồ phân tích</h2>
          </div>
          <CardContent className="p-5 pt-8">
            {renderChart()}
          </CardContent>
        </Card>

        {/* Data Table Area */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
              <FileText className="size-4 text-slate-500" /> Bảng số liệu chi tiết
            </h2>
            <span className="text-[12px] font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
              Tổng số: {config.tableData.length} bản ghi
            </span>
          </div>
          <div className="overflow-x-auto flex-1 p-0">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  {config.tableHeaders.map((header, idx) => (
                    <th key={idx} className="px-5 py-4 font-bold whitespace-nowrap">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {config.tableData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-blue-50/30 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className={`px-5 py-4 ${cellIdx === 0 ? 'font-semibold text-slate-900' : 'text-slate-600 font-medium'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
