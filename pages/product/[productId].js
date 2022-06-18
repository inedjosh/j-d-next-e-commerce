import React from "react";
import { getData } from "../../utils/fetchData";
import { useState } from "react";

function productId({ product }) {
  const [productData, setProductData] = useState(product.product);

  return (
    <div>
      {productData.images.length > 1 ? (
        productData.images.map((img) => {
          return <img src={img} alt={productData.title} />;
        })
      ) : (
        <img src={productData.images[0]} alt={productData.title} />
      )}
      <p>{productData.title}</p>
      <p>{productData.amount}</p>
      <p>{productData.description}</p>
      <p>{productData.category}</p>
      {productData.colors.map((color) => {
        return <div key={color}>{color}</div>;
      })}
    </div>
  );
}

export default productId;

export async function getServerSideProps({ params: { productId } }) {
  const productData = await getData(`product/${productId}`);

  return {
    props: {
      product: productData,
    }, // will be passed to the page component as props
  };
}
