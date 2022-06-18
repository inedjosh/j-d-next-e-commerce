import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getData } from "../utils/fetchData";
import { useState } from "react";
import ProductCard from "../components/Product/ProductCard";

export default function Home(props) {
  const [products, setProducts] = useState(props.products.products);

  return (
    <div>
      {products.length === 0 ? (
        <h2>No products yet!</h2>
      ) : (
        <ProductCard products={products} />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const productData = await getData("product");

  return {
    props: {
      products: productData,
    },
  };
}
