/*
The options:
.querySelector()
.querySelectorAll()
.getElementById() //SINGULAR
.getElementsByClassName()
.getElementsByTagName()
*/ 
export default class {
  constructor(){

  }

  //this is the only 
  @reqParam('selectorString')
  static find(selectorString,parent = document, limit = null){
    //check for singular queries
    if(limit == 1) return this.one(selectorString);

    const {methodCall, selector} = this._selectorHandler(selectorString);

    switch(methodCall){
      case 'class': return this._getByClass(selector,parent,limit);

      case 'tag': return this._getByTagName(selector,parent,limit);

      case 'generic': return this._generic(selectorString,parent,null);

      default: return null;
    }
  }

  //one is the same as domQuery.find where limit = 1
  @reqParam('selectorString')
  static one(selectorString,parent = document){
    const {methodCall, selector} = this._selectorHandlerSingular(selectorString);
    switch(methodCall){
      case 'id': return this._getById(selector,parent);

      case 'generic': return this._genericSingular(selectorString,parent);

      default: return null;
    }
  }

  //Split the selection string handlers into two seperate functions to reduce the noise of the non-singular
  static _selectorHandlerSingular(selectorString){
    //search for id's since there is a more performant option
    let byId = selectorString.match(/^[#]/);
    byId = selectorString.includes('[id=') || byId;

    let optimized = byId ? 'id' : 'generic';
    return {
      methodCall: optimized,
      selector: ''
    }

  }

  //@reqParam('selectorString')
  static _selectorHandler(selectorString){
    //search for classes and tagnames since there is a more performant option
    let byClass = selectorString.match(/^[.]/);
    byClass = selectorString.includes('[class=') || byClass;
    const byTag = selectorString.match(/^[] /); //TODO: FIND A GOOD REGEX FOR THIS



    const optimized = byClass ? 'class' : byTag ? 'tag' : 'generic';
    return {
      methodCall: optimized,
      selector: '',
    }
  }

  //for singular queries that aren't specified by id
  static _genericSingular(selectorString, parent = document){
    return parent.querySelector(selectorString);
    
  }

  //for #idName queries
  static _getById(selectorString,parent = document){
    return parent.getElementById(selectorString);
  }

  //this is the route to take when there aren't any qualified selectors e.g. .className or #idName
  static _generic(selectorString,parent = document, limit = null){
    return [...parent.querySelectorAll(selectorString)];
  }


  //when the user does a .className queries 
  static _getByClass(selectorString, parent=document, limit = null){
    return [...parent.getElementsByClassName(selectorString)]
  }

  //when the user passes in a string with no special characters
  static _getByTagName(selectorString, parent = document, limit =null){
    return [...parent.getElementsByTagName(selectorString)];
  }


}


function reqParam(value){
    return function(target,name,descriptor){
      const original = descriptor.value;
      if(typeof original == "function"){
        descriptor.value = function(...args){
          try{
            return args[value] != null ? original.apply(this,args) 
                                       : null;
          }
          catch(e){
            console.log(e);
            throw e;
          }
        }
      }
      return descriptor;
    }
}

//module.exports = new domQuery();