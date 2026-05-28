import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { 
  Search, 
  MapPin, 
  ExternalLink, 
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "../ui/badge";

interface MapMarker {
  id: number | string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  currentStatus?: {
    condition: string;
    managementUnit?: string;
  };
}

interface AssetDataSheetProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MapMarker[];
  onFlyTo: (lat: number, lng: number) => void;
}

export function AssetDataSheet({ isOpen, onClose, assets, onFlyTo }: AssetDataSheetProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] sm:h-[70vh] p-0 gap-0 border-t border-primary/20 bg-background/95 backdrop-blur-xl">
        <div className="flex flex-col h-full max-w-7xl mx-auto">
          <SheetHeader className="p-6 border-b border-border/50 bg-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                  Bảng dữ liệu tài sản KCHT
                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                    {filteredAssets.length} đối tượng
                  </Badge>
                </SheetTitle>
                <SheetDescription className="text-muted-foreground mt-1">
                  Danh sách chi tiết các tài sản kết cấu hạ tầng đang hiển thị trên bản đồ.
                </SheetDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <Download className="size-4" />
                  Xuất Excel
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                  placeholder="Tìm kiếm tài sản theo tên, loại..." 
                  className="pl-9 h-10 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="size-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto bg-background/50">
            <Table>
              <TableHeader className="sticky top-0 bg-secondary/30 backdrop-blur-sm z-10 shadow-sm">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[80px] font-bold text-primary">STT</TableHead>
                  <TableHead className="font-bold text-primary">Tên tài sản</TableHead>
                  <TableHead className="font-bold text-primary">Loại</TableHead>
                  <TableHead className="font-bold text-primary">Tọa độ</TableHead>
                  <TableHead className="font-bold text-primary">Tình trạng</TableHead>
                  <TableHead className="font-bold text-primary">Đơn vị quản lý</TableHead>
                  <TableHead className="text-right font-bold text-primary">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset, index) => (
                    <TableRow key={asset.id} className="group hover:bg-primary/5 transition-colors border-border/40">
                      <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {asset.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal bg-secondary/50">
                          {asset.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-[10px] text-muted-foreground">
                        {asset.lat.toFixed(6)}, {asset.lng.toFixed(6)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            asset.currentStatus?.condition === 'Tốt' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                            asset.currentStatus?.condition === 'Trung bình' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                            'bg-red-500/10 text-red-600 border-red-500/20'
                          }
                          variant="outline"
                        >
                          {asset.currentStatus?.condition || 'Chưa cập nhật'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm italic">
                        {asset.currentStatus?.managementUnit || 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                            onClick={() => {
                              onFlyTo(asset.lat, asset.lng);
                              onClose();
                            }}
                            title="Định vị trên bản đồ"
                          >
                            <MapPin className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                        <Search className="size-8 opacity-20" />
                        <p>Không tìm thấy tài sản nào phù hợp.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t border-border/50 bg-secondary/10 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
            <p>Hiển thị {filteredAssets.length} trên tổng số {assets.length} tài sản</p>
            <p>Cập nhật lần cuối: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
