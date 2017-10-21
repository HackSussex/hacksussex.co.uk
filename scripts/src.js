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
	}	
};

exports.setup = HackSussex.setup;