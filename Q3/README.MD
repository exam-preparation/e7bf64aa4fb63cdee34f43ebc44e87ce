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

Please clone this repo, execute the command below at the root of the repo to run the demo:
```bash
docker-compose -f Q3.yml down --remove-orphans && docker-compose -f Q3.yml pull && docker-compose -f Q3.yml up -d && docker-compose -f Q3.yml logs -f
```

## Explanation:  
As I understand the requirement, a URL shortener service similar to the below should be provided
```
https://shortenurl.org/g20hi3k9 ---> https://google.com
```
Based on time limitation, a local development environment demo is created.  
The application needs to remember the matching between the shortened URLs and the orginal URLs so a database is necessary.  
Since I am not familiar with the helm chart and I do not have enough time, the chart is not completed, and the AWS infrastructure part is missing too.  
The k8s folder contains some resources I copied from my existing deployment process, hopefully it can help to understand my work.  
For the feature/testing-like environment, the db will be a stateless pod in k8s; for the staging/production, the AWS database service will be used.  
For the auto-scaling part, the web applications can be scaled up when 1000+ req/s (Setuped as Q3/k8s/hpa.yaml). MongoDB service in staging and production basically can handle 5000 connections without replicas, replicas should be added if the traffic exceeds the limit.