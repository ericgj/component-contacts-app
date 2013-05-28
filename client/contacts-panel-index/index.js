var Emitter = require('emitter')
  , event   = require('event')
  , domify  = require('domify')

var DataTable = require('data-table')
  , Pager     = require('pager')

var struc = domify(require('./template.js'))[0]

var recStruc = require('./recordTemplate.js')
  , hdrStruc = require('./headerTemplate.js')


/** Interfaces 
 *
 *  - contacts must define .count, .page(n, limit) requests with callbacks
 *  - pager should match component/pager
 *
 ** Events
 *
 *  - window 'load'   -> panel 'onwindowload'    -> pager 'show'
 *  - pager 'show'    -> table 'render'
 *  - table 'render'  -> panel 'update table' (for external consumption)
*/

module.exports = function(el,contacts){

  var PERPAGE = 20;

  el = (typeof el == 'string' ? document.querySelector(el) : el);

  // widget generation

  var panel = {}
    , table = new DataTable(struc.querySelector('.data-table'), contacts)
                    .header(hdrStruc).record(recStruc)
    , pager = new Pager().perpage(PERPAGE)
    struc.querySelector('.pager').appendChild(pager.el[0]);

  // event hookup

  panel.onwindowload = function(){
    contacts.count( function(err,n){ 
      pager.total(n);
      pager.show(0);
    })
  };

  pager.on('show', function(n){
    contacts.page( n, PERPAGE, function(err,data){
      table.render(data.array());
    })
  });

  table.on('render', function(){ 
    panel.emit('update table')
  });


  // attach to DOM
  
  el.appendChild(struc);
  event.bind(window, 'load', panel.onwindowload.bind(panel));


  // panel exposure

  panel.table = table;
  panel.pager = pager;
  panel.PERPAGE = PERPAGE;
  Emitter(panel);

  return panel;
}

