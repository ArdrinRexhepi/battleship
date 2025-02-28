"use client";

import { createEmptyBoard } from "@/lib/helpers";
import {
  CellType,
  GameSteps,
  MultiPlayerSteps,
  PlayerType,
  Ship,
} from "@/lib/types";
import { useEffect, useState } from "react";
import ShipPlacement from "./ShipPlacement";
import Board from "./Board";

const MultiPlayerMode = () => {
  const [winner, setWinner] = useState<PlayerType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
  const [gameState, setGameState] =
    useState<MultiPlayerSteps>("PlayerOnePlacement");
  const [player1Board, setPlayer1Board] = useState<CellType[][]>(
    createEmptyBoard()
  );
  const [player2Board, setPlayer2Board] = useState<CellType[][]>(
    createEmptyBoard()
  );

  const [player1Ships, setPlayer1Ships] = useState<Ship[]>([]);
  const [player2Ships, setPlayer2Ships] = useState<Ship[]>([]);

  console.log("player1Board", player1Board);
  console.log("player2Board", player2Board);

  useEffect(() => {
    if (gameState === "PlayerTwoPlacement") {
      setMessage("Player 2, start placing your ships!");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }

    if (gameState === "Playing") {
      setMessage("All the ships have been placed. Good luck!");
      setTimeout(() => {
        setMessage(null);
        setCurrentPlayer("player1");
      }, 1700);
    }
  }, [gameState]);

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
            setMessage("Attack was successful. You sunk a ship!");
          } else {
            setMessage("Attack was successful. You hit a ship!");
          }
          setPlayer2Ships(tempShips);
        }
        const allSunk = tempShips.every((ship) => ship.hasShipSunk);
        if (allSunk) {
          setWinner(currentPlayer);
          setGameState("GameOver");
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
            setMessage("Attack was successful. You sunk a ship!");
          } else {
            setMessage("Attack was successful. You hit a ship!");
          }
          setPlayer1Ships(tempShips);
        }
        const allSunk = tempShips.every((ship) => ship.hasShipSunk);
        if (allSunk) {
          setWinner(currentPlayer);
          setGameState("GameOver");
          return;
        }
      }
    }

    setMessage("Attack complete. Switching turns...");
    setTimeout(() => {
      setMessage(null);
      setCurrentPlayer(currentPlayer === "player1" ? "player2" : "player1");
    }, 1700);
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
      />
    );

  if (gameState === "PlayerTwoPlacement")
    return (
      <>
        {message ? (
          <div>{message}</div>
        ) : (
          <ShipPlacement
            board={player2Board}
            setBoard={setPlayer2Board}
            gameState={gameState}
            changeGameState={changeGameState as (newState: GameSteps) => void}
            placedShips={player2Ships}
            setPlacedShips={setPlayer2Ships}
          />
        )}
      </>
    );

  if (gameState === "Playing" && currentPlayer != null) {
    return (
      <div className="flex flex-col">
        {message && <div>{message}</div>}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">
            {currentPlayer === "player1" && "Player 1 Turn to attack"}{" "}
            {currentPlayer === "player2" && "Player 2 Turn to attack"}
          </h1>

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
    return <div>{winner}</div>;
  }
};

export default MultiPlayerMode;
