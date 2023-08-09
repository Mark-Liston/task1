// client.cpp

#include "Task1C.h"
#include <ace/streams.h>
//#include <orbsvcs/CosNamingC.h>

int main(int argc, char * argv[])
{
	try
	{
		// Initialises the ORB.
		CORBA::ORB_var orb = CORBA::ORB_init(argc, argv, "toasterORB");

		//CORBA::Object_var naming_context_object =
		//	orb->resolve_initial_references("NameService");
		//CosNaming::NamingContext_var naming_context =
		//	CosNaming::NamingContext::_narrow(naming_context_object.in());

		//CosNaming::Name name(1);
		//name.length(1);
		//name[0].id = CORBA::string_dup("Toaster");

		//CORBA::Object_var toaster_object = naming_context->resolve(name);
		//Task1::Toaster_var toaster = Task1::Toaster::_narrow(toaster_object.in());

		// File where object's IOR is written to.
		const ACE_TCHAR * ior = ACE_TEXT("file://ior_file");
		// IOR supplied in first argument is used to create the factory object
		// reference. The naming service should be used for this.
		//CORBA::Object_var toaster_object = orb->string_to_object(argv[1]);
		CORBA::Object_var toaster_object = orb->string_to_object(ior);

		// Downcasts object reference to the appropriate type.
		Task1::Toaster_var toaster =
			Task1::Toaster::_narrow(toaster_object.in());
		//---------------------------------------------------------------------
		
		std::cout << "toast colour: " << toaster->get_toast_colour() << std::endl;

		//---------------------------------------------------------------------
		orb->destroy();
	}
	catch (const CORBA::Exception & e)
	{
		std::cerr << "CORBA exception raised.\n" << e._info() << std::endl;
	}

	return 0;
}
