import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayerType } from "@/lib/types";
import { Trophy } from "lucide-react";
import Link from "next/link";

interface GameOverProps {
  winner: PlayerType | null;
  onPlayAgain: () => void;
}

export default function GameOver({ winner, onPlayAgain }: GameOverProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Game Over</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 py-6">
          {winner ? (
            <div className="flex flex-col items-center space-y-4">
              <Trophy className="h-16 w-16 text-yellow-500" />
              <h2 className="text-2xl font-bold">
                Player{" "}
                <span className="text-primary">
                  {winner === "player1" ? "1" : "2"}
                </span>{" "}
                Wins!
              </h2>
            </div>
          ) : (
            <h2 className="text-2xl font-bold">It's a Draw!</h2>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pb-6 gap-2">
          <Button size="lg" onClick={onPlayAgain}>
            Play Again
          </Button>
          <Link href="/computer">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer">
              Play against computer
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
