import React, { useState } from "react";
import { 
  Database, 
  Play, 
  CheckCircle, 
  XCircle, 
  HardDrive, 
  Calendar, 
  Download, 
  Upload, 
  Trash2,
  FileText
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface BackupItem {
  id: number;
  fileName: string;
  type: "Tự động" | "Thủ công";
  dateTime: string;
  size: string;
  duration: string;
  status: "success" | "failure";
}

export default function BackupRestore() {
  // Mock backup list matching the screenshot
  const [backups, setBackups] = useState<BackupItem[]>([
    { id: 1, fileName: "backup_dldc_20241209_020000.sql", type: "Tự động", dateTime: "2024-12-09 02:00:00", size: "2.4 GB", duration: "12 phút 34 giây", status: "success" },
    { id: 2, fileName: "backup_dldc_20241208_020000.sql", type: "Tự động", dateTime: "2024-12-08 02:00:00", size: "2.3 GB", duration: "11 phút 58 giây", status: "success" },
    { id: 3, fileName: "backup_dldc_20241207_153000_manual.sql", type: "Thủ công", dateTime: "2024-12-07 15:30:00", size: "2.3 GB", duration: "13 phút 02 giây", status: "success" },
    { id: 4, fileName: "backup_dldc_20241207_020000.sql", type: "Tự động", dateTime: "2024-12-07 02:00:00", size: "2.3 GB", duration: "12 phút 15 giây", status: "success" },
    { id: 5, fileName: "backup_dldc_20241206_020000.sql", type: "Tự động", dateTime: "2024-12-06 02:00:00", size: "0 B", duration: "0 giây", status: "failure" },
  ]);

  const [pageSize, setPageSize] = useState("10");

  const stats = {
    total: backups.length,
    success: backups.filter(b => b.status === "success").length,
    failure: backups.filter(b => b.status === "failure").length,
    size: "9.3 GB"
  };

  const handleBackupNow = () => {
    alert("Hệ thống bắt đầu khởi chạy tiến trình sao lưu dữ liệu toàn kho DLDC lập tức...\n\nĐang thực thi...\n\nSao lưu hoàn thành thành công!\nTạo mới file: backup_dldc_manual_" + new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '') + ".sql");
    const newItem: BackupItem = {
      id: Date.now(),
      fileName: `backup_dldc_${new Date().toISOString().slice(0,10).replace(/-/g,'')}_manual.sql`,
      type: "Thủ công",
      dateTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      size: "2.3 GB",
      duration: "12 phút 10 giây",
      status: "success"
    };
    setBackups([newItem, ...backups]);
  };

  const handleDownload = (fileName: string) => {
    alert(`Bắt đầu tải file sao lưu về thiết bị: ${fileName}`);
  };

  const handleRestore = (fileName: string) => {
    if (confirm(`CẢNH BÁO: Bạn có chắc chắn muốn KHÔI PHỤC cơ sở dữ liệu về thời điểm bản ghi của tệp ${fileName} không? Hành động này sẽ thay thế dữ liệu hiện tại!`)) {
      alert(`Đang giải nén và khôi phục cơ sở dữ liệu từ tệp: ${fileName}...\nKhôi phục dữ liệu thành công!`);
    }
  };

  const handleDelete = (id: number, fileName: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bản sao lưu ${fileName} không?`)) {
      setBackups(backups.filter(b => b.id !== id));
      alert(`Đã xóa bản sao lưu ${fileName}.`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb & Title */}
      <div>
        <nav className="text-xs text-slate-400 font-semibold mb-1">
          Quản trị & vận hành / Cấu hình hệ thống / <span className="text-slate-600">Sao lưu dự phòng</span>
        </nav>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="size-5.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Sao lưu dự phòng</h2>
              <p className="text-xs text-slate-400">Quản lý và thực hiện sao lưu dữ liệu hệ thống kho DLDC</p>
            </div>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-5 rounded-xl shadow-lg shadow-blue-200 gap-1.5"
            onClick={handleBackupNow}
          >
            <Play className="size-4 fill-current" />
            Sao lưu ngay
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-slate-200/60 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Database className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Tổng bản sao lưu</p>
              <p className="text-3xl font-extrabold text-slate-800">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Thành công</p>
              <p className="text-3xl font-extrabold text-green-600">{stats.success}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <XCircle className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Thất bại</p>
              <p className="text-3xl font-extrabold text-red-600">{stats.failure}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200/60 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <HardDrive className="size-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Dung lượng</p>
              <p className="text-3xl font-extrabold text-purple-600">{stats.size}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert / Notice Banner */}
      <div className="flex items-center gap-3 bg-blue-50/70 border border-blue-100/50 rounded-xl p-4 text-blue-700">
        <Calendar className="size-5 flex-shrink-0 text-blue-500" />
        <span className="text-xs font-bold">Lịch sao lưu tự động: Hàng ngày lúc 02:00 AM | Lưu trữ: 30 ngày</span>
      </div>

      {/* Backups Table */}
      <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 text-center w-12 font-bold">STT</th>
                <th className="px-5 py-3.5 font-bold">Tên file</th>
                <th className="px-5 py-3.5 font-bold">Loại</th>
                <th className="px-5 py-3.5 font-bold">Ngày giờ</th>
                <th className="px-5 py-3.5 font-bold">Dung lượng</th>
                <th className="px-5 py-3.5 font-bold">Thời gian</th>
                <th className="px-5 py-3.5 font-bold w-32">Trạng thái</th>
                <th className="px-5 py-3.5 text-center w-36 font-bold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {backups.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/40">
                  <td className="px-5 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-700 flex items-center gap-2">
                      <FileText className="size-4 text-slate-400" />
                      {item.fileName}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge className={
                      item.type === "Tự động"
                        ? "bg-blue-50 text-blue-700 border-none rounded-md px-2 py-0.5 font-bold text-[10px]"
                        : "bg-purple-50 text-purple-700 border-none rounded-md px-2 py-0.5 font-bold text-[10px]"
                    }>
                      {item.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs font-semibold">{item.dateTime}</td>
                  <td className="px-5 py-4 text-slate-800 font-semibold">{item.size}</td>
                  <td className="px-5 py-4 text-slate-600 font-medium">{item.duration}</td>
                  <td className="px-5 py-4">
                    <Badge className={
                      item.status === "success"
                        ? "bg-green-50 text-green-700 border-none rounded-md px-2.5 py-0.5 font-bold text-[10px] flex items-center gap-1 w-max"
                        : "bg-red-50 text-red-700 border-none rounded-md px-2.5 py-0.5 font-bold text-[10px] flex items-center gap-1 w-max"
                    }>
                      <span className={`size-1.5 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {item.status === "success" ? "Thành công" : "Thất bại"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg disabled:opacity-40 disabled:pointer-events-none"
                        title="Tải xuống"
                        disabled={item.status === "failure"}
                        onClick={() => handleDownload(item.fileName)}
                      >
                        <Download className="size-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg disabled:opacity-40 disabled:pointer-events-none"
                        title="Khôi phục"
                        disabled={item.status === "failure"}
                        onClick={() => handleRestore(item.fileName)}
                      >
                        <Upload className="size-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        title="Xóa bản sao lưu"
                        onClick={() => handleDelete(item.id, item.fileName)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Hiển thị</span>
            <Select value={pageSize} onValueChange={setPageSize}>
              <SelectTrigger className="h-7 w-[70px] text-xs border-slate-200 bg-white">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>bản ghi/trang</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-slate-500" disabled>Trước</Button>
            <Button className="h-8 w-8 text-xs font-bold bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold text-slate-500" disabled>Sau</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
