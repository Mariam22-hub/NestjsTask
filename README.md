A secure and modular API built using NestJS with user authentication, role-based access control, and CRUD functionality for products.

Features
Authentication: User registration and login using JWT.
Role-Based Access Control: Admin and User roles with restricted access.
Product Management: Create, read, update, and delete products.
Validation: Robust data validation using class-validator.
Environment Configuration: Easy setup using .env files.
Setup Instructions
1. Prerequisites
Node.js: Ensure Node.js is installed (version 14.x or higher).
npm: Comes with Node.js. Ensure npm is installed.
MongoDB: Install and run a MongoDB instance locally or use a cloud-hosted MongoDB URI.
2. Clone the Repository
bash```
git clone <repository-url>
cd <repository-folder>```
3. Install Dependencies
bash ```npm install```
4. Set Up Environment Variables
Create a .env file in the root of the project with the following variables:
# Application
bash ```PORT=3000```

# JWT Configuration
bash ```JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s```

# MongoDB
bash ```MONGODB_URI=mongodb://localhost:27017/nest-api```
Replace your_jwt_secret with a secure string.
Adjust MONGODB_URI if you're using a cloud-hosted MongoDB instance.
5. Run the Application
bash ```npm run start```
The API will be accessible at `http://localhost:3000`.

API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login and get a JWT token
Products
Method	Endpoint	Description
POST	/products	Create a new product
GET	/products	Get all products
GET	/products/:id	Get product by ID
PATCH	/products/:id	Update product by ID
DELETE	/products/:id	Delete product by ID
Role-Based Access Control
Admin: Can create, update, delete products and manage user roles.
User: Can create, update, and view products they own.
Testing with Postman
Import the provided Postman Collection.
Use the Register and Login endpoints to get JWT tokens.
Add the JWT token to the Authorization header for protected routes.
