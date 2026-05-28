import React from "react";
import { Download, Printer, Filter } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function ReportChiTietCong() {
  const MOCK_DATA = [
    { stt: 1, ten: "Quang Trung đoạn 2 (QL6)", lyTrinh: "km11+400", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", chieuCong: "DỌC", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "2800", beRong: "D1000", viTri: "Phải" },
    { stt: 2, ten: "Quang Trung đoạn 2 (QL6)", lyTrinh: "km12+260", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", chieuCong: "NGANG", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "", beRong: "D1000", viTri: "" },
    { stt: 3, ten: "Quang Trung đoạn 2 (QL6)", lyTrinh: "km12+380", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", chieuCong: "NGANG", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "", beRong: "D1000", viTri: "" },
    { stt: 4, ten: "Quang Trung đoạn 2 (QL6)", lyTrinh: "km12+770", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", chieuCong: "NGANG", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "", beRong: "D1000", viTri: "" },
    { stt: 5, ten: "Quang Trung đoạn 2 (QL6)", lyTrinh: "km13+175", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", chieuCong: "NGANG", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "", beRong: "D1000", viTri: "" },
    { stt: 6, ten: "Nguyễn Văn Lộc đoạn 1", lyTrinh: "km1+000", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", chieuCong: "NGANG", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "", beRong: "D800", viTri: "" },
    { stt: 7, ten: "Hoàng Sa", lyTrinh: "km0+0", quanHuyen: "Đông Anh", donVi: "CÔNG TY CP CÔNG TRÌNH GIAO THÔNG 2 HÀ NỘI", chieuCong: "DỌC", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "680", beRong: "D1000", viTri: "Phải" },
    { stt: 8, ten: "Hoàng Sa", lyTrinh: "km0+0", quanHuyen: "Đông Anh", donVi: "CÔNG TY CP CÔNG TRÌNH GIAO THÔNG 2 HÀ NỘI", chieuCong: "DỌC", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "680", beRong: "D1000", viTri: "Trái" },
    { stt: 9, ten: "Hoàng Sa", lyTrinh: "km0+760", quanHuyen: "Đông Anh", donVi: "CÔNG TY CP CÔNG TRÌNH GIAO THÔNG 2 HÀ NỘI", chieuCong: "DỌC", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "3400", beRong: "D1000", viTri: "Phải" },
    { stt: 10, ten: "Hoàng Sa", lyTrinh: "km0+760", quanHuyen: "Đông Anh", donVi: "CÔNG TY CP CÔNG TRÌNH GIAO THÔNG 2 HÀ NỘI", chieuCong: "DỌC", tinhTrang: "Bình thường", loaiCong: "Tròn", chieuDai: "3400", beRong: "D1000", viTri: "Trái" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm sticky left-0 z-20">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase">Báo cáo chi tiết Cống</h3>
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
              <option>CÔNG TY CP CÔNG TRÌNH GIAO THÔNG</option>
              <option>CÔNG TY CP QL&XD ĐƯỜNG BỘ</option>
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
          <div className="min-w-[1300px] max-w-[1600px] mx-auto bg-white p-12 m-8 font-serif text-[13px] shadow-sm border border-slate-200">
             {/* Report Header */}
             <div className="flex flex-col text-center mb-8">
              <p className="font-bold text-[16px] uppercase m-0 leading-tight">SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
              <p className="font-bold text-[16px] uppercase m-0 leading-tight">BAN DUY TU CÁC CÔNG TRÌNH HẠ TẦNG GIAO THÔNG</p>
            </div>
            
            <div className="text-center mb-10 w-full max-w-4xl mx-auto items-center flex flex-col">
              <h2 className="text-[24px] font-bold m-0 uppercase mb-2">BÁO CÁO CHI TIẾT CỐNG</h2>
              <p className="text-[14px] m-0 font-bold italic">Quý 4 năm 2025</p>
            </div>

            {/* Main Data Table */}
            <table className="w-full border-collapse border border-black text-center text-[12px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-black p-2 w-10 font-bold">STT</th>
                  <th className="border border-black p-2 w-56 font-bold">Tên đoạn đường</th>
                  <th className="border border-black p-2 w-32 font-bold">Lý trình</th>
                  <th className="border border-black p-2 w-32 font-bold">Quận, huyện</th>
                  <th className="border border-black p-2 w-64 font-bold">Đơn vị quản lý</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều cống</th>
                  <th className="border border-black p-2 w-24 font-bold">Tình trạng</th>
                  <th className="border border-black p-2 w-24 font-bold">Loại cống</th>
                  <th className="border border-black p-2 w-24 font-bold">Chiều dài</th>
                  <th className="border border-black p-2 w-24 font-bold">Bề rộng cống</th>
                  <th className="border border-black p-2 w-24 font-bold">Vị trí</th>
                </tr>
              </thead>
              <tbody className="normal-case">
                {MOCK_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 h-8">
                    <td className="border border-black p-2">{row.stt}</td>
                    <td className="border border-black p-2 text-left">{row.ten}</td>
                    <td className="border border-black p-2 text-left">{row.lyTrinh}</td>
                    <td className="border border-black p-2 text-left">{row.quanHuyen}</td>
                    <td className="border border-black p-2 text-left uppercase text-xs">{row.donVi}</td>
                    <td className="border border-black p-2">{row.chieuCong}</td>
                    <td className="border border-black p-2">{row.tinhTrang}</td>
                    <td className="border border-black p-2">{row.loaiCong}</td>
                    <td className="border border-black p-2 text-right">{row.chieuDai}</td>
                    <td className="border border-black p-2 font-semibold">{row.beRong}</td>
                    <td className="border border-black p-2">{row.viTri}</td>
                  </tr>
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <tr key={`blank-${i}`} className="h-8 hover:bg-slate-50">
                    {Array.from({ length: 11 }).map((_, j) => (
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
