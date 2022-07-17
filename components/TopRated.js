import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import ProductCardOne from "./Product/ProductCardOne";

function TopRated({ productOne, productTwo, productThree, productFour }) {
  return (
    <div className=" mt-10 ">
      <h4 className="uppercase text-xl mb-5 font-bold ">Top rated products</h4>
      <div className="columns-2 md:columns-4 gap-2">
        <ProductCardOne productOne={productOne} />
        <ProductCardOne productOne={productTwo} />
        <ProductCardOne productOne={productThree} />
        <ProductCardOne productOne={productFour} />
      </div>
    </div>
  );
}

export default TopRated;
