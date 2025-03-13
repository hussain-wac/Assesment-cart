import React from "react";
import { useSearchParams } from "react-router-dom";

const CheckboxFilter = ({ filter, currentFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValues = currentFilters[filter.attribute] || [];

  const handleCheckboxChange = (value, checked) => {
    const updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((val) => val !== value);
    const params = new URLSearchParams(searchParams);
    params.set(filter.attribute, updatedValues.join(","));
    setSearchParams(params);
  };

  return (
    <div className="filter-section">
      <h5 className="ml-2">{filter.label}</h5>
      {filter.options.map((option) => (
        <div key={option.name} className="gap-2">
          <label className="ms-2">
            <input
              type="checkbox"
              className="mx-2"
              checked={selectedValues.includes(option.name)}
              onChange={(e) =>
                handleCheckboxChange(option.name, e.target.checked)
              }
            />
            {option.label} ({option.count})
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxFilter;
