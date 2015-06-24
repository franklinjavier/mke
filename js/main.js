var log = require('./log');
var marked = require('./marked');

log.info('Primeiro log');
log.info('Segundo log');

var editor = ace.edit('editor');
var session = editor.getSession();
var mkMode = ace.require("ace/mode/markdown").Mode;

//editor.setTheme("ace/theme/franklin");
editor.renderer.setShowGutter(false);

// Seta modo Wrap
session.setUseWrapMode(true);
session.setWrapLimitRange();

// Tamanho da fonte
editor.setFontSize(16);

//
session.setMode(new mkMode());

marked.setOptions({
  highlight: function (code) {
    return require('./highlight').highlightAuto(code).value;
  },
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

editor.on('input', function() {
  document.querySelector('#preview').innerHTML = marked(session.getValue());
});

hljs.initHighlightingOnLoad();

// http://jsfiddle.net/yyx990803/wy2qf6yx/light/
