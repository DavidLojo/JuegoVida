var canvas = document.createElement("canvas");

canvas.width = 1400;
canvas.height = 600;


var ctx = canvas.getContext("2d");

//const rowSize = 20;
//const colSize = 20;

var cells;

function setCells(cell){
    cells = cell;
}

function returnCanvas(){
    return canvas
}

function updateCanvas(){
    paintBg();
    paintCells();
}
  
  function paintBg() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  
  function paintCells() {
      for(i = 0; i < cells.length; i++){
        for(j = 0; j < cells[i].length; j++){
          switch(cells[i][j].color){
            case 0:
                ctx.fillStyle = "grey";
              break;
            case 1:
                ctx.fillStyle = "red";
                break;
            default:
                ctx.fillStyle = "black"
              break;
          }
          ctx.fillRect(cells[i][j].x*rowSize, cells[i][j].y*colSize, rowSize-2,colSize-2);
        }
      }
    }