# Ecommerce API Documentation

| Method | Route            | Description                            |
| :----- | :--------------- | :------------------------------------- |
| POST   | /login           | User login to access E-Commerce        |
| POST   | /products        | Add new product to E-Commerce          |
| POST   | /products/upload | Upload image to cloudinary             |
| GET    | /products        | Show all products in E-Commerce        |
| GET    | /products/:id    | Show product in E-Commerce by ID       |
| PUT    | /products/:id    | Update all product field in E-Commerce |
| DELETE | /products/:id    | Delete product from E-Commerce         |
| POST   | /carts           | Add new product to Shopping Cart       |
| GET    | /carts           | Show all products in Shopping Cart     |
| PUT    | /carts/:id       | Update product in Shopping Cart        |
| DELETE | /carts/:id       | Delete product from Shopping Cart      |

---

## Login

Login to access E-Commerce

- **URL**

  `/login`

- **Method:**

  `POST`

- **URL Params**: none

- **Data Params**: none

- **Request Body**

  ````json
    {
      "email": "<user email>",
      "password": "<user password>"
    }
    ```

  ````

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "success": true,
      "id": "<user id>",
      "access_token": "<access token>"
    },
    ```

- **Error Response:**

  - **Code:** 403 FORBIDDEN <br />
    **Content:** `{"message": "email is not registered"}`

  OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:** `{"message": "wrong password"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Sample Call:**

  Request body:

  ```json
  {
    "email": "user1@mail.com",
    "password": "password1"
  }
  ```

  Response:

  ```json
  {
    "success": true,
    "id": 1,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyMjEyMzk5fQ.aWfNArS1JYnNYkDxrIyqFBqWuwxEKfEmFYs65t0bcjs"
  }
  ```

- **Notes:** none

---

## Add Product

Add new product to E-Commerce

- **URL**

  `/products`

- **Method:**

  `POST`

- **URL Params**: none

- **Data Params**: none

- **Headers**: `access_token`

- **Request Body**:

  ```json
  {
    "id": "<product id>",
    "name": "<product name>",
    "image_url1": "<product url 1>",
    "image_url2": "<product url 2>",
    "image_url3": "<product url 3>",
    "image_url4": "<product url 4>",
    "image_url5": "<product url 5>",
    "price": "<product price>",
    "stock": "<product stock>",
    "category": "<product category>"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "message": created
      "data":
        {
          "id": "<product id>",
          "name": "<product name>",
          "image_url1": "<product url 1>",
          "image_url2": "<product url 2>",
          "image_url3": "<product url 3>",
          "image_url4": "<product url 4>",
          "image_url5": "<product url 5>",
          "price": "<product price>",
          "stock": "<product stock>",
          "category": "<product category>",
          "createdAt": "<product created time>",
          "updatedAt": "<product updated time>"
        }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Sample Call:**

  Request body:

  ```json
  {
    "name": "Jacket",
    "image_url1": "https://images.unsplash.com/",
    "image_url2": "https://images.unsplash.com/",
    "image_url3": "https://images.unsplash.com/",
    "image_url4": "https://images.unsplash.com/",
    "image_url5": "https://images.unsplash.com/",
    "price": 850000,
    "stock": 11,
    "category": "outers"
  }
  ```

  Response:

  ```json
  {
    "message": "created",
    "data": {
      "id": 2,
      "name": "Jacket",
      "image_url1": "https://images.unsplash.com/",
      "image_url2": "https://images.unsplash.com/",
      "image_url3": "https://images.unsplash.com/",
      "image_url4": "https://images.unsplash.com/",
      "image_url5": "https://images.unsplash.com/",
      "price": 850000,
      "stock": 11,
      "category": "outers"
      "updatedAt": "2021-07-01T16:06:34.845Z",
      "createdAt": "2021-07-01T16:06:34.845Z"
    }
  }
  ```

- **Notes:** none

---

## Show All products

Show all products in E-Commerce

- **URL**

  `/products`

- **Method:**

  `GET`

- **URL Params**: none

- **Headers**: `access_token`

- **Data Params**: none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<product id>",
        "name": "<product name>",
        "image_url1": "<product url 1>",
        "image_url2": "<product url 2>",
        "image_url3": "<product url 3>",
        "image_url4": "<product url 4>",
        "image_url5": "<product url 5>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "createdAt": "<product created time>",
        "updatedAt": "<product updated time>"
      },
      {
        "id": "<product id>",
        "name": "<product name>",
        "image_url1": "<product url 1>",
        "image_url2": "<product url 2>",
        "image_url3": "<product url 3>",
        "image_url4": "<product url 4>",
        "image_url5": "<product url 5>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "createdAt": "<product created time>",
        "updatedAt": "<product updated time>"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Notes:** none

---

## Show product by ID

Show product in E-Commerce by ID

- **URL**

  `/products/:id`

- **Method:**

  `GET`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Headers**: `access_token`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<product id>",
      "name": "<product name>",
      "image_url1": "<product url 1>",
      "image_url2": "<product url 2>",
      "image_url3": "<product url 3>",
      "image_url4": "<product url 4>",
      "image_url5": "<product url 5>",
      "price": "<product price>",
      "stock": "<product stock>",
      "category": "<product category>",
      "createdAt": "<product created time>",
      "updatedAt": "<product updated time>"
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{"message": "product not found"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Notes:** none

---

## Update product

Update all product field in E-Commerce

- **URL**

  `/products/:id`

- **Method:**

  `PUT`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Headers**: `access_token`

- **Request Body**

  ````json
    {
      "name": "<product name>",
      "price": "<product price>",
      "stock": "<product stock>",
      "category": "<product category>",
    }
    ```

  ````

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<product id>",
      "name": "<product name>",
      "image_url1": "<product url 1>",
      "image_url2": "<product url 2>",
      "image_url3": "<product url 3>",
      "image_url4": "<product url 4>",
      "image_url5": "<product url 5>",
      "price": "<product price>",
      "stock": "<product stock>",
      "category": "<product category>",
      "createdAt": "<product created time>",
      "updatedAt": "<product updated time>"
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "user unauthorized"}`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{"message": "product not found"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Notes:** none

---

## Delete product

Delete product from E-Commerce

- **URL**

  `/products/:id`

- **Method:**

  `DELETE`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Headers**: `access_token`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "deleted",
      "deletedData": {
        "id": "<product id>",
        "name": "<product name>",
        "image_url1": "<product url 1>",
        "image_url2": "<product url 2>",
        "image_url3": "<product url 3>",
        "image_url4": "<product url 4>",
        "image_url5": "<product url 5>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "createdAt": "<product created time>",
        "updatedAt": "<product updated time>"
      }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "user unauthorized"}`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{"message": "product not found"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Notes:** none

---

## Add Cart

Add new product to Shopping Cart

- **URL**

  `/carts`

- **Method:**

  `POST`

- **URL Params**: none

- **Data Params**: none

- **Headers**: `access_token`

- **Request Body**:

  ```json
  {
    "amount": "<product amount>"
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "message": created
      "data":
        {
          "amount": "<product amount>",
          "ProductId": "<product id>",
          "UserId": "<user id>",
          "updatedAt": "<cart updated time>",
          "createdAt": "<cart updated time>"
        }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Sample Call:**

  Request body:

  ```json
  {
    "amount": "1"
  }
  ```

  Response:

  ```json
  {
    "message": "created",
    "data": {
      "amount": 1,
      "ProductId": 28,
      "UserId": 4,
      "updatedAt": "2021-07-09T17:13:33.907Z",
      "createdAt": "2021-07-09T17:13:33.907Z"
    }
  }
  ```

- **Notes:** none

---

## Show All carts

Show all products in Shopping Cart

- **URL**

  `/carts`

- **Method:**

  `GET`

- **URL Params**: none

- **Headers**: `access_token`

- **Data Params**: none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "<cart id>",
          "amount": "<product amount>",
          "UserId": "<user id>",
          "createdAt": "<updated time>",
          "updatedAt": "<updated time>",
          "Product": {
            "id": "<product id>",
            "name": "<product name>",
            "image_url1": "<product url 1>",
            "image_url2": "<product url 2>",
            "image_url3": "<product url 3>",
            "image_url4": "<product url 4>",
            "image_url5": "<product url 5>",
            "price": "<product price>",
            "stock": "<product stock>",
            "category": "<product category>",
            "createdAt": "<product created time>",
            "updatedAt": "<product updated time>"
          }
        },
        {
          "id": "<cart id>",
          "amount": "<product amount>",
          "UserId": "<user id>",
          "createdAt": "<updated time>",
          "updatedAt": "<updated time>",
          "Product": {
            "id": "<product id>",
            "name": "<product name>",
            "image_url1": "<product url 1>",
            "image_url2": "<product url 2>",
            "image_url3": "<product url 3>",
            "image_url4": "<product url 4>",
            "image_url5": "<product url 5>",
            "price": "<product price>",
            "stock": "<product stock>",
            "category": "<product category>",
            "createdAt": "<product created time>",
            "updatedAt": "<product updated time>"
          }
        }
      ]
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Notes:** none

---

## Update product

Update product field in Shopping Cart

- **URL**

  `/carts/:id`

- **Method:**

  `PUT`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Headers**: `access_token`

- **Request Body**

  ````json
    {
      "amount": "<product amount>",
    }
    ```

  ````

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": created
      "data":
        {
          "amount": "<product amount>",
          "ProductId": "<product id>",
          "UserId": "<user id>",
          "updatedAt": "<cart updated time>",
          "createdAt": "<cart updated time>"
        }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "user unauthorized"}`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{"message": "cart not found"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Notes:** none

---

## Delete product

Delete product from Shopping Cart

- **URL**

  `/carts/:id`

- **Method:**

  `DELETE`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Headers**: `access_token`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "deleted",
      "deletedData": {
        "amount": "<product amount>",
        "ProductId": "<product id>",
        "UserId": "<user id>",
        "updatedAt": "<cart updated time>",
        "createdAt": "<cart updated time>"
      }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "token invalid/missing, please re-login"}`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "user unauthorized"}`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{"message": "cart not found"}`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "internal server error"}`

- **Notes:** none
