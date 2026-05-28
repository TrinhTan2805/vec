import React from "react";
import { Download, Printer, Filter } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function ReportDanhSachCauLon() {
  const MOCK_DATA = [
    { stt: 1, ten: "Cầu Vĩnh tuy", dau: "Mố M1", cuoi: "Mố M78", donvi: "Xí nghiệp ql cầu Vĩnh Tuy", quan: "Hai Bà Trưng", ttThietKe: "HL93", ttThucTe: "HL93", chieuCao: "6", chieuDai: "3778", rongTb: "21,25", rongPb: "19,8", soLan: 3, ngaySuDung: "2022", xepHang: "", dienTich: "79830" },
    { stt: 2, ten: "Cầu Thanh Trì", dau: "Km163+104", cuoi: "Km166+188", donvi: "XNQL cầu Thanh Trì", quan: "Long Biên", ttThietKe: "", ttThucTe: "", chieuCao: "", chieuDai: "3084", rongTb: "33,1", rongPb: "33,1", soLan: 1, ngaySuDung: "2022", xepHang: "", dienTich: "99596,39844" },
    { stt: 3, ten: "Cầu Chương Dương", dau: "Trần Nhật Duật", cuoi: "Nguyễn Văn cừ", donvi: "Xí nghiệp quản lý cầu Chương Dương", quan: "Long Biên", ttThietKe: "", ttThucTe: "", chieuCao: "", chieuDai: "1210,06", rongTb: "20", rongPb: "20", soLan: 1, ngaySuDung: "2022", xepHang: "", dienTich: "24219,19922" },
    { stt: 4, ten: "Cầu Vượt nút giao thông trung tâm Long Biên", dau: "Km16+165", cuoi: "Km17+877.57", donvi: "Xí nghiệp quản lý cầu Chương Dương", quan: "Long Biên", ttThietKe: "null", ttThucTe: "null", chieuCao: "null", chieuDai: "816,7", rongTb: "26", rongPb: "26", soLan: 1, ngaySuDung: "2022", xepHang: "", dienTich: "21234,20117" },
    { stt: 5, ten: "Cầu Nhật Tân", dau: "Mố A1", cuoi: "Mố A2", donvi: "Xí nghiệp QL cầu Nhật Tân - Đông Trù", quan: "Tây Hồ", ttThietKe: "", ttThucTe: "", chieuCao: "", chieuDai: "3755", rongTb: "33,2", rongPb: "33,2", soLan: 1, ngaySuDung: "2015", xepHang: "", dienTich: "122788,5" },
    { stt: 6, ten: "Cầu Đông Trù", dau: "Đường đầu cầu bờ bắc (huyện Đông Anh)", cuoi: "Đường đầu cầu bờ nam (quận Long Biên)", donvi: "Xí nghiệp QL cầu Nhật Tân - Đông Trù", quan: "Đông Anh", ttThietKe: "", ttThucTe: "", chieuCao: "", chieuDai: "1320", rongTb: "50,17", rongPb: "49", soLan: 5, ngaySuDung: "2014", xepHang: "", dienTich: "61781,5" },
    { stt: 7, ten: "Cầu Thăng Long", dau: "Phạm Văn Đồng (Km3+216)", cuoi: "Võ Văn Kiệt (Km6+433)", donvi: "Xí nghiệp XD và QLHTGT Mê Linh", quan: "Đông Anh", ttThietKe: "", ttThucTe: "", chieuCao: "", chieuDai: "3216", rongTb: "20", rongPb: "20", soLan: 1, ngaySuDung: "2022", xepHang: "", dienTich: "64320" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm sticky left-0 z-20">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase">Danh sách Cầu lớn</h3>
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
              <option>Xí nghiệp QL cầu Nhật Tân</option>
              <option>Xí nghiệp QL cầu Vĩnh Tuy</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Tuyến đường:</label>
            <input type="text" placeholder="Nhập tên cầu/đường..." className="h-9 rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[200px]" />
          </div>
          <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white ml-2">
            <Filter className="mr-2 size-4" /> Tra cứu
          </Button>
        </div>

        <CardContent className="p-0 bg-slate-100 overflow-auto max-h-[800px]">
          <div className="min-w-[1700px] max-w-[2000px] mx-auto bg-white p-12 m-8 font-serif text-[13px] shadow-sm border border-slate-200">
            {/* Report Header */}
            <div className="flex flex-col text-center mb-8">
              <p className="font-bold text-[16px] uppercase m-0 leading-tight">SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
              <p className="font-bold text-[16px] uppercase m-0 leading-tight">BAN DUY TU CÁC CÔNG TRÌNH HẠ TẦNG GIAO THÔNG</p>
            </div>
            
            <div className="text-center mb-10 w-full max-w-4xl mx-auto items-center flex flex-col">
              <h2 className="text-[24px] font-bold m-0 uppercase mb-2">TỔNG HỢP DANH SÁCH CẦU LỚN QUẢN LÝ</h2>
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
                  <th className="border border-black p-2 w-24 font-bold">Tải trọng thiết kế<br/>(tấn)</th>
                  <th className="border border-black p-2 w-24 font-bold">Tải trọng thực tế<br/>(tấn)</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều cao hạn chế<br/>(m)</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều dài(m)</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều rộng trung bình(m)</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều rộng phổ biến(m)</th>
                  <th className="border border-black p-2 w-20 font-bold">Số lần thay đổi mặt cắt</th>
                  <th className="border border-black p-2 w-24 font-bold">Ngày sử dụng</th>
                  <th className="border border-black p-2 w-24 font-bold">Xếp hạng đường</th>
                  <th className="border border-black p-2 w-24 font-bold">Diện tích mặt đường(m2)</th>
                </tr>
              </thead>
              <tbody className="normal-case">
                {MOCK_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 h-10">
                    <td className="border border-black p-2">{row.stt}</td>
                    <td className="border border-black p-2 text-left">{row.ten}</td>
                    <td className="border border-black p-2 text-left">{row.dau}</td>
                    <td className="border border-black p-2 text-left">{row.cuoi}</td>
                    <td className="border border-black p-2 text-left">{row.donvi}</td>
                    <td className="border border-black p-2 text-left">{row.quan}</td>
                    <td className="border border-black p-2">{row.ttThietKe}</td>
                    <td className="border border-black p-2">{row.ttThucTe}</td>
                    <td className="border border-black p-2">{row.chieuCao}</td>
                    <td className="border border-black p-2 text-right">{row.chieuDai}</td>
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
                    {Array.from({ length: 16 }).map((_, j) => (
                      <td key={`cell-${i}-${j}`} className="border border-black"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Note Section */}
            <div className="mt-4 text-sm italic w-[400px]">
              <p className="font-bold underline mb-1 not-italic">Ghi chú:</p>
              <p className="mb-1">- Chiều rộng trung bình: Chiều rộng trung bình của cả đoạn đường.</p>
              <p className="mb-1">- Chiều rộng phổ biến: Là chiều rộng có chiều dài dài nhất trong các mặt cắt.</p>
              <p className="mb-1">- Số lần thay đổi mặt cắt: Số lần thay đổi chiều rộng trên đoạn đường.</p>
              <p className="mb-1">- Xếp hạng đường: Xếp hạng theo 2 tiêu chí cấp đường và bậc đường.</p>
              <p className="mb-1">- Diện tích mặt đường không tính diện tích dải phân cách.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
