# NOTES
- Use caution when upgrading Font Awesome. Right now I've manually changed the font directory in font-awesome.min.css to be in line with the reveal.js setup
- It would be great if the style property for element animations could accept functions instead of just key-value pairs
  - Will create GitHub issue for improvement.

# TODO
- In graph 4 (algorithm 1), is there a way to order the traversal/ highlighting so that it happens in a more logical order 
  - Descending/ ascending closeness?
- (?) Move scripts to reveal.js dependencies section
- (?) Reveal.js performs some scaling that seems to interfere with Cytoscape.js (mouse position wrong). Disable?
  - Disabling fixes, need to rewrite some HTML and CSS to keep things looking nice.

# Revisions
- I'm having trouble clearing the styles from graph4 (algorithms 1: traversal).
  - Possibly related to the Promise nature of the slide; the same code works to clear on graph5 (which is synchronous)
