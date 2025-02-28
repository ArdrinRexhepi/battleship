export type ModeType = 'multiplayer' | 'computer'
export type MultiPlayerSteps = 'PlayerOnePlacement' |'PlayerTwoPlacement' | 'Switching' |'Playing' | 'GameOver';
export type SinglePlayerSteps = 'PlayerPlacement' | 'PlayerTurn' | 'ComputerTurn' | 'GameOver';
export type GameSteps = MultiPlayerSteps | SinglePlayerSteps;
export type PlayerType = 'player1' | 'player2';
export type ShipType = 'carrier' | 'battleship' | 'cruiser' | 'submarine' | 'destroyer';
export type ShipOrientation = 'horizontal' | 'vertical';
export type ShipPosition = {
  row:number,
  column:number,
  isHit:boolean
}

export type CellType = {
  isShipPart: boolean;
  isCellHit: boolean
}
export type Ship = {
  type: ShipType;
  positions: ShipPosition[];
  hasShipSunk: boolean;
}