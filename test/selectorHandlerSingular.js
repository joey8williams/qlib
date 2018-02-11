var assert = require('chai').assert;
import {_selectorHandlerSingular} from '../source/domQuery.js';
//var dQ = new domQuery();
describe('selectorHandlerSingular Tests',function(){
  //#region selectorHandlerSingular tests
  it('prefers id with # or [id= present',function(){
    const mk0 = _selectorHandlerSingular('#Test').methodCall;
    const mk1 = _selectorHandlerSingular('[id="test"]').methodCall;

    assert.equal(mk0,'id');
    assert.equal(mk1,'id');
  });

  //This may change in the future, but for now if there is a request for nested elements, prefer generic over multiple queries
  it('prefers generic with nested CSS queries (singular)',function(){
    const mk0 = _selectorHandlerSingular('row > div').methodCall;
    const mk1 = _selectorHandlerSingular('row div').methodCall;
    const mk2 = _selectorHandlerSingular('row[id="test"] > div#id').methodCall;
    const mk3 = _selectorHandlerSingular('row[id="test"] div#id').methodCall;

    assert.equal(mk0,'generic');
    assert.equal(mk1,'generic');
    assert.equal(mk2,'generic');
    assert.equal(mk3,'generic');
  });

  it('prefers generic with any tag name specified, or any non id attribute',function(){
    const _0 = _selectorHandlerSingular('input[id="test"]').methodCall;
    const _1 = _selectorHandlerSingular('input#test').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    //throw new Error('Not Implemented');

  });


  it('prefers generic when a tag name and any attribute is specified',function(){
    const _0 = _selectorHandlerSingular('input#className').methodCall;

    assert.equal(_0,'generic');
  });

  it('prefers generic when any non-id attribute is specified',function(){
    const _0 = _selectorHandlerSingular('[data-single="test"]').methodCall;
    const _1 = _selectorHandlerSingular('input[data-name="test"]').methodCall;
    const _2 = _selectorHandlerSingular('input.test').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
  });

  it('prefers generic when using nested CSS queries (e.g. row > div.className)',function(){
    const _0 = _selectorHandlerSingular('div > button').methodCall;
    const _1 = _selectorHandlerSingular('div button').methodCall;
    const _2 = _selectorHandlerSingular('div :not(button)').methodCall;
    const _3 = _selectorHandlerSingular('div.className input').methodCall;
    const _4 = _selectorHandlerSingular('div input.item').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
    assert.equal(_3,'generic');
    assert.equal(_4,'generic');
  });


  //#endregion

});