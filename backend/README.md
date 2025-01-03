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
