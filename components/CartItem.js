import { useEffect } from "react";
import { decrease, deleteItem, increase } from "../store/Actions";

const CartItem = ({ cart, dispatch, item }) => {
  useEffect(() => {
    if (item.quantity === 10) {
      dispatch({
        type: "NOTIFY",
        payload: {
          error: "Contact our customer care to make bulk orders please",
        },
      });
    }

    return () => {
      setTimeout(() => {
        dispatch({ type: "NOTIFY", payload: { error: "" } });
      }, 3000);
    };
  }, [item.quantity]);

  return (
    <div className="flex">
      <table className="table-auto " key={item._id}>
        <thead>
          <tr className="w-full bg-gray-400">
            <th>Item</th>
            <th>Unit price</th>
            <th>Qty</th>
            <th>Sub total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex">
                <img
                  className="w-60 object-cover"
                  src={item.images[0].url}
                  alt={item.title}
                />
                <div>
                  <p>{item.title}</p>
                  {item.colors.map((color) => {
                    return <div key={color}>{color}</div>;
                  })}
                </div>
              </div>
            </td>
            <td>
              <p>{item.amount}</p>
            </td>
            <td>
              <p>quantity:{item.quantity}</p>
              <div>
                <div>
                  <span>increase product </span>
                  <button
                    disabled={item.quantity === 10 ? true : false}
                    onClick={() => dispatch(increase(cart, item._id))}
                  >
                    +
                  </button>
                </div>
                <div>
                  <span>increase product </span>
                  <button
                    onClick={() => dispatch(decrease(cart, item._id))}
                    disabled={item.quantity === 1 ? true : false}
                  >
                    -
                  </button>
                </div>
                <div>
                  <span></span>
                  <button
                    onClick={() =>
                      dispatch(deleteItem(cart, item._id, "ADD_CART"))
                    }
                  >
                    Delete product{" "}
                  </button>
                </div>
              </div>
            </td>
            <td>
              {" "}
              <p>Amount: {item.quantity * item.amount}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartItem;
