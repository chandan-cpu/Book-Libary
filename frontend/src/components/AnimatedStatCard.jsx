import React from "react";

import { useLibrary } from "./context/LibraryContext";
import useCountUp from "./hooks/useCountUp";


const AnimatedStatCard = ({ value, title, icon, colorClass }) => {
  const { darkMode } = useLibrary();
  const animatedValue = useCountUp(value, 1000);

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } transition-colors duration-300`}>
      <div className="flex items-center justify-between mb-4">
        {React.cloneElement(icon, { size: 48, className: colorClass })}
        <span className={`text-4xl font-bold ${colorClass}`}>
          {animatedValue}
        </span>
      </div>
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
        {title}
      </h3>
    </div>
  );
};

export default AnimatedStatCard;