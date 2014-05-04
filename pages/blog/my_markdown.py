import markdown

fileString = "./posts/post1/second_post.md"
outFileString = "./posts/post1/second_post.html"
f = open(fileString, "r")
fOut = open(outFileString, "w")
markdownText = f.read()
f.close()

html = markdown.markdown(markdownText)
fOut.write(html)
fOut.close()