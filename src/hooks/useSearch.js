import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialFilterList, setInitialFilterList] = useState(null);
  const [region, setRegion] = useState({});

  // Basic query/pagination parameters
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const size = parseInt(searchParams.get("size"), 10) || 28;
  const sort = searchParams.get("sort") || "1"; 
  const reg = searchParams.get("reg") || "en";

  // Set region based on the 'reg' parameter only once
  useEffect(() => {
    if (reg === "en" ) {
      setRegion({
        seckey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
        clientid: "7645129791",
      });
    }
    if (reg === "ar") {
      setRegion({
        seckey: "Llz5MR37gZ4gJULMwf762w1lQ13Iro",
        clientid: "5807942863",
      });
    }
  }, [reg]); // Effect will only run when `reg` changes

  const buildFilters = () => {
    const filters = {};

    const priceParam = searchParams.get("price");
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      filters.price = [min, max];
    }

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      filters.category = categoryParam.split(",");
    }

    const brandParam = searchParams.get("brand");
    if (brandParam) {
      filters.brand = brandParam.split(",");
    }

    const colorParam = searchParams.get("color");
    if (colorParam) {
      filters.color = colorParam.split(",");
    }
    return filters;
  };

  const filters = buildFilters();

  const updatePagination = (newPage, newSize) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    params.set("size", newSize);
    setSearchParams(params);
  };

  const { data, error, isLoading } = useSWR(
    query ? [query, page, size, filters, sort, region] : null,
    async (key) => {
      const [query, page, size, filters, sort, region] = key;
      const { seckey, clientid } = region;

      const requestBody = {
        search: query,
        size,
        page,
        sort_by: sort,
        ...(filters && { filter: filters }),
      };

      const response = await fetch("https://uat.search-assist.webc.in/api/search", {
        method: "POST",
        headers: {
          "Client-id": clientid,
          "Secret-key": seckey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data");
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
    setPage: (newPage) => updatePagination(newPage, size),
    size,
    setSize: (newSize) => updatePagination(1, newSize),
    filters,
    filterList: initialFilterList || data?.filter_list || [],
  };
};

export default useSearch;
