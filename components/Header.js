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
      return "active";
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
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>
        <li>
          <Link href="/create">
            <a>Products</a>
          </Link>
        </li>

        <li>
          <Link href="/categories">
            <a>Categories</a>
          </Link>
        </li>
      </div>
    );
  };

  let dropDownTemplate;
  if (auth.user) {
    dropDownTemplate = (
      <div>
        <li>
          <Link href="/account">
            <a>My Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/orders">
            <a>orders</a>
          </Link>
        </li>
        {auth.user.role === "admin" && auth.user.root === true && adminNav()}
        <hr />
        <li>
          <Link href="#">
            <div>
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
              <a onClick={handleLogout}>Logout</a>
            </div>
          </Link>
        </li>
      </div>
    );
  } else {
    dropDownTemplate = (
      <div>
        <div>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </div>
        <Link href="/login">
          <div>
            <svg
              class="w-4 h-3"
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
            <a>Login</a>
          </div>
        </Link>
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
                  className="w-5 h-5 bg-gray-800 flex justify-center items-center absolute top-0"
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
          className="mx-2 md:mx-8 hidden sm:block md:flex md:items-center"
        >
          <div style={{ marginRight: 20 }}>
            <a
              style={{ marginRight: 5 }}
              className={showDropDown ? "active flex" : "flex"}
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
          {showDropDown === true && (
            <div className="absolute top-12 shadow pl-2 text-sm">
              <ul style={{ display: "flex", flexDirection: "column" }}>
                {dropDownTemplate}
              </ul>
            </div>
          )}
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
    </div>
  );
}

export default Header;
