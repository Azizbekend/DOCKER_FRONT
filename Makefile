# ~/front-end/Makefile
.PHONY: front-update help camera-stop camera-start camera-logs

front-update:  
	cd ~/front-end && \
	sudo docker compose down && \
	sudo git pull && \
	sudo docker compose up -d --build

camera-stop:
	sudo docker-compose stop front-end-servercamera-1

camera-start:
	sudo docker compose up -d front-end-servercamera-1

camera-logs:
	sudo docker logs -f --tail 60 front-end-servercamera-1