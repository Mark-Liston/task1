// Toaster.h

#ifndef TOASTER_H
#define TOASTER_H

#include "Task1S.h"
#include <string>
#include <thread>
#include <memory>

class Toaster : public virtual POA_Task1::Toaster
{
public:
	Toaster();

	// Puts toast in toaster and starts toasting (increasing toast_colour).
	bool	insert_toast();
	// Removes toast from toaster and stops toasting.
	bool	eject_toast();
	
	// Accessor for toast_colour.
	short	get_toast_colour();

private:
	bool	is_toasting;
	short	toast_colour;
	short	max_toast_colour;

	// Thread that runs do_toast(), allowing it to toast in the background
	// while other functions are called.
	std::unique_ptr<std::thread> toasting_thread;

	void do_toast();
};

#endif /* TOASTER_H */
