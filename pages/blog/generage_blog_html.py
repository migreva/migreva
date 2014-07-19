import os, re

# Posts directory name
posts_directory_path = "pages/blog/posts"
posts_directory = "posts"
title_file = "title_file.txt"
blog_post_name = "blog_post.html"


def is_valid_directory(directory_name):
	return re.match("post([0-9]+)", directory_name) is not None


if __name__ == "__main__":

	print """
<div class='data blog'>
	<!--<div class='table-of-contents-container'>-->
		<div class='table-of-contents'>
"""

	html = ""
	count = 0
	NUMBLOGPOSTS = 20
	for post_directory_name in os.listdir(posts_directory):

		# Create the filepath
		directory_name = os.path.join(posts_directory, post_directory_name)
		directory_path = os.path.join(posts_directory_path, post_directory_name)
		if os.path.isdir(directory_name) and is_valid_directory(post_directory_name):
			
			# Get all the file names in the directory
			text_file_path = os.path.join(directory_name, title_file)
			blog_post_file = os.path.join(directory_path, blog_post_name)
			title_file_handle = open(text_file_path, "r")

			# Read the contents of title file to get the name of the post
			title_of_post = title_file_handle.read()

			# Generate the HTML
			html =  "\t\t<div class='contents-entry'><a href='{0}'>{1}</a><div class='indicator'></div></div>\n".format(blog_post_file, title_of_post) + html

			# Close the file
			title_file_handle.close()
			count += 1

	# title_of_post = "Tmp Post"
	# while count < 20:
	# 	html = "\t\t<div class='contents-entry'><a href='{0}'>{1}</a><div class='indicator'></div></div>\n".format(count, title_of_post) + html
	# 	count += 1

	print html

	print """
		</div>
	<!--</div>	-->
	<div class='blog-post-container post'>
	</div>
</div>
	"""


