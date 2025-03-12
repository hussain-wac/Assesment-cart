import { useState } from "react";

const useFilterExpansion = (filterList, setSearchParams, searchParams) => {
  const [expandedFilters, setExpandedFilters] = useState({});

  const filterKeys = ["price", "category", "brand", "color"];

  // Logic to check if any filters are applied
  const isAnyFilterApplied = filterKeys.some((key) => searchParams.get(key));

  // Toggle the "See More" / "See Less" functionality for filters
  const toggleSeeMore = (filterKey) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  // Get the visible options (5 by default, or all if expanded)
  const getVisibleOptions = (filter) => {
    const isExpanded = expandedFilters[filter.attribute];
    const options = Array.isArray(filter.options) ? filter.options : [];
    return isExpanded ? options : options.slice(0, 5);
  };

  // Reset all filters to their initial state
  const resetFilters = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    filterKeys.forEach((key) => newParams.delete(key));
    newParams.set("page", 1);
    setSearchParams(newParams);
  };

  return {
    expandedFilters,
    toggleSeeMore,
    getVisibleOptions,
    isAnyFilterApplied,
    resetFilters,
  };
};

export default useFilterExpansion;
