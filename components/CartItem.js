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
    <div key={item._id}>
      <img width={150} height={150} src={item.images[0].url} alt={item.title} />

      <p>{item.title}</p>
      <p>{item.amount}</p>
      <p>{item.description}</p>
      <p>{item.category}</p>
      {item.colors.map((color) => {
        return <div key={color}>{color}</div>;
      })}

      <div>
        <p>Amount: {item.quantity * item.amount}</p>
        <p>quantity:{item.quantity}</p>
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
            onClick={() => dispatch(deleteItem(cart, item._id, "ADD_CART"))}
          >
            Delete product{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
