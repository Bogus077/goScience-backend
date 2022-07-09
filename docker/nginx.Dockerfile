FROM nginx

COPY /docker/config/vhost.conf /etc/nginx/conf.d/default.conf
