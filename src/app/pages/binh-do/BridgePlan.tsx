import React from "react";
import { BinhDoContainer } from "../../components/infrastructure/BinhDoContainer";

const BridgePlan: React.FC = () => {
  return (
    <BinhDoContainer 
      title="Quản lý cầu lớn theo bình đồ" 
      type="bridge"
      imageUrl="/straight-line-diagram.jpg"
    />
  );
};

export default BridgePlan;
