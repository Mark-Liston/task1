// client.cpp

#include "Task1C.h"
#include <ace/streams.h>

int main(int argc, char * argv[])
{
	try
	{
		// Initialises the ORB.
		CORBA::ORB_var orb = CORBA::ORB_init(argc, argv, "toasterORB");

		// File where object's IOR is written to.
		const ACE_TCHAR * ior = ACE_TEXT("file://../ior_file");
		// Creates toaster object with IOR from file. The naming service should
		// be used for this.
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
