import os
import zipfile
import geopandas as gpd
import json
from pathlib import Path

DATA_DIR = Path(r"E:\GiaoThongHaNoi\vec\tailieu\data")
OUTPUT_DIR = Path(r"E:\GiaoThongHaNoi\vec\public\geojson")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Map Vietnamese layer names
LAYER_NAMES = {
    'bienbao': 'Biển báo giao thông',
    'cau': 'Cầu',
    'coctieu': 'Cọc tiêu',
    'cong': 'Cống',
    'coth': 'Cổ thắt / Nút giao',
    'cotkm': 'Cột Km',
    'dentinhieugiaothong': 'Đèn tín hiệu giao thông',
    'doanduong': 'Đoạn đường',
    'hoga': 'Hố ga',
    'holan': 'Hố lăn / Hố đấu',
    'ke': 'Kè',
    'lichsuduytubaoduong': 'Lịch sử duy tu bảo dưỡng',
    'moclogioi': 'Mốc lộ giới',
    'nutgiao': 'Nút giao',
    'ranhdoc': 'Rãnh dọc',
    'tuyenduong': 'Tuyến đường',
    'vachson': 'Vạch sơn đường',
}

results = []
for zip_file in sorted(DATA_DIR.glob("*.zip")):
    # Extract layer key from filename
    name = zip_file.stem  # e.g. dbhanoi_bienbao_2026033008243363
    parts = name.split('_')
    # Try to find the layer key
    layer_key = None
    for p in parts[1:]:
        if p in LAYER_NAMES:
            layer_key = p
            break
    if not layer_key:
        # Try partial match
        for p in parts[1:]:
            for k in LAYER_NAMES:
                if k in p or p in k:
                    layer_key = k
                    break
            if layer_key:
                break
    
    layer_display = LAYER_NAMES.get(layer_key, layer_key or name)
    output_name = (layer_key or parts[1]) + ".geojson"
    output_path = OUTPUT_DIR / output_name

    print(f"\n📦 Processing: {zip_file.name}")
    print(f"   → Layer: {layer_display}")
    
    try:
        # Read shapefile directly from zip
        gdf = gpd.read_file(f"zip://{zip_file}")
        
        # Reproject to WGS84 if needed
        if gdf.crs is None:
            print(f"   ⚠️  No CRS found, assuming VN2000 / EPSG:4756")
            gdf = gdf.set_crs(epsg=4756)
        
        if gdf.crs.to_epsg() != 4326:
            print(f"   🔄 Converting from {gdf.crs} to WGS84")
            gdf = gdf.to_crs(epsg=4326)
        
        # Save to GeoJSON
        gdf.to_file(output_path, driver='GeoJSON', encoding='utf-8')
        
        feature_count = len(gdf)
        geom_type = gdf.geometry.geom_type.value_counts().to_dict()
        print(f"   ✅ Saved {feature_count} features → {output_name}")
        print(f"   📐 Geometry types: {geom_type}")
        
        results.append({
            'key': layer_key or parts[1],
            'name': layer_display,
            'file': output_name,
            'count': feature_count,
            'geomTypes': list(geom_type.keys())
        })
        
    except Exception as e:
        print(f"   ❌ Error: {e}")

# Write manifest
manifest_path = OUTPUT_DIR / 'manifest.json'
with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n✅ Done! {len(results)} layers converted.")
print(f"📄 Manifest: {manifest_path}")
