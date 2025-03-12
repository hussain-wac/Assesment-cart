import React, { memo } from "react";
import { useSearchParams } from "react-router-dom";
import PriceFilter from "./filters/PriceFilter";
import CheckboxFilter from "./filters/CheckboxFilter";

const FilterBox = memo(({ filterList, currentFilters, onResetFilters }) => {
    const [searchParams, setSearchParams] = useSearchParams();
  
    const filterKeys = ["price", "category", "brand", "color"];
    const isAnyFilterApplied = filterKeys.some((key) => searchParams.get(key));
  
    const resetFilters = (e) => {
      e.preventDefault();
      const newParams = new URLSearchParams(searchParams);
      filterKeys.forEach((key) => newParams.delete(key));
      newParams.set("page", 1);
      setSearchParams(newParams);
      onResetFilters?.();
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
        <div className="border-b border-gray-200 pb-3">
          <h4 className="text-lg font-semibold text-gray-800 mb-1">Filter Options</h4>
          <p className="text-sm text-gray-500">Narrow down your search</p>
        </div>
  
        <div className="space-y-4">
          {filterList.map((filter) => {
            if (filter.attribute === "price") {
              return (
                <div key="price" className="space-y-2">
                  <PriceFilter
                    filter={filter}
                    currentFilters={currentFilters}
                    className="space-y-2"
                  />
                </div>
              );
            }
  
            if (["category", "brand", "color"].includes(filter.attribute)) {
              return (
                <div key={filter.attribute} className="space-y-2">
                  <CheckboxFilter
                    filter={filter}
                    currentFilters={currentFilters}
                    className="space-y-1"
                  />
                </div>
              );
            }
  
            return null;
          })}
        </div>
  
        {isAnyFilterApplied && (
          <div className="mt-4">
            <button
              onClick={resetFilters}
              className="w-full text-center block text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    );
  });

  export default FilterBox;