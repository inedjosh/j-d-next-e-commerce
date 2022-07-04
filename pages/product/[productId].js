import React from "react";
import { getData } from "../../utils/fetchData";
import { useState } from "react";

function ProductId({ product }) {
  const [productData, setProductData] = useState(product.product);

  console.log(productData);

  return (
    <div>
      {productData.images.length > 1 ? (
        productData.images.map((img, index) => {
          return <img key={index} src={img.url} alt={productData.title} />;
        })
      ) : (
        <img src={productData.images[0].url} alt={productData.title} />
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

export default ProductId;

export async function getServerSideProps({ params: { productId } }) {
  const productData = await getData(`product/${productId}`);

  return {
    props: {
      product: productData,
    }, // will be passed to the page component as props
  };
}
