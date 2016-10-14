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

let animateDay = function(day) {
  let animationQueue = [];
  let eles = cy2.nodes();
  for (let i = 0; i < eles.length; i++) {
    let ele = cy2.nodes()[i];
    let newSize = ele.data('originalSize') + (ele.data('postsByDay')[day] / 2);
    animationQueue.push(ele.animation({
      style: {
        width: newSize,
        height: newSize
      }
      // style: {
      //   'background-color': 'red'
      // }
    }));
  }
  return animationQueue;
};

function animatePosts() {
  // TODO: debug jumpy animations (intermediate steps not shown?)
  saveOriginalSizes();
  let animationQueue = [];
  let totalDays = cy2.nodes()[0].data('postsByDay').length;
  for (let day = 0; day < totalDays; day++) {
    animationQueue.push(animateDay(day));
  }
  let playAnimation = function(day, delay) {
    if (day < animationQueue.length) {
      animationQueue[day].forEach(animation => animation.play());
      setTimeout(playAnimation(day + 1), delay + 400);
    }
  };
  playAnimation(0, 0);
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'animation') {
    cy2.layout();
    animatePosts();
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
