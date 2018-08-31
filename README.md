# About

Card.js is a tool for learning - primarily languages.

## Design

This tool is a server written in Node.js to serve customizable cards to the user, which he or she can rate. The server will store the learning progress in the database, and will utilize the algorithm to enchance learning process.

## Goals

* Learn JS and Node.js
* Use this as a portfolio
* Use this tool to learn languages

## Technologies and standards

[API Reference](docs/modules.md)

* Node.js
* Markdown
* YAML
* MySQL
* Nunjucks
* SASS
* JSDoc

### Code annotations

* TODO
* FIXME
* DELETEME
* NOTE

## Structure

### URL parsing/endpoints disambugation

1. **Application**

   File - apps/settings/apps.yml

2. **Endpoints** of the application

   File - apps/app_name/settings/endpoints.yml

3. **Resources** of the application

   Folders - apps/app_name/resources/*
   Entrypoints are represented as `main.yml` files within respective folders.

## As a file

A file designated to be/contain an entrypoint to the system. It eventually will be able to possibly take some command line arguments. Based on the results of the system initialization, the cards.js may pass different parameters to the server.

## List of npm packages

* [js-yaml](https://github.com/nodeca/js-yaml) - JavaScript YAML parser and dumper
* [mysql](https://github.com/mysqljs/mysql) - A pure node.js JavaScript Client implementing the MySql protocol
* [nunjucks](https://github.com/mozilla/nunjucks) - A powerful templating engine with inheritance, asynchronous control, and more (jinja2 inspired)
* [node-sass](https://github.com/sass/node-sass) - Node.js bindings to libsass
* [markdown-it](https://github.com/markdown-it/markdown-it) - Markdown parser, done right. 100% CommonMark support, extensions, syntax plugins & high speed
* [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) - Creates markdown API documentation from jsdoc-commented javascript