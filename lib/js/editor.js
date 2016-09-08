let editors = document.getElementsByClassName('cy-editor');
for (let i = 0; i < editors.length; i++) {
  let editor = ace.edit(editors[i]);
  editor.setTheme('ace/theme/tomorrow_night');
  editor.getSession().setMode('ace/mode/javascript');
  editor.on('change', function() {
    console.log('editor changed');
  });

  let curGraph = editors[i].id.substr(0, editors[i].id.indexOf('-')); // substr is hack to use ID; should probably switch to a different attribute
  var settings = {
    "async": true,
    "crossDomain": true,
    "dataType": "text",
    "url": "/lib/graphs/" + curGraph + "/" + curGraph + ".js",
    "method": "GET"
  };

  $.ajax(settings).done(function(response) {
    // console.log(response);
    editor.getSession().getDocument().setValue(response);
  });

  editor.on('change', _.debounce(function() {
    eval(editor.getSession().getDocument().getValue());
  }, 1500));
}
