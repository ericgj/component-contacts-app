
var Models = { _data: [] }
module.exports = Models;

Models.count = function(fn){
  fn(null, this._data.length);
  return this;
}

Models.page = function(page,limit,fn){
  fn(null, this._data.slice(page * limit,limit));
  return this;
}

Models.loadFixture = function(name,save){
  var data = require('./' + name + '.js');
  return this.loadData(data,save);
}

Models.loadData = function(data,save){
  if (!save) this.clearData();
  if (!isArray(data)) data = [data];
  for (var i=0;i<data.length;++i){
    this._data.push(data[i]);
  }
 return this;
}

Models.clearData = function(){
  this._data = [];
  return this;
}

// inlined from yields/isArray

var isArray = Array.isArray || function(val){
  return !! val && '[object Array]' == Object.prototype.toString.call(val);
};
