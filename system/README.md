# cards.js/system

Tool for learning - primarily languages

## system.js

System is intended more than anything, for centralized managment. For example, the urls could be stored in files per method that uses them, but in that case management would be hell, so we centrally store and manage it from here, plus the memory impact is minimal, anyways. On top of that this is JavaScript, and it is not like there is a standard to uphold here.

### Classes

#### System

System is responsible for loading of initial settings.

#### App

Class App extends class System. Is responsible for managing app data.

### Error levels

System error level, is the operation mode of the system. If for example, a critical failure has been encountered, such as system not being able to initialize, the error level will be set to critical failure, and the server should send an alert to an administrator and stop processing requests.

## system.mysql.js

* Handles mysql connection
* In a separate file from system.js due to security principle, not any practical use

## system.aux.js

Auxiliary functions for system use