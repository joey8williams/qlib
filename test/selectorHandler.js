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
    const _0 = domQuery._selectorHandler('.myTest').methodCall;
    const _1 = domQuery._selectorHandler('[class="test"]').methodCall;
    assert.equal(_0,'class');
    assert.equal(_1,'class');
  });

  //dashes must be included to follow the HTML spec. 
  it('prefers the tag name call when there is a single word',function(){
    const _0 = domQuery._selectorHandler('input').methodCall;
    const _1 = domQuery._selectorHandler('inp3wut').methodCall;
    const _2 = domQuery._selectorHandler('input-class').methodCall;

    assert.equal(_0,'tag');
    assert.equal(_1,'tag');
    assert.equal(_2,'tag');
  });

  it('prefers generic when a tag name and any attribute is specified',function(){
    const _0 = domQuery._selectorHandler('input.className').methodCall;

    assert.equal(_0,'generic');
  });

  it('prefers generic when any non-class attribute is specified',function(){
    const _0  = domQuery._selectorHandler('[data-single="test"]').methodCall;
    const _1 = domQuery._selectorHandler('input[data-name="test"]').methodCall;
    const _2 = domQuery._selectorHandler('input#test').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
  });

  it('prefers generic when using nested CSS queries (e.g. row > div.className)',function(){
    const _0 = domQuery._selectorHandler('div > button').methodCall;
    const _1 = domQuery._selectorHandler('div button').methodCall;
    const _2 = domQuery._selectorHandler('div :not(button)').methodCall;
    const _3 = domQuery._selectorHandler('div.className input').methodCall;
    const _4 = domQuery._selectorHandler('div input.item').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
    assert.equal(_3,'generic');
    assert.equal(_4,'generic');
  });
  //#endregion

  it('finds classNames from a valid selector string',function(){
    throw new Error('Not Implemented');

  });

  it('finds ids from a valid selector string', function(){
    throw new Error('Not Implemented');

  });
  it('returns the given selector string if the method is not class or id',function(){
    throw new Error('Not Implemented');

  });


  it('throws an error when the selector string is not formatted correctly',function(){
    const _0 = () => domQuery._selectorParser('input[class=babnana]','class');
    const _1 = () => domQuery._selectorParser('input[id=babnana]','id');
    
    assert.throws(_0,Error,'Improper formatted selectorString');
    assert.throws(_1,Error,'Improper formatted selectorString');
  });


 

  //Should throw an error, the input must contain a selector value if there is a selector type
  it('finds strings ending in period or hash',function(){
    throw new Error('Not Implemented');
  });
});