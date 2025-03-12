import React, { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";

const PriceFilter = ({ filter, currentFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const min = filter?.options.min_price || 0;
  const max = filter?.options.max_price || 10000;
  const initialValues = [
    currentFilters?.price?.[0] || min,
    currentFilters?.price?.[1] || max
  ];
  const [values, setValues] = useState(initialValues);
  const [isDragging, setIsDragging] = useState(false);
  const finalizeChange = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("price", `${values[0]}-${values[1]}`);
    setSearchParams(params);
    setIsDragging(false);
  }, [values, searchParams, setSearchParams]);
  
  return (
    <div className="mb-6">
      <h5 className="text-lg font-medium mb-3">{filter.label}</h5>
      
      <div className="w-full px-2 py-4">
        <Range
          step={1}
          min={min}
          max={max}
          values={values}
          onChange={(newValues) => {
            setValues(newValues);
            setIsDragging(true);
          }}
          onFinalChange={finalizeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full rounded-md"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#e5e7eb", "#3b82f6", "#e5e7eb"],
                  min,
                  max
                })
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div
              {...props}
              className="h-5 w-5 rounded-full bg-blue-500 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-600"
              style={{
                ...props.style,
                zIndex: 1
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                ${values[index]}
              </div>
            </div>
          )}
        />
      </div>
      
      <div className="flex justify-between px-2 mt-2 text-sm">
        <div className="font-medium">
          Min: ${values[0]}
        </div>
        <div className="font-medium">
          Max: ${values[1]}
        </div>
      </div>
      {isDragging && (
        <div className="text-xs text-gray-500 mt-2 text-center">
          Release to apply filter
        </div>
      )}
    </div>
  );
};

export default PriceFilter;