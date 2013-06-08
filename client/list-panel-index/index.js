var Emitter = require('emitter')
  , event   = require('event')
  , delegate = require('delegate')
  , empty   = require('empty')
  , attr    = require('attr')
  , domify  = require('domify')

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

  var panel = {};

  // widget initialization

  panel.update = function(lists){
    this.list = domify(template({lists: lists || []}))[0];
    this.more = more(this.list.querySelector('ul'))
                  .max(MAXSHOW).more("Show more...").less("Show less..");

    
    /* delegates not working atm  */
    // if (this.events) this.events.unbind();
    // this.events = delegates(this.list, this);
    // this.events.bind('click li', 'onselect');
    // this.events.bind('click .create-list', 'oncreate');
    
    this.setupEvents();
    this.render();
  }

  panel.render = function(){
    empty(this.el);
    this.more.render();
    this.el.appendChild(this.list);
  }

  panel.setupEvents = function(){
    if (this.events) this.clearEvents();
    this.events = [
      delegate.bind(this.list, 'li',           'click', this.onselect.bind(this)),
      delegate.bind(this.list, '.create-list', 'click', this.oncreate.bind(this))
    ]
  }

  panel.clearEvents = function(){
    delegate.unbind(this.list, 'li', 'click', this.events[0]);
    delegate.unbind(this.list, '.create-list', 'click', this.events[1]);
  }

  // event hookup

/* 
  panel.onwindowload = function(){
    // note we probably don't need this. 
    // template render triggered externally through panel.update()
    panel.update([]);
  }
*/

  panel.onselect = function(e){
    var li = e.target
      , id = attr(li).get('data-id')
    this.emit('select', id);
  }

  panel.oncreate = function(){
    // bring up new contact list form
    this.emit('create');
  }
 

  // bind to DOM

//  event.bind(window, 'load', panel.onwindowload.bind(panel));


  // panel exposure

  panel.MAXSHOW = MAXSHOW;
  panel.el = el;
  Emitter(panel);

  return panel;

}
