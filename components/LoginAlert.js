import Link from "next/link";
import React from "react";

function LoginAlert(props) {
  return (
    <div>
      <h3> You are presntly not logged in, please log in to continue! </h3>
      <Link href={"/login"}>
        <a>Login Now</a>
      </Link>
    </div>
  );
}

export default LoginAlert;
