import connectDB from "../../../utils/connectDb";
import Products from "../../../models/ProductModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    const product = await Products.findById(productId);
    if (!product)
      return res.status(400).json({ err: "This product does not exist." });

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { productId } = req.query;
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
      !description ||
      !content ||
      category === "all" ||
      images.length === 0 ||
      !productType ||
      colors === [] ||
      sizes === []
    )
      return res.status(400).json({ err: "Please add all the fields." });

    await Products.findOneAndUpdate(
      { _id: productId },
      {
        title: title.toLowerCase(),
        amount,
        inStock,
        description,
        content,
        category,
        images,
        productType,
        colors,
        sizes,
      }
    );

    res.json({ msg: "Success! Updated a product" });
    console.log(
      title,
      amount,
      inStock,
      description,
      content,
      category,
      images,
      productType,
      colors,
      sizes
    );
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { productId } = req.query;

    await Products.findByIdAndDelete(productId);
    res.json({ msg: "Deleted a product." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
