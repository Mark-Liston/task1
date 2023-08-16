// index.js

import * as server from "./server.js";
import * as router from "./router.js";
import * as requestHandlers from "./requestHandlers.js";

// Object for storing requests to handle.
let handle = {};

// Uses associative array to point to relevant request handler.
handle["/"] = requestHandlers.reqStart;
handle["/start"] = requestHandlers.reqStart;
handle["/reqFile"] = requestHandlers.reqFile;
handle["/insertToast"] = requestHandlers.reqInsertToast;

// Passes request to handle (and route function) to server.
server.startServer(router.route, handle);
