var M = require('model')
  , request = require('superagent')

var ContactList = module.exports =
  M('ContactList')
    .attr('id', {required: true, type: 'number'})
    .attr('name', {type: 'string'})
    .attr('dateUpdated', {type: 'date'}) 

ContactList.base = '/contact-list'

ContactList.prototype.title = function(){
  return this.name();
}


