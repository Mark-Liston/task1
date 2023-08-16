import path from "path";
import { fileURLToPath } from "url";
import * as javaInit from "./javaInit.cjs";

let toaster;
// 
try
{
	let java = javaInit.getJavaInstance();
	doJava(() =>
	{
		let client = java.newInstanceSync("mark.client.Client");
		client.initORBSync();
		toaster = client.getToasterSync();
		//client.closeORB();
	});
}
catch (e)
{
	console.log(e);
}

// Allows java commands to be safely executed by moving the execution directory
// to that of the java project for the duration of the callback.
function doJava(callback)
{
	// Saves current directory to go back after executing java.
	let prevDir = path.dirname(fileURLToPath(import.meta.url));
	process.chdir(prevDir + "/../toaster/java/Client");
	callback();
	process.chdir(prevDir);
}

export function insertToast(callback)
{
	doJava(() =>
	{
		try
		{
			if (toaster.insert_toastSync())
			{
				callback(null);
			}
			else
			{
				callback(new Error("Already toasting"));
			}
		}
		catch (e)
		{
			callback(new Error("On fire"));
		}
	});
}

export function ejectToast(callback)
{
	doJava(() =>
	{
		try
		{
			if (toaster.eject_toastSync())
			{
				callback(null);
			}
			else
			{
				callback(new Error("Nothing to eject"));
			}
		}
		catch (e)
		{
			callback(new Error("On fire"));
		}
	});
}

export function getToastColour(callback)
{
	doJava(() =>
	{
		// Sends toast colour to callback.
		callback(toaster.get_toast_colourSync());
	});
}
