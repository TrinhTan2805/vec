import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Layers, Eye, EyeOff, ChevronDown, ChevronRight,
  Map as MapIcon, Search, X, Info, Maximize2, Minimize2,
  RefreshCw, Filter, Download
} from 'lucide-react';

// ───────────────────────── Layer config ─────────────────────────
interface LayerConfig {
  key: string;
  name: string;
  file: string;
  count: number;
  geomTypes: string[];
  color: string;
  lineWeight?: number;
  pointRadius?: number;
  opacity?: number;
  category: string;
}

const LAYER_CONFIGS: LayerConfig[] = [
  // Đường
  { key: 'tuyenduong', name: 'Tuyến đường', file: 'tuyenduong.geojson', count: 888, geomTypes: ['LineString'], color: '#3b82f6', lineWeight: 3, opacity: 0.85, category: 'Đường bộ' },
  { key: 'doanduong', name: 'Đoạn đường', file: 'doanduong.geojson', count: 1286, geomTypes: ['LineString'], color: '#60a5fa', lineWeight: 2, opacity: 0.75, category: 'Đường bộ' },
  { key: 'lichsuduytubaoduong', name: 'Lịch sử duy tu', file: 'lichsuduytubaoduong.geojson', count: 2017, geomTypes: ['LineString'], color: '#f59e0b', lineWeight: 2, opacity: 0.7, category: 'Đường bộ' },
  { key: 'vachson', name: 'Vạch sơn đường', file: 'vachson.geojson', count: 18, geomTypes: ['LineString'], color: '#ffffff', lineWeight: 2, opacity: 0.9, category: 'Đường bộ' },
  // Cầu & nút giao
  { key: 'cau', name: 'Cầu', file: 'cau.geojson', count: 284, geomTypes: ['Point'], color: '#10b981', pointRadius: 6, opacity: 0.9, category: 'Công trình' },
  { key: 'nutgiao', name: 'Nút giao', file: 'nutgiao.geojson', count: 255, geomTypes: ['Point'], color: '#f97316', pointRadius: 7, opacity: 0.9, category: 'Công trình' },
  { key: 'coth', name: 'Hố nút', file: 'coth.geojson', count: 3611, geomTypes: ['Point'], color: '#8b5cf6', pointRadius: 3, opacity: 0.7, category: 'Công trình' },
  // Phụ trợ - line
  { key: 'coctieu', name: 'Cọc tiêu', file: 'coctieu.geojson', count: 657, geomTypes: ['LineString'], color: '#ef4444', lineWeight: 1.5, opacity: 0.8, category: 'Phụ trợ' },
  { key: 'holan', name: 'Hố lăn / Hố đấu', file: 'holan.geojson', count: 343, geomTypes: ['LineString'], color: '#06b6d4', lineWeight: 1.5, opacity: 0.8, category: 'Phụ trợ' },
  { key: 'ke', name: 'Kè', file: 'ke.geojson', count: 50, geomTypes: ['LineString'], color: '#84cc16', lineWeight: 2, opacity: 0.85, category: 'Phụ trợ' },
  { key: 'ranhdoc', name: 'Rãnh dọc', file: 'ranhdoc.geojson', count: 64, geomTypes: ['LineString'], color: '#0ea5e9', lineWeight: 1.5, opacity: 0.8, category: 'Phụ trợ' },
  // Phụ trợ - point
  { key: 'bienbao', name: 'Biển báo', file: 'bienbao.geojson', count: 4497, geomTypes: ['Point'], color: '#dc2626', pointRadius: 3, opacity: 0.75, category: 'Phụ trợ' },
  { key: 'cotkm', name: 'Cột Km', file: 'cotkm.geojson', count: 1104, geomTypes: ['Point'], color: '#64748b', pointRadius: 3, opacity: 0.75, category: 'Phụ trợ' },
  { key: 'cong', name: 'Cống', file: 'cong.geojson', count: 38, geomTypes: ['Point'], color: '#6366f1', pointRadius: 5, opacity: 0.85, category: 'Phụ trợ' },
  { key: 'hoga', name: 'Hố ga', file: 'hoga.geojson', count: 88, geomTypes: ['Point'], color: '#be185d', pointRadius: 4, opacity: 0.85, category: 'Phụ trợ' },
  { key: 'moclogioi', name: 'Mốc lộ giới', file: 'moclogioi.geojson', count: 426, geomTypes: ['Point'], color: '#92400e', pointRadius: 4, opacity: 0.8, category: 'Phụ trợ' },
  { key: 'dentinhieugiaothong', name: 'Đèn tín hiệu', file: 'dentinhieugiaothong.geojson', count: 74, geomTypes: ['Point'], color: '#fbbf24', pointRadius: 5, opacity: 0.9, category: 'Thiết bị' },
];

