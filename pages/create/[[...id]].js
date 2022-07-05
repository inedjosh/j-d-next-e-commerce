import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";

const ProductsManager = () => {
  const initialState = {
    title: "",
    amount: 0,
    description: "",
    content: "",
    category: "",
    inStock: true,
  };
  const [product, setProduct] = useState(initialState);
  const { title, amount, inStock, description, content, category } = product;

  const [productType, setProductType] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);

  const typeOfProduct = [
    {
      id: 1,
      type: "alreadyMade",
    },
    {
      id: 2,
      type: "bespoke",
    },
  ];

  const color = [
    {
      id: 1,
      color: "black",
    },
    {
      id: 2,
      color: "white",
    },
    {
      id: 3,
      color: "orange",
    },
    {
      id: 4,
      color: "red",
    },
    {
      id: 5,
      color: "blue",
    },
    {
      id: 6,
      color: "pink",
    },
    {
      id: 7,
      color: "yellow",
    },
    {
      id: 8,
      color: "brown",
    },
  ];

  const size = [
    {
      id: 1,
      size: "small",
    },
    {
      id: 2,
      size: "medium",
    },
    {
      id: 3,
      size: "large",
    },
    {
      id: 4,
      size: "x-large",
    },
    {
      id: 5,
      size: "xx-large",
    },
  ];

  const handleSelectType = (e, type) => {
    e.preventDefault();
    setProductType(type.type);
  };

  const handleSelectSize = (e, size) => {
    e.preventDefault();

    if (sizes.includes(size.size)) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Size has been added already." },
      });
    } else {
      setSizes([...sizes, size.size]);
    }
  };
  const handleSelectColor = (e, color) => {
    e.preventDefault();

    if (colors.includes(color.color)) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Color has been added already." },
      });
    } else {
      setColors([...colors, color.color]);
    }
  };

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
        setProductType(res.product.productType);
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024 * 5)
        return (err = "The largest image size is 5mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setImages([...images, ...newImages]);
  };

  console.log(images);

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.user?.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });

    if (
      !title ||
      !amount ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0 ||
      productType === [] ||
      colors === [] ||
      sizes === []
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];

    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    console.log(media);
    let res;
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        {
          ...product,
          images: [...imgOldURL, ...media],
          productType,
          colors,
          sizes,
          title,
          inStock,
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        {
          ...product,
          images: [...imgOldURL, ...media],
          productType,
          colors,
          sizes,
        },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div className="products_manager">
      <Head>
        <title>Products Manager</title>
      </Head>
      <form className="row">
        <div className="col-md-6">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                value={amount}
                placeholder="Price"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="price">In Stock</label>
              <input
                type="number"
                name="inStock"
                value={inStock}
                placeholder="inStock"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            placeholder="Description"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={description}
          />

          <textarea
            name="content"
            id="content"
            cols="30"
            rows="6"
            placeholder="Content"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={content}
          />

          <div className="input-group-prepend px-0 my-2">
            <label htmlFor="category">Select category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={handleChangeInput}
              className="custom-select text-capitalize"
            >
              <option value="all">All Products</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group-prepend px-0 my-2">
            <label htmlFor="productType">Select product type</label>
            <div className="inputDiv">
              {typeOfProduct.map((product, index) => (
                <div key={index}>
                  <button
                    className="btn"
                    onClick={(e) => handleSelectType(e, product)}
                  >
                    {product.type}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="input-group-prepend px-0 my-2">
            <label htmlFor="colors">Select color</label>
            <div className="inputDiv">
              {color.map((item, index) => (
                <div key={index}>
                  <button
                    className="btn"
                    onClick={(e) => handleSelectColor(e, item)}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.color}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="input-group-prepend px-0 my-2">
            <label htmlFor="sizes">Select size</label>
            <div className="inputDiv">
              {size.map((item, index) => (
                <div key={index}>
                  <button
                    className="btn"
                    onClick={(e) => handleSelectSize(e, item)}
                  >
                    {item.size}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-info my-2 px-4"
          >
            {onEdit ? "Update" : "Create"}
          </button>
        </div>

        <div className="col-md-6 my-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file border rounded">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
            </div>
          </div>

          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />

                <span onClick={() => deleteImage(index)}>X</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductsManager;
