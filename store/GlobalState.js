import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducer";
import { getData } from "./../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    orders: [],
    users: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;
  const { user } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }

    // getData('categories').then(res => {
    //     if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

    //     dispatch({
    //         type: "ADD_CATEGORIES",
    //         payload: res.categories
    //     })
    // })
  }, []);

  useEffect(() => {
    const myCart = JSON.parse(localStorage.getItem("myCart"));

    if (myCart) dispatch({ type: "ADD_CART", payload: myCart });
  }, []);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err) dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });
    }

    if (user?.role === "admin") {
      getData("user", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        dispatch({ type: "ADD_USERS", payload: res.users });
      });
    }
  }, [auth.token]);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
