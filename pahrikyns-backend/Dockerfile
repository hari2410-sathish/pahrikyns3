FROM node: 18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
copy . .
EXPOSE 5000
CMD ["node", "server.js"]