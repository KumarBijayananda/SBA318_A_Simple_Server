This is a server application created using express.js in a node.js runtime environment. 

This application serves three different data types, users, posts and commments. There are three
routers and three seperate data files to handle them. They are separated in data and routes folder
for clarity. The main file this server application is server.js which routes different endpoints 
to their individual handlers. The handlers then bring in data files to execute necessary funtions
on them.

There are three data files, users, posts, and comments. Each data type is stored in an Array of 
objects and each object hold key value pair for user, post or comment information. This data
structure allows the application to search and filter any information client may need by using
route parameter and query parameters. 

For each user, we have id, name, username and email. For each post, we have id, userid, title 
and content. And for each comment we have, id, userid, postid and body. So any comment can be
retrieved by userId or postId or any combination of them.

This application also follows the guiding priciples of REST by allowing statelessness, where 
each request can be fulfilled without any other addiotional information. We implement client-
server architecture by giving client the data it needs for user interface, not allowing access
to other resources than what is necessary. Uniform interface helps user usability and functionality.

There are also few middlewares used to handle errors and timestamp log of the incoming request.

Below are the different routes user can utilize for find any user, post, or comment.

http://localhost:3000/  -this is the root of the server.

http://localhost:3000/users  - this retrives all the users in the system with GET method or can
create a new user with POST method

http://localhost:3000/users/:id  - finds the user with specified ID with GET method, or can update
the user information with PATCH method and finally can delete a user with DELETE method.

http://localhost:3000/posts  - this retrives all the posts in the system with GET method or can
create a new post with POST method

http://localhost:3000/users/:id  - finds the post with specified ID with GET method, or can update
the post information with PATCH method and finally can delete a post with DELETE method.

http://localhost:3000/comments  - this retrives all the comments in the system with GET method or can
create a new comment with POST method

http://localhost:3000/comments/:id  - finds the comment with specified ID with GET method, or can update
the comment information with PATCH method and finally can delete a comment with DELETE method.

http://localhost:3000/users/:id/comments - retrieves all comments by the specified user ID 

http://localhost:3000/users/:id/comments?postId=<value>   - retrieves all comments by the specified 
user id on the specific post id.

http://localhost:3000/posts/:id/comments - retrieves all comments by the specified post ID.

http://localhost:3000/posts/:id/comments?userId=<value>   - retrieves all comments on the specified 
post id by the specific user id.


