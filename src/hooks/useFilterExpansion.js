import { useState } from "react";

/**
 * Custom hook to manage the filter expansion logic.
 * @param {Array} filterList - The list of filters to manage.
 * @returns {Array} - The list of visible options and a function to toggle the expansion of each filter.
 */
const useFilterExpansion = (filterList) => {
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleSeeMore = (filterKey) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  const getVisibleOptions = (filter) => {
    const isExpanded = expandedFilters[filter.attribute];
    const options = Array.isArray(filter.options) ? filter.options : [];
    return isExpanded ? options : options.slice(0, 5);
  };

  return {
    getVisibleOptions,
    toggleSeeMore,
    expandedFilters,
  };
};

export default useFilterExpansion;
