let cy5 = cytoscape({
  container: document.getElementById('graph5-cy'),
  elements: data.elements,
  layout: {
    name: 'cola',
    animate: true,
    nodeSpacing: function(node) {
      return 40;
    },
    randomize: false
  }
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
  });
  ks.partition1.animate({
    style: {
      // colors from http://www.colourlovers.com/palette/92095/Giant_Goldfish by Raen, manekineko
      'background-color': '#E0E4CC'
    },
    duration: 1000
  });
  ks.partition2.animate({
    style: {
      'background-color': '#F38630'
    },
    duration: 1000
  });
}

function clearPreviousResults() {
  cy5.elements().stop(true, false); // stop all animations when leaving slide
  cy5.elements().style({
    'background-color': '',
    'line-color': '',
    'target-arrow-color': ''
  });
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'algorithm2') {
    cy5.resize();
    cy5.layout();
    setTimeout(runKS, 1500);
  } else if (event.previousSlide && event.previousSlide.id === 'algorithm2') {
    clearPreviousResults();
  }
});
