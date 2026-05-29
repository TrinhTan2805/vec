const fs = require('fs');
const path = require('path');

const screens = [
  // Danh mục (UC 12 - 23)
  { id: '12', route: '/danh-muc/phong-ban', name: 'PhongBan', title: 'Phòng ban, Trung tâm VEC', folder: 'danh-muc' },
  { id: '13', route: '/danh-muc/tuyen-cao-toc', name: 'TuyenCaoToc', title: 'Tuyến cao tốc', folder: 'danh-muc' },
  { id: '14', route: '/danh-muc/don-vi', name: 'DonVi', title: 'Đơn vị quản lý, khai thác', folder: 'danh-muc' },
  { id: '15', route: '/danh-muc/tai-san', name: 'TaiSan', title: 'Tài sản trên tuyến', folder: 'danh-muc' },
  { id: '16', route: '/danh-muc/thiet-bi', name: 'ThietBi', title: 'Thiết bị (VP, CNTT)', folder: 'danh-muc' },
  { id: '17', route: '/danh-muc/kho-vat-ly', name: 'KhoVatLy', title: 'Kho vật lý', folder: 'danh-muc' },
  { id: '18', route: '/danh-muc/ho-so-tai-san', name: 'HoSoTaiSan', title: 'Hồ sơ tài sản', folder: 'danh-muc' },
  { id: '19', route: '/danh-muc/danh-gia-bao-tri', name: 'DanhGiaBaoTri', title: 'Đánh giá bảo trì', folder: 'danh-muc' },
  { id: '20', route: '/danh-muc/danh-gia-sua-chua', name: 'DanhGiaSuaChua', title: 'Đánh giá sửa chữa', folder: 'danh-muc' },
  { id: '21', route: '/danh-muc/tieu-chi-van-hanh', name: 'TieuChiVanHanh', title: 'Tiêu chí vận hành', folder: 'danh-muc' },
  { id: '22', route: '/danh-muc/so-do-mat-bang', name: 'SoDoMatBang', title: 'Sơ đồ mặt bằng', folder: 'danh-muc' },
  { id: '23', route: '/danh-muc/lop-tai-san', name: 'LopTaiSan', title: 'Lớp tài sản', folder: 'danh-muc' },

  // Tài sản phụ trợ (UC 74 - 102)
  { id: '74', route: '/phu-tro/bien-bao', name: 'BienBao', title: 'Biển báo', folder: 'phu-tro' },
  { id: '79', route: '/phu-tro/cot-gpmb', name: 'CotGPMB', title: 'Cột GPMB, MLG', folder: 'phu-tro' },
  { id: '84', route: '/phu-tro/hang-rao-bao-ve', name: 'HangRaoBaoVe', title: 'Hàng rào bảo vệ', folder: 'phu-tro' },
  { id: '85', route: '/phu-tro/hang-rao-chong-choi', name: 'HangRaoChongChoi', title: 'Hàng rào chống chói', folder: 'phu-tro' },
  { id: '88', route: '/phu-tro/he-thong-chieu-sang', name: 'HeThongChieuSang', title: 'Hệ thống chiếu sáng', folder: 'phu-tro' },
  { id: '89', route: '/phu-tro/he-thong-dien', name: 'HeThongDien', title: 'Hệ thống điện', folder: 'phu-tro' },
  { id: '90', route: '/phu-tro/he-thong-its', name: 'HeThongITS', title: 'Hệ thống ITS', folder: 'phu-tro' },
  { id: '91', route: '/phu-tro/kho-bai', name: 'KhoBai', title: 'Kho bãi', folder: 'phu-tro' },
  { id: '92', route: '/phu-tro/mai-doc', name: 'MaiDoc', title: 'Mái dốc', folder: 'phu-tro' },
  { id: '93', route: '/phu-tro/mat-duong', name: 'MatDuong', title: 'Mặt đường', folder: 'phu-tro' },
  { id: '96', route: '/phu-tro/ranh-doc', name: 'RanhDoc', title: 'Rãnh dọc', folder: 'phu-tro' },
  { id: '98', route: '/phu-tro/ton-ho-lan', name: 'TonHoLan', title: 'Tôn hộ lan', folder: 'phu-tro' },
  { id: '99', route: '/phu-tro/tham-co', name: 'ThamCo', title: 'Thảm cỏ cây xanh', folder: 'phu-tro' },
  { id: '102', route: '/phu-tro/thiet-bi-thi-nghiem', name: 'ThietBiThiNghiem', title: 'Thiết bị thí nghiệm', folder: 'phu-tro' },
];

const template = (name, title) => `import React from "react";
import CategoryList from "../categories/CategoryList";

const ${name} = () => {
  return (
    <CategoryList 
      title="${title}" 
      categoryGroup="Quản lý" 
      initialItems={[]} 
    />
  );
};

export default ${name};
`;

const srcDir = path.join(__dirname, 'src', 'app', 'pages');

screens.forEach(screen => {
  const folderPath = path.join(srcDir, screen.folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  
  const filePath = path.join(folderPath, `${screen.name}.tsx`);
  fs.writeFileSync(filePath, template(screen.name, screen.title), 'utf-8');
});

console.log('Successfully generated ' + screens.length + ' screen components.');
