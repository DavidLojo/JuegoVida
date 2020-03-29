// ---------------------------------
// VARS
// ---------------------------------

var DefaultXSize = 1400;
var DefaultYSize = 600;

const rowSize = 20;
const colSize = 20;


var lastHorizontalPos = (DefaultXSize/rowSize) -1;
var lastVerticalPos = (DefaultYSize/colSize) -1;
var gameState = 0;
var cells;
var adyacentCells;
var maxUpdateDelay = 250;
var updateDelay = 1;
var generation;
var pause;
var toroidal = true;

// ---------------------------------
// INIT
// ---------------------------------

function init() {

  cells = new Array(lastHorizontalPos);
  generation = 0;
  pause = 1;

  for(i = 0; i <= lastHorizontalPos; i++){
    cells[i] = new Array(lastVerticalPos);
    for(j = 0; j <= lastVerticalPos; j++){
      cells[i][j] = {x: x=i, y: y=j, color: 0, changeColor: 0};
    }
  }

}
init();


function returnData(){
    return data;
}

function updateWorld(){
  data = {generation: generation, speed:(250 - maxUpdateDelay)/50 + 1, pause: pause};
  checkPause();
}
  
function checkPause(){
  if(pause == 0){
    if(updateDelay > maxUpdateDelay){
       checkCells();
       updateGeneration();
	updateDelay = 1;
    } else {
	updateDelay++
    }
  }
}

function checkCells(){
    for(i = 0; i < cells.length; i++){
      for(j = 0; j < cells[i].length; j++){
          adyacentCells = 0;

          for (vecinosI = -1; vecinosI <= 1; vecinosI++){
            for (vecinosJ = -1; vecinosJ <= 1; vecinosJ++){
              if(vecinosI != 0 || vecinosJ != 0){
                if(!toroidal){
                  if(i-vecinosI >= 0){
                    if(i-vecinosI < cells.length){
                     if(j-vecinosJ >= 0){ 
                      if(j-vecinosJ < cells[i].length){
                        if(cells[i-vecinosI][j-vecinosJ].color == 1){
                          adyacentCells++;
                        }
                      }
                     }
  		             }
                  }
                } else {
                  var iAux, jAux;
                  iAux = i-vecinosI;
                  jAux = j-vecinosJ;
                  if(i-vecinosI < 0){
                    iAux = cells.length - 1;
                  }

                  if(i-vecinosI >= cells.length){
                    iAux = 0;
                  }

                  if(j-vecinosJ < 0){
                    jAux = cells[i].length - 1;
                  }

                  if(j-vecinosJ >= cells[i].length){
                    jAux = 0;
                  }

                  if(cells[iAux][jAux].color == 1){
                    adyacentCells++;
                  }
                }
              }
            }
          }
          cells[i][j].changeColor = cells[i][j].color;
        if(cells[i][j].color == 1){
          if(adyacentCells < 2 || adyacentCells > 3){
            cells[i][j].changeColor = 0;
          }
        } else {
          if(adyacentCells == 3){
            cells[i][j].changeColor = 1;
          }
        }
      }
    }
  }

function updateGeneration(){
  generation++;
  for(i = 0; i < cells.length; i++){
      for(j = 0; j < cells[i].length; j++){
        cells[i][j].color = cells[i][j].changeColor;
      }
  }
}

function changeColorOnClick(mousePos){
  for(i = 0; i < cells.length; i++){
      for(j = 0; j < cells[i].length; j++){
        if(mousePos.x > cells[i][j].x * rowSize) {
          if(mousePos.x < (cells[i][j].x + 1) * rowSize){
            if(mousePos.y > cells[i][j].y * colSize){
              if(mousePos.y < (cells[i][j].y + 1) * colSize){
                if(cells[i][j].color == 0){
                  cells[i][j].color = 1;
                } else {
                  cells[i][j].color = 0;
                }
              }
            }
          }
        }
      }
  }
}




function fakeKeys(keyCode){
switch (keyCode) {
    case 32: // SPACE
      if (pause == 0){
        pause = 1;
      } else {
        pause = 0;
      }
      break;
    
    case 109: // -
      if (maxUpdateDelay < 250){
         maxUpdateDelay = maxUpdateDelay + 50;
      } else {
	 maxUpdateDelay = 250;
      }
      break;

    case 107: // +
      if (maxUpdateDelay > 0) {
         maxUpdateDelay = maxUpdateDelay - 50;
      } else {
	 maxUpdateDelay = 0;
      }
      break;
  }
}

function fakeClick(x, y){
  var mousePos = {x: x, y: y};

    changeColorOnClick(mousePos);
}

function setToroidal(checkboxValue){
    toroidal = !checkboxValue;
}