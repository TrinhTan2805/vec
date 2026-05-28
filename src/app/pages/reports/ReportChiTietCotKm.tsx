import React from "react";
import { Download, Printer, Filter } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function BaoCaoChiTietCotKm() {
  const MOCK_DATA = [
    { stt: 1, tenDoanDuong: "Quang Trung đoạn 2 (QL6)", lyTrinh: "Km13", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", viTri: "Trái", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 2, tenDoanDuong: "Quang Trung đoạn 2 (QL6)", lyTrinh: "Km12", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", viTri: "Trái", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 3, tenDoanDuong: "Quang Trung đoạn 2 (QL6)", lyTrinh: "km14", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", viTri: "Trái", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 4, tenDoanDuong: "Văn Khê", lyTrinh: "km2+000", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", viTri: "Phải", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 5, tenDoanDuong: "Văn Khê", lyTrinh: "km3+000", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", viTri: "Phải", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 6, tenDoanDuong: "Văn Khê", lyTrinh: "km4+000", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", viTri: "Phải", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 7, tenDoanDuong: "Nguyễn Văn Lộc đoạn 1", lyTrinh: "km1+000", quanHuyen: "Hà Đông", donVi: "CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY", viTri: "Trái", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 8, tenDoanDuong: "ĐT.419-TT", lyTrinh: "Km6", quanHuyen: "Thạch Thất", donVi: "CÔNG TY CỔ PHẦN QL&ĐTXD ĐƯỜNG BỘ HÀ NỘI", viTri: "Phải", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 9, tenDoanDuong: "ĐT.419-TT", lyTrinh: "Km7", quanHuyen: "Thạch Thất", donVi: "CÔNG TY CỔ PHẦN QL&ĐTXD ĐƯỜNG BỘ HÀ NỘI", viTri: "Phải", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
    { stt: 10, tenDoanDuong: "ĐT.419-TT", lyTrinh: "Km8", quanHuyen: "Thạch Thất", donVi: "CÔNG TY CỔ PHẦN QL&ĐTXD ĐƯỜNG BỘ HÀ NỘI", viTri: "Phải", tinhTrang: "Bình thường", cotBt: 1, cotThep: "" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm sticky left-0 z-20">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase">Báo cáo chi tiết Cột Km</h3>
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
              <option>CÔNG TY CP QL&XD ĐƯỜNG BỘ I HÀ TÂY</option>
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
          <div className="min-w-[1200px] max-w-[1600px] mx-auto bg-white p-12 m-8 uppercase font-serif text-[13px] shadow-sm border border-slate-200">
            {/* Report Header */}
            <div className="flex justify-between items-start mb-12">
              <div className="text-center w-[400px]">
                <p className="font-bold text-[18px] m-0">SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
                <p className="font-bold text-[18px] mt-1">BAN DUY TU CÁC CÔNG TRÌNH HẠ TẦNG GIAO THÔNG</p>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-[26px] font-bold m-0 border-double border-b-4 border-t-4 border-green-800 py-3 text-green-900 mx-auto max-w-2xl bg-green-50/50">
                BÁO CÁO CHI TIẾT CỘT Km
              </h2>
              <p className="text-[18px] normal-case font-bold italic mt-3 border border-green-800 py-1 max-w-2xl mx-auto rounded-sm text-green-900 bg-white">
                Quý 4 năm 2025
              </p>
            </div>

            {/* Main Data Table */}
            <table className="w-full border-collapse border border-black text-center text-[12px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-black p-2 w-16 font-bold" rowSpan={2}>STT</th>
                  <th className="border border-black p-2 w-64 font-bold" rowSpan={2}>Tên đoạn đường</th>
                  <th className="border border-black p-2 w-32 font-bold" rowSpan={2}>Lý trình</th>
                  <th className="border border-black p-2 w-32 font-bold" rowSpan={2}>Quận, huyện</th>
                  <th className="border border-black p-2 w-64 font-bold" rowSpan={2}>Đơn vị quản lý</th>
                  <th className="border border-black p-2 w-24 font-bold" rowSpan={2}>Vị trí</th>
                  <th className="border border-black p-2 w-32 font-bold" rowSpan={2}>Tình trạng</th>
                  <th className="border border-black p-2 font-bold" colSpan={2}>Loại cột km</th>
                </tr>
                <tr className="bg-slate-50">
                  <th className="border border-black p-2 w-24">Cột BT</th>
                  <th className="border border-black p-2 w-24">Cột thép</th>
                </tr>
              </thead>
              <tbody className="normal-case">
                {MOCK_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="border border-black p-2">{row.stt}</td>
                    <td className="border border-black p-2 text-left">{row.tenDoanDuong}</td>
                    <td className="border border-black p-2">{row.lyTrinh}</td>
                    <td className="border border-black p-2">{row.quanHuyen}</td>
                    <td className="border border-black p-2 text-left uppercase text-xs">{row.donVi}</td>
                    <td className="border border-black p-2">{row.viTri}</td>
                    <td className="border border-black p-2">{row.tinhTrang}</td>
                    <td className="border border-black p-2 bg-blue-50/50 font-semibold">{row.cotBt}</td>
                    <td className="border border-black p-2 bg-amber-50/50 font-semibold">{row.cotThep}</td>
                  </tr>
                ))}
                {/* 15 extra blank rows to mimic full page report */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <tr key={`blank-${i}`} className="h-8 hover:bg-slate-50">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <td key={`cell-${i}-${j}`} className="border border-black"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer with Signatures */}
            <div className="flex justify-between mt-20 px-24">
              <div className="text-center font-bold">
                <p>NGƯỜI LẬP BIỂU</p>
                <div className="h-24"></div>
              </div>
              <div className="text-center">
                 <p className="italic font-normal mb-2 normal-case text-sm">Hà Nội, ngày ..... tháng ..... năm 2025</p>
                 <p className="font-bold">ĐẠI DIỆN BAN DUY TU</p>
                 <div className="h-24"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
