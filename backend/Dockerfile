FROM node:20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
ENV MONGODB_URI="mongodb://localhost:27017/yourdbname"
ENV JWT_SECRET="your_secret_key"
CMD ["node", "index.js"]