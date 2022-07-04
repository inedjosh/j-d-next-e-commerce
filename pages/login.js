import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import loginValidate from "../utils/LoginValidate";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

function Login() {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userData = {
      email,
      password,
    };

    const errMsg = loginValidate(email, password);

    // if(!errMsg) dispatch({type: 'NOTIFY', payload:{loading: true}})
    if (errMsg) dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    if (!errMsg) dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/login", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    if (!res.err) {
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });

      dispatch({
        type: "AUTH",
        payload: {
          token: res.access_token,
          user: res.user,
        },
      });
    }

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div>
      <h1>Login</h1>
      <form>
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
        <Link href="/account">
          <a>Go back</a>
        </Link>
        <input type={"submit"} value={"login"} onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Login;
