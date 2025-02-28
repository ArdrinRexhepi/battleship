import { Anchor, Ship, Trophy, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated waves background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-400 rounded-t-full transform translate-y-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-300 rounded-t-full transform translate-y-8 animate-pulse delay-100"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-blue-200 rounded-t-full transform translate-y-6 animate-pulse delay-200"></div>
      </div>

      {/* Floating ships in background */}
      <div className="absolute top-20 left-20 opacity-20 animate-float floa">
        <Ship className="h-16 w-16 text-gray-300" />
      </div>
      <div className="absolute bottom-40 right-20 opacity-20 animate-float delay-300">
        <Ship className="h-12 w-12 text-gray-300" />
      </div>
      <div className="absolute top-40 right-40 opacity-20 animate-float delay-700">
        <Anchor className="h-10 w-10 text-gray-300" />
      </div>

      {/* Main content */}
      <div className="z-10 flex flex-col items-center max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <Ship className="h-10 w-10 text-blue-300" />
          <h1 className="text-5xl font-bold text-white tracking-tight">
            BATTLESHIP
          </h1>
          <Ship className="h-10 w-10 text-blue-300 transform -scale-x-100" />
        </div>

        <Card className="w-full bg-white/10 backdrop-blur-sm border-blue-400/30">
          <CardContent className="p-6 flex flex-col items-center">
            <p className="text-blue-100 text-center mb-8 max-w-lg">
              Command your fleet, position your ships well and destroy your
              enemy&apos;s ship before they destroy your ships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
              <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white/5">
                <div className="rounded-full bg-blue-500/20 p-3">
                  <Ship className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Single Player
                </h3>
                <p className="text-blue-100 text-center text-sm">
                  Battle against the computer AI
                </p>
                <Link href="/computer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer">
                    Start Solo Game
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white/5">
                <div className="rounded-full bg-blue-500/20 p-3">
                  <Trophy className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Multiplayer Game with 2 players
                </h3>
                <p className="text-blue-100 text-center text-sm">
                  Battle against each other
                </p>
                <Link href="/multiplayer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer">
                    Start multiplayer Game
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-blue-400/30 text-blue-500 bg-accent/65 hover:cursor-pointer">
                    <HelpCircle className="size-4" />
                    How to Play
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-blue-900 border-blue-400/30 text-white">
                  <DialogHeader>
                    <DialogTitle>Game Rules</DialogTitle>
                    <DialogDescription className="text-blue-100">
                      Learn how to play Battleship
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <p>
                      1. Each player has a fleet of 5 ships of varying lengths
                    </p>
                    <p>2. Place your ships strategically on your grid</p>
                    <p>3. Take turns firing at your opponent&apos;s grid</p>
                    <p>4. First to sink all enemy ships wins</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
