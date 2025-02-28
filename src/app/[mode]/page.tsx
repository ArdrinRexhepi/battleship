import MultiPlayerMode from "@/components/MultiPlayerMode";
import SinglePlayerMode from "@/components/SinglePlayerMode";
import { ModeType } from "@/lib/types";

const GamePage = async ({ params }: { params: Promise<{ mode: string }> }) => {
  const mode = (await params).mode;
  const validModes: ModeType[] = ["computer", "multiplayer"];
  console.log("mode: " + mode);

  const gameMode: ModeType = validModes.includes(mode as ModeType)
    ? (mode as ModeType)
    : "computer";

  console.log("gameMode: " + gameMode);

  if (gameMode === "multiplayer") return <MultiPlayerMode />;
  if (gameMode === "computer") return <SinglePlayerMode />;

  return <div>Something went wrong with selecting your game mode</div>;
};

export default GamePage;
