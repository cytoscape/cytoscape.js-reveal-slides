let cy3 = window.cy3 = cytoscape({
  container: document.getElementById('graph3-cy'),
  elements: data.elements,
  style: [
    {
      selector: 'node',
      style: {
        // <= 100 posts: 20px, >= 800 posts: 70px
        width: 'mapData(totalPosts, 100, 800, 10, 40)',
        height: 'mapData(totalPosts, 100, 800, 10, 40)'
      }
    }
  ],
  layout: {
    name: 'grid'
  }
});

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'layout') {
    cy3.resize();
    cy3.layout();
  }
});

let currentLayout = 'grid';
document.getElementById('layout-switch').addEventListener('click', () => {
  if (currentLayout === 'breadthfirst') {
    currentLayout = 'concentric';
    cy3.layout({
      name: 'concentric',
      animate: true,
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
    });
  } else {
    currentLayout = 'breadthfirst';
    cy3.layout({
      name: 'breadthfirst',
      animate: true,
      animationDuration: 2000,
      roots: cy3.nodes('#0')
    });
  }
});
