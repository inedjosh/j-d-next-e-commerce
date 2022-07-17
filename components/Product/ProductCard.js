import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DataContext } from "./../../store/GlobalState";
import { useContext } from "react";
import { addToCart } from "./../../store/Actions";
import Modal from "../Modal";

function ProductCard({ products }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const [openModal, setOpenModal] = useState(false);

  const handleDelete = (product) => {
    setOpenModal(true);
    dispatch({
      type: "ADD_MODAL",
      payload: [
        {
          data: products,
          id: product._id,
          title: product.title,
          type: "DELETE_PRODUCT",
        },
      ],
    });
  };

  const adminButtons = (product) => {
    return (
      <div className="btnDiv">
        <Link href={`/create/${product._id}`}>
          <a className="view">Edit Product </a>
        </Link>
        <button className="add" onClick={() => handleDelete(product)}>
          Delete
        </button>
      </div>
    );
  };

  const userButtons = (product) => {
    return (
      <div className="btnDiv">
        <Link href={`/product/${product._id}`}>
          <a className="view">View Product </a>
        </Link>
        <button
          className="add"
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Add to cart
        </button>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div>
          {openModal && <Modal />}
          <h1 className="uppercase font-bold text-xl mt-10">
            Top products for you
          </h1>
          <div className="grid-cols-2 grid md:gap-16 gap-8  md:grid-cols-3 mt-10	">
            {products.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <a>
                  <div className="productCard">
                    <div>
                      <img
                        className="h-40 md:h-60 w-full object-cover"
                        src={product.images[0].url}
                        alt={product.title}
                      />
                    </div>
                    <div className="px-2 py-2">
                      <div>
                        <h2 className="text-black-100 opacity-60 capitalize">
                          {product.title}
                        </h2>
                      </div>
                      <div>
                        <p className="text-l font-bold">N{product.amount}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
