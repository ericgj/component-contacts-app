var reactive = require('reactive')
  , domify   = require('domify')
  , emitter  = require('emitter')
  , tmpl     = require('./template')

module.exports = ContactView;

function ContactView(model){
  if (!(this instanceof ContactView)) return new ContactView(model);
  this.el = domify(tmpl);
  reactive(this.el,model,this);
  return emitter(this);
}

ContactView.prototype.edit = function(){
  this.emit('edit');
}

