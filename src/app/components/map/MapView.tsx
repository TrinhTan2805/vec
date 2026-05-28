import { useEffect, useRef, useState } from 'react';

interface MapMarker {
  id: number | string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  description?: string;
}

interface MapViewProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const getMarkerColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'quốc lộ':
      return '#3b82f6'; // blue
    case 'cầu':
      return '#10b981'; // green
    case 'hầm':
      return '#8b5cf6'; // purple
    case 'nút giao':
      return '#f97316'; // orange
    default:
      return '#6366f1'; // indigo
  }
};

export function MapView({ 
  markers, 
  center = [21.0285, 105.8542], // Hà Nội coordinates
  zoom = 11,
  height = '500px'
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Initialize map
      const map = L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
      setMapLoaded(true);

      // Add markers
      markers.forEach((marker) => {
        const color = getMarkerColor(marker.type);
        
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const leafletMarker = L.marker([marker.lat, marker.lng], { icon }).addTo(map);

        const popupContent = `
          <div style="padding: 8px; background: white; border-radius: 4px;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 4px; font-size: 14px;">${marker.name}</h3>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Loại: ${marker.type}</p>
            ${marker.description ? `<p style="font-size: 11px; color: #94a3b8;">${marker.description}</p>` : ''}
          </div>
        `;

        leafletMarker.bindPopup(popupContent);
      });
    }).catch((error) => {
      console.error('Error loading Leaflet:', error);
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer: any) => {
      if (layer.options && layer.options.icon) {
        map.removeLayer(layer);
      }
    });

    // Re-add markers
    import('leaflet').then((L) => {
      markers.forEach((marker) => {
        const color = getMarkerColor(marker.type);
        
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const leafletMarker = L.marker([marker.lat, marker.lng], { icon }).addTo(map);

        const popupContent = `
          <div style="padding: 8px; background: white; border-radius: 4px;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 4px; font-size: 14px;">${marker.name}</h3>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Loại: ${marker.type}</p>
            ${marker.description ? `<p style="font-size: 11px; color: #94a3b8;">${marker.description}</p>` : ''}
          </div>
        `;

        leafletMarker.bindPopup(popupContent);
      });

      // Update map view
      map.setView(center, zoom);
    });
  }, [markers, mapLoaded]);

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }} 
      className="rounded-lg overflow-hidden border border-border/50 bg-background"
    />
  );
}
