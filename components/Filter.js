import React, { useState, useEffect } from "react";
import filterSearch from "../utils/filterSearch";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Filter = ({ state }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const [showProductsFilter, setShowProductsFilter] = useState(false);
  const [showSortsFilter, setShowSortsFilter] = useState(false);

  const { categories } = state;

  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <div className="flex mt-3 items-center relative">
      <div className="flex items-center m-3">
        <div className="md:hidden" onClick={() => setShowProductsFilter(true)}>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
        </div>
        {showProductsFilter && (
          <div
            className="absolute bg-white py-2 px-4 top-0 left-0 shadow "
            style={{ marginTop: -10 }}
          >
            <div className="flex justify-between items-center ">
              <h4 className="text-sm">Filter by category</h4>
              <div onClick={() => setShowProductsFilter(false)}>
                <svg
                  class="w-4 h-4 ml-10 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <select
              className="w-full  border pl-2 text-sm py-1 border-gray-300 mt-3 focus:outline-none focus:bg-white focus:border-gray-200 leading-tight "
              value={category}
              onChange={handleCategory}
            >
              <option value="all">All Categories</option>

              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="hidden sm:block">
          <select
            className="w-full ml-1 border pl-2  text-sm py-3 px-4 border-gray-300  focus:outline-none focus:bg-white focus:border-gray-200 leading-tight"
            value={category}
            onChange={handleCategory}
          >
            <option value="all">All Products</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form
        autoComplete="off"
        className="flex items-center"
        style={{ flex: 1 }}
      >
        <input
          type="text"
          className="appearance-none bg-white w-full text-gray-700 border py-3  px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-300 border-gray-300"
          list="title_product"
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="flex items-center m-3">
        <div className="md:hidden" onClick={() => setShowSortsFilter(true)}>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        {showSortsFilter && (
          <div
            className="absolute bg-white py-2 px-4 top-0 right-0 shadow "
            style={{ marginTop: -10 }}
          >
            <div className="flex justify-between items-center ">
              <h4 className="text-sm">Sort products</h4>
              <div onClick={() => setShowSortsFilter(false)}>
                <svg
                  class="w-4 h-4 ml-10 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <select
              className="w-full ml-1 border pl-2 mt-2 text-xs py-1 px-4 border-gray-300  focus:outline-none focus:bg-white focus:border-gray-200 leading-tight"
              value={sort}
              onChange={handleSort}
            >
              <option value="-createdAt">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="-sold">Best sales</option>
              <option value="-amount">Price: Hight-Low</option>
              <option value="amount">Price: Low-Hight</option>
            </select>
          </div>
        )}
        <div className="hidden sm:block">
          <select
            className="w-full ml-1 border pl-2  text-sm py-2 px-4 border-gray-300  focus:outline-none focus:bg-white focus:border-gray-200 leading-tight"
            value={sort}
            onChange={handleSort}
          >
            <option value="-createdAt">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="-sold">Best sales</option>
            <option value="-amount">Price: Hight-Low</option>
            <option value="amount">Price: Low-Hight</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
