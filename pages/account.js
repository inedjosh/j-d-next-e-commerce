import Link from "next/link";
import React from "react";

function account() {
  return (
    <div>
      <div>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </div>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  );
}

export default account;
