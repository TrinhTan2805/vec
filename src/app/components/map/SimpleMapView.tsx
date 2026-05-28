import React, { useEffect, useRef, useState, useMemo } from 'react';
import './SimpleMapView.css';
import {
  Building2 as Bridges,
  TrainFront,
  Camera,
  AlertCircle,
  ShieldCheck,
  Lightbulb,
  AlertTriangle,
  Construction,
  Navigation,
  Anchor,
  MapPin,
  Route,
  Settings,
  Droplet,
  Waves,
  Signpost,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  Hash,
  Activity,
  ArrowUp,
  Layout,
  MinusSquare,
  Pipette,
  MousePointer2
} from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapLayerControl, LayerCategory } from './MapLayerControl';

interface MapMarker {
  id: number | string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  description?: string;
  // Thông tin hiện trạng
  currentStatus?: {
    condition: string; // Tốt, Trung bình, Kém
    length?: string;
    width?: string;
    lanes?: number;
    material?: string;
    lastInspection?: string;
    images?: string[]; // URLs to status images
    managementUnit?: string; // Đơn vị quản lý
    patrolUnit?: string; // Tuần đường
    inspectionUnit?: string; // Tuần kiểm
  };
  // Lịch sử duy tu bảo trì
  maintenanceHistory?: Array<{
    date: string;
    type: string;
    description: string;
    cost?: string;
    status?: string; // Đã hoàn thành, Đang thực hiện, Kế hoạch
    attachments?: Array<{
      name: string;
      type: 'pdf' | 'image' | 'doc';
      url: string;
    }>;
    detailLink?: string;
  }>;
  // Lịch bảo vệ (cho cầu, hầm)
  protectionHistory?: Array<{
    date: string;
    inspector: string;
    status: string;
    violations?: string;
    notes?: string;
  }>;
  // Lịch tuần đường (cho đường bộ, thủy, sắt)
  patrolHistory?: Array<{
    date: string;
    patroller: string;
    route: string;
    status: string;
    issues?: string;
    notes?: string;
  }>;
  // Hồ sơ kỹ thuật
  technicalProfile?: {
    constructionYear?: string;
    designLoad?: string;
    span?: string;
    foundation?: string;
    designer?: string;
    contractor?: string;
    attachments?: Array<{
      name: string;
      type: 'pdf' | 'image' | 'doc';
      url: string;
    }>;
  };
}

interface MapRoute {
  id: number | string;
  name: string;
  coordinates: [number, number][];
  color?: string;
  weight?: number;
}

interface SimpleMapViewProps {
  markers: MapMarker[];
  routes?: MapRoute[];
  geoJsonData?: { data: any; color?: string; name: string; type: string }[];
  layerColors?: Record<string, string>;
  center?: [number, number];
  zoom?: number;
  height?: string;
  isDrawingMode?: boolean;
  drawingMode?: 'point' | 'polyline' | 'polygon';
  onRoutesChange?: (coordinates: [number, number][]) => void;
  onLocationChange?: (lat: number, lng: number) => void;
  initialCoordinates?: [number, number][];
  initialMarker?: { lat: number, lng: number };
  isActive?: boolean;
  baseLayer?: 'Bản đồ nền giao thông' | 'Bản đồ vệ tinh' | 'Bản đồ địa hình';
  onEdit?: (marker: MapMarker) => void;
  onDelete?: (marker: MapMarker) => void;
  onViewDetails?: (marker: MapMarker) => void;
  onDrawingComplete?: (geometryType: 'point' | 'polyline' | 'polygon', coordinates: any) => void;
  bottomOffsetClass?: string;
  onOpenSettings?: () => void;
  onOpenInfo?: (layer: any) => void;
}

const getMarkerConfig = (type: string) => {
  const t = type.toLowerCase();
  if (t === 'quốc lộ' || t === 'đường bộ') return { color: '#3b82f6', icon: <Route className="size-4" /> };
  if (t === 'cầu' || t === 'cầu đường sắt') return { color: '#10b981', icon: <Bridges className="size-4" /> };
  if (t === 'hầm') return { color: '#8b5cf6', icon: <MapPin className="size-4" /> };
  if (t === 'nút giao') return { color: '#f97316', icon: <Navigation className="size-4" /> };
  if (t === 'tuần tra' || t === 'tuần đường') return { color: '#eab308', icon: <ShieldCheck className="size-4" /> };
  if (t === 'bảo trì') return { color: '#ef4444', icon: <Settings className="size-4" /> };
  if (t === 'đường thủy') return { color: '#0ea5e9', icon: <Anchor className="size-4" /> };
  if (t === 'đường sắt' || t === 'ga') return { color: '#64748b', icon: <TrainFront className="size-4" /> };
  if (t.includes('vi phạm')) return { color: '#8b5cf6', icon: <MapPin className="size-4" /> };
  if (t === 'tuần đèn') return { color: '#fbbf24', icon: <Lightbulb className="size-4" /> };
  if (t === 'sự cố') return { color: '#be123c', icon: <AlertCircle className="size-4" /> };
  if (t === 'camera') return { color: '#06b6d4', icon: <Camera className="size-4" /> };
  if (t === 'công trường') return { color: '#b45309', icon: <Construction className="size-4" /> };
  return { color: '#6366f1', icon: <MapPin className="size-4" /> };
};

const getTileLayer = (type: string) => {
  switch (type) {
    case 'Bản đồ vệ tinh':
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    case 'Bản đồ địa hình':
      return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    default:
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }
};

