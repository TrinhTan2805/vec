import React from "react";
import { BinhDoContainer } from "../../components/infrastructure/BinhDoContainer";

const RoadSectionPlan: React.FC = () => {
  return (
    <BinhDoContainer 
      title="Quản lý đoạn đường bộ theo bình đồ" 
      type="road"
      imageUrl="/straight-line-diagram.jpg"
    />
  );
};

export default RoadSectionPlan;
