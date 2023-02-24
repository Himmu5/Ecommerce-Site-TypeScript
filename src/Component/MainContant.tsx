import React, {  ChangeEvent, FC, useEffect } from "react";
import AllCards from "./Cards/AllCards";
import { ApiDataDummy } from "./Api";
import { useState } from "react";
import Loading from "./Cards/Loading";
import SearchNotFound from "./Error-Component/SearchNotFound";
import { range } from "lodash";
import { Link, useSearchParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { Product } from './CommenType/Types'


type paramType = {
  [k: string]: string;
}

type metaType ={
  last_page:number,
  first_page:number,
  total:number
}

type ApiDataType = {
  data:Product[],
  meta:metaType
} 


const MainContant:FC=()=> {
  const [ApiData, setApiData] = useState<ApiDataType>();
  console.log("🚀 ~ file: MainContant.tsx:30 ~ ApiData", ApiData)
  const [loading, setLoading] = useState<boolean>(true);

  let [searchParams, setSearchParams] = useSearchParams();

  const params:paramType = Object.fromEntries([...searchParams]);

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

      let mydata = ApiDataDummy(sortBy, searchQuery, page, sortType);
      mydata
        .then(function (response) {
          console.log("🚀 ~ file: MainContant.tsx ~ line 49 ~ response", response.data)
          setApiData(response.data);
          setLoading(false);
        })
        .catch(function () {
          setLoading(false);
        });
    },
    [Query, searchQuery, page]
  );

  function HandleSearch(e:ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      { ...params, searchQuery: e.target.value, page:'1' },
      { replace: false }
    );
  }

  function handleOnchange(e:ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ ...params, Query: e.target.value }, { replace: false });
  }
 
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-5">
      <div className="mx-1 sm:max-w-6xl sm:mx-auto sm:pl-5 sm:pr-5 sm:pt-5 sm:pb-5  mt-16 mb-16 bg-white shadow-md rounded-md ">
        <div className="p-3 sm:p-20 sm:pt-10 sm:pb-0 space-y-5 ">
          <h1 className="text-3xl text-red-400"> Shop</h1>
          <div className="sm:flex sm:justify-between space-y-3 sm:space-y-0">
            <h1>Showing 1–9 of 11 results</h1>
            <div className="space-y-3 sm:space-y-0 sm:flex gap-3">
              <div className=" items-center hidden md:block">
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search product"
                  className="border relative pt-2 pb-2 pl-7 pr-3 "
                  onChange={HandleSearch}
                />
                {/* <BiSearch className=" pl-1 pr-1 text-2xl -mr-3"/> */}
              </div>
              <select
                id=""
                value={Query}
                onChange={handleOnchange}
                className="pl-3 pr-3 md:pl-6 md:pr-6 pt-2 pb-2 border border-gray-300"
              >
                <option value="Default">Default Sort</option>
                <option value="LtoH">Sort By price : Low To High</option>
                <option value="HtoL">Sort By price : High To Low </option>
                <option value="name">Sort By Name</option>
              </select>
            </div>
          </div>
        </div>

        {ApiData?.data.length === 0 && <SearchNotFound />}
        <AllCards data={ApiData?.data} />

        <div className="flex gap-3 p-3 pt-10 sm:pl-20 items-center text-white ">
          { ApiData?.meta.first_page !== +page && (
            <Link to={"?" + new URLSearchParams({ ...params, page: (+page - 1).toString() })}>
              
              <MdNavigateNext
                size={25}
                className="bg-red-500 hover:bg-red-700 rounded-full text-white rotate-180 "
              />
            </Link>
          )}

          {range(1, (ApiData?.meta.last_page || 0 ) + 1).map((item) => {
            return (
              <Link
                key={item}
                className={
                  "px-2 py-2 bg-red-500 hover:bg-red-700 text-white " +
                  (item == +page ? " bg-blue-700 text-white " : " bg-red-500")
                }
                to={"?" + new URLSearchParams({ ...params, page: item.toString() })}
              >
                {item}
              </Link>
            );
          })}
          {ApiData?.meta.last_page !== +page && (
            <Link to={"?" + new URLSearchParams({ ...params, page: (+page + 1).toString() })}>
              
              <MdNavigateNext
                size={25}
                className="bg-red-500 hover:bg-red-700 rounded-full text-white "
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainContant;
