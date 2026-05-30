import { createBrowserRouter } from "react-router";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/DashboardPage";
import OverviewPage from "./pages/OverviewPage";
import QuanLyHaTang from "./pages/quan-ly-ha-tang/QuanLyHaTang";
import ProjectManagement from "./pages/quan-ly-ha-tang/ProjectManagement";
import BaoVeHaTang from "./pages/bao-ve-ha-tang/BaoVeHaTang";
import TuyenDuongBo from "./pages/duong-bo/TuyenDuongBo";
import DoanDiaPhanList from "./pages/duong-bo/DoanDiaPhanList";
import DoanMatCatList from "./pages/duong-bo/DoanMatCatList";
import CauLonList from "./pages/cau/CauLonList";
import HamDuongBo from "./pages/HamDuongBo";
import DuongNgang from "./pages/DuongNgang";
import NutGiao from "./pages/NutGiao";
import HanhLangAnToan from "./pages/HanhLangAnToan";
import BienBao from "./pages/cong-trinh-phu-tro/BienBao";
import CongTrinhAnToan from "./pages/cong-trinh-phu-tro/CongTrinhAnToan";
import HeThongThoatNuoc from "./pages/cong-trinh-phu-tro/HeThongThoatNuoc";
import CauKhacList from "./pages/cau/CauKhacList";
import DauNoi from "./pages/DauNoi";
import DenTinHieu from "./pages/cong-nghe/DenTinHieu";
import CameraGiaoThong from "./pages/cong-nghe/CameraGiaoThong";
import BienVMS from "./pages/cong-nghe/BienVMS";
import HaTangVanTai from "./pages/HaTangVanTai";
import CauVuotNheList from "./pages/cau/CauVuotNheList";
import CauNhoTrungList from "./pages/cau/CauNhoTrungList";
import CauDiBoList from "./pages/cau/CauDiBoList";
import HoGaList from "./pages/cong-trinh-phu-tro/HoGaList";
import CotKmList from "./pages/cong-trinh-phu-tro/CotKmList";
import CocHList from "./pages/cong-trinh-phu-tro/CocHList";
import CongList from "./pages/cong-trinh-phu-tro/CongList";
import LoiReList from "./pages/cong-trinh-phu-tro/LoiReList";
import KeList from "./pages/cong-trinh-phu-tro/KeList";
import DoanCocTieuList from "./pages/cong-trinh-phu-tro/DoanCocTieuList";
import VachKeDuongList from "./pages/cong-trinh-phu-tro/VachKeDuongList";
import GiaLongMonList from "./pages/cong-trinh-phu-tro/GiaLongMonList";
import CotCanVuonList from "./pages/cong-trinh-phu-tro/CotCanVuonList";
import DinhPhanQuangList from "./pages/cong-trinh-phu-tro/DinhPhanQuangList";
import LanCanList from "./pages/cong-trinh-phu-tro/LanCanList";
import DaiPhanCachList from "./pages/cong-trinh-phu-tro/DaiPhanCachList";
import RanhNuocList from "./pages/cong-trinh-phu-tro/RanhNuocList";
import RoadSectionPlan from "./pages/binh-do/RoadSectionPlan";
import BridgePlan from "./pages/binh-do/BridgePlan";
import IntersectionPlan from "./pages/binh-do/IntersectionPlan";
import SuaChuaMatDuong from "./pages/maintain/SuaChuaMatDuong";
import SuaChuaCauLon from "./pages/maintain/SuaChuaCauLon";
import DuyTuPhuTro from "./pages/maintain/DuyTuPhuTro";
import BanGiaoXDCB from "./pages/maintain/BanGiaoXDCB";
import TuanTra from "./pages/maintain/TuanTra";
import KiemTraKCHT from "./pages/maintain/KiemTraKCHT";
import ToChucGiaoThong from "./pages/duong-bo/ToChucGiaoThong";
import {
  BaoCaoHienTrangCauDuong, BaoCaoHienTrangHoGa, BaoCaoDuyTuDenTinHieu,
  BaoCaoVanHanhDen, BaoCaoNutGiaoChuaDen, BaoCaoPhanAnhSuCo, BaoCaoThongKeTuanDuong,
  BaoCaoKhongTuanDuong, BaoCaoSoLanTuanDuong, BaoCaoTuanKiem, NhatKyTuanDuong,
  NhatKyTuanKiem, NhatKyTuanDen,
  BaoCaoChiTietBienBao, BaoCaoChiTietCotKm,
  BaoCaoDanhSachCauLon, BaoCaoDanhSachTuyenDuong, BaoCaoChiTietCong
} from "./pages/reports/BaoCao";
import CategoryList from "./pages/categories/CategoryList";
import WaterwayInfrastructureList from "./pages/duong-thuy/WaterwayInfrastructureList";
import RailwayInfrastructureList from "./pages/duong-sat/RailwayInfrastructureList";
import AdminOperationList from "./pages/admin/AdminOperationList";
import NotificationManagement from "./pages/admin/NotificationManagement";
import UserManagement from "./pages/admin/UserManagement";
import CauHinhChungHeThong from "./pages/admin/CauHinhChungHeThong";
import ChinhSachMatKhau from "./pages/admin/ChinhSachMatKhau";
import NhomQuyenNguoiDung from "./pages/admin/NhomQuyenNguoiDung";
import NhatKyHoatDong from "./pages/admin/NhatKyHoatDong";
import Login from "./pages/auth/Login";
import { Anchor, Navigation, Waves, Compass, Milestone, LifeBuoy, Ruler as RulerIcon, Route as RouteIcon, Building2 as Building2Icon, LandPlot as LandPlotIcon, Settings, ShieldCheck, Zap, Activity, UserCheck, RefreshCw, Code2, Users, Lock, History, AlertTriangle, FileText, Bell, LayoutDashboard, Map } from "lucide-react";
import RealtimeTracking from "./pages/RealtimeTracking";
import NghiemThuSuCo from "./pages/NghiemThuSuCo";
import TrafficHeatmap from "./pages/TrafficHeatmap";
import TrafficStatistics from "./pages/TrafficStatistics";
import GiayPhepDaoDuong from "./pages/cap-phep/GiayPhepDaoDuong";
import SystemConfig from "./pages/SystemConfig";
import DanhMucPhanQuyen from "./pages/admin/DanhMucPhanQuyen";
import DanhMucTinh from "./pages/admin/DanhMucTinh";
import GenericCategoryManagement from "./pages/admin/GenericCategoryManagement";
import DanhMucTaiSan from './pages/admin/DanhMucTaiSan';
import QuanLyDichVu from './pages/admin/integration/QuanLyDichVu';
import GiamSatDichVu from './pages/admin/integration/GiamSatDichVu';
import CauHinhDichVu from './pages/admin/integration/CauHinhDichVu';
import DataSharingServiceDoc from './pages/admin/integration/DataSharingServiceDoc';
import NotFound from "./pages/NotFound";
const loaiPhanAnhItems = [
  { id: "1", code: "LPA-001", name: "Hư hỏng mặt đường", description: "Mặt đường bị nứt nẻ, ổ gà, bong tróc", file: null },
  { id: "2", code: "LPA-002", name: "Vết nứt kết cấu", description: "Vết nứt trên cầu, hầm, dầm, trụ", file: "Quy_trinh_LPA002.pdf" },
  { id: "3", code: "LPA-003", name: "Ngập nước", description: "Đường ngập nước do mưa bão, tắc cống", file: null },
  { id: "4", code: "LPA-004", name: "Đèn chiếu sáng hỏng", description: "Đèn bị cháy, không sáng hoặc hỏng tủ điện", file: null },
  { id: "5", code: "LPA-005", name: "Xây dựng trái phép", description: "Xây dựng vi phạm hành lang ATGT", file: "Luat_XD.pdf" },
  { id: "6", code: "LPA-006", name: "Lấn chiếm vỉa hè", description: "Sử dụng vỉa hè, lòng đường trái phép", file: null },
  { id: "7", code: "LPA-007", name: "Đổ phế thải", description: "Xả rác, đổ trộm phế thải vật liệu xây dựng", file: "Nghi_dinh_PT.pdf" },
  { id: "8", code: "LPA-008", name: "Cắt đường trái phép", description: "Đào đường không có giấy phép thi công", file: null },
];

