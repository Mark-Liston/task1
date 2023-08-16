// requestHandler.mjs

import * as fetch from "node-fetch";
import * as fs from "fs";
import { request } from "http";
import * as ja from "./javaAdapter.js";

export function reqStart(request, response)
{
	console.log("Request handler called: 'start'");

	fs.readFile("../../client/html/index.html", "utf-8", function(error, data)
	{
		if (!error)
		{
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
			response.end();
		}
		else
		{
			response.writeHead(404, {"Content-Type": "text/html"});
			reponse.write("Start file not found");
			console.log(error.message);
			response.end();
		}
	});
}

export function reqFile(path, response)
{
	console.log("Request handler called: 'reqFile'");

	// Extracts extension from end of path.
	let ext = path.match("\.[a-z]+$");

	let fileType;
	switch(ext[0])
	{
		case ".js":
			fileType = "text/javascript";
			break;
		case ".css":
			fileType = "text/css";
			break;
	}

	fs.readFile(path, function(error, data)
	{
		if (!error)
		{
			console.log("File type: " + fileType);
			console.log("Sending file: " + path);
			response.writeHead(200, {"Content-Type": (fileType)});
			response.end(data);
		}
		else
		{
			console.error("File '" + path + "' not found");
			response.writeHead(404, {"Content-Type" : "text/plain"});
			response.write("404: File not found");
			response.end();
		}
	});
}

export function reqInsertToast(request, response)
{
	console.log("Request handler called: 'reqInsertToast'");

	ja.insertToast((error) =>
	{
		if (error)
		{
			response.writeHead(403, {"Content-Type": "text/plain"});
			response.end(error.message);
		}
		else
		{
			response.end();
		}
	});
}

export function reqEjectToast(request, response)
{
	console.log("Request handler called: 'reqEjectToast'");

	ja.ejectToast((error) =>
	{
		if (error)
		{
			response.writeHead(403, {"Content-Type": "text/plain"});
			response.end(error.message);
		}
		else
		{
			response.end();
		}
	});
}

export function reqGetToastColour(request, response)
{
	console.log("Request handler called: 'reqGetToastColour'");

	ja.getToastColour((toastColour) =>
	{
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end(toastColour.toString());
	});
}
