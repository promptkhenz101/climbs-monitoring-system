import React from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading bg-white h-screen flex justify-center items-center">
      <div className="loading-content">
        <h2 className="text-blue-700 font-bold text-4xl mb-5">CLIMBS Sales</h2>
        <div className="loading-widget flex justify-center items-center">
          <RingLoader color="#1D4ED8" size={80} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
