# Set the base image to use for the container
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Expose the port on which the app will listen
EXPOSE 3000

# Set the environment variables for the app
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://user:password@postgres:5432/blog
ENV REDIS_URL=redis://redis:6379

# Start the app
CMD ["npm", "start"]
