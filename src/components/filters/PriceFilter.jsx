import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Range } from "react-range";

const PriceFilter = ({ filter, currentFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial price range
  const priceRange = {
    min: currentFilters?.price?.[0] || filter?.options.min_price || 0,
    max: currentFilters?.price?.[1] || filter?.options.max_price || 10000,
  };

  const [price, setPrice] = useState([priceRange.min, priceRange.max]);

  useEffect(() => {
    // Update search params whenever price range changes
    const params = new URLSearchParams(searchParams);
    params.set("price", `${price[0]}-${price[1]}`);
    setSearchParams(params);
  }, [price, searchParams, setSearchParams]);

  return (
    <div className="filter-section mb-3">
      <h5>{filter.label}</h5>
      <div className="d-flex flex-column gap-2">
        <div className="flex items-center justify-between">
          <span>Min: {price[0]}</span>
          <span>Max: {price[1]}</span>
        </div>

        {/* Add a custom width for the slider */}
        <Range
          values={price}
          step={1}
          min={filter.options.min_price}
          max={filter.options.max_price}
          onChange={(values) => setPrice(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full h-2 bg-gray-300 rounded-lg"
            >
              {children}
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div
              {...props}
              className="w-6 h-6 bg-blue-500 rounded-full"
              style={{
                position: "absolute",
                top: "-6px",
                transform: "translateX(-50%)",
                left: `${(price[index] - filter.options.min_price) / (filter.options.max_price - filter.options.min_price) * 100}%`,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PriceFilter;