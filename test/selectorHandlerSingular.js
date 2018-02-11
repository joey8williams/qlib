var assert = require('chai').assert;
import domQuery from '../source/domQuery.js';
var dQ = new domQuery();
describe('selectorHandlerSingular Tests',function(){
  //#region selectorHandlerSingular tests
  it('prefers id with # or [id= present',function(){
    const mk0 = domQuery._selectorHandlerSingular('#Test').methodCall;
    const mk1 = domQuery._selectorHandlerSingular('[id="test"]').methodCall;

    assert.equal(mk0,'id');
    assert.equal(mk1,'id');
  });

  //This may change in the future, but for now if there is a request for nested elements, prefer generic over multiple queries
  it('prefers generic with nested CSS queries (singular)',function(){
    const mk0 = domQuery._selectorHandlerSingular('row > div');
    const mk1 = domQuery._selectorHandlerSingular('row div');
    const mk2 = domQuery._selectorHandlerSingular('row[id="test"] > div#id');
    const mk3 = domQuery._selectorHandlerSingular('row[id="test"] div#id');

    assert.equal(mk0,'generic');
    assert.equal(mk1,'generic');
    assert.equal(mk2,'generic');
    assert.equal(mk3,'generic');
  });

  it('prefers generic with any tag name specified, or any non id attribute',function(){
    throw new Error('Not Implemented');

  });


  //dashes must be included to follow the HTML spec. 
  it('prefers the tag name call when there is a single word',function(){
    const _0 = domQuery._selectorHandlerSingular('input').methodCall;
    const _1 = domQuery._selectorHandlerSingular('inp3wut').methodCall;
    const _2 = domQuery._selectorHandlerSingular('input-class').methodCall;

    assert.equal(_0,'tag');
    assert.equal(_1,'tag');
    assert.equal(_2,'tag');
  });

  it('prefers generic when a tag name and any attribute is specified',function(){
    const _0 = domQuery._selectorHandlerSingular('input#className').methodCall;

    assert.equal(_0,'generic');
  });

  it('prefers generic when any non-id attribute is specified',function(){
    const _0  = domQuery._selectorHandlerSingular('[data-single="test"]').methodCall;
    const _1 = domQuery._selectorHandlerSingular('input[data-name="test"]').methodCall;
    const _2 = domQuery._selectorHandlerSingular('input.test').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
  });

  it('prefers generic when using nested CSS queries (e.g. row > div.className)',function(){
    const _0 = domQuery._selectorHandlerSingular('div > button').methodCall;
    const _1 = domQuery._selectorHandlerSingular('div button').methodCall;
    const _2 = domQuery._selectorHandlerSingular('div :not(button)').methodCall;
    const _3 = domQuery._selectorHandlerSingular('div.className input').methodCall;
    const _4 = domQuery._selectorHandlerSingular('div input.item').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
    assert.equal(_3,'generic');
    assert.equal(_4,'generic');
  });

  it('finds ids from a valid selector string', function(){
    throw new Error('Not Implemented');
  });
 
  //#endregion

});