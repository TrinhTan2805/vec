const fs = require('fs');

const path = 'src/app/components/layout/DashboardLayout.tsx';
let content = fs.readFileSync(path, 'utf-8');

const danhMucItems = [
  '{ title: "Phòng ban, Trung tâm VEC", icon: <CircleDot className="size-3" />, href: "/danh-muc/phong-ban" },',
  '{ title: "Tuyến cao tốc", icon: <CircleDot className="size-3" />, href: "/danh-muc/tuyen-cao-toc" },',
  '{ title: "Đơn vị quản lý, khai thác", icon: <CircleDot className="size-3" />, href: "/danh-muc/don-vi" },',
  '{ title: "Tài sản trên tuyến", icon: <CircleDot className="size-3" />, href: "/danh-muc/tai-san" },',
  '{ title: "Thiết bị (VP, CNTT)", icon: <CircleDot className="size-3" />, href: "/danh-muc/thiet-bi" },',
  '{ title: "Kho vật lý", icon: <CircleDot className="size-3" />, href: "/danh-muc/kho-vat-ly" },',
  '{ title: "Hồ sơ tài sản", icon: <CircleDot className="size-3" />, href: "/danh-muc/ho-so-tai-san" },',
  '{ title: "Đánh giá bảo trì", icon: <CircleDot className="size-3" />, href: "/danh-muc/danh-gia-bao-tri" },',
  '{ title: "Đánh giá sửa chữa", icon: <CircleDot className="size-3" />, href: "/danh-muc/danh-gia-sua-chua" },',
  '{ title: "Tiêu chí vận hành", icon: <CircleDot className="size-3" />, href: "/danh-muc/tieu-chi-van-hanh" },',
  '{ title: "Sơ đồ mặt bằng", icon: <CircleDot className="size-3" />, href: "/danh-muc/so-do-mat-bang" },',
  '{ title: "Lớp tài sản", icon: <CircleDot className="size-3" />, href: "/danh-muc/lop-tai-san" },'
];

// Insert danh muc items
const dmAnchor = 'href: "/danh-muc/nguyen-nhan-su-co" },';
if (content.includes(dmAnchor) && !content.includes('/danh-muc/phong-ban')) {
  content = content.replace(dmAnchor, dmAnchor + '\n      ' + danhMucItems.join('\n      '));
}

const phuTroItems = [
  '  {',
  '    title: "Tài sản phụ trợ",',
  '    icon: <Table className="size-5 text-indigo-500" />,\n    children: [',
  '      { title: "Biển báo", icon: <CircleDot className="size-3" />, href: "/phu-tro/bien-bao" },',
  '      { title: "Cột GPMB, MLG", icon: <CircleDot className="size-3" />, href: "/phu-tro/cot-gpmb" },',
  '      { title: "Hàng rào bảo vệ", icon: <CircleDot className="size-3" />, href: "/phu-tro/hang-rao-bao-ve" },',
  '      { title: "Hàng rào chống chói", icon: <CircleDot className="size-3" />, href: "/phu-tro/hang-rao-chong-choi" },',
  '      { title: "Hệ thống chiếu sáng", icon: <CircleDot className="size-3" />, href: "/phu-tro/he-thong-chieu-sang" },',
  '      { title: "Hệ thống điện", icon: <CircleDot className="size-3" />, href: "/phu-tro/he-thong-dien" },',
  '      { title: "Hệ thống ITS", icon: <CircleDot className="size-3" />, href: "/phu-tro/he-thong-its" },',
  '      { title: "Kho bãi", icon: <CircleDot className="size-3" />, href: "/phu-tro/kho-bai" },',
  '      { title: "Mái dốc", icon: <CircleDot className="size-3" />, href: "/phu-tro/mai-doc" },',
  '      { title: "Mặt đường", icon: <CircleDot className="size-3" />, href: "/phu-tro/mat-duong" },',
  '      { title: "Rãnh dọc", icon: <CircleDot className="size-3" />, href: "/phu-tro/ranh-doc" },',
  '      { title: "Tôn hộ lan", icon: <CircleDot className="size-3" />, href: "/phu-tro/ton-ho-lan" },',
  '      { title: "Thảm cỏ cây xanh", icon: <CircleDot className="size-3" />, href: "/phu-tro/tham-co" },',
  '      { title: "Thiết bị thí nghiệm", icon: <CircleDot className="size-3" />, href: "/phu-tro/thiet-bi-thi-nghiem" },',
  '    ],',
  '  },'
];

// Insert phu tro items right after quan ly danh muc
if (content.includes('title: "Quản lý danh mục"')) {
  // Find where Quản lý danh mục block ends
  const blockStart = content.indexOf('title: "Quản lý danh mục"');
  const blockEnd = content.indexOf('],\n  },', blockStart);
  if (blockEnd !== -1 && !content.includes('title: "Tài sản phụ trợ"')) {
    const insertPos = blockEnd + 6;
    content = content.slice(0, insertPos) + '\n' + phuTroItems.join('\n') + content.slice(insertPos);
  }
}

fs.writeFileSync(path, content, 'utf-8');
console.log('Updated DashboardLayout.tsx safely!');
