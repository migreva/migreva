<?php 
	$page = "Blog";
	$root = "../../";
	include $root . "include/header.php"; 
?>
	<script src=<?php echo SCRIPT_ROOT . "/blog/blog.js"?>></script>
	<div class='content_bubble'>
		<div class='content'>
			<div class='table_of_contents'>
				<?php
					$blog_post_file = fopen(DIRECTORY_ARRAY_FILE_NAME, 'r');

					// Iterate through the blog post file
					// Read in the folder name (first, and odd numbered entries)
					while (false !== ($blog_post = fgets($blog_post_file))){

						// Get the blog entry name (second, and even numbered entries)
						if (false !== ($blog_entry_name = fgets($blog_post_file)))
						{
						?>
							<div class='table_of_contents_entry' id=<?php echo($blog_post) ?>>
								<div class='table_of_contents_text'>
									<?php echo $blog_entry_name; ?>
								</div>
							</div>
						<?
						}
					}
					
					for ($i = 0; $i < 100; $i++){
						?>
						<div class='table_of_contents_entry'>
							<div class='table_of_contents_text' id=<?php echo $i ?>>
								<?php echo $i ?>
							</div>
						</div>
						<?
					}
				?>
			</div>
			<div class='blog_post_container'>
				<div class="blog_post">
				</div>
			</div>
		</div>
	</div>

</body>

</html>