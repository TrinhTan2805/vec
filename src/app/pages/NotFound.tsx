import { Link } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <p className="mt-4 text-xl">Không tìm thấy trang</p>
        <p className="mt-2 text-muted-foreground">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa
        </p>
        <Link to="/">
          <Button className="mt-6">
            <Home className="mr-2 size-4" />
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}
