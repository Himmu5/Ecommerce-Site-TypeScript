import React, { ChangeEvent, FC, useEffect } from "react";
import AllCards from "./Cards/AllCards";
import { ApiDataDummy } from "./Api";
import { useState } from "react";
import Loading from "./Cards/Loading";
import SearchNotFound from "./Error-Component/SearchNotFound";
import { range } from "lodash";
import { Link, useSearchParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { BsSearch, BsFilter } from "react-icons/bs";
import { Product, ProductsResponse } from './CommenType/Types'

type paramType = {
  [k: string]: string;
}

type metaType = {
  last_page: number,
  first_page: number,
  total: number
}

type ApiDataType = {
  products: Product[],
  total: number,
  skip: number,
  limit: number
}

const MainContant: FC = () => {
  const [ApiData, setApiData] = useState<ApiDataType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const params: paramType = Object.fromEntries([...searchParams]);

  let { searchQuery, Query, page } = params;
  page = page || "1";
  searchQuery = searchQuery || "";
  Query = Query || "default";

  useEffect(
    function () {
      let sortBy;
      let sortType;

      if (Query == "name") {
        sortBy = "title";
      }
      if (Query == "LtoH") {
        sortBy = "price";
      }
      if (Query == "HtoL") {
        sortBy = "price";
        sortType = "desc";
      }

      // Convert page to skip for DummyJSON API (page 1 = skip 0, page 2 = skip 30, etc.)
      const skip = (+page - 1) * 30;
      let mydata = ApiDataDummy(sortBy, searchQuery, skip.toString(), sortType);
      mydata
        .then(function (response) {
          setApiData(response.data);
          setLoading(false);
        })
        .catch(function () {
          setLoading(false);
        });
    },
    [Query, searchQuery, page]
  );

  function HandleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      { ...params, searchQuery: e.target.value, page: '1' },
      { replace: false }
    );
  }

  function handleOnchange(e: ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ ...params, Query: e.target.value }, { replace: false });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  onChange={HandleSearch}
                />
              </div>
            </div>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <BsFilter size={20} className="mr-2" />
              Filters
            </button>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select
                value={Query}
                onChange={handleOnchange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="default">Default</option>
                <option value="LtoH">Price: Low to High</option>
                <option value="HtoL">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Showing {(ApiData?.skip || 0) + 1}–{Math.min((ApiData?.skip || 0) + (ApiData?.limit || 0), ApiData?.total || 0)} of {ApiData?.total || 0} results
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          {ApiData?.products.length === 0 && <SearchNotFound />}
          <AllCards data={ApiData?.products} />
        </div>

        {/* Pagination */}
        {ApiData && ApiData.total > ApiData.limit && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center space-x-2">
              {/* Previous Button */}
              {ApiData && ApiData.skip > 0 && (
                <Link
                  to={"?" + new URLSearchParams({ ...params, page: (+page - 1).toString() })}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  <MdNavigateNext size={20} className="rotate-180 mr-1" />
                  Previous
                </Link>
              )}

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {ApiData && range(1, Math.ceil(ApiData.total / ApiData.limit) + 1).map((item) => {
                  return (
                    <Link
                      key={item}
                      className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                        item == +page
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                      to={"?" + new URLSearchParams({ ...params, page: item.toString() })}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>

              {/* Next Button */}
              {ApiData && (ApiData.skip + ApiData.limit) < ApiData.total && (
                <Link
                  to={"?" + new URLSearchParams({ ...params, page: (+page + 1).toString() })}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  Next
                  <MdNavigateNext size={20} className="ml-1" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainContant;
