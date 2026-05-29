import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function AssetReports() {
  const assetDistribution = [
    { name: 'Đường bộ', value: 3450, color: '#3b82f6' },
    { name: 'Cầu', value: 1240, color: '#10b981' },
    { name: 'Hầm', value: 45, color: '#6366f1' },
    { name: 'Công trình phụ trợ', value: 8500, color: '#8b5cf6' },
    { name: 'Khác', value: 1200, color: '#f59e0b' },
  ];

  const valueDepreciation = [
    { year: '2022', original: 15000, current: 15000 },
    { year: '2023', original: 15500, current: 14200 },
    { year: '2024', original: 16000, current: 13500 },
    { year: '2025', original: 16200, current: 12800 },
    { year: '2026', original: 16500, current: 11500 },
  ];

  const qualityStats = [
    { name: 'Tốt', value: 65, fill: '#10b981' },
    { name: 'Khá', value: 20, fill: '#3b82f6' },
    { name: 'Trung bình', value: 10, fill: '#f59e0b' },
    { name: 'Kém', value: 5, fill: '#ef4444' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Báo cáo & Thống kê tài sản</h1>
          <p className="text-sm text-slate-500">Phân tích chuyên sâu về số lượng, chất lượng và giá trị tài sản hạ tầng</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <Calendar className="size-4 text-indigo-600" />
            <Select defaultValue="2026">
              <SelectTrigger className="w-[120px] border-none bg-transparent h-7 focus:ring-0 px-1 text-sm font-semibold">
                <SelectValue placeholder="Năm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">Năm 2026</SelectItem>
                <SelectItem value="2025">Năm 2025</SelectItem>
                <SelectItem value="2024">Năm 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Download className="size-4" /> Xuất Báo cáo Tổng hợp (PDF)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Phân bổ tài sản */}
        <Card className="border-none shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">Cơ cấu số lượng tài sản</CardTitle>
            <CardDescription>Phân bổ theo nhóm loại hình tài sản</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={assetDistribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {assetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-4">
              {assetDistribution.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Khấu hao giá trị */}
        <Card className="border-none shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">Khấu hao & Biến động Giá trị tài sản (Tỷ VNĐ)</CardTitle>
            <CardDescription>So sánh Nguyên giá (Original) và Giá trị còn lại (Current)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={valueDepreciation} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" name="Nguyên giá" dataKey="original" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" name="Giá trị còn lại" dataKey="current" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trạng thái chất lượng */}
        <Card className="border-none shadow-sm lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-800">Thống kê Chất lượng tài sản hiện tại (%)</CardTitle>
              <CardDescription>Dựa trên kết quả đánh giá kiểm định định kỳ</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2 text-indigo-600 border-indigo-200">
              <FileText className="size-4" /> Báo cáo chi tiết TCVN
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qualityStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 500 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[0, 100]} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                  <Bar dataKey="value" name="Tỷ lệ %" radius={[4, 4, 0, 0]} barSize={60}>
                     {qualityStats.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.fill} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
