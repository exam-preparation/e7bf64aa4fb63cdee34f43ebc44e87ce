# Q3
Basically it is a program which inits a webserver to provide URL shortener service.  
It uses:
- NodeJS as the web application server
- MongoDB to store the shortened URLs

To run the demo in AWS ec2, assume:
- docker is installed
- dokcer-compose is installed
- the host machine can connect to npm
- the host machine can connect to Dockerhub
- port 80 is available

Please execute the command below to run the demo:
```bash
docker-compose -f Q3.yml down --remove-orphans && docker-compose -f Q3.yml build --pull --no-cache && docker-compose -f Q3.yml up -d && docker-compose -f Q3.yml logs -f
```