import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import validateDetails from "../utils/validateDetails";
import { DataContext } from "./../store/GlobalState";
import { GrStatusGood } from "react-icons/gr";

function CheckoutCardOne({ stage, auth, handler }) {
  const { state, dispatch } = useContext(DataContext);
  const { orderDetails } = state;

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push("./cart");
  }, [auth]);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validateDetails(address, phone);

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    if (!err) handler(address, phone);
  };

  const handleChangeButton = () => {
    handler(address, phone);
  };

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
            <h1 style={{ textDecoration: "underline" }}>Account details</h1>
            {address !== "" ||
              (phone !== "" && (
                <button style={{ color: "red" }}>CHANGE</button>
              ))}
          </div>
          <h1>{auth.user?.name}</h1>
          <h1>{auth.user?.email}</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="address" id="address">
                Address
              </label>
              <input
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" id="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input type={"submit"} value={"Use this details"} />
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
              <GrStatusGood /> Account details
            </h1>
            <button onClick={handleChangeButton} style={{ color: "red" }}>
              CHANGE
            </button>
          </div>
          <h1>{auth.user.name}</h1>
          <h1>{auth.user.email}</h1>
          <h1>{address}</h1>
          <h1>{phone}</h1>
        </div>
      )}
    </div>
  );
}

export default CheckoutCardOne;
