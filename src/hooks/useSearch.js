import useSWR from "swr";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const buildFilters = (searchParams) => {
  const filterKeys = ["price", "category", "brand", "color"];
  return filterKeys.reduce((filters, key) => {
    const param = searchParams.get(key);
    if (param) {
      filters[key] =
        key === "price" ? param.split("-").map(Number) : param.split(",");
    }
    return filters;
  }, {});
};

const updatePagination = (setSearchParams, updates) => {
  setSearchParams((prevParams) => {
    const params = new URLSearchParams(prevParams);
    Object.entries(updates).forEach(([key, value]) => params.set(key, value));
    return params;
  });
};

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterList, setFilterList] = useState([]);

  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const size = parseInt(searchParams.get("size"), 10) || 28;
  const sort = searchParams.get("sort") || "1";
  const reg = searchParams.get("reg") || "en";

  const API_URL = import.meta.env.VITE_API_URL;

  const region =
    reg === "en"
      ? { seckey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN", clientid: "7645129791" }
      : { seckey: "Llz5MR37gZ4gJULMwf762w1lQ13Iro", clientid: "5807942863" };

  const filters = buildFilters(searchParams);

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
        body: JSON.stringify({
          search: query,
          size,
          page,
          sort_by: sort,
          ...(filters && { filter: filters }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Error ${response.status}: Failed to fetch data`
        );
      }

      const responseData = await response.json();
      setFilterList(responseData.filter_list);

      return {
        items: responseData.items,
        total: responseData.total,
        filter_list: responseData.filter_list,
      };
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
      revalidateOnReconnect: false,
    }
  );

  const setPage = (newPage) => {
    updatePagination(setSearchParams, { page: newPage });
  };

  const setSize = (newSize) => {
    updatePagination(setSearchParams, { page: 1, size: newSize });
  };
  const resolvedFilterList = filterList.length ? filterList : data?.filter_list || [];

  return {
    data,
    error,
    isLoading,
    query,
    page,
    setPage,
    size,
    setSize,
    filters,
    filterList: resolvedFilterList,
  };
};

export default useSearch;
