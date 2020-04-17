#!/bin/sh

cat ./.views/head.html ./.views/index.html ./.views/foot.html > index.html
cat ./.views/head.html ./.views/quiz.html ./.views/foot.html > quiz.html
cat ./.views/head.html ./.views/results.html ./.views/foot.html > results.html
