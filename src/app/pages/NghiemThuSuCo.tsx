import { useState } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export default function NghiemThuSuCo() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nghiệm thu Sự cố & Bảo trì</h1>
          <p className="text-muted-foreground mt-1">
            Tuần kiểm thẩm định kết quả thi công khắc phục sự cố tại hiện trường
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <div>
            <CardTitle className="text-lg">Danh sách Chờ Nghiệm thu</CardTitle>
            <CardDescription className="mt-1">Hiển thị các sự cố/ticket đã được nhà thầu báo cáo hoàn thành thi công.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Mã sự cố, Tên tuyến..."
                className="w-64 bg-background rounded-md border border-input pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Bộ lọc</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b text-slate-600 font-medium">
                <tr>
                  <th className="px-4 py-3">Mã Ticket</th>
                  <th className="px-4 py-3">Phân loại</th>
                  <th className="px-4 py-3">Vị trí (Lý trình)</th>
                  <th className="px-4 py-3">Đơn vị thi công</th>
                  <th className="px-4 py-3">Ngày báo cáo xong</th>
                  <th className="px-4 py-3">Đánh giá rủi ro</th>
                  <th className="px-4 py-3 text-right">Thao tác (Tuần kiểm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: "SC-2604-019", type: "Hư hỏng mặt đường (Ổ gà)", location: "Km12+400 Đại lộ Thăng Long", contractor: "Công ty CP CTGT Hà Nội", date: "11/04/2026", risk: "Nghiêm trọng", status: "pending" },
                  { id: "SC-2604-025", type: "Gãy hộ lan tôn lượn sóng", location: "QL32 Nút giao Tây Mỗ", contractor: "Công ty CP ĐT PTHT", date: "11/04/2026", risk: "Khẩn cấp", status: "pending" },
                  { id: "SC-2604-041", type: "Mất nắp hố ga", location: "Vành đại 3 trên cao", contractor: "Công ty Thoát nước HN", date: "10/04/2026", risk: "Thông thường", status: "pending" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer">{item.id}</td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3 text-slate-600">{item.location}</td>
                    <td className="px-4 py-3">{item.contractor}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        item.risk === 'Khẩn cấp' ? 'text-red-600 border-red-200 bg-red-50' :
                        item.risk === 'Nghiêm trọng' ? 'text-amber-600 border-amber-200 bg-amber-50' : ''
                      }>
                        {item.risk}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="h-4 w-4 mr-1.5 text-slate-500" />
                          Hồ sơ
                        </Button>
                        <Button variant="default" size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle className="h-4 w-4 mr-1.5" />
                          Duyệt
                        </Button>
                        <Button variant="destructive" size="sm" className="h-8 bg-red-50 text-red-600 hover:bg-red-100 border-red-200 border">
                          <XCircle className="h-4 w-4 mr-1.5" />
                          Từ chối
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
            <div>Hiển thị 1 - 3 trong số 12 ticket chờ duyệt</div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Trước</Button>
              <Button variant="outline" size="sm">Tiếp</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Preview Section */}
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Chi tiết Hồ sơ Nghiệm thu: <span className="text-emerald-700">SC-2604-019</span>
              </CardTitle>
              <CardDescription className="mt-1">
                Khu vực: Khắc phục ổ gà 1.5m2 mặt đường nhựa
              </CardDescription>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Chờ Tuần kiểm phê duyệt</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-slate-500 flex items-center"><ImageIcon className="w-4 h-4 mr-2" /> Bằng chứng điện tử (Trước / Sau)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-slate-100 aspect-video relative flex items-center justify-center overflow-hidden">
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">Trước khi thi công (11:05 10/04/2026)</span>
                  <ImageIcon className="h-8 w-8 text-slate-400" />
                </div>
                <div className="rounded-lg border bg-emerald-50 aspect-video relative flex items-center justify-center overflow-hidden">
                  <span className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">Kết quả hoàn thành (16:30 11/04/2026)</span>
                  <ImageIcon className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-sm text-slate-500 flex items-center"><FileText className="w-4 h-4 mr-2" /> Thông tin xác thực (Blockchain/Log)</h3>
              <div className="bg-slate-50 p-4 rounded-lg border space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Tọa độ chốt nghiệm thu:</span>
                  <span className="font-mono text-xs">21.01254, 105.78912 (Lệch 2m so với lúc báo hỏng)</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Khối lượng thanh toán đoạn:</span>
                  <span className="font-medium">1.5 m² (Thảm betong nhựa nóng)</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">Thời gian SLA xử lý:</span>
                  <span className="font-medium text-emerald-600">Đạt (Trong vòng 36 giờ)</span>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button variant="outline" className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100"><XCircle className="w-4 h-4 mr-2" /> Trả hồ sơ (Reject)</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700"><CheckCircle className="w-4 h-4 mr-2" /> Nghiệm thu & Chuyển trạng thái Closed</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
