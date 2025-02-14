"use client";

const ProgressBar = () => {
  return (
    <div className="w-full text-white font-roman">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">Ticket Selection</h2>
        <span className="text-sm">Step 1/3</span>
      </div>
      <div className="w-full h-1 mt-2 bg-gray-700 rounded-full">
        <div
          className="h-1 bg-custom-cyan rounded-full"
          style={{ width: "33%" }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
