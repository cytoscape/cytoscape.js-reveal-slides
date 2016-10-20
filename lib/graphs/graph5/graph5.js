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
  },
  style: cytoscape.stylesheet()
          .selector('.cutEdges')
            .css({
              // from https://gist.github.com/maxkfranz/7e2f4d29ff7ef1a1bba5
              'line-color': '#61bffc',
              'target-arrow-color': '#61bffc',
              'transition-property': 'line-color, target-arrow-color',
              'transition-duration': '0.5s'
            })
          .selector('.partition1')
            .css({
              // colors from http://www.colourlovers.com/palette/92095/Giant_Goldfish by Raen, manekineko
              'background-color': '#E0E4CC',
              'transition-property': 'background-color',
              'transition-duration': '0.5s'
            })
          .selector('.partition2')
            .css({
              'background-color': '#F38630',
              'transition-property': 'background-color',
              'transition-duration': '0.5s'
            })
});

function runKS() {
  let ks = cy5.elements().kargerStein();
  ks.cut.addClass('cutEdges');
  ks.partition1.addClass('partition1');
  ks.partition2.addClass('partition2');
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'algorithm2') {
    cy5.resize();
    cy5.layout();
  }
});

document.getElementById('algorithm2-run').addEventListener('click', function() {
  runKS();
});

