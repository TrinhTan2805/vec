import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { 
  Building2, 
  MapPin, 
  Route, 
  Construction, 
  ShieldCheck, 
  CheckCircle2, 
  Info,
  Type
} from "lucide-react";
import { Badge } from "../ui/badge";

interface NewAssetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assetData: any) => void;
  geometryType: 'point' | 'polyline' | 'polygon';
  coordinates: any;
}

export function NewAssetDialog({ isOpen, onClose, onSave, geometryType, coordinates }: NewAssetDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Quốc lộ",
    description: "",
    managementUnit: "Sở Giao thông Vận tải Hà Nội",
    condition: "Tốt",
  });

  const handleSave = () => {
    onSave({
      ...formData,
      geometryType,
      coordinates,
      id: `new-${Date.now()}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-primary/20 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="p-0 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Construction className="size-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Thêm tài sản mới</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Nhập thông tin chi tiết cho đối tượng vừa vẽ trên bản đồ.
              </DialogDescription>
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
            <Badge variant="outline" className="h-6 gap-1.5 font-medium border-primary/20 bg-primary/5 text-primary">
              {geometryType === 'point' && <MapPin className="size-3" />}
              {geometryType === 'polyline' && <Route className="size-3" />}
              {geometryType === 'polygon' && <Construction className="size-3" />}
              Kiểu: {geometryType === 'point' ? 'Điểm' : geometryType === 'polyline' ? 'Đường' : 'Vùng'}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-bold flex items-center gap-1.5">
              <Type className="size-3.5 text-primary" />
              Tên tài sản
            </Label>
            <Input 
              id="name" 
              placeholder="VD: Cầu Chương Dương, Quốc lộ 1A..." 
              autoFocus
              className="h-10 border-border/60 focus:border-primary/50"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-sm font-bold flex items-center gap-1.5">
                <Info className="size-3.5 text-primary" />
                Loại tài sản
              </Label>
              <Select 
                value={formData.type} 
                onValueChange={(v) => setFormData({...formData, type: v})}
              >
                <SelectTrigger className="h-10 bg-background border-border/60">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quốc lộ">Quốc lộ</SelectItem>
                  <SelectItem value="Cầu">Cầu</SelectItem>
                  <SelectItem value="Hầm">Hầm</SelectItem>
                  <SelectItem value="Đường bộ">Đường bộ</SelectItem>
                  <SelectItem value="Đường thủy">Đường thủy</SelectItem>
                  <SelectItem value="Đường sắt">Đường sắt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="condition" className="text-sm font-bold flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-primary" />
                Hiện trạng
              </Label>
              <Select 
                value={formData.condition} 
                onValueChange={(v) => setFormData({...formData, condition: v})}
              >
                <SelectTrigger className="h-10 bg-background border-border/60 font-medium">
                  <SelectValue placeholder="Chọn điều kiện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tốt" className="text-emerald-600 font-medium">Tốt</SelectItem>
                  <SelectItem value="Trung bình" className="text-amber-600 font-medium">Trung bình</SelectItem>
                  <SelectItem value="Kém" className="text-red-600 font-medium">Kém</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="unit" className="text-sm font-bold flex items-center gap-1.5">
              <Building2 className="size-3.5 text-primary" />
              Đơn vị quản lý
            </Label>
            <Input 
              id="unit" 
              className="h-10 border-border/60"
              value={formData.managementUnit}
              onChange={(e) => setFormData({...formData, managementUnit: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-bold">Mô tả chi tiết</Label>
            <Textarea 
              id="description" 
              placeholder="Nhập ghi chú thêm..." 
              className="resize-none h-24 border-border/60 focus:border-primary/50"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 mt-4 pt-6 border-t border-border/50 sm:justify-between items-center">
          <div className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 cursor-help">
            <Info className="size-3" />
            Vị trí đã được lưu trữ tự động
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} className="hover:bg-secondary/80">
              Hủy
            </Button>
            <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20 pr-5">
              <CheckCircle2 className="size-4" />
              Lưu tài sản
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
