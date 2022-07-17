import React from "react";
import Link from "next/link";

function Footer(props) {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start justify-between mt-10 md:mx-10">
        <div className="flex justify-between w-full flex-col sm:flex-row">
          <div className="">
            <h3 className="uppercase font-bold text-l mt-10 mb-5">
              Our comapny
            </h3>
            <ul>
              <li>
                <Link href="/about">
                  <a className="text-sm capitalize text-gray-500">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <a className="text-sm capitalize text-gray-500">
                    Return Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-sm capitalize text-gray-500">
                    Terms and conditions
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className=" md:mx-20">
            <h3 className="uppercase font-bold text-l mt-10 mb-5">
              Customer Service
            </h3>
            <ul>
              <li>
                <Link href="/payment-method">
                  <a className="text-sm capitalize text-gray-500">
                    Payment methods
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account">
                  <a className="text-sm capitalize text-gray-500">My orders</a>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <a className="text-sm capitalize text-gray-500">
                    Shipping & Order FAQ{" "}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full mt-10 md:ml-10">
          <h1 className="uppercase text-2xl font-bold">JD-commerce</h1>
          <p className="w-ful">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available
          </p>
        </div>
      </div>
      <p className="text-center text-xs mt-10">
        copyright {new Date().getFullYear()} J-D commerce, all right preserved
      </p>
    </div>
  );
}

export default Footer;