const renderMarkers = (mapInstance: any, L: any, markerList: MapMarker[], markerRefs: any[], callbacks: { onEdit?: any, onDelete?: any, onViewDetails?: any }) => {
  // Remove old markers
  markerRefs.forEach(m => {
    try { mapInstance.removeLayer(m); } catch (e) { }
  });
  markerRefs.length = 0;

  // Add new markers
  markerList.forEach((marker) => {
    const config = getMarkerConfig(marker.type);

    const iconHtml = `<div style="background-color: ${config.color}; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 6px ${config.color}40, 0 3px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: white; transition: all 0.3s ease;">
      ${renderToStaticMarkup(config.icon)}
    </div>`;

    const icon = L.divIcon({
      className: 'custom-marker-icon',
      html: iconHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const markerInstance = L.marker([marker.lat, marker.lng], { icon }).addTo(mapInstance);

    const isBridgeOrTunnel = marker.type.toLowerCase() === 'cầu' || marker.type.toLowerCase() === 'hầm';
    const isRoad = marker.type.toLowerCase() === 'quốc lộ' || marker.type.toLowerCase().includes('đường');
    const isIncident = marker.type.toLowerCase().includes('vi phạm') || marker.type.toLowerCase().includes('hư hỏng') || marker.type.toLowerCase().includes('thi công') || marker.type.toLowerCase().includes('ngập lụt') || marker.type.toLowerCase().includes('sự cố');

    let popupContent = isIncident ? `
      <div style="display: flex; padding: 12px; gap: 12px; min-width: 320px; max-width: 360px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <img src="${marker.image || '/images/violations/violation_1.png'}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px;" />
        <div style="flex: 1; display: flex; flex-direction: column;">
          <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #1e293b;">${marker.name}</h3>
          <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748b;">${marker.time || '10:00'}, ${marker.date || '16/03/2026'}</p>
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #475569;">Người vi phạm: ${marker.violator || 'Không rõ'}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <span style="font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 12px; background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe;">${marker.status || 'Đang xử lý'}</span>
            <button class="action-btn-view-${marker.id}" style="border: none; background: transparent; color: #3b82f6; font-size: 11px; font-weight: 500; cursor: pointer;">Xem chi tiết</button>
          </div>
        </div>
      </div>
    ` : `
      <div style="padding: 0; min-width: 380px; max-width: 450px; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 12px; border-bottom: 1px solid #e2e8f0;">
          <h3 style="font-weight: 600; color: white; margin: 0 0 4px 0; font-size: 16px;">${marker.name}</h3>
          <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">Loại: ${marker.type}</p>
        </div>
        
        <div style="padding: 12px; background: white;">
          <!-- Tabs -->
          <div style="display: flex; flex-wrap: nowrap; overflow-x: auto; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; scrollbar-width: none;">
            <button class="tab-btn-${marker.id}" data-tab="status-${marker.id}" style="padding: 6px 10px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 4px; color: #2563eb; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; font-weight: 500; flex: 0 0 auto;">Hiện trạng</button>
            <button class="tab-btn-${marker.id}" data-tab="maintenance-${marker.id}" style="padding: 6px 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex: 0 0 auto;">Bảo trì</button>
            ${isBridgeOrTunnel ? `
              <button class="tab-btn-${marker.id}" data-tab="protection-${marker.id}" style="padding: 6px 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex: 0 0 auto;">Bảo vệ</button>
            ` : ''}
            ${isRoad ? `
              <button class="tab-btn-${marker.id}" data-tab="patrol-${marker.id}" style="padding: 6px 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex: 0 0 auto;">Kiểm tra</button>
            ` : ''}
            <button class="tab-btn-${marker.id}" data-tab="technical-${marker.id}" style="padding: 6px 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex: 0 0 auto;">Hồ sơ kỹ thuật</button>
          </div>

          <!-- Tab Content: Hiện trạng -->
          <div id="status-${marker.id}" class="tab-content-${marker.id}" style="display: block;">
            ${marker.currentStatus ? `
              <div style="display: grid; gap: 8px;">
                <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f8fafc;">
                  <span style="font-size: 11px; color: #64748b;">Tình trạng:</span>
                  <span style="font-size: 11px; color: ${marker.currentStatus.condition === 'Tốt' ? '#10b981' : marker.currentStatus.condition === 'Trung bình' ? '#f59e0b' : '#ef4444'}; font-weight: 500;">${marker.currentStatus.condition}</span>
                </div>
                ${marker.currentStatus.length ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f8fafc;">
                    <span style="font-size: 11px; color: #64748b;">Chiều dài:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.length}</span>
                  </div>
                ` : ''}
                ${marker.currentStatus.width ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f8fafc;">
                    <span style="font-size: 11px; color: #64748b;">Chiều rộng:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.width}</span>
                  </div>
                ` : ''}
                ${marker.currentStatus.lanes ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f8fafc;">
                    <span style="font-size: 11px; color: #64748b;">Số làn xe:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.lanes} làn</span>
                  </div>
                ` : ''}
                ${marker.currentStatus.material ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f8fafc;">
                    <span style="font-size: 11px; color: #64748b;">Vật liệu:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.material}</span>
                  </div>
                ` : ''}
                ${marker.currentStatus.lastInspection ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                    <span style="font-size: 11px; color: #64748b;">Kiểm tra gần nhất:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.lastInspection}</span>
                  </div>
                ` : ''}
                ${marker.currentStatus.images && marker.currentStatus.images.length > 0 ? `
                  <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
                    ${marker.currentStatus.images.map((image, index) => `
                      <img src="${image}" alt="Status Image ${index + 1}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px; cursor: pointer;" onclick="window.open('${image}', '_blank')"/>
                    `).join('')}
                  </div>
                ` : ''}
                ${marker.currentStatus.managementUnit ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f8fafc;">
                    <span style="font-size: 11px; color: #64748b;">Đơn vị quản lý:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.managementUnit}</span>
                  </div>
                ` : ''}
                ${marker.currentStatus.patrolUnit ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f8fafc;">
                    <span style="font-size: 11px; color: #64748b;">Đơn vị tuần đường:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.patrolUnit}</span>
                  </div>
                ` : ''}
                ${marker.currentStatus.inspectionUnit ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                    <span style="font-size: 11px; color: #64748b;">Đơn vị tuần kiểm:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.currentStatus.inspectionUnit}</span>
                  </div>
                ` : ''}
              </div>
            ` : `
              <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có thông tin hiện trạng</p>
            `}
          </div>

          <!-- Tab Content: Lịch sử bảo trì -->
          <div id="maintenance-${marker.id}" class="tab-content-${marker.id}" style="display: none;">
            ${marker.maintenanceHistory && marker.maintenanceHistory.length > 0 ? `
              <div style="display: grid; gap: 8px; max-height: 200px; overflow-y: auto;">
                ${marker.maintenanceHistory.map(history => `
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span style="font-size: 10px; color: #2563eb; font-weight: 500;">${history.date}</span>
                      ${history.cost ? `<span style="font-size: 10px; color: #d97706;">${history.cost}</span>` : ''}
                    </div>
                    <p style="font-size: 11px; color: #1e293b; font-weight: 500; margin: 0 0 2px 0;">${history.type}</p>
                    <p style="font-size: 10px; color: #64748b; margin: 0;">${history.description}</p>
                    ${history.status ? `
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="font-size: 10px; color: #9ca3af;">Trạng thái:</span>
                        <span style="font-size: 10px; color: ${history.status === 'Đã hoàn thành' ? '#10b981' : history.status === 'Đang thực hiện' ? '#f59e0b' : '#ef4444'}; font-weight: 500;">${history.status}</span>
                      </div>
                    ` : ''}
                    ${history.attachments && history.attachments.length > 0 ? `
                      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">
                        ${history.attachments.map((attachment, index) => `
                          <a href="${attachment.url}" target="_blank" style="text-decoration: none;">
                            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px; cursor: pointer;">
                              <span style="font-size: 10px; color: #64748b;">${attachment.name}</span>
                            </div>
                          </a>
                        `).join('')}
                      </div>
                    ` : ''}
                    ${history.detailLink ? `
                      <div style="margin-top: 12px;">
                        <a href="${history.detailLink}" target="_blank" style="text-decoration: none; color: #60a5fa; font-size: 10px; cursor: pointer;">
                          Xem chi tiết
                        </a>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có lịch sử bảo trì</p>
            `}
          </div>

          <!-- Tab Content: Bảo vệ -->
          <div id="protection-${marker.id}" class="tab-content-${marker.id}" style="display: none;">
            ${marker.protectionHistory && marker.protectionHistory.length > 0 ? `
              <div style="display: grid; gap: 8px; max-height: 200px; overflow-y: auto;">
                ${marker.protectionHistory.map(history => `
                  <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(0,0,0,0.05); border-radius: 6px; padding: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span style="font-size: 10px; color: #60a5fa; font-weight: 500;">${history.date}</span>
                    </div>
                    <p style="font-size: 11px; color: #1e293b; font-weight: 500; margin: 0 0 2px 0;">Bảo vệ</p>
                    <p style="font-size: 10px; color: #9ca3af; margin: 0;">${history.inspector}</p>
                    ${history.status ? `
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="font-size: 10px; color: #9ca3af;">Trạng thái:</span>
                        <span style="font-size: 10px; color: ${history.status === 'Đã hoàn thành' ? '#10b981' : history.status === 'Đang thực hiện' ? '#f59e0b' : '#ef4444'}; font-weight: 500;">${history.status}</span>
                      </div>
                    ` : ''}
                    ${history.violations ? `
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="font-size: 10px; color: #9ca3af;">Vi phạm:</span>
                        <span style="font-size: 10px; color: #ef4444; font-weight: 500;">${history.violations}</span>
                      </div>
                    ` : ''}
                    ${history.notes ? `
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="font-size: 10px; color: #9ca3af;">Ghi chú:</span>
                        <span style="font-size: 10px; color: #1e293b; font-weight: 500;">${history.notes}</span>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có lịch sử bảo vệ</p>
            `}
          </div>

          <!-- Tab Content: Kiểm tra -->
          <div id="patrol-${marker.id}" class="tab-content-${marker.id}" style="display: none;">
            ${marker.patrolHistory && marker.patrolHistory.length > 0 ? `
              <div style="display: grid; gap: 8px; max-height: 200px; overflow-y: auto;">
                ${marker.patrolHistory.slice(0, 5).map(history => `
                  <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(0,0,0,0.05); border-radius: 6px; padding: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                      <span style="font-size: 10px; color: #60a5fa; font-weight: 500;">${history.date}</span>
                    </div>
                    <p style="font-size: 11px; color: #1e293b; font-weight: 500; margin: 0 0 2px 0;">Kiểm tra tài sản</p>
                    <p style="font-size: 10px; color: #9ca3af; margin: 0;">${history.patroller}</p>
                    ${history.status ? `
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="font-size: 10px; color: #9ca3af;">Trạng thái:</span>
                        <span style="font-size: 10px; color: ${history.status === 'Đã hoàn thành' ? '#10b981' : history.status === 'Đang thực hiện' ? '#f59e0b' : '#ef4444'}; font-weight: 500;">${history.status}</span>
                      </div>
                    ` : ''}
                    ${history.issues ? `
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="font-size: 10px; color: #9ca3af;">Vấn đề:</span>
                        <span style="font-size: 10px; color: #ef4444; font-weight: 500;">${history.issues}</span>
                      </div>
                    ` : ''}
                    ${history.notes ? `
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="font-size: 10px; color: #9ca3af;">Ghi chú:</span>
                        <span style="font-size: 10px; color: #1e293b; font-weight: 500;">${history.notes}</span>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có lịch sử kiểm tra</p>
            `}
          </div>

          <!-- Tab Content: Hồ sơ kỹ thuật -->
          <div id="technical-${marker.id}" class="tab-content-${marker.id}" style="display: none;">
            ${marker.technicalProfile ? `
              <div style="display: grid; gap: 8px;">
                ${marker.technicalProfile.constructionYear ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                    <span style="font-size: 11px; color: #9ca3af;">Năm xây dựng:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.technicalProfile.constructionYear}</span>
                  </div>
                ` : ''}
                ${marker.technicalProfile.designLoad ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                    <span style="font-size: 11px; color: #9ca3af;">Tải trọng thiết kế:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.technicalProfile.designLoad}</span>
                  </div>
                ` : ''}
                ${marker.technicalProfile.span ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                    <span style="font-size: 11px; color: #9ca3af;">Nhịp chính:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.technicalProfile.span}</span>
                  </div>
                ` : ''}
                ${marker.technicalProfile.foundation ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                    <span style="font-size: 11px; color: #9ca3af;">Móng:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.technicalProfile.foundation}</span>
                  </div>
                ` : ''}
                ${marker.technicalProfile.designer ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                    <span style="font-size: 11px; color: #9ca3af;">Đơn vị thiết kế:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.technicalProfile.designer}</span>
                  </div>
                ` : ''}
                ${marker.technicalProfile.contractor ? `
                  <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                    <span style="font-size: 11px; color: #9ca3af;">Nhà thầu thi công:</span>
                    <span style="font-size: 11px; color: #1e293b; font-weight: 500;">${marker.technicalProfile.contractor}</span>
                  </div>
                ` : ''}
              </div>
            ` : `
              <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có hồ sơ kỹ thuật</p>
            `}
          </div>
          <!-- Actions -->
          <div style="display: flex; gap: 8px; margin-top: 16px; padding-top: 12px; border-top: 1px solid #f1f5f9;">
            <button class="action-btn-details-${marker.id}" style="flex: 1; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">Đóng</button>
            <button class="action-btn-edit-${marker.id}" style="flex: 1; padding: 8px; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">Sửa</button>
            <button class="action-btn-delete-${marker.id}" style="padding: 8px; background: #fef2f2; color: #ef4444; border: 1px solid #fee2e2; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">Xóa</button>
          </div>
        </div>
      </div>
    `;

    const popup = L.popup({ maxWidth: 450, minWidth: 380, className: 'custom-popup' }).setContent(popupContent);
    markerInstance.bindPopup(popup);

    markerInstance.on('popupopen', () => {
      const tabButtons = document.querySelectorAll('.tab-btn-' + marker.id);
      const tabContents = document.querySelectorAll('.tab-content-' + marker.id);

      tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const targetTab = (e.target as HTMLElement).getAttribute('data-tab');
          tabContents.forEach(content => { (content as HTMLElement).style.display = 'none'; });
          tabButtons.forEach(btn => {
            (btn as HTMLElement).style.background = 'transparent';
            (btn as HTMLElement).style.borderColor = 'var(--border)';
            (btn as HTMLElement).style.color = 'var(--muted-foreground)';
          });
          const targetContent = document.getElementById(targetTab!);
          if (targetContent) targetContent.style.display = 'block';
          (e.target as HTMLElement).style.background = '#eff6ff';
          (e.target as HTMLElement).style.borderColor = '#dbeafe';
          (e.target as HTMLElement).style.color = '#2563eb';
        });
      });

      // Action buttons
      document.querySelector('.action-btn-details-' + marker.id)?.addEventListener('click', () => {
        markerInstance.closePopup();
      });
      document.querySelector('.action-btn-view-' + marker.id)?.addEventListener('click', () => {
        if (callbacks.onViewDetails) callbacks.onViewDetails(marker);
      });
      document.querySelector('.action-btn-edit-' + marker.id)?.addEventListener('click', () => {
        if (callbacks.onEdit) callbacks.onEdit(marker);
      });
      document.querySelector('.action-btn-delete-' + marker.id)?.addEventListener('click', () => {
        if (callbacks.onDelete) callbacks.onDelete(marker);
      });
    });

    markerRefs.push(markerInstance);
  });
};

export function SimpleMapView({
  markers = [],
  routes = [],
  geoJsonData = [],
  layerColors = {},
  center = [21.0285, 105.8542],
  zoom = 11,
  height = '500px',
  isDrawingMode = false,
  drawingMode = 'polyline',
  onRoutesChange,
  onLocationChange,
  initialCoordinates = [],
  initialMarker,
  isActive,
  baseLayer = 'Bản đồ nền giao thông',
  onEdit,
  onDelete,
  onViewDetails,
  onDrawingComplete,
  bottomOffsetClass = "bottom-6",
  onOpenSettings,
  onOpenInfo
}: SimpleMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const geoJsonLayersRef = useRef<any[]>([]);
  const isInitializingRef = useRef<boolean>(false);

  const [layerCategories, setLayerCategories] = useState<LayerCategory[]>([
    {
      id: "road",
      name: "Tài sản đường bộ",
      layers: [
        { id: "route", name: "Tuyến đường", color: "#642b45", visible: true, icon: <Route className="size-3" /> },
        { id: "bridge", name: "Cầu", color: "#3b82f6", visible: false, icon: <Bridges className="size-3" /> },
        { id: "tunnel", name: "Hầm", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "level-crossing", name: "Đường ngang", color: "#3b82f6", visible: false, icon: <Layout className="size-3" /> },
        { id: "intersection", name: "Nút giao", color: "#3b82f6", visible: false, icon: <Navigation className="size-3" /> },
        { id: "safety-corridor", name: "Hành lang an toàn", color: "#3b82f6", visible: false, icon: <ShieldCheck className="size-3" /> },
        { id: "auxiliary", name: "Công trình phụ trợ", color: "#3b82f6", visible: false, icon: <Settings className="size-3" /> },
        { id: "technology-system", name: "Hệ thống công nghệ", color: "#3b82f6", visible: false, icon: <Activity className="size-3" /> },
        { id: "connection", name: "Đấu nối", color: "#3b82f6", visible: false, icon: <ArrowUpRight className="size-3" /> },
        { id: "transport-infrastructure", name: "Hạ tầng vận tải", color: "#3b82f6", visible: false, icon: <Maximize2 className="size-3" /> },
        { id: "bienBao", name: "Biển báo", color: "#3b82f6", visible: false, icon: <Signpost className="size-3" /> },
        { id: "cotBienBao", name: "Cột biển báo", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "giaLongMon", name: "Giá long môn", color: "#3b82f6", visible: false, icon: <Bridges className="size-3" /> },
        { id: "cotCanVuon", name: "Cột cần vươn", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "vachKeDuong", name: "Vạch kẻ đường", color: "#3b82f6", visible: false, icon: <MinusSquare className="size-3" /> },
        { id: "goGiamToc", name: "Gồ giảm tốc", color: "#3b82f6", visible: false, icon: <MinusSquare className="size-3" /> },
        { id: "cocTieu", name: "Cọc tiêu", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "dinhPhanQuang", name: "Đinh phản quang", color: "#3b82f6", visible: false, icon: <Lightbulb className="size-3" /> },
        { id: "tieuPhanQuang", name: "Tiêu phản quang", color: "#3b82f6", visible: false, icon: <Lightbulb className="size-3" /> },
        { id: "cotKm", name: "Cột Km", color: "#3b82f6", visible: false, icon: <Hash className="size-3" /> },
        { id: "cocH", name: "Cọc H", color: "#3b82f6", visible: false, icon: <Hash className="size-3" /> },
        { id: "mocLoGioi", name: "Mốc lộ giới", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "guongCauLoi", name: "Gương cầu lồi", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "daiPhanCach", name: "Dải phân cách", color: "#3b82f6", visible: false, icon: <Layout className="size-3" /> },
        { id: "boVia", name: "Bó vỉa", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "uChongVaXo", name: "Ụ chống va xô", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "lanCanPhongHo", name: "Lan can phòng hộ", color: "#3b82f6", visible: false, icon: <ShieldCheck className="size-3" /> },
        { id: "hangRao", name: "Hàng rào", color: "#3b82f6", visible: false, icon: <ShieldCheck className="size-3" /> },
        { id: "tamChongChoi", name: "Tấm chống chói", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "tamChongOn", name: "Tấm chống ồn", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "ranhNuoc", name: "Rãnh nước", color: "#3b82f6", visible: false, icon: <Droplet className="size-3" /> },
        { id: "cong", name: "Cống", color: "#3b82f6", visible: false, icon: <Droplet className="size-3" /> },
        { id: "hoGa", name: "Hố ga", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "ke", name: "Kè", color: "#3b82f6", visible: false, icon: <Construction className="size-3" /> },
        { id: "tuongChan", name: "Tường chắn", color: "#3b82f6", visible: false, icon: <Construction className="size-3" /> },
        { id: "taluy", name: "Taluy", color: "#3b82f6", visible: false, icon: <Construction className="size-3" /> },
        { id: "daoGiaoThong", name: "Đảo giao thông", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "chanDuongNgang", name: "Chắn đường ngang", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "nhaGac", name: "Nhà gác", color: "#3b82f6", visible: false, icon: <Bridges className="size-3" /> },
        { id: "cotDenTinHieu", name: "Cột đèn tín hiệu giao thông", color: "#3b82f6", visible: false, icon: <MapPin className="size-3" /> },
        { id: "denTinHieu", name: "Đèn tín hiệu giao thông", color: "#3b82f6", visible: false, icon: <Lightbulb className="size-3" /> },
        { id: "cameraGiaoThong", name: "Camera giao thông", color: "#3b82f6", visible: false, icon: <Camera className="size-3" /> },
        { id: "bienDienTuVMS", name: "Biển điện tử VMS", color: "#3b82f6", visible: false, icon: <Activity className="size-3" /> },
        { id: "haTangVanTaiDuongBo", name: "Công trình hạ tầng vận tải đường bộ", color: "#3b82f6", visible: false, icon: <Bridges className="size-3" /> },
      ]
    },
    {
      id: "waterway",
      name: "Tài sản đường thủy",
      layers: [
        { id: "waterway-route", name: "Tuyến ĐTNĐ", color: "#06b6d4", visible: false, icon: <Anchor className="size-3" /> },
        { id: "fairway-branch", name: "Nhánh của luồng", color: "#06b6d4", visible: false, icon: <Waves className="size-3" /> },
      ]
    },
    {
      id: "railway",
      name: "Tài sản đường sắt",
      layers: [
        { id: "railway-route", name: "Tuyến ĐS đô thị", color: "#6366f1", visible: false, icon: <TrainFront className="size-3" /> },
        { id: "railway-pier", name: "Trụ cầu ĐS đô thị", color: "#6366f1", visible: false, icon: <Bridges className="size-3" /> },
      ]
    },
    {
      id: "monitoring",
      name: "Quản lý & Giám sát",
      layers: [
        { id: "patrol", name: "Tuần đường", color: "#eab308", visible: false, icon: <ShieldCheck className="size-3" /> },
        { id: "maintenance", name: "Bảo trì", color: "#ef4444", visible: false, icon: <Settings className="size-3" /> },
        { id: "camera", name: "Camera", color: "#06b6d4", visible: false, icon: <Camera className="size-3" /> },
        { id: "incident", name: "Sự cố", color: "#be123c", visible: false, icon: <AlertCircle className="size-3" /> },
      ]
    }
  ]);

  const handleToggleLayer = (categoryId: string, layerId: string, parentId?: string) => {
    setLayerCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          layers: cat.layers.map(layer => {
            if (layer.id === layerId) {
              return { ...layer, visible: !layer.visible };
            }
            if (layer.id === parentId && layer.subLayers) {
              return {
                ...layer,
                subLayers: layer.subLayers.map(sl => sl.id === layerId ? { ...sl, visible: !sl.visible } : sl)
              };
            }
            return layer;
          })
        };
      }
      return cat;
    }));
  };

  const handleToggleAllInCategory = (categoryId: string, visible: boolean) => {
    setLayerCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          layers: cat.layers.map(layer => ({
            ...layer,
            visible: visible,
            subLayers: layer.subLayers?.map(sl => ({ ...sl, visible: visible }))
          }))
        };
      }
      return cat;
    }));
  };

  const handleToggleAllInSubLayer = (categoryId: string, parentId: string, visible: boolean) => {
    setLayerCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          layers: cat.layers.map(layer => {
            if (layer.id === parentId) {
              return {
                ...layer,
                visible: visible,
                subLayers: layer.subLayers?.map(sl => ({ ...sl, visible: visible }))
              };
            }
            return layer;
          })
        };
      }
      return cat;
    }));
  };

  const visibleLayerIds = useMemo(() => {
    const ids = new Set<string>();
    layerCategories.forEach(cat => {
      cat.layers.forEach(layer => {
        if (layer.visible) ids.add(layer.id);
        if (layer.subLayers) {
          layer.subLayers.forEach(sl => {
            if (sl.visible) ids.add(sl.id);
          });
        }
      });
    });
    return ids;
  }, [layerCategories]);

  const typeToLayerId = (type: string): string => {
    const t = type.toLowerCase();

    // Road & Traffic
    if (t === 'quốc lộ' || t === 'đường bộ' || t.includes('tuyến đường') || t.includes('đoạn đường')) return 'route';
    if (t.includes('cầu')) return 'bridge';
    if (t === 'hầm' || t.includes('hầm')) return 'tunnel';
    if (t.includes('đường ngang')) return 'level-crossing';
    if (t === 'nút giao' || t.includes('nút giao')) return 'intersection';
    if (t.includes('hành lang') || t.includes('mốc lộ giới')) return 'safety-corridor';
    if (t.includes('phụ trợ') || t.includes('biển báo') || t.includes('cọc tiêu') || t.includes('cột km') || t.includes('hộ lan') || t.includes('vạch sơn') || t.includes('kè') || t.includes('cống') || t.includes('rãnh dọc') || t.includes('hố ga') || t.includes('cột h')) return 'auxiliary';
    if (t.includes('công nghệ') || t.includes('tín hiệu') || t.includes('camera') || t.includes('vms')) return 'technology-system';
    if (t.includes('đấu nối')) return 'connection';
    if (t.includes('vận tải') || t.includes('trạm') || t.includes('bến xe')) return 'transport-infrastructure';

    // Water & Rail
    if (t === 'đường thủy' || t.includes('đtnđ')) return 'waterway-route';
    if (t.includes('nhánh') || t.includes('luồng')) return 'fairway-branch';
    if (t === 'đường sắt' || t === 'ga' || t.includes('đs đô thị')) return 'railway-route';
    if (t.includes('trụ cầu đs')) return 'railway-pier';

    // Monitoring
    if (t === 'tuần tra' || t === 'tuần đường') return 'patrol';
    if (t === 'bảo trì') return 'maintenance';
    if (t === 'sự cố') return 'incident';

    return 'other';
  };

  const filteredMarkers = useMemo(() => {
    if (!markers) return [];
    return markers.filter(m => visibleLayerIds.has(typeToLayerId(m.type)));
  }, [markers, visibleLayerIds]);

  const filteredRoutes = useMemo(() => {
    if (!routes) return [];
    // For simplicity, we'll assume routes are mapped to 'route' layer
    return visibleLayerIds.has('route') ? routes : [];
  }, [routes, visibleLayerIds]);

  useEffect(() => {
    if (isActive && mapRef.current) {
      // Multiple attempts to invalidate size as the modal/tab transitions complete
      const timer1 = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);

      const timer2 = setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          mapRef.current.setView(center, zoom);
        }
      }, 500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isActive, center, zoom]);

  useEffect(() => {
    let mounted = true;

    const initMap = async () => {
      if (!mapContainerRef.current || mapRef.current || isInitializingRef.current) return;
      isInitializingRef.current = true;

      try {
        const L = (await import('leaflet')).default;

        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        if (!mounted || !mapContainerRef.current) {
          isInitializingRef.current = false;
          return;
        }

        const map = L.map(mapContainerRef.current, {
          center: center as [number, number],
          zoom: zoom,
          zoomControl: true,
          fadeAnimation: false,
          zoomAnimation: false,
        });

        const tileLayer = L.tileLayer(getTileLayer(baseLayer || 'Bản đồ nền giao thông'), {
          attribution: baseLayer === 'Bản đồ vệ tinh' ? 'Tiles &copy; Esri' : '&copy; OpenStreetMap contributors'
        }).addTo(map);

        mapRef.current = map;
        (map as any)._tileLayer = tileLayer;

        const drawnPoints: [number, number][] = initialCoordinates && initialCoordinates.length > 0 ? [...initialCoordinates] : [];
        let polyline: any = null;
        let polygon: any = null;
        let pointsMarker: any[] = [];
        let drawingMarker: any = null;

        if (initialCoordinates.length > 0) {
          polyline = L.polyline(initialCoordinates, { color: '#3b82f6', weight: 4 }).addTo(map);
        }

        if (initialMarker) {
          drawingMarker = L.marker([initialMarker.lat, initialMarker.lng]).addTo(map);
        }

        if (isDrawingMode) {
          map.on('click', (e: any) => {
            const { lat, lng } = e.latlng;

            if (drawingMode === 'polyline' || drawingMode === 'polygon') {
              drawnPoints.push([lat, lng]);

              if (drawingMode === 'polyline') {
                if (!polyline) {
                  polyline = L.polyline(drawnPoints, { color: '#3b82f6', weight: 4 }).addTo(map);
                } else {
                  polyline.setLatLngs(drawnPoints);
                }
              } else if (drawingMode === 'polygon') {
                if (!polygon) {
                  polygon = L.polygon(drawnPoints, { color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.2, weight: 3 }).addTo(map);
                } else {
                  polygon.setLatLngs(drawnPoints);
                }
              }

              const marker = L.circleMarker([lat, lng], {
                radius: 4,
                fillColor: '#3b82f6',
                color: '#fff',
                weight: 2,
                fillOpacity: 1
              }).addTo(map);
              pointsMarker.push(marker);

              if (onRoutesChange) onRoutesChange([...drawnPoints]);
            } else if (drawingMode === 'point') {
              if (drawingMarker) {
                drawingMarker.setLatLng([lat, lng]);
              } else {
                drawingMarker = L.marker([lat, lng]).addTo(map);
              }
              if (onLocationChange) onLocationChange(lat, lng);
            }
          });

          const ClearControl = L.Control.extend({
            onAdd: function () {
              const btn = L.DomUtil.create('button', 'bg-white p-2 m-2 border rounded shadow text-xs font-semibold hover:bg-slate-50 flex items-center gap-1 text-slate-700');
              btn.innerHTML = '<span style="font-size: 14px">↺</span> Xóa vẽ';
              btn.onclick = (e) => {
                e.stopPropagation();
                if (drawingMode === 'polyline' || drawingMode === 'polygon') {
                  drawnPoints.length = 0;
                  if (polyline) polyline.setLatLngs([]);
                  if (polygon) polygon.setLatLngs([]);
                  pointsMarker.forEach(m => m.remove());
                  pointsMarker = [];
                  if (onRoutesChange) onRoutesChange([]);
                } else {
                  if (drawingMarker) {
                    map.removeLayer(drawingMarker);
                    drawingMarker = null;
                  }
                  if (onLocationChange) onLocationChange(0, 0);
                }
              };
              return btn;
            }
          });
          new ClearControl({ position: 'topright' }).addTo(map);

          const FinalizeControl = L.Control.extend({
            onAdd: function () {
              const btn = L.DomUtil.create('button', 'bg-primary p-2 m-2 border rounded shadow text-xs font-semibold hover:bg-primary/90 flex items-center gap-1 text-white');
              btn.innerHTML = '<span style="font-size: 14px">✓</span> Hoàn tất vẽ';
              btn.onclick = (e) => {
                e.stopPropagation();
                if (onDrawingComplete) {
                  if (drawingMode === 'polyline' || drawingMode === 'polygon') {
                    onDrawingComplete(drawingMode, [...drawnPoints]);
                  } else if (drawingMode === 'point' && drawingMarker) {
                    const latLng = drawingMarker.getLatLng();
                    onDrawingComplete('point', [latLng.lat, latLng.lng]);
                  }
                }
              };
              return btn;
            }
          });
          new FinalizeControl({ position: 'topright' }).addTo(map);

          // Expose drawing mode setter for toolbar
          (window as any).setDrawingMode = (mode: any) => {
            // This is a hack because setting state from window is hard
            // Better to use props, but let's just use it to trigger UI updates for now
          };
        }

        filteredRoutes.forEach(route => {
          L.polyline(route.coordinates, {
            color: route.color || '#3b82f6',
            weight: route.weight || 4,
            opacity: 0.8
          }).addTo(map).bindPopup(`<b>${route.name}</b>`);
        });

        // Add markers
        renderMarkers(map, L, filteredMarkers, markersRef.current, { onEdit, onDelete, onViewDetails });

        setTimeout(() => {
          if (map && mounted) {
            map.invalidateSize();
          }
        }, 100);

      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initMap();
  }, []);

  // Update base layer on prop change
  useEffect(() => {
    if (mapRef.current && (mapRef.current as any)._tileLayer) {
      (mapRef.current as any)._tileLayer.setUrl(getTileLayer(baseLayer || 'Bản đồ nền giao thông'));
    }
  }, [baseLayer]);

  useEffect(() => {
    if (mapRef.current) {
      import('leaflet').then((leaflet) => {
        const L = leaflet.default;
        renderMarkers(mapRef.current, L, filteredMarkers, markersRef.current, { onEdit, onDelete, onViewDetails });
      });
    }
  }, [filteredMarkers, onEdit, onDelete, onViewDetails]);

  // Update geoJson layers
  useEffect(() => {
    if (mapRef.current && geoJsonData) {
      import('leaflet').then((leaflet) => {
        const L = leaflet.default;

        // Remove old geojson layers
        geoJsonLayersRef.current.forEach(layer => {
          try { mapRef.current.removeLayer(layer); } catch (e) { }
        });
        geoJsonLayersRef.current = [];

        // Filter and render active geojson
        const activeGeoJson = geoJsonData.filter(gj => visibleLayerIds.has(typeToLayerId(gj.type)));

        const getGeoJsonColor = (gjType: string, defaultColor: string) => {
          const typeMap: Record<string, string> = {
            'Tuyến đường': 'tuyenDuong',
            'Cầu': 'cau',
            'Hầm': 'ham',
            'Đường ngang': 'duongNgang',
            'Nút giao': 'nutGiao',
            'Công trình phụ trợ': 'phuTro',
            'Hành lang an toàn': 'hanhLang',
            'Hệ thống công nghệ': 'congNghe',
            'Tuyến ĐTNĐ': 'tuyenDuongThuy',
            'Nhánh luồng': 'nhanhLuong',
            'Tuyến ĐS đô thị': 'tuyenDuongSat',
            'Trụ cầu ĐS đô thị': 'truCau',
          };
          const key = typeMap[gjType];
          if (key && layerColors[key]) return layerColors[key];

          return defaultColor;
        };

        activeGeoJson.forEach(gj => {
          const config = getMarkerConfig(gj.type);
          const baseColor = gj.color || config.color || '#3b82f6';
          const layerColor = getGeoJsonColor(gj.type, baseColor);

          const layer = L.geoJSON(gj.data, {
            style: function (feature: any) {
              let fColor = layerColor;
              let fWeight = 3;
              let fOpacity = 0.8;
              let fDashArray;

              if (gj.type === 'Tuyến đường' || gj.name.toLowerCase().includes('đường')) {
                const roadType = feature?.properties?.loaiDuong || feature?.properties?.LoaiDuong;
                if (roadType === 'Cao tốc' || roadType === 'Đường cao tốc') { fColor = '#ef4444'; fWeight = 5.5; fOpacity = 1; }
                else if (roadType === 'Quốc lộ') { fColor = '#eab308'; fWeight = 4; fOpacity = 1; }
                else if (roadType === 'Đường tỉnh' || roadType === 'Tỉnh lộ') { fColor = '#f97316'; fWeight = 3; fOpacity = 0.9; }
                else if (roadType === 'Đường đô thị') { fColor = layerColor; fWeight = 2.5; }
                else { fColor = layerColor; fWeight = 2; }
              }

              return { color: fColor, weight: fWeight, opacity: fOpacity, fillOpacity: 0.2, dashArray: fDashArray };
            },
            pointToLayer: function (feature: any, latlng: any) {
              let ptColor = layerColor;
              if (gj.type === 'Tuyến đường' || gj.name.toLowerCase().includes('đường')) {
                const roadType = feature?.properties?.loaiDuong || feature?.properties?.LoaiDuong;
                if (roadType === 'Cao tốc' || roadType === 'Đường cao tốc') ptColor = '#ef4444';
                else if (roadType === 'Quốc lộ') ptColor = '#eab308';
                else if (roadType === 'Đường tỉnh' || roadType === 'Tỉnh lộ') ptColor = '#f97316';
                else if (roadType === 'Đường đô thị') ptColor = layerColor;
              }
              return L.circleMarker(latlng, {
                radius: 6,
                fillColor: ptColor,
                color: "#ffffff",
                weight: 1.5,
                opacity: 1,
                fillOpacity: 0.95
              });
            },
            onEachFeature: function (feature: any, mapLayer: any) {
              if (feature.properties) {
                const featureId = feature.properties.OBJECTID || feature.id || Math.random().toString(36).substr(2, 9);
                const featureName = feature.properties.Ten || feature.properties.Name || feature.properties.TENDUONG || `Tài sản ${gj.name}`;

                const t = gj.type.toLowerCase();
                const isBridgeOrTunnel = t.includes('cầu') || t.includes('hầm');
                const isRoad = t.includes('quốc lộ') || t.includes('đường') || t.includes('tuyến');

                let popupContent = `
                <div style="padding: 0; min-width: 380px; max-width: 450px; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                  <div style="background: linear-gradient(135deg, ${layerColor} 0%, ${layerColor}dd 100%); padding: 12px; border-bottom: 1px solid #e2e8f0;">
                    <h3 style="font-weight: 600; color: white; margin: 0 0 4px 0; font-size: 16px;">${featureName}</h3>
                    <p style="font-size: 12px; color: rgba(255,255,255,0.8); margin: 0;">Loại: ${gj.type}</p>
                  </div>
                  
                  <div style="padding: 12px; background: white;">
                    <!-- Tabs -->
                    <div style="display: flex; flex-wrap: nowrap; overflow-x: auto; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; scrollbar-width: none;">
                      <button class="tab-btn-${featureId}" data-tab="status-${featureId}" style="padding: 6px 10px; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 4px; color: #2563eb; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; font-weight: 500; flex: 0 0 auto;">Hiện trạng</button>
                      <button class="tab-btn-${featureId}" data-tab="maintenance-${featureId}" style="padding: 6px 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex: 0 0 auto;">Bảo trì</button>
                      ${isBridgeOrTunnel || isRoad ? `
                        <button class="tab-btn-${featureId}" data-tab="patrol-${featureId}" style="padding: 6px 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex: 0 0 auto;">Kiểm tra</button>
                        <button class="tab-btn-${featureId}" data-tab="technical-${featureId}" style="padding: 6px 10px; background: transparent; border: 1px solid #e2e8f0; border-radius: 4px; color: #64748b; font-size: 11px; cursor: pointer; transition: all 0.2s; white-space: nowrap; flex: 0 0 auto;">Hồ sơ kỹ thuật</button>
                      ` : ''}
                    </div>

                    <!-- Tab Content: Hiện trạng -->
                    <div id="status-${featureId}" class="tab-content-${featureId}" style="display: block;">
                      <div style="max-height: 200px; overflow-y: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                          <tbody>`;

                // Limit properties to avoid huge popups
                let count = 0;
                Object.keys(feature.properties).forEach(key => {
                  const val = feature.properties[key];
                  if (val !== null && val !== undefined && typeof val !== 'object' && count < 15) {
                    popupContent += `
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                          <td style="padding: 6px 4px; color: #64748b; font-weight: 500; width: 40%;">${key}</td>
                          <td style="padding: 6px 4px; color: #1e293b; font-weight: 500; word-break: break-word;">${val}</td>
                        </tr>`;
                    count++;
                  }
                });

                popupContent += `
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <!-- Tab Content: Lịch sử bảo trì -->
                    <div id="maintenance-${featureId}" class="tab-content-${featureId}" style="display: none;">
                      <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có lịch sử bảo trì</p>
                    </div>

                    <!-- Tab Content: Kiểm tra -->
                    <div id="patrol-${featureId}" class="tab-content-${featureId}" style="display: none;">
                      <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có lịch sử kiểm tra</p>
                    </div>

                    <!-- Tab Content: Hồ sơ kỹ thuật -->
                    <div id="technical-${featureId}" class="tab-content-${featureId}" style="display: none;">
                      <p style="font-size: 11px; color: #6b7280; text-align: center; padding: 12px 0;">Chưa có hồ sơ kỹ thuật</p>
                    </div>

                    <!-- Actions -->
                    <div style="display: flex; gap: 8px; margin-top: 16px; padding-top: 12px; border-top: 1px solid #f1f5f9;">
                      <button class="action-btn-close-${featureId}" style="flex: 1; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">Đóng</button>
                      <button class="action-btn-edit-${featureId}" style="flex: 1; padding: 8px; background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">Sửa</button>
                      <button class="action-btn-delete-${featureId}" style="padding: 8px; background: #fef2f2; color: #ef4444; border: 1px solid #fee2e2; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">Xóa</button>
                    </div>
                  </div>
                </div>`;

                mapLayer.bindPopup(popupContent, { minWidth: 380, maxWidth: 450, className: 'custom-popup-geojson' });

                // Add event listeners for tabs after popup opens
                mapLayer.on('popupopen', () => {
                  const tabButtons = document.querySelectorAll('.tab-btn-' + featureId);
                  const tabContents = document.querySelectorAll('.tab-content-' + featureId);

                  tabButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                      const targetTab = (e.target as HTMLElement).getAttribute('data-tab');
                      tabContents.forEach(content => { (content as HTMLElement).style.display = 'none'; });
                      tabButtons.forEach(btn => {
                        (btn as HTMLElement).style.background = 'transparent';
                        (btn as HTMLElement).style.borderColor = '#e2e8f0';
                        (btn as HTMLElement).style.color = '#64748b';
                      });
                      const targetContent = document.getElementById(targetTab!);
                      if (targetContent) targetContent.style.display = 'block';
                      (e.target as HTMLElement).style.background = '#eff6ff';
                      (e.target as HTMLElement).style.borderColor = '#dbeafe';
                      (e.target as HTMLElement).style.color = '#2563eb';
                    });
                  });

                  // Add action button listeners
                  document.querySelector('.action-btn-close-' + featureId)?.addEventListener('click', () => {
                    mapLayer.closePopup();
                  });
                  document.querySelector('.action-btn-edit-' + featureId)?.addEventListener('click', () => {
                    if (onEdit) onEdit({ id: featureId, name: featureName, type: gj.type, data: feature.properties, isGeoJson: true });
                  });
                  document.querySelector('.action-btn-delete-' + featureId)?.addEventListener('click', () => {
                    if (onDelete) onDelete({ id: featureId, name: featureName, type: gj.type, data: feature.properties, isGeoJson: true });
                  });
                });
              }
            }
          }).addTo(mapRef.current);
          geoJsonLayersRef.current.push(layer);
        });
      });
    }
  }, [geoJsonData, visibleLayerIds, onEdit, onDelete]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        setTimeout(() => {
          if (mapRef.current) mapRef.current.invalidateSize();
        }, 50);
      }
    });

    resizeObserver.observe(mapContainerRef.current);

    const intervalId = setInterval(() => {
      if (mapRef.current) mapRef.current.invalidateSize();
    }, 1000);

    const timeoutId = setTimeout(() => clearInterval(intervalId), 5000);

    return () => {
      resizeObserver.disconnect();
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        try { mapRef.current.remove(); } catch (e) { console.error('Error removing map:', e); }
        mapRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);

  const mapId = useMemo(() => `map-${Math.floor(Math.random() * 1000000)}`, []);

  return (
    <div className="relative w-full h-full min-h-[inherit]">
      <style dangerouslySetInnerHTML={{
        __html: `
        .${mapId} {
          height: ${typeof height === 'number' ? height + 'px' : height};
          width: 100%;
          min-height: ${typeof height === 'number' ? height + 'px' : height};
        }
      `}} />
      <div
        ref={mapContainerRef}
        className={`leaflet-container rounded-lg overflow-hidden border border-border/50 bg-background ${mapId}`}
      />

      {/* Drawing Toolbar Overlay */}
      {isDrawingMode && (
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 bg-background/95 backdrop-blur-sm p-2 rounded-lg border border-border shadow-2xl">
          <div className="text-[10px] font-bold text-muted-foreground uppercase px-1 mb-1">Công cụ vẽ</div>
          <button
            onClick={() => (window as any).setDrawingMode?.('point')}
            className={`p-2 rounded-md transition-all ${drawingMode === 'point' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'}`}
            title="Vẽ điểm"
          >
            <MapPin className="size-4" />
          </button>
          <button
            onClick={() => (window as any).setDrawingMode?.('polyline')}
            className={`p-2 rounded-md transition-all ${drawingMode === 'polyline' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'}`}
            title="Vẽ đường"
          >
            <Route className="size-4" />
          </button>
          <button
            onClick={() => (window as any).setDrawingMode?.('polygon')}
            className={`p-2 rounded-md transition-all ${drawingMode === 'polygon' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'}`}
            title="Vẽ vùng"
          >
            <Construction className="size-4" />
          </button>
        </div>
      )}

      {/* Layer Control */}
      <div className={`absolute left-6 z-[1000] max-h-[60%] flex flex-col transition-all duration-300 ${bottomOffsetClass || 'bottom-6'}`}>
        <MapLayerControl
          categories={layerCategories}
          onToggleLayer={handleToggleLayer}
          onToggleAllInCategory={handleToggleAllInCategory}
          onToggleAllInSubLayer={handleToggleAllInSubLayer}
          onOpenSettings={onOpenSettings}
          onOpenInfo={onOpenInfo}
        />
      </div>
    </div>
  );
}