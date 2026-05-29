const fs = require('fs');

const screens = [
  { id: '12', route: '/danh-muc/phong-ban' },
  { id: '13', route: '/danh-muc/tuyen-cao-toc' },
  { id: '14', route: '/danh-muc/don-vi' },
  { id: '15', route: '/danh-muc/tai-san' },
  { id: '16', route: '/danh-muc/thiet-bi' },
  { id: '17', route: '/danh-muc/kho-vat-ly' },
  { id: '18', route: '/danh-muc/ho-so-tai-san' },
  { id: '19', route: '/danh-muc/danh-gia-bao-tri' },
  { id: '20', route: '/danh-muc/danh-gia-sua-chua' },
  { id: '21', route: '/danh-muc/tieu-chi-van-hanh' },
  { id: '22', route: '/danh-muc/so-do-mat-bang' },
  { id: '23', route: '/danh-muc/lop-tai-san' },
  { id: '74', route: '/phu-tro/bien-bao' },
  { id: '79', route: '/phu-tro/cot-gpmb' },
  { id: '84', route: '/phu-tro/hang-rao-bao-ve' },
  { id: '85', route: '/phu-tro/hang-rao-chong-choi' },
  { id: '88', route: '/phu-tro/he-thong-chieu-sang' },
  { id: '89', route: '/phu-tro/he-thong-dien' },
  { id: '90', route: '/phu-tro/he-thong-its' },
  { id: '91', route: '/phu-tro/kho-bai' },
  { id: '92', route: '/phu-tro/mai-doc' },
  { id: '93', route: '/phu-tro/mat-duong' },
  { id: '96', route: '/phu-tro/ranh-doc' },
  { id: '98', route: '/phu-tro/ton-ho-lan' },
  { id: '99', route: '/phu-tro/tham-co' },
  { id: '102', route: '/phu-tro/thiet-bi-thi-nghiem' },
];

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let lines = content.split('\n');
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('|')) {
      const parts = lines[i].split('|');
      if (parts.length >= 8) {
        const ucId = parts[1].trim();
        const screen = screens.find(s => s.id === ucId);
        if (screen) {
          parts[7] = ' http://localhost:4000' + screen.route + ' ';
          parts[8] = ' ' + timestamp + ' ';
          lines[i] = parts.join('|');
        }
      }
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log('Updated ' + filePath);
}

updateFile('docs/UC_web.md');
