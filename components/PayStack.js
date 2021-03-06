import React, { useContext } from "react";
import { usePaystackPayment } from "react-paystack";
import { postData } from "../utils/fetchData";
import { DataContext } from "./../store/GlobalState";
import { useRouter } from "next/router";

const Paystack = ({ auth, total, cart, address, phone }) => {
  const { state, dispatch } = useContext(DataContext);
  const { orders } = state;
  const router = useRouter();
  const config = {
    reference: new Date().getTime(),
    email: auth.user.email,
    amount: total * 100,
    publicKey: process.env.PAYSTACK_KEY,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData(
      "order",
      { address, phone, cart, total, reference },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({ type: "ADD_CART", payload: [] });
      router.push("/account");
      dispatch({ type: "ADD_ORDERS", payload: [...orders, res.newOrder] });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
        style={{
          backgroundColor: "green",
          color: "#fff",
          width: 300,
          height: 40,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Pay with Paystack
      </button>
    </div>
  );
};

export default Paystack;
