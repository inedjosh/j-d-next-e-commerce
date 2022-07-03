import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { DataContext } from "./../../store/GlobalState";
import { useContext } from "react";
import { addToCart } from "./../../store/Actions";

function ProductCard({ products }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const adminButtons = (product) => {
    return (
      <div>
        <Link href={`/create/${product._id}`}>
          <a>Edit Product </a>
        </Link>
        <button
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          Delete
        </button>
      </div>
    );
  };

  const userButtons = (product) => {
    return (
      <div>
        <Link href={`/product/${product._id}`}>
          <a>View Product </a>
        </Link>
        <button onClick={() => dispatch(addToCart(product, cart))}>
          Add to cart
        </button>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div>
          <h1>Top products for you</h1>
          <div>
            {products.map((product) => (
              <div key={product._id}>
                <div>
                  <img
                    width={200}
                    height={200}
                    src={product.images[0]}
                    alt={product.title}
                  />
                </div>
                <div>
                  <div>
                    <div>
                      <h2 href={product.href}>{product.title}</h2>
                    </div>
                    <div>
                      {auth.user.role === "admin"
                        ? adminButtons(product)
                        : userButtons(product)}
                    </div>
                    <p>{product.colors[0]}</p>
                  </div>
                  <p>{product.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
