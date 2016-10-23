let cy2 = cytoscape({
  container: document.getElementById('graph2-cy'),
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

// save original size
function saveOriginalSizes() {
  cy2.nodes().forEach(ele => {
    let widthInPx = ele.style().width;
    ele.data('originalSize', Number(widthInPx.substring(0, widthInPx.length - 2)));
  });
}

function animateNode(node) {
  let animationDuration = 200;
  let animationQueue = [];
  let postsByDay = node.data('postsByDay');
  for (let day = 0; day < postsByDay.length; day++) {
    let postCount = postsByDay[day];
    // let widthInPx = node.data('originalSize');
    // let width = Number(widthInPx.substring(0, widthInPx.length - 2));
    let width = node.data('originalSize');
    let newSize = Math.floor(width + 1.4 * postCount);
    animationQueue.push(node.animation({
      style: {
        width: newSize,
        height: newSize
      },
      duration: animationDuration
    }));
  }
  return animationQueue;
}

function animateNodes() {
  if (!cy2.nodes()[0].data('originalSize')) {
    saveOriginalSizes();
  }

  let playQueue = function(queue, position) {
    if (position < queue.length) {
      queue[position].play().promise('complete').then(() => {
        // console.log('going to next animation in queue');
        playQueue(queue, position + 1);
      });
    } else {
      // looping animation
      playQueue(queue, 0);
    }
  };

  cy2.nodes().forEach(node => {
    let animationQueue = animateNode(node);
    playQueue(animationQueue, 0);
  });
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'animation') {
    cy2.resize();
    cy2.layout();
    animateNodes();
  } else if (event.previousSlide && event.previousSlide.id === 'animation') {
    cy2.nodes().stop(true, false); // stop all animations when leaving slide
  }
});
