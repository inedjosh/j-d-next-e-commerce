import React, { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { postData, putData } from "../utils/fetchData";

function categories(props) {
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  console.log(categories);

  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.user?.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not vaild." },
      });

    if (!name) return setErr("Name cannot be empty");

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORIES"));
    } else {
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({
        type: "ADD_CATEGORY",
        payload: [...categories, res.newCategory],
      });
    }

    setName("");
    setId("");
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleEditCategory = (catogory) => {
    setId(catogory._id);
    setName(catogory.name);
  };

  return (
    <div>
      <h1>categories</h1>

      <form onSubmit={handleSubmit}>
        <h4>Add a new category</h4>
        {err && <small style={{ display: "block" }}>{err}</small>}
        <input
          type={"text"}
          placeholder={"name of category"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h1>my categories</h1>
      {categories.map((category) => {
        return (
          <div key={category._id}>
            <p>{category.name}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(category)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default categories;
