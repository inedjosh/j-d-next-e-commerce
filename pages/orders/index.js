import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import NoOrder from "../../components/NoOrder";
import { patchData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";

function order(props) {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;
  const router = useRouter();

  const getTotal = (cart) => {
    const res = cart.reduce((prev, item) => {
      return prev + item.amount * item.quantity;
    }, 0);
    return res;
  };

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push("/");
  }, [auth]);

  const markDelivered = (id) => {
    console.log(id);
  };

  if (orders.lenght === 0) return <NoOrder />;

  return (
    <div>
      <h1>
        {auth.user?.role === "admin" && auth.user?.root === true
          ? "Users orders"
          : "My Orders"}
      </h1>
      {orders.map((order) => {
        return (
          <div>
            <Link href={`/orders/${order._id}`}>
              <a>
                <div style={{ padding: 20 }} key={order._id}>
                  <h1>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </h1>
                  <h1>Number of orders: {order.cart.length}</h1>
                  <h1>Total: N{getTotal(order.cart)}</h1>
                  <div>
                    <h1>
                      {" "}
                      Delivered:{" "}
                      {order.delivered ? "Delivered" : "Not Delivered"}
                    </h1>
                  </div>
                </div>
              </a>
            </Link>
            {auth.user.role === "admin" && auth.user.root === true && (
              <button
                onClick={() => markDelivered(order._id)}
                style={{
                  backgroundColor: "orange",
                  width: 200,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Mark as delivered
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default order;
