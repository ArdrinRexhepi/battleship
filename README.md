## Battleship game for

### Installation

```bash
# Clone the repository
git clone https://github.com/ArdrinRexhepi/battleship.git
cd battleship

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the game.

## Features

- **Multiplayer Mode**: Play against a friend on the same device
- **Ship Placement**:
  - Manual placement with drag-and-drop functionality
  - Auto-placement feature for quick game setup
  - Support for vertical and horizontal ship orientations
- **Game Mechanics**:
  - Turn-based gameplay with clear player indicators
  - Visual feedback for hits, misses, and sunk ships
  - Game state persistence using Zustand
- **UI Components**:
  - Responsive design that works across desktop and mobile
  - Clean, modern interface using ShadCN UI components
  - Toast notifications for game events and errors

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **State Management**: Zustand with persistence middleware
- **UI Components**: Shadcn UI (built on Radix UI)
- **Styling**: Tailwind CSS
- **Notifications**: Sonner Toast

## Game Rules

1. Each player places 5 ships on their board:

   - Carrier (5 cells)
   - Battleship (4 cells)
   - Cruiser (3 cells)
   - Submarine (3 cells)
   - Destroyer (2 cells)

2. Players take turns attacking cells on the opponent's board
3. A hit is registered when a player attacks a cell containing an enemy ship
4. The game ends when one player has sunk all of the opponent's ships

## Code Structure

- `_store/`: Zustand store implementations for game state and scoreboard
- `components/`: React components for the game UI
- `lib/`: Helper functions, types, and utility code
- `app/`: Next.js app router pages and layout
