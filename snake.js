let hasWon=false;

window.rollDice=()=>{
    if(hasWon){
        return;
    }
    const max=6;
    const roll=Math.ceil(Math.random()*max);
    
    console.log('you rolled',roll);
    let currentPlayer=players[currentPlayerTurn];
   if( currentPlayer.position + roll <= position ){
       currentPlayer.position += roll;
   }
    ladders.forEach(ladder=>{
        if(ladder.start===currentPlayer.position){
            console.log("you stepped on a ladder");
            currentPlayer.position=ladder.end;
        }   
    });
    if(currentPlayer.position === position){
        alert("player has won", currentPlayer.name);
        hasWon=true;
    }
    if(currentPlayer.position===position){
        const dif=currentPlayer.position-position;
        currentPlayer.position=position-dif;
    }
    currentPlayerTurn++;
    if(currentPlayerTurn > players.length-1){    
        currentPlayerTurn=0;
    }
    const displayValue=document.getElementById("renderDice");
    displayValue.innerHTML=`<p>Dice:${roll}</p>`;
    renderBoard();
}

const players=[{
    name:"Mohan",
    position:0,
    color:"gold"
},{
    name:"Anjan",
    position:0,
    color:"white"
}];
const latters=[{
    start:5,
    end:22
}];
let currentPlayerTurn=0;
const width=10;
const height=9;
const board=[];
let position=0;
let blackSquare=false;
const ladders=[{
    start:2,
    end:22
},
{
    start:50,
    end:34
},
{
    start:28,
    end:56
},
{
    start:78,
    end:51
},
{
    start:5,
    end:47
}];
for(let y=height;y>=0;y--){
    let row=[];
    
    board.push(row);
    for(let x=0;x<width;x++){
        
        row.push({x,y,occupied:null,position,color:blackSquare?"steelblue":"silver"});
        blackSquare=!blackSquare;
        position++;
    }
}
const boardSizeConst=50;
const renderBoard=()=>{
    let boardHTML=``;
    board.forEach(row=>{
        row.forEach(square=>{
            boardHTML+=`<div class=square style="top:${square.y*boardSizeConst}px;left:${square.x*boardSizeConst}px;background-color:${square.color}"></div>`;
        }); 
    });
    players.forEach(player=>{
        let square=null;
        board.forEach(row=>{
            row.forEach(square=>{
                if(square.position===player.position){
                    boardHTML+= `<div class = player style="top:${square.y*boardSizeConst+5}px;left:${square.x*boardSizeConst+5}px;background-color:${player.color}"></div>`
                }
            });
        });
    });
    ladders.forEach(ladder=>{
        let startPos={x:0,y:0};
        let endPos={x:0,y:0};
        board.forEach(row=>{
            row.forEach(square=>{
                if(square.position===ladder.start){
                    startPos.x=square.x*boardSizeConst;
                    startPos.y=square.y*boardSizeConst;

                }
                if(square.position===ladder.end){
                    endPos.x=square.x*boardSizeConst;
                    endPos.y=square.y*boardSizeConst;

                }
            });
        });
        const isLadder=ladder.end>ladder.start;
        drawLine({color:isLadder ? "green":"blue",startPos,endPos});
    });
    document.getElementById("board").innerHTML=boardHTML;
}
function drawLine({color,startPos,endPos}){
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
ctx.beginPath();
const sizeRatio=100/500;
ctx.moveTo(startPos.x+25,startPos.y+25);
ctx.lineTo(endPos.x+25,endPos.y+25);
ctx.lineWidth=15;
ctx.strokeStyle=color;
ctx.stroke();

}

renderBoard();