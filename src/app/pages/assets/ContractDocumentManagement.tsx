import React, { useState } from "react";
import { 
  FileText, Briefcase, Plus, Search, FolderOpen, Calendar, DollarSign, Download, ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function ContractDocumentManagement() {
  const [activeTab, setActiveTab] = useState<'hop-dong'|'ho-so'>('hop-dong');

  const mockContracts = [
    { id: "HĐ-2026/01", name: "Hợp đồng Vận hành & Bảo trì Cao tốc Cầu Giẽ - Ninh Bình", type: "Hợp đồng O&M", partner: "Công ty CP Vận hành Cao tốc", value: "15,500,000,000", startDate: "01/01/2026", endDate: "31/12/2026", status: "Đang hiệu lực" },
    { id: "HĐ-2026/15", name: "Gói thầu sửa chữa định kỳ Khe co giãn", type: "Hợp đồng Sửa chữa", partner: "Nhà thầu xây dựng A", value: "3,200,000,000", startDate: "15/05/2026", endDate: "15/08/2026", status: "Đang thực hiện" },
    { id: "HĐ-2025/99", name: "Hợp đồng cung cấp Hệ thống chiếu sáng IC3", type: "Hợp đồng Mua sắm", partner: "Công ty Thiết bị Điện B", value: "850,000,000", startDate: "10/10/2025", endDate: "10/12/2025", status: "Đã thanh lý" },
  ];

  const mockDocuments = [
    { id: "HS-001", name: "Hồ sơ Hoàn công Cầu vượt Mai Dịch", type: "Bản vẽ As-built", asset: "Cầu vượt Mai Dịch", date: "15/12/2023", size: "15.4 MB" },
    { id: "HS-002", name: "Giấy chứng nhận Kiểm định Trạm cân xe", type: "Kiểm định, Hiệu chuẩn", asset: "Trạm cân Cao Bồ", date: "20/01/2026", size: "2.1 MB" },
    { id: "HS-003", name: "Quy trình vận hành Hệ thống ITS", type: "Tài liệu kỹ thuật", asset: "Hệ thống ITS toàn tuyến", date: "05/03/2025", size: "8.5 MB" },
    { id: "HS-004", name: "Biên bản Bàn giao tài sản Đèn chiếu sáng", type: "Biên bản Bàn giao", asset: "Hệ thống chiếu sáng IC3", date: "15/12/2025", size: "1.2 MB" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Hợp đồng & Hồ sơ tài sản</h1>
          <p className="text-sm text-slate-500">Lưu trữ và theo dõi các Hợp đồng khai thác, bảo trì và Hồ sơ tài liệu kỹ thuật liên quan</p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="size-4" /> {activeTab === 'hop-dong' ? 'Tạo Hợp đồng' : 'Thêm Hồ sơ mới'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl"><Briefcase className="size-6 text-blue-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Hợp đồng đang hiệu lực</p>
              <p className="text-2xl font-bold text-slate-800">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-xl"><Calendar className="size-6 text-amber-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Sắp hết hạn (30 ngày)</p>
              <p className="text-2xl font-bold text-amber-600">3</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl"><FolderOpen className="size-6 text-emerald-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Tổng Hồ sơ lưu trữ</p>
              <p className="text-2xl font-bold text-slate-800">8,450</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-xl"><FileText className="size-6 text-slate-600" /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Tài liệu mới cập nhật</p>
              <p className="text-2xl font-bold text-indigo-600">12</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-0 pt-4 px-6">
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab('hop-dong')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'hop-dong' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Hợp đồng Khai thác & Bảo trì
            </button>
            <button 
              onClick={() => setActiveTab('ho-so')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'ho-so' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Hồ sơ Quản lý Khai thác
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between">
             <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={`Tìm kiếm...`} 
                  className="w-80 pl-9 pr-3 py-1.5 text-sm border border-slate-200 bg-white rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
          </div>
          
          {activeTab === 'hop-dong' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Mã HĐ</th>
                  <th className="px-6 py-3.5 font-medium">Tên hợp đồng</th>
                  <th className="px-6 py-3.5 font-medium">Đối tác</th>
                  <th className="px-6 py-3.5 font-medium">Giá trị (VNĐ)</th>
                  <th className="px-6 py-3.5 font-medium">Hiệu lực</th>
                  <th className="px-6 py-3.5 font-medium">Trạng thái</th>
                  <th className="px-6 py-3.5 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockContracts.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {item.name}
                      <p className="text-xs font-normal text-slate-500 mt-0.5">{item.type}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.partner}</td>
                    <td className="px-6 py-4 font-medium text-slate-700 flex items-center gap-1 mt-1.5"><DollarSign className="size-3 text-emerald-500" /> {item.value}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {item.startDate} <br/><span className="text-slate-400">đến</span> {item.endDate}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`border-none ${
                        item.status === 'Đang hiệu lực' || item.status === 'Đang thực hiện' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">Chi tiết</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'ho-so' && (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Mã HS</th>
                  <th className="px-6 py-3.5 font-medium">Tên hồ sơ / Tài liệu</th>
                  <th className="px-6 py-3.5 font-medium">Loại tài liệu</th>
                  <th className="px-6 py-3.5 font-medium">Liên kết Tài sản</th>
                  <th className="px-6 py-3.5 font-medium">Ngày ban hành</th>
                  <th className="px-6 py-3.5 font-medium">Dung lượng</th>
                  <th className="px-6 py-3.5 font-medium text-right">Tải về</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockDocuments.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-indigo-700 cursor-pointer hover:underline flex items-center gap-2">
                      <FileText className="size-4 text-indigo-400" /> {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal">{item.type}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 flex items-center gap-1.5 mt-1">
                      <ExternalLink className="size-3 text-slate-400" /> {item.asset}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.date}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{item.size}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600">
                        <Download className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
