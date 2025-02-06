# webpack_template
Template for webpack initialization.
Inludes basic file structures and set up.
Downloaded plugins for html, css, and image processing.

"scripts": {
    "build": "webpack",
    "dev": "webpack serve",
    "deploy": "git subtree push --prefix dist origin gh-pages"
  }

# To Do List
This today list utilizes webpack for loading various modules.
The program utilizes local browser storage for persistance. It converts inputs and stores them in the appropriate project array which is contained in a master array.
The master is retrieved at each start of the session.

The home page displays all tasks on the docket. The project page displays each existing project.