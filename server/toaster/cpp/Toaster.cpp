// Toaster.cpp

#include "Toaster.h"
#include <chrono>
#include <thread>

Toaster::Toaster()
{
	is_toasting = false;
	toast_colour = 0;
	max_toast_colour = 100;
}

bool Toaster::insert_toast()
{
	// Can't insert toast if the toaster is already toasting.
	if (is_toasting)
	{
		return false;
	}

	is_toasting = true;

	// Increment toast colour by 1 every second until max_toast_colour or until
	// toast is ejected.
	for (toast_colour = 0; toast_colour < max_toast_colour && is_toasting; ++toast_colour)
	{
		std::this_thread::sleep_for(std::chrono::milliseconds(1000));
	}

	// If toast_colour reaches max_toast_colour, the toaster catches on fire
	// and cannot function.
	if (toast_colour >= max_toast_colour)
	{
		//throw Toaster::On_Fire();
	}

	return true;
}

bool Toaster::eject_toast()
{
	// If toast_colour is max_toast_colour, the toaster must be on fire and
	// cannot function.
	if (toast_colour >= max_toast_colour)
	{
		//throw Toaster::On_Fire();
	}

	if (!is_toasting)
	{
		return false;
	}

	is_toasting = false;
	return true;
}

short Toaster::get_toast_colour()
{
	return toast_colour;
}
