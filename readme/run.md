# Setup and Running the Project

## Prerequisites
- **Node.js** (v16 or later recommended)
- **Docker**
- **MongoDB Compass** (optional, for database visualization)

## Initial Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/the5erscom/assignment.git
   cd assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Services

### Start the Development Environment
1. **Start MongoDB with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

2. **Verify MongoDB is running**:
   ```bash
   docker ps
   ```

3. **Access the MongoDB shell**:
   ```bash
   docker exec -it monorepo-mongodb mongosh
   ```

4. **Check the `interview` database and `stocks` collection**:
   ```javascript
   use interview;
   db.stocks.find().pretty();
   ```

5. **Start the frontend and backend**:
   - **Frontend**:
     ```bash
     npx nx serve frontend
     ```
   - **Backend NestJS**:
     ```bash
     npx nx serve backend-nestjs
     ```
   - **Backend Express**:
     ```bash
     npx nx serve backend-express
     ```

### MongoDB Connection String
To connect to MongoDB from your local machine, use the connection string:
```plaintext
mongodb://localhost:27017
```

#### Using MongoDB Compass
1. Open **MongoDB Compass**.
2. Enter the connection string:
   ```plaintext
   mongodb://localhost:27017
   ```
3. Click **Connect**.
4. Explore the `interview` database and its collections.


