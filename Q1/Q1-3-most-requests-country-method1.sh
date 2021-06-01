gzip -dk access.log.gz
awk '{print $1;}' access.log | sort | uniq -c > tmp;
for ip in `awk '{print $2;}' tmp`; do curl -s http://ip2c.org/$ip | cut -d';' -f4; done > tmp2
sed -i 's/ /_/g' tmp2
paste tmp tmp2 > tmp3
awk '{arr[$3]+=$1} END {for (i in arr) {print arr[i],i}}' tmp3 | sort -rn | head -n1
rm access.log tmp tmp2 tmp3