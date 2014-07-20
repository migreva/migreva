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

			blogPosts.push(blogPost);

			// If this is the first table of contents entry, load it up on the page
			if (blogPosts.length == 1){
				blogPosts[0].getJqueryObj().trigger("click");
			}

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
			this.blogPostFile = $inputObj.find("a").attr("href");
		}
	}	

	var getJqueryObj = function(){
		return this.$obj;
	}

	var clickHandler = function(){

		var fileToFetch = this.blogPostFile;
		var $obj = this.$obj;
		return function(evt){
			$(".blog-post-container").load(fileToFetch);
			$(".contents-entry .clicked").removeClass("clicked");
			$obj.find(".indicator").addClass("clicked");

			evt.stopPropagation();
			evt.stopImmediatePropagation();
			evt.preventDefault();	
		}
	}

	publicAPI = {
		init : init,
		clickHandler : clickHandler,

		/* Getters */
		getJqueryObj : getJqueryObj,
	}
	return publicAPI;
}