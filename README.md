# SwiftPay

SwiftPay is a secure and efficient payment application that enables users to manage their accounts, perform transactions, and track balances seamlessly.

## Tech Stack

- **Frontend:** React with Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB

## API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### User Authentication

#### 1. **Sign Up**

**Endpoint:** `POST /user/signup`

**Request Body:**

```json
{
    "username": "name@gmail.com",
    "firstName": "user",
    "lastName": "name",
    "password": "Userpassword123"
}
```

#### 2. **Sign In**

**Endpoint:** `POST /user/signin`

**Request Body:**

```json
{
    "username": "name@gmail.com",
    "password": "Userpassword123"
}
```

### User Management

#### 3. **Get Users (Filtered Search)**

**Endpoint:** `GET /user/bulk/:filter`

**Authorization:** Bearer Token

#### 4. **Update User Details**

**Endpoint:** `PUT /user`

**Authorization:** Bearer Token

**Request Body:**

```json
{
    "username": "name001@gmail.com",
    "firstName": "name001",
    "lastName": "name001"
}
```

### Account Management

#### 5. **Check Account Balance**

**Endpoint:** `GET /account/balance`

**Authorization:** Bearer Token

#### 6. **Transfer Funds**

**Endpoint:** `POST /account/transfer`

**Authorization:** Bearer Token

**Request Body:**

```json
{
    "amount": 100,
    "to": "67a6353a053802467a59e929"
}
```

## Transaction Handling

SwiftPay ensures secure transactions using MongoDB sessions and transactions. The transfer function validates user balances before performing updates to prevent overdrafts.

## Deployment

- **Backend:** Hosted on Render
- **Frontend:** Deployed on Vercel

## Contribution

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Raise a Pull Request (PR).
