# Codenames - Spymaster

A real-time multiplayer implementation of the popular board game Codenames.

## Play Now

Scan the QR code below or visit [https://nishant-design99.github.io/CodeNames/](https://nishant-design99.github.io/CodeNames/) to play!

![QR Code](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://nishant-design99.github.io/CodeNames/)

## Features

- **Real-time Gameplay**: Synchronized game state across all players using Firebase.
- **Roles**: Play as a Spymaster (giving clues) or an Operative (guessing words).
- **Teams**: Join Red or Blue team.
- **Lobby System**: Create or join rooms to play with friends.

## Development

### Prerequisites

- Node.js
- Firebase project

### Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file with your Firebase configuration (see `src/services/firebase.ts` for required variables).
4.  Start the development server:
    ```bash
    npm run dev
    ```

## License

MIT
