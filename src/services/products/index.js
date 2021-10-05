import express from "express";
import ProductModel from "./model.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res) => {
  // create a new product.
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found!");
    }
  } catch (error) {
    res.send(error);
  }
});

productsRouter.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (product) {
      res.send(updatedProduct);
    } else {
      res.status(404).send("Product not found!");
    }
  } catch (error) {
    res.send(error);
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send("Product not found!");
    }
  } catch (error) {
    res.send(error);
  }
});

export default productsRouter;
