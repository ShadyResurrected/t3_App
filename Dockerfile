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
ENV DATABASE_URL=postgresql://postgres:1FaisyqmGXMFyDcrJBkc@containers-us-west-109.railway.app:6757/railway

ENV NEXT_PUBLIC_AUTH_URL=http://localhost:3000
ENV NEXTAUTH_URL=http://localhost:3000

ENV REDIS_HOST=redis-13463.c301.ap-south-1-1.ec2.cloud.redislabs.com
ENV REDIS_PORT=13463
ENV REDIS_PASSWORD=Unvd3qzOJBpDVkOoJbbL70FJl21JEr5k

ENV NEXTAUTH_SECRET=fdb325b2uh5j4bk5k3b5jkbefkewfbk2bk4325

# Start the app
CMD ["npm", "start"]
