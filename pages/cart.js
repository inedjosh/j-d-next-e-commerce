import React, { useState, useContext, useEffect } from "react";
import { decrease, increase } from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import { getData, postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import loginValidate from "../utils/LoginValidate";
import Cookie from "js-cookie";

function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const [total, setTotal] = useState(0);

  const [noAuth, setNoAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.amount * item.quantity;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("myCart"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          console.log(res);
          const {
            _id,
            title,
            images,
            inStock,
            amount,
            content,
            category,
            productType,
            colors,
            sizes,
            sold,
          } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              amount,
              inStock,
              content,
              category,
              inStock,
              productType,
              colors,
              sizes,
              sold,
              quantity: inStock === true ? item.quantity : 1,
            });
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };

      updateCart();
    }
  }, [increase, decrease]);

  const handleCheckout = () => {
    if (Object.keys(auth).length === 0) {
      setNoAuth(true);
    } else {
      router.push("/checkout");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = loginValidate(email, password);

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    if (!err) dispatch({ type: "NOTIFY", payload: { null: "" } });

    let userData = {
      email,
      password,
    };

    const res = await postData("auth/login", userData);

    if (!res.err) {
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });

      dispatch({
        type: "AUTH",
        payload: {
          token: res.access_token,
          user: res.user,
        },
      });
    }

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);

    if (res) router.push("/checkout");
  };

  if (cart.length === 0) return <p>No product in cart</p>;

  return (
    <div>
      {cart.map((item) => {
        return (
          <CartItem
            key={item._id}
            item={item}
            dispatch={dispatch}
            cart={cart}
          />
        );
      })}
      <p> total: {parseInt(total)}</p>
      <hr />
      <button onClick={handleCheckout} style={{ marginVertical: 50 }}>
        CheckOut
      </button>
      {noAuth && (
        <div>
          <form onSubmit={handleSubmit}>
            <h1>You have to log in to check out!</h1>
            <div>
              <label htmlFor="email" id="email" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"text"}
              />
            </div>
            <div>
              <label htmlFor="email" id="email" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
              />
            </div>
            <div>
              <input type={"submit"} value="Login" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
