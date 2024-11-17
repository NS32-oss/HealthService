# Health Services Backend

The Health Services Backend is a RESTful API built using Node.js, Express.js, and MongoDB. It provides a comprehensive set of functionalities for managing health service records, including adding, updating, deleting, and retrieving health service records. This backend is designed to be easily integrated with a front-end interface and supports various features such as pagination, filtering, and sorting.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **Add Health Services**: Add new health service records to the database with details such as service name, provider name, year of establishment, price, category, and more.
- **Update Health Services**: Modify existing health service information.
- **Delete Health Services**: Remove health services from the inventory based on their ID.
- **Fetch Health Services**: Retrieve all health services with options for pagination, filtering (by name, provider, category, etc.), and sorting.
- **Fetch Single Health Service**: Retrieve details of a single health service using its ID.

## Tech Stack

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building APIs and handling HTTP requests.
- **MongoDB**: NoSQL database for storing health service records.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:NS32-oss/HealthService.git

   ```

2. Navigate to the project directory:
   ```bash
   cd HealthService
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory of the project and configure the following environment variables:

```bash
PORT=5000
MONGODB_URI=<Your MongoDB connection URI>
```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Use Postman or any other API testing tool to interact with the API endpoints.

## API Endpoints

- `POST /api/v1/healthService` - Add a new health service
  <img src="src\Images\createService.png" alt="" height="300" />

- `GET /api/v1/healthService` - Get all health services with filters and sorting
  <img src="src\Images\getServices.png" alt="" height="300" />

- `PATCH /api/v1/healthService/:id ` - Update a health service by ID
  <img src="src\Images\updateService.png" alt="" height="300" />

- `DELETE /api/v1/healthService/:id` - Delete a health service by ID
  <img src="src\Images\deleteService.png" alt="" height="300" />

- `GET /api/v1/healthService/:id` - Fetch details of a single health service by its ID
  <img src="src\Images\getService.png" alt="" height="300" />
