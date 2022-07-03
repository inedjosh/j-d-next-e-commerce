import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const {
      title,
      amount,
      inStock,
      description,
      content,
      category,
      images,
      productType,
      colors,
      sizes,
    } = req.body;

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
      return res.status(400).json({ err: "Please add all the fields." });

    const newProduct = new Products({
      title: title.toLowerCase(),
      amount,
      inStock: true,
      description,
      content,
      category,
      images,
      productType: "alreadyMade",
      colors,
      sizes,
      sold: 0,
    });

    await newProduct.save();

    res.json({ msg: "Success! Created a new product" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
