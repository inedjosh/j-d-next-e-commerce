import React, { useContext, useState } from "react";
import Modal from "../components/Modal";
import { updateItem } from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import { postData, putData } from "../utils/fetchData";

function Categories(props) {
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  console.log(categories);

  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.user?.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not vaild." },
      });

    if (!name && !edit) return setErr("Name cannot be empty");

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name: edit }, auth.token);
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch(updateItem(categories, id, res.category, "ADD_CATEGORY"));
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

  const handleEditCategory = (category) => {
    setId(category._id);
    setEdit(category.name);
  };

  const handleDeleteCategory = (category) => {
    setOpenModal(true);
    dispatch({
      type: "ADD_MODAL",
      payload: [
        {
          data: categories,
          id: category._id,
          title: category.name,
          type: "ADD_CATEGORY",
          category: "Category",
        },
      ],
    });
  };

  return (
    <div>
      {openModal && <Modal />}
      <h1>categories</h1>

      <form onSubmit={handleSubmit}>
        <h4>Add a new category</h4>
        {err && <small style={{ display: "block" }}>{err}</small>}
        {!edit ? (
          <div>
            <input
              type={"text"}
              placeholder={"name of category"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Add</button>
          </div>
        ) : (
          <div>
            <input
              type={"text"}
              placeholder={"name of category"}
              value={edit}
              onChange={(e) => setEdit(e.target.value)}
            />
            <button type="submit">Edit</button>
          </div>
        )}
      </form>

      <h1>my categories</h1>
      {categories.map((category) => {
        return (
          <div key={category._id}>
            <p>{category.name}</p>
            <button onClick={() => handleEditCategory(category)}>Edit</button>
            <br />
            <button onClick={() => handleDeleteCategory(category)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
