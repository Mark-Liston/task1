# task1
Simple web application for simulating a toaster. Runs from a Node.js server. Toaster functionality is implemented in C++. C++ uses ACE+TAO to provide access to toaster functionality, through CORBA. A client for the C++ CORBA server is written in Java using JacORB. Node.js server uses 'java' npm package to call Java methods to utilise toaster functionality. On the client side, toaster functionality is encapsulated in a Web Component.

## Instructions for Building (Linux)
1. This program uses CORBA, therefore the C++ code requires the [ACE+TAO 6.5.19](https://www.dre.vanderbilt.edu/~schmidt/TAO-overview.html) framework which implements CORBA.
2. To compile the C++ code, makefiles can be generated using the [Task1.mpc](server/toaster/cpp/Task1.mpc) file with the perl script provided at $ACE_ROOT/bin/mwc.pl. Use the command `mwc.pl -type gnuace` from inside the [server/toaster/cpp](server/toaster/cpp) directory.
3. If your environment variables have been set according to the [ACE+TAO installation instructions](https://www.dre.vanderbilt.edu/~schmidt/DOC_ROOT/TAO/TAO-INSTALL.html), you should now have the makefiles and CORBA files necessary to execute `make` (or `make clean; make` if recompiling).
4. The Java code uses the [JacORB 3.9](https://www.jacorb.org/download.html) framework which implements CORBA. Unlike the C++ .mpc script which automatically generates the CORBA files such as skeletons and stubs, for Java this must be done manually. The IDL compiler for JacORB can be found at \[path to JacORB installation\]/bin/idl. From inside the [server/toaster](server/toaster) directory, execute the command `idl -d java/Client/src/main/java/ Task1.idl` to generate the CORBA files in the correct location.
5. The Java project is managed with Maven. Its dependencies should be copied to the target directory using the command `mvn dependency:copy-dependencies` from inside the [server/toaster/java/Client](server/toaster/java/Client) directory.
6. The Java project can be compiled using Maven with the command `mvn compile`.
7. The web server uses Node.js and is located in the [server/webHandler](server/webHandler) directory. Before launching it, the npm packages must be installed with the command `npm install`.

## Instructions for Running (Linux)
1. Before launching the Node.js web server, the C++ CORBA server must be launched. This can be done by running the compiled, executable file 'server' from inside the [server/toaster/cpp](server/toaster/cpp) directory using the command `./server`, or `./server &` to run it in the background.
2. The web server can be launched by running the script [server/webHandler/index.js](server/webHandler/index.js) from inside the [server/webHandler](server/webHandler) directory using the command `node index.js`.
3. While the CORBA server and the web server are running, the website can be accessed at the relevant address on port 9000 (e.g. http://localhost:9000). Note: the website must be accessed through HTTP, not HTTPS.
