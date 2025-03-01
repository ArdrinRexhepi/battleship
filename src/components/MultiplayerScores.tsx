"use client";

import { useScoreBoard } from "@/_store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const MultiplayerScores = () => {
  const { player1, player2 } = useScoreBoard();
  const playerScores = [
    { name: "Player 1", wins: player1 },
    { name: "Player 2", wins: player2 },
  ];

  const sortedPlayers = [...playerScores].sort((a, b) => b.wins - a.wins);

  return (
    <Card className="w-full max-w-md mx-auto bg-white/5 border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-white">
          Multiplayer Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sortedPlayers.map((player, index) => (
            <li
              key={player.name}
              className={`flex items-center justify-between p-4 rounded-lg ${
                index === 0
                  ? "bg-yellow-100 dark:bg-yellow-900"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">{index + 1}</span>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>
                      {player.wins} {player.wins === 1 ? "win" : "wins"}
                    </span>
                  </div>
                </div>
              </div>
              {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MultiplayerScores;
