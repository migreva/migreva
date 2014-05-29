require([], function(){
	// Make a global helpers object
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

 	var fadeOutAndHide = function($object, callback){
 		$object.animate({opacity: 0}, closure($object, callback));

 		function closure($object, callback){
 			var $obj = $object;
 			var fn = callback;
 			return function(){
 				$obj.addClass("hide");
 				if (fn){
 					fn();
 				}
 			}
 		}
 	}

	publicApi = {
		makeCopyOnTop : makeCopyOnTop,
		fadeOutAndHide : fadeOutAndHide
	}

	return publicApi;
}