FROM node:20-alpine

WORKDIR /app

# install deps first to take advantage of layer caching
COPY package.json package-lock.json ./
RUN npm ci --silent

# copy app
COPY . ./

# ensure correct permissions for non-root user
RUN chown -R node:node /app
USER node

ENV NODE_ENV=development
# help file watchers work reliably with mounted volumes
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 5173

# bind to 0.0.0.0 so host can connect
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]