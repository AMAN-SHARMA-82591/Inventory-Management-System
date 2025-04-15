const { validationResult } = require("express-validator");
const connection = require("../config/db");
const {
  GET_SUPPLIER_LIST,
  GET_SUPPLIER_BY_ID,
  CREATE_SUPPLIER,
  UPDATE_SUPPLIER,
  DELETE_SUPPLIER,
} = require("../queries/supplierQueries");
const handleDbError = require("../utils/dbErrorHandler");

const getSupplierList = (req, res) => {
  try {
    connection.query(GET_SUPPLIER_LIST, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Error Fetching supplier list." });
      }
      return res.status(200).json({ success: true, result });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getSupplier = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(GET_SUPPLIER_BY_ID, id, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Supplier not found" });
      }
      return res.status(200).json({ success: true, result: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createSupplier = (req, res) => {
  const { name, contact_person, email, address } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    connection.query(
      CREATE_SUPPLIER,
      [name, contact_person, email, address],
      (error) => {
        if (error) {
          return handleDbError(error, res);
        }
        return res
          .status(200)
          .json({ success: true, msg: "New supplier created" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateSupplier = (req, res) => {
  const { name, contact_person, email, address } = req.body;
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
    connection.query(
      UPDATE_SUPPLIER,
      [name, contact_person, email, address, id],
      (error, result) => {
        if (error) {
          return handleDbError(error, res);
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Supplier not found" });
        }
        return res
          .status(200)
          .json({ success: true, msg: "Supplier information updated" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const deleteSupplier = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    connection.query(DELETE_SUPPLIER, id, (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, msg: "Supplier not found" });
      }
      return res
        .status(200)
        .json({ success: true, msg: "Supplier information deleted!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getSupplierList,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
