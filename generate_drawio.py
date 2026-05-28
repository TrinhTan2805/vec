import xml.etree.ElementTree as ET
import os

def create_drawio(filename, nodes, edges):
    root = ET.Element('mxfile', {'version': '21.6.8'})
    diagram = ET.SubElement(root, 'diagram', {'id': 'diagram1', 'name': 'Page-1'})
    model = ET.SubElement(diagram, 'mxGraphModel', {
        'dx': '1000', 'dy': '1000', 'grid': '1', 'gridSize': '10', 'guides': '1', 'tooltips': '1', 
        'connect': '1', 'arrows': '1', 'fold': '1', 'page': '1', 'pageScale': '1', 
        'pageWidth': '1169', 'pageHeight': '827', 'math': '0', 'shadow': '0'
    })
    root_cell = ET.SubElement(model, 'root')
    ET.SubElement(root_cell, 'mxCell', {'id': '0'})
    ET.SubElement(root_cell, 'mxCell', {'id': '1', 'parent': '0'})

    for n in nodes:
        cell = ET.SubElement(root_cell, 'mxCell', {'id': n['id'], 'value': n['value'], 'style': n['style'], 'vertex': '1', 'parent': '1'})
        ET.SubElement(cell, 'mxGeometry', {'x': str(n['x']), 'y': str(n['y']), 'width': str(n.get('w', 120)), 'height': str(n.get('h', 60)), 'as': 'geometry'})

    for e in edges:
        style = e.get('style', 'edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#1A1A1A;strokeWidth=2;')
        cell = ET.SubElement(root_cell, 'mxCell', {'id': e['id'], 'value': e.get('value', ''), 'style': style, 'edge': '1', 'parent': '1', 'source': e['source'], 'target': e['target']})
        ET.SubElement(cell, 'mxGeometry', {'relative': '1', 'as': 'geometry'})

    tree = ET.ElementTree(root)
    if hasattr(ET, 'indent'): ET.indent(tree, space="\t", level=0)
    tree.write(filename, encoding='utf-8', xml_declaration=True)

