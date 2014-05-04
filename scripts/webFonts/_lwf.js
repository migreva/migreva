
/* 
	Local Web Fonts (.js) 

Used deal with the web fonts. Register callbacks, etc. 

*/
require([], function(){

	function fontLoaded(familyName, fvd){

		if (familyName == "Amatic SC" && fvd == "n4"){
			
		}
	}

	WebFontConfig = {
		google: { families: [ 'Amatic+SC::latin' ] },
		loading: function() {
		},
		active: function() {},
		inactive: function() {},
		fontloading: function(familyName, fvd) {
			fontLoaded(familyName, fvd);
		},
		fontactive: function(familyName, fvd) {

		},
		fontinactive: function(familyName, fvd) {}
	};

	(function() {
	    var wf = document.createElement('script');
	    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	    wf.type = 'text/javascript';
	    wf.async = 'true';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(wf, s);
	  })();




});
