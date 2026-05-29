import React from "react";
import CategoryList from "../categories/CategoryList";

const TaiSan = () => {
  return (
    <CategoryList 
      title="Tài sản trên tuyến" 
      categoryGroup="Quản lý" 
      initialItems={[]} 
    />
  );
};

export default TaiSan;
