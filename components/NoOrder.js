import Link from "next/link";
import React from "react";

function NoOrder(props) {
  return (
    <div>
      <h1> You dont have any orders yet!</h1>
      <Link href={"/"}>View products and place orders now</Link>
    </div>
  );
}

export default NoOrder;
