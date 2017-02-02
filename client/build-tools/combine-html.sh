#!/bin/bash

cat $1 > $3
find $2 -name '*.html' -exec cat {} \; >> $3