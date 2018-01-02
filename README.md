# querybuddy
a generic library for gathering DOM elements


This library aims to be a modest sizzle engine, as light weight as possible while still providing minor performance gains when querying the DOM manually.

Setup
1. npm install
if mocha is not installed on your machine
2. npm install -g mocha


Testing
1. npm test

Bundling
1. npm run-script pack
  -This project uses webpack for bundling.
  
TODO
1. leverage npx so that a global mocha install isn't a prereq to test this project
2. Complete the tagname regex expression
3. Implement the remaining unit tests
