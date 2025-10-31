# Gunakan image Node.js versi 18
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Salin semua file proyek
COPY . .

# Set environment variable (opsional)
ENV NODE_ENV=production

# Expose port sesuai aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "app.js"]
