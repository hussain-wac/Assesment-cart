import { SlidersHorizontal, X } from "lucide-react";
import FilterBox from "../components/FilterBox";

const FilterSection = ({ filterList, filters, onClose }) => (
  <div className="md:w-1/4 md:sticky top-4 md:h-[calc(100vh-2rem)]">
    <div className="bg-white rounded-xl shadow-md h-full flex flex-col border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <SlidersHorizontal size={18} className="mr-2 text-white" />
          <h5 className="m-0 font-medium text-white">Filters</h5>
        </div>
        <button
          className="text-white hover:bg-blue-500 rounded-full p-1 transition-colors"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex-grow overflow-auto p-4">
        <FilterBox filterList={filterList} currentFilters={filters} />
      </div>
    </div>
  </div>
);

export default FilterSection;
