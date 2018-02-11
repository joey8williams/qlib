# qlib
a generic library for gathering DOM elements


This library aims to be a modest sizzle engine, as light weight as possible while still providing minor performance gains when querying the DOM manually.

## Usage
1. Install qlib to your project's web directory.
    * via npm: _npm install querybuddy_
2. Import query and queryOne to the files that need to query the DOM
    * ES6 Import Syntax: `import {query, queryOne} from 'querybuddy';`
    * Require Syntax a: `const query = require('querybuddy').query;`
    * Require Syntax b: `const queryOne = require('querybuddy').queryOne;`
3. Query the DOM similar to document.query### or jQuery's $(selector)

### Parameters:
#### query:
query(selectorString,parent,limit)
1. selectorString: your CSS compliant selector string. Any valid selector will work
2. parent: a parent element to query within. Defaults to document if parent is not specified.
3. limit: an integer value representing the number of results to return. If no limit is specified, all results will be returned. If n limit is specified, the first n results will be returned. If n=1 limit is specified, queryOne will be called.

#### queryOne:
queryOne(selectorString,parent)
1. selectorString: your CSS compliant selector string. Any valid selector will work
2. parent: a parent element to query within. Defaults to document if parent is not specified.


## Development

### Setup
1. npm install
  

### Testing
1. npm test

### Bundling
1. npm run-script pack
  * This project uses webpack for bundling.


###Todo:
1. Learn more about Live Lists and maybe incorporate a queryLive function in the future?


#Thanks!  
