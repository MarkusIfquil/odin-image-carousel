import "./style.css";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function switchImage(index) {
  let div = document.querySelector(".slider");
  div.style.transform = `translateX(-${index * div.offsetWidth}px)`;
}

async function changeImageOnTimer(timer, index, stop) {
  if (index == stop) {
    return;
  } else {
    switchImage(index);
    await sleep(timer);
    await changeImageOnTimer(timer, index + 1, stop);
  }
}

async function loop(timer, imageCount) {
  while (true) {
    await changeImageOnTimer(timer, 0, imageCount);
  }
}

let div = document.querySelector(".slider");
let imageCount = div.children.length;
let timer = 1000;
loop(timer, imageCount);
