const handleDbError = (error, res) => {
  console.error("Database Error:", error);

  switch (error.code) {
    case "ER_DUP_ENTRY":
      return res.status(400).json({ success: false, msg: "Duplicate entry" });
    case "ER_ROW_IS_REFERENCED_2":
      return res.status(400).json({
        success: false,
        msg: "Cannot delete product: It is referenced in sales records.",
      });
    case "ER_BAD_FIELD_ERROR":
      return res
        .status(400)
        .json({ success: false, msg: "Invalid field in query" });
    case "ER_NO_REFERENCED_ROW_2":
      return res
        .status(400)
        .json({ success: false, msg: "Foreign key constraint fails" });
    case "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD":
      return res
        .status(400)
        .json({ success: false, msg: "Invalid value for one of the fields" });
    default:
      return res
        .status(500)
        .json({ success: false, msg: "Database error occurred" });
  }
};

module.exports = handleDbError;
