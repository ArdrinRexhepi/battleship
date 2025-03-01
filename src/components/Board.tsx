"use client";
import { CellType, Ship } from "@/lib/types";
import BoardCell from "./BoardCell";

const Board = ({
  board,
  showShips = false,
  handleClick,
  ships,
}: {
  board: CellType[][];
  showShips: boolean;
  handleClick?: (row: number, column: number) => void;
  ships: Ship[];
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col border-2 border-neutral-700">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, columnIndex) => (
              <BoardCell
                key={`${rowIndex}-${columnIndex}`}
                cell={cell}
                column={columnIndex}
                row={rowIndex}
                isEnemy={!showShips}
                ships={ships}
                handleClick={handleClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
