let cy3 = cytoscape({
  container: document.getElementById('graph3-cy'),
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
  ]
  // not specifying layout because it is run immediately by nextLayout
});

function nextLayout(prevLayout) {
  let animationDuration = 2000;
  let possibleLayouts = ['concentric', 'cose-bilkent', 'breadthfirst'];
  let oldLayoutPos = possibleLayouts.findIndex(element => {
    return element === prevLayout;
  });
  let targetLayout = possibleLayouts[(oldLayoutPos + 1) % possibleLayouts.length];
  if (targetLayout === 'concentric') {
    cy3.layout({
      name: 'concentric',
      animate: true,
      minNodeSpacing: 30,
      animationDuration: animationDuration,
      concentric: function(node) {
        if (node.id() === '0') {
          return 1;
        }
        return 0;
      },
      levelWidth: function() {
        return 1;
      }
    });
  } else if (targetLayout === 'breadthfirst') {
    cy3.layout({
      name: 'breadthfirst',
      animate: true,
      animationDuration: animationDuration,
      roots: cy3.nodes('#0')
    });
  } else if (targetLayout === 'cola') {
    cy3.layout({
      name: 'cola',
      animate: true,
      edgeLength: 100,
      randomize: true
    });
  } else if (targetLayout === 'cose-bilkent') {
    cy3.layout({
      name: 'cose-bilkent',
      animationDuration: animationDuration,
      edgeElasticity: 0.1
    });
  }
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'layout') {
    cy3.resize();
    cy3.layout();
    nextLayout();
    cy3.on('layoutstop', event => {
      setTimeout(nextLayout, 6000, event.layout.options.name); // layouts take between 2000 & 4000 ms
    });
  } else if (event.previousSlide && event.previousSlide.id === 'layout') {
    cy3.off('layoutstop');
  }
});
