const authRouter = require("./Authentication.routes");
const userRouter = require("./Users.routes");
const productRouter = require("./Product.routes");
const supplierRouter = require("./Supplier.routes");
const catetoryRouter = require("./Category.routes");
const productSupplierRouter = require("./ProductSupplier.routes");

module.exports = (app) => {
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/product", productRouter);
  app.use("/supplier", supplierRouter);
  app.use("/category", catetoryRouter);
  app.use("/link-product-supplier", productSupplierRouter);
};
