var moment = require("moment");

var HackSussex = {
	setup: function() {
		HackSussex.menuButton();
	},
	menuButton: function() {
		var menuButton = document.getElementById("menu");
		var header = document.getElementById("header");
		menuButton.href = "#";
		menuButton.addEventListener("click", function(e) {
			e.preventDefault();
			header.classList.toggle("open");
			if(header.classList.contains("open")) {
				menuButton.innerHTML = "Close";
			}
			else {
				menuButton.innerHTML = "Menu";
			}
		});
	},
	schedule: function() {
		setInterval(function() {
			if(moment().isSame("2017-11-11") || moment().isSame("2017-11-12")) {
				if(moment().isSame("2017-11-12")) {
					document.getElementById("heading-saturday").style.display = "none";
				}

				document.querySelectorAll(".block-list--item").forEach(function(el) {
					if(moment(el.querySelector("time").getAttribute("datetime")).isBefore(moment())) {
						el.style.opacity = "0";

						setTimeout(function() {
							el.parentNode.removeChild(el);
						}, 1000);
					}
				});
			}
		}, 2500);
	}	
};

exports.setup = HackSussex.setup;
exports.schedule = HackSussex.schedule;