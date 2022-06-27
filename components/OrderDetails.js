import React from "react";

function OrderDetails({ props }) {
  //   console.log(props[0].address);
  return (
    <div>
      {props.map((prop) => {
        return (
          <div key={prop._id}>
            <h1>Ref: {prop.reference?.reference}</h1>
            <h1>user details</h1>
            <h1>Name: {prop.user.name}</h1>
            <h1>Email: {prop.user.email}</h1>
            <h1>Address: {prop.address}</h1>
            <h1>Product details</h1>
            {prop.cart.map((cart) => {
              return (
                <div key={cart._id} style={{ display: "flex" }}>
                  <img
                    src={cart.images[0]}
                    alt={cart.title}
                    style={{ width: 100 }}
                  />
                  <p>{cart.title}</p>
                  <p style={{ color: "red" }}>
                    {cart.amount * prop.cart.length}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default OrderDetails;
