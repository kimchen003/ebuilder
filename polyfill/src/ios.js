/*
 * Safari throws an error when extending HTMLElement
 * https://github.com/google/traceur-compiler/issues/1709
 */
if (typeof HTMLElement !== 'function'){
  var _HTMLElement= function(){};
  _HTMLElement.prototype = window.HTMLElement.prototype;
  window.HTMLElement = _HTMLElement;
}

/*
 * iOS 8.1 safari TypeError: Object.setPrototypeOf(f,b.prototype)
 * https://github.com/Polymer/polymer/issues/5142
 */
if (!Object.setPrototypeOf) {
  Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
  };
}