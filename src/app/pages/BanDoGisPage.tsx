import React from 'react';
import GeoJsonMapView from '../components/map/GeoJsonMapView';

export default function BanDoGisPage() {
  return (
    <div className="flex flex-col h-full w-full" style={{ height: 'calc(100vh - 56px)' }}>
      <GeoJsonMapView />
    </div>
  );
}
