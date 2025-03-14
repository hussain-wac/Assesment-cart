import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Slider, Box, Typography } from "@mui/material";
const PriceFilter = ({ filter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawMin = filter?.options?.min_price || 0;
  const rawMax = filter?.options?.max_price || 100;
  const min = rawMin < rawMax ? rawMin : 0;
  const max = rawMax > rawMin ? rawMax : min + 100;
  const priceParam = searchParams.get("price");
  const currentValues = priceParam
    ? priceParam.split("-").map(Number)
    : [min, max];
  const validatedCurrentValues = [
    Math.max(min, Math.min(max, currentValues[0] || min)),
    Math.min(max, Math.max(min, currentValues[1] || max)),
  ];
  const [isDragging, setIsDragging] = useState(false);
  const [draggingValues, setDraggingValues] = useState(null);
  const displayValues = isDragging ? draggingValues : validatedCurrentValues;
  if (!filter || min === max) {
    return null;
  }
  return (
    <Box sx={{ width: 300, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {filter?.label || "Price Range"}
      </Typography>
      <Slider
        value={displayValues}
        onChange={(_, newValues) => {
          setIsDragging(true);
          setDraggingValues(newValues);
        }}
        onChangeCommitted={(_, newValues) => {
          const params = new URLSearchParams(searchParams);
          if (newValues[0] !== min || newValues[1] !== max) {
            params.set("price", `${newValues[0]}-${newValues[1]}`);
          } else {
            params.delete("price");
          }
          setSearchParams(params);
          setIsDragging(false);
          setDraggingValues(null);
        }}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={1}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">${min.toLocaleString()}</Typography>
        <Typography variant="body2">${max.toLocaleString()}</Typography>
      </Box>
      {isDragging && (
        <Typography variant="caption" color="textSecondary" textAlign="center" display="block" mt={1}>
          Release to apply filter
        </Typography>
      )}
    </Box>
  );
};

export default PriceFilter;
