# qlib
a generic library for gathering DOM elements


This library aims to be a modest sizzle engine, as light weight as possible while still providing minor performance gains when querying the DOM manually.





_#Development#_

#Setup#
1. npm install
  

#Testing#
1. npm test

#Bundling#
1. npm run-script pack
  -This project uses webpack for bundling.
  
TODO:
1. Remove the class declaration in favor of two main entry points (query, queryOne)
2. Once 1 is done - Refactor the unit tests to leverage query and queryOne instead of hitting functions that are no longer exported

