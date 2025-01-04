# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description

This endpoint is used to register a new user in the system. It accepts user details such as full name, email, and password, and returns a JSON response containing an authentication token and the user details.

### Method

`POST`

### Request Body

The request body should be a JSON object with the following fields:

- `fullName`: An object containing the user's first and last name.
  - `firstName`: A string representing the user's first name. It must be at least 3 characters long.
  - `lastName`: A string representing the user's last name. It must be at least 3 characters long.
- `email`: A string representing the user's email. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 6 characters long.

#### Example

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Endpoint: `/users/login`

### Description

This endpoint allows users to log in by providing their credentials. It validates the provided username and password, and if they are correct, it generates and returns an authentication token.

### Method

`POST`

### Request Body

The request body should be a JSON object with the following fields:

- `username`: A string representing the user's username.
- `password`: A string representing the user's password.

#### Example

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

### Responses

- `200 OK`: The request was successful, and the response contains the authentication token.
  - Example:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- `400 Bad Request`: The request was invalid, typically due to incorrect username or password.
  - Example:
    ```json
    {
      "error": "Invalid username or password"
    }
    ```
- `500 Internal Server Error`: An error occurred on the server while processing the request.
  - Example:
    ```json
    {
      "error": "An error occurred while processing the request"
    }
    ```