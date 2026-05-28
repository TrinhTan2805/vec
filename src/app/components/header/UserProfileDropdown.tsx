import { User, Settings, LogOut, Shield, FileText, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function UserProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="size-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">Nguyễn Văn A</p>
            <p className="text-xs text-muted-foreground">Quản trị viên</p>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="size-5" />
            </div>
            <div>
              <p className="font-medium">Nguyễn Văn A</p>
              <p className="text-xs text-muted-foreground font-normal">admin@example.com</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 size-4" />
          <span>Thông tin tài khoản</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Shield className="mr-2 size-4" />
          <span>Phân quyền</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 size-4" />
          <span>Cài đặt</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <FileText className="mr-2 size-4" />
          <span>Lịch sử hoạt động</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 size-4" />
          <span>Trợ giúp</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?")) {
              localStorage.removeItem("auth_token");
              window.location.href = "/login";
            }
          }}
        >
          <LogOut className="mr-2 size-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
