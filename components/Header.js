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

  const isActive = (route) => {
    if (route === router.pathname) {
      return "active";
    } else {
      return "";
    }
  };

  let fName = "";
  if (auth.user) {
    let nameArray = auth.user.name;
    fName = nameArray.split(/(\s+)/)[0];
  }

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  let dropDownTemplate;
  if (auth.user) {
    dropDownTemplate = (
      <>
        <li>
          <Link href="#">
            <a>My account</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>orders</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>Saved items</a>
          </Link>
        </li>
        <hr />
        <li>
          <Link href="#">
            <a onClick={handleLogout}>Logout</a>
          </Link>
        </li>
      </>
    );
  } else {
    dropDownTemplate = (
      <>
        <div>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </div>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </>
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
          <Link href="#" style={{ marginRight: 20 }}>
            <a
              style={{ marginRight: 5 }}
              className={showDropDown ? "active" : ""}
            >
              {auth.user ? `Hi, ${fName}` : "Account"}
            </a>
          </Link>
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
