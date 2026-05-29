## trenweb

| TT | Tên Use case | Tên tác nhân | Giao dịch (Transaction) | Phân loại theo BMT | Phân loại theo độ phức tạp  | Đường dẫn | Ngày cập nhật |
| --- | --- | --- | --- | --- | ---  | --- | --- |
| A | Phân hệ quản trị hệ thống |  |  |  |   | |   |
| I | Modules Quản trị hệ thống |  |  |  |   | |   |
| 1 | Quản lý người dùng | QTHT | Quản trị hệ thống thực hiện tìm kiếm thông tin người dùng dựa trên các tiêu chí như tên, email, hoặc mã số người dùng. Hệ thống sẽ hiển thị danh sách người dùng phù hợp với kết quả tìm kiếm. | B | Trung bình  | http://localhost:4000/admin/tai-khoan |   |
|  |  |  | Quản trị hệ thống thêm thông tin người dùng mới, bao gồm các trường dữ liệu như tên, email, số điện thoại và quyền hạn. Hệ thống sẽ lưu trữ thông tin và xác nhận rằng người dùng mới đã được thêm thành công. |  |   | |   |
|  |  |  | Quản trị hệ thống sửa thông tin của một người dùng hiện tại, bao gồm các thông tin như tên, email, số điện thoại hoặc quyền hạn. Hệ thống sẽ cập nhật thông tin và thông báo xác nhận việc chỉnh sửa. |  |   | |   |
|  |  |  | Quản trị hệ thống xóa một người dùng khỏi hệ thống dựa trên mã số hoặc tiêu chí định danh khác. Hệ thống sẽ xóa dữ liệu liên quan và thông báo xác nhận rằng người dùng đã bị xóa. |  |   | |   |
|  |  |  | Quản trị hệ thống khóa hoặc đổi mật khẩu của một người dùng để đảm bảo an ninh hoặc khắc phục sự cố. Hệ thống sẽ áp dụng thay đổi và thông báo xác nhận trạng thái mới của người dùng. |  |   | |   |
| 2 | Quản lý cầu hình chung hệ thống | QTHT | Quản trị hệ thống thiết lập hạn chế số lần đăng nhập sai cho tài khoản trong một khoảng thời gian nhất định để tăng cường bảo mật. Hệ thống sẽ theo dõi số lần đăng nhập sai và tự động khóa tài khoản nếu vượt quá giới hạn, đồng thời thông báo lý do khóa. | B | Đơn giản  | http://localhost:4000/he-thong/cau-hinh |   |
|  |  |  | Quản trị hệ thống quản lý danh sách địa chỉ mạng được phép truy cập hệ thống quản trị, bao gồm việc thêm, sửa, hoặc xóa các địa chỉ mạng. Hệ thống sẽ kiểm tra địa chỉ mạng của Quản trị hệ thống khi đăng nhập và chỉ cho phép truy cập nếu địa chỉ nằm trong danh sách được cấp quyền. |  |   | |   |
|  |  |  | Quản trị hệ thống cấu hình dung lượng tối đa tải video, hình ảnh, tài liệu của ứng dụng trên web, di động. Hệ thống sẽ hiển thị form cấu hình cho người dùng cầu hình. |  |   | |   |
|  | Xác thực người sử dụng |  |  |  |   | |   |
| 3 | Đăng nhập hệ thống | Cán bộ | Cán bộ nhập thông tin đăng nhập, bao gồm tài khoản và mật khẩu, để truy cập vào hệ thống.Hệ thống xác thực thông tin đăng nhập và cho phép truy cập nếu thông tin hợp lệ. | B | Đơn giản  | http://localhost:4000/ |   |
| 4 | Thiết lập chính sách mật khẩu | QTHT | Quản trị hệ thống thiết lập các quy định về mật khẩu như độ dài tối thiểu, loại ký tự bắt buộc (chữ hoa, chữ thường, ký tự đặc biệt), thời gian hiệu lực của mật khẩu, và khoảng thời gian cần thay đổi mật khẩu.Hệ thống sẽ tự động áp dụng các quy định này khi người dùng tạo hoặc thay đổi mật khẩu. | B | Đơn giản  | http://localhost:4000/admin/tai-khoan |   |
| 5 | Khóa tài khoản sau số lần đăng nhập sai | QTHT | Quản trị hệ thống thiết lập trạng thái khóa tài khoản. Nếu người dùng nhập sai thông tin đăng nhập quá số lần quy định,hệ thống sẽ tạm thời khóa tài khoản và hiển thị thông báo cảnh báo, đồng thời yêu cầu người dùng liên hệ với quản trị viên để được hỗ trợ. | B | Đơn giản  | http://localhost:4000/admin/tai-khoan |   |
|  | Kiểm soát truy cập |  |  |  |   | |   |
| 6 | Quản lý thời gian chờ (Timeout) | QTHT | Quản trị hệ thống thiết lập thời gian chờ. Sau khoảng thời gian không hoạt động, hệ thống sẽ tự động đăng xuất người dùng để đảm bảo an toàn và tránh các truy cập trái phép. | B | Đơn giản  | http://localhost:4000/admin/timeout |   |
| 7 | Phân quyền truy cập | QTHT | Quản trị hệ thống thiết lập phân quyền truy cập theo chức năng hoặc nhóm người dùng cụ thể, giới hạn quyền truy cập dựa trên chức vụ hoặc vai trò của từng người dùng. Hệ thống sẽ kiểm soát và áp dụng các quyền này trong suốt quá trình sử dụng. | B | Đơn giản  | |   |
| 8 | Quản lý nhật ký hoạt động hệ thống (Audit Log) | QTHT | Quản trị hệ thống tìm kiếm nhật ký hệ thống theo phân loại, thời gian. Hệ thống hiển thị kết quả tìm kiếm | B | Trung bình  | |   |
|  |  |  | Quản trị hệ thống lọc nhật ký hệ thống theo người dùng. Hệ thống hiển thị kết quả tìm kiếm |  |   | |   |
|  |  |  | Quản trị hệ thống thực hiện xuất excel kết quả tìm kiếm. Hệ thống hiện tại file excel để người dùng tải về |  |   | |   |
|  |  |  | Quản trị hệ thống xem lịch sử thay đổi dữ liệu. Hệ thống hiển thị chi tiết thông tin lịch sử dữ liệu theo thời gian |  |   | |   |
| II | Modules quản trị danh mục |  |  |  |   | |   |
| 9 | Danh mục Phân quyền chức năng | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | |   |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 10 | Quản lý danh mục địa phận tỉnh | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/admin/danh-muc-dia-phan |   |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 11 | Quản lý danh mục địa phận xã | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/admin/danh-muc-dia-phan |   |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 12 | Quản lý danh mục phòng ban, trung tâm VEC | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/phong-ban | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 13 | Quản lý danh mục các tuyến cao tốc do VEC quản lý | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/tuyen-cao-toc | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 14 | Quản lý danh mục các đơn vị quản lý, khai thác, giám sát trên các tuyến | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/don-vi | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 15 | Quản lý danh mục tài sản trên tuyến | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Trung bình  | http://localhost:4000/danh-muc/tai-san | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống cấu hình hệ tọa độ, kiểu dữ liệu. Hệ thống hiển thị form thông tin cấu hình |  |   | |   |
|  |  |  | Quản trị hệ thống thêm, sửa, xóa các trường thông tin. Hệ thống hiển thị chức năng thêm, sửa, xóa trường dữ liệu |  |   | |   |
|  |  |  | Quản trị hệ thống cấu hình nhãn hiển thị trường, kiểu trường dữ liệu. Hệ thống hiển thị chức năng cấu hình |  |   | |   |
| 16 | Quản lý danh mục thiết bị (thiết bị văn phòng, thiết bị CNTT và các thiết bị khác) | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/thiet-bi | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 17 | Quản lý danh mục kho vật lý | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/kho-vat-ly | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 18 | Quản lý danh mục hồ sơ tài sản đường cao tốc | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/ho-so-tai-san | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
|  | Quản lý danh mục đánh giá chấm điểm giám sát |  |  |  |   | |   |
| 19 | Quản lý danh mục đánh giá bảo trì | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/danh-gia-bao-tri | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 20 | Quản lý danh mục đánh giá sửa chữa | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/danh-gia-sua-chua | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 21 | Quản lý danh mục tiêu chí đánh giá vận hành | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/tieu-chi-van-hanh | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 22 | Quản lý danh mục mục sơ đồ mặt bằng | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/so-do-mat-bang | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| 23 | Quản lý danh mục của các lớp tài sản | QTHT | Quản trị hệ thống nhập thông tin và lưu. Hệ thống phản hồi: "Thêm mới danh mục thành công." | B | Đơn giản  | http://localhost:4000/danh-muc/lop-tai-san | 22:15:38 29/5/2026 |
|  |  |  | Quản trị hệ thống cập nhật thông tin và lưu. Hệ thống phản hồi: "Cập nhật danh mục thành công." |  |   | |   |
|  |  |  | Quản trị hệ thống chọn danh mục, xóa và xác nhận. Hệ thống phản hồi: "Xóa danh mục thành công." |  |   | |   |
| III | Quản lý tích hợp, chia sẻ |  |  |  |   | |   |
| 24 | Quản lý dịch vụ | QTHT | Quản trị hệ thống tìm kiếm thông tin dịch vụ, hệ thống trả về danh sách dịch vụ phù hợp. | B | Trung bình  | |   |
|  |  |  | Quản trị hệ thống thêm mới dịch vụ, hệ thống thông báo thêm thành công. |  |   | |   |
|  |  |  | Quản trị hệ thống cập nhật dịch vụ, hệ thống thông báo cập nhật thành công. |  |   | |   |
|  |  |  | Quản trị hệ thống xóa dịch vụ, hệ thống thông báo xóa thành công. |  |   | |   |
| 25 | Theo dõi và giám sát tình trạng dịch vụ | QTHT | Quản trị hệ thống tìm kiếm thông tin dịch vụ, hệ thống trả về kết quả tìm kiếm phù hợp. | B | Đơn giản  | |   |
|  |  |  | Quản trị hệ thống theo dõi tình trạng hoạt động của dịch vụ, hệ thống hiển thị thông tin chi tiết. |  |   | |   |
| 26 | Quản lý cấu hình dịch vụ | QTHT | Quản trị hệ thống tạo và quản lý token, hệ thống ghi nhận và hiển thị danh sách token. | B | Trung bình  | |   |
|  |  |  | Quản trị hệ thống cấu hình tên miền và địa chỉ IP của các hệ thống sử dụng, hệ thống cập nhật thông tin cấu hình. |  |   | |   |
|  |  |  | Quản trị hệ thống cấu hình thời gian sử dụng, hệ thống lưu lại thời gian được thiết lập. |  |   | |   |
|  |  |  | Quản trị hệ thống cấu hình trạng thái hoạt động của dịch vụ, hệ thống cập nhật trạng thái tương ứng. |  |   | |   |
|  | Chia sẻ dữ liệu dữ liệu tài sản |  |  |  |   | |   |
| 27 | Dịch vụ dữ liệu tổng hợp tài sản | Hệ thống bên ngoài | Cung cấp dịch vụ tổng hợp tài sản theo loại tài sản, theo tuyến đường, theo đơn vị quản lý. Hệ thống hiển thị thông tin đường dẫn, tham số dịch vụ | B | Đơn giản  | |   |
| 28 | Dịch vụ dữ liệu chi tiết tài sản | Hệ thống bên ngoài | Cung cấp dịch vụ chi tiết tài sản theo loại tài sản, theo tuyến đường, theo đơn vị quản lý, danh sách trường thông tin. Hệ thống hiển thị thông tin đường dẫn, tham số dịch vụ | B | Đơn giản  | |   |
|  | Chia sẻ dịch vụ bảo trì tài sản |  |  |  |   | |   |
| 29 | Dịch vụ dữ liệu bảo trì định kỳ | Hệ thống bên ngoài | Cung cấp dịch vụ dữ liệu bảo trì định kỳ theo tuyến đường, đơn vị quản lý, thời gian, phân loại, tình trạng xử lý…. Hệ thống hiển thị thông tin đường dẫn, tham số dịch vụ | B | Đơn giản  | |   |
| 30 | Dịch vụ dữ liệu các yêu cầu theo thời gian, loại yêu cầu | Hệ thống bên ngoài | Cung cấp Dịch vụ dữ liệu các yêu cầu theo thời gian, loại yêu cầu. Hệ thống hiển thị thông tin đường dẫn, tham số dịch vụ | B | Đơn giản  | |   |
| B | Màn hình chính (Dashboard) |  |  |  |   | |   |
| 31 | Tổng hợp số lượng tài sản |  | Lãnh đạo xem số lượng tổng hợp tài sản theo từng tuyến đường, đơn vị quản lý, loại tài sản. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 32 | Cảnh báo tài sản sắp đến hạn thanh lý |  | Lãnh đạo theo dõi các tài sảnsắp đến hạn thanh lý theo từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 33 | Cảnh báo tài sản sắp đến hạn bảo trì |  | Lãnh đạo theo dõi các tài sản sắp tài sản sắp đến hạn bảo trì theo từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 34 | Tổng hợp tài sản đã thanh lý, thanh hủy |  | Lãnh đạo theo dõi các tài sản đã thanh lý, thanh hủy theo từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 35 | Thông tin hồ sơ tài sản |  | Lãnh đạo theo dõi các hồ sơ tài sản theo từng tuyến đường, đơn vị quản lý, loại hồ sơ, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 36 | Hoạt động kiểm kê tài sản |  | Lãnh đạo theo dõi tình trạng kiểm kê tài sản theo từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 37 | Tổng hợp hoạt động kiểm tra tài sản |  | Lãnh đạo theo dõi tình trạng kiểm tra tài sản theo từng tuyến đường, đơn vị quản lý, loại tài sản, loại kiểm tra, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 38 | Cảnh báo kết quả kiểm tra bất thường |  | Lãnh đạo theo dõi các kết quả kiểm tra bất thường theo từng tuyến đường, đơn vị quản lý, loại tài sản, loại kiểm tra, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 39 | Tiến độ thực hiện kế hoạch bảo trì |  | Lãnh đạo theo dõi tiến độ thực hiện kế hoạch bảo trì sử dụng theo từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 40 | Tài sản có lịch bảo trì định kỳ |  | Lãnh đạo theo dõi tài sản có lịch bảo trì định kỳ theo từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 41 | Tình trạng xử lý công việc sửa chữa |  | Lãnh đạo theo dõi tình trạng xử lý công việc sửa chữa theo từng tuyến đường, đơn vị quản lý, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 42 | Tiếp nhận và xử lý phản ánh từ hiện trường |  | Lãnh đạo theo dõi kết quả tiếp nhận và xử lý phản ánh từ hiện trường theo từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và chức năng xem danh sách chi tiết | B | Đơn giản  | |   |
| 43 | Phân tích xu hướng sự cố lặp lại |  | Lãnh đạo theo dõi các xu hướng sự cố lặp lại theo loại sự cố, tần suất, vị trí, từng tuyến đường, đơn vị quản lý, loại tài sản, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và hiển thị bản đồ các khu vực sự cố lặp lại | B | Đơn giản  | |   |
| 44 | Đánh giá hiệu suất công tác bảo trì |  | Lãnh đạo theo đánh giá chấm điểm bảo trì theo từng tuyến đường, đơn vị quản lý, thời gian. Hệ thống hiển thị số liệu tổng hợp theo điều kiện tìm kiếm và hiển thị biểu đồ so sánh điểm giữa các đơn vị | B | Đơn giản  | |   |
| C | Phân hệ Quản lý tài sản trên đường cao tốc |  |  |  |   | |   |
| I | Quản lý tài sản trên bản đồ |  |  |  |   | |   |
| I.1 | Quản lý bản đồ nền |  |  |  |   | |   |
| 45 | Cấu hình bản đồ nền | QTHT | Cán bộ thêm mới dịch vụ bản đồ nền vào hệ thống. Hệ thống xác nhận và cập nhật thông tin vào cơ sở dữ liệu. | B | Đơn giản  | |   |
|  |  |  | Cán bộ cập nhật thông số về đường dẫn, vùng dữ liệu và nguồn bản đồ. Hệ thống ghi nhận và lưu thông tin mới. |  |   | |   |
|  |  |  | Cán bộ lưu cấu hình bản đồ nền. Hệ thống xác nhận và lưu cấu hình vào cơ sở dữ liệu. |  |   | |   |
| 46 | Thay đổi bản đồ đồ nền | QTHT | Cán bộ chọn bản đồ nền hiện tại để hiển thị. Hệ thống xác nhận và hiển thị bản đồ nền đã chọn. | B | Đơn giản  | |   |
|  |  |  | Cán bộ lựa chọn bản đồ nền mới từ danh sách có sẵn. Hệ thống ghi nhận sự thay đổi và chuẩn bị cập nhật. |  |   | |   |
|  |  |  | Cán bộ xác nhận thay đổi bản đồ nền. Hệ thống tự động cập nhật và hiển thị bản đồ nền mới. |  |   | |   |
| I.2 | Quản lý lý dữ liệu 3D |  |  |  |   | |   |
| 47 | Cài đặt hiển thị 3D cho loại dữ liệu dạng điểm | Cán bộ | Cán bộ tải file mô hình 3D cho loại dữ liệu dạng điểm. Hệ thống hiển thị chức năng tải dữ liệu | B | Trung bình  | |   |
|  |  |  | Cán bộ chọn 1 mô hình 3D có sẵn trong hệ thống. Hệ thống hiển thị danh sách mô hình 3D để người dùng lựa chọn |  |   | |   |
|  |  |  | Cán bộ cấu hình tỉ lệ của mô hình 3D. Hệ thống hiển thị form thông tin cấu hình. |  |   | |   |
|  |  |  | Cán bộ cấu hình góc xoay cho mô hình 3D. Hệ thống hiển thị chức năng cấu hình góc xoay |  |   | |   |
|  |  |  | Cán bộ cấu hình độ cao cho mô hình 3D. Hệ thống hiển thị form thông tin cấu hình độ cao |  |   | |   |
| 48 | Cập nhật dữ liệu 3D trên bản đồ | Cán bộ | Cán bộ thêm vị trí dữ liệu 3D trên bản đồ. Hệ thống hiển thị công cụ tạo điểm 3D | B | Trung bình  | |   |
|  |  |  | Cán bộ thêm mô hình 3D cho dữ liệu bằng cách upload file mô hình. Hệ thống hiển thị form upload file mô hình |  |   | |   |
|  |  |  | Cán bộ thêm mô hình 3D cho dữ liệu bằng cách chọn mô hình có sẵn trong hệ thống. Hệ thống hiển thị các mô hình có sẵn cho người dùng lựa chọn |  |   | |   |
|  |  |  | Cán bộ xóa vị trí 3D vừa tạo. Hệ thống hiển thị thông báo cho người lựa chọn xóa hoặc không |  |   | |   |
| I.3 | Quản lý lớp thông tin tài sản trên bản đồ |  |  |  |   | |   |
| 49 | Thêm lớp dữ liệu bản đồ mới | QTHT | Cán bộ chọn bản đồ tài sản hiện tại để sử dụng. Hệ thống hiển thị bản đồ tài sản đã được chọn. | B | Đơn giản  | |   |
|  |  |  | Cán bộ tìm kiếm lớp dữ liệu tài sản cần hiển thị. Hệ thống cung cấp danh sách kết quả phù hợp với từ khóa tìm kiếm. |  |   | |   |
|  |  |  | Cán bộ thêm lớp dữ liệu tài sản vào bản đồ 2D, 3D. Hệ thống cập nhật và hiển thị lớp dữ liệu tài sản trên bản đồ. |  |   | |   |
| 50 | Quản lý các lớp thông tin | QTHT | Cán bộ chọn bản đồ tài sản hiện tại để sử dụng. Hệ thống hiển thị bản đồ tài sản đã được chọn. | B | Đơn giản  | |   |
|  |  |  | Cán bộ xem danh sách các lớp dữ liệu đang hiển thị trên bản đồ 2D, 3D. Hệ thống liệt kê đầy đủ các lớp dữ liệu hiện tại. |  |   | |   |
|  |  |  | Cán bộ cấu hình bật hoặc tắt các lớp dữ liệu không cần thiết. Hệ thống cập nhật bản đồ theo cấu hình đã thiết lập. |  |   | |   |
| 51 | Cập nhật dữ liệu tài sản trên bản đồ | Cán bộ | Cán bộ cập nhật dữ liệu thông qua thông tin lý trình và tọa độ. Hệ thống tự động điều chỉnh và lưu dữ liệu trên bản đồ 2D, 3D. | B | Trung bình  | |   |
|  |  |  | Cán bộ cập nhật dữ liệu bằng cách sửa đổi thông tin thuộc tính của tài sản. Hệ thống ghi nhận và cập nhật thông tin mới vào cơ sở dữ liệu. |  |   | |   |
|  |  |  | Cán bộ cập nhật dữ liệu bằng cách gán thông tin hàng loạt cho các tài sản. Hệ thống xử lý và áp dụng thông tin cập nhật cho các tài sản liên quan. |  |   | |   |
|  |  |  | Cán bộ cập nhật dữ liệu không gian bằng cách sử dụng công cụ dựng hình điểm, đường, hoặc vùng trên bản đồ. Hệ thống lưu lại các thay đổi và hiển thị dữ liệu không gian mới trên bản đồ 2D, 3D. |  |   | |   |
| 52 | Khai thác tài sản trên bản đồ | Cán bộ | Cán bộ xem lớp tài sản hiện có trên bản đồ 2D, 3D. Hệ thống hiển thị các lớp tài sản theo yêu cầu. | B | Trung bình  | |   |
|  |  |  | Cán bộ tìm kiếm tài sản trên bản đồ 2D, 3D theo thuộc tính. Hệ thống hiển thị các tài sản phù hợp với thông tin tìm kiếm. |  |   | |   |
|  |  |  | Cán bộ tìm kiếm tài sản trên bản đồ 2D, 3D theo không gian. Hệ thống hiển thị các tài sản trong phạm vi tìm kiếm không gian. |  |   | |   |
|  |  |  | Cán bộ định vị tài sản trên bản đồ 2D, 3D. Hệ thống xác định vị trí chính xác của tài sản và hiển thị trên bản đồ. |  |   | |   |
|  |  |  | Cán bộ đo khoảng cách giữa các tài sản trên bản đồ 2D, 3D. Hệ thống tính toán và hiển thị khoảng cách giữa các tài sản đã chọn. |  |   | |   |
|  |  |  | Cán bộ xuất ảnh bản đồ. Hệ thống tạo và lưu ảnh bản đồ theo yêu cầu của cán bộ. |  |   | |   |
| 53 | Định vị tài sản theo tuyến | Cán bộ | - Cán bộ chọn tuyến và nhập điểm đầu – điểm cuối hoặc chiều dài. Hệ thống tự động tính tọa độ giữa theo tuyến và hiển thị vị trí tài sản trên bản đồ | B | Đơn giản  | |   |
| II | Quản lý thiết bị trên sơ đồ mặt bằng |  |  |  |   | http://localhost:4000/mat-bang |   |
| 54 | Thêm thông tin thiết bị trên sơ đồ mặt bằng | Cán bộ | Cán bộ tìm kiếm thiết bị cần bổ sung vào hệ thống. Hệ thống hiển thị danh sách các thiết bị cần bổ sung. | B | Trung bình  | |   |
|  |  |  | Cán bộ chọn thiết bị cần thêm vào sơ đồ. Hệ thống hiển thị chi tiết thiết bị đã chọn để bổ sung. |  |   | |   |
|  |  |  | Cán bộ chọn vị trí trên sơ đồ mặt bằng để đặt thiết bị. Hệ thống hiển thị sơ đồ mặt bằng để xác định vị trí thiết bị. |  |   | |   |
|  |  |  | Cán bộ thêm mới tài sản trên sơ đồ mặt bằng. Hệ thống ghi nhận vị trí và thông tin tài sản mới trên sơ đồ. |  |   | |   |
| 55 | Cập nhật thiết bị trên sơ đồ bằng bằng | Cán bộ | Cán bộ cập nhật thông tin vị trí của thiết bị trên sơ đồ. Hệ thống ghi nhận và lưu thông tin vị trí mới của thiết bị. | B | Đơn giản  | |   |
|  |  |  | Cán bộ thay đổi thông tin thiết bị trên sơ đồ. Hệ thống cập nhật và lưu thông tin thiết bị mới. |  |   | |   |
|  |  |  | Cán bộ xóa thiết bị khỏi sơ đồ mặt bằng. Hệ thống loại bỏ thiết bị khỏi sơ đồ và cập nhật lại cơ sở dữ liệu. |  |   | |   |
| 56 | Khai thác tài sản, thiết bị trên sơ đồ mặt bằng | Cán bộ | Cán bộ hiển thị các tài sản, thiết bị trên sơ đồ mặt bằng. Hệ thống cung cấp các đối tượng tài sản, thiết bị trên sơ đồ với các vị trí chính xác. | B | Trung bình  | |   |
|  |  |  | Cán bộ zoom in, zoom out kết quả hiển thị trên sơ đồ mặt bằng. Hệ thống cho phép thay đổi tỷ lệ hiển thị để dễ dàng xem và tương tác với sơ đồ. |  |   | |   |
|  |  |  | Cán bộ xem thông tin tên tài sản khi di chuột qua các đối tượng. Hệ thống hiển thị tên tài sản khi di chuột qua từng đối tượng trên sơ đồ. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết khi click vào đối tượng. Hệ thống hiển thị thông tin chi tiết của tài sản, thiết bị khi Cán bộ click vào đối tượng trên sơ đồ. |  |   | |   |
| III | Quản lý tài sản trên bình đồ duỗi thẳng |  |  |  |   | |   |
| 57 | Hiển thị tài sản trên bình đồ duỗi thẳng | Cán bộ | Cán bộ hiển thị các tài sản dọc theo tuyến đường trên bình đồ duỗi thẳng. Hệ thống giúp Cán bộ dễ dàng quan sát và theo dõi vị trí tài sản dọc theo tuyến cao tốc. | B | Đơn giản  | |   |
| 58 | Tìm kiếm tài sản trên bình đồ | Cán bộ | Cán bộ tìm kiếm tài sản theo loại, mã tài sản hoặc lý trình trên bình đồ duỗi thẳng. Hệ thống hỗ trợ tìm kiếm nhanh chóng để xác định vị trí tài sản một cách dễ dàng. | B | Đơn giản  | |   |
| 59 | Xem chi tiết tài sản trên bình đồ | Cán bộ | Cán bộ xem thông tin chi tiết của từng tài sản khi nhấn vào các biểu tượng tương ứng trên bình đồ duỗi thẳng. Hệ thống hiển thị thông tin chi tiết của tài sản khi Cán bộ tương tác với các biểu tượng trên bình đồ. | B | Đơn giản  | |   |
| 60 | Xuất dữ liệu bình đồ duỗi thẳng | Cán bộ | Cán bộ xuất dữ liệu bình đồ duỗi thẳng dưới dạng file ảnh. Hệ thống cho phép Cán bộ lưu và xuất dữ liệu bình đồ dưới dạng file ảnh để sử dụng ngoài hệ thống. | B | Đơn giản  | |   |
| IV | Quản lý mô hình BIM |  |  |  |   | http://localhost:4000/bim |   |
| 61 | Tích hợp mô hình BIM | Cán bộ | - Cán bộ thực hiện tích hợp các file mô hình BIM (IFC). Hệ thống hiển thị form nhập liệu cho người dùng tích hợp. | B | Trung bình  | |   |
|  |  |  | - Cán bộ thực hiện tải mô hình BIM từ máy tính. Hệ thống hiển thị chức năng tải dữ liệu |  |   | |   |
|  |  |  | - Cán bộ kiểm tra và xác nhận tính toàn vẹn dữ liệu khi nhập mô hình mới. Hệ thống hiển thị thông báo đã xác nhận thành công. |  |   | |   |
|  |  |  | - Cán bộ xem lại kết quả tích hợp. Hệ thống hiển thị file mô hình BIM vừa tích hợp |  |   | |   |
| 62 | Sửa mô hình BIM | Cán bộ | -Cán bộ sửa tên và mô tả mô hình BIM trong hệ thống.Hệ thống hiển thị giao diện sửa thông tin | B | Đơn giản  | |   |
|  |  |  | Cán bộ lưu kết quả. Hệ thống hiển thị thông báo cập nhật thành công |  |   | |   |
| 63 | Xóa mô hình BIM | Cán bộ | - Cán bộ chọn xóa mô hình BIM. Hệ thống yêu cầu xác nhận thao tác 2 bước và ghi lại thông tin người thực hiện, thời gian, lý do xóa. | B | Đơn giản  | |   |
| 64 | Quản lý phiên bản mô hình | Cán bộ | Cán bộ chọn quản lý phiên bản. Hệ hống hiển thị các phiên bản mô hình đã lưu khi có thay đổi. | B | Trung bình  | |   |
|  |  |  | Cán bộ xem thông tin phiên bản. Hệ thống hiển thị chi tiết tên, người thực hiện, thời gian. |  |   | |   |
|  |  |  | Cán bộ xóa phiên bản lịch sử đã lưu, Hệ thống hiển thị thông báo xóa thành công |  |   | |   |
|  |  |  | Cán bộ khôi phục phiên bản mô hình BIM lịch sử. Hệ thống hiển thị thông báo phiên bản đã khôi phục thành công |  |   | |   |
| 65 | So sánh phiên bản mô hình | Cán bộ | Cán bộ chọn 2 phiên bản để so sánh trực quan.Hệ thống hiển thị các khác biệt về hình học, dữ liệu. | B | Đơn giản  | |   |
|  |  |  | Cán bộ đánh dấu và lưu kết quả so sánh. Hệ thống hiển thị kết quả lưu thành công |  |   | |   |
| 66 | Quản lý lớp hiển thị dữ liệu | Cán bộ | - Cán bộ bật/tắt các lớp dữ liệu trên mô hình BIM .Hệ thống lưu cấu hình lớp hiển thị theo cá nhân và hiển thị dữ liệu theo lớp dữ liệu | B | Đơn giản  | |   |
| 67 | Công cụ đo đạc và tương tác | Cán bộ | - Cán bộ chọn các công cụ đo khoảng cách, diện tích, thể tích trong không gian 3D.Hệ thống hiển thị công cụ cho người dùng thực hiện thao tác | B | Đơn giản  | |   |
| 68 | Tương tác với tài sản, thiết bị | Cán bộ | - Cán bộ chọn và tương tác với thiết bị trên mô hình BIM . Hệ thống hiển thị thông tin thuộc tính của thiết bị và liên kết tới thông tin thuộc tính lưu trữ trong CSDL tài sản | B | Đơn giản  | |   |
| 69 | Liên kết thông tin hồ sơ tài liệu của tài sản thiết bị | Cán bộ | Cán bộ chọn xem thông tin tài liệu, hồ sơ về tài sản/thiết bị trên mô hình BIM. Hệ thống hiển thị liên kết tới tài liệu, hồ sơ trong cơ sở dữ liệu | B | Đơn giản  | |   |
| 70 | Tìm kiếm tài sản trên mô hình | Cán bộ | - Người dùng nhập từ khóa tìm kiếm (mã tài sản, tên thiết bị, loại tài sản...), hệ thống lọc và highlight các đối tượng tương ứng trên mô hình BIM. | B | Đơn giản  | |   |
| 71 | Lọc hiển thị theo điều kiện thuộc tính | Cán bộ | - Cán bộ cấu hình các bộ lọc (ví dụ: tài sản đang bảo trì, tài sản chưa kiểm định...), hệ thống lọc và chỉ hiển thị đối tượng phù hợp trên mô hình. | B | Đơn giản  | |   |
| 72 | Gắn cảnh báo/ghi chú vào đối tượng | Cán bộ | - Cán bộ chọn một đối tượng BIM, thêm ghi chú hoặc cảnh báo (màu sắc, biểu tượng...). Hệ thống lưu và hiển thị cảnh báo đó trong các phiên xem mô hình tiếp theo. | B | Đơn giản  | |   |
| 73 | Trích xuất dữ liệu thống kê từ mô hình | Cán bộ | - Cán bộ quét dữ liệu BIM theo lớp hoặc loại tài sản và xuất ra bảng thống kê theo mẫu excel. Hệ thống hiển thị chức lưu file excel | B | Đơn giản  | |   |
| V | Nghiệp vụ quản lý tài sản |  |  |  |   | |   |
| V.1. | Quản lý thông tin tài sản |  |  |  |   | |   |
| 74 | Quản lý Biển báo | Cán bộ | Cán bộ tìm kiếm thông tin biển báo toàn văn hoặc theo vị trí, loại biển báo hoặc mã số. Hệ thống hỗ trợ tìm kiếm biển báo nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/bien-bao | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về biển báo, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin biển báo dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách biển báo ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu biển báo dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu biển báo từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin biển báo vào cơ sở dữ liệu. |  |   | |   |
| 75 | Quản lý Cầu | Cán bộ | Cán bộ tìm kiếm thông tin cầu theo toàn văn hoặc vị trí, loại cầu hoặc mã số. Hệ thống hỗ trợ tìm kiếm cầu nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/cau/lon |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về cầu, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin cầu dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách cầu ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu cầu dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu cầu từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin cầu vào cơ sở dữ liệu. |  |   | |   |
| 76 | Quản lý Cống dân sinh | Cán bộ | Cán bộ tìm kiếm thông tin cống dân sinh theo toàn văn hoặc vị trí, loại cống dân sinh hoặc mã số. Hệ thống hỗ trợ tìm kiếm cống dân sinh nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/cong |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về cống dân sinh, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin cống dân sinh dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách cống dân sinh ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu cống dân sinh dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu cống dân sinh từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin cống dân sinh vào cơ sở dữ liệu. |  |   | |   |
| 77 | Quản lý Cống thoát nước | Cán bộ | Cán bộ tìm kiếm thông tin cống thoát nước theo toàn văn hoặc theo vị trí, loại cống thoát nước hoặc mã số. Hệ thống hỗ trợ tìm kiếm cống thoát nước nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/cong |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về cống thoát nước, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin cống thoát nước dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách cống thoát nước ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu cống thoát nước dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu cống thoát nước từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin cống thoát nước vào cơ sở dữ liệu. |  |   | |   |
| 78 | Quản lý Cột KM | Cán bộ | Cán bộ tìm kiếm thông tin cột KM theo  toàn văn hoặc theo vị trí, loại cột KM hoặc mã số. Hệ thống hỗ trợ tìm kiếm cột KM nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/cot-km |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về cột KM, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin cột KM dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách cột KM ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu cột KM dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu cột KM từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin cột KM vào cơ sở dữ liệu. |  |   | |   |
| 79 | Quản lý Cột GPMB, MLG | Cán bộ | Cán bộ tìm kiếm thông tin cột GPMB theo toàn văn hoặc theo  vị trí, loại cột GPMB hoặc mã số. Hệ thống hỗ trợ tìm kiếm cột GPMB nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/cot-gpmb | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về cột GPMB, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin cột GPMB dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách cột GPMB ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu cột GPMB dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu cột GPMB từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin cột GPMB vào cơ sở dữ liệu. |  |   | |   |
| 80 | Quản lý Dải phân cách | Cán bộ | Cán bộ tìm kiếm thông tin dải phân cách theo toàn văn hoặc theo  vị trí, loại dải phân cách hoặc mã số. Hệ thống hỗ trợ tìm kiếm dải phân cách nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/dai-phan-cach |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về dải phân cách, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin dải phân cách dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách dải phân cách ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu dải phân cách dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu dải phân cách từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin dải phân cách vào cơ sở dữ liệu. |  |   | |   |
| 81 | Quản lý Đất hạ tầng | Cán bộ | Cán bộ tìm kiếm thông tin đât hạ tầng theo toàn văn hoặc theo vị trí, loại đât hạ tầng hoặc mã số. Hệ thống hỗ trợ tìm kiếm đât hạ tầng nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/dat-ha-tang | 21:53:03 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về đât hạ tầng, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin đât hạ tầng dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách đât hạ tầng ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu đât hạ tầng dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu đât hạ tầng từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin đât hạ tầng vào cơ sở dữ liệu. |  |   | |   |
| 82 | Quản lý Đường gom | Cán bộ | Cán bộ tìm kiếm thông tin đuòng gom theo toàn văn hoặc theo vị trí, loại đuòng gom hoặc mã số. Hệ thống hỗ trợ tìm kiếm đuòng gom nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/duong-bo/duong-gom | 21:53:03 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về đuòng gom, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin đuòng gom dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách đuòng gom ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu đuòng gom dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu đuòng gom từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin đuòng gom vào cơ sở dữ liệu. |  |   | |   |
| 83 | Quản lý Giá long môn | Cán bộ | Cán bộ tìm kiếm thông tin giá long môn theo theo toàn văn hoặc theo vị trí, loại giá long môn hoặc mã số. Hệ thống hỗ trợ tìm kiếm giá long môn nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/gia-long-mon |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về giá long môn, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin giá long môn dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách giá long môn ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu giá long môn dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu giá long môn từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin giá long môn vào cơ sở dữ liệu. |  |   | |   |
| 84 | Quản lý Hàng rào bảo vệ | Cán bộ | Cán bộ tìm kiếm thông tin hàng lang bảo vệ theo toàn văn hoặc theo  vị trí, loại hàng lang bảo vệ hoặc mã số. Hệ thống hỗ trợ tìm kiếm hàng lang bảo vệ nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/hang-rao-bao-ve | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về hàng lang bảo vệ, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin hàng lang bảo vệ dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách hàng lang bảo vệ ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu hàng lang bảo vệ dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu hàng lang bảo vệ từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin hàng lang bảo vệ vào cơ sở dữ liệu. |  |   | |   |
| 85 | Quản lý Hàng rào chống chói | Cán bộ | Cán bộ tìm kiếm thông tin hàng rào chống chói theo toàn văn hoặc theo vị trí, loại hàng rào chống chói hoặc mã số. Hệ thống hỗ trợ tìm kiếm hàng rào chống chói nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/hang-rao-chong-choi | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về hàng rào chống chói, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin hàng rào chống chói dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách hàng rào chống chói ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu hàng rào chống chói dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu hàng rào chống chói từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin hàng rào chống chói vào cơ sở dữ liệu. |  |   | |   |
| 86 | Quản lý Hầm | Cán bộ | Cán bộ tìm kiếm thông tin hầm theo toàn văn hoặc theo vị trí, loại hầm hoặc mã số. Hệ thống hỗ trợ tìm kiếm hầm nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/ham |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về hầm, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin hầm dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách hầm ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu hầm dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu hầm từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin hầm vào cơ sở dữ liệu. |  |   | |   |
| 87 | Quản lý Hố ga | Cán bộ | Cán bộ tìm kiếm thông tin hố ga theo toàn văn hoặc theo vị trí, loại hố ga hoặc mã số. Hệ thống hỗ trợ tìm kiếm hố ga nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/ho-ga |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về hố ga, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin hố ga dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách hố ga ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu hố ga dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu hố ga từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin hố ga vào cơ sở dữ liệu. |  |   | |   |
| 88 | Quản lý Hệ thống chiếu sáng | Cán bộ | Cán bộ tìm kiếm thông tin hệ thống chiếu sáng theo toàn văn hoặc theo vị trí, loại hệ thống chiếu sáng hoặc mã số. Hệ thống hỗ trợ tìm kiếm hệ thống chiếu sáng nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/he-thong-chieu-sang | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về hệ thống chiếu sáng, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin hệ thống chiếu sáng dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách hệ thống chiếu sáng ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu hệ thống chiếu sáng dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu hệ thống chiếu sáng từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin hệ thống chiếu sáng vào cơ sở dữ liệu. |  |   | |   |
| 89 | Quản lý Hệ thống điện | Cán bộ | Cán bộ tìm kiếm thông tin hệ thống điện  theo toàn văn hoặc theo vị trí, loại hệ thống điện hoặc mã số. Hệ thống hỗ trợ tìm kiếm hệ thống điện nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/he-thong-dien | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về hệ thống điện, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin hệ thống điện dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách hệ thống điện ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu hệ thống điện dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu hệ thống điện từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin hệ thống điện vào cơ sở dữ liệu. |  |   | |   |
| 90 | Quản lý Hệ thống ITS | Cán bộ | Cán bộ tìm kiếm thông tin hệ thống ITS theo toàn văn hoặc theo vị trí, loại hệ thống ITS hoặc mã số. Hệ thống hỗ trợ tìm kiếm hệ thống ITS nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/he-thong-its | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về hệ thống ITS, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin hệ thống ITS dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách hệ thống ITS ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu hệ thống ITS dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu hệ thống ITS từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin hệ thống ITS vào cơ sở dữ liệu. |  |   | |   |
| 91 | Quản lý Kho bãi | Cán bộ | Cán bộ tìm kiếm thông tin kho bãi theo toàn văn hoặc theo vị trí, loại kho bãi hoặc mã số. Hệ thống hỗ trợ tìm kiếm kho bãi nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/kho-bai | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về kho bãi, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin kho bãi dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách kho bãi ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu kho bãi dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu kho bãi từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin kho bãi vào cơ sở dữ liệu. |  |   | |   |
| 92 | Quản lý Mái dốc | Cán bộ | Cán bộ tìm kiếm thông tin mái dốc theo toàn văn hoặc theo vị trí, loại mái dốc hoặc mã số. Hệ thống hỗ trợ tìm kiếm mái dốc nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/mai-doc | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về mái dốc, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin mái dốc dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ hiển thị chi tiết thông tin về mái dốc, bao gồm hình ảnh, mô tả và tình trạng. Hệ thống hiển thị thông tin chi tiết của từng mái dốc khi Cán bộ cần tham khảo. |  |   | |   |
|  |  |  | Cán bộ xuất danh sách mái dốc ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu mái dốc dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu mái dốc từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin mái dốc vào cơ sở dữ liệu. |  |   | |   |
| 93 | Quản lý Mặt đường | Cán bộ | Cán bộ tìm kiếm thông tin mặt đường theo toàn văn hoặc theo vị trí, loại mặt đường hoặc mã số. Hệ thống hỗ trợ tìm kiếm mặt đường nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/mat-duong | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về mặt đường, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin mặt đường dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách mặt đường ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu mặt đường dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu mặt đường từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin mặt đường vào cơ sở dữ liệu. |  |   | |   |
| 94 | Quản lý Nút giao đường bộ | Cán bộ | Cán bộ tìm kiếm thông tin nút giao đường bộ theo toàn văn hoặc theo vị trí, loại nút giao đường bộ hoặc mã số. Hệ thống hỗ trợ tìm kiếm nút giao đường bộ nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/nut-giao |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về nút giao đường bộ, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin nút giao đường bộ dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách nút giao đường bộ ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu nút giao đường bộ dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu nút giao đường bộ từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin nút giao đường bộ vào cơ sở dữ liệu. |  |   | |   |
| 95 | Quản lý Phương tiện đi lại | Cán bộ | Cán bộ tìm kiếm thông tin phương tiện đi lại theo toàn văn hoặc theo vị trí, loại phương tiện đi lại hoặc mã số. Hệ thống hỗ trợ tìm kiếm phương tiện đi lại nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/tai-san/phuong-tien-di-lai | 21:53:03 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về phương tiện đi lại, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin phương tiện đi lại dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách phương tiện đi lại ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu phương tiện đi lại dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu phương tiện đi lại từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin phương tiện đi lại vào cơ sở dữ liệu. |  |   | |   |
| 96 | Quản lý Rãnh dọc | Cán bộ | Cán bộ tìm kiếm thông tin rảnh dọc theo toàn văn hoặc theo vị trí, loại rảnh dọc hoặc mã số. Hệ thống hỗ trợ tìm kiếm rảnh dọc nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/ranh-doc | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về rảnh dọc, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin rảnh dọc dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách rảnh dọc ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu rảnh dọc dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu rảnh dọc từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin rảnh dọc vào cơ sở dữ liệu. |  |   | |   |
| 97 | Quản lý Rào chắn ồn | Cán bộ | Cán bộ tìm kiếm thông tin rào chắn ồn theo toàn văn hoặc theo vị trí, loại rào chắn ồn hoặc mã số. Hệ thống hỗ trợ tìm kiếm rào chắn ồn nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/dac-thu/rao-chan-on |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về rào chắn ồn, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin rào chắn ồn dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách rào chắn ồn ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu rào chắn ồn dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu rào chắn ồn từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin rào chắn ồn vào cơ sở dữ liệu. |  |   | |   |
| 98 | Quản lý Tôn hộ lan | Cán bộ | Cán bộ tìm kiếm thông tin Tôn hộ lan theo toàn văn hoặc theo vị trí, loại Tôn hộ lan hoặc mã số. Hệ thống hỗ trợ tìm kiếm Tôn hộ lan nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/ton-ho-lan | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về Tôn hộ lan, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin Tôn hộ lan dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách Tôn hộ lan ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu Tôn hộ lan dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu Tôn hộ lan từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin Tôn hộ lan vào cơ sở dữ liệu. |  |   | |   |
| 99 | Quản lý Thảm cỏ cây xanh | Cán bộ | Cán bộ tìm kiếm thông tin thảm cỏ cây xanh theo toàn văn hoặc theo vị trí, loại thảm cỏ cây xanh hoặc mã số. Hệ thống hỗ trợ tìm kiếm thảm cỏ cây xanh nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/tham-co | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về thảm cỏ cây xanh, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin thảm cỏ cây xanh dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách thảm cỏ cây xanh ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu thảm cỏ cây xanh dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu thảm cỏ cây xanh từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin thảm cỏ cây xanh vào cơ sở dữ liệu. |  |   | |   |
| 100 | Quản lý Thiết bị cân xe | Cán bộ | Cán bộ tìm kiếm thông tin thiết bị cân xe theo toàn văn hoặc theo vị trí, loại thiết bị cân xe hoặc mã số. Hệ thống hỗ trợ tìm kiếm thiết bị cân xe nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/dac-thu/tram-can-xe |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về thiết bị cân xe, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin thiết bị cân xe dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách thiết bị cân xe ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu thiết bị cân xe dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu thiết bị cân xe từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin thiết bị cân xe vào cơ sở dữ liệu. |  |   | |   |
| 101 | Quản lý Thiết bị O&M | Cán bộ | Cán bộ tìm kiếm thông tin thiết bị O&M theo toàn văn hoặc theo vị trí, loại thiết bị O&M hoặc mã số. Hệ thống hỗ trợ tìm kiếm thiết bị O&M nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/tai-san/thiet-bi-om | 21:53:03 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về thiết bị O&M, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin thiết bị O&M dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách thiết bị O&M ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu thiết bị O&M dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu thiết bị O&M từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin thiết bị O&M vào cơ sở dữ liệu. |  |   | |   |
| 102 | Quản lý Thiết bị thí nghiệm | Cán bộ | Cán bộ tìm kiếm thông tin thiết bị thí nghiệm theo toàn văn hoặc theo vị trí, loại thiết bị thí nghiệm hoặc mã số. Hệ thống hỗ trợ tìm kiếm thiết bị thí nghiệm nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/thiet-bi-thi-nghiem | 22:15:38 29/5/2026 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về thiết bị thí nghiệm, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin thiết bị thí nghiệm dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách thiết bị thí nghiệm ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu thiết bị thí nghiệm dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu thiết bị thí nghiệm từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin thiết bị thí nghiệm vào cơ sở dữ liệu. |  |   | |   |
| 103 | Quản lý Trạm dừng nghỉ | Cán bộ | Cán bộ tìm kiếm thông tin trạm dừng nghỉ theo toàn văn hoặc theo vị trí, loại trạm dừng nghỉ hoặc mã số. Hệ thống hỗ trợ tìm kiếm trạm dừng nghỉ nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/dac-thu/tram-dung-nghi |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về trạm dừng nghỉ, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin trạm dừng nghỉ dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách trạm dừng nghỉ ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu trạm dừng nghỉ dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu trạm dừng nghỉ từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin trạm dừng nghỉ vào cơ sở dữ liệu. |  |   | |   |
| 104 | Quản lý Trạm thu phí | Cán bộ | Cán bộ tìm kiếm thông tin trạm thu phí theo toàn văn hoặc theo vị trí, loại trạm thu phí hoặc mã số. Hệ thống hỗ trợ tìm kiếm trạm thu phí nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/dac-thu/tram-thu-phi |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về trạm thu phí, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin trạm thu phí dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách trạm thu phí ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu trạm thu phí dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu trạm thu phí từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin trạm thu phí vào cơ sở dữ liệu. |  |   | |   |
| 105 | Quản lý Trung tâm điều hành | Cán bộ | Cán bộ tìm kiếm thông tin trung tâm điều hành theo toàn văn hoặc theo vị trí, loại trung tâm điều hành hoặc mã số. Hệ thống hỗ trợ tìm kiếm trung tâm điều hành nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/dac-thu/trung-tam-dieu-hanh |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về trung tâm điều hành, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin trung tâm điều hành dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách trung tâm điều hành ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu trung tâm điều hành dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu trung tâm điều hành từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin trung tâm điều hành vào cơ sở dữ liệu. |  |   | |   |
| 106 | Quản lý Vạch kẻ đường | Cán bộ | Cán bộ tìm kiếm thông tin vạch kẻ đường theo toàn văn hoặc theo vị trí, loại vạch kẻ đường hoặc mã số. Hệ thống hỗ trợ tìm kiếm vạch kẻ đường nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/phu-tro/vach-ke |   |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về vạch kẻ đường, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin vạch kẻ đường dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách vạch kẻ đường ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu vạch kẻ đường dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu vạch kẻ đường từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin vạch kẻ đường vào cơ sở dữ liệu. |  |   | |   |
| 107 | Quản lý thiết bị văn phòng, thiết bị CNTT | Cán bộ | Cán bộ tìm kiếm thông tin thiết bị văn phòng, thiết bị CNTT theo vị trí, loại thiết bị văn phòng, thiết bị CNTT hoặc mã số. Hệ thống hỗ trợ tìm kiếm thiết bị văn phòng, thiết bị CNTT nhanh chóng và chính xác theo các tiêu chí đã chọn. | B | Trung bình  | http://localhost:4000/tai-san/thiet-bi-van-phong | 21:53:03 |
|  |  |  | Cán bộ thêm mới hoặc chỉnh sửa thông tin về thiết bị văn phòng, thiết bị CNTT, tình trạng hoạt động, và vị trí. Hệ thống cho phép cập nhật thông tin thiết bị văn phòng, thiết bị CNTT dễ dàng và hiệu quả. |  |   | |   |
|  |  |  | Cán bộ xem thông tin chi tiết đối tượng. Hệ thống hiển thị form thông tin đầy đủ dữ liệu các trường thông tin, hình ảnh của đối tượng |  |   | |   |
|  |  |  | Cán bộ xuất danh sách thiết bị văn phòng, thiết bị CNTT ra file Excel để lưu trữ hoặc chia sẻ. Hệ thống hỗ trợ xuất dữ liệu thiết bị văn phòng, thiết bị CNTT dưới dạng file Excel cho mục đích báo cáo hoặc chia sẻ. |  |   | |   |
|  |  |  | Cán bộ nhập dữ liệu thiết bị văn phòng, thiết bị CNTT từ file Excel để cập nhật vào hệ thống. Hệ thống hỗ trợ nhập dữ liệu từ file Excel để dễ dàng bổ sung thông tin thiết bị văn phòng, thiết bị CNTT vào cơ sở dữ liệu. |  |   | |   |
| 108 | Quản lý cấu hình cảnh báo tài sản | QTHT | Quản trị hệ thống cấu hình trường giá trị và điều kiện cảnh báo cần bảo trì theo từng loại tài sản. Hệ thống lưu thông tin cấu hình | B | Trung bình  | http://localhost:4000/he-thong/cau-hinh-canh-bao | 21:53:03 |
|  |  |  | Quản trị hệ thống cấu hình trường giá trị và điều kiện cảnh báo cần kiểm tra theo từng loại tài sản. Hệ thống lưu thông tin cấu hình |  |   | |   |
|  |  |  | Quản trị hệ thống cấu hình trường giá trị và điều kiện cảnh báo cần thanh lý theo từng loại tài sản. Hệ thống lưu thông tin cấu hình |  |   | |   |
|  |  |  | Quản lý hệ thống cấu hình thông báo cho người hoặc phòng ban phụ trách, Hệ thống lưu thông tin cấu hình |  |   | |   |
| IV.2. | Quản lý tài sản thanh lý |  |  |  |   | |   |
| 109 | Khởi tạo yêu cầu thanh lý tài sản | Cán bộ | Cán bộ chọn chức năng "Tạo yêu cầu thanh lý". Hệ thống hiển thị giao diện để tạo yêu cầu thanh lý tài sản. | B | Trung bình  | http://localhost:4000/tai-san/thanh-ly |   |
|  |  |  | Cán bộ chọn tài sản cần thanh lý từ danh mục tài sản. Hệ thống liệt kê các tài sản trong danh mục để Cán bộ dễ dàng lựa chọn. |  |   | |   |
|  |  |  | Cán bộ nhập lý do thanh lý (hết hạn sử dụng, hư hỏng nặng, không còn phù hợp). Hệ thống yêu cầu Cán bộ cung cấp lý do cụ thể để xác nhận yêu cầu thanh lý. |  |   | |   |
|  |  |  | Cán bộ gửi yêu cầu thanh lý cho Cán bộ phê duyệt. Hệ thống chuyển yêu cầu thanh lý đến Cán bộ để phê duyệt hoặc từ chối. |  |   | |   |
| 110 | Phê duyệt yêu cầu thanh lý tài sản | Cán bộ | Cán bộ xem danh sách các yêu cầu thanh lý đang chờ phê duyệt. Hệ thống hiển thị tất cả các yêu cầu thanh lý chưa được phê duyệt để Cán bộ có thể kiểm tra. | B | Trung bình  | http://localhost:4000/tai-san/thanh-ly |   |
|  |  |  | Cán bộ kiểm tra thông tin về tài sản, lý do thanh lý và tình trạng hiện tại. Hệ thống cung cấp chi tiết thông tin về tài sản, lý do và tình trạng của từng yêu cầu thanh lý. |  |   | |   |
|  |  |  | Cán bộ phê duyệt hoặc từ chối yêu cầu. Hệ thống cho phép Cán bộ quyết định phê duyệt hoặc từ chối yêu cầu thanh lý dựa trên các thông tin đã kiểm tra. |  |   | |   |
|  |  |  | Cán bộ ghi nhận các thông tin bổ sung (ví dụ: đơn vị thanh lý, chi phí thanh lý). Hệ thống yêu cầu ghi chú thêm các thông tin cần thiết để hoàn tất quy trình thanh lý tài sản. |  |   | |   |
| 111 | Cập nhật thông tin tài sản thanh lý | Cán bộ | Cán bộ chọn tài sản đã được phê duyệt thanh lý. Hệ thống hiển thị danh sách các tài sản đã được phê duyệt để Cán bộ lựa chọn tài sản cần thanh lý. | B | Đơn giản  | |   |
|  |  |  | Cán bộ cập nhật trạng thái tài sản thành "Đang thanh lý" hoặc "Đã thanh lý". Hệ thống cho phép Cán bộ thay đổi trạng thái tài sản tùy theo tiến độ thanh lý. |  |   | |   |
|  |  |  | Cán bộ ghi nhận thông tin về quy trình thanh lý (thời gian, đơn vị xử lý, giá trị còn lại của tài sản). Hệ thống yêu cầu ghi lại các thông tin quan trọng như thời gian thanh lý, đơn vị xử lý và giá trị còn lại của tài sản sau thanh lý. |  |   | |   |
| 112 | Xuất báo cáo thanh lý tài sản | Cán bộ | Cán bộ chọn chức năng "Xuất báo cáo thanh lý". Hệ thống hiển thị các tùy chọn báo cáo để Cán bộ có thể chọn yêu cầu xuất báo cáo thanh lý. | B | Đơn giản  | http://localhost:4000/tai-san/thanh-ly |   |
|  |  |  | Cán bộ chọn thời gian, loại tài sản, hoặc tình trạng tài sản để lọc báo cáo. Hệ thống cho phép Cán bộ lọc dữ liệu báo cáo theo các tiêu chí như thời gian, loại tài sản, hoặc tình trạng tài sản. |  |   | |   |
|  |  |  | Cán bộ xuất báo cáo dưới dạng Excel. Hệ thống tạo và xuất báo cáo thanh lý theo yêu cầu của Cán bộ dưới định dạng file Excel để lưu trữ hoặc chia sẻ. |  |   | |   |
| 113 | Lưu trữ hồ sơ thanh lý tài sản | Cán bộ | Cán bộ chọn chức năng "Lưu trữ hồ sơ thanh lý". Hệ thống hiển thị giao diện để Cán bộ lưu trữ hồ sơ thanh lý tài sản. | B | Đơn giản  | http://localhost:4000/tai-san/thanh-ly |   |
|  |  |  | Cán bộ nhập thông tin bổ sung về hồ sơ (nếu cần) và lưu trữ. Cán bộ có thể nhập các thông tin bổ sung như chi phí thanh lý, đơn vị xử lý hoặc bất kỳ thông tin liên quan nào. Hệ thống tự động lưu trữ hồ sơ thanh lý tài sản trong CSDL. Sau khi thông tin được nhập, hệ thống tự động lưu trữ hồ sơ thanh lý vào cơ sở dữ liệu để phục vụ cho việc tra cứu sau này. |  |   | |   |
| 114 | Theo dõi trạng thái thanh lý tài sản | Cán bộ | Cán bộ chọn danh mục "Theo dõi thanh lý". Hệ thống hiển thị danh mục các tài sản đang trong quá trình thanh lý hoặc đã hoàn thành. | B | Đơn giản  | http://localhost:4000/tai-san/thanh-ly |   |
|  |  |  | Cán bộ xem danh sách các tài sản này, bao gồm thông tin chi tiết về tiến trình thanh lý và trạng thái hiện tại của từng tài sản. |  |   | |   |
|  |  |  | Cán bộ có thể cập nhật tiến trình nếu có thay đổi, ví dụ như thay đổi trạng thái từ "Đang thanh lý" sang "Đã thanh lý" hoặc bổ sung thông tin về thời gian và đơn vị xử lý. |  |   | |   |
| V.3. | Quản lý tài sản thanh hủy |  |  |  |   | |   |
| 115 | Khởi tạo yêu cầu Thanh hủy tài sản | Cán bộ | Cán bộ chọn chức năng "Tạo yêu cầu Thanh hủy". Hệ thống hiển thị giao diện để tạo yêu cầu thanh hủy tài sản. | B | Trung bình  | |   |
|  |  |  | Cán bộ chọn tài sản cần thanh hủy từ danh mục tài sản có sẵn trong hệ thống. |  |   | |   |
|  |  |  | Cán bộ nhập lý do thanh hủy (ví dụ: hết hạn sử dụng, hư hỏng nặng, không còn phù hợp). |  |   | |   |
|  |  |  | Cán bộ gửi yêu cầu thanh hủy cho Cán bộ phê duyệt. Hệ thống thông báo rằng yêu cầu đã được gửi và chờ phê duyệt từ quản lý. |  |   | |   |
| 116 | Phê duyệt yêu cầu Thanh hủy tài sản | Cán bộ | Cán bộ xem danh sách các yêu cầu Thanh hủy đang chờ phê duyệt trong hệ thống. | B | Trung bình  | |   |
|  |  |  | Cán bộ kiểm tra thông tin chi tiết về tài sản, lý do Thanh hủy và tình trạng hiện tại của tài sản. |  |   | |   |
|  |  |  | Cán bộ phê duyệt hoặc từ chối yêu cầu thanh hủy dựa trên thông tin đã kiểm tra. |  |   | |   |
|  |  |  | Cán bộ ghi nhận các thông tin bổ sung (ví dụ: đơn vị Thanh hủy, chi phí Thanh hủy) nếu cần thiết. Hệ thống lưu lại các thông tin này để phục vụ quản lý sau này. |  |   | |   |
| 117 | Cập nhật thông tin tài sản Thanh hủy | Cán bộ | Cán bộ chọn tài sản đã được phê duyệt Thanh hủy từ danh sách. Hệ thống hiển thị danh sách các tài sản đã được phê duyệt Thanh hủy để Cán bộ lựa chọn. | B | Đơn giản  | |   |
|  |  |  | Cán bộ cập nhật trạng thái tài sản thành "Đang Thanh hủy" hoặc "Đã Thanh hủy". Hệ thống tự động cập nhật trạng thái tài sản theo lựa chọn của Cán bộ . |  |   | |   |
|  |  |  | Cán bộ ghi nhận thông tin về quy trình Thanh hủy, bao gồm thời gian, đơn vị xử lý và giá trị còn lại của tài sản. Hệ thống lưu trữ thông tin quy trình Thanh hủy vào cơ sở dữ liệu để theo dõi và truy xuất sau này. |  |   | |   |
| 118 | Xuất báo cáo Thanh hủy tài sản | Cán bộ | Cán bộ chọn chức năng "Xuất báo cáo Thanh hủy" trên giao diện hệ thống. Hệ thống hiển thị các lựa chọn để Cán bộ có thể chọn thời gian, loại tài sản hoặc tình trạng tài sản để lọc báo cáo. | B | Đơn giản  | |   |
|  |  |  | Cán bộ lựa chọn các tiêu chí cần thiết như thời gian, loại tài sản hoặc tình trạng tài sản, và hệ thống thực hiện lọc báo cáo theo các tiêu chí đã chọn. |  |   | |   |
|  |  |  | Cán bộ thực hiện xuất dữ liệu dạng excel. Hệ thống thực hiện xuất báo cáo dưới dạng file Excel và cung cấp cho Cán bộ tải về hoặc lưu trữ theo yêu cầu. |  |   | |   |
| 119 | Lưu trữ hồ sơ Thanh hủy tài sản | Cán bộ | Cán bộ chọn chức năng "Lưu trữ hồ sơ Thanh hủy" trên giao diện hệ thống, và hệ thống hiển thị các trường thông tin cần nhập để Cán bộ bổ sung (nếu cần). | B | Đơn giản  | |   |
|  |  |  | Cán bộ nhập thông tin bổ sung về hồ sơ Thanh hủy tài sản (nếu có) và nhấn nút lưu trữ, và hệ thống ghi nhận và lưu trữ thông tin vào cơ sở dữ liệu. |  |   | |   |
| 120 | Theo dõi trạng thái Thanh hủy tài sản | Cán bộ | Cán bộ chọn danh mục "Theo dõi Thanh hủy" trên giao diện hệ thống, và hệ thống hiển thị danh sách các tài sản đang trong quá trình Thanh hủy hoặc đã hoàn thành. | B | Đơn giản  | |   |
|  |  |  | Cán bộ xem thông tin về các tài sản và tiến trình của chúng trong danh sách, và hệ thống cung cấp thông tin chi tiết về tình trạng Thanh hủy của từng tài sản. |  |   | |   |
|  |  |  | Cán bộ cập nhật tiến trình Thanh hủy nếu có thay đổi, và hệ thống tự động lưu lại các thay đổi vào cơ sở dữ liệu, cập nhật trạng thái của tài sản. |  |   | |   |
| V.4. | Quản lý kiểm kê tài sản |  |  |  |   | http://localhost:4000/tai-san/kiem-ke |   |
| 121 | Lập kế hoạch kiểm kê tài sản | Cán bộ | Cán bộ lập kế hoạch kiểm kê tài sản định kỳ hoặc theo yêu cầu và hệ thống cung cấp giao diện để nhập thông tin về phạm vi, thời gian và tài sản cần kiểm kê. | B | Đơn giản  | http://localhost:4000/tai-san/kiem-ke | 21:53:03 |
|  |  |  | Cán bộ nhập thông tin về phạm vi, thời gian và tài sản cần kiểm kê và hệ thống lưu trữ thông tin và sẵn sàng cho các bước tiếp theo. |  |   | |   |
|  |  |  | Cán bộ lưu và phân công nhiệm vụ cho các nhân sự liên quan và hệ thống tự động phân bổ công việc cho các nhân sự đã được chỉ định. |  |   | |   |
| 122 | Tạo phiếu kiểm kê tài sản | Cán bộ | Cán bộ chọn chức năng phiếu kiểm kê. Hệ thống hiển thị danh sách phiếu kiểm kê cho các tài sản trong kế hoạch | B | Đơn giản  | http://localhost:4000/tai-san/kiem-ke | 21:53:03 |
|  |  |  | Cán bộ xem thông tin phiếu. Hệ thống hiển thị phiếu kiểm kê bao gồm thông tin tài sản: tên, vị trí, tình trạng và Cán bộ có thể xem hoặc chỉnh sửa nếu cần. |  |   | |   |
|  |  |  | Cán bộ in hoặc xuất phiếu kiểm kê và hệ thống cung cấp file xuất dưới dạng PDF hoặc Excel để phục vụ kiểm tra thực địa. |  |   | |   |
| 123 | Thực hiện kiểm kê tài sản thực địa | Cán bộ | Cán bộ kiểm tra tài sản thực tế trên cao tốc và hệ thống cung cấp thông tin tài sản từ phiếu kiểm kê để so sánh. | B | Trung bình  | http://localhost:4000/tai-san/kiem-ke | 21:53:03 |
|  |  |  | Cán bộ kiểm tra đối chiếu thông tin tài sản với phiếu kiểm kê (số lượng, tình trạng) và hệ thống hiển thị dữ liệu cần thiết để kiểm tra. |  |   | |   |
|  |  |  | Cán bộ kiểm tra cập nhật kết quả kiểm tra lên hệ thống hoặc ghi lại vào phiếu giấy và hệ thống lưu trữ kết quả kiểm tra trong cơ sở dữ liệu. |  |   | |   |
|  |  |  | Cán bộ kiểm tra lưu thông tin kiểm kê hoặc ghi nhận vào phiếu kiểm kê và hệ thống tự động cập nhật dữ liệu và ghi nhận vào hệ thống. |  |   | |   |
| 124 | So sánh kết quả kiểm kê | Cán bộ | Cán bộ chọn chức năng so sánh dữ liệu kiểm kê thực tế với dữ liệu có trên hệ thống. Hệ thống hiển thị điều kiện lọc cho cán bộ lựa chọn | B | Đơn giản  | http://localhost:4000/tai-san/kiem-ke | 21:53:03 |
|  |  |  | Cán bộ chọn điều kiện lọc và thực hiện so sánh. Hệ thống hiển thị kết quả so sánh tình trạng, số lượng, vị trí của tài sản, kết quả chênh lệch |  |   | |   |
|  |  |  | Cán bộ xem kết quả so sánh và quyết định xử lý sai lệch (nếu có) và hệ thống lưu trữ quyết định của Cán bộ vào cơ sở dữ liệu. |  |   | |   |
| 125 | Cập nhật dữ liệu sau kiểm kê | Cán bộ | Cán bộ cập nhật dữ liệu tài sản sau kiểm kê và hệ thống cung cấp giao diện để chỉnh sửa thông tin. | B | Trung bình  | http://localhost:4000/tai-san/kiem-ke | 21:53:03 |
|  |  |  | Cán bộ chọn tài sản có sai lệch và cập nhật số liệu về tình trạng, số lượng của tài sản. |  |   | |   |
|  |  |  | Cán bộ lưu thông tin đã chỉnh sửa vào hệ thống và hệ thống lưu trữ các thay đổi trong cơ sở dữ liệu. |  |   | |   |
|  |  |  | Cán bộ ghi nhận lý do chênh lệch (mất mát, hư hỏng) và hệ thống lưu trữ lý do chênh lệch cùng với thông tin tài sản đã chỉnh sửa. |  |   | |   |
| 126 | Báo cáo kết quả kiểm kê | Cán bộ | Cán bộ chọn chức năng báo cáo kết quả kiểm kê. Hệ thống hiển thị báo cáo kết quả kiểm kê, bao gồm thông tin về tài sản, tình trạng, số lượng và các sai lệch (nếu có). | B | Đơn giản  | http://localhost:4000/tai-san/kiem-ke | 21:53:03 |
|  |  |  | Cán bộ lọc thông tin theo tuyến đường hoặc tài sản và hệ thống cung cấp các tùy chọn lọc phù hợp. |  |   | |   |
|  |  |  | Cán bộ xuất báo cáo dưới dạng PDF/Excel và hệ thống cho phép gửi báo cáo cho cấp quản lý. |  |   | |   |
| 127 | Quản lý lịch sử kiểm kê | Cán bộ | Cán bộ lưu trữ và quản lý lịch sử kiểm kê tài sản và hệ thống tự động lưu trữ thông tin về các đợt kiểm kê trong cơ sở dữ liệu. | B | Trung bình  | http://localhost:4000/tai-san/kiem-ke | 21:53:03 |
|  |  |  | Cán bộ xem lại các đợt kiểm kê trước đây và hệ thống cung cấp giao diện để tra cứu thông tin lịch sử kiểm kê. |  |   | |   |
|  |  |  | Cán bộ tra cứu chi tiết từng đợt kiểm kê và kết quả và hệ thống hiển thị thông tin chi tiết về tài sản, tình trạng và kết quả kiểm kê. |  |   | |   |
|  |  |  | Cán bộ sử dụng thông tin lịch sử kiểm kê để đối chiếu và kiểm tra các đợt kiểm kê cũ khi cần và hệ thống cho phép so sánh các dữ liệu kiểm kê cũ với dữ liệu hiện tại. |  |   | |   |
| 128 | Đề xuất xử lý tài sản sau kiểm kê | Cán bộ | Cán bộ đề xuất phương án xử lý tài sản sau kiểm kê. Hệ thống hiển thị giao diện xử lý | B | Trung bình  | |   |
|  |  |  | Cán bộ chọn tài sản cần xử lý và phương án: sửa chữa, thay thế, hoặc thanh lý. Hệ thống hiển thị danh sách tài sản kèm các tùy chọn xử lý. |  |   | |   |
|  |  |  | Cán bộ lưu và gửi đề xuất cho cấp trên để phê duyệt. Hệ thống xác nhận đề xuất đã được gửi đi và thông báo chờ phê duyệt. |  |   | |   |
|  |  |  | Sau khi cấp trên phê duyệt, Cán bộ ghi nhận kết quả xử lý (bảo trì, thanh lý, hoặc sửa chữa). Hệ thống cập nhật trạng thái tài sản và thông báo kết quả xử lý thành công. |  |   | |   |
| V.5. | Quản lý kho tài sản trên các tuyến |  |  |  |   | |   |
| 129 | Khai báo kho tài sản trên tuyến | Cán bộ | Cán bộ tạo mới kho tài sản trên tuyến, bao gồm thông tin vị trí và dung lượng, và hệ thống lưu thông tin kho vào cơ sở dữ liệu. | B | Đơn giản  | |   |
|  |  |  | Cán bộ liên kết kho với tuyến đường cụ thể, và hệ thống cập nhật thông tin tuyến đường cho kho tài sản. |  |   | |   |
| 130 | Danh mục tài sản thu hồi lưu kho | Cán bộ | Cán bộ mở chức năng tài sản thu hồi lưu kho. Hệ thống hiển thị danh mục các tài sản được thu hồi và lưu kho cho Cán bộ . | B | Đơn giản  | |   |
|  |  |  | Cán bộ liệt kê tài sản theo tuyến đường, loại tài sản, và tình trạng tài sản và hệ thống hiển thị danh sách tài sản theo yêu cầu. |  |   | |   |
| 131 | Cập nhật thông tin tài sản thu hồi theo từng tài sản | Cán bộ | Cán bộ cập nhật thông tin vị trí kho cho từng tài sản thu hồi và hệ thống lưu thông tin vị trí vào cơ sở dữ liệu. | B | Đơn giản  | |   |
|  |  |  | Cán bộ lưu trữ trạng thái và vị trí tài sản trước và sau khi thu hồi và hệ thống cập nhật trạng thái và vị trí tài sản trong hệ thống. |  |   | |   |
| 132 | Cập nhật thông tin tài sản thu hồi đồng loạt | Cán bộ | Cán bộ cập nhật vị trí kho cho nhiều tài sản cùng lúc và hệ thống xử lý việc cập nhật hàng loạt tài sản. | B | Đơn giản  | |   |
|  |  |  | Cán bộ sử dụng chức năng cập nhật hàng loạt tài sản và hệ thống thực hiện cập nhật đồng thời cho tất cả tài sản được chọn. |  |   | |   |
| 133 | Hiển thị danh mục tài sản thu hồi lưu kho | Cán bộ | Cán bộ chọn chức năng danh mục tài sản thu hồi lưu kho. Hệ thống hiển thị danh mục tài sản thu hồi theo tuyến đường hoặc kho và Cán bộ có thể xem các tài sản theo tiêu chí lọc đã chọn. | B | Đơn giản  | |   |
|  |  |  | Cán bộ chọn điều kiện lọc. Hệ thống hiển thị chức năng lọc và tìm kiếm nhanh tài sản trong kho để Cán bộ có thể dễ dàng tìm thấy tài sản cần thiết. |  |   | |   |
| 134 | Quản lý điều chuyển kho | Cán bộ | Cán bộ theo dõi và quản lý việc điều chuyển tài sản giữa các kho và hệ thống cung cấp giao diện để theo dõi và cập nhật quá trình điều chuyển. | B | Đơn giản  | |   |
|  |  |  | Cán bộ ghi nhận thông tin điều chuyển vào hệ thống và hệ thống lưu trữ thông tin điều chuyển vào cơ sở dữ liệu. |  |   | |   |
| 135 | Cập nhật thông tin tài sản chuyển kho theo từng tài sản | Cán bộ | Cán bộ cập nhật thông tin điều chuyển của từng tài sản và hệ thống cập nhật các thay đổi vào cơ sở dữ liệu. | B | Đơn giản  | |   |
|  |  |  | Cán bộ ghi nhận kho đi và kho đến, tình trạng tài sản sau khi điều chuyển và hệ thống lưu trữ thông tin này để theo dõi. |  |   | |   |
| 136 | Cập nhật thông tin tài sản chuyển kho đồng loạt | Cán bộ | Cán bộ cập nhật thông tin điều chuyển cho nhiều tài sản cùng lúc và hệ thống xử lý việc cập nhật đồng thời cho tất cả tài sản được chọn. | B | Đơn giản  | |   |
|  |  |  | Cán bộ sử dụng chức năng cập nhật hàng loạt và hệ thống thực hiện việc cập nhật cho tất cả các tài sản trong một lần thao tác. |  |   | |   |
| 137 | Hiển thị danh mục tài sản đã chuyển kho | Cán bộ | Cán bộ hiển thị danh mục tài sản đã điều chuyển giữa các kho và hệ thống cung cấp danh sách tài sản đã được điều chuyển. | B | Đơn giản  | |   |
|  |  |  | Cán bộ lọc theo năm, tuyến đường, kho đi và kho đến và hệ thống áp dụng bộ lọc để hiển thị danh sách tài sản theo các tiêu chí đã chọn. |  |   | |   |
| 138 | Tìm kiếm tài sản đã chuyển kho, truy xuất tình trạng | Cán bộ | Cán bộ tìm kiếm tài sản đã được điều chuyển kho và hệ thống cung cấp kết quả tìm kiếm theo yêu cầu của Cán bộ . | B | Đơn giản  | |   |
|  |  |  | Cán bộ hiển thị tình trạng tài sản trước khi điều chuyển và cung cấp tính năng truy vết, và hệ thống hiển thị thông tin tình trạng tài sản cùng các dữ liệu truy vết trước và sau khi điều chuyển. |  |   | |   |
| 139 | Báo cáo thống kê tài sản lưu kho, điều chuyển kho | Cán bộ | Cán bộ tạo báo cáo về tình trạng tài sản lưu kho và điều chuyển và hệ thống xuất báo cáo với thông tin tài sản lưu kho và điều chuyển. | B | Đơn giản  | |   |
|  |  |  | Cán bộ lọc theo tuyến đường, năm, kho, tình trạng tài sản và xuất báo cáo và hệ thống lọc và xuất báo cáo theo các tiêu chí đã chọn. |  |   | |   |
| V.6. | Quản lý hợp đồng khai thác |  |  |  |   | |   |
| 140 | Khai báo thông tin hợp đồng | Cán bộ | Cán bộ nhập thông tin hợp đồng mới và hệ thống cung cấp giao diện để Cán bộ điền thông tin hợp đồng. | B | Đơn giản  | |   |
|  |  |  | Cán bộ nhập các thông tin: nhà thầu, nội dung, thời gian thực hiện, giá trị hợp đồng, tuyến đường và hệ thống lưu trữ các thông tin nhập vào. |  |   | |   |
|  |  |  | Cán bộ đính kèm tài liệu liên quan và hệ thống cho phép tải lên và lưu trữ tài liệu đính kèm. |  |   | |   |
| 141 | Cập nhật thông tin hợp đồng | Cán bộ | Cán bộ chỉnh sửa các thông tin hợp đồng đã khai báo trước đó và hệ thống cung cấp giao diện chỉnh sửa để Cán bộ thay đổi thông tin hợp đồng. | B | Đơn giản  | |   |
|  |  |  | Cán bộ cập nhật khi có thay đổi về nội dung, thời gian, hoặc giá trị hợp đồng và hệ thống lưu trữ các thay đổi trong cơ sở dữ liệu. |  |   | |   |
| 142 | Tìm kiếm thông tin hợp đồng | Cán bộ | Cán bộ tìm kiếm hợp đồng theo tiêu chí: nhà thầu, thời gian, nội dung công việc, tuyến đường và hệ thống thực hiện tìm kiếm và hiển thị kết quả phù hợp. | B | Đơn giản  | |   |
|  |  |  | Cán bộ xem thông tin chi tiết của hợp đồng và hệ thống cung cấp thông tin chi tiết hợp đồng theo yêu cầu của Cán bộ . |  |   | |   |
| V.7. | Quản lý hồ sơ quản lý khai thác |  |  |  |   | |   |
| 143 | Thêm mới hồ sơ tài liệu | Cán bộ | Cán bộ nhập thông tin hồ sơ mới và hệ thống cung cấp giao diện để Cán bộ nhập thông tin hồ sơ. | B | Đơn giản  | |   |
|  |  |  | Cán bộ chọn tài sản gắn với hồ sơ và hệ thống hiển thị danh sách tài sản để Cán bộ lựa chọn. |  |   | |   |
|  |  |  | Cán bộ đính kèm tài liệu liên quan và hệ thống cho phép tải lên và lưu trữ tài liệu đính kèm. |  |   | |   |
| 144 | Cập nhật thông tin hồ sơ | Cán bộ | Cán bộ chỉnh sửa các thông tin hồ sơ đã khai báo trước đó và hệ thống cung cấp giao diện chỉnh sửa để Cán bộ thay đổi thông tin hồ sơ. | B | Đơn giản  | |   |
|  |  |  | Cán bộ cập nhật lại tài liệu, file đính kèm hồ sơ và hệ thống lưu trữ các thay đổi về tài liệu và file đính kèm. |  |   | |   |
| 145 | Tìm kiếm thông tin hồ sơ | Cán bộ | Cán bộ tìm kiếm hồ sơ theo tiêu chí kết hợp và hệ thống thực hiện tìm kiếm và hiển thị kết quả phù hợp. | B | Đơn giản  | |   |
|  |  |  | Cán bộ xem thông tin chi tiết hồ sơ và hệ thống cung cấp thông tin chi tiết hồ sơ theo yêu cầu của Cán bộ . |  |   | |   |
|  |  |  | Tài liệu đính kèm được hệ thống lưu trữ và liên kết với hồ sơ để Cán bộ có thể truy cập sau này. |  |   | |   |
| V.8 | Báo cáo và thống kê tài sản |  |  |  |   | |   |
| 146 | Báo cáo tổng hợp tài sản | Cán bộ, lãnh đạo | Cán bộ chọn loại tài sản cần báo cáo và hệ thống hiển thị các loại tài sản để Cán bộ lựa chọn. | B | Trung bình  | |   |
|  |  |  | Cán bộ chọn điều kiện tìm kiếm tài sản theo tuyến đường, theo đơn vị quản lý và hệ thống lọc dữ liệu theo các tiêu chí đã chọn. |  |   | |   |
|  |  |  | Cán bộ chọn các trường của lớp tài sản cần hiển thị và hệ thống cập nhật giao diện để Cán bộ có thể chọn các trường dữ liệu. |  |   | |   |
|  |  |  | Cán bộ xem kết quả dữ liệu hiển thị và hệ thống hiển thị kết quả tìm kiếm theo các tiêu chí đã chọn. |  |   | |   |
|  |  |  | Cán bộ xuất báo cáo dạng Excel và hệ thống xuất báo cáo dưới dạng file Excel theo yêu cầu của Cán bộ . |  |   | |   |
| D | Phân hệ Quản lý bảo trì, bảo dưỡng |  |  |  |   | |   |
| I | Lập kế hoạch bảo trì |  |  |  |   | http://localhost:4000/bao-tri/ke-hoach |   |
| 147 | Lập kế hoạch bảo trì thường xuyên | Cán bộ | Cán bộ lập danh mục các nội dung công việc bảo trì thường xuyên, kinh phí dự kiến và hệ thống lưu trữ danh mục công việc cùng với các thông tin liên quan. | B | Trung bình  | http://localhost:4000/bao-tri/ke-hoach |   |
|  |  |  | Quản lý đơn vị / Cán bộ QLKT của VEC xem xét, cho ý kiến và phê duyệt kế hoạch và hệ thống cập nhật trạng thái phê duyệt. |  |   | |   |
|  |  |  | Cán bộ cập nhật, bổ sung kế hoạch bảo trì và hệ thống lưu trữ các thay đổi vào cơ sở dữ liệu. |  |   | |   |
|  |  |  | Cán bộ xem kế hoạch bảo trì đã lập và sau khi được phê duyệt và hệ thống hiển thị thông tin kế hoạch đã duyệt. |  |   | |   |
| 148 | Lập kế hoạch sửa chữa định kỳ | Cán bộ | Cán bộ lập danh mục các nội dung công việc sửa chữa, kinh phí dự kiến và hệ thống lưu trữ danh mục công việc cùng với các thông tin liên quan. | B | Trung bình  | |   |
|  |  |  | Quản lý đơn vị / Cán bộ QLKT của VEC xem xét, cho ý kiến và phê duyệt kế hoạch và hệ thống cập nhật trạng thái phê duyệt. |  |   | |   |
|  |  |  | Cán bộ cập nhật, bổ sung kế hoạch sửa chữa và hệ thống lưu trữ các thay đổi vào cơ sở dữ liệu. |  |   | |   |
|  |  |  | Cán bộ xem kế hoạch sửa chữa đã lập và sau khi được phê duyệt và hệ thống hiển thị thông tin kế hoạch đã duyệt. |  |   | |   |
| 149 | Lập kế hoạch sửa chữa lớn | Cán bộ | Cán bộ lập danh mục các nội dung công việc sửa chữa lớn, kinh phí dự kiến và hệ thống lưu trữ danh mục công việc cùng với các thông tin liên quan. | B | Trung bình  | |   |
|  |  |  | Quản lý đơn vị / Cán bộ QLKT của VEC xem xét, cho ý kiến và phê duyệt kế hoạch và hệ thống cập nhật trạng thái phê duyệt. |  |   | |   |
|  |  |  | Cán bộ cập nhật, bổ sung kế hoạch sửa chữa và hệ thống lưu trữ các thay đổi vào cơ sở dữ liệu. |  |   | |   |
|  |  |  | Cán bộ xem kế hoạch sửa chữa đã lập và sau khi được phê duyệt và hệ thống hiển thị thông tin kế hoạch đã duyệt. |  |   | |   |
| 150 | Lập kế hoạch sửa chữa đột xuất | Cán bộ | Cán bộ lập danh mục các nội dung công việc sửa chữa đột xuất, kinh phí dự kiến và hệ thống lưu trữ danh mục công việc cùng với các thông tin liên quan. | B | Trung bình  | |   |
|  |  |  | Quản lý đơn vị / Cán bộ QLKT của VEC xem xét, cho ý kiến và phê duyệt kế hoạch và hệ thống cập nhật trạng thái phê duyệt. |  |   | |   |
|  |  |  | Cán bộ cập nhật, bổ sung kế hoạch sửa chữa và hệ thống lưu trữ các thay đổi vào cơ sở dữ liệu. |  |   | |   |
|  |  |  | Cán bộ xem kế hoạch sửa chữa đột xuất đã lập và sau khi được phê duyệt và hệ thống hiển thị thông tin kế hoạch đã duyệt. |  |   | |   |
| 151 | Theo dõi thực hiện kế hoạch bảo trì | Cán bộ | Cán bộ cập nhật thông tin, tiến độ, giá trị hạng mục theo kế hoạch đã duyệt và hệ thống lưu trữ các thông tin cập nhật. | B | Trung bình  | |   |
|  |  |  | Cán bộ lập báo cáo tổng hợp tiến độ thực hiện kế hoạch bảo trì định kỳ theo nội dung công việc/ theo tuyến và hệ thống tạo báo cáo theo yêu cầu. |  |   | |   |
|  |  |  | Cán bộ xem báo cáo tổng hợp tiến độ thực hiện kế hoạch bảo trì định kỳ theo nội dung công việc/ theo tuyến và hệ thống hiển thị báo cáo cho Cán bộ . |  |   | |   |
|  |  |  | Cán bộ in, xuất báo cáo dạng file Excel hoặc PDF và hệ thống xuất báo cáo theo định dạng yêu cầu. |  |   | |   |
| II. | Quản lý kiểm tra tài sản |  |  |  |   | |   |
| 152 | Lập kế hoạch kiểm tra và phân công công việc | Cán bộ | Cán bộ lên kế hoạch chi tiết về thời gian và phương pháp kiểm tra và hệ thống lưu trữ kế hoạch kiểm tra. | B | Trung bình  | |   |
|  |  |  | Cán bộ tạo kế hoạch kiểm tra từ các số liệu tự động cảnh báo và được đánh dấu và hệ thống lưu trữ kế hoạch |  |   | |   |
|  |  |  | Cán bộ phân công nhiệm vụ cho các đội kiểm tra có chuyên môn phù hợp và hệ thống cập nhật phân công. |  |   | |   |
|  |  |  | Cán bộ cập nhật điều chỉnh kế hoạch và hệ thống lưu trữ các thay đổi. |  |   | |   |
|  |  |  | Cán bộ xem kế hoạch đã phân công và hệ thống hiển thị kế hoạch đã phân công. |  |   | |   |
| 153 | Cập nhật thông tin kiểm tra | Cán bộ | Cán bộ nhập kết quả kiểm tra vào hệ thống sau khi hoàn tất và hệ thống lưu trữ kết quả kiểm tra. | B | Trung bình  | |   |
|  |  |  | Cán bộ đánh giá tình trạng hiện tại của tài sản sau kiểm tra và hệ thống lưu trữ kết quả đánh giá. |  |   | |   |
|  |  |  | Cán bộ ghi nhận các vấn đề và đề xuất biện pháp khắc phục và hệ thống lưu trữ các vấn đề và biện pháp khắc phục. |  |   | |   |
|  |  |  | Cán bộ lưu trữ dữ liệu kiểm tra để theo dõi lịch sử tài sản và hệ thống hiển thị lịch sử kiểm tra. |  |   | |   |
| 154 | Tìm kiếm kết quả kiểm tra | Cán bộ | Cán bộ tìm kiếm kết quả kiểm tra theo tuyến đường và loại tài sản và hệ thống cung cấp công cụ tìm kiếm. | B | Trung bình  | |   |
|  |  |  | Cán bộ tra cứu thông tin theo khoảng thời gian cụ thể và hệ thống hiển thị thông tin kiểm tra theo yêu cầu. |  |   | |   |
|  |  |  | Cán bộ xem chi tiết các thông số và tình trạng kiểm tra và hệ thống hiển thị chi tiết thông số. |  |   | |   |
|  |  |  | Cán bộ phân tích dữ liệu để đưa ra quyết định bảo trì, sửa chữa và hệ thống hỗ trợ phân tích dữ liệu. |  |   | |   |
| 155 | Xem chi tiết kết quả kiểm tra | Cán bộ | Cán bộ hiển thị thông tin chi tiết về trạng thái của từng tài sản và hệ thống hiển thị trạng thái tài sản. | B | Trung bình  | |   |
|  |  |  | Cán bộ xem các hình ảnh trước và sau khi kiểm tra tài sản và hệ thống hiển thị hình ảnh tài sản. |  |   | |   |
|  |  |  | Cán bộ đánh giá các lỗi phát hiện và mức độ ảnh hưởng và hệ thống ghi nhận kết quả đánh giá. |  |   | |   |
|  |  |  | Cán bộ xác định biện pháp xử lý và đề xuất sửa chữa và hệ thống lưu trữ các biện pháp xử lý. |  |   | |   |
| 156 | Tạo công việc xử lý sau kiểm tra | Cán bộ | Cán bộ lập danh sách các công việc cần thực hiện sau kiểm tra và hệ thống hiển thị danh sách công việc. | B | Trung bình  | |   |
|  |  |  | Cán bộ phân loại mức độ khẩn cấp của từng công việc và hệ thống phân loại công việc theo mức độ khẩn cấp. |  |   | |   |
|  |  |  | Cán bộ tạo yêu cầu xử lý để quản lý theo dõi và hệ thống ghi nhận yêu cầu xử lý. |  |   | |   |
|  |  |  | Cán bộ theo dõi việc thực hiện công việc sau kiểm tra và hệ thống theo dõi tiến độ thực hiện công việc. |  |   | |   |
| 157 | Cảnh báo tự động kết quả kiểm tra bất thường | Cán bộ | Cán bộ cấu hình các loại cảnh báo, mức độ nghiệm trọng, bất thường cần cảnh báo. Hệ thống sẽ tự động gửi cảnh báo theo cấu hình | B | Trung bình  | |   |
|  |  |  | Cán bộ xem danh sách các cảnh báo bất thường từ kết quả kiểm tra. Hệ thống hiển thị danh sách các cảnh báo được sắp xếp theo thời gian |  |   | |   |
|  |  |  | Cán bộ xem chi tiết nội dung kiểm tra. Hệ thống hiển thị thông tin chi tiết kết quả kiểm tra |  |   | |   |
|  |  |  | Cán bộ đánh dấu và ghi chú thông tin kết quả kiểm tra để đưa vào kế hoạch thực hiện. Hệ thống hiển thị form thông cho người dùng thực hiện |  |   | |   |
|  |  |  | Cán bộ tạo công việc từ kết quả cảnh báo và phân công cho bộ phận liên quan xử lý. Hệ thống hiển thị form giao việc. |  |   | |   |
| III. | Quản lý bảo trì, bảo dưỡng tài sản |  |  |  |   | |   |
| 158 | Lập kế hoạch bảo trì, bảo dưỡng | Cán bộ | Cán bộ tạo kế hoạch bảo trì định kỳ hoặc đột xuất và hệ thống lưu trữ kế hoạch bảo trì. | B | Trung bình  | http://localhost:4000/bao-tri/ke-hoach |   |
|  |  |  | Cán bộ tạo kế hoạch bảo trì, bảo dưỡng từ các số liệu tự động cảnh báo và được đánh dấu và hệ thống lưu trữ kế hoạch bảo trì |  |   | |   |
|  |  |  | Cán bộ phân công các đội bảo trì thực hiện công việc và hệ thống cập nhật phân công. |  |   | |   |
|  |  |  | Cán bộ cập nhật điều chỉnh kế hoạch và hệ thống lưu trữ các thay đổi. |  |   | |   |
|  |  |  | Cán bộ xem kế hoạch bảo trì, bảo dưỡng và hệ thống hiển thị kế hoạch đã phân công. |  |   | |   |
| 159 | Cập nhật kết quả bảo trì | Cán bộ | Cán bộ ghi nhận các kết quả bảo trì đã thực hiện và hệ thống lưu trữ kết quả bảo trì. | B | Trung bình  | |   |
|  |  |  | Cán bộ cập nhật tiến độ và kết quả hoàn thành vào hệ thống và hệ thống lưu trữ tiến độ hoàn thành. |  |   | |   |
|  |  |  | Cán bộ đính kèm các tài liệu và hình ảnh liên quan đến bảo trì và hệ thống lưu trữ tài liệu. |  |   | |   |
|  |  |  | Cán bộ xem lịch sử cập nhật và hệ thống hiển thị lịch sử thay đổi. |  |   | |   |
| 160 | Tìm kiếm kết quả bảo trì | Cán bộ | Cán bộ tra cứu kết quả bảo trì theo loại tài sản, tuyến đường và hệ thống cung cấp công cụ tìm kiếm. | B | Đơn giản  | |   |
|  |  |  | Cán bộ xem các báo cáo bảo trì theo khoảng thời gian cụ thể và hệ thống hiển thị báo cáo. |  |   | |   |
|  |  |  | Cán bộ tra cứu kết quả sửa chữa theo kết quả và hệ thống cung cấp kết quả tra cứu. |  |   | |   |
| 161 | Xem chi tiết kết quả bảo trì | Cán bộ | Cán bộ hiển thị thông tin chi tiết về quá trình bảo trì và hệ thống hiển thị chi tiết bảo trì. | B | Trung bình  | |   |
|  |  |  | Cán bộ xem hình ảnh trước và sau khi bảo dưỡng tài sản và hệ thống hiển thị hình ảnh tài sản. |  |   | |   |
|  |  |  | Cán bộ lập báo cáo hoàn thành bảo trì để lưu trữ và theo dõi và hệ thống lưu trữ báo cáo hoàn thành. |  |   | |   |
|  |  |  | Cán bộ in, xuất báo cáo dạng file excel hoặc pdf và hệ thống hỗ trợ xuất báo cáo. |  |   | |   |
| 162 | Tạo công việc xử lý sau bảo trì | Cán bộ | Cán bộ lập danh sách các công việc cần làm sau bảo trì và hệ thống hiển thị danh sách công việc. | B | Trung bình  | |   |
|  |  |  | Cán bộ đánh giá các lỗi phát sinh trong quá trình bảo dưỡng và hệ thống ghi nhận đánh giá lỗi. |  |   | |   |
|  |  |  | Cán bộ tạo yêu cầu xử lý để quản lý theo dõi và hệ thống ghi nhận yêu cầu xử lý. |  |   | |   |
|  |  |  | Cán bộ theo dõi việc thực hiện công việc sau bảo trì và hệ thống theo dõi tiến độ thực hiện công việc. |  |   | |   |
| 163 | Cảnh báo tự động kết quả bảo trì | Cán bộ | Cán bộ cấu hình các loại cảnh báo, mức độ nghiệm trọng, bất thường cần cảnh báo. Hệ thống sẽ tự động gửi cảnh báo theo cấu hình | B | Trung bình  | |   |
|  |  |  | Cán bộ xem danh sách các cảnh báo bất thường từ kết quả bảo trì. Hệ thống hiển thị danh sách các cảnh báo được sắp xếp theo thời gian |  |   | |   |
|  |  |  | Cán bộ xem chi tiết nội dung bảo trì. Hệ thống hiển thị thông tin chi tiết |  |   | |   |
|  |  |  | Cán bộ đánh dấu và ghi chú thông tin kết quả bảo trì để đưa vào kế hoạch thực hiện. Hệ thống hiển thị form thông cho người dùng thực hiện |  |   | |   |
|  |  |  | Cán bộ tạo công việc từ kết quả cảnh báo và phân công cho bộ phận liên quan xử lý. Hệ thống hiển thị form giao việc. |  |   | |   |
| IV. | Quản lý sửa chữa tài sản |  |  |  |   | |   |
| 164 | Lập kế hoạch sửa chữa tài sản | Cán bộ | Cán bộ lập kế hoạch chi tiết về quy trình và thời gian sửa chữa và hệ thống lưu trữ kế hoạch sửa chữa. | B | Trung bình  | |   |
|  |  |  | Cán bộ tạo kế hoạch sửa chữa từ các số liệu tự động cảnh báo và được đánh dấu và hệ thống lưu trữ kế hoạch |  |   | |   |
|  |  |  | Cán bộ phân công đội sửa chữa và đảm bảo nguồn lực cần thiết và hệ thống hỗ trợ phân công đội sửa chữa. |  |   | |   |
|  |  |  | Cán bộ cập nhật điều chỉnh kế hoạch và hệ thống lưu trữ các thay đổi trong kế hoạch sửa chữa. |  |   | |   |
|  |  |  | Cán bộ xem kế hoạch sửa chữa và hệ thống hiển thị kế hoạch sửa chữa. |  |   | |   |
| 165 | Cập nhật kết quả sửa chữa | Cán bộ | Cán bộ ghi nhận tiến độ và kết quả sửa chữa trong hệ thống và hệ thống cập nhật tiến độ sửa chữa. | B | Đơn giản  | |   |
|  |  |  | Cán bộ cập nhật tài liệu và hình ảnh trước và sau sửa chữa và hệ thống lưu trữ tài liệu và hình ảnh. |  |   | |   |
|  |  |  | Cán bộ xem lịch sử cập nhật và hệ thống hiển thị lịch sử cập nhật sửa chữa. |  |   | |   |
| 166 | Tìm kiếm kết quả sửa chữa | Cán bộ | Cán bộ tra cứu kết quả sửa chữa theo thời gian và tài sản và hệ thống cung cấp kết quả tra cứu. | B | Đơn giản  | |   |
|  |  |  | Cán bộ tra cứu kết quả sửa chữa theo tình trạng và hệ thống cung cấp kết quả tra cứu tình trạng. |  |   | |   |
|  |  |  | Cán bộ tra cứu kết quả sửa chữa theo tuyến đường và hệ thống cung cấp kết quả theo tuyến đường. |  |   | |   |
| 167 | Xem chi tiết kết quả sửa chữa | Cán bộ | Cán bộ xem chi tiết các lỗi đã được khắc phục và hệ thống hiển thị chi tiết lỗi sửa chữa. | B | Trung bình  | |   |
|  |  |  | Cán bộ hiển thị các hình ảnh trước và sau khi sửa chữa và hệ thống hiển thị hình ảnh trước và sau sửa chữa. |  |   | |   |
|  |  |  | Cán bộ theo dõi lịch sử sửa chữa của từng loại tài sản và hệ thống lưu trữ lịch sử sửa chữa. |  |   | |   |
|  |  |  | Cán bộ in, xuất báo cáo dạng file excel hoặc pdf và hệ thống hỗ trợ xuất báo cáo. |  |   | |   |
| 168 | Cảnh báo tự động kết quả sửa chữa | Cán bộ | Cán bộ cấu hình các loại cảnh báo, mức độ nghiệm trọng, bất thường cần cảnh báo. Hệ thống sẽ tự động gửi cảnh báo theo cấu hình | B | Trung bình  | |   |
|  |  |  | Cán bộ xem danh sách các cảnh báo bất thường từ kết quả sửa chữa. Hệ thống hiển thị danh sách các cảnh báo được sắp xếp theo thời gian |  |   | |   |
|  |  |  | Cán bộ xem chi tiết nội dung kết quả sửa chữa. Hệ thống hiển thị thông tin chi tiết |  |   | |   |
|  |  |  | Cán bộ đánh dấu và ghi chú thông tin kết quả sửa chữa để đưa vào kế hoạch thực hiện. Hệ thống hiển thị form thông cho người dùng thực hiện |  |   | |   |
|  |  |  | Cán bộ tạo công việc từ kết quả cảnh báo và phân công cho bộ phận liên quan xử lý. Hệ thống hiển thị form giao việc. |  |   | |   |
| V. | Báo cáo tổng hợp công tác bảo trì, bảo dưỡng tài sản |  |  |  |   | |   |
| 169 | Báo cáo, tổng hợp dữ liệu bảo trì định kỳ | Cán bộ | Cán bộ tìm kiếm thông tin bảo trì theo thời gian (tháng, quý, năm) và tuyến đường và hệ thống hiển thị danh sách các tài sản được bảo trì cùng với thông tin chi tiết (tên tài sản, loại hình bảo trì, ngày hoàn thành)  | B | Đơn giản  | |   |
|  |  |  | Cán bộ xuất dữ liệu báo cáo ra các định dạng như Excel để phục vụ báo cáo cấp trên và hệ thống hỗ trợ xuất báo cáo. |  |   | |   |
| 170 | Báo cáo, tổng hợp tình trạng tài sản sau bảo trì | Cán bộ | Cán bộ tìm kiếm tình trạng tài sản sau bảo trì theo loại tài sản, tuyến đường hoặc thời gian bảo trì và hệ thống hiển thị các thông tin liên quan đến tình trạng tài sản sau bảo trì | B | Đơn giản  | |   |
|  |  |  | Cán bộ xuất báo cáo tình trạng tài sản dưới dạng Excel để lưu trữ và theo dõi lâu dài và hệ thống hỗ trợ xuất báo cáo tình trạng. |  |   | |   |
| 171 | Báo cáo, tổng hợp dữ liệu hiệu suất bảo trì | Cán bộ | Cán bộ tìm kiếm và lọc dữ liệu về thời gian thực hiện bảo trì theo tuyến đường, tài sản và nhóm thực hiện và hệ thống hiển thị kết quả về thời gian hoàn thành công việc, so sánh với thời gian dự kiến trong kế hoạch bảo trì | B | Đơn giản  | |   |
|  |  |  | Cán bộ xuất dữ liệu đánh giá hiệu suất dưới dạng bảng Excel hoặc báo cáo PDF và hệ thống hỗ trợ xuất báo cáo hiệu suất. |  |   | |   |
| 172 | Báo cáo, tổng hợp về sự cố và sửa chữa đột xuất | Cán bộ | Cán bộ tìm kiếm thông tin về các sự cố phát sinh bất ngờ và biện pháp sửa chữa theo thời gian và tuyến đường và hệ thống hiển thị thông tin chi tiết về sự cố, bao gồm thời gian phát sinh, mức độ nghiêm trọng và trạng thái xử lý. Hệ thống hiển thị thông tin tìm kiếm theo yêu cầu | B | Đơn giản  | |   |
|  |  |  | Cán bộ xuất báo cáo về sự cố và kết quả sửa chữa dưới định dạng Excel, PDF và hệ thống hỗ trợ xuất báo cáo sự cố. |  |   | |   |
| 173 | Tra cứu và xuất lịch sử bảo trì tài sản | Cán bộ | Cán bộ tra cứu toàn bộ lịch sử bảo trì của từng loại tài sản theo tuyến đường và thời gian và hệ thống hiển thị chi tiết các lần bảo trì, bao gồm thông tin về thời gian thực hiện, kết quả, và hình ảnh đính kèm. Hệ thống hiển thị thông tin kết quả theo yêu cầu | B | Đơn giản  | |   |
|  |  |  | Cán bộ xuất lịch sử bảo trì thành bảng Excel để lưu trữ và phân tích và hệ thống hỗ trợ xuất lịch sử bảo trì. |  |   | |   |
| VI | Quản lý tiếp nhận và xử lý yêu cầu trong quản lý khai thác |  |  |  |   | |   |
| VI.1 | Quản lý tiếp nhận và xử lý yêu cầu |  |  |  |   | |   |
| 174 | Khai báo yêu cầu từ khách hàng hoặc cán bộ quản lý vận hành | Cán bộ | Cán bộ nhập thông tin yêu cầu về vấn đề cần xử lý từ khách hàng hoặc nhân viên quản lý (vận hành, bảo trì, sửa chữa). Các yêu cầu này có thể liên quan đến các sự cố trên tuyến, tình trạng tài sản, hoặc yêu cầu dịch vụ. Hệ thống lưu trữ và tạo mã yêu cầu để theo dõi. | B | Đơn giản  | |   |
|  |  |  | Cán bộ có thể đính kèm hình ảnh, mô tả chi tiết về sự cố. |  |   | |   |
| 175 | Phân loại và phân bổ yêu cầu cho đơn vị quản lý vận hành | Cán bộ | Cán bộ nhập thông tin yêu cầu về vấn đề cần xử lý từ khách hàng hoặc nhân viên quản lý (vận hành, bảo trì, sửa chữa). Các yêu cầu này có thể liên quan đến các sự cố trên tuyến, tình trạng tài sản, hoặc yêu cầu dịch vụ và Hệ thống lưu trữ và tạo mã yêu cầu để theo dõi. | B | Trung bình  | |   |
|  |  |  | Cán bộ có thể đính kèm hình ảnh, mô tả chi tiết về sự cố và Hệ thống phân loại yêu cầu tự động theo nội dung và tính chất sự cố. |  |   | |   |
|  |  |  | Cán bộ sẽ phân bổ yêu cầu cho đơn vị vận hành phù hợp dựa trên địa điểm và lĩnh vực chuyên môn và Hệ thống chuyển giao thông tin yêu cầu tới đội phụ trách. |  |   | |   |
|  |  |  | Cán bộ ghi nhận thời gian phân bổ yêu cầu và Hệ thống theo dõi tiến độ phân bổ. |  |   | |   |
| 176 | Tạo và giao xử lý công việc cho cán bộ thực hiện | Cán bộ | Cán bộ tạo công việc cụ thể từ yêu cầu và phân công nhiệm vụ cho từng Cán bộ và Công việc sẽ bao gồm thông tin về thời hạn hoàn thành, tài liệu tham khảo, và mô tả nhiệm vụ cần làm. | B | Đơn giản  | |   |
|  |  |  | Cán bộ được chỉ định nhận thông báo qua hệ thống để biết công việc của mình và Hệ thống gửi thông báo công việc đến cán bộ. |  |   | |   |
|  |  |  | Cán bộ theo dõi và chỉnh sửa thông tin công việc nếu cần thiết và Hệ thống ghi nhận các thay đổi trong thông tin công việc. |  |   | |   |
| 177 | Cập nhật kết quả xử lý vào yêu cầu | Cán bộ | Cán bộ sau khi hoàn thành công việc cập nhật kết quả vào hệ thống và Thông tin cập nhật gồm: mô tả kết quả, hình ảnh trước/sau khi xử lý, và các tài liệu liên quan và Hệ thống tự động lưu kết quả và ghi nhận tiến độ xử lý. | B | Đơn giản  | |   |
|  |  |  | Cán bộ có thể xem và kiểm tra kết quả trước khi phê duyệt hoàn thành yêu cầu và Hệ thống cung cấp giao diện xem và kiểm tra kết quả. |  |   | |   |
| 178 | Đóng yêu cầu sau khi xử lý hoàn thành | Cán bộ | Sau khi yêu cầu đã được xử lý, Cán bộ sẽ phê duyệt và đóng yêu cầu trên hệ thống và Hệ thống ghi nhận trạng thái hoàn thành và lưu trữ thông tin liên quan để theo dõi sau này. | B | Đơn giản  | |   |
|  |  |  | Cán bộ hoặc khách hàng có thể được thông báo về kết quả xử lý qua hệ thống hoặc email và Hệ thống gửi thông báo qua email hoặc hệ thống. |  |   | |   |
|  |  |  | Báo cáo tổng hợp về yêu cầu có thể được xuất ra từ hệ thống và Hệ thống cung cấp tính năng xuất báo cáo. |  |   | |   |
| 179 | Thông báo trên phần mềm khi có sự cố gửi đến người dùng | Cán bộ | Cán bộ chọn gửi thông báo. Hệ thống tự động gửi thông báo đến các Cán bộ liên quan khi có yêu cầu hoặc sự cố mới phát sinh  | B | Đơn giản  | http://localhost:4000/admin/thong-bao |   |
|  |  |  | Cán bộ sẽ nhận được thông báo trên phần mềm hoặc qua email kèm chi tiết yêu cầu và Thông báo bao gồm thông tin về thời gian yêu cầu, loại sự cố, và thời hạn xử lý. |  |   | |   |
| 180 | Theo dõi trạng thái và tiến độ xử lý yêu cầu | Cán bộ | Cán bộ hoặc quản lý có thể theo dõi tình trạng và tiến độ xử lý của từng yêu cầu thông qua hệ thống và Trạng thái yêu cầu có thể bao gồm: mới tạo, đang xử lý, hoàn thành, hoặc bị hoãn và Hệ thống cung cấp các công cụ để xem tiến độ từng công việc cụ thể trong yêu cầu. | B | Đơn giản  | |   |
| VI.2 | Tra cứu và báo cáo |  |  |  |   | |   |
| 181 | Tra cứu số liệu về các yêu cầu | Cán bộ | Cán bộ có thể tìm kiếm yêu cầu theo các tiêu chí như: khoảng thời gian, loại yêu cầu (sự cố, bảo trì, giám sát), đơn vị, tuyến đường. Hệ thống hiển thị danh sách yêu cầu tương ứng kèm các thông tin chi tiết và Kết quả tìm kiếm có thể được sắp xếp theo thời gian, mức độ ưu tiên, hoặc tình trạng xử lý. | B | Đơn giản  | |   |
|  |  |  | Cán bộ có thể lưu kết quả tìm kiếm dưới dạng báo cáo để phục vụ đánh giá và Hệ thống cung cấp báo cáo chi tiết về các yêu cầu. |  |   | |   |
| 182 | Tra cứu số liệu về công việc | Cán bộ | Cán bộ có thể lọc và tra cứu công việc theo trạng thái như: đang xử lý, đã hoàn thành, bị hoãn và Hệ thống hiển thị thông tin chi tiết về tình trạng của từng công việc cụ thể. | B | Đơn giản  | |   |
|  |  |  | Các báo cáo tình trạng có thể xuất ra file để đánh giá hiệu suất và Hệ thống cung cấp báo cáo đánh giá hiệu suất công việc. |  |   | |   |
| F | Phân hệ Giám sát hoạt động vận hành và bảo trì, bảo dưỡng |  |  |  |   | |   |
| I. | Kiểm tra và đánh giá giám sát |  |  |  |   | |   |
| 183 | Lập và phân công kế hoạch giám sát | Cán bộ | Cán bộ lập kế hoạch giám sát định kỳ hoặc đột xuất theo tuyến đường và hạng mục cần giám sát và Hệ thống lưu trữ thông tin kế hoạch và theo dõi việc phân công. | B | Đơn giản  | |   |
|  |  |  | Cán bộ phân công nhiệm vụ cụ thể cho các nhân viên hoặc đơn vị thực hiện giám sát và Hệ thống lưu trữ thông tin phân công nhiệm vụ. |  |   | |   |
| 184 | Kiểm tra và đánh giá giám sát | Cán bộ | Cán bộ thực hiện giám sát đi thực địa và kiểm tra các hạng mục đã được chỉ định và Hệ thống ghi nhận kết quả kiểm tra và theo dõi tiến độ. | B | Đơn giản  | |   |
|  |  |  | Cán bộ ghi nhận các thông tin về tình trạng thực tế, sự cố, hoặc vấn đề phát sinh và Hệ thống lưu trữ và tổng hợp kết quả kiểm tra. |  |   | |   |
| 185 | Cập nhật kết quả đánh giá | Cán bộ | Cán bộ cập nhật kết quả đánh giá vào hệ thống, bao gồm tình trạng tài sản, hạng mục cần bảo trì hoặc sửa chữa, hình ảnh, vị trí và Hệ thống ghi nhận và lưu trữ kết quả để phục vụ báo cáo. | B | Đơn giản  | |   |
| 186 | Xem chi tiết kết quả đánh giá | Cán bộ | Cán bộ có thể truy cập và xem chi tiết các kết quả đánh giá của từng lần giám sát, kết quả bao gồm các thông tin như tình trạng hạng mục, hình ảnh, và ghi chú. Hệ thống sẽ hiển thị thông tin này theo yêu cầu của Cán bộ . | B | Đơn giản  | |   |
| 187 | Trao đổi, chỉ đạo thông tin | Cán bộ | Cán bộ có thể trao đổi và chỉ đạo thông tin với nhân viên trực tiếp thông qua hệ thống. Hệ thống sẽ gửi thông báo và lưu trữ các cuộc trao đổi này. | B | Đơn giản  | |   |
| 188 | Tạo công việc để xử lý hạng mục sau sửa chữa | Cán bộ | Cán bộ có thể tạo công việc để xử lý các hạng mục cần sửa chữa hoặc bảo trì. Hệ thống sẽ tạo nhiệm vụ và phân công công việc cho các nhân viên hoặc đơn vị liên quan. | B | Đơn giản  | |   |
| 189 | Gửi kết quả đánh giá | Cán bộ | Sau khi đánh giá hoàn tất, nhân viên giám sát gửi kết quả đến cấp quản lý hoặc hệ thống để phê duyệt. Hệ thống sẽ lưu trữ kết quả và gửi thông báo đến người phê duyệt. | B | Đơn giản  | |   |
| 190 | Báo cáo tổng hợp kết quả đánh giá, giám sát | Cán bộ | Cán bộ chọn xem báo cáo. Hệ thống hiển thị báo cáo tổng hợp kết quả đánh giá, giám sát theo từng đợt kiểm tra, thời gian, tuyến đường, đơn vị. Thông tin hiển thị bao gồm các hạng mục đã được kiểm tra, tình trạng, và các vấn đề phát sinh, và sẽ được hệ thống hiển thị cho Cán bộ theo yêu cầu | B | Đơn giản  | |   |
| II | Đánh giá chấm điểm theo tiêu chuẩn TCVN/AASHTO |  |  |  |   | |   |
| 191 | Chọn tiêu chuẩn đánh giá | Cán bộ | Người dùng mở giao diện lựa chọn tiêu chuẩn. Hệ thống hiển thị danh sách các bộ tiêu chuẩn TCVN/AASHTO. | B | Trung bình  | |   |
|  |  |  | Người dùng chọn một tiêu chuẩn cụ thể. Hệ thống hiển thị thông tin mô tả tiêu chuẩn đã chọn. |  |   | |   |
|  |  |  | Người dùng xác nhận áp dụng tiêu chuẩn.Hệ thống tải biểu mẫu và công thức tính toán tương ứng. |  |   | |   |
|  |  |  | Người dùng lưu thông tin. Hệ thống lưu lựa chọn vào phiên làm việc. |  |   | |   |
| 192 | Nhập dữ liệu kiểm tra hiện trường | Cán bộ | Người dùng truy cập giao diện nhập dữ liệu kiểm tra hiện trường. Hệ thống cho phép lựa chọn dạng nhập: thủ công hoặc tự động từ thiết bị đo. | B | Trung bình  | |   |
|  |  |  | Người dùng nhập thông tin như loại hư hỏng, vị trí, kích thước. Hệ thống hiển thị form thông tin nhập |  |   | |   |
|  |  |  | Người dùng đính kèm ảnh hiện trường cho từng điểm kiểm tra. Hệ thống lưu từng dòng dữ liệu vào cơ sở dữ liệu. |  |   | |   |
|  |  |  | Người dùng rà soát dữ liệu đã nhập và chỉnh sửa nếu cần. Hệ thống hiển thị thông tin chi tiêt cho người dùng xem |  |   | |   |
|  |  |  | Người dùng xác nhận hoàn tất để chuyển sang bước đánh giá. Hệ thống hiển thị lưu thông tin thành công |  |   | |   |
| 193 | Tính chỉ số IRI (TCVN 8863) | Cán bộ | Người dùng tải dữ liệu từ thiết bị đo IRI (profilometer) hoặc nhập thủ công. Hệ thống phân tích chuỗi dữ liệu và tính chỉ số IRI theo km. | B | Trung bình  | |   |
|  |  |  | Người dùng chọn đánh giá. Hệ thống so sánh kết quả với ngưỡng trong TCVN 8863 và cảnh báo theo đoạn tuyến |  |   | |   |
|  |  |  | Người dùng xem biểu đồ. Hệ thống hiển thị đồ thị IRI theo chiều dài tuyến. |  |   | |   |
|  |  |  | Người dùng kiểm tra dữ liệu bằng phẳng từng đoạn. Hệ thống hiển thị dữ liệu |  |   | |   |
|  |  |  | Người dùng có thể đính kèm báo cáo đo để làm hồ sơ nghiệm thu. Hệ thống lưu kết quả đánh giá và cập nhật bản đồ trạng thái. |  |   | |   |
| 194 | Thiết kế kết cấu áo đường mềm (TCVN 9437) | Cán bộ | Người dùng truy cập giao diện thiết kế kết cấu áo đường và Nhập thông số đầu vào: CBR, mô đun đàn hồi, tải trọng xe. Hệ thống kiểm tra dữ liệu và cảnh báo nếu thiếu hoặc không hợp lệ.  | B | Trung bình  | |   |
|  |  |  | Người dùng xem chi tiết từng lớp vật liệu và chiều dày. Hệ thống hiển thị thông tin chi tiết |  |   | |   |
|  |  |  | Người dùng có thể thay đổi lớp hoặc thông số thiết kế nếu có lý do kỹ thuật. Hệ thống cập nhật mô hình và lưu bản thiết kế. |  |   | |   |
| 195 | Chấm điểm PCI (Pavement Condition Index) | Cán bộ | Người dùng mở giao diện đánh giá mặt đường theo PCI. Hệ thống hiển thị giao diện chức năng đánh giá mặt đường theo PCI | B | Trung bình  | |   |
|  |  |  | Người dùng nhập dữ liệu hư hỏng từ hiện trường hoặc biểu mẫu khảo sát. Hệ thống hiển thị form thông tin nhập. Hệ thống phân loại hư hỏng theo danh mục chuẩn (nứt, bong tróc, hằn lún...). |  |   | |   |
|  |  |  | Người dùng tính toán mức ảnh hưởng và điểm giảm theo từng loại và Tổng hợp điểm PCI từ các điểm đánh giá. Hệ thống gán mức xếp hạng (Tốt – Trung bình – Kém...). |  |   | |   |
|  |  |  | Người dùng xem Hiển thị điểm số và phân loại trên bản đồ. Hệ thống hiển thị giao diện trên bản đồ |  |   | |   |
|  |  |  | Người dùng lưu dữ liệu vào hệ thống để xuất báo cáo hoặc phân tích tiếp theo. Hệ thống thông báo lưu thành công |  |   | |   |
| 196 | Chấm điểm BCI (Bridge Condition Index) | Cán bộ | Người dùng mở giao diện đánh giá cầu. Hệ thống hiện thị giao diện chức năng đánh giá cầu | B | Trung bình  | |   |
|  |  |  | Người dùng nhập dữ liệu kiểm định phần trên/dưới kết cấu cầu. Hệ thống hiển thị biểu mẫu điểm theo thang AASHTO (0–9). |  |   | |   |
|  |  |  | Người dùng tính điểm trung bình và xác định tình trạng kết cấu. Hệ thống thực hiện tính điểm |  |   | |   |
|  |  |  | Người dùng hiển thị chỉ số BCI và phân loại cầu. Hệ thống hiển thị thông tin và Cảnh báo nếu cầu xuống cấp vượt ngưỡng. |  |   | |   |
|  |  |  | Người dùng Lưu dữ liệu kèm thời gian kiểm định. Hệ thống thông báo lưu thành công |  |   | |   |
| 197 | Phân loại và cảnh báo tự động | Cán bộ | Người dùng chọn truy xuất điểm đánh giá kỹ thuật công trình. Hệ thống truy xuất điểm đánh giá kỹ thuật của công trình. | B | Trung bình  | |   |
|  |  |  | Người dùng chọn so sánh với ngưỡng giới hạn an toàn hoặc chất lượng. Hệ thống hiển thị kết quả |  |   | |   |
|  |  |  | Người dùng xác định mức phân loại (Tốt – TB – Kém – Nguy hiểm). Hệ thống tự động tạo cảnh báo màu (xanh – vàng – đỏ). |  |   | |   |
|  |  |  | Người dùng xem hiển thị trạng thái trên bản đồ và bảng điều khiển. Hệ thống hiển thị thông tin theo yêu cầu người dùng |  |   | |   |
|  |  |  | Người dùng cấu hình cảnh báo. Hệ thống gửi cảnh báo đến người phụ trách nếu cần can thiệp khẩn cấp. |  |   | |   |
| 198 | Hiển thị kết quả trên bản đồ | Cán bộ | Người dùng truy cập bản đồ. Hệ thống hiển thị giao diện bản đồ | B | Trung bình  | |   |
|  |  |  | Người dùng chọn tuyến hoặc đối tượng công trình để hiển thị dữ liệu. Hệ thống hiển thị dữ liệu theo yêu cầu |  |   | |   |
|  |  |  | Người dùng chọn lớp dữ liệu đánh giá. Hệ thống tải lớp dữ liệu đánh giá (PCI, IRI, BCI...) và tô màu các đoạn tuyến/cầu theo trạng thái kỹ thuật. |  |   | |   |
|  |  |  | Người dùng nhấp vào điểm để xem chi tiết kết quả. Hệ thống hiển thị form chi tiết |  |   | |   |
|  |  |  | Người dùng lọc theo loại công trình hoặc mức cảnh báo. Hệ thống hiển thị kết quả |  |   | |   |
| 199 | Gợi ý biện pháp xử lý kỹ thuật | Cán bộ | Người dùng chọn gợi ý biện pháp xử lý. Hệ thống truy cập danh mục biện pháp xử lý chuẩn kỹ thuật và so khớp loại hư hỏng và mức độ để đưa ra biện pháp tương ứng. | B | Đơn giản  | |   |
|  |  |  | Gợi ý như: vá ổ gà, tái tạo lớp móng, nâng cấp kết cấu mặt. |  |   | |   |
|  |  |  | Người dùng xem, chọn hoặc điều chỉnh giải pháp. Hệ thống lưu lựa chọn vào kế hoạch xử lý. |  |   | |   |
| 200 | Theo dõi thay đổi theo thời gian | Cán bộ | Người dùng chọn tuyến/cầu cần theo dõi. Hệ thống hiển thị các mốc thời gian đã đánh giá. | B | Trung bình  | |   |
|  |  |  | Người dùng chọn hai thời điểm để so sánh. Hệ thống tính toán sự thay đổi chỉ số (PCI, IRI...). |  |   | |   |
|  |  |  | Người dùng chọn hiển thị biểu đồ hoặc bảng thay đổi theo thời gian. Hệ thống hiển thị thông tin tương ứng |  |   | |   |
|  |  |  | Người dùng xuất dữ liệu dạng excel. Hệ thống file excel cho người dùng tải |  |   | |   |
| 201 | Xuất báo cáo kết quả đánh giá | Cán bộ | Người dùng truy cập chức năng báo cáo. Hệ thống hiển thị giao diện báo cáo | B | TRung bình  | |   |
|  |  |  | Người dùng chọn tuyến, loại công trình hoặc đợt kiểm tra. Hệ thống hiển thị danh mục tuyến, loại công trình, đợt tương ứng |  |   | |   |
|  |  |  | Người dùng chọn mẫu báo cáo (TCVN, AASHTO, tuỳ chỉnh...). Hệ thống hiển thị dữ liệu theo mẫu báo cáo |  |   | |   |
|  |  |  | Người dùng thêm chú thích hoặc ghi chú. Hệ thống hiển thị form thông tin cho người dùng nhập chú thích hoặc ghi chú |  |   | |   |
|  |  |  | Người dùng xuất báo cáo định dạng excel. Hệ thống hiển thị file excel để tải |  |   | |   |
| 202 | Tùy chỉnh trọng số đánh giá | Cán bộ | QTHT truy cập cấu hình hệ số đánh giá. Hệ thống hiển thị giao diện | B | Trung bình  | |   |
|  |  |  | QTHT chọn tiêu chuẩn và loại công trình cần tùy chỉnh. Hệ thống hiển thị giao diện tùy chỉnh |  |   | |   |
|  |  |  | QTHT chỉnh sửa trọng số các yếu tố như độ võng, độ lún, bong tróc…Hệ thống lưu thông tin và Hệ thống cảnh báo nếu tổng trọng số không đạt 100%. |  |   | |   |
|  |  |  | QTHT chọn áp dụng. Hệ thống áp dụng trọng số mới cho các lần đánh giá sau. |  |   | |   |

