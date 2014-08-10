
require.config({
	// baseUrl: "scripts/",
	paths: {
		"blog" : "blog",
	    // "some": "some/v1.0"
	},
	// waitSeconds: 15
});

if (!window.console) console = {log : function(){}};

require(["index", "nav", "helpers", "lwf", "fetch", "constants"], function(){

	fetch = new Fetch();
	fetch.init();

	var nav = new Nav();
	nav.init();

	helpers = new Helpers();
});