const CATEGORIES = [...new Set(LAYER_CONFIGS.map(l => l.category))];

interface FeatureProperties {
  [key: string]: any;
}

// ───────────────────────── Component ─────────────────────────
export default function GeoJsonMapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRefs = useRef<{ [key: string]: any }>({});
  const [visibleLayers, setVisibleLayers] = useState<Set<string>>(
    new Set(['tuyenduong', 'doanduong', 'cau', 'nutgiao', 'bienbao', 'dentinhieugiaothong'])
  );
  const [loadedLayers, setLoadedLayers] = useState<Set<string>>(new Set());
  const [loadingLayers, setLoadingLayers] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(CATEGORIES));
  const [selectedFeature, setSelectedFeature] = useState<{ layer: LayerConfig; props: FeatureProperties } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStats, setMapStats] = useState({ totalVisible: 0, totalFeatures: 0 });

  // ── Init Leaflet map ──
  useEffect(() => {
    let mounted = true;
    const initMap = async () => {
      if (!mapContainerRef.current || mapRef.current) return;
      const L = (await import('leaflet')).default;

      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      if (!mounted || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [21.0285, 105.8542],
        zoom: 12,
        zoomControl: false,
      });

      // Add zoom control to top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Base layers
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      });
      const Bản đồ vệ tinhLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Tiles © Esri', maxZoom: 19 }
      );

      osmLayer.addTo(map);

      // Base layer control
      L.control.layers(
        { 'Bản đồ thường': osmLayer, 'Ảnh vệ tinh': Bản đồ vệ tinhLayer },
        {},
        { position: 'topright', collapsed: false }
      ).addTo(map);

      mapRef.current = map;
      (mapRef as any).L = L;
    };

    initMap();
    return () => { mounted = false; };
  }, []);

  // ── Load & show/hide GeoJSON layers ──
  const loadLayer = useCallback(async (layerConfig: LayerConfig) => {
    if (!mapRef.current) return;
    const L = (await import('leaflet')).default;
    const key = layerConfig.key;

    if (layerRefs.current[key]) return; // already loaded

    setLoadingLayers(prev => new Set(prev).add(key));
    try {
      const res = await fetch(`/geojson/${layerConfig.file}`);
      const geoData = await res.json();

      const isLine = layerConfig.geomTypes.some(t => t.includes('LineString'));
      const isPoint = layerConfig.geomTypes.some(t => t === 'Point' || t === 'MultiPoint');

      const geoLayer = L.geoJSON(geoData, {
        style: isLine ? {
          color: layerConfig.color,
          weight: layerConfig.lineWeight || 2,
          opacity: layerConfig.opacity || 0.8,
        } : undefined,
        pointToLayer: isPoint ? (_feature: any, latlng: any) => {
          return L.circleMarker(latlng, {
            radius: layerConfig.pointRadius || 5,
            fillColor: layerConfig.color,
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: layerConfig.opacity || 0.8,
          });
        } : undefined,
        onEachFeature: (feature: any, leafletLayer: any) => {
          leafletLayer.on('click', () => {
            setSelectedFeature({ layer: layerConfig, props: feature.properties || {} });
          });
          // Tooltip with name if available
          const name = feature.properties?.TEN_DUONG || feature.properties?.TEN || feature.properties?.MA_DUONG || feature.properties?.MA;
          if (name) {
            leafletLayer.bindTooltip(String(name), { sticky: true, className: 'geojson-tooltip' });
          }
        },
      });

      layerRefs.current[key] = geoLayer;
      setLoadedLayers(prev => new Set(prev).add(key));
    } catch (err) {
      console.error('Failed to load', key, err);
    } finally {
      setLoadingLayers(prev => {
        const s = new Set(prev);
        s.delete(key);
        return s;
      });
    }
  }, []);

  // ── Sync visible layers to map ──
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    visibleLayers.forEach(async (key) => {
      const cfg = LAYER_CONFIGS.find(l => l.key === key);
      if (!cfg) return;
      if (!layerRefs.current[key]) {
        await loadLayer(cfg);
      }
      if (layerRefs.current[key] && !map.hasLayer(layerRefs.current[key])) {
        map.addLayer(layerRefs.current[key]);
      }
    });

    // Hide invisible layers
    Object.entries(layerRefs.current).forEach(([key, layer]) => {
      if (!visibleLayers.has(key) && map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    // Update stats
    let total = 0;
    visibleLayers.forEach(k => {
      const cfg = LAYER_CONFIGS.find(l => l.key === k);
      if (cfg) total += cfg.count;
    });
    setMapStats({ totalVisible: visibleLayers.size, totalFeatures: total });
  }, [visibleLayers, loadLayer]);

  const toggleLayer = (key: string) => {
    setVisibleLayers(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleCategory = (category: string) => {
    const catLayers = LAYER_CONFIGS.filter(l => l.category === category).map(l => l.key);
    const allVisible = catLayers.every(k => visibleLayers.has(k));
    setVisibleLayers(prev => {
      const next = new Set(prev);
      if (allVisible) catLayers.forEach(k => next.delete(k));
      else catLayers.forEach(k => next.add(k));
      return next;
    });
  };

  const fitAllVisible = () => {
    if (!mapRef.current) return;
    const bounds: [number, number][][] = [];
    visibleLayers.forEach(key => {
      const layer = layerRefs.current[key];
      if (layer && layer.getBounds) {
        try {
          const b = layer.getBounds();
          if (b.isValid()) bounds.push([[b.getSouth(), b.getWest()], [b.getNorth(), b.getEast()]]);
        } catch { }
      }
    });
    if (bounds.length > 0) {
      const allLats = bounds.flatMap(b => [b[0][0], b[1][0]]);
      const allLngs = bounds.flatMap(b => [b[0][1], b[1][1]]);
      mapRef.current.fitBounds([
        [Math.min(...allLats), Math.min(...allLngs)],
        [Math.max(...allLats), Math.max(...allLngs)],
      ]);
    }
  };

  const filteredLayers = LAYER_CONFIGS.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (n: number) => n.toLocaleString('vi-VN');

  // ── Render ──
  return (
    <div className={`relative flex h-full w-full bg-slate-950 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      style={{ minHeight: '600px' }}>

      {/* ── Map Container ── */}
      <div ref={mapContainerRef} className="flex-1 h-full" style={{ zIndex: 0 }} />

      {/* ── Top Bar (floating) ── */}
      <div className="absolute top-3 left-3 right-3 flex items-center gap-2 z-[1000] pointer-events-none">
        {/* Title badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-2 shadow-lg">
          <MapIcon className="size-4 text-blue-400" />
          <span className="text-white font-semibold text-sm">Bản đồ VEC</span>
        </div>

        {/* Stats */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl px-3 py-2 shadow-lg ml-2">
          <div className="text-center">
            <div className="text-blue-400 font-bold text-sm">{mapStats.totalVisible}</div>
            <div className="text-slate-500 text-[10px]">lớp bật</div>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div className="text-center">
            <div className="text-emerald-400 font-bold text-sm">{formatNumber(mapStats.totalFeatures)}</div>
            <div className="text-slate-500 text-[10px]">đối tượng</div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Action buttons */}
        <div className="pointer-events-auto flex gap-2">
          <button onClick={fitAllVisible}
            className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl px-3 py-2 text-slate-300 hover:text-white hover:border-blue-500 transition-all text-xs shadow-lg">
            <Filter className="size-3.5" /> Zoom tới dữ liệu
          </button>
          <button onClick={() => setIsPanelOpen(p => !p)}
            className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl px-3 py-2 text-slate-300 hover:text-white hover:border-blue-500 transition-all text-xs shadow-lg">
            <Layers className="size-3.5" /> {isPanelOpen ? 'Ẩn' : 'Lớp dữ liệu'}
          </button>
          <button onClick={() => setIsFullscreen(f => !f)}
            className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-2 text-slate-300 hover:text-white hover:border-blue-500 transition-all shadow-lg">
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>
      </div>

      {/* ── Layer Panel ── */}
      {isPanelOpen && (
        <div className="absolute top-16 left-3 bottom-3 w-72 z-[1000] flex flex-col bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Panel header */}
          <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <Layers className="size-4 text-blue-400" />
            <span className="text-white font-semibold text-sm flex-1">Lớp dữ liệu</span>
            <button onClick={() => setVisibleLayers(new Set(LAYER_CONFIGS.map(l => l.key)))}
              className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors">Bật tất cả</button>
            <button onClick={() => setVisibleLayers(new Set())}
              className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors ml-1">Tắt tất cả</button>
          </div>

          {/* Search */}
          <div className="px-3 py-2 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-500" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm lớp dữ liệu..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>

          {/* Layer list */}
          <div className="flex-1 overflow-y-auto py-2 space-y-1">
            {CATEGORIES.map(cat => {
              const catLayers = filteredLayers.filter(l => l.category === cat);
              if (catLayers.length === 0) return null;
              const isExpanded = expandedCategories.has(cat);
              const allVisible = catLayers.every(l => visibleLayers.has(l.key));
              const someVisible = catLayers.some(l => visibleLayers.has(l.key));

              return (
                <div key={cat}>
                  {/* Category header */}
                  <div className="flex items-center gap-2 px-3 py-1.5 cursor-pointer group"
                    onClick={() => setExpandedCategories(prev => {
                      const s = new Set(prev);
                      if (s.has(cat)) s.delete(cat); else s.add(cat);
                      return s;
                    })}>
                    <button onClick={e => { e.stopPropagation(); toggleCategory(cat); }}
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all flex-shrink-0
                        ${allVisible ? 'bg-blue-500 border-blue-500' : someVisible ? 'bg-blue-500/40 border-blue-500/60' : 'bg-transparent border-slate-600'}`}
                      style={{ fontSize: 8 }}>
                      {allVisible && <span className="text-white font-bold">✓</span>}
                      {someVisible && !allVisible && <span className="text-white font-bold">─</span>}
                    </button>
                    <span className="text-slate-300 text-xs font-semibold flex-1 group-hover:text-white transition-colors">{cat}</span>
                    <span className="text-slate-600 text-[10px]">{catLayers.length}</span>
                    {isExpanded ? <ChevronDown className="size-3 text-slate-500" /> : <ChevronRight className="size-3 text-slate-500" />}
                  </div>

                  {/* Layer items */}
                  {isExpanded && catLayers.map(layer => {
                    const isVisible = visibleLayers.has(layer.key);
                    const isLoading = loadingLayers.has(layer.key);
                    const isLoaded = loadedLayers.has(layer.key);

                    return (
                      <div key={layer.key}
                        onClick={() => toggleLayer(layer.key)}
                        className={`flex items-center gap-2 px-3 py-1.5 mx-1 rounded-lg cursor-pointer transition-all
                          ${isVisible ? 'bg-slate-800/60 hover:bg-slate-700/60' : 'hover:bg-slate-800/40'}`}>

                        {/* Color dot */}
                        <div className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-white/10"
                          style={{ backgroundColor: layer.color }} />

                        <span className={`flex-1 text-xs truncate transition-colors ${isVisible ? 'text-white' : 'text-slate-400'}`}>
                          {layer.name}
                        </span>

                        {/* Count badge */}
                        <span className="text-[9px] text-slate-600 flex-shrink-0">
                          {formatNumber(layer.count)}
                        </span>

                        {/* Status icon */}
                        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                          {isLoading ? (
                            <RefreshCw className="size-3 text-blue-400 animate-spin" />
                          ) : isVisible ? (
                            <Eye className="size-3 text-blue-400" />
                          ) : (
                            <EyeOff className="size-3 text-slate-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Panel footer - legend geom types */}
          <div className="px-3 py-2 border-t border-slate-700 flex items-center gap-3 text-[10px] text-slate-500">
            <div className="flex items-center gap-1">
              <div className="w-4 h-1 rounded bg-blue-400" /> Đường
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" /> Điểm
            </div>
          </div>
        </div>
      )}

      {/* ── Feature Info Panel ── */}
      {selectedFeature && (
        <div className="absolute bottom-3 right-3 w-80 z-[1000] bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-96">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700"
            style={{ background: `linear-gradient(135deg, ${selectedFeature.layer.color}22, transparent)` }}>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedFeature.layer.color }} />
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm truncate">{selectedFeature.layer.name}</div>
              <div className="text-slate-500 text-[10px]">{selectedFeature.layer.category}</div>
            </div>
            <button onClick={() => setSelectedFeature(null)}
              className="text-slate-500 hover:text-white transition-colors">
              <X className="size-4" />
            </button>
          </div>

          {/* Properties */}
          <div className="overflow-y-auto max-h-72 p-3 space-y-1">
            {Object.entries(selectedFeature.props).length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-4">Không có thuộc tính</p>
            ) : (
              Object.entries(selectedFeature.props)
                .filter(([, v]) => v !== null && v !== undefined && v !== '')
                .map(([k, v]) => (
                  <div key={k} className="flex gap-2 py-1 border-b border-slate-800/50">
                    <span className="text-slate-500 text-[10px] min-w-[100px] flex-shrink-0 pt-0.5">{k}</span>
                    <span className="text-slate-200 text-[11px] break-all">{String(v)}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* ── Loading overlay for initial layers ── */}
      {loadingLayers.size > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
          <RefreshCw className="size-3.5 text-blue-400 animate-spin" />
          <span className="text-slate-300 text-xs">Đang tải dữ liệu...</span>
        </div>
      )}

      {/* CSS for tooltip */}
      <style>{`
        .geojson-tooltip {
          background: #1e293b !important;
          border: 1px solid #334155 !important;
          color: #f1f5f9 !important;
          font-size: 11px !important;
          border-radius: 6px !important;
          padding: 3px 8px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important;
        }
        .geojson-tooltip::before { display: none !important; }
        .leaflet-control-layers {
          background: rgba(15,23,42,0.92) !important;
          border: 1px solid #334155 !important;
          border-radius: 12px !important;
          color: #cbd5e1 !important;
          backdrop-filter: blur(8px) !important;
        }
        .leaflet-control-layers-list { font-size: 12px !important; }
      `}</style>
    </div>
  );
}
