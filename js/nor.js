var nor = {
  ver: "0.0.4",

  curry: function (fn, arity) {
    if (arity == null) arity = fn.length;
    var args = Array.prototype.slice.call(arguments, 2);
    return arity <= args.length
    ? fn.apply(undefined, args)
    : nor.curry.bind.apply(nor.curry, [undefined, fn, arity].concat(args));
  },

  request: function(url, callback, method, parameters) {
    if (method == null) method = "GET";
    var request = new XMLHttpRequest();
    request.onload = function () {
      if (request.status === 200) callback(request.responseText);
    }
    request.open(method, url, true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.send(parameters);
  },

  // tag : String
  // config : Javascript Object
  // ...children : String|Array|Node|Function
  createObject: function(tag, config) {
    var element = document.createElement(tag);
    var children = Array.prototype.slice.call(arguments, 2);
    if (config != null && config.constructor === Object) {
      for (var property in config) {
        var value = config[property];
        if (value == null || !config.hasOwnProperty(property)) continue;

        if (property[0] === 'o' && property[1] === 'n') {
          var once = property[2] === 'c' && property[3] === 'e';
          if (value.constructor === Object) {
            config[property] = nor.eventManager(once, element, value);
          } else {
            config[property] = nor.eventManager(
              once,
              element,
              property.substr(once ? 4 : 2),
              value
            );
          }
          continue
        }

        if (property.substr(4) === "data") {
          element.setAttribute(property, value);
        } else if (property === "parent") {
          value.appendChild(element);
        } else if (property === "child") {
          children.unshift(value);
        } else {
          element[property] = value;
        }
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
        } else if (
          typeof child === 'number' ||
          (typeof child === 'string' && child.length)
        ) {
          element.appendChild(document.createTextNode(String(child)));
        } else if (child instanceof Node) {
          element.appendChild(child);
        }
      }
    }

    return element;
  }
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
    for (var i = 0; i < target.length; i++) {
      target[i] = nor.eventManager(once, target[i], type, handle, options);
    }
    return target;
  }

  if (!(target instanceof EventTarget)) {
    throw new TypeError('nor.eventManager: target is invalid');
  }

  if (type.constructor === Object) {
    for (const name in type) {
      type[name] =
        nor.eventManager(once, target, name, type[name], options);
    }
    return type
  }

  if (typeof type === 'string') {
    if (type.indexOf(',') > -1) type = type.split(',')
    else if (type.indexOf(' ') > -1) type = type.split(' ')
  }

  if (Array.isArray(type)) {
    var isHandleArray = Array.isArray(handle)
    if (type.length === 1 && isHandleArray && handle.length === 1) {
      type = type[0];
      handle = handle[0];
    } else {
      var manager = {};
      if (isHandleArray) {
        if (handle.length === 1) handle = handle[0];
        else {
          for (var i = 0; i < type.length; i++) {
            manager[type[i]] =
              nor.eventManager(once, target, type[i], handle[i], options);
          }
        }
      } else {
        for (var i = 0; i < type.length; i++) {
          manager[type[i]] =
          nor.eventManager(once, target, type[i], handle, options);
        }
      }
      return manager;
    }
  }

  if (handle == null) {
    return nor.event.bind(undefined, once, target, type);
  }

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
