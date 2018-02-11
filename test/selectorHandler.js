var assert = require('chai').assert;
import {_selectorHandler} from '../source/domQuery.js';

describe('selectorHandler Tests', function(){

  //#region selectorHandler tests (multiple)
  it('prefers the class method call with . or class= present',function(){
    const _0 = _selectorHandler('.myTest').methodCall;
    const _1 = _selectorHandler('[class="test"]').methodCall;
    assert.equal(_0,'class');
    assert.equal(_1,'class');
  });

  //dashes must be included to follow the HTML spec. 
  it('prefers the tag name call when there is a single word',function(){
    const _0 = _selectorHandler('input').methodCall;
    const _1 = _selectorHandler('inp3wut').methodCall;
    const _2 = _selectorHandler('input-class').methodCall;

    assert.equal(_0,'tag');
    assert.equal(_1,'tag');
    assert.equal(_2,'tag');
  });

  it('prefers generic when a tag name and any attribute is specified',function(){
    const _0 = _selectorHandler('input.className').methodCall;

    assert.equal(_0,'generic');
  });

  it('prefers generic when any non-class attribute is specified',function(){
    const _0 = _selectorHandler('[data-single="test"]').methodCall;
    const _1 = _selectorHandler('input[data-name="test"]').methodCall;
    const _2 = _selectorHandler('input#test').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
  });

  it('prefers generic when using nested CSS queries (e.g. row > div.className)',function(){
    const _0 = _selectorHandler('div > button').methodCall;
    const _1 = _selectorHandler('div button').methodCall;
    const _2 = _selectorHandler('div :not(button)').methodCall;
    const _3 = _selectorHandler('div.className input').methodCall;
    const _4 = _selectorHandler('div input.item').methodCall;

    assert.equal(_0,'generic');
    assert.equal(_1,'generic');
    assert.equal(_2,'generic');
    assert.equal(_3,'generic');
    assert.equal(_4,'generic');
  });
  //#endregion

});