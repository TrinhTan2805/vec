import React, { useState } from "react";
import { BookOpen, Copy, Check, Link, Code2, Play } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export interface ApiDocParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface DataSharingDocProps {
  title: string;
  description: string;
  endpoint: string;
  method: "GET" | "POST";
  params: ApiDocParam[];
  responseSample: string;
}

export default function DataSharingServiceDoc({ title, description, endpoint, method, params, responseSample }: DataSharingDocProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(endpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#020817] font-sans antialiased">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100">
            <BookOpen className="size-5 text-orange-600" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#020817]">{title}</h1>
            <p className="text-[12px] text-slate-500 font-medium">{description}</p>
          </div>
        </div>
        <Button variant="outline" className="h-9 px-4 text-[13px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50 gap-1.5 flex items-center">
          <Play className="size-4" /> Dùng thử API (Sandbox)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: API Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Endpoint Card */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[14px] font-semibold text-[#020817] flex items-center gap-2">
                <Link className="size-4 text-slate-400" /> Đường dẫn truy cập (Endpoint)
              </h2>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                <span className={`px-4 py-3 text-[13px] font-bold text-white ${method === 'GET' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                  {method}
                </span>
                <span className="px-4 py-3 font-mono text-[13px] text-slate-700 flex-1 overflow-x-auto truncate">
                  https://api.vec.gov.vn{endpoint}
                </span>
                <button aria-label="Button" 
                  onClick={handleCopy}
                  className="px-4 py-3 text-slate-400 hover:text-slate-600 transition-colors border-l border-slate-200 bg-white"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Parameters Card */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-[14px] font-semibold text-[#020817]">Tham số dịch vụ (Parameters)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <th className="px-5 py-3.5 font-semibold">Tên tham số</th>
                    <th className="px-5 py-3.5 font-semibold">Kiểu dữ liệu</th>
                    <th className="px-5 py-3.5 font-semibold">Bắt buộc</th>
                    <th className="px-5 py-3.5 font-semibold">Mô tả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {params.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-mono text-[12px] text-slate-900 font-semibold">{p.name}</td>
                      <td className="px-5 py-4 font-mono text-[12px] text-blue-600">{p.type}</td>
                      <td className="px-5 py-4">
                        {p.required ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">Có</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500">Không</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-600">{p.description}</td>
                    </tr>
                  ))}
                  {params.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-6 text-center text-slate-500">API này không yêu cầu tham số.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Response Sample */}
        <div className="lg:col-span-1">
          <Card className="bg-[#1e1e1e] border-none shadow-md rounded-xl overflow-hidden h-full">
            <div className="p-3 border-b border-[#2d2d2d] flex items-center justify-between bg-[#1e1e1e]">
              <h2 className="text-[13px] font-semibold text-slate-300 flex items-center gap-2">
                <Code2 className="size-4" /> Ví dụ Response
              </h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-400">200 OK</span>
            </div>
            <CardContent className="p-0">
              <pre className="p-4 overflow-auto text-[12px] font-mono text-slate-300 h-full max-h-[500px]">
                {responseSample}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
