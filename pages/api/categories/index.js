import connectDB from "../../../utils/connectDB";
import auth from "../../../middleware/auth";
import Categories from "./../../../models/Categories";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCategories(req, res);
      break;
    case "POST":
      await createCategories(req, res);
      break;
  }
};

const createCategories = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is invalid" });

    const { name } = req.body;

    if (!name)
      return res.status(400).json({ err: "Name cannot be left blank" });

    const newCategory = new Categories({ name });

    await newCategory.save();

    res.json({
      message: "Success!, new catrgory created",
      newCategory,
    });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    res.json({ categories });
  } catch (error) {
    return res.status(500).json({ err: err.message });
  }
};
