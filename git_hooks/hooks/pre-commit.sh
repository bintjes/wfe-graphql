#!/bin/sh
ESLINT="./node_modules/.bin/eslint"
PLATFORM=`uname`

if [ "$PLATFORM" == 'Darwin' ]; then
    CHANGED_FILES=$(git diff-index --name-only --cached HEAD -- | grep -e "\.js$" | tr '\n' ' ')
else
    CHANGED_FILES=$(git diff-index --name-only --cached HEAD -- | grep -P "\.js$" | tr '\n' ' ')
fi

if [ ! -f $ESLINT ]; then
    echo "eslint linter not found"
    echo "Path to eslint is : $ESLINT"
    echo "Please run npm install in order for the eslint linter to run properly"
    exit 1
fi

if [ -z "$CHANGED_FILES" ]; then
    # Nothing interesting for the linter
    exit 0
fi

if ${ESLINT} $CHANGED_FILES 2>&1; then
    exit 0
else
    exit 1
fi
