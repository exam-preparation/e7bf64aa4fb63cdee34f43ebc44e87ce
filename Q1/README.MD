# Q1
Please navigate into Q1 folder and run 
```bash
./Q1-1-total-number-of-http-requests.sh
./Q1-2-top-10-most-requests.sh
```
for the answer of questions 1 and 2.  
For the question 3, there are 2 answers:
- ~~`Q1-3-most-requests-country-method1.sh` is for all linux, need approximate 1.5hrs to get the result from `ip2c.org`~~
- `Q1-3-most-requests-country-method2.sh` can run in Linux Ubuntu, with apt package `geoip-bin` installed. It is much faster and it finishes within 1 min.

P.S. Both methods of question 3 generate different result (1 is United States, 1 is China). Therefore more time is needed to find out which 1 is more accurate. `After studying the source, Q1-3-most-requests-country-method1.sh is not accruate, please use Q1-3-most-requests-country-method2.sh as the answer.`
P.S.2 Some `ipv6`s are found and they are not handled correctly (But they don't affect the result). Further study is needed to handle these cases.  