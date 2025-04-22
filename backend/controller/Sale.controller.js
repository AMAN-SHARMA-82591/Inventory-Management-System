const { validationResult } = require("express-validator");
const connection = require("../config/db");
const {
  GET_SALE_LIST,
  GET_SALE_BY_ID,
  CREATE_SALE,
  UPDATE_SALE,
  DELETE_SALE,
} = require("../queries/saleQueries");
const handleDbError = require("../utils/dbErrorHandler");
const { checkIfExists } = require("../utils/dbHelpers");

const getSaleList = (req, res) => {
  try {
    connection.query(GET_SALE_LIST, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Error Fetching sale list." });
      }
      return res.status(200).json({ success: true, result });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getSale = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(GET_SALE_BY_ID, id, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res.status(404).json({ success: false, msg: "Sale not found" });
      }
      return res.status(200).json({ success: true, result: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createSale = async (req, res) => {
  const { product_id, store_id, quantity, sales_date, total_amount } = req.body;
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
        field: "product_id",
        msg: "Invalid product ID",
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
      CREATE_SALE,
      [product_id, store_id, quantity, sales_date, total_amount],
      (error) => {
        if (error) {
          return handleDbError(error, res);
        }
        return res.status(200).json({ success: true, msg: "New sale created" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateSale = async (req, res) => {
  const {
    params: { id },
    body: { product_id, store_id, quantity, sales_date, total_amount },
  } = req;
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
        field: "product_id",
        msg: "Invalid product ID",
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
      UPDATE_SALE,
      [product_id, store_id, quantity, sales_date, total_amount, id],
      (error, result) => {
        if (error) {
          return handleDbError(error, res);
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Sale not found" });
        }
        return res.status(200).json({ success: true, mst: "Sale updated" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const deleteSale = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    connection.execute(DELETE_SALE, id, (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, msg: "Sale not found" });
      }
      return res.status(200).json({ success: true, msg: "Sale deleted!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getSale,
  getSaleList,
  createSale,
  updateSale,
  deleteSale,
};
