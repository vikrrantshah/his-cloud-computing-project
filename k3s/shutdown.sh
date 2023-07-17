sudo kubectl delete deployment pet-detection-web \
&& sudo kubectl delete svc pet-detection-service \
&& sudo kubectl delete deployment storage-deployment \
&& sudo kubectl delete pvc storage-volume \
&& sudo kubectl delete svc storage-service