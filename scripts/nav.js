require([], function(){

	var nav = new Nav();
	nav.init();
	
});


/* Closures */
var Nav = function(){
	/* Choices */
	var choices = [];
	var choiceIndices = {};
	var clickedChoice;
	var unClickedChoices = []
	var unclickedChoiceIndices = {}
	var hrefAttributes = { test : "test"};
	var documentUrl = document.URL;
	var documentHash  = window.location.hash ? window.location.hash : "";


	/* Objects */
	var $welcomeText = $(".welcome-text");
	var $pageTitle = $(".page-title");

	/* Nav modes */
	var navModeIndex = "index";
	var navModeNav = "nav";
	var navModes = [navModeIndex, navModeNav];
	var curNavMode;

	/* Events */
	var pageSetUp = new Event("pagesetup");
	document.addEventListener("pagesetup", fadeInContent);

	var init = function(){
		$(".choice").each(registerChoiceClick(hrefAttributes));

		if (documentHash && hrefAttributes[documentHash]){
			curNavMode = navModeNav;

			$(".content").addClass("rearrange");
			setUpPage(hrefAttributes[documentHash], true, fadeInContent);
			// $(".content").removeClass("rearrange").addClass("fadeIn");
		}
		else{

			curNavMode = navModeIndex;
		}
	}

	function fadeInContent(){
		$(".content").removeClass("rearrange").addClass("fadeIn");
	}

	var setUpPage = function(clickedChoice, noAnimation, callback){
		// Fade out the choices text 
		$(".index-stuff").animate({opacity: 0}, function(){ // Now move stuff around.
			$(".page-title").text(clickedChoice.getName());

			if (!noAnimation){
				clickedChoice.setAsClicked();
			}
			else{
				$(".page-title").removeClass("invisible");
			}

			// Remove the welcome text
			$welcomeText.remove();

			// Set the page title text
			console.log(clickedChoice.getName());

			$navChoices = $(".nav-choices");

			// Fix all the existing choices (hidden, invisible, etc)
			$(".choice-hide").addClass("choice").removeClass("choice-hide"); // Unhide the home button, essentially
			$(".choice.invisible").removeClass("choice invisible").addClass("choice-hide");

			// Move navChoices around
			$navChoices.detach();
			$(".content").append($navChoices);

			// Grey out currently selected choice, fade in nav menu
			$navChoices.removeClass("nav-choices").addClass("nav-choices-menu");
			clickedChoice.greyOut();

			//TODO figure out why that css animation wont work
			$navChoices.animate({opacity: 1});
			// $(this).hide();

			if (callback){
				callback();
			}
		});
	}

	var changePageTitle = function(newTitle){
			
		var $pageTitle = $(".page-title");
		var pageTitleHeight = $pageTitle.height() ;

		// Make a copy and place it over the currently existing title
		var $copy = helpers.makeCopyOnTop($pageTitle);
		$pageTitle.addClass("invisible");
		$("body").append($copy);


		$copy.animate({top : pageTitleHeight * -1 }, moveTitleBack(newTitle, $pageTitle));

		function moveTitleBack(newTitle, $pageTitle){

			return function(){
				// Set the texts
				$pageTitle.text(newTitle);
				$(this).text(newTitle);

				$(this).animate({top : 0}, function(){
					$(".page-title").removeClass("invisible");
					$(this).remove();
				});
			}
		}
	}



	var arrangeChoices = function(clickedChoice){
		// Set up the nav menu and stuff
		if (curNavMode == navModeIndex){ 
			curNavMode = navModeNav;

			for (var index in choices) {
				if (choices.hasOwnProperty(index)) {
					var choice = choices[index];
					var clickedChoiceName  = clickedChoice.getName()
					var choiceName = choice.getName();
					choice.setNavMode(curNavMode);

					if (choiceName != clickedChoiceName){ // Add as unclicked object
						unClickedChoices.push(choices[choice]);
						unclickedChoiceIndices[choiceName]; 
					}
				}
			}

			setUpPage(clickedChoice);
		}
		// We already have the nav menu
		else{ 
			// Unselect the current one
			$(".selected").removeClass("selected");

			// Select the clicked one
			clickedChoice.greyOut();

			// Change the page title
			changePageTitle(clickedChoice.getName());
		}
	}

	var choiceClickHandler = function(evt){

		var clickedName = $(this).text();
		var choice = choices[choiceIndices[clickedName]];
		clickedChoice = choice; // Save the currently clicked choice
		var choiceNavMode = choice.getNavMode();

		arrangeChoices(clickedChoice);
		// Figure out how we're navigating. If it's on the index page,
		// we have to re-arrange the choices 
		if (choiceNavMode == navModeIndex){
			
		}
		else if (choiceNavMode == navModeNav){

		}
		

		// evt.stopPropagation();
		// evt.stopImmediatePropagation();
		// evt.preventDefault();
	}

	// Register the click event for each one of the choices, and
	// add a Choice object to the choices object 
	var registerChoiceClick = function(hrefAttributes){

		var hrefAttributes = hrefAttributes
		return function(index, value){
			var choiceName = $(this).text();
			var nextIndex = choices.length;

			var choiceObj = new Choice();
			choiceObj.init(choiceName, $(this), navModeIndex);


			// Register click handler
			choiceObj.obj().find("a").click(choiceClickHandler);

			// Get object's href tag
			console.log(choiceObj.getHref());
			hrefAttributes[choiceObj.getHref()] =  choiceObj;

			choices.push(choiceObj);
			choiceIndices[choiceName] = nextIndex;

		}

		
	}


	var publicAPI = {
		init : init
	};
	return publicAPI;
};

