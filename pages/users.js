import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import NoAccess from "../components/NoAccess";
import { updateItem } from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import { patchData } from "../utils/fetchData";

function users(props) {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth } = state;
  const router = useRouter();

  const [role, setRole] = useState("user");
  const [openAssignModal, setOpenAssignModal] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleAssign = (customer) => {
    if (customer.role === "admin")
      dispatch({ type: "NOTIFY", payload: { error: "Cannot resasign admin" } });

    if (customer.role !== "admin") {
      setRole(customer.role);
      setOpenAssignModal(customer);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData(
      `user/${openAssignModal._id}`,
      { role, root: true },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch(
        updateItem(
          users,
          openAssignModal._id,
          {
            ...openAssignModal,
            role,
            root: true,
          },
          "ADD_USERS"
        )
      );

      setOpenAssignModal("");

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handleDelete = (customer) => {
    setOpenModal(true);
    dispatch({
      type: "ADD_MODAL",
      payload: [
        {
          data: users,
          id: customer._id,
          title: customer.name,
          type: "ADD_USERS",
          category: "User",
        },
      ],
    });
  };

  return (
    <div>
      {openAssignModal !== "" && (
        <div>
          <form onSubmit={handleUpdateRole}>
            <h5>Assign role to {openAssignModal.name}</h5>
            <div>
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value={"user"}>User</option>
                <option value={"manager"}>Manager</option>
                <option value={"admin"}>Admin</option>
              </select>
              <input type={"submit"} value="assign" />
            </div>
          </form>
        </div>
      )}
      {openModal && <Modal />}
      <h1>Total number of customers: {users.length}</h1>
      {users?.map((customer) => {
        return (
          <div key={customer._id}>
            <p>customer Name: {customer.name}</p>
            <p>Role: {customer.role}</p>
            {customer.role !== "admin" && (
              <button onClick={() => handleAssign(customer)}>
                Assign role
              </button>
            )}
            {customer.role !== "admin" && (
              <button
                style={{ display: "block" }}
                onClick={() => handleDelete(customer)}
              >
                Delete user
              </button>
            )}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default users;
