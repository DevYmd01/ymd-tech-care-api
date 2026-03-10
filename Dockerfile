# FROM mcr.microsoft.com/windows/node:lts-nanoserver-ltsc2022

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npx prisma generate
# RUN npm run build

# EXPOSE 3000

# CMD ["node", "dist/src/main.js"]

FROM mcr.microsoft.com/windows/servercore:ltsc2022

SHELL ["cmd", "/S", "/C"]

# ติดตั้ง Node.js แบบ manual
ADD https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi C:\node.msi
RUN msiexec /i C:\node.msi /quiet /norestart

WORKDIR C:\app

COPY package*.json .\
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]