const { validationResult } = require("express-validator");
const connection = require("../config/db");
const handleDbError = require("../utils/dbErrorHandler");
const {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_LOW_STOCKS,
  GET_TOP_SELLING,
  GET_TOTAL_STORES,
  GET_PRODUCT_LIST,
  GET_TOTAL_REVENUE,
  GET_PRODUCT_BY_ID,
  GET_TOTAL_PRODUCTS,
  GET_PRODUCT_INPUT_LIST,
} = require("../queries/productQueries");
const { checkIfExists } = require("../utils/dbHelpers");
const { CREATE_PURCHASE } = require("../queries/purchaseQueries");

const getProductList = (req, res) => {
  const { fieldName } = req.query;
  try {
    connection.query(GET_PRODUCT_LIST(fieldName), (error, result) => {
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

const getProductInputList = (req, res) => {
  const { filterQuantity } = req.query;
  try {
    connection.query(
      GET_PRODUCT_INPUT_LIST(filterQuantity),
      (error, result) => {
        if (error) {
          console.error("Error fetching data:", error);
          return res
            .status(400)
            .json({ success: false, msg: "Error fetching Data" });
        }
        return res.status(200).json({ success: true, result });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getOverallInventoryDetails = async (req, res) => {
  try {
    const [[products], [stores], [revenue], [topSelling], [lowStocks]] =
      await Promise.all([
        connection.promise().query(GET_TOTAL_PRODUCTS),
        connection.promise().query(GET_TOTAL_STORES),
        connection.promise().query(GET_TOTAL_REVENUE),
        connection.promise().query(GET_TOP_SELLING),
        connection.promise().query(GET_LOW_STOCKS),
      ]);

    return res.status(200).json({
      success: true,
      msg: "Overall Inventory",
      result: {
        total_products: products[0].total_products,
        total_stores: stores[0].total_stores,
        revenue: revenue[0],
        topSelling: topSelling[0],
        not_in_stock: lowStocks[0].not_in_stock,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getProduct = (req, res) => {
  const { id } = req.params;
  const { fieldName } = req.query;
  try {
    connection.query(
      GET_PRODUCT_BY_ID(fieldName || "*"),
      id,
      (error, result) => {
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
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const { name, description, price, quantity, category_id, supplier_id } =
    req.body;
  const finalCategoryId = category_id ?? 8;
  try {
    const categoryExists = await checkIfExists("categories", "id", category_id);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        field: "category_id",
        msg: "Invalid category ID",
      });
    }
    const supplierExists = await checkIfExists("suppliers", "id", supplier_id);
    if (!supplierExists) {
      return res.status(400).json({
        success: false,
        field: "supplier_id",
        msg: "Invalid supplier ID",
      });
    }
    await connection.promise().beginTransaction();

    const [productResult] = await connection
      .promise()
      .execute(CREATE_PRODUCT, [
        name,
        description,
        price,
        quantity,
        finalCategoryId,
        supplier_id,
      ]);
    if (productResult.affectedRows === 0) {
      await connection.promise().rollback();
      return res
        .status(500)
        .json({ success: false, msg: "Failed to create product." });
    }
    const newProductId = productResult.insertId;
    const purchaseDate = new Date().toISOString().slice(0, 10);
    const [purchaseResult] = await connection
      .promise()
      .execute(CREATE_PURCHASE, [
        newProductId,
        supplier_id,
        1,
        quantity,
        purchaseDate,
        (price * quantity).toFixed(2),
      ]);

    if (purchaseResult.affectedRows === 0) {
      await connection.promise().rollback();
      return res
        .status(500)
        .json({ success: false, msg: "Failed to create purchase record." });
    }
    await connection.promise().commit();
    res.status(200).json({ success: true, msg: "New product created!" });
  } catch (error) {
    await connection.promise().rollback();
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const {
    name,
    description,
    price,
    quantity,
    category_id = 8,
    supplier_id,
  } = req.body;
  const { id } = req.params;
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
  getProductInputList,
  getOverallInventoryDetails,
};
