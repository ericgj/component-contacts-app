var DataTable = require('data-table')
  , Pager     = require('pager')

var struc = domify(require('./template.js'))[0]

var recStruc = domify(require('./recordTemplate.js'))
  , hdrStruc = domify(require('./headerTemplate.js'))


/** Interfaces 
 *
 *  - Contact must define .count, .page(n) requests with callbacks
 *  - pager should match component/pager
 *
 ** Events
 *
 *  - pager.el 'load' -> pager 'show'
 *  - pager 'show'    -> table 'render'
 *  - table 'render'  -> panel 'update table' (for external consumption)
*/

module.exports = function(el,Contact){

  // widget initialization

  var table = DataTable(struc.querySelector('data-table'), Contact)
                  .header(hdrStruc).record(recStruc)

    , pager = Pager(struc.querySelector('pager'))
                  .perpage(20)


  // event hookup

  pager.el.onload = function(){
    Contact.count( function(err,n){ 
      pager.total(n);
      pager.show(0);
    })
  };

  pager.on('show', function(n){
    Contact.page( n, function(err,data){
      table.render(data);
    })
  });

  table.on('render', function(){ 
    panel.emit('update table')
  }


  // attach to DOM
  
  el.appendChild(struc);


  // panel encapsulation

  var panel = Emitter({ table: table, pager: pager});

  return panel;
}


