import React from "react";
import CategoryList from "../categories/CategoryList";

const DanhGiaBaoTri = () => {
  return (
    <CategoryList 
      title="Đánh giá bảo trì" 
      categoryGroup="Quản lý" 
      initialItems={[]} 
    />
  );
};

export default DanhGiaBaoTri;
