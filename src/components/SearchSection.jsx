import { Search } from "lucide-react";  // Lucide React Search Icon
import { Typography, FormControl, Select, MenuItem, InputLabel, CircularProgress } from "@mui/material";
import SearchBox from "../components/SearchBox";

const SearchSection = ({ query, isLoading, error, items, totalItems, sort, reg, setSort, setReg }) => (
  <div className="">
    <div className="mb-6 sticky top-0 bg-white py-4 px-6 rounded-xl shadow-md z-10 border border-gray-200">
      <div className="flex items-center mb-4">
        <Search size={20} className="mr-3 text-blue-600" /> {/* Lucide React Search Icon */}
        <Typography variant="h6" className="m-0">
          Results for: <span className="text-blue-600">{query}</span>
        </Typography>
      </div>
      <SearchBox className="mb-0" />
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Typography variant="body2">
            Showing {items.length} of {totalItems} results
          </Typography>
          <div className="flex items-center">
            <FormControl variant="outlined" size="small" className="w-auto">
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                label="Sort by"
                className="text-sm"
              >
                <MenuItem value="1">Relevance</MenuItem>
                <MenuItem value="4">Newest First</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center">
            <FormControl variant="outlined" size="small" className="w-auto">
              <InputLabel>Region</InputLabel>
              <Select
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                label="Region"
                className="text-sm"
              >
                <MenuItem value="en">qa-en</MenuItem>
                <MenuItem value="ar">qa-ar</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
     
      {error && (
        <div className="flex justify-center mt-4 text-red-600">
          <Typography variant="body2">Error: {error}</Typography>
        </div>
      )}
    </div>
  </div>
);

export default SearchSection;
