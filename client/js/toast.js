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
	$("#message").show();
	$("#message").text(message);
}

function insertToast()
{
	$.ajax(
	{
		type: "POST",
		url: "/insertToast",
		success: (response) =>
		{
			showMessage("Inserted toast!");
		},
		error: () =>
		{
			showMessage("Toast has already been inserted. Eject the current " +
				"toast to insert again.");
		}
	});
}

function ejectToast()
{
	$.ajax(
	{
		type: "POST",
		url: "/ejectToast",
		success: (response) =>
		{
			showMessage("Ejected toast!");
		},
		error: () =>
		{
			showMessage("Toast has not been inserted. Insert toast to eject.");
		}
	});
}
