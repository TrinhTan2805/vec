import React from "react";
import { Download, Printer, Filter } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function BaoCaoChiTietSuaChuaMatDuong() {
  const MOCK_DATA = [
    { stt: 1, roadName: "QL.32-ĐP(Km19+500-Km24+000)", period: "2/2021", unit: "Đội QLGT số 5", startPoint: "Km21+675", endPoint: "Km21+750", mileage: 21675, edgeDist: 0, position: "Trái", length: 75, width: 6, volume: 487.5, explanation: "487,5m2", handoverDate: "26/06/2021", warranty: 12, structure: ["Cào bóc mặt đường BTN + thảm BTNC 12.5 chiều dày TB 5 cm", "Thảm BTN C12.5 dày 5 cm"], thickness: ["+5", "+5"] },
    { stt: 2, roadName: "QL.32-ĐP(Km19+500-Km24+000)", period: "2/2021", unit: "Đội QLGT số 5", startPoint: "Km21+770", endPoint: "Km21+824", mileage: 21770, edgeDist: 0, position: "Trái", length: 54, width: 6, volume: 367, explanation: "367 m2", handoverDate: "26/06/2021", warranty: 12, structure: ["Thảm BTN C12.5 dày 5 cm", "Cào bóc mặt đường BTN + thảm BTNC 12.5 chiều dày TB 5 cm"], thickness: ["+5", "+5"] },
    { stt: 3, roadName: "QL.32-PT1(Km24+000-Km27+00)", period: "2/2021", unit: "Đội QLGT số 5", startPoint: "Km24+650", endPoint: "Km24+680", mileage: 24650, edgeDist: 0, position: "Trái", length: 30, width: 6, volume: 210, explanation: "210 m2", handoverDate: "26/06/2021", warranty: 12, structure: [], thickness: [] },
    { stt: 4, roadName: "QL.32-PT1(Km24+000-Km27+00)", period: "2/2021", unit: "Đội QLGT số 5", startPoint: "Km24+703", endPoint: "Km24+765", mileage: 24703, edgeDist: 0, position: "Trái", length: 62, width: 6, volume: 434, explanation: "434m2", handoverDate: "26/06/2021", warranty: 12, structure: [], thickness: [] },
    { stt: 5, roadName: "QL.32-PT1(Km24+000-Km27+00)", period: "2/2021", unit: "Đội QLGT số 5", startPoint: "Km24+936", endPoint: "Km25+025", mileage: 24936, edgeDist: 0, position: "Trái", length: 89, width: 6, volume: 636, explanation: "663", handoverDate: "26/06/2021", warranty: 12, structure: [], thickness: [] },
    { stt: 6, roadName: "QL.32-PT1(Km24+000-Km27+00)", period: "2/2021", unit: "Đội QLGT số 5", startPoint: "Km25+036", endPoint: "Km25+081", mileage: 25036, edgeDist: 0, position: "Trái", length: 45, width: 6, volume: 315, explanation: "315m2", handoverDate: "26/06/2021", warranty: 12, structure: [], thickness: [] },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-4 flex flex-row items-center justify-between shadow-sm sticky left-0 z-20">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase">Báo cáo chi tiết Hiện trạng Sửa chữa mặt đường</h3>
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
              <option>Đội QLGT số 5</option>
              <option>Công ty CPTVXD</option>
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
          <div className="min-w-[1500px] bg-white p-12 m-8 uppercase font-serif text-[11px] shadow-sm border border-slate-200">
            {/* Report Header */}
            <div className="flex justify-between items-start w-full">
              <div className="text-center w-[400px]">
                <p className="font-bold text-[18px] m-0">SỞ GIAO THÔNG VẬN TẢI HÀ NỘI</p>
                <p className="font-bold text-[18px] mt-[5px] mb-0 underline">BAN DUY TU CÁC CÔNG TRÌNH HTGT</p>
              </div>
              <div className="text-center w-[400px]">
                <p className="font-bold text-[18px] m-0">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <p className="font-bold text-[19px] mt-[5px] mb-0">Độc lập - Tự do - Hạnh phúc</p>
                <div className="w-[160px] h-[1.5px] bg-black mt-2 mx-auto"></div>
              </div>
            </div>
            
            <div className="text-center mt-[60px] mb-8">
              <h4 className="text-[26px] font-bold m-0 border-double border-b-4 border-t-4 border-slate-800 py-3 mx-auto max-w-3xl bg-slate-50 text-slate-900">BÁO CÁO CHI TIẾT SỬA CHỮA MẶT ĐƯỜNG</h4>
              <p className="text-[20px] normal-case font-bold italic mt-3 mb-10">quý 4 năm 2025</p>
            </div>

            {/* Main Data Table */}
            <table className="w-full border-collapse border border-black text-center text-[12px] bg-white text-slate-800 leading-tight">
              <thead>
                <tr className="bg-slate-100 font-bold border-b border-black text-[12px]">
                  <th className="border-r border-l border-black p-2 w-10">STT</th>
                  <th className="border-r border-black p-2 w-48">Tên đường, phố(*)</th>
                  <th className="border-r border-black p-2 w-20">Quý/Năm</th>
                  <th className="border-r border-black p-2 w-36">Đơn vị quản lý(*)</th>
                  <th className="border-r border-black p-2 w-24">Điểm đầu</th>
                  <th className="border-r border-black p-2 w-24">Điểm cuối</th>
                  <th className="border-r border-black p-2 w-24">Khoảng cách lý trình(*)</th>
                  <th className="border-r border-black p-2 w-24">Khoảng cách mép đường(*)</th>
                  <th className="border-r border-black p-2 w-20">Vị trí(*)</th>
                  <th className="border-r border-black p-2 w-16">Chiều dài(*)</th>
                  <th className="border-r border-black p-2 w-16">Chiều rộng(*)</th>
                  <th className="border-r border-black p-2 w-20">Khối lượng</th>
                  <th className="border-r border-black p-2 w-32">Giải trình</th>
                  <th className="border-r border-black p-2 w-24">Ngày bàn giao đưa vào sử dụng(*)</th>
                  <th className="border-r border-black p-2 w-20">Thời gian bảo hành(*)</th>
                  <th className="border-r border-black p-2 w-64">Tên loại kết cấu xử lý(*)</th>
                  <th className="border-r border-black p-2 w-16">Độ dày(*)</th>
                </tr>
              </thead>
              <tbody className="normal-case text-[11px]">
                {MOCK_DATA.map((row) => (
                  <tr key={row.stt} className="border-b border-black hover:bg-slate-50">
                    <td className="border-r border-l border-black p-2 text-center">{row.stt}</td>
                    <td className="border-r border-black p-2 uppercase text-left">{row.roadName}</td>
                    <td className="border-r border-black p-2 text-center">{row.period}</td>
                    <td className="border-r border-black p-2 text-left uppercase">{row.unit}</td>
                    <td className="border-r border-black p-2 text-center">{row.startPoint}</td>
                    <td className="border-r border-black p-2 text-center">{row.endPoint}</td>
                    <td className="border-r border-black p-2 text-center">{row.mileage.toLocaleString()}</td>
                    <td className="border-r border-black p-2 text-center">{row.edgeDist}</td>
                    <td className="border-r border-black p-2 text-center font-bold bg-amber-50/50">{row.position}</td>
                    <td className="border-r border-black p-2 text-center">{row.length}</td>
                    <td className="border-r border-black p-2 text-center">{row.width}</td>
                    <td className="border-r border-black p-2 text-center font-bold bg-green-50/50">{row.volume.toLocaleString()}</td>
                    <td className="border-r border-black p-2 text-center">{row.explanation}</td>
                    <td className="border-r border-black p-2 text-center">{row.handoverDate}</td>
                    <td className="border-r border-black p-2 text-center">{row.warranty}</td>
                    <td className="border-r border-black p-2 text-left bg-blue-50/30">
                      {row.structure.map((s, idx) => (
                        <div key={idx} className={idx > 0 ? "border-t border-slate-300 pt-1 mt-1" : ""}>
                          + {s}
                        </div>
                      ))}
                    </td>
                    <td className="border-r border-black p-2 text-center font-bold bg-blue-50/30">
                      {row.thickness.map((t, idx) => (
                        <div key={idx} className={idx > 0 ? "border-t border-slate-300 pt-1 mt-1" : ""}>
                          {t}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
                {/* 15 empty rows to simulate Excel length */}
                {Array.from({length: 15}).map((_, i) => (
                  <tr key={`empty-${i}`} className="border-b border-black h-8 hover:bg-slate-50">
                    {Array.from({length: 16}).map((__, j) => (
                      <td key={j} className="border-r border-black"></td>
                    ))}
                    <td className="border-r border-black"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer signatures */}
            <div className="grid grid-cols-2 gap-20 mt-20 text-center uppercase font-bold">
               <div className="space-y-2">
                <p className="italic text-slate-700 text-sm normal-case mb-2 font-normal">Hà Nội, ngày......tháng......năm 2025</p>
                <div className="space-y-24 mt-4">
                  <p>Người lập biểu</p>
                  <p className="font-bold italic text-slate-300">_______________________</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="italic text-slate-700 text-sm normal-case font-normal mb-2">&nbsp;</p>
                <div className="space-y-24 mt-4">
                  <p>ĐẠI DIỆN BAN DUY TU</p>
                  <p className="font-bold italic text-slate-300">_______________________</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
