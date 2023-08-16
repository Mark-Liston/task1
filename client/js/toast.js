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
		success: function(response)
		{
			//coursePlan_Edited = JSON.parse(response);
			showMessage("Inserted toast!");
		},
		error: function(response)
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
