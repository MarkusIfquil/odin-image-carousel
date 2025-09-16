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
  b.index = i;
  b.onclick = () => {
    index = i;
    switchImage(i);
  };
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function highlightActiveButton() {
  Array.from(buttons).forEach((b) => {
    b.style.backgroundColor = "";
    // console.log(b.style.backgroundColor);
  });
  let button = Array.from(buttons).find((b) => b.index == index);
  button.style.backgroundColor =
    "var(--ctp-frappe-overlay2)";
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
  highlightActiveButton();
  let div = document.querySelector(".slider");
  div.style.transform = `translateX(-${index * div.offsetWidth}px)`;
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

loop(timer, imageCount);
