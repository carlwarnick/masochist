---
tags: git wiki
title: Git subtree merge
---

Given other remote $OTHER and repo $REPO:

```shell
$ git remote add -f $OTHER $REPO
$ git merge -s ours --allow-unrelated-histories --no-commit $OTHER/master
$ git read-tree --prefix=$OTHER -u $OTHER/master
$ git commit -m "Merge $OTHER code into $OTHER directory"
```

# See also

-   <http://www.kernel.org/pub/software/scm/git/docs/howto/using-merge-subtree.html>
