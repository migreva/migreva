require([], function(){
})

var Fetch = function(){

	var pageData = {
		"#blog" : "pages/blog/index.html",
		"#contact" : "",
		"#about" : "pages/about/index.html"	
	}

	var jsModules = {
		"#blog" : "blog"
	}

	var init = function(){

	}

	// Loads the data for the page "pageName" into page-data
	var getPage = function(pageName){
		$(".page-data").removeClass("fadeIn").addClass("fadeOut");
		var url = pageData[pageName];
		var module = jsModules[pageName];
		if (url){	
			var visiblePageData = $(".data:visible");
			if (visiblePageData.length){

				helpers.fadeOutAndHide(visiblePageData, closure(url, module));
				// loadIntoDom(url, module, pageName);

				// Function that allows for the loadIntoDom callback
				function closure(url, module, pageName){
					var u = url;
					var m = module;
					var p = pageName;
					return function(){
						loadIntoDom(u, m, p);
					}
				}

			}	
			else{
				loadIntoDom(url, module);
			}	
		}
	}

	var showPage = function(className){
		helpers.fadeOutAndHide($(".data:visible"), closure(className));

		function closure(className){
			var c = className;
			return function(){
				helpers.showAndFadeIn($(className));
			}
		}
	}

	function loadIntoDom(url, module, p){
		$.get(url, function(data){
			$(".page-data").append(data);

			// Now load the js file associated with this page (if possible)
			if (module && !require.defined(module)){
				require([module], function(module){

				});
			}
			else if (require.defined(module)){
				require.undef(module);
				require([module], function(module){

				});
			}
			// Fade it in if necessary
			if ($(".page-data").hasClass("fadeOut")){
				$(".page-data").removeClass("fadeOut").addClass("fadeIn");
			}
		});
	}

	var publicAPI = {
		init : init,
		getPage : getPage,
		showPage : showPage,
	}
	return publicAPI;
}
