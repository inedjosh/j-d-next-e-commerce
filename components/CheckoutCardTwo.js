import React, { useState } from "react";
import { GrStatusGood } from "react-icons/gr";

function CheckoutCardTwo({ stage, handler, auth, cart }) {
  const [button, setButton] = useState("door-delivery");

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
      {stage ? (
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ textDecoration: "underline" }}>Delivery Method</h1>
          </div>
          <form onSubmit={() => handler()}>
            <div>
              <input
                value={"door-delivery"}
                onChange={(e) => setButton(e.target.value)}
                checked={button === "door-delivery"}
                type={"radio"}
              />
              <span>Door Delivery</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis eum debitis at, magni sit eligendi placeat totam
                itaque tempore labore.
              </p>
            </div>
            <div>
              <input
                value={"pickup-location"}
                onChange={(e) => setButton(e.target.value)}
                checked={button === "pickup-location"}
                type={"radio"}
              />
              <span>Pickup location</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                velit incidunt illo, doloremque perferendis qui assumenda
                aliquid. Explicabo, eum perferendis.
              </p>
            </div>
            <div>
              <input type={"submit"} value={"Proceed to Payment"} />
            </div>
          </form>
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
              <GrStatusGood /> Delivery Method
            </h1>

            <button onClick={() => handler()} style={{ color: "red" }}>
              CHANGE
            </button>
          </div>
          <p>
            Prefered delivery Method: {button}{" "}
            {button === "pickup-location"
              ? "(the pick up location will be commuinacted to you via phone call)"
              : "(Delivery will be made to specified address)"}
          </p>
        </div>
      )}
    </div>
  );
}

export default CheckoutCardTwo;
