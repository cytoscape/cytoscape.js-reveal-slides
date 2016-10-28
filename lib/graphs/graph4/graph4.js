let cy4 = cytoscape({
  container: document.getElementById('graph4-cy'),
  elements: data.elements,
  layout: {
    name: 'cose-bilkent',
    edgeElasticity: 0.2
  },
  style: [
    {
      selector: 'node',
      style: {
        'background-image': 'data(image)',
        'background-fit': 'cover',
        'height': 'mapData(djikstraDistance, 0, 4, 100, 40)',
        'width': 'mapData(djikstraDistance, 0, 4, 100, 40)'
      }
    }
  ]
});

/**
 * Calculate the distance between each node and the node with ID==0, which has
 * arbitrarily been chosen to be the center point of the graph.
 * This is done via Djikstra's algorithm.
 *
 * @return {Object} object with distanceTo(node) and pathTo(node) functions.
 */
function calcCloseness() {
  let rootId = '#0';
  return cy4.elements().dijkstra(rootId);
}

function runAStar() {
  let animations = [];
  let buildAnimations = function(path) {
    path.forEach(ele => {
      let style = {
        'border-width': '0.2em',
        'border-style': 'solid',
        'border-color': '#61bffc',
        // 'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'z-index': 9999
      };

      if( ele.isEdge() ){
        style['width'] = '0.2em';
      }

      let animation = ele.animation({
        style: style,
        duration: 500
      });

      animations.push(animation);
    });
  };

  let startEle = cy4.nodes().min(ele => {
    return ele.id();
  }).value;
  let endEle = cy4.nodes().max(ele => {
    return ele.id();
  }).value;
  let aStarResult = cy4.elements().aStar({
    root: '#' + startEle,
    goal: '#' + endEle
  });
  buildAnimations(aStarResult.path);

  animations.reduce((prev, cur) => {
    return prev.then(() => {
      return cur.play().promise();
    });
  }, Promise.resolve());
}

function clearPreviousResultsCy4() {
  cy4.elements().stop(true, false); // stop all animations when leaving slide
  cy4.elements().style({
    'background-color': '',
    'line-color': '',
    'target-arrow-color': ''
  });
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'algorithm1') {
    cy4.resize();
    cy4.layout();
    let dijkstraResult = calcCloseness();
    cy4.nodes().forEach(ele =>
      ele.data('djikstraDistance', dijkstraResult.distanceTo(ele)));
    runAStar();
  } else if (event.previousSlide && event.previousSlide.id === 'algorithm1') {
    clearPreviousResultsCy4();
  }
});
