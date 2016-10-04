let cy = cytoscape({
  container: document.getElementById('graph1-cy'),
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
