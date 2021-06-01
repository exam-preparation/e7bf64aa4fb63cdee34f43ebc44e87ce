gzip -dk access.log.gz
echo "  Times Host"
grep " \[1[0-9]/Jun/2019"  access.log | awk '{print $1;}' | sort | uniq -c | sort -rn | head -n10
rm access.log