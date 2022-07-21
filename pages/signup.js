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
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="uppercase mt-10">register</h1>
      <p className="text-gray-400 mb-10 text-center text-sm">
        Register and enjoy our amazing products and offers
      </p>
      <form>
        <div className="flex flex-col my-5">
          <label className="text-sm">Full Name</label>
          <input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[90vw] md:w-[500px]  py-3
            px-4 text-gray-700 bg-white lg:w-[700px] outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
          />
        </div>
        <div className="flex flex-col my-5">
          <label className="text-sm">Email</label>
          <input
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-[500px]  py-3
            px-4 text-gray-700 bg-white lg:w-[700px] outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
          />
        </div>
        <div className="flex flex-col my-5">
          <label className="text-sm">Password</label>
          <input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full md:w-[500px]  py-3
            px-4 text-gray-700 bg-white lg:w-[700px] outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
          />
        </div>
        <div className="flex flex-col my-5">
          <label className="text-sm">Confirm Password</label>
          <input
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full md:w-[500px]  py-3
            px-4 text-gray-700 bg-white lg:w-[700px] outline-none  leading-tight
            focus:outline-none
            focus:bg-white
            focus:border-gray-300
            border-gray-300"
          />
        </div>

        <input
          type={"submit"}
          value={"register"}
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
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-primary">Login</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
