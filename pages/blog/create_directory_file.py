import os
import re

# Posts directory name
posts_directory = "posts"
title_file = "title_file.txt"
table_of_contents_file = open("table_of_contents_file", 'w')

def is_valid_directory(directory_name):
	return re.match("post([0-9]+)", directory_name) is not None


if __name__ == "__main__":
	for post_directory_name in os.listdir(posts_directory):

		# Create the filepath
		directory_name = posts_directory + "/" + post_directory_name
		if os.path.isdir(directory_name) is True and is_valid_directory(post_directory_name) is True:
			
			# Get all the file names in the directory
			text_file_path = directory_name + "/" + title_file
			title_file_handle = open(text_file_path)

			# Read the contents of title file to get the name of the post
			title_of_post = title_file_handle.read()
			table_of_contents_file.write(post_directory_name + "\n")
			table_of_contents_file.write(title_of_post + "\n")


