/**
 * demo.js
 *
 * Licensed under the MIT license.
 * https://opensource.org/license/mit/
 * 
 * Copyright 2023, WANNABEDEV
 * https://wannabedev.io
 */

 const handleViewModeSwitch = () => {
  // Selectors
  const gridSelector = '.grid';
  const masonryItemSelector = '.masonry__item';
  const loaderSelector = '.loader';
  const dateSelector = '.date';
  const tagsSelector = '.tags';
  const listLayoutSelector = '.list-layout';
  const gridLayoutSelector = '.grid-layout';
  let isTransitioning = false;

  // Masonry initialization
  new Masonry(gridSelector, {
    itemSelector: masonryItemSelector
  });

  // Hide loader
  setTimeout(() => {
    document.querySelector(loaderSelector).classList.add('is-loaded');
  }, 750);

  // Assign special classes to first, second, and third items in the grid
  const classes = ['top', 'middle', 'bottom'];
  document.querySelectorAll(masonryItemSelector).forEach((element, index) => {
    element.classList.add(classes[index % 3]);
  });

  // List layout function
  const listLayout = (element) => {
    // Initialize variables
    const masterTimeline = gsap.timeline({ paused: true, onComplete: () => {
      isTransitioning = false;
    }});
    const topTimeline = gsap.timeline();
    const middleTimeline = gsap.timeline();
    const bottomTimeline = gsap.timeline();
    const topPosition = parseInt(element.offsetTop);
    const topPositionSecond = topPosition + 80;
    const topPositionThird = topPosition + 160;

    // Update position: top for each item in grid
    if (element.classList.contains('top')) {
      topTimeline.to(element, 1.05, { top: topPosition, ease: Expo.easeInOut });
    }
    if (element.classList.contains('middle')) {
      middleTimeline.to(element, 1.05, { top: topPositionSecond, ease: Expo.easeInOut });
    }
    if (element.classList.contains('bottom')) {
      bottomTimeline.to(element, 1.05, { top: topPositionThird, ease: Expo.easeInOut });
    }

    // Populate master timeline
    masterTimeline
      .to(element.querySelector(dateSelector), 0.35, { autoAlpha: 0, ease: Expo.easeInOut })
      .to(element.querySelector(tagsSelector), 0.35, { autoAlpha: 0, ease: Expo.easeInOut }, '-=0.35')
      .to(element, 0.35, { height: 80, ease: Expo.easeInOut })
      .add(topTimeline, -0.35)
      .add(middleTimeline, -0.35)
      .add(bottomTimeline, -0.35)
      .to(element, 0.35, { width: '100%', left: 0, ease: Expo.easeInOut })
      .to(element.querySelector(dateSelector), 0.35, { autoAlpha: 1, ease: Expo.easeInOut })
      .to(element.querySelector(tagsSelector), 0.35, { y: -24, autoAlpha: 1, ease: Expo.easeInOut }, '-=0.35');

    // Play the animation
    masterTimeline.play();
  };

  // Grid layout function
  const gridLayout = (element) => {
    // Initialize variables
    const masterTimeline = gsap.timeline({ paused: true, onComplete: () => {
      isTransitioning = false;
    }});
    const topTimeline = gsap.timeline();
    const middleTimeline = gsap.timeline();
    const bottomTimeline = gsap.timeline();
    const topPosition = parseInt(element.offsetTop);
    const topPositionSecond = topPosition - 80;
    const topPositionThird = topPosition - 160;

    // Update position: left
    if (element.classList.contains('top')) {
      topTimeline.to(element, 1.05, { left: 0, ease: Expo.easeInOut });
    }
    if (element.classList.contains('middle')) {
      middleTimeline.to(element, 1.05, { left: '33.3333%', ease: Expo.easeInOut });
    }
    if (element.classList.contains('bottom')) {
      bottomTimeline.to(element, 1.05, { left: '66.6666%', ease: Expo.easeInOut });
    }
    // Update position: top (to prevent overlapping)
    if (element.classList.contains('top')) {
      topTimeline.to(element, 0.7, { top: topPosition, ease: Expo.easeInOut });
    }
    if (element.classList.contains('middle')) {
      middleTimeline.to(element, 0.7, { top: topPositionSecond, ease: Expo.easeInOut });
    }
    if (element.classList.contains('bottom')) {
      bottomTimeline.to(element, 0.7, { top: topPositionThird, ease: Expo.easeInOut });
    }

    // Populate master timeline
    masterTimeline
      .to(element.querySelector(dateSelector), 0.35, { autoAlpha: 0, ease: Expo.easeInOut })
      .to(element.querySelector(tagsSelector), 0.35, { autoAlpha: 0, ease: Expo.easeInOut }, '-=0.35')
      .to(element, 0.7, { width: '33.3333%', ease: Expo.easeInOut })
      .add(topTimeline, -0.35)
      .add(middleTimeline, -0.35)
      .add(bottomTimeline, -0.35)
      .to(element, 0.35, { height: 240, ease: Expo.easeInOut }, '-=0.5')
      .to(element.querySelector(dateSelector), 0.35, { autoAlpha: 1, ease: Expo.easeInOut })
      .to(element.querySelector(tagsSelector), 0.35, { y: 0, autoAlpha: 1, ease: Expo.easeInOut }, '-=0.35');

    // Play the animation
    masterTimeline.play();
  };

  // Grid to list trigger
  document.querySelector(listLayoutSelector).addEventListener('click', () => {
    if (!isTransitioning) {
      isTransitioning = true;

      // Add/remove active class
      document.querySelector(gridLayoutSelector).classList.remove('active');
      document.querySelector(listLayoutSelector).classList.add('active');
      // Call list function
      const elements = document.querySelectorAll(masonryItemSelector);

      elements.forEach((element) => {
        listLayout(element);
      });
    }
  });

  // List to grid trigger
  document.querySelector(gridLayoutSelector).addEventListener('click', () => {
    if (!isTransitioning) {
      isTransitioning = true;
      
      // Add/remove active class
      document.querySelector(listLayoutSelector).classList.remove('active');
      document.querySelector(gridLayoutSelector).classList.add('active');
      // Call grid function
      const elements = document.querySelectorAll(masonryItemSelector);

      elements.forEach((element) => {
        gridLayout(element);
      });
    }
  });

  // Extras - Click on item to show/hide tags
  const tags = document.querySelectorAll(tagsSelector);
  tags.forEach((tag) => {
    tag.querySelector('li:nth-child(1) a').classList.add('active');
    tag.querySelector('li:nth-child(2) a').classList.add('active');
  });
};

// Call the function
handleViewModeSwitch();
