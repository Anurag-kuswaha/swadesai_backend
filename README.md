# swadesai_backend
 swadesai backend nodejs server

#### we are running our  backend node server on port number 3001
#### as same port is configured under our frontend server

### How to setup the server
#### step 1: run `npm i` command
#### step 2: run command `npm run start` to start the server
# Tech stack used
#### NodeJs
#### ExpressJs
#### postgres DB (online)

to keep it simple , i have also pushed the env file for my online postgres DB

API Details
POST /signup: Registers a new user with email and password.
POST /login: Authenticates a user and returns a jwt token.
POST /post: Allows authenticated users to post a new article.
GET /posts: Retrieves all posts.
GET /posts?author=userId: Retrieves posts by a specific author
