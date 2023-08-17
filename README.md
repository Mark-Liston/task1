# task1
Simple web application for simulating a toaster. Runs from a Node.js server. Toaster functionality is implemented in C++. C++ uses ACE+TAO to provide access to toaster functionality, through CORBA. A client for the C++ CORBA server is written in Java using JacORB. Node.js server uses 'java' npm package to call Java methods to utilise toaster functionality.
