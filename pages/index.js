import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { getData } from "../utils/fetchData";
import ProductCard from "../components/Product/ProductCard";
import { useRouter } from "next/router";
import filterSearch from "../utils/filterSearch";
import Filter from "../components/Filter";
import { DataContext } from "../store/GlobalState";
import UseCarousel from "../components/UseCarousel";
import Category from "../components/Product/Category";
import TopRated from "../components/TopRated";
import Services from "../components/Services";
import Footer from "../components/Footer";

export default function Home(props) {
  const [products, setProducts] = useState(props.products);
  const router = useRouter();
  const [page, setPage] = useState(1);
  console.log(products);
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <div>
      <Filter state={state} />
      <UseCarousel />
      <div className="md:px-10 px-4">
        <TopRated
          productOne={products[0]}
          productTwo={products[1]}
          productThree={products[0]}
          productFour={products[1]}
        />
        <img
          src="https://imgaz1.chiccdn.com/os/202207/20220707025257_276.jpg.webp"
          alt="ads"
          className="w-full h-28 md:h-80 md:my-20 object-cover my-4 mb-8"
        />
        {products.length === 0 ? (
          <h2>No products yet!</h2>
        ) : (
          <ProductCard products={products} />
        )}

        {props.result < page * 6 ? (
          ""
        ) : (
          <div className="flex justify-center mt-10 ">
            <button
              className="bg-gray-900 text-white px-6 py-3 text-sm"
              onClick={handleLoadmore}
            >
              View more
            </button>
          </div>
        )}
      </div>
      <div className="bg-gray-100 md:px-20 px-5 mt-10 py-10">
        <Services />
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: {
      products: res.products,
    },
  };
}
