sudo kubectl apply -f minio-storage.yaml \
&& sleep 5 \
&& sudo kubectl apply -f minio.yaml \
&& sleep 5 \
&& sudo kubectl apply -f minio-service.yaml \
&& sleep 5 \
&& sudo kubectl apply -f webapp.yaml \
&& sleep 5 \
&& sudo kubectl apply -f webapp-service.yaml