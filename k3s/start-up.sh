sudo kubectl apply -f storage-volume.yaml \
&& sleep 5 \
&& sudo kubectl apply -f storage-deployment.yaml \
&& sleep 5 \
&& sudo kubectl apply -f storage-service.yaml \
&& sleep 5 \
&& sudo kubectl apply -f web-deployment.yaml \
&& sleep 5 \
&& sudo kubectl apply -f web-service.yaml