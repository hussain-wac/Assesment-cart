import { X } from "lucide-react";

const ErrorSection = ({ error }) => (
  <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 shadow-sm mb-6 flex items-start">
    <div className="bg-red-100 p-2 rounded-full mr-3">
      <X size={20} className="text-red-500" />
    </div>
    <div>
      <h3 className="font-medium mb-1">Error occurred</h3>
      <p>{error.message}</p>
    </div>
  </div>
);

export default ErrorSection;
