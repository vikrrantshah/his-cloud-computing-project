import cv2 
import numpy as np 
import time

cap = cv2.VideoCapture(0) 

nframes = 1024
interval = 5

for i in range(nframes):
    ret, img = cap.read()
    cv2.imwrite('./img_'+str(i).zfill(4)+'.png', img)
    time.sleep(interval)