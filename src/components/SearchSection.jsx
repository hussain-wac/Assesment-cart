import { Search } from "lucide-react";
import SearchBox from "../components/SearchBox";

const SearchSection = ({ query, isLoading, error, items, totalItems, sort, reg, setSort, setReg }) => (
  <div className="">
    <div className="mb-6 sticky top-0 bg-white py-4 px-6 rounded-xl shadow-md z-10 border border-gray-200">
      <div className="flex items-center mb-4">
        <Search size={20} className="mr-3 text-blue-600" />
        <h4 className="m-0 text-xl font-semibold">
          Results for: <span className="text-blue-600">{query}</span>
        </h4>
      </div>
      <SearchBox className="mb-0" />
      {!isLoading && !error && items.length > 0 && (
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>
            Showing {items.length} of {totalItems} results
          </span>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select
              value={sort}
              className="border-gray-200 rounded-md text-sm bg-gray-50 "
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="1">Relevance</option>
              <option value="4">Newest First</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Region :</span>
            <select
              value={reg}
              className="border-gray-200 rounded-md text-sm bg-gray-50  "
              onChange={(e) => setReg(e.target.value)}
            >
              <option value="en">qa-en</option>
              <option value="ar">qa-ar</option>
            </select>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default SearchSection;
