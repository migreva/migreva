require([], function(){
	blog = new Blog();
	blog.init();

	return {
		init: blog.init
	}
});

var Blog = function(){

	blogPosts = [];	

	var init = function(){
		initTableOfContents();
	}

	function initTableOfContents(){
		$(".table-of-contents .contents-entry").each(initBlogPosts());
	}

	function initBlogPosts(){
		return function(index, element){
			var blogPost = new BlogPost();
			blogPost.init($(this));

			$(this).click(blogPost.clickHandler());
			// $(this).click(function(evt){
			// 	console.log("Clicked");
			// 	evt.stopPropagation();
			// 	evt.stopImmediatePropagation();
			// 	evt.preventDefault;
			// });

			blogPosts.push(blogPost);

		}
	}


	publicAPI = {
		init: init,
	}
	return publicAPI;
}


var BlogPost = function(){

	var $obj;
	var blogPostFile;

	var init = function($inputObj){ 
		if ($inputObj){
			this.$obj = $inputObj;
			this.blogPostFile = $inputObj.attr("href");
		}
	}	

	var clickHandler = function(){

		var fileToFetch = this.blogPostFile;
		return function(evt){
			console.log(fileToFetch)
			$(".blog-post-container").load(fileToFetch);

			evt.stopPropagation();
			evt.stopImmediatePropagation();
			evt.preventDefault();	
		}
	}

	publicAPI = {
		init : init,
		clickHandler : clickHandler,
	}
	return publicAPI;
}