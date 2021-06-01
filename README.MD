# Q1
Please navigate into Q1 folder and run 
```bash
./Q1-1-total-number-of-http-requests.sh
./Q1-2-top-10-most-requests.sh
```
For the answer of questions 1 and 2.  
For the question 3, there are 2 answers:
- `Q1-3-most-requests-country-method1.sh` is for all linux, need approximate 1.5hrs to get the result from `ip2c.org`
- `Q1-3-most-requests-country-method1.sh` can run in Linux Ubuntu, with apt package `geoip-bin` installed. It is much faster and it finishes within 1 min.

P.S. Both methods of question 3 generate different result (1 is United States, 1 is China). Therefore more time is needed to find out which 1 is more accurate.
P.S.2 Some `ipv6`s are found and they are not handled correctly (But they don't affect the result). Further study is needed to handle these cases. 
  
  
  
# Q2
Assumptions:
- AWS-cli 'aws' is available
- aws is already configured (~/.aws)
- ssh pem key is already added
- target aws ec2 is allowed to connect from the host machine

Please navigate into Q2 folder and run
```bash
./ssh-aws "[The ec2 name]"
```
or put it in bin folder  
  
  
  
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