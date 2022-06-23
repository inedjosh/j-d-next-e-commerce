import React, { useContext, useState, useEffect } from "react";
import CheckoutCardOne from "../components/CheckoutCardOne";
import CheckoutCardThree from "../components/CheckoutCardThree";
import CheckoutCardTwo from "../components/CheckoutCardTwo";
import { DataContext } from "./../store/GlobalState";
import { useRouter } from "next/router";

function checkout(props) {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const router = useRouter();

  const [stageOne, setStageOne] = useState(true);
  const [stageTwo, setStgaeTwo] = useState(false);
  const [stageThree, setStgaeThree] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const setStage_one = (address, phone) => {
    setStageOne(!stageOne);
    setStgaeTwo(false);
    setStgaeThree(!stageThree);
    setAddress(address);
    setPhone(phone);
  };
  const setStage_two = () => {
    setStageOne(false);
    setStgaeTwo(!stageTwo);
    setStgaeThree(true);
  };

  useEffect(() => {
    if (Object.keys(auth).length === 0 || auth.user === undefined)
      router.push("./cart");
  }, [auth]);

  return (
    <div>
      <h1>CHECKOUT</h1>

      <CheckoutCardOne handler={setStage_one} stage={stageOne} auth={auth} />
      <CheckoutCardTwo
        stage={stageTwo}
        handler={setStage_two}
        cart={cart}
        auth={auth}
      />
      <CheckoutCardThree
        stage={stageThree}
        cart={cart}
        auth={auth}
        address={address}
        phone={phone}
        dispatch={dispatch}
        orders={orders}
      />
    </div>
  );
}

export default checkout;
