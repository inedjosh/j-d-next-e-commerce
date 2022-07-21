import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { patchData } from "../utils/fetchData";
import { DataContext } from "./../store/GlobalState";

function Account() {
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setName(auth.user?.name);
    setEmail(auth.user?.email);
  }, [auth]);

  const getTotal = (cart) => {
    const res = cart.reduce((prev, item) => {
      return prev + item.amount * item.quantity;
    }, 0);
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== auth.user.name) updateProfile();
  };

  const updateProfile = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData("user", { name }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      console.log(res);
      setEditProfile(false);
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setErr("Passwords do not match!");

    if (password === "") setErr("Password cannot be empty!");

    if (password === confirmPassword) {
      setErr(null);
      updatePassword();
    }
  };

  const updatePassword = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData("user/updatePassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      console.log(res);
      setEditProfile(false);
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  return (
    <div className="p-5">
      <h1 className="uppercase text-center pt-5 font-normal mb-5 ">
        {auth.user?.role === "admin" && auth.user?.root === true
          ? "Admin Profile"
          : "My Profile"}
      </h1>
      <div className="shadow px-2">
        {editProfile ? (
          <div>
            <div className="flex justify-between px-10 border-b  items-center">
              <h2 className="py-5 font-bold capitalize">Edit Profile</h2>
              <button
                className="flex uppercase items-center"
                onClick={() => setEditProfile(false)}
              >
                <svg
                  class="w-5 h-4 text-red-600 font-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="text-sm">Close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col px-3">
              <div className="flex flex-col mt-3">
                <label htmlFor="name" id="name" className="text-sm">
                  Name
                </label>
                <input
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full md:w-1/3 outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="email" id="email" className="text-sm">
                  Email
                </label>
                <input
                  type={"text"}
                  value={email}
                  readOnly={true}
                  className="w-full md:w-1/3 outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
                />
              </div>
              <div>
                <input
                  type={"submit"}
                  value={"Save"}
                  className="bg-primary text-white py-2 px-4 my-2"
                />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex justify-between px-3 border-b  items-center">
              <h2 className="py-5 font-bold capitalize flex items-center">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="ml-1"> Account information</span>
              </h2>
              <button
                className="flex uppercase items-center"
                onClick={() => setEditProfile(true)}
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <span className="text-sm">edit</span>
              </button>
            </div>
            <div className="px-3">
              <p className="text-sm py-3 ">Name: {name}</p>
              <p className="text-sm py-3">Email: {email}</p>
            </div>
            <div className="px-3">
              {changePassword && (
                <div>
                  <form className="flex flex-col">
                    {err && <p style={{ color: "red" }}>{err}</p>}
                    <div className="flex flex-col ">
                      <label
                        htmlFor="password"
                        id="password"
                        className="text-sm"
                      >
                        password
                      </label>
                      <input
                        type={"password"}
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="w-full md:w-1/3 outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="confirmPassword"
                        id="confirmPassword"
                        className="text-sm"
                      >
                        confirmPassword
                      </label>
                      <input
                        type={"password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full md:w-1/3 outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
                      />
                    </div>
                  </form>
                </div>
              )}
              {changePassword ? (
                <div className="flex justify-between w-full md:w-1/3 mt-2 ">
                  <input
                    onClick={handlePasswordSubmit}
                    type={"submit"}
                    value={"Save"}
                    className="bg-primary text-white py-2 px-4 my-2"
                  />
                  <button
                    onClick={() => setChangePassword(false)}
                    className="mr-3 text-sm text-gray-900"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setChangePassword(true)}
                  className="bg-primary text-white py-2 px-4 my-2"
                >
                  Change password
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="shadow mt-16">
        <div className="flex justify-between px-3 border-b  items-center">
          <h2 className="py-5 font-bold capitalize flex ">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <span className="ml-1">Orders</span>
          </h2>
        </div>

        {orders.length > 1 ? (
          <div className="px-3 flex flex-col">
            <table className="table-auto">
              <thead>
                <tr className=" bg-gray-400">
                  <th>Date</th>
                  <th>Product</th>
                  <th>No of orders</th>
                  <th>Total amount</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.cart.length}</td>
                      <td>N{getTotal(order.cart)}</td>
                      <td>N{getTotal(order.cart)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {auth.user.role === "admin" && (
              <Link href={"/orders"}>
                <a className="bg-primary text-white py-2 px-4 my-2">
                  View All orders
                </a>
              </Link>
            )}
          </div>
        ) : (
          <div className="px-3">
            <h1>You have no orders yet</h1>
            <Link href={"/"}>
              <a>Check out products</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
