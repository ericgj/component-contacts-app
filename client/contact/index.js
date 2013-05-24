var M = require('model')
  , queries = require('model-queries')
  , request = require('superagent')

var Contact = module.exports =
  M('Contact')
    .attr('id', {required: true, type: 'number'})
    .attr('name', {type: 'string'})
    .attr('email', {type: 'string'})
    .attr('phone', {type: 'string'})


/* custom endpoints */

Contact.use(queries);
Contact.query('pageQuery', 'all', {page: 'p', limit: 'n'});

Contact.page = function(p,n,cb){ 
  return this.pageQuery({page:p, limit:n},cb); 
}

Contact.count = function(fn){
  request.get(this.url('count'), function(res){
    if (res.error) return fn(error(res));
    fn(null,JSON.parse(res.body));
  });
}

function error(res){
  return new Error('got ' + res.status + ' response');
}

