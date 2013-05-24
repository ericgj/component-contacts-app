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

  return "<div class=\"header row\">\n  <div class=\"cell\" style=\"width: 38%;\">Name</div>\n  <div class=\"cell\" style=\"width: 38%;\">Email</div>\n  <div class=\"cell\" style=\"width: 18%;\">Phone</div>\n</div>\n"
}