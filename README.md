# Sample Server - Cookies and XSS

This project contains a simple Express based web server
application and a matching front-end.  It is intended
as an example to illustrate basic server side programming,
and to allow exploration of cookies and cross-site scripting
(XSS) attacks.

The server implements two JSON end points: `/count` and `/likes`.

* GET `/count` - uses cookies to count visits to the site, returns 
  a JSON result `{count: N}`
* POST `/likes` - post body `{thing: "XXXX"}` adds "XXXX" to the list of likes
* GET `/likes` - get the current list of likes, returns a JSON list of strings

The server also serves files from the `public` folder using `express.static()`.
This is used to serve a simple front-end page that uses both of the
server endpoints.

## Installation

To install the required packages run:

```bash
npm install
```

## Running the Server

Run the server with:

```bash
npm start
```

This should start the server on <http://localhost:3123>.

