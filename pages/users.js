import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import NoAccess from "../components/NoAccess";
import { DataContext } from "../store/GlobalState";

function users(props) {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth } = state;
  const router = useRouter();

  const [assignRole, setAssignRole] = useState("user");

  const handleAssign = (customer) => {
    if (customer.role === "admin")
      dispatch({ type: "NOTIFY", payload: { error: "Cannot resasign admin" } });

    //   if(customer.role !== 'admin')
  };

  return (
    <div>
      <h1>Total number of customers: {users.length}</h1>
      {users?.map((customer, index) => {
        return (
          <div key={customer._id}>
            <p>customer Name: {customer.name}</p>
            <p>Role: {customer.role}</p>
            <button onClick={() => handleAssign(customer)}>Assign role</button>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default users;
