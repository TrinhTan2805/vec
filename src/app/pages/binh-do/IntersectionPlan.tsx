import React from "react";
import { BinhDoContainer } from "../../components/infrastructure/BinhDoContainer";

const IntersectionPlan: React.FC = () => {
  return (
    <BinhDoContainer 
      title="Quản lý nút giao theo bình đồ" 
      type="intersection"
      imageUrl="/straight-line-diagram.jpg"
    />
  );
};

export default IntersectionPlan;
