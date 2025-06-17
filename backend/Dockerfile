# Step 1: Use Node base image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the backend code
COPY . .

# Step 5: Expose the port your backend runs on
EXPOSE 5000

# Step 6: Start the backend server
CMD ["node", "server.js"]
