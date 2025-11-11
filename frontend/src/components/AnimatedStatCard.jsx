import React from "react";
import useCountUp from "./hooks/useCountUp";


const AnimatedStatCard = ({ value, title, icon, colorClass }) => {
  const animatedValue = useCountUp(value, 1000);

  return (
    <div className="p-6 rounded-xl shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        {React.cloneElement(icon, { size: 48, className: colorClass })}
        <span className={`text-4xl font-bold ${colorClass}`}>
          {animatedValue}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>
    </div>
  );
};

export default AnimatedStatCard;