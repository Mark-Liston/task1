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
	$("#message").text("Inserted toast!");
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
			showMessage(response.responseText);
		}
	});
}

function ejectToast()
{
	$("#message").show();
	$("#message").text("Ejected toast!");
}
