import React, { useState } from "react";
import { Settings, Shield, Key, Plus, Trash2, Clock, Globe, RefreshCw, Save, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const MOCK_TOKENS = [
  { id: 1, name: "Cục Đường bộ VN - Token", key: "sk_live_dbvn_...", createdAt: "10/05/2026", expiresAt: "10/05/2027", status: "Active" },
  { id: 2, name: "Sở GTVT Hà Nội - Token", key: "sk_live_hanoi_...", createdAt: "15/05/2026", expiresAt: "Vĩnh viễn", status: "Active" },
];

export default function CauHinhDichVu() {
  const [activeTab, setActiveTab] = useState("tokens");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#020817] font-sans antialiased">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
            <Settings className="size-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#020817]">Cấu hình dịch vụ tích hợp</h1>
            <p className="text-[12px] text-slate-500 font-medium">Quản lý xác thực (Token), phân quyền IP và giới hạn tốc độ truy cập API</p>
          </div>
        </div>
        <Button className="h-9 px-4 text-[13px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm gap-1.5 flex items-center">
          <Save className="size-4" /> Lưu cấu hình
        </Button>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          <button aria-label="Button"
            onClick={() => setActiveTab("tokens")}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-medium transition-all text-left ${
              activeTab === "tokens" ? "bg-white border-indigo-500 border-2 text-indigo-700 shadow-sm" : "bg-transparent border-2 border-transparent text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Key className={`size-4.5 ${activeTab === "tokens" ? "text-indigo-600" : "text-slate-400"}`} />
            Quản lý API Tokens
          </button>
          
          <button aria-label="Button"
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-medium transition-all text-left ${
              activeTab === "security" ? "bg-white border-indigo-500 border-2 text-indigo-700 shadow-sm" : "bg-transparent border-2 border-transparent text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Shield className={`size-4.5 ${activeTab === "security" ? "text-indigo-600" : "text-slate-400"}`} />
            Bảo mật & IP Whitelist
          </button>

          <button aria-label="Button"
            onClick={() => setActiveTab("limits")}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-medium transition-all text-left ${
              activeTab === "limits" ? "bg-white border-indigo-500 border-2 text-indigo-700 shadow-sm" : "bg-transparent border-2 border-transparent text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Clock className={`size-4.5 ${activeTab === "limits" ? "text-indigo-600" : "text-slate-400"}`} />
            Rate Limit & Timeout
          </button>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          {activeTab === "tokens" && (
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h2 className="text-[14px] font-semibold text-[#020817]">Danh sách API Tokens</h2>
                  <p className="text-[12px] text-slate-500">Mã định danh bảo mật cấp cho các đối tác để truy cập API</p>
                </div>
                <Button variant="outline" className="h-9 px-4 text-[13px] font-medium border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 gap-1.5 flex items-center">
                  <Plus className="size-4" /> Tạo Token mới
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-slate-500 border-b border-slate-200">
                      <th className="px-5 py-3.5 font-semibold">Tên ứng dụng/đối tác</th>
                      <th className="px-5 py-3.5 font-semibold">Token Key</th>
                      <th className="px-5 py-3.5 font-semibold">Ngày tạo</th>
                      <th className="px-5 py-3.5 font-semibold">Hết hạn</th>
                      <th className="px-5 py-3.5 font-semibold text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_TOKENS.map((token) => (
                      <tr key={token.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-slate-900">{token.name}</td>
                        <td className="px-5 py-4 font-mono text-slate-500 tracking-wider text-[12px]">{token.key}</td>
                        <td className="px-5 py-4 text-slate-600">{token.createdAt}</td>
                        <td className="px-5 py-4 text-slate-600">{token.expiresAt}</td>
                        <td className="px-5 py-4 text-right">
                          <button aria-label="Button" className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Thu hồi token">
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-[14px] font-semibold text-[#020817]">Cấu hình IP Whitelist</h2>
                <p className="text-[12px] text-slate-500">Chỉ cho phép các địa chỉ IP được khai báo dưới đây gọi đến API</p>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-[#020817]">Danh sách IP cho phép (Mỗi IP một dòng)</label>
                  <textarea aria-label="Input" 
                    className="w-full bg-white border border-slate-200 rounded-md h-32 p-3 text-[13px] font-mono shadow-xs outline-none focus:border-indigo-500"
                    defaultValue={"192.168.1.100\n203.113.120.45\n10.0.0.0/24"}
                  />
                  <p className="text-[11px] text-slate-500">Hỗ trợ dải IP (CIDR notation)</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "limits" && (
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-[14px] font-semibold text-[#020817]">Giới hạn truy cập & Thời gian chờ</h2>
              </div>
              <CardContent className="p-5 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Rate Limit (Số Request/Giây)</p>
                    <p className="text-[12px] text-slate-500">Giới hạn số lượng request tối đa trên mỗi giây (Per IP)</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input aria-label="Input" 
                      type="number"
                      defaultValue={100}
                      className="w-16 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50 h-full flex items-center">
                      req/s
                    </span>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Timeout của API (Giây)</p>
                    <p className="text-[12px] text-slate-500">Thời gian chờ tối đa trước khi trả về lỗi Timeout</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input aria-label="Input" 
                      type="number"
                      defaultValue={30}
                      className="w-16 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50 h-full flex items-center">
                      giây
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
