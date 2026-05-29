import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calculator, BarChart3, AlertCircle, TrendingDown, Map, ShieldAlert } from "lucide-react";

export default function TcvnAssessment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Đánh giá tình trạng (TCVN/AASHTO)</h1>
          <p className="text-muted-foreground mt-1">
            Chấm điểm tình trạng mặt đường (PCI), độ gồ ghề (IRI) và tình trạng cầu (BCI) theo tiêu chuẩn.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calculator className="size-4" />
            Nhập dữ liệu khảo sát
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <BarChart3 className="size-4" />
            Chạy mô hình tính toán
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="col-span-2 shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <TrendingDown className="size-4 text-indigo-500" />
              Chỉ số tình trạng mặt đường (PCI) - Tuyến Cầu Giẽ - Ninh Bình
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 flex items-end gap-2">
              {/* Dummy Chart Bars */}
              {[
                { v: 85, c: 'h-[85%]' }, { v: 82, c: 'h-[82%]' }, { v: 78, c: 'h-[78%]' },
                { v: 75, c: 'h-[75%]' }, { v: 71, c: 'h-[71%]' }, { v: 68, c: 'h-[68%]' },
                { v: 62, c: 'h-[62%]' }, { v: 58, c: 'h-[58%]' }, { v: 55, c: 'h-[55%]' },
                { v: 45, c: 'h-[45%]' }, { v: 38, c: 'h-[38%]' }, { v: 30, c: 'h-[30%]' }
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end group cursor-pointer">
                  <div className="text-xs font-medium text-slate-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{item.v}</div>
                  <div 
                    className={`w-full rounded-t-sm transition-all group-hover:brightness-110 ${item.c} ${
                      item.v > 70 ? 'bg-emerald-400' : item.v > 50 ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                  ></div>
                  <div className="text-[10px] text-slate-400 mt-2 rotate-45 origin-left whitespace-nowrap">Km {210 + i}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tổng quan tuyến</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-amber-500">62.5</span>
                <span className="text-sm font-medium text-slate-500">/ 100 (Trung bình)</span>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-600 font-medium">Tốt (PCI {'>'} 70)</span>
                    <span className="text-slate-500">45% (32.4 km)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full w-[45%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-amber-600 font-medium">Trung bình (50-70)</span>
                    <span className="text-slate-500">35% (25.2 km)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full w-[35%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-600 font-medium">Kém (PCI {'<'} 50)</span>
                    <span className="text-slate-500">20% (14.4 km)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full w-[20%]"></div></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-red-200 bg-red-50/50">
            <CardContent className="p-4 flex gap-3">
              <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-800">Cảnh báo nghiêm trọng</h4>
                <p className="text-xs text-red-600 mt-1 leading-relaxed">Đoạn Km219-Km221 có chỉ số PCI = 30 (Kém). Độ gồ ghề IRI vượt mức cho phép. Đề xuất: Lập kế hoạch sửa chữa lớn (Cào bóc và thảm lại bê tông nhựa).</p>
                <Button size="sm" variant="outline" className="mt-3 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 h-8 text-xs">
                  Tạo kế hoạch sửa chữa
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
