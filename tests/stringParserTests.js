const {assert} = chai;
let query = new domQuery();
describe('stringParser', function(){
  //Two choices: return null when empty or return everything. Returning everything is an immediate performance hit and could lead to the wrong element being modified
  it('returns null when empty',function(){
    assert.equal(query.selectorStringHandler(null),null);
  });

  //This is an immediate target to hunt for getElementById
  it('finds strings starting with special characters',function(){
    //periods

    //hashes

    //brackets ([data-])

    //others?

  });

  //Target to search by node name
  it('finds single word strings',function(){

  });

  //The entire input[selectorType=selectorValue] selector
  it('finds node names, selector types, selector values from a single string',function(){

  });

  //Should throw an error, the input must contain a selector value if there is a selector type
  it('finds strings ending in period or hash',function(){

  });


  


});