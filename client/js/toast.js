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
			//coursePlan_Edited = JSON.parse(response);
			showMessage("Inserted toast!");
		},
		error: (response) =>
		{
			showMessage("Toast has already been inserted. Eject the current " +
				"toast to insert again.");
		}
	});
}

function ejectToast()
{
	$("#message").show();
	$("#message").text("Ejected toast!");
}
