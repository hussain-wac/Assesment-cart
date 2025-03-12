import React from "react";
import { useSearchParams } from "react-router-dom";

const PriceFilter = ({ filter, currentFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceRange = {
    min: currentFilters?.price?.[0] || filter?.options.min_price || 0,
    max: currentFilters?.price?.[1] || filter?.options.max_price || 10000,
  };

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    const params = new URLSearchParams(searchParams);
    params.set("price", `${newPriceRange.min}-${newPriceRange.max}`);
    setSearchParams(params);
  };

  return (
    <div className="filter-section mb-3">
      <h5>{filter.label}</h5>
      <div className="d-flex flex-column gap-2">
        <label>
          Min: {priceRange.min}
          <input
            type="range"
            min={filter.options.min_price}
            max={filter.options.max_price}
            value={priceRange.min}
            onChange={(e) => handlePriceChange("min", Number(e.target.value))}
          />
        </label>
        <label>
          Max: {priceRange.max}
          <input
            type="range"
            min={filter.options.min_price}
            max={filter.options.max_price}
            value={priceRange.max}
            onChange={(e) => handlePriceChange("max", Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default PriceFilter;
