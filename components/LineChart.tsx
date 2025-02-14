"use client";

interface ProgressBarProps {
  title?: string;
  currentStep: number;
  totalSteps: number;
  width?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  title = "Progress",
  currentStep,
  totalSteps,
  width = "100%",
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="text-white font-roman" style={{ width }}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg">{title}</h2>
        <span className="text-sm">
          Step {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="w-full h-1 mt-2 bg-gray-700 rounded-full">
        <div
          className="h-1 bg-custom-cyan rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
