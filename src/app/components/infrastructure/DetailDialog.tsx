import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Edit, MapPin, Eye, FileText, Wrench, ClipboardCheck } from "lucide-react";
import { SimpleMapView } from "../map/SimpleMapView";
import { useState } from "react";

interface DetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCard: any;
  selectedItem: any;
  onEditClick: () => void;
}

function InfoRow({ label, value, highlight }: { label: string; value: any; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-slate-500 text-sm flex-shrink-0">{label}:</span>
      <span className={`text-sm font-medium text-right ml-4 ${highlight ? "text-blue-600" : "text-slate-900"}`}>
        {value || "N/A"}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
      <h3 className="text-slate-900 font-semibold mb-3 border-b border-slate-200/60 pb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

// ---- Maintenance history mock data per asset type ----
const MAINTENANCE_MOCK: Record<string, any[]> = {
  "Cầu lớn": [
    { ngay: "10/03/2026", loai: "Sửa chữa thường xuyên", noiDung: "Vá ổ gà mặt cầu, sơn kẻ vạch", donVi: "Sở GTVT Hà Nội", khLuong: "150 m²", tinhTrang: "Hoàn thành" },
    { ngay: "05/10/2025", loai: "Bảo dưỡng định kỳ", noiDung: "Vệ sinh, kiểm tra khe co dãn, gối cầu", donVi: "Sở GTVT Hà Nội", khLuong: "—", tinhTrang: "Hoàn thành" },
    { ngay: "20/04/2025", loai: "Sửa chữa lớn", noiDung: "Thay gối cầu P2, bổ sung lớp phủ chống thấm", donVi: "Công ty CP BTCT Số 1", khLuong: "320 m²", tinhTrang: "Hoàn thành" },
  ],
  "Đoạn đường bộ": [
    { ngay: "15/03/2026", loai: "Bảo dưỡng định kỳ", noiDung: "Vá ổ gà, sơn vạch kẻ đường", donVi: "Công ty TNHH Bảo trì ABC", khLuong: "200 m²", tinhTrang: "Hoàn thành" },
    { ngay: "10/01/2026", loai: "Sửa chữa thường xuyên", noiDung: "Thay thế biển báo hư hỏng", donVi: "Công ty TNHH Bảo trì ABC", khLuong: "5 biển", tinhTrang: "Hoàn thành" },
    { ngay: "20/11/2025", loai: "Sửa chữa lớn", noiDung: "Phay, bù vá mặt đường đoạn Km5–Km7", donVi: "Công ty CP Xây dựng XYZ", khLuong: "800 m²", tinhTrang: "Hoàn thành" },
  ],
  "default": [
    { ngay: "01/02/2026", loai: "Bảo dưỡng định kỳ", noiDung: "Kiểm tra và bảo dưỡng định kỳ", donVi: "Sở GTVT Hà Nội", khLuong: "—", tinhTrang: "Hoàn thành" },
    { ngay: "10/09/2025", loai: "Sửa chữa thường xuyên", noiDung: "Khắc phục sự cố nhỏ", donVi: "Sở GTVT Hà Nội", khLuong: "—", tinhTrang: "Hoàn thành" },
  ],
};

const INSPECTION_MOCK = [
  { ngay: "18/03/2026", loai: "Kiểm tra định kỳ", ketQua: "Đạt tiêu chuẩn", nguoi: "Nguyễn Văn An", ghiChu: "Tình trạng tốt", kq: "Đạt" },
  { ngay: "15/12/2025", loai: "Kiểm tra đột xuất", ketQua: "Cần sửa chữa", nguoi: "Trần Văn Bình", ghiChu: "Phát hiện hư hỏng nhỏ tại vị trí Km", kq: "Cần xử lý" },
  { ngay: "10/09/2025", loai: "Kiểm tra định kỳ", ketQua: "Đạt tiêu chuẩn", nguoi: "Lê Thị Chi", ghiChu: "Bình thường", kq: "Đạt" },
];

// ---- Render "Thông tin chi tiết" theo loại tài sản ----
function RenderDetailInfo({ selectedCard, selectedItem }: { selectedCard: any; selectedItem: any }) {
  const title = selectedCard?.title || "";

  // Mapping phổ quát từ các field thực của từng màn hình
  const i = selectedItem || {};

  // Cầu lớn
  if (title === "Cầu lớn" || i.maCau?.startsWith("BR-")) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin cơ bản">
            <InfoRow label="Tên cầu" value={i.tenCau || i.fullName} highlight />
            <InfoRow label="Mã cầu" value={i.maCau || i.idNumber} highlight />
            <InfoRow label="Tuyến đường" value={i.tuyenDuong} />
            <InfoRow label="Lý trình" value={i.lyTrinh} />
            <InfoRow label="Loại kết cấu" value={i.loaiKetCau} />
            <InfoRow label="Năm đưa vào sử dụng" value={i.namSuDung} />
            <InfoRow label="Tình trạng" value={<Badge variant={i.trangThai === "Hoạt động" ? "default" : "secondary"}>{i.trangThai || i.status}</Badge>} />
          </Section>
          <Section title="Vị trí">
            <InfoRow label="Điểm đầu" value={i.diemDau} />
            <InfoRow label="Điểm cuối" value={i.diemCuoi} />
            <InfoRow label="Tọa độ GPS" value="21.0285°N, 105.8542°E" />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Thông tin quản lý">
            <InfoRow label="Đơn vị quản lý" value={i.donViQL} />
            <InfoRow label="Chiều dài (m)" value={i.chieuDai} />
            <InfoRow label="Ngày đồng bộ" value="25/04/2026" />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">{i.ghiChu || "Không có ghi chú nào cho tài sản này."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Cầu nhỏ/trung/vượt nhẹ/đi bộ
  if (i.loaiCau) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin cơ bản">
            <InfoRow label="Tên cầu" value={i.tenCau || i.fullName} highlight />
            <InfoRow label="Mã cầu" value={i.maCau || i.idNumber} highlight />
            <InfoRow label="Loại cầu" value={i.loaiCau} />
            <InfoRow label="Tuyến đường" value={i.tuyenDuong} />
            <InfoRow label="Lý trình" value={i.lyTrinh} />
            <InfoRow label="Chiều dài (m)" value={i.chieuDai} />
            <InfoRow label="Chiều rộng (m)" value={i.chieuRong} />
            <InfoRow label="Tình trạng" value={<Badge variant={i.tinhTrang === "Hoạt động" ? "default" : "secondary"}>{i.tinhTrang || i.status}</Badge>} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Thông số kỹ thuật">
            <InfoRow label="Tải trọng thiết kế" value={i.taiTrongTK || "—"} />
            <InfoRow label="Tải trọng thực tế" value={i.taiTrongTT || "—"} />
            <InfoRow label="Kết cấu mố" value={i.ketCauMo} />
            <InfoRow label="Kết cấu nhịp" value={i.ketCauNhip} />
            <InfoRow label="Số nhịp" value={i.soNhip} />
            {i.loaiMaiChe && <InfoRow label="Loại mái che" value={i.loaiMaiChe} />}
          </Section>
          <Section title="Quản lý">
            <InfoRow label="Đơn vị quản lý" value={i.donViQL} />
            <InfoRow label="Ngày áp dụng" value={i.ngayApDung} />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">{i.noivDung || "Không có ghi chú."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Hầm đường bộ
  if (i.tenLoaiHam !== undefined) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin cơ bản">
            <InfoRow label="Tên hầm" value={i.tenHam || i.fullName} highlight />
            <InfoRow label="Mã hầm" value={i.maHam || i.idNumber} highlight />
            <InfoRow label="Tên loại hầm" value={i.tenLoaiHam} />
            <InfoRow label="Tình trạng" value={<Badge variant={i.tinhTrang === "Hoạt động" ? "default" : "secondary"}>{i.tinhTrang || i.status}</Badge>} />
          </Section>
          <Section title="Vị trí">
            <InfoRow label="Điểm đầu" value={i.diemDau} />
            <InfoRow label="Kc. lý trình (m)" value={i.khcLyTrinh} />
            <InfoRow label="Điểm cuối" value={i.diemCuoi} />
            <InfoRow label="Tọa độ GPS" value="21.0285°N, 105.8542°E" />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Thông tin quản lý">
            <InfoRow label="Đơn vị quản lý" value={i.donViQL} />
            <InfoRow label="Ngày đồng bộ" value="25/04/2026" />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">{i.ghiChu || "Không có ghi chú."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Đường ngang
  if (i.tinhTrangTrucGac !== undefined) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin chung">
            <InfoRow label="Tên/Ký hiệu" value={i.ten || i.fullName} highlight />
            <InfoRow label="Mã" value={i.ma || i.idNumber} highlight />
            <InfoRow label="Đơn vị quản lý" value={i.donViQL} />
            <InfoRow label="Lý trình" value={i.lyTrinh} />
            <InfoRow label="Kc. lý trình" value={i.khcLyTrinh} />
            <InfoRow label="Vị trí" value={i.viTri} />
            <InfoRow label="Ngày áp dụng" value={i.ngayApDung} />
            <InfoRow label="Tình trạng" value={<Badge variant={i.tinhTrang === "Hoạt động" ? "default" : "secondary"}>{i.tinhTrang || i.status}</Badge>} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Thông số kỹ thuật">
            <InfoRow label="Tình trạng trực gác" value={i.tinhTrangTrucGac} />
            <InfoRow label="Hình thức giao cắt" value={i.hinhThucGiaoCat} />
            <InfoRow label="Loại rào chắn" value={i.loaiRaoChan} />
            <InfoRow label="Chiều giao cắt" value={i.chieuGiaoCat} />
            <InfoRow label="Chiều rộng" value={i.chieuRong} />
          </Section>
          <Section title="Nội dung / Ghi chú">
            <p className="text-slate-600 text-sm">{i.noiDung || i.ghiChu || "Không có ghi chú."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Biển báo
  if (i.bienBao !== undefined || title === "Biển báo") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Cột biển báo">
            <InfoRow label="Mã cột" value={i.ma || i.idNumber} highlight />
            <InfoRow label="Tuyến đường" value={i.tuyenDuong} />
            <InfoRow label="Đơn vị quản lý" value={i.donViQL} />
            <InfoRow label="Lý trình" value={i.lyTrinh} />
            <InfoRow label="Kc. lý trình (m)" value={i.khcLyTrinh} />
            <InfoRow label="Kc. mép đường (m)" value={i.khcMepDuong} />
            <InfoRow label="Vị trí" value={i.viTri} />
            <InfoRow label="Phân loại cột" value={i.phanLoaiCot} />
            <InfoRow label="Loại cột" value={i.loaiCot} />
            <InfoRow label="Số cột" value={i.soCot} />
            <InfoRow label="Tình trạng" value={<Badge variant={i.tinhTrang === "Hoạt động" ? "default" : "secondary"}>{i.tinhTrang || i.status}</Badge>} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Thông tin biển báo">
            <InfoRow label="Ký hiệu biển" value={<span className="font-mono font-bold text-blue-700">{i.bienBao}</span>} />
            <InfoRow label="Phân loại biển" value={i.loaiBienBao} />
            <InfoRow label="Nội dung biển" value={i.noiDungBien} />
            <InfoRow label="Là biển cấm theo giờ" value={i.laBienCamTheoGio} />
            <InfoRow label="Ngày áp dụng" value={i.ngayApDung} />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">{i.ghiChu || "Không có ghi chú."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Hố ga, Cột Km, Cọc H, Cống
  if (title === "Hố ga" || title === "Cột Km" || title === "Cọc H" || title === "Cống") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin cơ bản">
            <InfoRow label="Tên tài sản" value={i.fullName || i.ten || title} highlight />
            <InfoRow label="Mã định danh" value={i.idNumber || i.ma || "—"} highlight />
            <InfoRow label="Loại" value={i.loaiHoGa || i.loaiCot || i.loaiCong || "—"} />
            <InfoRow label="Tuyến đường" value={i.tuyenDuong || "—"} />
            <InfoRow label="Đơn vị quản lý" value={i.donViQL || "—"} />
            <InfoRow label="Tình trạng" value={<Badge variant="outline">{i.status || i.tinhTrang || "Bình thường"}</Badge>} />
          </Section>
          <Section title="Vị trí lý trình">
            <InfoRow label="Lý trình" value={i.lyTrinh || "—"} />
            <InfoRow label="Kc. lý trình (m)" value={i.khcLyTrinh || "—"} />
            <InfoRow label="Vị trí" value={i.viTri || "—"} />
            {i.theoChieu && <InfoRow label="Theo chiều" value={i.theoChieu} />}
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Thông số kỹ thuật">
            {i.kichThuoc && <InfoRow label="Kích thước" value={i.kichThuoc} />}
            {i.rongCong && <InfoRow label="Rộng cống (m)" value={i.rongCong} />}
            <InfoRow label="Ngày áp dụng" value={i.ngayApDung || "—"} />
            <InfoRow label="Dữ liệu không gian" value="Đã có (SHAPE)" highlight />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">{i.ghiChu || "Không có nội dung ghi chú."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Lối rẽ, Kè, Rãnh nước, Cọc tiêu, Vạch kẻ, Dải phân cách, Lan can
  if (title === "Lối rẽ" || title === "Kè" || title === "Rãnh nước" || title === "Đoạn cọc tiêu" || title === "Vạch kẻ đường" || title === "Dải phân cách" || title === "Lan can phòng hộ") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin chung">
            <InfoRow label="Tên/Loại" value={i.fullName || i.loai || title} highlight />
            <InfoRow label="Mã tài sản" value={i.idNumber || i.ma || "—"} />
            <InfoRow label="Tuyến đường" value={i.tuyenDuong || "—"} />
            <InfoRow label="Đơn vị quản lý" value={i.donViQL || "—"} />
            <InfoRow label="Tình trạng" value={<Badge variant="outline">{i.status || i.tinhTrang || "Tốt"}</Badge>} />
          </Section>
          <Section title="Đo đạc & Vị trí">
            <InfoRow label="Điểm đầu" value={i.diemDau || "—"} />
            <InfoRow label="Điểm cuối" value={i.diemCuoi || "—"} />
            <InfoRow label="Chiều dài (m)" value={i.chieuDai || "—"} />
            <InfoRow label="Chiều rộng (m)" value={i.chieuRong || "—"} />
            {i.viTri && <InfoRow label="Vị trí bên" value={i.viTri} />}
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Đặc tính kỹ thuật">
            {i.ketCau && <InfoRow label="Kết cấu" value={i.ketCau} />}
            {i.hienTrang && <InfoRow label="Hiện trạng" value={i.hienTrang} />}
            {i.toChucGT && <InfoRow label="Tổ chức GT" value={i.toChucGT} />}
            <InfoRow label="Ngày cập nhật" value={i.ngayCapNhat || "—"} />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">{i.ghiChu || "Không có ghi chú."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Nút giao, Đấu nối, Hành lang, Hạ tầng vận tải
  if (title === "Nút giao" || title === "Đấu nối" || title === "Hành lang an toàn" || title === "Hạ tầng vận tải") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin quy hoạch">
            <InfoRow label="Tên công trình" value={i.fullName || i.ten || title} highlight />
            <InfoRow label="Mã định danh" value={i.idNumber || i.ma || "—"} highlight />
            <InfoRow label="Loại hình" value={i.loaiNode || i.loaiHatatng || "—"} />
            <InfoRow label="Tuyến chính" value={i.tuyenDuong || "—"} />
            <InfoRow label="Vị trí (Huyện)" value={i.quanHuyen || i.diaChi || "—"} />
            <InfoRow label="Trạng thái" value={<Badge variant="outline">{i.status || i.tinhTrang || "Hoạt động"}</Badge>} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Chi tiết kỹ thuật">
            {i.tuyenCat && <InfoRow label="Tuyến cắt/giao" value={i.tuyenCat} />}
            {i.hinhThuc && <InfoRow label="Hình thức" value={i.hinhThuc} />}
            {i.dienTich && <InfoRow label="Diện tích (ha/m²)" value={i.dienTich} />}
            {i.chuDauTu && <InfoRow label="Chủ đầu tư" value={i.chuDauTu} />}
            <InfoRow label="Dữ liệu SHAPE" value="Sẵn sàng" highlight />
          </Section>
          <Section title="Ghi chú & Pháp lý">
            <p className="text-slate-600 text-sm">{i.ghiChu || "Dữ liệu pháp lý đang được cập nhật."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Giá long môn, Cột cần vươn
  if (title === "Giá long môn" || title === "Cột cần vươn") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin cột/giá">
            <InfoRow label="Tên công trình" value={i.fullName || title} highlight />
            <InfoRow label="Mã số" value={i.ma || i.idNumber || "—"} highlight />
            <InfoRow label="Chủng loại cột" value={i.chungLoaiCot || "Thép mạ kẽm"} />
            <InfoRow label="Vị trí lý trình" value={i.viTriLyTrinh || i.lyTrinh || "—"} />
            <InfoRow label="Chiều dài (m)" value={i.chieuDai || "—"} />
            <InfoRow label="Chiều cần vươn (m)" value={i.chieuCanVuon || "—"} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Phụ trợ đi kèm">
            <InfoRow label="Loại biển báo" value={i.loaiBienBao || "Biển chỉ dẫn"} />
            <InfoRow label="Đèn tín hiệu" value={i.denTinHieu || "Không có"} />
            <InfoRow label="Tình trạng" value={<Badge className="bg-green-50 text-green-700 border-green-200">{i.tinhTrang || "Tốt"}</Badge>} />
          </Section>
          <Section title="Quản lý">
            <InfoRow label="Đơn vị quản lý" value={i.donViQL || "Sở GTVT Hà Nội"} />
            <InfoRow label="Ngày áp dụng" value={i.ngayApDung || "—"} />
          </Section>
        </div>
      </div>
    );
  }

  // Đèn tín hiệu giao thông
  if (title === "Đèn tín hiệu giao thông" || title === "Nút đèn tín hiệu") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Hệ thống nút đèn">
            <InfoRow label="Tên nút" value={i.tenNut || i.fullName || "—"} highlight />
            <InfoRow label="Địa điểm" value={i.diaDiem || i.viTri || "—"} />
            <InfoRow label="Đơn vị quản lý" value={i.donViQL || "—"} />
            <InfoRow label="Tình trạng" value={<Badge variant="outline">{i.tinhTrang || "Đang hoạt động"}</Badge>} />
          </Section>
          <Section title="Thiết bị tủ điều khiển">
             <InfoRow label="Loại tủ" value={i.loaiTu || "Tủ điều khiển thông minh"} />
             <InfoRow label="Số lượng thiết bị" value={i.soLuongThietBi || "—"} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Cột đèn & Camera">
            <InfoRow label="Số lượng cột" value={i.soLuongCot || "4 cột"} />
            <InfoRow label="Cụm đèn" value={i.cumDen || "4 cụm"} />
            <InfoRow label="Camera hỗ trợ" value={i.hasCamera ? "Có" : "Không"} />
          </Section>
          <Section title="Ghi chú kỹ thuật">
             <p className="text-slate-600 text-sm">{i.ghiChu || "Hệ thống đang hoạt động ổn định, đồng bộ với trung tâm điều hành."}</p>
          </Section>
        </div>
      </div>
    );
  }

  // Camera, VMS, Đinh phản quang
  if (title === "Camera giao thông" || title === "Biển báo điện tử VMS" || title === "Đinh phản quang") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin thiết bị">
            <InfoRow label="Tên thiết bị" value={i.fullName || i.ten || title} highlight />
            <InfoRow label="Mã định danh" value={i.idNumber || i.ma || "—"} highlight />
            <InfoRow label="Loại thiết bị" value={i.loai || "—"} />
            <InfoRow label="Vị trí lắp đặt" value={i.viTri || "—"} />
            <InfoRow label="Tình trạng" value={<Badge className={i.tinhTrang === "Ngoại tuyến" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}>{i.tinhTrang || "Hoạt động"}</Badge>} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Thông số kỹ thuật">
            {title === "Biển báo điện tử VMS" && <InfoRow label="Nội dung hiển thị" value={i.content || "An toàn giao thông là hạnh phúc..."} highlight />}
            {title === "Camera giao thông" && <InfoRow label="Công nghệ AI" value={i.isAI ? "Đã tích hợp" : "Không"} />}
            {i.kichThuoc && <InfoRow label="Kích thước" value={i.kichThuoc} />}
            {i.soLuong && <InfoRow label="Số lượng" value={i.soLuong} />}
            <InfoRow label="Dữ liệu SHAPE" value="Đã kết nối bản đồ" />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">{i.ghiChu || "Thiết bị được kiểm tra định kỳ hàng tháng."}</p>
          </Section>
        </div>
      </div>
    );
  }
  // Đường sắt đô thị (Tuyến, Trụ, Depot, Ga)
  if (title.includes("đường sắt") || title === "Khu depot") {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin hạ tầng ĐSĐT">
            <InfoRow label="Tên công trình" value={i.fullName || i.tenGoi || title} highlight />
            <InfoRow label="Mã định danh" value={i.idNumber || i.maDinhDanh || "—"} highlight />
            <InfoRow label="Loại hình" value={i.loai || i.loaiGa || "—"} />
            <InfoRow label="Vị trí/Địa điểm" value={i.viTri || i.diaChi || "—"} />
            <InfoRow label="Tình trạng" value={<Badge variant="outline" className="bg-blue-50">{i.tinhTrang || "Hoạt động"}</Badge>} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Quy mô & Kỹ thuật">
            {i.chieuDai && <InfoRow label="Chiều dài (km)" value={i.chieuDai} />}
            {i.dienTich && <InfoRow label="Diện tích (ha)" value={i.dienTich} />}
            {i.diemDau && <InfoRow label="Điểm đầu" value={i.diemDau} />}
            {i.diemCuoi && <InfoRow label="Điểm cuối" value={i.diemCuoi} />}
            {i.ngayCapNhat && <InfoRow label="Ngày cập nhật" value={i.ngayCapNhat} />}
            <InfoRow label="Dữ liệu GIS" value="Khớp với SHAPE" highlight />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">Hệ thống đường sắt đô thị đang được vận hành và bảo trì theo tiêu chuẩn hiện hành.</p>
          </Section>
        </div>
      </div>
    );
  }

  // Tuyến/Luồng đường thủy
  if (title.includes("đường thủy") || title.includes("Luồng")) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Section title="Thông tin luồng tuyến">
            <InfoRow label="Tên luồng/tuyến" value={i.fullName || title} highlight />
            <InfoRow label="Mã định danh" value={i.idNumber || i.maDinhDanh || "—"} highlight />
            <InfoRow label="Cấp kỹ thuật" value={i.loai || "Cấp I - III"} />
            <InfoRow label="Tình trạng" value={<Badge variant="outline">{i.tinhTrang || "Thoát nước tốt"}</Badge>} />
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Phạm vi & Quy mô">
            <InfoRow label="Chiều dài (km)" value={i.chieuDai || "—"} />
            <InfoRow label="Điểm đầu" value={i.diemDau || "—"} />
            <InfoRow label="Điểm cuối" value={i.diemCuoi || "—"} />
          </Section>
          <Section title="Ghi chú">
            <p className="text-slate-600 text-sm">Dữ liệu luồng chạy tàu được cập nhật định kỳ theo mùa lũ/cạn.</p>
          </Section>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <Section title="Thông tin cơ bản">
          <InfoRow label="Tên đường" value={i.fullName || i.tenDuong} highlight />
          <InfoRow label="Mã đường" value={i.idNumber || i.maDuong} highlight />
          <InfoRow label="Độ dài" value={i.birthDate || i.chieuDai ? `${i.birthDate || i.chieuDai} km` : "N/A"} />
          <InfoRow label="Loại" value={i.gender || i.loaiDuong || "N/A"} />
          <InfoRow label="Tình trạng" value={<Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-xs">{i.status || i.trangThai || "N/A"}</Badge>} />
        </Section>
        <Section title="Vị trí">
          <InfoRow label="Điểm bắt đầu" value={i.fatherName || i.diemDau || "N/A"} />
          <InfoRow label="Điểm kết thúc" value={i.motherName || i.diemCuoi || "N/A"} />
          <InfoRow label="Tọa độ GPS" value="21.0285°N, 105.8542°E" />
        </Section>
      </div>
      <div className="space-y-4">
        <Section title="Thông tin quản lý">
          <InfoRow label="Ngày đăng ký" value={i.registrationDate || "N/A"} />
          <InfoRow label="Ngày đồng bộ" value={i.syncDate || "N/A"} />
          <InfoRow label="Trạng thái" value={
            <Badge variant="outline" className={i.condition === "Đã phê duyệt" ? "bg-green-50 text-green-700 border-green-100 text-xs" : "bg-yellow-50 text-yellow-700 border-yellow-100 text-xs"}>
              {i.condition || "N/A"}
            </Badge>
          } />
          <InfoRow label="Quốc tịch" value={i.nationality || "N/A"} />
        </Section>
        <Section title="Ghi chú">
          <p className="text-slate-600 text-sm">Không có ghi chú nào cho tài sản này.</p>
        </Section>
      </div>
    </div>
  );
}

