sudo kubectl delete deployment pet-detection-web \
&& sudo kubectl delete svc pet-detection-service \
&& sudo kubectl delete deployment minio \
&& sudo kubectl delete pvc minio-volume \
&& sudo kubectl delete svc minio-service