const template = document.createElement("template");

const style = document.createElement("link");
style.setAttribute("rel", "stylesheet");
style.setAttribute("href", "../toaster-panel/style.css");
template.content.appendChild(style);

const mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "mainDiv");

const insertToastBtn = document.createElement("button");
insertToastBtn.setAttribute("type", "button");
insertToastBtn.setAttribute("id", "insertToastBtn");
insertToastBtn.innerHTML = "Insert Toast";
mainDiv.appendChild(insertToastBtn);

const ejectToastBtn = document.createElement("button");
ejectToastBtn.setAttribute("type", "button");
ejectToastBtn.setAttribute("id", "ejectToastBtn");
ejectToastBtn.innerHTML = "Eject Toast";
mainDiv.appendChild(ejectToastBtn);

const toastColourP = document.createElement("p");
toastColourP.innerHTML = "Toast Colour:";
const toastColour = document.createElement("span");
toastColour.setAttribute("id", "toastColour");
toastColour.innerHTML = "0%";
toastColourP.appendChild(toastColour);
mainDiv.appendChild(toastColourP);

const toastStatusP = document.createElement("p");
toastStatusP.innerHTML = "Toast Status: ";
const toastStatus = document.createElement("span");
toastStatus.setAttribute("id", "toastStatus");
toastStatus.innerHTML = "Eject toast to view status.";
toastStatusP.appendChild(toastStatus);
mainDiv.appendChild(toastStatusP);

const message = document.createElement("p");
message.setAttribute("id", "message");
mainDiv.appendChild(message);

template.content.appendChild(mainDiv);

class Toaster extends HTMLElement
{
	constructor()
	{
		super();

		const shadow = this.attachShadow({mode: "open"});
		shadow.appendChild(template.content.cloneNode(true));

		$(shadow).find("#insertToastBtn").click(insertToast);
		$(shadow).find("#ejectToastBtn").click(ejectToast);
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
						$(shadow).find("#toastColour").text(response + "%");
					}
				});
			}, 100);
		});

		function showMessage(message)
		{
			$(shadow).find("#message").css("color", "inherit");
			$(shadow).find("#message").text(message);
		}

		function showError(message)
		{
			$(shadow).find("#message").css("color", "red");
			$(shadow).find("#message").text(message);
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
					$(shadow).find("#toastStatus").text("Eject toast to " +
						"view status.");
				},
				error: (response) =>
				{
					if (response.responseText == "Already toasting")
					{
						showError("Toast has already been inserted. Eject " +
							"the current toast to insert again.");
					}
					else if (response.responseText == "On fire")
					{
						showError("Toaster is on fire and cannot function.");
					}
				}
			});
		}

		function writeToastStatus(callback)
		{
			$.ajax(
			{
				type: "POST",
				url: "/getToastColour",
				success: (response) =>
				{
					let toastColour = Number(response.toString());
					// Gets status of toast based on toastColour. If no other
					// status matches, it is assumed to be burnt to a crisp,
					// i.e. toastColour = 100.
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

					$(shadow).find("#toastStatus").text(toastStatus);
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
					writeToastStatus();
				},
				error: (response) =>
				{
					writeToastStatus();

					if (response.responseText == "Nothing to eject")
					{
						showError("Toast has not been inserted. Insert " + 
							"toast to eject.");
					}
					else if (response.responseText == "On fire")
					{
						showError("Toaster is on fire and cannot function.");
					}
				}
			});
		}
	}
}

customElements.define("toaster-panel", Toaster);
