const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // create a new category
});

router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // delete a category by its `id` value
});

module.exports = router;
