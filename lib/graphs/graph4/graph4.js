let cy4 = window.cy4 = cytoscape({
  container: document.getElementById('graph4-cy'),
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
          .selector('.highlighted')
            .css({
              // from https://gist.github.com/maxkfranz/7e2f4d29ff7ef1a1bba5
              'background-color': '#61bffc',
              'line-color': '#61bffc',
              'target-arrow-color': '#61bffc',
              'transition-property': 'background-color, line-color, target-arrow-color',
              'transition-duration': '0.5s'
            })
});

/**
 * Calculate the closeness between the current element (ele.id()) and the rest of the graph.
 * Closeness-centrality is the sum of the shortest distances between the root node
 * and the rest of the graph. Highly connected nodes have shorter distances and thus lower
 * closeness-centrality measurements.
 *
 * @return {Array} Objects with keys id, closeness
 */
function calcCloseness() {
  let rootId = '#0';
  let eles = cy.nodes();
  let closenessArr = [];
  for (let i = 0; i < eles.length; i++) {
    let ele = eles[i];
    let closeness = cy4.$().cc({
      root: '#' + ele.id(),
      directed: false
    });
    closenessArr.push({
      id: ele.id(),
      closeness: closeness
    });
  }
  return closenessArr;
}

function runAlgorithm() {
  let root = '#0';
  let eles = cy4.nodes();
  let highlightEle = function(path, posInPath) {
    if (posInPath < path.length) {
      if (!path[posInPath].hasClass('highlighted')) {
        path[posInPath].addClass('highlighted');
        setTimeout(highlightEle, 1000, path, posInPath + 1);
      } else {
        // already highlighted, immediately go to next highlighted
        highlightEle(path, posInPath + 1);
      }
    }
  };

  let runSingleEle = function(nodeInGraph) {
    if (nodeInGraph < eles.length) {
      let ele = eles[nodeInGraph];
      let aStarResult = cy4.elements().aStar({
        root: root,
        goal: '#' + ele.id()
      });
      highlightEle(aStarResult.path, 0);
      setTimeout(runSingleEle, aStarResult.distance * 1000, nodeInGraph + 1);
    }
  };
  runSingleEle(0);
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'algorithm1') {
    cy4.resize();
    cy4.layout();

    // array of closeness values, in ascending order
    let closenessArr = calcCloseness().sort((a, b) => {
      return a.closeness - b.closeness;
    });
    let maximumValue = closenessArr[closenessArr.length - 1].closeness;
    let minimumValue = closenessArr[0].closeness;

    let newMaxSize = 80;
    let newMinSize = 30;
    closenessArr.forEach(closenessObj => {
      // linear transform to visible size widths. The largest value of reverseSize will
      // later be made the smallest size node.
      let reversedSize = Math.floor((closenessObj.closeness - minimumValue) /
        (maximumValue - minimumValue) *
        (newMaxSize - newMinSize) +
        newMinSize);
      cy4.getElementById(closenessObj.id).style({
        width: newMaxSize - reversedSize,
        height: newMaxSize - reversedSize
      });
    });
  }
});

document.getElementById('algorithm1-run').addEventListener('click', function() {
  runAlgorithm();
});
