---
tags: wiki dtrace macos
title: Using dtrace on macOS
---

`dtruss` is a `dtrace` script that is close in functionality to `strace` on Linux.

Other scripts can be found in `/usr/bin/*.d`. Examples:

```bash
# Show total number of syscalls per process, sorted by count.
sudo syscallbyproc.d

# Show total numbers of each syscall per process, sorted by count.
sudo syscallbypid.d

# strace-like monitoring of syscalls in a process.
sudo dtruss -p 63856

# Same, logging to a file.
sudo dtruss -p 63856 &> logfile
```
