var M = require('model')
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
Contact.collection('pageList', '/list/:id/contact/all')

Contact.count = function(fn){
  request.get(this.url('count'), function(res){
    if (res.error) return fn(error(res));
    fn(null,JSON.parse(res.body));
  });
}

Contact.countList = function(listId,fn){
  request.get(['','list',listId,'contact','count'].join('/'), function(res){
    if (res.error) return fn(error(res));
    fn(null,JSON.parse(res.body));
  });
}

function error(res){
  return new Error('got ' + res.status + ' response');
}

