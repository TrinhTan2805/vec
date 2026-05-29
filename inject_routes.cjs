const fs = require('fs');

const routesPath = 'src/app/routes.tsx';
let lines = fs.readFileSync(routesPath, 'utf-8').split('\n');

const screens = [
  { id: '12', route: '/danh-muc/phong-ban', name: 'PhongBan', folder: 'danh-muc' },
  { id: '13', route: '/danh-muc/tuyen-cao-toc', name: 'TuyenCaoToc', folder: 'danh-muc' },
  { id: '14', route: '/danh-muc/don-vi', name: 'DonVi', folder: 'danh-muc' },
  { id: '15', route: '/danh-muc/tai-san', name: 'TaiSan', folder: 'danh-muc' },
  { id: '16', route: '/danh-muc/thiet-bi', name: 'ThietBi', folder: 'danh-muc' },
  { id: '17', route: '/danh-muc/kho-vat-ly', name: 'KhoVatLy', folder: 'danh-muc' },
  { id: '18', route: '/danh-muc/ho-so-tai-san', name: 'HoSoTaiSan', folder: 'danh-muc' },
  { id: '19', route: '/danh-muc/danh-gia-bao-tri', name: 'DanhGiaBaoTri', folder: 'danh-muc' },
  { id: '20', route: '/danh-muc/danh-gia-sua-chua', name: 'DanhGiaSuaChua', folder: 'danh-muc' },
  { id: '21', route: '/danh-muc/tieu-chi-van-hanh', name: 'TieuChiVanHanh', folder: 'danh-muc' },
  { id: '22', route: '/danh-muc/so-do-mat-bang', name: 'SoDoMatBang', folder: 'danh-muc' },
  { id: '23', route: '/danh-muc/lop-tai-san', name: 'LopTaiSan', folder: 'danh-muc' },
  { id: '74', route: '/phu-tro/bien-bao', name: 'BienBao', folder: 'phu-tro' },
  { id: '79', route: '/phu-tro/cot-gpmb', name: 'CotGPMB', folder: 'phu-tro' },
  { id: '84', route: '/phu-tro/hang-rao-bao-ve', name: 'HangRaoBaoVe', folder: 'phu-tro' },
  { id: '85', route: '/phu-tro/hang-rao-chong-choi', name: 'HangRaoChongChoi', folder: 'phu-tro' },
  { id: '88', route: '/phu-tro/he-thong-chieu-sang', name: 'HeThongChieuSang', folder: 'phu-tro' },
  { id: '89', route: '/phu-tro/he-thong-dien', name: 'HeThongDien', folder: 'phu-tro' },
  { id: '90', route: '/phu-tro/he-thong-its', name: 'HeThongITS', folder: 'phu-tro' },
  { id: '91', route: '/phu-tro/kho-bai', name: 'KhoBai', folder: 'phu-tro' },
  { id: '92', route: '/phu-tro/mai-doc', name: 'MaiDoc', folder: 'phu-tro' },
  { id: '93', route: '/phu-tro/mat-duong', name: 'MatDuong', folder: 'phu-tro' },
  { id: '96', route: '/phu-tro/ranh-doc', name: 'RanhDoc', folder: 'phu-tro' },
  { id: '98', route: '/phu-tro/ton-ho-lan', name: 'TonHoLan', folder: 'phu-tro' },
  { id: '99', route: '/phu-tro/tham-co', name: 'ThamCo', folder: 'phu-tro' },
  { id: '102', route: '/phu-tro/thiet-bi-thi-nghiem', name: 'ThietBiThiNghiem', folder: 'phu-tro' },
];

let importIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].startsWith('import ')) {
    importIndex = i;
    break;
  }
}

if (importIndex !== -1) {
  const importsToInsert = screens.map(s => `import ${s.name} from "./pages/${s.folder}/${s.name}";`);
  lines.splice(importIndex + 1, 0, ...importsToInsert);
}

// Find children: [ array for the main routes
let childrenIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('children: [') && lines[i-1] && lines[i-1].includes('Component: DashboardLayout')) {
    childrenIndex = i;
    break;
  }
}

if (childrenIndex !== -1) {
  const routesToInsert = screens.map(s => `      { path: "${s.route.substring(1)}", element: <${s.name} /> },`);
  lines.splice(childrenIndex + 1, 0, ...routesToInsert);
}

fs.writeFileSync(routesPath, lines.join('\n'), 'utf-8');
console.log('Successfully injected routes!');
