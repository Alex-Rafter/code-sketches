#!/usr/bin/env bash

file=$1
sed -e '1~2s/^/"hotKey" :"/g' -e '2~2s/^/"name" :"/g' -e 's/$/"/g' -e '1~2s/$/,/g' -e '1~2s/^/{/g' -e '2~2s/$/},/g' -e '$s/,$/]/' -e '1 s/^/[/' -e 's/\\"/\\\\"/g'  "$file" > "${file%.txt}.json"