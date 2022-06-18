import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducer";
import { getData } from "./../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    orderDetails: {},
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

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

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
