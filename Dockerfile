FROM mcr.microsoft.com/windows/node:lts-nanoserver-ltsc2022

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]

