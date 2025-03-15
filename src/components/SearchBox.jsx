import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react"; // you can keep this or replace it with an MUI icon
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg mb-4">
      <div className="flex items-center">
        <TextField
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <Search className="h-5 w-5 text-gray-500" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: "4px 0 0 4px", // To match the rounded left side
            flex: 1,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "0 4px 4px 0", // To match the rounded right side
            height: "100%", // Ensure the button is aligned with the input
          }}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBox;
