# step 1: build stage
From node:18-alpine AS builder
WORKDIR /app

# package file copy
COPY Package*.json ./

# Dependencies install
RUN npm install

# Source code copy
Copy . .

# Vite build
Run npm run build

FROM http:2.4-alpine
RUN rm -rf /usr/local/apache2/htdocs/*
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
#port expose (vite default)
EXPOSE 80
# app start command
CMD [ "npm", "run", "dev"]