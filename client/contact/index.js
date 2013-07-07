var M = require('model')
  , Collection = require('collection')
  , queries = require('model-queries')
  , undoable = require('model-undoable')
  , request = require('superagent')

var Contact = module.exports =
  M('Contact')
    .attr('id', {required: true, type: 'number'})
    .attr('first', {type: 'string'})
    .attr('last' , {type: 'string'})
    .attr('organization', {type: 'string'})
    .attr('email', {type: 'string'})
    .attr('phone', {type: 'string'})
    .attr('comments', {type: 'string'})

Contact.prototype.name = function(){
  var f = this.first(); l = this.last();
  return (f && l ? 
          (f + " " + l) : 
          ((f || '') + (l || ''))
         );
}


Contact.use(queries);
Contact.use(undoable);

Contact.on('undo', function(contact,attr,val){ console.log('Contact undo: %s <-- %s', attr, val); });
Contact.on('change', function(contact,attr,val){ console.log('Contact change: %s = %s', attr, val); });

/* custom endpoints */

Contact.endpoint('pageList', '/contact-list/:id/contact/all', function(res,fn){
  if (res.error) return fn(error(res));
  var raw = res.body
    , total = raw.total
    , data  = new Collection(raw.contacts).map(function(c){ return new Contact(c); });
  fn(null,data,total);
});

/* example
 Contact.pageList({id: 123})
        .query({page: 1, limit: 20})
        .run( function(err,data,total){ });
*/

function error(res){
  return new Error('got ' + res.status + ' response');
}

