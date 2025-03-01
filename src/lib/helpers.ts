import { CellType, Ship, ShipOrientation, ShipType } from "./types";

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

export const processAttack = (
  targetBoard: CellType[][],
  targetShips: Ship[],
  row: number,
  column: number
): {
  updatedBoard: CellType[][];
  updatedShips: Ship[];
  isGameOver: boolean;
} => {
  //Updating attacked cell
  const updatedBoard = targetBoard;
  const updatedShips = targetShips;

  updatedBoard[row][column].isCellHit = true;

  //Checking if a ship has been attacked
  const shipIndex = updatedShips.findIndex((ship) =>
    ship.positions.some(
      (position) => position.row === row && position.column === column
    )
  );

  //marking the hit ship and checking if a ship has been sunk
  if (shipIndex !== -1) {
    const posIndex = updatedShips[shipIndex].positions.findIndex(
      (pos) => pos.row === row && pos.column === column
    );

    if (posIndex >= 0) {
      updatedShips[shipIndex].positions[posIndex].isHit = true;
      const isShipSunk = updatedShips[shipIndex].positions.every(
        (position) => position.isHit
      );

      if (isShipSunk) {
        updatedShips[shipIndex].hasShipSunk = true;
      }
    }
    //if every ship has sunk signal that the game should be over
    const isGameOver = updatedShips.every((ship) => ship.hasShipSunk);

    return { updatedBoard, updatedShips, isGameOver };
  }

  return { updatedBoard, updatedShips, isGameOver: false };
};



export const shipConfigs: Record<ShipType, number> = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};


export const autoPlaceShips = (board: CellType[][]): { 
  updatedBoard: CellType[][], 
  placedShips: Ship[] 
} => {
  // Create a copy of the board to modify
  const updatedBoard = board
  const placedShips: Ship[] = [];
  const shipTypes: ShipType[] = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
  ];

  //just trying random positions until all placements succeed for all ships
  for (const shipType of shipTypes) {
    let shipPlaced = false;
    const shipLength = shipConfigs[shipType];
    while (!shipPlaced) {
      // Randomly choose orientation
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      
      // based on ship length and orientation we calculate max valid starting positions
      const maxRow = orientation === "vertical" 
        ? 10 - shipLength 
        : 9;
      const maxCol = orientation === "horizontal" 
        ? 10 - shipLength 
        : 9;
      
      // Choose random starting position
      const row = Math.floor(Math.random() * (maxRow + 1));
      const column = Math.floor(Math.random() * (maxCol + 1));
      
      // Checking if placement is valid
      if (isShipPlacementValid(updatedBoard, row, column, shipLength, orientation)) {
        const newShip: Ship = {
          hasShipSunk: false,
          positions: [],
          type: shipType,
        };
        
        // Placing ship on board
        for (let i = 0; i < shipLength; i++) {
          if (orientation === "horizontal") {
            updatedBoard[row][column + i].isShipPart = true;
            newShip.positions.push({ row, column: column + i, isHit: false });
          } else {
            updatedBoard[row + i][column].isShipPart = true;
            newShip.positions.push({ row: row + i, column, isHit: false });
          }
        }
        
        placedShips.push(newShip);
        shipPlaced = true;
      }
    }
  }
  
  return { updatedBoard, placedShips };
};