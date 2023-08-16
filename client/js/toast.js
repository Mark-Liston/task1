$(document).ready(() =>
{
	setInterval(() =>
	{
		$.ajax(
		{
			type: "POST",
			url: "/getToastColour",
			success: (response) =>
			{
				$("#toastColour").text(response + "%");
			}
		});
	}, 500);
});

function showMessage(message)
{
	$("#message").css("color", "white");
	$("#message").text(message);
}

function showError(message)
{
	$("#message").css("color", "red");
	$("#message").text(message);
}

function insertToast()
{
	$.ajax(
	{
		type: "POST",
		url: "/insertToast",
		success: () =>
		{
			showMessage("Inserted toast!");
			$("#toastStatus").text("Eject toast to view status.");
		},
		error: (response) =>
		{
			if (response.responseText == "Already toasting")
			{
				showError("Toast has already been inserted. Eject the " +
					"current toast to insert again.");
			}
			else if (response.responseText == "On fire")
			{
				showError("Toaster is on fire and cannot function.");
			}
		}
	});
}

// TODO: Gets toast colour and returns corresponding textual description.
function getToastState(callback)
{
	$.ajax(
	{
		type: "POST",
		url: "/getToastColour",
		success: (response) =>
		{
			let toastColour = Number(response.toString());
			// Gets status of toast based on toastColour. If no other status
			// matches, it is assumed to be burnt to a crisp, i.e. toastColour
			// = 100.
			let toastStatus = "Burnt to a crisp.";
			if (toastColour < 33)
			{
				toastStatus = "Slightly warm bread.";
			}
			else if (toastColour < 66)
			{
				toastStatus = "Perfectly toasted.";
			}
			else if (toastColour < 99)
			{
				toastStatus = "Overtoasted."
			}

			callback(toastStatus);
		}
	});
}

function ejectToast()
{
	$.ajax(
	{
		type: "POST",
		url: "/ejectToast",
		success: () =>
		{
			showMessage("Ejected toast!");

			getToastState((toastState) =>
			{
				$("#toastStatus").text(toastState);
			});
		},
		error: (response) =>
		{
			if (response.responseText == "Nothing to eject")
			{
				showError("Toast has not been inserted. Insert toast to " +
					"eject.");
			}
			else if (response.responseText == "On fire")
			{
				showError("Toaster is on fire and cannot function.");
			}
		}
	});
}
