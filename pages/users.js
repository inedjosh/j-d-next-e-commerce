import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../store/GlobalState";

function users(props) {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth } = state;
  const router = useRouter();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (auth.user?.role !== "admin") {
      router.push("/");
    } else {
      setCustomers(auth.users);
    }
  }, [auth.user]);

  return (
    <div>
      {customers?.map((customer) => {
        return <div key={customer._id}></div>;
      })}
    </div>
  );
}

export default users;
