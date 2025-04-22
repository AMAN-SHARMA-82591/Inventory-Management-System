const { validationResult } = require("express-validator");
const connection = require("../config/db");
const handleDbError = require("../utils/dbErrorHandler");
const {
  GET_PRODUCT_SUPPLIER_LIST,
  GET_PRODUCT_SUPPLIER_BY_ID,
  CREATE_PRODUCT_SUPPLIER,
  UPDATE_PRODUCT_SUPPLIER,
  DELETE_PRODUCT_SUPPLIER,
} = require("../queries/productSupplierQueries");
const { checkIfExists } = require("../utils/dbHelpers");

const getProductSupplierList = (req, res) => {
  try {
    connection.query(GET_PRODUCT_SUPPLIER_LIST, (error, result) => {
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

const getProductSupplier = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(GET_PRODUCT_SUPPLIER_BY_ID, id, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Product supplier not found" });
      }
      return res.status(200).json({ success: true, result: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createProductSupplier = async (req, res) => {
  const { product_id, supplier_id } = req.body;
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
      return res.status(400).json({
        success: false,
        field: "product_id",
        msg: "Invalid product ID",
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

    connection.execute(CREATE_PRODUCT_SUPPLIER, [product_id, supplier_id]);

    return res.status(200).json({
      success: true,
      msg: "New product supplier created",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateProductSupplier = async (req, res) => {
  const { product_id, supplier_id } = req.body;
  const { id } = req.params;
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
      return res.status(400).json({
        success: false,
        field: "product_id",
        msg: "Invalid product ID",
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

    const [result] = connection.execute(UPDATE_PRODUCT_SUPPLIER, [
      product_id,
      supplier_id,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        msg: "Product supplier not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Product supplier details updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const deleteProductSupplier = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    connection.execute(DELETE_PRODUCT_SUPPLIER, id, (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, msg: "Product supplier not found" });
      }
      return res
        .status(200)
        .json({ success: true, msg: "Product supplier details deleted!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getProductSupplierList,
  getProductSupplier,
  createProductSupplier,
  updateProductSupplier,
  deleteProductSupplier,
};
