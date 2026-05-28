import React from "react";
import { Download, Printer, Filter } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function ReportDanhSachTuyenDuong() {
  const MOCK_DATA = [
    { stt: 1, ten: "ĐT.414C", dau: "Km0+00", cuoi: "Km8+350", donvi: "Công ty khác", quan: "Ba Vì", dai: "8350", rongTb: "5", rongPb: "5", soLan: 1, ngaySuDung: "2021", xepHang: "", dienTich: "41750" },
    { stt: 2, ten: "ĐT.411B", dau: "Giao ĐT. 411 (Xã Vạn Thắng - Ba Vì)", cuoi: "Giao đường đê (Xã Tản Hồng - Ba Vì)", donvi: "Đội QLGT số 1", quan: "Ba Vì", dai: "4600", rongTb: "7,15", rongPb: "5,5", soLan: 4, ngaySuDung: "2021", xepHang: "", dienTich: "32900" },
    { stt: 3, ten: "TIỀN PHONG - THỤY AN", dau: "Km0+00", cuoi: "Km4+800", donvi: "Đội QLGT số 1", quan: "Ba Vì", dai: "4800", rongTb: "9", rongPb: "9", soLan: 1, ngaySuDung: "2021", xepHang: "", dienTich: "15300" },
    { stt: 4, ten: "ĐT.412B", dau: "Km0+00", cuoi: "Km4+00", donvi: "Đội QLGT số 2", quan: "Ba Vì", dai: "4000", rongTb: "5,82", rongPb: "5,5", soLan: 3, ngaySuDung: "2021", xepHang: "", dienTich: "23300" },
    { stt: 5, ten: "ĐT.413-BV", dau: "Km5+000", cuoi: "Km23+300", donvi: "Đội QLGT số 1", quan: "Ba Vì", dai: "18300", rongTb: "6", rongPb: "6", soLan: 3, ngaySuDung: "2021", xepHang: "", dienTich: "109800" },
    { stt: 6, ten: "ĐT.411", dau: "Giao km57+250 QL32 xã Đồng Thái", cuoi: "Giao đê Sông Hồng Xã Cổ Đô", donvi: "Đội QLGT số 1", quan: "Ba Vì", dai: "7500", rongTb: "10", rongPb: "10", soLan: 1, ngaySuDung: "2021", xepHang: "", dienTich: "75000" },
    { stt: 7, ten: "ĐT.412", dau: "Km0+00", cuoi: "Km5+500", donvi: "Công ty khác", quan: "Ba Vì", dai: "5500", rongTb: "12,1", rongPb: "11", soLan: 2, ngaySuDung: "2021", xepHang: "", dienTich: "66548" },
    { stt: 8, ten: "ĐT.411C", dau: "Km0+00", cuoi: "Km6+00", donvi: "Đội QLGT số 1", quan: "Ba Vì", dai: "6000", rongTb: "10", rongPb: "10", soLan: 1, ngaySuDung: "2021", xepHang: "", dienTich: "60000" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm sticky left-0 z-20">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase">Danh sách Tuyến đường</h3>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-10 hover:bg-slate-100"><Printer className="mr-2 size-4" /> In báo cáo</Button>
            <Button className="h-10 bg-green-600 hover:bg-green-700 text-white"><Download className="mr-2 size-4" /> Tải về Excel</Button>
          </div>
        </CardHeader>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 bg-slate-50/80 px-8 py-3 border-b border-slate-200 sticky top-0 left-0 z-10 w-full backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Thời gian:</label>
            <select aria-label="Bộ lọc" title="Bộ lọc" className="h-9 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
              <option>Quý 4/2025</option>
              <option>Quý 3/2025</option>
              <option>Quý 2/2025</option>
              <option>Năm 2025</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Đơn vị quản lý:</label>
            <select aria-label="Bộ lọc" title="Bộ lọc" className="h-9 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[200px]">
              <option>Tất cả đơn vị</option>
              <option>Đội QLGT số 1</option>
              <option>Đội QLGT số 2</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Tuyến đường:</label>
            <input type="text" placeholder="Nhập tên tuyến đường..." className="h-9 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[200px]" />
          </div>
          <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white ml-2">
            <Filter className="mr-2 size-4" /> Tra cứu
          </Button>
        </div>

        <CardContent className="p-0 bg-slate-100 overflow-auto max-h-[800px]">
          <div className="min-w-[1500px] max-w-[1800px] mx-auto bg-white p-12 m-8 font-serif text-[13px] shadow-sm border border-slate-200">
            {/* Report Header */}
            <div className="flex flex-col text-left mb-8">
              <p className="font-bold text-[16px] uppercase m-0 leading-tight">SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
              <p className="font-bold text-[16px] uppercase m-0 leading-tight">BAN DUY TU CÁC CÔNG TRÌNH HẠ TẦNG GIAO THÔNG</p>
            </div>
            
            <div className="text-center mb-10 w-full max-w-4xl mx-auto items-center flex flex-col">
              <h2 className="text-[24px] font-bold m-0 uppercase mb-2">TỔNG HỢP CÁC TUYẾN ĐƯỜNG QUẢN LÝ</h2>
              <p className="text-[14px] m-0">Quận, huyện: Tất cả</p>
              <p className="text-[14px] m-0">Đơn vị bảo trì: Tất cả</p>
              <p className="text-[14px] m-0 italic">Từ ngày 01/01/2025 đến ngày 31/12/2025</p>
            </div>

            {/* Main Data Table */}
            <table className="w-full border-collapse border border-black text-center text-[12px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-black p-2 w-10 font-bold">STT</th>
                  <th className="border border-black p-2 w-48 font-bold">Tên đường</th>
                  <th className="border border-black p-2 w-40 font-bold">Điểm đầu</th>
                  <th className="border border-black p-2 w-40 font-bold">Điểm cuối</th>
                  <th className="border border-black p-2 w-48 font-bold">Đơn vị quản lý</th>
                  <th className="border border-black p-2 w-32 font-bold">Quận huyện</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều dài (m)</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều rộng trung bình(m)</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều rộng phổ biến(m)</th>
                  <th className="border border-black p-2 w-20 font-bold">Số lần thay đổi mặt cắt</th>
                  <th className="border border-black p-2 w-24 font-bold">Ngày sử dụng</th>
                  <th className="border border-black p-2 w-24 font-bold">Xếp hạng đường</th>
                  <th className="border border-black p-2 w-32 font-bold">Diện tích mặt đường(m2)</th>
                </tr>
              </thead>
              <tbody className="normal-case">
                {MOCK_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 h-[36px]">
                    <td className="border border-black p-2">{row.stt}</td>
                    <td className="border border-black p-2 text-left">{row.ten}</td>
                    <td className="border border-black p-2 text-left">{row.dau}</td>
                    <td className="border border-black p-2 text-left">{row.cuoi}</td>
                    <td className="border border-black p-2 text-left">{row.donvi}</td>
                    <td className="border border-black p-2 text-left">{row.quan}</td>
                    <td className="border border-black p-2 text-right">{row.dai}</td>
                    <td className="border border-black p-2 text-right">{row.rongTb}</td>
                    <td className="border border-black p-2 text-right">{row.rongPb}</td>
                    <td className="border border-black p-2 bg-blue-50/50">{row.soLan}</td>
                    <td className="border border-black p-2">{row.ngaySuDung}</td>
                    <td className="border border-black p-2">{row.xepHang}</td>
                    <td className="border border-black p-2 text-right font-semibold">{row.dienTich}</td>
                  </tr>
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <tr key={`blank-${i}`} className="h-8 hover:bg-slate-50">
                    {Array.from({ length: 13 }).map((_, j) => (
                      <td key={`cell-${i}-${j}`} className="border border-black"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
