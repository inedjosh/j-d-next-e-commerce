import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { getData } from "../utils/fetchData";
import ProductCard from "../components/Product/ProductCard";
import { useRouter } from "next/router";
import filterSearch from "../utils/filterSearch";
import Filter from "../components/Filter";
import { DataContext } from "../store/GlobalState";

export default function Home(props) {
  const [products, setProducts] = useState(props.products);
  const router = useRouter();
  const [page, setPage] = useState(1);

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
      {products.length === 0 ? (
        <h2>No products yet!</h2>
      ) : (
        <ProductCard products={products} />
      )}

      {props.result < page * 6 ? (
        ""
      ) : (
        <button
          className="btn btn-outline-info d-block mx-auto mb-4"
          onClick={handleLoadmore}
        >
          Load more
        </button>
      )}
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
