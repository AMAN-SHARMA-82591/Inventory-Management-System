const TOTAL_SALES =
  "SELECT SUM(total_amount) AS total_sales FROM sales WHERE sales_date >= NOW() - INTERVAL 30 DAY";
const TOTAL_PURCHASE =
  "SELECT SUM(total_cost) AS total_purchase FROM purchase WHERE purchase_date >= NOW() - INTERVAL 30 DAY";
const TOTAL_PRODUCTS_ADDED = "SELECT COUNT(*) AS total_products FROM products";
const TOTAL_STORES_ADDED = "SELECT COUNT(*) AS total_stores FROM stores";
const TOP_TEN_PRODUCTS_STOCK =
  "SELECT name, quantity, price FROM products WHERE quantity > 0 ORDER BY quantity ASC LIMIT 10";
const TOTAL_CATEGORY_STOCK =
  "SELECT c.name AS category_name, SUM(p.quantity) AS product_quantity FROM products AS p JOIN categories AS c WHERE p.category_id = c.id GROUP BY c.name HAVING SUM(p.quantity) > 0 LIMIT 6";
const SALES_AND_PURCHASE_DATA = `SELECT 
    'purchase' AS type,
    products.name,
    purchase.quantity,
    purchase_date AS date,
    total_cost AS amount
FROM
    purchase
        JOIN
    products
WHERE
    purchase.product_id = products.id
        AND purchase_date >= NOW() - INTERVAL 1 YEAR 
UNION ALL SELECT 
    'sale' AS type,
    products.name,
    sales.quantity,
    sales_date AS date,
    total_amount AS amount
FROM
    sales
        JOIN
    products
WHERE
    sales.product_id = products.id
        AND sales_date >= NOW() - INTERVAL 1 YEAR`;

module.exports = {
  TOTAL_SALES,
  TOTAL_PURCHASE,
  TOTAL_STORES_ADDED,
  TOTAL_PRODUCTS_ADDED,
  TOTAL_CATEGORY_STOCK,
  TOP_TEN_PRODUCTS_STOCK,
  SALES_AND_PURCHASE_DATA,
};
