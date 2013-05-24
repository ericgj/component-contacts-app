module.exports = function anonymous(obj) {

  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function section(obj, prop, negate, str) {
    var val = obj[prop];
    if ('function' == typeof val) return val.call(obj, str);
    if (negate) val = !val;
    if (val) return str;
    return '';
  };

  return "<div class=\"row\" data-id=\"" + escape(obj.record.id) + "\" data-index=\"" + escape(obj.index) + "\">\n  <div class=\"cell\" style=\"width: 38%;\">" + escape(obj.record.name) + "</div>\n  <div class=\"cell\" style=\"width: 38%;\">" + escape(obj.record.email) + "</div>\n  <div class=\"cell\" style=\"width: 18%;\">" + escape(obj.record.phone) + "</div>\n</div>\n"
}