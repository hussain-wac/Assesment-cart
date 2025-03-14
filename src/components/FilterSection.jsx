import FilterBox from "../components/FilterBox";

const FilterSection = ({ filterList, filters }) => (
  <div className="p-6  mb-6 flex items-start transition-all ease-in-out duration-1000 min-w-[350px]">
    <FilterBox filterList={filterList} currentFilters={filters} />
  </div>
);

export default FilterSection;
