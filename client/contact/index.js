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
Contact.query('page', 'all', {page: 'p', limit: 'n'});

