let ANIMATION_DURATION = 200;

let cy2 = window.cy2 = cytoscape({
  container: document.getElementById('graph2-cy'),
  elements: data.elements,
  style: [
    {
      selector: 'node',
      style: {
        // <= 100 posts: 20px, >= 800 posts: 70px
        width: 'mapData(totalPosts, 100, 800, 20, 70)',
        height: 'mapData(totalPosts, 100, 800, 20, 70)'
      }
    }
  ],
  layout: {
    name: 'grid'
  }
});

// save original size
function saveOriginalSizes() {
  let eles = cy2.nodes();
  for (let i = 0; i < eles.length; i++) {
    let ele = eles[i];
    let widthInPx = ele.style().width;
    ele.data('originalSize', Number(widthInPx.substring(0, widthInPx.length - 2)));
  }
}

// function restoreOriginalSizes() {
//   console.log('restoring original sizes');
//   let eles = cy2.nodes();
//   eles.forEach(node => {
//     node.style({
//       width: node.data('originalSize'),
//       height: node.data('originalSize')
//     });
//   });
// }

function animateNode(node) {
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
      duration: ANIMATION_DURATION
    }));
  }
  return animationQueue;
}

function animateNodes() {
  if (!cy2.nodes()[0].data('originalSize')) {
    saveOriginalSizes();
  } else {
    // restoreOriginalSizes();
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

  let nodes = cy2.nodes();
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    let animationQueue = animateNode(node);
    playQueue(animationQueue, 0);
  }
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'animation') {
    cy2.resize();
    cy2.layout();
    animateNodes();
  } else {
    cy2.nodes().stop(true, false); // stop all animations when leaving slide
  }
});
