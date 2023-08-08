// Toaster.h

#ifndef TOASTER_H
#define TOASTER_H

#include "Task1S.h"
#include <string>

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
};

#endif /* TOASTER_H */
