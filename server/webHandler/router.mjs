// router.mjs

// Creates route function with path as parameter.
export function route(path, handle, request, response)
{
	console.log("Routing request: " + path);

	// If path points to a function, calls that function.
	if (typeof handle[path] === "function")
	{
		handle[path](request, response);
	}
	else
	{
		handle["/reqFile"](("../../client" + decodeURI(path)), response);
	}
}
