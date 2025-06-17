# Step 1: Use official Node.js base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the entire project (including src)
COPY . .

# Step 5: Expose backend port
EXPOSE 5000

# Step 6: Run the app (since server.js is in src/)
CMD ["node", "src/server.js"]
