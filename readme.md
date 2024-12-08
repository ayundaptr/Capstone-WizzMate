# Firebase Authentication API

## Overview

This API provides functionality for user registration and login using Firebase Authentication. It interacts with Firebase Realtime Database to store user information.

## 1. User Registration

### Endpoint

**POST** `http://localhost:2000/api/auth/register` </br>
**GET** `http://localhost:2000/data?page=1&size=2` </br>

**GET** `http://localhost:2000/flights` </br>

**GET** `http://localhost:2000/data?keyword=kebun&sort=rating` </br>
**GET** `http://localhost:2000/data?Category=Taman Hiburan` </br>
**GET** `http://localhost:2000/data?category=Tempat Ibadah&sort=rating` </br>
**GET** `http://localhost:2000/data?keyword=jakarta` </br>

**GET** `localhost:2000/data/Monumen Nasional` </br>

### Request Body

The request body must be a JSON object with the following fields:

`````json
{
  "username": "Wizzmate",
  "email": "Wizzmate@example.com",
  "password": "password123"
}
````json


{
    "page": 1,
    "size": 2,
    "total_items": 10,
    "total_pages": 4,
    "data": [
        {"id": 1, "name": "Monumen Nasional", "value": 100},
        {"id": 2, "name": "Kota Tua", "value": 200},
        {"id": 3, "name": "Dunia Fantasi", "value": 300}
    ]
}

````json
Tambah Preference
Endpoint: POST /preferences/add-preference
{
  "category": "Beach"
}
hasil output
{
  "success": true,
  "preferenceId": "1733068252440"
}
````json

Ambil Semua Preferences
Endpoint: GET /preferences/
{
  "category": "Travel"
}
hasil output
{
  "success": true,
  "preferences": {
    "1733067870667": {
      "category": "Travel"
    },
    "1733068252440": {
      "category": "Beach"
    }
  }
}


Tambah User Preference
Endpoint: POST /preferences/add-user-preference
{
  "userId": "user2",
  "preferenceId": "1677891012345"
}
hasil output
{
  "success": true,
  "message": "Preference 1677891012345 added for user user2"
}


Ambil User Preferences Berdasarkan User ID
Endpoint: GET /preferences/user/user2
---hasil output
{
  "success": true,
  "userPreferences": {
    "preferences": [
      "1677891012345"
    ],
    "userId": "user2"
  }
}

## Features
1. **User Authentication**: Register and log in users via Firebase Authentication.
2. **Data Retrieval**: Get data with pagination.
3. **Error Handling**: Custom error handling middleware to catch any server-side errors.

## Table of Contents
1. [Setup](#setup)
2. [API Endpoints](#api-endpoints)
   - [POST /api/auth/register](#post-apiauthregister)
   - [POST /api/auth/login](#post-apiauthlogin)
   - [GET /data](#get-datadata)
3. [Running the Server](#running-the-server)
4. [Error Handling](#error-handling)
5. [File Structure](#file-structure)
6. [License](#license)

---

## 1. Setup

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [Firebase Account](https://firebase.google.com/) to use Firebase Authentication.

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/express-api.git
`````
