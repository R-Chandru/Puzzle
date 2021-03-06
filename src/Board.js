import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants";
import { canSwap, shuffle, swap, isSolved } from "./helpers";

function Board({
  resetTime,
  imgUrl,
  changerTimer,
  isStarted,
  changeIsstart,
  value1,
  value2,
  value3,
  value4,
  setTimeFalse,
}) {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [completedTime1, setCompletedTime1] = useState(0);
  const [completedTime2, setCompletedTime2] = useState(0);
  const [completedTime3, setCompletedTime3] = useState(0);
  const [completedTime4, setCompletedTime4] = useState(0);
  const [displayCross, setDisplayCross] = useState(true);
  console.log("is started:", isStarted);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);
    }
  };

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const handleShuffleClick = () => {
    changerTimer();
    shuffleTiles();
  };

  const handleStartClick = () => {
    shuffleTiles();
    changeIsstart();
    changerTimer();
  };

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  var hasWon = isSolved(tiles);
  
  /*
  if (hasWon ) {
    console.log("succes");
    
    setCompletedTime1(value1);
    setCompletedTime2(value2);
    setCompletedTime3(value3);
    setCompletedTime4(value4);
    var v1=value1;
    var v2=value2;
    var v3=value3;
    var v4=value4;
    //setDisplayCross(true);
   // resetTime();
  }
  */
  return (
    <>
      {hasWon && isStarted && displayCross && (

        <div className="finished">
          {setTimeFalse()}
          
          <h style={{ color:'#333', fontSize:50, paddingTop:30, marginTop:10 }}>Awesome!</h>
          <h4>You just completed in {'\n'}

            {value4}
            {value3}:{value2}
            {value1}

            {'\n'}????
          </h4>
        </div>
      )}

      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>

      
      {!isStarted ? (
        <button id="startBut" onClick={() => handleStartClick()}>
          START
        </button>
      ) : (
        <button id="startBut" onClick={() => handleShuffleClick()}>
          RESTART
        </button>
      )}
    </>
  );
}

export default Board;
