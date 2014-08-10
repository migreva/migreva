require([], function(){
	
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
		}
		else{
			curNavMode = navModeIndex;
		}
	}

	function fadeInContent(){
		$(".content").removeClass("rearrange").addClass("fade fadeIn");
	}

	var setUpPage = function(clickedChoice, noAnimation, callback){
		// Fade out the choices text 
		$(".index-stuff").animate({opacity: 0}, function(){ // Now move stuff around.
			$(".page-title").text(clickedChoice.getName());
			$(".page-title-container").toggleClass("page-title-hidden")

			// Remove the welcome text
			$welcomeText.remove();

			// Set the page title text
			console.log(clickedChoice.getName());

			$navChoices = $(".nav-choices");

			// Fix all the existing choices (hidden, invisible, etc)
			$(".choice-hide").addClass("choice").removeClass("choice-hide"); // Unhide the home button, essentially
			$(".choice.invisible").removeClass("choice invisible").addClass("choice-hide");

			// Move navChoices around
			// $navChoices.detach();
			$(".nav-menu").append($navChoices);

			// Grey out currently selected choice, fade in nav menu
			$navChoices.removeClass("nav-choices").addClass("nav-choices-menu navMenuSlideOut");


			clickedChoice.greyOut();

			// Activate the nav-menu click handler
			$(".nav-menu-toggle .burger").click(navMenuToggle());

			$(".page-data").addClass("fadeIn").removeClass("zero-opacity");

			if (callback){
				callback();
			}

			setTimeout(function(){
				getPage(clickedChoice);
			}, 200);

		});
	}

	function navMenuToggle(){
		var $navChoicesMenu = $(".nav-choices-menu");
		var slideInClass = "navMenuSlideIn"
		var slideOutClass = "navMenuSlideOut";
		var slideClassToggle = slideInClass + " " + slideOutClass;
		return function(evt){
			$navChoicesMenu.toggleClass(slideClassToggle);
		}
	}

	var changePageTitle = function(clickedChoice, newTitle){
			
		var $pageTitle = $(".page-title");
		// $pageTitle.get(0).addEventListener("transitionend", changeTitleHandler(newTitle), false);
		$pageTitle.addClass("page-title-hidden");
		// helpers.fadeOutAndHide(visiblePageData, closure(url, module));
		// $(".data:visible").addClass("fadeOut");

		setTimeout(changeTitleHandler(newTitle), 500);

		function changeTitleHandler(t){
			var title = t;
			return function(){
				$(".page-title").text(title).removeClass("page-title-hidden");
				// $(".data:visible").addClass("display-none");
			}

		}
	}

	// Load the page. clickedChoice is of type Choice
	function getPage(clickedChoice){

		// console.log(clickedChoice.getDivClass());
		var collection = $(clickedChoice.getDivClass());
		if (collection.length == 0){
			var href = clickedChoice.getHref();
			fetch.getPage(href);			
		}
		else{
			fetch.showPage(clickedChoice.getDivClass());
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
			changePageTitle(clickedChoice, clickedChoice.getName());

			// Load the page
			getPage(clickedChoice);
		}
	}

	var choiceClickHandler = function(evt){

		var clickedName = $(this).text();
		var choice = choices[choiceIndices[clickedName]];
		clickedChoice = choice; // Save the currently clicked choice
		var choiceNavMode = choice.getNavMode();

		// Arrange choices as needed
		arrangeChoices(clickedChoice);
	}

	function toggleDarkenScreen(){
		$(".dim").toggleClass("display-none").toggleClass("display-block");
		$("body").toggleClass("body-grey-out");
	}

	function toggleExternals(evt){
		$(".externals").toggleClass("externals-show"); // Click handler is for the <span> text, so need to find siblings
		toggleDarkenScreen();
		$(".dim").click(function(evt){
			$(".externals").toggleClass("externals-show"); 
			toggleDarkenScreen();
			$(this).unbind("click");
			evt.stopPropagation();
			evt.stopImmediatePropagation();
			evt.preventDefault();
		});
	}

	// Register the click event for each one of the choices, and
	// add a Choice object to the choices object 
	var registerChoiceClick = function(hrefAttributes){

		var hrefAttributes = hrefAttributes
		return function(index, value){

			var choiceName = $(this).find(".text").text();//.replace(" ", "");
			var nextIndex = choices.length;

			var choiceObj = new Choice();
			choiceObj.init(choiceName, $(this), navModeIndex);

			// Register click handler
			if ($(this).children("a").length){
				choiceObj.obj().find("a").click(choiceClickHandler);
			}
			else if (choiceName.toLowerCase() == "contact"){
				$(this).find(".text").click(toggleExternals);
			}

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
	var divClass = "";
	var $this;
	var href; 
	var navMode = "";
	var choiceArrayIndex;
	var unclickedChoiceArrayIndex;

	var init = function(name, htmlObj, navMode){
		if (name){
			this.name = name;
			this.divClass = "." + name.toLowerCase();
		}

		if (htmlObj){
			this.$this = htmlObj;
			this.href = this.$this.find("a").attr("href");
		}

		if (navMode){
			this.navMode = navMode;
		}
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

	var getDivClass = function(){
		return this.divClass;
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
		greyOut : greyOut,

		/* Getters */
		obj : obj,
		getNavMode : getNavMode,
		getName : getName,
		getHref : getHref,
		getDivClass : getDivClass,


		/* Setters */
		setNavMode : setNavMode,
		setChoiceArrayIndex : setChoiceArrayIndex,
		setUnclickedChoiceArrayIndex : setUnclickedChoiceArrayIndex,
	}
	return publicAPI;
}