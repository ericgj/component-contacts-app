var M = require('model')
  , queries = require('model-queries')

var Contact = module.exports =
  M('Contact')
    .attr('id', {required: true, type: 'number'})
    .attr('name', {type: 'string'})
    .attr('email', {type: 'string'})
    .attr('phone', {type: 'string'})


Contact.url('/contacts');

/* custom endpoints */

Contact.use(queries);
Contact.query('pageQuery', 'all', {page: 'p', limit: 'n'});
Contact.query('count', 'count');

Contact.page = function(p,n,cb){ 
  return this.pageQuery({page:p, limit:n},cb); 
}

