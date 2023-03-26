# ROFL

A full stack web3 (d)application built for anyone who wants to raffle off their beloved jpegs.


## Why we Built This

After being a part of one of the most extensive bull markets in world-history, my buddies and I were amazed by how these marketplace wars have played out. Now don't get us wrong, we love our airdrops, but isn't there a way to make this all a little more... fun? *enters ROFL*

## Technologies Used

- Next.js
- TypeScript
- Ethers.js
- Firestore
- Chakra UI
- Push Protocol RestApi & Socket SDK
- Solidity
- Chainlink VRF

## Live Demo

Try the application live at [https://nft-raffle-hackathon-vercel.app]([https://warcardgame.xyz](https://nft-raffle-hackathon.vercel.app/))

## Features

- User can view 'public raffles'.
- User can view 'my raffles'.
- User can create a raffle.
- User can purchase a raffle ticket.
- User can win a raffle.
- User can claim raffle prize
- User can access real-time notification feed

## Stretch Features

- User can 'watch' raffle listings
- User can view other users on-platform activity in real time.

## Preview

![faceoff-mobile](server/assets/faceoff-mobile.gif)
![enter-match-mobile](server/assets/enter-match-mobile.gif)

## Development

### System Requirements

- Node.js 18 or higher
- Socket.io 4.5.4 or higher
- NPM 18 or higher
- PostgreSQL 14.3 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/AnthonyUrbina/War
    cd War
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Import the example database to PostgreSQL.

    ```shell
    npm run db:import
    ```

1. Make a copy of the .env.example file. Name your copy `.env`.

    ```shell
    cp .env.example .env
    ```

1. Set up your environmental variables in `.env`. Replace `changeMe` with your own credentials.

    ```shell
    TOKEN_SECRET=changeMe
    DATABASE_URL=postgres://dev:dev@localhost/changeMe?sslmode=disable
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
