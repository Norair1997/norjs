var nor = {
  ver: "0.0.5",

  curry: function (fn, arity) {
    if (arity == null) arity = fn.length;
    var args = Array.prototype.slice.call(arguments, 2);
    return arity <= args.length ? fn.apply(undefined, args) :
      nor.curry.bind.apply(nor.curry, [undefined, fn, arity].concat(args));
  },

  request: function(url, config) {
    var method = "GET", 
        parameters = "", 
        callbacks = {"onSuccess": false, "onError": false}

    for (var prop in config) {
      if (config.hasOwnProperty(prop)) {
        var value = config[prop];

        if (prop == "method") {
          method = value;
        } else if (prop == "onSuccess") {
          // if the onSuccess is defined set it true
          callbacks["onSuccess"] = true;
        } else if (prop == "onError") {
          callbacks["onError"] = true;
        } else if (prop == "data") {
          parameters = value;
        }
      }
    }

    var request = new XMLHttpRequest();
    request.onload = function () {
      // if the dev defined an onSuccess function, we call the callback returning the request Object
      if (request.status === 200 && callbacks.onSuccess) config.onSuccess(request);
      // if the dev defined an onError function, we call the callback returning the request Object
      if ((request.status === 404 || request.status === 500) && callbacks.onError) config.onError(request);
    }
    
    request.open(method, url, true);
    
    request.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8");
    request.send(parameters);
  },

  // tag : String
  // config : Javascript Object
  // ...children : String|Array|Node|Function
  createObject: function(tag, config) {
    var element = document.createElement(tag);
    var children = Array.prototype.slice.call(arguments, 2);
    if (config != null && config.constructor === Object) {
      var value;
      for (var prop in config) {
        if ((value = config[prop]) == null) continue;

        if (prop[0] === 'o' && prop[1] === 'n') {
          var once = prop[2] === 'c' && prop[3] === 'e';
          config[prop] = value.constructor === Object ?
          nor.eventManager(once, element, value) :
          nor.eventManager(once, element, prop.substr(once ? 4 : 2), value);
          continue
        }

        prop.substr(4) === "data" ? element.setAttribute(prop, value) :
        prop === "parent" ? value.appendChild(element) :
        prop === "child" || prop === "children" ? children.unshift(value) :
        element[prop] = value;
      }
    } else if (config instanceof Node || typeof config === 'string') {
      children.unshift(config);
    }

    if (children.length) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child instanceof Function) child = child(element);
        if (Array.isArray(child)) {
          children.splice.apply(children, [i, 1].concat(child));
          i--;
        } else if (typeof child === 'string' && child.length) {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          element.appendChild(child);
        }
      }
    }
    return element;
  }
}

nor.dupeObj = function (obj) {
   var temp = {};
   for (var key in obj) temp[key] = obj[key];
   return temp;
}

// once: boolean
// target: String|EventTarget|Array
// type: String|Array
// hanlde: Function|Array
// =options: Object|Boolean
// returns Object|Array
nor.eventManager = nor.curry(function (once, target, type, handle, options) {
  if (options == null) options = false;

  if (typeof target === 'string') {
    target = document.querySelectorAll(target);
    if (target.length === 1) target = target[0];
  }

  if (target.length) {
    var objType = type.constructor === Object
    for (var i = 0; i < target.length; i++) {
      target[i] = nor.eventManager(
        once, target[i], objType ? nor.dupeObj(type) : type, handle, options
      );
    }
    return target;
  }

  if (!(target instanceof EventTarget)) {
    throw new TypeError('nor.eventManager: target is invalid');
  }

  if (type.constructor === Object) {
    for (var name in type) {
      type[name] = nor.eventManager(once, target, name, type[name], options);
    }
    return type
  }

  if (handle == null) return nor.event.bind(undefined, once, target, type);

  var isOn = false;

  handle = handle.bind(target);

  var handler = function(evt) {
    handle(evt, target);
    if (once) remove();
  }

  var remove = function() {
    target.removeEventListener(type, handler);
    isOn = false;
    return manager;
  }

  var add = function(mode) {
    if (isOn) remove();
    once = !!mode;
    target.addEventListener(type, handler, options);
    isOn = true;
    return manager;
  }

  var manager = {
    get isOn () { return isOn },
    target: target,
    on: add,
    off: remove,
    once: add.bind(undefined, true),
    emit: nor.emit.bind(undefined, target)
  }

  return add(once);
}, 3)

nor.once = nor.eventManager(true);
nor.on = nor.event = nor.eventManager(false);
nor.emit = function(target, type, detail) {
  target.dispatchEvent(new CustomEvent(type, {detail: detail}));
}
