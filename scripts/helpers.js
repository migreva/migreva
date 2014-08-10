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
 		$object.addClass("fade").css({opacity : 0});
 		setTimeout(closure($object, callback), 500);
 		// $object.animate({opacity: 0}, 500, closure($object, callback));

 		function closure($object, callback){
 			var $obj = $object;
 			var fn = callback;
 			return function(){
 				$obj.addClass("display-none");
 				if (fn){
 					fn();
 				}
 			}
 		}
 	}

 	var showAndFadeIn = function($object){
 		$object.removeClass("display-none");
 		setTimeout(closure($object), 100);
 		
 		function closure($obj){
 			var $o = $obj;
 			return function(){
 				$object.css({opacity : 1});
 			}
 		}

 	}

	publicApi = {
		makeCopyOnTop : makeCopyOnTop,
		fadeOutAndHide : fadeOutAndHide,
		showAndFadeIn : showAndFadeIn,
	}

	return publicApi;
}