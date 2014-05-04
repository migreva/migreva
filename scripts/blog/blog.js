$(document).ready(function(){
	/* Register callback for blog posts*/
	blog_register_callbacks();
	$(".blog_post_container").hide();
});

var current_displayed = -1;
var blog_post_error_page = "posts/sad_face.html";

function blog_register_callbacks(){
	
	$(".table_of_contents_entry").click(function(){

		entry_clicked($(this));
	});
}

function currently_displaying(){
	return (current_displayed != -1)
}

function is_currently_displayed(clicked_entry_id){
	return (clicked_entry_id.localeCompare(current_displayed) == 0);
}

function save_current_entry(current_clicked_entry){
	//alert("Saving  " + current_clicked_entry.attr("id"));
	current_displayed = "#" + current_clicked_entry;
}

function load_blog_post(blog_post_name){
	var path_to_post = "posts/" + blog_post_name + "/blog_post.html"

	try{
		$(".blog_post").load(path_to_post, function(){
			$(".blog_post_container").slideDown();
		});
	}
	catch(e){
		$(".blog_post").load("posts/sad_face.html", function(){
			$(".blog_post_container").slideDown();
		});
	}
}

function entry_clicked(clicked_entry){

	//is_clicked = is_currently_clicked(clicked_entry);
	var blog_post_container = $(".blog_post_container");
	var blog_post = $(".blog_post");

	var clicked_entry_id = clicked_entry.attr('id');

	if (currently_displaying()){
		$("#" + current_displayed).removeClass("table_of_contents_entry_clicked");
		blog_post_container.slideUp();

		if (is_currently_displayed(clicked_entry_id)){
			current_displayed = -1;
			return;
		}
	}

	clicked_entry.addClass("table_of_contents_entry_clicked");
	load_blog_post(clicked_entry_id);
	current_displayed = clicked_entry_id;
}

