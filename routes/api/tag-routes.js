const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      incude: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"],
      },
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // create a new tag
});

router.put("/:id", async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: tagId } }
    );

    if (updatedTag[0] === 1) {
      res.json({ message: "Tag updated successfully" });
    } else {
      res.status(400).json({ message: "Tag not updated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const tagId = req.params.id;
    const deletedTag = await Tag.destroy({
      where: { id: tagId },
    });
    if (!deletedTag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  // delete on tag by its `id` value
});

module.exports = router;
