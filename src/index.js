import "./style.css";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function switchImage(imageDiv, index) {
    Array.from(imageDiv.children).forEach(node => node.style.display = "none");
    imageDiv.children[index].style.display = "block";
}

function changeImageOnTimer(imageDiv, timer, index) {
    if(index == -1) {
        // sleep(5000);
        // changeImageOnTimer(imageDiv,timer,imageDiv.children.length-1);
        return;
    }
    else {
        switchImage(imageDiv, index);
        sleep(timer);
        changeImageOnTimer(imageDiv,timer,index-1);
    }
}

switchImage(document.querySelector(".slider"),0);
while(true) {
    // changeImageOnTimer(document.querySelector(".slider"),5000,document.querySelector(".slider").children.length-1);
}
