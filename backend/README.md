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

### Endpoint: `/users/profile`

#### Description

This endpoint retrieves the profile information of the authenticated user. It requires a valid authentication token to access the user's details.

#### Method

`GET`

#### Request Headers

- `Authorization`: A string containing the Bearer token.

#### Responses

- `200 OK`: The request was successful, and the response contains the user's profile information.
- Example:
      ```json
        {
          "id": "12345",
          "fullName": {
            "firstName": "John",
            "lastName": "Doe"
          },
          "email": "john.doe@example.com"
        }
        ```
  - `401 Unauthorized`: The request was not authorized, typically due to a missing or invalid token.
      - Example:
        ```json
        {
          "error": "Unauthorized"
        }
        ```
  - `500 Internal Server Error`: An error occurred on the server while processing the request.
      - Example:
        ```json
        {
          "error": "An error occurred while processing the request"
        }
        ```

### Endpoint: `/users/logout`

  #### Description

  This endpoint logs out the authenticated user by invalidating their authentication token.

  #### Method

  `POST`

  #### Request Headers

  - `Authorization`: A string containing the Bearer token.

  #### Responses

  - `200 OK`: The request was successful, and the user has been logged out.
    - Example:
        ```json
        {
          "message": "Successfully logged out"
        }
        ```
  - `401 Unauthorized`: The request was not authorized, typically due to a missing or invalid token.
    - Example:
        ```json
        {
          "error": "Unauthorized"
        }
        ```
  - `500 Internal Server Error`: An error occurred on the server while processing the request.
    - Example:
        ```json
        {
          "error": "An error occurred while processing the request"
        }

# Captain Registration Endpoint Documentation

### Endpoint: `/captains/register`

#### Description

This endpoint is used to register a new captain in the system. It accepts captain details such as full name, email, password, and vehicle information, and returns a JSON response containing an authentication token and the captain's details.

#### Method

`POST`

#### Request Body

The request body should be a JSON object with the following fields:

- `fullName`: An object containing the captain's first and last name.
  - `firstName`: A string representing the captain's first name. It must be at least 3 characters long.
  - `lastName`: A string representing the captain's last name. It must be at least 3 characters long.
- `email`: A string representing the captain's email. It must be a valid email address.
- `password`: A string representing the captain's password. It must be at least 6 characters long.
- `vehicle`: An object containing the vehicle details.
  - `color`: A string representing the vehicle's color. It must be at least 3 characters long.
  - `plate`: A string representing the vehicle's plate. It must be at least 3 characters long.
  - `capacity`: A number representing the vehicle's capacity. It must be at least 1.
  - `vehicleType`: A string representing the vehicle's type. It must be one of 'car', 'motorcycle', or 'auto'.

##### Example

```json
        {
          "fullName": {
            "firstName": "Jane",
            "lastName": "Doe"
          },
          "email": "jane.doe@example.com",
          "password": "password123",
          "vehicle": {
            "color": "Red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car"
          }
        }
```

#### Responses

  - `201 Created`: The request was successful, and the response contains the authentication token and captain's details.
    - Example:
        ```json
            {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              "captain": {
                "id": "67890",
                "fullName": {
                  "firstName": "Jane",
                  "lastName": "Doe"
                },
                "email": "jane.doe@example.com",
                "vehicle": {
                  "color": "Red",
                  "plate": "XYZ123",
                  "capacity": 4,
                  "vehicleType": "car"
                }
              }
            }
        ```
  - `400 Bad Request`: The request was invalid, typically due to missing or incorrect fields.
    - Example:
        ```json
            {
              "error": "Invalid request data"
            }
        ```
  - `500 Internal Server Error`: An error occurred on the server while processing the request.
    - Example:
        ```json
            {
              "error": "An error occurred while processing the request"
            }
        ```
        ### Endpoint: `/captains/login`

        #### Description

        This endpoint allows captains to log in by providing their credentials. It validates the provided email and password, and if they are correct, it generates and returns an authentication token.

        #### Method

        `POST`

        #### Request Body

        The request body should be a JSON object with the following fields:

        - `email`: A string representing the captain's email.
        - `password`: A string representing the captain's password.

        ##### Example

        ```json
        {
          "email": "jane.doe@example.com",
          "password": "password123"
        }
        ```

        #### Responses

        - `200 OK`: The request was successful, and the response contains the authentication token.
          - Example:
            ```json
            {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
            ```
        - `400 Bad Request`: The request was invalid, typically due to incorrect email or password.
          - Example:
            ```json
            {
              "error": "Invalid email or password"
            }
            ```
        - `500 Internal Server Error`: An error occurred on the server while processing the request.
          - Example:
            ```json
            {
              "error": "An error occurred while processing the request"
            }
            ```
            ### Endpoint: `/captains/profile`

            #### Description

            This endpoint retrieves the profile information of the authenticated captain. It requires a valid authentication token to access the captain's details.

            #### Method

            `GET`

            #### Request Headers

            - `Authorization`: A string containing the Bearer token.

            #### Responses

            - `200 OK`: The request was successful, and the response contains the captain's profile information.
              - Example:
                ```json
                {
                  "id": "67890",
                  "fullName": {
                    "firstName": "Jane",
                    "lastName": "Doe"
                  },
                  "email": "jane.doe@example.com",
                  "vehicle": {
                    "color": "Red",
                    "plate": "XYZ123",
                    "capacity": 4,
                    "vehicleType": "car"
                  }
                }
                ```
            - `401 Unauthorized`: The request was not authorized, typically due to a missing or invalid token.
              - Example:
                ```json
                {
                  "error": "Unauthorized"
                }
                ```
            - `500 Internal Server Error`: An error occurred on the server while processing the request.
              - Example:
                ```json
                {
                  "error": "An error occurred while processing the request"
                }
                ```

            ### Endpoint: `/captains/logout`

            #### Description

            This endpoint logs out the authenticated captain by invalidating their authentication token.

            #### Method

            `POST`

            #### Request Headers

            - `Authorization`: A string containing the Bearer token.

            #### Responses

            - `200 OK`: The request was successful, and the captain has been logged out.
              - Example:
                ```json
                {
                  "message": "Successfully logged out"
                }
                ```
            - `401 Unauthorized`: The request was not authorized, typically due to a missing or invalid token.
              - Example:
                ```json
                {
                  "error": "Unauthorized"
                }
                ```
            - `500 Internal Server Error`: An error occurred on the server while processing the request.
              - Example:
                ```json
                {
                  "error": "An error occurred while processing the request"
                }
                ```
