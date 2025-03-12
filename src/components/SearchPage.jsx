import React from "react";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import SearchBox from "../components/SearchBox";
import FilterBox from "../components/FilterBox";

const SearchPage = () => {
  const {
    data,
    error,
    isLoading,
    page,
    query,
    setPage,
    size,
    filters,
    filterList,
  } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "1";

  const items = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / size);

  return (
    <div className="py-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="md:w-1/4 md:sticky top-4 md:h-[calc(100vh-2rem)]">
            <div className="bg-white rounded-xl shadow-md h-full flex flex-col border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <SlidersHorizontal size={18} className="mr-2 text-white" />
                  <h5 className="m-0 font-medium text-white">Filters</h5>
                </div>
                <button className="text-white hover:bg-blue-500 rounded-full p-1 transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="flex-grow overflow-auto p-4">
                <FilterBox filterList={filterList} currentFilters={filters} />
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="mb-6 sticky top-0 bg-white py-4 px-6 rounded-xl shadow-md z-10 border border-gray-200">
              <div className="flex items-center mb-4">
                <Search size={20} className="mr-3 text-blue-600" />
                <h4 className="m-0 text-xl font-semibold">
                  Results for: <span className="text-blue-600">{query}</span>
                </h4>
              </div>
              <SearchBox className="mb-0" />

              {/* Result summary and sort dropdown */}
              {!isLoading && !error && items.length > 0 && (
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span>
                    Showing {items.length} of {totalItems} results
                  </span>
                  <div className="flex items-center">
                    <span className="mr-2">Sort by:</span>
                    <select
                      value={sort}
                      className="border-gray-200 rounded-md text-sm bg-gray-50 px-2 py-1"
                      onChange={(e) => {
                        const newSort = e.target.value;
                        const params = new URLSearchParams(searchParams);
                        params.set("sort", newSort);
                        // Optionally reset page to 1 on sort change
                        params.set("page", "1");
                        setSearchParams(params);
                      }}
                    >
                      <option value="1">Relevance</option>
                      <option value="4">Newest First</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Region :</span>
                    <select
                      value={sort}
                      className="border-gray-200 rounded-md text-sm bg-gray-50 px-2 py-1"
                      onChange={(e) => {
                        const newSort = e.target.value;
                        const params = new URLSearchParams(searchParams);
                        params.set("sort", newSort);
                        // Optionally reset page to 1 on sort change
                        params.set("page", "1");
                        setSearchParams(params);
                      }}
                    >
                      <option value="en">qa-en</option>
                      <option value="ar">qa-ar</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Error handling */}
            {error && (
              <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 shadow-sm mb-6 flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <X size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Error occurred</h3>
                  <p>{error.message}</p>
                </div>
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="text-center my-16 flex flex-col items-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                <p className="text-gray-600">Loading results...</p>
              </div>
            )}

            {/* Results */}
            {!isLoading && !error && (
              <div className="overflow-auto max-h-[calc(100vh-200px)]">
                {items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="h-full">
                        <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 flex flex-col overflow-hidden group">
                          <div className="h-48 relative">
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${item.image_link})`,
                              }}
                              aria-label={item.title}
                            ></div>
                          </div>
                          <div className="p-4 flex-grow">
                            <p className="text-xs text-gray-500 mb-1">
                              {item.brand_key}
                            </p>
                            <h5 className="text-gray-800 font-medium mb-2 line-clamp-2">
                              {item.title}
                            </h5>
                            <div className="flex items-center justify-between mt-auto">
                              {!item.discount ? (
                                <p className="font-bold text-gray-500 text-lg">
                                  {item.price}
                                </p>
                              ) : (
                                <>
                                  <p className="font-bold text-gray-500 text-lg line-through">
                                    {item.price}
                                  </p>
                                  <p className="font-bold text-green-600 text-lg">
                                    {item.sale_price}
                                  </p>
                                  <p className="font-bold text-green-600 text-lg">
                                    {item.discount}
                                  </p>
                                </>
                              )}
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                      <Search size={32} className="text-gray-400" />
                    </div>
                    <p className="text-xl text-gray-600 mb-2">
                      No results found
                    </p>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your search or filters
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Go To Home
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && items.length > 0 && (
              <nav
                aria-label="Page navigation"
                className="mt-6 border-t border-gray-200 pt-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </p>
                  <ul className="flex justify-center">
                    <li
                      className={`${
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }`}
                    >
                      <a
                        className="px-3 py-2 mx-1 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                      >
                        <ArrowLeft size={16} />
                      </a>
                    </li>
                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <li key={pageNum}>
                          <a
                            className={`px-4 py-2 mx-1 border rounded-md transition-colors ${
                              page === pageNum
                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                : "border-gray-200 hover:bg-gray-50"
                            }`}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pageNum);
                            }}
                          >
                            {pageNum}
                          </a>
                        </li>
                      );
                    })}
                    <li
                      className={`${
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                    >
                      <a
                        className="px-3 py-2 mx-1 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                      >
                        <ArrowRight size={16} />
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
