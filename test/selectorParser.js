var assert = require('chai').assert;
import {_selectorParser} from '../source/domQuery.js';

describe('selectorParse Tests', function(){
  it('finds classNames from a valid selector string',function(){
    const answer = 'className';
    const _0 = _selectorParser(`.${answer}`,'class');
    const _1 = _selectorParser(`[class="${answer}"]`,'class');

    assert.equal(_0,answer);
    assert.equal(_1,answer);

  });

  it('finds ids from a valid selector string', function(){
    const answer = 'className';
    const _0 = _selectorParser(`#${answer}`,'id');
    const _1 = _selectorParser(`[id="${answer}"]`,'id');

    assert.equal(_0,answer);
    assert.equal(_1,answer);



  });
  it('returns the given selector string if the method is not class or id',function(){
    const _0a = 'tagname';
    const _1a = 'input.tagname';
    const _2a = 'input#className';


    const _0 = _selectorParser(_0a,'tag');
    const _1 = _selectorParser(_0a,'generic');

    const _2 = _selectorParser(_1a,'tag');
    const _3 = _selectorParser(_1a,'generic');

    const _4 = _selectorParser(_2a,'tag');
    const _5 = _selectorParser(_2a,'generic');

    assert.equal(_0,_0a);
    assert.equal(_1,_0a);

    assert.equal(_2,_1a);
    assert.equal(_3,_1a);

    assert.equal(_4,_2a);
    assert.equal(_5,_2a);


  });


  it('throws an error when the selector string is not formatted correctly',function(){
    const _0 = () => _selectorParser('input[class=babnana]','class');
    const _1 = () => _selectorParser('[id=babnana]','id');
    
    assert.throws(_0,Error,'Improper formatted selectorString');
    assert.throws(_1,Error,'Improper formatted selectorString');
  });


 

  //Should throw an error, the input must contain a selector value if there is a selector type
  it('finds strings ending in period or hash',function(){
    const _0 = () => _selectorParser('input.','class');
    const _1 = () => _selectorParser('input#','id');

    assert.throws(_0,Error,'Improper formatted selectorString');
    assert.throws(_1,Error,'Improper formatted selectorString');
  });

});
 