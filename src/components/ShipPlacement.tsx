"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createEmptyBoard, isShipPlacementValid } from "@/lib/helpers";
import {
  CellType,
  MultiPlayerSteps,
  PlayerType,
  Ship,
  ShipType,
  SinglePlayerSteps,
} from "@/lib/types";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import Board from "./Board";

const shipConfigs: Record<ShipType, number> = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};
const ShipPlacement = ({
  board,
  setBoard,
  gameState,
  changeGameState,
  placedShips,
  setPlacedShips,
  setCurrentPlayer,
}: {
  board: CellType[][];
  setBoard: (board: CellType[][]) => void;
  gameState: MultiPlayerSteps;
  changeGameState: (newState: MultiPlayerSteps | SinglePlayerSteps) => void;
  placedShips: Ship[];
  setPlacedShips: (ships: Ship[]) => void;
  setCurrentPlayer: (player: PlayerType | null) => void;
}) => {
  const [currentShipType, setCurrentShipType] = useState<ShipType | null>(
    "carrier"
  );
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const shipTypes: ShipType[] = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
  ];

  const handleCellClick = useCallback(
    (row: number, column: number) => {
      //check if a ship has been selected
      if (!currentShipType) {
        toast.info("You must select a ship");
        return;
      }
      //Check if all ships have been placed
      if (placedShips.length === 5) {
        toast.info("All ships have been places");
        return;
      }
      const shipLength = shipConfigs[currentShipType];

      //check ship placement
      if (!isShipPlacementValid(board, row, column, shipLength, orientation)) {
        toast.error("Invalid ship placement");
        return;
      }

      //creating a new ship to place on board
      const newShip: Ship = {
        hasShipSunk: false,
        positions: [],
        type: currentShipType,
      };

      //placing the ship on board
      //first we create a temporary board and we input the new ship there and then
      const tempBoard = [...board];

      for (let i = 0; i < shipLength; i++) {
        if (orientation === "horizontal") {
          tempBoard[row][column + i].isShipPart = true;
          newShip.positions.push({ row, column: column + i, isHit: false });
        } else {
          tempBoard[row + i][column].isShipPart = true;
          newShip.positions.push({ row: row + i, column, isHit: false });
        }
      }
      //we update the board state with the new ship
      setBoard(tempBoard);
      //We update the placed ships state with the new ship
      setPlacedShips([...placedShips, newShip]);
      setCurrentShipType(null);
    },
    [currentShipType, orientation, placedShips]
  );

  const getAvailableShipTypes = () => {
    const placedShipTypes = placedShips.map((ship) => ship.type);
    return shipTypes.filter((shipType) => !placedShipTypes.includes(shipType));
  };

  const resetAll = () => {
    setBoard(createEmptyBoard());
    setPlacedShips([]);
    setCurrentShipType("carrier");
  };

  const onComplete = useCallback(() => {
    if (gameState === "PlayerOnePlacement") {
      changeGameState("PlayerTwoPlacement");
    }
    if (gameState === "PlayerTwoPlacement") {
      setCurrentPlayer("player1");
      changeGameState("Playing");
    }
  }, [gameState]);

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <h1 className="text-2xl font-bold">
        Place your ships{" "}
        {gameState === "PlayerOnePlacement" ? "Player 1" : "Player 2"}
      </h1>
      {/* Controls to select ship and direction */}
      <div className="flex gap-2 items-center flex-col border rounded-md p-2 bg-zinc-100 max-w-2xl">
        {/* Ships we can place */}
        <div className="flex gap-2 max-sm:grid grid-cols-3">
          {getAvailableShipTypes().length > 0 ? (
            getAvailableShipTypes().map((shipType) => (
              <div
                key={shipType}
                onClick={() => setCurrentShipType(shipType)}
                className={cn(
                  "rounded-sm bg-zinc-100/55 border border-zinc-400 p-2 hover:cursor-pointer hover:bg-blue-100 transition-all duration-200 w-[100px]",
                  shipType === currentShipType ? "bg-blue-200" : ""
                )}>
                {shipType} ({shipConfigs[shipType]} cells)
              </div>
            ))
          ) : (
            <Button variant="default" onClick={() => onComplete()}>
              Ship placement complete
            </Button>
          )}
        </div>
        {/* Orientation */}
        <RadioGroup
          defaultValue={orientation}
          value={orientation}
          className="flex p-2">
          <div
            className="flex items-center space-x-2 p-3 border rounded-md text-lg hover:cursor-pointer bg-white/65"
            onClick={() => setOrientation("horizontal")}>
            <RadioGroupItem
              value="horizontal"
              id="horizontal"
              className="hover:cursor-pointer"
            />
            <Label htmlFor="horizontal" className="hover:cursor-pointer">
              Horizontal
            </Label>
          </div>
          <div
            className="flex items-center space-x-2 p-3 border rounded-md text-lg hover:cursor-pointer bg-white/65"
            onClick={() => setOrientation("vertical")}>
            <RadioGroupItem
              value="vertical"
              id="vertical"
              className="hover:cursor-pointer"
            />
            <Label htmlFor="vertical" className="hover:cursor-pointer">
              Vertical
            </Label>
          </div>
        </RadioGroup>

        <AlertDialog>
          <AlertDialogTrigger
            className={cn(buttonVariants({ variant: "destructive" }))}>
            Reset the board
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will reset all the board and
                your current ship placements.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={resetAll}
                className="hover:cursor-pointer">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col border-2 border-zinc-500">
        <Board
          board={board}
          handleClick={handleCellClick}
          showShips={true}
          ships={placedShips}
        />
      </div>
    </div>
  );
};

export default ShipPlacement;
