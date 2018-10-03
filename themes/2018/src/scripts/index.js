var HackSussex = (function() {
	return {
		setup: function() {
			this.menu();
			this.removeServiceWorkers();

			if(document.body.classList.contains("contact")) {
				this.contact();
			}
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
		},
		contact: function() {
			// Change select option depending on which link was clicked
			var url = new URL(window.location);
			var id = url.searchParams.get("id");
			console.log(id);
            document.getElementById("form-id-" + id).selected = true;
		}
	}
})();

window.onload = function() {
	HackSussex.setup();
};