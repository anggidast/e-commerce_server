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
    "email": "user1",
    "password": "password1"
  }
  ```

  Response:

  ```json
  {
    "success": true,
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

- **Request Body**

  ````json
    {
      "name": "<product name>",
      "image_url": "<product image URL>",
      "price": "<product price>",
      "stock": "<product stock>"
    }
    ```

  ````

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "message": created
      "data":
        {
          "id": "<id number>",
          "name": "<product name>",
          "image_url": "<product image URL>",
          "price": "<product price>",
          "stock": "<product stock>",
          "createdAt": "2021-05-24T15:01:21.735Z",
          "updatedAt": "2021-05-24T15:01:21.735Z",
        }
    },
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
    "name": "<product name>",
    "image_url": "<product image URL>",
    "price": "<product price>",
    "stock": "<product stock>"
  }
  ```

  Response:

  ```json
  {
    "message": "created",
    "data": {
      "id": 2,
      "name": "Jacket",
      "image_url": "https://images.unsplash.com/photo-1624930199388-580d52e8106e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      "price": 850000,
      "stock": 11,
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
        "id": "<id number>",
        "name": "<product name>",
        "image_url": "<product image URL>",
        "price": "<product price>",
        "stock": "<product stock>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      },
      {
        "id": "<id number>",
        "name": "<product name>",
        "image_url": "<product image URL>",
        "price": "<product price>",
        "stock": "<product stock>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
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
      "id": "<id number>",
      "name": "<product name>",
      "image_url": "<product image URL>",
      "price": "<product price>",
      "stock": "<product stock>",
      "createdAt": "2021-05-24T15:01:21.735Z",
      "updatedAt": "2021-05-24T15:01:21.735Z"
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
      "image_url": "<product image URL>",
      "price": "<product price>",
      "stock": "<product stock>",
    }
    ```

  ````

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<id number>",
      "name": "<product name>",
      "image_url": "<product image URL>",
      "price": "<product price>",
      "stock": "<product stock>",
      "createdAt": "2021-05-24T15:01:21.735Z",
      "updatedAt": "2021-05-24T15:01:21.735Z"
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
        "id": "<id number>",
        "name": "<product name>",
        "image_url": "<product image URL>",
        "price": "<product price>",
        "stock": "<product stock>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
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
