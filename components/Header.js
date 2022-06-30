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
            <a>My account</a>
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
            <a onClick={handleLogout}>Logout</a>
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
          <a>Login</a>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Link href="/">
        <a onClick={() => setShowDropDown(false)}>Home</a>
      </Link>
      <ul
        style={{ display: "flex", justifyContent: "space-around", width: 300 }}
      >
        <li>
          <Link href="/cart">
            <a
              onClick={() => setShowDropDown(false)}
              className={`${isActive("/cart")}`}
            >
              <span>{cart.length}</span>
              Cart
            </a>
          </Link>
        </li>
        <li
          onClick={() => setShowDropDown(!showDropDown)}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div style={{ marginRight: 20 }}>
            <a
              style={{ marginRight: 5 }}
              className={showDropDown ? "active" : ""}
            >
              {auth.user ? `Hi, ${name}` : "Account"}
            </a>
          </div>
          <div>{showDropDown ? <BsChevronDown /> : <BsChevronUp />}</div>
          {showDropDown === true && (
            <div
              style={{
                backgroudColor: "#fff",
                width: 150,
                height: 200,
                zIndex: 10,
                position: "absolute",
                top: 30,
              }}
            >
              <ul style={{ display: "flex", flexDirection: "column" }}>
                {dropDownTemplate}
              </ul>
            </div>
          )}
        </li>
        <li>
          <Link href="/help">
            <a
              onClick={() => setShowDropDown(false)}
              className={`${isActive("/help")}`}
            >
              Help
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
