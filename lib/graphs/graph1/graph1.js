let cy = window.cy = cytoscape({
  container: document.getElementById('graph1-cy')
});

$.getJSON('/lib/graphs/graph_data.json')
  .done(data => {
    // TODO: move resizing into this loop so it doesn't occur until after elements are added
    cy.add(data.elements);
    cy.layout({ name: 'random' });
  });

let calcSize = function(ele) {
  return ele.data('postsByDay').reduce((prev, cur) => prev + cur);
};

cy.nodes().style({
  width: calcSize,
  height: calcSize
});
