let cy5 = window.cy4 = cytoscape({
  container: document.getElementById('graph5-cy'),
  elements: data.elements,
  layout: {
    name: 'concentric',
    animate: false,
    minNodeSpacing: 30,
    animationDuration: 2000,
    concentric: function(node) {
      if (node.id() === '0') {
        return 1;
      }
      return 0;
    },
    levelWidth: function() {
      return 1;
    }
  }
});

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'algorithm2') {
    cy5.resize();
    cy5.layout();
  }
});
