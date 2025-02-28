import { CellType, ShipOrientation } from "./types";

export const createEmptyBoard = (): CellType[][] => {
  const board: CellType[][] = [];
  
  for (let row = 0; row < 10; row++) {
    board[row] = [];
    for (let col = 0; col < 10; col++) {
      board[row][col] = {
        isShipPart: false,
        isCellHit: false
      };
    }
  }
  
  return board;
};

export const isShipPlacementValid = (
  board: CellType[][], 
  startingRow:number, 
  startingColumn:number,
  shipLength:number,
  orientation:ShipOrientation
) : boolean =>{

  // Based on orientation we check if the ship is placed inbounds
  if (orientation === "horizontal" && shipLength + startingColumn > 10) return false
  if (orientation === "vertical" && shipLength + startingRow > 10) return false

  //checking if there is any ships there
  //We do this by checking coordinates based on ship direction, length and starting points
  for (let i = 0; i<shipLength;i++){
    if(orientation === "horizontal" && board[startingRow][startingColumn+i].isShipPart) return false
    if(orientation === "vertical" && board[startingRow+i][startingColumn].isShipPart) return false
  }

  return true
}