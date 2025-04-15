const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ success: false, msg: "Invalid ID" });
  }

  next();
};

module.exports = validateId;