var Choice = function(){
	var name = "";
	var $this;
	var href; 
	var navMode = "";
	var choiceArrayIndex;
	var unclickedChoiceArrayIndex;

	var init = function(name, htmlObj, navMode){
		if (name){
			this.name = name;
		}

		if (htmlObj){
			this.$this = htmlObj;
			this.href = this.$this.find("a").attr("href");
		}

		if (navMode){
			this.navMode = navMode;
		}
	}

	var setAsClicked = function(){

		// Get coordinates, etc
		var curOffset = this.$this.offset();
		var width = this.$this.width();
		var fontSize = this.$this.css("font-size");

		// Detach it from choices
		// Make a clone of it
		var copy = this.$this.get(0).cloneNode(true);
		$copy = $(copy);

		// Create the title object that we're going to animate towards
		// and get it's offset
		var targetOffest = $(".page-title").offset();

		// Add it back to the spot where the user clicked
		$copy.addClass("selected-and-pre-moving");
		$copy.offset(curOffset);
		$copy.width(width);

		// Put it back in the body object (display it), and animate
		$("body").append($copy);
		$copy.removeClass("selected-and-pre-moving").addClass("selected-and-moving");
		$copy.animate({top: targetOffest.top, left: targetOffest.left}, function(){
			$(".page-title").removeClass("invisible");
			$copy.remove();
		});

		// $this.remove();
		// $this = $(newDOMObject);

		
		// $this.show();
	}

	var greyOut = function(){
		this.$this.addClass("selected");
	}

	// For a given width, get coordinates that will center 
	function getCenteredCoordinates(width){

	}

	/* Getters */
	var obj = function(){
		return this.$this;
	}

	var getNavMode = function(){
		return this.navMode;
	}

	var getName = function(){
		return this.name;
	}

	var getHref = function(){
		return this.href;
	}

	/* Setters */
	var setNavMode = function(navMode){
		if (navMode){
			this.navMode = navMode;
		}
	}

	var setChoiceArrayIndex = function(index){
		this.choiceArrayIndex = index;
	}

	var setUnclickedChoiceArrayIndex = function(index){
		this.unclickedChoiceArrayIndex = index;
	}


	var publicAPI = {
		init : init,
		setAsClicked : setAsClicked,
		greyOut : greyOut,

		/* Getters */
		obj : obj,
		getNavMode : getNavMode,
		getName : getName,
		getHref : getHref,


		/* Setters */
		setNavMode : setNavMode,
		setChoiceArrayIndex : setChoiceArrayIndex,
		setUnclickedChoiceArrayIndex : setUnclickedChoiceArrayIndex,
	}
	return publicAPI;
}