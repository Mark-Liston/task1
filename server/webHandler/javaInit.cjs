// javaInit.js

"use strict"
const fs = require("fs");
const java = require("java");

// moves execution directory of process to java project folder.
let prevDir = __dirname;
process.chdir(prevDir + "/../toaster/java/Client");

let baseDir = "./target";
let dependencies = fs.readdirSync(baseDir + "/dependency");

dependencies.forEach(function(dependency)
{
	java.classpath.push(baseDir + "/dependency/"+ dependency);
});

java.classpath.push(baseDir + "/classes");
java.classpath.push(baseDir + "/test-classes");

exports.getJavaInstance = function ()
{
	return java;
}

process.chdir(prevDir);
