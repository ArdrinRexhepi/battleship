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
import { createEmptyBoard } from "@/lib/helpers";
import { GameSteps, MultiPlayerSteps, PlayerType } from "@/lib/types";
import { useState } from "react";
import ShipPlacement from "./ShipPlacement";
import Board from "./Board";
import GameOver from "./GameOver";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { useBoardState, useScoreBoard } from "@/_store";
import { cn } from "@/lib/utils";

const MultiPlayerMode = () => {
  const { addWinFor } = useScoreBoard();
  const {
    player1Board,
    setPlayer1Board,
    player2Board,
    setPlayer2Board,
    player1Ships,
    setPlayer1Ships,
    player2Ships,
    setPlayer2Ships,
    currentPlayer,
    setCurrentPlayer,
    gameState,
    setGameState,
  } = useBoardState();
  const [winner, setWinner] = useState<PlayerType | null>(null);

  const onGameFinish = (currentPlayer: PlayerType) => {
    setWinner(currentPlayer);
    addWinFor(currentPlayer);
    setPlayer1Board(createEmptyBoard());
    setPlayer2Board(createEmptyBoard());
    setPlayer1Ships([]);
    setPlayer2Ships([]);
    setCurrentPlayer(null);
    setGameState("GameOver");
  };

  const changeGameState = (newState: MultiPlayerSteps) => {
    setGameState(newState);
  };

  const handleCellAttack = (row: number, column: number) => {
    if (currentPlayer === "player1") {
      const attackedBoard = player2Board;
      attackedBoard[row][column].isCellHit = true;
      setPlayer2Board(attackedBoard);

      //Here we check if attack was successful
      const shipCoordinate = player2Ships.findIndex((ship) =>
        ship.positions.some(
          (position) => position.row === row && position.column === column
        )
      );
      if (shipCoordinate !== -1) {
        const tempShips = player2Ships;
        const posIndex = tempShips[shipCoordinate].positions.findIndex(
          (pos) => pos.row === row && pos.column === column
        );

        if (posIndex >= 0) {
          tempShips[shipCoordinate].positions[posIndex].isHit = true;
          const isShipSunk = tempShips[shipCoordinate].positions.every(
            (position) => position.isHit
          );
          if (isShipSunk) {
            tempShips[shipCoordinate].hasShipSunk = true;
          }
          setPlayer2Ships(tempShips);
        }

        //if all ships have sunk then add declare winner
        const allSunk = tempShips.every((ship) => ship.hasShipSunk);
        if (allSunk) {
          onGameFinish(currentPlayer);
          return;
        }
      }
    }

    if (currentPlayer === "player2") {
      const attackedBoard = player1Board;
      attackedBoard[row][column].isCellHit = true;
      setPlayer1Board(attackedBoard);

      //Here we check if attack was successful
      const shipCoordinate = player1Ships.findIndex((ship) =>
        ship.positions.some(
          (position) => position.row === row && position.column === column
        )
      );
      if (shipCoordinate !== -1) {
        const tempShips = player1Ships;
        const posIndex = tempShips[shipCoordinate].positions.findIndex(
          (pos) => pos.row === row && pos.column === column
        );

        if (posIndex >= 0) {
          tempShips[shipCoordinate].positions[posIndex].isHit = true;
          const isShipSunk = tempShips[shipCoordinate].positions.every(
            (position) => position.isHit
          );
          if (isShipSunk) {
            tempShips[shipCoordinate].hasShipSunk = true;
          }
          setPlayer1Ships(tempShips);
        }
        //if all ships have sunk then add declare winner
        const allSunk = tempShips.every((ship) => ship.hasShipSunk);
        if (allSunk) {
          onGameFinish(currentPlayer);
          return;
        }
      }
    }

    setGameState("Switching");
  };

  const restartGame = () => {
    setPlayer1Board(createEmptyBoard());
    setPlayer2Board(createEmptyBoard());
    setPlayer1Ships([]);
    setPlayer2Ships([]);
    setWinner(null);
    setCurrentPlayer(null);
    setGameState("PlayerOnePlacement");
  };

  const switchTurns = () => {
    console.log("gameState", gameState);
    console.log("currentPlayer", currentPlayer);

    setGameState("Playing");
    setCurrentPlayer(currentPlayer === "player1" ? "player2" : "player1");
  };

  if (gameState === "PlayerOnePlacement")
    return (
      <ShipPlacement
        board={player1Board}
        setBoard={setPlayer1Board}
        gameState={gameState}
        changeGameState={changeGameState as (newState: GameSteps) => void}
        placedShips={player1Ships}
        setPlacedShips={setPlayer1Ships}
        setCurrentPlayer={setCurrentPlayer}
      />
    );

  if (gameState === "PlayerTwoPlacement")
    return (
      <ShipPlacement
        board={player2Board}
        setBoard={setPlayer2Board}
        gameState={gameState}
        changeGameState={changeGameState as (newState: GameSteps) => void}
        placedShips={player2Ships}
        setPlacedShips={setPlayer2Ships}
        setCurrentPlayer={setCurrentPlayer}
      />
    );

  if (gameState === "Switching") {
    return (
      <Card className="max-w-lg place-self-center mt-20">
        <CardHeader>
          <CardTitle>Switching Turns</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold">
            Hey Player {currentPlayer === "player1" ? "2" : "1"} are you ready
            to attack?
          </h2>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button onClick={switchTurns} className="hover:cursor-pointer">
            Lets attack!
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (gameState === "Playing" && currentPlayer != null) {
    return (
      <div className="flex flex-col p-5">
        <div className="flex flex-col items-center">
          <div className="flex items-center flex-col gap-2">
            <h1 className="text-2xl font-bold">
              {currentPlayer === "player1" && "Player 1 Turn to attack"}{" "}
              {currentPlayer === "player2" && "Player 2 Turn to attack"}
            </h1>
            <AlertDialog>
              <AlertDialogTrigger
                className={cn(buttonVariants({ variant: "destructive" }))}>
                Restart Game
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will reset the game!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={restartGame}
                    className="hover:cursor-pointer">
                    Restart
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-center">Your board</h2>
              <Board
                board={
                  currentPlayer === "player1" ? player1Board : player2Board
                }
                ships={
                  currentPlayer === "player1" ? player1Ships : player2Ships
                }
                showShips={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-center">
                Opponents Board
              </h2>
              <Board
                board={
                  currentPlayer === "player1" ? player2Board : player1Board
                }
                ships={
                  currentPlayer === "player1" ? player2Ships : player1Ships
                }
                showShips={false}
                handleClick={handleCellAttack}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "GameOver") {
    return <GameOver winner={winner} onPlayAgain={restartGame} />;
  }
};

export default MultiPlayerMode;
