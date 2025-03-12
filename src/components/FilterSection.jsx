import { SlidersHorizontal, X } from "lucide-react";
import FilterBox from "../components/FilterBox";

const FilterSection = ({ filterList, filters }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 flex items-start">
        <FilterBox filterList={filterList} currentFilters={filters}  />
  </div>
);

export default FilterSection;
