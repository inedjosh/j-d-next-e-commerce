import Link from "next/link";
import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "./../../store/Actions";

function ProductCardOne({ productOne }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  return (
    <div className="mr-1 mb-3 bg-slate-50  ">
      <Link href={`/product/${productOne._id}`}>
        <a>
          <img
            className="w-full h-40 md:h-60 object-cover"
            src={productOne.images[0].url}
            alt={productOne.title}
          />

          <div className="px-2 py-1">
            <h2 className="text-black-100 opacity-60 capitalize">
              {productOne.title}
            </h2>

            <div className="flex items-center justify-between pr-2">
              <p className=" text-center flex items-center justify-center">
                <span className=" text-l font-bold"> N{productOne.amount}</span>
                <span className="line-through text-xs text-gray-400 text-hairline pl-2">
                  N{productOne.amount + 200}
                </span>
              </p>
              <div onClick={() => dispatch(addToCart(productOne, cart))}>
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default ProductCardOne;
