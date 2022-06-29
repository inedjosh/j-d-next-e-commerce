import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { patchData } from "../utils/fetchData";
import { DataContext } from "./../store/GlobalState";

function account() {
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
    <div style={{ position: "relative" }}>
      <div>
        <h1>
          {auth.user?.role === "admin" && auth.user?.root === true
            ? "Admin Profile"
            : "My Profile"}
        </h1>
        {editProfile ? (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" id="name">
                  Name
                </label>
                <input
                  type={"text"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" id="email">
                  Email
                </label>
                <input type={"text"} value={email} readOnly={true} />
              </div>
              <div>
                <input type={"submit"} value={"Save"} />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Account Overview</h1>
              <button onClick={() => setEditProfile(true)}>edit</button>
            </div>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        )}

        {changePassword && (
          <div>
            <form>
              {err && <p style={{ color: "red" }}>{err}</p>}
              <div>
                <label htmlFor="password" id="password">
                  password
                </label>
                <input
                  type={"password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" id="confirmPassword">
                  confirmPassword
                </label>
                <input
                  type={"password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  onClick={handlePasswordSubmit}
                  type={"submit"}
                  value={"Save"}
                />
              </div>
            </form>
          </div>
        )}

        <div style={{ marginTop: 50 }}>
          <button onClick={() => setChangePassword(true)}>
            Change password
          </button>
        </div>
      </div>
      <div style={{ marginTop: 50 }}>
        <h1>Pending Orders</h1>
        {orders.length > 1 ? (
          <div>
            {orders.map((order) => {
              return (
                <div style={{ display: "flex" }} key={order._id}>
                  <h1>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </h1>

                  <h1>Number of orders: {order.cart.length}</h1>
                  <h1>Total: N{getTotal(order.cart)}</h1>
                </div>
              );
            })}
            <Link href={"/orders"}>
              <a>View All orders</a>
            </Link>
          </div>
        ) : (
          <div>
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

export default account;
