import React from "react";
import { GrStatusGood } from "react-icons/gr";
import Paystack from "./PayStack";

function CheckoutCardThree({ stage, cart, auth, dispatch, phone, address }) {
  const subTotal = cart.reduce((prev, item) => {
    return prev + item.amount * item.quantity;
  }, 0);
  const deliveryFee = 500;
  const total = subTotal + deliveryFee;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        margin: 15,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      {!stage ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ textDecoration: "underline" }}>Payment </h1>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <GrStatusGood /> Payment
            </h1>
          </div>
          <div
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <h1 style={{ padding: 10 }}>Order summary</h1>
            {cart.map((cart) => {
              return (
                <div style={{ padding: 10 }} key={cart._id}>
                  <p>
                    {cart.quantity}x {cart.title} - {cart.amount}
                  </p>
                  <p>N{cart.amount * cart.quantity}</p>
                  <small>Delivery handled by J-D commerce</small>
                  <hr />
                </div>
              );
            })}
            <div style={{ padding: 10 }}>
              <h1>sub total: N{subTotal}</h1>
              <h1>Deivery fee: {deliveryFee}</h1>
              <hr />
              <h1>Total: {total}</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Paystack
                auth={auth}
                total={total}
                cart={cart}
                dispatch={dispatch}
                address={address}
                phone={phone}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutCardThree;
