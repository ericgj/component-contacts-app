var Emitter = require('emitter')
  , event   = require('event')
  , delegates = require('delegates')
  , empty   = require('empty')
  , attr    = require('attr')

var more = require('more')

var template  = require('./template.js');


/** Interfaces 
 *
 *  - contactLists should define get(id), matching data-id attrs in template
 *  - more should match component/more
 *
 ** Events
 *
 *  - window 'load'         -> panel.onwindowload, .update, .render
 *  - li 'click'            -> panel.onselect   -> panel 'select list'
 *  - .create-list 'click'  -> panel.oncreate   -> panel 'create list'
 *  - (external) -> panel.update, .render
*/

module.exports = function(el,contactLists){

  var MAXSHOW = 5;
  var el = (typeof el == 'string' ? document.querySelector(el) : el);

  // widget initialization

  panel.update = function(lists){
    this.list = template({lists: lists || []});
    this.more = more(this.struc.querySelector('ul')[0])
                  .max(MAXSHOW).more("Show more...").less("Show less..");
    this.render();
  }

  panel.render = function(){
    empty(this.el);
    this.more.render();
    this.el.appendChild(this.list);
  }

  // event hookup

  panel.onwindowload = function(){
    // note we probably don't need this. 
    // template render triggered externally through panel.update()
    panel.update([]);
  }

  panel.events = delegates(struc, panel);
  panel.events.bind('click li', 'onselect');
  panel.events.bind('click .create-list', 'oncreate');
  
  panel.onselect = function(e){
    var li = e.target
      , id = attr(li).get('data-id')
    this.emit('select list', id);
  }

  panel.oncreate = function(){
    // bring up new contact list form
    this.emit('create list');
  }
 

  // bind to DOM

  event.bind(window, 'load', panel.onwindowload.bind(panel));


  // panel exposure

  panel.MAXSHOW = MAXSHOW;
  panel.el = el;
  Emitter(panel);

  return panel;

}
