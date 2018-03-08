# cards.js/server

Responsible for the server part of the application

## server.js

Initializes the server. For now it will be an HTTP server, while in the future, we will make it optional to run either HTTP or HTTPS or both.

### Class GlobalController (Listener pool)

Transparently manages server-app allocation.

### Class Server

#### App pool

The apps that are bound to a server.

#### Endpoint

An address which specifies the entrypointinto an app.

#### Route table

A set of endpoints for the app pool.