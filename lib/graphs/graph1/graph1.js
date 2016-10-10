let cy = cytoscape({
  container: document.getElementById('graph1-cy')
});

$.getJSON('/lib/graphs/graph_data.json')
  .done(data => {
    cy.add(data.elements);
    cy.layout({ name: 'random' });
  });
