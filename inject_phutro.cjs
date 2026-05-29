const fs = require('fs');
const path = 'src/app/components/layout/DashboardLayout.tsx';
let content = fs.readFileSync(path, 'utf-8');

const phuTroItems = [
  '  {',
  '    title: "Tài sản phụ trợ",',
  '    icon: <Table className="size-5 text-indigo-500" />,',
  '    children: [',
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
].join('\n');

const endOfArray = content.indexOf('];\r\n\r\nconst adminNavItems: NavItem[] = [');
if (endOfArray === -1) {
  const backupEndOfArray = content.indexOf('];\n\nconst adminNavItems: NavItem[] = [');
  if (backupEndOfArray !== -1) {
    content = content.slice(0, backupEndOfArray) + phuTroItems + '\n' + content.slice(backupEndOfArray);
  }
} else {
  content = content.slice(0, endOfArray) + phuTroItems + '\r\n' + content.slice(endOfArray);
}

fs.writeFileSync(path, content, 'utf-8');
console.log('Inserted Phu Tro items');
