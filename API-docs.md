# Kanban API Documentation

| Method | Route      | Description                               |
| :----- | :--------- | :---------------------------------------- |
| POST   | /register  | Create new user account to access Kanban  |
| POST   | /login     | User login to access Kanban               |
| POST   | /tasks     | Add new task to Kanban                    |
| GET    | /tasks     | Show all tasks in Kanban                  |
| GET    | /tasks/:id | Show task in Kanban by ID                 |
| PUT    | /tasks/:id | Update all task field in Kanban           |
| PATCH  | /tasks/:id | Update only task category field in Kanban |
| DELETE | /tasks/:id | Delete task from Kanban                   |

---

## Register

Create new user account to access Kanban

- **URL**

  `/register`

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

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "success": true,
      "user": {
        "id": "<user ID>",
        "email": "<user email>"
      }
    },
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `"message": "email <user email> is already registered"`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `"message": "email cannot be empty/null"`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `"message": "email format is wrong"`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `"message": "password cannot be empty/null"`

    OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `"message": "password minimum character is 6"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error`

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
    "user": {
      "id": 14,
      "email": "user1"
    }
  }
  ```

- **Notes:** none

---

## Login

Login to access Kanban

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

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "success": true,
      "access_token": "<access token>"
    },
    ```

- **Error Response:**

  - **Code:** 403 FORBIDDEN <br />
    **Content:** `"message": "email is not registered"`

  OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:** `"message": "wrong password"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error`

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

## Add Task

Add new task to Kanban

- **URL**

  `/tasks`

- **Method:**

  `POST`

- **URL Params**: none

- **Data Params**: none

- **Request Body**

  ````json
    {
      "title": "<task title>",
      "category": "<task category>"
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
          "title": "<task title>",
          "category": "<task category: backlog/todo/doing/done>",
          "createdAt": "2021-05-24T15:01:21.735Z",
          "updatedAt": "2021-05-24T15:01:21.735Z",
          "User": {
            "email": "<user email>"
          }
        }
    },
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "token invalid/missing, please re-login"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error`

- **Sample Call:**

  Request body:

  ```json
  {
    "title": "Make kanban server",
    "category": "backlog"
  }
  ```

  Response:

  ```json
  {
    "id": 1,
    "title": "Make kanban server",
    "category": "backlog",
    "createdAt": "2021-05-24T15:01:21.735Z",
    "updatedAt": "2021-05-24T15:01:21.735Z",
    "User": {
      "email": "user1@mail.com"
    }
  }
  ```

- **Notes:** none

---

## Show All tasks

Show all tasks in Kanban

- **URL**

  `/tasks`

- **Method:**

  `GET`

- **URL Params**: none

- **Data Params**: none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<id number>",
        "title": "<task title>",
        "category": "<task category: backlog/todo/doing/done>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z",
        "User": {
          "email": "<user email>"
        }
      },
      {
        "id": "<id number>",
        "title": "<task title>",
        "category": "<task category: backlog/todo/doing/done>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z",
        "User": {
          "email": "<user email>"
        }
      }
    ]
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "token invalid/missing, please re-login"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error`

- **Notes:** none

---

## Show task by ID

Show task in Kanban by ID

- **URL**

  `/tasks/:id`

- **Method:**

  `GET`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<id number>",
      "title": "<task title>",
      "category": "<task category: backlog/todo/doing/done>",
      "createdAt": "2021-05-24T15:01:21.735Z",
      "updatedAt": "2021-05-24T15:01:21.735Z"
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "token invalid/missing, please re-login"`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `"message": "task not found"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error"`

- **Notes:** none

---

## Update task

Update all task field in Kanban

- **URL**

  `/tasks/:id`

- **Method:**

  `PUT`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Request Body**

  ````json
    {
      "title": "<task title>",
      "category": "<task category: backlog/todo/doing/done>"
    }
    ```

  ````

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<id number>",
      "title": "<task title>",
      "category": "<task category: backlog/todo/doing/done>",
      "createdAt": "2021-05-24T15:01:21.735Z",
      "updatedAt": "2021-05-24T15:01:21.735Z"
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "token invalid/missing, please re-login"`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "user unauthorized"`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `"message": "task not found"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error"`

- **Notes:** none

---

## Update task Status

Update only task status field in Kanban

- **URL**

  `/tasks/:id`

- **Method:**

  `PATCH`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Request Body**

  ````json
    {
      "category": "<task category: backlog/todo/doing/done>"
    }
    ```

  ````

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<id number>",
      "title": "<task title>",
      "category": "<task category: backlog/todo/doing/done>",
      "createdAt": "2021-05-24T15:01:21.735Z",
      "updatedAt": "2021-05-24T15:01:21.735Z"
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "token invalid/missing, please re-login"`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "user unauthorized"`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `"message": "task not found"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error"`

- **Notes:** none

---

## Delete task

Delete task from Kanban

- **URL**

  `/tasks/:id`

- **Method:**

  `DELETE`

- **URL Params**

  `/:id`

  **Required:**

  `id=[integer]`

- **Data Params**: none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "deleted",
      "deletedData": {
        "id": "<id number>",
        "title": "<task title>",
        "category": "<task category: backlog/todo/doing/done>",
        "createdAt": "2021-05-24T15:01:21.735Z",
        "updatedAt": "2021-05-24T15:01:21.735Z"
      }
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "token invalid/missing, please re-login"`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `"message": "user unauthorized"`

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:** `"message": "task not found"`

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `"message": "internal server error"`

- **Notes:** none
