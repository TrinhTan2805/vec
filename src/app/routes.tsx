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
import Login from "./pages/auth/Login";
import { Anchor, Navigation, Waves, Compass, Milestone, LifeBuoy, Ruler as RulerIcon, Route as RouteIcon, Building2 as Building2Icon, LandPlot as LandPlotIcon, Settings, ShieldCheck, Zap, Activity, UserCheck, RefreshCw, Code2, Users, Lock, History, AlertTriangle, FileText, Bell, LayoutDashboard, Map } from "lucide-react";
import RealtimeTracking from "./pages/RealtimeTracking";
import NghiemThuSuCo from "./pages/NghiemThuSuCo";
import TrafficHeatmap from "./pages/TrafficHeatmap";
import TrafficStatistics from "./pages/TrafficStatistics";
import GiayPhepDaoDuong from "./pages/cap-phep/GiayPhepDaoDuong";
import SystemConfig from "./pages/SystemConfig";
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
      { path: "admin/nhom-quyen", element: <AdminOperationList title="Nhóm quyền người dùng" category="Quy định 742" icon={<ShieldCheck className="size-8 text-blue-700" />} /> },
      { path: "admin/tai-khoan", element: <AdminOperationList title="Tài khoản người dùng" category="Quy định 742" icon={<Users className="size-8 text-slate-700" />} /> },
      { path: "admin/co-cau-to-chuc", element: <AdminOperationList title="Cơ cấu tổ chức" category="Quy định 742" icon={<Building2Icon className="size-8 text-slate-600" />} /> },
      { path: "admin/danh-muc-dia-phan", element: <AdminOperationList title="Danh mục địa phận" category="Quy định 742" icon={<Navigation className="size-8 text-teal-600" />} /> },
      { path: "admin/timeout", element: <AdminOperationList title="Thời gian chờ (timeout)" category="Quy định 742" icon={<RulerIcon className="size-8 text-orange-500" />} /> },
      { path: "admin/lich-su-tac-dong", element: <AdminOperationList title="Lịch sử tác động" category="Quy định 742" icon={<History className="size-8 text-slate-500" />} /> },
      { path: "admin/lich-su-loi", element: <AdminOperationList title="Lịch sử lỗi phát sinh" category="Quy định 742" icon={<AlertTriangle className="size-8 text-red-500" />} /> },
      { path: "admin/chinh-sach-luu-tru", element: <AdminOperationList title="Chính sách lưu trữ nhật ký" category="Quy định 742" icon={<FileText className="size-8 text-indigo-400" />} /> },
      { path: "admin/luu-log", element: <AdminOperationList title="Lưu log hệ thống" category="Quy định 742" icon={<FileText className="size-8 text-slate-400" />} /> },
      { path: "admin/gui-log-api", element: <AdminOperationList title="Gửi log tập trung (API)" category="Quy định 742" icon={<Zap className="size-8 text-yellow-500" />} /> },
      { path: "admin/thong-bao", element: <NotificationManagement /> },
      { path: "admin/quan-ly-nguoi-dung", Component: UserManagement },
      { path: "admin/cau-hinh-chung", Component: CauHinhChungHeThong },
      { path: "admin/dang-nhap", Component: CauHinhChungHeThong },
      { path: "admin/chinh-sach-mat-khau", Component: ChinhSachMatKhau },
      { path: "admin/khoa-tai-khoan", Component: CauHinhChungHeThong },

      { path: "*", element: <NotFound /> },
    ],
  },
]);