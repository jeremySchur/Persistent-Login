# Persistent-Login

## Overview

This repository is a template for projects created using the MERN stack that require authentication. It features a persistent login page built with React, an ExpressJS backend for API calls, and a MongoDB database.

## Setup

### Backend

1. Create a `.env` file at the top level of the backend directory with the following variables:
    - `ACCESS_TOKEN_SECRET` (JWT secret token)
    - `REFRESH_TOKEN_SECRET` (JWT secret token)
    - `DATABASE_URI` (MongoDB database URI)

2. Navigate to the backend directory:
    ```sh
    cd backend
    ```

3. Install the necessary dependencies:
    ```sh
    npm install
    ```

4. Start the server for development:
    ```sh
    npm run dev
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the necessary dependencies:
    ```sh
    npm install
    ```

3. Start the frontend for development:
    ```sh
    npm run dev
    ```

## Running the Application

Now that both the frontend and backend are running, they are connected for development. You can access the application by navigating to `http://localhost:5173` in your web browser. The frontend will communicate with the backend API to handle authentication and other functionalities.