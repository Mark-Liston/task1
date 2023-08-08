// client.cpp

#include "Task1C.h"
#include <ace/streams.h>

int main(int argc, char * argv[])
{
	try
	{
		// Initialises the ORB.
		CORBA::ORB_var orb = CORBA::ORB_init(argc, argv, "toasterORB");

		// Checks if IOR was included in arguments.
		if (argc < 2)
		{
			std::cerr << "IOR not given as argument." << std::endl;
			return 1;
		}

		// IOR supplied in first argument is used to create the factory object
		// reference. The naming service should be used for this.
		CORBA::Object_var toaster_object = orb->string_to_object(argv[1]);

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
