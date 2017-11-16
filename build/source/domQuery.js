'use strict';

var _dec, _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var domQuery = (_dec = reqParam('selectorString'), (_class = function () {
  function domQuery() {
    _classCallCheck(this, domQuery);
  }

  domQuery.prototype.one = function one(selectorString) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    console.log(selectorStringHandler(selectorString));
  };

  domQuery.prototype.selectorStringHandler = function selectorStringHandler(selectorString) {
    //if(selectorString == null) return null;

    var stringStart = selectorString[0];
    console.log(stringStart);

    return {
      elementType: '',
      queryableProp: '',
      propName: ''
    };
  };

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

  return domQuery;
}(), (_applyDecoratedDescriptor(_class.prototype, 'selectorStringHandler', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'selectorStringHandler'), _class.prototype)), _class));


function reqParam(value) {
  return function (target, name, descriptor) {
    var original = descriptor.value;
    if (typeof original == "function") {
      descriptor.value = function () {
        try {
          console.log('args are');

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          console.log(args);
          return args[value] != null ? original.apply(this, args) : null;
        } catch (e) {
          console.log(e);
          throw e;
        }
      };
    }
    return descriptor;
  };
}

module.exports.domQuery;
