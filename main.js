const tools = document.querySelectorAll(".tool");
const Matirels = document.querySelectorAll(".matirel div");
const restart = document.querySelector("#restart");
const ToolsIcons = document.querySelectorAll('.tool img')
const game=document.querySelector('.gameBorad ')

const initialMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 3, 3, 0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 3, 3, 0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 3, 3, 0, 0, 0, 3, 0, 0, 0, 4],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

let Matriel = {
  stone: 0,
  wood: 0,
  ground: 0,
  grass: 0,
  tree: 0,
  leaf: 0
};
let matrix = initialMatrix;
let tool = ""; // the tool that is in use
let AddBlock = false; //this var will check if you can add block


const start = () => {
for (let row=0; row< matrix.length; row++){
    for (let col=0; col< matrix.length; col++) {
        switch(initialMatrix[row][col]){
            case 0: createElement('sky');
            break;
            case 1: createElement('cloud');
            break;
            case 2: createElement('leaf');
            break;
            case 3: createElement('wood');
            break;
            case 4: createElement('stone');
            break;
            case 5: createElement('grass')
            break;
            case 6:  createElement('ground');
            break; 
        }
    }
}
  function createElement(type){
    let skyDiv=document.createElement('div');
    skyDiv.classList.add(type);
    skyDiv.addEventListener('click',tileClick);
    game.appendChild(skyDiv);  
}  

Matirels.forEach((matter) => {
  matter.addEventListener("click", () => {
    tool = matter.classList.value;
    // console.log(tool)
    AddBlock = true;
    removeActive()
    // matter.classList.add('MatirelActive')
  });
});
for (let i = 0; i < tools.length; i++) {
  tools[i].addEventListener("click", (kit) => {
    tool = kit.target.getAttribute("type");
    removeActive()
    kit.target.classList.add('active')
    AddBlock = false;
  });
}

}
// take a tile from the board and add it to an object of matriels types
const tileClick = (e) => {
  if (!AddBlock) {
    if (e.target.classList.value === tool ||(tool === "ground" && e.target.classList.value === "grass") ||
      (tool === "wood" &&(e.target.classList.value === "tree" || e.target.classList.value === "leaf"))) {
      Matriel[e.target.classList.value] += 1;
      UpdateMatriel(e.target.classList.value);
      e.target.classList.remove(e.target.classList.value);
      e.target.classList.add("sky");
    }
  } 
  else {
    if (Matriel[tool] > 0 && e.target.classList.value === "sky") {
      Matriel[tool] -= 1;
      UpdateMatriel(tool);
      e.target.classList.remove("sky");
      e.target.classList.add(tool);
    }
  }
};

function UpdateMatriel(e) {  
    Matirels.forEach((matter) => {
        let SP = matter.classList.value.split(' ')
        // console.log(SP[0])
       if (e === SP[0]) {
      matter.innerHTML = Matriel[e];
    }
  });
};

function removeActive(){
    tools.forEach(metter=>metter.classList.remove('active'));
    ToolsIcons.forEach(metter =>metter.classList.remove('active'));
    // Matirels.forEach(p =>{ p.classList.remove('MatirelActive')})
}


function restartBtn(){
  restart.addEventListener("click", () => {
    const gameBorad = document.querySelectorAll(".gameBorad div");
    for (let i = 0; i < gameBorad.length; i++) {
      gameBorad[i].remove();
    }
    Matriel = {
      stone: 0,
      wood: 0,
      ground: 0,
      grass: 0,
      tree: 0,
      leaf: 0,
    };
    Matirels.forEach((p) => {
      p.innerHTML = 0;
    });
    start();
  });
}

start();
restartBtn();


