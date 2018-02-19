# Database

The database is a concept used by a system. The system provides methods to be used by the modules, and calls appropriate connectors. The reason for this is that initially to save development costs, the MySQL is used, but the produciton target ultimately is DynamoDB.

## MySQL

The pool functionality is to be used. The system is supposed to create one connection duting initialization and then sit on it.