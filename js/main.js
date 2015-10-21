var marked = require('./marked');
var editor = ace.edit('editor');
var session = editor.getSession();
var mkMode = ace.require("ace/mode/markdown").Mode;
require('./jquery.hotkeys.js');

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


function change(e) {
  if (editor.session.getUndoManager().isClean()) {
    //$('#save').removeClass('disabled');
  } else {
    //$('#save').addClass('disabled');
  }

  var val = session.getValue();
  var character = val.length;
  // Remove first, numbers, trim string and match words
  var words = val.replace(/\d+/g, '').match(/\S+/g).length;

  console.log(val.replace(/\dD+/g, '').match(/\S+/g));

  $('#stats').find('.character').text(character > 1 ? character + ' characters -' : character + ' character -');
  $('#stats').find('.words').text(words > 1 ? words + ' words ' : words + ' word');
  preview();
}

function preview() {
  document.querySelector('#preview').innerHTML = marked(session.getValue());
}

//$('#save').on('click', function() {
    //editor.session.getUndoManager().markClean()
//});

editor.on('input', change);

hljs.initHighlightingOnLoad();

preview();

$(document, editor.container).bind('keydown', 'ctrl+m', toggle);
editor.commands.addCommand({
  name: "toggle-preview",
  bindKey: {win: "Ctrl-m", mac: "Ctrl-M"},
  exec: function(editor) {
    toggle();
  }
});

function toggle() {
  $('#editor').toggle();
  $('#preview').toggle();
  editor.focus();
}


// http://jsfiddle.net/yyx990803/wy2qf6yx/light/
