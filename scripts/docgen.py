import os
import re
import argparse

def parse_uc_markdown(uc_filepath):
    """
    Phân tích file UC.md chứa ma trận bảng Markdown để tạo cấu trúc dữ liệu.
    """
    if not os.path.exists(uc_filepath):
        return {}

    chapters = []
    current_chapter = None
    current_sub = None
    current_uc = None

    with open(uc_filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line.startswith('|'):
                continue
            
            parts = [p.strip() for p in line.split('|')][1:-1]
            if len(parts) < 2:
                continue
            
            stt = parts[0]
            name = parts[1]
            roles = parts[2] if len(parts) > 2 else ""
            desc = parts[3] if len(parts) > 3 else ""

            # Bỏ qua header
            if 'STT' in stt or '---' in stt:
                continue

            # Xử lý Chapter lớn
            if re.match(r'^\*\*[IVX]+\*\*$', stt):
                current_chapter = {
                    "id": stt.strip('*'),
                    "name": name.strip('*'),
                    "subs": []
                }
                chapters.append(current_chapter)
                current_sub = None
                current_uc = None
                continue
            
            # Xử lý Chapter con
            if re.match(r'^\*\*[IVX]+\.[IVX\d]+\*\*$', stt) or re.match(r'^[IVX]+\.\d+\.\d+$', stt):
                current_sub = {
                    "id": stt.strip('*'),
                    "name": name.strip('*'),
                    "ucs": []
                }
                if current_chapter:
                    current_chapter["subs"].append(current_sub)
                current_uc = None
                continue
            
            # Xử lý Dòng trống ở mức con
            if not stt and not roles and not desc and name:
                current_sub = {
                    "id": "",
                    "name": name,
                    "ucs": []
                }
                if current_chapter:
                    current_chapter["subs"].append(current_sub)
                current_uc = None
                continue

            # Xử lý Use Case 
            if re.match(r'^\d+$', stt):
                current_uc = {
                    "id": stt,
                    "name": name,
                    "roles": roles,
                    "descriptions": [desc] if desc else []
                }
                if current_sub:
                    current_sub["ucs"].append(current_uc)
                elif current_chapter:
                    # Tạo nhánh sub mặc định nếu chưa có
                    current_sub = {"id": "", "name": "Chung", "ucs": [current_uc]}
                    current_chapter["subs"].append(current_sub)
                continue
            
            # Xử lý mô tả nối tiếp (khi stt trống, lấy desc)
            if not stt and not name and current_uc:
                if roles: # cột mô tả bị dồn lên roles
                    current_uc["descriptions"].append(roles)
                continue
            if not stt and name and current_uc: # Dạng merged cell, name chính là desc
                current_uc["descriptions"].append(name)
                
    return chapters

def parse_react_routes(route_filepath):
    """
    Quét file routes.tsx để móc tên các Route (path) và Component
    """
    routes = []
    if not os.path.exists(route_filepath):
        return routes
        
    with open(route_filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Tìm các đoạn { path: "...", Component/element: ... }
    matches = re.finditer(r'path:\s*"(.*?)"\s*,\s*(?:Component:\s*(\w+)|element:\s*<(.*?)>)', content)
    for m in matches:
        path = m.group(1)
        component = m.group(2) if m.group(2) else m.group(3)
        # làm sạch phần truyền props trong <element title="...">
        if component and ' ' in component:
            component = component.split(' ')[0]
        routes.append({"path": path, "component": component})
    
    return routes

def generate_brd(chapters, output_path, project_name):
    content = f"# TÀI LIỆU KHẢO SÁT VÀ PHÂN TÍCH YÊU CẦU NGHIỆP VỤ (BRD)\n\n"
    content += f"**1. Tên dự án:** {project_name}\n\n"
    
    content += "## 1. MỤC TIÊU VÀ PHẠM VI DỰ ÁN\n\n"
    content += "**1.1. Phạm vi nghiệp vụ**\n"
    content += "Hệ thống hỗ trợ các nhóm tính năng quản trị quy mô lớn, liên quan trực tiếp đến các bộ phận nghiệp vụ sau:\n\n"
    
    for i, chap in enumerate(chapters):
        content += f"**Phần {chap['id']}:** {chap['name']}\n"
    
    content += "\n## 2. YÊU CẦU NGHIỆP VỤ (BUSINESS REQUIREMENTS)\n\n"
    
    chap_idx = 1
    for chap in chapters:
        content += f"**2.{chap_idx}. {chap['name']}**\n\n"
        for sub in chap["subs"]:
            if sub["name"]:
                content += f"- **{sub['name']}**\n"
            for uc in sub["ucs"]:
                roles = f" ({uc['roles']})" if uc['roles'] else ""
                content += f"  - [BR_{uc['id']}] {uc['name']}{roles}\n"
        content += "\n"
        chap_idx += 1
        
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[*] Đã sinh thành công file: {output_path}")

def generate_srs(chapters, routes, output_path, project_name):
    content = f"# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)\n\n"
    content += f"**1. Tên dự án:** {project_name}\n"
    content += "**2. Mô tả:** Thiết kế dựa trên mô hình tự động AutoDocGen\n\n"
    
    content += "## 1. MÔ TẢ TỔNG QUAN\n\n"
    content += "**1.1. Bảng Map Cấu trúc Màn hình (Frontend UI Routes)**\n"
    content += "Dưới đây là thiết kế giao diện theo mã nguồn phần mềm thực tế:\n\n"
    for r in routes:
        content += f"- Màn hình **{r['component']}** (Đường dẫn: `/{r['path']}`)\n"
        
    content += "\n## 2. ĐẶC TẢ YÊU CẦU CHỨC NĂNG (FUNCTIONAL SPECS)\n\n"
    
    chap_idx = 1
    for chap in chapters:
        content += f"### 2.{chap_idx}. {chap['name']}\n\n"
        for sub in chap["subs"]:
            if not sub["ucs"]: continue
            content += f"**Chuyên mục: {sub['name']}**\n\n"
            
            # Gộp nhóm CRUD cho ngắn gọn thay vì lặp lại
            entities = []
            for uc in sub["ucs"]:
                name = uc['name'].replace('Quản lý danh sách', '').replace('Quản lý thông tin', '').strip()
                entities.append(name.capitalize())
                
            if entities:
                content += f"- **Tập đối tượng quản lý:** {', '.join(entities)}\n"
                
                # Đặc tả chung
                content += "- **Luồng thao tác tiêu chuẩn (CRUD Framework):**\n"
                content += "  1. **Hiển thị danh sách:** Tác nhân nhập điều kiện tra cứu/bộ lọc -> Click `Tìm kiếm` -> Form đổ dữ liệu List ra Grid.\n"
                content += "  2. **Thêm mới/Cập nhật:** Tác nhân điền các trường dữ liệu bắt buộc -> Click `Lưu` -> Hệ thống validate tính toàn vẹn (không trùng khóa) -> Cập nhật Database.\n"
                content += "  3. **Xóa:** Click nút `Xóa` -> Đưa ra Dialog cảnh báo xác nhận -> Cập nhật trạng thái hoặc xóa mềm.\n"
                content += "  4. **Tiện ích:** Hỗ trợ kết xuất báo cáo danh sách động ra file `.xlsx`.\n"
                
                # Check nếu có xem trên bản đồ
                has_map = any("nền bản đồ số" in d.lower() or "bình đồ" in d.lower() for uc in sub["ucs"] for d in uc["descriptions"])
                if has_map:
                    content += "  5. **Tích hợp WebGIS / Bình đồ:** Cho phép ấn xem phân tách Lớp (Layers) trên nền bản đồ số chuyên sâu, hỗ trợ quy hoạch đa không gian.\n"
            content += "\n"
        chap_idx += 1
        
    content += "## 3. YÊU CẦU PHI CHỨC NĂNG (NFR) VÀ CSDL\n"
    content += "- Hệ thống bám sát các tiêu chuẩn tại Nghị định 85/NĐ-CP và Quyết định 742 về an toàn thông tin.\n"
    content += "- Quản trị CSDL sử dụng PostgreSQL với mô hình Schema phi chuẩn hỗ trợ tốt truy vấn mở rộng.\n"

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[*] Đã sinh thành công file: {output_path}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Tool tự động sinh BRD/SRS từ file nguồn.")
    parser.add_argument('--uc', type=str, default='UC.md', help='Đường dẫn file UC.md chứa ma trận Use Cases.')
    parser.add_argument('--code', type=str, default='src/app/routes.tsx', help='Đường dẫn file routing frontend của ứng dụng.')
    parser.add_argument('--brd', type=str, default='BRD_Auto.md', help='Đầu ra tệp BRD.')
    parser.add_argument('--srs', type=str, default='SRS_Auto.md', help='Đầu ra tệp SRS.')
    parser.add_argument('--project', type=str, default='Hệ thống quản lý kết cấu hạ tầng giao thông', help='Tên dự án.')
    
    args = parser.parse_args()
    
    print("=========================================")
    print("[+] AutoDocGen: Starting process...")
    chapters = parse_uc_markdown(args.uc)
    print(f"  -> Extracted {len(chapters)} Major Modules from UC.md.")
    
    routes = parse_react_routes(args.code)
    print(f"  -> Scanned and found {len(routes)} UI Routes from Source code.")
    
    generate_brd(chapters, args.brd, args.project)
    generate_srs(chapters, routes, args.srs, args.project)
    
    print("[+] Automation complete!")
    print("=========================================")
