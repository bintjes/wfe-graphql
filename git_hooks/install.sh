#!/bin/sh
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

hooks=$(find $ROOT_DIR/git_hooks/hooks -type f -iname '*.sh')

for hook in $hooks
do
    dest=$ROOT_DIR/.git/hooks/$(basename $hook .sh)

    cp $hook $dest
    chmod 755 $dest
done