import React from "react";
import { Download, Printer, ArrowLeft, Filter } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function BaoCaoChiTietBienBao() {
  const MOCK_DATA = [
    { stt: 1, duong: "Láng Hòa Lạc", lyTrinh: "km0+210", maHieu: "W.213a", viTri: "Trái", quanHuyen: "Hà Vi", donVi: "Đội QLGT số 2", tinhTrang: "Bình thường", phanLoaiCot: "Cột Dk 90", loaiCot: "Cột sơn", cotSon: "3,5m", soLuongCot: 1, d76: "", d60: "", dtTron: "0,00", c700: "", c878: "", c1040: "", c1260: "", c1400: "", dtTamGiac: "0,21", dtQuyCap: "", cnSoLuong: "", cnKichThuoc: "", cnDt: "0,00", phuSoLuong: "", phuKichThuoc: "", phuDt: "0,00" },
    { stt: 2, duong: "Láng Hòa Lạc", lyTrinh: "km0+240", maHieu: "W.208", viTri: "Trái", quanHuyen: "Hà Vi", donVi: "Đội QLGT số 2", tinhTrang: "Bình thường", phanLoaiCot: "Cột Dk 90", loaiCot: "Cột sơn", cotSon: "3,5m", soLuongCot: 1, d76: "", d60: "", dtTron: "0,00", c700: "1,00", c878: "", c1040: "", c1260: "", c1400: "", dtTamGiac: "0,21", dtQuyCap: "", cnSoLuong: "", cnKichThuoc: "", cnDt: "0,00", phuSoLuong: "", phuKichThuoc: "", phuDt: "0,00" },
    { stt: 3, duong: "Láng Hòa Lạc", lyTrinh: "km0+290", maHieu: "I.414b", viTri: "Phải", quanHuyen: "Hà Vi", donVi: "Đội QLGT số 2", tinhTrang: "Bình thường", phanLoaiCot: "Cột Dk 90", loaiCot: "Cột sơn", cotSon: "3,5m", soLuongCot: 1, d76: "", d60: "", dtTron: "0,00", c700: "", c878: "", c1040: "", c1260: "", c1400: "", dtTamGiac: "0,00", dtQuyCap: "", cnSoLuong: "1,00", cnKichThuoc: "2.4*1.5", cnDt: "3,60", phuSoLuong: "", phuKichThuoc: "", phuDt: "0,00" },
    { stt: 4, duong: "Láng Hòa Lạc", lyTrinh: "km0+320", maHieu: "W.207a", viTri: "Trái", quanHuyen: "Hà Vi", donVi: "Đội QLGT số 2", tinhTrang: "Bình thường", phanLoaiCot: "Cột Dk 90", loaiCot: "Cột sơn", cotSon: "3,5m", soLuongCot: 1, d76: "", d60: "", dtTron: "0,00", c700: "1,00", c878: "", c1040: "", c1260: "", c1400: "", dtTamGiac: "0,21", dtQuyCap: "", cnSoLuong: "", cnKichThuoc: "", cnDt: "0,00", phuSoLuong: "", phuKichThuoc: "", phuDt: "0,00" },
    { stt: 5, duong: "Láng Hòa Lạc", lyTrinh: "km0+340", maHieu: "I.423b", viTri: "Phải", quanHuyen: "Hà Vi", donVi: "Đội QLGT số 2", tinhTrang: "Bình thường", phanLoaiCot: "Cột Dk 90", loaiCot: "Cột sơn", cotSon: "3,5m", soLuongCot: 1, d76: "", d60: "", dtTron: "0,00", c700: "", c878: "", c1040: "", c1260: "", c1400: "", dtTamGiac: "0,00", dtQuyCap: "", cnSoLuong: "1,00", cnKichThuoc: "0.9*0.9", cnDt: "0,81", phuSoLuong: "", phuKichThuoc: "", phuDt: "0,00" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm sticky left-0">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase">Báo cáo chi tiết Biển báo</h3>
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
              <option>Công ty CP CT GT</option>
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
          <div className="min-w-[2500px] bg-white p-12 m-8 uppercase font-serif text-[11px] shadow-sm border border-slate-200">
            {/* Report Header */}
            <div className="flex justify-between items-start mb-12">
              <div className="text-center w-[400px]">
                <p className="font-bold text-[18px] m-0">SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
                <p className="font-bold text-[18px] mt-1 underline">BAN DUY TU CÁC CÔNG TRÌNH HTGT</p>
              </div>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-[26px] font-bold m-0">BÁO CÁO CHI TIẾT BIỂN BÁO</h2>
              <p className="text-[20px] font-bold italic normal-case">Quý 4 năm 2025</p>
            </div>

            {/* Main Data Table */}
            <table className="w-full border-collapse border border-black text-center text-[10px]">
              <thead>
                {/* Header Row 1 */}
                <tr className="bg-slate-100">
                  <th className="border border-black p-2 w-10 font-bold" rowSpan={3}>STT</th>
                  <th className="border border-black p-2 w-48 font-bold" rowSpan={3}>Tên đường</th>
                  <th className="border border-black p-2 w-28 font-bold" rowSpan={3}>Lý trình</th>
                  <th className="border border-black p-2 w-24 font-bold" rowSpan={3}>Mã hiệu</th>
                  <th className="border border-black p-2 w-20 font-bold" rowSpan={3}>Vị trí</th>
                  <th className="border border-black p-2 w-32 font-bold" rowSpan={3}>Quận huyện</th>
                  <th className="border border-black p-2 w-40 font-bold" rowSpan={3}>Đơn vị quản lý</th>
                  <th className="border border-black p-2 w-32 font-bold" rowSpan={3}>Tình trạng vật chất biển báo</th>
                  <th className="border border-black p-2 font-bold" colSpan={6}>Cột biển báo</th>
                  <th className="border border-black p-2 font-bold" colSpan={14}>Biển báo</th>
                </tr>
                {/* Header Row 2 */}
                <tr className="bg-slate-100">
                  <th className="border border-black p-1 w-24" rowSpan={2}>Phân loại cột</th>
                  <th className="border border-black p-1 w-24" rowSpan={2}>Loại cột</th>
                  <th className="border border-black p-1 w-24" rowSpan={2}>Cột sơn</th>
                  <th className="border border-black p-1 w-16" rowSpan={2}>Số lượng cột</th>
                  <th className="border border-black p-1 w-16" rowSpan={2}>ĐK (D76)</th>
                  <th className="border border-black p-1 w-16" rowSpan={2}>ĐK (D60)</th>
                  
                  <th className="border border-black p-1" colSpan={2}>Biển tròn</th>
                  <th className="border border-black p-1" colSpan={6}>Biển tam giác</th>
                  <th className="border border-black p-1" colSpan={3}>Biển chữ nhật</th>
                  <th className="border border-black p-1" colSpan={3}>Biển phụ</th>
                </tr>
                {/* Header Row 3 */}
                <tr className="bg-slate-100">
                  <th className="border border-black p-1 w-16">ĐK (D700)</th>
                  <th className="border border-black p-1 w-16">Diện tích (m2)</th>
                  <th className="border border-black p-1 w-16">Cạnh (700)</th>
                  <th className="border border-black p-1 w-16">Cạnh (878)</th>
                  <th className="border border-black p-1 w-16">Cạnh (1040)</th>
                  <th className="border border-black p-1 w-16">Cạnh (1260)</th>
                  <th className="border border-black p-1 w-16">Cạnh (1400)</th>
                  <th className="border border-black p-1 w-16">Diện tích (m2)</th>
                  <th className="border border-black p-1 w-16">Số lượng</th>
                  <th className="border border-black p-1 w-24">Kích thước</th>
                  <th className="border border-black p-1 w-16">DT (m2)</th>
                  <th className="border border-black p-1 w-16">Số lượng</th>
                  <th className="border border-black p-1 w-24">Kích thước</th>
                  <th className="border border-black p-1 w-16">DT (m2)</th>
                </tr>
              </thead>
              <tbody className="normal-case">
                {MOCK_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="border border-black p-1.5">{row.stt}</td>
                    <td className="border border-black p-1.5">{row.duong}</td>
                    <td className="border border-black p-1.5">{row.lyTrinh}</td>
                    <td className="border border-black p-1.5">{row.maHieu}</td>
                    <td className="border border-black p-1.5">{row.viTri}</td>
                    <td className="border border-black p-1.5">{row.quanHuyen}</td>
                    <td className="border border-black p-1.5">{row.donVi}</td>
                    <td className="border border-black p-1.5">{row.tinhTrang}</td>
                    
                    <td className="border border-black p-1.5">{row.phanLoaiCot}</td>
                    <td className="border border-black p-1.5">{row.loaiCot}</td>
                    <td className="border border-black p-1.5">{row.cotSon}</td>
                    <td className="border border-black p-1.5">{row.soLuongCot}</td>
                    <td className="border border-black p-1.5">{row.d76}</td>
                    <td className="border border-black p-1.5">{row.d60}</td>
                    
                    <td className="border border-black p-1.5 w-16 bg-blue-50/30"></td>
                    <td className="border border-black p-1.5 w-16 bg-blue-50/30 font-semibold">{row.dtTron}</td>
                    
                    <td className="border border-black p-1.5 w-16 bg-amber-50/30">{row.c700}</td>
                    <td className="border border-black p-1.5 w-16 bg-amber-50/30">{row.c878}</td>
                    <td className="border border-black p-1.5 w-16 bg-amber-50/30">{row.c1040}</td>
                    <td className="border border-black p-1.5 w-16 bg-amber-50/30">{row.c1260}</td>
                    <td className="border border-black p-1.5 w-16 bg-amber-50/30">{row.c1400}</td>
                    <td className="border border-black p-1.5 w-16 bg-amber-50/30 font-semibold">{row.dtTamGiac}</td>

                    <td className="border border-black p-1.5 w-16 bg-green-50/30">{row.cnSoLuong}</td>
                    <td className="border border-black p-1.5 w-24 bg-green-50/30">{row.cnKichThuoc}</td>
                    <td className="border border-black p-1.5 w-16 bg-green-50/30 font-semibold">{row.cnDt}</td>
                    
                    <td className="border border-black p-1.5 w-16 bg-slate-100">{row.phuSoLuong}</td>
                    <td className="border border-black p-1.5 w-24 bg-slate-100">{row.phuKichThuoc}</td>
                    <td className="border border-black p-1.5 w-16 bg-slate-100 font-semibold">{row.phuDt}</td>
                  </tr>
                ))}
                {/* 10 extra blank rows to mimic full page report */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <tr key={`blank-${i}`} className="h-7 hover:bg-slate-50">
                    {Array.from({ length: 28 }).map((_, j) => (
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
