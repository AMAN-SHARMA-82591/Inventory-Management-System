const connection = require("../config/db");
const handleDbError = require("../utils/dbErrorHandler");
const { GET_PRODUCT_INPUT_LIST } = require("../queries/productQueries");
const {
  TOTAL_SALES,
  TOTAL_PURCHASE,
  TOTAL_PRODUCTS_ADDED,
  TOTAL_STORES_ADDED,
  TOTAL_CATEGORY_STOCK,
  TOP_TEN_PRODUCTS_STOCK,
  SALES_AND_PURCHASE_DATA,
} = require("../queries/dashboardQueries");

const getDashboardData = async (req, res) => {
  try {
    const [
      [sales],
      [purchase],
      [products],
      [stores],
      [topProductStock],
      [totalCategoryStock],
      [salePurchaseData],
    ] = await Promise.all([
      connection.promise().query(TOTAL_SALES),
      connection.promise().query(TOTAL_PURCHASE),
      connection.promise().query(TOTAL_PRODUCTS_ADDED),
      connection.promise().query(TOTAL_STORES_ADDED),
      connection.promise().query(TOP_TEN_PRODUCTS_STOCK),
      connection.promise().query(TOTAL_CATEGORY_STOCK),
      connection.promise().query(SALES_AND_PURCHASE_DATA),
    ]);
    return res.status(200).json({
      success: true,
      result: {
        topProductStock: topProductStock.map((value) => [
          value.name,
          value.quantity,
          value.price,
        ]),
        totalCategoryStock,
        totalSales: sales[0].total_sales,
        totalStores: stores[0].total_stores,
        totalPurchase: purchase[0].total_purchase,
        totalProducts: products[0].total_products,
        totalSalesAndPurchase: salePurchaseData,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getDashboardData,
};
