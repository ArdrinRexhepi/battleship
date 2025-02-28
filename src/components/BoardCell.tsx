"use client";

import { CellType, Ship } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

const BoardCell = ({
  handleClick,
  row,
  column,
  cell,
  isEnemy,
  ships,
}: {
  handleClick?: (row: number, column: number) => void;
  row: number;
  column: number;
  cell: CellType;
  isEnemy: boolean;
  ships: Ship[];
}) => {
  // Checking if this cell belongs to a sunken ship
  const sunkenShip = ships.find(
    (ship) =>
      ship.hasShipSunk &&
      ship.positions.some(
        (position) => position.row === row && position.column === column
      )
  );

  // Cell states to show in the whole board
  const isSunkenShip = !!sunkenShip;
  const isEmptyHitCell = cell.isCellHit && !cell.isShipPart;
  const isHitShipCell = cell.isCellHit && cell.isShipPart;
  const isVisibleShipCell = !isEnemy && cell.isShipPart && !cell.isCellHit;

  return (
    <div
      key={`${row}-${column}`}
      className={cn(
        "size-8 border border-zinc-300 bg-zinc-100 hover:cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-blue-100",

        // Sunken ship styling (priority)
        isSunkenShip && isEnemy && "bg-green-500 hover:bg-green-400",
        isSunkenShip && !isEnemy && "bg-purple-500 hover:bg-purple-400",

        // Hit ship part (not sunken)
        !isSunkenShip && isHitShipCell && "bg-violet-600 hover:bg-violet-500",

        // Empty but hit cell
        isEmptyHitCell && "bg-red-300 hover:bg-red-200",

        // Our visible ship
        !isSunkenShip && isVisibleShipCell && "bg-blue-200 hover:bg-blue-100"
      )}
      onClick={handleClick ? () => handleClick(row, column) : undefined}>
      {/* Show a checkmark for sunken ships */}
      {isSunkenShip &&
        (isEnemy ? (
          <Check className="text-white m-auto" />
        ) : (
          <X className="text-white m-auto" />
        ))}

      {/* Show an X for hit ship cells that aren't sunken */}
      {!isSunkenShip && isHitShipCell && (
        <Check className="text-white m-auto" />
      )}

      {/* Show an X for missed shots */}
      {isEmptyHitCell && <X className="text-red-600 m-auto" />}
    </div>
  );
};

export default BoardCell;
