var HackSussex = require("./src.js")

window.onload = function() {
	HackSussex.setup();

	if(window.location.pathname.startsWith("/schedule.html")) {
		HackSussex.schedule();
	}

	if("serviceWorker" in navigator) {
		navigator.serviceWorker.register("./service-worker.js")
		.then(function(registration) {
			console.log("ServiceWorker registration successful with scope: ", registration.scope);
		}, function(err) {
			console.log("ServiceWorker registration failed: ", err);
		});
	}
};