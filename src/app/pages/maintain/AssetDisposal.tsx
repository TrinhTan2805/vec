import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ClipboardList, Trash2, CheckCircle, ShieldAlert, FileText } from "lucide-react";

export default function AssetDisposal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Kiểm kê & Thanh lý tài sản</h1>
          <p className="text-muted-foreground mt-1">
            Quy trình tạo phiếu kiểm kê thực địa và xử lý thanh lý, thanh hủy tài sản.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            <ClipboardList className="size-4" />
            Lập phiếu kiểm kê
          </Button>
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <Trash2 className="size-4" />
            Tạo Yêu cầu Thanh lý
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-800">Đợt kiểm kê gần đây</CardTitle>
            <ClipboardList className="size-5 text-slate-400" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { name: "Kiểm kê định kỳ Hệ thống Biển báo Q1/2026", date: "15/03/2026", status: "Đã chốt sổ", color: "text-emerald-600 bg-emerald-50" },
                { name: "Kiểm kê vật tư trạm thu phí IC3", date: "28/05/2026", status: "Đang thực hiện", color: "text-blue-600 bg-blue-50" },
                { name: "Kiểm kê đột xuất cáp quang bị cắt trộm", date: "10/05/2026", status: "Chờ duyệt", color: "text-amber-600 bg-amber-50" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-medium text-slate-800">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">Ngày lập: {item.date}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 text-center">
              <Button variant="link" className="text-sm text-blue-600">Xem tất cả lịch sử kiểm kê</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-800">Hồ sơ Thanh lý / Thanh hủy</CardTitle>
            <ShieldAlert className="size-5 text-slate-400" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { name: "Thanh lý 15 Camera PTZ hư hỏng do sét đánh", date: "20/05/2026", type: "Thanh lý", status: "Chờ TGD phê duyệt", color: "text-amber-600 bg-amber-50" },
                { name: "Thanh hủy tôn hộ lan rỉ sét đoạn Km150", date: "05/04/2026", type: "Thanh hủy", status: "Đã phê duyệt", color: "text-emerald-600 bg-emerald-50" },
                { name: "Thanh lý xe bán tải chuyên dụng cũ", date: "12/01/2026", type: "Thanh lý", status: "Hoàn tất", color: "text-slate-600 bg-slate-100" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded">{item.type}</span>
                      <h4 className="text-sm font-medium text-slate-800 truncate max-w-[200px]">{item.name}</h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">Ngày trình: {item.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.color}`}>
                      {item.status}
                    </span>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600"><FileText className="size-4"/></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
