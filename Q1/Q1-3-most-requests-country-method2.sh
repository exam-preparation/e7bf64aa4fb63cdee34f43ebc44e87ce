gzip -dk access.log.gz
awk '{print $1;}' access.log | sort | uniq -c > tmp;
for ip in `awk '{print $2;}' tmp`; do geoiplookup $ip  | cut -d "," -f2 | sed -e 's/^[\t\s]+//'; done > tmp2
sed -i 's/ /_/g' tmp2
paste tmp tmp2 > tmp3
awk '{arr[$3]+=$1} END {for (i in arr) {print arr[i],i}}' tmp3 | sort -rn | head -n1
rm access.log tmp tmp2 tmp3