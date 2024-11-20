# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 3000

# Run the Node.js application
CMD ["node", "index.js"]