import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import valid from "../utils/valid";
import { DataContext } from "./../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userData = {
      name,
      email,
      password,
      confirmPassword,
    };

    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);

    if (res.err) dispatch({ type: "NOTIFY", payload: { error: res.err } });
    if (!res.err) {
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth, router]);

  return (
    <div>
      <h1>register</h1>
      <form>
        <div>
          <label>Full Name</label>
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Link href="/account">
          <a>Go back</a>
        </Link>
        <input type={"submit"} value={"register"} onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Signup;