// ---- Main Component ----
export function DetailDialog({ open, onOpenChange, selectedCard, selectedItem, onEditClick }: DetailDialogProps) {
  const [activeTab, setActiveTab] = useState("info");
  const title = selectedCard?.title || "";
  const i = selectedItem || {};

  const maintenanceData = MAINTENANCE_MOCK[title] || MAINTENANCE_MOCK["default"];

  // Tab thêm cho cầu lớn
  const isBridgeLarge = title === "Cầu lớn" || i.maCau?.startsWith("BR-");
  const isRoad = title === "Tổng số tuyến đường";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[80%] max-h-[95vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-6">
        <DialogHeader className="border-b border-slate-100 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-slate-900 text-lg">
                Chi tiết {title || "Tài sản"}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500">
                Xem thông tin chi tiết tài sản
              </DialogDescription>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-blue-600">Đồng bộ cuối lúc 13:30 25/04/2026</p>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={onEditClick}>
                <Edit className="size-4 mr-2" />Sửa
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden min-h-0">
          <TabsList className="bg-slate-50 border-b border-slate-200 rounded-none justify-start w-full h-12 flex-shrink-0 overflow-x-auto">
            {[
              { value: "info", label: "Thông tin chi tiết" },
              { value: "map", label: "Vị trí" },
              { value: "technical", label: "Thông tin kỹ thuật" },
              { value: "maintenance", label: "Lịch sử duy tu" },
              { value: "inspection", label: "Lịch sử kiểm tra" },
              ...(isBridgeLarge ? [
                { value: "bridge-piers", label: "Mố trụ" },
                { value: "bridge-spans", label: "Nhịp cầu" },
                { value: "bridge-bearings", label: "Gối cầu" },
              ] : []),
              ...(isRoad ? [
                { value: "road-geometry", label: "Yếu tố hình học" },
                { value: "road-legal", label: "Văn bản pháp lý" },
              ] : []),
            ].map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-slate-500 text-sm px-5 py-2 whitespace-nowrap">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* TAB 1: THÔNG TIN CHI TIẾT */}
          <TabsContent value="info" className="flex-1 overflow-auto mt-4 min-h-0">
            <RenderDetailInfo selectedCard={selectedCard} selectedItem={selectedItem} />
          </TabsContent>

          {/* TAB 2: VỊ TRÍ */}
          <TabsContent value="map" className="flex-1 mt-4 data-[state=active]:flex flex-col min-h-[400px]">
            <div className="flex-1 border border-slate-100 rounded-lg p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900 font-semibold">Bản đồ vị trí tài sản</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-xs">
                  <MapPin className="size-3 mr-1" />21.0285°N, 105.8542°E
                </Badge>
              </div>
              <div className="flex-1 rounded-lg overflow-hidden border border-slate-200/50 shadow-inner">
                <SimpleMapView
                  key={activeTab === "map" ? "active-map" : "inactive-map"}
                  height="420px"
                  isActive={activeTab === "map"}
                  center={[21.0285, 105.8542]}
                  zoom={14}
                  markers={[{
                    id: i.id || "detail-marker",
                    lat: 21.0285,
                    lng: 105.8542,
                    name: i.fullName || i.tenCau || i.tenHam || i.ten || "Vị trí tài sản",
                    type: title || "Dữ liệu"
                  }]}
                />
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: THÔNG TIN KỸ THUẬT */}
          <TabsContent value="technical" className="flex-1 overflow-auto mt-4 min-h-0">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Section title="Thông số kỹ thuật">
                  <InfoRow label="Chiều rộng mặt đường" value="12.5 m" />
                  <InfoRow label="Số làn xe" value="4 làn" />
                  <InfoRow label="Loại mặt đường" value="Bê tông nhựa" />
                  <InfoRow label="Tải trọng thiết kế" value="H30" />
                  <InfoRow label="Vận tốc thiết kế" value="80 km/h" />
                </Section>
                <Section title="Kết cấu áo đường">
                  <InfoRow label="Lớp mặt" value="Bê tông nhựa 5cm" />
                  <InfoRow label="Lớp liên kết" value="Bê tông nhựa 7cm" />
                  <InfoRow label="Lớp móng" value="Cấp phối đá dăm 20cm" />
                </Section>
              </div>
              <div className="space-y-4">
                <Section title="Thông tin xây dựng">
                  <InfoRow label="Năm xây dựng" value="2018" />
                  <InfoRow label="Năm nâng cấp" value="2023" />
                  <InfoRow label="Nhà thầu thi công" value="Công ty TNHH XD ABC" />
                  <InfoRow label="Đơn vị giám sát" value="Công ty CP Tư vấn XYZ" />
                  <InfoRow label="Chủ đầu tư" value="Sở GTVT Hà Nội" />
                </Section>
                <Section title="Hồ sơ đính kèm">
                  {["Bản vẽ thiết kế.pdf", "Hồ sơ hoàn công.pdf"].map((f) => (
                    <div key={f} className="flex items-center justify-between p-2 bg-white border border-slate-200 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-blue-600" />
                        <span className="text-slate-900 text-sm">{f}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Eye className="size-4" />
                      </Button>
                    </div>
                  ))}
                </Section>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: LỊCH SỬ DUY TU (từ thongtinduytu.md) */}
          <TabsContent value="maintenance" className="flex-1 overflow-auto mt-4 min-h-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="size-4 text-orange-500" />
                <h3 className="font-semibold text-slate-800">Lịch sử duy tu bảo dưỡng</h3>
                <Badge variant="outline" className="text-xs">{maintenanceData.length} lần</Badge>
              </div>
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">STT</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Ngày thực hiện</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Loại duy tu</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Nội dung</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Đơn vị thực hiện</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Khối lượng</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceData.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-600">{idx + 1}</td>
                        <td className="py-3 px-4 font-medium">{row.ngay}</td>
                        <td className="py-3 px-4 text-blue-600 font-medium whitespace-nowrap">{row.loai}</td>
                        <td className="py-3 px-4 text-slate-600">{row.noiDung}</td>
                        <td className="py-3 px-4 text-slate-600">{row.donVi}</td>
                        <td className="py-3 px-4 font-medium">{row.khLuong}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 text-xs">{row.tinhTrang}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: LỊCH SỬ KIỂM TRA */}
          <TabsContent value="inspection" className="flex-1 overflow-auto mt-4 min-h-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardCheck className="size-4 text-blue-500" />
                <h3 className="font-semibold text-slate-800">Lịch sử kiểm tra định kỳ</h3>
                <Badge variant="outline" className="text-xs">{INSPECTION_MOCK.length} lần</Badge>
              </div>
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">STT</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Ngày kiểm tra</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Loại kiểm tra</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Kết quả</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Người kiểm tra</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Ghi chú</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INSPECTION_MOCK.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-slate-600">{idx + 1}</td>
                        <td className="py-3 px-4 font-medium">{row.ngay}</td>
                        <td className="py-3 px-4 text-blue-600 font-medium whitespace-nowrap">{row.loai}</td>
                        <td className="py-3 px-4 text-slate-700">{row.ketQua}</td>
                        <td className="py-3 px-4 text-slate-600">{row.nguoi}</td>
                        <td className="py-3 px-4 text-slate-600">{row.ghiChu}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={row.kq === "Đạt" ? "bg-green-50 text-green-700 border-green-100 text-xs" : "bg-yellow-50 text-yellow-700 border-yellow-200 text-xs"}>
                            {row.kq}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Mố trụ (Cầu lớn) */}
          {isBridgeLarge && (
            <TabsContent value="bridge-piers" className="flex-1 overflow-auto mt-4 min-h-0">
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Ký hiệu</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Loại</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Cao độ</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{ky:"M1",loai:"Mố chữ U",cao:"12.5m"},{ky:"T1",loai:"Trụ thân hẹp",cao:"10.2m"},{ky:"T2",loai:"Trụ thân hẹp",cao:"10.2m"},{ky:"M2",loai:"Mố chữ U",cao:"12.5m"}].map((r,i)=>(
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold">{r.ky}</td>
                        <td className="py-3 px-4 text-slate-600">{r.loai}</td>
                        <td className="py-3 px-4 text-slate-600">{r.cao}</td>
                        <td className="py-3 px-4"><Badge variant="outline" className="bg-green-50 text-green-700 text-xs">Tốt</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}

          {/* Nhịp cầu */}
          {isBridgeLarge && (
            <TabsContent value="bridge-spans" className="flex-1 overflow-auto mt-4 min-h-0">
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Tên nhịp</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Chiều dài</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Kết cấu</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Vật liệu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Nhịp 1","Nhịp 2","Nhịp 3"].map((n,i)=>(
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium">{n}</td>
                        <td className="py-3 px-4 text-slate-600">33m</td>
                        <td className="py-3 px-4 text-slate-600">Dầm Super-T</td>
                        <td className="py-3 px-4 text-slate-600">BTCT Dự ứng lực</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}

          {/* Gối cầu */}
          {isBridgeLarge && (
            <TabsContent value="bridge-bearings" className="flex-1 overflow-auto mt-4 min-h-0">
              <div className="border border-slate-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Vị trí</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Loại gối</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Số lượng</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["M1","T1","T2","M2"].map((p,i)=>(
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold">{p}</td>
                        <td className="py-3 px-4 text-slate-600">Gối cao su cốt bản thép</td>
                        <td className="py-3 px-4 text-slate-600">4</td>
                        <td className="py-3 px-4"><Badge variant="outline" className="bg-green-50 text-green-700 text-xs">Tốt</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}

          {/* Road tabs */}
          {isRoad && (
            <>
              <TabsContent value="road-geometry" className="flex-1 overflow-auto mt-4 min-h-0">
                <div className="grid grid-cols-2 gap-6">
                  <Section title="Thông số mặt cắt">
                    <InfoRow label="Bề rộng nền đường" value="20.5m" />
                    <InfoRow label="Bề rộng mặt đường" value="15.0m" />
                    <InfoRow label="Bề rộng lề đường" value="2.5m x 2" />
                  </Section>
                  <Section title="Bình đồ & trắc dọc">
                    <InfoRow label="Độ dốc dọc max" value="4.5%" />
                    <InfoRow label="Bán kính đường cong min" value="250m" />
                  </Section>
                </div>
              </TabsContent>
              <TabsContent value="road-legal" className="flex-1 overflow-auto mt-4 min-h-0">
                <div className="border border-slate-100 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Số hiệu văn bản</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Ngày ban hành</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Trích yếu nội dung</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">123/QD-UBND</td>
                        <td className="py-3 px-4 text-slate-600">10/05/2020</td>
                        <td className="py-3 px-4 text-slate-600">Phê duyệt quy hoạch tuyến đường</td>
                        <td className="py-3 px-4"><Button size="sm" variant="ghost" className="text-blue-600"><Eye className="size-4" /></Button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
