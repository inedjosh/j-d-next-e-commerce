import React, { useContext } from "react";
import { DataContext } from "./../store/GlobalState";

function Notify() {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  return (
    <div>
      {notify.loading && <p style={{ color: "blue" }}>Loading</p>}
      {notify.error && <p style={{ color: "red" }}>{notify.error}</p>}
      {notify.success && <p style={{ color: "green" }}>{notify.success}</p>}
      {notify.null && null}
    </div>
  );
}

export default Notify;
