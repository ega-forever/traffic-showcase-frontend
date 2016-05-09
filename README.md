# maps-showcase
to get started you need:

1)first do "npm install"

2)in client dir run "bower install" and then "gulp compile". 
The second one command will create a dev build inside a server/public dir.

3)then under server dir "node server.js"

4)project will be available on your host under 9000 port

5)to run tests on frontend follow /tests/. For backend(server) you need global jasmine installed via npm.
To run tests, under dir server/tests dir run "jasmine"

# how does it work?

It's simple, when you click on a map, a remote call to yelp fetch the nearest places to eat and displays it.
