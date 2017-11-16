var assert = require('chai').assert;
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

  //#endregion

});