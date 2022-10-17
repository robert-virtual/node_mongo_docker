const { Router } = require("express");
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/mongo");

const products = getCollection("products");
const prodsRouter = Router();

prodsRouter.get("/", async (req, res) => {
  try {
    const { active } = req.query;
    const filter = { ...req.query, active: active == "false" ? false : true };
    const data = await products.find(filter).toArray();
    res.json({
      msg: `get products`,
      filter,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: ` ${error}` });
  }
});

prodsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await products.findOne({ _id: new ObjectId(id) });
    res.json({ msg: `get ${id} product`, data });
  } catch (error) {
    res.status(500).json({ error: ` ${error}` });
  }
});

prodsRouter.post("/", async (req, res) => {
  try {
    const data = await products.insertOne(req.body);
    res.json({ msg: `post product`, data });
  } catch (error) {
    res.status(500).json({ error: ` ${error}` });
  }
});

prodsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await products.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: req.body,
      }
    );
    res.json({ msg: `put ${id} product`, data });
  } catch (error) {
    res.status(500).json({ error: ` ${error}` });
  }
});

prodsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: { active: false } }
    );
    res.json({ msg: `delete ${id} product`, data });
  } catch (error) {
    res.status(500).json({ error: ` ${error}` });
  }
});

module.exports = prodsRouter;
