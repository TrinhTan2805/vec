import React from "react";
import { FileText, BarChart3, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

interface ReportPageProps {
  title: string;
  section: string;
  description?: string;
}

function ReportPage({ title, section, description }: ReportPageProps) {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tổng số báo cáo", value: "—", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Tháng này", value: "—", color: "text-green-600", bg: "bg-green-50" },
          { label: "Chờ xuất", value: "—", color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Đã xuất Excel", value: "—", color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
            <div className={`flex size-11 items-center justify-center rounded-xl ${s.bg}`}>
              <BarChart3 className={`size-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Export Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b bg-slate-50/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1 text-xs">{section}</Badge>
              <span className="text-sm text-slate-600 font-medium">{description || "Chọn điều kiện và xuất báo cáo"}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-9 border-slate-200">
                <Filter className="mr-2 size-4" />Lọc dữ liệu
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white h-9">
                <Download className="mr-2 size-4" />Xuất Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FileText className="size-10" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 text-lg">{title}</p>
              <p className="text-sm text-slate-400 mt-1">Chọn điều kiện lọc và nhấn <strong>Xuất Excel</strong> để tải báo cáo</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-2">
              <Download className="mr-2 size-4" />Tạo báo cáo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import ReportChiTietBienBao from "./ReportChiTietBienBao";
import ReportChiTietCotKm from "./ReportChiTietCotKm";
import ReportChiTietSuaChuaMatDuong from "./ReportChiTietSuaChuaMatDuong";
import ReportDanhSachCauLon from "./ReportDanhSachCauLon";
import ReportDanhSachTuyenDuong from "./ReportDanhSachTuyenDuong";
import ReportChiTietCong from "./ReportChiTietCong";

export function BaoCaoHienTrangCauDuong() {
  return <ReportChiTietSuaChuaMatDuong />;
}

export function BaoCaoChiTietBienBao() {
  return <ReportChiTietBienBao />;
}

export function BaoCaoChiTietCotKm() {
  return <ReportChiTietCotKm />;
}

export function BaoCaoDanhSachCauLon() {
  return <ReportDanhSachCauLon />;
}

export function BaoCaoDanhSachTuyenDuong() {
  return <ReportDanhSachTuyenDuong />;
}

export function BaoCaoChiTietCong() {
  return <ReportChiTietCong />;
}

export function BaoCaoHienTrangHoGa() {
  return <ReportPage title="Báo cáo, thống kê hiện trạng hố ga" section="I.9.1" description="Thống kê hiện trạng hố ga theo mẫu" />;
}

export function BaoCaoDuyTuDenTinHieu() {
  return <ReportPage title="Báo cáo tổng hợp tình hình duy tu, bảo trì đèn tín hiệu giao thông" section="I.9.1" description="Tổng hợp tình hình duy tu, bảo trì hệ thống đèn tín hiệu" />;
}

export function BaoCaoVanHanhDen() {
  return <ReportPage title="Báo cáo thống kê sự cố và tình trạng vận hành đèn tín hiệu" section="I.9.1" description="Thống kê sự cố vận hành đèn tín hiệu giao thông" />;
}

export function BaoCaoNutGiaoChuaDen() {
  return <ReportPage title="Báo cáo, thống kê các nút giao chưa có đèn tín hiệu" section="I.9.1" description="Danh sách nút giao chưa được lắp đèn tín hiệu" />;
}

export function BaoCaoPhanAnhSuCo() {
  return <ReportPage title="Báo cáo, thống kê phản ánh sự cố đường bộ" section="I.9.2" description="Tổng hợp các phản ánh sự cố đường bộ theo mẫu" />;
}

export function BaoCaoThongKeTuanDuong() {
  return <ReportPage title="Báo cáo, thống kê tuần đường" section="I.9.2" description="Thống kê đi tuần đường theo mẫu" />;
}

export function BaoCaoKhongTuanDuong() {
  return <ReportPage title="Báo cáo, thống kê không tuần đường" section="I.9.2" description="Thống kê các trường hợp không đi tuần đường" />;
}

export function BaoCaoSoLanTuanDuong() {
  return <ReportPage title="Báo cáo, thống kê số lần tuần đường" section="I.9.2" description="Thống kê số lần đi tuần trên từng tuyến" />;
}

export function BaoCaoTuanKiem() {
  return <ReportPage title="Báo cáo, thống kê tuần kiểm" section="I.9.2" description="Thống kê kết quả tuần kiểm theo mẫu" />;
}

export function NhatKyTuanDuong() {
  return <ReportPage title="Nhật ký tuần đường" section="I.9.2" description="Nhật ký ghi chép quá trình đi tuần đường" />;
}

export function NhatKyTuanKiem() {
  return <ReportPage title="Nhật ký tuần kiểm" section="I.9.2" description="Nhật ký ghi chép kết quả kiểm tra định kỳ" />;
}

export function NhatKyTuanDen() {
  return <ReportPage title="Nhật ký tuần đèn" section="I.9.2" description="Nhật ký ghi chép tuần tra hệ thống đèn tín hiệu" />;
}
