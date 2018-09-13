// import Granim into JS file
import Granim from 'granim';

const granimInstance1 = new Granim({
   element: '#basic__header--canvas',
   name: 'basic-gradient',
   direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
   opacity: [1, 1],
   isPausedWhenNotInView: true,
   states: {
      "default-state": {
         gradients: [
            ['#AA076B', '#61045F'],
            ['#02AAB0', '#00CDAC'],
            ['#DA22FF', '#9733EE']
         ]
      }
   }
});

   
   const granimInstance2 = new Granim({
      element: '#canvas-image-blending',
      direction: 'top-bottom',
      opacity: [1, 1],
      isPausedWhenNotInView: true,
      image: {
         source: './src/assets/neven-krcmarek-190084-unsplash.jpg',
         blendingMode: 'multiply'
      },
      states: {
         "default-state": {
            gradients: [
               ['#29323c', '#485563'],
               ['#FF6B6B', '#556270'],
               ['#80d3fe', '#7ea0c4'],
               ['#f0ab51', '#eceba3']
            ],
            transitionSpeed: 7000
         }
      }
   });










