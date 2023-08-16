import path from "path";
import { fileURLToPath } from "url";
import * as javaInit from "./javaInit.cjs";

// Allows java commands to be safely executed by moving the execution directory
// to that of the java project for the duration of the callback.
function doJava(callback)
{
	// Saves current directory to go back after executing java.
	let prevdir = path.dirname(fileurltopath(import.meta.url));
	process.chdir(prevDir + "/../toaster/java/Client");
	callback();
	process.chdir(prevDir);
}

try
{
	let java = javaInit.getJavaInstance();
	doJava(() =>
	{
		let client = java.newInstanceSync("mark.client.Client");
		client.initORBSync();
		let toaster = client.getToasterSync();
		console.log(toaster.get_toast_colourSync());
		client.closeORB();
	});
}
catch (e)
{
	console.log(e);
}
