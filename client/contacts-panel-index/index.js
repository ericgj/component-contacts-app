var Emitter = require('emitter')
  , event   = require('event')

var DataTable = require('data-table')
  , Pager     = require('pager')

var struc = domify(require('./template.js'))[0]

var recStruc = domify(require('./recordTemplate.js'))
  , hdrStruc = domify(require('./headerTemplate.js'))


/** Interfaces 
 *
 *  - contacts must define .count, .page(n) requests with callbacks
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

  // widget generation

  var panel = {}
    , table = DataTable(struc.querySelector('data-table'), contacts)
                  .header(hdrStruc).record(recStruc)
    , pager = Pager(struc.querySelector('pager'))
                  .perpage(PERPAGE)


  // event hookup

  panel.onwindowload = function(){
    contacts.count( function(err,n){ 
      pager.total(n);
      pager.show(0);
    })
  };

  pager.on('show', function(n){
    contacts.page( n, PERPAGE, function(err,data){
      table.render(data);
    })
  });

  table.on('render', function(){ 
    panel.emit('update table')
  }


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


