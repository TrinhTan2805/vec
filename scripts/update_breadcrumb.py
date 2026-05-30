import sys

with open('d:\\GiaoThongHaNoi\\vec\\src\\app\\components\\layout\\DashboardLayout.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '// Get page title based on current route' in line:
        start_idx = i
        break

if start_idx != -1:
    for i in range(start_idx, len(lines)):
        if 'return (' in lines[i] and 'div className="flex h-screen overflow-hidden' in lines[i+1]:
            end_idx = i - 1
            break

if start_idx != -1 and end_idx != -1:
    new_func = """  const findBreadcrumbPath = (items: NavItem[], targetPath: string, currentPath: string[] = []): string[] | null => {
    for (const item of items) {
      if (item.href && (targetPath === item.href || targetPath.startsWith(item.href + '/'))) {
        return [...currentPath, item.title];
      }
      if (item.children) {
        const found = findBreadcrumbPath(item.children, targetPath, [...currentPath, item.title]);
        if (found) return found;
      }
    }
    return null;
  };

  // Get page title based on current route
  const getPageTitle = (): React.ReactNode => {
    const path = location.pathname;
    const rootTitle = activeModule === "ADMIN" ? "Quản trị" : "Nghiệp vụ";
    const currentNavItems = moduleNavItems[activeModule];
    
    if (path === "/") {
      return "Tổng quan hệ thống";
    }

    const trail = findBreadcrumbPath(currentNavItems, path, [rootTitle]);

    if (trail && trail.length > 0) {
      return (
        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-500">
          {trail.map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-slate-350">|</span>}
              <span className={i === trail.length - 1 ? "text-slate-900 font-bold" : ""}>{t}</span>
            </React.Fragment>
          ))}
        </div>
      );
    }

    return "Hệ thống quản lý giao thông";
  };

"""
    lines = lines[:start_idx] + [new_func] + lines[end_idx:]
    with open('d:\\GiaoThongHaNoi\\vec\\src\\app\\components\\layout\\DashboardLayout.tsx', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print('Replaced successfully')
else:
    print('Indices not found:', start_idx, end_idx)
