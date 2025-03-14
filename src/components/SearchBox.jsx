import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

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
        <div className="flex items-center justify-center bg-gray-100 rounded-l p-2 border border-gray-300 border-r-0">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          aria-label="Search"
          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-r transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
