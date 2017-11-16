class domQuery{
  constructor(){

  }
  one(selectorString,parent = document, limit = null){
    this.selectorStringHandler(selectorString);
  }

  @reqParam('selectorString')
  selectorStringHandler(selectorString){
    
    const stringStart = selectorString[0];
    console.log(stringStart);


    return {
      elementType:'',
      queryableProp: '',
      propName: '',
    }
  }



  // static one(elementType, selectorValue, parent = document, selectorType = 'id'){
  //    const isById = selectorType == 'id';

  //    return isById ? parent.getElementById(selectorValue)
  //                  : parent.querySelector(`${elementType}[${selectorType}="${selectorValue}"]`);
  // }
  // static oneLike(elementType,selectorValue, parent = document, selectorType = 'id'){
  //    return parent.querySelector(`${elementType}[${selectorType}*="${selectorValue}"]`);
  // }
  // static all(elementType,selectorValue, parent = document, selectorType = 'id'){
  //    const isByClass = selectorType == 'class';

  //    return isByClass ? [...parent.getElementsByClassName(selectorValue)]
  //                     : [...parent.querySelectorAll(`${elementType}[${selectorType}="${selectorValue}"]`)];
  // }
  // static allLike(elementType,selectorValue, parent = document, selectorType = 'id'){
  //   return [...parent.querySelectorAll(`${elementType}[${selectorType}*="${selectorValue}"`)];
  // }
  // static component(elementType, parent = document){
  //   return [...parent.getElementsByTagName(elementType)].shift();
  // }
  // static allComponent(elementType,parent=document){
  //   return [...parent.getElementsByTagName(elementType)];
  // }

  // static getData(element,name){
  //   return element.getAttribute(`data-${name}`);

  // }
  // static setData(element,name,value){
  //   return element.setAttribute(`data-${name}`,value);
  // }
  
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

module.exports.domQuery;