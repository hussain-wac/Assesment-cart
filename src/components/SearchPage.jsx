import React, { use } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import FilterSection from "../components/FilterSection";
import SearchSection from "../components/SearchSection";
import ErrorSection from "../components/ErrorSection";
import LoadingSection from "../components/LoadingSection";
import ResultSection from "../components/ResultSection";
import PaginationSection from "../components/PaginationSection";

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
  const reg = searchParams.get("reg") || "en";

  const items = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / size);

  const setSort = (newSort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    params.set("page", "1");
    setSearchParams(params);
  };

  const setReg = (newReg) => {
    const params = new URLSearchParams(searchParams);
    params.set("reg", newReg);
    params.set("page", "1");
    setSearchParams(params);
  };

  const navigate = useNavigate();


  return (
    <div className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">

        <button onClick={() => navigate("/")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2">
          Go to Home
        </button>

        <div className="flex flex-col md:flex-row gap-6">
       
            <FilterSection
              filterList={filterList}
              filters={filters}
            />


   
          <div className="md:w-3/4">
            <SearchSection
              query={query}
              isLoading={isLoading}
              error={error}
              items={items}
              totalItems={totalItems}
              sort={sort}
              reg={reg}
              setSort={setSort}
              setReg={setReg}
            />

            {error && <ErrorSection error={error} />}
            {isLoading && <LoadingSection />}
            <ResultSection items={items} navigate={navigate}/>
            <PaginationSection page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
