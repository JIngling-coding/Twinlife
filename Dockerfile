# 使用轻量级的 Nginx 镜像作为基础镜像
FROM nginx:latest

# 删除默认的 Nginx 欢迎页面
RUN rm /usr/share/nginx/html/*

# 将本地的静态文件复制到镜像中
COPY ./dist /usr/share/nginx/html

# 暴露 Nginx 的默认端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]