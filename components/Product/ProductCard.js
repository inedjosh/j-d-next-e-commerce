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
          <h1>Top products for you</h1>
          <div className="homeDiv">
            {products.map((product) => (
              <div className="productCard" key={product._id}>
                <div>
                  <img
                    className="productImage"
                    src={product.images[0].url}
                    alt={product.title}
                  />
                </div>
                <div className="cardContent">
                  <div>
                    <h2 href={product.href}>{product.title}</h2>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <p>N{product.amount}</p>
                    <p>{product.colors[0]}</p>
                  </div>
                  <div>
                    <div>
                      <div>
                        {auth.user?.role === "admin"
                          ? adminButtons(product)
                          : userButtons(product)}
                      </div>
                    </div>
                  </div>
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
