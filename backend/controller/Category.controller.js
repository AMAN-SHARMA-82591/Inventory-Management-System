const { validationResult } = require("express-validator");
const connection = require("../config/db");
const {
  GET_CATEGORY_LIST,
  GET_CATEGORY_BY_ID,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} = require("../queries/categoryQueries");
const handleDbError = require("../utils/dbErrorHandler");

const getCategoryList = (req, res) => {
  try {
    connection.query(GET_CATEGORY_LIST, (error, result) => {
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

const getCategory = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(GET_CATEGORY_BY_ID, id, (error, result) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res
          .status(400)
          .json({ success: false, msg: "Error fetching Data" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Category not found" });
      }
      return res.status(200).json({ success: true, result: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createCategory = (req, res) => {
  const { name, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    connection.execute(CREATE_CATEGORY, [name, description], (error) => {
      if (error) {
        return handleDbError(error, res);
      }
      return res
        .status(200)
        .json({ success: true, msg: "New category created" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateCategory = (req, res) => {
  const {
    params: { id },
    body: { name, description },
  } = req;
  try {
    connection.execute(
      UPDATE_CATEGORY,
      [name, description, id],
      (error, result) => {
        if (error) {
          return handleDbError(error, res);
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Category not found" });
        }
        return res.status(200).json({ success: true, mst: "Category updated" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const deleteCategory = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    connection.execute(DELETE_CATEGORY, [id], (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, msg: "Category not found" });
      }
      return res.status(200).json({ success: true, msg: "Category deleted!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getCategory,
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategory,
};
