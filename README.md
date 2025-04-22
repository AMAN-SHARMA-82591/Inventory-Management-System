# Inventory Management System

## Overview

The **Inventory Management System** is a web application designed to efficiently manage products, categories, suppliers, purchases, sales, and stores. It provides a scalable backend powered by APIs and a user-friendly front-end interface for seamless operations.

---

## Features

### Front-End Features

- **Product Management**: Create, update, and delete products; associate them with suppliers and categories.
- **Category Management**: View available categories or dynamically manage them (optional feature).
- **Supplier Management**: Track and manage supplier details with product associations.
- **Procurement Management**: Add purchase records, linking products and suppliers.
- **Sales Tracking**: Record sales transactions with product details and store references.
- **Store Management**: Manage multiple stores, including inventory distribution and location details.
- **Dashboard**: Visualize key metrics like total sales, purchases, inventory levels, and store statistics.

### Backend Features

- **API-Driven Architecture**:
  - **Categories API**: Manage product categories.
  - **Products API**: CRUD operations for products.
  - **Suppliers API**: Manage supplier details.
  - **Product-Suppliers API**: Define and query many-to-many relationships between products and suppliers.
  - **Purchases API**: Record procurement transactions.
  - **Sales API**: Manage sales details.
  - **Stores API**: Handle multi-location store data.
- **Relational Database Design**: Normalized tables for categories, products, suppliers, purchases, sales, and stores.
- **CORS Support**: Enables secure cross-origin communication between front-end and backend.

---

## Technologies Used

### Front-End

- **React.js**: Build dynamic and responsive user interfaces.
- **CSS Frameworks**: Improve styling and user experience.
- **Axios**: Simplify API communication.

### Backend

- **Node.js**: A scalable backend runtime.
- **Express.js**: Middleware and API routing.
- **MySQL**: Relational database for structured data.
- **CORS**: Support for secure cross-origin requests.

---

## Installation

### Front-End

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
