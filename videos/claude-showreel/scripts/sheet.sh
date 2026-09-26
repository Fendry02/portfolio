#!/bin/bash
# usage: scripts/sheet.sh <name> <t1,t2,...>  → .context/<name>.jpg contact sheet
NAME=$1; AT=$2
OUT=/tmp/hf-snap-$NAME
rm -rf $OUT
npx hyperframes snapshot --at "$AT" --no-end -o $OUT --describe false 2>&1 | grep -iE "error|warn|fail" | head -5
mkdir -p ../../../.context
for f in $OUT/contact-sheet*.jpg; do b=$(basename $f .jpg); cp $f ../../.context/$NAME-$b.jpg; echo ".context/$NAME-$b.jpg"; done
