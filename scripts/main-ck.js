
require.config({
	// baseUrl: "scripts/",
	paths: {
		"blog" : "blog",
	    // "some": "some/v1.0"
	},
	// waitSeconds: 15
});

<<<<<<< HEAD
require(["lwf"], function(_lwf){
=======
require(["index", "nav", "helpers", "lwf", "fetch", "constants"], function(_lwf){
>>>>>>> InProgressSite

	fetch = new Fetch();
	fetch.init();

	var nav = new Nav();
	nav.init();

	helpers = new Helpers();
});