// servant.cpp

#include "Toaster.h"
#include <ace/streams.h>
//#include <orbsvcs/CosNamingC.h>


void init_corba(int argc, char * argv[], CORBA::ORB_var & orb, PortableServer::POA_var & poa);
bool write_ior_to_file(char * path, CORBA::String_var ior);
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

		
		//// Gets reference to the Naming Service and narrows it into a usable
		//// object.
		//CORBA::Object_var naming_context_object =
		//	orb->resolve_initial_references("NameService");
		//CosNaming::NamingContext_var naming_context =
		//	CosNaming::NamingContext::_narrow(naming_context_object.in());
		//
		//// Creates a name object to store the toaster object's name.
		//CosNaming::Name name(1);
		//name.length(1);
		//// Initialises name of object.
		//name[0].id = CORBA::string_dup("Toaster");
		//
		//// Registers the object reference in the naming service. Uses rebind()
		//// rather than bind() to prevent failure in the event that there is
		//// already any data there.
		//naming_context->rebind(name, toaster.in());


		// Converts the object reference to an IOR string.
		CORBA::String_var ior = orb->object_to_string(toaster.in());
		char file_name[] = "ior_file";
		if (!write_ior_to_file(file_name, ior))
		{
			std::cerr << "Cannot write to IOR to output file." << std::endl;
		}

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

bool write_ior_to_file(char * path, CORBA::String_var ior)
{
	const ACE_TCHAR * ior_file = ACE_TEXT(path);
	FILE * output_file = ACE_OS::fopen(ior_file, "w");
	if (output_file == 0)
	{
		return false;
	}
	ACE_OS::fprintf(output_file, "%s", ior.in());
	ACE_OS::fclose(output_file);
	return true;
}

// Boilerplate for ending CORBA connection.
void end_corba(CORBA::ORB_var & orb, PortableServer::POA_var & poa)
{
	poa->destroy(true, true);
	orb->destroy();
}
