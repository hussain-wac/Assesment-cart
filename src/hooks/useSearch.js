import useSWR from "swr";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialFilterList, setInitialFilterList] = useState(null);

  // Basic query/pagination parameters
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page"), 10) || 1;
  const size = parseInt(searchParams.get("size"), 10) || 28;
  const sort = searchParams.get("sort") || "1"; // default sort: 1 for Relevance

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
    query ? [query, page, size, filters, sort] : null,
    async (key) => {
      const [query, page, size, filters, sort] = key;
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
          "Client-id": "7645129791",
          "Secret-key": "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
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
