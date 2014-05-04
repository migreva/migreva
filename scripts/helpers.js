require([], function(){
	// Make a global helpers object
	helpers = new Helpers();
});


// Helper functions to be used all over site
function Helpers(){

	// Makes a copy of $object, and places the copy over $object
	// Useful for animations
	//
	// Return the copy for use later 
	var makeCopyOnTop = function ($object){

		var $copy = $($object.get(0).cloneNode(true));
		var titleOffset = $object.offset();

		$copy.addClass("pos-absolute");
		$copy.offset(titleOffset);
		
		return $copy;
	}

	publicApi = {
		makeCopyOnTop : makeCopyOnTop,
	}

	return publicApi;
}