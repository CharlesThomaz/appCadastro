FROM nginx:1.25-alpine

# Remove a página default
RUN rm -rf /usr/share/nginx/html/*

# Copia seus arquivos estáticos
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
