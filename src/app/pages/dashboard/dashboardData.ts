export interface DashboardConfig {
  title: string;
  description: string;
  kpis: {
    label: string;
    value: string | number;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
  }[];
  chartType: "bar" | "pie" | "line";
  chartData: any[];
  tableHeaders: string[];
  tableData: any[][];
}

export const DASHBOARD_ROUTES_CONFIG: Record<string, DashboardConfig> = {
  "/dashboard/asset-count": {
    title: "Tổng hợp số lượng tài sản",
    description: "Lãnh đạo xem số lượng tổng hợp tài sản theo từng tuyến đường, đơn vị quản lý, loại tài sản.",
    kpis: [
      { label: "Tổng số tài sản", value: "145,230", trend: "up", trendValue: "+2.5% (tháng này)" },
      { label: "Tài sản lớp mặt đường", value: "45,000" },
      { label: "Tài sản cầu/hầm", value: "12,400" },
      { label: "Thiết bị ITS", value: "8,950" }
    ],
    chartType: "bar",
    chartData: [
      { name: "Cao tốc Cầu Giẽ - Ninh Bình", value: 35000 },
      { name: "Cao tốc Nội Bài - Lào Cai", value: 65000 },
      { name: "Cao tốc TP.HCM - Long Thành", value: 25000 },
      { name: "Cao tốc Đà Nẵng - Quảng Ngãi", value: 20230 },
    ],
    tableHeaders: ["Tuyến đường", "Đơn vị quản lý", "Số lượng tài sản", "Tỷ lệ khấu hao trung bình"],
    tableData: [
      ["Cao tốc Cầu Giẽ - Ninh Bình", "VEC O&M", "35,000", "45%"],
      ["Cao tốc Nội Bài - Lào Cai", "VECS", "65,000", "52%"],
      ["Cao tốc TP.HCM - Long Thành", "VECE", "25,000", "30%"],
      ["Cao tốc Đà Nẵng - Quảng Ngãi", "VEC O&M", "20,230", "15%"],
    ]
  },
  "/dashboard/asset-profile": {
    title: "Thông tin hồ sơ tài sản",
    description: "Lãnh đạo theo dõi các hồ sơ tài sản theo từng tuyến đường, đơn vị quản lý, loại hồ sơ.",
    kpis: [
      { label: "Tổng số hồ sơ", value: "54,200", trend: "up", trendValue: "+120 hồ sơ mới" },
      { label: "Hồ sơ hoàn công", value: "32,000" },
      { label: "Hồ sơ bảo trì", value: "15,500" },
      { label: "Thiếu/sai sót", value: "12", trend: "down", trendValue: "-5 (đã xử lý)" }
    ],
    chartType: "pie",
    chartData: [
      { name: "Hồ sơ hoàn công", value: 32000 },
      { name: "Hồ sơ bảo trì", value: 15500 },
      { name: "Hồ sơ kiểm định", value: 4500 },
      { name: "Khác", value: 2200 },
    ],
    tableHeaders: ["Mã hồ sơ", "Tên hồ sơ", "Loại hồ sơ", "Tuyến đường", "Trạng thái số hóa"],
    tableData: [
      ["HS.CGE.001", "Bản vẽ hoàn công Cầu Vực", "Hoàn công", "Cầu Giẽ - Ninh Bình", "Đã số hóa (PDF)"],
      ["HS.NBLC.542", "Hồ sơ duy tu trạm thu phí IC1", "Bảo trì", "Nội Bài - Lào Cai", "Đã số hóa (PDF)"],
      ["HS.HLD.092", "Hồ sơ kiểm định cáp dự ứng lực cầu Long Thành", "Kiểm định", "TP.HCM - Long Thành", "Đang chờ duyệt"],
    ]
  },
  "/dashboard/inventory-activity": {
    title: "Hoạt động kiểm kê tài sản",
    description: "Lãnh đạo theo dõi tình trạng kiểm kê tài sản theo từng tuyến đường, đơn vị quản lý, thời gian.",
    kpis: [
      { label: "Tiến độ kiểm kê (2026)", value: "78%" },
      { label: "Tài sản đã kiểm kê", value: "113,279" },
      { label: "Tài sản chênh lệch", value: "45", trend: "neutral" },
    ],
    chartType: "bar",
    chartData: [
      { name: "Cầu Giẽ - Ninh Bình", value: 100 },
      { name: "Nội Bài - Lào Cai", value: 65 },
      { name: "TP.HCM - Long Thành", value: 92 },
      { name: "Đà Nẵng - Quảng Ngãi", value: 55 },
    ],
    tableHeaders: ["Đợt kiểm kê", "Đơn vị thực hiện", "Tiến độ", "Số lượng chênh lệch (Thừa/Thiếu)"],
    tableData: [
      ["Kiểm kê định kỳ Quý I/2026", "Đoàn kiểm tra VEC 01", "Hoàn thành 100%", "Thừa: 2 / Thiếu: 0"],
      ["Kiểm kê toàn diện tuyến NBLC", "VECS", "Đang thực hiện (65%)", "Chưa có báo cáo"],
      ["Kiểm kê thiết bị ITS Long Thành", "VECE", "Hoàn thành 100%", "Thừa: 0 / Thiếu: 3"],
    ]
  },
  "/dashboard/liquidate-alert": {
    title: "Cảnh báo tài sản sắp đến hạn thanh lý",
    description: "Lãnh đạo theo dõi các tài sản sắp đến hạn thanh lý theo tuyến đường, loại tài sản.",
    kpis: [
      { label: "Sắp hết hạn (<6 tháng)", value: "320", trend: "up", trendValue: "Tăng 12%" },
      { label: "Đã quá hạn khấu hao", value: "85" },
      { label: "Giá trị còn lại (Sổ sách)", value: "1.2 Tỷ VNĐ" },
    ],
    chartType: "line",
    chartData: [
      { name: "T1", value: 40 }, { name: "T2", value: 55 }, { name: "T3", value: 80 },
      { name: "T4", value: 120 }, { name: "T5", value: 250 }, { name: "T6", value: 320 },
    ],
    tableHeaders: ["Mã tài sản", "Tên tài sản", "Loại tài sản", "Thời hạn thanh lý dự kiến", "Tình trạng hiện tại"],
    tableData: [
      ["ITS.CAM.099", "Camera PTZ trạm thu phí IC2", "Thiết bị ITS", "15/06/2026", "Vẫn đang hoạt động"],
      ["VP.MAYIN.012", "Máy in HP Laser", "Thiết bị VP", "01/07/2026", "Hỏng, không thể sửa"],
      ["TS.BIENBAO.110", "Biển báo tốc độ 100 Km/h", "ATGT", "22/07/2026", "Bong tróc màng phản quang"],
    ]
  },
  "/dashboard/liquidated-assets": {
    title: "Tổng hợp tài sản đã thanh lý, thanh hủy",
    description: "Lãnh đạo theo dõi các tài sản đã thanh lý, thanh hủy theo tuyến đường, đơn vị quản lý.",
    kpis: [
      { label: "Đã thanh lý (Năm nay)", value: "1,204" },
      { label: "Tổng giá trị thu hồi", value: "8.5 Tỷ VNĐ" },
      { label: "Đã tiêu hủy", value: "450" },
    ],
    chartType: "bar",
    chartData: [
      { name: "Quý 1", value: 300 },
      { name: "Quý 2", value: 450 },
      { name: "Quý 3", value: 120 },
      { name: "Quý 4", value: 334 },
    ],
    tableHeaders: ["Mã tài sản", "Tên tài sản", "Hình thức", "Ngày thực hiện", "Giá trị thu hồi (VNĐ)"],
    tableData: [
      ["OTO.BKS.29A", "Xe bán tải tuần tra", "Đấu giá thanh lý", "10/02/2026", "150,000,000"],
      ["ITS.SRV.001", "Server quản lý dữ liệu cũ", "Thanh lý", "15/03/2026", "12,000,000"],
      ["BIENBAO.CU", "Lô 50 biển báo gỉ sét", "Thanh hủy phế liệu", "20/04/2026", "3,500,000"],
    ]
  },
  "/dashboard/maintain-alert": {
    title: "Cảnh báo tài sản sắp đến hạn bảo trì",
    description: "Lãnh đạo theo dõi các tài sản sắp đến hạn bảo trì theo tuyến đường, đơn vị quản lý, loại tài sản.",
    kpis: [
      { label: "Đến hạn tuần này", value: "45" },
      { label: "Đến hạn tháng này", value: "312", trend: "up" },
      { label: "Bỏ lỡ bảo trì (Quá hạn)", value: "0", trend: "neutral" },
    ],
    chartType: "pie",
    chartData: [
      { name: "Thiết bị ITS", value: 150 },
      { name: "Hệ thống chiếu sáng", value: 80 },
      { name: "Mặt đường", value: 50 },
      { name: "Cầu/Hầm", value: 32 },
    ],
    tableHeaders: ["Tên tài sản / Hạng mục", "Tuyến đường", "Đơn vị quản lý", "Hạn bảo trì", "Cấp độ cảnh báo"],
    tableData: [
      ["Hệ thống cân động (WIM) trạm IC4", "Nội Bài - Lào Cai", "VECS", "05/06/2026", "Cao"],
      ["Bảo dưỡng quạt thông gió hầm", "Đà Nẵng - Quảng Ngãi", "VEC O&M", "10/06/2026", "Trung bình"],
      ["Trùng tu mặt đường Km 15 - Km 20", "Cầu Giẽ - Ninh Bình", "VEC O&M", "25/06/2026", "Cao"],
    ]
  },
  "/dashboard/maintain-progress": {
    title: "Tiến độ thực hiện kế hoạch bảo trì",
    description: "Lãnh đạo theo dõi tiến độ thực hiện kế hoạch bảo trì sử dụng theo từng tuyến đường, đơn vị quản lý.",
    kpis: [
      { label: "Gói thầu đang thi công", value: "12" },
      { label: "Hoàn thành đúng tiến độ", value: "85%" },
      { label: "Chậm tiến độ", value: "2", trend: "down" },
    ],
    chartType: "bar",
    chartData: [
      { name: "Sửa chữa mặt đường", value: 85 },
      { name: "Sơn kẻ vạch", value: 100 },
      { name: "Thay thế khe co giãn", value: 45 },
      { name: "Bảo dưỡng ITS", value: 90 },
    ],
    tableHeaders: ["Mã Kế hoạch", "Hạng mục bảo trì", "Tuyến đường", "Nhà thầu thi công", "Tiến độ (%)"],
    tableData: [
      ["KHBT.2026.01", "Sửa chữa hằn lún vệt bánh xe Km20-Km30", "Cầu Giẽ - Ninh Bình", "Công ty CP BOT", "85%"],
      ["KHBT.2026.04", "Thay thế 10 khe co giãn cầu Sông Hồng", "Nội Bài - Lào Cai", "Liên danh Cầu Thăng Long", "45%"],
      ["KHBT.2026.12", "Sơn vạch kẻ đường toàn tuyến", "TP.HCM - Long Thành", "Công ty ATGT Miền Nam", "100%"],
    ]
  },
  "/dashboard/periodic-maintain": {
    title: "Tài sản có lịch bảo trì định kỳ",
    description: "Lãnh đạo theo dõi tài sản có lịch bảo trì định kỳ theo tuyến đường, thời gian.",
    kpis: [
      { label: "Lịch bảo trì (Tháng 6)", value: "415" },
      { label: "Chi phí dự kiến", value: "15.2 Tỷ" },
      { label: "Nguồn vốn", value: "Quỹ bảo trì" },
    ],
    chartType: "line",
    chartData: [
      { name: "T1", value: 200 }, { name: "T2", value: 250 }, { name: "T3", value: 180 },
      { name: "T4", value: 300 }, { name: "T5", value: 450 }, { name: "T6", value: 415 },
    ],
    tableHeaders: ["Tên tài sản", "Loại bảo trì", "Chu kỳ", "Ngày bảo trì tiếp theo", "Trạng thái lập dự toán"],
    tableData: [
      ["Tủ điện điều khiển chiếu sáng Nút giao", "Bảo dưỡng thiết bị điện", "3 Tháng", "15/06/2026", "Đã duyệt"],
      ["Camera giám sát hành trình toàn tuyến", "Lau chùi, căn chỉnh", "6 Tháng", "20/06/2026", "Đang lập"],
      ["Cầu cạn vượt quốc lộ", "Kiểm định định kỳ", "5 Năm", "01/08/2026", "Chờ phê duyệt"],
    ]
  },
  "/dashboard/repair-status": {
    title: "Tình trạng xử lý công việc sửa chữa",
    description: "Lãnh đạo theo dõi tình trạng xử lý công việc sửa chữa theo từng tuyến đường.",
    kpis: [
      { label: "Tổng yêu cầu sửa chữa (Tháng)", value: "128" },
      { label: "Đã khắc phục xong", value: "95" },
      { label: "Đang xử lý", value: "25" },
      { label: "Tồn đọng (Chưa xử lý)", value: "8", trend: "down" },
    ],
    chartType: "pie",
    chartData: [
      { name: "Đã hoàn thành", value: 95 },
      { name: "Đang xử lý", value: 25 },
      { name: "Chưa xử lý", value: 8 },
    ],
    tableHeaders: ["Mã Yêu cầu", "Nội dung hư hỏng", "Vị trí / Lý trình", "Mức độ", "Trạng thái"],
    tableData: [
      ["YC.SC.102", "Gãy cột biển báo tốc độ do xe đâm", "Km 45+200, NBLC", "Cao", "Đã hoàn thành"],
      ["YC.SC.105", "Đèn chiếu sáng hầm không sáng", "Hầm xuyên núi", "Nghiêm trọng", "Đang xử lý"],
      ["YC.SC.112", "Lún nứt cục bộ mặt đường bê tông nhựa", "Km 10+100, Cầu Giẽ", "Trung bình", "Chưa xử lý"],
    ]
  },
  "/dashboard/maintain-performance": {
    title: "Đánh giá hiệu suất công tác bảo trì",
    description: "Lãnh đạo theo dõi đánh giá chấm điểm bảo trì, hiển thị biểu đồ so sánh điểm giữa các đơn vị.",
    kpis: [
      { label: "Điểm trung bình toàn VEC", value: "92/100", trend: "up" },
      { label: "Đơn vị xuất sắc", value: "VEC O&M" },
      { label: "Sự cố do bảo trì kém", value: "0" },
    ],
    chartType: "bar",
    chartData: [
      { name: "VEC O&M", value: 95 },
      { name: "VECS", value: 88 },
      { name: "VECE", value: 92 },
      { name: "Đơn vị BOT", value: 85 },
    ],
    tableHeaders: ["Đơn vị quản lý", "Số lượt bảo trì đã thực hiện", "Tỷ lệ đúng hạn (%)", "Chất lượng (Điểm khảo sát)", "Xếp loại"],
    tableData: [
      ["VEC O&M (Cầu Giẽ - Ninh Bình)", "150", "98%", "9.5/10", "Xuất sắc"],
      ["VECE (TP.HCM - Long Thành)", "120", "95%", "9.2/10", "Tốt"],
      ["VECS (Nội Bài - Lào Cai)", "210", "85%", "8.5/10", "Khá"],
    ]
  },
  "/dashboard/inspect-activity": {
    title: "Tổng hợp hoạt động kiểm tra tài sản",
    description: "Lãnh đạo theo dõi tình trạng kiểm tra tài sản theo từng tuyến đường, loại kiểm tra.",
    kpis: [
      { label: "Lượt kiểm tra (Tháng)", value: "542" },
      { label: "Kiểm tra định kỳ", value: "450" },
      { label: "Kiểm tra đột xuất", value: "92" },
    ],
    chartType: "line",
    chartData: [
      { name: "Tuần 1", value: 120 }, { name: "Tuần 2", value: 135 }, { name: "Tuần 3", value: 140 }, { name: "Tuần 4", value: 147 },
    ],
    tableHeaders: ["Ngày kiểm tra", "Đơn vị thực hiện", "Tuyến đường", "Loại kiểm tra", "Tỷ lệ phát hiện lỗi"],
    tableData: [
      ["25/05/2026", "Tổ tuần đường số 1", "Nội Bài - Lào Cai", "Kiểm tra định kỳ hàng ngày", "2.5%"],
      ["22/05/2026", "Đoàn thanh tra kỹ thuật VEC", "Cầu Giẽ - Ninh Bình", "Kiểm tra đột xuất (Trước mưa bão)", "15%"],
      ["20/05/2026", "Kỹ thuật viên ITS", "TP.HCM - Long Thành", "Kiểm tra chuyên đề Camera", "5%"],
    ]
  },
  "/dashboard/inspect-alert": {
    title: "Cảnh báo kết quả kiểm tra bất thường",
    description: "Lãnh đạo theo dõi các kết quả kiểm tra bất thường, phân loại theo loại kiểm tra, thời gian.",
    kpis: [
      { label: "Tổng số lỗi bất thường", value: "34", trend: "up" },
      { label: "Mức độ Nguy hiểm (Đỏ)", value: "2" },
      { label: "Mức độ Cần theo dõi (Vàng)", value: "32" },
    ],
    chartType: "pie",
    chartData: [
      { name: "Kết cấu cầu", value: 2 },
      { name: "Hằn lún mặt đường", value: 15 },
      { name: "Hệ thống thoát nước", value: 10 },
      { name: "Hệ thống điện", value: 7 },
    ],
    tableHeaders: ["Thời gian phát hiện", "Hạng mục bất thường", "Lý trình", "Mức độ", "Hình ảnh đính kèm"],
    tableData: [
      ["26/05/2026", "Vết nứt dọc trên bề mặt dầm cầu", "Km 152+300", "Nguy hiểm", "Có (3 ảnh)"],
      ["25/05/2026", "Ngập úng cục bộ do tắc rãnh thoát nước", "Km 80+100", "Theo dõi", "Có (1 ảnh)"],
      ["24/05/2026", "Sụt lún ta luy dương do mưa lớn", "Km 215+500", "Nguy hiểm", "Có (5 ảnh, 1 video)"],
    ]
  },
  "/dashboard/feedback": {
    title: "Tiếp nhận và xử lý phản ánh từ hiện trường",
    description: "Lãnh đạo theo dõi kết quả tiếp nhận và xử lý phản ánh từ người tham gia giao thông, tuần đường.",
    kpis: [
      { label: "Tổng phản ánh (Tuần)", value: "156" },
      { label: "Qua Hotline 1900", value: "85" },
      { label: "Từ nhân viên tuần đường", value: "71" },
      { label: "Tỷ lệ xử lý thành công", value: "98%" },
    ],
    chartType: "bar",
    chartData: [
      { name: "TNGT/Sự cố", value: 45 },
      { name: "Hư hỏng hạ tầng", value: 60 },
      { name: "Vật cản trên đường", value: 35 },
      { name: "Phản ánh dịch vụ", value: 16 },
    ],
    tableHeaders: ["Mã PA", "Nguồn tin", "Nội dung phản ánh", "Thời gian tiếp nhận", "Trạng thái xử lý"],
    tableData: [
      ["PA.001", "Hotline", "Xe container nổ lốp nằm làn khẩn cấp Km 15", "08:15 26/05", "Đã cẩu kéo"],
      ["PA.002", "Tuần đường", "Rơi vãi cát đá trên mặt đường làn 1", "09:30 26/05", "Đang dọn dẹp"],
      ["PA.003", "Hotline", "Báo hỏng thẻ VETC không qua được trạm", "10:05 26/05", "Đã hỗ trợ thủ công"],
    ]
  },
  "/dashboard/incident-trend": {
    title: "Phân tích xu hướng sự cố lặp lại",
    description: "Lãnh đạo theo dõi các xu hướng sự cố lặp lại theo loại sự cố, tần suất, vị trí, hiển thị điểm đen.",
    kpis: [
      { label: "Điểm đen TNGT mới phát sinh", value: "2" },
      { label: "Sự cố lặp lại nhiều nhất", value: "Nổ lốp xe" },
      { label: "Đoạn đường rủi ro cao", value: "Km 200 - Km 230 (NBLC)" },
    ],
    chartType: "line",
    chartData: [
      { name: "T1", value: 15 }, { name: "T2", value: 18 }, { name: "T3", value: 14 },
      { name: "T4", value: 25 }, { name: "T5", value: 30 }, { name: "T6", value: 45 },
    ],
    tableHeaders: ["Loại sự cố lặp lại", "Tần suất (Tháng)", "Vị trí tập trung (Hotspot)", "Đề xuất biện pháp kỹ thuật"],
    tableData: [
      ["Tai nạn đâm va đuôi xe", "15 vụ/tháng", "Km 210 - Km 215 (Sương mù)", "Bổ sung biển VMS, đinh phản quang"],
      ["Hằn lún vệt bánh xe (Rutting)", "Lặp lại 3 lần/năm", "Cửa ngõ trạm thu phí IC3", "Thử nghiệm kết cấu bê tông xi măng"],
      ["Gia súc vào đường cao tốc", "8 vụ/tháng", "Km 150 (Đoạn qua rào chắn hỏng)", "Sửa chữa rào B40 khẩn cấp, phối hợp địa phương"],
    ]
  },
};