# 1. Master Data Flow
nodes_master = [
    {'id': 'n1', 'value': 'Ứng dụng Mobile\n- Tuần đường\n- Báo sự cố', 'x': 50, 'y': 150, 'w': 160, 'h': 80, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontStyle=1;'},
    {'id': 'n2', 'value': 'Portal Web Admin\n- Nhập liệu\n- Duyệt dữ liệu', 'x': 50, 'y': 300, 'w': 160, 'h': 80, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontStyle=1;'},
    {'id': 'n3', 'value': 'Tầng Logic & API\nGateway', 'x': 300, 'y': 225, 'w': 160, 'h': 80, 'style': 'rounded=0;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontStyle=1;'},
    {'id': 'n4', 'value': 'CSDL Tài sản Hạ tầng', 'x': 550, 'y': 50, 'w': 160, 'h': 80, 'style': 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;size=15;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;'},
    {'id': 'n5', 'value': 'CSDL Sự cố & Vi phạm', 'x': 550, 'y': 170, 'w': 160, 'h': 80, 'style': 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;size=15;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;'},
    {'id': 'n6', 'value': 'CSDL Tuần đường\n& Tracking GPS', 'x': 550, 'y': 290, 'w': 160, 'h': 80, 'style': 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;size=15;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;'},
    {'id': 'n7', 'value': 'CSDL Bảo trì, Dự án', 'x': 550, 'y': 410, 'w': 160, 'h': 80, 'style': 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;size=15;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;'},
    {'id': 'n8', 'value': 'Dashboard Tổng quan\n(Thống kê KPI)', 'x': 850, 'y': 110, 'w': 160, 'h': 80, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontStyle=1;'},
    {'id': 'n9', 'value': 'Bản đồ GIS 3D/2D\n(Không gian)', 'x': 850, 'y': 230, 'w': 160, 'h': 80, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontStyle=1;'},
    {'id': 'n10', 'value': 'Hệ thống Báo cáo\n(Xuất PDF/Excel)', 'x': 850, 'y': 350, 'w': 160, 'h': 80, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontStyle=1;'}
]
edges_master = [
    {'id': 'e1', 'source': 'n1', 'target': 'n3', 'value': 'Auth APIs'},
    {'id': 'e2', 'source': 'n2', 'target': 'n3', 'value': 'Internal API'},
    {'id': 'e3', 'source': 'n3', 'target': 'n4'},
    {'id': 'e4', 'source': 'n3', 'target': 'n5'},
    {'id': 'e5', 'source': 'n3', 'target': 'n6'},
    {'id': 'e6', 'source': 'n3', 'target': 'n7'},
    {'id': 'e7', 'source': 'n4', 'target': 'n8'},
    {'id': 'e8', 'source': 'n5', 'target': 'n8'},
    {'id': 'e9', 'source': 'n4', 'target': 'n9'},
    {'id': 'e10', 'source': 'n5', 'target': 'n9'},
    {'id': 'e11', 'source': 'n6', 'target': 'n10'},
    {'id': 'e12', 'source': 'n7', 'target': 'n10'},
    {'id': 'e13', 'source': 'n4', 'target': 'n10'}
]

# 2. Incident & Violation Flow
nodes_incident = [
    {'id': 'i1', 'value': 'Cán bộ hiện trường\n(App Mobile)', 'x': 50, 'y': 150, 'style': 'shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;'},
    {'id': 'i2', 'value': '1. Chụp ảnh +\nLấy tọa độ GPS', 'x': 180, 'y': 150, 'w': 140, 'h': 60, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;'},
    {'id': 'i3', 'value': '2. Gửi Data (Off/Online)', 'x': 380, 'y': 150, 'w': 140, 'h': 60, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;'},
    {'id': 'i4', 'value': 'API Server:\nBóc tách địa phận lưới Hạt', 'x': 380, 'y': 280, 'w': 140, 'h': 60, 'style': 'rounded=0;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;'},
    {'id': 'i5', 'value': 'Lưu CSDL\nTrạng thái: "MỚI"', 'x': 600, 'y': 280, 'w': 140, 'h': 60, 'style': 'shape=cylinder3;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;'},
    {'id': 'i6', 'value': 'Notification Socket\nBáo cho Admin Hạt', 'x': 600, 'y': 150, 'w': 140, 'h': 60, 'style': 'ellipse;shape=cloud;whiteSpace=wrap;html=1;fillColor=#f5f5f5;fontColor=#333333;strokeColor=#666666;'},
    {'id': 'i7', 'value': 'Chuyên viên Web\nTiếp nhận xử lý', 'x': 800, 'y': 150, 'w': 140, 'h': 60, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;'},
    {'id': 'i8', 'value': 'Cập nhật trạng thái\n"ĐÃ XỬ LÝ"', 'x': 800, 'y': 280, 'w': 140, 'h': 60, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;'},
    {'id': 'i9', 'value': 'Báo cáo\nPhản ánh sự cố', 'x': 800, 'y': 400, 'w': 140, 'h': 60, 'style': 'rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;'}
]
edges_incident = [
    {'id': 'ie1', 'source': 'i1', 'target': 'i2'},
    {'id': 'ie2', 'source': 'i2', 'target': 'i3'},
    {'id': 'ie3', 'source': 'i3', 'target': 'i4'},
    {'id': 'ie4', 'source': 'i4', 'target': 'i5'},
    {'id': 'ie5', 'source': 'i5', 'target': 'i6'},
    {'id': 'ie6', 'source': 'i6', 'target': 'i7'},
    {'id': 'ie7', 'source': 'i7', 'target': 'i8'},
    {'id': 'ie8', 'source': 'i8', 'target': 'i5', 'value': 'Lịch sử Logs'},
    {'id': 'ie9', 'source': 'i5', 'target': 'i9'}
]

create_drawio(r'd:\GiaoThongHaNoi\vec\tailieu\01_Master_DataFlow.drawio', nodes_master, edges_master)
create_drawio(r'd:\GiaoThongHaNoi\vec\tailieu\02_Incident_Violation_Flow.drawio', nodes_incident, edges_incident)

print("Generated Draw.io files successfully!")
