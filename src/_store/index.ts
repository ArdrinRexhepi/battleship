'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IScoreBoard{
  player1:number
  player2:number
  player:number
  computer:number
  addWinFor: (player: 'player1' | 'player2' | 'computer' | 'player') => void;

  // setPlayer1Score:(score:number) => void
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