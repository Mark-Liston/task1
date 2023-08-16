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

// Toaster operations.
handle["/insertToast"] = requestHandlers.reqInsertToast;
handle["/ejectToast"] = requestHandlers.reqEjectToast;
handle["/getToastColour"] = requestHandlers.reqGetToastColour;

// Passes request to handle (and route function) to server.
server.startServer(router.route, handle);
