import "./style.css";

let index = 0;
let div = document.querySelector(".slider");
let imageCount = div.children.length;
let timer = 5000;

let prevB = document.querySelector("#prev");
let nextB = document.querySelector("#next");
prevB.onclick = () => changeIndex(-1);
nextB.onclick = () => changeIndex(1);

let buttons = document.querySelectorAll(".buttons > *");
buttons.forEach((b, i) => {
  b.onclick = () => switchImage(i);
  b.index = i;
  index = i;
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeIndex(change) {
  index = index + change;
  if (index < 0) {
    index = imageCount - 1;
  }
  if (index > imageCount - 1) {
    index = 0;
  }
  switchImage(index);
}

function switchImage(index) {
  let div = document.querySelector(".slider");
  div.style.transform = `translateX(-${index * div.offsetWidth}px)`;
  highlightActiveButton();
}

async function changeImageOnTimer(timer, stop) {
  if (index == stop) {
    return;
  } else {
    switchImage(index);
    index++;
    await sleep(timer);
    await changeImageOnTimer(timer, stop);
  }
}

async function loop(timer, imageCount) {
  while (true) {
    await changeImageOnTimer(timer, imageCount);
    index = 0;
  }
}

function highlightActiveButton() {
  Array.from(buttons).forEach((b) => {
    b.style.backgroundColor = "";
    console.log(b.style.backgroundColor);
  });
  Array.from(buttons).find((b) => b.index == index).style.backgroundColor =
    "white";
}

loop(timer, imageCount);
