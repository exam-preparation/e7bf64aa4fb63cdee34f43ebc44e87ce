awk '{print $1;}' access.log | sort | uniq -c > tmp;
awk '{print $2;}' tmp | xargs -I{} curl -s {}