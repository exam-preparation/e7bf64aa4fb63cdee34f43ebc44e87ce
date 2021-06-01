gzip -dk access.log.gz
echo "Total number of HTTP requests is $(wc -l access.log | awk '{print $1;}')"
rm access.log