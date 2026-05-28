import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import {
  Upload,
  FileSpreadsheet,
  MapIcon,
  Database,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Settings2,
  Table as TableIcon,
  Globe,
  Layers
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface FieldMapping {
  systemField: string;
  label: string;
  fileColumn: string;
}

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: { name: string; label: string }[];
  onImportComplete: (data: any[]) => void;
}

export function ImportDialog({
  open,
  onOpenChange,
  title,
  fields,
  onImportComplete,
}: ImportDialogProps) {
  const [step, setStep] = useState(1);
  const [format, setFormat] = useState("excel");
  const [coordSystem, setCoordSystem] = useState("vn2000");
  const [importMode, setImportMode] = useState("new");
  const [spatialType, setSpatialType] = useState("polyline");
  const [mappings, setMappings] = useState<FieldMapping[]>(
    fields.map((f) => ({ systemField: f.name, label: f.label, fileColumn: "" }))
  );
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const startImport = () => {
    setIsImporting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onImportComplete([]);
          onOpenChange(false);
          setStep(1);
          setIsImporting(false);
          setProgress(0);
        }, 500);
      }
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[70%] max-h-[90vh] bg-white border-slate-200 shadow-xl overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Upload className="size-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              <DialogDescription>
                Hỗ trợ nhập dữ liệu không gian và thuộc tính từ nhiều định dạng.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-8">
            {[
              { s: 1, label: "Cấu hình" },
              { s: 2, label: "Ánh xạ" },
              { s: 3, label: "Hoàn tất" },
            ].map((item, index) => (
              <React.Fragment key={item.s}>
                <div className="flex flex-col items-center">
                  <div
                    className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step >= item.s
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {step > item.s ? <CheckCircle2 className="size-5" /> : item.s}
                  </div>
                  <span
                    className={`text-[10px] mt-1 font-medium ${
                      step >= item.s ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-20 h-[2px] mx-2 -mt-4 transition-colors ${
                      step > item.s ? "bg-blue-600" : "bg-slate-100"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <Settings2 className="size-4" />
                    Định dạng file
                  </Label>
                  <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                      <RadioGroupItem value="excel" id="excel" />
                      <Label htmlFor="excel" className="flex items-center gap-3 cursor-pointer flex-1">
                        <FileSpreadsheet className="size-5 text-green-600" />
                        <div>
                          <p className="font-semibold">Microsoft Excel</p>
                          <p className="text-[10px] text-slate-500">.xlsx, .xls, .csv</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                      <RadioGroupItem value="shp" id="shp" />
                      <Label htmlFor="shp" className="flex items-center gap-3 cursor-pointer flex-1">
                        <MapIcon className="size-5 text-blue-600" />
                        <div>
                          <p className="font-semibold">ESRI Shapefile</p>
                          <p className="text-[10px] text-slate-500">.zip chứa file .shp, .dbf, ...</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                      <RadioGroupItem value="gdb" id="gdb" />
                      <Label htmlFor="gdb" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Database className="size-5 text-orange-600" />
                        <div>
                          <p className="font-semibold">File Geodatabase</p>
                          <p className="text-[10px] text-slate-500">Thư mục .gdb nén .zip</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      <Globe className="size-4" />
                      Hệ tọa độ
                    </Label>
                    <Select value={coordSystem} onValueChange={setCoordSystem}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vn2000">VN2000 (Kinh tuyến trục HN)</SelectItem>
                        <SelectItem value="wgs84">WGS84 (EPSG:4326)</SelectItem>
                        <SelectItem value="web">Web Mercator (EPSG:3857)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      <Layers className="size-4" />
                      Kiểu dữ liệu không gian
                    </Label>
                    <Select value={spatialType} onValueChange={setSpatialType}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="point">Point (Điểm)</SelectItem>
                        <SelectItem value="polyline">Polyline (Đường/Tuyến)</SelectItem>
                        <SelectItem value="polygon">Polygon (Vùng)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      Chế độ nhập
                    </Label>
                    <RadioGroup value={importMode} onValueChange={setImportMode} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="mode-new" />
                        <Label htmlFor="mode-new" className="text-xs">Thêm mới</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="update" id="mode-update" />
                        <Label htmlFor="mode-update" className="text-xs">Bổ sung/Cập nhật</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                <div className="bg-slate-100 size-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors">
                  <Upload className="size-6 text-slate-400 group-hover:text-blue-600" />
                </div>
                <p className="text-sm font-medium text-slate-900">Click để chọn file hoặc kéo thả vào đây</p>
                <p className="text-xs text-slate-500 mt-1">Dung lượng tối đa: 50MB</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <TableIcon className="size-4" />
                  Cấu hình ánh xạ trường dữ liệu
                </div>
                <Badge variant="outline" className="bg-white text-blue-600 border-blue-200">
                  Phát hiện 12 cột trong file
                </Badge>
              </div>

              <div className="border rounded-lg overflow-hidden h-[350px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-semibold text-slate-700">Trường hệ thống</th>
                      <th className="text-center p-3 font-semibold text-slate-700 w-12"></th>
                      <th className="text-left p-3 font-semibold text-slate-700">Cột trong file dữ liệu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mappings.map((mapping, index) => (
                      <tr key={mapping.systemField} className="hover:bg-slate-50/50">
                        <td className="p-3">
                          <div className="font-medium text-slate-900">{mapping.label}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{mapping.systemField}</div>
                        </td>
                        <td className="p-3 text-center">
                          <ArrowRight className="size-4 text-slate-300 mx-auto" />
                        </td>
                        <td className="p-3">
                          <Select 
                            value={mapping.fileColumn} 
                            onValueChange={(val) => {
                              const newMappings = [...mappings];
                              newMappings[index].fileColumn = val;
                              setMappings(newMappings);
                            }}
                          >
                            <SelectTrigger className="h-9 border-slate-200">
                              <SelectValue placeholder="Chọn cột..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">-- Không ánh xạ --</SelectItem>
                              <SelectItem value="col1">COLUMN_1 (Mã)</SelectItem>
                              <SelectItem value="col2">NAME_VI (Tên)</SelectItem>
                              <SelectItem value="col3">LENGTH (Chiều dài)</SelectItem>
                              <SelectItem value="geom">SHAPE (Địa hình)</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
              {!isImporting ? (
                <>
                  <div className="size-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="size-10 text-green-600" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Sẵn sàng nhập dữ liệu</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Hệ thống đã kiểm tra tính hợp lệ của file và ánh xạ trường. 
                      Nhấn "Bắt đầu" để thực hiện lưu vào cơ sở dữ liệu.
                    </p>
                  </div>
                </>
              ) : (
                <div className="w-full max-w-md space-y-4">
                  <div className="flex justify-between items-end mb-1">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900">Đang thực hiện nhập...</p>
                      <p className="text-xs text-slate-500 italic">Xử lý bản ghi {Math.floor(progress * 2.5)} / 250</p>
                    </div>
                    <span className="text-xl font-black text-blue-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                    <style dangerouslySetInnerHTML={{ __html: `.import-progress-bar { width: ${progress}%; }` }} />
                    <div 
                      className="bg-blue-600 h-full transition-all duration-300 flex items-center justify-end pr-1 shadow-lg import-progress-bar"
                    >
                      <div className="size-1 bg-white/50 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center">
                      <span className="text-2xl font-bold text-blue-600">{Math.floor(progress * 2.45)}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mt-1">Hợp lệ</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border flex flex-col items-center">
                      <span className="text-2xl font-bold text-red-500">2</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mt-1">Lỗi tọa độ</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="bg-slate-50 p-6 -mx-6 -mb-6 border-t rounded-b-lg">
          {step > 1 && !isImporting && (
            <Button variant="outline" onClick={handleBack} className="mr-auto">
              Quay lại
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isImporting}>
            Hủy bỏ
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              Tiếp tục
              <ArrowRight className="size-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={startImport} 
              className="bg-green-600 hover:bg-green-700 min-w-[120px]"
              disabled={isImporting}
            >
              {isImporting ? "Đang xử lý..." : "Bắt đầu nhập"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
