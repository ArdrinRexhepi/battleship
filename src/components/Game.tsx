"use client";

import { createEmptyBoard } from "@/lib/helpers";
import { CellType, ModeType, Ship } from "@/lib/types";
import { useState } from "react";
import Board from "./Board";
import ShipPlacement from "./ShipPlacement";

const Game = ({ mode }: { mode: ModeType }) => {
  const [playerBoard, setPlayerBoard] = useState<CellType[][]>(
    createEmptyBoard()
  );
  const [playerShips, setPlayerShips] = useState<Ship[]>([]);

  const handleCellClick = (row: number, column: number) => {
    console.log(`row: ${row}, column: ${column}`);
    // setPlayerShips((prev) =>[...prev, {hasShipSunk:false, positions}] )
  };
  return (
    <div className="flex flex-col items-center mt-20">
      {/* <div className="flex flex-col border-2 border-zinc-500">
        <Board
          board={playerBoard}
          ships={playerShips}
          onClick={handleCellClick}
        />
      </div> */}

      {/* <ShipPlacement /> */}
    </div>
  );
};
export default Game;
