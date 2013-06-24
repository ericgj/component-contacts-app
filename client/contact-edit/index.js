var reactive = require('reactive')
  , domify   = require('domify')
  , template = require('./template')

module.exports = View;

function View(model){
  if (!(this instanceof View)) return new View(model);
  this.model = model;
  this.el = domify(template);
  this.errors = {};

  this._display( emptyString, 'name','organization','email','phone','comments' );

  binding = reactive(this.el, model, this);
  binding.bind("autosubmit", function(el){
    el.onsubmit = function(e){
      e.preventDefault();
      model[ model.isNew() ? 'save' : 'update' ]();
    }
  });

  return this;
}

View.prototype.update = function(e){
  var target = e.target, name = target.name, value = target.value;
  var model = this.model;
  if (model[name]) {
    model[name](value);  // todo input cleanup functions?
    if (model.validate) {
      model.validate();
      this.errors = modelErrors(model);
      target.setCustomValidity(this.errors[name] || '');
      model.emit('change errors');
    }
  }
}

View.prototype._display = function(fn){
  var meths = [].slice.call(arguments,1);
  for (var i=0;i<meths.length;++i){
    var meth = meths[i]
    this[meth] = fn(this.model,meth);
  }
}

// private

function emptyString(model, attr){
  return function(){ return model[attr]() || ''; };
}

function modelErrors(model){
  var ret = {};
  for (var i=0;i<model.errors.length;++i){
    var err = model.errors[i];
    ret[err.attr] = (ret[err.attr] ? ret[err.attr] + "; " : "") + err.message;
  }
  return ret;
}

