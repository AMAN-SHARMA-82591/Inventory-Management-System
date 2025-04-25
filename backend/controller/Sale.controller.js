const { validationResult } = require("express-validator");
const connection = require("../config/db");
const {
  GET_SALE_LIST,
  GET_SALE_BY_ID,
  CREATE_SALE,
  UPDATE_SALE,
  DELETE_SALE,
  GET_SALE_LIST_WITH_DETAILS,
} = require("../queries/saleQueries");
const handleDbError = require("../utils/dbErrorHandler");
const { checkIfExists } = require("../utils/dbHelpers");

const getSaleList = (req, res) => {
  try {
    connection.query(GET_SALE_LIST_WITH_DETAILS, (error, result) => {
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const { product_id, store_id, quantity, sales_date, total_amount } = req.body;
  try {
    const [product] = await connection
      .promise()
      .query("SELECT price, quantity AS stock FROM products WHERE id = ?", [
        product_id,
      ]);

    if (!product.length) {
      return res.status(404).json({
        success: false,
        field: "product_id",
        msg: "Invalid product ID",
      });
    }
    const { price, stock } = product[0];

    // Check Stock Availability
    if (quantity > stock) {
      return res.status(400).json({
        success: false,
        msg: `Quantity exceeds available stock. Only ${stock} units are available.`,
      });
    }

    // Validate total amount
    const expectedTotalAmount = quantity * price;
    if (
      parseFloat(total_amount) !== parseFloat(expectedTotalAmount.toFixed(2))
    ) {
      return res.status(400).json({
        success: false,
        msg: `Total Amount must be ${expectedTotalAmount.toFixed(
          2
        )} for the selected quantity and product price.`,
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

    await connection.promise().beginTransaction();

    const [createSaleResult] = await connection
      .promise()
      .execute(CREATE_SALE, [
        product_id,
        store_id,
        quantity,
        sales_date,
        total_amount,
      ]);
    if (createSaleResult.affectedRows === 0) {
      connection.promise().rollback();
      return res
        .status(500)
        .json({ success: false, msg: "Failed to create sale record." });
    }
    const newStock = stock - quantity;
    const [updateProduct] = await connection
      .promise()
      .execute("UPDATE products SET quantity = ? WHERE id = ?", [
        newStock,
        product_id,
      ]);
    if (updateProduct.affectedRows === 0) {
      connection.promise().rollback();
      return res
        .status(500)
        .json({ success: false, msg: "Failed to update product record." });
    }
    await connection.promise().commit();

    return res.status(200).json({ success: true, msg: "New sale created" });
  } catch (error) {
    await connection.promise().rollback();
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateSale = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const {
    params: { id },
    body: { product_id, store_id, quantity, sales_date, total_amount },
  } = req;
  try {
    const [product] = await connection
      .promise()
      .query("SELECT price, quantity AS stock FROM products WHERE id = ?", [
        product_id,
      ]);

    if (!product.length) {
      return res.status(404).json({
        success: false,
        field: "product_id",
        msg: "Invalid product ID",
      });
    }
    const { price, stock } = product[0];

    // Check Stock Availability
    if (quantity > stock) {
      return res.status(400).json({
        success: false,
        msg: `Quantity exceeds available stock. Only ${stock} units are available.`,
      });
    }

    // Validate total amount
    const expectedTotalAmount = quantity * price;
    if (
      parseFloat(total_amount) !== parseFloat(expectedTotalAmount.toFixed(2))
    ) {
      return res.status(400).json({
        success: false,
        msg: `Total Amount must be ${expectedTotalAmount.toFixed(
          2
        )} for the selected quantity and product price.`,
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
    connection.execute(DELETE_SALE, [id], (error, result) => {
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
