const { validationResult } = require("express-validator");
const connection = require("../config/db");
const {
  GET_STORE_LIST,
  GET_STORE_BY_ID,
  CREATE_STORE,
  UPDATE_STORE,
  DELETE_STORE,
} = require("../queries/storeQueries");
const handleDbError = require("../utils/dbErrorHandler");

const getStoreList = (req, res) => {
  try {
    connection.query(GET_STORE_LIST, (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, msg: "Error Fetching store list." });
      }
      return res.status(200).json({ success: true, result });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const getStore = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(GET_STORE_BY_ID, id, (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (!result.length) {
        return res.status(404).json({ success: false, msg: "Store not found" });
      }
      return res.status(200).json({ success: true, result: result[0] });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const createStore = (req, res) => {
  const { name, location, manager } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    connection.execute(CREATE_STORE, [name, location, manager], (error) => {
      if (error) {
        return handleDbError(error, res);
      }
      return res.status(200).json({ success: true, msg: "New store created" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const updateStore = (req, res) => {
  const {
    params: { id },
    body: { name, location, manager },
  } = req;
  try {
    connection.execute(
      UPDATE_STORE,
      [name, location, manager, id],
      (error, result) => {
        if (error) {
          return handleDbError(error, res);
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Store not found" });
        }
        return res.status(200).json({ success: true, mst: "Store updated" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const deleteStore = (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    connection.execute(DELETE_STORE, id, (error, result) => {
      if (error) {
        return handleDbError(error, res);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, msg: "Store not found" });
      }
      return res.status(200).json({ success: true, msg: "Store deleted!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getStore,
  getStoreList,
  createStore,
  updateStore,
  deleteStore,
};
