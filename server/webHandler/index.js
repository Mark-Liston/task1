// index.js

import * as server from "./server.mjs";
import * as router from "./router.mjs";
import * as requestHandlers from "./requestHandlers.mjs";
//let server = require("./server");
//let router = require("./router");
//let requestHandlers = require("./requestHandlers");

// Object for storing requests to handle.
let handle = {};

// Uses associative array to point to relevant request handler.
handle["/"] = requestHandlers.reqStart;
handle["/start"] = requestHandlers.reqStart;
handle["/reqFile"] = requestHandlers.reqFile;

// Passes request to handle (and route function) to server.
server.startServer(router.route, handle);
