const { validationResult } = require("express-validator");
const connection = require("../config/db");
const {
  GET_PURCHASE_LIST,
  GET_PURCHASE_BY_ID,
  CREATE_PURCHASE,
  UPDATE_PURCHASE,
  DELETE_PURCHASE,
} = require("../queries/purchaseQueries");
const handleDbError = require("../utils/dbErrorHandler");
const { checkIfExists } = require("../utils/dbHelpers");

const getPurchaseList = (req, res) => {
  try {
    connection.query(GET_PURCHASE_LIST, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Error Fetching purchase list." });
      }
      return res.status(200).json({ success: true, result });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getPurchase = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(GET_PURCHASE_BY_ID, id, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Purchase not found" });
      }
      return res.status(200).json({ success: true, result: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createPurchase = async (req, res) => {
  const {
    product_id,
    supplier_id,
    store_id,
    quantity,
    purchase_date,
    total_cost,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    const productExists = await checkIfExists("products", "id", product_id);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        field: "store_id",
        msg: "Invalid store ID",
      });
    }
    const supplierExists = await checkIfExists("suppliers", "id", supplier_id);
    if (!supplierExists) {
      return res.status(404).json({
        success: false,
        field: "store_id",
        msg: "Invalid store ID",
      });
    }
    const storeExists = await checkIfExists("stores", "id", store_id);
    if (!storeExists) {
      return res.status(404).json({
        success: false,
        field: "store_id",
        msg: "Invalid store ID",
      });
    }
    connection.execute(
      CREATE_PURCHASE,
      [product_id, supplier_id, store_id, quantity, purchase_date, total_cost],
      (error) => {
        if (error) {
          return handleDbError(error, res);
        }
        return res
          .status(200)
          .json({ success: true, msg: "New purchase created" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updatePurchase = async (req, res) => {
  const {
    params: { id },
    body: {
      product_id,
      supplier_id,
      store_id,
      quantity,
      purchase_date,
      total_cost,
    },
  } = req;
  try {
    const productExists = await checkIfExists("products", "id", product_id);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        field: "store_id",
        msg: "Invalid store ID",
      });
    }
    const supplierExists = await checkIfExists("suppliers", "id", supplier_id);
    if (!supplierExists) {
      return res.status(404).json({
        success: false,
        field: "store_id",
        msg: "Invalid store ID",
      });
    }
    const storeExists = await checkIfExists("stores", "id", store_id);
    if (!storeExists) {
      return res.status(404).json({
        success: false,
        field: "store_id",
        msg: "Invalid store ID",
      });
    }
    connection.execute(
      UPDATE_PURCHASE,
      [
        product_id,
        supplier_id,
        store_id,
        quantity,
        purchase_date,
        total_cost,
        id,
      ],
      (error, result) => {
        if (error) {
          return handleDbError(error, res);
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Purchase not found" });
        }
        return res.status(200).json({ success: true, mst: "Purchase updated" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const deletePurchase = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    connection.execute(DELETE_PURCHASE, id, (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, msg: "Purchase not found" });
      }
      return res.status(200).json({ success: true, msg: "Purchase deleted!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getPurchase,
  getPurchaseList,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
