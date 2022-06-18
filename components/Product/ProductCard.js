import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { DataContext } from "./../../store/GlobalState";
import { useContext } from "react";
import { addToCart } from "./../../store/Actions";

function ProductCard({ products }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

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
                      <Link href={`/product/${product._id}`}>
                        <a href={product.href}>{product.title}</a>
                      </Link>
                    </div>
                    <div>
                      <button
                        onClick={() => dispatch(addToCart(product, cart))}
                      >
                        Add to cart
                      </button>
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
