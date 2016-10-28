let cy5 = cytoscape({
  container: document.getElementById('graph5-cy'),
  elements: data.elements,
  layout: {
    name: 'cose-bilkent',
    edgeElasticity: 0.175
  },
  style: [
    {
      selector: 'node',
      style: {
        'background-image': 'data(image)',
        'background-fit': 'cover',
        'width': '70px',
        'height': '70px'
      }
    }
  ]
});

function runKS() {
  let ks = cy5.elements().kargerStein();

  // animate results
  ks.cut.animate({
    style: {
      'line-color': '#61bffc',
      'target-arrow-color': '#61bffc'
    },
    duration: 1000
  }).edges().animate({
    style: {
      'width': '0.2em'
    },
    duration: 1000
  });
  ks.partition1.animate({
    style: {
      // colors from http://www.colourlovers.com/palette/92095/Giant_Goldfish by Raen, manekineko
      'border-width': '0.2em',
      'border-style': 'solid',
      'border-color': '#E0E4CC'
    },
    duration: 1000
  });
  ks.partition2.animate({
    style: {
      'border-width': '0.2em',
      'border-style': 'solid',
      'border-color': '#F38630'
    },
    duration: 1000
  });
}

function clearPreviousResultsCy5() {
  //cy5.elements().stop(true, false); // stop all animations when leaving slide
  cy5.elements().style({
    'line-color': '',
    'target-arrow-color': '',
    'border-width': '',
    'border-style': '',
    'border-color': ''
  });
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'algorithm2') {
    cy5.resize();
    cy5.layout();
    runKS();
  } else if (event.previousSlide && event.previousSlide.id === 'algorithm2') {
    clearPreviousResultsCy5();
  }
});
