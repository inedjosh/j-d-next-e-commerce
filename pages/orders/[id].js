import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import LoadingPage from "../../components/LoadingPage";
import OrderDetails from "../../components/OrderDetails";

function orderId(props) {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;
  const router = useRouter();

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setUserDetails(newArr);
  }, [orders]);

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push("/");
  }, [auth]);

  if (!userDetails) return <LoadingPage />;

  return (
    <div>
      <OrderDetails props={userDetails} />
    </div>
  );
}

export default orderId;
