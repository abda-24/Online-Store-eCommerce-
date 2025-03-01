 🛒 E-Commerce Store - Angular 17

 🚀 Overview
Welcome to **E-Commerce Store**, a fully functional online shopping platform designed for seamless and secure transactions. This project is built using **Angular 17** for the frontend, consuming a RESTful **API** for backend services. The platform provides a smooth shopping experience with user authentication, product management, cart functionality, and secure payments.

---

## ✨ Features
### 🛍️ Shopping & Products
- View all products with filtering and sorting.
- Product details page with images, price, and description.
- Add to cart functionality with real-time cart count.

### 🔐 Authentication
- User registration and login with **JWT Authentication**.
- Role-based access control (Admin & Customer).

### 🛒 Shopping Cart
- Add, remove, and update product quantities in the cart.
- Cart count updates dynamically.
- Persist cart state even after page refresh.

### 💳 Secure Payments
- Integration with **Stripe API** for seamless transactions.
- Order summary before checkout.
- Order tracking and history.

### 📦 Orders Management
- Customers can view their order history.
- Admin can manage orders and update statuses.


---

## 🔧 Technologies Used
### **Frontend:** Angular 17
- Angular 17 + TypeScript
- RxJS for state management
- Bootstrap & SCSS for UI
- Angular Router for navigation

### **Backend:** RESTful API
- Consumes a RESTful API for all backend operations.
- Handles authentication, product management, and orders.
- Uses **JWT Authentication** for security.


## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/abda-24/OnlineStore-Angular.git
cd OnlineStore-Angular
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Run the Angular App**
```bash
ng serve
```
- The frontend will be available at **http://localhost:4200/**.

### **4️⃣ Connect to Backend API**
1. Ensure the backend API is running and accessible.
2. Update the **API base URL** in the environment file:
   ```typescript
   export const environment = {
       production: false,
       apiUrl: 'http://localhost:5000/api'
   };
   ```
3. Make sure CORS is enabled on the backend to allow frontend requests.

---

## 🔗 API Documentation
For detailed API endpoints and request examples, refer to the **Postman API Documentation**:
[Postman API Docs](https://documenter.getpostman.com/view/5709532/2s93JqTRWN#4f774c92-f954-4b00-892a-8b2db190be45)




## 📩 Contact
📧 Email:contact.elbana@gmail.com
🐙 GitHub: [abda-24](https://github.com/abda-24)


