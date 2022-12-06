FROM mysql:8.0.30
COPY init.sql /docker-entrypoint-initdb.d/
CMD [ "mysqld", "--init-file=/docker-entrypoint-initdb.d/init.sql" ]