var HackSussex = (function() {
	return {
		setup: function() {
			this.menu();
			this.removeServiceWorkers();
		},
		removeServiceWorkers: function() {
			navigator.serviceWorker.getRegistrations().then(function(registrations) {
				for(let registration of registrations) {
					registration.unregister();
				}
			});
		},
		menu: function() {
			// Mobile menu open/close functionality
			var header = document.querySelector(".header");
            var menuButton = document.getElementById("menu-button");
            menuButton.addEventListener("click", function() {
                menuButton.parentElement.parentElement.classList.toggle("menu-open");
            });
		}
	}
})();

window.onload = function() {
	HackSussex.setup();
};