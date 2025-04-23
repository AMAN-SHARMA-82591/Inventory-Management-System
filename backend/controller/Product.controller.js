const { validationResult } = require("express-validator");
const connection = require("../config/db");
const handleDbError = require("../utils/dbErrorHandler");
const {
  GET_PRODUCT_LIST,
  GET_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} = require("../queries/productQueries");

const getProductList = (req, res) => {
  try {
    connection.query(GET_PRODUCT_LIST, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      return res.status(200).json({ success: true, result });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getProduct = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(GET_PRODUCT_BY_ID, id, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Product not found" });
      }
      return res.status(200).json({ success: true, result: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createProduct = (req, res) => {
  const {
    name,
    description,
    price,
    quantity,
    category_id = 8,
    supplier_id,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const finalCategoryId = category_id ?? 8;
  try {
    connection.execute(
      CREATE_PRODUCT,
      [name, description, price, quantity, finalCategoryId, supplier_id],
      (error) => {
        if (error) {
          return handleDbError(error, res);
        }
        return res
          .status(200)
          .json({ success: true, msg: "New product created" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateProduct = (req, res) => {
  const {
    name,
    description,
    price,
    quantity,
    category_id = 8,
    supplier_id,
  } = req.body;
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const finalCategoryId = category_id ?? 8;
  try {
    connection.execute(
      UPDATE_PRODUCT,
      [name, description, price, quantity, finalCategoryId, supplier_id, id],
      (error, result) => {
        if (error) {
          return handleDbError(error, res);
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Product not found" });
        }
        return res.status(200).json({ success: true, msg: "Product updated" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const deleteProduct = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    connection.execute(DELETE_PRODUCT, [id], (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, msg: "Product not found" });
      }
      return res.status(200).json({ success: true, msg: "Product deleted!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getProductList,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
