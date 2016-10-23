let cy1 = cytoscape({
  container: document.getElementById('graph1-cy'),
  elements: data.elements,
  style: [
    {
      selector: 'node',
      style: {
        // <= 100 posts: 20px, >= 800 posts: 70px
        'width': 'mapData(totalPosts, 100, 800, 20, 70)',
        'height': 'mapData(totalPosts, 100, 800, 20, 70)',
        'background-image': 'data(image)',
        'background-fit': 'cover'
      }
    }
  ],
  layout: {
    name: 'grid'
  }
});

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'style') {
    cy1.resize();
    cy1.layout();
  }
});
