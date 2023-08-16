// server.js

import * as http from "http";
import * as url from "url";

export function startServer(route, handle)
{
	function onRequest(request, response)
	{
		let path = url.parse(request.url).path;
		console.log("Request for " + path + " received.");
		route(path, handle, request, response);
	}

	http.createServer(onRequest).listen(9000);
	console.log("Started server in: " + process.cwd());
}
