import React, { useContext } from "react";
import { getData } from "../../utils/fetchData";
import { useState } from "react";
import { addToCart } from "./../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import ProductCardOne from "../../components/Product/ProductCardOne";

function ProductId({ product }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const [productData, setProductData] = useState(product.product);

  const [img, setImg] = useState(productData.images[0].url);
  const [color, setColor] = useState(productData.colors[0]);
  const [size, setSize] = useState(productData.sizes[0]);

  console.log(productData);

  return (
    <div>
      <div className="flex flex-col md:grid md:grid-cols-2 mt-2 md:mt-10">
        <div className="col-span-1 px-2 md:px-5 ">
          <img
            src={img}
            className="w-full h-56 md:h-imgFull object-cover"
            alt={productData.title}
          />

          <div className="flex ">
            {productData.images.length > 1 ? (
              productData.images.map((img, index) => (
                <div
                  onClick={() => setImg(img.url)}
                  className="border-2 m-1 border-red-200 p-1/2 w-14 h-14"
                >
                  <img
                    key={index}
                    className="w-full h-full object-cover"
                    src={img.url}
                    alt={productData.title}
                  />
                </div>
              ))
            ) : (
              <div className="border-2 border-gray-200  w-14 h-14">
                <img
                  className="w-full h-full object-cover"
                  src={productData.images[0].url}
                  alt={productData.title}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 px-2 mt-2 md:px-5 md:mt-5">
          <div className=" flex flex-col-reverse">
            <p className="">{productData.title}</p>
            <p className=" flex flex-col">
              <span className="text-xl font-bold text-red-500">
                {" "}
                N{productData.amount}
              </span>
              <span className="text-gray-400 text-xs">Awoof brekete</span>
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <p>
              <span className="uppercase text-l">Color: </span>{" "}
              <span className="capitalize font-bold">"{color}"</span>
            </p>
            <small className="text-gray-400 text-xs ">
              Click to select your prefered color
            </small>
            <div className="flex mt-2">
              {productData.colors.map((color) => (
                <div
                  className="w-12 shadow mx-1 h-12 cursor-pointer"
                  style={{ backgroundColor: color }}
                  key={color}
                  onClick={() => setColor(color)}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p>
              <span className="uppercase text-l">size: </span>
              <span className="capitalize font-bold">"{size}"</span>
            </p>
            <small className="text-gray-400 text-xs ">
              Click to select your prefered size
            </small>
            <div className="flex mt-2">
              {productData.sizes.map((size) => (
                <div
                  className=" border border-gray-300 px-2 py-2 mx-1 cursor-pointer"
                  style={{}}
                  key={size}
                  onClick={() => setSize(size)}
                >
                  <span className="text-xs">{size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h4 className="uppercase bold text-l">Description</h4>
            <p className="text-sm text-gray-500 mt-2">
              {productData.description}
            </p>
          </div>

          <div className="flex mt-7">
            <button
              onClick={() => dispatch(addToCart(productData, cart))}
              className="bg-gray-900 text-white uppercase px-5 py-4 w-full flex justify-center"
            >
              <span> Add to cart</span>
              <svg
                class="w-6 h-6 ml-8"
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
            </button>
          </div>
          <div className="flex justify-between items-center px-3 mt-5 ">
            <div className="flex justify-between items-center">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                ></path>
              </svg>
              <p className="text-xs w-28 sm:w-full">
                In stock, delivers within 14days
              </p>
            </div>
            <div className="flex justify-between items-center">
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              <p className="text-xs w-28 sm:w-full">30 days return policy</p>
            </div>
          </div>
        </div>
      </div>
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
