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

function restoreOriginalSizes() {
  console.log('restoring original sizes');
  let eles = cy2.nodes();
  eles.forEach(node => {
    node.style({
      width: node.data('originalSize'),
      height: node.data('originalSize')
    });
  });
}

function animateNode(node) {
  let animationQueue = [];
  let postsByDay = node.data('postsByDay');
  for (let day = 0; day < postsByDay.length; day++) {
    let postCount = postsByDay[day];
    let widthInPx = node.style().width;
    let width = Number(widthInPx.substring(0, widthInPx.length - 2));
    let newSize = Math.floor(width + postCount / 1.5);
    animationQueue.push(node.animation({
      style: {
        width: newSize,
        height: newSize
      },
      duration: 400
    }));
  }
  return animationQueue;
}

function animateNodes() {
  if (!cy2.nodes()[0].data('originalSize')) {
    saveOriginalSizes();
  } else {
    restoreOriginalSizes();
  }

  let playQueue = function(queue, position) {
    if (position < queue.length) {
      queue[position].play().promise('complete').then(() => {
        // console.log('going to next animation in queue');
        playQueue(queue, position + 1);
      });
    } else {
      // console.log('done with this animation queue');
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
  }
});

// let cy2 = window.cy2 = cytoscape({
//   container: document.getElementById('graph2-cy'),
//   elements: [
//     { data: { id: 1 } },
//     { data: { id: 2 } },
//     { data: { id: '1-2', source: 1, target: 2 } }
//   ],
//   layout: {
//     name: 'grid'
//   }
// });

// Reveal.addEventListener('slidechanged', function(event) {
//   if (event.currentSlide.id === 'animation') {
//     cy2.resize();
//     cy2.layout();
//     cy2.nodes().animate({
//       style: {
//         'background-color': 'red'
//       }
//     });
//   }
// });
