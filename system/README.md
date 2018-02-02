# cards.js/system

Tool for learning - primarily languages

## system.js

System is intended more than anything, for centralized managment. For example, the urls could be stored in files per method that uses them, but in that case management would be hell, so we centrally store and manage it from here, plus the memory impact is minimal, anyways. On top of that this is JavaScript, and it is not like there is a standard to uphold here.

## system.mysql.js

* Handles mysql connection
* In a separate file from system.js due to security principle, not any practical use

## system.aux.js

Auxiliary functions for system use