const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/components/map/SimpleMapView.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The markers loop in initMap starts with "// Add markers" and ends before "// Force map to resize correctly"
const markerLoopStartIdx = content.indexOf('// Add markers');
const mapResizeIdx = content.indexOf('// Force map to resize correctly');

if (markerLoopStartIdx !== -1 && mapResizeIdx !== -1) {
  const markerLoopCode = content.substring(markerLoopStartIdx, mapResizeIdx);
  
  // Create the renderMarkers function
  const renderFunction = `
const renderMarkers = (mapInstance: any, L: any, markerList: MapMarker[], markerRefs: any[]) => {
  // Remove old markers
  markerRefs.forEach(m => {
    try { mapInstance.removeLayer(m); } catch (e) {}
  });
  markerRefs.length = 0;

  // Add new markers
${markerLoopCode.replace(/markers\.forEach/g, 'markerList.forEach').replace(/map\)/g, 'mapInstance)').replace(/map;/g, 'mapInstance;').replace(/markersRef\.current/g, 'markerRefs')}
};
`;

  // Insert renderFunction before export function SimpleMapView
  content = content.replace('export function SimpleMapView', renderFunction + '\nexport function SimpleMapView');

  // Replace original loop with a call to renderMarkers
  content = content.substring(0, markerLoopStartIdx) +
            `// Add markers
        renderMarkers(map, L, markers, markersRef.current);

        ` +
            content.substring(mapResizeIdx);

  // Add the new useEffect to handle markers prop change
  const useEffectCode = `
  // Update markers when props change
  useEffect(() => {
    if (mapRef.current) {
      import('leaflet').then((leaflet) => {
        const L = leaflet.default;
        renderMarkers(mapRef.current, L, markers, markersRef.current);
      });
    }
  }, [markers]);

`;

  const initMapEndIdx = content.indexOf('  }, []); // Still init once');
  const insertIndex = initMapEndIdx + '  }, []); // Still init once\n'.length;
  
  content = content.substring(0, insertIndex) + useEffectCode + content.substring(insertIndex);

  fs.writeFileSync(filePath, content);
  console.log('Successfully fixed SimpleMapView.tsx');
} else {
  console.log('Could not find marker loop boundaries');
}
