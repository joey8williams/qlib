var assert = require('chai').assert;
import domQuery from '../source/domQuery.js';
var dQ = new domQuery();

describe('selectorHandler Tests', function(){
  //#region public method tests
  //Two choices: return null when empty or return everything. Returning everything is an immediate performance hit and could lead to the wrong element being modified
  it('returns null when empty',function(){
    assert.equal(domQuery.find(null),null);
    assert.equal(domQuery.one(null),null);
  });
  //#endregion

  //#region selectorHandler tests (multiple)
  it('prefers the class method call with . or class= present',function(){
    const mk0 = domQuery._selectorHandler('.myTest').methodCall;
    const mk1 = domQuery._selectorHandler('[class="test"]').methodCall;
    assert.equal(mk0,'class');
    assert.equal(mk1,'class');
  });

  //dashes must be included to follow the HTML spec. 
  it('prefers the tag name call when there is a single word',function(){
    const mk0 = domQuery._selectorHandler('input').methodCall;
    const mk1 = domQuery._selectorHandler('inp3wut').methodCall;
    const mk2 = domQuery._selectorHandler('input-class').methodCall;
    const mk3 = domQuery._selectorHandler('input.className').methodCall;

    assert.equal(mk0,'class');
    assert.equal(mk1,'class');
    assert.equal(mk2,'class');
    assert.equal(mk3,'generic');
  });

  it('prefers generic when a tag name and any attribute is specified',function(){
    throw new Error('Not Implemented');
  });

  it('prefers generic when any non-class attribute is specified',function(){
    throw new Error('Not Implemented');
  });

  it('prefers generic when using nested CSS queries (e.g. row > div.className)',function(){
    throw new Error('Not Implemented');
  });
  //#endregion


  //The entire input[selectorType=selectorValue] selector
  it('finds node names, selector types, selector values from a single string',function(){
    throw new Error('Not Implemented');
  });

  

  //Should throw an error, the input must contain a selector value if there is a selector type
  it('finds strings ending in period or hash',function(){
    throw new Error('Not Implemented');
  });
});