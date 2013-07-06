var domify = require('domify')

var Contact  = require('contact')

var ContactEdit = require('contact-edit')
  , ContactShow = require('contact-show')
  , MultiView   = require('multi-view')
  , struc       = domify(require('./template'))

module.exports = function(el,event,contacts){
  
  el = (typeof el == 'string' ? document.querySelector(el) : el);

  // widget configuration

  var panel = {}
    , newContactView = new ContactEdit(new Contact)  
    , contactViews = []

  struc.querySelector('.new-contact').appendChild( newContactView.el );

  for (var i=0;i<contacts.length;++i){
    var view = new MultiView(struc.querySelector('.contacts'))
                     .mode('show', ContactShow)
                     .mode('edit', ContactEdit)
    contactViews.push(view);
    view.render(contacts[i], 'show');
  }
  

  // internal events

  // exposure

  panel.el = el;
  panel.newContactView = newContactView;
  panel.contactViews = contactViews;

  // DOM insertion

  el.appendChild(struc);

  return panel;
}
