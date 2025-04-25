const GET_PRODUCT_LIST = (fieldName) => {
  const updatedField =
    fieldName === "all"
      ? `
    p.id,
    p.name,
    p.description,
    p.price,
    p.quantity,
    c.name AS category_name
  `
      : fieldName;
  let query = `
    SELECT 
      ${updatedField}
    FROM
        products AS p
        LEFT JOIN
      categories AS c ON p.category_id = c.id
    ORDER BY quantity DESC
    `;
  return query;
};
const GET_PRODUCT_INPUT_LIST = (filterQuantity) => {
  let query = "SELECT id,name FROM products";
  if (parseInt(filterQuantity)) {
    query += " WHERE quantity > 0";
  }
  return query;
};
const GET_PRODUCT_BY_ID = (selectedFields) =>
  `SELECT ${selectedFields} FROM products WHERE id = ?`;
const CREATE_PRODUCT =
  "INSERT INTO products (name, description, price, quantity, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?)";
const UPDATE_PRODUCT =
  "UPDATE products  SET name = ?, description = ?, price = ?, quantity = ?, category_id = ?, supplier_id = ? WHERE id = ?";
const DELETE_PRODUCT = "DELETE FROM products WHERE id = ?";

// Overall Inventory Queries
const GET_TOTAL_PRODUCTS =
  "SELECT COUNT(*) AS total_products FROM products WHERE created_at >= NOW() - INTERVAL 30 DAY";
const GET_TOTAL_STORES = "SELECT COUNT(*) AS total_stores FROM stores";
const GET_TOTAL_REVENUE = `
  SELECT COUNT(store_id) AS total_stores, SUM(revenue) AS total_revenue
  FROM (SELECT store_id, SUM(total_amount) AS revenue
  FROM sales
  WHERE sales_date >= NOW() - INTERVAL 30 DAY
  GROUP BY store_id) AS subQuery
`;
const GET_TOP_SELLING = `
  SELECT COUNT(product_id) AS total_products, SUM(sold) AS total_sold_items, SUM(sales_value) AS total_sales_value
  FROM (SELECT product_id, SUM(quantity) AS sold, SUM(total_amount) AS sales_value
  FROM sales
  WHERE sales_date >= NOW() - INTERVAL 30 DAY
  GROUP BY product_id
  ORDER BY sold DESC
  LIMIT 5) AS subquery
`;
const GET_LOW_STOCKS =
  "SELECT COUNT(*) AS not_in_stock FROM products WHERE quantity < 10";

module.exports = {
  GET_PRODUCT_LIST,
  GET_PRODUCT_BY_ID,
  GET_LOW_STOCKS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_TOP_SELLING,
  GET_TOTAL_STORES,
  GET_TOTAL_REVENUE,
  GET_TOTAL_PRODUCTS,
  GET_PRODUCT_INPUT_LIST,
};
