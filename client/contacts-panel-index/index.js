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
 *  - update() must pass in a _query endpoint_ whose callback returns 
 *      (1) a (paged, sorted) collection of contact instances
 *      (2) a total number of contacts for the query
 *  - pager should match component/pager
 *
 ** Events
 *
 *  - pager 'show'    -> table.render   -> panel 'update table' 
 *  - (external)      -> panel.update,  pager.show
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

  // bus event responses

  panel.update = function(query){
    panel.query = query;
    pager.show(0);
  }

  // internal events

  pager.on('show', function(n){
    panel.query.query({page: n, limit: PERPAGE})
         .run( function(err,data,max){
      if (max) pager.total(max);
      table.render(data.array());
    });
  });

  table.on('render', function(){ 
    panel.emit('update table')
  });


  // attach to DOM
  
  el.appendChild(struc);


  // panel exposure

  panel.table = table;
  panel.pager = pager;
  panel.PERPAGE = PERPAGE;
  panel.query = contacts.page
  Emitter(panel);

  return panel;
}

