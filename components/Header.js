import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Cookie from "js-cookie";

function Header() {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const [showDropDown, setShowDropDown] = useState(false);

  const router = useRouter();

  const [name, setName] = useState("");

  const isActive = (route) => {
    if (route === router.pathname) {
      return "text-primary";
    } else {
      return "";
    }
  };

  useEffect(() => {
    setName(auth.user?.name);
  }, [auth.user]);

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  const adminNav = () => {
    return (
      <div>
        <li className="py-2 uppercase font-normal flex items-center">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <Link href="/users">
            <a className="pl-3">Users</a>
          </Link>
        </li>
        <li className="py-2 uppercase font-normal flex items-center">
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
          <Link href="/create">
            <a className="pl-3">Products</a>
          </Link>
        </li>

        <li className="py-2 uppercase font-normal flex items-center">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          <Link href="/categories">
            <a className="pl-3">Categories</a>
          </Link>
        </li>
      </div>
    );
  };

  let dropDownTemplate;
  if (auth.user) {
    dropDownTemplate = (
      <div>
        <li className="py-2 uppercase font-normal flex items-center">
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
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <Link href="/account">
            <a className="pl-2">My Profile</a>
          </Link>
        </li>
        {/* <li className="py-2 uppercase font-normal flex items-center">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
          <Link href="/orders">
            <a className="pl-2">orders</a>
          </Link>
        </li> */}
        {auth.user.role === "admin" && auth.user.root === true && adminNav()}
        <hr />
        <li
          onClick={handleLogout}
          className="py-2 uppercase font-normal flex items-center"
        >
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          <Link className="cursor-pointer" href="#">
            <a className="pl-3">Logout</a>
          </Link>
        </li>
      </div>
    );
  } else {
    dropDownTemplate = (
      <div>
        <div className="flex items-center py-2">
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <Link className="cursor-pointer" href="/signup">
            <a className="pl-3">Signup</a>
          </Link>
        </div>
        <div className="flex items-center py-2">
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
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            ></path>
          </svg>
          <Link className="cursor-pointer" href="/login">
            <a className="pl-3">Login</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between py-6 px-2 md:py-6 bg-gray-100">
      <div className="flex">
        <div className="sm:hidden">
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
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <Link href="/">
          <a
            className="font-semibold text-primary ml-4 md:ml-6"
            onClick={() => setShowDropDown(false)}
          >
            J-D commerce
          </a>
        </Link>
      </div>
      <ul className="flex  justify-between">
        <li className="mx-2 md:mx-8">
          <Link href="/cart">
            <a
              onClick={() => setShowDropDown(false)}
              className={`${isActive("/cart")} flex`}
            >
              <div className="relative ">
                <div
                  className="w-5 h-5 bg-red-600 flex justify-center items-center absolute top-0"
                  style={{
                    borderRadius: "100%",
                    marginTop: -10,
                    marginLeft: -10,
                  }}
                >
                  <span className=" text-white">{cart.length}</span>
                </div>
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
              <span className="ml-2 hidden md:block">Cart</span>
            </a>
          </Link>
        </li>
        <li
          onClick={() => setShowDropDown(!showDropDown)}
          className={`mx-2 md:mx-8 hidden sm:block md:flex md:items-center `}
        >
          <div style={{ marginRight: 20 }}>
            <a
              style={{ marginRight: 5 }}
              className={showDropDown ? "text-primary flex" : "flex"}
            >
              <div className="relative "></div>
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>

              <span className="ml-2">
                {auth.user ? `Hi, ${name}` : "Account"}
              </span>
            </a>
          </div>
          <div>
            {showDropDown ? (
              <BsChevronDown style={{ marginLeft: -15 }} />
            ) : (
              <BsChevronUp style={{ marginLeft: -15 }} />
            )}
          </div>
        </li>
        <li className="mx-2 md:mx-8">
          <Link href="/help">
            <a
              onClick={() => setShowDropDown(false)}
              className={`${isActive("/help")}`}
            >
              <div className="flex">
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="ml-2 hidden sm:block">Help</span>
              </div>
            </a>
          </Link>
        </li>
      </ul>
      {showDropDown === true && (
        <div className="shadow absolute mt-10 right-[12%] bg-white px-5 z-10">
          <div>{dropDownTemplate}</div>
        </div>
      )}
    </div>
  );
}

export default Header;
