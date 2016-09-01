var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    {
      data: {
        id: 'ab',
        source: 'a',
        target: 'b'
      }
    }]
});
cy.layout({ name: 'grid' });


document.getElementById('editor').textContent = "console.log('hello world!');";

var editor = ace.edit("editor");
editor.setTheme('ace/theme/tomorrow_night');
editor.getSession().setMode('ace/mode/javascript');