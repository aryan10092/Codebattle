FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20 AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY public ./public
RUN npm install -g serve
EXPOSE 3000
# Inject API_URL into config.js at runtime
ENV API_URL=http://localhost:5000
CMD sh -c 'echo "window.APP_CONFIG = { API_URL: \"$API_URL\" };" > ./dist/config.js && serve -s dist'