const saleRouter = require("./Sale.routes");
const userRouter = require("./Users.routes");
const storeRouter = require("./Store.routes");
const productRouter = require("./Product.routes");
const supplierRouter = require("./Supplier.routes");
const catetoryRouter = require("./Category.routes");
const purchaseRouter = require("./Purchase.routes");
const authRouter = require("./Authentication.routes");
const productSupplierRouter = require("./ProductSupplier.routes");

module.exports = (app) => {
  app.use("/auth", authRouter);
  app.use("/sale", saleRouter);
  app.use("/users", userRouter);
  app.use("/store", storeRouter);
  app.use("/product", productRouter);
  app.use("/supplier", supplierRouter);
  app.use("/category", catetoryRouter);
  app.use("/purchase", purchaseRouter);
  app.use("/link-product-supplier", productSupplierRouter);
};
