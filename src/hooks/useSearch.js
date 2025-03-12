import useSWR from "swr";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialFilterList, setInitialFilterList] = useState(null);

  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const size = parseInt(searchParams.get("size"), 10) || 28;
  const sort = searchParams.get("sort") || "1"; 
  const reg = searchParams.get("reg") || "en";

  const API_URL = import.meta.env.VITE_API_URL;

  // Directly compute `region` instead of using useEffect or useMemo
  const region = reg === "en"
    ? { seckey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN", clientid: "7645129791" }
    : { seckey: "Llz5MR37gZ4gJULMwf762w1lQ13Iro", clientid: "5807942863" };

  // Build filters dynamically
  const buildFilters = () => {
    const filterKeys = ["price", "category", "brand", "color"];
    return filterKeys.reduce((filters, key) => {
      const param = searchParams.get(key);
      if (param) {
        filters[key] = key === "price" ? param.split("-").map(Number) : param.split(",");
      }
      return filters;
    }, {});
  };

  const filters = buildFilters();

  // Update pagination efficiently
  const updatePagination = (updates) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      Object.entries(updates).forEach(([key, value]) => params.set(key, value));
      return params;
    });
  };

  const { data, error, isLoading } = useSWR(
    query ? [query, page, size, filters, sort, region] : null,
    async ([query, page, size, filters, sort, region]) => {
      const { seckey, clientid } = region;

      if (!API_URL) throw new Error("API URL is not defined");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Client-id": clientid,
          "Secret-key": seckey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: query, size, page, sort_by: sort, ...(filters && { filter: filters }) }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: Failed to fetch data`);
      }

      const responseData = await response.json();

      if (!initialFilterList && query) {
        setInitialFilterList(responseData.filter_list);
      }

      return {
        items: responseData.items,
        total: responseData.total,
        filter_list: responseData.filter_list,
      };
    },
    { revalidateOnFocus: false, keepPreviousData: true, revalidateOnReconnect: false }
  );

  return {
    data,
    error,
    isLoading,
    query,
    page,
    setPage: (newPage) => updatePagination({ page: newPage }),
    size,
    setSize: (newSize) => updatePagination({ page: 1, size: newSize }),
    filters,
    filterList: initialFilterList || data?.filter_list || [],
  };
};

export default useSearch;