const mucDoSuCoItems = [
  { id: "1", code: "MD-001", name: "Nghiêm trọng", description: "Gây cản trở giao thông nghiêm trọng, nguy cơ tai nạn cao", file: "Quy_dinh_MD01.pdf" },
  { id: "2", code: "MD-002", name: "Trung bình", description: "Ảnh hưởng một phần lưu thông, cần xử lý sớm", file: null },
  { id: "3", code: "MD-003", name: "Nhẹ", description: "Chỉ ảnh hưởng thẩm mỹ hoặc ít ảnh hưởng đến an toàn", file: null },
];

const nguyenNhanSuCoItems = [
  { id: "1", code: "NN-001", name: "Tai nạn giao thông", description: "Hư hỏng do phương tiện va chạm", file: null },
  { id: "2", code: "NN-002", name: "Thiên tai, bão lụt", description: "Nguyên nhân khách quan do thời tiết", file: "Huong_dan_bao_lut.pdf" },
  { id: "3", code: "NN-003", name: "Hao mòn tự nhiên", description: "Hết thời gian sử dụng, xuống cấp tự nhiên", file: null },
  { id: "4", code: "NN-004", name: "Thi công sai quy chuẩn", description: "Công trình thi công không đảm bảo chất lượng", file: "Tieu_chuan_VN.pdf" },
  { id: "5", code: "NN-005", name: "Ý thức người dân kém", description: "Do phá hoại, trộm cắp vật tư giao thông", file: null },
];

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: OverviewPage },
      { path: "ban-do", Component: Dashboard },
      // Quản lý hạ tầng
      { path: "quan-ly-ha-tang", Component: QuanLyHaTang },
      { path: "quan-ly-du-an", Component: ProjectManagement },
      { path: "to-chuc-giao-thong", Component: ToChucGiaoThong },
      // Duy tu & bảo trì
      { path: "bao-ve-ha-tang", Component: BaoVeHaTang },
      { path: "duy-tu/sua-chua-mat-duong", Component: SuaChuaMatDuong },
      { path: "duy-tu/sua-chua-cau-lon", Component: SuaChuaCauLon },
      { path: "duy-tu/phu-tro", Component: DuyTuPhuTro },
      { path: "duy-tu/cau-ham", Component: DuyTuPhuTro },
      { path: "duy-tu/ket-cau-phu-tro", Component: DuyTuPhuTro },
      { path: "duy-tu/bao-hieu-chi-dan", Component: DuyTuPhuTro },
      { path: "duy-tu/tin-hieu-camera", Component: DuyTuPhuTro },
      { path: "duy-tu/giao-cat-khac", Component: DuyTuPhuTro },
      { path: "duy-tu/ban-giao-xdcb", Component: BanGiaoXDCB },
      { path: "bao-ve/tuan-tra", Component: TuanTra },
      { path: "bao-ve/kiem-tra-kcht", Component: KiemTraKCHT },
      // Báo cáo
      { path: "bao-cao/hien-trang-cau-duong", Component: BaoCaoHienTrangCauDuong },
      { path: "bao-cao/chi-tiet-bien-bao", Component: BaoCaoChiTietBienBao },
      { path: "bao-cao/chi-tiet-cot-km", Component: BaoCaoChiTietCotKm },
      { path: "bao-cao/danh-sach-cau-lon", Component: BaoCaoDanhSachCauLon },
      { path: "bao-cao/danh-sach-tuyen-duong", Component: BaoCaoDanhSachTuyenDuong },
      { path: "bao-cao/chi-tiet-cong", Component: BaoCaoChiTietCong },
      { path: "bao-cao/hien-trang-ho-ga", Component: BaoCaoHienTrangHoGa },
      { path: "bao-cao/duy-tu-den-tin-hieu", Component: BaoCaoDuyTuDenTinHieu },
      { path: "bao-cao/van-hanh-den", Component: BaoCaoVanHanhDen },
      { path: "bao-cao/nut-giao-chua-den", Component: BaoCaoNutGiaoChuaDen },
      // Báo cáo – I.9.2 Công tác bảo vệ
      { path: "bao-cao/phan-anh-su-co", Component: BaoCaoPhanAnhSuCo },
      { path: "bao-cao/thong-ke-tuan-duong", Component: BaoCaoThongKeTuanDuong },
      { path: "bao-cao/khong-tuan-duong", Component: BaoCaoKhongTuanDuong },
      { path: "bao-cao/so-lan-tuan-duong", Component: BaoCaoSoLanTuanDuong },
      { path: "bao-cao/tuan-kiem", Component: BaoCaoTuanKiem },
      { path: "bao-cao/nhat-ky-tuan-duong", Component: NhatKyTuanDuong },
      { path: "bao-cao/nhat-ky-tuan-kiem", Component: NhatKyTuanKiem },
      { path: "bao-cao/nhat-ky-tuan-den", Component: NhatKyTuanDen },
      // Quản lý đường bộ
      { path: "duong-bo/tuyen", Component: TuyenDuongBo },
      { path: "duong-bo/doan-dia-phan", Component: DoanDiaPhanList },
      { path: "duong-bo/doan-mat-cat", Component: DoanMatCatList },
      // Quản lý cầu
      { path: "cau/lon", Component: CauLonList },
      { path: "cau/nho-trung", Component: CauNhoTrungList },
      { path: "cau/vuot-nhe", Component: CauVuotNheList },
      { path: "cau/di-bo", Component: CauDiBoList },
      // Quản lý hầm
      { path: "ham", Component: HamDuongBo },
      // Quản lý đường ngang
      { path: "duong-ngang", Component: DuongNgang },
      // Quản lý nút giao
      { path: "nut-giao", Component: NutGiao },
      // Hành lang an toàn
      { path: "hanh-lang-an-toan", Component: HanhLangAnToan },
      // Công trình phụ trợ
      { path: "phu-tro/bien-bao", Component: BienBao },
      { path: "phu-tro/an-toan", Component: CongTrinhAnToan },
      { path: "phu-tro/thoat-nuoc", Component: HeThongThoatNuoc },
      { path: "phu-tro/ho-ga", Component: HoGaList },
      { path: "phu-tro/cot-km", Component: CotKmList },
      { path: "phu-tro/coc-h", Component: CocHList },
      { path: "phu-tro/cong", Component: CongList },
      { path: "phu-tro/loi-re", Component: LoiReList },
      { path: "phu-tro/ke", Component: KeList },
      { path: "phu-tro/ranh-nuoc", Component: RanhNuocList },
      { path: "phu-tro/dai-phan-cach", Component: DaiPhanCachList },
      { path: "phu-tro/lan-can", Component: LanCanList },
      { path: "phu-tro/coc-tieu", Component: DoanCocTieuList },
      { path: "phu-tro/vach-ke", Component: VachKeDuongList },
      { path: "phu-tro/gia-long-mon", Component: GiaLongMonList },
      { path: "phu-tro/cot-can-vuon", Component: CotCanVuonList },
      { path: "phu-tro/dinh-phan-quang", Component: DinhPhanQuangList },
      // Hệ thống công nghệ
      { path: "cong-nghe/den-tin-hieu", Component: DenTinHieu },
      { path: "cong-nghe/camera", Component: CameraGiaoThong },
      { path: "cong-nghe/vms", Component: BienVMS },
      // Đấu nối & Hạ tầng vận tải
      { path: "dau-noi", Component: DauNoi },
      // Các chức năng màn hình bổ sung (Gap Resolution)
      { path: "tuyen-duong/giam-sat-realtime", Component: RealtimeTracking },
      { path: "bao-tri/nghiem-thu", Component: NghiemThuSuCo },
      { path: "luu-luong/heatmap", Component: TrafficHeatmap },
      { path: "luu-luong/thong-ke", Component: TrafficStatistics },
      { path: "cap-phep/giay-phep-dao-duong", Component: GiayPhepDaoDuong },
      { path: "he-thong/cau-hinh", Component: SystemConfig },
      { path: "ha-tang-van-tai", Component: HaTangVanTai },

      // Quản lý đường thủy nội địa
      { path: "duong-thuy/tuyen", element: <WaterwayInfrastructureList title="Tuyến đường thủy nội địa" category="Kết cấu hạ tầng đường thủy" icon={<Waves className="size-8 text-blue-600" />} /> },
      { path: "duong-thuy/nhanh-luong", element: <WaterwayInfrastructureList title="Nhánh của Luồng chạy tàu thuyền" category="Kết cấu hạ tầng đường thủy" icon={<Navigation className="size-8 text-blue-500" />} /> },

      // Quản lý báo hiệu đường thủy nội địa
      { path: "duong-thuy/bien-bao", element: <WaterwayInfrastructureList title="Biển báo đường thủy" category="Báo hiệu đường thủy" icon={<Milestone className="size-8 text-orange-500" />} /> },
      { path: "duong-thuy/den-hieu", element: <WaterwayInfrastructureList title="Đèn hiệu đường thủy" category="Báo hiệu đường thủy" icon={<Compass className="size-8 text-yellow-500" />} /> },
      { path: "duong-thuy/cot-bien-bao", element: <WaterwayInfrastructureList title="Cột biển báo đường thủy" category="Báo hiệu đường thủy" icon={<Milestone className="size-8 text-slate-500" />} /> },
      { path: "duong-thuy/phao", element: <WaterwayInfrastructureList title="Phao" category="Báo hiệu đường thủy" icon={<LifeBuoy className="size-8 text-red-500" />} /> },
      { path: "duong-thuy/cot-thuy-chi", element: <WaterwayInfrastructureList title="Cột thủy chí" category="Báo hiệu đường thủy" icon={<RulerIcon className="size-8 text-teal-600" />} /> },

      // Công trình phụ trợ khác
      { path: "duong-thuy/phu-tro-khac", element: <WaterwayInfrastructureList title="Công trình phụ trợ khác" category="Hạ tầng đường thủy" icon={<Anchor className="size-8 text-slate-400" />} /> },

      // Quản lý đường sắt đô thị
      { path: "duong-sat/tuyen", element: <RailwayInfrastructureList title="Tuyến đường sắt đô thị" category="Kết cấu hạ tầng đường sắt" icon={<RouteIcon className="size-8 text-blue-700" />} /> },
      { path: "duong-sat/tru-cau", element: <RailwayInfrastructureList title="Trụ cầu đường sắt đô thị" category="Kết cấu hạ tầng đường sắt" icon={<Building2Icon className="size-8 text-slate-600" />} /> },
      { path: "duong-sat/khu-depot", element: <RailwayInfrastructureList title="Khu depot đường sắt đô thị" category="Kết cấu hạ tầng đường sắt" icon={<LandPlotIcon className="size-8 text-teal-600" />} /> },
      { path: "duong-sat/ga", element: <RailwayInfrastructureList title="Ga đường sắt đô thị" category="Kết cấu hạ tầng đường sắt" icon={<Navigation className="size-8 text-indigo-600" />} /> },

      // Dữ liệu danh mục phản ánh, xử lý sự cố
      { path: "danh-muc/loai-phan-anh", element: <CategoryList title="Quy định danh mục loại phản ánh" categoryGroup="Quản lý danh mục" initialItems={loaiPhanAnhItems} /> },
      { path: "danh-muc/muc-do-su-co", element: <CategoryList title="Quy định danh mục mức độ sự cố" categoryGroup="Quản lý danh mục" initialItems={mucDoSuCoItems} /> },
      { path: "danh-muc/nguyen-nhan-su-co", element: <CategoryList title="Quy định danh mục nguyên nhân sự cố" categoryGroup="Quản lý danh mục" initialItems={nguyenNhanSuCoItems} /> },

      // I.3.1 Dữ liệu danh mục đường bộ – redirect từ nhóm cha
      { path: "danh-muc/duong-bo", element: <CategoryList title="Loại đường bộ" categoryGroup="Danh mục đường bộ" /> },
      { path: "danh-muc/duong-bo/loai-duong", element: <CategoryList title="Loại đường bộ" categoryGroup="Danh mục đường bộ" /> },
      { path: "danh-muc/duong-bo/cap-duong", element: <CategoryList title="Cấp đường bộ" categoryGroup="Danh mục đường bộ" /> },
      { path: "danh-muc/duong-bo/bac-duong", element: <CategoryList title="Bậc đường bộ" categoryGroup="Danh mục đường bộ" /> },
      { path: "danh-muc/duong-bo/cap-ky-thuat", element: <CategoryList title="Cấp kỹ thuật đường bộ" categoryGroup="Danh mục đường bộ" /> },
      { path: "danh-muc/duong-bo/cap-quy-hoach", element: <CategoryList title="Cấp quy hoạch đường bộ" categoryGroup="Danh mục đường bộ" /> },
      { path: "danh-muc/duong-bo/ket-cau-mat", element: <CategoryList title="Loại kết cấu mặt đường bộ" categoryGroup="Danh mục đường bộ" /> },
      { path: "danh-muc/duong-bo/tinh-trang", element: <CategoryList title="Loại tình trạng đường" categoryGroup="Danh mục đường bộ" /> },

      // I.3.2 Dữ liệu danh mục cầu, Hầm đường bộ
      { path: "danh-muc/cau-ham/cau-lon", element: <CategoryList title="Loại cầu lớn" categoryGroup="Danh mục cầu, hầm" /> },
      { path: "danh-muc/cau-ham/cau-nho", element: <CategoryList title="Loại cầu nhỏ" categoryGroup="Danh mục cầu, hầm" /> },
      { path: "danh-muc/cau-ham/goi-cau", element: <CategoryList title="Loại gối cầu" categoryGroup="Danh mục cầu, hầm" /> },
      { path: "danh-muc/cau-ham/ham", element: <CategoryList title="Loại hầm đường bộ" categoryGroup="Danh mục cầu, hầm" /> },

      // I.3.3 Dữ liệu danh mục công trình phụ trợ
      { path: "danh-muc/phu-tro/cot-bien-bao", element: <CategoryList title="Loại cột biển báo" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/bien-bao", element: <CategoryList title="Loại biển báo" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/guong-cau-loi", element: <CategoryList title="Loại kích thước gương cầu lồi" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/coc-tieu", element: <CategoryList title="Loại cọc tiêu" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/cong", element: <CategoryList title="Loại cống" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/khau-do-cong", element: <CategoryList title="Loại khẩu độ cống" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/ket-cau", element: <CategoryList title="Loại kết cấu" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/coc-h", element: <CategoryList title="Loại cọc H" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/cot-km", element: <CategoryList title="Loại cột Km" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/hang-rao", element: <CategoryList title="Loại hàng rào" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/dai-phan-cach", element: <CategoryList title="Loại dải phân cách" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/tuong-chan", element: <CategoryList title="Loại tường chắn" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/bo-via", element: <CategoryList title="Loại bó vỉa" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/dao-giao-thong", element: <CategoryList title="Loại đảo giao thông" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/moc-lo-gioi", element: <CategoryList title="Loại cột mốc lộ giới" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/phat-quang", element: <CategoryList title="Loại phát quang" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/ho-ga", element: <CategoryList title="Loại hố ga" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/ranh-nuoc", element: <CategoryList title="Loại rãnh nước" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/lan-can", element: <CategoryList title="Loại lan can phòng hộ" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/ke", element: <CategoryList title="Loại kè" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/vach-ke", element: <CategoryList title="Loại vạch kẻ đường" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/khe-co-gian", element: <CategoryList title="Loại khe co giãn" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/ket-cau-xu-ly", element: <CategoryList title="Loại kết cấu xử lý" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/tinh-trang-khac", element: <CategoryList title="Loại tình trạng khác" categoryGroup="Danh mục phụ trợ" /> },
      { path: "danh-muc/phu-tro/go-giam-toc", element: <CategoryList title="Loại gồ giảm tốc" categoryGroup="Danh mục phụ trợ" /> },

      // I.3.4 Dữ liệu danh mục công nghệ
      { path: "danh-muc/cong-nghe/den-tin-hieu", element: <CategoryList title="Loại đèn tín hiệu giao thông" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/tu-den", element: <CategoryList title="Loại tủ đèn tín hiệu giao thông" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/cable-den", element: <CategoryList title="Loại cable điều khiển đèn" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/ong-cable", element: <CategoryList title="Loại ống đi cable" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/pin-mat-troi", element: <CategoryList title="Loại pin năng lượng mặt trời" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/cot-camera", element: <CategoryList title="Loại cột camera" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/camera", element: <CategoryList title="Loại camera" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/cable-camera", element: <CategoryList title="Loại cable điều khiển camera" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/vms", element: <CategoryList title="Loại biển điện tử VMS" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/tu-vms", element: <CategoryList title="Loại Tủ điều khiển biển VMS" categoryGroup="Danh mục công nghệ" /> },
      { path: "danh-muc/cong-nghe/cot-vms", element: <CategoryList title="Loại cột biển điện tử VMS" categoryGroup="Danh mục công nghệ" /> },

      // I.3.5 Dữ liệu danh mục Công trình Hạ tầng vận tải đường bộ
      { path: "danh-muc/ha-tang-van-tai/loai", element: <CategoryList title="Loại hạ tầng vận tải" categoryGroup="HT vận tải" /> },

      // II.2 Dữ liệu danh mục kết cấu hạ tầng đường thủy
      { path: "danh-muc/duong-thuy/loai", element: <CategoryList title="Loại đường thủy nội địa" categoryGroup="Danh mục đường thủy" /> },
      { path: "danh-muc/duong-thuy/cap", element: <CategoryList title="Cấp đường thủy nội địa" categoryGroup="Danh mục đường thủy" /> },
      { path: "danh-muc/duong-thuy/loai-bien-bao", element: <CategoryList title="Loại biển báo đường thủy" categoryGroup="Danh mục đường thủy" /> },
      { path: "danh-muc/duong-thuy/loai-den-hieu", element: <CategoryList title="Loại đèn hiệu đường thủy" categoryGroup="Danh mục đường thủy" /> },
      { path: "danh-muc/duong-thuy/loai-cot-bien-bao", element: <CategoryList title="Loại cột biển báo đường thủy" categoryGroup="Danh mục đường thủy" /> },
      { path: "danh-muc/duong-thuy/loai-phao", element: <CategoryList title="Loại phao" categoryGroup="Danh mục đường thủy" /> },
      { path: "danh-muc/duong-thuy/loai-phu-tro-khac", element: <CategoryList title="Loại công trình phụ trợ khác" categoryGroup="Danh mục đường thủy" /> },


      // I.4 Quản lý theo bình đồ
      { path: "binh-do/doan-duong", element: <RoadSectionPlan /> },
      { path: "binh-do/cau-lon", element: <BridgePlan /> },
      { path: "binh-do/nut-giao", element: <IntersectionPlan /> },

      // Quản trị vận hành - Quản trị hệ thống
      { path: "admin/dong-bo-dmdc", element: <AdminOperationList title="Cấu hình đồng bộ DMDC" category="Quản trị hệ thống" icon={<RefreshCw className="size-8 text-blue-600" />} /> },
      { path: "admin/api-dong-bo", element: <AdminOperationList title="API đồng bộ danh mục" category="Quản trị hệ thống" icon={<Code2 className="size-8 text-slate-700" />} /> },
      { path: "admin/log-trao-doi", element: <AdminOperationList title="Nhật ký trao đổi dữ liệu" category="Quản trị hệ thống" icon={<FileText className="size-8 text-slate-500" />} /> },
      { path: "admin/dong-bo-sso", element: <AdminOperationList title="Đồng bộ tài khoản SSO" category="Quản trị hệ thống" icon={<Users className="size-8 text-indigo-600" />} /> },
      { path: "admin/xac-thuc-sso", element: <AdminOperationList title="Xác thực người dùng SSO" category="Quản trị hệ thống" icon={<UserCheck className="size-8 text-green-600" />} /> },

      // Quản trị vận hành - Tích hợp Quy định 742
      { path: "admin/chinh-sach-truy-cap", element: <AdminOperationList title="Chính sách truy cập" category="Quy định 742" icon={<Lock className="size-8 text-red-600" />} /> },
      { path: "admin/nhom-quyen", Component: NhomQuyenNguoiDung },
      { path: "admin/phan-quyen-truy-cap", Component: NhomQuyenNguoiDung },
      { path: "admin/tai-khoan", element: <AdminOperationList title="Tài khoản người dùng" category="Quy định 742" icon={<Users className="size-8 text-slate-700" />} /> },
      { path: "admin/co-cau-to-chuc", element: <AdminOperationList title="Cơ cấu tổ chức" category="Quy định 742" icon={<Building2Icon className="size-8 text-slate-600" />} /> },
      { path: "admin/danh-muc-dia-phan", element: <AdminOperationList title="Danh mục địa phận" category="Quy định 742" icon={<Navigation className="size-8 text-teal-600" />} /> },
      { path: "admin/timeout", element: <AdminOperationList title="Thời gian chờ (timeout)" category="Quy định 742" icon={<RulerIcon className="size-8 text-orange-500" />} /> },
      { path: "admin/lich-su-tac-dong", element: <AdminOperationList title="Lịch sử tác động" category="Quy định 742" icon={<History className="size-8 text-slate-500" />} /> },
      { path: "admin/lich-su-loi", Component: NhatKyHoatDong },
      { path: "admin/nhat-ky-hoat-dong", Component: NhatKyHoatDong },
      { path: "admin/chinh-sach-luu-tru", element: <AdminOperationList title="Chính sách lưu trữ nhật ký" category="Quy định 742" icon={<FileText className="size-8 text-indigo-400" />} /> },
      { path: "admin/luu-log", element: <AdminOperationList title="Lưu log hệ thống" category="Quy định 742" icon={<FileText className="size-8 text-slate-400" />} /> },
      { path: "admin/gui-log-api", element: <AdminOperationList title="Gửi log tập trung (API)" category="Quy định 742" icon={<Zap className="size-8 text-yellow-500" />} /> },
      { path: "admin/thong-bao", element: <NotificationManagement /> },
      { path: "admin/quan-ly-nguoi-dung", Component: UserManagement },
      { path: "admin/cau-hinh-chung", Component: CauHinhChungHeThong },
      { path: "admin/dang-nhap", Component: CauHinhChungHeThong },
      { path: "admin/chinh-sach-mat-khau", Component: ChinhSachMatKhau },
      { path: "admin/khoa-tai-khoan", Component: CauHinhChungHeThong },
      { path: "admin/dm-phan-quyen", Component: DanhMucPhanQuyen },
      { path: "admin/dm-tinh", Component: DanhMucTinh },
      { path: "admin/dm-xa", element: <GenericCategoryManagement title="Quản lý danh mục địa phận xã" itemLabel="địa phận xã" /> },
      { path: "admin/dm-phong-ban", element: <GenericCategoryManagement title="Quản lý danh mục phòng ban, trung tâm VEC" itemLabel="phòng ban" /> },
      {
        path: "admin/dm-tuyen-cao-toc", element: <GenericCategoryManagement title="Quản lý danh mục các tuyến cao tốc do VEC quản lý" itemLabel="tuyến cao tốc" initialData={[
          { id: "1", code: "CH.01", name: "Cao tốc Hà Nội - Hải Phòng", description: "Tuyến đường bộ cao tốc Hà Nội - Hải Phòng" },
          { id: "2", code: "CH.02", name: "Cao tốc Nội Bài - Lào Cai", description: "Tuyến đường bộ cao tốc Nội Bài - Lào Cai" },
          { id: "3", code: "CH.03", name: "Cao tốc Cầu Giẽ - Ninh Bình", description: "Tuyến đường bộ cao tốc Cầu Giẽ - Ninh Bình" }
        ]} />
      },
      {
        path: "admin/dm-don-vi", element: <GenericCategoryManagement key="dm-don-vi" title="Quản lý danh mục các đơn vị quản lý, khai thác, giám sát trên các tuyến" itemLabel="đơn vị" initialData={[
          { id: "1", code: "DV.01", name: "Đơn vị quản lý tuyến CT-HN", description: "Đơn vị quản lý tuyến cao tốc Hà Nội" },
          { id: "2", code: "DV.02", name: "Đơn vị quản lý tuyến CT-HP", description: "Đơn vị quản lý tuyến cao tốc Hải Phòng" }
        ]} />
      },
      { path: "admin/dm-tai-san", Component: DanhMucTaiSan },
      {
        path: "admin/dm-thiet-bi", element: <GenericCategoryManagement key="dm-thiet-bi" title="Quản lý danh mục thiết bị (thiết bị văn phòng, thiết bị CNTT và các thiết bị khác)" itemLabel="thiết bị" initialData={[
          { id: "1", code: "TB.01", name: "Máy in", description: "Máy in văn phòng" },
          { id: "2", code: "TB.02", name: "Máy tính", description: "Máy tính để bàn / Laptop" },
          { id: "3", code: "TB.03", name: "Tivi", description: "Tivi màn hình lớn" },
          { id: "4", code: "TB.04", name: "Máy chủ", description: "Máy chủ trung tâm dữ liệu" },
          { id: "5", code: "TB.05", name: "Router", description: "Thiết bị định tuyến mạng" }
        ]} />
      },
      {
        path: "admin/dm-kho", element: <GenericCategoryManagement key="dm-kho" title="Quản lý danh mục kho vật lý" itemLabel="kho" initialData={[
          { id: "1", code: "KHO.01", name: "Kho HN-HP", description: "Kho vật lý tuyến Hà Nội - Hải Phòng" },
          { id: "2", code: "KHO.02", name: "Kho HN-BG", description: "Kho vật lý tuyến Hà Nội - Bắc Giang" },
          { id: "3", code: "KHO.03", name: "Kho HN-NB", description: "Kho vật lý tuyến Hà Nội - Ninh Bình" }
        ]} />
      },
      {
        path: "admin/dm-ho-so-tai-san", element: <GenericCategoryManagement key="dm-ho-so" title="Quản lý danh mục hồ sơ tài sản đường cao tốc" itemLabel="hồ sơ" initialData={[
          { id: "1", code: "HS.01", name: "Hồ sơ hoàn công", description: "Tài liệu hoàn công công trình" },
          { id: "2", code: "HS.02", name: "Hồ sơ thí nghiệm", description: "Biên bản, kết quả thí nghiệm vật liệu" },
          { id: "3", code: "HS.03", name: "Hồ sơ mặt cắt", description: "Bản vẽ mặt cắt ngang, mặt cắt dọc" },
          { id: "4", code: "HS.04", name: "Hồ sơ cống ngầm", description: "Hồ sơ thiết kế, thi công cống ngầm" }
        ]} />
      },
      {
        path: "admin/dm-danh-gia-bao-tri", element: <GenericCategoryManagement key="dm-danh-gia-bao-tri" title="Quản lý danh mục đánh giá bảo trì" itemLabel="danh mục" initialData={[
          { id: "1", code: "BT.01", name: "Phát hiện kịp thời", description: "Phát hiện các hư hỏng, bất thường trên tuyến" },
          { id: "2", code: "BT.02", name: "Kịp thời", description: "Thực hiện bảo trì đúng thời gian quy định" },
          { id: "3", code: "BT.03", name: "Hiệu quả ", description: "Đánh giá hiệu quả của công tác bảo trì" }
        ]} />
      },
      {
        path: "admin/dm-danh-gia-sua-chua", element: <GenericCategoryManagement key="dm-danh-gia-sua-chua" title="Quản lý danh mục đánh giá sửa chữa" itemLabel="danh mục" initialData={[
          { id: "1", code: "SC.01", name: "Kịp thời", description: "Thời gian xử lý khắc phục sự cố" },
          { id: "2", code: "SC.02", name: "Hiệu quả", description: "Đảm bảo hồ sơ, tài liệu đầy đủ và đúng quy định" },
          { id: "3", code: "SC.03", name: "Tiến độ", description: "Thời gian xử lý khắc phục sự cố" }
        ]} />
      },
      {
        path: "admin/dm-tieu-chi-van-hanh", element: <GenericCategoryManagement key="dm-tieu-chi-van-hanh" title="Quản lý danh mục tiêu chí đánh giá vận hành" itemLabel="tiêu chí" initialData={[
          { id: "1", code: "VH.01", name: "Phản ứng nhanh", description: "Thời gian trung bình tiếp cận hiện trường sự cố" },
          { id: "2", code: "VH.02", name: "Xử lý vi phạm ETC", description: "Tỷ lệ nhận diện và xử lý xe vượt trạm thu phí không dừng" },
          { id: "3", code: "VH.03", name: "Thông suốt giao thông", description: "Đánh giá phương án phân luồng khi có tai nạn" }
        ]} />
      },
      {
        path: "admin/dm-so-do-mat-bang", element: <GenericCategoryManagement key="dm-so-do-mat-bang" title="Quản lý danh mục mục sơ đồ mặt bằng" itemLabel="sơ đồ" initialData={[
          { id: "1", code: "MB.01", name: "Trạm thu phí", description: "Sơ đồ bố trí làn thu phí, barier, cabin" },
          { id: "2", code: "MB.02", name: "Trạm dừng nghỉ", description: "Khu vực bãi đỗ xe, nhà vệ sinh, trạm xăng" },
          { id: "3", code: "MB.03", name: "Nút giao khác mức", description: "Sơ đồ các nhánh ram ra/vào đường cao tốc" }
        ]} />
      },
      {
        path: "admin/dm-lop-tai-san", element: <GenericCategoryManagement key="dm-lop-tai-san" title="Quản lý danh mục của các lớp tài sản" itemLabel="lớp tài sản" initialData={[
          { id: "1", code: "LTS.01", name: "Lớp kết cấu mặt đường", description: "Lớp bê tông nhựa tạo nhám, lớp móng" },
          { id: "2", code: "LTS.02", name: "Lớp công trình cầu hầm", description: "Dầm cầu, mố trụ, kết cấu vỏ hầm" },
          { id: "3", code: "LTS.03", name: "Lớp thiết bị ITS", description: "Camera, VMS, hệ thống cân tải trọng" }
        ]} />
      },
      { path: "admin/quan-ly-dich-vu", Component: QuanLyDichVu },
      { path: "admin/giam-sat-dich-vu", Component: GiamSatDichVu },
      { path: "admin/cau-hinh-dich-vu", Component: CauHinhDichVu },
      { path: "admin/dv-tong-hop-tai-san", element: <DataSharingServiceDoc title="Dịch vụ dữ liệu tổng hợp tài sản" description="Cung cấp dịch vụ tổng hợp tài sản theo loại tài sản, theo tuyến đường, theo đơn vị quản lý." endpoint="/v1/assets/summary" method="GET" params={[{ name: "type", type: "string", required: false, description: "Loại tài sản (Bê tông nhựa, Biển báo, ITS...)" }, { name: "route", type: "string", required: false, description: "Mã tuyến đường (VD: CH.01)" }]} responseSample={'{\n  "success": true,\n  "data": {\n    "total": 1250,\n    "items": [\n      { "id": "AS.001", "name": "Biển báo tốc độ 100", "status": "Tốt" }\n    ]\n  }\n}'} /> },
      { path: "admin/dv-chi-tiet-tai-san", element: <DataSharingServiceDoc title="Dịch vụ dữ liệu chi tiết tài sản" description="Cung cấp dịch vụ chi tiết tài sản theo loại tài sản, theo tuyến đường, theo đơn vị quản lý, danh sách trường thông tin." endpoint="/v1/assets/details/{id}" method="GET" params={[{ name: "id", type: "string", required: true, description: "Mã tài sản cần tra cứu chi tiết" }]} responseSample={'{\n  "success": true,\n  "data": {\n    "id": "AS.001",\n    "name": "Biển báo tốc độ 100",\n    "location": "Km 12+500",\n    "installedAt": "2024-01-15"\n  }\n}'} /> },
      { path: "admin/dv-bao-tri-dinh-ky", element: <DataSharingServiceDoc title="Dịch vụ dữ liệu bảo trì định kỳ" description="Cung cấp dịch vụ dữ liệu bảo trì định kỳ theo tuyến đường, đơn vị quản lý, thời gian, phân loại, tình trạng xử lý." endpoint="/v1/maintenance/schedule" method="GET" params={[{ name: "status", type: "string", required: false, description: "Tình trạng (Đang xử lý, Đã hoàn thành)" }, { name: "dateRange", type: "string", required: false, description: "Khoảng thời gian (YYYY-MM-DD,YYYY-MM-DD)" }]} responseSample={'{\n  "success": true,\n  "data": [\n    {\n      "taskId": "MT.2026.01",\n      "title": "Bảo dưỡng VMS Km 15",\n      "status": "Đang xử lý"\n    }\n  ]\n}'} /> },
      { path: "admin/dv-yeu-cau", element: <DataSharingServiceDoc title="Dịch vụ dữ liệu các yêu cầu theo thời gian, loại yêu cầu" description="Cung cấp Dịch vụ dữ liệu các yêu cầu theo thời gian, loại yêu cầu." endpoint="/v1/requests" method="GET" params={[{ name: "type", type: "string", required: true, description: "Loại yêu cầu (Sửa chữa, Hỗ trợ...)" }]} responseSample={'{\n  "success": true,\n  "data": [\n    {\n      "reqId": "REQ.009",\n      "type": "Hỗ trợ",\n      "content": "Xe hỏng lốp tại Km 20"\n    }\n  ]\n}'} /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
