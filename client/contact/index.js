var M = require('model')
  , Collection = require('collection')
  , queries = require('model-queries')
  , request = require('superagent')

var Contact = module.exports =
  M('Contact')
    .attr('id', {required: true, type: 'number'})
    .attr('first', {type: 'string'})
    .attr('last' , {type: 'string'})
    .attr('email', {type: 'string'})
    .attr('phone', {type: 'string'})

Contact.prototype.name = function(){
  var f = this.first(); l = this.last();
  return (f && l ? 
          (f + " " + l) : 
          ((f || '') + (l || ''))
         );
}

/* custom endpoints */

Contact.use(queries);
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

