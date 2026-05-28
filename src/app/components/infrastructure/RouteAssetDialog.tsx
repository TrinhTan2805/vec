import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, MapPin, Flag, Info, ListFilter } from "lucide-react";
import { useState, useMemo } from "react";

interface RouteAsset {
  id: string;
  type: string;
  km: string;
  h?: string;
  side: "Trái" | "Phải" | "Giữa";
  status: "Tốt" | "Bình thường" | "Cần bảo trì" | "Hư hỏng";
  note?: string;
}

interface RouteAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routeName: string;
  assets: RouteAsset[];
}

export function RouteAssetDialog({ open, onOpenChange, routeName, assets }: RouteAssetDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const assetCategories = useMemo(() => {
    const categories = assets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categories).map(([type, count]) => ({ type, count }));
  }, [assets]);

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = 
        asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.km.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asset.note && asset.note.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTab = activeTab === "all" || asset.type === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [assets, searchTerm, activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tốt": return "bg-green-100 text-green-700";
      case "Bình thường": return "bg-blue-100 text-blue-700";
      case "Cần bảo trì": return "bg-amber-100 text-amber-700";
      case "Hư hỏng": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getAssetIcon = (type: string) => {
    if (type.includes("Km")) return <MapPin className="size-4 text-blue-500" />;
    if (type.includes("Biển báo")) return <Flag className="size-4 text-amber-500" />;
    return <Info className="size-4 text-slate-500" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[80vw] !max-w-none max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white border-slate-200 shadow-2xl">
        <DialogHeader className="p-6 border-b border-slate-100 bg-slate-50/30">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <ListFilter className="size-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                Tài sản trên tuyến: <span className="text-blue-600">{routeName}</span>
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                Chi tiết các hạng mục hạ tầng giao thông dọc theo tuyến đường.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Tìm kiếm theo loại, lý trình hoặc ghi chú..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-11 border-slate-200 shadow-sm focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="flex-1 overflow-hidden flex flex-col" onValueChange={setActiveTab}>
          <div className="px-6 bg-slate-50/50 border-b border-slate-100">
            <TabsList className="h-12 bg-transparent gap-6 p-0 justify-start">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-0 text-slate-500 font-medium transition-all"
              >
                Tất cả <span className="ml-1.5 px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold">{assets.length}</span>
              </TabsTrigger>
              {assetCategories.map(cat => (
                <TabsTrigger 
                  key={cat.type}
                  value={cat.type}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none px-0 text-slate-500 font-medium transition-all text-sm"
                >
                  {cat.type} <span className="ml-1.5 px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded-full text-[10px] font-bold">{cat.count}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden p-6 bg-slate-50/20">
            <div className="h-full border rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader className="bg-slate-50/80 sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent border-b border-slate-200">
                      <TableHead className="w-12 text-center font-bold text-slate-700 uppercase p-4 text-[10px]">STT</TableHead>
                      <TableHead className="font-bold text-slate-700 uppercase p-4 text-[10px]">Loại tài sản</TableHead>
                      <TableHead className="font-bold text-slate-700 uppercase p-4 text-[10px] text-center">Lý trình (Km)</TableHead>
                      <TableHead className="font-bold text-slate-700 uppercase p-4 text-[10px] text-center">Cột H</TableHead>
                      <TableHead className="font-bold text-slate-700 uppercase p-4 text-[10px] text-center">Vị trí (Bên)</TableHead>
                      <TableHead className="font-bold text-slate-700 uppercase p-4 text-[10px] text-center">Tình trạng</TableHead>
                      <TableHead className="font-bold text-slate-700 uppercase p-4 text-[10px]">Ghi chú</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-64 text-center text-slate-400 italic">
                          Không tìm thấy tài sản nào trong mục này.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAssets.map((asset, index) => (
                        <TableRow key={asset.id} className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors">
                          <TableCell className="text-center text-slate-500 font-medium p-4 text-sm">{index + 1}</TableCell>
                          <TableCell className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                                {getAssetIcon(asset.type)}
                              </div>
                              <span className="font-bold text-slate-800 text-sm">{asset.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-mono text-blue-600 font-semibold p-4 text-sm">{asset.km}</TableCell>
                          <TableCell className="text-center font-medium text-slate-600 p-4 text-sm">{asset.h || "-"}</TableCell>
                          <TableCell className="text-center p-4">
                            <Badge variant="outline" className="font-medium px-2 py-0 border-slate-200 text-slate-600 bg-white">
                              {asset.side}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center p-4">
                            <Badge className={`${getStatusColor(asset.status)} border-none shadow-none font-semibold text-[10px]`}>
                              {asset.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-500 text-xs italic p-4 max-w-[200px] truncate">{asset.note || "-"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
