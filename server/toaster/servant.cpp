// servant.cpp

#include "Toaster.h"
#include <ace/streams.h>

void init_corba(int argc, char * argv[], CORBA::ORB_var & orb, PortableServer::POA_var & poa);
void end_corba(CORBA::ORB_var & orb, PortableServer::POA_var & poa);

int main(int argc, char * argv[])
{
	try
	{
		// Initialises CORBA connection.
		CORBA::ORB_var orb;
		PortableServer::POA_var poa;
		init_corba(argc, argv, orb, poa);
		
		// Creates the servant.
		Toaster toaster_impl;

		// Activates it to obtain the object reference.
		Task1::Toaster_var toaster = toaster_impl._this();

		// Converts the object reference to an IOR string.
		CORBA::String_var ior = orb->object_to_string(toaster.in());
		std::cout << ior.in() << std::endl;

		// Enters listener loop.
		orb->run();

		// Ends CORBA connection.
		end_corba(orb, poa);

	}
	catch (const CORBA::Exception & e)
	{
		std::cerr << "CORBA exception raised." << std::endl;
	}

	return 0;
}

// Boilerplate for initialising CORBA connection.
void init_corba(int argc, char * argv[], CORBA::ORB_var & orb, PortableServer::POA_var & poa)
{
	// First initialises the ORB.
	orb = CORBA::ORB_init(argc, argv, "toasterORB");

	// Creates object for RootPOA and establishes access to it.
	CORBA::Object_var poa_object =
		orb->resolve_initial_references("RootPOA");
	poa = PortableServer::POA::_narrow(poa_object.in());

	// Obtains RootPOA's POA manager. This provides interfaces to activate and
	// deactivate one or more POAs.
	PortableServer::POAManager_var poa_manager = poa->the_POAManager();
	// Takes POA from holding state to active state.
	poa_manager->activate();
}

// Boilerplate for ending CORBA connection.
void end_corba(CORBA::ORB_var & orb, PortableServer::POA_var & poa)
{
	poa->destroy(true, true);
	orb->destroy();
}
