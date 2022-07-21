import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import loginValidate from "../utils/loginValidate";
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
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="uppercase mt-10">Login</h1>
      <p className="text-gray-400 mb-10 text-center text-sm">
        Login and start shopping
      </p>
      <form>
        <div className="flex flex-col my-5">
          <label>Email</label>
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90vw] md:w-[500px]  py-3
            px-4 text-gray-700 bg-white lg:w-[700px] outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
          />
        </div>
        <div className="flex flex-col my-5">
          <label>Password</label>
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[90vw] md:w-[500px]  py-3
            px-4 text-gray-700 bg-white lg:w-[700px] outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
          />
          <Link href="/forgotpasword">
            <a className="text-gray-900 underline ml-1 mt-3 text-right text-sm">
              Forgot password
            </a>
          </Link>
        </div>

        <input
          type={"submit"}
          value={"login"}
          onClick={handleSubmit}
          className="w-full md:w-[500px]  py-3
            px-4 lg:w-[700px] outline-none  leading-tight
           bg-gray-700 
           text-white mt-10
            border-gray-300   uppercase
          text-bold"
        />
        <div className="flex justify-center mt-5">
          <p className="flex items-center text-sm ">
            <span className="text-gray-400"> Dont have an account?</span>{" "}
            <Link href="/signup">
              <a className="text-gray-900 underline ml-1"> Register</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
