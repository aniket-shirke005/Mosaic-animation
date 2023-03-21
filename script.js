//
const grid = [50, 23];
const col = grid[0];
const row = grid[1];
const numberOfElements = col * row;

const apiUrl = `https://randomuser.me/api/?results=${numberOfElements}&inc=picture`;
const staggerVisualizerEl = document.querySelector(".stagger-visualizer");
const fragment = document.createDocumentFragment();

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const users = data.results;
    // const numberOfElements = users.length;
    // const sqrt = Math.sqrt(numberOfElements);
    // grid = [Math.ceil(sqrt), Math.floor(sqrt)];

    // staggerVisualizerEl.style.gap = "0";

    for (let i = 0; i < numberOfElements; i++) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = users[i].picture.medium;
      div.appendChild(img);
      fragment.appendChild(div);
    }

    staggerVisualizerEl.appendChild(fragment);
  })
  .then(() => {
    const staggersAnimation = anime
      .timeline({
        targets: ".stagger-visualizer div",
        easing: "easeInOutSine",
        delay: anime.stagger(50),
        loop: true,
        autoplay: false,
      })
      //   .add({
      //     translateX: [
      //       {
      //         value: anime.stagger("-.1rem", {
      //           grid: grid,
      //           from: "center",
      //           axis: "x",
      //         }),
      //       },
      //       {
      //         value: anime.stagger(".1rem", {
      //           grid: grid,
      //           from: "center",
      //           axis: "x",
      //         }),
      //       },
      //     ],
      //     translateY: [
      //       {
      //         value: anime.stagger("-.1rem", {
      //           grid: grid,
      //           from: "center",
      //           axis: "y",
      //         }),
      //       },
      //       {
      //         value: anime.stagger(".1rem", {
      //           grid: grid,
      //           from: "center",
      //           axis: "y",
      //         }),
      //       },
      //     ],
      //     duration: 1000,
      //     scale: 0.5,
      //     delay: anime.stagger(100, { grid: grid, from: "center" }),
      //   })
      .add({
        translateX: () => anime.random(-15, 15),
        translateY: () => anime.random(-15, 15),
        delay: anime.stagger(5, { from: "last" }),
      })
      .add({
        translateX: anime.stagger(".25rem", {
          grid: grid,
          from: "center",
          axis: "x",
        }),
        translateY: anime.stagger(".25rem", {
          grid: grid,
          from: "center",
          axis: "y",
        }),
        rotate: 0,
        scaleX: 2.5,
        scaleY: 0.25,
        delay: anime.stagger(4, { from: "center" }),
      })
      .add({
        rotate: anime.stagger([90, 0], { grid: grid, from: "center" }),
        delay: anime.stagger(50, { grid: grid, from: "center" }),
      })
      .add({
        translateX: 0,
        translateY: 0,
        scale: 0.5,
        scaleX: 1,
        rotate: 180,
        duration: 1000,
        delay: anime.stagger(100, { grid: grid, from: "center" }),
      })
      .add({
        scaleY: 1,
        scale: 1,
        delay: anime.stagger(20, { grid: grid, from: "center" }),
      });

    staggersAnimation.play();
  })
  .catch((error) => {
    console.error("There was a problem fetching the data:", error);
  });

//
