'use client';
import { createEmptyBoard } from '@/lib/helpers';
import { CellType, MultiPlayerSteps, PlayerType, Ship } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IScoreBoard{
  player1:number
  player2:number
  player:number
  computer:number
  addWinFor: (player: 'player1' | 'player2' | 'computer' | 'player') => void;
}

export const useScoreBoard = create<IScoreBoard>()(
  persist(
    (set) => ({
      player1: 0,
      player2: 0,
      computer: 0,
      player: 0,

      addWinFor: (player) =>
        set((state) => ({
          [player]: state[player] + 1,
        })),

    }),
    {
      name: 'scoreboard',
    }
  )
)


interface BoardTypes{
  player1Board: CellType[][];
  player2Board: CellType[][];
  player1Ships: Ship[];
  player2Ships: Ship[];
  gameState: MultiPlayerSteps
  currentPlayer: PlayerType | null;
  setPlayer1Board: (board: CellType[][]) => void;
  setPlayer2Board: (board: CellType[][]) => void;
  setPlayer1Ships: (ships: Ship[]) => void;
  setPlayer2Ships: (ships: Ship[]) => void;
  setGameState: (state: MultiPlayerSteps) => void;
  setCurrentPlayer: (player: PlayerType | null) => void;
}

export const useBoardState = create<BoardTypes>()(
  persist(
    (set)=>({
      player1Board: createEmptyBoard(),
      player2Board: createEmptyBoard(),
      player1Ships: [],
      player2Ships: [],
      gameState: 'PlayerOnePlacement',
      currentPlayer: null,
      setPlayer1Board: (board) => set({ player1Board: board }),
      setPlayer2Board: (board) => set({ player2Board: board }),
      setPlayer1Ships: (ships) => set({ player1Ships: ships }),
      setPlayer2Ships: (ships) => set({ player2Ships: ships }),
      setGameState: (state) => set({ gameState: state }),
      setCurrentPlayer: (player) => set({ currentPlayer: player }),
    }),
    {
      name: 'boardstate'
    })
  )


// interface IGameState{
//   gameState: 'Setup' | 'Playing' | 'GameOver';
//   currentPlayer: PlayerType | null;
//   winner: 'player1' | 'player2' | 'computer' | 'player' | null;
//   setGameState: (state: 'Setup' | 'Playing' | 'GameOver') => void;
//   setCurrentPlayer: (player: PlayerType | null ) => void;
//   setWinner: (player: 'player1' | 'player2' | 'computer' | 'player' | null) => void;
// }

// export const useGameState = create<IGameState>()(
//   persist(
//     (set) => ({
//       gameState: 'Setup',
//       currentPlayer: null,
//       winner: null,
//       setGameState: (state) => set({ gameState: state }),
//       setCurrentPlayer: (player) => set({ currentPlayer: player }),
//       setWinner: (player) => set({ winner: player }),
//     }),
//   {
//     name:'gamestate'
//   }
// ))