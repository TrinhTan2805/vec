import { useState } from "react";
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle, Clock } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

interface Notification {
  id: string;
  type: "error" | "warning" | "info" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Có phản ánh sự cố mới",
    message: "Hư hỏng mặt đường tại Quốc lộ 1A - Km234",
    time: "5 phút trước",
    read: false,
  },
  {
    id: "2",
    type: "error",
    title: "Cảnh báo vi phạm",
    message: "Phát hiện xây dựng trái phép trên hành lang QL5",
    time: "15 phút trước",
    read: false,
  },
  {
    id: "3",
    type: "success",
    title: "Xử lý sự cố hoàn tất",
    message: "Đã khắc phục xong ngập nước tại Vành đai 2",
    time: "1 giờ trước",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "Lên kế hoạch bảo trì",
    message: "Đã thêm sự cố VD-004 vào danh sách bảo trì",
    time: "2 giờ trước",
    read: true,
  },
  {
    id: "5",
    type: "error",
    title: "Cảnh báo nguy cấp",
    message: "Mức nước dâng cao tại Hầm Kim Liên, nguy cơ ngập",
    time: "3 giờ trước",
    read: true,
  },
];

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="size-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="size-5 text-orange-500" />;
      case "info":
        return <Info className="size-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="size-5 text-green-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <h3 className="font-semibold text-sm">Thông báo</h3>
            <p className="text-xs text-muted-foreground">
              Bạn có {unreadCount} thông báo chưa đọc
            </p>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-primary hover:text-primary"
              onClick={markAllAsRead}
            >
              Đọc tất cả
            </Button>
          )}
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`px-4 py-3 cursor-pointer focus:bg-accent ${
                !notification.read ? "bg-accent/50" : ""
              }`}
            >
              <div className="flex gap-3 w-full">
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm leading-tight">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="px-4 py-2">
          <Button variant="ghost" size="sm" className="w-full text-xs text-primary hover:text-primary">
            Xem tất cả thông báo
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
